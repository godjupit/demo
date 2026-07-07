export type MapLens = "default" | "values" | "methods" | "issues";

export type NodePosition = {
  x: number;
  y: number;
};

export type RelationCluster = {
  id: string;
  label: string;
  shortLabel?: string;
  description: string;
  memberIds: string[];
  position: NodePosition;
};

export type MainIssue = RelationCluster & {
  question: string;
  recommendedMemberIds: string[];
  recommendationReason: string;
  memberPerspectives: Array<{
    memberId: string;
    perspective: string;
  }>;
};

export type MemberRelationMetadata = {
  valueClusters: string[];
  methodologies: string[];
  issues: string[];
};

export const valueClusters: RelationCluster[] = [
  {
    id: "low_growth",
    label: "低增长 / 反规模化",
    description: "拒绝资本驱动和快速扩张，以有机生长、低利润或品质优先探索另类发展方式。",
    memberIds: ["luneurs", "mumo", "smart_air", "arch"],
    position: { x: 18, y: 18 }
  },
  {
    id: "local_cocreation",
    label: "在地共创",
    description: "扎根具体地方，将社区视为共同实践的主体，而不是被改造的对象。",
    memberIds: ["pottery_workshop", "zhao_yiren", "xiaohei", "fang_chenchu", "sailor_club", "xu_yihan"],
    position: { x: 46, y: 18 }
  },
  {
    id: "open_knowledge",
    label: "开放知识 / 去专业化",
    description: "降低知识和专业门槛，通过免费教育、公开传播和业余者参与扩大知识可达性。",
    memberIds: ["smart_air", "pottery_workshop", "fang_chenchu", "liao_zhili"],
    position: { x: 76, y: 20 }
  },
  {
    id: "care_mutual",
    label: "照护 / 互助",
    description: "关注被忽视的照护、精神健康与互助劳动，让私人经验进入公共讨论。",
    memberIds: ["zhao_yiren", "xu_yihan", "zhu_jingming"],
    position: { x: 18, y: 48 }
  },
  {
    id: "repair_not_create",
    label: "修复而非创造",
    description: "不在现实之外另建世界，而是通过行动、规则和游戏在现实中撬开裂缝。",
    memberIds: ["rect_repair", "ge_yulu"],
    position: { x: 78, y: 48 }
  },
  {
    id: "women_craft",
    label: "女性叙事 / 手工劳动",
    description: "以女性经验、家务劳动和手工实践承载叙事，并将其转化为公共表达。",
    memberIds: ["xiuxiu", "xu_yihan", "zhu_jingming"],
    position: { x: 22, y: 76 }
  },
  {
    id: "edge_aesthetics",
    label: "边缘美学 / 土俗",
    description: "通过地方、土俗、山寨和边缘文化，对抗单一的主流审美与成功叙事。",
    memberIds: ["ergao_ben", "spring_changzhou"],
    position: { x: 52, y: 78 }
  },
  {
    id: "game_play",
    label: "游戏 / 玩",
    description: "将游戏和玩作为公共参与、关系建立和社会介入的方法。",
    memberIds: ["rect_repair", "sailor_club", "zhao_yiren"],
    position: { x: 80, y: 76 }
  }
];

