export function PerformerLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Stage */}
      <rect x="14" y="64" width="68" height="18" rx="2" fill="#e8d5c8" stroke="#b4493d" strokeWidth="1.2" />
      <line x1="14" y1="64" x2="82" y2="64" stroke="#b4493d" strokeWidth="1.5" />
      {/* Stage lights */}
      <circle cx="30" cy="22" r="4" fill="#f0c05a" stroke="#b4493d" strokeWidth="0.8" opacity="0.8" />
      <circle cx="48" cy="16" r="4" fill="#f0c05a" stroke="#b4493d" strokeWidth="0.8" opacity="0.8" />
      <circle cx="66" cy="22" r="4" fill="#f0c05a" stroke="#b4493d" strokeWidth="0.8" opacity="0.8" />
      {/* Light beams */}
      <path d="M30 26l10 22" stroke="#f0c05a" strokeWidth="1" opacity="0.3" />
      <path d="M66 26l-10 22" stroke="#f0c05a" strokeWidth="1" opacity="0.3" />
      {/* Dancer figure */}
      <circle cx="48" cy="36" r="6" fill="#f0d5c0" stroke="#b4493d" strokeWidth="1" />
      <path d="M42 44c2 4 10 4 12 0" fill="#b4493d" stroke="#b4493d" strokeWidth="1" />
      <path d="M32 40c4 6 8 8 12 6M52 46c3-2 10-2 14 4" stroke="#b4493d" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M42 62l-4 10M54 62l4 10" stroke="#b4493d" strokeWidth="1" strokeLinecap="round" />
      {/* Flags */}
      <rect x="18" y="48" width="2" height="16" fill="#8b6e4e" />
      <path d="M20 48l10 5-10 5z" fill="#f0c05a" />
      <rect x="76" y="48" width="2" height="16" fill="#8b6e4e" />
      <path d="M78 48l-10 5 10 5z" fill="#f0c05a" />
    </svg>
  );
}
