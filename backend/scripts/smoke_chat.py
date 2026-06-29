from app.api.chat import ChatRequest, chat


def main() -> None:
    request = ChatRequest(
        agent_id="xiu_sibianxing",
        message="修四边形为什么关注社区？",
    )
    response = chat(request)
    print("context_sufficient:", response.context_sufficient)
    print("answer:", response.answer[:240])
    print("citations:", [citation["title"] for citation in response.citations])
    print("related_nodes:", response.related_nodes)


if __name__ == "__main__":
    main()

