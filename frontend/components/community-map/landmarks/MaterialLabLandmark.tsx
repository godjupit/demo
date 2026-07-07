export function MaterialLabLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Roof with material samples */}
      <path d="M12 40h72l-8-16H20l-8 16z" fill="#d5dde5" stroke="#8a9aa8" strokeWidth="1.5" />
      {/* Colored material samples on roof */}
      <rect x="28" y="28" width="8" height="6" rx="1" fill="#C88095" />
      <rect x="38" y="26" width="8" height="6" rx="1" fill="#88b7a4" />
      <rect x="48" y="28" width="8" height="6" rx="1" fill="#CFE8FF" />
      <rect x="58" y="26" width="8" height="6" rx="1" fill="#e6b655" />
      {/* Building body */}
      <rect x="14" y="40" width="68" height="44" rx="3" fill="#f5f7f9" stroke="#8a9aa8" strokeWidth="1.5" />
      {/* Fabric roll icon */}
      <rect x="18" y="50" width="16" height="22" rx="8" fill="#e8d5d5" stroke="#C88095" strokeWidth="1" />
      <ellipse cx="26" cy="50" rx="8" ry="3" fill="#dcc0c0" stroke="#C88095" strokeWidth="0.8" />
      <ellipse cx="26" cy="72" rx="8" ry="3" fill="#dcc0c0" stroke="#C88095" strokeWidth="0.8" />
      {/* Window */}
      <rect x="40" y="50" width="18" height="14" rx="2" fill="#CFE8FF" stroke="#8a9aa8" strokeWidth="1" />
      <line x1="49" y1="50" x2="49" y2="64" stroke="#8a9aa8" strokeWidth="0.8" />
      {/* Door */}
      <rect x="64" y="56" width="14" height="28" rx="2" fill="#8a9aa8" />
    </svg>
  );
}
