from app.agents.state import AgentState, Citation


def attach_citations(state: AgentState) -> AgentState:
    citations: list[Citation] = []
    seen: set[str] = set()

    for chunk in state["retrieved_chunks"]:
        source_id = chunk["source_id"]
        if source_id in seen:
            continue
        seen.add(source_id)
        citations.append(
            {
                "source_id": source_id,
                "title": chunk["title"],
                "url": chunk["metadata"].get("url"),
                "quote": chunk["text"][:160],
            }
        )

    return {**state, "citations": citations}

