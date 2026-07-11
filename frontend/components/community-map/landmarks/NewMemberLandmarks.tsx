type LandmarkSvgProps = {
  variant?: string;
  accent?: string;
  className?: string;
};

export function BlueBookLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M23 18h42c5 0 8 3 8 8v55c0 2-2 4-4 4H28c-6 0-10-4-10-10V24c0-3 2-6 5-6z" fill="#2f7fba" />
      <path d="M30 16h40c4 0 7 3 7 7v54c0 2-2 4-4 4H31c-5 0-9-4-9-9V24c0-4 4-8 8-8z" fill="#3b91cf" />
      <path d="M27 22h39c3 0 5 2 5 5v48H31c-5 0-8-3-8-8V26c0-2 2-4 4-4z" fill="#4da5dc" />
      <path d="M31 76h39v5H30c-4 0-7-2-7-5 0-4 3-6 8-6h39v6H31z" fill="#f7ecd2" />
      <path d="M37 30h22M37 38h18M37 46h24" stroke="#d8edf8" strokeWidth="3" strokeLinecap="round" />
      <path d="M66 21v58" stroke="#276fa5" strokeWidth="3" />
      <path d="M56 73v17l7-5 7 5V73z" fill="#f7c451" />
    </svg>
  );
}

export function BalletDancerLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="47" cy="18" r="9" fill="#ffd7b7" />
      <path d="M43 10c7-6 17 2 12 10-3-6-9-7-12-3-4 0-6-3 0-7z" fill="#8b5a2b" />
      <path d="M47 28c-5 7-10 18-8 30h22c2-12-3-23-8-30h-6z" fill="#f36f8f" />
      <path d="M38 45c-8 7-15 7-22 2M56 34c9 4 16 4 23 0" stroke="#ffd7b7" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 58l-8 25M57 58l15 18" stroke="#ffd7b7" strokeWidth="5" strokeLinecap="round" />
      <path d="M31 84l9-1M69 79l8-6" stroke="#f36f8f" strokeWidth="5" strokeLinecap="round" />
      <path d="M37 50c6 7 20 7 27 0-4 11-22 12-27 0z" fill="#ffc2d1" />
    </svg>
  );
}

export function SofaLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 116 96" fill="none" aria-hidden="true">
      <rect x="18" y="30" width="80" height="42" rx="12" fill="#f26349" />
      <rect x="22" y="42" width="72" height="34" rx="10" fill="#ec533e" />
      <path d="M58 32v41M20 52h76" stroke="#d74636" strokeWidth="3" />
      <rect x="8" y="50" width="18" height="29" rx="8" fill="#e84c37" />
      <rect x="90" y="50" width="18" height="29" rx="8" fill="#e84c37" />
      <path d="M24 78v8M92 78v8" stroke="#b83a2f" strokeWidth="5" strokeLinecap="round" />
      <rect x="24" y="35" width="24" height="18" rx="4" fill="#ffd765" transform="rotate(-8 24 35)" />
      <rect x="69" y="36" width="21" height="17" rx="3" fill="#87b66d" transform="rotate(7 69 36)" />
      <circle cx="48" cy="47" r="2" fill="#cf3e34" />
      <circle cx="70" cy="47" r="2" fill="#cf3e34" />
    </svg>
  );
}

export function AirConditionerLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 116 96" fill="none" aria-hidden="true">
      <rect x="14" y="24" width="88" height="34" rx="8" fill="#fffdf7" stroke="#d4d2ca" strokeWidth="2" />
      <rect x="20" y="32" width="72" height="10" rx="3" fill="#f3f0e8" />
      <path d="M24 49h62" stroke="#b8b6ad" strokeWidth="3" strokeLinecap="round" />
      <rect x="88" y="35" width="7" height="4" rx="2" fill="#7fb84e" />
      <path d="M34 66c-2 8-8 8-10 15M52 66c-2 8-8 8-10 15M70 66c-2 8-8 8-10 15M88 66c-2 8-8 8-10 15" stroke="#8fd0ed" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 58c8 4 68 4 76 0" stroke="#e4e1d8" strokeWidth="3" />
    </svg>
  );
}

