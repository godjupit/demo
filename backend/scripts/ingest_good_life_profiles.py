import json
import re
from pathlib import Path

from app.knowledge.pgvector_store import upsert_source_with_chunks


ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "knowledge-base" / "manifest.json"

DIMENSION_PATTERNS = [
    ("create", r"##\s+.*(?:创造力|Create Well)"),
    ("live", r"##\s+.*(?:身心安顿|Live Well)"),
    ("benefit", r"##\s+.*(?:公共性|Benefit Well)"),
]


def split_dimensions(text: str) -> dict[str, str]:
    starts: list[tuple[str, int]] = []
    for key, pattern in DIMENSION_PATTERNS:
        match = re.search(pattern, text, flags=re.IGNORECASE)
        if match:
            starts.append((key, match.start()))
    starts.sort(key=lambda item: item[1])

    blocks: dict[str, str] = {}
    for index, (key, start) in enumerate(starts):
        end = starts[index + 1][1] if index + 1 < len(starts) else len(text)
        blocks[key] = text[start:end].strip()
    return blocks


def main() -> None:
    if not MANIFEST.exists():
        raise SystemExit(f"Manifest not found: {MANIFEST}")

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    total_sources = 0
    total_chunks = 0

    for member in manifest.get("members", []):
        member_id = member["memberId"]
        member_name = member["name"]
        cleaned_path = ROOT / member["cleanedFile"]
        if not cleaned_path.exists():
            print(f"SKIP {member_id}: cleaned file not found")
            continue

        text = cleaned_path.read_text(encoding="utf-8")
        blocks = split_dimensions(text)
        for dimension, content in blocks.items():
            if not content.strip():
                continue
            source_id = f"good-life:{member_id}:{dimension}"
            chunks = upsert_source_with_chunks(
                source_id=source_id,
                title=f"{member_name} 良好生活三角 · {dimension}",
                source_type="good_life_cleaned",
                person_id=member_id,
                content=content,
                metadata={
                    "memberId": member_id,
                    "memberName": member_name,
                    "dimension": dimension,
                    "sourceFile": member["cleanedFile"],
                    "sourceLabels": member.get("sourceFiles", []),
                    "verificationStatus": "partial",
                },
            )
            total_sources += 1
            total_chunks += chunks
            print(f"UPSERT {member_id}/{dimension}: {chunks} chunks")

    print(f"Done. sources={total_sources}, chunks={total_chunks}")


if __name__ == "__main__":
    main()
