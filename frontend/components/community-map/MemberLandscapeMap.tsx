"use client";

import { useMemo } from "react";
import { type SpeakerInfo } from "@/lib/api";
import {
  type MapLens,
  type RelationCluster,
  relationMemberPositions,
  memberRelations,
} from "@/lib/memberRelations";
import {
  getLandscapePosition,
  validateMapNodeOverlaps,
} from "@/lib/memberMapVisuals";
import { LandscapeBackground } from "./LandscapeBackground";
import { LandscapeDecorations } from "./LandscapeDecorations";
import { RelationshipLayer } from "./RelationshipLayer";
import { MemberLandmarkNode } from "./MemberLandmarkNode";

export type MemberLandscapeMapProps = {
  speakers: SpeakerInfo[];
  activeLens: MapLens;
  selectedSpeakerIds: string[];
  focusedClusterId: string | null;
  activeClusterId: string | null;
  hoveredMemberId: string | null;
  hoveredMemberClusterIds: string[];
  relationClusters: RelationCluster[];
  onClusterToggle: (id: string) => void;
  onClusterHover: (id: string | null) => void;
  onMemberHover: (id: string | null) => void;
  onBackgroundClick: () => void;
};

const SAFE_X_MIN = 6;
const SAFE_X_MAX = 94;
const SAFE_Y_MIN = 11;
const SAFE_Y_MAX = 89;

function clampPercent(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function MemberLandscapeMap({
  speakers,
  activeLens,
  selectedSpeakerIds,
  activeClusterId,
  relationClusters,
  hoveredMemberId,
  hoveredMemberClusterIds,
  onClusterToggle,
  onClusterHover,
  onMemberHover,
  onBackgroundClick,
}: MemberLandscapeMapProps) {
  // Compute positions for all speakers based on current lens
  const speakerPositions = useMemo(() => {
    return speakers.map((speaker, index) => {
      let x: number;
      let y: number;

      if (activeLens === "default") {
        const pos = getLandscapePosition(speaker.speaker_id, index);
        x = pos.x;
        y = pos.y;
      } else {
        const positions = relationMemberPositions[activeLens];
        const pos = positions[speaker.speaker_id];
        if (pos) {
          x = pos.x;
          y = pos.y;
        } else {
          const fallback = getLandscapePosition(speaker.speaker_id, index);
          x = fallback.x;
          y = fallback.y;
        }
      }

      return {
        id: speaker.speaker_id,
        left: `${clampPercent(x, SAFE_X_MIN, SAFE_X_MAX)}%`,
        top: `${clampPercent(y, SAFE_Y_MIN, SAFE_Y_MAX)}%`,
        rawX: x,
        rawY: y,
      };
    });
  }, [speakers, activeLens]);

  // Dev-mode overlap check
  useMemo(() => {
    if (process.env.NODE_ENV === "development") {
      validateMapNodeOverlaps(
        speakerPositions.map((p) => ({ id: p.id, x: p.rawX, y: p.rawY })),
      );
    }
    return null;
  }, [speakerPositions]);

  const selectedSet = new Set(selectedSpeakerIds);

  return (
    <div
      className={`member-landscape-map lens-${activeLens}`}
      aria-label="B Community 成员地图"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onBackgroundClick();
        }
      }}
    >
      {/* Layer 0: Background */}
      <div className="landscape-bg-layer">
        <LandscapeBackground />
      </div>

      {/* Layer 1: Decorations (pointer-events: none in CSS) */}
      <div className="landscape-deco-layer">
        <LandscapeDecorations />
      </div>

      {/* Layer 2: Relationship edges (non-default lenses) */}
      {activeLens !== "default" && (
        <div className="landscape-relation-layer">
          <RelationshipLayer
            activeLens={activeLens}
            clusters={relationClusters}
            memberPositions={relationMemberPositions[activeLens]}
            speakers={speakers}
            activeClusterId={activeClusterId}
            hoveredMemberId={hoveredMemberId}
            hoveredMemberClusterIds={hoveredMemberClusterIds}
          />
        </div>
      )}

      {/* Layer 3: Relationship cluster nodes (non-default lenses) */}
      {activeLens !== "default" &&
        relationClusters.map((cluster) => {
          const isActive = activeClusterId === cluster.id;
          const isMuted = Boolean(activeClusterId) && !isActive;

          return (
            <button
              className={`relation-cluster-node ${isActive ? "active" : ""} ${isMuted ? "muted" : ""}`}
              key={cluster.id}
              onClick={(event) => {
                event.stopPropagation();
                onClusterToggle(cluster.id);
              }}
              onMouseEnter={() => onClusterHover(cluster.id)}
              onMouseLeave={() => onClusterHover(null)}
              style={{
                left: `${cluster.position.x}%`,
                top: `${cluster.position.y}%`,
              }}
              type="button"
            >
              {cluster.shortLabel ?? cluster.label}
            </button>
          );
        })}

      {/* Layer 4: Member landmarks */}
      <div className="landscape-member-layer">
        {speakers.map((speaker, index) => {
          const pos = speakerPositions[index];

          // Determine dimmed state for non-default lenses
          let isDimmed = false;
          if (activeLens !== "default" && activeClusterId) {
            const metadata = memberRelations[speaker.speaker_id];
            const clusterIds =
              activeLens === "values"
                ? metadata?.valueClusters ?? []
                : activeLens === "methods"
                  ? metadata?.methodologies ?? []
                  : metadata?.issues ?? [];
            isDimmed = !clusterIds.includes(activeClusterId);
          }

          // Compute relation labels for hover tooltip
          let relationLabels: string[] = [];
          if (activeLens !== "default") {
            const metadata = memberRelations[speaker.speaker_id];
            const ids =
              activeLens === "values"
                ? metadata?.valueClusters ?? []
                : activeLens === "methods"
                  ? metadata?.methodologies ?? []
                  : metadata?.issues ?? [];

            relationLabels = ids
              .map((id) => relationClusters.find((c) => c.id === id)?.label)
              .filter((label): label is string => Boolean(label));
          }

          return (
            <MemberLandmarkNode
              key={speaker.speaker_id}
              speaker={speaker}
              position={{ left: pos.left, top: pos.top }}
              isSelected={selectedSet.has(speaker.speaker_id)}
              isDimmed={isDimmed}
              isFocused={hoveredMemberId === speaker.speaker_id}
              activeLens={activeLens}
              relationLabels={relationLabels}
              onHover={onMemberHover}
            />
          );
        })}
      </div>
    </div>
  );
}