export const methodClusters: RelationCluster[] = [
  {
    id: "market_driven",
    label: "市集驱动",
    description: "以市集作为连接创作者、产品、地方社区和公众的长期组织机制。",
    memberIds: ["pottery_workshop", "mumo"],
    position: { x: 18, y: 18 }
  },
  {
    id: "workshop_participatory",
    label: "工作坊 / 参与式",
    description: "通过面对面的共同制作、游戏或讨论，让参与者成为实践的一部分。",
    memberIds: ["rect_repair", "sailor_club", "xiuxiu", "xu_yihan", "fang_chenchu"],
    position: { x: 46, y: 18 }
  },
  {
    id: "podcast_publishing",
    label: "播客 / 出版",
    description: "通过声音、文字和独立出版承载个人经验、知识传播与公共讨论。",
    memberIds: ["zhu_jingming", "fang_chenchu", "sailor_club", "rect_repair"],
    position: { x: 76, y: 20 }
  },
  {
    id: "exhibition_festival",
    label: "展览 / 艺术节",
    description: "通过展览、艺术节或公共呈现，将议题转化为可被观看和参与的现场。",
    memberIds: ["xu_yihan", "ge_yulu", "mumo", "ergao_ben"],
    position: { x: 18, y: 50 }
  },
  {
    id: "space_operation",
    label: "空间运营",
    description: "通过长期运营门店、社区空间、工作室或互助空间承载持续关系。",
    memberIds: ["luneurs", "mumo", "pottery_workshop", "zhao_yiren"],
    position: { x: 78, y: 48 }
  },
  {
    id: "direct_action",
    label: "直接行动",
    description: "不等待完整制度或宏大计划，以具体、可执行的行动直接介入现实。",
    memberIds: ["ge_yulu", "smart_air", "arch"],
    position: { x: 22, y: 78 }
  },
  {
    id: "hackathon_tech",
    label: "骇客松 / 技术社群",
    description: "以技术实验、短周期协作和开放式挑战组织临时社群。",
    memberIds: ["spring_changzhou"],
    position: { x: 52, y: 80 }
  },
  {
    id: "residency_nomadic",
    label: "驻场 / 游牧",
    description: "通过驻地或流动式组织方式，在不同地方建立阶段性实践关系。",
    memberIds: ["pottery_workshop", "ergao_ben"],
    position: { x: 80, y: 78 }
  }
];

