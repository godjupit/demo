import type { VectorPropProps } from "./types";

export function LampProp({ size = 56, rotation }: VectorPropProps) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 56 64"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      {/* Base */}
      <ellipse cx="28" cy="56" rx="16" ry="4" fill="#e8e0d8" stroke="#2d3036" strokeWidth="1.2" />
      {/* Stem */}
      <line x1="28" y1="14" x2="28" y2="54" stroke="#2d3036" strokeWidth="1.8" strokeLinecap="round" />
      {/* Shade */}
      <path d="M14 14l14-12 14 12c0 2-1 6-3 8H17c-2-2-3-6-3-8z" fill="#ffd457" fillOpacity="0.4" stroke="#2d3036" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Light glow */}
      <ellipse cx="28" cy="24" rx="8" ry="3" fill="#ffd457" fillOpacity="0.3" />
      {/* Bulb hint */}
      <circle cx="28" cy="24" r="2" fill="#fff" stroke="#2d3036" strokeWidth="0.8" />
    </svg>
  );
}
