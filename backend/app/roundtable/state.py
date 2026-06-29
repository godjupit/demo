from typing import Optional, TypedDict


class RoundtableSpeaker(TypedDict):
    speaker_id: str
    name: str
    role: str
    perspective: str
    style: str


class RoundtableTurn(TypedDict):
    speaker_id: str
    speaker_name: str
    role: str
    content: str


class RoundtableState(TypedDict):
    thread_id: str
    topic: str
    user_id: Optional[str]
    moderator_plan: str
    turns: list[RoundtableTurn]
    summary: str

