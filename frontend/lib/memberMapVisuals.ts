export type LandmarkType =
  | "bakery"
  | "material-lab"
  | "air-lab"
  | "pottery-workshop"
  | "furniture-studio"
  | "game-character"
  | "public-artist"
  | "performer"
  | "community-house"
  | "craft-character"
  | "writer-character"
  | "publisher-kiosk"
  | "art-space"
  | "community-garden"
  | "embroidery-workshop"
  | "climate-lab"
  | "sailor-club"
  | "blue-book"
  | "ballet-dancer"
  | "sofa"
  | "air-conditioner"
  | "landscape-easel"
  | "ice-cream"
  | "ceramic-bowl"
  | "framed-painting"
  | "painter-person"
  | "yarn-fabric"
  | "apartment-building"
  | "soccer-player"
  | "potted-flower"
  | "courtyard-house"
  | "cat"
  | "theater-stage"
  | "family-four"
  | "art-museum"
  | "generic-building"
  | "generic-character";

export type MapStyleGroup = "company" | "artist" | "community" | "collective";

export type MemberMapVisual = {
  landmarkType: LandmarkType;
  landmarkVariant?: string;
  shortLabel?: string;
  mapStyleGroup: MapStyleGroup;
  accent?: string;
};

export type MemberPosition = {
  x: number;
  y: number;
};

export type MemberMapPositions = {
  default: MemberPosition;
  values?: MemberPosition;
  methods?: MemberPosition;
  issues?: MemberPosition;
};

/** Landscape positions for the "default" (自由星图) lens.
 *  These are hand-tuned to avoid overlaps and fit the landscape narrative. */
export const landscapePositions: Record<string, MemberPosition> = {
  luneurs: { x: 18, y: 22 },
  arch: { x: 14, y: 40 },
  smart_air: { x: 82, y: 16 },
  pottery_workshop: { x: 46, y: 34 },
  mumo: { x: 64, y: 22 },
  rect_repair: { x: 68, y: 52 },
  ge_yulu: { x: 88, y: 36 },
  ergao_ben: { x: 34, y: 28 },
  zhao_yiren: { x: 22, y: 62 },
  xiaohei: { x: 54, y: 68 },
  zhu_jingming: { x: 34, y: 56 },
  fang_chenchu: { x: 40, y: 18 },
  liao_zhili: { x: 78, y: 32 },
  xu_yihan: { x: 14, y: 78 },
  xiuxiu: { x: 72, y: 72 },
  buzi: { x: 62, y: 80 },
  spring_changzhou: { x: 86, y: 64 },
  sailor_club: { x: 78, y: 84 },
};

/**
 * Member → landmark visual mapping.
 * Companies/brands get buildings; artists get characters; communities get houses/spaces.
 */
export const memberMapVisuals: Record<string, MemberMapVisual> = {
  luneurs: {
    landmarkType: "ice-cream",
    mapStyleGroup: "company",
    shortLabel: "Luneurs",
  },
  arch: {
    landmarkType: "yarn-fabric",
    mapStyleGroup: "company",
    shortLabel: "Arch",
  },
  smart_air: {
    landmarkType: "air-conditioner",
    mapStyleGroup: "company",
    shortLabel: "Smart Air",
  },
  pottery_workshop: {
    landmarkType: "ceramic-bowl",
    mapStyleGroup: "community",
    shortLabel: "乐天陶社",
  },
  mumo: {
    landmarkType: "sofa",
    mapStyleGroup: "company",
    shortLabel: "MUMO 木墨",
  },
  rect_repair: {
    landmarkType: "landscape-easel",
    mapStyleGroup: "collective",
    shortLabel: "修四边形",
  },
  ge_yulu: {
    landmarkType: "painter-person",
    mapStyleGroup: "artist",
    shortLabel: "葛宇路",
  },
  ergao_ben: {
    landmarkType: "ballet-dancer",
    mapStyleGroup: "collective",
    shortLabel: "二高表演",
  },
  zhao_yiren: {
    landmarkType: "courtyard-house",
    mapStyleGroup: "community",
    shortLabel: "定海桥互助社",
  },
  xiaohei: {
    landmarkType: "cat",
    mapStyleGroup: "artist",
    shortLabel: "小黑",
  },
  zhu_jingming: {
    landmarkType: "framed-painting",
    mapStyleGroup: "artist",
    shortLabel: "朱璟茗",
  },
  fang_chenchu: {
    landmarkType: "blue-book",
    mapStyleGroup: "collective",
    shortLabel: "晨初 / 假杂志",
  },
  liao_zhili: {
    landmarkType: "family-four",
    mapStyleGroup: "artist",
    shortLabel: "Dweller",
  },
  xu_yihan: {
    landmarkType: "apartment-building",
    mapStyleGroup: "community",
    shortLabel: "起风了社区",
  },
  xiuxiu: {
    landmarkType: "theater-stage",
    mapStyleGroup: "collective",
    shortLabel: "绣绣故事会",
  },
  buzi: {
    landmarkType: "art-museum",
    mapStyleGroup: "collective",
    shortLabel: "不子 / 绣绣",
  },
  spring_changzhou: {
    landmarkType: "potted-flower",
    mapStyleGroup: "collective",
    shortLabel: "春潮 Spring",
  },
  sailor_club: {
    landmarkType: "soccer-player",
    mapStyleGroup: "community",
    shortLabel: "水手俱乐部",
  },
};

