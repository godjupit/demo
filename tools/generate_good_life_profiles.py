import json
import os
import re
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = Path(r"D:\作品集\SSIR\week4\良好生活三角")
CLEANED_DIR = ROOT / "knowledge-base" / "cleaned" / "good-life"
STRUCTURED_DIR = ROOT / "knowledge-base" / "structured"
FRONTEND_TS = ROOT / "frontend" / "lib" / "goodLifeProfiles.ts"
MANIFEST = ROOT / "knowledge-base" / "manifest.json"

FILE_TO_MEMBER = {
    "Arch 良好生活标准分类.md": "arch",
    "Luneurs 良好生活标准分类.md": "luneurs",
    "MUMO木墨 良好生活标准分类.md": "mumo",
    "Smart Air 良好生活标准分类.md": "smart_air",
    "乐天陶社 良好生活标准分类.md": "pottery_workshop",
    "二高表演 良好生活标准分类.md": "ergao_ben",
    "小黑 良好生活标准分类.md": "xiaohei",
    "廖智立 良好生活标准分类.md": "liao_zhili",
    "徐艺函 良好生活标准分类.md": "xu_yihan",
    "春潮Spring 良好生活标准分类.md": "spring_changzhou",
    "晨初 良好生活标准分类.md": "fang_chenchu",
    "朱璟茗 良好生活标准分类.md": "zhu_jingming",
    "水手俱乐部 良好生活标准分类.md": "sailor_club",
    "绣绣故事会 良好生活标准分类.md": "xiuxiu",
    "葛宇路 良好生活标准分类.md": "ge_yulu",
    "赵伊人 良好生活标准分类.md": "zhao_yiren",
    "阿久 良好生活标准分类.md": "rect_repair",
}

MEMBER_NAMES = {
    "arch": "Arch",
    "luneurs": "Luneurs",
    "mumo": "MUMO 木墨",
    "smart_air": "Smart Air / 聪明空气",
    "pottery_workshop": "乐天陶社",
    "ergao_ben": "二高 & Ben / 二高表演",
    "xiaohei": "小黑 / 漫画与手工艺",
    "liao_zhili": "廖智立 / Dweller、普罗托邦",
    "xu_yihan": "徐艺函 / 起风了社区",
    "spring_changzhou": "春潮 Spring / 长洲岛瑶寨",
    "fang_chenchu": "晨初 / 假杂志、boPOmofo",
    "zhu_jingming": "朱璟茗",
    "sailor_club": "水手俱乐部",
    "xiuxiu": "Ruifen & 不子 / 绣绣故事会",
    "ge_yulu": "葛宇路",
    "zhao_yiren": "赵伊人 / 定海桥互助社",
    "rect_repair": "阿久、天琦 / 修四边形",
}

CENTER_TEXT = {
    "arch": ("可持续供应链的蜂鸟行动", "从材料、供应链到商业选择的转向"),
    "luneurs": ("有机生长的日常快乐", "社区面包店作为慢速商业实践"),
    "mumo": ("耐用之物与克制生意", "用材料、时间和手艺回应消费"),
    "smart_air": ("人人负担得起的洁净空气", "用低成本硬件和开放知识回应公共健康"),
    "pottery_workshop": ("让工艺重新成为城市关系", "陶艺、市集、驻场与教育的地方连接"),
    "ergao_ben": ("南方身体与游牧现场", "以舞蹈、土俗和社区重新组织表演"),
    "xiaohei": ("怪兽世界里的手作连接", "用版画、T 恤和邻里抵抗城市孤独"),
    "liao_zhili": ("渐进式共同生活", "以共居、翻译和观察靠近日常基础设施"),
    "xu_yihan": ("照护劳动的公共化", "把家务、女性经验和陶瓷带入公共艺术"),
    "spring_changzhou": ("传统符号的当代转译", "在技术、青年社群和在地议题之间实验"),
    "fang_chenchu": ("业余者的长期主义", "用出版、植物、美食和城市行走降低艺术门槛"),
    "zhu_jingming": ("重新做人", "把精神健康经验转化为公共知识与写作"),
    "sailor_club": ("围绕玩的创造者社区", "以食物、材料和游戏连接日常经验"),
    "xiuxiu": ("刺绣作为共同叙事", "让手工劳动、身体实践与女性经验相互编织"),
    "ge_yulu": ("直接行动进入公共空间", "用日常动作显影制度与城市规则"),
    "zhao_yiren": ("在地互助与自我教育", "让社区关系、照护劳动和艺术行动彼此可见"),
    "rect_repair": ("Game as social fabric", "游戏作为社会连接的织造术"),
}

