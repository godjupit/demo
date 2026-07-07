export function ClimateLabLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Lab building */}
      <rect x="20" y="34" width="56" height="46" rx="3" fill="#f5f7fa" stroke="#8BA0C0" strokeWidth="1.5" />
      {/* Roof with solar/tech feel */}
      <path d="M16 34h64l-8-12H24l-8 12z" fill="#e8eff8" stroke="#8BA0C0" strokeWidth="1.2" />
      {/* Windmill */}
      <rect x="42" y="10" width="3" height="14" fill="#8b6e4e" />
      <path d="M44 12l-8 4 8 0-8-4z" fill="#CFE8FF" stroke="#8BA0C0" strokeWidth="0.8" />
      <path d="M44 12l8 4-8 0 8-4z" fill="#CFE8FF" stroke="#8BA0C0" strokeWidth="0.8" />
      {/* Plant in window */}
      <rect x="24" y="42" width="14" height="12" rx="2" fill="#CFE8FF" stroke="#8BA0C0" strokeWidth="1" />
      <path d="M28 50c2-4 6-4 8 0" stroke="#8bbf75" strokeWidth="1.5" />
      <circle cx="32" cy="44" r="3" fill="#c5dba8" />
      {/* Paper talisman on wall */}
      <rect x="62" y="42" width="12" height="16" rx="1" fill="#fdf5e6" stroke="#d4a76a" strokeWidth="0.8" />
      <text x="68" y="52" fontSize="6" fill="#d4956b">贵人</text>
      {/* Door */}
      <rect x="38" y="58" width="20" height="22" rx="2" fill="#8BA0C0" opacity="0.4" />
      {/* Small device/icon on roof */}
      <rect x="48" y="26" width="8" height="6" rx="1" fill="#E8DFFF" stroke="#8BA0C0" strokeWidth="0.8" />
      <circle cx="52" cy="29" r="1.5" fill="#8BA0C0" />
    </svg>
  );
}
