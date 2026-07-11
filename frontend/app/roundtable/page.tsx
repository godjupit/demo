"use client";

import Link from "next/link";
import type { CSSProperties, FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  FileText,
  FolderOpen,
  MessageCircle,
  Send,
  Sparkles,
  Square,
  Users
} from "lucide-react";
import {
  RoundtableResponse,
  SpeakerInfo,
  TargetedFollowup,
  getRoundtableSpeakers,
  streamRoundtable,
  streamTargetedFollowup
} from "@/lib/api";
import { avatarForSpeaker } from "@/lib/avatars";
import { LandmarkIllustration } from "@/components/community-map/LandmarkIllustration";
import { getMemberMapVisual } from "@/lib/memberMapVisuals";

type SceneSlot = "left" | "top" | "right" | "center";
type SpeakerStatus = "waiting" | "thinking" | "answered" | "followup" | "joined";
type ModeratorPanelMode = "idle" | "planning" | "plan" | "summarizing" | "summary";

const slotOrder: SceneSlot[] = ["left", "top", "right"];

const participantVisualPositions: Record<SceneSlot, CSSProperties> = {
  left: { left: "7%", top: "64%" },
  top: { left: "50%", top: "43%" },
  right: { right: "7%", top: "64%" },
  center: { left: "50%", top: "52%" }
};

function sceneSlotFor(index: number, count: number): SceneSlot {
  if (count === 1) {
    return "center";
  }
  if (count === 2) {
    return index === 0 ? "left" : "right";
  }
  return slotOrder[index] ?? "right";
}

