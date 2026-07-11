import json
from typing import Optional
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from app.db.conversations import load_conversation, upsert_conversation
from app.knowledge.good_life_local import retrieve_good_life_chunks
from app.knowledge.pgvector_store import retrieve_pgvector
from app.roundtable.llm import call_llm, stream_llm
from app.roundtable.prompts import (
    MODERATOR_PLAN_TEMPLATE,
    SPEAKER_TEMPLATE,
    SUMMARY_TEMPLATE,
)
from app.roundtable.speakers import SPEAKERS
from app.roundtable.state import RoundtableTurn


router = APIRouter(tags=["roundtable"])


class RoundtableRequest(BaseModel):
    topic: str = Field(..., min_length=1)
    thread_id: Optional[str] = None
    user_id: Optional[str] = None
    history: list["RoundtableResponse"] = Field(default_factory=list)
    speaker_ids: list[str] = Field(default_factory=list)


class TargetedFollowupRequest(BaseModel):
    question: str = Field(..., min_length=1)
    speaker_id: str = Field(..., min_length=1)
    round: "RoundtableResponse"
    history: list["RoundtableResponse"] = Field(default_factory=list)
    thread_id: Optional[str] = None
    user_id: Optional[str] = None


class RoundtableResponse(BaseModel):
    thread_id: str
    topic: str
    moderator_plan: str
    turns: list[RoundtableTurn]
    summary: str


class SpeakerInfo(BaseModel):
    speaker_id: str
    name: str
    role: str
    perspective: str
    style: str
    location: str
    map_x: int
    map_y: int
    latitude: float
    longitude: float


class SpeakerChatMessage(BaseModel):
    role: str
    content: str


class SpeakerChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    speaker_id: str = Field(..., min_length=1)
    thread_id: Optional[str] = None
    user_id: Optional[str] = None
    messages: list[SpeakerChatMessage] = Field(default_factory=list)


class SpeakerChatResponse(BaseModel):
    thread_id: str
    speaker_id: str
    speaker_name: str
    role: str
    answer: str
    citations: list[dict] = Field(default_factory=list)


RoundtableRequest.model_rebuild()
TargetedFollowupRequest.model_rebuild()


def _initial_state(request: RoundtableRequest) -> dict:
    return {
        "thread_id": request.thread_id or str(uuid4()),
        "topic": request.topic,
        "user_id": request.user_id,
        "moderator_plan": "",
        "turns": [],
        "summary": "",
    }


def _sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


def _select_roundtable_speakers(speaker_ids: list[str]) -> list[dict]:
    selected_ids = speaker_ids or [speaker["speaker_id"] for speaker in SPEAKERS[:3]]
    unique_ids = list(dict.fromkeys(selected_ids))
    if len(unique_ids) != 3:
        raise ValueError("圆桌会议需要且只能选择 3 位成员。")

    speakers_by_id = {speaker["speaker_id"]: speaker for speaker in SPEAKERS}
    missing_ids = [speaker_id for speaker_id in unique_ids if speaker_id not in speakers_by_id]
    if missing_ids:
        raise ValueError(f"未知成员：{', '.join(missing_ids)}")

    return [speakers_by_id[speaker_id] for speaker_id in unique_ids]


def _format_speakers(speakers: list[dict] | None = None) -> str:
    selected_speakers = speakers or SPEAKERS
    return "\n".join(
        f"- {speaker['name']}：{speaker['role']}，{speaker['perspective']}"
        for speaker in selected_speakers
    )


def _format_turns(turns: list[RoundtableTurn]) -> str:
    if not turns:
        return "暂无。"
    return "\n\n".join(
        f"{turn['speaker_name']}（{turn['role']}）：{turn['content']}"
        for turn in turns
    )


def _format_history(history: list[RoundtableResponse]) -> str:
    if not history:
        return "暂无上一轮讨论。"

    blocks = []
    for index, round_item in enumerate(history[-3:], start=1):
        blocks.append(
            "\n".join(
                [
                    f"第 {index} 轮主题：{round_item.topic}",
                    f"发言：{_format_turns(round_item.turns)}",
                    f"总结：{round_item.summary}",
                ]
            )
        )
    return "\n\n".join(blocks)


