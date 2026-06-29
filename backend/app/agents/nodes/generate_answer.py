from app.agents.prompts import ANSWER_TEMPLATE, SYSTEM_TEMPLATE
from app.agents.state import AgentState
from app.core.settings import settings


def _format_context(state: AgentState) -> str:
    if not state["retrieved_chunks"]:
        return "没有检索到足够资料。"

    blocks = []
    for index, chunk in enumerate(state["retrieved_chunks"], start=1):
        blocks.append(
            f"[{index}] {chunk['title']} "
            f"(source_id={chunk['source_id']})\n{chunk['text']}"
        )
    return "\n\n".join(blocks)


def _fallback_answer(state: AgentState) -> str:
    profile = state["profile"]
    if not profile:
        return "我还没有找到这个角色的资料，暂时无法回答。"

    context = _format_context(state)
    if not state["context_sufficient"]:
        return (
            f"我可以先基于目前资料谨慎回答：关于“{state['user_message']}”，"
            f"现有知识库里还没有足够直接的材料。{profile['name']} 的资料目前主要指向"
            f"这些关键词：{', '.join(profile['values'])}。你可以换成更具体的问题，"
            "例如询问某个活动、作品、方法论或社区价值观。"
        )

    return (
        f"基于当前资料，{profile['name']} 的实践可以理解为一种围绕"
        f"{', '.join(profile['values'][:3])}展开的社区探索。\n\n"
        f"{context}\n\n"
        "上面是原型阶段的资料驱动回答。配置 `OPENAI_API_KEY` 后，这里会切换为模型生成的自然对话。"
    )


def _llm_answer(state: AgentState) -> str:
    if not settings.openai_api_key:
        return _fallback_answer(state)

    try:
        from langchain_core.messages import HumanMessage, SystemMessage
        from langchain_openai import ChatOpenAI
    except ImportError:
        return _fallback_answer(state)

    profile = state["profile"]
    if not profile:
        return "我还没有找到这个角色的资料，暂时无法回答。"

    llm_kwargs = {
        "model": settings.openai_chat_model,
        "api_key": settings.openai_api_key,
    }
    if settings.openai_url:
        llm_kwargs["base_url"] = settings.openai_url

    llm = ChatOpenAI(**llm_kwargs)
    system = SYSTEM_TEMPLATE.format(
        name=profile["name"],
        role=profile["role"],
        bio=profile["bio"],
        values="、".join(profile["values"]),
        tone=profile["tone"],
        boundaries="\n".join(f"- {item}" for item in profile["boundaries"]),
    )
    user = ANSWER_TEMPLATE.format(
        question=state["user_message"],
        context=_format_context(state),
        context_sufficient="是" if state["context_sufficient"] else "否",
    )
    response = llm.invoke([SystemMessage(content=system), HumanMessage(content=user)])
    return str(response.content)


def generate_answer(state: AgentState) -> AgentState:
    answer = _llm_answer(state)
    return {**state, "answer": answer}
