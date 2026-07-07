"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Plus, Sparkles, UsersRound, X } from "lucide-react";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";
import { SpeakerInfo, getRoundtableSpeakers } from "@/lib/api";
import {
  MapLens,
  MainIssue,
  mainIssues,
  memberRelations,
  methodClusters,
  valueClusters,
} from "@/lib/memberRelations";
import { MemberLandscapeMap } from "@/components/community-map/MemberLandscapeMap";

const mapLensOptions: Array<{ key: MapLens; label: string }> = [
  { key: "default", label: "自由星图" },
  { key: "values", label: "价值观" },
  { key: "methods", label: "方法论" },
  { key: "issues", label: "主要议题" },
];

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
    [speakers, selectedSpeakerIds],
  );

  const roundtableHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("speakers", selectedSpeakerIds.join(","));
    return `/roundtable?${params.toString()}`;
  }, [selectedSpeakerIds]);

  const relationClusters = useMemo(() => {
    if (activeLens === "values") return valueClusters;
    if (activeLens === "methods") return methodClusters;
    if (activeLens === "issues") return mainIssues;
    return [];
  }, [activeLens]);

  const activeClusterId = hoveredClusterId ?? focusedClusterId;
  const activeCluster = useMemo(
    () => relationClusters.find((cluster) => cluster.id === activeClusterId) ?? null,
    [activeClusterId, relationClusters],
  );
  const focusedIssue = useMemo(
    () =>
      activeLens === "issues"
        ? (mainIssues.find((issue) => issue.id === focusedClusterId) ?? null)
        : null,
    [activeLens, focusedClusterId],
  );
  const sideCluster = activeLens === "issues" ? focusedIssue : activeCluster;

  const hoveredMemberClusterIds = useMemo(() => {
    if (!hoveredMemberId || activeLens === "default") return [];
    const metadata = memberRelations[hoveredMemberId];
    return activeLens === "values"
      ? metadata?.valueClusters ?? []
      : activeLens === "methods"
        ? metadata?.methodologies ?? []
        : metadata?.issues ?? [];
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
      knownSpeakerIds.has(id),
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
        : `已加入 ${nextIds.length} 位推荐成员，圆桌席位已满。`,
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

  return (
    <main className="map-home-shell">
      <section className="portrait-field-panel">
        {/* Map Header */}
        <div className="map-home-header">
          <div className="map-title-group">
            <div className="map-header-icon">
              <Sparkles size={24} />
            </div>
            <div className="map-title-copy">
              <h1>B Community 成员地图</h1>
              <p>在共同景观中遇见实践者，并邀请他们进入圆桌。</p>
            </div>
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

        {/* Member Landscape Map */}
        {!speakers.length && !error ? (
          <div className="portrait-empty">正在加载成员...</div>
        ) : (
          <MemberLandscapeMap
            speakers={speakers}
            activeLens={activeLens}
            selectedSpeakerIds={selectedSpeakerIds}
            focusedClusterId={focusedClusterId}
            activeClusterId={activeClusterId}
            hoveredMemberId={hoveredMemberId}
            hoveredMemberClusterIds={hoveredMemberClusterIds}
            relationClusters={relationClusters}
            onClusterToggle={toggleCluster}
            onClusterHover={setHoveredClusterId}
            onMemberHover={setHoveredMemberId}
            onBackgroundClick={() => setFocusedClusterId(null)}
          />
        )}

        {/* Relation description (bottom-left overlay) */}
        {activeCluster && activeLens !== "issues" ? (
          <aside className="relation-description">
            <strong>{activeCluster.label}</strong>
            <p>{activeCluster.description}</p>
          </aside>
        ) : null}
      </section>

      {/* Roundtable Panel (right sidebar) */}
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
                    selectedSpeakerIds.includes(id),
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
