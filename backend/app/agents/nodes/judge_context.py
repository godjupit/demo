from app.agents.state import AgentState


def judge_context_sufficiency(state: AgentState) -> AgentState:
    chunks = state["retrieved_chunks"]
    sufficient = bool(chunks) and chunks[0]["score"] > 0.08
    return {**state, "context_sufficient": sufficient}

