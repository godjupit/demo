from typing import Optional, TypedDict


class RoundtableSpeaker(TypedDict):
    speaker_id: str
    name: str
    role: str
    perspective: str
    style: str
    location: str
    map_x: int
    map_y: int
    latitude: float
    longitude: float


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