export function LandscapeEaselLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M47 58L32 88M49 58l15 30M48 22v66" stroke="#a66b2f" strokeWidth="5" strokeLinecap="round" />
      <rect x="18" y="21" width="60" height="44" rx="3" fill="#d08a32" />
      <rect x="24" y="27" width="48" height="32" rx="2" fill="#bfe3ef" />
      <path d="M24 53l16-16 12 11 8-9 12 14v6H24z" fill="#67ad61" />
      <path d="M24 48l10-10 8 8 8-10 6 7 16-3v19H24z" fill="#8fd06f" />
      <circle cx="59" cy="36" r="5" fill="#ffe071" />
      <path d="M26 34c7-5 13-5 20 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M42 74h16" stroke="#a66b2f" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function IceCreamLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M32 49h32L48 90 32 49z" fill="#d99345" stroke="#b56a2d" strokeWidth="2" />
      <path d="M37 59h22M40 70h16M42 80h12" stroke="#f2c37b" strokeWidth="2" />
      <circle cx="40" cy="43" r="12" fill="#ff9fc0" />
      <circle cx="55" cy="42" r="13" fill="#ffd986" />
      <circle cx="49" cy="34" r="13" fill="#ffb6cf" />
      <path d="M28 50c7 8 31 8 40 0" fill="#ff8bb2" />
      <path d="M42 31c2 3 8 4 13 2" stroke="#fff1f5" strokeWidth="3" strokeLinecap="round" />
      <path d="M48 24c2-10 13-12 16-18" stroke="#7b4b2c" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="24" r="6" fill="#df2935" />
      <circle cx="59" cy="22" r="2" fill="#ff727b" />
    </svg>
  );
}

export function CeramicBowlLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 116 96" fill="none" aria-hidden="true">
      <ellipse cx="58" cy="40" rx="45" ry="18" fill="#91c9ea" stroke="#5b98c8" strokeWidth="3" />
      <path d="M18 43c6 31 74 31 80 0-14 13-66 13-80 0z" fill="#6fb3dc" stroke="#5b98c8" strokeWidth="3" />
      <ellipse cx="58" cy="39" rx="34" ry="10" fill="#bfe7f5" />
      <path d="M30 59c12 11 44 13 61 1" stroke="#d8f4ff" strokeWidth="4" strokeLinecap="round" />
      <path d="M36 65c11 5 30 6 43 1" stroke="#458abd" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function FramedPaintingLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="17" y="14" width="62" height="68" rx="3" fill="#d68b2f" />
      <rect x="23" y="20" width="50" height="56" rx="2" fill="#f6d08a" />
      <rect x="29" y="27" width="38" height="42" rx="2" fill="#aee0ef" />
      <circle cx="54" cy="38" r="6" fill="#ffd45d" />
      <path d="M29 58l16-18 10 12 7-8 5 14v11H29z" fill="#75bd6a" />
      <path d="M29 63l11-11 9 7 7-10 11 12v8H29z" fill="#4da66a" />
      <path d="M36 34c5-3 11-3 17 1" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M17 82h62" stroke="#b66c25" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function PainterPersonLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="41" cy="24" r="10" fill="#f7c89e" />
      <path d="M31 20c6-11 22-8 24 3-7-4-14-3-23 1z" fill="#7a4a28" />
      <path d="M34 36c8-6 20-3 25 6l5 17H30l4-23z" fill="#f1f4e5" />
      <path d="M56 43l16-10" stroke="#f7c89e" strokeWidth="5" strokeLinecap="round" />
      <path d="M70 31l11-8" stroke="#7a4a28" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="32" cy="61" rx="20" ry="14" fill="#b36b35" transform="rotate(-20 32 61)" />
      <circle cx="25" cy="56" r="4" fill="#f8d34b" />
      <circle cx="33" cy="51" r="4" fill="#e6534f" />
      <circle cx="41" cy="56" r="4" fill="#5ba8d8" />
      <circle cx="38" cy="66" r="4" fill="#6dbb65" />
      <path d="M62 55l-6 29M73 55l6 29M50 84h34" stroke="#9d6832" strokeWidth="4" strokeLinecap="round" />
      <rect x="55" y="35" width="24" height="24" rx="2" fill="#d99a48" />
      <rect x="59" y="39" width="16" height="16" fill="#aee0ef" />
      <path d="M59 53l7-7 4 4 5-6v11H59z" fill="#67ad61" />
    </svg>
  );
}

