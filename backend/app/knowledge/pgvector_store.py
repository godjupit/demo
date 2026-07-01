from typing import Any

from psycopg.types.json import Jsonb

from app.agents.state import RetrievedChunk
from app.db.connection import db_connection
from app.knowledge.chunk import chunk_text
from app.knowledge.embeddings import embed_text, vector_literal


def upsert_source_with_chunks(
    *,
    source_id: str,
    title: str,
    source_type: str,
    person_id: str,
    content: str,
    metadata: dict[str, Any],
    chunk_size: int = 900,
    chunk_overlap: int = 160,
) -> int:
    chunks = chunk_text(content, size=chunk_size, overlap=chunk_overlap)
    with db_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO sources (id, title, source_type, person_id, content, metadata)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT (id)
                DO UPDATE SET
                  title = EXCLUDED.title,
                  source_type = EXCLUDED.source_type,
                  person_id = EXCLUDED.person_id,
                  content = EXCLUDED.content,
                  metadata = EXCLUDED.metadata
                """,
                (source_id, title, source_type, person_id, content, Jsonb(metadata)),
            )
            cursor.execute("DELETE FROM chunks WHERE source_id = %s", (source_id,))

            for index, chunk in enumerate(chunks):
                chunk_id = f"{source_id}:{index:04d}"
                embedding = embed_text(chunk)
                chunk_metadata = {
                    **metadata,
                    "chunk_index": index,
                    "chunk_count": len(chunks),
                }
                cursor.execute(
                    """
                    INSERT INTO chunks
                      (id, source_id, person_id, text, embedding, metadata)
                    VALUES
                      (%s, %s, %s, %s, %s::vector, %s)
                    """,
                    (
                        chunk_id,
                        source_id,
                        person_id,
                        chunk,
                        vector_literal(embedding),
                        Jsonb(chunk_metadata),
                    ),
                )
        connection.commit()
    return len(chunks)


def retrieve_pgvector(
    *,
    query: str,
    person_id: str | None = None,
    limit: int = 5,
) -> list[RetrievedChunk]:
    query_embedding = vector_literal(embed_text(query))
    params: list[Any] = [query_embedding]
    person_filter = ""
    if person_id:
        person_filter = "WHERE chunks.person_id = %s"
        params.append(person_id)
    params.append(limit)

    with db_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT
                  chunks.id AS chunk_id,
                  chunks.source_id,
                  sources.title,
                  sources.url,
                  chunks.text,
                  chunks.metadata,
                  1 - (chunks.embedding <=> %s::vector) AS score
                FROM chunks
                JOIN sources ON sources.id = chunks.source_id
                {person_filter}
                ORDER BY chunks.embedding <=> %s::vector
                LIMIT %s
                """,
                [*params[:-1], query_embedding, params[-1]]
                if person_id
                else [query_embedding, query_embedding, limit],
            )
            rows = cursor.fetchall()

    return [
        {
            "chunk_id": row["chunk_id"],
            "source_id": row["source_id"],
            "title": row["title"],
            "text": row["text"],
            "score": float(row["score"] or 0.0),
            "metadata": {**(row["metadata"] or {}), "url": row["url"]},
        }
        for row in rows
    ]


def list_people_with_counts() -> list[dict[str, Any]]:
    with db_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                  sources.person_id,
                  max(sources.title) AS title,
                  count(DISTINCT sources.id) AS source_count,
                  count(chunks.id) AS chunk_count
                FROM sources
                LEFT JOIN chunks ON chunks.source_id = sources.id
                GROUP BY sources.person_id
                ORDER BY sources.person_id
                """
            )
            rows = cursor.fetchall()
    return [dict(row) for row in rows]