/** Get the map visual for a member, falling back to a sensible default. */
export function getMemberMapVisual(speakerId: string): MemberMapVisual {
  if (memberMapVisuals[speakerId]) {
    return memberMapVisuals[speakerId];
  }

  // Log unmapped members in dev
  if (process.env.NODE_ENV === "development") {
    console.warn(`Map visual not configured for member: ${speakerId}`);
  }

  // Guess style group from known patterns
  const knownCompanies = ["luneurs", "arch", "smart_air", "mumo"];
  const knownArtists = [
    "ge_yulu", "xiaohei", "zhu_jingming", "liao_zhili",
  ];
  const knownCommunities = [
    "pottery_workshop", "zhao_yiren", "xu_yihan", "sailor_club",
  ];

  if (knownCompanies.includes(speakerId)) {
    return {
      landmarkType: "generic-building",
      mapStyleGroup: "company",
    };
  }
  if (knownArtists.includes(speakerId)) {
    return {
      landmarkType: "generic-character",
      mapStyleGroup: "artist",
    };
  }
  if (knownCommunities.includes(speakerId)) {
    return {
      landmarkType: "community-house",
      mapStyleGroup: "community",
    };
  }

  return {
    landmarkType: "generic-building",
    mapStyleGroup: "company",
  };
}

/** Get the landscape (default lens) position for a member. */
export function getLandscapePosition(
  speakerId: string,
  index: number,
): MemberPosition {
  if (landscapePositions[speakerId]) {
    return landscapePositions[speakerId];
  }

  // Fallback: distributed grid
  const cols = 5;
  const row = Math.floor(index / cols);
  const col = index % cols;
  return {
    x: 12 + col * 19,
    y: 15 + row * 22,
  };
}

/** Map decoration positions — fixed, data-driven */
export type MapDecoration = {
  type: "tree" | "flower" | "grass" | "mushroom" | "bridge" | "flag" | "stone";
  x: number;
  y: number;
  scale: number;
  variant?: number;
};

export const mapDecorations: MapDecoration[] = [
  { type: "tree", x: 8, y: 32, scale: 0.9 },
  { type: "tree", x: 14, y: 12, scale: 0.7 },
  { type: "tree", x: 92, y: 28, scale: 0.85 },
  { type: "tree", x: 88, y: 12, scale: 0.65 },
  { type: "tree", x: 6, y: 68, scale: 0.8 },
  { type: "tree", x: 94, y: 58, scale: 0.75 },

  { type: "flower", x: 28, y: 44, scale: 0.7 },
  { type: "flower", x: 56, y: 14, scale: 0.65 },
  { type: "flower", x: 76, y: 44, scale: 0.7 },
  { type: "flower", x: 38, y: 72, scale: 0.6 },
  { type: "flower", x: 62, y: 58, scale: 0.65 },

  { type: "grass", x: 22, y: 88, scale: 0.8 },
  { type: "grass", x: 48, y: 90, scale: 0.75 },
  { type: "grass", x: 72, y: 90, scale: 0.7 },
  { type: "grass", x: 12, y: 52, scale: 0.6 },
  { type: "grass", x: 86, y: 76, scale: 0.65 },

  { type: "mushroom", x: 24, y: 38, scale: 0.6 },
  { type: "mushroom", x: 58, y: 42, scale: 0.55 },

  { type: "stone", x: 32, y: 48, scale: 0.5 },
  { type: "stone", x: 68, y: 34, scale: 0.45 },

  { type: "flag", x: 46, y: 26, scale: 0.8 },

  { type: "bridge", x: 74, y: 82, scale: 0.9 },
];

/**
 * Simple overlap checker for dev mode.
 * Outputs warnings when two nodes are too close.
 */
export function validateMapNodeOverlaps(
  positions: Array<{ id: string; x: number; y: number }>,
  minDistance = 9,
): void {
  if (process.env.NODE_ENV !== "development") return;

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const a = positions[i];
      const b = positions[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < minDistance) {
        console.warn(`Map overlap warning: ${a.id} and ${b.id} (distance: ${distance.toFixed(1)})`);
      }
    }
  }
}
