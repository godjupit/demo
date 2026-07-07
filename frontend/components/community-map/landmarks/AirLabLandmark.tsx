export function AirLabLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Wind lines behind building */}
      <path d="M6 38c4-2 10-3 16 0" stroke="#a9ddf2" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 52c5-2 12-2 18 1" stroke="#a9ddf2" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M78 32c4 2 8 2 12 0" stroke="#a9ddf2" strokeWidth="1.2" strokeLinecap="round" />
      {/* Building */}
      <rect x="18" y="34" width="60" height="48" rx="3" fill="#f5fafb" stroke="#6ba5c4" strokeWidth="1.5" />
      {/* Roof */}
      <path d="M14 34h68l-8-12H22l-8 12z" fill="#e0eef5" stroke="#6ba5c4" strokeWidth="1.5" />
      {/* Fan on roof */}
      <circle cx="48" cy="26" r="6" fill="#CFE8FF" stroke="#6ba5c4" strokeWidth="1" />
      <path d="M44 22l4-4 4 4M44 30l4 4 4-4M42 26h12" stroke="#6ba5c4" strokeWidth="0.8" />
      {/* Open windows */}
      <rect x="24" y="44" width="14" height="12" rx="1" fill="#CFE8FF" stroke="#6ba5c4" strokeWidth="0.8" />
      <rect x="24" y="44" width="7" height="12" fill="#e0f0f8" />
      <rect x="58" y="44" width="14" height="12" rx="1" fill="#CFE8FF" stroke="#6ba5c4" strokeWidth="0.8" />
      <rect x="58" y="44" width="7" height="12" fill="#e0f0f8" />
      {/* Door */}
      <rect x="38" y="58" width="20" height="24" rx="3" fill="#6ba5c4" />
      {/* Air flow lines from door */}
      <path d="M32 64c-3 1-6 1-8 0" stroke="#a9ddf2" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M30 70c-4 2-7 2-10 1" stroke="#a9ddf2" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
