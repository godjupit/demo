from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.knowledge.pgvector_store import list_people_with_counts, retrieve_pgvector


router = APIRouter(tags=["rag"])


class RagSearchRequest(BaseModel):
    query: str = Field(..., min_length=1)
    person_id: str | None = None
    limit: int = Field(default=5, ge=1, le=12)


class RagChunkResponse(BaseModel):
    chunk_id: str
    source_id: str
    title: str
    text: str
    score: float
    metadata: dict


@router.get("/rag/people")
def rag_people() -> list[dict]:
    return list_people_with_counts()


@router.post("/rag/search", response_model=list[RagChunkResponse])
def rag_search(request: RagSearchRequest) -> list[RagChunkResponse]:
    return retrieve_pgvector(
        query=request.query,
        person_id=request.person_id,
        limit=request.limit,
    )