export const mainIssues: MainIssue[] = [
  {
    id: "game_social_intervention",
    label: "游戏如何成为社会介入",
    shortLabel: "游戏与社会介入",
    description: "游戏不只是娱乐产品，也可以成为重新组织公共空间、社区关系和日常经验的方法。",
    question:
      "当游戏进入街道、社区和真实社会关系，它是否可以成为一种比传统倡议更有渗透力的公共行动？",
    memberIds: ["rect_repair", "sailor_club", "zhao_yiren"],
    recommendedMemberIds: ["rect_repair", "sailor_club", "zhao_yiren"],
    recommendationReason:
      "三组成员分别通过城市游戏、日常材料与游戏工作坊、LARP 与社区互助，将“玩”转化为公共参与的方法。",
    memberPerspectives: [
      { memberId: "rect_repair", perspective: "通过现实游戏和规则设计重新组织城市关系。" },
      { memberId: "sailor_club", perspective: "通过食物、材料和玩，让日常经验成为创造入口。" },
      { memberId: "zhao_yiren", perspective: "通过 LARP 和社区实践，让照护、交换与互助关系变得可见。" }
    ],
    position: { x: 20, y: 18 }
  },
  {
    id: "care_visibility",
    label: "照护如何被看见",
    shortLabel: "照护的可见性",
    description: "将长期被隐藏在私人生活中的家务、精神健康和互助劳动，转化为公共讨论。",
    question: "艺术、游戏和个人叙事，分别能够如何让隐形的照护劳动被看见、被讨论和被重新衡量？",
    memberIds: ["xu_yihan", "zhao_yiren", "zhu_jingming"],
    recommendedMemberIds: ["xu_yihan", "zhao_yiren", "zhu_jingming"],
    recommendationReason:
      "三位成员分别从家务劳动、社区互助和精神健康出发，构成从私人经验到公共议题的完整照护光谱。",
    memberPerspectives: [
      { memberId: "xu_yihan", perspective: "把家务劳动与女性家庭经验转化为公共艺术。" },
      { memberId: "zhao_yiren", perspective: "通过社区自治和游戏机制呈现照护经济。" },
      { memberId: "zhu_jingming", perspective: "通过书写、播客与出版推动精神健康去污名化。" }
    ],
    position: { x: 50, y: 18 }
  },
  {
    id: "craft_labor_story",
    label: "手工劳动如何承载叙事",
    shortLabel: "手工与叙事",
    description: "木工、版画、刺绣和家务劳动，不只是生产方式，也可以成为记录生活和建立关系的媒介。",
    question: "当手工劳动从产品生产转向叙事、社区参与和公共表达，它会形成怎样的新价值？",
    memberIds: ["mumo", "xiaohei", "xiuxiu", "xu_yihan"],
    recommendedMemberIds: ["mumo", "xiaohei", "xiuxiu"],
    recommendationReason: "三组实践分别以木、印、绣为媒介，连接慢工艺、社区参与和传统手艺的当代转换。",
    memberPerspectives: [
      { memberId: "mumo", perspective: "通过可长期使用的物具抵抗一次性消费。" },
      { memberId: "xiaohei", perspective: "通过手工版画与村民参与对抗城市孤独。" },
      { memberId: "xiuxiu", perspective: "通过刺绣、身体和故事重新讨论女性手工劳动。" }
    ],
    position: { x: 78, y: 20 }
  },
  {
    id: "tradition_contemporary",
    label: "传统技艺如何进入当代",
    shortLabel: "传统技艺转化",
    description: "传统材料和符号并非静态遗产，也可以进入新的社会议题和公共关系。",
    question: "传统技艺的当代转换，应该保留什么，又应该改变什么？",
    memberIds: ["pottery_workshop", "xiuxiu", "spring_changzhou", "xu_yihan"],
    recommendedMemberIds: ["pottery_workshop", "xiuxiu", "spring_changzhou"],
    recommendationReason:
      "三组成员分别通过陶瓷生态、刺绣叙事和传统纸符再设计，展示传统技艺进入当代的不同路径。",
    memberPerspectives: [
      { memberId: "pottery_workshop", perspective: "通过教育、市集和驻场建立陶艺创作生态。" },
      { memberId: "xiuxiu", perspective: "让刺绣成为女性经验和身体叙事的载体。" },
      { memberId: "spring_changzhou", perspective: "将传统“贵人”纸符转化为气候、身份与职场议题。" }
    ],
    position: { x: 20, y: 48 }
  },
  {
    id: "knowledge_threshold",
    label: "知识如何跨越专业门槛",
    shortLabel: "知识与专业门槛",
    description: "通过免费教育、极简方案、独立出版和翻译，降低专业知识进入普通生活的门槛。",
    question: "去专业化是否意味着反对专业，还是意味着重新分配专业知识的使用权？",
    memberIds: ["fang_chenchu", "smart_air", "pottery_workshop", "liao_zhili"],
    recommendedMemberIds: ["fang_chenchu", "smart_air", "pottery_workshop"],
    recommendationReason:
      "三组成员分别从业余者文化、开放科普和免费教育出发，探索知识如何离开封闭的专业系统。",
    memberPerspectives: [
      { memberId: "fang_chenchu", perspective: "以“业余者的长期主义”拒绝专业门槛。" },
      { memberId: "smart_air", perspective: "通过开放数据和低成本方案打破行业信息壁垒。" },
      { memberId: "pottery_workshop", perspective: "通过免费讲座、市集和驻场开放陶艺知识。" }
    ],
    position: { x: 78, y: 48 }
  },
  {
    id: "local_choice",
    label: "地方如何成为主动选择",
    shortLabel: "地方与非中心",
    description: "非中心城市和具体社区，不是资源不足的替代方案，而可以成为新的实践方法。",
    question: "当创作者主动离开中心化的资源与评价体系，地方能够提供哪些新的时间、关系和组织方式？",
    memberIds: ["pottery_workshop", "mumo", "fang_chenchu", "xiaohei"],
    recommendedMemberIds: ["pottery_workshop", "mumo", "fang_chenchu"],
    recommendationReason:
      "三组成员分别从景德镇、温州和宁波出发，以长期在地实践形成超越一线城市中心逻辑的影响力。",
    memberPerspectives: [
      { memberId: "pottery_workshop", perspective: "以陶瓷社区改变景德镇的城市生态。" },
      { memberId: "mumo", perspective: "从温州出发，以克制扩张形成长期品牌。" },
      { memberId: "fang_chenchu", perspective: "通过在地出版、城市行走和业余实践建立宁波文化网络。" }
    ],
    position: { x: 22, y: 78 }
  },
  {
    id: "repair_or_remake",
    label: "修复现实还是重造空间",
    shortLabel: "修复与重造",
    description: "面对既有制度和现实结构，实践者可以选择撬动、修复、直接介入，也可以转向游牧和新的组织空间。",
    question: "改变现实需要留在原有结构中“修”，还是离开旧结构重新创造新的空间？",
    memberIds: ["rect_repair", "ge_yulu", "ergao_ben"],
    recommendedMemberIds: ["rect_repair", "ge_yulu", "ergao_ben"],
    recommendationReason: "三组成员分别代表游戏式修复、直接行动和游牧式组织，形成三种不同的现实介入策略。",
    memberPerspectives: [
      { memberId: "rect_repair", perspective: "通过规则和游戏在现实中撬开裂缝。" },
      { memberId: "ge_yulu", perspective: "通过直接行动暴露并改变制度边界。" },
      { memberId: "ergao_ben", perspective: "离开固定空间，以游牧集体回应旧有艺术结构。" }
    ],
    position: { x: 52, y: 80 }
  },
  {
    id: "community_space",
    label: "社区空间如何维持公共关系",
    shortLabel: "社区空间",
    description: "互助社、陶艺空间、面包店和家具门店，都可能超越消费功能，成为关系发生的第三空间。",
    question: "一个空间如何在商业、开放性和长期关系之间保持平衡？",
    memberIds: ["zhao_yiren", "pottery_workshop", "luneurs", "mumo"],
    recommendedMemberIds: ["zhao_yiren", "pottery_workshop", "luneurs"],
    recommendationReason:
      "三组成员分别代表社区互助空间、工艺文化平台和商业门店中的社区关系，能够形成不同空间运营模式的对话。",
    memberPerspectives: [
      { memberId: "zhao_yiren", perspective: "以互助和共同治理维系社区空间。" },
      { memberId: "pottery_workshop", perspective: "以市集、教育和驻场形成开放创作生态。" },
      { memberId: "luneurs", perspective: "以门店承载日常社区连接，并拒绝资本驱动扩张。" }
    ],
    position: { x: 80, y: 78 }
  }
];

