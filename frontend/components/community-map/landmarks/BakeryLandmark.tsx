export function BakeryLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Awning */}
      <path d="M16 38h64l-6-14H22l-6 14z" fill="#f2c4a0" stroke="#d4956b" strokeWidth="1.5" />
      <path d="M16 38h64v4H16z" fill="#e8b08a" />
      {/* Building body */}
      <rect x="14" y="42" width="68" height="42" rx="3" fill="#fff5ee" stroke="#d4956b" strokeWidth="1.5" />
      {/* Door */}
      <rect x="38" y="56" width="20" height="28" rx="3" fill="#d4956b" />
      <circle cx="54" cy="70" r="1.5" fill="#fff" />
      {/* Window left */}
      <rect x="20" y="50" width="14" height="12" rx="2" fill="#CFE8FF" stroke="#d4956b" strokeWidth="1" />
      <line x1="27" y1="50" x2="27" y2="62" stroke="#d4956b" strokeWidth="0.8" />
      <line x1="20" y1="56" x2="34" y2="56" stroke="#d4956b" strokeWidth="0.8" />
      {/* Window right */}
      <rect x="62" y="50" width="14" height="12" rx="2" fill="#CFE8FF" stroke="#d4956b" strokeWidth="1" />
      <line x1="69" y1="50" x2="69" y2="62" stroke="#d4956b" strokeWidth="0.8" />
      <line x1="62" y1="56" x2="76" y2="56" stroke="#d4956b" strokeWidth="0.8" />
      {/* Bread sign */}
      <circle cx="48" cy="30" r="8" fill="#fff5ee" stroke="#d4956b" strokeWidth="1.2" />
      <path d="M43 33c1-3 3-5 5-5s4 2 5 5" stroke="#d4956b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
