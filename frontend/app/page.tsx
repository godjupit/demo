"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Check, Plus, Sparkles, UsersRound, X } from "lucide-react";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";
import { SpeakerInfo, getRoundtableSpeakers } from "@/lib/api";
import {
  MapLens,
  MainIssue,
  RelationCluster,
  mainIssues,
  memberRelations,
  methodClusters,
  relationMemberPositions,
  valueClusters
} from "@/lib/memberRelations";

const mapLensOptions: Array<{ key: MapLens; label: string }> = [
  { key: "default", label: "自由星图" },
  { key: "values", label: "价值观" },
  { key: "methods", label: "方法论" },
  { key: "issues", label: "主要议题" }
];

const portraitPositions = [
  { left: 12, top: 18 },
  { left: 31, top: 12 },
  { left: 52, top: 18 },
  { left: 74, top: 11 },
  { left: 88, top: 26 },
  { left: 20, top: 37 },
  { left: 43, top: 34 },
  { left: 64, top: 39 },
  { left: 82, top: 49 },
  { left: 10, top: 60 },
  { left: 30, top: 63 },
  { left: 51, top: 58 },
  { left: 70, top: 68 },
  { left: 90, top: 72 },
  { left: 19, top: 82 },
  { left: 45, top: 83 },
  { left: 66, top: 87 },
  { left: 83, top: 88 }
];

function clampPercent(value: number) {
  return Math.min(94, Math.max(4, value));
}

function portraitPosition(index: number) {
  const position = portraitPositions[index % portraitPositions.length];
  const repeat = Math.floor(index / portraitPositions.length);
  return {
    left: `${clampPercent(position.left + repeat * 2.2)}%`,
    top: `${clampPercent(position.top + repeat * 1.8)}%`
  };
}

function relationPositionStyle(
  lens: MapLens,
  speakerId: string,
  index: number
): CSSProperties {
  if (lens === "default") {
    return portraitPosition(index);
  }

  const position = relationMemberPositions[lens][speakerId];
  if (!position) {
    return portraitPosition(index);
  }

  return {
    left: `${position.x}%`,
    top: `${position.y}%`
  };
}

