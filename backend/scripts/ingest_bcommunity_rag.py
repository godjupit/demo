import json
import re
from pathlib import Path
from typing import Any

from app.knowledge.pgvector_store import upsert_source_with_chunks


ROOT = Path(__file__).resolve().parents[2]
DATA_ROOT = ROOT / "data"
SUPPORTED_EXTENSIONS = {".md", ".txt", ".pdf", ".docx"}


def _slug(value: str) -> str:
    value = re.sub(r"[^0-9A-Za-z_\-\u4e00-\u9fff]+", "_", value)
    return re.sub(r"_+", "_", value).strip("_").lower()[:180]


def _load_manifest(person_dir: Path) -> dict[str, Any]:
    path = person_dir / "_manifest.json"
    if not path.exists():
        return {
            "user_id": person_dir.name,
            "person_id": person_dir.name,
            "name": person_dir.name,
        }
    return json.loads(path.read_text(encoding="utf-8"))


def _iter_source_files(person_dir: Path) -> list[Path]:
    files = []
    for path in sorted(person_dir.rglob("*")):
        if not path.is_file():
            continue
        if path.name.startswith("_"):
            continue
        if path.suffix.lower() in SUPPORTED_EXTENSIONS:
            files.append(path)
    return files


def _clean_text(text: str) -> str:
    text = re.sub(r"\A---\s.*?\s---", "", text, flags=re.DOTALL)
    text = re.sub(r"!\[[^\]]*]\([^)]*\)", "", text)
    text = re.sub(r"<img\b[^>]*>", "", text, flags=re.IGNORECASE)
    text = re.sub(r"data:image/[^)\s]+", "", text)
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"\[([^\]]+)]\([^)]*\)", r"\1", text)

    cleaned_lines: list[str] = []
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith(("![](", "![", "data:image")):
            continue
        if stripped in {"修四边形", "[[rect*]]repair"}:
            continue
        cleaned_lines.append(stripped)

    return "\n".join(cleaned_lines)


def _extract_documents(path: Path) -> list[tuple[str, int | None]]:
    extension = path.suffix.lower()
    if extension in {".md", ".txt"}:
        return [(_clean_text(path.read_text(encoding="utf-8", errors="replace")), None)]

    if extension == ".pdf":
        try:
            from pypdf import PdfReader
        except ImportError as exc:
            raise RuntimeError("Install pypdf to ingest PDF files.") from exc

        reader = PdfReader(str(path))
        pages = []
        for index, page in enumerate(reader.pages, start=1):
            pages.append((_clean_text(page.extract_text() or ""), index))
        return pages

    if extension == ".docx":
        try:
            from docx import Document
        except ImportError as exc:
            raise RuntimeError("Install python-docx to ingest DOCX files.") from exc

        document = Document(str(path))
        text = "\n".join(paragraph.text for paragraph in document.paragraphs)
        return [(_clean_text(text), None)]

    return []


def main() -> None:
    if not DATA_ROOT.exists():
        raise SystemExit(f"Data directory not found: {DATA_ROOT}")

    total_sources = 0
    total_chunks = 0
    skipped_files: list[str] = []

    for person_dir in sorted(path for path in DATA_ROOT.iterdir() if path.is_dir()):
        manifest = _load_manifest(person_dir)
        person_id = manifest.get("person_id") or manifest.get("user_id") or person_dir.name
        user_id = manifest.get("user_id") or person_id
        name = manifest.get("name") or person_id
        source_files = _iter_source_files(person_dir)

        if not source_files:
            print(f"SKIP {person_id}: no supported files")
            continue

        for source_path in source_files:
            relative_file = source_path.relative_to(person_dir)
            source_file = str(relative_file)
            root_relative_file = str(source_path.relative_to(ROOT))
            for content, page in _extract_documents(source_path):
                if not content.strip():
                    skipped_files.append(
                        f"{root_relative_file}{f'#page={page}' if page else ''}"
                    )
                    continue

                page_suffix = f":p{page:04d}" if page else ""
                source_id = f"bcommunity:{person_id}:{_slug(source_file)}{page_suffix}"
                title = f"{source_file}，第 {page} 页" if page else source_file
                metadata = {
                    "user_id": user_id,
                    "person_id": person_id,
                    "name": name,
                    "source_file": source_file,
                    "root_source_file": root_relative_file,
                    "page": page,
                    "source_ext": source_path.suffix.lower(),
                    "source_dir": manifest.get("source_dir", ""),
                }
                chunk_count = upsert_source_with_chunks(
                    source_id=source_id,
                    title=title,
                    source_type="bcommunity_raw_file",
                    person_id=person_id,
                    content=content,
                    metadata=metadata,
                )
                total_sources += 1
                total_chunks += chunk_count
                page_label = f" page={page}" if page else ""
                print(f"UPSERT {person_id}: {source_file}{page_label} ({chunk_count} chunks)")

    if skipped_files:
        print("Skipped empty files:")
        for file in skipped_files:
            print(f"- {file}")
    print(f"Done. sources={total_sources}, chunks={total_chunks}")


if __name__ == "__main__":
    main()
