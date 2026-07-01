"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, Plus, Sparkles, UsersRound, X } from "lucide-react";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";
import { SpeakerInfo, getRoundtableSpeakers } from "@/lib/api";

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

export default function Home() {
  const [speakers, setSpeakers] = useState<SpeakerInfo[]>([]);
  const [selectedSpeakerIds, setSelectedSpeakerIds] = useState<string[]>([]);
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

  return (
    <main className="map-home-shell">
      <section className="portrait-field-panel">
        <div className="map-home-header">
          <div>
            <div className="avatar">
              <Sparkles size={32} />
            </div>
            <h1>BCommunity 成员星图</h1>
            <p>点击头像进入个人主页；右侧可以选择 3 位成员发起圆桌讨论。</p>
          </div>
          <span className="status">PEOPLE</span>
        </div>

        {error ? <p className="error-text">服务暂时不可用：{error}</p> : null}

        <div className="portrait-field" aria-label="BCommunity 成员头像展示">
          <div className="portrait-field-grid" aria-hidden="true" />
          {!speakers.length && !error ? (
            <div className="portrait-empty">正在加载成员头像...</div>
          ) : null}
          {speakers.map((speaker, index) => (
            <Link
              aria-label={`进入 ${speaker.name} 的个人主页`}
              className="portrait-marker"
              href={`/member/${speaker.speaker_id}`}
              key={speaker.speaker_id}
              style={portraitPosition(index)}
            >
              <SpeakerAvatar
                className="field-member-avatar"
                showMark={false}
                speakerId={speaker.speaker_id}
              />
              <span>{speaker.name}</span>
            </Link>
          ))}
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
                    <small>{speaker.location} · {speaker.role}</small>
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
