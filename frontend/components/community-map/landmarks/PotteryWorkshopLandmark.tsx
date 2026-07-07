export function PotteryWorkshopLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Kiln chimney */}
      <rect x="70" y="18" width="6" height="18" rx="1" fill="#c4957a" stroke="#8b5e3c" strokeWidth="1" />
      <path d="M67 18h12l-2-4H69l-2 4z" fill="#c4957a" stroke="#8b5e3c" strokeWidth="1" />
      {/* Smoke puffs */}
      <circle cx="73" cy="12" r="2.5" fill="#d5dde5" opacity="0.6" />
      <circle cx="76" cy="8" r="2" fill="#d5dde5" opacity="0.4" />
      {/* Main building */}
      <rect x="14" y="36" width="62" height="48" rx="3" fill="#faf5f0" stroke="#8b5e3c" strokeWidth="1.5" />
      {/* Open workshop front */}
      <rect x="18" y="42" width="24" height="30" rx="2" fill="#f5ede4" stroke="#8b5e3c" strokeWidth="1" />
      {/* Pots on shelf */}
      <path d="M22 46c3-4 7-4 10 0" stroke="#9b5b42" strokeWidth="1.5" />
      <ellipse cx="27" cy="46" rx="3" ry="1" fill="#d4a98a" stroke="#9b5b42" strokeWidth="0.8" />
      <ellipse cx="37" cy="52" rx="3.5" ry="1.2" fill="#d4a98a" stroke="#9b5b42" strokeWidth="0.8" />
      <path d="M34 48c3 3 7 3 10 0" stroke="#9b5b42" strokeWidth="1.2" />
      {/* Market stall table */}
      <rect x="46" y="58" width="24" height="4" rx="1" fill="#c4957a" />
      <rect x="48" y="62" width="3" height="10" rx="0.5" fill="#8b5e3c" />
      <rect x="65" y="62" width="3" height="10" rx="0.5" fill="#8b5e3c" />
      {/* Pots on table */}
      <ellipse cx="54" cy="57" rx="4" ry="1.5" fill="#d4a98a" stroke="#9b5b42" strokeWidth="0.8" />
      <ellipse cx="62" cy="56" rx="3.5" ry="1.3" fill="#e6c6a5" stroke="#9b5b42" strokeWidth="0.8" />
    </svg>
  );
}
