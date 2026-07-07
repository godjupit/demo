export function PublisherKioskLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Kiosk roof */}
      <path d="M14 34h68l-8-12H22l-8 12z" fill="#e0d5c8" stroke="#7A90B0" strokeWidth="1.5" />
      {/* Awning stripes */}
      <line x1="22" y1="28" x2="22" y2="34" stroke="#7A90B0" strokeWidth="1.2" />
      <line x1="30" y1="26" x2="30" y2="34" stroke="#7A90B0" strokeWidth="1.2" />
      <line x1="38" y1="24" x2="38" y2="34" stroke="#7A90B0" strokeWidth="1.2" />
      <line x1="46" y1="22" x2="46" y2="34" stroke="#7A90B0" strokeWidth="1.2" />
      <line x1="54" y1="24" x2="54" y2="34" stroke="#7A90B0" strokeWidth="1.2" />
      <line x1="62" y1="26" x2="62" y2="34" stroke="#7A90B0" strokeWidth="1.2" />
      <line x1="70" y1="28" x2="70" y2="34" stroke="#7A90B0" strokeWidth="1.2" />
      {/* Kiosk body */}
      <rect x="16" y="34" width="64" height="46" rx="2" fill="#f5f7f9" stroke="#7A90B0" strokeWidth="1.5" />
      {/* Counter */}
      <rect x="16" y="52" width="64" height="4" fill="#d5dde5" />
      {/* Books on display */}
      <rect x="20" y="36" width="8" height="14" rx="1" fill="#C88095" />
      <rect x="30" y="38" width="8" height="12" rx="1" fill="#88b7a4" />
      <rect x="40" y="36" width="8" height="14" rx="1" fill="#CFE8FF" />
      <rect x="50" y="38" width="8" height="12" rx="1" fill="#e6b655" />
      <rect x="60" y="36" width="8" height="14" rx="1" fill="#b095c8" />
      <rect x="70" y="38" width="8" height="12" rx="1" fill="#f0a7a0" />
      {/* Magazine stand */}
      <rect x="18" y="58" width="14" height="18" rx="1" fill="#f5efe5" stroke="#7A90B0" strokeWidth="0.8" />
      <line x1="21" y1="62" x2="29" y2="62" stroke="#7A90B0" strokeWidth="0.4" />
      <line x1="21" y1="66" x2="29" y2="66" stroke="#7A90B0" strokeWidth="0.4" />
      <line x1="21" y1="70" x2="27" y2="70" stroke="#7A90B0" strokeWidth="0.4" />
      {/* Sign */}
      <rect x="28" y="56" width="40" height="10" rx="2" fill="#7A90B0" />
      <text x="48" y="63" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="600">PUBLISHER</text>
      {/* Open sign */}
      <rect x="50" y="68" width="16" height="8" rx="1" fill="#CFE8FF" stroke="#7A90B0" strokeWidth="0.6" />
      <text x="58" y="74" textAnchor="middle" fontSize="5" fill="#7A90B0" fontWeight="600">OPEN</text>
    </svg>
  );
}
