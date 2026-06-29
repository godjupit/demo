"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Globe2,
  MapPin,
  Send,
  UserRound,
  UsersRound
} from "lucide-react";
import {
  SpeakerInfo,
  getRoundtableSpeakers,
  sendSpeakerChat
} from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type SpeakerConversation = {
  threadId: string | null;
  messages: Message[];
};

const mapTiles = Array.from({ length: 16 }, (_, index) => ({
  x: index % 4,
  y: Math.floor(index / 4)
}));

function longitudeToMapX(longitude: number) {
  return ((longitude + 180) / 360) * 100;
}

function latitudeToMapY(latitude: number) {
  const latitudeRadians = (Math.max(Math.min(latitude, 85.0511), -85.0511) * Math.PI) / 180;
  const mercator = Math.log(Math.tan(latitudeRadians) + 1 / Math.cos(latitudeRadians));
  return ((1 - mercator / Math.PI) / 2) * 100;
}

function introForSpeaker(speaker: SpeakerInfo): Message {
  return {
    role: "assistant",
    content: `你好，我是以${speaker.name}的公开思想风格构建的讨论视角。你可以和我单独聊一个问题，我会从“${speaker.perspective}”切入。`
  };
}

export default function Home() {
  const [speakers, setSpeakers] = useState<SpeakerInfo[]>([]);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState("");
  const [conversations, setConversations] = useState<Record<string, SpeakerConversation>>({});
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getRoundtableSpeakers()
      .then((items) => {
        if (!isMounted) {
          return;
        }
        setSpeakers(items);
        setSelectedSpeakerId((current) => current || items[0]?.speaker_id || "");
        setConversations((current) => {
          const next = { ...current };
          for (const speaker of items) {
            next[speaker.speaker_id] = next[speaker.speaker_id] ?? {
              threadId: null,
              messages: [introForSpeaker(speaker)]
            };
          }
          return next;
        });
      })
      .catch((caught) => {
        if (isMounted) {
          setError(caught instanceof Error ? caught.message : "人物加载失败");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedSpeaker = useMemo(
    () => speakers.find((speaker) => speaker.speaker_id === selectedSpeakerId) ?? null,
    [speakers, selectedSpeakerId]
  );

  const activeConversation = selectedSpeakerId
    ? conversations[selectedSpeakerId]
    : undefined;
  const messages = activeConversation?.messages ?? [];
  const canSend = useMemo(
    () => Boolean(selectedSpeaker) && input.trim().length > 0 && !isLoading,
    [input, isLoading, selectedSpeaker]
  );

  function selectSpeaker(speaker: SpeakerInfo) {
    setSelectedSpeakerId(speaker.speaker_id);
    setInput("");
    setError("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend || !selectedSpeaker || !activeConversation) {
      return;
    }

    const userMessage = input.trim();
    const currentMessages = activeConversation.messages;
    setInput("");
    setIsLoading(true);
    setError("");
    setConversations((current) => ({
      ...current,
      [selectedSpeaker.speaker_id]: {
        ...current[selectedSpeaker.speaker_id],
        messages: [
          ...(current[selectedSpeaker.speaker_id]?.messages ?? []),
          { role: "user", content: userMessage }
        ]
      }
    }));

    try {
      const response = await sendSpeakerChat({
        message: userMessage,
        speaker_id: selectedSpeaker.speaker_id,
        thread_id: activeConversation.threadId,
        messages: currentMessages
      });
      setConversations((current) => ({
        ...current,
        [selectedSpeaker.speaker_id]: {
          threadId: response.thread_id,
          messages: [
            ...(current[selectedSpeaker.speaker_id]?.messages ?? []),
            { role: "assistant", content: response.answer }
          ]
        }
      }));
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "请求失败";
      setError(message);
      setConversations((current) => ({
        ...current,
        [selectedSpeaker.speaker_id]: {
          ...current[selectedSpeaker.speaker_id],
          messages: [
            ...(current[selectedSpeaker.speaker_id]?.messages ?? []),
            { role: "assistant", content: `服务暂时不可用：${message}` }
          ]
        }
      }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="shell">
      <section className="map-workspace">
        <aside className="profile-panel">
          <div className="avatar">
            <Globe2 size={32} />
          </div>
          <h1>圆桌人物地图</h1>
          <p>选择一位圆桌角色，进入独立的一对一对话。</p>
          <div className="speaker-list">
            {speakers.map((speaker) => (
              <button
                className={`speaker-chip selectable ${
                  speaker.speaker_id === selectedSpeakerId ? "active" : ""
                }`}
                key={speaker.speaker_id}
                onClick={() => selectSpeaker(speaker)}
                type="button"
              >
                <UserRound size={18} />
                <span>{speaker.name}</span>
                <small>{speaker.location} · {speaker.role}</small>
              </button>
            ))}
          </div>
          <Link className="panel-link" href="/roundtable">
            <UsersRound size={16} />
            进入整桌讨论
          </Link>
        </aside>

        <section className="map-panel">
          <div className="chat-header">
            <div>
              <h2>世界地图</h2>
              <p>{selectedSpeaker ? `${selectedSpeaker.name} · ${selectedSpeaker.location}` : "正在加载圆桌角色"}</p>
            </div>
            <span className="status">MAP</span>
          </div>

          <div className="world-map" aria-label="圆桌人物世界地图">
            <div className="osm-tile-layer">
              {mapTiles.map((tile) => (
                <div
                  aria-hidden="true"
                  className="osm-tile"
                  key={`${tile.x}-${tile.y}`}
                  style={{
                    backgroundImage: `url(https://tile.openstreetmap.org/2/${tile.x}/${tile.y}.png)`,
                    left: `${tile.x * 25}%`,
                    top: `${tile.y * 25}%`
                  }}
                />
              ))}
            </div>
            {speakers.map((speaker) => (
              <button
                aria-label={`选择 ${speaker.name}`}
                className={`map-marker ${
                  speaker.speaker_id === selectedSpeakerId ? "active" : ""
                }`}
                key={speaker.speaker_id}
                onClick={() => selectSpeaker(speaker)}
                style={{
                  left: `${longitudeToMapX(speaker.longitude)}%`,
                  top: `${latitudeToMapY(speaker.latitude)}%`
                }}
                type="button"
              >
                <MapPin size={20} />
                <span>{speaker.name}</span>
              </button>
            ))}
            <a
              className="map-attribution"
              href="https://www.openstreetmap.org/copyright"
              rel="noreferrer"
              target="_blank"
            >
              © OpenStreetMap contributors
            </a>
          </div>

          {selectedSpeaker ? (
            <div className="speaker-detail">
              <div>
                <h2>{selectedSpeaker.name}</h2>
                <p>{selectedSpeaker.role}</p>
              </div>
              <p>{selectedSpeaker.perspective}</p>
            </div>
          ) : null}
        </section>

        <section className="chat-panel map-chat-panel">
          <div className="chat-header">
            <div>
              <h2>{selectedSpeaker ? `和 ${selectedSpeaker.name} 对话` : "单人对话"}</h2>
              <p>{selectedSpeaker ? selectedSpeaker.style : "请选择地图上的一位角色"}</p>
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
                <p>{message.content}</p>
              </div>
            ))}
            {isLoading ? (
              <div className="message assistant">
                <div className="message-icon">
                  <Bot size={18} />
                </div>
                <p>{selectedSpeaker?.name ?? "角色"}正在思考...</p>
              </div>
            ) : null}
          </div>

          <form className="composer" onSubmit={onSubmit}>
            <input
              aria-label="输入问题"
              disabled={!selectedSpeaker}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={selectedSpeaker ? `问 ${selectedSpeaker.name} 一个问题` : "先选择一位角色"}
            />
            <button aria-label="发送" disabled={!canSend} type="submit">
              <Send size={18} />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
