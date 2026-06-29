import math
import re
from collections import Counter

from app.agents.state import RetrievedChunk
from app.knowledge.repository import load_chunks


TOKEN_PATTERN = re.compile(r"[\w\u4e00-\u9fff]+")
CHINESE_PATTERN = re.compile(r"[\u4e00-\u9fff]")


def retrieve(agent_id: str, query: str, limit: int = 5) -> list[RetrievedChunk]:
    query_vector = _vectorize(query)
    scored: list[RetrievedChunk] = []

    for chunk in load_chunks(agent_id):
        score = _cosine(query_vector, _vectorize(chunk["text"]))
        if score <= 0:
            continue
        scored.append({**chunk, "score": score})

    return sorted(scored, key=lambda item: item["score"], reverse=True)[:limit]


def _vectorize(text: str) -> Counter[str]:
    tokens: list[str] = []
    for raw_token in TOKEN_PATTERN.findall(text.lower()):
        chinese_chars = CHINESE_PATTERN.findall(raw_token)
        if chinese_chars:
            tokens.extend(chinese_chars)
            tokens.extend(
                "".join(chinese_chars[index : index + 2])
                for index in range(len(chinese_chars) - 1)
            )
        else:
            tokens.append(raw_token)
    return Counter(tokens)


def _cosine(left: Counter[str], right: Counter[str]) -> float:
    if not left or not right:
        return 0.0

    common = set(left) & set(right)
    dot = sum(left[token] * right[token] for token in common)
    left_norm = math.sqrt(sum(value * value for value in left.values()))
    right_norm = math.sqrt(sum(value * value for value in right.values()))
    if left_norm == 0 or right_norm == 0:
        return 0.0
    return dot / (left_norm * right_norm)
