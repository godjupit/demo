from typing import Any, Optional

from typing_extensions import TypedDict


class ChatMessage(TypedDict):
    role: str
    content: str


class Citation(TypedDict):
    source_id: str
    title: str
    url: Optional[str]
    quote: Optional[str]


class RetrievedChunk(TypedDict):
    chunk_id: str
    source_id: str
    title: str
    text: str
    score: float
    metadata: dict[str, Any]


class AgentProfile(TypedDict):
    agent_id: str
    name: str
    role: str
    bio: str
    values: list[str]
    tone: str
    boundaries: list[str]


class AgentState(TypedDict):
    thread_id: str
    user_id: Optional[str]
    agent_id: str
    user_message: str
    messages: list[ChatMessage]
    profile: Optional[AgentProfile]
    retrieved_chunks: list[RetrievedChunk]
    context_sufficient: bool
    answer: Optional[str]
    citations: list[Citation]
    related_nodes: list[str]
