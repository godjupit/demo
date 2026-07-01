"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Bot, MapPin, Send, UserRound } from "lucide-react";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";
import {
  SpeakerInfo,
  getConversation,
  getRoundtableSpeakers,
  sendSpeakerChat
} from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{
    source_id: string;
    chunk_id: string;
    title: string;
    score: number;
    quote: string;
  }>;
};

const THREAD_STORAGE_KEY = "roundtable-speaker-thread-ids";

function speakerAgentId(speakerId: string) {
  return `roundtable-speaker:${speakerId}`;
}

function readStoredThreadIds() {
  try {
    return JSON.parse(localStorage.getItem(THREAD_STORAGE_KEY) ?? "{}") as Record<
      string,
      string
    >;
  } catch {
    return {};
  }
}

function storeSpeakerThreadId(speakerId: string, threadId: string) {
  const current = readStoredThreadIds();
  localStorage.setItem(
    THREAD_STORAGE_KEY,
    JSON.stringify({ ...current, [speakerId]: threadId })
  );
}

function introForSpeaker(speaker: SpeakerInfo): Message {
  return {
    role: "assistant",
    content: `你好，我是基于${speaker.name}公开资料与实践标签构建的讨论视角。你可以和我单独聊一个问题，我会从“${speaker.perspective}”切入。`
  };
}

export default function MemberPage() {
  const params = useParams<{ speakerId: string }>();
  const speakerId = params.speakerId;
  const [speakers, setSpeakers] = useState<SpeakerInfo[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const speaker = useMemo(
    () => speakers.find((item) => item.speaker_id === speakerId) ?? null,
    [speakers, speakerId]
  );

  useEffect(() => {
    let isMounted = true;

    getRoundtableSpeakers()
      .then(async (items) => {
        if (!isMounted) {
          return;
        }
        setSpeakers(items);
        const currentSpeaker = items.find((item) => item.speaker_id === speakerId);
        if (!currentSpeaker) {
          setMessages([]);
          return;
        }

        const storedThreadId = readStoredThreadIds()[speakerId] ?? null;
        setThreadId(storedThreadId);
        if (!storedThreadId) {
          setMessages([introForSpeaker(currentSpeaker)]);
          return;
        }

        try {
          const conversation = await getConversation(
            speakerAgentId(speakerId),
            storedThreadId
          );
          setMessages(
            conversation.messages.length
              ? conversation.messages
              : [introForSpeaker(currentSpeaker)]
          );
        } catch {
          setMessages([introForSpeaker(currentSpeaker)]);
        }
      })
      .catch((caught) => {
        if (isMounted) {
          setError(caught instanceof Error ? caught.message : "成员加载失败");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [speakerId]);

  const canSend = Boolean(speaker) && input.trim().length > 0 && !isLoading;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend || !speaker) {
      return;
    }

    const userMessage = input.trim();
    const currentMessages = messages;
    setInput("");
    setError("");
    setIsLoading(true);
    setMessages((current) => [...current, { role: "user", content: userMessage }]);

    try {
      const response = await sendSpeakerChat({
        message: userMessage,
        speaker_id: speaker.speaker_id,
        thread_id: threadId,
        messages: currentMessages
      });
      setThreadId(response.thread_id);
      storeSpeakerThreadId(speaker.speaker_id, response.thread_id);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.answer,
          citations: response.citations?.map((citation) => ({
            source_id: citation.source_id,
            chunk_id: citation.chunk_id,
            title: citation.title,
            score: citation.score,
            quote: citation.quote
          }))
        }
      ]);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "请求失败";
      setError(message);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: `服务暂时不可用：${message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="member-page-shell">
      <aside className="member-profile-panel">
        <Link className="back-link" href="/">
          <ArrowLeft size={16} />
          返回地图
        </Link>

        {speaker ? (
          <>
            <SpeakerAvatar className="profile-member-avatar" speakerId={speaker.speaker_id} />
            <h1>{speaker.name}</h1>
            <p className="member-role">{speaker.role}</p>
            <p className="member-location">
              <MapPin size={15} />
              {speaker.location}
            </p>
            <div className="profile-section">
              <h2>个人介绍</h2>
              <p>{speaker.perspective}</p>
            </div>
            <div className="profile-section">
              <h2>表达风格</h2>
              <p>{speaker.style}</p>
            </div>
          </>
        ) : (
          <p className="empty">正在加载成员资料...</p>
        )}
      </aside>

      <section className="member-chat-panel">
        <div className="chat-header">
          <div>
            <h2>{speaker ? `和 ${speaker.name} 对话` : "个人对话"}</h2>
            <p>{speaker ? "基于公开资料与实践标签生成的成员视角" : "请选择一位成员"}</p>
          </div>
          <span className="status">1:1</span>
        </div>

        {error ? <p className="error-text">服务暂时不可用：{error}</p> : null}

        <div className="messages">
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
              <div className="message-icon">
                {message.role === "assistant" ? <Bot size={18} /> : <UserRound size={18} />}
              </div>
              <div className="message-body">
                <p>{message.content}</p>
                {message.citations?.length ? (
                  <div className="message-citations">
                    {message.citations.slice(0, 3).map((citation) => (
                      <span key={citation.chunk_id}>
                        {citation.title} · {citation.score.toFixed(2)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          {isLoading ? (
            <div className="message assistant">
              <div className="message-icon">
                <Bot size={18} />
              </div>
              <p>{speaker?.name ?? "成员"}正在思考...</p>
            </div>
          ) : null}
        </div>

        <form className="composer" onSubmit={onSubmit}>
          <input
            aria-label="输入问题"
            disabled={!speaker}
            onChange={(event) => setInput(event.target.value)}
            placeholder={speaker ? `问 ${speaker.name} 一个问题` : "成员资料加载中"}
            value={input}
          />
          <button aria-label="发送" disabled={!canSend} type="submit">
            <Send size={18} />
          </button>
        </form>
      </section>
    </main>
  );
}