def _format_chat_messages(messages: list[SpeakerChatMessage]) -> str:
    if not messages:
        return "暂无。"
    return "\n".join(
        f"{'用户' if message.role == 'user' else '角色'}：{message.content}"
        for message in messages[-10:]
    )


def _speaker_agent_id(speaker_id: str) -> str:
    return f"roundtable-speaker:{speaker_id}"


def _retrieve_speaker_context(speaker_id: str, question: str) -> tuple[str, list[dict]]:
    local_chunks = retrieve_good_life_chunks(person_id=speaker_id, query=question, limit=4)
    try:
        chunks = retrieve_pgvector(query=question, person_id=speaker_id, limit=6)
    except Exception:
        chunks = []

    chunks = sorted(
        [*local_chunks, *chunks],
        key=lambda chunk: chunk["score"],
        reverse=True,
    )

    if not chunks:
        return "暂未从 PostgreSQL/pgvector 检索到资料。", []

    context_blocks = []
    citations = []
    for index, chunk in enumerate(chunks, start=1):
        context_blocks.append(
            "\n".join(
                [
                    f"[{index}] {chunk['title']}",
                    f"source_id={chunk['source_id']} chunk_id={chunk['chunk_id']} score={chunk['score']:.4f}",
                    chunk["text"],
                ]
            )
        )
        citations.append(
            {
                "source_id": chunk["source_id"],
                "chunk_id": chunk["chunk_id"],
                "title": chunk["title"],
                "score": chunk["score"],
                "quote": chunk["text"][:180],
                "metadata": chunk.get("metadata", {}),
            }
        )
    return "\n\n".join(context_blocks), citations


def _roundtable_messages(round_item: RoundtableResponse) -> list[dict]:
    messages: list[dict] = [
        {"role": "user", "content": round_item.topic},
    ]
    for turn in round_item.turns:
        messages.append(
            {
                "role": "assistant",
                "content": f"{turn['speaker_name']}（{turn['role']}）：{turn['content']}",
            }
        )
    if round_item.summary:
        messages.append(
            {"role": "assistant", "content": f"主持人总结：{round_item.summary}"}
        )
    return messages


def _stream_text(event: str, data: dict, characters) -> tuple[str, list[str]]:
    content: list[str] = []
    for character in characters:
        content.append(character)
        yield _sse(event, {**data, "delta": character})
    return "".join(content)


@router.get("/roundtable/speakers", response_model=list[SpeakerInfo])
def roundtable_speakers() -> list[SpeakerInfo]:
    return [SpeakerInfo(**speaker) for speaker in SPEAKERS]


