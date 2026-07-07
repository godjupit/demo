export function PublicArtistLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Standing figure */}
      <circle cx="48" cy="24" r="7" fill="#f0d5c0" stroke="#30323d" strokeWidth="1.2" />
      <rect x="40" y="34" width="16" height="22" rx="4" fill="#5a5d6e" stroke="#30323d" strokeWidth="1.2" />
      {/* Arms */}
      <path d="M38 40l-10-2 6 12" fill="#5a5d6e" stroke="#30323d" strokeWidth="1" />
      <path d="M58 38l10-6-4 14" fill="#5a5d6e" stroke="#30323d" strokeWidth="1" />
      {/* Legs */}
      <rect x="40" y="54" width="7" height="18" rx="2" fill="#40434e" stroke="#30323d" strokeWidth="1" />
      <rect x="49" y="54" width="7" height="18" rx="2" fill="#40434e" stroke="#30323d" strokeWidth="1" />
      {/* Signpost in hand */}
      <rect x="18" y="24" width="3" height="28" rx="1" fill="#8b6e4e" />
      <rect x="8" y="18" width="22" height="10" rx="2" fill="#CFE8FF" stroke="#6ba5c4" strokeWidth="1" />
      <text x="18" y="25" textAnchor="middle" fontSize="6" fill="#6ba5c4" fontWeight="700">ROAD</text>
      {/* Ground */}
      <path d="M24 76h48" stroke="#c5dba8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
