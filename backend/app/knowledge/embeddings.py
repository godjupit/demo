from app.core.settings import settings


def embedding_dimension() -> int:
    return settings.openai_embedding_dimensions


def embed_text(text: str) -> list[float]:
    api_key = settings.openai_embedding_api_key or settings.openai_api_key
    base_url = settings.openai_embedding_url or settings.openai_url
    if not api_key:
        raise RuntimeError(
            "OPENAI_EMBEDDING_API_KEY or OPENAI_API_KEY is required to create embeddings."
        )

    from openai import OpenAI

    client_kwargs = {"api_key": api_key}
    if base_url:
        client_kwargs["base_url"] = base_url

    client = OpenAI(**client_kwargs)
    response = client.embeddings.create(
        model=settings.openai_embedding_model,
        input=text,
    )
    return list(response.data[0].embedding)


def vector_literal(values: list[float]) -> str:
    return "[" + ",".join(f"{value:.8f}" for value in values) + "]"
