export function SailorClubLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Water/wharf */}
      <path d="M8 64c12-2 24 2 36 0s24-2 44 0v18H8V64z" fill="#a9ddf2" stroke="#6ba5c4" strokeWidth="1" opacity="0.5" />
      {/* Wharf posts */}
      <rect x="14" y="56" width="3" height="16" rx="1" fill="#8b6e4e" />
      <rect x="78" y="56" width="3" height="16" rx="1" fill="#8b6e4e" />
      {/* Clubhouse */}
      <rect x="22" y="34" width="52" height="32" rx="3" fill="#f5fafb" stroke="#236b8e" strokeWidth="1.5" />
      <path d="M18 34h60l-8-12H26l-8 12z" fill="#e0eff5" stroke="#236b8e" strokeWidth="1.2" />
      {/* Door */}
      <rect x="42" y="52" width="12" height="14" rx="2" fill="#236b8e" />
      {/* Windows */}
      <rect x="26" y="42" width="10" height="8" rx="1" fill="#CFE8FF" stroke="#236b8e" strokeWidth="0.8" />
      <rect x="60" y="42" width="10" height="8" rx="1" fill="#CFE8FF" stroke="#236b8e" strokeWidth="0.8" />
      {/* Small boat */}
      <path d="M66 68c4-2 10-2 16 2l-16-2z" fill="#f0c05a" stroke="#d4952a" strokeWidth="0.8" />
      <rect x="70" y="64" width="1.5" height="6" fill="#8b6e4e" />
      <path d="M72 64l8 3-8 3z" fill="#CFE8FF" stroke="#236b8e" strokeWidth="0.5" />
      {/* Club flag */}
      <rect x="48" y="18" width="1.5" height="10" fill="#8b6e4e" />
      <path d="M50 18l10 5-10 5z" fill="#236b8e" />
      {/* Anchor symbol */}
      <circle cx="48" cy="28" r="5" fill="none" stroke="#236b8e" strokeWidth="0.8" />
      <line x1="48" y1="23" x2="48" y2="33" stroke="#236b8e" strokeWidth="0.8" />
    </svg>
  );
}
