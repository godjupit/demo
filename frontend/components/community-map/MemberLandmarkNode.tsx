"use client";

import { useRouter } from "next/navigation";
import { type SpeakerInfo } from "@/lib/api";
import { type MapLens } from "@/lib/memberRelations";
import { getMemberMapVisual } from "@/lib/memberMapVisuals";
import { LandmarkIllustration } from "./LandmarkIllustration";
import { MemberNamePlate } from "./MemberNamePlate";

export type MemberLandmarkNodeProps = {
  speaker: SpeakerInfo;
  position: { left: string; top: string };
  isSelected: boolean;
  isDimmed: boolean;
  isFocused: boolean;
  activeLens: MapLens;
  relationLabels: string[];
  onHover: (id: string | null) => void;
};

export function MemberLandmarkNode({
  speaker,
  position,
  isSelected,
  isDimmed,
  isFocused,
  activeLens,
  relationLabels,
  onHover,
}: MemberLandmarkNodeProps) {
  const router = useRouter();
  const visual = getMemberMapVisual(speaker.speaker_id);

  const classNames = [
    "member-landmark-node",
    `member-landmark-node--${visual.mapStyleGroup}`,
    isSelected ? "is-selected" : "",
    isDimmed ? "is-dimmed" : "",
    isFocused ? "is-focused" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showRelationTooltip =
    activeLens !== "default" && isFocused && relationLabels.length > 0;

  const lensLabel =
    activeLens === "values"
      ? "关联价值观："
      : activeLens === "methods"
        ? "实践方法："
        : activeLens === "issues"
          ? "相关议题："
          : "";

  return (
    <button
      className={classNames}
      style={{
        left: position.left,
        top: position.top,
      }}
      onClick={() => router.push(`/member/${speaker.speaker_id}`)}
      onMouseEnter={() => onHover(speaker.speaker_id)}
      onMouseLeave={() => onHover(null)}
      aria-label={`查看 ${speaker.name} 的个人主页`}
      type="button"
    >
      <div className="landmark-visual">
        <LandmarkIllustration
          type={visual.landmarkType}
          variant={visual.landmarkVariant}
          accent={visual.accent}
        />
      </div>
      <MemberNamePlate
        label={visual.shortLabel ?? speaker.name}
        fullName={speaker.name}
        isSelected={isSelected}
      />

      {/* Relation tooltip on hover */}
      {showRelationTooltip ? (
        <span className="relation-tooltip">
          <strong>{speaker.name}</strong>
          <small>{lensLabel}</small>
          {relationLabels.map((label) => (
            <em key={label}>• {label}</em>
          ))}
        </span>
      ) : null}
    </button>
  );
}
