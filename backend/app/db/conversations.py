from typing import Any

import psycopg
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb

from app.core.settings import settings
from app.db.connection import db_connection


def _connect():
    return psycopg.connect(settings.database_url, row_factory=dict_row)


def load_conversation(thread_id: str, agent_id: str) -> dict[str, Any] | None:
    try:
        with db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT thread_id, user_id, agent_id, messages, created_at, updated_at
                    FROM conversations
                    WHERE thread_id = %s AND agent_id = %s
                    LIMIT 1
                    """,
                    (thread_id, agent_id),
                )
                row = cursor.fetchone()
    except psycopg.Error:
        return None
    return dict(row) if row else None


def upsert_conversation(
    *,
    thread_id: str,
    agent_id: str,
    messages: list[dict[str, Any]],
    user_id: str | None = None,
) -> None:
    try:
        with db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO conversations (thread_id, user_id, agent_id, messages)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (thread_id, agent_id)
                    DO UPDATE SET
                      user_id = COALESCE(EXCLUDED.user_id, conversations.user_id),
                      messages = EXCLUDED.messages,
                      updated_at = now()
                    """,
                    (thread_id, user_id, agent_id, Jsonb(messages)),
                )
    except psycopg.Error:
        return None
