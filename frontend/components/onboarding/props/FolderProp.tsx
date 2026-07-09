import type { VectorPropProps } from "./types";

export function FolderProp({ size = 64, rotation }: VectorPropProps) {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 64 51"
      fill="none"
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
      aria-hidden="true"
    >
      {/* Folder back */}
      <path d="M6 14h18l4-7h30v34c0 2-1.5 4-4 4H10c-2.5 0-4-2-4-4V14z" fill="#ffd457" fillOpacity="0.35" stroke="#2d3036" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Folder tab */}
      <path d="M6 14h18l4-7H6v7z" fill="#ffd457" fillOpacity="0.55" stroke="#2d3036" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Paper peeking out */}
      <rect x="12" y="20" width="28" height="16" rx="1" fill="#fff" stroke="#2d3036" strokeWidth="1" />
      <line x1="16" y1="25" x2="36" y2="25" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="16" y1="29" x2="34" y2="29" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="16" y1="33" x2="30" y2="33" stroke="#2d3036" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
