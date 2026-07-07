export function WriterCharacterLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Character */}
      <circle cx="40" cy="24" r="7" fill="#f0d5c0" stroke="#7b4368" strokeWidth="1.2" />
      <rect x="33" y="34" width="14" height="20" rx="4" fill="#8a5578" stroke="#7b4368" strokeWidth="1" />
      <rect x="34" y="52" width="5" height="16" rx="2" fill="#5a3050" />
      <rect x="42" y="52" width="5" height="16" rx="2" fill="#5a3050" />
      {/* Book in hand */}
      <rect x="50" y="44" width="14" height="10" rx="1" fill="#f5efe5" stroke="#7b4368" strokeWidth="0.8" />
      <line x1="53" y1="46" x2="61" y2="46" stroke="#7b4368" strokeWidth="0.5" />
      <line x1="53" y1="48" x2="61" y2="48" stroke="#7b4368" strokeWidth="0.5" />
      <line x1="53" y1="50" x2="61" y2="50" stroke="#7b4368" strokeWidth="0.5" />
      <line x1="53" y1="52" x2="59" y2="52" stroke="#7b4368" strokeWidth="0.5" />
      {/* Pen */}
      <line x1="62" y1="42" x2="68" y2="36" stroke="#7b4368" strokeWidth="1.2" strokeLinecap="round" />
      {/* Microphone on stand */}
      <rect x="70" y="58" width="2" height="14" rx="0.5" fill="#8b6e4e" />
      <ellipse cx="71" cy="56" rx="4" ry="5" fill="#555" stroke="#333" strokeWidth="0.8" />
      <rect x="66" y="72" width="12" height="2" rx="1" fill="#8b6e4e" />
      {/* Ground */}
      <path d="M26 72h48" stroke="#c5dba8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
