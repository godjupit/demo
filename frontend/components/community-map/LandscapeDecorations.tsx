import { mapDecorations, type MapDecoration } from "@/lib/memberMapVisuals";

function TreeDecoration({ x, y, scale }: MapDecoration) {
  return (
    <g transform={`translate(${x * 12}, ${y * 7}) scale(${scale})`} aria-hidden="true">
      {/* Trunk */}
      <rect x="-2.5" y="-8" width="5" height="20" rx="1.5" fill="#c4a882" />
      {/* Canopy layers */}
      <ellipse cx="0" cy="-12" rx="14" ry="12" fill="#b5cf92" />
      <ellipse cx="-6" cy="-6" rx="10" ry="9" fill="#c5dba8" />
      <ellipse cx="6" cy="-6" rx="10" ry="9" fill="#a8c88a" />
      <ellipse cx="0" cy="-18" rx="8" ry="7" fill="#cde0b0" />
    </g>
  );
}

function FlowerDecoration({ x, y, scale, variant = 0 }: MapDecoration) {
  const colors = [
    ["#f0a7a0", "#f7c5c0"],
    ["#CFE8FF", "#e0f0ff"],
    ["#f0c05a", "#f8d88a"],
  ];
  const [c1, c2] = colors[variant % colors.length];

  return (
    <g transform={`translate(${x * 12}, ${y * 7}) scale(${scale})`} aria-hidden="true">
      {/* Stem */}
      <line x1="0" y1="0" x2="0" y2="14" stroke="#a8c88a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Petals */}
      <circle cx="0" cy="-4" r="5" fill={c1} />
      <circle cx="-4" cy="0" r="4" fill={c2} />
      <circle cx="4" cy="0" r="4" fill={c2} />
      <circle cx="-3" cy="3" r="3.5" fill={c2} />
      <circle cx="3" cy="3" r="3.5" fill={c2} />
      {/* Center */}
      <circle cx="0" cy="0" r="2.5" fill="#f8e8a0" />
    </g>
  );
}

function GrassPatchDecoration({ x, y, scale }: MapDecoration) {
  return (
    <g transform={`translate(${x * 12}, ${y * 7}) scale(${scale})`} aria-hidden="true">
      <path d="M-8 10c-2-6-3-10 0-14M-4 10c-1-5-1-8 1-12M0 10c0-4 1-7 2-11M4 10c0-5 2-8 2-12M8 10c2-6 2-10 0-14" stroke="#9dbd70" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </g>
  );
}

function MushroomDecoration({ x, y, scale }: MapDecoration) {
  return (
    <g transform={`translate(${x * 12}, ${y * 7}) scale(${scale})`} aria-hidden="true">
      <rect x="-1.5" y="-2" width="3" height="10" rx="1" fill="#f0e8d8" />
      <ellipse cx="0" cy="-3" rx="7" ry="5" fill="#f0c0a0" />
      <ellipse cx="0" cy="-4" rx="5" ry="3" fill="#f8d8c0" />
      <circle cx="-2" cy="-5" r="1" fill="#faf0e8" opacity="0.7" />
      <circle cx="3" cy="-3" r="0.8" fill="#faf0e8" opacity="0.7" />
    </g>
  );
}

function BridgeDecoration({ x, y, scale }: MapDecoration) {
  return (
    <g transform={`translate(${x * 12}, ${y * 7}) scale(${scale})`} aria-hidden="true">
      {/* Railings */}
      <line x1="-20" y1="-2" x2="20" y2="-2" stroke="#c4a882" strokeWidth="2" />
      {/* Posts */}
      <rect x="-18" y="-8" width="2" height="12" rx="0.5" fill="#a08060" />
      <rect x="16" y="-8" width="2" height="12" rx="0.5" fill="#a08060" />
      {/* Arch */}
      <path d="M-16 4 Q0 -8 16 4" fill="none" stroke="#c4a882" strokeWidth="2.5" />
      {/* Deck */}
      <line x1="-16" y1="4" x2="16" y2="4" stroke="#d4b896" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function FlagDecoration({ x, y, scale }: MapDecoration) {
  return (
    <g transform={`translate(${x * 12}, ${y * 7}) scale(${scale})`} aria-hidden="true">
      <rect x="-0.8" y="-2" width="1.6" height="18" rx="0.5" fill="#a08060" />
      <path d="M1 -2l12 6-12 6z" fill="#f0a7a0" />
    </g>
  );
}

function StoneDecoration({ x, y, scale }: MapDecoration) {
  return (
    <g transform={`translate(${x * 12}, ${y * 7}) scale(${scale})`} aria-hidden="true">
      <ellipse cx="0" cy="3" rx="8" ry="5" fill="#d5cdc0" />
      <ellipse cx="-3" cy="2" rx="5" ry="3.5" fill="#e0d8cc" />
    </g>
  );
}

function DecorationElement(props: MapDecoration) {
  switch (props.type) {
    case "tree":
      return <TreeDecoration {...props} />;
    case "flower":
      return <FlowerDecoration {...props} />;
    case "grass":
      return <GrassPatchDecoration {...props} />;
    case "mushroom":
      return <MushroomDecoration {...props} />;
    case "bridge":
      return <BridgeDecoration {...props} />;
    case "flag":
      return <FlagDecoration {...props} />;
    case "stone":
      return <StoneDecoration {...props} />;
    default:
      return null;
  }
}

export function LandscapeDecorations() {
  return (
    <svg
      className="landscape-decorations"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {mapDecorations.map((decoration, index) => (
        <DecorationElement key={`${decoration.type}-${index}`} {...decoration} />
      ))}
    </svg>
  );
}
