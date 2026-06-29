from app.agents.state import AgentState
from app.knowledge.repository import load_profile


def load_agent_profile(state: AgentState) -> AgentState:
    profile = load_profile(state["agent_id"])
    return {**state, "profile": profile}

