export function ArtSpaceLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Pavilion structure */}
      <rect x="20" y="30" width="8" height="50" rx="1" fill="#c8b8a8" />
      <rect x="68" y="30" width="8" height="50" rx="1" fill="#c8b8a8" />
      {/* Roof */}
      <path d="M10 32h76l-10-14H20l-10 14z" fill="#f0e8e0" stroke="#B87090" strokeWidth="1.2" />
      {/* Glass walls */}
      <rect x="30" y="38" width="36" height="38" rx="2" fill="#faf8f6" stroke="#B87090" strokeWidth="1" opacity="0.9" />
      {/* Art piece inside */}
      <rect x="40" y="46" width="16" height="20" rx="2" fill="#fff" stroke="#B87090" strokeWidth="0.8" />
      <circle cx="48" cy="56" r="5" fill="#CFE8FF" stroke="#B87090" strokeWidth="0.6" />
      {/* Floor */}
      <rect x="26" y="74" width="44" height="4" fill="#e8e0d8" />
      {/* Small flag */}
      <rect x="48" y="16" width="1.5" height="8" fill="#8b6e4e" />
      <path d="M50 16l8 4-8 4z" fill="#f0c05a" />
    </svg>
  );
}
