import { useMemo } from "react";
import { type MapLens, type RelationCluster, type NodePosition } from "@/lib/memberRelations";
import type { SpeakerInfo } from "@/lib/api";

export type RelationshipLayerProps = {
  activeLens: Exclude<MapLens, "default">;
  clusters: RelationCluster[];
  memberPositions: Record<string, NodePosition>;
  speakers: SpeakerInfo[];
  activeClusterId: string | null;
  hoveredMemberId: string | null;
  hoveredMemberClusterIds: string[];
};

type Point = { x: number; y: number };

/**
 * Build a single continuous cubic bezier curve from center to member.
 * Uses gentle lateral offset for a natural arc — never dashed, never segmented.
 */
function buildCurve(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 1) return `M${from.x} ${from.y} L${to.x} ${to.y}`;

  // Perpendicular direction for gentle lateral arc
  const nx = -dy / dist;
  const ny = dx / dist;
  const arc = Math.min(dist * 0.14, 8);

  const cp1x = from.x + dx * 0.35 + nx * arc;
  const cp1y = from.y + dy * 0.35 + ny * arc;
  const cp2x = from.x + dx * 0.65 - nx * arc * 0.5;
  const cp2y = from.y + dy * 0.65 - ny * arc * 0.5;

  return `M${from.x} ${from.y} C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
}

/**
 * Tiny spread so multiple edges from one cluster don't overlap perfectly.
 */
function spread(seq: number, total: number): Point {
  if (total <= 1) return { x: 0, y: 0 };
  const a = (seq / (total - 1) - 0.5) * Math.PI * 0.5;
  const r = 2.2;
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
}

export function RelationshipLayer({
  activeLens,
  clusters,
  memberPositions,
  speakers,
  activeClusterId,
  hoveredMemberId,
  hoveredMemberClusterIds,
}: RelationshipLayerProps) {
  const groups = useMemo(() => {
    const idSet = new Set(speakers.map((s) => s.speaker_id));
    return clusters.map((cluster) => ({
      cluster,
      connections: cluster.memberIds
        .map((mid) => ({ memberId: mid, pos: memberPositions[mid] }))
        .filter((c) => c.pos && idSet.has(c.memberId)),
    }));
  }, [clusters, memberPositions, speakers]);

  return (
    <svg
      className={`relationship-layer relationship-layer--${activeLens}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {groups.map(({ cluster, connections }) =>
        connections.map((conn, i) => {
          const focused = activeClusterId === cluster.id;
          const memberHovered = hoveredMemberId === conn.memberId;
          const hoverRelated = hoveredMemberClusterIds.includes(cluster.id);
          const active = focused || memberHovered || hoverRelated;
          const dimmed = Boolean(activeClusterId) && !focused;

          // Spread origin slightly
          const s = spread(i, connections.length);
          const from: Point = { x: cluster.position.x + s.x, y: cluster.position.y + s.y };
          // Anchor ~4.5 units above member center (label / landmark boundary)
          const to: Point = { x: conn.pos.x, y: conn.pos.y - 4.5 };

          const cls = [
            "relation-edge",
            `relation-edge--${activeLens}`,
            active ? "active" : "",
            active ? `relation-edge--active-${activeLens}` : "",
            dimmed ? "muted" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <path
              key={`${cluster.id}-${conn.memberId}`}
              className={cls}
              d={buildCurve(from, to)}
              vectorEffect="non-scaling-stroke"
            />
          );
        }),
      )}
    </svg>
  );
}
