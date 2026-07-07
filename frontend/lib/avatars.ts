export type SpeakerAvatar = {
  initials: string;
  mark: string;
  colors: [string, string];
};

const fallbackColors: [string, string][] = [
  ["#E8A0B4", "#CFE8FF"],
  ["#4267a8", "#e6b655"],
  ["#a84d3f", "#88b7a4"],
  ["#6b5b95", "#f0c66b"],
  ["#2f6f8f", "#df8f6b"]
];

export const speakerAvatars: Record<string, SpeakerAvatar> = {
  luneurs: { initials: "LU", mark: "BREAD", colors: ["#d06f37", "#f4d4a2"] },
  arch: { initials: "AR", mark: "TEXTILE", colors: ["#C88095", "#DDEEFF"] },
  smart_air: { initials: "SA", mark: "AIR", colors: ["#4b89b8", "#d6eef7"] },
  pottery_workshop: { initials: "陶", mark: "CLAY", colors: ["#9b5b42", "#e6c6a5"] },
  mumo: { initials: "木", mark: "WOOD", colors: ["#6e5a3e", "#d7bd87"] },
  rect_repair: { initials: "修", mark: "PLAY", colors: ["#394f8a", "#f0b44c"] },
  ge_yulu: { initials: "葛", mark: "ROAD", colors: ["#30323d", "#c9c0b4"] },
  ergao_ben: { initials: "舞", mark: "BODY", colors: ["#b4493d", "#f0c05a"] },
  zhao_yiren: { initials: "赵", mark: "CARE", colors: ["#D08090", "#FFEEF2"] },
  xiaohei: { initials: "黑", mark: "MONSTER", colors: ["#2A2A2A", "#CFE8FF"] },
  zhu_jingming: { initials: "朱", mark: "VOICE", colors: ["#7b4368", "#f0a7a0"] },
  fang_chenchu: { initials: "晨", mark: "BOOK", colors: ["#7A90B0", "#CFE8FF"] },
  liao_zhili: { initials: "廖", mark: "HOME", colors: ["#B87090", "#FFE4EC"] },
  xu_yihan: { initials: "徐", mark: "RAG", colors: ["#8f4f60", "#e7b7c8"] },
  xiuxiu: { initials: "绣", mark: "THREAD", colors: ["#b05b82", "#f2c6d8"] },
  buzi: { initials: "不", mark: "STITCH", colors: ["#8a4f7d", "#f0b6d2"] },
  spring_changzhou: { initials: "春", mark: "AI", colors: ["#8BA0C0", "#E8DFFF"] },
  sailor_club: { initials: "水", mark: "PLAY", colors: ["#236b8e", "#f2cf7a"] }
};

export function avatarForSpeaker(speakerId: string): SpeakerAvatar {
  if (speakerAvatars[speakerId]) {
    return speakerAvatars[speakerId];
  }
  const index = [...speakerId].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return {
    initials: speakerId.slice(0, 2).toUpperCase(),
    mark: "B",
    colors: fallbackColors[index % fallbackColors.length]
  };
}
