import type { VectorPropProps } from "./types";

export function CoffeeCupProp({ size = 44, rotation }: VectorPropProps) {
  return (
    <svg
      width={size}
      height={size * 0.95}
      viewBox="0 0 44 42"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      {/* Saucer */}
      <ellipse cx="22" cy="36" rx="18" ry="4" fill="#f0e8e0" stroke="#2d3036" strokeWidth="1.2" />
      {/* Cup body */}
      <path d="M8 14v12c0 6 6 10 14 10s14-4 14-10V14H8z" fill="#fff" stroke="#2d3036" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Handle */}
      <path d="M36 18c4 0 7 2 7 5s-3 5-7 5" fill="none" stroke="#2d3036" strokeWidth="1.5" strokeLinecap="round" />
      {/* Coffee surface */}
      <ellipse cx="22" cy="16" rx="12" ry="3" fill="#8b5e3c" stroke="#2d3036" strokeWidth="1" />
      {/* Steam */}
      <path d="M16 10c1-3 3-5 4-4M22 8c1-3 3-4 4-3M28 10c1-3 3-5 3-4" stroke="#2d3036" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
