export function CraftCharacterLandmark({ className = "landmark-svg" }: { variant?: string; accent?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      {/* Character body */}
      <circle cx="48" cy="24" r="7" fill="#f0d5c0" stroke="#2A2A2A" strokeWidth="1.2" />
      <rect x="40" y="34" width="16" height="20" rx="4" fill="#444" stroke="#2A2A2A" strokeWidth="1" />
      {/* Arms working */}
      <path d="M38 42l-8 4 4 2 4-2" fill="#444" stroke="#2A2A2A" strokeWidth="0.8" />
      <path d="M58 42l8 4-4 2-4-2" fill="#444" stroke="#2A2A2A" strokeWidth="0.8" />
      {/* Legs */}
      <rect x="42" y="52" width="5" height="14" rx="2" fill="#333" />
      <rect x="49" y="52" width="5" height="14" rx="2" fill="#333" />
      {/* Worktable */}
      <rect x="22" y="52" width="52" height="4" rx="1" fill="#8b6e4e" />
      <rect x="24" y="56" width="3" height="10" fill="#6e5638" />
      <rect x="69" y="56" width="3" height="10" fill="#6e5638" />
      {/* T-shirt hanging */}
      <path d="M60 24l4 12h-8l4-12z" fill="#CFE8FF" stroke="#6ba5c4" strokeWidth="0.8" />
      <path d="M58 28h12" stroke="#6ba5c4" strokeWidth="0.6" />
      {/* Print tool in hand */}
      <rect x="54" y="48" width="10" height="4" rx="1" fill="#d4956b" stroke="#8b5e3c" strokeWidth="0.5" />
      {/* Ground */}
      <path d="M24 70h48" stroke="#c5dba8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
