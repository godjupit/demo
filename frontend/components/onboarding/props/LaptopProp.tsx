import type { VectorPropProps } from "./types";

export function LaptopProp({ size = 72, rotation }: VectorPropProps) {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 72 47"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      {/* Screen lid */}
      <rect x="8" y="4" width="56" height="32" rx="3" fill="#f8f4f0" stroke="#2d3036" strokeWidth="1.5" />
      {/* Screen */}
      <rect x="12" y="8" width="48" height="24" rx="1" fill="#CFE8FF" stroke="#2d3036" strokeWidth="1" />
      {/* Screen content lines */}
      <rect x="16" y="12" width="24" height="3" rx="1" fill="#2d3036" opacity="0.3" />
      <rect x="16" y="18" width="36" height="2" rx="1" fill="#2d3036" opacity="0.15" />
      <rect x="16" y="22" width="30" height="2" rx="1" fill="#2d3036" opacity="0.15" />
      <rect x="16" y="26" width="20" height="2" rx="1" fill="#2d3036" opacity="0.15" />
      {/* Camera dot */}
      <circle cx="36" cy="6" r="1.5" fill="#2d3036" />
      {/* Base/keyboard */}
      <path d="M4 36h64l-4 8H8l-4-8z" fill="#e8e0d8" stroke="#2d3036" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="14" y1="38" x2="58" y2="38" stroke="#2d3036" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}