export const memberRelations: Record<string, MemberRelationMetadata> = {
  luneurs: {
    valueClusters: ["low_growth"],
    methodologies: ["space_operation"],
    issues: ["community_space"]
  },
  arch: {
    valueClusters: ["low_growth"],
    methodologies: ["direct_action"],
    issues: []
  },
  smart_air: {
    valueClusters: ["low_growth", "open_knowledge"],
    methodologies: ["direct_action"],
    issues: ["knowledge_threshold"]
  },
  pottery_workshop: {
    valueClusters: ["local_cocreation", "open_knowledge"],
    methodologies: ["market_driven", "space_operation", "residency_nomadic"],
    issues: ["tradition_contemporary", "knowledge_threshold", "local_choice", "community_space"]
  },
  mumo: {
    valueClusters: ["low_growth"],
    methodologies: ["market_driven", "exhibition_festival", "space_operation"],
    issues: ["craft_labor_story", "local_choice", "community_space"]
  },
  rect_repair: {
    valueClusters: ["repair_not_create", "game_play"],
    methodologies: ["workshop_participatory", "podcast_publishing"],
    issues: ["game_social_intervention", "repair_or_remake"]
  },
  ge_yulu: {
    valueClusters: ["repair_not_create"],
    methodologies: ["exhibition_festival", "direct_action"],
    issues: ["repair_or_remake"]
  },
  ergao_ben: {
    valueClusters: ["edge_aesthetics"],
    methodologies: ["exhibition_festival", "residency_nomadic"],
    issues: ["repair_or_remake"]
  },
  zhao_yiren: {
    valueClusters: ["local_cocreation", "care_mutual", "game_play"],
    methodologies: ["space_operation"],
    issues: ["game_social_intervention", "care_visibility", "community_space"]
  },
  xiaohei: {
    valueClusters: ["local_cocreation"],
    methodologies: [],
    issues: ["craft_labor_story", "local_choice"]
  },
  zhu_jingming: {
    valueClusters: ["care_mutual", "women_craft"],
    methodologies: ["podcast_publishing"],
    issues: ["care_visibility"]
  },
  fang_chenchu: {
    valueClusters: ["local_cocreation", "open_knowledge"],
    methodologies: ["workshop_participatory", "podcast_publishing"],
    issues: ["knowledge_threshold", "local_choice"]
  },
  liao_zhili: {
    valueClusters: ["open_knowledge"],
    methodologies: [],
    issues: ["knowledge_threshold"]
  },
  xu_yihan: {
    valueClusters: ["local_cocreation", "care_mutual", "women_craft"],
    methodologies: ["workshop_participatory", "exhibition_festival"],
    issues: ["care_visibility", "craft_labor_story", "tradition_contemporary"]
  },
  xiuxiu: {
    valueClusters: ["women_craft"],
    methodologies: ["workshop_participatory"],
    issues: ["craft_labor_story", "tradition_contemporary"]
  },
  buzi: {
    valueClusters: ["women_craft"],
    methodologies: ["workshop_participatory"],
    issues: ["craft_labor_story", "tradition_contemporary"]
  },
  spring_changzhou: {
    valueClusters: ["edge_aesthetics"],
    methodologies: ["hackathon_tech"],
    issues: ["tradition_contemporary"]
  },
  sailor_club: {
    valueClusters: ["local_cocreation", "game_play"],
    methodologies: ["workshop_participatory", "podcast_publishing"],
    issues: ["game_social_intervention"]
  }
};

