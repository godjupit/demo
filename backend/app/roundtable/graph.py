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
        "这个问题的核心张力在于：社区、商业、艺术行动、照护和技术实践如何互相校正。"
        "本轮可以让共益企业先回应可持续经营，再由个体与社群实践者补充地方、身体、"
        "手作、游戏和公共空间中的具体经验。"
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
            f"你以{speaker['name']}的公开资料和实践风格参与讨论，但不是本人。",
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
        "共识是：这个问题不能只从单一角度判断，需要同时看社区关系、商业约束、"
        "艺术方法、照护劳动和技术工具。张力在于：可持续实践需要慢慢建立信任，"
        "但现实议题又常常要求快速行动。下一步可以追问：谁会被真正影响？"
        "怎样用小规模共创验证？哪些关系需要被长期维护？"
    )
    summary = call_llm("你是负责收束讨论的主持人。", prompt, fallback)
    return {**state, "summary": summary}


def build_roundtable_graph():
    graph = StateGraph(RoundtableState)
    graph.add_node("plan_discussion", moderator_plan)
    speaker_nodes = []
    for speaker in SPEAKERS:
        node_name = f"{speaker['speaker_id']}_reply"
        speaker_nodes.append(node_name)
        graph.add_node(node_name, make_speaker_node(speaker["speaker_id"]))
    graph.add_node("summarize_discussion", moderator_summary)

    graph.add_edge(START, "plan_discussion")
    previous_node = "plan_discussion"
    for node_name in speaker_nodes:
        graph.add_edge(previous_node, node_name)
        previous_node = node_name
    graph.add_edge(previous_node, "summarize_discussion")
    graph.add_edge("summarize_discussion", END)

    return graph.compile()


roundtable_graph = build_roundtable_graph()
