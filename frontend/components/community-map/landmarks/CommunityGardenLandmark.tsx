export function CommunityGardenLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Garden beds */}
      <rect x="12" y="56" width="30" height="10" rx="2" fill="#c5a888" stroke="#8b6e4e" strokeWidth="1" />
      <rect x="54" y="56" width="30" height="10" rx="2" fill="#c5a888" stroke="#8b6e4e" strokeWidth="1" />
      {/* Plants */}
      <circle cx="20" cy="52" r="6" fill="#c5dba8" stroke="#8bbf75" strokeWidth="1" />
      <circle cx="30" cy="50" r="5" fill="#b8d4a0" stroke="#8bbf75" strokeWidth="1" />
      <circle cx="62" cy="52" r="6" fill="#c5dba8" stroke="#8bbf75" strokeWidth="1" />
      <circle cx="74" cy="50" r="5" fill="#b8d4a0" stroke="#8bbf75" strokeWidth="1" />
      {/* Small house */}
      <rect x="34" y="40" width="28" height="22" rx="2" fill="#faf5f0" stroke="#8bbf75" strokeWidth="1.2" />
      <path d="M30 40l18-12 18 12" fill="#eef5e5" stroke="#8bbf75" strokeWidth="1.2" />
      <rect x="42" y="50" width="12" height="12" rx="2" fill="#8bbf75" opacity="0.3" />
      {/* Wind/cloth lines */}
      <path d="M66 36c2-2 6-3 10-1" stroke="#CFE8FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M68 40c3-2 8-2 12 0" stroke="#CFE8FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Flag */}
      <rect x="48" y="24" width="1.5" height="10" fill="#8b6e4e" />
      <path d="M50 24l8 4-8 4z" fill="#f0a7a0" />
    </svg>
  );
}