export const relationMemberPositions: Record<Exclude<MapLens, "default">, Record<string, NodePosition>> = {
  values: {
    luneurs: { x: 12, y: 30 },
    mumo: { x: 22, y: 31 },
    smart_air: { x: 33, y: 29 },
    arch: { x: 22, y: 39 },
    pottery_workshop: { x: 43, y: 33 },
    zhao_yiren: { x: 39, y: 50 },
    xiaohei: { x: 35, y: 66 },
    fang_chenchu: { x: 54, y: 32 },
    sailor_club: { x: 64, y: 67 },
    xu_yihan: { x: 31, y: 56 },
    liao_zhili: { x: 72, y: 34 },
    zhu_jingming: { x: 18, y: 61 },
    rect_repair: { x: 70, y: 60 },
    ge_yulu: { x: 86, y: 57 },
    xiuxiu: { x: 28, y: 87 },
    buzi: { x: 14, y: 87 },
    ergao_ben: { x: 47, y: 89 },
    spring_changzhou: { x: 59, y: 89 }
  },
  methods: {
    pottery_workshop: { x: 22, y: 32 },
    mumo: { x: 31, y: 36 },
    rect_repair: { x: 47, y: 32 },
    sailor_club: { x: 58, y: 36 },
    xiuxiu: { x: 38, y: 37 },
    xu_yihan: { x: 28, y: 54 },
    fang_chenchu: { x: 65, y: 31 },
    zhu_jingming: { x: 82, y: 34 },
    ge_yulu: { x: 29, y: 67 },
    ergao_ben: { x: 17, y: 65 },
    luneurs: { x: 68, y: 58 },
    zhao_yiren: { x: 86, y: 58 },
    smart_air: { x: 30, y: 88 },
    arch: { x: 14, y: 88 },
    spring_changzhou: { x: 53, y: 91 },
    buzi: { x: 42, y: 52 },
    liao_zhili: { x: 73, y: 76 },
    xiaohei: { x: 90, y: 78 }
  },
  issues: {
    rect_repair: { x: 16, y: 34 },
    sailor_club: { x: 33, y: 31 },
    zhao_yiren: { x: 41, y: 44 },
    xu_yihan: { x: 47, y: 34 },
    zhu_jingming: { x: 58, y: 34 },
    mumo: { x: 69, y: 36 },
    xiaohei: { x: 86, y: 35 },
    xiuxiu: { x: 77, y: 52 },
    buzi: { x: 70, y: 60 },
    pottery_workshop: { x: 30, y: 60 },
    spring_changzhou: { x: 16, y: 64 },
    smart_air: { x: 70, y: 61 },
    liao_zhili: { x: 86, y: 61 },
    fang_chenchu: { x: 32, y: 88 },
    luneurs: { x: 89, y: 88 },
    ge_yulu: { x: 48, y: 67 },
    ergao_ben: { x: 59, y: 89 },
    arch: { x: 12, y: 87 }
  }
};