function SpeakerAvatarView({
  speakerId,
  size = "normal"
}: {
  speakerId: string;
  size?: "small" | "normal" | "large";
}) {
  const avatar = avatarForSpeaker(speakerId);

  return (
    <div
      className={`mini-member-avatar mini-member-avatar-${size}`}
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

function statusLabel(status: SpeakerStatus) {
  if (status === "thinking") {
    return "正在思考";
  }
  if (status === "answered") {
    return "已回答";
  }
  if (status === "followup") {
    return "正在被追问";
  }
  if (status === "joined") {
    return "新加入";
  }
  return "等待发言";
}

function memberStatus(
  speakerId: string,
  currentRound: RoundtableResponse | undefined,
  isLoading: boolean,
  isTargetLoading: boolean,
  targetDraft: { speaker_id: string } | null,
  isNewlyJoined = false
): SpeakerStatus {
  if (isTargetLoading && targetDraft?.speaker_id === speakerId) {
    return "followup";
  }

  const turn = currentRound?.turns.find((item) => item.speaker_id === speakerId);
  if (turn?.content.trim()) {
    return "answered";
  }
  if (isLoading && turn) {
    return "thinking";
  }
  if (isNewlyJoined) {
    return "joined";
  }
  return "waiting";
}

function RoundtableSidebar({
  speakers,
  selectedSpeakers,
  selectedSpeakerIds,
  currentRound,
  followups,
  isLoading,
  isTargetLoading,
  targetDraft,
  moderatorPanelMode,
  focusedSpeakerId,
  replaceSlotIndex,
  replacementSearch,
  replacementCandidateId,
  replacementNotice,
  newlyJoinedSpeakerIds,
  canReplaceMember,
  onFocus,
  onOpenReplace,
  onCloseReplace,
  onReplacementSearch,
  onSelectReplacementCandidate,
  onConfirmReplace
}: {
  speakers: SpeakerInfo[];
  selectedSpeakers: SpeakerInfo[];
  selectedSpeakerIds: string[];
  currentRound: RoundtableResponse | undefined;
  followups: TargetedFollowup[];
  isLoading: boolean;
  isTargetLoading: boolean;
  targetDraft: { speaker_id: string } | null;
  moderatorPanelMode: ModeratorPanelMode;
  focusedSpeakerId: string | null;
  replaceSlotIndex: number | null;
  replacementSearch: string;
  replacementCandidateId: string | null;
  replacementNotice: string;
  newlyJoinedSpeakerIds: string[];
  canReplaceMember: boolean;
  onFocus: (speakerId: string) => void;
  onOpenReplace: (slotIndex: number) => void;
  onCloseReplace: () => void;
  onReplacementSearch: (value: string) => void;
  onSelectReplacementCandidate: (speakerId: string) => void;
  onConfirmReplace: () => void;
}) {
  const panelTitle =
    moderatorPanelMode === "planning" || moderatorPanelMode === "plan"
      ? "主持人计划"
      : moderatorPanelMode === "summarizing" || moderatorPanelMode === "summary"
        ? "主持人总结"
        : "主持人面板";
  const showSummary = moderatorPanelMode === "summary" && Boolean(currentRound?.summary);
  const showPlan =
    (moderatorPanelMode === "planning" || moderatorPanelMode === "plan" || moderatorPanelMode === "summarizing") &&
    Boolean(currentRound);
  const replacingSpeaker = replaceSlotIndex === null ? null : selectedSpeakers[replaceSlotIndex] ?? null;
  const currentSpeakerIdSet = new Set(selectedSpeakerIds);
  const normalizedSearch = replacementSearch.trim().toLowerCase();
  const replacementCandidates = speakers.filter((speaker) => {
    if (currentSpeakerIdSet.has(speaker.speaker_id)) {
      return false;
    }
    if (!normalizedSearch) {
      return true;
    }
    return [
      speaker.name,
      speaker.role,
      speaker.location,
      speaker.perspective,
      speaker.style
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });
  const replacementCandidate =
    replacementCandidateId === null
      ? null
      : speakers.find((speaker) => speaker.speaker_id === replacementCandidateId) ?? null;

  return (
    <aside className="roundtable-sidebar">
      <Link className="roundtable-back-link" href="/?view=map">
        <ArrowLeft size={16} />
        重新选择成员
      </Link>

      <div className="roundtable-sidebar-title">
        <div className="roundtable-sidebar-icon">
          <Users size={30} />
        </div>
        <h1>圆桌对话</h1>
        <p>
          由当前选出的 {selectedSpeakerIds.length} 位成员围绕同一话题展开讨论，AI
          主持人负责组织轮次与阶段总结。
        </p>
      </div>

      <div className="selection-count">已选择 {selectedSpeakerIds.length}/3</div>

      <div className="roundtable-selected-list">
        {selectedSpeakers.map((speaker, slotIndex) => {
          const status = memberStatus(
            speaker.speaker_id,
            currentRound,
            isLoading,
            isTargetLoading,
            targetDraft,
            newlyJoinedSpeakerIds.includes(speaker.speaker_id)
          );

          return (
            <div
              className={`roundtable-selected-card ${
                focusedSpeakerId === speaker.speaker_id ? "active" : ""
              }`}
              key={speaker.speaker_id}
            >
              <button
                className="roundtable-member-focus-button"
                onClick={() => onFocus(speaker.speaker_id)}
                type="button"
              >
                <SpeakerAvatarView speakerId={speaker.speaker_id} />
                <strong>{speaker.name}</strong>
              </button>
              <button
                className="roundtable-member-replace-button"
                disabled={!canReplaceMember}
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenReplace(slotIndex);
                }}
                title={canReplaceMember ? `更换 ${speaker.name}` : "当前成员正在发言，请稍后更换"}
                type="button"
              >
                更换
              </button>
              <span className="sr-only">{statusLabel(status)}</span>
            </div>
          );
        })}
      </div>

      {replacementNotice ? <p className="replacement-notice">{replacementNotice}</p> : null}

      {replacingSpeaker ? (
        <section className="replace-member-panel" aria-label="选择替换成员">
          <div className="replace-member-panel-header">
            <div>
              <strong>选择替换成员</strong>
              <span>当前替换：{replacingSpeaker.name}</span>
            </div>
            <button type="button" onClick={onCloseReplace} aria-label="关闭替换成员面板">
              ×
            </button>
          </div>
          <input
            aria-label="搜索成员"
            className="replace-member-search"
            onChange={(event) => onReplacementSearch(event.target.value)}
            placeholder="搜索名字、地点或实践领域"
            value={replacementSearch}
          />
          <div className="replace-candidate-list">
            {replacementCandidates.length ? (
              replacementCandidates.map((speaker) => (
                <button
                  className={`replacement-candidate-card ${
                    replacementCandidateId === speaker.speaker_id ? "selected" : ""
                  }`}
                  key={speaker.speaker_id}
                  onClick={() => onSelectReplacementCandidate(speaker.speaker_id)}
                  type="button"
                >
                  <SpeakerAvatarView speakerId={speaker.speaker_id} size="small" />
                  <div>
                    <strong>{speaker.name}</strong>
                    <span>{speaker.role}</span>
                    {speaker.location ? <small>{speaker.location}</small> : null}
                  </div>
                  <em>选择</em>
                </button>
              ))
            ) : (
              <p className="replace-empty-text">没有找到可替换成员</p>
            )}
          </div>
          {replacementCandidate ? (
            <div className="replacement-confirm">
              <p>
                将“{replacingSpeaker.name}”替换为“{replacementCandidate.name}”？
              </p>
              <div>
                <button type="button" onClick={onCloseReplace}>
                  取消
                </button>
                <button type="button" onClick={onConfirmReplace}>
                  确认更换
                </button>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="host-summary-card">
        <div className="host-summary-card-header">
          <Sparkles size={18} />
          <h2>{panelTitle}</h2>
        </div>
        <div className="host-summary-card-content">
          {showSummary ? (
            <MarkdownText text={currentRound?.summary ?? ""} />
          ) : showPlan && currentRound?.moderator_plan ? (
            <MarkdownText text={currentRound.moderator_plan} />
          ) : moderatorPanelMode === "planning" ? (
            <p>主持人正在规划本轮讨论路径...</p>
          ) : moderatorPanelMode === "summarizing" ? (
            <MarkdownText text={currentRound?.moderator_plan || "本轮发言已完成，主持人正在沉淀阶段总结。"} />
          ) : (
            <p>发送问题后，这里会先显示主持人计划，并在本轮结束后切换为主持人总结。</p>
          )}
        </div>
      </section>

      {followups.length ? (
        <section className="roundtable-history-card">
          <h2>本轮追问</h2>
          <p>{followups.length} 条定向追问已进入对应成员的气泡。</p>
        </section>
      ) : null}
    </aside>
  );
}

function SceneBackground() {
  return (
    <div className="scene-decorations" aria-hidden="true">
      <span className="scene-cloud scene-cloud-a" />
      <span className="scene-cloud scene-cloud-b" />
      <span className="scene-arrow scene-arrow-a">‹‹</span>
      <span className="scene-arrow scene-arrow-b">‹‹</span>
      <span className="scene-flower scene-flower-a" />
      <span className="scene-flower scene-flower-b" />
      <span className="scene-tree scene-tree-a" />
      <span className="scene-tree scene-tree-b" />
    </div>
  );
}

function RoundTableIllustration({
  topic,
  roundNumber
}: {
  topic: string;
  roundNumber: number;
}) {
  return (
    <div className="round-table-illustration">
      <div className="round-table-surface">
        <div className="topic-archive" title={`当前话题：${topic || "等待输入"}`}>
          <FolderOpen size={34} />
          <div>
            <span>话题档案</span>
            <strong>{topic || "等待第一轮主题"}</strong>
          </div>
          <small>ROUND {roundNumber}</small>
        </div>
        <div className="table-paper table-paper-a">
          <FileText size={16} />
        </div>
        <div className="table-paper table-paper-b">
          <FileText size={16} />
        </div>
        <div className="table-cup" />
        <div className="table-frame" />
      </div>
      <div className="round-table-leg" />
    </div>
  );
}

function ParticipantSpeechCard({
  speaker,
  slot,
  currentRound,
  followups,
  isFocused,
  isLoading
}: {
  speaker: SpeakerInfo;
  slot: SceneSlot;
  currentRound: RoundtableResponse | undefined;
  followups: TargetedFollowup[];
  isFocused: boolean;
  isLoading: boolean;
}) {
  const turn = currentRound?.turns.find((item) => item.speaker_id === speaker.speaker_id);
  const speakerFollowups = followups.filter((item) => item.speaker_id === speaker.speaker_id);
  const content = turn?.content.trim();

  return (
    <article className={`participant-speech-card participant-speech-card-${slot} ${isFocused ? "focused" : ""}`}>
      <div className="participant-speech-title">
        <strong>{speaker.name}</strong>
        <span>{turn?.role || speaker.role}</span>
      </div>

      {content ? (
        <MarkdownText text={content} />
      ) : isLoading ? (
        <p className="thinking-text">正在整理观点...</p>
      ) : (
        <p className="thinking-text">等待本轮发言。</p>
      )}

      {speakerFollowups.map((followup) => (
        <div className="speech-followup" key={followup.id}>
          <small>追问：{followup.question}</small>
          {followup.content ? <MarkdownText text={followup.content} /> : <p>正在回答追问...</p>}
        </div>
      ))}

    </article>
  );
}

function ParticipantSceneNode({
  speaker,
  slot,
  status,
  focused,
  muted,
  onFocus,
  onFollowUp,
  canFollowUp,
  isFollowupActive,
  children
}: {
  speaker: SpeakerInfo;
  slot: SceneSlot;
  status: SpeakerStatus;
  focused: boolean;
  muted: boolean;
  onFocus: () => void;
  onFollowUp: () => void;
  canFollowUp: boolean;
  isFollowupActive: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`participant-node participant-node-${slot} ${focused ? "focused" : ""} ${
        muted ? "muted" : ""
      } ${status === "thinking" || status === "followup" ? "is-thinking" : ""}`}
    >
      {children}
      <div className="participant-identity">
        <button className="participant-focus-button" onClick={onFocus} type="button">
        <SpeakerAvatarView speakerId={speaker.speaker_id} size="large" />
        <div>
          <strong>{speaker.name}</strong>
          <span>{speaker.location || speaker.role}</span>
          <small>{statusLabel(status)}</small>
        </div>
        </button>
        {canFollowUp ? (
          <button
            aria-label={`追问 ${speaker.name}`}
            className={`member-followup-trigger ${isFollowupActive ? "is-active" : ""}`}
            onClick={onFollowUp}
            type="button"
          >
            <MessageCircle size={12} />
            {isFollowupActive ? "追问中" : "追问"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function RoundtableMemberIllustration({
  speaker,
  slot,
  status
}: {
  speaker: SpeakerInfo;
  slot: SceneSlot;
  status: SpeakerStatus;
}) {
  const visual = getMemberMapVisual(speaker.speaker_id);

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      (visual.landmarkType === "generic-building" || visual.landmarkType === "generic-character")
    ) {
      console.warn(`Missing roundtable illustration for member: ${speaker.speaker_id}`);
    }
  }, [speaker.speaker_id, visual.landmarkType]);

  return (
    <div
      className={`roundtable-member-figure roundtable-member-figure-${slot} roundtable-member-figure-${status}`}
      data-landmark-type={visual.landmarkType}
      data-style-group={visual.mapStyleGroup}
      style={participantVisualPositions[slot]}
      aria-hidden="true"
    >
      <div className="roundtable-member-figure-inner">
        <LandmarkIllustration
          type={visual.landmarkType}
          variant={visual.landmarkVariant}
          accent={visual.accent}
          className="roundtable-member-illustration-svg"
        />
      </div>
      <span className="roundtable-member-illustration-base" />
    </div>
  );
}

function ConversationFlowArrows() {
  return (
    <svg className="conversation-flow-arrows" viewBox="0 0 1000 560" aria-hidden="true">
      <path d="M250 330 C340 260 430 240 500 275" />
      <path d="M520 210 C600 150 710 175 765 245" />
      <path d="M760 335 C650 390 540 388 455 340" />
    </svg>
  );
}

function RoundtableInputBar({
  topic,
  setTopic,
  onSubmit,
  canRun,
  isLoading,
  targetDraft,
  setTargetDraft,
  onTargetSubmit,
  canAskTarget,
  isTargetLoading
}: {
  topic: string;
  setTopic: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  canRun: boolean;
  isLoading: boolean;
  targetDraft: {
    roundIndex: number;
    speaker_id: string;
    speaker_name: string;
    question: string;
  } | null;
  setTargetDraft: (
    value:
      | {
          roundIndex: number;
          speaker_id: string;
          speaker_name: string;
          question: string;
        }
      | null
      | ((
          current: {
            roundIndex: number;
            speaker_id: string;
            speaker_name: string;
            question: string;
          } | null
        ) => {
          roundIndex: number;
          speaker_id: string;
          speaker_name: string;
          question: string;
        } | null)
  ) => void;
  onTargetSubmit: (event: FormEvent<HTMLFormElement>) => void;
  canAskTarget: boolean;
  isTargetLoading: boolean;
}) {
  if (targetDraft) {
    return (
      <form className="roundtable-input-bar roundtable-target-input" onSubmit={onTargetSubmit}>
        <div className="target-input-label">
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
          placeholder={`向 ${targetDraft.speaker_name} 继续追问`}
        />
        <button aria-label="发送追问" disabled={!canAskTarget} type="submit">
          {isTargetLoading ? <Square size={18} /> : <Send size={20} />}
        </button>
      </form>
    );
  }

  return (
    <form className="roundtable-input-bar" onSubmit={onSubmit}>
      <input
        aria-label="讨论主题"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        placeholder="问一问：关于这个话题，你还想继续讨论什么？"
      />
      <button aria-label="发送主题" disabled={!canRun} type="submit">
        {isLoading ? <Square size={18} /> : <Send size={22} />}
      </button>
    </form>
  );
}

function RoundtableScene({
  selectedSpeakers,
  currentRound,
  currentRoundIndex,
  followups,
  topic,
  isLoading,
  isTargetLoading,
  isStopped,
  targetDraft,
  focusedSpeakerId,
  newlyJoinedSpeakerIds,
  setFocusedSpeakerId,
  onFollowUp,
  onStop,
  error,
  inputBar
}: {
  selectedSpeakers: SpeakerInfo[];
  currentRound: RoundtableResponse | undefined;
  currentRoundIndex: number;
  followups: TargetedFollowup[];
  topic: string;
  isLoading: boolean;
  isTargetLoading: boolean;
  isStopped: boolean;
  targetDraft: { speaker_id: string } | null;
  focusedSpeakerId: string | null;
  newlyJoinedSpeakerIds: string[];
  setFocusedSpeakerId: (speakerId: string) => void;
  onFollowUp: (speaker: SpeakerInfo) => void;
  onStop: () => void;
  error: string;
  inputBar: ReactNode;
}) {
  const roundNumber = Math.max(currentRoundIndex + 1, 1);
  const activeTopic = currentRound?.topic || topic;

  return (
    <section className="roundtable-scene">
      <SceneBackground />

      <div className="round-indicator">
        <span>ROUND {roundNumber}</span>
        <strong>{activeTopic || "等待讨论主题"}</strong>
      </div>

      <ConversationFlowArrows />

      {selectedSpeakers.map((speaker, index) => {
        const slot = sceneSlotFor(index, selectedSpeakers.length);
        const status = memberStatus(
          speaker.speaker_id,
          currentRound,
          isLoading,
          isTargetLoading,
          targetDraft,
          newlyJoinedSpeakerIds.includes(speaker.speaker_id)
        );

        return (
          <RoundtableMemberIllustration
            key={`visual-${speaker.speaker_id}`}
            slot={slot}
            speaker={speaker}
            status={status}
          />
        );
      })}

      <RoundTableIllustration topic={activeTopic} roundNumber={roundNumber} />

      {selectedSpeakers.map((speaker, index) => {
        const slot = sceneSlotFor(index, selectedSpeakers.length);
        const status = memberStatus(
          speaker.speaker_id,
          currentRound,
          isLoading,
          isTargetLoading,
          targetDraft,
          newlyJoinedSpeakerIds.includes(speaker.speaker_id)
        );
        const focused = focusedSpeakerId === speaker.speaker_id;
        const muted = Boolean(focusedSpeakerId) && !focused;
        const turn = currentRound?.turns.find((item) => item.speaker_id === speaker.speaker_id);
        const canFollowUp =
          Boolean(turn?.content.trim()) && !isLoading && !isTargetLoading && !isStopped;
        const isFollowupActive = targetDraft?.speaker_id === speaker.speaker_id;

        return (
          <ParticipantSceneNode
            canFollowUp={canFollowUp}
            focused={focused}
            isFollowupActive={isFollowupActive}
            key={speaker.speaker_id}
            muted={muted}
            onFocus={() => setFocusedSpeakerId(speaker.speaker_id)}
            onFollowUp={() => onFollowUp(speaker)}
            slot={slot}
            speaker={speaker}
            status={status}
          >
            <ParticipantSpeechCard
              currentRound={currentRound}
              followups={followups}
              isFocused={focused}
              isLoading={isLoading}
              slot={slot}
              speaker={speaker}
            />
          </ParticipantSceneNode>
        );
      })}

      {currentRound ? (
        <div className="scene-round-actions">
          <button type="button" onClick={onStop} disabled={isStopped}>
            停止讨论
          </button>
          <span>
            {isStopped ? "讨论已停止，当前结果会保留。" : "可追问成员，或输入新主题开启下一轮。"}
          </span>
        </div>
      ) : null}

      {error ? <p className="scene-error-text">服务暂时不可用：{error}</p> : null}

      <div className="roundtable-input-shell">{inputBar}</div>
    </section>
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
  const [moderatorPanelMode, setModeratorPanelMode] = useState<ModeratorPanelMode>("idle");
  const [focusedSpeakerId, setFocusedSpeakerId] = useState<string | null>(null);
  const [replaceSlotIndex, setReplaceSlotIndex] = useState<number | null>(null);
  const [replacementSearch, setReplacementSearch] = useState("");
  const [replacementCandidateId, setReplacementCandidateId] = useState<string | null>(null);
  const [replacementNotice, setReplacementNotice] = useState("");
  const [newlyJoinedSpeakerIds, setNewlyJoinedSpeakerIds] = useState<string[]>([]);
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
        const nextSpeakerIds =
          validUrlSpeakerIds.length === 3
            ? validUrlSpeakerIds
            : items.slice(0, 3).map((speaker) => speaker.speaker_id);
        setSpeakers(items);
        setSelectedSpeakerIds(nextSpeakerIds);
        setFocusedSpeakerId(nextSpeakerIds[0] ?? null);
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

  const selectedSpeakers = useMemo(
    () =>
      selectedSpeakerIds
        .map((speakerId) => speakers.find((speaker) => speaker.speaker_id === speakerId))
        .filter((speaker): speaker is SpeakerInfo => Boolean(speaker)),
    [speakers, selectedSpeakerIds]
  );

  const currentRoundIndex = rounds.length - 1;
  const currentRound = currentRoundIndex >= 0 ? rounds[currentRoundIndex] : undefined;
  const currentFollowups = currentRoundIndex >= 0 ? followupsByRound[currentRoundIndex] ?? [] : [];

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

  const canReplaceMember = !isLoading && !isTargetLoading;

  useEffect(() => {
    if (canReplaceMember) {
      return;
    }
    setReplaceSlotIndex(null);
    setReplacementCandidateId(null);
    setReplacementSearch("");
  }, [canReplaceMember]);

  function openReplaceMemberPicker(slotIndex: number) {
    if (!canReplaceMember) {
      return;
    }
    setReplaceSlotIndex(slotIndex);
    setReplacementSearch("");
    setReplacementCandidateId(null);
  }

  function closeReplaceMemberPicker() {
    setReplaceSlotIndex(null);
    setReplacementSearch("");
    setReplacementCandidateId(null);
  }

  function confirmReplaceMember() {
    if (replaceSlotIndex === null || !replacementCandidateId) {
      return;
    }

    const previousSpeakerId = selectedSpeakerIds[replaceSlotIndex];
    if (!previousSpeakerId || selectedSpeakerIds.includes(replacementCandidateId)) {
      return;
    }

    const nextSpeaker = speakers.find((speaker) => speaker.speaker_id === replacementCandidateId);
    if (!nextSpeaker) {
      return;
    }

    setSelectedSpeakerIds((current) =>
      current.map((speakerId, index) => (index === replaceSlotIndex ? replacementCandidateId : speakerId))
    );
    setFocusedSpeakerId(replacementCandidateId);
    setNewlyJoinedSpeakerIds((current) => [
      replacementCandidateId,
      ...current.filter((speakerId) => speakerId !== replacementCandidateId)
    ]);

    if (targetDraft?.speaker_id === previousSpeakerId) {
      setTargetDraft(null);
      setReplacementNotice("原追问成员已离席，已切换为全体讨论。");
    } else {
      setReplacementNotice(`${nextSpeaker.name} 加入了本场圆桌。`);
    }

    window.setTimeout(() => {
      setReplacementNotice("");
    }, 2200);
    closeReplaceMemberPicker();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canRun) {
      return;
    }

    setIsLoading(true);
    setIsStopped(false);
    setModeratorPanelMode("planning");
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
            current.map((round, index) => (index === nextRoundIndex ? updater(round) : round))
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
          setModeratorPanelMode("planning");
          updateCurrentRound((round) => ({ ...round, moderator_plan: "" }));
        }

        if (event.type === "plan_delta") {
          updateCurrentRound((round) => ({
            ...round,
            moderator_plan: round.moderator_plan + event.delta
          }));
        }

        if (event.type === "plan_done") {
          setModeratorPanelMode("plan");
          updateCurrentRound((round) => ({
            ...round,
            moderator_plan: event.moderator_plan
          }));
        }

        if (event.type === "turn_start") {
          setFocusedSpeakerId(event.speaker_id);
          setNewlyJoinedSpeakerIds((current) =>
            current.filter((speakerId) => speakerId !== event.speaker_id)
          );
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
          setModeratorPanelMode("summarizing");
          updateCurrentRound((round) => ({ ...round, summary: "" }));
        }

        if (event.type === "summary_delta") {
          updateCurrentRound((round) => ({
            ...round,
            summary: round.summary + event.delta
          }));
        }

        if (event.type === "summary_done") {
          setModeratorPanelMode("summary");
          updateCurrentRound((round) => ({ ...round, summary: event.summary }));
        }

        if (event.type === "error") {
          setError(event.message);
        }
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "请求失败");
      setModeratorPanelMode(currentRound?.summary ? "summary" : currentRound?.moderator_plan ? "plan" : "idle");
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

    const round = rounds[targetDraft.roundIndex];
    if (!round) {
      return;
    }

    const followupId = `${targetDraft.roundIndex}-${targetDraft.speaker_id}-${Date.now()}`;
    const question = targetDraft.question.trim();
    setFocusedSpeakerId(targetDraft.speaker_id);
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
          round,
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
                item.id === followupId ? { ...item, content: item.content + event.delta } : item
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
    <main className="roundtable-page">
      <RoundtableSidebar
        canReplaceMember={canReplaceMember}
        currentRound={currentRound}
        focusedSpeakerId={focusedSpeakerId}
        followups={currentFollowups}
        isLoading={isLoading}
        isTargetLoading={isTargetLoading}
        moderatorPanelMode={moderatorPanelMode}
        newlyJoinedSpeakerIds={newlyJoinedSpeakerIds}
        onCloseReplace={closeReplaceMemberPicker}
        onConfirmReplace={confirmReplaceMember}
        onFocus={setFocusedSpeakerId}
        onOpenReplace={openReplaceMemberPicker}
        onReplacementSearch={setReplacementSearch}
        onSelectReplacementCandidate={setReplacementCandidateId}
        replaceSlotIndex={replaceSlotIndex}
        replacementCandidateId={replacementCandidateId}
        replacementNotice={replacementNotice}
        replacementSearch={replacementSearch}
        selectedSpeakerIds={selectedSpeakerIds}
        selectedSpeakers={selectedSpeakers}
        speakers={speakers}
        targetDraft={targetDraft}
      />

      <RoundtableScene
        currentRound={currentRound}
        currentRoundIndex={currentRoundIndex}
        error={error}
        focusedSpeakerId={focusedSpeakerId}
        followups={currentFollowups}
        inputBar={
          <RoundtableInputBar
            canAskTarget={canAskTarget}
            canRun={canRun}
            isLoading={isLoading}
            isTargetLoading={isTargetLoading}
            onSubmit={onSubmit}
            onTargetSubmit={onTargetSubmit}
            setTargetDraft={setTargetDraft}
            setTopic={setTopic}
            targetDraft={targetDraft}
            topic={topic}
          />
        }
        isLoading={isLoading}
        isStopped={isStopped}
        isTargetLoading={isTargetLoading}
        newlyJoinedSpeakerIds={newlyJoinedSpeakerIds}
        onFollowUp={(speaker) => {
          if (!currentRound) {
            return;
          }
          setFocusedSpeakerId(speaker.speaker_id);
          setTargetDraft({
            roundIndex: currentRoundIndex,
            speaker_id: speaker.speaker_id,
            speaker_name: speaker.name,
            question: ""
          });
        }}
        onStop={() => setIsStopped(true)}
        selectedSpeakers={selectedSpeakers}
        setFocusedSpeakerId={setFocusedSpeakerId}
        targetDraft={targetDraft}
        topic={topic}
      />
    </main>
  );
}
