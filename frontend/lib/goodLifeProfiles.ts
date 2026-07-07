import type { MemberBasicInfo } from "@/lib/memberBasicInfo";

export type DimensionKey = "create" | "live" | "benefit";

export type ContentBlock =
  | { type: "paragraph"; paragraphs: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "bullet-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "tag-list"; items: string[] }
  | { type: "key-value"; items: Array<{ label: string; value: string }> }
  | { type: "case-cards"; items: Array<{ title: string; meta?: string[]; description: string }> }
  | { type: "method-list"; items: Array<{ index: string; title: string; description?: string }> }
  | { type: "timeline"; items: Array<{ time: string; title: string; description?: string }> }
  | { type: "preformatted"; text: string };

export type GoodLifeSection = {
  id: string;
  title: string;
  subtitle?: string | null;
  kind:
    | "narrative"
    | "quote"
    | "comparison"
    | "cases"
    | "principles"
    | "timeline"
    | "values"
    | "relation-levels"
    | "boundary"
    | "contribution";
  blocks: ContentBlock[];
};

export type DimensionData = {
  key: DimensionKey;
  title: string;
  subtitle: string;
  intro?: string;
  sections: GoodLifeSection[];
  strength: string;
};

export type MemberProfileData = {
  id: string;
  profile: {
    name: string;
    fullName?: string;
    group?: string;
    type?: string;
    identity?: string;
    location?: string;
    intro?: string;
    style?: string;
  };
  basicInfo?: MemberBasicInfo;
  triangleTitle?: string;
  triangleSubtitle?: string;
  centerText?: string;
  centerSubtitle?: string;
  dimensions?: DimensionData[];
  aiPersona?: {
    title: string;
    subtitle: string;
    initialMessage: string;
    inputPlaceholder: string;
  };
  knowledgeBase?: {
    documentPaths: string[];
    sourceLabels?: string[];
    lastUpdated?: string;
  };
};

export const goodLifeProfiles: Record<string, MemberProfileData> = {
  "arch": {
    "id": "arch",
    "profile": {
      "name": "Arch"
    },
    "triangleTitle": "Arch的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "可持续供应链的蜂鸟行动",
    "centerSubtitle": "从材料、供应链到商业选择的转向",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "砍掉一亿营收的激进转身",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的创造力起点不是\"提出一个好主意\"，而是主动毁掉一个赚钱的生意。"
                ]
              },
              {
                "type": "quote",
                "text": "2019年，砍掉超过一亿元的常规面料业务，全面转向可持续面料。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这在中国外贸制造业中几乎是不可想象的。一亿营收意味着稳定的现金流、确定的供应链、成熟的客户关系和可预期的利润。大多数企业在\"既有路径\"上会选择\"一边维持旧业务，一边尝试新方向\"。Arch 的选择是：全砍，不留退路。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "常规面料业务",
                    "value": "2019年，砍掉年营收超1亿元的成熟业务线"
                  },
                  {
                    "label": "渐进式转型",
                    "value": "不选择\"一边做旧的、一边尝试新的\"——全转"
                  },
                  {
                    "label": "成本优先逻辑",
                    "value": "不做\"最便宜的面料\"，做\"最可持续的面料\""
                  },
                  {
                    "label": "传统外贸模式",
                    "value": "从\"接单生产\"转向\"主动开发可持续面料解决方案\""
                  },
                  {
                    "label": "规模叙事的诱惑",
                    "value": "不追求做大营收，追求做深可持续"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "可持续纺织的创新",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的创造性在于把\"可持续\"从一个营销标签变成了一个技术研发方向："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "材料创新",
                    "value": "开发可回收、可降解的可持续面料"
                  },
                  {
                    "label": "工艺创新",
                    "value": "探索低水耗、低化学品使用的生产流程"
                  },
                  {
                    "label": "供应链创新",
                    "value": "建立可持续原材料的追溯和认证体系"
                  },
                  {
                    "label": "商业模式创新",
                    "value": "从\"生产商\"变成国际品牌的\"可持续解决方案合作伙伴\""
                  },
                  {
                    "label": "客户网络",
                    "value": "服务于 Gap、Tommy Hilfiger 等国际品牌——不是\"贴牌代工\"，而是\"共同开发\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "关键区别：普通面料工厂问\"客户要什么样的面料，我们能不能做？\"；Arch 问的是\"什么样的面料对地球更好，我们能不能让客户想要它？\"——前者是供应商思维，后者是价值创造者思维。"
                ]
              }
            ]
          },
          {
            "id": "ssir-bcorp",
            "title": "SSIR/乐平基金会 BCorp 案例",
            "subtitle": "蜂鸟叙事的创造",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的实践被 SSIR（斯坦福社会创新评论）和乐平基金会记录为 BCorp 案例，其标题本身就是一种创造性的叙事框架："
                ]
              },
              {
                "type": "quote",
                "text": "\"一个蜂鸟般的外贸公司，如何参与并推动可持续服装变革\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"蜂鸟般\"（hummingbird-like） 这个比喻的创造性："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "体型小",
                    "value": "不是巨型企业，是中小型外贸公司"
                  },
                  {
                    "label": "能量高",
                    "value": "全盘转型需要巨大的决心和执行能量"
                  },
                  {
                    "label": "动作精准",
                    "value": "砍掉一亿业务——不是乱砍，是有方向的断腕"
                  },
                  {
                    "label": "悬停能力",
                    "value": "在转型过程中保持运营稳定"
                  },
                  {
                    "label": "授粉功能",
                    "value": "通过服务大品牌，把可持续理念传播到整个供应链"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"蜂鸟\"叙事的创造性在于：它拒绝了\"只有大企业才能推动变革\"的叙事，提供了一个\"小而有力的行动者\"的原型。这个叙事的传播本身就是在重新定义\"谁能改变世界\"。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "代表实践",
            "subtitle": null,
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "2019年全面转型",
                    "meta": [
                      "战略决策"
                    ],
                    "description": "砍掉1亿+常规面料业务，不留退路的全量转型"
                  },
                  {
                    "title": "可持续面料研发",
                    "meta": [
                      "产品创新"
                    ],
                    "description": "不是买现成的可持续材料，而是自己研发"
                  },
                  {
                    "title": "国际品牌合作",
                    "meta": [
                      "商业模式创新"
                    ],
                    "description": "从\"代工\"升级为\"可持续解决方案合作伙伴\"——Gap、Tommy Hilfiger"
                  },
                  {
                    "title": "BCorp 认证与案例传播",
                    "meta": [
                      "叙事创新"
                    ],
                    "description": "把自己的实践变成一个可传播的、可复制的故事——\"蜂鸟般\"的外贸公司"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "设计方法论",
            "subtitle": null,
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从 Arch 的实践中，可以提取出几条创造原则："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "创造性破坏先于创造性建设",
                    "description": "在\"创造新的\"之前，先有勇气\"毁掉旧的\""
                  },
                  {
                    "index": "2",
                    "title": "全量转型而非并行过渡",
                    "description": "不在新旧模式之间骑墙——砍干净了才有决心做好新的"
                  },
                  {
                    "index": "3",
                    "title": "小但精准",
                    "description": "不做\"大而全\"的可持续发展，在自己能控制的领域做到极致"
                  },
                  {
                    "index": "4",
                    "title": "利用国际品牌的杠杆",
                    "description": "通过服务大品牌，用小的投入撬动大的供应链变革"
                  },
                  {
                    "index": "5",
                    "title": "把实践变成叙事",
                    "description": "不只做可持续面料，还要让自己的实践成为一个可以被其他人参照的案例"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "砍掉一亿业务的恐惧与决心",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的转型故事中最诚实的部分不是\"转型成功了\"，而是转型过程中的恐惧和决心："
                ]
              },
              {
                "type": "quote",
                "text": "2019年，砍掉年营收超1亿元的常规面料业务。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "对于一家2007年创立、已经运营12年的外贸公司来说，一亿营收不是\"试验项目\"——它是过去十多年全部积累的成果。砍掉它，意味着砍掉所有已知的客户关系、砍掉熟练的生产流程、砍掉可预期的现金流。这不是\"升级\"，是\"重置\"。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "承认旧路径不可持续",
                    "value": "不是\"常规面料也有市场\"，而是\"这对地球不好，所以我们不做\""
                  },
                  {
                    "label": "承认转型有代价",
                    "value": "不是\"无缝切换\"，而是接受营收断崖、客户流失、团队震荡"
                  },
                  {
                    "label": "承认自己可能失败",
                    "value": "全量转型意味着如果新业务做不起来，公司就是零"
                  },
                  {
                    "label": "不包装恐惧",
                    "value": "\"蜂鸟\"叙事承认了\"小\"——不是假装转型很容易，而是\"小也可以很勇敢\""
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "不做意见不一致的事",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的转型提供了一个\"身心安顿\"的典型案例——内在自洽不是\"找到最舒服的状态\"，而是\"消除认知失调\"。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "知道常规面料对环境有害，但继续生产",
                    "value": "砍掉常规面料——做的事和相信的事一致"
                  },
                  {
                    "label": "以\"可持续\"为部分产品的标签，但不改变核心业务",
                    "value": "全面转型——\"可持续\"是全部，不是点缀"
                  },
                  {
                    "label": "一边讲BCorp的故事、一边做非BCorp的生意",
                    "value": "全部业务都符合BCorp标准——故事和事实一致"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "关键洞察：内在自洽来自于\"不再需要为自己辩护\"。转型前的Arch如果要讲\"我们是可持续的\"，需要加很多限定词——\"我们的部分产品\"、\"我们在尝试\"、\"我们也做常规的但是……\"。转型后，这句话变成了\"We are sustainable.\"——句号。这是\"身心安顿\"的具体含义：不再需要为自己做的事找补。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "蜂鸟般的敏捷作为生存策略",
            "kind": "timeline",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"蜂鸟般\"的敏捷不仅仅是创造力的比喻，也是韧性策略："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "规模焦虑",
                    "value": "小不是劣势——蜂鸟不需要成为老鹰。精准比庞大更重要"
                  },
                  {
                    "label": "转型冲击",
                    "value": "砍掉一亿——不是\"扛过去\"，而是\"转过去\"。敏捷让转向更快完成"
                  },
                  {
                    "label": "市场竞争",
                    "value": "不做\"最便宜的\"，做\"最可持续的\"——拒绝卷入低价内卷"
                  },
                  {
                    "label": "不确定性的承受",
                    "value": "蜂鸟悬停——在一个不确定的位置停留、观察、调整"
                  },
                  {
                    "label": "组织韧性",
                    "value": "中小规模意味着决策链条短、转向成本低、信念传导快"
                  }
                ]
              },
              {
                "type": "timeline",
                "items": [
                  {
                    "time": "2007",
                    "title": "创立于上海"
                  },
                  {
                    "time": "2019",
                    "title": "★ 关键抉择：砍掉1亿+常规面料业务"
                  },
                  {
                    "time": "2020",
                    "title": "转型阵痛期 —— 客户流失、现金流压力、团队重构"
                  },
                  {
                    "time": "2022",
                    "title": "可持续面料业务逐步成熟"
                  },
                  {
                    "time": "2024",
                    "title": "成为 SSIR/乐平基金会 BCorp 案例"
                  },
                  {
                    "time": "2026",
                    "title": "\"一个蜂鸟般的外贸公司\" —— 叙事成型"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "\"蜂鸟\"作为自我认知",
            "subtitle": "不自欺的定位",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 最诚实的部分，是它对自己的定位——\"蜂鸟\"。不是\"行业领导者\"，不是\"可持续革命的先锋\"，不是\"改变世界的英雄\"。是\"蜂鸟\"——小的、敏捷的、做自己分内之事的。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种自我认知本身就是\"身心安顿\"："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不把自己包装成\"行业颠覆者\"",
                    "value": "承认自己是一家中小型外贸公司"
                  },
                  {
                    "label": "不夸大自己的影响力",
                    "value": "但也不低估自己——\"蜂鸟也可以授粉\""
                  },
                  {
                    "label": "不承诺\"改变整个行业\"",
                    "value": "但做了自己能做的事——砍掉自己的污染业务"
                  },
                  {
                    "label": "不自恋",
                    "value": "也不自卑——被写进BCorp案例，但叙事保持\"小\"的调性"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "小即自洽",
            "subtitle": "不追求\"变大\"的自由",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "中国人做企业有一个强大的文化惯性：必须做大。Arch 选择了拒绝这个惯性。\"蜂鸟般\"的定位意味着：接受自己\"小\"，并且不把\"小\"视为一个需要被修正的缺陷。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "\"做大才能影响行业\"",
                    "value": "\"小而精准也可以影响行业——通过服务大品牌\""
                  },
                  {
                    "label": "\"做大才能降低成本\"",
                    "value": "\"不做成本竞争——做价值竞争（可持续面料）\""
                  },
                  {
                    "label": "\"做大才有安全感\"",
                    "value": "\"内在自洽的安全感不来自规模，来自方向正确\""
                  },
                  {
                    "label": "\"做大才不辜负投资人\"",
                    "value": "\"没有投资人——做对的事情不需要向任何人解释\""
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "推动可持续服装供应链变革",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的公共性不是通过\"公益活动\"实现的，而是通过自己的核心业务——供应链实现的："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "作用方式",
                    "value": "通过为国际品牌提供可持续面料，让可持续选项进入主流服装市场"
                  },
                  {
                    "label": "影响范围",
                    "value": "Gap、Tommy Hilfiger 等国际品牌的供应链"
                  },
                  {
                    "label": "杠杆效应",
                    "value": "一家中小企业的研发创新 → 大品牌的采购决策 → 数百万件服装的面料选择 → 全球供应链标准"
                  },
                  {
                    "label": "公共性机制",
                    "value": "不是直接面向公众做教育，而是改变\"公众买到的衣服是用什么做的\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这是一种\"沉默的公共性\"——消费者可能不知道\"这件T恤用的是Arch研发的可持续面料\"，但这没关系。公共性的体现不在于\"被看到\"，而在于改变了事实：这件T恤比去年的那件少消耗了X升水、少排放了Y克碳。"
                ]
              }
            ]
          },
          {
            "id": "bcorp",
            "title": "BCorp 案例的公共传播",
            "subtitle": "让\"蜂鸟\"可以被复制",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 被 SSIR 和乐平基金会记录为 BCorp 案例，这个案例本身就是一个公共产品："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "案例标题",
                    "value": "\"一个蜂鸟般的外贸公司，如何参与并推动可持续服装变革\""
                  },
                  {
                    "label": "公共性",
                    "value": "把自己的经验变成一个可被参照、可被讨论、可被复制的故事"
                  },
                  {
                    "label": "目标受众",
                    "value": "其他中小型外贸企业——\"你看，一家蜂鸟般的公司也可以做到\""
                  },
                  {
                    "label": "传播效果",
                    "value": "降低了\"可持续转型\"的心理门槛——不需要成为巨头才能开始"
                  },
                  {
                    "label": "案例功能",
                    "value": "不是\"榜样\"式的道德教育，而是\"路径\"式的实操参照"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "案例传播的公共性逻辑：如果把\"实践\"变成\"知识\"，把\"经验\"变成\"故事\"，把\"私有的\"变成\"公共的\"——一个人的探索就可以成为其他人的起点。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "公共性实践的三个层次",
            "subtitle": null,
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的实践在不同尺度上产生了公共效应："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "产品层 —— 面料本身：── 每一米可持续面料替代常规面料，减少了对应的水和化学品消耗"
                  },
                  {
                    "label": "层次 2",
                    "value": "供应链层 —— 服务国际品牌的决策：── 当 Gap 和 Tommy Hilfiger 选择 Arch 的可持续面料时"
                  },
                  {
                    "label": "层次 3",
                    "value": "叙事层 —— BCorp 案例的传播：── \"一个蜂鸟般的外贸公司\"这个叙事进入公共领域后"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 的选择同样体现在它不做的事情上："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不继续做常规面料",
                    "value": "即使一亿营收很诱人——利润不能以地球为代价"
                  },
                  {
                    "label": "不做\"漂绿\"标签",
                    "value": "不在常规面料上加一个\"环保\"标签——要么全转，要么别谈可持续"
                  },
                  {
                    "label": "不追求规模扩张来增加影响力",
                    "value": "用自己的核心业务（面料研发）而非规模来做公共性"
                  },
                  {
                    "label": "不做与业务无关的公益活动",
                    "value": "公共性的实现路径是供应链创新和案例传播，不是捐款"
                  },
                  {
                    "label": "不把BCorp案例当成营销工具",
                    "value": "案例是公共知识，不是品牌广告"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "独有贡献",
            "subtitle": "将\"小\"确立为公共行动的有效尺度",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的案例中，Arch 贡献了一种独特的公共性方法论："
                ]
              },
              {
                "type": "quote",
                "text": "\"蜂鸟般\"的小企业，通过精准的自我转型和供应链嵌入，可以撬动远超自身规模的公共效应。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"星星之火可以燎原\"的浪漫修辞，而是一个可操作的模式：(a) 在自己能控制的领域做彻底的变革（砍掉污染业务），(b) 把变革的成果嵌入大品牌的供应链（通过国际品牌合作放大影响），(c) 把自己的实践变成可传播的公共知识（BCorp案例）。这三个步骤形成了一个完整的公共性机制——不依赖规模、不依赖捐款、不依赖道德说教。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "Arch 证明了一件事：公共性不一定需要\"大\"。一个蜂鸟般的公司，也可以参与改变全球服装行业的面貌。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 Arch 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于Arch公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 Arch 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/arch.md"
      ],
      "sourceLabels": [
        "arch.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "ergao_ben": {
    "id": "ergao_ben",
    "profile": {
      "name": "二高 & Ben / 二高表演"
    },
    "triangleTitle": "二高 & Ben / 二高表演的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "南方身体与游牧现场",
    "centerSubtitle": "以舞蹈、土俗和社区重新组织表演",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "从\"中心\"出走，创立\"南方舞\"",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高的创造力起点是地理与美学层面的双重拒绝。他从香港演艺学院毕业后，没有像大多数舞者那样进入北京或上海的当代舞蹈中心叙事，而是回到广州，在艺术体制的边缘地带开始创作："
                ]
              },
              {
                "type": "quote",
                "text": "拒绝的不是舞蹈本身，而是\"谁有资格定义舞蹈\"的权力结构。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "他选择在广州的 grassroots 层面工作，主动远离中心化的资源分配体系和主流审美话语。这种拒绝不是逃避，而是为另一种舞蹈叙事争取生存空间。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "北京/上海舞蹈中心叙事",
                    "value": "不在体制内谋求地位，不进入主流舞蹈圈的晋升体系"
                  },
                  {
                    "label": "西方现代舞正统",
                    "value": "不以西方现代舞技法作为唯一标准"
                  },
                  {
                    "label": "精英化的舞蹈话语",
                    "value": "不追求\"高雅\"\"纯粹\"\"专业\"的审美标签"
                  },
                  {
                    "label": "固定空间依赖",
                    "value": "2023年关闭广州实体空间，转向游牧模式"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "\"土俗、山寨、南方舞\"的美学策略",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "核心创造：二高提出\"土俗、山寨、南方舞\"三个关键词，并将其作为一套完整的创作方法论。"
                ]
              },
              {
                "type": "quote",
                "text": "\"土俗、山寨、南方舞\"是一套在中国南方生成的酷儿行动策略。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是对\"低端\"的猎奇式消费，而是在全球当代舞蹈的话语体系中，以南方的本地经验为基点，创造一种反霸权的美学语言："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "土俗",
                    "meta": [
                      "接地气的、乡土的身体语言，不追求\"国际化\"的优雅与抽象"
                    ],
                    "description": "从阳江民间文化、广东日常生活动作中提取身体素材"
                  },
                  {
                    "title": "山寨",
                    "meta": [
                      "以低成本、模仿、挪用为策略，质疑原版/赝品的等级秩序"
                    ],
                    "description": "故意使用低技术手段、二手材料、\"不专业\"的呈现方式"
                  },
                  {
                    "title": "南方舞",
                    "meta": [
                      "以珠三角为锚点的身体实践，区别于北方/西方中心主义"
                    ],
                    "description": "广州、顺德、香港——南方身体的迁徙路线与情感地理"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "理论意义：\"山寨\"在这里被重新编码为一种批判性策略——不是无力做到\"正版\"的无奈，而是主动以\"山寨\"瓦解原创/复制的二元等级。这与阿久用 pervasive game 颠覆\"电子游戏=游戏\"的单一路径异曲同工。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "把新的身体叙事带进现实",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "《来来舞厅》",
                    "meta": [
                      "舞蹈剧场",
                      "—"
                    ],
                    "description": "以 Disco 文化和性别身份为入口，探讨改革开放后中国身体观念的变迁。舞厅作为边缘群体自我表达的公共空间"
                  },
                  {
                    "title": "《恭喜发财》",
                    "meta": [
                      "舞蹈剧场",
                      "—"
                    ],
                    "description": "以乡愁和家庭为主题，将个人与父亲的情感张力转化为身体叙事"
                  },
                  {
                    "title": "《蝴蝶岛》",
                    "meta": [
                      "沉浸式剧场",
                      "—"
                    ],
                    "description": "180分钟的沉浸体验，打破观众与表演者的固定关系，重新定义\"看舞蹈\"的方式"
                  },
                  {
                    "title": "《躲猫猫》",
                    "meta": [
                      "共创项目",
                      "—"
                    ],
                    "description": "与视障社群深度协作一年后创作，视障者不是被\"帮助\"的对象，而是共同创造者"
                  },
                  {
                    "title": "《步步高》",
                    "meta": [
                      "舞蹈剧场",
                      "—"
                    ],
                    "description": "以广州的非洲蜡染布料（African wax print fabric）为新媒介，探索全球化语境下南方身体的文化混杂"
                  },
                  {
                    "title": "合成现场",
                    "meta": [
                      "跨媒介概念",
                      "—"
                    ],
                    "description": "超越既定表演分类，融展览、表演、行为、口述、影像于一体——对\"舞蹈应该是什么\"的彻底重新定义"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "方法论的持续演化",
            "subtitle": "从身体到媒介",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高的创造力不是静止的，而是在十八年间（2007-2026）持续演化的："
                ]
              },
              {
                "type": "preformatted",
                "text": "第一阶段（2007-2015）\n└── 以身体为核心：舞蹈剧场作品，探索个人身份、家庭、性别\n\n第二阶段（2015-2022）\n└── 跨媒介扩展：合成现场概念形成，融入口述、影像、展览\n\n第三阶段（2022-2023）\n└── 田野转向：抖音田野考察——观看普通中国人如何在抖音上跳舞\n    \"K-pop 的动作是四处借鉴的——如果去掉标签，所有身体的律动都是相通的\"\n\n第四阶段（2023-至今）\n└── 游牧与新材料：关闭实体空间→游牧集体\n    布料（非洲蜡染）、刺绣（绣绣故事会）作为新的身体媒介"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "抖音田野考察的意义：2022年，二高进行了系统的\"抖音田野考察\"——不是批判或俯视，而是认真地观看普通中国人如何在短视频平台上使用自己的身体。他发现 K-pop 舞蹈动作其实是\"四处借鉴\"的，如果去掉文化标签，所有身体的律动本质上相互连接。这是一种人类学式的创造力——在看似最表面的大众文化中发现身体政治的深层线索。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "\"二高\"与\"合成现场\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"二高\"这个名字，来自他在班上身高排第二——拥抱普通，拒绝光环。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"二高\"的昵称本身就是一种姿态：不给自己取一个\"艺术化\"的名字，而是用一个中学班级里的身高排名作为身份标识。这种自嘲和普通感贯穿他所有的创作——不追求大师光环，而是保持一种\"我就是普通人\"的身体感。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"合成现场\"（Synthetic Site）这个概念的提出，是对既有表演分类的超越：它不是一个舞剧、不是一场展览、不是一次行为艺术、不是一部纪录片——它是所有这些的\"合成\"。这个命名本身就是创造：当一个现象无法被既有词汇描述时，你需要发明一个新词。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "与父亲的\"误会\"与和解",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高的故事核心有一条深沉的情感线索——他与父亲的关系："
                ]
              },
              {
                "type": "quote",
                "text": "父亲从未看过他的演出。这导致了\"一定的误会\"。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "作为一个在广东阳江传统家庭中长大的男孩，选择以舞蹈为生、以酷儿身体为表达主体，注定要与父辈的期待产生张力。父亲的不看，既是一种缺席，也是一种沉默的\"不同意\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "然而，这种\"误会\"并没有演变成决裂。父亲曾对他说："
                ]
              },
              {
                "type": "quote",
                "text": "\"我们都在做一些别人不理解的事情。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话成为二高的力量来源。父亲虽然没有看他的演出，但父亲理解\"不被理解\"——这是一种跨越代际的、以沉默传递的共情。二高的\"身心安顿\"不是建立在冲突的解决上，而是建立在学会与\"不被理解\"共存的能力上。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "游牧作为一种主动选择",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "2023年，二高表演关闭了广州的实体空间。这不是经营的失败，而是一种有意识的转变："
                ]
              },
              {
                "type": "quote",
                "text": "\"风吹鸡蛋壳，财散人安乐。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "他用一句广东俗语来描述这个决定——钱财散去，人反而轻松了。这表明关闭空间不是被动的\"做不下去了\"，而是主动选择不被空间绑架。"
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "空间形态",
                    "meta": [
                      "广州固定空间"
                    ],
                    "description": "游牧：广州、顺德、香港、伦敦"
                  },
                  {
                    "title": "创作模式",
                    "meta": [
                      "场地依赖"
                    ],
                    "description": "灵活嵌入不同社区和语境"
                  },
                  {
                    "title": "经济压力",
                    "meta": [
                      "固定租金+运营成本"
                    ],
                    "description": "项目制、轻量运营"
                  },
                  {
                    "title": "心理状态",
                    "meta": [
                      "\"做了一个决定，安定下来\""
                    ],
                    "description": "\"游牧的自由\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"到了大城市，记得要讲文明\"——这是二高表演2007-2023回顾展的自嘲式标题。它既是对自己的调侃（来自小城市的人到大城市要\"装文明\"），也是对城市化叙事的微妙批评（什么是\"文明\"？谁来定义？）。这种幽默感是内在自洽的重要标志：能够调侃自己的处境，说明已经不再被它困扰。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "十八年的有机生长",
            "kind": "timeline",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从2007年在广州创立至今，二高表演已经持续运作了18年："
                ]
              },
              {
                "type": "timeline",
                "items": [
                  {
                    "time": "2007",
                    "title": "香港演艺学院毕业（全奖），在广州创立二高表演"
                  },
                  {
                    "time": "2007",
                    "title": "2015 ──┬── 从\"接活儿来做\"的小组织开始"
                  },
                  {
                    "time": "2015",
                    "title": "合成现场概念逐步成形"
                  },
                  {
                    "time": "2020",
                    "title": "2022 ──┼── 疫情期间的调整与反思"
                  },
                  {
                    "time": "2023",
                    "title": "关闭广州实体空间 ★ 重大转折"
                  },
                  {
                    "time": "2023",
                    "title": "2026 ──┼── 游牧模式"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "韧性的特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "不追求线性增长：不是\"从小做大\"，而是\"在变化中持续\"——2007年到2026年，从\"接活儿来做\"到国际认可，是缓慢的、有机的积累",
                  "适应变化的能力：疫情、关闭空间、国际迁徙——每一个转折都没有让组织消失，而是催生了新的形态",
                  "身份的多重性：舞者、编舞、社群组织者、田野考察者、游牧者——不把自己锁死在单一身份里"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "南方身体的迁移",
            "subtitle": "生活在地理与情感之间",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高的生活轨迹——广州、顺德、香港、伦敦——不是旅游，而是一种南方身体的迁移实践。他反复穿行于珠三角的地图中，把这些城市之间的情感距离、文化差异、身体记忆编织进创作。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种迁移本身就是\"身心安顿\"的方式：安顿不在于\"定下来\"，而在于\"知道自己在哪里、为什么在那里\"。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从二高的实践中可以提取出以下核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "边缘先于中心",
                    "meta": [
                      "█████"
                    ],
                    "description": "拒绝北京/上海中心叙事，坚持在广州 grassroots 层面工作"
                  },
                  {
                    "title": "普通先于精英",
                    "meta": [
                      "█████"
                    ],
                    "description": "\"二高\"昵称、抖音田野考察、南方舞厅的\"谁都可以来\""
                  },
                  {
                    "title": "诚实先于美化",
                    "meta": [
                      "████"
                    ],
                    "description": "承认与父亲的\"误会\"、自嘲式展览标题、关闭空间时的坦然"
                  },
                  {
                    "title": "持续先于规模",
                    "meta": [
                      "█████"
                    ],
                    "description": "18年不间断创作，不求\"做大做强\"，求\"持续在场\""
                  },
                  {
                    "title": "关系先于作品",
                    "meta": [
                      "████"
                    ],
                    "description": "一年时间与视障社群互动才开始创作；绣绣故事会的榕树头聚会"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "南方舞厅",
            "subtitle": "身体版\"茶水间\"——为所有人打开的空间",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "南方舞厅是二高表演最具公共性的实践：一个社区舞蹈项目，口号是\"谁都可以加入\"。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "社区舞蹈——不分年龄、性别、职业，谁都可以来跳"
                  },
                  {
                    "label": "精神",
                    "value": "不是\"我跳你看\"，而是\"我们一起跳\"——打破表演者与观众的分隔"
                  },
                  {
                    "label": "门槛",
                    "value": "零门槛——不需要舞蹈基础，身体就是入场券"
                  },
                  {
                    "label": "空间",
                    "value": "不一定在排练厅——可以在公园、社区中心、榕树下"
                  },
                  {
                    "label": "意义",
                    "value": "把舞蹈从精英艺术还原为普通人的身体快乐"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"南方舞厅\"不是表演项目，而是一个持续开放的公共空间。每一个人进入这个空间的人都同时是观看者和被观看者——舞蹈从专业化的\"作品\"回归到社会性的\"连接\"。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "与阿久的\"茶水间\"对照：阿久为游戏创作者建立分享半成品的空间，二高为所有人建立分享身体的空间。两者的共同逻辑是——降低门槛，让创造/表达成为普通人的权利，而非专业人士的特权。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "与视障社群共创",
            "subtitle": "《躲猫猫》的深度协作",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "《躲猫猫》是二高表演公共性实践的典范：不是\"为\"视障社群做项目，而是\"与\"视障社群共创。"
                ]
              },
              {
                "type": "quote",
                "text": "在与视障社群互动一年之后，才开始创作。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这个过程的关键在于时间的投入：不是一次性的\"采风\"或\"调研\"，而是长达一年的日常互动——在这个过程中，视障者不是被\"帮助\"的对象，不是被\"代言\"的弱势群体，而是平等的合作者。创作成为相互学习的载体：二高学习如何以非视觉的方式感知身体，视障者学习如何将自己的身体经验转化为表达。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "艺术家\"帮助\"弱势群体",
                    "value": "双方作为平等的合作者"
                  },
                  {
                    "label": "短期项目制",
                    "value": "一年以上的深度互动"
                  },
                  {
                    "label": "艺术家\"替\"弱势群体发声",
                    "value": "弱势群体直接参与创作过程"
                  },
                  {
                    "label": "产出导向（作品）",
                    "value": "过程导向（关系建立）"
                  }
                ]
              }
            ]
          },
          {
            "id": "ea",
            "title": "黄边EA店与绣绣故事会",
            "subtitle": "嵌入社区的身体实践",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高表演的公共性不仅仅存在于\"舞蹈圈\"，而是深入到具体的社区中："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "黄边EA店：在广州黄边村做的10天限时艺术空间——与村民一起在广场上跳舞。这不是\"把艺术带到乡村\"的姿态，而是与村民一起用身体重新定义公共空间。10天的时限本身就是一种\"不占有\"的承诺——不是来改造社区的，是来一起度过一段时间的。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会（EDPG 旗下的子项目）：将刺绣、讲故事和身体实践结合，在顺德的榕树下做免费工作坊。榕树是广东乡村传统的公共空间——选择榕树而非美术馆，是公共性最明确的空间声明。"
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "南方舞厅",
                    "meta": [
                      "不限定的社区空间",
                      "零门槛"
                    ],
                    "description": "任何人都可以跳舞"
                  },
                  {
                    "title": "黄边EA店",
                    "meta": [
                      "村中广场（10天限时）",
                      "村民自然参与"
                    ],
                    "description": "与社区一起而非为社区"
                  },
                  {
                    "title": "绣绣故事会",
                    "meta": [
                      "顺德榕树下",
                      "免费开放"
                    ],
                    "description": "传统公共空间+当代身体实践"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "\"社区/社群作为工作方法\"的方法论",
            "subtitle": null,
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高表演提出了一个关键的方法论转向："
                ]
              },
              {
                "type": "quote",
                "text": "不是\"building perspective\"（建造视角），而是\"dwelling perspective\"（栖居视角）。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "建造视角：从外部进入社区，带着蓝图和计划，改造、提升、输出——这是传统的社区艺术/社区营造的逻辑。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "栖居视角：进入社区、住在其中、与社区一起生活——创作不是从\"我想做什么\"开始，而是从\"我们在一起能做什么\"开始。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种视角转换是公共性的核心：不是把社区变成作品的素材，而是让社区成为创作的主体。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "社交媒体作为公共基础设施",
            "subtitle": null,
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高表演对社交媒体的使用不是追逐流量的营销逻辑，而是一种反算法的公共策略："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "文献库",
                    "meta": [
                      "将过往所有作品、田野笔记、访谈记录公开"
                    ],
                    "description": "不追求时效性，追求可查阅性"
                  },
                  {
                    "title": "社群入口",
                    "meta": [
                      "任何人都可以通过社交平台找到二高表演并加入"
                    ],
                    "description": "不设置付费墙或会员制"
                  },
                  {
                    "title": "活动召集工具",
                    "meta": [
                      "用社交媒体发布南方舞厅等活动的信息"
                    ],
                    "description": "不是为了涨粉，是为了让人来"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这是一种反流量逻辑的社交媒体使用：不是努力让内容被更多人看到，而是让需要的人可以找得到。社交媒体不是终点（不是\"成为网红\"），而是工具（是\"让人找到我们\"）。"
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "国际连接",
            "subtitle": "南方身体的全球网络",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高表演的国际连接是有方向性的——不是\"走向世界\"的单向输出，而是以南方为基点的双向交换："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "挪威",
                    "value": "驻留与交流"
                  },
                  {
                    "label": "意大利",
                    "value": "合作与演出"
                  },
                  {
                    "label": "瑞士",
                    "value": "艺术家交换"
                  },
                  {
                    "label": "日本",
                    "value": "亚洲语境下的舞蹈对话"
                  },
                  {
                    "label": "香港",
                    "value": "回归南方网络的枢纽——因为香港演艺学院是二高的起点"
                  },
                  {
                    "label": "伦敦",
                    "value": "游牧期间的驻留"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些连接不是为\"国际化\"而国际化，而是把南方身体实践放在全球语境中，让本地经验与世界对话——不是为了被\"世界认可\"，而是为了构建替代性的知识交换网络。"
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "二高的公共性同样有自己的边界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做精英化的舞蹈作品",
                    "value": "舞蹈是每一个人的身体权利，不是少数人的技艺"
                  },
                  {
                    "label": "不做一次性的\"公益\"项目",
                    "value": "与视障社群互动一年才开始创作——拒绝表演性的关怀"
                  },
                  {
                    "label": "不做永久性的空间占有",
                    "value": "黄边EA店只有10天——社区不是领土"
                  },
                  {
                    "label": "不做以\"帮助\"为名的俯视",
                    "value": "与视障者是合作不是帮助"
                  },
                  {
                    "label": "不追求社交媒体的流量增长",
                    "value": "社交媒体是工具，不是目的"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-8",
            "title": "独有贡献",
            "subtitle": "将身体确立为公共性的媒介",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，二高表演贡献了一种独特的公共性路径："
                ]
              },
              {
                "type": "quote",
                "text": "Body as commons（身体作为公共资源）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是通过话语、文字、政策来介入公共，而是通过身体本身。南方舞厅里，身体不是表达\"我\"的工具，而是连接\"我们\"的媒介。每个人带着自己的身体来，在共同的节奏中感受到彼此的存在——这种连接不需要解释，不需要翻译，它发生在语言之前。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "舞蹈在二高这里不是艺术门类，而是一种社会关系的生产方式。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 二高 & Ben / 二高表演 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于二高 & Ben / 二高表演公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 二高 & Ben / 二高表演 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/ergao_ben.md"
      ],
      "sourceLabels": [
        "ergao_ben.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "fang_chenchu": {
    "id": "fang_chenchu",
    "profile": {
      "name": "晨初 / 假杂志、boPOmofo"
    },
    "triangleTitle": "晨初 / 假杂志、boPOmofo的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "业余者的长期主义",
    "centerSubtitle": "用出版、植物、美食和城市行走降低艺术门槛",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "核心创造路径",
            "subtitle": "从\"业余者的长期主义\"出发",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "晨初的创造力起点不是典型的\"艺术家作品生产\"，而是一种对专业壁垒的系统性拆除。\"业余者的长期主义\"——这个她用来描述自己实践方式的短语——包含了两个看似矛盾、实则统一的词："
                ]
              },
              {
                "type": "quote",
                "text": "\"业余者\"拒绝权威身份，\"长期主义\"拒绝速成逻辑。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "她的创造不是产出\"自己的作品\"，而是创造一个让艺术可以被普通人触摸、参与、停留的场域。这个场域就是假杂志的公共教育——一个独立摄影书出版机构，被她逐渐改造成了一个有温度、有触感的公共空间。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "身份重构",
                    "value": "不做\"艺术家\"，做\"公教负责人\"——让连接本身成为创造"
                  },
                  {
                    "label": "媒介拓展",
                    "value": "从摄影书出发，延伸到读书会、工作坊、城市行走、开春书会"
                  },
                  {
                    "label": "场域创造",
                    "value": "把一个出版品牌变成\"可以触摸、参与、停留\"的公共空间"
                  },
                  {
                    "label": "叙事抵抗",
                    "value": "不追求\"个人作品\"，而是让别人的创造在自己的场域中发生"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "让摄影书走出纸面",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "转折点：当假杂志从单纯的出版品牌转型为拥有实体图书馆和公共教育空间时，晨初找到了一种尚未被充分命名的创造形式——公共教育作为艺术实践。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "一般艺术机构的公教部门通常是\"配套\"——展览的附属品。但晨初将公教本身当作第一性的创造：不是\"先有展览，再做公教\"，而是公教本身就是假杂志的核心产出。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "她创造的形态："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "读书会",
                    "meta": [
                      "围绕摄影书的定期共读"
                    ],
                    "description": "不是单向讲解，是共创式阅读——每个人都在\"完成\"这本书"
                  },
                  {
                    "title": "工作坊",
                    "meta": [
                      "动手制作、体验式的学习"
                    ],
                    "description": "让摄影和艺术从\"观看对象\"变成\"身体经验\""
                  },
                  {
                    "title": "城市行走",
                    "meta": [
                      "在宁波的街巷中阅读城市"
                    ],
                    "description": "把整个城市变成一个可阅读的文本"
                  },
                  {
                    "title": "开春书会",
                    "meta": [
                      "年度的摄影书市集+讲座+工作坊+城市行走"
                    ],
                    "description": "不只是书展，是一个社区围绕摄影书的年度狂欢"
                  },
                  {
                    "title": "游击园艺",
                    "meta": [
                      "在城市的缝隙中种植物"
                    ],
                    "description": "将艺术实践延伸到最日常的城市干预当中"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表活动",
            "subtitle": "开春书会——一年一度的\"艺术公地\"",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "开春书会是晨初创造力的集大成体现。它不是一个标准化的书展（几排桌子、卖书、走人），而是一个多层次的社区事件："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "摄影书市集",
                    "meta": [
                      "独立出版机构和个人展示、交换、售卖"
                    ],
                    "description": "经济层面：让独立出版可见、可变现"
                  },
                  {
                    "title": "讲座/对谈",
                    "meta": [
                      "邀请摄影师、出版人分享"
                    ],
                    "description": "知识层面：打通\"专业-业余\"的信息差"
                  },
                  {
                    "title": "工作坊",
                    "meta": [
                      "动手制作摄影书、暗房体验"
                    ],
                    "description": "身体层面：让参与者亲手做，而不只是看"
                  },
                  {
                    "title": "城市行走",
                    "meta": [
                      "在宁波的街道中行走、观察、讨论"
                    ],
                    "description": "空间层面：重新感知自己生活的城市"
                  },
                  {
                    "title": "游击园艺",
                    "meta": [
                      "在城市角落种植、照料植物"
                    ],
                    "description": "日常层面：艺术就是日常生活中的一件小事"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "将所有这些封装在一个年度事件中——这就是晨初的\"作品\"。她自己不站在聚光灯下，但她搭建的舞台让无数人的创造得以发生。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "多条线索的编织者",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "晨初的创造力不只是在一个机构内，她同时在多重身份中穿梭："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "假杂志公教负责人",
                    "value": "规划和组织公共教育项目——读书会、工作坊、书会、行走"
                  },
                  {
                    "label": "boPOmofo 内容策展/编辑",
                    "value": "独立出版和空间实践的内容策划"
                  },
                  {
                    "label": "食物研究者",
                    "value": "将对食物的研究融入文化和艺术活动中"
                  },
                  {
                    "label": "植物爱好者",
                    "value": "\"我很喜欢去观察，去触摸那些树、叶和花，触感会让我觉得，生命又重新在我身体里流动的感觉\"——这种身体性的感知力渗透进她所有的公教设计中"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些线索不是彼此独立的\"副业\"，而是在她身上自然编织在一起——一场城市行走可能同时包含摄影、植物观察、食物体验。这就是\"业余者的长期主义\"的优势：不被专业边界分割，所以能将不同领域缝合起来。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "创造的方法论",
            "subtitle": "低姿态、高触感",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从晨初的实践中，可以提取出她的创造方法论："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "业余者即优势",
                    "description": "不被专业话语绑架，所以可以说人话、做人事"
                  },
                  {
                    "index": "2",
                    "title": "触感先于概念",
                    "description": "\"触摸树、叶和花\"——身体感受是认知的基础，不是先有理论再去验证"
                  },
                  {
                    "index": "3",
                    "title": "场域先于内容",
                    "description": "先搭好一个让人可以停留的空间，内容自然会长出来"
                  },
                  {
                    "index": "4",
                    "title": "连接先于表达",
                    "description": "不是\"我要表达什么\"，而是\"人和人之间因为什么能连起来\""
                  },
                  {
                    "index": "5",
                    "title": "日常即道场",
                    "description": "游击园艺、城市行走——在最日常的实践中埋下艺术的种子"
                  },
                  {
                    "index": "6",
                    "title": "低姿态的持续",
                    "description": "不做大声量的\"品牌活动\"，而是让事情持续地、安静地发生"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "在\"颠沛流离\"中守住自己",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "假杂志经历过多次搬迁——\"颠沛流离\"不只是比喻，而是真实的机构生存状态。作为一个独立出版机构的成员，晨初面对的是一个持续不稳定的现实：租金压力、政策变动、公众认知有限。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在这种处境中，\"业余者的长期主义\"就显示出其内在力量——正因为不把这件事当成\"职业\"，所以不会因为\"职业受挫\"而放弃。业余者的身份成了一种保护：不管外部怎么变，她和艺术之间的关系不是由机构定义的，而是由她自己持续的投入定义的。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "在创始人身后找到自己的位置",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "假杂志有一位辨识度很高的创始人言由——他是假杂志的公共面孔。晨初的角色是在幕后，做公共教育、运营社群、组织活动。这种\"不站在聚光灯下\"的位置，需要一种特定的内在自洽："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "身份定位",
                    "value": "接受自己不是\"机构门面\"，而是\"连接者\""
                  },
                  {
                    "label": "满足感来源",
                    "value": "不是来自公众认可，而是来自看到参与者在活动中获得共鸣"
                  },
                  {
                    "label": "与创始人的关系",
                    "value": "不是竞争，而是互补——言由建品牌，晨初建社区"
                  },
                  {
                    "label": "创造力路径",
                    "value": "不在美术馆做个展，而是在假杂志的空间中做让普通人可以参与的事"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"将摄影书和艺术从'墙上'拉到'生活中'的那个人\"——这是晨初对自己的角色定位。这个定位本身就是自洽的：她不需要成为\"墙上\"的那个人，她的工作是把\"墙上\"的东西拉下来，让人们可以触摸。"
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "植物般的生长节奏",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "晨初的自我描述中反复出现植物意象："
                ]
              },
              {
                "type": "quote",
                "text": "\"我很喜欢去观察，去触摸那些树、叶和花，触感会让我觉得，生命又重新在我身体里流动的感觉。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是一个随意的比喻。植物的时间是不同于人类社会加速时间的另一种节奏——缓慢、沉默、但持续。晨初在假杂志的工作也是如此：不是爆发式的项目推进，而是一个读书会接一个读书会、一次城市行走接一次城市行走的日积月累。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "韧性不是\"顽强抵抗\"，而是植物式的\"在条件允许的地方生长\"。假杂志从宁波出发，经历多次搬迁，但每次都重新扎根、重新开始公共活动。这种韧性不在于对抗，而在于适应后依然保持核心使命。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "感官锚点",
            "subtitle": "通过身体回到自己",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "晨初有一个非常具体的自我修复机制——触摸植物。当她感到生命力停滞时，她会去触摸树、叶和花，让触感唤醒身体中的流动感。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这个细节之所以重要，是因为它揭示了一种非语言的、身体性的自我关照。不是通过消费、娱乐或社交来\"减压\"，而是通过与自然的身体接触来重置感知。这种身体实践也与她的公教理念一致——她相信艺术需要被\"触摸\"、被身体体验，而不仅仅是被观看和思考。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "业余者尊严",
                    "meta": [
                      "████"
                    ],
                    "description": "\"业余者的长期主义\"——拒绝让专业壁垒隔开人与艺术"
                  },
                  {
                    "title": "日常神圣",
                    "meta": [
                      "████"
                    ],
                    "description": "从触摸植物到游击园艺，在日常中找到意义"
                  },
                  {
                    "title": "连接先于表达",
                    "meta": [
                      "█████"
                    ],
                    "description": "让别人的创造发生，而非站在聚光灯下"
                  },
                  {
                    "title": "慢即是快",
                    "meta": [
                      "████"
                    ],
                    "description": "不追求规模，追求持续——植物般的生长节奏"
                  },
                  {
                    "title": "身体即认知",
                    "meta": [
                      "████"
                    ],
                    "description": "触感、行走、园艺——用身体而非概念来理解世界"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "公教即公共性",
            "subtitle": "假杂志的\"第三空间\"",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "晨初的公共教育实践，本质上是将假杂志从一个\"出版品牌\"变成一个\"公共空间\"。这不是简单的业务扩展，而是一次机构性质的转变："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "身份",
                    "meta": [
                      "独立出版品牌"
                    ],
                    "description": "出版品牌 + 图书馆 + 公共教育空间"
                  },
                  {
                    "title": "受众",
                    "meta": [
                      "摄影爱好者和收藏者"
                    ],
                    "description": "任何对摄影和艺术感兴趣的普通人"
                  },
                  {
                    "title": "与公众的关系",
                    "meta": [
                      "读者/消费者"
                    ],
                    "description": "参与者/共同创造者"
                  },
                  {
                    "title": "空间的含义",
                    "meta": [
                      "办公室+仓库"
                    ],
                    "description": "一个可以被\"触摸、参与、停留\"的地方"
                  },
                  {
                    "title": "知识流动",
                    "meta": [
                      "单向——出版→读者"
                    ],
                    "description": "多向——读书会中每个人都在参与"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "假杂志的图书馆是免费向公众开放的——这是一个重要的公共性姿态。在一个知识越来越被付费墙封闭的时代，一个可以自由翻阅摄影书的空间，本身就是一种公共性的声明。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "降低门槛",
            "subtitle": "每一种活动都是一个\"入口\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "晨初的公教项目有一个共同特征——极低的参与门槛："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "读书会",
                    "meta": [
                      "不需要艺术史背景"
                    ],
                    "description": "以感受和讨论为主，每个人都可以发言"
                  },
                  {
                    "title": "工作坊",
                    "meta": [
                      "不需要专业技巧"
                    ],
                    "description": "从动手体验出发，结果不重要"
                  },
                  {
                    "title": "城市行走",
                    "meta": [
                      "不需要任何知识准备"
                    ],
                    "description": "穿着舒服的鞋来走就行"
                  },
                  {
                    "title": "开春书会",
                    "meta": [
                      "免费或低票价"
                    ],
                    "description": "像一个社区节日，不是专业的博览会"
                  },
                  {
                    "title": "游击园艺",
                    "meta": [
                      "不需要园艺经验"
                    ],
                    "description": "在城市的角落一起动手种"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种\"低门槛\"不是降低质量，而是一种清晰的价值选择——不让专业壁垒成为人们接触艺术的障碍。晨初在做的，正是她所说的：不让\"专业\"隔开人与艺术。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "社区建设的三层结构",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "晨初通过假杂志的公教实践，在宁波建立了一个围绕摄影和艺术的创意社群："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "第一层",
                    "value": "核心社群：── 经常参加读书会的本地摄影爱好者、艺术从业者"
                  },
                  {
                    "label": "第二层",
                    "value": "事件性社群：── 开春书会吸引的全国独立出版人和参与者"
                  },
                  {
                    "label": "第三层",
                    "value": "城市泛社群：── 通过城市行走和游击园艺接触到的普通市民"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这三层社群不是孤立的，而是通过持续的公教活动彼此渗透——参加城市行走的市民可能变成读书会的常客，读书会成员可能成为开春书会的志愿者。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "宁波作为根基",
            "subtitle": "一种有根的本土性",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "很多独立艺术空间选择去北京或上海，但假杂志坚持在宁波——一个并非当代艺术中心的城市。这个选择本身就是一种公共性的声明："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "留在宁波",
                    "value": "不去\"中心\"，在\"边缘\"建设——让艺术的公共性在中心之外生长"
                  },
                  {
                    "label": "开春书会在宁波",
                    "value": "吸引全国做书人到宁波，而不是假杂志去全国各地参展"
                  },
                  {
                    "label": "城市行走在宁波",
                    "value": "让本地居民重新看见自己生活的城市——不是给游客做的"
                  },
                  {
                    "label": "游击园艺在宁波",
                    "value": "在本地城市的缝隙中种植——为这座城市的人创造微小的美好"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"假杂志的奇迹日常\"——这个概念捕捉到了在宁波这个看起来\"不可能\"的地方，让一个高品质的独立艺术空间持续运作所需要的日常努力。这个奇迹的基础不是资本或政策，而是晨初和团队日复一日的\"做\"：组织一场读书会、带一次行走、种一棵植物。公共性不是宣言出来的，而是做出来的。"
                ]
              }
            ]
          },
          {
            "id": "b",
            "title": "B站「假象」系列",
            "subtitle": "将公共性延伸到线上",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "假杂志在B站的「假象」系列访谈，采访了川内伦子（Rinko Kawauchi）、Alec Soth、冯立等摄影师，将假杂志的公共性从物理空间延伸到了数字空间："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "视频访谈/纪录片"
                  },
                  {
                    "label": "受访者",
                    "value": "国际和国内重要摄影师"
                  },
                  {
                    "label": "平台",
                    "value": "B站——年轻人聚集的公共平台"
                  },
                  {
                    "label": "门槛",
                    "value": "比线下活动更低——免费、随时随地可看"
                  },
                  {
                    "label": "意义",
                    "value": "打破地域限制，让无法来宁波的人也能接触到假杂志的内容"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "虽然「假象」系列可能更多是言由主导，但作为公教负责人，晨初的工作与这种内容输出是一体的——都是在降低人们接触摄影和艺术的门槛。"
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "她独特的公共性贡献",
            "subtitle": "连接者而非输出者",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的案例中，晨初贡献了一种容易被忽视但至关重要的公共角色："
                ]
              },
              {
                "type": "quote",
                "text": "连接者——\"将摄影书和艺术从'墙上'拉到'生活中'的那个人"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是创造新理论，不是产出自己的作品，不是建立自己的品牌。而是把已经存在的好的东西——摄影书、艺术、知识——和需要它们的人连起来。这种连接的公共性在于：它不为自己积累什么（名声、作品集、学术界地位），而是让流通发生。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在一个鼓励每个人都成为\"IP\"、都建立个人品牌的时代，选择做一个连接者——让聚光灯打在别人身上，让自己成为那个让聚光灯能亮起来的人——是一种反潮流的公共实践。"
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "边界与选择",
            "subtitle": "什么不是晨初的公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做\"网红打卡点\"",
                    "value": "假杂志的空间不是\"出片场景\"，而是可以停留和思考的地方"
                  },
                  {
                    "label": "不追求规模",
                    "value": "不做大声量的营销活动，公共性在于深度而非广度"
                  },
                  {
                    "label": "不把自己包装成\"意见领袖\"",
                    "value": "出现在采访中是被访者，不是自我推广者"
                  },
                  {
                    "label": "不让公教变成展览的附属",
                    "value": "公教本身就是核心，不是\"配套\""
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 晨初 / 假杂志、boPOmofo 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于晨初 / 假杂志、boPOmofo公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 晨初 / 假杂志、boPOmofo 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/fang_chenchu.md"
      ],
      "sourceLabels": [
        "fang_chenchu.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "ge_yulu": {
    "id": "ge_yulu",
    "profile": {
      "name": "葛宇路"
    },
    "triangleTitle": "葛宇路的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "直接行动进入公共空间",
    "centerSubtitle": "用日常动作显影制度与城市规则",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "直接行动",
            "subtitle": "不等许可的创造方法论",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的创造力起点是直接行动（Direct Action）——一种来自 David Graeber 的思想资源，核心信条是：不等别人给你许可，自己先把问题解决了。"
                ]
              },
              {
                "type": "quote",
                "text": "\"直接行动的意思就是——你不要等别人来给你解决问题，不要等政府、等机构、等权威来批准你，你自己去做。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是鲁莽，而是一种经过理论反思的创造姿态。在当代中国的语境下，这种\"不等许可\"的姿态本身就是一种创造性突破——它用行动而非宣言，重新定义了个人与公共空间、个人与制度之间的关系。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不等待",
                    "value": "不等政府命名道路，自己去命名；不等机构批准展览，自己创造展览条件"
                  },
                  {
                    "label": "不抱怨",
                    "value": "不批评系统、不控诉制度，而是用行动去\"加\"一些东西"
                  },
                  {
                    "label": "不依赖",
                    "value": "不依赖画廊体制、不依赖美术馆邀约、不依赖艺术基金"
                  },
                  {
                    "label": "不解释",
                    "value": "行动本身即是表达——不需要\"艺术家陈述\"来赋予合法性"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "艺术作为\"连接\"的工具",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "转折点：从中央美术学院毕业后，葛宇路没有走\"画廊—藏家—美术馆\"的常规艺术路径，而是选择了街道、城市监控系统、公共空间作为他的媒介。"
                ]
              },
              {
                "type": "quote",
                "text": "\"我是想用艺术去加一切，去达成一个很多元的，每个人都有自己的空间的世界。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "他把艺术从白盒子里解放出来，放进真实的社会肌理——道路、摄像头、电网、市集。这是一种媒介层面的创造：不是改良旧媒介（架上绘画、雕塑、影像），而是发明新的艺术发生方式——让生活本身成为艺术的材料和现场。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "理论根基：葛宇路的实践与情境主义国际（Situationist International）的\"异轨\"（detournement）和\"漂移\"（derive）传统有深层呼应，同时也与中国本土的\"街头智慧\"结合："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "空间命名权",
                    "meta": [
                      "通过命名重新定义空间归属"
                    ],
                    "description": "\"葛宇路\"路牌"
                  },
                  {
                    "title": "制度介入",
                    "meta": [
                      "将冰冷的制度转化为有温度的人际接触"
                    ],
                    "description": "对视监控摄像头"
                  },
                  {
                    "title": "身体能量转换",
                    "meta": [
                      "将身体劳动转化为可见的能源和数据"
                    ],
                    "description": "骑车发电供展览"
                  },
                  {
                    "title": "身份交换",
                    "meta": [
                      "通过交换社会角色揭示隐藏的结构"
                    ],
                    "description": "与美术馆工作人员换身份"
                  },
                  {
                    "title": "商业掩护",
                    "meta": [
                      "用商业活动的形式做公共服务"
                    ],
                    "description": "市集、节庆、定期聚会"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "把新可能带进现实",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "\"葛宇路\"路牌",
                    "meta": [
                      "空间命名",
                      "2013"
                    ],
                    "description": "在百子湾南一路悬挂写着自己名字的路牌，被高德地图正式收录，引发交管、外卖、快递等城市系统的自我更新。一个人命名了一条路——用最低成本撬动最大系统效应"
                  },
                  {
                    "title": "对视监控",
                    "meta": [
                      "制度介入",
                      "—"
                    ],
                    "description": "搬梯子爬到监控摄像头前，盯着镜头看，直到保安出来。用目光穿透监控系统，把\"被观看\"的关系反转——摄像头后面是一个可以坐下来聊天的人"
                  },
                  {
                    "title": "骑车发电",
                    "meta": [
                      "身体能量",
                      "—"
                    ],
                    "description": "从河北燕郊骑行30公里到展览现场，把自己的体力转化为电能，只为维持展览屏幕运行30分钟。诚实地呈现个体能量的有限性——但有限不等于无力"
                  },
                  {
                    "title": "与美术馆换身份",
                    "meta": [
                      "身份交换",
                      "—"
                    ],
                    "description": "在美术馆工作了3个月，让原本的工作人员获得9周带薪休假。证明了一个最朴素的道理：艺术需要闲暇——如果你没有时间喘息，你就没有时间创造"
                  },
                  {
                    "title": "市集与节庆",
                    "meta": [
                      "商业掩护",
                      "2022至今"
                    ],
                    "description": "搬到成都后，从纯艺术转向市集、节庆、定期聚会——\"用商业逻辑掩护公共表达\"，在合规框架内创造自由空间"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "设计方法论",
            "subtitle": "直接行动的六条原则",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从葛宇路的实践中，可以提取出一套创造方法论："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "行动先于声明",
                    "description": "先挂路牌，再让世界发现它。不是先写方案申请，再执行——方案就是行动本身"
                  },
                  {
                    "index": "2",
                    "title": "最低成本，最大涟漪",
                    "description": "一块路牌引发了城市的系统性回应——投入/产出比的极限"
                  },
                  {
                    "index": "3",
                    "title": "以连接代替对抗",
                    "description": "对视监控不是破坏监控，而是\"脱掉制服后坐在一起聊天\"——瓦解冷漠而非攻击系统"
                  },
                  {
                    "index": "4",
                    "title": "诚实地呈现局限",
                    "description": "骑车30公里只能发电30分钟——不用虚假的震撼来包装，把局限本身变成表达"
                  },
                  {
                    "index": "5",
                    "title": "利用系统的缝隙",
                    "description": "不挑战系统，而是在系统允许的模糊地带行动"
                  },
                  {
                    "index": "6",
                    "title": "商业作为掩护，公共作为目的",
                    "description": "用\"我们只是想赚钱\"来解释市集——其实是在创造公共空间"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "从\"葛宇路\"到\"元元的菜地\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"谁在做或是支持突破观念、松动规则、弱化唯一价值观，在固化的社会搭建交流桥梁，做激活个人创造性和能动性的事情，谁就是我的好朋友。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的名字本身就是一种创造性姿态——不是等待权力机构给你一个路名，而是自己去命名，让日常生活系统（外卖、快递、高德地图）来\"批准\"这个名字。当路牌最终被拆除，这成为作品的一部分——接受一切结果，包括失败和消失。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "更重要的是，他后来在成都做的市集被当地居民自发称为\"元元的菜地\"——命名权从艺术家转移到了普通人手中。这是\"葛宇路\"作品最深刻的延续：不是让大家都挂自己的名字，而是激活每个人命名和创造自己世界的意识。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "承认个体的\"极其有限\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的故事起点同样不是英雄式的叙事，而是一种坦然承认局限的姿态："
                ]
              },
              {
                "type": "quote",
                "text": "\"不好意思，我的状态就是这个样子，能量就这么多。\""
              },
              {
                "type": "quote",
                "text": "\"一个个体在一个庞大的城市里面是极其有限的，我希望大家看见这种局限性。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "骑车30公里只够支撑展览30分钟——这不仅是作品的一部分，更是葛宇路对自己的诚实定位。他不扮演\"改变世界\"的英雄艺术家，而是诚实地展示：一个人的身体能量、社会能量、政治能量都是有上限的。 这种诚实恰恰是他的力量来源——因为不装强大，所以不必维护虚假形象，反而获得了真正的行动自由。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种诚实是\"身心安顿\"的前提：如果不承认自己的能量有限，就会被耗尽；如果不承认路牌会被拆除，就会被挫败压垮；如果不承认体制的强大，就会陷入无用的对抗或被收编。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "搬迁与重新定位",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从北京到成都的搬迁不是\"逃离\"，而是一次主动的重新定位："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "空间",
                    "meta": [
                      "高度政治化、高成本、高压力"
                    ],
                    "description": "更多实验性空间、更低成本"
                  },
                  {
                    "title": "方式",
                    "meta": [
                      "纯艺术行动（路牌、监控、发电）"
                    ],
                    "description": "商业掩护 + 公共表达（市集、节庆、聚会）"
                  },
                  {
                    "title": "身份",
                    "meta": [
                      "独立\"搞事情\"的艺术家"
                    ],
                    "description": "社群组织者、市集运营者"
                  },
                  {
                    "title": "风险规避",
                    "meta": [
                      "直接面对"
                    ],
                    "description": "\"这就是个商业活动，我们只是想赚钱\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种转变不是妥协，而是一种策略性的内在自洽——在规则日益收紧的环境中，用商业的外壳保护公共的内核。正如他所说："
                ]
              },
              {
                "type": "quote",
                "text": "\"这就是个商业活动，我们只是想赚钱。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话本身就是一种保护色——在\"疑罪从有\"的环境里，最好的辩护不是证明自己无罪（那太难了），而是让指控本身失去靶心。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "拥抱不确定性与不完美",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的韧性的一个关键面向是：把失败和消失变成作品的一部分。"
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "\"葛宇路\"路牌最终被城管拆除——这并未\"终结\"作品，而是完成了作品。从命名到被清拆，整个生命周期就是一件完整的作品",
                  "骑车发电的\"不够用\"——恰恰是作品的核心理念：诚实呈现个人的局限性",
                  "对视监控没有\"改变\"监控系统——但它改变了一个保安和一个艺术家之间的关系"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种接受不完美的能力，是葛宇路内在韧性的核心。不是\"战胜\"不确定性，而是和不确定性一起生活。"
                ]
              },
              {
                "type": "preformatted",
                "text": "北京时期                      成都时期\n    │                              │\n    ├── \"葛宇路\"路牌 ★              ├── 市集运营\n    │                              │\n    ├── 对视监控                    ├── 节庆活动\n    │                              │\n    ├── 骑车发电                    ├── 定期聚会\n    │                              │\n    ├── 与美术馆换身份              ├── \"元元的菜地\"\n    │                              │\n    └── 路牌被拆 ★ 作品完成          └── 用商业逻辑掩护公共表达"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "时间伦理特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "非积累式：每一个作品完成自己，不追求\"越做越大\"",
                  "拥抱消失：作品的生命周期包括其被拆除的过程",
                  "流动性：从北京到成都，从纯艺术到市集商业——地理和形式都流动，但核心不变"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "自我保护",
            "subtitle": "在\"疑罪从有\"时代的生存策略",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的生活智慧体现在他对自己所处环境的清醒认知："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "商业包装",
                    "value": "用\"这就是个商业活动\"来为公共活动获取合法性"
                  },
                  {
                    "label": "不解释",
                    "value": "不发表政治声明、不写宣言——减少被解读为\"别有用心\"的风险"
                  },
                  {
                    "label": "地理迁移",
                    "value": "从北京（\"疑罪从有\"更严格）到成都（更宽松的实验空间）"
                  },
                  {
                    "label": "社群化",
                    "value": "不再单独行动，而是建立社群——人多不是\"个人行为\"，而是\"市场行为\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些策略共同构成了一套在紧缩空间中保持创造力和公共性的生存技术。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在葛宇路的实践中，可以提取出以下核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "行动先于话语",
                    "meta": [
                      "█████"
                    ],
                    "description": "挂路牌、搬梯子、骑车发电——用行动而非宣言表达"
                  },
                  {
                    "title": "诚实先于震撼",
                    "meta": [
                      "█████"
                    ],
                    "description": "承认个体有限、承认作品不完美、不包装"
                  },
                  {
                    "title": "连接先于批判",
                    "meta": [
                      "█████"
                    ],
                    "description": "对视监控是为了认识背后的人，不是为了控诉监控"
                  },
                  {
                    "title": "游戏先于对抗",
                    "meta": [
                      "████"
                    ],
                    "description": "在系统的缝隙中玩，而不是正面冲击系统"
                  },
                  {
                    "title": "激发先于主导",
                    "meta": [
                      "█████"
                    ],
                    "description": "让每个人自己命名、自己创造——不是教别人怎么做"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些价值观不是写在纸上的标语，而是每一次行动的自然流露——当葛宇路挂上路牌、爬上梯子、骑行30公里、在市集上观察普通人的反应时，他用自己的身体兑现了这些价值。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "路牌",
            "subtitle": "一个人的行动如何变成公共基础设施",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"葛宇路\"路牌是葛宇路的公共性思想的起点和最纯粹的表达："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "在无名道路悬挂自己名字的路牌"
                  },
                  {
                    "label": "系统回应",
                    "value": "被高德地图正式收录、纳入导航系统"
                  },
                  {
                    "label": "公共效果",
                    "value": "快递员在这里送快递、交警在这里开罚单、外卖员送到这条路——\"葛宇路\"成为数以万计普通人的日常经验的一部分"
                  },
                  {
                    "label": "拆除",
                    "value": "最终被城管拆除——但拆除本身也进入了公共话语"
                  },
                  {
                    "label": "意义",
                    "value": "一个人的私人行动被城市系统\"认可\"为公共事实"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "一个人的名字，变成了一条可以被导航的路。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "路牌的公共性意义：它证明了一个人的行动可以穿透整个公共系统——不是靠权力，不是靠金钱，不是靠关系，而是靠对系统运作逻辑的理解和被动的等待。葛宇路只是挂了块牌子，是高德地图的算法、快递员的地址簿、交警的罚单本共同完成了\"葛宇路\"的公共存在。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "对视监控",
            "subtitle": "把冷系统变回热的人",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "对视监控摄像头这个作品，是葛宇路公共性思想最具温度的体现："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "操作：搬梯子爬到监控摄像头前，盯着镜头看，直到保安出来。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "结果："
                ]
              },
              {
                "type": "quote",
                "text": "\"他脱下了制服，我们成为坐在一起聊天的朋友。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "层次分析："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "第一层：用一个具体的\"人\"的目光，去面对一个抽象的\"系统\"的眼睛",
                  "第二层：当保安出来时，他们有了面对面的交流——\"你为什么看监控？\"\"因为这是我的工作。\"\"你的工作无聊吗？\"\"挺无聊的。\"",
                  "第三层：两个人坐在一起，成为朋友——系统没有被推翻，但人与人之间的墙裂开了一道缝"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"对抗\"监控系统，而是穿透监控系统——不是要拆除摄像头，而是要看到摄像头后面坐着一个无聊的人，这个人脱下制服后可以和你坐在一起聊天。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "关系重建的三个层次",
            "subtitle": null,
            "kind": "relation-levels",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的实践在不同尺度上重建了人与人的连接："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "人与城市系统之间：── \"葛宇路\"路牌：个人行动 → 城市基础设施的回应"
                  },
                  {
                    "label": "层次 2",
                    "value": "人与\"系统代理人\"之间：── 对视监控：冷系统 → 热的人"
                  },
                  {
                    "label": "层次 3",
                    "value": "人与人之间（多元呈现）：── 市集与节庆：邀请工厂诗人、社区阿姨"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "让\"看不见的人\"被看见",
            "subtitle": "\"重新回到公共\"",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "搬到成都后的市集和节庆，标志着葛宇路公共性思想的深化——从艺术家个人的直接行动，转向搭建平台让更多人被看见："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "邀请工厂诗人",
                    "meta": [
                      "让工厂工人出身的人在节日活动上朗诵诗歌"
                    ],
                    "description": "\"让大家看见另外一个人是怎么在这个世界生活的\""
                  },
                  {
                    "title": "社区阿姨参与（通过徐艺函）",
                    "meta": [
                      "让从未离开过村庄的社区阿姨在市集上展示和售卖"
                    ],
                    "description": "给予\"没有被看见过的人\"一个平台"
                  },
                  {
                    "title": "市集运营",
                    "meta": [
                      "用商业形式创造公共聚集空间"
                    ],
                    "description": "让不同阶层、不同背景的人在同一空间相遇"
                  },
                  {
                    "title": "定期聚会",
                    "meta": [
                      "建立持续的社群连接"
                    ],
                    "description": "不是一次性事件，而是持续的关系网"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"重新回到公共，让大家看见更多丰富有趣的、多样的人。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话是葛宇路公共性思想的核心。它不追求某种宏大的社会变革，而是追求在日渐碎片化、原子化的社会中重新创造人与人之间的看见和连接。工厂诗人被邀请来朗诵，社区阿姨被请来摆摊——这些不是\"艺术家提携弱势群体\"的慈善叙事，而是让不同的人生经验有一个互相照面的机会。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "国际连接",
            "subtitle": "独立艺术家的跨文化实践",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的实践同样具有国际维度："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "学术背景",
                    "value": "中央美术学院，受过完整的学院教育"
                  },
                  {
                    "label": "国际艺术界关注",
                    "value": "\"葛宇路\"路牌在国际艺术媒体和社交平台引发广泛讨论"
                  },
                  {
                    "label": "艺术市场关系",
                    "value": "作品进入国际画廊和收藏体系"
                  },
                  {
                    "label": "理论资源",
                    "value": "David Graeber 的\"bullshit jobs\"和\"直接行动\"；情境主义国际的影响"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的公共性同样有明确的边界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做政治宣言",
                    "value": "不发表批判性文字，不用\"异议艺术家\"的标签"
                  },
                  {
                    "label": "不做对抗性行为",
                    "value": "对视监控不是破坏监控，路牌不是挑战政府命名权"
                  },
                  {
                    "label": "不做纯商业",
                    "value": "市集背后的目标是公共连接，不是利润最大化"
                  },
                  {
                    "label": "不做\"领导\"",
                    "value": "不把自己定位成社群领袖——\"元元的菜地\"的名字来自居民，不是他起的"
                  },
                  {
                    "label": "不做宏大叙事",
                    "value": "不谈论\"改变中国\"或\"改造社会\"——只做具体的事"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "独有贡献",
            "subtitle": "将\"直接行动\"确立为公共创造的方法论",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，葛宇路贡献了一种独特的方法论："
                ]
              },
              {
                "type": "quote",
                "text": "直接行动 = 公共创造（Direct Action as Public Creation）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是等待公共空间的授权，而是用自己的行动激活公共性——你挂一块路牌，整个城市系统会用它的方式回应你；你盯着摄像头，摄像头后面的人会出来和你说话；你办一个市集，不同阶层的人会在同一个地方相遇。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "葛宇路的方法论基于一个根本信念："
                ]
              },
              {
                "type": "quote",
                "text": "\"我是想用艺术去加一切，去达成一个很多元的，每个人都有自己的空间的世界。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是关于\"做艺术\"，而是关于用艺术打开和别人、和世界连接的方式。 艺术不是目的，\"加一切\"才是——艺术是那个用来往固化社会里\"加\"东西的工具，加连接、加温度、加多样性、加可能性。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 葛宇路 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于葛宇路公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 葛宇路 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/ge_yulu.md"
      ],
      "sourceLabels": [
        "ge_yulu.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "liao_zhili": {
    "id": "liao_zhili",
    "profile": {
      "name": "廖智立 / Dweller、普罗托邦"
    },
    "triangleTitle": "廖智立 / Dweller、普罗托邦的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "渐进式共同生活",
    "centerSubtitle": "以共居、翻译和观察靠近日常基础设施",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "理论创造",
            "subtitle": "\"普罗托邦\"作为新的社会想象框架",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立的创造力首先体现在概念层面的创新。\"普罗托邦\"（Protopia）不是他发明的词，但他将其系统性地引入中国社会创新语境，赋予它明确的实践内涵："
                ]
              },
              {
                "type": "quote",
                "text": "普罗托邦不是乌托邦——不追求一个完美的、终结性的理想社会；也不是反乌托邦——不陷入绝望和犬儒。它是\"渐进但持续地让世界变好一点\"的实践哲学。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在\"要么完美理想、要么彻底绝望\"的二元叙事之外，普罗托邦提供了一种第三条道路：接受世界永远不会完美，但每一天都可以比昨天更好一点。这种理论姿态本身就是在创造新的可能——改变人们\"想象社会变革\"的方式。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "概念译介",
                    "value": "将\"Protopia\"概念系统引入中文社会创新话语"
                  },
                  {
                    "label": "理论落地",
                    "value": "不是停留在哲学讨论，而是将其与共居实践绑定"
                  },
                  {
                    "label": "叙事重构",
                    "value": "打破\"乌托邦 vs 反乌托邦\"的二元对立"
                  },
                  {
                    "label": "知识生产",
                    "value": "\"2025 共居生活洞察报告\"——从实践中提炼可传播的知识"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "实践创造",
            "subtitle": "共居作为创造性的生活设计",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立的创造不止于理论。他将\"共居\"（co-living）从一种居住方式提升为一种设计实践："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "空间设计",
                    "meta": [
                      "参与 Dweller 青年共居社区的营造"
                    ],
                    "description": "不是\"租个房子住\"，而是设计一种共享生活的空间规则"
                  },
                  {
                    "title": "社群营造",
                    "meta": [
                      "连接 706、GCC Commons 等共居网络"
                    ],
                    "description": "让孤立的共居实验变成可连接的生态"
                  },
                  {
                    "title": "知识生产",
                    "meta": [
                      "\"2025 共居生活洞察报告\""
                    ],
                    "description": "将零散的共居经验系统化为可传播的知识"
                  },
                  {
                    "title": "生活实验",
                    "meta": [
                      "自身住在实验性社区中"
                    ],
                    "description": "不是在\"研究\"共居，而是在\"实践\"共居"
                  }
                ]
              }
            ]
          },
          {
            "id": "ssir",
            "title": "SSIR 翻译",
            "subtitle": "跨世界的转译者",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立作为《斯坦福社会创新评论》（SSIR）中文版的译者，其创造力体现在一种特殊的转译能力上："
                ]
              },
              {
                "type": "quote",
                "text": "他不只是翻译语言（English → 中文），而是在翻译\"世界\"——将全球社会创新的理论资源，转译为中文读者可以理解、可以使用的知识。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种翻译工作是创造性的，因为它需要：理解原始语境、识别中国读者的知识缺口、找到合适的语言让陌生的概念变得可感可用。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "语言转译",
                    "value": "英文 → 中文，准确且可读"
                  },
                  {
                    "label": "概念转译",
                    "value": "全球社会创新话语 → 中国在地语境"
                  },
                  {
                    "label": "领域转译",
                    "value": "学术理论 → 社区实践者的日常语言"
                  },
                  {
                    "label": "知识开通",
                    "value": "让原本只属于英文读者的知识资源，对中文读者开放"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创造方法论",
            "subtitle": "在\"之间\"工作",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从廖智立的实践中，可以提取出他的创造姿态——他总是在\"之间\"工作："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "理论与生活之间",
                    "description": "普罗托邦不是书斋里的哲学，是每一天都在实践的生活方式"
                  },
                  {
                    "index": "2",
                    "title": "个人与社群之间",
                    "description": "共居既是个人的居住选择，也是社群的共同创造"
                  },
                  {
                    "index": "3",
                    "title": "全球与本地之间",
                    "description": "SSIR 翻译将全球知识接入中国在地实践"
                  },
                  {
                    "index": "4",
                    "title": "写作与行动之间",
                    "description": "报告和翻译不是\"做完就算\"，而是行动者使用的工具"
                  },
                  {
                    "index": "5",
                    "title": "理想与现实之间",
                    "description": "普罗托邦就是\"在理想与现实的缝隙中持续做事\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种\"之间\"的位置不是摇摆不定，而是一种方法论选择——不站任何一个极端，而是在连接处创造价值。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "\"普罗托邦\"作为心理锚点",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立的\"身心安顿\"与他创造的\"普罗托邦\"概念高度一体。普罗托邦不只是一种社会理论，也是一种个人如何与世界相处的内在姿态："
                ]
              },
              {
                "type": "quote",
                "text": "接受世界不会完美，但每一天都有可能让一小部分变好一点。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种哲学在心理层面的功能是：它同时抵御了两种常见的心理陷阱——乌托邦的幻灭（\"我们永远达不到理想社会，所以一切都没意义\"）和反乌托邦的犬儒（\"世界只会越来越糟，做什么都没用\"）。普罗托邦给出的答案是：\"确实不完美，但做一点是一点\"——这是一种诚实的希望。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "对抗幻灭",
                    "value": "不追求完美终点，所以不会因为达不到而崩溃"
                  },
                  {
                    "label": "对抗犬儒",
                    "value": "不相信彻底绝望，所以始终有做事的动力"
                  },
                  {
                    "label": "接受渐进",
                    "value": "不以\"是否彻底改变世界\"来衡量行动的意义"
                  },
                  {
                    "label": "拥抱不完美",
                    "value": "在\"还不够好\"的状态里依然能安顿自己"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "知行合一",
            "subtitle": "用居住方式实践自己的哲学",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立不是在理论上倡导共居，而是自己住在实验性的共居社区里。这种选择本身就是身心安顿的体现——他没有住在\"正常\"的房子里，然后写文章说\"共居很好\"。他的知识工作（翻译、研究、写报告）和他的生活实践（住在共居空间、参与社区营造）是同一件事的两个面。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种一致性具有重要的心理意义：不需要分裂——不需要在工作中说一套、在生活中做另一套。理论喂养生活，生活检验理论。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "在不确定中的持续在场",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立的工作领域——替代性居住方式、青年共居实验——在中国社会环境中是一个充满不确定性的领域。政策模糊、公众认知有限、经济模型不稳定。在这样的条件下持续做这件事，本身就是韧性的表现。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "普罗托邦哲学为这种韧性提供了内在支撑：如果目标是\"彻底改变住房制度\"，那确实容易绝望；但如果目标是\"让一小群人今天住得更好一点\"，那每一天都可以是成功的。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "渐进优于完美",
                    "meta": [
                      "████"
                    ],
                    "description": "普罗托邦哲学——不等待完美方案，能做一点是一点"
                  },
                  {
                    "title": "实践先于宣言",
                    "meta": [
                      "████"
                    ],
                    "description": "住在共居社区里而非只是研究共居"
                  },
                  {
                    "title": "连接优于孤立",
                    "meta": [
                      "████"
                    ],
                    "description": "将不同共居网络的人与知识连接起来"
                  },
                  {
                    "title": "知识作为公共资源",
                    "meta": [
                      "████"
                    ],
                    "description": "翻译和报告不是为了个人品牌，是为了让更多人可以用"
                  },
                  {
                    "title": "诚实面对局限",
                    "meta": [
                      "████"
                    ],
                    "description": "普罗托邦本身就是对\"人类能力有限\"的诚实承认"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "让共居知识成为公共资源",
            "subtitle": null,
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立公共性贡献的核心是将共居经验转化为公共知识："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "\"2025 共居生活洞察报告\"",
                    "meta": [
                      "对中国共居实验的系统性记录和分析"
                    ],
                    "description": "让零散的共居实践变得可见、可言说、可学习"
                  },
                  {
                    "title": "SSIR 中文翻译",
                    "meta": [
                      "全球社会创新知识的汉化"
                    ],
                    "description": "打破语言壁垒，让中文读者接触前沿社会创新"
                  },
                  {
                    "title": "社区文档",
                    "meta": [
                      "Dweller 等共居空间的实践记录"
                    ],
                    "description": "让一个社区的经验可以服务更多社区"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些知识不是锁在学术期刊里的，而是面向实践的——为正在做共居或想做共居的人提供地图和工具。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "连接基础设施",
            "subtitle": "编织共居网络",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立不只是住在 Dweller，他是不同共居网络之间的连接点："
                ]
              },
              {
                "type": "preformatted",
                "text": "706 青年空间\n           |\n    GCC Commons ──── 廖智立 ──── Dweller 青年共居\n           |\n        其他共居实验"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "他不是在\"建立自己的品牌\"，而是在让已有的不同节点之间产生连接。这种连接工作容易被忽视——它不产出\"自己的作品\"，但它让别人的作品能够互联、交换、相互滋养。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "空间连接",
                    "value": "让 Dweller、706、GCC Commons 等共居空间互通"
                  },
                  {
                    "label": "知识连接",
                    "value": "全球社会创新理论 ↔ 中国在地实践"
                  },
                  {
                    "label": "人群连接",
                    "value": "研究者 ↔ 实践者 ↔ 想了解共居的普通人"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "翻译作为公共服务",
            "subtitle": null,
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "廖智立的 SSIR 翻译不是商业行为，而是一种公共服务："
                ]
              },
              {
                "type": "quote",
                "text": "社会创新领域的大量核心文献和前沿讨论以英文为主。对于不会英文的中国实践者，这些知识是不可及的。翻译就是在打开这扇门。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"用自己的语言表达自己的思想\"（那是创作），而是\"用自己的语言让别人接触别人的思想\"（那是一种知识公地的维护）。在一个鼓励每个人都做\"思想领袖\"的时代，选择做一个翻译者——让他人的思想可以被更多人看见——是一种低调但关键的公共实践。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "为替代性居住方式建立合法性",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在中国社会，替代性居住方式（共居、合作居住、青年社区）仍然处于主流认知的边缘。廖智立的知识生产——研究报告、翻译文章、社区记录——是在为这些实践建立合法性："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "认知合法性",
                    "value": "报告和翻译让公众知道\"共居是什么\""
                  },
                  {
                    "label": "实践合法性",
                    "value": "系统性的记录让共居实践者看到\"这件事是有人在认真做的\""
                  },
                  {
                    "label": "政策合法性",
                    "value": "严谨的研究和记录为未来可能的政策讨论提供基础材料"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "边界与选择",
            "subtitle": null,
            "kind": "boundary",
            "blocks": [
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做乌托邦式的宏大宣言",
                    "value": "普罗托邦本身就是对\"完美理想\"的拒绝"
                  },
                  {
                    "label": "不把共居包装成生活方式消费品",
                    "value": "共居是生活实践，不是一种\"潮流\""
                  },
                  {
                    "label": "不把知识锁在学术圈",
                    "value": "报告和翻译面向实践者，而非学术评审"
                  },
                  {
                    "label": "不追求个人品牌",
                    "value": "连接者而非明星——把光打在共居实践本身"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "独有贡献",
            "subtitle": "将\"替代性居住\"确立为社会创新的场域",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的案例中，廖智立贡献了一个尚未被充分认识的维度："
                ]
              },
              {
                "type": "quote",
                "text": "共居（co-living）作为社会创新的实验场"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "共居不只是\"几个人住在一起省钱\"，而是：重新设计人与空间的关系、重新定义\"家\"的边界、重新实践日常生活中的合作与协商。通过他的翻译、研究和网络编织，廖智立让这个实验场变得可见，让其中产生的经验和知识可以流动到更广阔的社会创新领域。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 廖智立 / Dweller、普罗托邦 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于廖智立 / Dweller、普罗托邦公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 廖智立 / Dweller、普罗托邦 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/liao_zhili.md"
      ],
      "sourceLabels": [
        "liao_zhili.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "luneurs": {
    "id": "luneurs",
    "profile": {
      "name": "Luneurs"
    },
    "triangleTitle": "Luneurs的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "有机生长的日常快乐",
    "centerSubtitle": "社区面包店作为慢速商业实践",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "一家\"怕增长\"的面包店",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 的创造力起点是一个几乎不可思议的姿态：一家商业公司说自己\"怕增长\"。"
                ]
              },
              {
                "type": "quote",
                "text": "\"我们很怕、非常怕（增长）。\" —— Luneurs 创始团队"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在中国的消费市场语境中，\"怕增长\"几乎是不可理解的——创业叙事全部围绕\"规模\"\"增速\"\"GMV\"\"市占率\"展开。而 Luneurs 从 2018 年在上海创立的第一天起，就选择了一条与 VC 驱动的资本逻辑彻底不同的路："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "VC 驱动的快速扩张",
                    "value": "拒绝融资换增长——坚持有机增长，靠自己的现金流一步步开新店"
                  },
                  {
                    "label": "高端商业地产的\"恩惠\"",
                    "value": "拒绝了南京德基广场的入驻邀请——中国最高端的购物中心之一"
                  },
                  {
                    "label": "\"复制粘贴\"式的连锁逻辑",
                    "value": "每家店都不一样——不做标准化模板，不追求统一体验"
                  },
                  {
                    "label": "规模崇拜",
                    "value": "19+ 家店，不是追求 100 家——\"够了\"本身就是一种立场"
                  },
                  {
                    "label": "增长即正义的叙事",
                    "value": "\"很怕增长\"——不是因为能力不足，而是因为知道增长会稀释什么"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"怕增长\"不是软弱，而是清醒：Luneurs 知道自己生产的是什么——不是可复制的工业产品，而是特定空间里的特定体验、特定社区关系、特定的人与人之间的连接。这些东西不能通过\"开更多的店\"来放大——它们恰恰是\"开更多的店\"会毁掉的东西。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "面包店作为社区空间",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "核心创造：Luneurs 没有把自己定义为\"卖面包的公司\"，而是以面包和冰淇淋为媒介创造社区空间的公司。"
                ]
              },
              {
                "type": "quote",
                "text": "\"每一克都是快乐。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是一句营销口号——它暗示了 Luneurs 在生产的不是\"面包\"这种物理产品，而是\"快乐\"这种情感和社会体验。面包是载体，快乐是内容。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "每家店是独特的社区空间",
                    "value": "每家店是统一的标准化模板"
                  },
                  {
                    "label": "举办跑步、骑行、攀岩俱乐部",
                    "value": "吃完就走——提高翻台率"
                  },
                  {
                    "label": "店是社区据点，常客彼此认识",
                    "value": "店是消费终端，顾客彼此陌生"
                  },
                  {
                    "label": "有机增长，一家一家慢慢开",
                    "value": "VC 驱动，一年开几十上百家"
                  },
                  {
                    "label": "空间让人愿意停留和相遇",
                    "value": "空间被设计为\"买完就走\"的高效动线"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "理论意义：Luneurs 复活了一种前工业化时代的商业模式逻辑——面包店首先是邻里空间的锚点，其次才是食物供应点。在欧洲传统的街区生活中，面包店、咖啡馆、小酒馆是社区的\"第三空间\"（家庭=第一空间，工作=第二空间，社区据点=第三空间）。Luneurs 在上海这座超级城市中，用法国面包的手艺恢复了这个消失中的空间传统。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "每一家店都是不同的社区实验",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "社区面包店（多家分店）",
                    "meta": [
                      "社区空间"
                    ],
                    "description": "每一家店嵌入不同的社区街区——不是\"选了 19 个点位\"，而是\"进入了 19 个社区\""
                  },
                  {
                    "title": "跑步俱乐部",
                    "meta": [
                      "社区活动"
                    ],
                    "description": "以面包店为起点的定期跑步——陌生人因为共同的路线和共同的目的地（Luneurs）建立连接"
                  },
                  {
                    "title": "骑行俱乐部",
                    "meta": [
                      "社区活动"
                    ],
                    "description": "骑行结束后聚在店里——运动+社交+面包的三重快乐"
                  },
                  {
                    "title": "攀岩俱乐部",
                    "meta": [
                      "社区活动"
                    ],
                    "description": "从室内攀岩到面包店——一种都市青年生活方式的有机组合"
                  },
                  {
                    "title": "\"每一克都是快乐\"",
                    "meta": [
                      "品牌哲学"
                    ],
                    "description": "不只是产品承诺——是对\"消费体验\"的重新定义：不是买得值，是快乐得值"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创造方法论",
            "subtitle": "八条创造原则",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从 Luneurs 的实践中可以提取出其创造方法论："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "空间先于产品",
                    "description": "面包和冰淇淋是好的，但人们来 Luneurs 首先是因为这个空间让人觉得舒服"
                  },
                  {
                    "index": "2",
                    "title": "社区先于规模",
                    "description": "在进入一个新街区之前，先问\"我们能给这里带来什么\"，而不是\"这里有多少客流\""
                  },
                  {
                    "index": "3",
                    "title": "有机生长而非指数生长",
                    "description": "一家店好了再开下一家——不被\"时间表\"绑架，不被\"KPI\"追赶"
                  },
                  {
                    "index": "4",
                    "title": "体验不可复制",
                    "description": "每家店都不一样——因为每个社区都不一样。标准化是体验的敌人"
                  },
                  {
                    "index": "5",
                    "title": "\"够了\"是有力的商业策略",
                    "description": "19+ 家就够了——知道\"多少算够\"是对消费主义逻辑的根本拒绝"
                  },
                  {
                    "index": "6",
                    "title": "关系是回头率的基础",
                    "description": "不是因为面包好吃所以回来——是因为在这里认识了人、有了归属感所以回来"
                  },
                  {
                    "index": "7",
                    "title": "拒绝是创造的前提",
                    "description": "拒绝 VC、拒绝德基、拒绝复制粘贴——每一次拒绝都让\"我们是谁\"更清晰"
                  },
                  {
                    "index": "8",
                    "title": "快乐比效率重要",
                    "description": "\"每一克都是快乐\"——不以翻台率为 KPI，不以坪效为最高准则"
                  }
                ]
              }
            ]
          },
          {
            "id": "luneurs",
            "title": "命名即创造",
            "subtitle": "\"Luneurs\"与\"每一克都是快乐\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"Luneurs\"的名字——法文中\"月亮\"（Lune）的变形，携带着法式面包传统的浪漫想象。但 Luneurs 不是一个\"假装在巴黎\"的符号消费场所——它是一家真正的法式面包店，因为创始团队的手艺和理念是法式的，而不是因为装修风格是\"法式风格\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"每一克都是快乐\"：一个精妙的品牌陈述。不说\"每一口都好吃\"（那是关于味觉），不说\"每一元都值得\"（那是关于性价比），而是说\"每一克都是快乐\"（那是关于情绪和体验）。克（gram）是面包的计量单位——这个 slogan 同时包含了物质层面（每一克面包）和精神层面（每一克=每一份快乐）的双重含义。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "承认\"怕增长\"并为此行动",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在一个\"增长即美德\"的商业世界里，说\"我怕增长\"是需要勇气的——尤其当这句话是公开说给媒体听的时候。"
                ]
              },
              {
                "type": "quote",
                "text": "SSIR 中文版的报道标题：\"Luneurs：另类成长\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"另类成长\"这个词本身就说明了 Luneurs 的处境：它仍然在\"成长\"，但它的成长方式如此不同于主流叙事，以至于需要一个新的形容词——\"另类\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 的诚实在于：它不假装自己在\"快速扩张只是换了一种说法\"。它直接说\"我怕\"。这种情感上的诚实——而不是战略上的伪装——让 Luneurs 的身心安顿有了一个真实的起点。不是在证明\"我们不开 100 家店是对的\"，而是在承认\"开 100 家店我们承受不了——不是钱不够，而是我们会失去最重要的东西\"。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "有机增长的经营伦理",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 没有选择\"要么追求增长、要么拒绝增长\"的二元对立，而是找到了一种有机生长的中间道路："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "增长模式",
                    "value": "有机增长——用自己的现金流开新店，不靠 VC 输血"
                  },
                  {
                    "label": "店铺规模",
                    "value": "19+ 家——不是 500 家，也不需要是 500 家"
                  },
                  {
                    "label": "空间路线",
                    "value": "社区街区——不去高端商场（拒绝德基），不追求\"最好的位置\""
                  },
                  {
                    "label": "员工承诺",
                    "value": "疫情期间持续发放全额工资——不把危机转嫁给员工"
                  },
                  {
                    "label": "产品逻辑",
                    "value": "面包和冰淇淋永远是核心——不盲目扩品类、不做餐饮集团化"
                  },
                  {
                    "label": "扩张节奏",
                    "value": "\"准备好了再开下一家\"——没有\"一年内开到 50 家\"的硬性指标"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种经营模式的内在自洽在于：有机增长让自己掌握节奏。当你不需要对 VC 承诺增长指标时，你可以等一家店真正\"好\"了再开下一家；当市场不好时，你可以停一停；当你想尝试新东西时，你可以在某一家店慢慢试。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "拒绝德基的意义：南京德基广场是中国最高端的购物中心之一，入驻意味着巨大的客流和品牌溢价。但 Luneurs 拒绝了。不是因为\"去不起\"，而是因为那不是一个社区——高端商场里的消费者不会把面包店当作\"我的社区据点\"。德基的客流是流动的（shoppers），而 Luneurs 需要的是停留的（neighbors）。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "疫情中的员工守护",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "2022 年上海疫情期间，大量消费品牌裁员、降薪、倒闭。Luneurs 的选择是："
                ]
              },
              {
                "type": "quote",
                "text": "继续给所有员工发放全额工资。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在门店无法正常营业、收入大幅下降的情况下，这个决定在经济上是\"不理性\"的。但它恰恰体现了 Luneurs 身心安顿的深层逻辑：人不只是成本，人是公司存在的理由。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "裁员降薪自保",
                    "value": "全员全额工资"
                  },
                  {
                    "label": "缩减规模求生存",
                    "value": "保持团队完整"
                  },
                  {
                    "label": "快速止损",
                    "value": "承受短期损失"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种韧性不是\"扛得住\"的硬撑，而是\"值得扛\"的信念：如果 Luneurs 奉行\"每一克都是快乐\"，那么一家在危机时刻抛弃员工的公司在危机之后就再也没有资格说这句话了。快乐不能建立在被抛弃的人身上。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "\"怕增长\"背后的时间伦理",
            "subtitle": null,
            "kind": "timeline",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 的\"怕增长\"不是恐惧情绪，而是一种时间伦理："
                ]
              },
              {
                "type": "timeline",
                "items": [
                  {
                    "time": "2018",
                    "title": "上海创立，第一家店"
                  },
                  {
                    "time": "2019",
                    "title": "口碑传播，自然生长"
                  },
                  {
                    "time": "2020",
                    "title": "疫情期间的坚守"
                  },
                  {
                    "time": "2021",
                    "title": "缓慢扩张，精选新点位"
                  },
                  {
                    "time": "2022",
                    "title": "上海疫情封控"
                  },
                  {
                    "time": "2023",
                    "title": "跑步/骑行/攀岩俱乐部成形"
                  },
                  {
                    "time": "2024",
                    "title": "2026 ──┼── 19+ 家门店"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "时间伦理特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "不是慢，是不急：从 2018 到 2026，8 年 19+ 家——平均一年开不到 3 家。不是\"做不大\"，而是\"不急着长大\"",
                  "危机中的坚守加速了信任积累：疫情期间的全额工资不是成本，而是对\"Luneurs 是一家什么样的公司\"最有力的回答",
                  "\"慢\"本身就是价值：在一切都追求快的时代，一家\"不急\"的公司本身就是一种稀缺体验"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从 Luneurs 的实践中可以提取出以下核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "快乐先于效率",
                    "meta": [
                      "█████"
                    ],
                    "description": "\"每一克都是快乐\"——不以翻台率为最高 KPI，人们在店里待多久比买多少更重要"
                  },
                  {
                    "title": "人先于利润",
                    "meta": [
                      "█████"
                    ],
                    "description": "疫情期间全额工资、拒绝德基的高客流诱惑"
                  },
                  {
                    "title": "社区先于规模",
                    "meta": [
                      "████"
                    ],
                    "description": "19+ 家店在社区街区而非高端商场，俱乐部活动让陌生人成为邻里"
                  },
                  {
                    "title": "有机先于速度",
                    "meta": [
                      "████"
                    ],
                    "description": "拒绝 VC、自有现金流扩张——增长不是目标，是自然的结果"
                  },
                  {
                    "title": "真实先于包装",
                    "meta": [
                      "████"
                    ],
                    "description": "公开说\"怕增长\"——不装成野心勃勃的创业者，也不装成\"清高不商业\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些价值观不是营销材料，而是每天都在被检验的选择——当一个高客流高利润的商场发出邀请，当封城让门店完全不能营业，当一个 VC 带着让你\"一年开 100 家\"的蓝图找上门——这些时刻，价值观是你拒绝什么，而不是你说了什么。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "门店作为社区锚点",
            "subtitle": "重建消失中的\"第三空间\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 最具公共性的实践，是把面包店变成社区的\"第三空间\"："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "空间定位",
                    "value": "家和工作之外的\"第三个地方\"——可以进来坐坐，不见得必须买东西"
                  },
                  {
                    "label": "功能叠加",
                    "value": "不只是吃面包——可以约朋友、等人、看书、发呆、偶遇邻居"
                  },
                  {
                    "label": "社区嵌入",
                    "value": "每一家店选择在街区而非商场——街区是有人长期生活的地方，商场是有人短期购物的地方"
                  },
                  {
                    "label": "常客生态",
                    "value": "在 19+ 个社区中，Luneurs 逐渐成为\"那个街角的面包店\"——一个你可以说出\"老地方见\"的地点"
                  },
                  {
                    "label": "精神",
                    "value": "不是\"欢迎光临\"的商业笑脸，而是\"你来了\"的邻里问候——两者的区别在于前者把你当顾客，后者把你当人"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"社区据点\"的功能在超级城市中正在消失——便利店替代了小卖部，外卖替代了街坊餐馆，大型商场替代了街区小店。Luneurs 的公共性在于它在对抗这种消失。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "社会学意义：社会学家 Ray Oldenburg 提出的\"第三空间\"概念——一个既不家庭也不工作的、自由社交的公共空间——在现代城市中正在系统性萎缩。咖啡馆变成了\"带着电脑办公\"的地方，面包店变成了\"外卖取餐口\"。Luneurs 试图让面包店重新成为一个你愿意不必做什么也可以待在那里的地方。这种\"允许无所事事\"的低阈值，是所有真正公共空间的基础。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "俱乐部",
            "subtitle": "让陌生人在运动中重新连接",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 的公共性不只是\"有一个空间\"，而是主动创造让陌生人相遇和连接的条件——"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "跑步俱乐部：以面包店为起点和终点，一起在城市中跑步。跑步本身是孤独的，但一群人以同一个目的地为终点的跑步是社交的。终点不是\"跑完就散\"，而是跑进面包店一起吃。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "骑行俱乐部：车轮上的社交。骑行结束后，Luneurs 是自然的聚集点——运动的疲惫、面包的香气、彼此交换的路线和故事。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "攀岩俱乐部：从室内岩壁到面包店的路线——攀岩者是天然的小社群，他们本来就会在攀岩后找一个地方聊刚刚的路线。Luneurs 成为这个\"攀岩后\"的自然延伸。"
                ]
              },
              {
                "type": "preformatted",
                "text": "俱乐部的公共性三阶段：\n\n阶段 1：一个人来参加活动\n└── 以共同兴趣（跑步/骑行/攀岩）为入口——低门槛\n\n阶段 2：在活动中认识新的人\n└── 运动的合作性（一起跑、互相等、分享路线）\n    自然地打破陌生人的隔阂\n\n阶段 3：把 Luneurs 当作\"我们的地方\"\n└── 不是\"我去的面包店\"，而是\"我们跑步队的面包店\"\n    归属感从运动扩散到空间再到品牌"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "俱乐部的公共性逻辑：不是\"我们办活动来吸引顾客\"，而是\"我们提供相遇的条件，然后你们之间的关系自然生长\"。\"俱乐部\"这个词本身就暗示了一种比\"顾客\"更亲密、更持久的关系——你不是来消费一次就走的，你是\"我们俱乐部的人\"。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "疫情期间的公共担当",
            "subtitle": "不只守护自己的人",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "2022 年上海封控期间，Luneurs 做了两件具有公共意义的事："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "全员全额工资：在公司收入骤降的情况下，不把危机转嫁给最脆弱的员工。这不是 CSR，这是对\"我们是谁\"的最终检验——如果你说\"每一克都是快乐\"，而你的员工在疫情中拿不到工资，那\"快乐\"就是谎言。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "保持团队完整：当疫情结束、城市重新开放时，Luneurs 的团队仍在——不需要重新招聘、重新培训、重新建立默契。这意味着 Luneurs 能够比那些裁了员的品牌更快地恢复——不是因为资金更雄厚，而是因为人和人之间的关系没有被打断。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "全额工资",
                    "value": "员工不是可以被丢弃的\"可变成本\"——公司的生存不应该以人的生存为代价"
                  },
                  {
                    "label": "团队保全",
                    "value": "经济韧性不来自资金储备，来自关系储备——当危机过去，还有人跟你一起重新开始"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是英雄主义，是常识的道德：Luneurs 没有把自己的行为包装成\"逆行\"或\"大爱\"——他们只是做了在自己价值观框架内应该做的事。但恰恰是这种\"只是做了应该做的\"的平常心，让它具有公共性——公共性不一定是拯救世界，有时候就是没有抛弃跟你在一起的人。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "公共性实践的三个层次",
            "subtitle": null,
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 的公共性在不同尺度上展开："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "邻里关系：── 面包店作为街区的锚点"
                  },
                  {
                    "label": "层次 2",
                    "value": "社群连接：── 跑步/骑行/攀岩俱乐部让陌生人在共同兴趣中相遇"
                  },
                  {
                    "label": "层次 3",
                    "value": "城市空间政治：── 拒绝高端商场，选择社区街区"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "国际连接",
            "subtitle": "法式传统与上海本地性的融合",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 的\"法式\"不是对巴黎的模仿，而是一种传统的创造性翻译："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "面包店",
                    "meta": [
                      "法国街角的 boulangerie——社区生活的日常基础设施"
                    ],
                    "description": "上海街区中的社区据点——同样的功能，不同的城市肌理"
                  },
                  {
                    "title": "第三空间",
                    "meta": [
                      "法国咖啡馆文化——讨论、阅读、发呆的公共空间"
                    ],
                    "description": "上海的面包店——让中国都市青年有一个\"不需要消费也可以待着\"的地方"
                  },
                  {
                    "title": "慢生活",
                    "meta": [
                      "法式生活的\"慢\"——对效率至上的抵抗"
                    ],
                    "description": "上海语境下的\"怕增长\"和\"另类成长\"——对\"快\"的中国式抵抗"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "Luneurs 不是\"把巴黎搬到上海\"，而是\"在上海发现巴黎早就懂的东西\"——好的面包店首先是社区的空间，然后才是面包的提供者。"
              }
            ]
          },
          {
            "id": "section-6",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 的公共性同样有自己的边界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做 VC 驱动的高速扩张",
                    "value": "规模会杀死空间——100 家店不可能是 100 个真正的社区据点"
                  },
                  {
                    "label": "不做高端商场",
                    "value": "德基的顾客是流动的 shoppers，不是停留的 neighbors"
                  },
                  {
                    "label": "不做标准化的连锁体验",
                    "value": "每家店都不一样——因为每个社区都不一样。标准化是社区感的敌人"
                  },
                  {
                    "label": "不做\"用完即走\"的外卖主导模式",
                    "value": "外卖把面包和空间分离——Luneurs 在卖的不仅是面包，还有待在那个空间里的体验"
                  },
                  {
                    "label": "不把自己的行为包装成\"公益\"",
                    "value": "疫情期间的全额工资不是\"做好事\"——是\"做自己\""
                  }
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "独有贡献",
            "subtitle": "将\"第三空间\"确立为共益企业的核心产品",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，Luneurs 贡献了一种独特的公共性路径："
                ]
              },
              {
                "type": "quote",
                "text": "The third place as core product（第三空间作为核心产品）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "Luneurs 卖的不仅是面包和冰淇淋——它卖的是一个你可以没有目的也可以停留的、可能会遇见认识的人的空间。这不是\"餐饮+社群\"的简单叠加——而是把\"空间\"和\"关系\"提升到与\"产品\"同样重要甚至更重要的地位。"
                ]
              },
              {
                "type": "quote",
                "text": "\"每一克都是快乐\"——快乐不是在面包里，快乐是在这个空间里发生的所有事情的总和。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "面包店在这里不是目的，是媒介。就像阿久的游戏是让陌生人重新连接的媒介，二高的舞蹈是让身体成为公共资源的媒介——Luneurs 的面包是让都市人重新拥有\"一个街角可以去\"的媒介。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 Luneurs 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于Luneurs公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 Luneurs 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/luneurs.md"
      ],
      "sourceLabels": [
        "luneurs.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "mumo": {
    "id": "mumo",
    "profile": {
      "name": "MUMO 木墨"
    },
    "triangleTitle": "MUMO 木墨的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "耐用之物与克制生意",
    "centerSubtitle": "用材料、时间和手艺回应消费",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "对抗一次性消费文化",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "MUMO木墨的创造力起点是对快消式家具工业的系统性拒绝。在2011年创立于温州瑞安时，中国家具市场的主流逻辑是\"规模化生产+低价倾销+快速迭代\"。木墨选择了相反的方向："
                ]
              },
              {
                "type": "quote",
                "text": "\"可以使用很久的物具\"、\"像做给自己一样做给他人\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是简单的\"做好家具\"，而是对\"用完即弃\"消费伦理的彻底质疑。木墨不参与以折扣驱动的消费节（双十一），拒绝用价格战刺激不必要的消费。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "快消式家具逻辑",
                    "value": "不做廉价的、用几年就换的板式家具"
                  },
                  {
                    "label": "电商促销体系",
                    "value": "不参与双十一等折扣驱动的消费节"
                  },
                  {
                    "label": "资本扩张路径",
                    "value": "拒绝融资扩张，15年仅开19家门店"
                  },
                  {
                    "label": "非环保材料",
                    "value": "只用FSC认证的北美硬木+天然木蜡油"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "用\"长久使用\"重新定义了家具的价值",
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "木墨的创造性不在于\"发明新风格\"，而在于把\"耐久性\"从功能属性提升为伦理立场："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "材料选择",
                    "value": "只使用FSC认证的北美硬木（黑胡桃、樱桃木、白橡木）"
                  },
                  {
                    "label": "表面处理",
                    "value": "天然木蜡油而非化学漆——保留木材的呼吸感"
                  },
                  {
                    "label": "设计理念",
                    "value": "\"制作可以使用很久的物具\"——让家具成为可以被继承和修补的对象"
                  },
                  {
                    "label": "生产伦理",
                    "value": "\"像做给自己一样做给他人\"——将工匠的自尊心融入每一个生产环节"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表实践",
            "subtitle": "让创造成为生态系统",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "双手做工",
                    "meta": [
                      "市集"
                    ],
                    "description": "不是简单的销售平台，而是为独立手工艺人搭建的生态系统。支持数百位手工艺人，让他们可以靠手艺生活"
                  },
                  {
                    "title": "识木计划",
                    "meta": [
                      "展览/教育"
                    ],
                    "description": "不是产品展，而是连接木材、工艺与可持续消费的公共教育项目。让消费者理解\"为什么这块木头值这个价\""
                  },
                  {
                    "title": "慢增长门店",
                    "meta": [
                      "零售空间"
                    ],
                    "description": "15年19家店——每家店都是一个可以被\"逛\"的空间，不是流量变现的节点"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "设计方法论",
            "subtitle": null,
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从木墨的实践中，可以提取出几条创造原则："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "材料本身即是表达",
                    "description": "不做过度的造型设计，让木纹、触感、气味自己说话"
                  },
                  {
                    "index": "2",
                    "title": "耐久即伦理",
                    "description": "生产\"可以用很久\"的东西本身就是对消费主义的抵抗"
                  },
                  {
                    "index": "3",
                    "title": "做给自己先于做给市场",
                    "description": "每一件家具先过工匠自己的标准——\"像做给自己一样做给他人\""
                  },
                  {
                    "index": "4",
                    "title": "空间即教育",
                    "description": "门店不是展厅，而是让消费者在触摸和停留中被改变的空间"
                  },
                  {
                    "index": "5",
                    "title": "慢不是缺陷，是选择",
                    "description": "15年19家店不是\"做不大\"，而是\"不想做那么大\""
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "\"双手做工\"",
            "subtitle": "命名即创造",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"双手做工\" 这个名字本身就是一种创造性姿态。它不叫\"手工艺市集\"，不叫\"匠人展\"，而是用最朴素的四个字锚定了整个实践的核心：手作而非机造，劳作而非营销。名字里没有\"品牌\"二字，却比任何品牌话术都更精准地传达了木墨的价值观。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "承认\"做不大\"并以此为傲",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "木墨的故事里有一个反直觉的诚实：15年只开了19家店。在主流商业叙事中，这个数字通常意味着\"失败\"或\"缺乏增长动力\"。但木墨的诚实在于——这恰恰是目标，不是结果。"
                ]
              },
              {
                "type": "quote",
                "text": "15年，仅19家门店——拒绝快速扩张。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "创始人没有把\"慢\"包装成一种缺陷，而是让它成为品牌的脊梁。这种诚实需要的勇气不亚于疯狂扩张——它意味着在所有人都在冲刺的时候，承认自己选择走一条不同的路。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "不参与双十一的经济伦理",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "木墨的经济自洽体现在一个非常具体的决定上：不参与双十一。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "拒绝的",
                    "value": "双十一、打折促销、以价换量"
                  },
                  {
                    "label": "坚持的",
                    "value": "统一定价、不制造虚假紧迫感、不刺激非必要消费"
                  },
                  {
                    "label": "代价",
                    "value": "放弃电商平台流量红利、放弃冲动消费的销售额"
                  },
                  {
                    "label": "收获",
                    "value": "定价体系的内在一致性、消费者对价格的信任、\"反消费主义\"的品牌一致性"
                  },
                  {
                    "label": "核心信念",
                    "value": "好东西不需要打折——降价意味着当初定价不诚实"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种经济伦理的内在自洽在于：如果\"制作可以使用很久的物具\"是核心使命，那么用\"限时折扣\"刺激消费者购买超出需要的物品，在逻辑上是自相矛盾的。 木墨选择了逻辑自洽而非利润最大化。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "市集亏了十几次，继续做",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "木墨的\"双手做工\"市集是一个例证："
                ]
              },
              {
                "type": "quote",
                "text": "Market lost money the first 10+ times, kept doing it anyway."
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是盲目的坚持，而是对长期价值的预判。最初十几次的亏损不是\"失败\"，而是搭建生态系统的必要成本。木墨完全可以用这笔钱投电商广告、开更多店、做更直接的变现——但它选择了\"亏钱养一个手工艺人社群\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种韧性的根基是：知道自己为什么要做这件事，而不是只看到账面上的红字。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "\"像做给自己一样做给他人\"——作为内在锚点的生产伦理",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "这条原则不是一个营销 slogan，而是木墨日常操作的核心理念："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "选材",
                    "value": "如果这块木头自己不会用在家里的餐桌上，就不卖给客户"
                  },
                  {
                    "label": "涂装",
                    "value": "用天然木蜡油而非化学漆——因为自己不想让孩子舔到化学涂层"
                  },
                  {
                    "label": "结构",
                    "value": "不做非必要的装饰——因为自己不想为多余的设计付费"
                  },
                  {
                    "label": "定价",
                    "value": "公平定价而非\"能卖多贵就多贵\"——因为自己不想被宰"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这条原则消除了\"生产端\"和\"消费端\"之间的伦理鸿沟：生产者不需要欺骗消费者，因为生产标准=对自己的标准。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "慢的价值",
            "subtitle": "时间作为盟友而非敌人",
            "kind": "timeline",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "木墨的时间伦理与主流增长叙事形成鲜明对比："
                ]
              },
              {
                "type": "timeline",
                "items": [
                  {
                    "time": "2011",
                    "title": "创立于温州瑞安"
                  },
                  {
                    "time": "2015",
                    "title": "缓慢开设早期门店"
                  },
                  {
                    "time": "2020",
                    "title": "市集逐步形成规模效应，手工艺人社群成型"
                  },
                  {
                    "time": "2026",
                    "title": "15年/19家店 ★ 不参加双十一 ★ 拒绝融资"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "时间伦理特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "不以规模定义成功：19家店在15年后仍然\"够用\"",
                  "允许社群自然生长：市集亏损10+次不放弃——相信它在变好",
                  "拒绝外部资本的时间压力：不融资意味着不需要向投资人解释\"为什么还没上市\"",
                  "深耕而非拓张：15年只做一件事——实木家具和生活方式的慢传播"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "双手做工",
            "subtitle": "为手工艺人建造的基础设施",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"双手做工\"市集不是一个木墨的品牌活动——它是一个独立手工艺人的生态系统："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "定期市集，召集独立手工艺人参展"
                  },
                  {
                    "label": "规模",
                    "value": "支持数百位手工艺人，形成一个相互连接的社群网络"
                  },
                  {
                    "label": "精神",
                    "value": "不是\"品牌市集\"，而是手工艺人自己的活动"
                  },
                  {
                    "label": "门槛",
                    "value": "独立创作者而非批发商——坚守\"双手做的\"核心标准"
                  },
                  {
                    "label": "作用",
                    "value": "让手工艺人可以靠手艺生存——不一定要进大厂或转行"
                  },
                  {
                    "label": "代价",
                    "value": "木墨前10+次办市集都在亏钱"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "支持数百位独立手工艺人——为他们提供可以靠手艺生活的可能性。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"双手做工\"的公共性意义：它不是\"企业社会责任\"式的慈善，而是为一种替代性的经济模式提供土壤。在电商平台垄断流量、资本绑架渠道的时代，一个独立手工艺人很难被看见。木墨用自己的空间、资源和亏损的勇气，为这些人搭建了一个不需要向平台交租金的舞台。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "识木计划",
            "subtitle": "让公众理解\"物\"的价值",
            "kind": "values",
            "blocks": [
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "展览+公共教育项目"
                  },
                  {
                    "label": "内容",
                    "value": "连接木材知识、手工艺过程和可持续消费理念"
                  },
                  {
                    "label": "目标受众",
                    "value": "不只是潜在消费者，而是所有对\"物\"感兴趣的人"
                  },
                  {
                    "label": "核心理念",
                    "value": "如果你知道一块木头从哪里来、谁碰过它、为什么选它，你就不会轻易扔掉它"
                  },
                  {
                    "label": "公共性",
                    "value": "不是产品推销，而是价值观传播——教人\"如何与物共处\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "识木计划的公共教育价值：在消费主义把人训练成\"买了就扔\"的社会里，识木计划做的是一种反向教育——教人重新看见一个物品背后的劳动、材料和故事。这不是关于\"卖更多家具\"，而是关于\"减少不必要的购买\"。这是一种反消费主义的公共行动，以展览和体验为媒介。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "公共性实践的三个层次",
            "subtitle": null,
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "木墨的实践在不同尺度上产生了公共效应："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "消费者与物之间的关系：── 通过\"识木计划\"和材料教育，让人重新理解\"一件家具为什么值这个价\""
                  },
                  {
                    "label": "层次 2",
                    "value": "手工艺人与经济之间的关系：── 通过\"双手做工\"市集，为独立手工艺人提供了可替代的生存路径"
                  },
                  {
                    "label": "层次 3",
                    "value": "社会与消费主义之间的关系：── 通过\"不参加双十一\"、\"拒绝融资\"、\"慢增长\"等系统性选择"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "木墨的公共性有其清晰的边界，这些\"不做\"构成了公共性的硬度："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不参加双十一",
                    "value": "折扣驱动的消费与\"长久使用\"的使命矛盾"
                  },
                  {
                    "label": "不融资扩张",
                    "value": "资本的压力会迫使\"慢\"变成\"快\""
                  },
                  {
                    "label": "不使用非FSC木材",
                    "value": "不可持续的原材料不是\"便宜\"，是\"透支\""
                  },
                  {
                    "label": "不用化学漆",
                    "value": "即使更省成本——\"自己不会给自己用化学漆\""
                  },
                  {
                    "label": "不把\"双手做工\"变成木墨的品牌活动",
                    "value": "市集属于手工艺人，不是木墨的营销工具"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "独有贡献",
            "subtitle": "将\"慢\"确立为一种公共行动的方法论",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的案例中，MUMO木墨贡献了一种\"反增长\"的公共性路径："
                ]
              },
              {
                "type": "quote",
                "text": "\"慢\"不是无能的借口，而是对抗消费主义加速的主动选择。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不参加双十一不是\"不会做生意\"，而是拒绝参与\"制造虚假需求\"的机器。不融资不是\"融不到资\"，而是拒绝被资本时间表绑架。15年19家店不是\"做不大\"，而是证明了一个假设：一个不追求规模的企业，也可以活得很好，也可以支持几百个手工艺人生存，也可以改变几千个消费者对\"物\"的理解。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 MUMO 木墨 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于MUMO 木墨公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 MUMO 木墨 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/mumo.md"
      ],
      "sourceLabels": [
        "mumo.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "pottery_workshop": {
    "id": "pottery_workshop",
    "profile": {
      "name": "乐天陶社"
    },
    "triangleTitle": "乐天陶社的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "让工艺重新成为城市关系",
    "centerSubtitle": "陶艺、市集、驻场与教育的地方连接",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "从香港到景德镇的逆向迁徙",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社的创造力起点是地理与文化上的\"反向流动\"。1985年成立于香港——一个以金融和贸易为核心的城市——却在2005年选择进入景德镇，一个当时被主流叙事视为\"没落的传统手工业城市\"。这不是降级，而是一种创造性的空间选择：把当代陶艺的活力注入千年瓷都，让传统工艺与当代创意碰撞。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "香港的商业逻辑",
                    "value": "不在香港做高端陶瓷生意，而是进入景德镇做社区建设"
                  },
                  {
                    "label": "传统陶瓷的保守叙事",
                    "value": "把景德镇从\"仿古复制产地\"重新定义为\"原创陶瓷发源地\""
                  },
                  {
                    "label": "艺术家孤岛模式",
                    "value": "不做孤立的艺术家工作室，而是建造一个完整的创意生态系统"
                  },
                  {
                    "label": "纯商业市集模式",
                    "value": "周六创意市集要求100%原创，拒绝批发转售"
                  }
                ]
              }
            ]
          },
          {
            "id": "100",
            "title": "发现新可能",
            "subtitle": "周六创意市集的\"100%原创\"规则",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社的周六创意市集不是一个普通的市集——它有一条不可妥协的规则："
                ]
              },
              {
                "type": "quote",
                "text": "100% original required — 每一件在售作品必须是创作者本人的原创。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这个规则的创造性在于：它把\"原创\"从一个模糊的理想变成了一个可操作、可审查、可执行的门槛条件。在景德镇——一个以仿古和拷贝闻名的城市——这条规则等于在说：\"我们不接受景德镇最擅长做的事。\""
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"100%原创\"规则的系统性效应："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "筛选效应",
                    "value": "自动淘汰了批发商、仿制品贩子和非创作者"
                  },
                  {
                    "label": "激励效应",
                    "value": "年轻陶艺家知道\"只有原创才能进场\"——这迫使他们在创作上下真功夫"
                  },
                  {
                    "label": "品牌效应",
                    "value": "周六市集成为\"可以买到真正的原创陶瓷\"的代名词"
                  },
                  {
                    "label": "溢出效应",
                    "value": "原创的氛围带动了整个景德镇的创作生态转型"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表实践",
            "subtitle": "国际艺术家驻场计划",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社的国际艺术家驻场计划是一个双向创造系统："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "输入",
                    "value": "国际陶艺家来到景德镇，接触千年制瓷工艺和材料"
                  },
                  {
                    "label": "输出",
                    "value": "本地陶艺家接触国际当代陶艺的观念和方法"
                  },
                  {
                    "label": "基础设施",
                    "value": "乐天提供工作室空间、窑炉、材料和技术支持"
                  },
                  {
                    "label": "不可替代性",
                    "value": "只有在景德镇才能获得\"在地的陶瓷经验\"——这在任何其他城市都做不到"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是一个\"请外国艺术家来办讲座\"的单向知识传播，而是一个让\"景德镇经验\"成为国际陶艺界不可替代的资源的策略性创造。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创造\"景漂\"——一个无法被复制的文化现象",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社最大的创造不是任何一件陶瓷作品，而是 \"景漂\"这个现象本身。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "定义",
                    "value": "来自全国和全球的年轻陶艺创作者聚集在景德镇生活和创作"
                  },
                  {
                    "label": "规模",
                    "value": "已形成数以万计的\"景漂\"群体"
                  },
                  {
                    "label": "催化剂",
                    "value": "乐天陶社的周六市集、驻场计划和教育工作是景漂生态的核心节点"
                  },
                  {
                    "label": "不可复制性",
                    "value": "这个现象依赖于景德镇千年制瓷的物理基础 + 乐天陶社20年社区耕耘的结合"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "景漂 —— 一个改变了景德镇这座城市的文化现象。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"创造一种现象\"远比\"创造一件作品\"困难——现象意味着无数人的自发参与、城市的空间重组、经济模式的转变和身份认同的重塑。乐天陶社没有\"策划\"景漂，但它创建了景漂的基础设施。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "免费讲座与陶瓷教育",
            "subtitle": "创造知识的公共性",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社长期提供免费讲座和陶瓷教育——这不是营销手段，而是一种创造性的知识分配方式："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "定期免费公开讲座"
                  },
                  {
                    "label": "内容",
                    "value": "陶瓷技术、当代陶艺观念、国际陶瓷趋势"
                  },
                  {
                    "label": "受众",
                    "value": "任何对陶瓷感兴趣的人——不需要报名、不需要交费、不需要\"资格\""
                  },
                  {
                    "label": "效果",
                    "value": "降低了陶瓷知识的获取门槛，让\"想学\"本身就是入场券"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种\"免费\"不是成本控制不了，而是有意识地选择不把知识变成商品。在知识付费盛行的时代，这是一种创造性的拒绝。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "20",
            "title": "诚实面对",
            "subtitle": "20年深耕一个地方",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社在景德镇的20年是一个诚实的尺度："
                ]
              },
              {
                "type": "quote",
                "text": "2005年进入景德镇，至今已超过20年。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在\"风口\"和\"赛道\"话语支配的商业文化中，20年深耕一个地方不是\"高效\"的策略。但正是这种\"低效\"的选择，让乐天陶社拥有了任何\"风口企业\"都无法拥有的东西：在地性。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "时间投入",
                    "value": "20年，不只是一个周期"
                  },
                  {
                    "label": "空间选择",
                    "value": "景德镇——不是上海、不是北京、不是杭州"
                  },
                  {
                    "label": "诚实之处",
                    "value": "承认\"社区建设需要时间\"——不假装可以2年\"引爆\"一个市场"
                  },
                  {
                    "label": "不可替代性",
                    "value": "20年的信任不能速成——手工艺人知道乐天不会跑"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种诚实不是被动的\"没得选\"，而是主动的\"选了这个，就一直做下去\"。"
                ]
              }
            ]
          },
          {
            "id": "2000",
            "title": "内在自洽",
            "subtitle": "创始人个人投资2000万",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社的创始人郑祎个人投资了2000万人民币。这不是一笔\"资本运作\"的投资，而是一笔从自己口袋里掏出来的、不需要向LP汇报的、可以亏掉的钱。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "投资来源",
                    "value": "创始人个人资产"
                  },
                  {
                    "label": "投资金额",
                    "value": "约2000万人民币"
                  },
                  {
                    "label": "投资方式",
                    "value": "不是\"融资\"，是\"投入\"——不需要回报率承诺"
                  },
                  {
                    "label": "投资去向",
                    "value": "空间建设、设备购置、国际驻场计划、免费教育等"
                  },
                  {
                    "label": "内在逻辑",
                    "value": "如果这件事值得做，就不需要等别人来投资——自己先做"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种经济模式的内在自洽在于：用自己的钱支持自己相信的事。没有投资人需要被\"退出策略\"安抚，没有基金需要\"18个月翻倍\"。这意味着乐天陶社可以做一件任何VC投资的企业都不敢做的事：不求回报的长期投入。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "在一个\"没落\"的城市做一件\"过时\"的事",
            "kind": "timeline",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "2005年的景德镇在主流叙事中是一个\"没落的传统手工业城市\"——人口外流、经济不振、陶瓷产业被低价竞争挤压。进入景德镇不是\"抓住风口\"，更像是\"逆风而行\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "20年坚持的韧性来源："
                ]
              },
              {
                "type": "timeline",
                "items": [
                  {
                    "time": "1985",
                    "title": "成立于香港"
                  },
                  {
                    "time": "2005",
                    "title": "进入景德镇 ★ 关键选择"
                  },
                  {
                    "time": "2010",
                    "title": "周六创意市集逐渐成熟，\"景漂\"现象开始出现"
                  },
                  {
                    "time": "2015",
                    "title": "\"景漂\"成为全国性文化现象"
                  },
                  {
                    "time": "2020",
                    "title": "免费讲座和陶瓷教育持续运作"
                  },
                  {
                    "time": "2026",
                    "title": "20年深耕 ★ 从被质疑到被尊敬"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "韧性的根基："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "不是\"坚持信念\"的抽象叙事，而是\"钱是我自己的，时间是我自己的\"的具体自由",
                  "创始人没有上级、没有董事会、没有LP——这意味着不需要为短期业绩辩护",
                  "20年的积累产生了\"你不可能被替代\"的护城河——任何想复制乐天陶社的人必须再花20年"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创始人的自我定位",
            "subtitle": "让渡光环给社区",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "郑祎作为创始人有一个值得注意的特点：她让乐天陶社比她自己更知名。在媒体报道中，\"景漂\"和\"周六市集\"出现的频率远超创始人的个人故事。这不是无心之举，而是一种有意识的自我定位——让社区成为主角，让自己成为背景。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "郑祎不强调个人IP",
                    "value": "不是做\"郑祎的陶艺学校\"，而是做\"乐天陶社\""
                  },
                  {
                    "label": "\"景漂\"而不是\"乐天学员\"",
                    "value": "命名权让渡给社区——他们不是\"乐天的人\"，是\"景德镇的漂\""
                  },
                  {
                    "label": "免费讲座不以\"大师\"冠名",
                    "value": "知识分享去个人化——讲座的价值在内容，不在头衔"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种自我定位本身就是\"身心安顿\"的体现：不需要通过个人崇拜来确认自己的价值。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "免费作为内核",
            "subtitle": "教育不应该是付费墙后面的东西",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社长期坚持免费讲座和免费教育。这在\"知识付费\"的时代是一个反常规的选择："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "免费讲座",
                    "value": "持续多年，对所有人开放"
                  },
                  {
                    "label": "免费逻辑",
                    "value": "陶瓷知识是公共遗产，不应该被变成\"课程产品\""
                  },
                  {
                    "label": "代价",
                    "value": "放弃了知识付费可能带来的收入"
                  },
                  {
                    "label": "收获",
                    "value": "降低了\"景漂\"的入门门槛——一个不富裕的年轻人也能接触到最好的陶艺知识"
                  },
                  {
                    "label": "与使命的一致性",
                    "value": "如果目标是\"让更多人做原创陶瓷\"，那么设置付费墙是逻辑矛盾"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "\"景漂\"现象",
            "subtitle": "一个人改变一座城",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社对公共性的最大贡献不是任何一个具体的项目，而是\"景漂\"这个现象——一个足以改变城市命运的社群运动。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "现象规模",
                    "value": "数以万计的年轻创作者聚集在景德镇"
                  },
                  {
                    "label": "城市改变",
                    "value": "景德镇从\"仿古复制产地\"转变为\"原创手工艺创新之都\""
                  },
                  {
                    "label": "催化机制",
                    "value": "周六创意市集 + 国际驻场计划 + 免费教育 = 一个年轻创作者无法拒绝的生态"
                  },
                  {
                    "label": "经济影响",
                    "value": "陶瓷相关的新经济取代了低端仿制造——餐饮、民宿、材料供应链全面升级"
                  },
                  {
                    "label": "文化影响",
                    "value": "\"景漂\"成为一个可识别的文化标签——景德镇不再只被\"千年瓷都\"的单一定义锚定"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "公共性是指一个人或一个组织，通过自己的行动，让一座城市的叙事被改写。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社没有\"策划\"景漂。但它做了让景漂可以发生的事情：一个可以展示原创作品的市集、一个可以与国际交流的驻场计划、一个可以免费学习的教育体系。当这些条件同时存在时，年轻人自己选择了来——制造了\"漂\"。"
                ]
              }
            ]
          },
          {
            "id": "100",
            "title": "周六创意市集",
            "subtitle": "100%原创作为公共规则",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "周六创意市集的公共性不仅在于\"让年轻人有地方卖东西\"，更在于它建立了一条公共规则，并且坚持执行。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "规则",
                    "value": "100%原创作品，禁止批发转售"
                  },
                  {
                    "label": "执行",
                    "value": "不是\"倡议\"，是\"不符合就别来\"的门槛"
                  },
                  {
                    "label": "公共效应",
                    "value": "创造了一个\"可以信任\"的交易空间——买家不用担心买到义乌货"
                  },
                  {
                    "label": "示范效应",
                    "value": "其他市集开始模仿\"原创审查\"机制"
                  },
                  {
                    "label": "批评",
                    "value": "有人认为门槛太高——但乐天没有因为批评而降低标准"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "100%原创规则是公共性的硬核表达：公共性不是\"谁都欢迎\"，而是\"我们选择站在哪一边\"——乐天选择站在原创者一边，即使这意味着拒绝了一部分卖家。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "国际连接",
            "subtitle": "让景德镇重新进入全球对话",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社的国际艺术家驻场计划和国际交流，创造了一个双向的公共通道："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "国际 → 景德镇",
                    "value": "全球陶艺家把当代观念、技术和方法带入景德镇"
                  },
                  {
                    "label": "景德镇 → 国际",
                    "value": "景德镇的材料、工艺和文化通过驻场艺术家传播到全球陶艺界"
                  },
                  {
                    "label": "公共性",
                    "value": "景德镇不再是\"中国的陶瓷博物馆\"，而是\"全球陶瓷创新的现场\""
                  },
                  {
                    "label": "长期效应",
                    "value": "国际艺术家回国后成为景德镇的传播者——不需要乐天花推广费"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"文化输出\"的国家叙事，而是创作者之间的横向连接——一个美国陶艺家和一个景德镇师傅在同一个工作室里聊天，这才是真正的交流。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "免费讲座与陶瓷教育",
            "subtitle": "知识的公共化",
            "kind": "contribution",
            "blocks": [
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "持续年限",
                    "value": "20年"
                  },
                  {
                    "label": "费用",
                    "value": "免费"
                  },
                  {
                    "label": "内容范围",
                    "value": "技术、观念、趋势——陶瓷相关的所有知识"
                  },
                  {
                    "label": "公共性意义",
                    "value": "在\"知识付费\"成为常态的时代，坚持\"知识应该是免费的\""
                  },
                  {
                    "label": "不可替代性",
                    "value": "一个年轻陶艺人如果没钱上培训班，至少还能来听免费的讲座"
                  },
                  {
                    "label": "系统效应",
                    "value": "降低了景德镇作为一个\"学习场所\"的进入门槛——吸引更多人成为\"景漂\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "免费讲座不是慈善，是公共基础设施。就像公园和路灯一样，它的存在改变了整个城市的可及性。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "公共性实践的三个层次",
            "subtitle": null,
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社的实践在不同尺度上产生了公共效应："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "创作者与创作者之间：── 周六市集让原创者们彼此看见、相互竞争、相互激励"
                  },
                  {
                    "label": "层次 2",
                    "value": "创作者与城市之间：── \"景漂\"让景德镇从一个手工业城市变成一个创意城市"
                  },
                  {
                    "label": "层次 3",
                    "value": "城市与世界之间：── 国际驻场计划让景德镇重新进入全球陶艺对话"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "乐天陶社的公共性有明确的边界，这些\"不做的事\"定义了它的硬度："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不降低100%原创标准",
                    "value": "即使有压力——原创是底线，不是口号"
                  },
                  {
                    "label": "不把免费教育变成知识付费",
                    "value": "即使可以盈利——教育是基础设施，不是产品"
                  },
                  {
                    "label": "不依靠政府拨款",
                    "value": "独立资金来源（创始人个人投资+运营收入）保持自主性"
                  },
                  {
                    "label": "不把国际驻场变成\"旅游项目\"",
                    "value": "是严肃的创作交流，不是文化观光"
                  },
                  {
                    "label": "不离开景德镇",
                    "value": "即使其他城市提供更好的条件——在地性是核心"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "独有贡献",
            "subtitle": "将\"城市\"确立为创意实践的画布",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的案例中，乐天陶社贡献了一种独特的方法论："
                ]
              },
              {
                "type": "quote",
                "text": "一个组织可以通过持续在特定城市构建创意基础设施，改变整座城市的叙事和经济。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这超越了\"做公益\"或\"做企业社会责任\"的层面。乐天陶社没有做\"陶瓷慈善\"，它做的是\"让景德镇成为一个年轻人愿意来、可以创作、能够生存的城市\"。这种公共性是结构性的，不是补充性的——它改变的不是一个社区里的几个人的命运，而是整个城市对于\"自己可以是什么\"的想象。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 乐天陶社 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于乐天陶社公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 乐天陶社 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/pottery_workshop.md"
      ],
      "sourceLabels": [
        "pottery_workshop.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "rect_repair": {
    "id": "rect_repair",
    "profile": {
      "name": "阿久、天琦 / 修四边形"
    },
    "triangleTitle": "阿久、天琦 / 修四边形的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "Game as social fabric",
    "centerSubtitle": "游戏作为社会连接的织造术",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "从电子游戏出走",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "阿久的创造力起点是系统性的拒绝。在互娱大厂做电子游戏时，她看到的不只是个人的职业倦怠，而是整个媒介范式的困境："
                ]
              },
              {
                "type": "quote",
                "text": "\"它太赚钱了，被太多东西绑架了。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"做一个更好的电子游戏\"的改良冲动，而是对\"电子游戏=游戏\"这一单一叙事的彻底质疑。她选择离开的不仅是公司，更是整个被资本绑架的电子游戏工业。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "大厂职业路径",
                    "value": "2023年主动离开互娱大厂，放弃高薪稳定"
                  },
                  {
                    "label": "电子游戏媒介",
                    "value": "不选择\"做更好的电子游戏\"，而是直接离开这个媒介"
                  },
                  {
                    "label": "线性成功学",
                    "value": "不追求 VC、不追求规模、不追求快速变现"
                  },
                  {
                    "label": "当代艺术体制",
                    "value": "不被 gallery 绑架，不做\"观念艺术\"式的自上而下表达"
                  }
                ]
              }
            ]
          },
          {
            "id": "pervasive-game",
            "title": "发现新可能",
            "subtitle": "Pervasive Game 的转向",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "转折点：2024年参加雅典 Trust in Play camp（European School of Game Design）。"
                ]
              },
              {
                "type": "quote",
                "text": "\"发现其实游戏在很多其他领域，它其实可以再跟很多东西进行交互的。然后我可能发现，诶，玩还是特别好玩，就 play 还是一个特别好的东西。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "她把\"玩\"从电子屏幕中解放出来，放进真实世界——街道、俱乐部、办公室、高铁、美术馆。这是一种媒介层面的创造：不是改良旧媒介，而是发明新的游戏发生方式。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "理论根基：阿久引用了学术著作《Pervasive Games》，将实践放在一个更广阔的谱系中："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "LARP（实况角色扮演）",
                    "meta": [
                      "参与者在现实空间中扮演角色"
                    ],
                    "description": "Club with no entry、Dancefloor Assassination"
                  },
                  {
                    "title": "ARG（另类现实游戏）",
                    "meta": [
                      "侵入现实的解谜叙事"
                    ],
                    "description": "京都ARG、美术馆无限流解谜"
                  },
                  {
                    "title": "城市游戏",
                    "meta": [
                      "以城市为游戏板的竞技"
                    ],
                    "description": "Warp and Weft、冲进黑夜尽头"
                  },
                  {
                    "title": "街头游戏",
                    "meta": [
                      "利用公共空间的即兴规则"
                    ],
                    "description": "高铁暗杀作家游戏"
                  },
                  {
                    "title": "怪体育",
                    "meta": [
                      "规则异常的体育竞技"
                    ],
                    "description": "VJ大战"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "把新可能带进现实",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "Warp and Weft",
                    "meta": [
                      "街头竞技",
                      "2024"
                    ],
                    "description": "只用一根16米绳子，让城市的所有物体成为游戏资源——栏杆=顶点，路人=队友。最小干预，最大涌现"
                  },
                  {
                    "title": "冲进黑夜尽头",
                    "meta": [
                      "百人城市追逐",
                      "2024.10"
                    ],
                    "description": "100人在上海夜晚从新天地逃到终点，僵尸传染机制。让熟悉的街区变得陌生"
                  },
                  {
                    "title": "Dancefloor Assassination",
                    "meta": [
                      "LARP",
                      "2024"
                    ],
                    "description": "在真实舞池里发生的暗杀游戏，把俱乐部变成剧场"
                  },
                  {
                    "title": "第一届网络视频VJ大战",
                    "meta": [
                      "线上+线下竞技",
                      "2025.03"
                    ],
                    "description": "只能用互联网已有的视频做VJ素材——把\"curation\"变成竞技，把技术正统抛到窗外"
                  },
                  {
                    "title": "办公室暗杀游戏",
                    "meta": [
                      "一周长线渗透",
                      "—"
                    ],
                    "description": "嫁接在真实工作流上（微信、OA、合同、电梯），让100+员工（含老板）被游戏规则重新组织"
                  },
                  {
                    "title": "HTML Day 2026",
                    "meta": [
                      "线下聚会",
                      "2026"
                    ],
                    "description": "在上海一起写网页——技术作为一种社交媒介"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "设计方法论",
            "subtitle": "八条创造原则",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从播客和实践中，可以提取出阿久与修四边形的创造方法论："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "真实现场不可替代",
                    "description": "游戏寄生在真实事件上——真演出、真团建、真派对。不建造模拟环境"
                  },
                  {
                    "index": "2",
                    "title": "message 是涌现的，不是预设的",
                    "description": "不从\"想表达什么\"出发，而是搭舞台让玩家自己产生情感和思考"
                  },
                  {
                    "index": "3",
                    "title": "Design 是骨架，涌现是血肉",
                    "description": "规则保证游戏\"能玩完\"，涌现保证游戏\"超乎想象\""
                  },
                  {
                    "index": "4",
                    "title": "规则是媒介，不是包装",
                    "description": "把表达放在规则里——玩家在遵守规则的过程中，自然体会到设计者的意图"
                  },
                  {
                    "index": "5",
                    "title": "Playtest 是独特优势",
                    "description": "直接看到人们怎么玩然后修正——经验主义的设计方法"
                  },
                  {
                    "index": "6",
                    "title": "production cycle 要短",
                    "description": "电子游戏动辄数年 = 盲信；短周期 = 更多迭代 = 更接近真实"
                  },
                  {
                    "index": "7",
                    "title": "灵光一闪是可以训练的手艺",
                    "description": "品味（看过好的） + 预判（想象现场越准，成功率越高）"
                  },
                  {
                    "index": "8",
                    "title": "管杀不管埋",
                    "description": "只给\"要做什么\"，不给\"怎么做\"——让玩家 leverage 整个生活世界的行动能力"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "\"修\"而非\"造\"",
            "kind": "quote",
            "blocks": [
              {
                "type": "quote",
                "text": "\"修不了四边形，没有这个能力重建一个现实世界。\" —— Tianqi \"修这个字比较有美感吧。\" —— Joanna"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "修四边形的名字本身就是一种创造性姿态：不是带着蓝图去建造一个新世界（那是技术乌托邦的傲慢），而是用手头已有的材料（上海的街道、商场、俱乐部、办公室、微信群）去撬动和变形。这种姿态同时是谦逊的（\"造不了\"）和激进的（\"撬开\"）。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "承认\"电子阳痿\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "阿久的故事起点并非英雄式的觉醒，而是一种诚实的疲惫："
                ]
              },
              {
                "type": "quote",
                "text": "\"当时不是刚从大厂离职，觉得电子游戏已经没有什么特别，就觉得特别绝望，又加上这个电子阳痿，又加上被大厂折磨，觉得电子游戏没啥意思。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"电子阳痿\"是一个极其诚实的自我诊断——不美化、不回避、不把职业危机包装成英雄叙事。她承认自己热爱的媒介让她失望了，承认自己被大厂消耗了，承认自己不知道该往哪里去。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种诚实是\"身心安顿\"的前提：如果不承认自己在哪里受了伤，就不可能找到治愈的路。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "交叉补贴的经济伦理",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "阿久没有选择\"要么赚钱、要么纯粹\"的二元对立，而是找到了一条交叉补贴的中间道路："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "主要收入来源",
                    "value": "商业设计项目（NIKE等）、贴纸/merch销售、活动门票"
                  },
                  {
                    "label": "免费/低利润活动",
                    "value": "茶水间聚会、街头游戏、Game Jam——全部免费"
                  },
                  {
                    "label": "经济逻辑",
                    "value": "商业项目养独立创作——\"够做下一件事\"即可"
                  },
                  {
                    "label": "拒绝的资本",
                    "value": "大厂高薪、VC投资"
                  },
                  {
                    "label": "利润率定位",
                    "value": "不追求利润最大化，追求可持续的创作自由"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种经济模式的内在自洽在于：她知道自己需要多少钱、为什么需要这些钱、以及她不愿意为钱付出什么代价。商业项目不是\"妥协\"，而是让独立创作得以持续的条件；独立创作不是\"逃避\"，而是商业技能被用在真正相信的事情上。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "参考对象：阿久明确提到纽约创意集体 MSCHF——\"又做有 message 的艺术项目，同时还是 toC 的，不需要被当代艺术绑架……同时也卖包。\"这是一种在经济上自洽、在创作上不弯腰的姿态。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "反加速的时间伦理",
            "kind": "timeline",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从2023年离开大厂到2026年，3年时间——没有追求VC、规模或快速变现，而是逐步积累："
                ]
              },
              {
                "type": "timeline",
                "items": [
                  {
                    "time": "2023",
                    "title": "离开互娱大厂"
                  },
                  {
                    "time": "2024",
                    "title": "Trust in Play camp (雅典) ★ 转折点"
                  },
                  {
                    "time": "2025",
                    "title": "3月 第一届网络视频VJ大战"
                  },
                  {
                    "time": "2026",
                    "title": "3月 全球 Game Jam"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "时间伦理特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "项目制而非增长制：不是\"越做越大\"，而是\"做完一个再做一个\"",
                  "容忍不确定性：茶水间从\"不小心来了一百多人\"到稳定运行——没有预设目标，允许自然生长",
                  "身份流动性：从大厂设计师→媒体艺术家→游戏设计师→VTuber→社群组织者——不把自己锁死在单一身份里"
                ]
              }
            ]
          },
          {
            "id": "vtuber",
            "title": "身份转换",
            "subtitle": "VTuber 引退的自我诚实",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "2026年4月，阿久引退了自己的 VTuber 身份\"阿久aku\"。这不是失败，而是知道自己什么阶段需要什么身份的自我觉知。修四边形持续运作，但 VTuber 身份已完成其使命——一种干净的、不需要解释的告别。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在15个案例的价值观热力图中，阿久的五个核心价值观均达到高强度："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "人先于利润/数字",
                    "meta": [
                      "████"
                    ],
                    "description": "离开大厂、免费活动、拒绝\"更赚钱\"的路径"
                  },
                  {
                    "title": "真实先于表演",
                    "meta": [
                      "█████"
                    ],
                    "description": "茶水间分享\"半成品\"、面对面街头游戏、不包装"
                  },
                  {
                    "title": "自由先于安全",
                    "meta": [
                      "█████"
                    ],
                    "description": "离职、实验性创作、不确定的社群运营"
                  },
                  {
                    "title": "边缘先于中心",
                    "meta": [
                      "████"
                    ],
                    "description": "在\"街道\"而非\"美术馆\"做游戏"
                  },
                  {
                    "title": "关系先于交易",
                    "meta": [
                      "█████"
                    ],
                    "description": "免费茶水间、game as social fabric"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些价值观不是宣言，而是每天在做的事情——当阿久选择免费开放茶水间、选择在街头而非美术馆做游戏、选择分享\"不完美的半成品\"时，她在用行动而非言语兑现这些价值。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "茶水间",
            "subtitle": "为创作者建造的基础设施",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "茶水间是阿久和修四边形运营的定期游戏创作者聚会——它不是一个\"项目\"，而是一个平台："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "定期 meetup，创作者分享\"半成品\""
                  },
                  {
                    "label": "规模",
                    "value": "从\"不小心来了一百多人\"（小红书256赞）到稳定运行"
                  },
                  {
                    "label": "精神",
                    "value": "分享过程而非成品，降低参与门槛"
                  },
                  {
                    "label": "门槛",
                    "value": "不是展览/讲座——不用\"准备好\"才能来，带着半成品就可以"
                  },
                  {
                    "label": "作用",
                    "value": "连接上海独立游戏/创意技术/艺术亚文化圈层"
                  },
                  {
                    "label": "费用",
                    "value": "免费"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"想让创作者们来讲自己最近在做的东西。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "茶水间的公共性意义：它让上海的独立游戏创作者有了一个可以彼此看见、彼此连接的空间。在商业游戏工业之外，在当代艺术体制之外，在学术圈之外——一个属于创作者自己的\"第三空间\"。它是让别人的创造得以发生的基础设施。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "街头游戏",
            "subtitle": "让陌生人重新连接",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "阿久的 pervasive game 本质上是公共空间的重新激活："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "Warp and Weft：两个陌生人因为一根绳子被迫协作。栏杆不再是栏杆，是顶点；路人不再是路人，是队友。游戏让人重新\"阅读\"城市。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "冲进黑夜尽头：100人在上海夜晚奔跑，僵尸传染机制让失败者变成追捕者——没有\"出局\"，只有身份的转换。玩家反馈说：\"他生活在这片区域，这个街区对他很熟，但他玩了这个游戏，觉得这个街道又很陌生。\"游戏让人重新感知自己生活的城市。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "Club with No Entry：让玩家不买票混入俱乐部——不是教人逃票，而是让隐形的权力结构（VIP名单、门口歧视、消费主义势利）变得可见。真外卖员的意外闯入成为整个实践的完美隐喻：现实比设计更丰富，设计师要做的不是控制，而是创造让现实戏剧性自然涌现的框架。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "关系重建的三个层次",
            "subtitle": null,
            "kind": "relation-levels",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "阿久的实践在不同尺度上重建了人与人的连接："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "玩家与玩家之间：── 街头游戏中陌生人被迫协作、结盟与背叛、谈判"
                  },
                  {
                    "label": "层次 2",
                    "value": "创作者与创作者之间：── 茶水间去中心化的 peer community"
                  },
                  {
                    "label": "层次 3",
                    "value": "人与城市之间：── 通过游戏重新感知和使用公共空间"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "国际连接",
            "subtitle": "游戏作为世界语言",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "阿久的实践不是封闭的本地社群，而是有意识地连接国际："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "雅典 → 上海",
                    "meta": [
                      "输入"
                    ],
                    "description": "Trust in Play camp 带来 pervasive game 的视野"
                  },
                  {
                    "title": "上海 → 纽约",
                    "meta": [
                      "输出"
                    ],
                    "description": "实时传真机、游戏交换"
                  },
                  {
                    "title": "全球 Game Jam",
                    "meta": [
                      "双向"
                    ],
                    "description": "2026年3月，连接国际独立游戏社群"
                  },
                  {
                    "title": "MSCHF",
                    "meta": [
                      "参照"
                    ],
                    "description": "纽约创意集体的模式作为修四边形的参考"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "阿久的公共性不是无差别的。她明确不做什么，这些\"不做\"恰恰定义了公共性的边界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做纯电子游戏",
                    "value": "电子游戏\"太赚钱了，被太多东西绑架了\""
                  },
                  {
                    "label": "不做被 gallery 绑架的\"当代艺术\"",
                    "value": "尽管在美术馆做过项目，但不被体制收编"
                  },
                  {
                    "label": "不做 gamification 式的\"套皮游戏\"",
                    "value": "\"没有利用游戏这个媒介\"——规则是媒介，不是包装"
                  },
                  {
                    "label": "不做大规模复制",
                    "value": "每一个游戏都是 site-specific，依赖具体的城市肌理"
                  },
                  {
                    "label": "不做中国的 Mr. Beast",
                    "value": "\"他的游戏其实设计得很差\""
                  }
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "独有贡献",
            "subtitle": "将\"游戏\"确立为公共行动的方法论",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，阿久/修四边形贡献了一种尚未被充分命名的方法论："
                ]
              },
              {
                "type": "quote",
                "text": "Game as social fabric（游戏作为社会连接的织造术）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是 gamification（套皮游戏化）——给大富翁套一个环保主题；而是让规则本身成为媒介，玩家在遵守规则的过程中自然体会到设计者的意图。办公室暗杀游戏中\"必须让同事在合同里偷偷加上'修四边形'三个字\"——这个规则本身就是对职场沟通荒诞性的表达。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "Tianqi 的总结："
                ]
              },
              {
                "type": "quote",
                "text": "\"游戏设计它很难不去想象玩家，你很难不去跟真实世界和这些玩家有联系……它都会让你觉得跟这世界有联系。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是关于\"做游戏\"，而是关于通过游戏保持与世界的联系。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 阿久、天琦 / 修四边形 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于阿久、天琦 / 修四边形公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 阿久、天琦 / 修四边形 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/rect_repair.md"
      ],
      "sourceLabels": [
        "rect_repair.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "sailor_club": {
    "id": "sailor_club",
    "profile": {
      "name": "水手俱乐部"
    },
    "triangleTitle": "水手俱乐部的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "围绕玩的创造者社区",
    "centerSubtitle": "以食物、材料和游戏连接日常经验",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "\"玩\"作为创作方法",
            "subtitle": null,
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部的创造力起点不是\"做什么\"，而是\"怎么玩\"。它的核心主张是将\"玩\"确立为一种严肃的创作方法——不是用创作取代玩，而是让玩本身就是创作。"
                ]
              },
              {
                "type": "quote",
                "text": "食物、材料、游戏——日常经验就是创作入口。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种方法的独特性在于：它不区分创作者和参与者。在 workshop 中，每个人都在\"玩\"，而正是在玩的过程中，新的表达和连接自然涌现。\"玩\"消解了\"专业创作者\"与\"普通参与者\"之间的壁垒。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "食物",
                    "value": "以食物为媒介的工作坊——味觉、触觉、分享都是创作"
                  },
                  {
                    "label": "材料",
                    "value": "手工材料——身体与物质世界的直接互动"
                  },
                  {
                    "label": "游戏",
                    "value": "游戏机制——规则内的自由、集体性的创造"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "跨媒介实践",
            "subtitle": "工作坊 + 展览 + 播客",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部不局限于单一媒介，而是将三种形式编织在一起："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "工作坊（Workshop）",
                    "meta": [
                      "核心创作场域"
                    ],
                    "description": "参与式、动手做、体验式——创作发生在\"一起做\"的过程中"
                  },
                  {
                    "title": "展览（Exhibition）",
                    "meta": [
                      "成果展示与公共表达"
                    ],
                    "description": "将工作坊的成果转化为可观看、可进入的空间叙事"
                  },
                  {
                    "title": "播客（Podcast）",
                    "meta": [
                      "连接人与日常经验"
                    ],
                    "description": "以声音媒介延展对话，将现场的\"玩\"转化为可传播的叙事"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种跨媒介实践与修四边形的方法论有相似的底层逻辑：不是改良旧媒介，而是在媒介之间创造新的连接方式。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "\"水手\"之名",
            "subtitle": "命名即姿态",
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"水手\"（Sailor）——旅程、探索、流动性。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "命名本身就是一种创造性的自我定位："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "旅程",
                    "value": "不是抵达某个终点，而是持续在路上的状态"
                  },
                  {
                    "label": "探索",
                    "value": "不预设结果，允许发现未知"
                  },
                  {
                    "label": "流动性",
                    "value": "不被固定身份、固定场所、固定形式束缚"
                  },
                  {
                    "label": "俱乐部",
                    "value": "不是机构、不是品牌——是一个大家\"在一起\"的空间"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这与修四边形\"修而非造\"的命名逻辑形成了有趣的对照：修四边形强调的是修补与撬动，水手俱乐部强调的是航行与发现。两种姿态都是对\"建造/生产\"范式的替代。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "与修四边形的方法论共鸣",
            "subtitle": null,
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部与修四边形在三个维度上共享价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "游戏",
                    "meta": [
                      "pervasive game——让游戏侵入真实世界"
                    ],
                    "description": "\"玩\"作为创作方法——让创作变成游戏"
                  },
                  {
                    "title": "社群",
                    "meta": [
                      "茶水间——为创作者建造的基础设施"
                    ],
                    "description": "工作坊——在共同制作中形成社群"
                  },
                  {
                    "title": "公共空间",
                    "meta": [
                      "街头游戏——重新激活城市公共空间"
                    ],
                    "description": "城中村实践——在边缘空间创造连接"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "两者的共同信念：通过\"玩\"，在日常生活的缝隙中打开新的可能性。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "在城中村安身",
            "subtitle": "边缘作为位置",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部扎根于广州康乐村（Kangle Village），一个典型的城中村（urban village）。这不是\"找不到更好的地方\"，而是一种有意识的空间选择。"
                ]
              },
              {
                "type": "quote",
                "text": "在城市的缝隙中工作，本身就是一种立场。"
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "经济自洽",
                    "value": "城中村的生活成本允许实验性的、不以盈利为首要目标的创作"
                  },
                  {
                    "label": "边缘视角",
                    "value": "不在CBD、不在创意园区——从边缘观察和参与城市"
                  },
                  {
                    "label": "真实生活",
                    "value": "城中村是日常生活密度最高的空间——食物、材料、人，都是创作资源"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "吉一·青造社作为水手俱乐部的实体据点，不是一个\"工作室\"或\"展厅\"，而是一个让\"玩\"和\"做\"可以持续发生的地方。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "共同制作中的归属感",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"连接人和日常经验\"——实践本身就是归属感的来源。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部的\"身心安顿\"不是通过独处或自我修炼实现的，而是在共同制作的过程中自然生成的："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "一起做食物 → 分享味觉经验 → 建立了超越语言的连接",
                  "一起做手工 → 身体的共同在场 → 沉默中的彼此陪伴",
                  "一起玩游戏 → 规则中的自由 → 笑声中的彼此接纳"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种归属感不依赖于宣言或身份标签，而是在具体的\"做\"中自然编织而成。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "\"玩\"作为自我修复",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在一个以生产力和效率为衡量标准的社会里，\"玩\"常常被视为无用之事。水手俱乐部坚持\"玩\"的正当性，这本身就是一种对功利主义时间伦理的抵抗："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "效率至上",
                    "value": "不追求\"产出\"，只追求\"玩得尽兴\""
                  },
                  {
                    "label": "专业壁垒",
                    "value": "食物、手工、游戏——不需要专业训练就可以参与"
                  },
                  {
                    "label": "社交表演",
                    "value": "不需要\"认识人\"或\"建立人脉\"，一起做就够了"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "游戏 × 社群 × 公共空间",
            "subtitle": "三维公共参与",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部的公共性建立在三个维度的交织上："
                ]
              },
              {
                "type": "preformatted",
                "text": "游戏\n        /  \\\n       /    \\\n      /      \\\n     /  水手  \\\n    /  俱乐部   \\\n   /            \\\n  /              \\\n社群 ────────────── 公共空间"
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "游戏",
                    "value": "\"玩\"是普世的语言——不设门槛，任何人都可以参与"
                  },
                  {
                    "label": "社群",
                    "value": "工作坊不是单向教学，而是所有人一起创造——去中心化的共同在场"
                  },
                  {
                    "label": "公共空间",
                    "value": "城中村、街道、社区——在真实的城市肌理中，而非封闭的白盒子空间"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "在日常材料中连接彼此",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部选择食物、材料、游戏作为媒介——这些是所有人都拥有经验的东西："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "食物：每个人都吃东西，都有关于食物的记忆和感受",
                  "材料：手工材料是触觉的、直觉的，不需要翻译",
                  "游戏：规则足够简单，所有人都可以立刻进入"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种\"低门槛\"不是妥协，而是公共性的前提：只有当参与不需要特殊知识或身份时，公共空间才真正向所有人敞开。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "广州替代性创意生态的一环",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部不是孤立的实践，而是广州替代性创意生态系统的一部分："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "二高表演",
                    "value": "同在广州，以身体和表演探索城市与身份"
                  },
                  {
                    "label": "绣绣故事会",
                    "value": "以叙事和手工连接社区"
                  },
                  {
                    "label": "时代美术馆",
                    "value": "广州当代艺术的重要节点"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这个生态系统共享一种气质：在小尺度上深耕，在日常中创造，在边缘处连接。——不以规模或声量为目标，而是以关系的密度和质量为目标。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "媒体可见性",
            "subtitle": "界面新闻的报道",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "水手俱乐部被界面新闻（Jiemian News）报道，这意味着其实践获得了公共媒体的注目。这不是\"出圈\"的刻意操作，而是实践本身的公共性自然吸引了外部的目光——当你在城中村认真做食物、做手工、带人玩游戏，这件事本身就具有足够的叙事力量。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 水手俱乐部 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于水手俱乐部公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 水手俱乐部 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/sailor_club.md"
      ],
      "sourceLabels": [
        "sailor_club.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "smart_air": {
    "id": "smart_air",
    "profile": {
      "name": "Smart Air / 聪明空气"
    },
    "triangleTitle": "Smart Air / 聪明空气的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "人人负担得起的洁净空气",
    "centerSubtitle": "用低成本硬件和开放知识回应公共健康",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "用风扇拆解整个行业的暴利逻辑",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 的创造力起点是一个极简的技术洞察：清洁空气不需要昂贵的机器，风扇 + HEPA 滤网就够了。"
                ]
              },
              {
                "type": "quote",
                "text": "空气净化器行业的利润率高达 50-80%，而 Smart Air 只留 15-20%。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"做一个更便宜的空气净化器\"的打折策略，而是对整个行业定价逻辑的根本性质疑。空气净化器不是奢侈品——它关乎人的健康。当行业用品牌溢价、渠道溢价、营销溢价把一台简单的机器炒到几千甚至上万元时，Smart Air 选择了一条系统性的拒绝路径："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "行业暴利逻辑",
                    "value": "行业 50-80% 利润率，Smart Air 坚持 15-20%——拒绝把健康变成奢侈品"
                  },
                  {
                    "label": "技术神秘化叙事",
                    "value": "不用复杂的参数、专利话术、黑科技包装来唬人——风扇+滤网的原理任何人都能理解"
                  },
                  {
                    "label": "VC 资本逻辑",
                    "value": "拒绝 VC 投资——投资人要求他们把价格提高到 1000 元以上，他们说不"
                  },
                  {
                    "label": "电商促销节奏",
                    "value": "拒绝 618、双十一等电商大促——不参与\"先涨价再打折\"的价格游戏"
                  },
                  {
                    "label": "壁垒式商业模式",
                    "value": "不靠专利、不靠独家技术来建立护城河——开放知识，任何人可以复制"
                  }
                ]
              }
            ]
          },
          {
            "id": "diy",
            "title": "发现新可能",
            "subtitle": "DIY 与开放知识作为商业模式",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "转折点：2013 年，Thomas Talhelm 在北京，作为一个研究心理学的研究生，面对空气污染，他没有像大多数人一样去买一台昂贵的空气净化器，而是自己动手做了一个。"
                ]
              },
              {
                "type": "quote",
                "text": "一台风扇 + 一张 HEPA 滤网 + 一根绑带 = 一台有效的空气净化器。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这个 DIY 方案不是穷人的权宜之计，而是一种全新的商业范式——不是藏着掖着让你买我的产品，而是把原理和做法全部公开，让你自己选择："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "公开所有测试数据",
                    "value": "用模糊的\"净化率 99%\"替代具体数据"
                  },
                  {
                    "label": "告诉你可以自己做",
                    "value": "暗示不买品牌机就会有健康风险"
                  },
                  {
                    "label": "15-20% 的透明利润",
                    "value": "50-80% 的不透明利润"
                  },
                  {
                    "label": "举办 800+ 场免费科普讲座",
                    "value": "把\"教育消费者\"等同于\"说服你买\""
                  },
                  {
                    "label": "数据驱动的诚实沟通",
                    "value": "营销驱动的恐吓或神化"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "理论意义：Smart Air 证明了知识开放不是牺牲商业利益，而是建立信任的竞争优势。当整个行业在用信息不对称赚钱时，消除信息不对称本身就是一种商业模式——一种更可持续、更有伦理感的商业模式。"
                ]
              }
            ]
          },
          {
            "id": "diy",
            "title": "代表作品",
            "subtitle": "从 DIY 到产品线的创造力演化",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "DIY 1.0 风扇+滤网",
                    "meta": [
                      "开源方案原型"
                    ],
                    "description": "把空气净化从\"买\"变成\"做\"——任何人都可以用几十元获得洁净空气"
                  },
                  {
                    "title": "The Blast",
                    "meta": [
                      "自主产品"
                    ],
                    "description": "高性价比的成品净化器，仍然是市场价格的一半以下——\"如果你不想 DIY，我们有做好的\""
                  },
                  {
                    "title": "The Sqair",
                    "meta": [
                      "自主产品"
                    ],
                    "description": "进一步降低门槛——更便宜、更简单的设计，让更多普通人负担得起"
                  },
                  {
                    "title": "开放数据测试",
                    "meta": [
                      "知识基础设施"
                    ],
                    "description": "持续发布不同环境、不同机器的 PM2.5 实测数据——不是\"我们最好\"的广告，而是\"数据和盘托出\"的诚实"
                  },
                  {
                    "title": "800+ 场科普讲座",
                    "meta": [
                      "公共教育模式"
                    ],
                    "description": "在中国、印度、菲律宾、蒙古等多个国家举办免费科学讲座——教育不是营销漏斗，而是目的本身"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创造方法论",
            "subtitle": "八条创造原则",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从 Smart Air 的实践中可以提取出其创造方法论："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "简单即正义",
                    "description": "最有效的方案往往是最简单的。风扇+滤网——不需要传感器、不需要 App、不需要\"人工智能净化\""
                  },
                  {
                    "index": "2",
                    "title": "透明即信任",
                    "description": "公开成本结构、公开利润率、公开测试数据——透明不需要营销，透明本身就是营销"
                  },
                  {
                    "index": "3",
                    "title": "开放式创新",
                    "description": "知识不藏着掖着。任何人都可以复制 DIY 方案——这非但没有削弱 Smart Air，反而扩大了信任"
                  },
                  {
                    "index": "4",
                    "title": "数据先于叙事",
                    "description": "不说\"我们的产品最好\"，而是\"这里有数据，你自己判断\""
                  },
                  {
                    "index": "5",
                    "title": "拒绝中间商溢价",
                    "description": "坚持 D2C（直接面向消费者）——不进入层层加价的渠道体系"
                  },
                  {
                    "index": "6",
                    "title": "教育即产品",
                    "description": "800+ 场免费讲座不是获客手段——教育本身就是 Smart Air 在生产的价值"
                  },
                  {
                    "index": "7",
                    "title": "利润是伦理选择",
                    "description": "15-20% 利润率不是市场给定的，而是主动选择的——\"我们需要活下去，但我们不需要暴利\""
                  },
                  {
                    "index": "8",
                    "title": "可复制优于独家",
                    "description": "不追求技术壁垒——如果有人能做更便宜、更好的，那是好事"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "\"聪明空气\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"Smart Air\"——不是\"Clean Air\"（洁净空气），而是\"Smart Air\"（聪明的空气）。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这个命名包含了核心洞见：空气净化不需要你变富，只需要你变聪明。不是\"负担得起洁净空气\"（那仍然假设洁净空气需要很多钱），而是\"聪明地获得洁净空气\"（那假设你需要的是知识，而不是钱）。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"聪明\"在这里是一个赋权的词——它暗示任何人都有能力理解空气净化的工作原理，有能力为自己和家人做出正确的选择。品牌名不是\"我们的技术很厉害\"，而是\"你可以很聪明\"。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "不赚钱不是失败，是选择",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 最核心的\"身心安顿\"问题是一个既简单又残酷的问题：一家只留 15-20% 利润的公司，能活下去吗？"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是一个学术问题。当 VC 找上门来说\"把价格放在 1000+ 块\"时、当同行用铺天盖地的广告碾压时、当电商平台鼓励参与 618 和双十一促销时——\"不赚那么多钱\"是一个每天都在面对的真实选择。"
                ]
              },
              {
                "type": "quote",
                "text": "Smart Air 拒绝 VC 投资，因为投资人的要求很明确：提高价格。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"我不需要钱\"的骄傲，而是诚实地面对自己为什么要做这件事。如果你做 Smart Air 是为了让每个人都负担得起洁净空气，那你就不可能把价格提高到 1000 元以上——那不叫\"为了生存不得不涨价\"，那叫\"背叛了自己最初的理由\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种诚实是\"身心安顿\"的核心：不是找到了一个完美的商业模式，而是知道自己不愿意为钱付出什么代价。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "低利润率下的可持续运营",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 找到了一条在经济上和伦理上都自洽的道路："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "利润率定位",
                    "value": "15-20%——不是\"不赚钱\"，而是\"不暴利\""
                  },
                  {
                    "label": "拒绝的资本",
                    "value": "VC 投资、行业渠道溢价、电商促销节奏"
                  },
                  {
                    "label": "运营模式",
                    "value": "D2C 直销——减少中间环节的成本损耗"
                  },
                  {
                    "label": "增长逻辑",
                    "value": "社会化传播——靠口碑和科普而非广告预算"
                  },
                  {
                    "label": "员工待遇",
                    "value": "7 小时工作制——利润不压在人工上，但也不把员工压榨到极限"
                  },
                  {
                    "label": "规模态度",
                    "value": "适度增长，不追求\"赢家通吃\"式的市场垄断"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种经济模式的内在自洽在于：15-20% 的利润率和 7 小时工作制是一体两面的。如果追求 50% 利润率，就必然需要更大的营销投入、更长的工作时间、更激进的扩张策略。Smart Air 选择低利润率，同时选择了低压力——不跟资本赛跑，不跟行业赛跑，只跟自己定下的伦理底线赛跑。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"不赚钱\"的可持续性问题：Smart Air 的利润率（15-20%）远低于行业平均（50-80%），但它仍然是正的。它不是一家\"亏本赚吆喝\"的慈善机构，而是一家主动选择了一个\"不高但够\"的利润水平的公司。这种选择在经济上是否可持续？从 2013 年到 2026 年的 13 年存续给出了一个积极的回答。"
                ]
              }
            ]
          },
          {
            "id": "13",
            "title": "韧性",
            "subtitle": "13 年的伦理坚守",
            "kind": "timeline",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从 2013 年在北京的一间公寓里开始，到 2026 年跨越多国运营："
                ]
              },
              {
                "type": "timeline",
                "items": [
                  {
                    "time": "2013",
                    "title": "Thomas 在北京 DIY 第一台风扇+滤网净化器"
                  },
                  {
                    "time": "2014",
                    "title": "发布第一款产品，坚持 D2C 直销"
                  },
                  {
                    "time": "2015",
                    "title": "遇到第一批想投资却被拒绝的 VC"
                  },
                  {
                    "time": "2016",
                    "title": "2019 ──┼── 产品线扩展：The Blast、The Sqair"
                  },
                  {
                    "time": "2020",
                    "title": "2022 ──┼── 疫情期间：空气净化需求上升"
                  },
                  {
                    "time": "2023",
                    "title": "2026 ──┼── 科普讲座突破 800+ 场"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "韧性的特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "反市场节奏的增长：不是靠 VC 烧钱换增长，而是靠口碑和科普的缓慢积累",
                  "伦理边界的坚守：13 年间面对 VC、面对大促、面对恐慌市场——每一次拒绝都是对\"我们到底是谁\"的重新确认",
                  "跨文化适应：从北京到印度、菲律宾、蒙古——洁净空气的需求是普遍的，但每个市场的具体挑战不同",
                  "简单模式的持久力：因为模式足够简单（风扇+滤网），所以不需要随着时间变得复杂"
                ]
              }
            ]
          },
          {
            "id": "618",
            "title": "拒绝 618 与双十一",
            "subtitle": "内心的定价锚",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在电商时代，618 和双十一的诱惑是巨大的——平台给流量、给坑位、给一切让你\"冲销量\"的工具。但 Smart Air 选择不参与："
                ]
              },
              {
                "type": "quote",
                "text": "如果你在双十一打折，那说明你平时的价格是虚高的。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这背后是一种定价的伦理完整性：Smart Air 对消费者的承诺是\"我们永远只赚 15-20%\"。如果参与大促打折，那就意味着要么打折期间亏本（不可持续），要么平时利润超过 15-20%（违背承诺）。不是\"我们不擅长搞促销\"，而是\"促销在逻辑上与我们承诺的透明定价不相容\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种\"不做什么\"的选择，比\"做什么\"更难。 尤其在所有人都参与的时候。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从 Smart Air 的实践中可以提取出以下核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "拒绝行业暴利",
                    "meta": [
                      "█████"
                    ],
                    "description": "15-20% 利润率 vs. 行业 50-80%，拒绝 VC 提价要求"
                  },
                  {
                    "title": "开放知识传播",
                    "meta": [
                      "█████"
                    ],
                    "description": "800+ 场免费讲座、公开测试数据、公开 DIY 教程"
                  },
                  {
                    "title": "人人应负担得起洁净空气",
                    "meta": [
                      "█████"
                    ],
                    "description": "不做高端线、不涨价、透明定价、D2C 减成本"
                  },
                  {
                    "title": "数据诚实先于营销话术",
                    "meta": [
                      "████"
                    ],
                    "description": "不夸大、不恐吓、数据说话——消费者自己判断"
                  },
                  {
                    "title": "员工福祉先于利润最大化",
                    "meta": [
                      "████"
                    ],
                    "description": "7 小时工作制——不靠压榨员工来补偿低利润率"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些价值观不是贴在墙上的标语，而是每天都在被检验的运营决策——当一个投资人带着支票来说\"提价就好\"，当双十一的流量窗口打开，当一个新市场可以用更高定价进入——这些时刻，价值观不是选择题，而是命令自己不能做什么的底线。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "科普讲座",
            "subtitle": "知识作为公共产品",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 最具公共性的实践是持续举办的免费科学讲座——"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "数量",
                    "value": "800+ 场，覆盖中国、印度、菲律宾、蒙古等多个国家"
                  },
                  {
                    "label": "内容",
                    "value": "空气污染的科学原理、净化器的工作原理、如何用数据评估空气质量"
                  },
                  {
                    "label": "对象",
                    "value": "学校、社区、企业——任何想了解的人"
                  },
                  {
                    "label": "费用",
                    "value": "免费"
                  },
                  {
                    "label": "精神",
                    "value": "不是\"先听讲座再买机器\"的营销漏斗——听完不买也没关系"
                  },
                  {
                    "label": "作用",
                    "value": "让普通人拥有判断空气净化器好坏的知识能力——不需要依赖品牌宣传"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "800+ 场讲座的公共性意义：这些讲座不是在销售，而是在建设公民的自主判断能力。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "当一个人了解了 PM2.5 是什么、HEPA 滤网如何工作、CADR 值意味着什么——他就不会轻易被\"净化率 99%\"这种模糊口号欺骗。这种知识赋权是 Smart Air 公共性的核心：不是我给你洁净空气，而是我给你判断什么才是洁净空气的能力。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "开放数据",
            "subtitle": "对抗信息不对称的基础设施",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 持续公开发布不同环境下的 PM2.5 实测数据——在各种类型的室内、不同档次的净化器、不同城市和季节条件下的对比测试："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "DIY 风扇+滤网 vs. 品牌机器的实测对比",
                    "value": "证明贵的不一定更好——瓦解以价格为质量信号的市场逻辑"
                  },
                  {
                    "label": "不同室内环境的空气质量基准数据",
                    "value": "让普通人了解自己每天呼吸的空气——感知即行动的前提"
                  },
                  {
                    "label": "各国各地的 PM2.5 测试数据",
                    "value": "跨国比较——空气污染不是中国的问题，是全球南方国家的共同挑战"
                  },
                  {
                    "label": "产品拆解和成本分析",
                    "value": "让大家看到一台净化器到底值多少钱——透明化的价格教育"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "这些数据不是 Smart Air 的\"研发机密\"——它们被公开发布，任何人可以使用。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "数据的公共性：在一个以信息不对称为核心利润来源的行业里，系统性、持续性地发布公开数据，是一种制度性的反抗。Smart Air 不是在\"做公益\"——它是在告诉行业：你的护城河（信息差）已经被填平了。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "跨国传播",
            "subtitle": "洁净空气作为全球南方议题",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 的公共性不局限在中国——"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "中国",
                    "value": "发源地：800+ 场讲座、开放数据、产品零售"
                  },
                  {
                    "label": "印度",
                    "value": "进入世界空气污染最严重的国家之一——科普讲座、社区推广"
                  },
                  {
                    "label": "菲律宾",
                    "value": "东南亚发展中国家——让洁净空气知识跨越语言和收入障碍"
                  },
                  {
                    "label": "蒙古",
                    "value": "乌兰巴托的冬季空气污染严重——Smart Air 的 DIY 方案在低收入社区尤其有用"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "空气污染不是一家一户的问题，而是一个结构性不公——越穷的人越暴露在污染中，越没有能力负担\"解决方案\"。Smart Air 的跨国传播正是针对这种不公。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "全球南方的\"空气正义\"：洁净空气被包装成一种需要付费购买的商品——只有付得起 5000 元买进口净化器的人才有权呼吸洁净空气。Smart Air 的跨国实践从根本上质疑了这个预设：洁净空气不是商品，是权利。而实现这个权利的第一步，不是钱，是知识。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "公共性实践的三个层次",
            "subtitle": null,
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 的公共性在不同尺度上展开："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "个体赋权：── 让每一个人有能力理解空气污染、有能力判断净化器好坏"
                  },
                  {
                    "label": "层次 2",
                    "value": "行业改造：── 用透明定价和数据开放倒逼行业改变"
                  },
                  {
                    "label": "层次 3",
                    "value": "跨国空气正义：── 把洁净空气的知识和方案带到全球南方国家"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "国际连接",
            "subtitle": "一个社会企业的全球网络",
            "kind": "narrative",
            "blocks": [
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "中国→印度",
                    "value": "从北京扩展到新德里——亚洲两个最大空气污染城市的对话"
                  },
                  {
                    "label": "中国→菲律宾",
                    "value": "东南亚发展中国家——类似的经济和空气挑战"
                  },
                  {
                    "label": "中国→蒙古",
                    "value": "乌兰巴托冬季污染严重——DIY 方案在低收入社区的适用性"
                  },
                  {
                    "label": "全球社企社区",
                    "value": "作为 B Corp 共益企业，连接国际社会企业网络"
                  },
                  {
                    "label": "科学传播社群",
                    "value": "与全球空气污染研究者和科学传播者保持联系"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些连接不是\"开拓国际市场\"的商业逻辑，而是洁净空气权利的去殖民化实践——不让西方高端品牌垄断洁净空气的叙事和定价权。"
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "Smart Air 的公共性同样有自己的边界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不参与 VC 资本的融资",
                    "value": "资本要求提价——与\"人人负担得起\"的使命冲突"
                  },
                  {
                    "label": "不参与电商大促",
                    "value": "透明定价排斥\"先涨后降\"的价格游戏——大促的逻辑与透明定价不相容"
                  },
                  {
                    "label": "不做高端产品线",
                    "value": "不需要\"更贵的版本\"——洁净空气应该平等可得"
                  },
                  {
                    "label": "不申请专利",
                    "value": "知识应该开放——如果别人能做得更好，那是好事"
                  },
                  {
                    "label": "不把教育做成营销漏斗",
                    "value": "800+ 场讲座不设购买转化目标——教育本身就是目的"
                  },
                  {
                    "label": "不用恐吓式营销",
                    "value": "\"不买我们的产品你就会生病\"——不靠恐惧驱动消费"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "独有贡献",
            "subtitle": "将\"开放知识\"确立为商业公共性的方法",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，Smart Air 贡献了一种独特的公共性路径："
                ]
              },
              {
                "type": "quote",
                "text": "Open knowledge as commons（开放知识作为公共资源）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"企业社会责任\"（CSR）的逻辑——不是在主营业务之外做一点公益捐一点款。Smart Air 的公共性嵌入在它的商业模式本身：开放数据、公开教程、免费讲座——这些不是附加的\"好事\"，而是公司存在的理由。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "公共性不是 Smart Air 的 side project，而是 Smart Air 的产品本身。"
                ]
              },
              {
                "type": "quote",
                "text": "\"人人应负担得起洁净空气\"——不是人人买得起 Smart Air 的产品，而是人人有能力为自己创造洁净空气。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话的关键在于\"能力\"而非\"产品\"：Smart Air 最终的目标不是让全世界的人都用 Smart Air，而是让全世界的人不再需要依赖任何品牌就能获得洁净空气——包括不再需要 Smart Air。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 Smart Air / 聪明空气 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于Smart Air / 聪明空气公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 Smart Air / 聪明空气 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/smart_air.md"
      ],
      "sourceLabels": [
        "smart_air.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "spring_changzhou": {
    "id": "spring_changzhou",
    "profile": {
      "name": "春潮 Spring / 长洲岛瑶寨"
    },
    "triangleTitle": "春潮 Spring / 长洲岛瑶寨的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "传统符号的当代转译",
    "centerSubtitle": "在技术、青年社群和在地议题之间实验",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "从神龛到田野",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮工作室的创造力起点是对传统民间符号的重新想象。广东\"贵人\"纸符本是贴在神龛上、祈求\"招财贵人\"的民间信仰物件——一个被固定在家庭祭坛上、功能单一（求财）、形式固化的传统符号。菜菜和大雁没有选择\"保护非遗\"式的文化保育路径，也没有选择\"当代艺术\"式的解构挪用，而是提出了一种完全不同的提问方式："
                ]
              },
              {
                "type": "quote",
                "text": "\"通过贵人精灵这些非人类来看待人类自己。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"做一个更好的传统符号\"，而是彻底改变了符号的使用方式和意义生产机制——从被供奉的静态符纸，变成行走在田野、码头、社区中的活的精神存在。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "文化保育路径",
                    "value": "不把贵人纸符当作需要\"保护\"的非遗，而是当作可以继续生长的活传统"
                  },
                  {
                    "label": "当代艺术体制",
                    "value": "不被 gallery 绑架，不在白盒子里做\"观念艺术\"式的自上而下表达"
                  },
                  {
                    "label": "传统民间信仰框架",
                    "value": "不把贵人限定在\"招财\"的单一功能上"
                  },
                  {
                    "label": "艺术家身份",
                    "value": "菜菜不称自己为艺术家，而是\"贵人精灵的替身\""
                  },
                  {
                    "label": "专业工具崇拜",
                    "value": "用厨房剪刀、修眉剪刀——日常生活中的工具——替代专业创作工具"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "非人类视角作为创作方法",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "转折点：菜菜和大雁在广东传统的\"贵人\"纸符中发现了一个未被打开的维度——为什么贵人只能\"招财\"？如果贵人是活的精灵，它可以关心什么？"
                ]
              },
              {
                "type": "quote",
                "text": "\"通过贵人精灵这些非人类来看待人类自己。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这是一种视角层面的创造：不是人类去\"表达\"非人类，而是借助非人类的视角来重新审视人类自己的处境。贵人们成为一个\"他者之眼\"——它们关心的事情，恰恰是人类自己关心但羞于正式表达的。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "新贵人的创造谱系："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "招财贵人（传统）",
                    "meta": [
                      "财运"
                    ],
                    "description": "原有形态，被供奉在神龛上"
                  },
                  {
                    "title": "吵架贵人",
                    "meta": [
                      "职场冲突"
                    ],
                    "description": "帮助打工人在与领导的争执中\"打赢\""
                  },
                  {
                    "title": "气候贵人",
                    "meta": [
                      "极端天气"
                    ],
                    "description": "记录河南冰雹、广州无尽暴雨——气候危机的情感载体"
                  },
                  {
                    "title": "彩虹贵人",
                    "meta": [
                      "LGBTQ+议题"
                    ],
                    "description": "为性别多元群体提供精神陪伴"
                  },
                  {
                    "title": "妇女贵人",
                    "meta": [
                      "性别议题"
                    ],
                    "description": "回应结构性性别不公"
                  },
                  {
                    "title": "和平贵人",
                    "meta": [
                      "重疾救助"
                    ],
                    "description": "为重症患者家庭筹款"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"设计新形象\"——每一个新贵人都诞生于具体的田野现场、具体的需求、具体的人的讲述。贵人们不是被\"发明\"出来的，而是被\"遇见\"的。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "把新可能带进现实",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "吵架贵人",
                    "meta": [
                      "新精灵创作"
                    ],
                    "description": "将传统\"招财\"功能拓展为\"打赢吵架\"——把职场上不被允许表达的愤怒，变成一个可以随身携带的精神存在"
                  },
                  {
                    "title": "气候贵人",
                    "meta": [
                      "新精灵创作"
                    ],
                    "description": "用精灵的身体承载气候焦虑——河南冰雹、广州连绵阴雨不再只是新闻，而是贵人们\"见证\"过的生命经验"
                  },
                  {
                    "title": "两米高纸板贵人",
                    "meta": [
                      "社区共创装置"
                    ],
                    "description": "邻居捐献纸板，儿童自发加入涂绘——从个体创作变成社区事件"
                  },
                  {
                    "title": "码头告别记录",
                    "meta": [
                      "田野记录"
                    ],
                    "description": "文献记录了渡轮码头永久关闭前的最后一班船——一个消失中的公共空间的最后见证"
                  },
                  {
                    "title": "彩虹贵人",
                    "meta": [
                      "新精灵创作"
                    ],
                    "description": "为LGBTQ+社群创造了一个属于他们的精神符号"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创作方法论",
            "subtitle": "八条创造原则",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从实践中可以提取出春潮工作室的创造方法论："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "田野即工作室",
                    "description": "不在封闭空间创作——\"从田野中来，回到田野中去\"。创作与生活现场不可分离"
                  },
                  {
                    "index": "2",
                    "title": "非人类视角是方法",
                    "description": "通过贵人的眼睛重新看人类——这是一种认识论的创造，不只是美学的创造"
                  },
                  {
                    "index": "3",
                    "title": "即兴共创",
                    "description": "不预设最终形态。邻居的小孩可以来画，养生馆老板娘可以来参与——创作是开放的邀请"
                  },
                  {
                    "index": "4",
                    "title": "日常工具即创作工具",
                    "description": "厨房剪刀、修眉剪刀——拒绝\"专业工具\"的区隔，用生活工具做创作"
                  },
                  {
                    "index": "5",
                    "title": "符号是活的",
                    "description": "贵人不是被固定意义的符号，而是在不同情境下不断重新生长出新的意义"
                  },
                  {
                    "index": "6",
                    "title": "不求系统化",
                    "description": "不试图建立\"贵人体系\"——让它们松散、野生地存在，系统的魅力恰在于其不完整性"
                  },
                  {
                    "index": "7",
                    "title": "肉身在场",
                    "description": "人必须出现在田野里，与渡船司机、晒菜干的阿姨、邻居小孩真实相处"
                  },
                  {
                    "index": "8",
                    "title": "轻量生产",
                    "description": "纸板、剪刀、颜料——材料来自日常生活，不需要资本投入即可启动"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "\"春潮\"与\"贵人精灵\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮工作室的名字本身携带了南方的、潮润的、在地的气息——不是抽象的\"工作室\"，而是有季节、有水、有生命力的名字。春潮不是浪潮（那是关于规模与趋势的隐喻），而是潮汐——有来有去、有涨有退、与土地和月亮有关。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"贵人精灵\"而非\"贵人纸符\"：从\"符\"到\"精灵\"，完成了一个从\"物件\"到\"生命\"的本体论转换。符是被使用的、功能性的、沉默的；精灵是能行走的、能关心的、能与人建立关系的。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "承认\"艺术家\"身份的不适",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "菜菜和大雁在创作中的诚实，体现在一个极其微妙的姿态上：拒绝称自己为艺术家。"
                ]
              },
              {
                "type": "quote",
                "text": "菜菜自称\"贵人精灵的替身\"。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是自谦或反讽，而是一种对既有身份框架的诚实不适应。\"艺术家\"这个词携带着当代艺术体制的全部预设——画廊、收藏、批评家、双年展、资本循环、话语权力。菜菜不想背负这些，也不想被这些评价。她选择了一个更轻、更真、更有趣的身份：\"替身\"——她只是帮贵人精灵在人类世界行走的那个人。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种诚实是\"身心安顿\"的前提：如果你穿的衣服不合身，你就不可能安顿。与其穿着\"艺术家\"这身不合适的衣服，不如承认自己是一件\"替身\"。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "嵌入日常生活的创作经济",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮工作室没有选择\"要么全职创作、要么打工谋生\"的二元对立，而是找到了一种创作即生活的弥散方式："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "经济模式",
                    "value": "不以创作本身为直接收入来源——创作和生活融为一体"
                  },
                  {
                    "label": "空间嵌入",
                    "value": "广州长洲岛上，创作发生在日常空间——阳台、码头、邻居家门口"
                  },
                  {
                    "label": "时间节奏",
                    "value": "没有 project timeline——贵人们跟着季节、天气、邻里事件走"
                  },
                  {
                    "label": "身份自洽",
                    "value": "\"贵人精灵的替身\"——身份不是职业标签，而是一种关系的命名"
                  },
                  {
                    "label": "拒绝的资本",
                    "value": "不追求画廊代理、不追求艺术市场认可、不追求学术话语收编"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种经济模式的内在自洽在于：创作不需要被\"支持\"，因为它本身就是生活。就像不需要被\"支持\"去晒太阳、去坐渡船、去看阿姨晒菜干一样——贵人的创作嵌在这些日常行动里，不需要额外的经济合法性。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "田野中的日常坚守",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮的韧性不是对抗性的\"坚持\"，而是日常生活本身的绵延力："
                ]
              },
              {
                "type": "preformatted",
                "text": "长洲岛日常节奏\n    │\n    ├── 码头渡船 ── 每天几次往返，看水、看人、看天气\n    │                  （最后记录到码头永久关闭 ★）\n    │\n    ├── 阳台晒被 ── 贵人们和邻居的被子一起晒太阳\n    │\n    ├── 木棉树下 ── 游荡，看花开花落\n    │\n    ├── 渡口阿姨 ── 看她们晒菜干、聊天\n    │\n    └── 邻居小孩 ── 他们随时可以加入创作"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "时间伦理特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "跟随自然节奏而非项目节奏：贵人不赶 deadline，它们等一个合适的天气、一个合适的人、一个合适的事件",
                  "容忍不产出：游荡、晒太阳、看阿姨晒菜干——这些都算\"创作过程\"",
                  "场所稳定性：长洲岛不是\"工作室所在地\"，而是\"家园\"——创作者和创作者的生活扎根在同一个地方",
                  "关系积累而非作品积累：每一段邻里关系、每一个来画过贵人的小孩，都是积累的一部分"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "身份流动",
            "subtitle": "替身而非作者",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "菜菜的身份策略是一种极聪明的轻量化处理——\"贵人精灵的替身\"这个身份同时做到了几件事："
                ]
              },
              {
                "type": "ordered-list",
                "items": [
                  "消除作者焦虑：不是\"我\"在创作，是贵人在通过\"我\"显现——卸下了原创性的包袱",
                  "打开参与通道：如果我是替身，你也可以成为替身——观众不是被动接受者，而是潜在的替身候选人",
                  "避免被归类：不是艺术家、不是设计师、不是手工艺人——不在任何既有的职业分类里",
                  "保持神秘与轻盈：替身是一种关系身份而非实体身份——轻到不会压垮自己"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "快乐先于效率",
                    "meta": [
                      "█████"
                    ],
                    "description": "黑客松精神——\"快乐、叛逆、自由\"。不追求功利产出，追求\"玩\"的质量"
                  },
                  {
                    "title": "生活先于艺术",
                    "meta": [
                      "█████"
                    ],
                    "description": "创作嵌入日常生活，不另设\"创作时间\"。晒被子、坐渡船和做贵人是一件事"
                  },
                  {
                    "title": "关系先于作品",
                    "meta": [
                      "█████"
                    ],
                    "description": "\"基于生活的友谊\"——友谊不是创作的副产品，友谊本身就是目的"
                  },
                  {
                    "title": "自由先于体系",
                    "meta": [
                      "████"
                    ],
                    "description": "不进入画廊体系、不建立固定方法论、保持野生状态"
                  },
                  {
                    "title": "即兴先于规划",
                    "meta": [
                      "████"
                    ],
                    "description": "邻居小孩来了就一起画，渡口关了就去记录——不预设，拥抱涌现"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些价值观不是宣言，而是每天在做的事情——当菜菜选择用厨房剪刀做贵人、让邻居小孩一起画、在第一班船和最后一班船上都带着贵人时，她在用行动而非言语兑现这些价值。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "让传统符号回应当代公共议题",
            "subtitle": null,
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮工作室最具公共性的实践，是把一种看似\"过时的\"民间符号重新激活，让它回应最当下的公共议题："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "气候危机",
                    "meta": [
                      "气候贵人"
                    ],
                    "description": "把河南冰雹、广州无尽暴雨从抽象的\"气候变化\"话语转化为有身体、有情感的经历记录"
                  },
                  {
                    "title": "LGBTQ+权益",
                    "meta": [
                      "彩虹贵人"
                    ],
                    "description": "在一个主流文化中对性少数群体缺乏承认的环境中，提供一个可见的精神符号"
                  },
                  {
                    "title": "职场冲突",
                    "meta": [
                      "吵架贵人"
                    ],
                    "description": "回应打工人的日常困境——与领导/同事的摩擦，一种幽默化、精神化的处理方式"
                  },
                  {
                    "title": "性别不公",
                    "meta": [
                      "妇女贵人"
                    ],
                    "description": "结构性性别问题的非说教化表达"
                  },
                  {
                    "title": "重疾救助",
                    "meta": [
                      "和平贵人"
                    ],
                    "description": "为重症患者家庭筹款——直接的物质性公共行动"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "贵人们成为\"公共议题的情感翻译器\"：气候焦虑太大、太远、太无力；但一个\"气候贵人\"是可以带在身边的、可以对话的、可以把无力感转化为\"至少我的贵人看见了这场雨\"的精神陪伴。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "去中心化的共创",
            "subtitle": "让每个人成为贵人精灵的替身",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮工作室的公共性不在于\"为公众做艺术\"，而在于让公众成为创作者："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "儿童自发参与："
                ]
              },
              {
                "type": "quote",
                "text": "邻居捐献纸板制作的两米高贵人——孩子们看到后，自发加入涂绘。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"公共教育项目\"——菜菜没有组织工作坊、没有写教案、没有申请公共艺术基金。孩子们是自己被吸引过来、自己拿起画笔、自己决定要画什么的。这是一种不设框架的邀请——贵人站在那里，谁都可以走过来参与。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "养生馆老板娘的文化记忆："
                ]
              },
              {
                "type": "quote",
                "text": "参与共创的过程中，养生馆老板娘\"重新发现了自己的手艺艺术记忆\"。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "共创不仅是\"让作品更丰富\"，而是激活参与者自己已经遗忘的创造力。老板娘不是来\"帮忙\"——她在与贵人相遇的过程中，重新遇见了自己曾经拥有的手艺能力。这种公共性不是向外的\"输出\"，而是向内的\"唤醒\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "去中心化的三个层次："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "共创参与者：── 儿童、邻居、养生馆老板娘——每一个在场的人都可能成为贵人的替身"
                  },
                  {
                    "label": "层次 2",
                    "value": "贵人本身的扩散：── 贵人们被作为礼物送给叙利亚儿童"
                  },
                  {
                    "label": "层次 3",
                    "value": "记忆与情感的保存：── 渡轮码头的关闭被记录"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "码头记录",
            "subtitle": "为一个消失的公共空间立碑",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮完成了对长洲岛渡轮码头最后一班船的文献记录。这不是一个\"项目\"，而是在场者的自然责任——你在那里生活，你每天坐渡船，你和司机认识，你知道这个码头要关了，所以你带着贵人们去坐最后一班船。"
                ]
              },
              {
                "type": "quote",
                "text": "\"司机也不会阻拦。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "码头是一个无等级的公共空间——不管你是谁，船票都一样。它的消失意味着岛上某种社区关系的断裂。贵人在这里不是\"表演艺术介入\"，而是一个见证者——就像村里有人去世时，总有人在灵前守夜。"
                ]
              },
              {
                "type": "quote",
                "text": "\"从田野中来，回到田野中去。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话的双重含义：贵人们从田野中（具体的村庄、码头、邻里关系）被创造出来，最后又回到田野（作为社区记忆的载体、作为消失空间的见证者）中去。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "国际连接",
            "subtitle": "贵人作为礼物",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮工作室的实践不是封闭的本土社群，而是有意识地让贵人\"走出去\"："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "叙利亚儿童",
                    "meta": [
                      "礼物赠送"
                    ],
                    "description": "贵人精灵作为精神陪伴的礼物，跨越语言和文化障碍"
                  },
                  {
                    "title": "城中村儿童艺术节",
                    "meta": [
                      "现场参与"
                    ],
                    "description": "贵人出现在城市边缘社区的艺术活动中"
                  },
                  {
                    "title": "生态农场",
                    "meta": [
                      "现场参与"
                    ],
                    "description": "贵人们在农场中与自然、与劳作发生关系"
                  },
                  {
                    "title": "深圳黑客松",
                    "meta": [
                      "社区连接"
                    ],
                    "description": "清华/北大深圳学生社区——\"快乐、叛逆、自由\"的跨校连接"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "贵人作为\"不需要翻译的礼物\"：送给叙利亚儿童的贵人不需要说明书。一个纸做的精灵、一张画了颜色的脸——它是可以跨语言、跨文化被理解和被喜爱的。这是民间艺术的原始力量：它不解释自己，它只是出现在那里。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "春潮的公共性不是无差别的。她明确不做什么，这些\"不做\"恰恰定义了公共性的边界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做画廊展览",
                    "value": "不被当代艺术体制收编——贵人需要在田野中，不在白盒子里"
                  },
                  {
                    "label": "不做学术化的文化研究",
                    "value": "不把贵人变成\"案例\"或\"论文对象\""
                  },
                  {
                    "label": "不做标准化的公共教育",
                    "value": "不办\"工作坊\"——让参与自然发生，而非组织化动员"
                  },
                  {
                    "label": "不做符号的品牌化",
                    "value": "贵人不能变成 logo、IP、周边商品——它们是精神存在，不是消费品"
                  },
                  {
                    "label": "不做社会服务式的介入",
                    "value": "不是 NGO 式的\"解决问题\"——贵人们提供的是陪伴和见证，不是方案"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "独有贡献",
            "subtitle": "将\"基于生活的友谊\"确立为公共行动的方法论",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，春潮工作室贡献了一种尚未被充分命名的方法论："
                ]
              },
              {
                "type": "quote",
                "text": "基于生活的友谊——Friendship based on living, not networking"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是关于\"社群建设\"或\"公众参与\"的最佳实践。这是关于把友谊重新放回公共行动的中心位置。社区不是被\"建设\"出来的，友谊不是被\"运营\"出来的——它们是在一起晒太阳、一起坐渡船、一起在木棉树下走神中自然生长出来的。"
                ]
              },
              {
                "type": "quote",
                "text": "\"我们是一种当下工作跟生活的一个启发，就是基于生活的友谊。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "明天就有工作坊——永远在邀请。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话概括了春潮的公共性姿态：不是封闭的、完成的、可以展示的作品集，而是一直保持开放、一直欢迎新人走进来的邀请状态。公共性不是一个状态（\"我们有很多观众\"），而是一种方向（\"明天还有，你来吗\"）。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 春潮 Spring / 长洲岛瑶寨 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于春潮 Spring / 长洲岛瑶寨公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 春潮 Spring / 长洲岛瑶寨 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/spring_changzhou.md"
      ],
      "sourceLabels": [
        "spring_changzhou.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "xiaohei": {
    "id": "xiaohei",
    "profile": {
      "name": "小黑 / 漫画与手工艺"
    },
    "triangleTitle": "小黑 / 漫画与手工艺的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "怪兽世界里的手作连接",
    "centerSubtitle": "用版画、T 恤和邻里抵抗城市孤独",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "t",
            "title": "媒介选择",
            "subtitle": "T恤作为创作载体",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑的创造力起点是一种媒介的重新定义。T恤不是商品，而是一块可以随身携带的画布、一个可以穿在身上的世界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "创作媒介",
                    "value": "手印T恤（喷漆、木板印刷）"
                  },
                  {
                    "label": "创作主题",
                    "value": "\"怪物的世界\"——一个虚构的、栖息在织物上的想象世界"
                  },
                  {
                    "label": "制作方式",
                    "value": "每一件独一无二，从手喷到木板印刷"
                  },
                  {
                    "label": "美学风格",
                    "value": "DIY粗粝感——不追求精致，保留手工痕迹"
                  },
                  {
                    "label": "自嘲式定位",
                    "value": "\"在中国看不到，因为只有在美国能看到\"——对自己非主流风格的清醒认知"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "T恤作为媒介有独特的优势：它是可穿戴的（创作可以走上街头）、可复制的（但不追求完全一致）、可赠送的（天然的社交媒介）、低门槛的（不需要美术馆或画廊）。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "手艺进化",
            "subtitle": "从喷漆到木板印刷",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑的创作路径体现了一种手艺人式的进化："
                ]
              },
              {
                "type": "preformatted",
                "text": "手工喷漆 ──→ 木板印刷\n（费力、不稳定）  （可重复、可控）"
              },
              {
                "type": "quote",
                "text": "\"喷漆太累了，手都喷酸了\" —— 最初的笨拙实践"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在村友飞鸿的帮助下学会木板印刷后，创作变得可以持续。这不是从\"手工\"到\"工业\"的升级，而是从一种手工到另一种手工的优化——保留了手的痕迹，但让身体不再透支。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "空间创造",
            "subtitle": "屋顶作为基地",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑住在广州长洲岛的天台顶楼，这个选择本身就是一种创造性的姿态："
                ]
              },
              {
                "type": "quote",
                "text": "\"我住在顶楼是要对抗炎热和活下去。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "天台不是\"理想的创作环境\"（广州的炎热是真实的挑战），但它提供了两样稀缺资源："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "固定空间",
                    "value": "在不断搬家、不断失去朋友圈的生活中，一个可以扎根的物理锚点"
                  },
                  {
                    "label": "自由度",
                    "value": "可以在屋顶上喷漆、晒T恤、搭建自己的创作流程，不受他人干扰"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"对抗炎热和活下去\"——这句话将居住本身也变成了一种创造性的行动，而非被动的忍受。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "\"怪物的世界\"",
            "subtitle": "创造力的核心命题",
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"怪物的世界\" —— 一个虚构的、没有固定叙事的想象世界"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"怪物的世界\"不是一种逃避现实，而是用想象力在现实中开辟一块飞地。这些怪物形象——印在T恤上、穿在身上、出现在村庄的照片里——它们是温柔的、古怪的、不属于任何既有审美体系的。在一个追求效率、标准化的城市环境中，这种\"怪物\"本身就是一种对\"正常\"的创造性抵抗。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "非标准审美",
                    "value": "不迎合主流审美，不追求\"好看\""
                  },
                  {
                    "label": "开放式叙事",
                    "value": "\"怪物的世界\"没有固定故事，每个穿戴者可以自己诠释"
                  },
                  {
                    "label": "手工不确定性",
                    "value": "每件T恤有细微差异，如同每个怪物都有不同的表情"
                  },
                  {
                    "label": "低技术门槛",
                    "value": "木板+颜料+布料——人人都可以参与的技术"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实的起点",
            "subtitle": "城市中的孤独",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑的叙事从不回避自己的脆弱，反而将其作为一切的出发点："
                ]
              },
              {
                "type": "quote",
                "text": "\"我们生活在城市很孤独。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是一种矫饰的孤独感，而是来自结构性的原子化："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "频繁搬家",
                    "value": "\"搬了很多地方……不断的离开熟悉的朋友圈\""
                  },
                  {
                    "label": "城中村的流动性",
                    "value": "\"你刚认识一个朋友，没两天他都走了\""
                  },
                  {
                    "label": "关系的碎片化",
                    "value": "朋友是\"零零碎碎\"的，缺乏\"粘稠的情感\""
                  },
                  {
                    "label": "网上的无人问津",
                    "value": "\"发在网上也没人买\"——创作没有外部回应"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种对孤独的诚实承认，与阿久的\"电子阳痿\"遥相呼应——都是拒绝为自己编织英雄叙事，而是从真实的困境出发。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "不是为了卖而做",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑的创作具有一种反功利主义的内在自洽："
                ]
              },
              {
                "type": "quote",
                "text": "\"发在网上也没人买\"——但她仍然在做。"
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "创作动机",
                    "value": "不追求销售，不追求流量，不追求认可"
                  },
                  {
                    "label": "经济逻辑",
                    "value": "低成本手工艺（T恤+颜料+木板），可行维持"
                  },
                  {
                    "label": "自我定位",
                    "value": "不是为了\"成为艺术家\"，而是为了\"活下去\""
                  },
                  {
                    "label": "对遗忘的态度",
                    "value": "\"被其他人遗忘了也没有关系\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"被其他人遗忘了也没有关系\"——这句话是小黑身心安顿的核心。它不是消极的放弃，而是主动将自我价值从外部认可中剥离出来。在一个人人追求\"被看见\"的时代，选择\"没关系\"是一种真正的内在力量。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "身体在地",
            "subtitle": "屋顶作为锚点",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在不断的动荡中，屋顶成为一个物理和心理的定锚："
                ]
              },
              {
                "type": "preformatted",
                "text": "搬了很多地方 ──→ 终于有一个固定屋顶\n                              │\n                    ┌─────────┴─────────┐\n                    │                   │\n              可以喷漆了            可以晒T恤了\n                    │                   │\n                    └─────────┬─────────┘\n                              │\n                    有一个可以回的地方"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "屋顶不是一个浪漫的意象，而是一个实际的功能空间：它让创作可以持续、让物品有处可放、让身体有一个不被驱逐的地方。在长洲岛这样流动性极高的城中村里，这个\"固定点\"本身就是一种韧性。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创作作为自我疗愈",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "做T恤不是\"艺术创作\"的高大叙事，而是一种日常的自我修复："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "手与物的接触",
                    "value": "喷漆、印刷、晾晒——重复性的手工劳动带来的安定感"
                  },
                  {
                    "label": "创造一个可控的世界",
                    "value": "\"怪物的世界\"是她可以完全掌控的领地"
                  },
                  {
                    "label": "不需要对外交代",
                    "value": "不需要写 artist statement，不需要展览方案"
                  },
                  {
                    "label": "慢慢来",
                    "value": "没有 deadline，没有 KPI，按自己的节奏做"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "手工艺的疗愈力量：当生活充满不确定（搬家、朋友离开、无人回应）时，一件确定的、手可以触碰的事情——把图案印到布上、看着颜料晾干——带来了一种最朴素的安定感。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "t",
            "title": "T恤作为社交润滑剂",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑的公共性不是宣言式的，而是通过一件T恤发生的微观连接："
                ]
              },
              {
                "type": "quote",
                "text": "\"你能不能穿上我的T恤拍个照片？\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这是一个极其简单的请求——不需要解释艺术理念、不需要对方付出任何成本、不需要承诺任何东西。但它打开了一个对话的空间："
                ]
              },
              {
                "type": "preformatted",
                "text": "\"帮我拍照\" ──→ 短暂的互动 ──→ 轻微的连接 ──→ \"有点更像现实中的朋友\""
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "连接工具",
                    "value": "一件手印T恤——可触摸、可穿戴、可留存的物"
                  },
                  {
                    "label": "触发方式",
                    "value": "最简单的请求：\"能不能穿上拍个照？\""
                  },
                  {
                    "label": "门槛",
                    "value": "几乎为零——不需要懂艺术，不需要花钱，只需要穿上然后站着"
                  },
                  {
                    "label": "结果",
                    "value": "\"就感觉稍微和大家的关系稍微近了一点点……有点更像现实中的朋友\""
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "T恤作为\"低风险社交入口\"：在一个人人防备、关系脆弱的城中村里，一个简单到无法拒绝的请求（\"帮我穿一下衣服\"）成为了打破隔阂的工具。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现人们愿意连接",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"我之前会感觉到会有很大的阻力让人帮我拍……后来发现其实很多人很乐意。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这是一个关键的认知转变："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "别人会拒绝",
                    "value": "很多人都愿意"
                  },
                  {
                    "label": "请求是打扰",
                    "value": "请求是连接的契机"
                  },
                  {
                    "label": "自己是负担",
                    "value": "互动是双向的快乐"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不只是一个乐观的发现，而是一种对\"城市孤独症\"的诊断和疗愈：原子化不是因为人们不想连接，而是因为缺乏合法、低风险、不尴尬的连接理由。一件T恤提供了这个理由。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "强哥",
            "subtitle": "一个连接的奇迹",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "强哥（前程序员，被迫离职）是小黑实践中最具戏剧性的公共性案例："
                ]
              },
              {
                "type": "quote",
                "text": "\"穿上T恤之后，整个人就不一样了，就很癫狂，有了爱情的样子。\""
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "前程序员",
                    "meta": [
                      "被迫离职，状态消沉"
                    ],
                    "description": "穿上T恤后\"很癫狂\""
                  },
                  {
                    "title": "村友",
                    "meta": [
                      "彼此不熟的邻居"
                    ],
                    "description": "成为作品的一部分"
                  },
                  {
                    "title": "连接深化",
                    "meta": [
                      "—"
                    ],
                    "description": "强哥和女友主动提出帮他录视频"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"我就很感动，这样的这种小感动吧\"——这种感动不是来自宏大的社会变革，而是来自一个具体的人因为一件T恤而发生的具体变化。强哥从\"被迫离职的程序员\"变成了\"怪物的世界里的一个角色\"——这种身份转换本身就是一种赋权。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "村友之间的互相撑场",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑描述了一场KTV生日场景：朋友们穿着他做的T恤出现。这不是\"销售\"，而是互相撑场——一种非货币化的、基于关系的礼物经济："
                ]
              },
              {
                "type": "preformatted",
                "text": "小黑做T恤 ──→ 送给朋友 ──→ 朋友穿去KTV ──→ \"互相撑场\" ──→ 关系变密"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在长洲岛这个\"你刚认识一个朋友，没两天他都走了\"的地方，这种互相撑场变得尤为珍贵。它不是解决孤独的最终答案，但它让孤独变得稍微可以忍受一点。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "针对城市孤独症的微观处方",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "小黑的实践回应了一个当代城市的根本问题：在大城市中，如何与他人建立真实的、非功利的联系？"
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "物作为中介",
                    "meta": [
                      "T恤降低直接社交的压力，有一个\"正当理由\""
                    ],
                    "description": "低门槛"
                  },
                  {
                    "title": "不追求交易",
                    "meta": [
                      "送出去的比卖掉的多——关系先于交易"
                    ],
                    "description": "反功利"
                  },
                  {
                    "title": "拍照作为仪式",
                    "meta": [
                      "\"穿上我的T恤拍个照\"——一种温柔的、无压迫的请求"
                    ],
                    "description": "仪式感"
                  },
                  {
                    "title": "小而真实",
                    "meta": [
                      "不追求规模，只追求\"稍微近一点点\""
                    ],
                    "description": "反膨胀"
                  },
                  {
                    "title": "被遗忘也没关系",
                    "meta": [
                      "不把连接当成一种\"占有\"——不施加社交压力"
                    ],
                    "description": "松弛感"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"就感觉稍微和大家的关系稍微近了一点点\"——这个\"一点点\"就是全部。不是彻底解决孤独，不是建立一个社群，不是改变社会结构，只是一点点。但在一个人人都在忍受孤独的城市里，这点\"一点点\"已经足够珍贵。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 小黑 / 漫画与手工艺 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于小黑 / 漫画与手工艺公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 小黑 / 漫画与手工艺 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/xiaohei.md"
      ],
      "sourceLabels": [
        "xiaohei.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "xiuxiu": {
    "id": "xiuxiu",
    "profile": {
      "name": "Ruifen & 不子 / 绣绣故事会"
    },
    "triangleTitle": "Ruifen & 不子 / 绣绣故事会的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "刺绣作为共同叙事",
    "centerSubtitle": "让手工劳动、身体实践与女性经验相互编织",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "刺绣离开闺阁，走向公共空间",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会的创造力起点是媒介的重新定义。刺绣在中国传统语境中长期被归类为\"女红\"——一种私密的、家庭的、装饰性的手工劳动。绣绣故事会没有选择\"传承非遗\"式的改良路径，而是将刺绣从三个既有的框架中同时解放出来："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "刺绣=女红的传统叙事",
                    "value": "不将刺绣限定在\"手工艺传承\"或\"非遗保护\"的框架内"
                  },
                  {
                    "label": "刺绣=个人的孤独劳动",
                    "value": "将刺绣变成集体共创的媒介——\"共绣\""
                  },
                  {
                    "label": "刺绣=静止的视觉装饰",
                    "value": "将刺绣与身体表演结合——披上\"许愿池\"进行身体再表达"
                  },
                  {
                    "label": "艺术=白盒子展览",
                    "value": "不在画廊/美术馆进行，而是在榕树下、社区广场"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "针线作为叙事媒介",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会的核心创造在于将刺绣重新定义为叙事媒介。针脚不只是图案，而是故事的物质化："
                ]
              },
              {
                "type": "quote",
                "text": "\"每个人都是自己内在空间的建筑师，也是'家'的创造者。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"房子编织器\"是这一创造性隐喻的集中体现——将钩编与刺绣的技术转化为关于\"家\"的心理探索工具。参与者不是在\"学习一门手艺\"，而是在用针线建造一个关于自己内在世界的模型。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "理论根基：绣绣故事会继承了二高表演对织物的长期探索——从非洲蜡布（African wax print）到刺绣，织物从表演服装转变为独立的创作媒介。这不仅仅是材料实验，而是对织物自身叙事能力的承认：每一块布、每一根线、每一个针脚都携带着记忆与故事。"
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "技术转译",
                    "meta": [
                      "传统女红技术→当代艺术媒介"
                    ],
                    "description": "刺绣、钩编作为创作语言"
                  },
                  {
                    "title": "叙事转译",
                    "meta": [
                      "内心愿望→视觉符号→刺绣技术"
                    ],
                    "description": "\"流动许愿池\"工作坊流程"
                  },
                  {
                    "title": "空间转译",
                    "meta": [
                      "家庭空间→公共空间"
                    ],
                    "description": "榕树下艺术节、甘竹滩广场"
                  },
                  {
                    "title": "身体转译",
                    "meta": [
                      "刺绣成品→身体表演道具"
                    ],
                    "description": "披上\"许愿池\"进行表演再表达"
                  },
                  {
                    "title": "身份转译",
                    "meta": [
                      "手工艺人→共创艺术家"
                    ],
                    "description": "最终作品署名\"绣绣故事会与所有共创者\""
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "把新可能带进现实",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "共绣——流动许愿池",
                    "meta": [
                      "集体刺绣+身体表演",
                      "2024-2025"
                    ],
                    "description": "在顺德甘竹滩广场榕树下，将内心愿望转化为视觉符号，再用刺绣技术物化，最后披上\"许愿池\"进行身体表演——完成从个体心理→视觉符号→物质织品→公共仪式的四重转化"
                  },
                  {
                    "title": "房子编织器",
                    "meta": [
                      "钩编+心理探索工具",
                      "—"
                    ],
                    "description": "一个DIY教程作品，\"每个人都是自己内在空间的建筑师\"——用编织技术建造关于\"家\"的心理模型"
                  },
                  {
                    "title": "女性与水域",
                    "meta": [
                      "空间叙事研究",
                      "—"
                    ],
                    "description": "对\"井边、河边、池边\"作为女性劳动中交换故事的传统空间的再发现与当代化"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "设计方法论",
            "subtitle": "绣绣故事会的创造原则",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从绣绣故事会的实践中，可以提取出独特的创造方法论："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "慢媒介，深叙事",
                    "description": "刺绣的慢时间本身就是叙事结构——一针一线、一个故事接一个故事。不以效率为目标，以深度为尺度"
                  },
                  {
                    "index": "2",
                    "title": "技术服务于叙事，而非反过来",
                    "description": "不炫技。钩编、刺绣的技术选择完全服务于\"流动的家\"\"许愿池\"这些叙事主题"
                  },
                  {
                    "index": "3",
                    "title": "集体署名即创造姿态",
                    "description": "\"绣绣故事会与所有共创者\"——不区分艺术家与参与者，最终的署名本身就是对\"艺术=个人天才\"叙事的拒绝"
                  },
                  {
                    "index": "4",
                    "title": "从内到外的转化链条",
                    "description": "内心愿望→视觉符号→刺绣技术→集体仪式。每一步都是创造，不跳过任何一步"
                  },
                  {
                    "index": "5",
                    "title": "空间的选择即表达",
                    "description": "榕树下、广场边——不是借场地，而是场地的文化记忆本身就是作品的一部分。榕树在岭南文化中本身就是社区聚会的象征"
                  },
                  {
                    "index": "6",
                    "title": "教程而非作品",
                    "description": "\"房子编织器DIY教程\"发布在B站——开放方法而非保护知识产权。创造不是为了制造稀缺，而是为了扩散可能性"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "\"绣绣\"与\"故事会\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "名字的两个部分精准定义了实践的两极："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "\"绣绣\"——动作的重复性、时间性、身体性。叠字的温柔与持续，暗示这不是一次性的\"创作\"，而是持续的\"在做\"。",
                  "\"故事会\"——集体的、口头的、民间的。不同于\"研讨会\"\"分享会\"，\"故事会\"带有一种前现代的、民间的、平等的叙事传统。每个人都有故事，每个故事都值得被倾听。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "二者合在一起——用针线的慢时间，去承载普通人故事的重量——这就是绣绣故事会最核心的创造。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "为\"流动的一代\"造一个家",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会面对的不是抽象的艺术命题，而是一个具体的时代处境——流动的年轻一代找不到\"家\"的感觉："
                ]
              },
              {
                "type": "quote",
                "text": "\"流动的家\"——为中国当代流动的年轻一代，用集体编织创造一种家的感觉。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种诚实在于：不假装这个问题不存在，不提供\"买房\"\"返乡\"式的虚假解决方案，而是用针线和故事重新定义\"家\"的含义——家不是一个物理空间，而是通过共同的劳动和叙事编织出来的关系网络。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "免费工作坊的经济伦理",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会的工作坊全部免费——没有门票、没有材料费、没有\"公益项目\"式的行政管理费用。这种经济姿势是一种内在自洽的选择："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "主要支持",
                    "value": "和地在创（社区艺术支持计划）"
                  },
                  {
                    "label": "活动收费",
                    "value": "全部免费"
                  },
                  {
                    "label": "经济逻辑",
                    "value": "社区艺术支持→免费服务社区参与者。不追求商业变现"
                  },
                  {
                    "label": "拒绝的资本",
                    "value": "手工艺培训班的商业模式、非遗文创的商业化路径"
                  },
                  {
                    "label": "规模定位",
                    "value": "12人——小规模、深度互动，品质优先于数量"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种经济模式的内在自洽在于：刺绣本身是一个慢媒介，如果追求商业效率和规模化，就从根本上背叛了这种媒介的性质。 免费不是\"缺乏商业模式\"，而是对实践本质的诚实承认。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "不子的低调姿态",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在三个创始人中，不子没有独立的社交媒体账号。在\"个人IP\"被奉为圭臬的时代，这是一种罕见的自我隐身："
                ]
              },
              {
                "type": "preformatted",
                "text": "不子的低可见度：\n├── 无独立社交媒体账号\n├── 不进行个人品牌建设\n├── 不在作品之外进行自我表达\n└── 实践本身即全部存在"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种低调不是缺乏能力，而是一种关于何为\"足够\"的清醒认知：不需要个人知名度来验证实践的价值，不需要个人品牌来驱动项目的发展。12个参与者的深度互动比1200个粉丝的数字更重要。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "针线的时间伦理",
            "subtitle": "反加速的慢节奏",
            "kind": "timeline",
            "blocks": [
              {
                "type": "quote",
                "text": "一针一线、一个故事接一个故事。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "刺绣作为媒介，天然地抵抗速度。你不能\"更快地刺绣\"——每一针都需要时间，每一个故事都需要耐心的倾听。这种媒介自带的慢时间为绣绣故事会的实践注入了反加速的伦理："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "工作坊时长",
                    "value": "需要数小时完成一件作品，不允许匆忙"
                  },
                  {
                    "label": "故事的发生",
                    "value": "在刺绣的过程中自然流淌，不需要\"引导\"或\"破冰\""
                  },
                  {
                    "label": "关系的建立",
                    "value": "12人围坐，针线之间，故事自然交换"
                  },
                  {
                    "label": "与二高表演的关联",
                    "value": "不是一次性的快闪，而是在二高表演对织物的长期探索谱系中生长出来"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在绣绣故事会的实践中，可以识别出以下核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "人先于利润/数字",
                    "meta": [
                      "█████"
                    ],
                    "description": "全免费、12人小规模、不追求流量和变现"
                  },
                  {
                    "title": "真实先于表演",
                    "meta": [
                      "█████"
                    ],
                    "description": "不子无个人社交媒体、集体署名、在社区而非画廊空间"
                  },
                  {
                    "title": "自由先于安全",
                    "meta": [
                      "████"
                    ],
                    "description": "不依赖商业模式的独立创作路径、依托社区艺术支持"
                  },
                  {
                    "title": "边缘先于中心",
                    "meta": [
                      "████"
                    ],
                    "description": "顺德而非广州中心、榕树广场而非美术馆、女性手工艺而非主流当代艺术媒介"
                  },
                  {
                    "title": "关系先于交易",
                    "meta": [
                      "█████"
                    ],
                    "description": "免费共创、\"许愿池\"作为心理空间而非商品、故事交换而非信息传递"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "\"共绣——流动许愿池\"",
            "subtitle": "公共仪式的基础设施",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"流动许愿池\"是绣绣故事会公共性的核心实践。它不是一个\"作品\"，而是一个让公共仪式得以发生的框架："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "集体刺绣工作坊+身体表演仪式"
                  },
                  {
                    "label": "地点",
                    "value": "顺德甘竹滩广场榕树下——榕树下艺术节"
                  },
                  {
                    "label": "规模",
                    "value": "12人，亲密尺度"
                  },
                  {
                    "label": "流程",
                    "value": "内心愿望→视觉符号→刺绣技术→集体仪式（披上\"许愿池\"、身体表演再表达）"
                  },
                  {
                    "label": "精神",
                    "value": "\"许愿池\"作为心理空间——外化内在愿望，让不可见的内心世界变成可见的共同织品"
                  },
                  {
                    "label": "门槛",
                    "value": "免费、零基础可参与——不需要\"会刺绣\"，只需要\"有愿望\""
                  },
                  {
                    "label": "署名",
                    "value": "\"绣绣故事会与所有共创者\"——集体作者身份"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"许愿池\"的公共性意义：在中国传统文化中，许愿池（投币许愿的水池）是一个公共心理空间——人们将私人的愿望投入公共的池水中，被陌生人看见又在水中模糊。绣绣故事会将它从水的隐喻转化为织品的隐喻——愿望不再是沉入水底的硬币，而是可以被披在身上、集体表演、四处流动的织品。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "榕树下艺术节",
            "subtitle": "嵌入社区而非寄生社区",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会的工作坊不是孤立的活动，而是榕树下艺术节的一部分。这决定了它的公共性不是\"把艺术带到社区\"的居高临下姿态，而是成为社区节日的有机组成部分："
                ]
              },
              {
                "type": "preformatted",
                "text": "传统的\"艺术下社区\"模式：\n艺术家 → 带着作品 → 到社区展览 → 离开\n\n绣绣故事会的模式：\n社区节日（榕树下艺术节）\n    ├── 当地居民自然聚集\n    ├── 榕树的象征（岭南社区聚会的传统空间）\n    ├── 绣绣故事会在此开展\"共绣\"\n    ├── 参与者从\"社区居民\"变成\"共创艺术家\"\n    └── 作品留在社区的记忆中，而非带走"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "榕树的选择不是偶然的：在岭南文化中，榕树头下历来是社区集体生活的中心——下棋、聊天、乘凉、讲故事。选择榕树下做刺绣工作坊，是在激活这个空间原有的记忆和功能，而非创造一个\"艺术事件\"。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "关系重建的三个层次",
            "subtitle": null,
            "kind": "relation-levels",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会的实践在不同尺度上重建了人与人的连接："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "参与者与自己内心之间：── \"许愿池\"作为心理探索工具"
                  },
                  {
                    "label": "层次 2",
                    "value": "参与者与参与者之间：── 12人围坐共绣 → 故事在针线间自然流淌"
                  },
                  {
                    "label": "层次 3",
                    "value": "女性手工艺与公共空间之间：── 刺绣离开闺阁 → 进入榕树广场 → 被看见"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "\"女性与水域\"",
            "subtitle": "对传统公共空间的再发现",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会提出了一个重要的空间叙事：\"井边、河边、池边历来是女性在劳动中交换故事、建立情谊的场所。\""
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "井边",
                    "meta": [
                      "打水等待中的交谈"
                    ],
                    "description": "工作坊中针线之间的交谈"
                  },
                  {
                    "title": "河边",
                    "meta": [
                      "洗衣时的集体劳动"
                    ],
                    "description": "围坐共绣的集体劳动"
                  },
                  {
                    "title": "池边",
                    "meta": [
                      "浣纱时的故事交换"
                    ],
                    "description": "\"许愿池\"的故事外化与交换"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这一发现的公共性意义：在主流公共空间叙事中，广场是男性的（政治演讲）、茶馆是男性的（谈生意）。而绣绣故事会指出了一条被忽视的女性公共空间谱系——水域边的劳动空间。这些空间没有名字、不被记载、不被视为\"公共领域\"，但确实是女性交换故事、建立情谊、形成支持网络的场所。绣绣故事会将这一传统空间当代化——在榕树下的广场（另一种\"水边\"），让刺绣重新成为女性（及其他性别）共同劳动、共同叙事的媒介。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "开放共享",
            "subtitle": "方法论的扩散",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会的公共性不止于工作坊的现场，更通过开放共享将方法论扩散出去："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "B站\"房子编织器DIY教程\"",
                    "meta": [
                      "将核心创作方法免费公开"
                    ],
                    "description": "任何人可以学习、改编、再创造——不是\"看我的作品\"，而是\"你也可以做\""
                  },
                  {
                    "title": "Instagram @xiuxiugushihui",
                    "meta": [
                      "作品记录、过程分享"
                    ],
                    "description": "27条评论的工作坊招募帖——比许多大号更深度的社区互动"
                  },
                  {
                    "title": "作品巡回展出",
                    "meta": [
                      "从顺德榕树到其他展场"
                    ],
                    "description": "\"许愿池\"作为可移动的公共仪式——在不同的空间承载不同人群的愿望"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "27条评论的意义：在流量驱动的社交媒体生态中，一个有影响力的账号可能收到大量但浅层的点赞。而一个招募帖子能引发27条评论，意味着深度参与而非广泛曝光——这不是\"传播广\"，而是\"连接深\"。"
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "绣绣故事会的公共性是有边界和有意识的："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做商业手工艺培训",
                    "value": "刺绣不是技能交易，而是叙事媒介"
                  },
                  {
                    "label": "不做非遗传承式的保护",
                    "value": "不是让刺绣\"活下去\"，而是让刺绣\"做新的事\""
                  },
                  {
                    "label": "不在画廊/美术馆做",
                    "value": "刺绣需要回到它原本所在的社区空间"
                  },
                  {
                    "label": "不做个人艺术家品牌",
                    "value": "集体署名、\"绣绣故事会与所有共创者\""
                  },
                  {
                    "label": "不做大规模工作坊",
                    "value": "12人——再大就会失去\"井边交谈\"的亲密性"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "独有贡献",
            "subtitle": "将\"女性手工艺\"确立为公共叙事媒介",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，绣绣故事会贡献了一种独特的方法论："
                ]
              },
              {
                "type": "quote",
                "text": "刺绣作为公共叙事媒介（Embroidery as Public Narrative Medium）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是将刺绣作为\"文化遗产\"来保护，不是作为\"手工艺产品\"来开发，也不是作为\"个人艺术创作\"来署名——而是将刺绣拉到公共空间，让普通人的故事和愿望通过针线获得物质形态，再通过集体仪式被表演和流动。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不子的实践暗示：无个人社交媒体——刺绣不是\"我的作品\"，而是\"我们共同的故事\"。这种去个人化的姿态，恰恰是让刺绣从\"艺术家媒介\"回到\"民间媒介\"的关键一步。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 Ruifen & 不子 / 绣绣故事会 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于Ruifen & 不子 / 绣绣故事会公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 Ruifen & 不子 / 绣绣故事会 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/xiuxiu.md"
      ],
      "sourceLabels": [
        "xiuxiu.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "xu_yihan": {
    "id": "xu_yihan",
    "profile": {
      "name": "徐艺函 / 起风了社区"
    },
    "triangleTitle": "徐艺函 / 起风了社区的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "照护劳动的公共化",
    "centerSubtitle": "把家务、女性经验和陶瓷带入公共艺术",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "创造力的起点",
            "subtitle": "从个人痛苦到公共艺术实践",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函的创造力起点是极度私人的伤痛。1989年生于连云港，母亲55岁因癌症去世，母亲生前最大的遗憾是\"没有过爱情\"——这个遗言成为徐艺函追问\"爱是什么\"的原点。她不是社会学家或女性主义学者式地从理论出发做研究，而是从自己最痛的地方出发，把私人的伤口转化为公共的艺术行动。"
                ]
              },
              {
                "type": "quote",
                "text": "\"人类是在照护的时候，身体照护的时候学会怎么去爱的。\" ——柯倩婷"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这是徐艺函整个实践的理论基石：她不是在\"发明\"创造，而是在\"发现\"照护劳动中原本就存在但被遮蔽的创造性和爱的能力。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "母亲去世",
                    "value": "母亲55岁因癌症去世，遗言\"没有过爱情\"——成为追问\"爱\"的原动力"
                  },
                  {
                    "label": "个人情感危机",
                    "value": "经历失败的感情关系、三次离婚——不是抽象地研究爱，而是在痛苦中摸索"
                  },
                  {
                    "label": "癌症焦虑",
                    "value": "母亲患癌的经历让她对自身健康产生焦虑——照护者的恐惧成为创作材料"
                  },
                  {
                    "label": "艺术媒介转型",
                    "value": "从画廊里的陶瓷艺术家转向社区公共艺术实践——拒绝\"纯艺术\"的安全区"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "照护劳动公共化",
            "subtitle": "一条尚未被命名的艺术路径",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函的核心创造力在于把\"照护劳动\"从私人家庭领域搬到公共空间，使其成为可见的、可讨论的、可集体参与的艺术形式。这是一种媒介层面的创造：不是改良陶瓷艺术，而是把整个\"伺候人的活\"确立为艺术媒介。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "抹布神艺术节",
                    "value": "收集家庭抹布，缝制成巨型蝴蝶，在村庄游行"
                  },
                  {
                    "label": "保洁员靠垫项目",
                    "value": "与上海外滩保洁员一对一合作，将她们的童年故事缝制成靠垫"
                  },
                  {
                    "label": "\"母亲的选择\"写作工作坊",
                    "value": "为母亲/女性照护者创造书写自身经验的空间"
                  },
                  {
                    "label": "\"不要分离\"展览",
                    "value": "从参与者家中收集物件，将她们的言语绣在窗帘上"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "把新的可能带进现实",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "抹布神艺术节",
                    "meta": [
                      "社区公共艺术",
                      "—"
                    ],
                    "description": "从家家户户收集来的抹布——最卑微的家务工具——缝成巨型蝴蝶。在村庄里游行，开设\"照护市集\"。把\"伺候人的活\"从后台推到前台"
                  },
                  {
                    "title": "保洁员靠垫项目",
                    "meta": [
                      "一对一合作艺术",
                      "—"
                    ],
                    "description": "与上海外滩保洁员一对一合作，每个靠垫承载一个童年故事。保洁员不是\"被帮助的对象\"，而是共同创作者"
                  },
                  {
                    "title": "\"母亲的选择\"写作工作坊",
                    "meta": [
                      "社区写作",
                      "—"
                    ],
                    "description": "为妈妈们和女性照护者创造写作空间——不是教她们写作，而是让她们的经验被听见"
                  },
                  {
                    "title": "\"不要分离\"展览",
                    "meta": [
                      "参与式装置",
                      "—"
                    ],
                    "description": "从参与者家中收集物品，将她们的言语绣在窗帘上——\"家\"的碎片被带入公共空间"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创作方法论",
            "subtitle": "五步协作流程",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从徐艺函的实践中，可以提取出系统的创作方法："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "分享照护经验",
                    "description": "先坐下来聊天——保洁员讲她们的故事，参与者分享自己的照护经历。不预设主题，让真实的经验浮现"
                  },
                  {
                    "index": "2",
                    "title": "收集抹布/物件",
                    "description": "从家庭中收集使用过的抹布、日常物件——这些物品承载着真实的劳动痕迹"
                  },
                  {
                    "index": "3",
                    "title": "田野观察",
                    "description": "进入保洁员的工作现场，观察她们如何与城市空间互动"
                  },
                  {
                    "index": "4",
                    "title": "共同创作",
                    "description": "一对一合作——不是艺术家为她们创作，而是和她们一起创作。靠垫上的图案来自保洁员自己的童年记忆"
                  },
                  {
                    "index": "5",
                    "title": "重建连接",
                    "description": "将作品带回公共空间展示，让不同阶层的人围坐在一起——重建被城市空间割裂的人与人之间的连接"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名的创造力",
            "subtitle": "\"抹布神\"与\"起风了\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"抹布神\"：将最卑微的家务工具——抹布——封\"神\"，这是一种创造性的价值重估。在中国民间宗教中，每一行都有守护神，而\"抹布神\"是徐艺函为照护劳动者发明的神——用荒诞的庄重，为看不见的劳动赋予神圣性。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"起风了\"：社区名称来自\"风起于青萍之末\"——微小的行动可以汇聚成风。这不是\"改变世界\"的宏大叙事，而是承认自己的实践从最细微处开始。"
                ]
              },
              {
                "type": "quote",
                "text": "陶瓷艺术从画廊走向社区，从个人表达走向共同创作——不是放弃艺术，而是扩展艺术的边界。"
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "从个人危机中出发",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函没有把自己包装成\"公益人\"或\"女性主义者\"的英雄形象。她的故事起点是一系列具体的、私人的痛苦："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "母亲55岁癌症去世",
                    "value": "不是抽象地\"关心女性议题\"，而是母亲具体的死亡和遗言击中了她"
                  },
                  {
                    "label": "癌症焦虑",
                    "value": "因为母亲患癌，她对自身健康产生恐惧——不回避自己的身体焦虑"
                  },
                  {
                    "label": "三次离婚",
                    "value": "不回避\"爱情很难\"这一事实——她自己也没有找到完美的答案"
                  },
                  {
                    "label": "失败的感情关系",
                    "value": "承认自己也在\"爱\"这件事上不断受伤和摸索"
                  },
                  {
                    "label": "艺术身份危机",
                    "value": "从陶瓷艺术家转向社区实践——承认传统艺术路径无法回应自己的生命问题"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"如果说我没有照顾我小孩的话，不知道我能不能够共情到一个躺在床上的人。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话揭示了她的诚实：她不是站在道德高地上\"帮助他人\"，而是承认自己的照护经验（照顾孩子）是她能理解他人痛苦的前提。照护不是美德表演，而是共情能力的来源。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "劳动是一种爱情",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函的内在自洽来自一个深刻的认识：照护劳动本身是学会爱的途径。这个认识来自柯倩婷的理论，但在她的实践中被验证："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "她的孩子说\"劳动是一种爱情\"——这句话成为她实践的注脚",
                  "通过照顾他人（孩子、母亲、社区参与者），她在疗愈自己失去母亲的伤",
                  "她不是在\"付出\"，而是在\"学习\"——学习怎么去爱"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种自洽不是独善其身的，而是关系性的：她的安顿不来自独处或冥想，而来自与他人的照护关系中。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "六年的信任建设",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函对待时间的耐心是她韧性的核心证据。以薛阿姨为例："
                ]
              },
              {
                "type": "preformatted",
                "text": "认识薛阿姨 ──→ 6年\n开始工作坊 ──→ 3年后她才开始写作\n\n不是\"做了工作坊就有成果\"的逻辑\n而是\"等到她愿意写\"的耐心"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "时间伦理特征："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "以年为单位：不是\"三个月出成果\"的项目逻辑，而是以年为刻度积累信任",
                  "不追求可见产出：三年工作坊薛阿姨才开始写作——在主流评价体系中，这是\"低效\"的",
                  "信任先于表达：先让参与者感到安全，再让表达自然发生"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "从照护中疗愈",
            "subtitle": "重建\"公共性的家庭\"",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函的疗愈路径是独特的："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "初始困境",
                    "value": "母亲去世、癌症焦虑、三次离婚、\"城市中的人如何去爱\"的困惑"
                  },
                  {
                    "label": "发现路径",
                    "value": "通过与薛阿姨的关系，看到自家婚姻中的同构的阶级结构"
                  },
                  {
                    "label": "核心领悟",
                    "value": "\"城市中的人如何去爱\"——问题不在于缺乏爱，而在于缺乏\"公共性的爱\""
                  },
                  {
                    "label": "实践方案",
                    "value": "建设\"起风了社区\"——一个超越血缘关系的\"公共性的家庭\""
                  },
                  {
                    "label": "疗愈结果",
                    "value": "不是找到答案，而是找到和他人一起追问的方式"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"城市中的人如何去爱\"——她的回答是：不是在私密关系中寻找完美的爱，而是通过照护劳动和公共实践，扩大\"爱\"的边界。"
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从徐艺函的实践中，可以提取出她的核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "真实先于表演",
                    "meta": [
                      "█████"
                    ],
                    "description": "坦诚三次离婚、坦诚自己对爱的困惑——不表演\"完美公益人\""
                  },
                  {
                    "title": "关系先于产出",
                    "meta": [
                      "█████"
                    ],
                    "description": "六年认识、三年工作坊才等到薛阿姨动笔——关系比成果重要"
                  },
                  {
                    "title": "照护先于效率",
                    "meta": [
                      "█████"
                    ],
                    "description": "不以项目产出为尺度，以信任建立为尺度"
                  },
                  {
                    "title": "平等先于助人",
                    "meta": [
                      "█████"
                    ],
                    "description": "保洁员是\"共同创作者\"而非\"帮扶对象\""
                  },
                  {
                    "title": "公共先于私人",
                    "meta": [
                      "████"
                    ],
                    "description": "将私人情感经验转化为公共艺术行动"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "让看不见的劳动被看见",
            "subtitle": "保洁员成为共同创作者",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函公共性实践的核心是让照护劳动从\"不可见\"变为\"可见\"。她选择了城市中最具象征性的群体——保洁员："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "问题意识",
                    "value": "保洁员触摸城市的每一个角落，却不属于城市——她们是城市空间中最\"不可见\"的人"
                  },
                  {
                    "label": "实践方式",
                    "value": "一对一合作——艺术家和保洁员坐在一起，平等地创作"
                  },
                  {
                    "label": "创作内容",
                    "value": "靠垫——一个承载\"家\"和\"照护\"意象的物品。每个靠垫的图案来自保洁员自己的童年故事"
                  },
                  {
                    "label": "身份转换",
                    "value": "保洁员从\"被服务的对象\"变成\"共同创作者\"——不是帮助她们，而是和她们一起工作"
                  },
                  {
                    "label": "理论意指",
                    "value": "\"照护劳动公共化\"——把家庭内部的、无偿的、不被认可的劳动，带入公共视野，赋予其价值和尊严"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "跨阶层连接的\"童话时刻\"",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函的实践创造了在正常社会秩序中不可能发生的相遇："
                ]
              },
              {
                "type": "quote",
                "text": "\"在城市空间当中，不太可能肩并肩坐在一起干活的人，却围坐在了一起。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "一位参与者将这个场景描述为\"像童话一样\"——银行职员、研究生、保洁员坐在一起缝制靠垫。这不是刻意设计的\"团建\"，而是通过共同劳动自然发生的连接。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"童话\"的含义：在阶层分化的城市日常中，这些群体几乎没有平等相处的物理空间。徐艺函的艺术实践创造了这样一个空间——不是通过\"对话\"或\"讲座\"，而是通过一起用手劳动。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "薛阿姨的故事",
            "subtitle": "照护者权利的隐藏代价",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函通过长期的陪伴关系，揭示了照护劳动背后系统性的权利让渡。薛阿姨——一位家政工作者——的故事揭示了照护者在家庭中经历的三重权利让渡："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "第一层",
                    "value": "劳动权的让渡：── 家政劳动被视为\"帮忙\"而非\"工作\"，报酬被压低，权益不被承认"
                  },
                  {
                    "label": "第二层",
                    "value": "情感权的让渡：── 照护者被期待\"像家人一样\"付出情感，但情感付出不计入报酬"
                  },
                  {
                    "label": "第三层",
                    "value": "话语权的让渡：── 照护者的经验和知识不被正视——\"伺候人的活\"被认为不需要智慧"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函的公共性贡献：不是替薛阿姨说话，而是创造了一个让薛阿姨自己能够开口的空间。六年的相识、三年的工作坊，终于等到薛阿姨开始写作她自己的故事。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "上海外滩项目",
            "subtitle": "在阻力中建立连接",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "上海外滩靠垫项目的实施过程本身就是公共性实践："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "管理方的阻挠",
                    "value": "管理方不希望保洁员与外来者接触——正常的权力结构试图隔绝这种连接"
                  },
                  {
                    "label": "找到\"关键连接者\"",
                    "value": "发现保安队长才是能连接所有保洁员的人——社会网络有自己的关键节点"
                  },
                  {
                    "label": "与保洁员交朋友",
                    "value": "不是\"进入现场→收集材料→离开\"的采风逻辑，而是建立真实的友谊"
                  },
                  {
                    "label": "共同创作而非提取",
                    "value": "保洁员的童年故事缝在靠垫上——不是艺术家\"再现\"她们的故事，而是一起创作"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "公共性不是没有阻力：管理方的阻挠恰恰说明这种连接触及了真实的权力结构。真正的公共实践不是绕开阻力，而是在阻力中坚持。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "\"公共性的爱\"",
            "subtitle": "重新定义爱的范畴",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函从个人追问\"爱是什么\"出发，最终抵达了一个公共性的答案："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "起点",
                    "value": "母亲遗言\"没有过爱情\"——爱是浪漫关系的缺失"
                  },
                  {
                    "label": "追问",
                    "value": "\"城市中的人如何去爱\"——发现私密的爱情远远不够"
                  },
                  {
                    "label": "发现",
                    "value": "通过照护劳动学会共情——\"劳动是一种爱情\"（她孩子的话）"
                  },
                  {
                    "label": "升华",
                    "value": "\"公共性的爱\"——不只是浪漫关系，而是扩展到社会的照护网络"
                  },
                  {
                    "label": "实践",
                    "value": "起风了社区——一个超越血缘关系的\"公共性的家庭\""
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"如果说我没有照顾我小孩的话，不知道我能不能够共情到一个躺在床上的人。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "照护经验是共情能力的基础——这是徐艺函经过自身验证的洞察。公共性的爱不是抽象的口号，而是在具体的照护行为中建立的、可以扩展到陌生人的共情能力。"
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "独有贡献",
            "subtitle": "将\"照护劳动\"确立为公共艺术的媒介",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，徐艺函/起风了社区贡献了一种极其独特的方法论："
                ]
              },
              {
                "type": "quote",
                "text": "Care Work as Public Art（照护劳动即公共艺术）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是用艺术\"表现\"照护，不是用艺术\"帮助\"照护者，而是让照护劳动本身成为公共空间中的艺术行动。抹布的缝制、靠垫的共创、写作工作坊——这些都是照护劳动的形式，同时也是艺术创作的形式。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "柯倩婷的总结："
                ]
              },
              {
                "type": "quote",
                "text": "\"人类是在照护的时候，身体照护的时候学会怎么去爱的。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是关于\"做艺术\"，而是关于通过照护劳动重建人与人之间的爱。 抹布不是隐喻，照护不是题材——抹布就是照护，照护就是艺术。这个等式本身，就是徐艺函带给公共艺术领域最激进的贡献。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 徐艺函 / 起风了社区 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于徐艺函 / 起风了社区公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 徐艺函 / 起风了社区 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/xu_yihan.md"
      ],
      "sourceLabels": [
        "xu_yihan.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "zhao_yiren": {
    "id": "zhao_yiren",
    "profile": {
      "name": "赵伊人 / 定海桥互助社"
    },
    "triangleTitle": "赵伊人 / 定海桥互助社的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "在地互助与自我教育",
    "centerSubtitle": "让社区关系、照护劳动和艺术行动彼此可见",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "游戏作为社会分析工具",
            "subtitle": "\"浮萍定海\"的方法论发明",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人的创造力体现在一种媒介跨界的能力——将 LARP（实况角色扮演游戏）从娱乐场域迁移到社会议题的讨论空间中。与赵蒙旸、殷艾雯共同创作的\"浮萍定海\"（Floating Duckweed Settling Sea）是一个大规模 LARP 游戏，其核心创造在于：用游戏机制让隐形的照护劳动变得可见、可量化。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是一个\"关于照护劳动\"的讲座或展览，而是一个让参与者在游戏过程中亲身经历照护经济学逻辑的体验装置。游戏的规则本身即是媒介——玩家在遵守规则、做出选择的过程中，自然体会到照护劳动在社会中被系统性地低估和隐形的困境。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "媒介创新",
                    "value": "LARP 作为社会分析工具——不用于娱乐或奇幻叙事，而用于呈现社会现实的结构性问题"
                  },
                  {
                    "label": "知识生产",
                    "value": "让照护劳动从\"抽象概念\"变成\"可量化的游戏机制\"——这是一种新的知识传递方式"
                  },
                  {
                    "label": "合作创造",
                    "value": "与殷艾雯、赵蒙旸共同创作——三位来自不同背景的实践者，在交叉点上生成新可能"
                  },
                  {
                    "label": "可体验的理论",
                    "value": "不是\"告诉你\"照护劳动被低估，而是\"让你在游戏中体验到\"它——身体知识先于抽象认知"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "定海桥互助社作为\"另类机构\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "定海桥互助社本身就是一种制度层面的创造——它不是政府的社会服务机构，不是 NGO，不是商业社区中心，而是一种自组织、互助为基础的另类机构。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人作为定海桥互助社的长期参与者（自约2015年起），深度参与了这一另类机构的构建与运营。在上海市杨浦区定海桥——一个历史上是工人阶级聚居区、如今正经历城市更新改造的地段——定海桥互助社创造了一个不属于任何既有系统的空间："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "自组织形式",
                    "value": "非政府、非基金会、非商业——由参与者共同维护和决策"
                  },
                  {
                    "label": "互助逻辑",
                    "value": "不是\"服务提供者—受益者\"的慈善模式，而是平等的互助关系"
                  },
                  {
                    "label": "空间在地性",
                    "value": "扎根定海桥——不脱离具体的地理和社区脉络"
                  },
                  {
                    "label": "反制度化弹性",
                    "value": "不追求成为\"正式机构\"，保持小规模、可调整、有生命力的状态"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表实践",
            "subtitle": "将艺术、教育与社区组织融为一体",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "\"浮萍定海\"LARP",
                    "meta": [
                      "游戏/社会介入"
                    ],
                    "description": "用 LARP 游戏机制呈现照护经济学——游戏从娱乐媒介变为社会分析工具。与殷艾雯、赵蒙旸合作创作"
                  },
                  {
                    "title": "定海桥互助社",
                    "meta": [
                      "社区组织/另类机构"
                    ],
                    "description": "在上海边缘地带长期运营一个自组织的互助空间——制度创造"
                  },
                  {
                    "title": "\"流体愈学\"",
                    "meta": [
                      "艺术/教育/疗愈"
                    ],
                    "description": "将治愈与学习转化为公共实践——打破\"治疗是私人的、学习是制度化的\"边界"
                  },
                  {
                    "title": "自我教育实践",
                    "meta": [
                      "教育"
                    ],
                    "description": "不以\"教—学\"的等级关系组织，而是以共同探索的方式——教育作为一种平等的共同生活"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "创造方法论",
            "subtitle": "跨界的编织术",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人的创造方法论不是\"在某个领域内精进\"，而是在不同领域之间编织连接："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "游戏作为方法，不是目的",
                    "description": "LARP 不用于娱乐，而用于社会分析——媒介服务于问题，而非问题服务于媒介"
                  },
                  {
                    "index": "2",
                    "title": "合作即创造",
                    "description": "\"浮萍定海\"是与殷艾雯、赵蒙旸的合作产物——创造不是孤立的个人行为，而是在对话和碰撞中生成"
                  },
                  {
                    "index": "3",
                    "title": "让隐形变得可感知",
                    "description": "照护劳动、社区关系、互助网络——这些\"看不见\"的东西，通过游戏机制被具身化"
                  },
                  {
                    "index": "4",
                    "title": "制度即作品",
                    "description": "定海桥互助社的运营方式本身就是一种创造——不是\"做一个关于互助的作品\"，而是\"做一个互助的机构\""
                  },
                  {
                    "index": "5",
                    "title": "不急于被命名",
                    "description": "实践在前，归类在后——不被\"这是艺术\"\"这是教育\"\"这是社工\"的边界束缚"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "\"浮萍定海\"的诗学",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"浮萍定海\"这个名字本身就是一种创造性表达——浮萍（漂泊、无根、微小）与定海（安定、锚定、宏大）之间的张力，精确地捕捉了当代中国城市中个体生命的处境：微小如浮萍，却仍然在尝试为彼此创造一片可以定下来的海。这不是自上而下的宏大叙事，而是以微小行动回应宏大困境的诗学。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "长期锚定",
            "subtitle": "社区的持续在场",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人的身心安顿之道在于长期承诺。自约2015年起深度参与定海桥互助社——这不是\"做几个项目然后离开\"的项目制逻辑，而是将自己的一部分生命嵌入一个具体的社区和地点。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种长期性本身就是一种对当代加速主义的抵抗。在项目制（做三个月、汇报、拿下一笔钱）、流动制（哪里有资源去哪里）、曝光制（追求被看见、被认可）成为默认工作方式的时代，持续十年地留在一个社区是一种激进的选择。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "时间尺度",
                    "value": "约2015年至今，十年以上的持续参与"
                  },
                  {
                    "label": "空间锚点",
                    "value": "上海杨浦定海桥——一个具体的、有历史的、正在变化的街区"
                  },
                  {
                    "label": "关系积累",
                    "value": "不是每一次都\"从零开始建立信任\"，而是累积性的社区关系"
                  },
                  {
                    "label": "内在节奏",
                    "value": "不追求\"快速产出\"，容忍缓慢和反复"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "互助作为日常实践",
            "subtitle": "不是意识形态，是生活本身",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "定海桥互助社的核心理念——\"互助\"——不是在纸面上讨论的意识形态，而是每天在做的事情："
                ]
              },
              {
                "type": "quote",
                "text": "互助不是\"我帮你\"，而是\"我们一起\"。"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "在定海桥互助社中，没有人是纯粹的\"服务提供者\"或纯粹的\"受益者\"——每个人既是给予者也是接受者。这种非等级化的互助关系提供了赵伊人内在自洽的伦理基础：不需要扮演\"帮助者\"的道德优越感，也不需要承受\"被帮助者\"的亏欠感。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "在城市边缘安顿",
            "subtitle": "定海桥作为锚点",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "定海桥是一个历史上工人阶级聚居的上海街区，正经历城市更新和再开发。选择在这里扎根——而不是在艺术区、高校周边或中产社区——本身就是一种自我定位："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "与主流保持距离：不在艺术圈的中心，不在知识圈的中心，不在商业圈的中心",
                  "与具体的人在一起：不是抽象的\"无产阶级\"概念，而是定海桥的邻居们",
                  "接受变化：定海桥本身在变化（改造、拆迁、人口流动），社区工作在流动中寻找锚点"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "自我教育作为生活方式",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人将\"自我教育\"作为生活实践——不是去机构里被教育，也不是去教育别人，而是和他人一起学习。这种自我教育不是获取文凭或技能的手段，而是一种对待世界的基本态度：保持好奇、保持开放、保持学习的状态。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这与定海桥互助社的精神高度一致——互助社不仅是一个\"做活动\"的地方，更是一个共同学习、共同成长的共同体。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从赵伊人的实践中，可以提取出以下核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "互助先于竞争",
                    "meta": [
                      "█████"
                    ],
                    "description": "互助社的基本逻辑——不是谁做得更好，而是一起做"
                  },
                  {
                    "title": "长期先于速效",
                    "meta": [
                      "████"
                    ],
                    "description": "十年对一个社区的持续投入"
                  },
                  {
                    "title": "过程先于成果",
                    "meta": [
                      "████"
                    ],
                    "description": "互助作为日常实践，而非为了产出\"项目报告\""
                  },
                  {
                    "title": "边缘先于中心",
                    "meta": [
                      "████"
                    ],
                    "description": "扎根定海桥而非市中心、艺术区"
                  },
                  {
                    "title": "平等先于等级",
                    "meta": [
                      "█████"
                    ],
                    "description": "互助社的非等级化组织方式，自我教育的共同探索模式"
                  }
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "让照护劳动可见",
            "subtitle": "\"浮萍定海\"的公共教育",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人公共性实践最核心的贡献是让系统性地被隐形的照护劳动变得可见："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "问题",
                    "value": "照护劳动（照料老人、抚育儿童、情感劳动、社区维护）在社会经济体系中被系统性地低估、不计入GDP、不被视为\"真正的工作\""
                  },
                  {
                    "label": "方法",
                    "value": "用 LARP 游戏机制将其量化——玩家在游戏中做出的照护选择直接影响游戏进程和结果"
                  },
                  {
                    "label": "效果",
                    "value": "参与者不是\"听到\"照护劳动很重要，而是在游戏过程中体验到它的不可或缺"
                  },
                  {
                    "label": "超越性",
                    "value": "这不是一个\"关于照护劳动\"的作品，而是一个让照护劳动被感知的体验装置"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"浮萍定海\"的公共性意义：它让每一个参与游戏的人——这些人可能包括艺术从业者、学生、社区工作者、普通市民——亲身经历了一套不同于主流经济学的价值衡量体系。在这个体系里，照护不是附属品，不是\"真正工作之外\"的事，而是整个社会运转的基石。这种体验比任何讲座、文章、口号都更有力地改变了参与者对\"什么是重要的工作\"的理解。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "社区自主",
            "subtitle": "定海桥互助社作为公共基础设施",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "定海桥互助社的长期运营本身就是一项公共基础设施的建设——不是物理意义上的\"盖楼\"，而是社会意义上的\"织网\"："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "层次 1",
                    "value": "空间层：── 在定海桥提供一个实体空间——可以聚集、讨论、创作、休息"
                  },
                  {
                    "label": "层次 2",
                    "value": "关系层：── 社区邻里之间建立互助网络——不是你帮我我帮你，"
                  },
                  {
                    "label": "层次 3",
                    "value": "制度层：── 自组织、互助为基础的\"另类机构\"——证明了"
                  },
                  {
                    "label": "层次 4",
                    "value": "认知层：── 让更多人看到：上海不只有陆家嘴和法租界，"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人在其中扮演的角色不是\"领导者\"或\"创始人\"，而是一个长期的、持续的参与者和编织者——不是建立机构然后离开，而是在日常中一针一线地编织社区关系。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "连接体制与基层",
            "subtitle": "艺术机构与社区的双向通道",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人实践的一个独特之处在于横跨体制与基层两个世界："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "艺术体制",
                    "meta": [
                      "上海双年展、上海当代艺术博物馆（PSA）"
                    ],
                    "description": "将定海桥互助社的实践带入艺术机构的讨论中——让\"社区\"不只是当代艺术的修辞"
                  },
                  {
                    "title": "社区基层",
                    "meta": [
                      "定海桥居民、互助社参与者"
                    ],
                    "description": "将艺术机构的资源和注意力反向导入社区——不是\"艺术家下乡\"，而是双向的、平等的关系"
                  },
                  {
                    "title": "学术界",
                    "meta": [
                      "赵蒙旸（合作者——学术背景）"
                    ],
                    "description": "将学术理论（照护经济学、性别研究）落地为可体验的游戏机制"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种横跨不同世界的能力本身就是一种公共性——不是站在任何一个单一系统内部说话，而是在不同系统之间翻译、连接、创造对话。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "\"流体愈学\"",
            "subtitle": "治愈作为公共实践",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"流体愈学\"项目——赵伊人参与的另一项实践——将治愈和学习从私人领域拉入公共空间："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "治愈不是私人的：创伤和痛苦往往有社会根源——在公共空间中被看见、被讨论、被共同面对，本身就是治愈的一部分",
                  "学习不是制度化的：不是去学校\"被教育\"，而是和同伴一起探索、一起成长",
                  "公共实践：将通常被私人化或医疗化的\"治愈\"重新置于社会关系网络中"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "边界与选择",
            "subtitle": "什么不是公共性",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "赵伊人的公共性同样有明确的边界："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "不做一次性\"社区艺术项目\"",
                    "value": "一次性的介入无法建立真正的信任和关系——需要长期在场"
                  },
                  {
                    "label": "不把社区当作材料",
                    "value": "定海桥互助社不是\"艺术家的田野调查对象\"，而是共同生活的空间"
                  },
                  {
                    "label": "不追求体制化",
                    "value": "不定海桥互助社成为\"正式机构\"——保持小规模、去中心化、灵活调整的能力"
                  },
                  {
                    "label": "不做单向\"赋能\"",
                    "value": "\"我来赋能你们\"是傲慢的——互助不是单向的给予"
                  },
                  {
                    "label": "不让照护劳动继续隐形",
                    "value": "整个\"浮萍定海\"的核心使命——打破这种系统性的隐形"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "独有贡献",
            "subtitle": "让\"照护\"成为公共话语的核心",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，赵伊人贡献了一种尚未被充分关注的公共性方法论："
                ]
              },
              {
                "type": "quote",
                "text": "照护劳动的可视化与公共化（Making Care Labor Visible and Public）"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是关于\"做好事\"或\"帮助弱势群体\"的慈善叙事，而是关于重新定义什么是\"有价值的工作\"。在一个将 GDP 增长、技术创新、资本回报视为唯一重要指标的社会中，赵伊人通过定海桥互助社的日常实践和\"浮萍定海\"的游戏机制，提出并实践了一个根本性的追问："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "如果照护彼此不再是被忽视的附属品，而是社会运转的核心——这个世界会是什么样子？"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是一个空泛的哲学问题，而是一个被游戏化的、可体验的、可参与的公共实践。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 赵伊人 / 定海桥互助社 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于赵伊人 / 定海桥互助社公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 赵伊人 / 定海桥互助社 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/zhao_yiren.md"
      ],
      "sourceLabels": [
        "zhao_yiren.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  },
  "zhu_jingming": {
    "id": "zhu_jingming",
    "profile": {
      "name": "朱璟茗"
    },
    "triangleTitle": "朱璟茗的良好生活三角",
    "triangleSubtitle": "基于该成员良好生活标准分类文件整理的创造力、身心安顿与公共性内容。",
    "centerText": "重新做人",
    "centerSubtitle": "把精神健康经验转化为公共知识与写作",
    "dimensions": [
      {
        "key": "create",
        "title": "创造力 / Create Well",
        "subtitle": "Create Well",
        "intro": "\"仍然愿意想象、表达、创造，是在既有路径之外，在线性的成功学叙事之外，并把一些新的可能带进现实。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "拒绝既有路径",
            "subtitle": "从私人的痛苦到公共的知识",
            "kind": "boundary",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗的创造力起点不是职业选择，而是一种存在论的拒绝——拒绝将精神疾病视为私人的、羞耻的、不可言说的负担。她患抑郁症超过十年（自2014年起），后被诊断为复杂性创伤后应激障碍（CPTSD），但她选择的不是沉默和自我消化，而是将私人的痛苦转化为公共的知识："
                ]
              },
              {
                "type": "quote",
                "text": "\"谈论疾病并不是无止尽地宣泄私人困境，而是为了揭示私人经验的公共性。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种转化本身就是一种创造行为：在一个对精神疾病高度污名化的社会文化中，她选择公开谈论——不是作为被观看的\"病例\"，而是作为知识的制造者。"
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "病耻感叙事",
                    "value": "拒绝将精神疾病当作必须隐藏的羞耻"
                  },
                  {
                    "label": "个体化归因",
                    "value": "拒绝\"是因为笨或者懒\"的自我谴责叙事"
                  },
                  {
                    "label": "正常/异常的二元对立",
                    "value": "拒绝\"正常只有一个标准\"的单一价值体系"
                  },
                  {
                    "label": "纯粹私人写作",
                    "value": "拒绝封闭在日记本里，选择公共平台发声"
                  },
                  {
                    "label": "治愈至上的线性叙事",
                    "value": "拒绝将康复视为唯一的正当终点"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "发现新可能",
            "subtitle": "播客作为创造平台",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "转折点：创办\"重新做人\"（New People）播客。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗在播客这一媒介中找到了一个独特的创造空间：她可以在自己的节奏里说话，可以选择让谁加入对话，可以编辑和打磨声音文本，可以将私人的经历转化为可被更多人接入的公共讨论。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "播客作为媒介的优势："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "声音的亲密性",
                    "meta": [
                      "声音比文字更直接传达情感质地"
                    ],
                    "description": "让听众感受到精神疾病经验的\"真实重量\""
                  },
                  {
                    "title": "对话的开放性",
                    "meta": [
                      "不追求单一结论，允许多种声音共存"
                    ],
                    "description": "对抗精神健康话语中的专家垄断"
                  },
                  {
                    "title": "编辑的可控性",
                    "meta": [
                      "录制后可以重新编辑和框架化"
                    ],
                    "description": "让创作者有能力保护自己的叙事不被曲解"
                  },
                  {
                    "title": "传播的低门槛",
                    "meta": [
                      "播客比学术论文或书籍更容易抵达普通人"
                    ],
                    "description": "让公共知识真正\"公共\""
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "代表作品",
            "subtitle": "把新可能带进现实",
            "kind": "cases",
            "blocks": [
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "\"重新做人\"播客",
                    "meta": [
                      "独立播客",
                      "持续进行"
                    ],
                    "description": "将精神健康、残障与照护话题带入中文公共讨论，创造一个可被任何人接入的对话空间"
                  },
                  {
                    "title": "浦口工厂",
                    "meta": [
                      "独立出版",
                      "过往项目"
                    ],
                    "description": "通过自主出版放大边缘群体的声音，让\"不被听见\"的故事获得物质载体"
                  },
                  {
                    "title": "湖岛节对谈",
                    "meta": [
                      "公共活动",
                      "2025"
                    ],
                    "description": "与徐艺函、张志军共同策划组织，将私人经验编织为多人对话的公共织网"
                  },
                  {
                    "title": "\"抹布神\"项目",
                    "meta": [
                      "协作创作",
                      "—"
                    ],
                    "description": "与徐艺函共同创作，写作者与社区艺术家的交叉授粉——出版实践与社区艺术的互相渗透"
                  },
                  {
                    "title": "写作实践",
                    "meta": [
                      "持续创作",
                      "持续进行"
                    ],
                    "description": "记录、编辑、翻译生命经验为可被理解的公共话语"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "写作方法论",
            "subtitle": "从经验到知识的转化原则",
            "kind": "principles",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从朱璟茗的实践和对话中，可以提取出她的创造性转化方法："
                ]
              },
              {
                "type": "method-list",
                "items": [
                  {
                    "index": "1",
                    "title": "经验的公共性是挖掘出来的",
                    "description": "私人痛苦不自动等于公共知识——需要写作的打磨、编辑的框架化、对话的层层剥开"
                  },
                  {
                    "index": "2",
                    "title": "命名即赋权",
                    "description": "\"复杂性创伤应激源于人际关系，好像也必须要通过人际关系才能疗愈\"——用新的命名打破旧的归因"
                  },
                  {
                    "index": "3",
                    "title": "语言即政治",
                    "description": "从\"疾病\"到\"障碍\"的语言转换：前者暗示个体缺陷，后者指向社会结构"
                  },
                  {
                    "index": "4",
                    "title": "脆弱是一种知识形式",
                    "description": "不是将自己的脆弱当作展品，而是通过脆弱提供一种不同的认知视角"
                  },
                  {
                    "index": "5",
                    "title": "写作是反复编辑",
                    "description": "不是一次性的\"坦白\"，而是持续的打磨——每一次重写都让经验更接近可被理解的形状"
                  },
                  {
                    "index": "6",
                    "title": "边界的自觉",
                    "description": "不断自问\"是不是在卖惨？会不会过界了？\"——这种自觉本身就是方法论的一部分"
                  }
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "命名即创造",
            "subtitle": "\"重新做人\"",
            "kind": "narrative",
            "blocks": [
              {
                "type": "quote",
                "text": "\"正常只有一个标准，而不正常有各种各样的标准，各种各样的症状，各种各样的新鲜的视角。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"重新做人\"这个名字本身就是一种创造性姿态：不是\"恢复\"成原来的样子（那暗示着生病前的自己才是\"正常的\"），而是重新成为一个不同的人——经历疾病后的自己不是\"残缺的版本\"，而是带着新的视角重新进入世界。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这与流行的\"康复叙事\"形成了根本性的区别：康复叙事假设有一个\"正常的\"状态在等着被恢复；而\"重新做人\"承认经历改变了你的本质，你需要建造的是一个不同的自己，而不是回到从前。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "live",
        "title": "身心安顿 / Live Well",
        "subtitle": "Live Well",
        "intro": "\"如何在不确定、不断变化、也并不总是友好的现实里，依然能够诚实地面对自己，慢慢找到一种内在自洽，同时保有韧性的生活方式。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "诚实面对",
            "subtitle": "诊断作为解放",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗的身心安顿故事起点是对痛苦的诚实的、毫无美化的描述："
                ]
              },
              {
                "type": "quote",
                "text": "\"一个人怎么会什么都做不了，连张口吃饭都极为困难。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不仅仅是\"抑郁\"这个标签可以概括的——她坚持让读者和理解她的人看到症状的具体性：不是\"心情不好\"，不是\"想太多\"，而是连最基本的生存动作都变得不可能。这种描述的精确性本身就是一种诚实。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "更关键的是她对诊断的态度——在一种广泛传播的、反精神病学的\"不要给自己贴标签\"的流行话语中，她给出了完全不同的回应："
                ]
              },
              {
                "type": "quote",
                "text": "\"在抑郁症确诊后，我其实一瞬间是解放的。因为真的是有病，而不是因为笨或者懒。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "诊断不是囚笼，而是出口。多年来被归因为个人道德缺陷（\"笨\"\"懒\"\"矫情\"\"想太多\"）的痛苦，突然有了一个名字和一个可被理解的解释框架。这是\"身心安顿\"的第一步：停止自我谴责，将痛苦从\"我不好\"重构为\"我生病了\"。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "内在自洽",
            "subtitle": "疾病作为重新认识世界的机会",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗没有停留在\"接受疾病\"的层面，而是将疾病经历转化为一种认知资源："
                ]
              },
              {
                "type": "quote",
                "text": "\"生病给了我一个变脆弱和看见脆弱的机会，让我重新认识我自己和这个世界的关系。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种转化不是简单的\"积极思考\"，而是一种真实的认识论转变：在生病之前，她可能也生活在这个世界的各种权力结构和隐形暴力中，但不需要看见它们；生病之后，她被迫看见了那些\"正常人\"可以假装不存在的东西——冷漠的社交期待、不合理的效率要求、对脆弱性的系统性排斥。"
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "对\"正常\"的态度",
                    "meta": [
                      "默认接受\"正常\"为好的"
                    ],
                    "description": "质疑\"正常\"这个概念本身"
                  },
                  {
                    "title": "对脆弱的认知",
                    "meta": [
                      "脆弱是需要隐藏的缺陷"
                    ],
                    "description": "脆弱是一种不同的认知方式"
                  },
                  {
                    "title": "对人的理解",
                    "meta": [
                      "人应该独立自主"
                    ],
                    "description": "人是相互依存的存在"
                  },
                  {
                    "title": "对帮助的态度",
                    "meta": [
                      "求助是软弱的表现"
                    ],
                    "description": "\"求助是给别人一个照顾你的机会\"（与张志军对话）"
                  },
                  {
                    "title": "对世界的要求",
                    "meta": [
                      "适应世界的标准"
                    ],
                    "description": "\"如果城市不适合我们生活，是不是我们可以改进现有的空间建设？\""
                  }
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "韧性",
            "subtitle": "在人际关系中疗愈",
            "kind": "relation-levels",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗对CPTSD的理解本身就是一种韧性策略："
                ]
              },
              {
                "type": "quote",
                "text": "\"复杂性创伤应激源于人际关系，好像也必须要通过人际关系才能疗愈。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话包含了一个完整的疗愈理论：创伤是在关系中发生的（霸凌、忽视、暴力、背叛），因此它不能单独在个体的内心完成疗愈。必须回到关系中——在信任的、安全的、可以被真诚对待的关系中——才能修复被伤害的人际能力。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "但这种关系重建极其困难，因为创伤本身让人对关系高度警惕。朱璟茗诚实地描述了这种困难："
                ]
              },
              {
                "type": "quote",
                "text": "\"是不是在卖惨？会不会过界了？\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "她会不断地反思自己是否在越界——这是创伤幸存者的典型困境：需要关系来疗愈，但又害怕在关系中成为\"负担\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "徐艺函的角色：徐艺函以一种\"挑战性的信任\"回应了这种困境："
                ]
              },
              {
                "type": "quote",
                "text": "\"她甚至有一次把本子放到我面前，说你把当时的场景写下来。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种回应既不回避痛苦（\"你没事的，别想太多\"式的敷衍），也不将痛苦当作奇观来消费。它承认痛苦的实在性，同时将其引导向创造性的出口。这是一种支持性的推——相信对方有能力面对自己的经历，同时提供使之成为可能的结构（本子、笔、对话的空间）。"
                ]
              }
            ]
          },
          {
            "id": "section-4",
            "title": "双重负担",
            "subtitle": "病耻感和污名化",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗的身心安顿不能只从疾病本身来理解，还必须理解社会对疾病的反应是如何加重了痛苦："
                ]
              },
              {
                "type": "quote",
                "text": "\"病耻感和污名化带来的伤害常常大过疾病本身。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这意味着："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "第一重负担：疾病本身的症状——无力感、情绪波动、功能障碍",
                  "第二重负担：社会对有这些症状的人的反应——贬低、排斥、不信任、怜悯，以及\"你是不是太矫情了\"的否认"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这两重负担叠加在一起，使得身心安顿不仅仅是一个医疗问题，而是一个社会正义问题。朱璟茗的诚实正在于她不将这两者分开处理——她同时谈论自己的症状和社会的偏见，因为它们在她的生命经验中是不可分割的。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "价值观作为内在锚点",
            "subtitle": null,
            "kind": "values",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "从朱璟茗的实践和话语中，可以提取出她的核心价值观："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "诚实先于体面",
                    "meta": [
                      "█████"
                    ],
                    "description": "公开谈论精神疾病、拒绝\"正常\"的伪装、写作中的不加粉饰"
                  },
                  {
                    "title": "关系先于孤立",
                    "meta": [
                      "█████"
                    ],
                    "description": "主动寻求连接、承认CPTSD必须通过人际关系疗愈、\"求助是给别人一个照顾你的机会\""
                  },
                  {
                    "title": "公共先于私人",
                    "meta": [
                      "████"
                    ],
                    "description": "将私人经验转化为公共知识、\"谈论疾病是为了揭示私人经验的公共性\""
                  },
                  {
                    "title": "脆弱先于坚强",
                    "meta": [
                      "████"
                    ],
                    "description": "\"生病给了我一个变脆弱和看见脆弱的机会\"、拒绝将脆弱视为缺陷"
                  },
                  {
                    "title": "多元先于正常",
                    "meta": [
                      "█████"
                    ],
                    "description": "\"正常只有一个标准，而不正常有各种各样的标准\"、为多元存在方式辩护"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这些价值观不是宣言，而是生存的必需品——当朱璟茗选择公开谈论自己的诊断、选择在写作中不加粉饰、选择将私人痛苦转化为公共知识时，她不是在实践一种美学偏好，而是在实践一种对自我和世界的重新理解。这些价值观是她能够\"重新做人\"的锚点。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      },
      {
        "key": "benefit",
        "title": "公共性 / Benefit Well",
        "subtitle": "Benefit Well",
        "intro": "\"如何在关照自我的同时，关切他人、回应周遭、关心公共，参与塑造我们共同身处的世界。\"",
        "sections": [
          {
            "id": "section-1",
            "title": "\"重新做人\"播客",
            "subtitle": "为精神健康建造的公共空间",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"重新做人\"播客是朱璟茗公共性实践的核心载体——它不是一个\"自我疗愈\"的项目，而是一个公共基础设施："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "独立播客，讨论精神健康、残障、照护等话题"
                  },
                  {
                    "label": "定位",
                    "value": "中文语境下一个开放的、可被任何人接入的对话空间"
                  },
                  {
                    "label": "精神",
                    "value": "不是\"专家讲解\"，而是经验者的对话——打破精神健康话语中的知识权力等级"
                  },
                  {
                    "label": "门槛",
                    "value": "播客的低门槛传播——不需要付费、不需要学术背景、不需要特殊的阅读能力"
                  },
                  {
                    "label": "作用",
                    "value": "让被污名化的经验获得公共可见性，让孤独的个体知道\"不是只有我一个人\""
                  },
                  {
                    "label": "影响",
                    "value": "连接精神健康、残障权利、女性经验等交叉领域的对话者"
                  }
                ]
              },
              {
                "type": "quote",
                "text": "\"谈论疾病并不是无止尽地宣泄私人困境，而是为了揭示私人经验的公共性。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "\"重新做人\"播客的公共性意义：在一个精神疾病被高度污名化的社会里，公开谈论本身就是一种公共行动。每一个\"我也经历过\"的回应、每一个通过收听而感到\"被看见\"的听众，都是公共性在发生——不是自上而下的倡导，而是通过经验共享建立起来的横向连接。"
                ]
              }
            ]
          },
          {
            "id": "section-2",
            "title": "\"浦口工厂\"",
            "subtitle": "让边缘声音获得物质形态",
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在\"重新做人\"播客之前，朱璟茗运营过独立出版项目\"浦口工厂\"。这个项目的公共性逻辑是："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "形式",
                    "value": "独立出版"
                  },
                  {
                    "label": "定位",
                    "value": "放大边缘群体的声音"
                  },
                  {
                    "label": "逻辑",
                    "value": "让\"不被听见\"的故事获得纸本的、可被传递的物质形态"
                  },
                  {
                    "label": "意义",
                    "value": "出版不仅是传播，更是赋权——让声音从此不可被忽略"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "如果说播客是在声音空间中建造公共性，那么\"浦口工厂\"就是在物质空间中——书可以被触摸、被收藏、被传递给下一个人。出版物一旦存在，就不能被轻易抹去。这是对边缘经验的一种物质性的肯定。"
                ]
              }
            ]
          },
          {
            "id": "section-3",
            "title": "语言的政治",
            "subtitle": "为公共认知重新命名",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗的公共性实践中有一个高度自觉的语言政治维度。她在公共讨论中有意识地推动语言框架的转换："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "从\"疾病\"到\"障碍\"："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "\"疾病\" (disease)",
                    "meta": [
                      "\"障碍\" (disability/disorder)"
                    ],
                    "description": "\"疾病\"暗示个体内部的缺陷，需要被\"治愈\"；\"障碍\"指向人与环境之间的不匹配，需要改变的是环境而非个体"
                  },
                  {
                    "title": "个体缺陷模型",
                    "meta": [
                      "社会模型"
                    ],
                    "description": "问题不在于\"这个人有什么问题\"，而在于\"这个环境设置了什么障碍\""
                  },
                  {
                    "title": "医学话语垄断",
                    "meta": [
                      "多元经验话语"
                    ],
                    "description": "不是只有医生才能定义什么是精神健康——亲历者的经验同样是有效的知识"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这种语言框架的转换不是学术操练，而是具有直接的公共政策含义。当我们将精神健康问题从\"疾病\"框架转向\"障碍\"框架时，\"治愈\"不再是一切的答案——\"无障碍\"成为了答案。这意味着："
                ]
              },
              {
                "type": "quote",
                "text": "\"如果城市不适合我们生活，是不是我们可以改进现有的空间建设？\""
              }
            ]
          },
          {
            "id": "section-4",
            "title": "公共统计数据",
            "subtitle": "让\"少数\"不再被当作例外",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗在公共讨论中引用数据来揭示一个核心悖论：精神障碍和残障在统计上远非\"少数\"问题，却在社会感知中被当作例外来处理："
                ]
              },
              {
                "type": "key-value",
                "items": [
                  {
                    "label": "全球16%的人口有显著残障",
                    "value": "这不是\"一小撮人\"的问题——这是一个系统性问题"
                  },
                  {
                    "label": "近10亿人患有精神障碍",
                    "value": "精神障碍是全球性的、普遍的、人类正常经验的一部分"
                  },
                  {
                    "label": "但公共空间设计极少考虑精神/感官障碍者",
                    "value": "问题不在人，在于空间设计的排斥性"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "公共性挑战：当一个问题影响近10亿人时，它就不仅仅是\"医疗问题\"或者\"个人问题\"——它是空间设计问题、城市规划问题、公共政策问题。影响如此广泛的人群却被如此系统地排除在公共空间设计之外，这不是疏忽，是结构性暴力。"
                ]
              }
            ]
          },
          {
            "id": "section-5",
            "title": "关系的公共性",
            "subtitle": "与徐艺函、张志军的协作实践",
            "kind": "cases",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗的公共性不是孤胆英雄式的，而是编织在人际关系中的："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "与徐艺函："
                ]
              },
              {
                "type": "case-cards",
                "items": [
                  {
                    "title": "\"抹布神\"项目",
                    "meta": [
                      "共同创作"
                    ],
                    "description": "写作者与社区艺术家的交叉授粉——出版实践与社区艺术的互相渗透"
                  },
                  {
                    "title": "湖岛节对谈",
                    "meta": [
                      "共同策划组织"
                    ],
                    "description": "将两个人的对话扩展为可被公众接入的多方讨论"
                  },
                  {
                    "title": "日常关系",
                    "meta": [
                      "支持性的推"
                    ],
                    "description": "徐艺函将本子放到朱璟茗面前，让她写——这种\"不回避的信任\"本身就是一个微型的公共行动"
                  }
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "与张志军：在湖岛节对谈中，张志军提出了一个关键的观点转换："
                ]
              },
              {
                "type": "quote",
                "text": "\"求助是给别人一个照顾你的机会。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这个表述彻底颠覆了\"求助=给对方添麻烦\"的叙事——它将求助从一种亏欠重构为一种馈赠：你信任某人到足以向他求助，这对被求助者而言是一种关系上的肯定。朱璟茗将这种洞察纳入了自己的思考和表达中，体现了她将私人对话转化为公共知识的能力。"
                ]
              }
            ]
          },
          {
            "id": "section-6",
            "title": "对\"正常\"概念的彻底解构",
            "subtitle": null,
            "kind": "narrative",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "朱璟茗的公共性最深层的贡献，也许是她对\"正常\"这个概念本身的挑战："
                ]
              },
              {
                "type": "quote",
                "text": "\"正常只有一个标准，而不正常有各种各样的标准，各种各样的症状，各种各样的新鲜的视角。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这句话包含了激进的公共性含义："
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "第一层：\"正常\"是单一标准的——它是暴力的来源。只有一个\"正确\"的生活方式、一种\"正确\"的感觉方式、一种\"正确\"的与世界互动的方式。所有不符合这个标准的人都被归类为\"不正常\"。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "第二层：\"不正常\"是多元的、丰富的、有创造力的——\"各种各样的症状，各种各样的新鲜的视角\"。那些被排除在\"正常\"之外的人，恰恰因为他们的不同经验而拥有独特的认知资源。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "第三层（与张志军的对话）："
                ]
              },
              {
                "type": "quote",
                "text": "\"到底有没有所谓的'正常人'？也许没有的话我们每个人都能够相对轻松一点。\""
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "如果\"正常人\"本身就是一个虚构——一个没有人能完全达到的、被社会权力所强加的规范性理想——那么所有人都是某种程度上\"不正常\"的。承认这一点不是让人更焦虑，而是让人\"相对轻松一点\"：因为你不再需要假装自己是\"正常的\"。"
                ]
              }
            ]
          },
          {
            "id": "section-7",
            "title": "独有贡献",
            "subtitle": "将精神痛苦重新定义为公共知识资源",
            "kind": "contribution",
            "blocks": [
              {
                "type": "paragraph",
                "paragraphs": [
                  "在 B Community 的所有案例中，朱璟茗贡献了一种独特的方法论："
                ]
              },
              {
                "type": "quote",
                "text": "从私人痛苦到公共知识的转化术"
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "不是将精神疾病的经历当作\"励志故事\"来消费（\"你看她都这样了还在创作，你还有什么理由不努力\"），而是将这种经历当作一个认知位置——从这个位置看出去，能看见\"正常人\"看不见的东西。"
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "具体来说："
                ]
              },
              {
                "type": "bullet-list",
                "items": [
                  "看见\"正常\"的暴力和排他性",
                  "看见社会如何系统性地驱逐脆弱性",
                  "看见语言框架如何塑造我们对痛苦的理解",
                  "看见人际关系既是创伤的源头也是疗愈的途径",
                  "看见公共空间的障碍设计如何制造\"残障\""
                ]
              },
              {
                "type": "paragraph",
                "paragraphs": [
                  "这不是\"带病写作\"的鸡汤叙事，而是一个认识论的提案：那些被社会标记为\"生病\"的经验，恰恰是理解这个社会如何运作的关键入口。"
                ]
              }
            ]
          }
        ],
        "strength": "★★★★★"
      }
    ],
    "aiPersona": {
      "title": "和 朱璟茗 对话",
      "subtitle": "基于公开资料、良好生活三角与实践标签生成的成员视角",
      "initialMessage": "你好，我是基于朱璟茗公开资料与良好生活三角整理出的讨论视角。你可以问我关于创造力、身心安顿、公共性或具体实践的问题。",
      "inputPlaceholder": "问 朱璟茗 一个问题"
    },
    "knowledgeBase": {
      "documentPaths": [
        "knowledge-base/cleaned/good-life/zhu_jingming.md"
      ],
      "sourceLabels": [
        "zhu_jingming.md"
      ],
      "lastUpdated": "2026-07-07"
    }
  }
};
