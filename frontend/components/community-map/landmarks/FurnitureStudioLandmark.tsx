export function FurnitureStudioLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Trees beside */}
      <circle cx="14" cy="28" r="10" fill="#c5dba8" stroke="#8bbf75" strokeWidth="1.2" />
      <rect x="12" y="32" width="4" height="18" rx="1" fill="#8b6e4e" />
      {/* Wooden building */}
      <path d="M24 36h48l-6-16H30l-6 16z" fill="#d4b896" stroke="#8b6e4e" strokeWidth="1.5" />
      <rect x="22" y="36" width="52" height="48" rx="2" fill="#f5efe5" stroke="#8b6e4e" strokeWidth="1.5" />
      {/* Wood grain lines */}
      <line x1="24" y1="46" x2="72" y2="46" stroke="#d4b896" strokeWidth="0.8" />
      <line x1="24" y1="54" x2="72" y2="54" stroke="#d4b896" strokeWidth="0.8" />
      <line x1="24" y1="62" x2="72" y2="62" stroke="#d4b896" strokeWidth="0.8" />
      {/* Door */}
      <rect x="36" y="56" width="16" height="28" rx="2" fill="#8b6e4e" />
      <circle cx="48" cy="72" r="1.5" fill="#f5efe5" />
      {/* Window with chair outline visible */}
      <rect x="56" y="44" width="14" height="14" rx="2" fill="#CFE8FF" stroke="#8b6e4e" strokeWidth="1" />
      <line x1="63" y1="44" x2="63" y2="58" stroke="#8b6e4e" strokeWidth="0.8" />
    </svg>
  );
}
