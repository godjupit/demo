from app.agents.state import AgentState
from app.db.conversations import upsert_conversation


def save_conversation(state: AgentState) -> AgentState:
    messages = [
        *state["messages"],
        {"role": "user", "content": state["user_message"]},
        {"role": "assistant", "content": state["answer"] or ""},
    ]
    upsert_conversation(
        thread_id=state["thread_id"],
        user_id=state["user_id"],
        agent_id=state["agent_id"],
        messages=messages,
    )
    return {**state, "messages": messages}