export function YarnFabricLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 116 96" fill="none" aria-hidden="true">
      <circle cx="25" cy="52" r="15" fill="#5ca7d7" />
      <circle cx="44" cy="47" r="16" fill="#f06f9d" />
      <circle cx="61" cy="53" r="15" fill="#f7c950" />
      <path d="M12 50c8-4 19-4 27 2M14 58c8-7 22-8 32-1M32 38c7 8 12 18 13 28M48 40c7 6 11 14 12 25" stroke="#3b7fab" strokeWidth="2" opacity=".7" />
      <path d="M48 62c15 5 32 1 45-9l4 15c-11 8-31 13-48 8z" fill="#8fc2eb" />
      <path d="M42 50c15 5 32 1 45-9l6 14c-13 8-32 12-48 8z" fill="#ffc76a" />
      <path d="M47 43c15 5 31 1 44-8l6 14c-13 8-32 12-48 8z" fill="#f8a6b5" />
      <path d="M73 64c14-1 20 3 25 9" stroke="#5ca7d7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ApartmentBuildingLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="25" y="16" width="46" height="66" fill="#fff4d8" stroke="#d28a45" strokeWidth="2" />
      <path d="M20 82h56" stroke="#8dbc69" strokeWidth="5" strokeLinecap="round" />
      {[32, 47, 62].map((x) =>
        [26, 42, 58].map((y) => (
          <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width="10" height="10" fill="#75b8df" stroke="#8b6f53" strokeWidth="1" />
        )),
      )}
      <rect x="42" y="66" width="12" height="16" fill="#d88343" />
      <path d="M38 16v-7h20v7M22 82c0-9 10-12 13-4M62 82c1-8 11-10 14-3" stroke="#78a957" strokeWidth="3" strokeLinecap="round" />
      <path d="M37 37h7M52 37h7M37 53h7M52 53h7" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SoccerPlayerLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="45" cy="18" r="8" fill="#ffd0a5" />
      <path d="M38 30l19 3 7 16-13 5-11-7-9 10-9-7 16-20z" fill="#3ba6e8" />
      <path d="M57 35l13-9M39 48l-12 17M51 54l13 16" stroke="#ffd0a5" strokeWidth="6" strokeLinecap="round" />
      <path d="M24 67l-8 8M67 72l8 5" stroke="#25334d" strokeWidth="5" strokeLinecap="round" />
      <path d="M48 34l-8 14M56 34l-8 20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="74" cy="76" r="9" fill="#f6f6f6" stroke="#222" strokeWidth="2" />
      <path d="M74 67v18M65 76h18M68 70l12 12M80 70L68 82" stroke="#222" strokeWidth="1.5" />
    </svg>
  );
}

export function PottedFlowerLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M49 42v20" stroke="#5ea957" strokeWidth="5" strokeLinecap="round" />
      <circle cx="49" cy="31" r="10" fill="#ffd64f" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={angle} cx="49" cy="31" rx="10" ry="15" fill="#f36f81" transform={`rotate(${angle} 49 31) translate(0 -12)`} />
      ))}
      <circle cx="49" cy="31" r="8" fill="#ffd64f" />
      <path d="M39 52c-13-2-16-10-16-10 12-4 18 3 18 3M56 54c13-4 17-13 17-13-14-3-19 6-19 6" fill="#6fb45f" />
      <path d="M25 61h48l-6 25H31z" fill="#d98436" />
      <path d="M22 58h54v8H22z" fill="#e0913f" />
      <path d="M33 70h28" stroke="#bd6f2f" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function CourtyardHouseLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 116 96" fill="none" aria-hidden="true">
      <path d="M12 78h92" stroke="#8ebd66" strokeWidth="7" strokeLinecap="round" />
      <path d="M18 48l28-26 29 26v34H18z" fill="#fff4e4" stroke="#b34436" strokeWidth="2" />
      <path d="M11 49l35-32 37 32" stroke="#b34436" strokeWidth="6" strokeLinecap="round" />
      <rect x="40" y="58" width="14" height="24" rx="2" fill="#cc7040" />
      <rect x="25" y="54" width="12" height="12" fill="#aee0ef" stroke="#9a6a55" />
      <rect x="60" y="54" width="12" height="12" fill="#aee0ef" stroke="#9a6a55" />
      <path d="M9 82V68h14v14M91 82V68h14v14M23 68h68" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 66h86" stroke="#8ebd66" strokeWidth="5" strokeLinecap="round" />
      <circle cx="82" cy="67" r="7" fill="#69a84d" />
      <circle cx="92" cy="66" r="8" fill="#7dbd59" />
    </svg>
  );
}

