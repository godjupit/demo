from app.core.settings import settings


def _content_to_text(content) -> str:
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, dict):
                parts.append(str(item.get("text") or item.get("content") or ""))
        return "".join(parts)
    return str(content or "")


def _llm_kwargs() -> dict:
    llm_kwargs = {
        "model": settings.openai_chat_model,
        "api_key": settings.openai_api_key,
    }
    if settings.openai_url:
        llm_kwargs["base_url"] = settings.openai_url
    return llm_kwargs


def call_llm(system_prompt: str, user_prompt: str, fallback: str) -> str:
    if not settings.openai_api_key:
        return fallback

    try:
        from langchain_core.messages import HumanMessage, SystemMessage
        from langchain_openai import ChatOpenAI
    except ImportError:
        return fallback

    llm = ChatOpenAI(**_llm_kwargs())
    try:
        response = llm.invoke(
            [SystemMessage(content=system_prompt), HumanMessage(content=user_prompt)]
        )
        return str(response.content)
    except Exception:
        return fallback


def stream_llm(system_prompt: str, user_prompt: str, fallback: str):
    if not settings.openai_api_key:
        yield from fallback
        return

    try:
        from langchain_core.messages import HumanMessage, SystemMessage
        from langchain_openai import ChatOpenAI
    except ImportError:
        yield from fallback
        return

    llm = ChatOpenAI(**_llm_kwargs())
    emitted = False
    try:
        for chunk in llm.stream(
            [SystemMessage(content=system_prompt), HumanMessage(content=user_prompt)]
        ):
            text = _content_to_text(chunk.content)
            if not text:
                continue
            for character in text:
                emitted = True
                yield character
    except Exception:
        if not emitted:
            yield from fallback
