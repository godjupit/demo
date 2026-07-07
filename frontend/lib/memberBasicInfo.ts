export type MemberBasicInfo = {
  name: string;
  displayName?: string;
  aliases?: string[];
  location?: string;
  basicInfo?: string;
  values?: string;
  accounts?: string;
  activities?: string[];
  memberTypes?: string[];
  practiceKeywords?: string[];
  valueTags?: string[];
  connectableResources?: string[];
  cooperationWays?: string[];
  publicSources?: string[];
  verificationStatus?: string;
  dataSource?: string;
};

export const memberBasicInfo: Record<string, MemberBasicInfo> = {
  luneurs: {
    name: "Luneurs",
    location: "上海",
    basicInfo:
      "2018 年成立的法式烘焙 & 冰淇淋品牌。拒绝 VC 驱动扩张，以“每一克都是快乐”做有机生长的社区面包店，目前已拥有 19+ 门店覆盖全国。SSIR 中文曾以《Luneurs：另类成长》报道其成长路径。",
    values:
      "拒绝 VC 驱动扩张；有机生长而非规模化复制；社区导向；“每一克都是快乐”——追求品质与体验而非速度与体量。",
    accounts: "Instagram `@luneursofficial`；另有门店平台、媒体报道入口可供追踪。",
    activities: [
      "SSIR 中文报道《Luneurs：另类成长》",
      "腾讯新闻专题报道",
      "19+ 门店持续运营，以线下空间承载社区连接"
    ],
    memberTypes: ["共益企业"],
    practiceKeywords: ["烘焙", "社区", "有机生长", "冰淇淋", "线下空间"],
    valueTags: ["低增长", "有机生长", "拒绝 VC 驱动", "社区导向", "品质优先于速度"],
    connectableResources: ["门店场地", "产品", "社群"],
    cooperationWays: ["案例报道", "线下活动"],
    publicSources: ["Instagram `@luneursofficial`", "腾讯新闻", "SSIR 中文", "门店平台"]
  },
  arch: {
    name: "Arch（美璟新材料）",
    aliases: ["Arch", "美璟新材料"],
    location: "上海",
    basicInfo:
      "2007 年成立。乐平基金会“共益经济研究”页面确认其为 SSIR 共益企业案例，标题为“一个蜂鸟般的外贸公司，如何参与并推动可持续服装变革”。2019 年毅然砍掉过亿常规面料业务，全面转向环保面料，服务 Gap、Tommy Hilfiger 等国际品牌，以“蜂鸟般”的敏捷姿态推动可持续纺织创新。",
    values:
      "全面转向环保面料——宁可砍掉过亿常规业务；“蜂鸟般”敏捷行动；可持续纺织创新；共益经济。",
    accounts: "SSIR / 乐平基金会案例入口可确认；官网、公众号或社媒账号待核。",
    activities: [
      "乐平基金会 · 共益企业案例收录",
      "服务 Gap、Tommy Hilfiger 等国际品牌的环保面料方案"
    ],
    memberTypes: ["共益企业"],
    practiceKeywords: ["可持续", "纺织", "环保面料", "供应链创新", "共益经济"],
    valueTags: ["全面转向可持续", "敏捷行动（蜂鸟精神）", "共益经济", "砍掉过亿常规业务"],
    connectableResources: ["产品（环保面料方案）", "课程/讲座（可持续纺织经验）"],
    cooperationWays: ["案例报道", "访谈", "知识库采集"],
    publicSources: ["SSIR / 乐平基金会案例入口", "官网、公众号待核"]
  },
  smart_air: {
    name: "Smart Air / 聪明空气",
    aliases: ["Smart Air", "聪明空气"],
    location: "北京",
    basicInfo:
      "2013 年成立的小型社会企业，由 Thomas、Anna、Gus 等发起。用“风扇 + HEPA 滤网”的极简方案打破行业暴利，坚持 15–20% 的低利润率，拒绝参与 618 / 双11 促销。通过低成本、数据支持的空气净化器与开放知识传播，让更多人负担得起洁净空气。至今已举办 800+ 场免费科普沙龙，并在多个国家传播。",
    values:
      "拒绝行业暴利，坚持 15–20% 低利润率；拒绝 618 / 双11 促销；开放知识传播；数据驱动；人人应负担得起洁净空气。",
    accounts: "官网 / 品牌名 Smart Air / 聪明空气；中文站可检索“聪明空气”。",
    activities: [
      "800+ 场免费科普沙龙",
      "多国传播（中国、印度、菲律宾、蒙古等）",
      "风扇 + HEPA 极简方案打破行业暴利"
    ],
    memberTypes: ["共益企业"],
    practiceKeywords: ["空气净化", "开放知识", "科普", "社会企业", "数据驱动"],
    valueTags: ["拒绝行业暴利", "15–20% 低利润率", "拒绝促销（618/双11）", "开放知识", "人人应负担得起洁净空气"],
    connectableResources: ["产品（空气净化器）", "课程/工作坊（科普沙龙）", "知识内容"],
    cooperationWays: ["案例报道", "访谈", "知识库采集"],
    publicSources: ["官网", "中文站“聪明空气”", "媒体报道"]
  },
  pottery_workshop: {
    name: "乐天陶社 / Pottery Workshop",
    aliases: ["乐天陶社", "Pottery Workshop"],
    location: "景德镇（源起香港）",
    basicInfo:
      "1985 年成立于香港，2005 年进入景德镇。长期推动陶艺创作、教育、交流、市集与展览。以周六创意市集（要求 100% 原创）+ 国际驻场 + 免费讲座为核心模式，一手创造了“景漂”现象，是将陶瓷工艺、城市空间与创意社群连接起来的重要平台。",
    values:
      "100% 原创——市集拒绝复制品；国际交流与驻场；免费教育与开放知识；连接陶瓷工艺、城市空间与创意社群。",
    accounts: "可检索“乐天陶社”“Pottery Workshop 景德镇”；线下市集、公众号与活动报道较多。",
    activities: [
      "周六创意市集（100% 原创准入）",
      "国际艺术家驻场项目",
      "免费讲座与陶艺教育活动",
      "一手创造“景漂”现象——一个社区改变一座城"
    ],
    memberTypes: ["共益企业", "社区组织"],
    practiceKeywords: ["陶瓷", "市集", "教育", "驻场", "原创", "国际交流", "工艺传承"],
    valueTags: ["100% 原创", "国际交流", "免费教育", "在地共创", "连接工艺与社区"],
    connectableResources: ["场地（景德镇）", "工作坊", "课程", "市集", "展览", "驻场项目", "社群"],
    cooperationWays: ["线下活动", "共创工作坊", "案例报道", "访谈", "知识库采集"],
    publicSources: ["公众号", "线下市集", "活动报道", "国际艺术机构页面"],
    verificationStatus: "已核",
    dataSource: "B Community 信息抓取、公开检索、SSIR 报道"
  },
  mumo: {
    name: "MUMO 木墨",
    location: "温州瑞安创立；杭州、上海、南京等地有门店 / 展厅线索",
    basicInfo:
      "2011 年成立的实木家具品牌。只用 FSC 认证北美硬木 + 天然木蜡油，强调“像做给自己一样做给他人”、“可以使用很久的物具”。15 年只开了 19 家店，拒绝快速扩张。旗下“双手做工”市集支持数百独立手艺人；近年也通过“识木计划”等展览将木材、手工与可持续消费连接起来。",
    values:
      "拒绝快速扩张（15 年 19 家店）；“像做给自己一样做给他人”；“可以使用很久的物具”——反一次性消费；FSC 认证环保木材；支持独立手艺人。",
    accounts: "Instagram `@mumo.life`；可通过品牌名“木墨 MUMO”检索门店 / 电商渠道。",
    activities: ["“双手做工”市集——支持数百独立手艺人", "“识木计划”展览", "BrandStar 品牌专题报道"],
    memberTypes: ["共益企业"],
    practiceKeywords: ["实木家具", "手工", "市集", "可持续消费", "FSC 认证", "独立手艺人"],
    valueTags: ["低增长（15 年 19 家店）", "反一次性消费", "像做给自己一样做给他人", "可以使用很久的物具", "支持独立手艺人"],
    connectableResources: ["产品（实木家具）", "市集（双手做工）", "展览（识木计划）", "社群"],
    cooperationWays: ["案例报道", "线下活动", "访谈"],
    publicSources: ["Instagram `@mumo.life`", "公众号", "门店/展厅"]
  },
  rect_repair: {
    name: "阿久（Joanna Lyu）、天琦 / 修四边形 [[rect*]]repair",
    displayName: "阿久、天琦 / 修四边形",
    aliases: ["阿久", "Joanna Lyu", "天琦", "修四边形", "rect*repair"],
    location: "上海、成都等活动场景",
    basicInfo:
      "修四边形关注城市游戏、playful media、空间规则与参与式创作。阿久为前大厂游戏设计师，离开电子游戏后创办修四边形，在街头 / 美术馆 / 舞池做渗透现实的游戏，运营茶水间社群；天琦为理论框架构建者，提出“修”（repair）而非“造”（create）的核心理念。",
    values:
      "“修”（repair）而非“造”（create）——不在现实之外建造新世界，而是在现实中撬开裂缝；渗透现实的游戏；参与式创作。",
    accounts: "网站 / 项目页：修四边形 GitHub Pages；播客资料中也列有官网、Instagram、小红书等入口。",
    activities: [
      "Tea Room 月度聚会（茶水间社群）",
      "成都南瓜节大型城市游戏",
      "在街头 / 美术馆 / 舞池的渗透现实游戏",
      "播客《修四边形的真实游戏 case》受访"
    ],
    memberTypes: ["超级个体", "社区组织"],
    practiceKeywords: ["城市游戏", "参与式创作", "playful media", "空间规则", "社群（茶水间）"],
    valueTags: ["修复而非创造（repair, not create）", "渗透现实", "参与式", "在现实中撬开裂缝"],
    connectableResources: ["工作坊", "社群（Tea Room / 茶水间）", "城市游戏活动", "播客内容"],
    cooperationWays: ["共创工作坊", "访谈", "线下活动", "案例报道"],
    publicSources: ["GitHub Pages（修四边形）", "Instagram", "小红书", "播客平台"]
  },
  ge_yulu: {
    name: "葛宇路",
    location: "北京 / 成都（第二据点）",
    basicInfo:
      "1990 年生于湖北，中央美院实验艺术硕士。以“直接行动”介入公共空间：用自己的名字命名北京无名路、骑发电车给展览供电、盯摄像头连接背后的人。长期以城市公共空间、制度边界与日常行动作为创作材料。",
    values: "直接行动介入公共空间；挑战制度边界；以日常行动作为创作材料；“在现实中撬开裂缝”。",
    accounts: "Instagram `@geyulu1128`；艺术机构页面可检索“葛宇路 / Ge Yulu”。",
    activities: ["用自己的名字命名北京无名路（“葛宇路”路牌事件）", "骑发电车给展览供电", "盯摄像头连接背后的人", "True Art 等艺术媒体报道"],
    memberTypes: ["艺术实践者"],
    practiceKeywords: ["公共空间", "直接行动", "制度边界", "城市", "日常行动", "行为艺术"],
    valueTags: ["直接行动", "挑战制度边界", "日常作为创作材料", "在现实中撬开裂缝"],
    connectableResources: ["展览", "讲座/对谈"],
    cooperationWays: ["访谈", "案例报道", "线下活动"],
    publicSources: ["Instagram `@geyulu1128`", "艺术机构页面", "艺术媒体报道"]
  },
  ergao_ben: {
    name: "二高（何其沃）& Ben / 二高表演 EDPG",
    displayName: "二高 & Ben / 二高表演",
    location: "广州、顺德",
    basicInfo:
      "二高本名何其沃，1985 年生于广东阳江，2007 年在广州创立“二高表演”。以“土俗”“山寨”“南方舞”为美学策略，2023 年关闭实体空间后转为“游牧”集体，运营南方舞厅社区舞蹈。Ben 的个人信息在公开检索中不够稳定，建议后续补充核对。",
    values:
      "“土俗”“山寨”“南方舞”——以边缘美学对抗主流叙事；游牧集体——不依赖实体空间；社区舞蹈——让舞蹈回归日常。",
    accounts: "B站：二高表演 EDPG；Facebook：二高表演 Ergao Dance Production Group；Instagram 线索：`@ergaodance`；Ben 相关账号需核。",
    activities: ["2023 年关闭实体空间，转型为“游牧”集体", "运营南方舞厅社区舞蹈", "Future Dictionary 艺术家档案收录"],
    memberTypes: ["艺术实践者", "社区组织"],
    practiceKeywords: ["舞蹈", "南方舞", "游牧", "社区舞蹈", "土俗美学", "表演"],
    valueTags: ["土俗/山寨（边缘美学对抗主流叙事）", "游牧集体（不依赖实体空间）", "社区舞蹈（让舞蹈回归日常）"],
    connectableResources: ["工作坊", "表演", "社群（南方舞厅）", "课程"],
    cooperationWays: ["共创工作坊", "访谈", "线下活动", "案例报道"],
    publicSources: ["B站（二高表演 EDPG）", "Facebook（Ergao Dance Production Group）", "Instagram `@ergaodance`", "艺术机构档案"]
  },
  zhao_yiren: {
    name: "赵伊人 / 定海桥互助社",
    location: "上海杨浦定海桥",
    basicInfo:
      "教育者、艺术行动者，长期参与定海桥互助社，关注社区自治、自我教育、艺术行动与在地关系。自 2015 年前后开始深入参与定海桥现场，后续参与互助社的共同治理。与殷艾雯、赵蒙旸共创“浮萍定海”大型 LARP 游戏。",
    values: "社区自治；自我教育；艺术行动；在地关系；让隐形的照护劳动变得可见和被衡量。",
    accounts: "项目网站：定海桥互助社；机构档案与时代美术馆人物页可检索“赵伊人”。",
    activities: [
      "与殷艾雯、赵蒙旸共创“浮萍定海”大型 LARP 游戏——用游戏机制让隐形的照护劳动变得可见和被衡量",
      "参与“流体愈学”项目",
      "上海当代艺术博物馆 / 上海双年展项目参与"
    ],
    memberTypes: ["社区组织", "艺术实践者"],
    practiceKeywords: ["社区自治", "自我教育", "艺术行动", "照护", "在地关系", "LARP 游戏"],
    valueTags: ["社区自治", "在地关系", "互助", "照护劳动可见化", "让隐形的照护劳动变得可见和被衡量"],
    connectableResources: ["场地（定海桥互助社）", "工作坊", "社群", "展览", "游戏（浮萍定海 LARP）"],
    cooperationWays: ["共创工作坊", "访谈", "案例报道", "线下活动", "知识库采集"],
    publicSources: ["项目网站（定海桥互助社）", "时代美术馆人物页", "上海双年展/PSA"]
  },
  xiaohei: {
    name: "小黑（全名待核） / 漫画与手工艺",
    displayName: "小黑 / 漫画与手工艺",
    location: "广州长洲岛",
    basicInfo:
      "在长洲岛天台做手工版画 T 恤，以“怪兽世界”为主题，邀请村民当模特——不是为卖货，而是为对抗城市孤独。公开检索中“小黑”同名结果过多，全名待核。",
    values: "对抗城市孤独；邀请村民参与——将社区邻里变成创作的共同主体；手工版画——慢工艺抵抗快消费。",
    accounts: "需要补充：小红书、Instagram、B站、公众号或全名后再核。",
    activities: ["长洲岛天台手工版画 T 恤", "“怪兽世界”主题创作", "邀请村民当模特"],
    memberTypes: ["手工艺实践者"],
    practiceKeywords: ["手工版画", "T恤", "怪兽主题", "村民参与", "慢工艺"],
    valueTags: ["对抗城市孤独", "社区邻里作为创作共同主体", "慢工艺抵抗快消费"],
    connectableResources: ["工作坊", "产品（手工版画 T 恤）"],
    cooperationWays: ["访谈", "案例报道", "线下活动"],
    publicSources: ["待核（小红书/Instagram/B站/公众号待确认）"],
    verificationStatus: "全名待核"
  },
  zhu_jingming: {
    name: "朱璟茗",
    location: "南京",
    basicInfo:
      "写作者、艺术家，与抑郁症 / CPTSD 共处十余年，主持“重新做人”播客。曾运营“浦口工厂”出版计划，关注精神健康、女性经验与微观权力结构。也与徐艺函合作过“抹布神”等项目。",
    values: "精神健康去污名化；女性经验书写；关注微观权力结构；以个人叙事连接公共议题。",
    accounts: "Instagram `@aaa_jmzhu`；可检索“朱璟茗 浦口工厂 / Zhu Jingming”“重新做人 播客”。",
    activities: ["主持“重新做人”播客", "运营“浦口工厂”出版计划", "与徐艺函合作“抹布神”项目", "外滩美术馆项目参与"],
    memberTypes: ["超级个体"],
    practiceKeywords: ["播客", "出版", "精神健康", "女性经验", "微观权力", "书写"],
    valueTags: ["精神健康去污名化", "女性经验书写", "关注微观权力结构", "个人叙事连接公共议题"],
    connectableResources: ["播客（重新做人）", "出版（浦口工厂）", "工作坊"],
    cooperationWays: ["访谈", "知识库采集", "内容授权转载", "共创工作坊"],
    publicSources: ["Instagram `@aaa_jmzhu`", "播客平台（重新做人）", "外滩美术馆"],
    verificationStatus: "已核",
    dataSource: "B Community 信息抓取、公开检索、播客内容"
  },
  fang_chenchu: {
    name: "晨初（方晨初）/ 假杂志、boPOmofo",
    displayName: "晨初 / 假杂志、boPOmofo",
    location: "宁波",
    basicInfo:
      "假杂志公教负责人，艺术史专业背景、植物爱好者、美食研究者。“业余者的长期主义”——拒绝专业门槛把人和艺术隔开。也以 boPOmofo 内容策划 / 编辑身份出现，参与宁波艺术书、出版与空间活动。",
    values: "“业余者的长期主义”——拒绝专业门槛把人和艺术隔开；跨领域连接（植物、美食、艺术史）；在地出版与空间实践。",
    accounts: "Instagram `@jiazazhi`；可检索“假杂志 Jiazazhi”“boPOmofo 爬坡没风”。",
    activities: ["组织读书会、工作坊、城市行走", "开春书会", "以 boPOmofo 身份参与宁波艺术书、出版与空间活动", "Stasis Space 城市行走 + 游击园艺工作坊"],
    memberTypes: ["超级个体"],
    practiceKeywords: ["出版", "艺术书", "城市行走", "植物", "美食", "在地空间", "公教"],
    valueTags: ["业余者的长期主义（拒绝专业门槛）", "跨领域连接", "在地出版与空间实践"],
    connectableResources: ["工作坊", "出版（假杂志）", "社群（读书会）", "展览（开春书会）"],
    cooperationWays: ["访谈", "线下活动", "知识库采集", "共创工作坊"],
    publicSources: ["Instagram `@jiazazhi`", "假杂志/boPOmofo 相关平台"]
  },
  liao_zhili: {
    name: "廖智立 / Dweller、普罗托邦",
    location: "常驻地待核（与 706 社群 / 共居场景相关）",
    basicInfo:
      "公开资料可确认其与“普罗托邦”（protopia，渐进式进步而非乌托邦终点）相关的居住 / 共居实践，亦为 SSIR 中文版译者。“廖智立—Dweller—普罗托邦”的具体职位关系仍需二次核对。",
    values: "“普罗托邦”（protopia）——渐进式进步而非乌托邦终点；共居实践；知识传播（SSIR 翻译）。",
    accounts: "可检索“廖智立 706”“普罗托邦 共居报告”“Dweller 青年共居社区”。",
    activities: ["执行“2025 共居生活洞察报告”", "SSIR 中文版翻译", "GCC Commons 动态提及的共居实践"],
    memberTypes: ["超级个体"],
    practiceKeywords: ["共居", "protopia", "SSIR 翻译", "青年社区", "居住实践"],
    valueTags: ["普罗托邦（渐进式进步而非乌托邦终点）", "共居实践", "知识传播"],
    connectableResources: ["社群（共居网络）", "出版/翻译", "调研报告"],
    cooperationWays: ["访谈", "知识库采集", "内容授权转载"],
    publicSources: ["待核（706 社群/共居报告平台待确认）"],
    verificationStatus: "需二次确认"
  },
  xu_yihan: {
    name: "徐艺函 / 起风了社区",
    location: "南京；生于连云港",
    basicInfo:
      "1989 年生，陶瓷艺术家、写作者，“起风了社区陪伴项目”发起人。聚焦照护劳动与东亚家庭女性叙事，创办“抹布神”艺术节将家务劳动转化为公共艺术，与清洁工人深度合作创作。也发起“母亲的选择”等项目。",
    values:
      "照护劳动公共化——将家务劳动转化为公共艺术；东亚家庭女性叙事；与清洁工人深度合作——打破阶层壁垒的共同创作；“陪伴”而非“介入”的社区工作方式。",
    accounts: "Instagram `@melody_yihan`；可检索“徐艺函 起风了社区”“抹布神 艺术节”。",
    activities: ["创办“抹布神”艺术节——将家务劳动转化为公共艺术", "“起风了社区陪伴项目”", "发起“母亲的选择”项目", "与清洁工人深度合作创作"],
    memberTypes: ["艺术实践者", "社区组织"],
    practiceKeywords: ["陶瓷", "照护", "女性叙事", "家务劳动", "东亚家庭", "社区陪伴"],
    valueTags: ["照护公共化（家务劳动→公共艺术）", "女性叙事", "陪伴而非介入", "打破阶层壁垒的共同创作"],
    connectableResources: ["工作坊", "展览（抹布神艺术节）", "社群（起风了社区）", "课程"],
    cooperationWays: ["共创工作坊", "访谈", "案例报道", "线下活动"],
    publicSources: ["Instagram `@melody_yihan`", "起风了社区相关平台"],
    verificationStatus: "已核",
    dataSource: "B Community 信息抓取、公开检索"
  },
  xiuxiu: {
    name: "Ruifen、不子、格清 / 绣绣故事会",
    displayName: "Ruifen & 不子 / 绣绣故事会",
    location: "广州 / 顺德",
    basicInfo:
      "绣绣故事会由不子、格清、ruifen 共同发起，将刺绣、故事讲述与身体实践结合。以刺绣、编织、布料等为媒介，做艺术叙事、女性手工劳动与传统技艺的再讨论。隶属于二高表演的社群网络。",
    values: "刺绣与故事讲述结合——用手工劳动承载叙事；女性手工劳动的再讨论；传统技艺的当代转化；身体实践作为连接方式。",
    accounts: "绣绣故事会 Instagram `@xiuxiugushihui`；Ruifen 账号线索 `@ruifen_work`（待核）；不子账号线索 `@lingqiaobu`（待核，原资料指出社媒上未找到独立账号）。",
    activities: ["顺德左滩村榕树下“共绣——流动许愿池”工作坊（隶属于二高表演）", "刺绣 + 故事讲述 + 身体实践的融合工作坊"],
    memberTypes: ["手工艺实践者"],
    practiceKeywords: ["刺绣", "故事讲述", "身体实践", "女性手工", "传统技艺", "编织"],
    valueTags: ["手工劳动承载叙事", "女性手工劳动再讨论", "传统技艺当代转化", "身体实践"],
    connectableResources: ["工作坊", "社群（绣绣故事会）", "表演"],
    cooperationWays: ["共创工作坊", "线下活动", "访谈"],
    publicSources: ["Instagram `@xiuxiugushihui`", "Ruifen `@ruifen_work`（待核）", "不子 `@lingqiaobu`（待核）"],
    verificationStatus: "部分账号待核"
  },
  buzi: {
    name: "不子 / 绣绣故事会",
    location: "广州 / 顺德",
    basicInfo:
      "不子作为绣绣故事会共同发起人之一，与 Ruifen、格清一起将刺绣、故事讲述与身体实践结合。原资料中不子的独立条目信息与绣绣故事会合列信息重合，暂无额外可确认信息。",
    values: "刺绣与故事讲述结合——用手工劳动承载叙事；女性手工劳动的再讨论；传统技艺的当代转化；身体实践作为连接方式。",
    accounts: "不子账号线索 `@lingqiaobu`（待核，原资料指出社媒上未找到独立账号）。",
    activities: ["顺德左滩村榕树下“共绣——流动许愿池”工作坊（隶属于二高表演）", "刺绣 + 故事讲述 + 身体实践的融合工作坊"],
    memberTypes: ["手工艺实践者"],
    practiceKeywords: ["刺绣", "布料", "女性手工", "身体经验", "故事讲述"],
    valueTags: ["手工劳动承载叙事", "女性手工劳动再讨论", "传统技艺当代转化", "身体实践"],
    connectableResources: ["工作坊", "社群（绣绣故事会）", "表演"],
    cooperationWays: ["共创工作坊", "线下活动", "访谈"],
    publicSources: ["绣绣故事会公开资料", "不子 `@lingqiaobu`（待核）"],
    verificationStatus: "独立账号待核"
  },
  spring_changzhou: {
    name: "春潮 Spring / AttraX / 春潮工作室",
    displayName: "春潮 Spring / 长洲岛瑶寨",
    location: "深圳（骇客松场景）/ 广州长洲岛（贵人精灵场景）",
    basicInfo:
      "呈现两面——① AI + 硬件骇客松：清北学生社群，关键词“快乐、叛逆、自由”；② 贵人精灵：将广东传统“贵人”纸符转化为气候 / LGBTQ / 职场争吵等当代议题的社区艺术。注意关键词“春潮 Spring”“长洲岛瑶寨”容易与香港长洲、广东瑶寨旅游内容混淆。",
    values: "“快乐、叛逆、自由”——骇客精神与社群文化；将传统符号（“贵人”纸符）转化为当代议题——传统与当下的创造性对话。",
    accounts: "账号待核；需要补充项目全称或活动链接后再整理。",
    activities: ["AI + 硬件骇客松（清北学生社群）", "贵人精灵——将广东传统“贵人”纸符转化为当代议题的社区艺术（气候 / LGBTQ / 职场争吵等）"],
    memberTypes: ["超级个体"],
    practiceKeywords: ["AI 硬件", "骇客松", "传统符号转化", "社区艺术", "LGBTQ"],
    valueTags: ["快乐/叛逆/自由（骇客精神）", "传统与当下的创造性对话"],
    connectableResources: ["工作坊", "活动（骇客松）", "社群（清北学生社群）"],
    cooperationWays: ["访谈", "线下活动"],
    publicSources: ["待核（项目全称与社媒链接待确认）"],
    verificationStatus: "账号待核"
  },
  sailor_club: {
    name: "水手俱乐部 / 食物、材料、游戏",
    displayName: "水手俱乐部",
    location: "广州，尤其康乐村 / 吉一·青造社活动场景（待二次确认）",
    basicInfo:
      "一个围绕“玩”的创造者社区，以食物、材料和游戏为核心，通过工作坊、展览、播客等方式连接人和日常经验。与修四边形（阿久）在游戏、社群、公共空间三个维度上价值观共享。",
    values: "围绕“玩”的创造者社区；以食物、材料和游戏为核心——让日常经验成为创造入口；连接人和日常经验；与修四边形价值观共享（游戏 × 社群 × 公共空间）。",
    accounts: "账号待核；目前可从“水手俱乐部 食物 材料 游戏”“吉一青造社”相关报道追踪。",
    activities: ["工作坊（食物 / 材料 / 游戏方向）", "展览", "播客", "界面新闻专题报道"],
    memberTypes: ["社区组织"],
    practiceKeywords: ["食物", "材料", "游戏", "创造者社区", "工作坊", "日常经验"],
    valueTags: ["围绕“玩”的创造", "日常经验作为创造入口", "连接人与日常", "游戏×社群×公共空间"],
    connectableResources: ["工作坊", "展览", "播客", "社群"],
    cooperationWays: ["共创工作坊", "访谈", "线下活动", "案例报道"],
    publicSources: ["待核（吉一·青造社相关报道可追踪）"],
    verificationStatus: "地点待二次确认"
  }
};
