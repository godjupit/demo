import type { VectorPropProps } from "./types";

export function PaperProp({ size = 52, rotation }: VectorPropProps) {
  return (
    <svg
      width={size}
      height={size * 1.05}
      viewBox="0 0 52 55"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      <rect x="4" y="2" width="44" height="50" rx="2" fill="#fff" stroke="#2d3036" strokeWidth="1.5" />
      {/* Folded corner */}
      <path d="M38 2l10 10H40c-1 0-2-1-2-2V2z" fill="#f8f0e0" stroke="#2d3036" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Lines */}
      <line x1="10" y1="16" x2="36" y2="16" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      <line x1="10" y1="22" x2="42" y2="22" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      <line x1="10" y1="28" x2="38" y2="28" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      <line x1="10" y1="34" x2="40" y2="34" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      <line x1="10" y1="40" x2="30" y2="40" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}
