from app.agents.state import AgentState


def save_conversation(state: AgentState) -> AgentState:
    messages = [
        *state["messages"],
        {"role": "user", "content": state["user_message"]},
        {"role": "assistant", "content": state["answer"] or ""},
    ]
    return {**state, "messages": messages}