@router.post("/roundtable/speaker-chat", response_model=SpeakerChatResponse)
def speaker_chat(request: SpeakerChatRequest) -> SpeakerChatResponse:
    speaker = next(
        (item for item in SPEAKERS if item["speaker_id"] == request.speaker_id),
        None,
    )
    if not speaker:
        return SpeakerChatResponse(
            thread_id=request.thread_id or str(uuid4()),
            speaker_id=request.speaker_id,
            speaker_name="未知角色",
            role="",
            answer="没有找到这位圆桌角色，请重新选择一位地图上的人物。",
        )

    thread_id = request.thread_id or str(uuid4())
    persisted_messages: list[SpeakerChatMessage] = []
    if request.thread_id and not request.messages:
        record = load_conversation(
            thread_id=request.thread_id,
            agent_id=_speaker_agent_id(request.speaker_id),
        )
        if record:
            persisted_messages = [
                SpeakerChatMessage(**message) for message in record["messages"]
            ]
    history_messages = request.messages or persisted_messages
    rag_context, citations = _retrieve_speaker_context(
        request.speaker_id,
        request.message,
    )
    prompt = f"""你正在和用户进行一对一对话。

重要边界：
- 你不是该成员本人，而是基于公开资料与实践标签构建的讨论视角。
- 不要声称拥有该成员的私人记忆、实时经历、真实承诺或未公开观点。
- 回答要像单人聊天，不要称自己正在参加圆桌。

你的角色：
姓名：{speaker['name']}
身份：{speaker['role']}
视角：{speaker['perspective']}
表达风格：{speaker['style']}

从 PostgreSQL + pgvector 检索到的个人资料：
{rag_context}

最近对话：
{_format_chat_messages(history_messages)}

用户新问题：
{request.message}

请用中文回答，要求：
- 80 到 180 字
- 直接回应用户
- 优先依据检索到的个人资料；如果资料不足，要明确说“资料里没有直接信息”
- 保持这个角色的思考方式和表达风格
- 可以留一个自然的追问方向
- 不要使用 Markdown 加粗符号，例如 **重点**
"""
    fallback = (
        f"我先基于已有资料谨慎回答。{speaker['name']} 的公开资料主要指向："
        f"{speaker['perspective']}。如果你问的是更细的经历、活动细节或具体观点，"
        "需要继续补充资料或完成 pgvector 导入后再核对。"
    )
    answer = call_llm(
        f"你以{speaker['name']}的公开资料和实践风格进行一对一对话，但不是本人。",
        prompt,
        fallback,
    )
    messages = [
        *[message.model_dump() for message in history_messages],
        {"role": "user", "content": request.message},
        {"role": "assistant", "content": answer},
    ]
    upsert_conversation(
        thread_id=thread_id,
        user_id=request.user_id,
        agent_id=_speaker_agent_id(speaker["speaker_id"]),
        messages=messages,
    )

    return SpeakerChatResponse(
        thread_id=thread_id,
        speaker_id=speaker["speaker_id"],
        speaker_name=speaker["name"],
        role=speaker["role"],
        answer=answer,
        citations=citations,
    )


@router.post("/roundtable", response_model=RoundtableResponse)
def roundtable(request: RoundtableRequest) -> RoundtableResponse:
    try:
        selected_speakers = _select_roundtable_speakers(request.speaker_ids)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    state = _initial_state(request)
    plan_prompt = MODERATOR_PLAN_TEMPLATE.format(
        topic=state["topic"],
        speakers=_format_speakers(selected_speakers),
        history=_format_history(request.history),
    )
    plan_fallback = (
        "本轮讨论可以先把问题放回三位成员各自的实践处境：一位回应社区与关系，"
        "一位回应材料、生产或组织限制，另一位补充公共行动与日常经验。"
        "主持人会观察他们之间的共识、分歧和可继续追问的线索。"
    )
    state["moderator_plan"] = call_llm("你是克制、清晰的圆桌主持人。", plan_prompt, plan_fallback)

    turns: list[RoundtableTurn] = []
    for speaker in selected_speakers:
        speaker_prompt = SPEAKER_TEMPLATE.format(
            name=speaker["name"],
            role=speaker["role"],
            perspective=speaker["perspective"],
            style=speaker["style"],
            topic=state["topic"],
            history=_format_history(request.history),
            moderator_plan=state["moderator_plan"],
            previous_turns=_format_turns(turns),
        )
        speaker_fallback = (
            f"从{speaker['name']}的视角看，问题“{state['topic']}”需要先回到"
            f"{speaker['perspective']} 这个层面。我的判断是：不要急着接受表面答案，"
            "而要把它放进实际的人、工具、限制和创造关系里检验。"
        )
        turns.append(
            {
                "speaker_id": speaker["speaker_id"],
                "speaker_name": speaker["name"],
                "role": speaker["role"],
                "content": call_llm(
                    f"你以{speaker['name']}的公开资料和实践风格参与讨论，但不是本人。",
                    speaker_prompt,
                    speaker_fallback,
                ),
            }
        )
    state["turns"] = turns

    summary_prompt = SUMMARY_TEMPLATE.format(
        topic=state["topic"],
        history=_format_history(request.history),
        turns=_format_turns(turns),
    )
    summary_fallback = (
        "共识是：这个问题需要同时放进三位成员的具体实践里判断。"
        "张力在于：不同实践对行动速度、关系维护和资源约束的理解并不相同。"
        "下一步可以追问：谁会被真正影响？怎样用小规模共创验证？哪些关系需要长期维护？"
    )
    state["summary"] = call_llm("你是负责收束讨论的主持人。", summary_prompt, summary_fallback)

    response = RoundtableResponse(
        thread_id=state["thread_id"],
        topic=state["topic"],
        moderator_plan=state["moderator_plan"],
        turns=state["turns"],
        summary=state["summary"],
    )
    upsert_conversation(
        thread_id=response.thread_id,
        user_id=request.user_id,
        agent_id="roundtable",
        messages=_roundtable_messages(response),
    )
    return response


