import type { VectorPropProps } from "./types";

export function NotebookProp({ size = 60, rotation }: VectorPropProps) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 60 66"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      {/* Cover */}
      <rect x="6" y="4" width="48" height="58" rx="3" fill="#fff" stroke="#2d3036" strokeWidth="1.5" />
      {/* Spine */}
      <line x1="12" y1="4" x2="12" y2="62" stroke="#ff8a4d" strokeWidth="2" />
      {/* Lines */}
      <line x1="18" y1="14" x2="48" y2="14" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <line x1="18" y1="20" x2="48" y2="20" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <line x1="18" y1="26" x2="48" y2="26" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <line x1="18" y1="32" x2="42" y2="32" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <line x1="18" y1="38" x2="48" y2="38" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <line x1="18" y1="44" x2="38" y2="44" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      {/* Pencil in spine */}
      <line x1="10" y1="20" x2="6" y2="34" stroke="#1baee8" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="34" x2="4" y2="38" stroke="#ff5664" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bookmark */}
      <path d="M48 4v16l-5-4-5 4V4" fill="#ffd457" fillOpacity="0.5" stroke="#2d3036" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}