function relationLabelsForMember(
  speakerId: string,
  lens: MapLens,
  clusters: RelationCluster[]
) {
  const metadata = memberRelations[speakerId];
  const ids =
    lens === "values"
      ? metadata?.valueClusters ?? []
      : lens === "methods"
        ? metadata?.methodologies ?? []
        : lens === "issues"
          ? metadata?.issues ?? []
          : [];

  return ids
    .map((id) => clusters.find((cluster) => cluster.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}

function recommendedButtonLabel(issue: MainIssue, selectedSpeakerIds: string[]) {
  const recommendedIds = issue.recommendedMemberIds;
  const allRecommendedSelected = recommendedIds.every((id) => selectedSpeakerIds.includes(id));
  if (selectedSpeakerIds.length >= 3 && !allRecommendedSelected) {
    return "圆桌已满";
  }
  if (allRecommendedSelected) {
    return "已加入圆桌";
  }
  return "一键加入圆桌";
}

export default function Home() {
  const [speakers, setSpeakers] = useState<SpeakerInfo[]>([]);
  const [selectedSpeakerIds, setSelectedSpeakerIds] = useState<string[]>([]);
  const [activeLens, setActiveLens] = useState<MapLens>("default");
  const [focusedClusterId, setFocusedClusterId] = useState<string | null>(null);
  const [hoveredClusterId, setHoveredClusterId] = useState<string | null>(null);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);
  const [roundtableNotice, setRoundtableNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getRoundtableSpeakers()
      .then((items) => {
        if (!isMounted) {
          return;
        }
        setSpeakers(items);
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

  const roundtableHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("speakers", selectedSpeakerIds.join(","));
    return `/roundtable?${params.toString()}`;
  }, [selectedSpeakerIds]);

  const relationClusters = useMemo(() => {
    if (activeLens === "values") {
      return valueClusters;
    }
    if (activeLens === "methods") {
      return methodClusters;
    }
    if (activeLens === "issues") {
      return mainIssues;
    }
    return [];
  }, [activeLens]);

  const activeClusterId = hoveredClusterId ?? focusedClusterId;
  const activeCluster = useMemo(
    () => relationClusters.find((cluster) => cluster.id === activeClusterId) ?? null,
    [activeClusterId, relationClusters]
  );
  const focusedIssue = useMemo(
    () =>
      activeLens === "issues"
        ? (mainIssues.find((issue) => issue.id === focusedClusterId) ?? null)
        : null,
    [activeLens, focusedClusterId]
  );
  const sideCluster = activeLens === "issues" ? focusedIssue : activeCluster;

  const hoveredMemberClusterIds = useMemo(() => {
    if (!hoveredMemberId || activeLens === "default") {
      return [];
    }
    const metadata = memberRelations[hoveredMemberId];
    return activeLens === "values"
      ? metadata?.valueClusters ?? []
      : activeLens === "methods"
        ? metadata?.methodologies ?? []
        : activeLens === "issues"
          ? metadata?.issues ?? []
          : [];
  }, [activeLens, hoveredMemberId]);

  function toggleRoundtableSpeaker(speakerId: string) {
    setSelectedSpeakerIds((current) => {
      if (current.includes(speakerId)) {
        return current.filter((id) => id !== speakerId);
      }
      if (current.length >= 3) {
        return current;
      }
      return [...current, speakerId];
    });
  }

  function addRecommendedRoundtable(issue: MainIssue) {
    const knownSpeakerIds = new Set(speakers.map((speaker) => speaker.speaker_id));
    const availableRecommendedIds = issue.recommendedMemberIds.filter((id) =>
      knownSpeakerIds.has(id)
    );
    const remainingSlots = 3 - selectedSpeakerIds.length;

    if (remainingSlots <= 0) {
      setRoundtableNotice("圆桌席位已满。");
      return;
    }

    const nextIds = availableRecommendedIds
      .filter((id) => !selectedSpeakerIds.includes(id))
      .slice(0, remainingSlots);

    if (!nextIds.length) {
      setRoundtableNotice("推荐成员已加入圆桌。");
      return;
    }

    setSelectedSpeakerIds((current) => [...current, ...nextIds]);
    setRoundtableNotice(
      nextIds.length === availableRecommendedIds.length
        ? "推荐成员已加入圆桌。"
        : `已加入 ${nextIds.length} 位推荐成员，圆桌席位已满。`
    );
  }

  function changeLens(nextLens: MapLens) {
    setActiveLens(nextLens);
    setFocusedClusterId(null);
    setHoveredClusterId(null);
    setHoveredMemberId(null);
    setRoundtableNotice("");
  }

  function toggleCluster(clusterId: string) {
    setFocusedClusterId((current) => (current === clusterId ? null : clusterId));
    setRoundtableNotice("");
  }

  function isSpeakerDimmed(speakerId: string) {
    if (activeLens === "default") {
      return false;
    }
    if (activeCluster) {
      return !activeCluster.memberIds.includes(speakerId);
    }
    return false;
  }

  return (
    <main className="map-home-shell">
      <section className="portrait-field-panel">
        <div className="map-home-header">
          <div>
            <div className="avatar">
              <Sparkles size={32} />
            </div>
            <h1>B Community 成员星图</h1>
            <p>点击头像进入个人主页；右侧可以选择 3 位成员发起圆桌讨论。</p>
          </div>
          <div className="map-lens-control" aria-label="关系视角">
            <span>关系视角</span>
            <div>
              {mapLensOptions.map((option) => (
                <button
                  aria-pressed={activeLens === option.key}
                  className={activeLens === option.key ? "active" : ""}
                  key={option.key}
                  onClick={() => changeLens(option.key)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error ? <p className="error-text">服务暂时不可用：{error}</p> : null}

        <div
          className={`portrait-field lens-${activeLens}`}
          aria-label="B Community 成员头像展示"
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (event.currentTarget === target || target.classList.contains("portrait-field-grid")) {
              setFocusedClusterId(null);
            }
          }}
        >
          <div className="portrait-field-grid" aria-hidden="true" />
          {!speakers.length && !error ? (
            <div className="portrait-empty">正在加载成员头像...</div>
          ) : null}
          {activeLens !== "default" ? (
            <svg className="relation-edges" aria-hidden="true">
              {relationClusters.flatMap((cluster) =>
                cluster.memberIds.map((memberId) => {
                  const memberPosition = relationMemberPositions[activeLens][memberId];
                  if (!memberPosition || !speakers.some((speaker) => speaker.speaker_id === memberId)) {
                    return null;
                  }
                  const isClusterActive = activeClusterId === cluster.id;
                  const isMemberHovered = hoveredMemberId === memberId;
                  const isHoverRelated = hoveredMemberClusterIds.includes(cluster.id);

                  return (
                    <line
                      className={`relation-edge ${
                        isClusterActive || isMemberHovered || isHoverRelated ? "active" : ""
                      } ${activeCluster && !isClusterActive ? "muted" : ""}`}
                      key={`${cluster.id}-${memberId}`}
                      x1={`${cluster.position.x}%`}
                      y1={`${cluster.position.y}%`}
                      x2={`${memberPosition.x}%`}
                      y2={`${memberPosition.y}%`}
                    />
                  );
                })
              )}
            </svg>
          ) : null}
          {relationClusters.map((cluster) => {
            const isActive = activeClusterId === cluster.id;
            const isMuted = Boolean(activeClusterId) && !isActive;

            return (
              <button
                className={`relation-cluster-node ${isActive ? "active" : ""} ${
                  isMuted ? "muted" : ""
                }`}
                key={cluster.id}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleCluster(cluster.id);
                }}
                onMouseEnter={() => setHoveredClusterId(cluster.id)}
                onMouseLeave={() => setHoveredClusterId(null)}
                style={{
                  left: `${cluster.position.x}%`,
                  top: `${cluster.position.y}%`
                }}
                type="button"
              >
                {cluster.shortLabel ?? cluster.label}
              </button>
            );
          })}
          {speakers.map((speaker, index) => (
            <Link
              aria-label={`进入 ${speaker.name} 的个人主页`}
              className={`portrait-marker ${isSpeakerDimmed(speaker.speaker_id) ? "dimmed" : ""}`}
              href={`/member/${speaker.speaker_id}`}
              key={speaker.speaker_id}
              onMouseEnter={() => setHoveredMemberId(speaker.speaker_id)}
              onMouseLeave={() => setHoveredMemberId(null)}
              style={relationPositionStyle(activeLens, speaker.speaker_id, index)}
            >
              <SpeakerAvatar
                className="field-member-avatar"
                showMark={false}
                speakerId={speaker.speaker_id}
              />
              <span>{speaker.name}</span>
              {activeLens !== "default" && hoveredMemberId === speaker.speaker_id ? (
                <span className="relation-tooltip">
                  <strong>{speaker.name}</strong>
                  <small>
                    {activeLens === "values"
                      ? "关联价值观："
                      : activeLens === "methods"
                        ? "实践方法："
                        : "相关议题："}
                  </small>
                  {relationLabelsForMember(speaker.speaker_id, activeLens, relationClusters).map(
                    (label) => (
                      <em key={label}>• {label}</em>
                    )
                  )}
                </span>
              ) : null}
            </Link>
          ))}
          {activeCluster ? (
            <aside className="relation-description">
              <strong>{activeCluster.label}</strong>
              <p>{activeCluster.description}</p>
            </aside>
          ) : null}
        </div>
      </section>

      <aside className="roundtable-picker-panel">
        <div className="picker-header">
          <div className="avatar">
            <UsersRound size={28} />
          </div>
          <div>
            <h2>圆桌对话</h2>
            <p>选择 3 位成员组成本轮圆桌。</p>
          </div>
        </div>

        {sideCluster ? (
          <div className="relation-side-note">
            <span>{activeLens === "issues" ? "当前议题：" : "当前关系："}</span>
            <strong>{sideCluster.label}</strong>
            <p>相关成员：{sideCluster.memberIds.length} 位</p>
          </div>
        ) : null}

        {activeLens === "issues" ? (
          focusedIssue ? (
            <section className="recommended-roundtable-card">
              <div className="recommended-card-head">
                <span>推荐圆桌</span>
                <strong>{focusedIssue.label}</strong>
              </div>
              <div className="recommended-members">
                {focusedIssue.recommendedMemberIds.map((memberId) => {
                  const member = speakers.find((speaker) => speaker.speaker_id === memberId);
                  if (!member) {
                    return null;
                  }
                  const isSelected = selectedSpeakerIds.includes(memberId);

                  return (
                    <div className={isSelected ? "selected" : ""} key={memberId}>
                      <SpeakerAvatar
                        className="mini-member-avatar"
                        showMark={false}
                        speakerId={memberId}
                      />
                      <span>{member.name}</span>
                      {isSelected ? <Check size={13} /> : null}
                    </div>
                  );
                })}
              </div>
              <div className="recommended-copy">
                <span>对谈问题</span>
                <p>{focusedIssue.question}</p>
              </div>
              <div className="recommended-copy compact">
                <span>推荐理由</span>
                <p>{focusedIssue.recommendationReason}</p>
              </div>
              <button
                disabled={
                  selectedSpeakerIds.length >= 3 ||
                  focusedIssue.recommendedMemberIds.every((id) =>
                    selectedSpeakerIds.includes(id)
                  )
                }
                onClick={() => addRecommendedRoundtable(focusedIssue)}
                type="button"
              >
                {recommendedButtonLabel(focusedIssue, selectedSpeakerIds)}
              </button>
              {roundtableNotice ? <p className="roundtable-notice">{roundtableNotice}</p> : null}
            </section>
          ) : (
            <div className="issue-empty-hint">选择地图中的一个主要议题，查看推荐圆桌。</div>
          )
        ) : null}

        <div className="selection-dock compact">
          <div>
            <span>已选择 {selectedSpeakerIds.length}/3</span>
            <p>{selectedSpeakerIds.length === 3 ? "可以进入圆桌" : "从名单中加入成员"}</p>
          </div>
          <Link
            aria-disabled={selectedSpeakerIds.length !== 3}
            className={`primary-link ${selectedSpeakerIds.length === 3 ? "" : "disabled"}`}
            href={selectedSpeakerIds.length === 3 ? roundtableHref : "#"}
          >
            <UsersRound size={18} />
            开始
          </Link>
        </div>

        {selectedSpeakers.length ? (
          <div className="selected-strip">
            {selectedSpeakers.map((speaker) => (
              <button
                className="selected-person"
                key={speaker.speaker_id}
                onClick={() => toggleRoundtableSpeaker(speaker.speaker_id)}
                type="button"
              >
                <SpeakerAvatar
                  className="mini-member-avatar"
                  showMark={false}
                  speakerId={speaker.speaker_id}
                />
                <span>{speaker.name}</span>
                <X size={14} />
              </button>
            ))}
          </div>
        ) : null}

        <div className="picker-list">
          {speakers.map((speaker) => {
            const isSelected = selectedSpeakerIds.includes(speaker.speaker_id);
            const isLocked = !isSelected && selectedSpeakerIds.length >= 3;

            return (
              <div className="picker-row" key={speaker.speaker_id}>
                <Link className="picker-person-link" href={`/member/${speaker.speaker_id}`}>
                  <SpeakerAvatar
                    className="mini-member-avatar"
                    showMark={false}
                    speakerId={speaker.speaker_id}
                  />
                  <div>
                    <strong>{speaker.name}</strong>
                    <small>
                      {speaker.location} · {speaker.role}
                    </small>
                  </div>
                </Link>
                <button
                  aria-label={`${isSelected ? "移出" : "加入"}圆桌：${speaker.name}`}
                  className={`picker-toggle ${isSelected ? "selected" : ""}`}
                  disabled={isLocked}
                  onClick={() => toggleRoundtableSpeaker(speaker.speaker_id)}
                  type="button"
                >
                  {isSelected ? <Check size={16} /> : <Plus size={16} />}
                </button>
              </div>
            );
          })}
        </div>
      </aside>
    </main>
  );
}