@router.post("/roundtable/stream")
def roundtable_stream(request: RoundtableRequest) -> StreamingResponse:
    def event_stream():
        final_state = _initial_state(request)
        yield _sse(
            "start",
            {
                "thread_id": final_state["thread_id"],
                "topic": final_state["topic"],
            },
        )

        try:
            selected_speakers = _select_roundtable_speakers(request.speaker_ids)
            plan_prompt = MODERATOR_PLAN_TEMPLATE.format(
                topic=final_state["topic"],
                speakers=_format_speakers(selected_speakers),
                history=_format_history(request.history),
            )
            plan_fallback = (
                "本轮讨论可以先把问题放回三位成员各自的实践处境：一位回应社区与关系，"
                "一位回应材料、生产或组织限制，另一位补充公共行动与日常经验。"
                "主持人会观察他们之间的共识、分歧和可继续追问的线索。"
            )
            yield _sse("plan_start", {})
            plan_parts: list[str] = []
            for character in stream_llm(
                "你是克制、清晰的圆桌主持人。",
                plan_prompt,
                plan_fallback,
            ):
                plan_parts.append(character)
                yield _sse("plan_delta", {"delta": character})
            final_state["moderator_plan"] = "".join(plan_parts)
            yield _sse(
                "plan_done",
                {"moderator_plan": final_state["moderator_plan"]},
            )

            turns: list[RoundtableTurn] = []
            for speaker in selected_speakers:
                yield _sse(
                    "turn_start",
                    {
                        "speaker_id": speaker["speaker_id"],
                        "speaker_name": speaker["name"],
                        "role": speaker["role"],
                    },
                )
                speaker_prompt = SPEAKER_TEMPLATE.format(
                    name=speaker["name"],
                    role=speaker["role"],
                    perspective=speaker["perspective"],
                    style=speaker["style"],
                    topic=final_state["topic"],
                    history=_format_history(request.history),
                    moderator_plan=final_state["moderator_plan"],
                    previous_turns=_format_turns(turns),
                )
                speaker_fallback = (
                    f"从{speaker['name']}的视角看，问题“{final_state['topic']}”需要先回到"
                    f"{speaker['perspective']} 这个层面。我的判断是：不要急着接受表面答案，"
                    "而要把它放进实际的人、工具、限制和创造关系里检验。"
                )
                content_parts: list[str] = []
                for character in stream_llm(
                    f"你以{speaker['name']}的公开资料和实践风格参与讨论，但不是本人。",
                    speaker_prompt,
                    speaker_fallback,
                ):
                    content_parts.append(character)
                    yield _sse(
                        "turn_delta",
                        {
                            "speaker_id": speaker["speaker_id"],
                            "delta": character,
                        },
                    )
                turn: RoundtableTurn = {
                    "speaker_id": speaker["speaker_id"],
                    "speaker_name": speaker["name"],
                    "role": speaker["role"],
                    "content": "".join(content_parts),
                }
                turns.append(turn)
                yield _sse("turn_done", turn)

            final_state["turns"] = turns

            summary_prompt = SUMMARY_TEMPLATE.format(
                topic=final_state["topic"],
                history=_format_history(request.history),
                turns=_format_turns(turns),
            )
            summary_fallback = (
                "共识是：这个问题需要同时放进三位成员的具体实践里判断。"
                "张力在于：不同实践对行动速度、关系维护和资源约束的理解并不相同。"
                "下一步可以追问：谁会被真正影响？怎样用小规模共创验证？哪些关系需要长期维护？"
            )
            yield _sse("summary_start", {})
            summary_parts: list[str] = []
            for character in stream_llm(
                "你是负责收束讨论的主持人。",
                summary_prompt,
                summary_fallback,
            ):
                summary_parts.append(character)
                yield _sse("summary_delta", {"delta": character})
            final_state["summary"] = "".join(summary_parts)
            yield _sse("summary_done", {"summary": final_state["summary"]})

            round_response = RoundtableResponse(
                thread_id=final_state["thread_id"],
                topic=final_state["topic"],
                moderator_plan=final_state["moderator_plan"],
                turns=final_state["turns"],
                summary=final_state["summary"],
            )
            upsert_conversation(
                thread_id=round_response.thread_id,
                user_id=request.user_id,
                agent_id="roundtable",
                messages=_roundtable_messages(round_response),
            )

            yield _sse(
                "done",
                {
                    "thread_id": final_state["thread_id"],
                    "topic": final_state["topic"],
                },
            )
        except Exception as error:
            yield _sse("error", {"message": str(error)})

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@router.post("/roundtable/followup/stream")
def targeted_followup_stream(request: TargetedFollowupRequest) -> StreamingResponse:
    def event_stream():
        speaker = next(
            (item for item in SPEAKERS if item["speaker_id"] == request.speaker_id),
            None,
        )
        if not speaker:
            yield _sse("error", {"message": "Unknown speaker"})
            return

        thread_id = request.thread_id or str(uuid4())
        yield _sse(
            "target_start",
            {
                "thread_id": thread_id,
                "speaker_id": speaker["speaker_id"],
                "speaker_name": speaker["name"],
                "role": speaker["role"],
                "question": request.question,
            },
        )

        try:
            prompt = f"""你正在继续一个圆桌讨论。用户现在只追问你一个人。

重要边界：
- 你不是该成员本人，而是基于公开资料与实践标签构建的讨论视角。
- 不要声称拥有该成员的私人记忆、实时经历、真实承诺或未公开观点。
- 回答要直接回应用户追问，不要重新总结整场圆桌。

你的角色：
姓名：{speaker['name']}
身份：{speaker['role']}
视角：{speaker['perspective']}
表达风格：{speaker['style']}

历史讨论：
{_format_history(request.history)}

当前轮主题：
{request.round.topic}

当前轮发言：
{_format_turns(request.round.turns)}

当前轮总结：
{request.round.summary}

用户追问：
{request.question}

请用中文回答，要求：
- 100 到 180 字
- 只代表你的这个讨论视角发言
- 明确回应追问
- 可以指出你和其他角色可能不同意的地方
- 结尾给用户一个可以继续追问的方向
- 不要使用 Markdown 加粗符号，例如 **重点**
"""
            fallback = (
                f"从{speaker['name']}的视角看，你的追问“{request.question}”需要回到"
                f"{speaker['perspective']}。我会先把问题缩小到一个可讨论的判断："
                "它是否真的改变了人的理解、体验或行动？你可以继续追问我这个判断的前提。"
            )
            content_parts: list[str] = []
            for character in stream_llm(
                f"你以{speaker['name']}的公开资料和实践风格回答定向追问，但不是本人。",
                prompt,
                fallback,
            ):
                content_parts.append(character)
                yield _sse(
                    "target_delta",
                    {
                        "speaker_id": speaker["speaker_id"],
                        "delta": character,
                    },
                )

            content = "".join(content_parts)
            upsert_conversation(
                thread_id=thread_id,
                user_id=request.user_id,
                agent_id=f"roundtable-followup:{speaker['speaker_id']}",
                messages=[
                    {"role": "user", "content": request.question},
                    {"role": "assistant", "content": content},
                ],
            )
            yield _sse(
                "target_done",
                {
                    "thread_id": thread_id,
                    "speaker_id": speaker["speaker_id"],
                    "speaker_name": speaker["name"],
                    "role": speaker["role"],
                    "question": request.question,
                    "content": content,
                },
            )
        except Exception as error:
            yield _sse("error", {"message": str(error)})

    return StreamingResponse(event_stream(), media_type="text/event-stream")
