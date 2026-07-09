import type { VectorPropProps } from "./types";
import { useAccent } from "./types";

export function AppleProp({ size = 48, rotation, accent }: VectorPropProps) {
  const fill = useAccent(accent, "#ff5664");
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 48 53"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      <path d="M30 4c1-2 2-3 3-3s1 1 0 3c-2 3-6 5-9 5s-7-2-9-5c-1-2 0-3 1-3s2 1 3 3c1 1 3 2 5 2s4-1 6-2z" fill="#20c98a" />
      <path d="M10 20c0-6 4-12 14-14 10 2 14 8 14 14 0 12-3 26-14 26S10 32 10 20z" fill={fill} fillOpacity="0.25" stroke="#2d3036" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 22c2-4 6-4 6-4s0 0 0 0" stroke="#2d3036" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
