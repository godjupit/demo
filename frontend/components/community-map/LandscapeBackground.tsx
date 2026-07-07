export function LandscapeBackground() {
  return (
    <svg
      className="landscape-background"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f4ff" />
          <stop offset="35%" stopColor="#f1eafa" />
          <stop offset="70%" stopColor="#fbe4ee" />
          <stop offset="100%" stopColor="#fdf0dc" />
        </linearGradient>

        <linearGradient id="grassGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eef8d8" />
          <stop offset="50%" stopColor="#e2f0cc" />
          <stop offset="100%" stopColor="#d4e8bc" />
        </linearGradient>

        <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a9ddf2" />
          <stop offset="40%" stopColor="#90d0ea" />
          <stop offset="100%" stopColor="#82cbe8" />
        </linearGradient>

        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff8e8" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#fde8c8" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#fcd4a0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#fcd4a0" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="sunCore" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="60%" stopColor="#fff0cc" />
          <stop offset="100%" stopColor="#ffe0a0" />
        </radialGradient>

        <linearGradient id="hillGradient1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f0d8" />
          <stop offset="100%" stopColor="#dce8c8" />
        </linearGradient>

        <linearGradient id="hillGradient2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#edf2e2" />
          <stop offset="100%" stopColor="#e2ecd0" />
        </linearGradient>

        <filter id="softGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>

        <filter id="cloudBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
      </defs>

      {/* Sky */}
      <rect className="landscape-sky" x="0" y="0" width="1200" height="700" fill="url(#skyGradient)" />

      {/* Sun glow */}
      <circle cx="920" cy="130" r="120" fill="url(#sunGlow)" filter="url(#softGlow)" />

      {/* Sun */}
      <circle cx="920" cy="130" r="42" fill="url(#sunCore)" />

      {/* Clouds */}
      <g opacity="0.4" filter="url(#cloudBlur)">
        <ellipse cx="200" cy="100" rx="80" ry="25" fill="#fff" />
        <ellipse cx="260" cy="90" rx="60" ry="20" fill="#fff" />
        <ellipse cx="600" cy="80" rx="90" ry="22" fill="#fff" />
        <ellipse cx="660" cy="72" rx="55" ry="18" fill="#fff" />
        <ellipse cx="350" cy="140" rx="70" ry="18" fill="#fff" opacity="0.6" />
      </g>

      {/* Far hills */}
      <path
        className="landscape-hill hill-back"
        d="M0 350 Q150 280 300 340 Q450 290 600 350 Q750 300 900 340 Q1050 290 1200 350 L1200 500 L0 500 Z"
        fill="url(#hillGradient1)"
      />

      {/* Near hills */}
      <path
        className="landscape-hill hill-front"
        d="M0 420 Q200 360 400 410 Q600 370 800 420 Q1000 380 1200 430 L1200 540 L0 540 Z"
        fill="url(#hillGradient2)"
      />

      {/* Main grassland */}
      <rect className="landscape-grass" x="0" y="410" width="1200" height="290" fill="url(#grassGradient)" />

      {/* Walking path */}
      <path
        className="landscape-path"
        d="M0 560 Q150 540 300 555 Q450 535 600 548 Q750 530 900 545 Q1050 528 1200 542"
        fill="none"
        stroke="rgba(255,241,210,0.7)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        className="landscape-path-edge"
        d="M0 560 Q150 540 300 555 Q450 535 600 548 Q750 530 900 545 Q1050 528 1200 542"
        fill="none"
        stroke="rgba(210,200,175,0.3)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeDasharray="4 12"
      />

      {/* River — flows across the bottom-right area */}
      <path
        className="landscape-river"
        d="M700 560 Q780 540 860 555 Q940 535 1020 550 Q1100 530 1200 548"
        fill="none"
        stroke="url(#riverGradient)"
        strokeWidth="42"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        className="landscape-river-shine"
        d="M720 552 Q800 535 880 548 Q960 530 1040 543"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