DIMENSIONS = [
    ("create", "创造力 / Create Well", "Create Well", r"##\s+.*(?:创造力|Create Well)"),
    ("live", "身心安顿 / Live Well", "Live Well", r"##\s+.*(?:身心安顿|Live Well)"),
    ("benefit", "公共性 / Benefit Well", "Benefit Well", r"##\s+.*(?:公共性|Benefit Well)"),
]


def read_text(path: Path) -> str:
    for encoding in ("utf-8-sig", "utf-8", "gb18030"):
        try:
            return repair_mojibake(path.read_text(encoding=encoding))
        except UnicodeDecodeError:
            continue
    return repair_mojibake(path.read_text(encoding="utf-8", errors="replace"))


def repair_mojibake(text: str) -> str:
    markers = ("鑹", "鍒", "涓", "鐨", "锛", "銆", "濂")
    if sum(text.count(marker) for marker in markers) < 8:
        return text
    try:
        repaired = text.encode("gb18030").decode("utf-8")
    except UnicodeError:
        return text

    original_cjk = len(re.findall(r"[\u4e00-\u9fff]", text))
    repaired_cjk = len(re.findall(r"[\u4e00-\u9fff]", repaired))
    original_markers = sum(text.count(marker) for marker in markers)
    repaired_markers = sum(repaired.count(marker) for marker in markers)
    if repaired_cjk >= original_cjk * 0.8 and repaired_markers < original_markers:
        return repaired
    return text


def strip_frontmatter(text: str) -> str:
    return re.sub(r"\A---\s.*?\s---\s*", "", text, flags=re.DOTALL)


