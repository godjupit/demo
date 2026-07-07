export function EmbroideryWorkshopLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Building */}
      <rect x="18" y="36" width="60" height="46" rx="3" fill="#fdf5f7" stroke="#b05b82" strokeWidth="1.5" />
      <path d="M14 36h68l-6-14H20l-6 14z" fill="#f8e8ee" stroke="#b05b82" strokeWidth="1.2" />
      {/* Window with embroidery hoop */}
      <rect x="24" y="44" width="16" height="14" rx="2" fill="#fff" stroke="#b05b82" strokeWidth="1" />
      <circle cx="32" cy="51" r="5" fill="none" stroke="#CFE8FF" strokeWidth="1.5" />
      <circle cx="32" cy="51" r="1.5" fill="#b05b82" />
      {/* Thread spools on roof */}
      <rect x="32" y="24" width="5" height="8" rx="2" fill="#f0a7a0" />
      <rect x="40" y="22" width="5" height="10" rx="2" fill="#CFE8FF" />
      <rect x="48" y="24" width="5" height="8" rx="2" fill="#c5dba8" />
      <rect x="56" y="22" width="5" height="10" rx="2" fill="#f0c05a" />
      {/* Needle */}
      <line x1="50" y1="36" x2="62" y2="58" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      {/* Thread through needle */}
      <path d="M62 58c2-2 6-1 8 1s3 4 1 6" stroke="#f0a7a0" strokeWidth="1" fill="none" />
      {/* Fabric piece on wall */}
      <rect x="58" y="44" width="16" height="18" rx="2" fill="#fdf0f3" stroke="#b05b82" strokeWidth="0.8" />
      <path d="M62 50c2-2 6-2 8 0s4 3 2 5" stroke="#f0a7a0" strokeWidth="0.8" fill="none" />
      {/* Door */}
      <rect x="38" y="60" width="14" height="22" rx="2" fill="#b05b82" opacity="0.5" />
    </svg>
  );
}
