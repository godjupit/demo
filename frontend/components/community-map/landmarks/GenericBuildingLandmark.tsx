export function GenericBuildingLandmark({ className = "landmark-svg", accent }: { variant?: string; accent?: string; className?: string }) {
  const mainColor = accent ?? "#C88095";
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M14 36h68l-8-14H22l-8 14z" fill="#f5f0f2" stroke={mainColor} strokeWidth="1.5" />
      <rect x="12" y="36" width="72" height="46" rx="3" fill="#faf8f7" stroke={mainColor} strokeWidth="1.5" />
      <rect x="36" y="54" width="24" height="28" rx="2" fill={mainColor} opacity="0.4" />
      <circle cx="56" cy="68" r="1.5" fill="#fff" />
      <rect x="18" y="46" width="14" height="12" rx="2" fill="#CFE8FF" stroke={mainColor} strokeWidth="0.8" />
      <rect x="64" y="46" width="14" height="12" rx="2" fill="#CFE8FF" stroke={mainColor} strokeWidth="0.8" />
    </svg>
  );
}
