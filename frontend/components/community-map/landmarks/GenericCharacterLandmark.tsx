export function GenericCharacterLandmark({ className = "landmark-svg", accent }: { variant?: string; accent?: string; className?: string }) {
  const mainColor = accent ?? "#C88095";
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="28" r="8" fill="#f0d5c0" stroke={mainColor} strokeWidth="1.2" />
      <rect x="38" y="38" width="20" height="24" rx="5" fill={mainColor} opacity="0.6" stroke={mainColor} strokeWidth="1.2" />
      <rect x="39" y="60" width="7" height="18" rx="2" fill="#666" />
      <rect x="50" y="60" width="7" height="18" rx="2" fill="#666" />
      <path d="M34 44l-8-4M62 44l8-4" stroke={mainColor} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M24 76h48" stroke="#c5dba8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
