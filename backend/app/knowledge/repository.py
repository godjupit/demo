import json
from functools import lru_cache
from pathlib import Path
from typing import Any

from app.agents.state import AgentProfile, RetrievedChunk
from app.knowledge.chunk import chunk_text


DATA_DIR = Path(__file__).resolve().parents[2] / "data"


@lru_cache(maxsize=32)
def load_profile(agent_id: str) -> AgentProfile:
    path = DATA_DIR / "agents" / agent_id / "profile.json"
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


@lru_cache(maxsize=32)
def load_chunks(agent_id: str) -> list[RetrievedChunk]:
    source_dir = DATA_DIR / "sources" / agent_id
    chunks: list[RetrievedChunk] = []

    for source_path in sorted(source_dir.glob("*.md")):
        metadata = _parse_frontmatter(source_path.read_text(encoding="utf-8"))
        body = metadata.pop("body")
        source_id = metadata.get("source_id", source_path.stem)
        title = metadata.get("title", source_path.stem)

        for index, text in enumerate(chunk_text(body)):
            chunks.append(
                {
                    "chunk_id": f"{source_id}:{index}",
                    "source_id": source_id,
                    "title": title,
                    "text": text,
                    "score": 0.0,
                    "metadata": metadata,
                }
            )

    return chunks


def _parse_frontmatter(raw: str) -> dict[str, Any]:
    if not raw.startswith("---"):
        return {"body": raw}

    parts = raw.split("---", 2)
    if len(parts) < 3:
        return {"body": raw}

    header = parts[1]
    body = parts[2].strip()
    metadata: dict[str, Any] = {"body": body}

    for line in header.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip()
        if value.startswith("[") and value.endswith("]"):
            metadata[key] = [
                item.strip().strip('"').strip("'")
                for item in value[1:-1].split(",")
                if item.strip()
            ]
        else:
            metadata[key] = value.strip('"').strip("'")

    return metadata

