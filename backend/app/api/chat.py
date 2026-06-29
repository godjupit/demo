from typing import Optional
from uuid import uuid4

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.agents.graph import agent_graph
from app.agents.state import ChatMessage, Citation


router = APIRouter(tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    agent_id: str = "xiu_sibianxing"
    thread_id: Optional[str] = None
    user_id: Optional[str] = None
    messages: list[ChatMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    thread_id: str
    agent_id: str
    answer: str
    citations: list[Citation]
    related_nodes: list[str]
    context_sufficient: bool


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    thread_id = request.thread_id or str(uuid4())
    state = agent_graph.invoke(
        {
            "thread_id": thread_id,
            "user_id": request.user_id,
            "agent_id": request.agent_id,
            "user_message": request.message,
            "messages": request.messages,
            "profile": None,
            "retrieved_chunks": [],
            "context_sufficient": False,
            "answer": None,
            "citations": [],
            "related_nodes": [],
        }
    )

    return ChatResponse(
        thread_id=state["thread_id"],
        agent_id=state["agent_id"],
        answer=state["answer"] or "",
        citations=state["citations"],
        related_nodes=state["related_nodes"],
        context_sufficient=state["context_sufficient"],
    )