def clean_markdown(text: str) -> str:
    text = text.replace("\ufeff", "")
    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text)
    text = re.sub(r"\[\[([^\]|]+)\|([^\]]+)]]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)]]", r"\1", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+\n", "\n", text)
    return text.strip() + "\n"


def split_dimensions(markdown: str) -> dict[str, str]:
    blocks: dict[str, str] = {}
    headings = list(re.finditer(r"^##\s+(.+)$", markdown, flags=re.MULTILINE))
    for index, heading in enumerate(headings):
        title = heading.group(1)
        key = None
        if re.search(r"创造力|Create Well", title, flags=re.IGNORECASE):
            key = "create"
        elif re.search(r"身心安顿|Live Well", title, flags=re.IGNORECASE):
            key = "live"
        elif re.search(r"公共性|Benefit Well", title, flags=re.IGNORECASE):
            key = "benefit"
        if not key:
            continue
        end = headings[index + 1].start() if index + 1 < len(headings) else len(markdown)
        blocks[key] = markdown[heading.start():end].strip()
    return blocks


def paragraph_lines(block: str) -> list[str]:
    lines = []
    for line in block.splitlines():
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith(("#", "---", "|")):
            continue
        if re.match(r"^\|[-:\s|]+$", stripped):
            continue
        lines.append(stripped)
    return lines


def plain_text(markdown: str) -> str:
    text = re.sub(r"`([^`]*)`", r"\1", markdown)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"^#+\s*", "", text)
    text = re.sub(r"^>\s*", "", text)
    text = re.sub(r"\[([^\]]+)]\([^)]*\)", r"\1", text)
    text = re.sub(r"\[\[([^\]|]+)\|([^\]]+)]]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)]]", r"\1", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def shorten(text: str, limit: int) -> str:
    text = plain_text(text)
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def extract_quotes(block: str) -> list[str]:
    quotes = []
    for line in block.splitlines():
        stripped = line.strip()
        if not stripped.startswith(">"):
            continue
        stripped = plain_text(stripped.lstrip("> "))
        if "良好生活三问" in stripped:
            continue
        if len(stripped) < 8:
            continue
        quotes.append(stripped)
    return list(dict.fromkeys(quotes))[:4]


def extract_subsections(block: str) -> list[tuple[str, str]]:
    matches = list(re.finditer(r"^###\s+(.+)$", block, flags=re.MULTILINE))
    sections = []
    for index, match in enumerate(matches):
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(block)
        title = plain_text(match.group(1))
        content = block[start:end].strip()
        sections.append((title, content))
    return sections


def normalize_for_dedup(text: str) -> str:
    text = plain_text(text).lower()
    return re.sub(r"[\s，。、“”‘’：:；;,.!?！？\-—|]+", "", text)


def split_title(title: str) -> tuple[str, str | None]:
    title = re.sub(r"^\d+(?:\.\d+)*\s*", "", plain_text(title))
    parts = re.split(r"[:：]", title, maxsplit=1)
    if len(parts) == 2:
        return parts[0].strip(), parts[1].strip()
    return title.strip(), None


def slugify(value: str, fallback: str) -> str:
    ascii_part = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    if ascii_part:
        return ascii_part[:48]
    return fallback


def classify_section(title: str, blocks: list[dict]) -> str:
    if any(block["type"] == "timeline" for block in blocks) or re.search(r"时间|年份|历程|timeline", title, re.I):
        return "timeline"
    if re.search(r"代表|作品|实践|案例", title):
        return "cases"
    if re.search(r"方法|原则|方法论", title):
        return "principles"
    if re.search(r"价值观|价值", title):
        return "values"
    if re.search(r"拒绝|边界|不做", title):
        return "boundary"
    if re.search(r"层次|关系", title):
        return "relation-levels"
    if re.search(r"公共|贡献", title):
        return "contribution"
    if any(block["type"] == "quote" for block in blocks) and len(blocks) <= 2:
        return "quote"
    return "narrative"


def is_table_separator(line: str) -> bool:
    return bool(re.match(r"^\|\s*[-:]+[-:\s|]*\|?$", line.strip()))


def parse_table(lines: list[str]) -> dict | None:
    rows = []
    for line in lines:
        if is_table_separator(line):
            continue
        cells = [plain_text(cell) for cell in line.strip().strip("|").split("|")]
        cells = [cell for cell in cells if cell]
        if cells:
            rows.append(cells)
    if len(rows) < 2:
        return None

    header, body = rows[0], rows[1:]
    if len(header) == 2:
        return {
            "type": "key-value",
            "items": [{"label": row[0], "value": row[1]} for row in body if len(row) >= 2],
        }

    header_text = "".join(header)
    if "#" in header_text or "原则" in header_text or "方法" in header_text:
        return {
            "type": "method-list",
            "items": [
                {
                    "index": row[0] if row and re.search(r"\d", row[0]) else f"{index:02d}",
                    "title": row[1] if len(row) > 1 else row[0],
                    "description": row[-1] if len(row) > 2 else "",
                }
                for index, row in enumerate(body, start=1)
                if row
            ],
        }

    return {
        "type": "case-cards",
        "items": [
            {
                "title": row[0],
                "meta": row[1:-1],
                "description": row[-1] if len(row) > 1 else "",
            }
            for row in body
            if row
        ],
    }


def parse_timeline(text: str) -> dict | None:
    items = []
    for line in text.splitlines():
        stripped = plain_text(line)
        match = re.match(r"^(\d{4}(?:[.\-/]\d{1,2})?|\d{4}\s*年?)\s*(?:[-—–─┬┼]+|：|:|\s{2,})\s*(.+)$", stripped)
        if match:
            title = re.sub(r"^[─┬┼├└│\s-]+", "", match.group(2)).strip()
            if title:
                items.append({"time": match.group(1).strip(), "title": title})
    if len(items) >= 2:
        return {"type": "timeline", "items": items}
    return None


def parse_structured_code(text: str) -> dict | None:
    timeline = parse_timeline(text)
    if timeline:
        return timeline

    items = []
    current = None
    for line in text.splitlines():
        stripped = plain_text(line)
        level_match = re.match(r"^(层次\s*\d+|第[一二三四五六七八九十]+层)[：:]\s*(.+)$", stripped)
        if level_match:
            current = {"label": level_match.group(1), "value": level_match.group(2)}
            items.append(current)
            continue
        detail_match = re.match(r"^[└├│\s-]+(.+)$", stripped)
        if detail_match and current:
            current["value"] = f"{current['value']}：{detail_match.group(1).strip()}"
    if len(items) >= 2:
        return {"type": "key-value", "items": items}
    return None


def flush_paragraph(buffer: list[str], blocks: list[dict], seen: set[str]) -> None:
    if not buffer:
        return
    paragraphs = [plain_text("\n".join(buffer))]
    buffer.clear()
    paragraphs = [item for item in paragraphs if item]
    unique = []
    for paragraph in paragraphs:
        key = normalize_for_dedup(paragraph)
        if key and key not in seen:
            seen.add(key)
            unique.append(paragraph)
    if unique:
        blocks.append({"type": "paragraph", "paragraphs": unique})


def append_text_block(blocks: list[dict], seen: set[str], block: dict) -> None:
    text = json.dumps(block, ensure_ascii=False, sort_keys=True)
    key = normalize_for_dedup(text)
    if key and key in seen:
        return
    if key:
        seen.add(key)
    blocks.append(block)


def parse_content_blocks(markdown: str) -> list[dict]:
    lines = markdown.strip().splitlines()
    blocks: list[dict] = []
    paragraph_buffer: list[str] = []
    seen: set[str] = set()
    index = 0

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()
        if not stripped:
            flush_paragraph(paragraph_buffer, blocks, seen)
            index += 1
            continue

        if stripped.startswith("```"):
            flush_paragraph(paragraph_buffer, blocks, seen)
            code_lines = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code_lines.append(lines[index])
                index += 1
            index += 1
            code_text = "\n".join(code_lines).strip()
            structured_code = parse_structured_code(code_text)
            append_text_block(blocks, seen, structured_code or {"type": "preformatted", "text": code_text})
            continue

        if stripped.startswith("|"):
            flush_paragraph(paragraph_buffer, blocks, seen)
            table_lines = []
            while index < len(lines) and lines[index].strip().startswith("|"):
                table_lines.append(lines[index])
                index += 1
            table = parse_table(table_lines)
            if table:
                append_text_block(blocks, seen, table)
            continue

        if stripped.startswith(">"):
            flush_paragraph(paragraph_buffer, blocks, seen)
            quote_lines = []
            while index < len(lines) and lines[index].strip().startswith(">"):
                quote_lines.append(plain_text(lines[index].strip().lstrip("> ")))
                index += 1
            quote_text = " ".join(item for item in quote_lines if item)
            if quote_text and "良好生活三问" not in quote_text:
                append_text_block(blocks, seen, {"type": "quote", "text": quote_text})
            continue

        if re.match(r"^[-*+]\s+", stripped):
            flush_paragraph(paragraph_buffer, blocks, seen)
            items = []
            while index < len(lines) and re.match(r"^[-*+]\s+", lines[index].strip()):
                items.append(plain_text(re.sub(r"^[-*+]\s+", "", lines[index].strip())))
                index += 1
            block_type = "tag-list" if items and all(len(item) <= 18 for item in items) else "bullet-list"
            append_text_block(blocks, seen, {"type": block_type, "items": items})
            continue

        if re.match(r"^\d+[.)]\s+", stripped):
            flush_paragraph(paragraph_buffer, blocks, seen)
            items = []
            while index < len(lines) and re.match(r"^\d+[.)]\s+", lines[index].strip()):
                items.append(plain_text(re.sub(r"^\d+[.)]\s+", "", lines[index].strip())))
                index += 1
            append_text_block(blocks, seen, {"type": "ordered-list", "items": items})
            continue

        paragraph_buffer.append(stripped)
        index += 1

    flush_paragraph(paragraph_buffer, blocks, seen)
    return blocks


def dimension_intro(block: str, sections: list[dict]) -> str:
    prelude = re.split(r"^###\s+", block, maxsplit=1, flags=re.MULTILINE)[0]
    candidates = paragraph_lines(prelude)
    for candidate in candidates:
        text = plain_text(candidate)
        if "良好生活" in text and len(text) < 80:
            continue
        if len(text) >= 18:
            return shorten(text, 110)

    for section in sections:
        for content_block in section.get("blocks", []):
            if content_block.get("type") == "paragraph":
                paragraph = content_block["paragraphs"][0]
                first_sentence = re.split(r"(?<=[。！？])", paragraph, maxsplit=1)[0]
                intro = shorten(first_sentence or paragraph, 110)
                if normalize_for_dedup(intro) != normalize_for_dedup(paragraph):
                    return intro
    return ""


def build_sections(block: str) -> list[dict]:
    subsections = extract_subsections(block)
    if not subsections:
        title = "核心内容"
        content = re.sub(r"^##\s+.+$", "", block, count=1, flags=re.MULTILINE).strip()
        subsections = [(title, content)]

    sections = []
    for index, (raw_title, content) in enumerate(subsections, start=1):
        title, subtitle = split_title(raw_title)
        content_blocks = parse_content_blocks(content)
        sections.append(
            {
                "id": slugify(title + (subtitle or ""), f"section-{index}"),
                "title": title,
                "subtitle": subtitle,
                "kind": classify_section(raw_title, content_blocks),
                "blocks": content_blocks,
            }
        )
    return sections


def build_dimension(key: str, block: str) -> dict:
    meta = next(item for item in DIMENSIONS if item[0] == key)
    sections = build_sections(block)
    intro = dimension_intro(block, sections)

    return {
        "key": key,
        "title": meta[1],
        "subtitle": meta[2],
        "intro": intro,
        "sections": sections,
        "strength": "★★★★★" if block.strip() else "资料尚未整理",
    }


def build_profile(member_id: str, source_file: str, markdown: str) -> dict:
    cleaned = clean_markdown(markdown)
    body = strip_frontmatter(cleaned)
    blocks = split_dimensions(body)
    center_text, center_subtitle = CENTER_TEXT.get(
        member_id, ("良好生活三角", "该成员的良好生活内容")
    )
    dimensions = []
    for key, title, subtitle, _pattern in DIMENSIONS:
        block = blocks.get(key, "")
        if block:
            dimensions.append(build_dimension(key, block))
        else:
            dimensions.append(
                {
                    "key": key,
                    "title": title,
                    "subtitle": subtitle,
                    "intro": "该维度的资料尚未整理。",
                    "sections": [],
                    "strength": "资料尚未整理",
                }
            )

    return {
        "id": member_id,
        "profile": {"name": MEMBER_NAMES.get(member_id, member_id)},
        "triangleTitle": f"{MEMBER_NAMES.get(member_id, member_id)}的良好生活三角",
        "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
        "centerText": center_text,
        "centerSubtitle": center_subtitle,
        "dimensions": dimensions,
        "aiPersona": {
            "title": f"和 {MEMBER_NAMES.get(member_id, member_id)} 对话",
            "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
            "initialMessage": f"你好，我是基于{MEMBER_NAMES.get(member_id, member_id)}公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
            "inputPlaceholder": f"问 {MEMBER_NAMES.get(member_id, member_id)} 一个问题",
        },
        "knowledgeBase": {
            "documentPaths": [f"knowledge-base/cleaned/good-life/{member_id}.md"],
            "sourceLabels": [source_file],
            "lastUpdated": str(date.today()),
        },
    }


def ts_literal(value) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def main() -> None:
    CLEANED_DIR.mkdir(parents=True, exist_ok=True)
    STRUCTURED_DIR.mkdir(parents=True, exist_ok=True)

    profiles = {}
    manifest_members = []
    unmatched = []
    use_cleaned_source = os.environ.get("GOOD_LIFE_SOURCE") == "cleaned"

    source_paths = sorted(CLEANED_DIR.glob("*.md")) if use_cleaned_source else sorted(SOURCE_DIR.glob("*.md"))

    for path in source_paths:
        member_id = path.stem if use_cleaned_source else FILE_TO_MEMBER.get(path.name)
        if not member_id:
            unmatched.append(str(path))
            continue

        raw = read_text(path)
        cleaned = clean_markdown(raw)
        cleaned_path = CLEANED_DIR / f"{member_id}.md"
        cleaned_path.write_text(cleaned, encoding="utf-8")

        profile = build_profile(member_id, path.name, cleaned)
        profiles[member_id] = profile
        member_structured_path = STRUCTURED_DIR / f"{member_id}.json"
        member_structured_path.write_text(
            json.dumps(profile, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        manifest_members.append(
            {
                "memberId": member_id,
                "name": MEMBER_NAMES.get(member_id, member_id),
                "sourceFiles": [str(path)],
                "cleanedFile": str(cleaned_path.relative_to(ROOT)).replace("\\", "/"),
                "structuredFile": str(member_structured_path.relative_to(ROOT)).replace("\\", "/"),
                "status": "complete",
                "dimensions": {
                    dim["key"]: bool(dim.get("sections"))
                    for dim in profile["dimensions"]
                },
                "warnings": [],
            }
        )

    structured = {"profiles": profiles}
    (STRUCTURED_DIR / "good-life-profiles.json").write_text(
        json.dumps(structured, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    MANIFEST.write_text(
        json.dumps(
            {
                "members": manifest_members,
                "unmatchedFiles": unmatched,
                "ambiguousFiles": [],
                "unsupportedFiles": [],
                "lastUpdated": str(date.today()),
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    FRONTEND_TS.write_text(
        """import type { MemberBasicInfo } from "@/lib/memberBasicInfo";

export type DimensionKey = "create" | "live" | "benefit";

export type ContentBlock =
  | { type: "paragraph"; paragraphs: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "bullet-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "tag-list"; items: string[] }
  | { type: "key-value"; items: Array<{ label: string; value: string }> }
  | { type: "case-cards"; items: Array<{ title: string; meta?: string[]; description: string }> }
  | { type: "method-list"; items: Array<{ index: string; title: string; description?: string }> }
  | { type: "timeline"; items: Array<{ time: string; title: string; description?: string }> }
  | { type: "preformatted"; text: string };

export type GoodLifeSection = {
  id: string;
  title: string;
  subtitle?: string | null;
  kind:
    | "narrative"
    | "quote"
    | "comparison"
    | "cases"
    | "principles"
    | "timeline"
    | "values"
    | "relation-levels"
    | "boundary"
    | "contribution";
  blocks: ContentBlock[];
};

export type DimensionData = {
  key: DimensionKey;
  title: string;
  subtitle: string;
  intro?: string;
  sections: GoodLifeSection[];
  strength: string;
};

export type MemberProfileData = {
  id: string;
  profile: {
    name: string;
    fullName?: string;
    group?: string;
    type?: string;
    identity?: string;
    location?: string;
    intro?: string;
    style?: string;
  };
  basicInfo?: MemberBasicInfo;
  triangleTitle?: string;
  triangleSubtitle?: string;
  centerText?: string;
  centerSubtitle?: string;
  dimensions?: DimensionData[];
  aiPersona?: {
    title: string;
    subtitle: string;
    initialMessage: string;
    inputPlaceholder: string;
  };
  knowledgeBase?: {
    documentPaths: string[];
    sourceLabels?: string[];
    lastUpdated?: string;
  };
};

export const goodLifeProfiles: Record<string, MemberProfileData> = """
        + ts_literal(profiles)
        + """;
""",
        encoding="utf-8",
    )

    print(f"Generated {len(profiles)} good-life profiles")


if __name__ == "__main__":
    main()
