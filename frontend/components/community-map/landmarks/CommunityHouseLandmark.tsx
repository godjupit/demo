export function CommunityHouseLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* House body */}
      <rect x="16" y="38" width="64" height="46" rx="2" fill="#faf5f0" stroke="#D08090" strokeWidth="1.5" />
      {/* Roof */}
      <path d="M10 38l38-24 38 24" fill="#ffeef2" stroke="#D08090" strokeWidth="1.5" />
      {/* Open door */}
      <rect x="34" y="56" width="28" height="28" rx="3" fill="#f5ede4" stroke="#D08090" strokeWidth="1" />
      {/* Long table inside */}
      <rect x="38" y="68" width="20" height="3" rx="1" fill="#D08090" opacity="0.5" />
      {/* Windows */}
      <rect x="20" y="46" width="12" height="10" rx="2" fill="#CFE8FF" stroke="#D08090" strokeWidth="0.8" />
      <rect x="64" y="46" width="12" height="10" rx="2" fill="#CFE8FF" stroke="#D08090" strokeWidth="0.8" />
      {/* Bulletin board */}
      <rect x="68" y="60" width="10" height="8" rx="1" fill="#ffeecc" stroke="#D08090" strokeWidth="0.6" />
      <line x1="70" y1="63" x2="76" y2="63" stroke="#D08090" strokeWidth="0.4" />
      <line x1="70" y1="65" x2="74" y2="65" stroke="#D08090" strokeWidth="0.4" />
      {/* Heart on door */}
      <path d="M46 62c1-1 3-1 4 0s3 1 4 0" stroke="#D08090" strokeWidth="0.8" fill="none" />
    </svg>
  );
}
