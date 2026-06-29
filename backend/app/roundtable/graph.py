from langgraph.graph import END, START, StateGraph

from app.roundtable.llm import call_llm
from app.roundtable.prompts import (
    MODERATOR_PLAN_TEMPLATE,
    SPEAKER_TEMPLATE,
    SUMMARY_TEMPLATE,
)
from app.roundtable.speakers import SPEAKERS
from app.roundtable.state import RoundtableState, RoundtableTurn


def _format_speakers() -> str:
    return "\n".join(
        f"- {speaker['name']}：{speaker['role']}，{speaker['perspective']}"
        for speaker in SPEAKERS
    )


def _format_turns(turns: list[RoundtableTurn]) -> str:
    if not turns:
        return "暂无。"
    return "\n\n".join(
        f"{turn['speaker_name']}（{turn['role']}）：{turn['content']}"
        for turn in turns
    )


def moderator_plan(state: RoundtableState) -> RoundtableState:
    prompt = MODERATOR_PLAN_TEMPLATE.format(
        topic=state["topic"],
        history="暂无上一轮讨论。",
        speakers=_format_speakers(),
    )
    fallback = (
        "这个问题的核心张力在于：概念、体验、工程和想象如何互相校正。"
        "苏格拉底先追问定义，乔布斯判断体验是否成立，马斯克拆解实现路径，"
        "达芬奇把它放回艺术、自然和跨学科观察中。"
    )
    plan = call_llm("你是克制、清晰的圆桌主持人。", prompt, fallback)
    return {**state, "moderator_plan": plan}


def make_speaker_node(speaker_id: str):
    def speaker_node(state: RoundtableState) -> RoundtableState:
        speaker = next(item for item in SPEAKERS if item["speaker_id"] == speaker_id)
        prompt = SPEAKER_TEMPLATE.format(
            name=speaker["name"],
            role=speaker["role"],
            perspective=speaker["perspective"],
            style=speaker["style"],
            topic=state["topic"],
            history="暂无上一轮讨论。",
            moderator_plan=state["moderator_plan"],
            previous_turns=_format_turns(state["turns"]),
        )
        fallback = (
            f"从{speaker['name']}的视角看，问题“{state['topic']}”需要先回到"
            f"{speaker['perspective']} 这个层面。我的判断是：不要急着接受表面答案，"
            "而要把它放进实际的人、工具、限制和创造关系里检验。"
        )
        content = call_llm(
            f"你以{speaker['name']}的公开思想风格参与讨论，但不是本人。",
            prompt,
            fallback,
        )
        turn: RoundtableTurn = {
            "speaker_id": speaker["speaker_id"],
            "speaker_name": speaker["name"],
            "role": speaker["role"],
            "content": content,
        }
        return {**state, "turns": [*state["turns"], turn]}

    return speaker_node


def moderator_summary(state: RoundtableState) -> RoundtableState:
    prompt = SUMMARY_TEMPLATE.format(
        topic=state["topic"],
        history="暂无上一轮讨论。",
        moderator_plan=state["moderator_plan"],
        turns=_format_turns(state["turns"]),
    )
    fallback = (
        "共识是：这个问题不能只从单一角度判断，需要同时看概念、体验、工程与创造。"
        "张力在于：追求清晰定义可能会放慢行动，而快速工程化又可能忽略人的感受。"
        "下一步可以追问：它的核心定义是什么？谁会真正使用它？怎样用最小实验验证？"
    )
    summary = call_llm("你是负责收束讨论的主持人。", prompt, fallback)
    return {**state, "summary": summary}


def build_roundtable_graph():
    graph = StateGraph(RoundtableState)
    graph.add_node("plan_discussion", moderator_plan)
    graph.add_node("socrates_reply", make_speaker_node("socrates"))
    graph.add_node("jobs_reply", make_speaker_node("jobs"))
    graph.add_node("musk_reply", make_speaker_node("musk"))
    graph.add_node("davinci_reply", make_speaker_node("davinci"))
    graph.add_node("summarize_discussion", moderator_summary)

    graph.add_edge(START, "plan_discussion")
    graph.add_edge("plan_discussion", "socrates_reply")
    graph.add_edge("socrates_reply", "jobs_reply")
    graph.add_edge("jobs_reply", "musk_reply")
    graph.add_edge("musk_reply", "davinci_reply")
    graph.add_edge("davinci_reply", "summarize_discussion")
    graph.add_edge("summarize_discussion", END)

    return graph.compile()


roundtable_graph = build_roundtable_graph()
