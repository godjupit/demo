"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Bot, Send, UserRound } from "lucide-react";
import { sendChat } from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Citation = {
  source_id: string;
  title: string;
  url?: string | null;
  quote?: string | null;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "你好，我是修四边形的 AI 知识分身原型。你可以问我关于社区实践、地方经验、开放协作或 AI 分身边界的问题。"
    }
  ]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState<string | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [relatedNodes, setRelatedNodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) {
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setMessages((current) => [...current, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendChat({
        message: userMessage,
        agent_id: "xiu_sibianxing",
        thread_id: threadId,
        messages
      });
      setThreadId(response.thread_id);
      setCitations(response.citations);
      setRelatedNodes(response.related_nodes);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: response.answer }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `服务暂时不可用：${error.message}`
              : "服务暂时不可用。"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="shell">
      <section className="workspace">
        <aside className="profile-panel">
          <div className="avatar">
            <Bot size={32} />
          </div>
          <h1>修四边形</h1>
          <p>社区艺术与地方实践参与者</p>
          <div className="tag-list">
            <span>开放协作</span>
            <span>地方经验</span>
            <span>共同记录</span>
            <span>艺术方法</span>
          </div>
          <Link className="panel-link" href="/roundtable">
            进入圆桌讨论
          </Link>
        </aside>

        <section className="chat-panel">
          <div className="chat-header">
            <div>
              <h2>Agent 对话</h2>
              <p>资料驱动的第一版单角色原型</p>
            </div>
            <span className="status">MVP</span>
          </div>

          <div className="messages">
            {messages.map((message, index) => (
              <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                <div className="message-icon">
                  {message.role === "assistant" ? <Bot size={18} /> : <UserRound size={18} />}
                </div>
                <p>{message.content}</p>
              </div>
            ))}
            {isLoading ? (
              <div className="message assistant">
                <div className="message-icon">
                  <Bot size={18} />
                </div>
                <p>正在检索资料并组织回答...</p>
              </div>
            ) : null}
          </div>

          <form className="composer" onSubmit={onSubmit}>
            <input
              aria-label="输入问题"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="问一个关于社区实践的问题"
            />
            <button aria-label="发送" disabled={!canSend} type="submit">
              <Send size={18} />
            </button>
          </form>
        </section>

        <aside className="source-panel">
          <h2>引用资料</h2>
          {citations.length ? (
            <div className="source-list">
              {citations.map((citation) => (
                <article className="source-item" key={citation.source_id}>
                  <h3>{citation.title}</h3>
                  <p>{citation.quote}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty">对话后会显示检索到的来源。</p>
          )}

          <h2>相关节点</h2>
          {relatedNodes.length ? (
            <div className="tag-list compact">
              {relatedNodes.map((node) => (
                <span key={node}>{node}</span>
              ))}
            </div>
          ) : (
            <p className="empty">后续可连接地图和知识图谱。</p>
          )}
        </aside>
      </section>
    </main>
  );
}
