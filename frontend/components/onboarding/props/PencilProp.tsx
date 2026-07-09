import type { VectorPropProps } from "./types";
import { useAccent } from "./types";

export function PencilProp({ size = 64, rotation, accent }: VectorPropProps) {
  const body = useAccent(accent, "#1baee8");
  return (
    <svg
      width={size}
      height={size * 0.3}
      viewBox="0 0 64 19"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      {/* Pencil body */}
      <rect x="4" y="6" width="48" height="7" rx="1" fill={body} fillOpacity="0.4" stroke="#2d3036" strokeWidth="1.5" />
      {/* Tip */}
      <path d="M52 6l10 3.5L52 13V6z" fill="#f8e8d0" stroke="#2d3036" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="58" y1="8" x2="58" y2="11" stroke="#2d3036" strokeWidth="0.8" />
      {/* Eraser end */}
      <rect x="2" y="6" width="4" height="7" rx="1" fill="#ff8a4d" stroke="#2d3036" strokeWidth="1.2" />
      {/* Metal band */}
      <rect x="6" y="6" width="2" height="7" fill="#ccc" stroke="#2d3036" strokeWidth="0.8" />
    </svg>
  );
}
