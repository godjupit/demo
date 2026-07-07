export function GameCharacterLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Two small characters */}
      {/* Character 1 (left, taller) */}
      <circle cx="34" cy="28" r="7" fill="#f0d5c0" stroke="#394f8a" strokeWidth="1.2" />
      <path d="M28 40c3-3 10-3 12 0" fill="#394f8a" stroke="#394f8a" strokeWidth="0.8" />
      <rect x="28" y="38" width="12" height="18" rx="3" fill="#5b74b8" stroke="#394f8a" strokeWidth="1" />
      <rect x="30" y="40" width="4" height="6" rx="1" fill="#394f8a" />
      <rect x="38" y="40" width="4" height="6" rx="1" fill="#394f8a" />
      {/* Character 2 (right, shorter) */}
      <circle cx="58" cy="32" r="6" fill="#f0d5c0" stroke="#394f8a" strokeWidth="1" />
      <rect x="52" y="40" width="13" height="16" rx="3" fill="#8ba0c0" stroke="#394f8a" strokeWidth="1" />
      {/* Game flag */}
      <rect x="64" y="28" width="2" height="22" rx="0.5" fill="#8b6e4e" />
      <path d="M66 28l12 5-12 6z" fill="#f0b44c" stroke="#d4952a" strokeWidth="0.8" />
      {/* Dice near character 1 */}
      <rect x="18" y="52" width="7" height="7" rx="1" fill="#fff" stroke="#394f8a" strokeWidth="0.8" />
      <circle cx="21.5" cy="55.5" r="1" fill="#394f8a" />
      {/* Ground */}
      <path d="M20 60h56" stroke="#c5dba8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