export function CatLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M26 28l6-16 12 10 13-1 12-9 4 17c8 8 9 22 4 35-6 15-22 22-39 16-16-5-25-21-20-37 1-6 4-11 8-15z" fill="#f7a15c" />
      <path d="M31 28l2-8 7 6M65 28l5-8 1 9" fill="#ffd1a0" />
      <ellipse cx="48" cy="55" rx="24" ry="22" fill="#ffd4a9" />
      <circle cx="39" cy="48" r="3" fill="#2f2d33" />
      <circle cx="58" cy="48" r="3" fill="#2f2d33" />
      <path d="M48 54l-4 4h8z" fill="#a35a4f" />
      <path d="M34 58c6 2 10 2 14 0M48 58c5 2 10 2 14 0M28 52l-16-5M28 58l-17 2M67 52l17-5M67 58l17 2" stroke="#8a5637" strokeWidth="2" strokeLinecap="round" />
      <path d="M74 63c15 3 7 23-7 15" stroke="#f7a15c" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export function TheaterStageLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 116 96" fill="none" aria-hidden="true">
      <path d="M13 26h90v52H13z" fill="#b74c2d" />
      <path d="M19 31h78v39H19z" fill="#f7e5c6" />
      <path d="M19 31c13 4 21 12 20 39H19zM97 31c-13 4-21 12-20 39h20z" fill="#cf2f35" />
      <path d="M19 31h78" stroke="#8e2d24" strokeWidth="6" />
      <path d="M20 80h76" stroke="#744022" strokeWidth="8" strokeLinecap="round" />
      <circle cx="25" cy="85" r="3" fill="#ffd45d" />
      <circle cx="43" cy="85" r="3" fill="#ffd45d" />
      <circle cx="61" cy="85" r="3" fill="#ffd45d" />
      <circle cx="79" cy="85" r="3" fill="#ffd45d" />
      <path d="M42 69c5-12 25-12 31 0" stroke="#e5b97a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function FamilyFourLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="34" cy="25" r="8" fill="#f0c49b" />
      <circle cx="59" cy="26" r="8" fill="#f0c49b" />
      <path d="M26 41c6-12 18-12 24 0v30H26z" fill="#76aa54" />
      <path d="M50 42c6-12 18-12 24 0v30H50z" fill="#e6b04d" />
      <circle cx="38" cy="54" r="7" fill="#f0c49b" />
      <circle cx="61" cy="55" r="7" fill="#f0c49b" />
      <path d="M28 66c5-9 16-9 21 0v19H28z" fill="#3a92cf" />
      <path d="M52 67c5-9 16-9 21 0v18H52z" fill="#f06f8d" />
      <path d="M21 85h58" stroke="#7ab36a" strokeWidth="5" strokeLinecap="round" />
      <path d="M29 21c4-7 12-7 17 0M52 21c5-7 13-6 16 1M32 52c5-5 12-5 16 0M56 51c5-4 11-3 15 1" stroke="#5a3d2c" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ArtMuseumLandmark({ className = "landmark-svg" }: LandmarkSvgProps) {
  return (
    <svg className={className} viewBox="0 0 116 96" fill="none" aria-hidden="true">
      <path d="M13 79h90" stroke="#8ebd66" strokeWidth="5" strokeLinecap="round" />
      <path d="M19 31h78v48H19z" fill="#fff5df" stroke="#b34436" strokeWidth="2" />
      <path d="M13 31h90l-12-13H25z" fill="#f7e4bd" stroke="#b34436" strokeWidth="2" />
      <path d="M18 31h80" stroke="#c4312e" strokeWidth="5" strokeLinecap="round" />
      <rect x="51" y="52" width="14" height="27" rx="5" fill="#8dc7df" stroke="#8b5f3f" />
      <rect x="28" y="48" width="14" height="16" fill="#f4a151" stroke="#8b5f3f" />
      <rect x="75" y="48" width="14" height="16" fill="#aee0ef" stroke="#8b5f3f" />
      <path d="M78 60l4-5 3 3 4-6" stroke="#69a84d" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 56h4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <rect x="43" y="22" width="30" height="10" rx="2" fill="#fff7ef" />
      <path d="M47 29h22" stroke="#8b5f3f" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
