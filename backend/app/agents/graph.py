from langgraph.graph import END, START, StateGraph

from app.agents.nodes.citations import attach_citations
from app.agents.nodes.generate_answer import generate_answer
from app.agents.nodes.judge_context import judge_context_sufficiency
from app.agents.nodes.load_profile import load_agent_profile
from app.agents.nodes.retrieve_context import retrieve_context
from app.agents.nodes.save_conversation import save_conversation
from app.agents.state import AgentState


def build_agent_graph():
    graph = StateGraph(AgentState)

    graph.add_node("load_agent_profile", load_agent_profile)
    graph.add_node("retrieve_context", retrieve_context)
    graph.add_node("judge_context_sufficiency", judge_context_sufficiency)
    graph.add_node("generate_answer", generate_answer)
    graph.add_node("attach_citations", attach_citations)
    graph.add_node("save_conversation", save_conversation)

    graph.add_edge(START, "load_agent_profile")
    graph.add_edge("load_agent_profile", "retrieve_context")
    graph.add_edge("retrieve_context", "judge_context_sufficiency")
    graph.add_edge("judge_context_sufficiency", "generate_answer")
    graph.add_edge("generate_answer", "attach_citations")
    graph.add_edge("attach_citations", "save_conversation")
    graph.add_edge("save_conversation", END)

    return graph.compile()


agent_graph = build_agent_graph()

