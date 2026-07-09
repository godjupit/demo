import type { VectorPropProps } from "./types";

export function PlantProp({ size = 72, rotation }: VectorPropProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 72 86"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      {/* Pot */}
      <path d="M26 72h20l2 10H24l2-10z" fill="#f0d8c0" stroke="#2d3036" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="22" y="70" width="28" height="4" rx="1" fill="#e8c8a8" stroke="#2d3036" strokeWidth="1.2" />
      {/* Stem */}
      <path d="M36 70V38" stroke="#2d3036" strokeWidth="1.5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M36 48c-10-8-18-6-20-2s4 6 12 4" fill="#20c98a" fillOpacity="0.3" stroke="#2d3036" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 44c10-8 18-6 20-2s-4 6-12 4" fill="#20c98a" fillOpacity="0.3" stroke="#2d3036" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 52c-8-6-14-4-16 0s3 5 9 3" fill="#20c98a" fillOpacity="0.2" stroke="#2d3036" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 48c8-6 14-4 16 0s-3 5-9 3" fill="#20c98a" fillOpacity="0.2" stroke="#2d3036" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Top leaves */}
      <ellipse cx="36" cy="36" rx="10" ry="5" fill="#20c98a" fillOpacity="0.35" stroke="#2d3036" strokeWidth="1.3" />
    </svg>
  );
}
