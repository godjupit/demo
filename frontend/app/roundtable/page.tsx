"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, MessageCircle, Send, Sparkles } from "lucide-react";
import {
  RoundtableResponse,
  SpeakerInfo,
  TargetedFollowup,
  getRoundtableSpeakers,
  streamRoundtable,
  streamTargetedFollowup
} from "@/lib/api";
import { avatarForSpeaker } from "@/lib/avatars";

function SpeakerAvatarView({ speakerId }: { speakerId: string }) {
  const avatar = avatarForSpeaker(speakerId);

  return (
    <div
      className="mini-member-avatar"
      style={
        {
          "--avatar-a": avatar.colors[0],
          "--avatar-b": avatar.colors[1]
        } as CSSProperties
      }
    >
      <span>{avatar.initials}</span>
    </div>
  );
}

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function MarkdownText({ text }: { text: string }) {
  return (
    <div className="markdown-text">
      {text.split(/\n{2,}/).map((paragraph, index) => (
        <p key={index}>{renderInlineMarkdown(paragraph)}</p>
      ))}
    </div>
  );
}

export default function RoundtablePage() {
  const [topic, setTopic] = useState("AI 会如何改变社区艺术？");
  const [speakers, setSpeakers] = useState<SpeakerInfo[]>([]);
  const [selectedSpeakerIds, setSelectedSpeakerIds] = useState<string[]>([]);
  const [rounds, setRounds] = useState<RoundtableResponse[]>([]);
  const [followupsByRound, setFollowupsByRound] = useState<Record<number, TargetedFollowup[]>>({});
  const [targetDraft, setTargetDraft] = useState<{
    roundIndex: number;
    speaker_id: string;
    speaker_name: string;
    question: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTargetLoading, setIsTargetLoading] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    let isMounted = true;

    getRoundtableSpeakers()
      .then((items) => {
        if (!isMounted) {
          return;
        }
        const urlSpeakerIds =
          typeof window === "undefined"
            ? []
            : (new URLSearchParams(window.location.search).get("speakers") ?? "")
                .split(",")
                .map((speakerId) => speakerId.trim())
                .filter(Boolean);
        const validUrlSpeakerIds = urlSpeakerIds.filter((speakerId) =>
          items.some((speaker) => speaker.speaker_id === speakerId)
        );
        setSpeakers(items);
        setSelectedSpeakerIds(
          validUrlSpeakerIds.length === 3
            ? validUrlSpeakerIds
            : items.slice(0, 3).map((speaker) => speaker.speaker_id)
        );
      })
      .catch((caught) => {
        if (isMounted) {
          setError(caught instanceof Error ? caught.message : "成员加载失败");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const canRun = useMemo(
    () =>
      topic.trim().length > 0 &&
      selectedSpeakerIds.length === 3 &&
      !isLoading &&
      !isTargetLoading &&
      !isStopped,
    [topic, selectedSpeakerIds, isLoading, isTargetLoading, isStopped]
  );

  const canAskTarget = useMemo(
    () => Boolean(targetDraft?.question.trim()) && !isLoading && !isTargetLoading && !isStopped,
    [targetDraft, isLoading, isTargetLoading, isStopped]
  );

  const selectedSpeakers = useMemo(
    () =>
      selectedSpeakerIds
        .map((speakerId) => speakers.find((speaker) => speaker.speaker_id === speakerId))
        .filter((speaker): speaker is SpeakerInfo => Boolean(speaker)),
    [speakers, selectedSpeakerIds]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canRun) {
      return;
    }

    setIsLoading(true);
    setIsStopped(false);
    setError("");
    const nextRoundIndex = rounds.length;
    const pendingRound: RoundtableResponse = {
      thread_id: "",
      topic: topic.trim(),
      moderator_plan: "",
      turns: [],
      summary: ""
    };
    const history = rounds;
    setRounds((current) => [...current, pendingRound]);

    try {
      await streamRoundtable(topic.trim(), selectedSpeakerIds, history, (event) => {
        const updateCurrentRound = (
          updater: (round: RoundtableResponse) => RoundtableResponse
        ) => {
          setRounds((current) =>
            current.map((round, index) =>
              index === nextRoundIndex ? updater(round) : round
            )
          );
        };

        if (event.type === "start") {
          updateCurrentRound((round) => ({
            ...round,
            thread_id: event.thread_id,
            topic: event.topic
          }));
        }

        if (event.type === "plan_start") {
          updateCurrentRound((round) => ({ ...round, moderator_plan: "" }));
        }

        if (event.type === "plan_delta") {
          updateCurrentRound((round) => ({
            ...round,
            moderator_plan: round.moderator_plan + event.delta
          }));
        }

        if (event.type === "plan_done") {
          updateCurrentRound((round) => ({
            ...round,
            moderator_plan: event.moderator_plan
          }));
        }

        if (event.type === "turn_start") {
          updateCurrentRound((round) => ({
            ...round,
            turns: [
              ...round.turns.filter((turn) => turn.speaker_id !== event.speaker_id),
              {
                speaker_id: event.speaker_id,
                speaker_name: event.speaker_name,
                role: event.role,
                content: ""
              }
            ]
          }));
        }

        if (event.type === "turn_delta") {
          updateCurrentRound((round) => ({
            ...round,
            turns: round.turns.map((turn) =>
              turn.speaker_id === event.speaker_id
                ? { ...turn, content: turn.content + event.delta }
                : turn
            )
          }));
        }

        if (event.type === "turn_done") {
          updateCurrentRound((round) => ({
            ...round,
            turns: [
              ...round.turns.filter((turn) => turn.speaker_id !== event.speaker_id),
              {
                speaker_id: event.speaker_id,
                speaker_name: event.speaker_name,
                role: event.role,
                content: event.content
              }
            ]
          }));
        }

        if (event.type === "summary_start") {
          updateCurrentRound((round) => ({ ...round, summary: "" }));
        }

        if (event.type === "summary_delta") {
          updateCurrentRound((round) => ({
            ...round,
            summary: round.summary + event.delta
          }));
        }

        if (event.type === "summary_done") {
          updateCurrentRound((round) => ({ ...round, summary: event.summary }));
        }

        if (event.type === "error") {
          setError(event.message);
        }
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "请求失败");
    } finally {
      setIsLoading(false);
      setTopic("");
    }
  }

  async function onTargetSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!targetDraft || !canAskTarget) {
      return;
    }

    const currentRound = rounds[targetDraft.roundIndex];
    if (!currentRound) {
      return;
    }

    const followupId = `${targetDraft.roundIndex}-${targetDraft.speaker_id}-${Date.now()}`;
    const question = targetDraft.question.trim();
    setIsTargetLoading(true);
    setError("");
    setFollowupsByRound((current) => ({
      ...current,
      [targetDraft.roundIndex]: [
        ...(current[targetDraft.roundIndex] ?? []),
        {
          id: followupId,
          speaker_id: targetDraft.speaker_id,
          speaker_name: targetDraft.speaker_name,
          role: "",
          question,
          content: ""
        }
      ]
    }));

    try {
      await streamTargetedFollowup(
        {
          question,
          speaker_id: targetDraft.speaker_id,
          round: currentRound,
          history: rounds.slice(0, targetDraft.roundIndex)
        },
        (event) => {
          if (event.type === "target_start") {
            setFollowupsByRound((current) => ({
              ...current,
              [targetDraft.roundIndex]: (current[targetDraft.roundIndex] ?? []).map((item) =>
                item.id === followupId
                  ? {
                      ...item,
                      speaker_name: event.speaker_name,
                      role: event.role,
                      question: event.question
                    }
                  : item
              )
            }));
          }

          if (event.type === "target_delta") {
            setFollowupsByRound((current) => ({
              ...current,
              [targetDraft.roundIndex]: (current[targetDraft.roundIndex] ?? []).map((item) =>
                item.id === followupId
                  ? { ...item, content: item.content + event.delta }
                  : item
              )
            }));
          }

          if (event.type === "target_done") {
            setFollowupsByRound((current) => ({
              ...current,
              [targetDraft.roundIndex]: (current[targetDraft.roundIndex] ?? []).map((item) =>
                item.id === followupId
                  ? {
                      ...item,
                      speaker_name: event.speaker_name,
                      role: event.role,
                      question: event.question,
                      content: event.content
                    }
                  : item
              )
            }));
          }

          if (event.type === "error") {
            setError(event.message);
          }
        }
      );
      setTargetDraft(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "请求失败");
    } finally {
      setIsTargetLoading(false);
    }
  }

  return (
    <main className="shell">
      <section className="roundtable-workspace">
        <aside className="profile-panel">
          <Link className="back-link" href="/">
            <ArrowLeft size={16} />
            重新选择成员
          </Link>
          <div className="avatar">
            <Sparkles size={32} />
          </div>
          <h1>圆桌讨论</h1>
          <p>由展示页选出的 3 位成员围绕同一话题发言，主持人最后收束。</p>
          <div className="selection-count">
            已选择 {selectedSpeakerIds.length}/3
          </div>
          <div className="roundtable-selected-list">
            {selectedSpeakers.map((speaker) => (
              <div className="roundtable-selected-card" key={speaker.speaker_id}>
                <SpeakerAvatarView speakerId={speaker.speaker_id} />
                <div>
                  <strong>{speaker.name}</strong>
                  <small>{speaker.role}</small>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="roundtable-panel">
          <div className="chat-header">
            <div>
              <h2>讨论主题</h2>
              <p>{rounds.length ? "点某位成员定向追问，或用当前 3 位成员开启下一轮" : "选择 3 位成员，再输入一个值得讨论的问题"}</p>
            </div>
            <span className="status">ROUND</span>
          </div>

          <form className="topic-composer" onSubmit={onSubmit}>
            <input
              aria-label="讨论主题"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder={rounds.length ? "输入整桌下一轮主题" : "输入一个值得讨论的问题"}
            />
            <button aria-label="开始讨论" disabled={!canRun} type="submit">
              <Send size={18} />
            </button>
          </form>
          {rounds.length && !isLoading ? (
            <div className="round-actions">
              <button type="button" onClick={() => setIsStopped(true)} disabled={isStopped}>
                停止讨论
              </button>
              {isStopped ? <span>讨论已停止，可以保留当前结果。</span> : <span>点击角色可定向追问，也可以输入整桌下一轮主题。</span>}
            </div>
          ) : null}

          {targetDraft ? (
            <form className="target-composer" onSubmit={onTargetSubmit}>
              <div>
                <span>追问 {targetDraft.speaker_name}</span>
                <button type="button" onClick={() => setTargetDraft(null)}>
                  取消
                </button>
              </div>
              <input
                aria-label={`追问 ${targetDraft.speaker_name}`}
                value={targetDraft.question}
                onChange={(event) =>
                  setTargetDraft((current) =>
                    current ? { ...current, question: event.target.value } : null
                  )
                }
                placeholder={`向 ${targetDraft.speaker_name} 追问`}
              />
              <button aria-label="发送追问" disabled={!canAskTarget} type="submit">
                <Send size={18} />
              </button>
            </form>
          ) : null}

          {error ? <p className="error-text">服务暂时不可用：{error}</p> : null}

          <div className="roundtable-stream">
            {isLoading ? (
              <article className="discussion-card">
                <h3>主持人</h3>
                <p>正在组织圆桌讨论...</p>
              </article>
            ) : null}

            {rounds.length ? (
              <>
                {rounds.map((round, roundIndex) => (
                  <section className="round-block" key={`${round.topic}-${roundIndex}`}>
                    <div className="round-label">
                      <span>第 {roundIndex + 1} 轮</span>
                      <strong>{round.topic}</strong>
                    </div>

                    {round.moderator_plan ? (
                      <article className="discussion-card moderator">
                    <h3>主持人计划</h3>
                        <MarkdownText text={round.moderator_plan} />
                      </article>
                    ) : null}

                    {round.turns.map((turn) => (
                  <article className="discussion-card" key={turn.speaker_id}>
                    <div className="discussion-card-title">
                      <div className="speaker-title">
                        <SpeakerAvatarView speakerId={turn.speaker_id} />
                        <h3>{turn.speaker_name}</h3>
                      </div>
                      <span>{turn.role}</span>
                    </div>
                    <MarkdownText text={turn.content} />
                    <button
                      className="followup-button"
                      disabled={isLoading || isTargetLoading || isStopped}
                      onClick={() =>
                        setTargetDraft({
                          roundIndex,
                          speaker_id: turn.speaker_id,
                          speaker_name: turn.speaker_name,
                          question: ""
                        })
                      }
                      type="button"
                    >
                      <MessageCircle size={16} />
                      追问 TA
                    </button>
                  </article>
                    ))}

                    {(followupsByRound[roundIndex] ?? []).map((followup) => (
                      <article className="discussion-card targeted" key={followup.id}>
                        <div className="discussion-card-title">
                          <div className="speaker-title">
                            <SpeakerAvatarView speakerId={followup.speaker_id} />
                            <h3>追问 {followup.speaker_name}</h3>
                          </div>
                          <span>{followup.role || "定向回答"}</span>
                        </div>
                        <p className="target-question">{followup.question}</p>
                        <MarkdownText text={followup.content} />
                      </article>
                    ))}

                    {round.summary ? (
                  <article className="discussion-card summary">
                    <h3>主持人总结</h3>
                        <MarkdownText text={round.summary} />
                  </article>
                    ) : null}
                  </section>
                ))}
              </>
            ) : (
              <article className="discussion-card moderator">
                <h3>等待主题</h3>
                <p>可以从“AI 会如何改变社区艺术？”开始，也可以输入产品、教育、城市、创作方法相关的问题。</p>
              </article>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
