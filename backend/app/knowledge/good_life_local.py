import math
import re
from collections import Counter
from pathlib import Path

from app.agents.state import RetrievedChunk


ROOT = Path(__file__).resolve().parents[3]
GOOD_LIFE_DIR = ROOT / "knowledge-base" / "cleaned" / "good-life"
TOKEN_PATTERN = re.compile(r"[\w\u4e00-\u9fff]+")
CHINESE_PATTERN = re.compile(r"[\u4e00-\u9fff]")


def retrieve_good_life_chunks(
    *,
    person_id: str,
    query: str,
    limit: int = 4,
) -> list[RetrievedChunk]:
    path = GOOD_LIFE_DIR / f"{person_id}.md"
    if not path.exists():
        return []

    text = path.read_text(encoding="utf-8", errors="replace")
    query_vector = _vectorize(query)
    chunks = _split_chunks(text)
    scored: list[RetrievedChunk] = []

    for index, chunk in enumerate(chunks):
        score = _cosine(query_vector, _vectorize(chunk["text"]))
        if score <= 0:
            continue
        scored.append(
            {
                "chunk_id": f"good-life:{person_id}:{index:04d}",
                "source_id": f"good-life:{person_id}",
                "title": chunk["title"],
                "text": chunk["text"],
                "score": score,
                "metadata": {
                    "memberId": person_id,
                    "dimension": chunk["dimension"],
                    "sectionTitle": chunk["section"],
                    "sourceFile": str(path.relative_to(ROOT)).replace("\\", "/"),
                    "source_type": "good_life_cleaned_local",
                },
            }
        )

    return sorted(scored, key=lambda item: item["score"], reverse=True)[:limit]


def _split_chunks(text: str) -> list[dict[str, str]]:
    current_dimension = "overview"
    current_section = "概览"
    chunks: list[dict[str, str]] = []
    buffer: list[str] = []

    def flush() -> None:
        content = "\n".join(buffer).strip()
        if len(content) < 40:
            return
        chunks.append(
            {
                "dimension": current_dimension,
                "section": current_section,
                "title": f"良好生活三角 / {current_section}",
                "text": content,
            }
        )

    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith("## "):
            flush()
            buffer = []
            current_section = stripped.lstrip("# ").strip()
            if "Create Well" in stripped or "创造力" in stripped:
                current_dimension = "create"
            elif "Live Well" in stripped or "身心安顿" in stripped:
                current_dimension = "live"
            elif "Benefit Well" in stripped or "公共性" in stripped:
                current_dimension = "benefit"
            else:
                current_dimension = "overview"
            continue
        if stripped.startswith("### "):
            flush()
            buffer = []
            current_section = stripped.lstrip("# ").strip()
            continue
        buffer.append(line)

    flush()
    return chunks


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
