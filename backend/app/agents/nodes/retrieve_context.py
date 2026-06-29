from app.agents.state import AgentState
from app.knowledge.retriever import retrieve


def retrieve_context(state: AgentState) -> AgentState:
    chunks = retrieve(agent_id=state["agent_id"], query=state["user_message"], limit=5)
    related_nodes = sorted(
        {
            tag
            for chunk in chunks
            for tag in chunk.get("metadata", {}).get("tags", [])
        }
    )
    return {**state, "retrieved_chunks": chunks, "related_nodes": related_nodes}

