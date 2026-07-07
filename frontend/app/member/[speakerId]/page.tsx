"use client";

import Link from "next/link";
import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  MapPin,
  MessageCircle,
  Quote,
  Send,
  UserRound,
  X
} from "lucide-react";
import { SpeakerAvatar } from "@/components/SpeakerAvatar";
import {
  SpeakerInfo,
  getConversation,
  getRoundtableSpeakers,
  sendSpeakerChat
} from "@/lib/api";
import {
  goodLifeProfiles,
  type ContentBlock,
  type DimensionData,
  type DimensionKey,
  type GoodLifeSection,
  type MemberProfileData
} from "@/lib/goodLifeProfiles";
import { memberBasicInfo } from "@/lib/memberBasicInfo";

type Message = {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{
    source_id: string;
    chunk_id: string;
    title: string;
    score: number;
    quote: string;
  }>;
};

const THREAD_STORAGE_KEY = "roundtable-speaker-thread-ids";

const memberProfiles: Record<string, MemberProfileData> = goodLifeProfiles;
function speakerAgentId(speakerId: string) {
  return `roundtable-speaker:${speakerId}`;
}

function readStoredThreadIds() {
  try {
    return JSON.parse(localStorage.getItem(THREAD_STORAGE_KEY) ?? "{}") as Record<
      string,
      string
    >;
  } catch {
    return {};
  }
}

function storeSpeakerThreadId(speakerId: string, threadId: string) {
  const current = readStoredThreadIds();
  localStorage.setItem(
    THREAD_STORAGE_KEY,
    JSON.stringify({ ...current, [speakerId]: threadId })
  );
}

function buildProfileFromSpeaker(speaker: SpeakerInfo): MemberProfileData {
  const basicInfo = memberBasicInfo[speaker.speaker_id];

  return {
    id: speaker.speaker_id,
    profile: {
      name: basicInfo?.displayName ?? speaker.name,
      identity: speaker.role,
      location: basicInfo?.location ?? speaker.location,
      intro: speaker.perspective,
      style: speaker.style,
      type: basicInfo?.memberTypes?.join("、")
    },
    basicInfo,
    triangleTitle: `${speaker.name}的良好生活三角`,
    triangleSubtitle: "该成员的良好生活三角内容尚未整理。",
    centerText: "Good Life Triangle",
    centerSubtitle: "内容待整理",
    aiPersona: {
      title: `和 ${speaker.name} 对话`,
      subtitle: "基于公开资料与实践标签生成的成员视角",
      initialMessage: `你好，我是基于${speaker.name}公开资料与实践标签生成的讨论视角。你可以围绕这个成员的实践、价值观和良好生活三角继续提问。`,
      inputPlaceholder: `问 ${speaker.name} 一个问题`
    }
  };
}

function withMemberBasicInfo(profile: MemberProfileData): MemberProfileData {
  const basicInfo = memberBasicInfo[profile.id];
  if (!basicInfo) {
    return profile;
  }

  return {
    ...profile,
    basicInfo,
    profile: {
      ...profile.profile,
      type: profile.profile.type ?? basicInfo.memberTypes?.join("、"),
      location: basicInfo.location ?? profile.profile.location
    }
  };
}

function getMemberProfileById(
  speakerId: string,
  speaker: SpeakerInfo | null
): MemberProfileData | null {
  if (memberProfiles[speakerId]) {
    return withMemberBasicInfo(memberProfiles[speakerId]);
  }
  if (speaker) {
    return buildProfileFromSpeaker(speaker);
  }
  return null;
}

function introForProfile(profileData: MemberProfileData | null, speaker: SpeakerInfo | null): Message {
  if (profileData?.aiPersona?.initialMessage) {
    return {
      role: "assistant",
      content: profileData.aiPersona.initialMessage
    };
  }

  if (speaker) {
    return {
      role: "assistant",
      content: `你好，我是基于${speaker.name}公开资料与实践标签生成的讨论视角。你可以围绕这个成员的实践、价值观和良好生活三角继续提问。`
    };
  }

  return {
    role: "assistant",
    content: "你好，我是基于该成员公开资料与实践标签生成的讨论视角。你可以围绕这个成员的实践、价值观和良好生活三角继续提问。"
  };
}

function ProfileSection({
  children,
  title,
  tone = "body"
}: {
  children?: string | string[];
  title: string;
  tone?: "body" | "meta";
}) {
  if (!children || (Array.isArray(children) && children.length === 0)) {
    return null;
  }

  return (
    <section className={`profile-section profile-info-section profile-${tone}`}>
      <h2>{title}</h2>
      {Array.isArray(children) ? (
        <ul className="profile-list">
          {children.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{children}</p>
      )}
    </section>
  );
}

function ProfileTagList({ tags, title }: { tags?: string[]; title: string }) {
  if (!tags?.length) {
    return null;
  }

  return (
    <section className="profile-section profile-info-section">
      <h2>{title}</h2>
      <div className="profile-tags">
        {tags.map((tag) => (
          <span className="profile-tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProfileSidebar({
  profileData,
  speakerId
}: {
  profileData: MemberProfileData | null;
  speakerId: string;
}) {
  if (!profileData) {
    return (
      <aside className="member-profile-panel aku-profile-panel">
        <Link className="back-link" href="/?view=map">
          <ArrowLeft size={16} />
          返回地图
        </Link>
        <p className="empty">暂未找到该成员的个人知识库内容。</p>
      </aside>
    );
  }

  const supplemental = profileData.basicInfo;
  const profileName = supplemental?.displayName ?? profileData.profile.name;
  const profileLocation = supplemental?.location ?? profileData.profile.location;
  const hasSupplementalInfo = Boolean(supplemental);

  return (
    <aside className="member-profile-panel aku-profile-panel">
      <Link className="back-link" href="/?view=map">
        <ArrowLeft size={16} />
        返回地图
      </Link>

      <div className="profile-sidebar-content">
        <SpeakerAvatar className="profile-member-avatar" speakerId={speakerId} />
        <h1>{profileName}</h1>
        {profileData.profile.identity ? (
          <p className="member-role">{profileData.profile.identity}</p>
        ) : null}
        {profileData.profile.fullName ? (
          <p className="profile-meta-line">{profileData.profile.fullName}</p>
        ) : null}
        {profileData.profile.group ? (
          <p className="profile-meta-line">{profileData.profile.group}</p>
        ) : null}
        {supplemental?.name && supplemental.name !== profileName ? (
          <p className="profile-meta-line">{supplemental.name}</p>
        ) : null}
        {supplemental?.memberTypes?.length ? (
          <div className="profile-type-list">
            {supplemental.memberTypes.map((type) => (
              <span className="profile-type" key={type}>
                {type}
              </span>
            ))}
          </div>
        ) : profileData.profile.type ? (
          <p className="profile-type">{profileData.profile.type}</p>
        ) : null}
        {profileLocation ? (
          <p className="member-location">
            <MapPin size={15} />
            {profileLocation}
          </p>
        ) : null}

        {supplemental?.practiceKeywords?.length ? (
          <div className="profile-keyword-strip">
            {supplemental.practiceKeywords.slice(0, 6).map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        ) : null}

        <ProfileSection title="基本信息">
          {supplemental?.basicInfo ??
            profileData.profile.intro ??
            "该成员的基础信息仍在整理中。"}
        </ProfileSection>
        <ProfileSection title="价值观">{supplemental?.values}</ProfileSection>
        <ProfileTagList title="价值观标签" tags={supplemental?.valueTags} />
        <ProfileTagList title="实践关键词" tags={supplemental?.practiceKeywords} />
        <ProfileTagList title="可连接资源" tags={supplemental?.connectableResources} />
        <ProfileTagList title="适合合作方式" tags={supplemental?.cooperationWays} />
        <ProfileSection title="账号 / 网站" tone="meta">
          {supplemental?.accounts}
        </ProfileSection>
        <ProfileSection title="活动案例">{supplemental?.activities}</ProfileSection>
        <ProfileSection title="公开内容源" tone="meta">
          {supplemental?.publicSources}
        </ProfileSection>
        {supplemental?.dataSource ? (
          <ProfileSection title="数据来源" tone="meta">
            {supplemental.dataSource}
          </ProfileSection>
        ) : null}
        {supplemental?.verificationStatus ? (
          <div className="profile-verification">{supplemental.verificationStatus}</div>
        ) : null}
        {profileData.profile.style ? (
          <ProfileSection title="表达风格">{profileData.profile.style}</ProfileSection>
        ) : null}
        {!hasSupplementalInfo ? (
          <p className="profile-missing-note">该成员的基础信息仍在整理中。</p>
        ) : null}
      </div>
    </aside>
  );
}

function GoodLifeTriangle({
  activeDimension,
  centerSubtitle,
  centerText,
  onSelect,
  visitedDimensions
}: {
  activeDimension: DimensionKey;
  centerSubtitle: string;
  centerText: string;
  onSelect: (key: DimensionKey) => void;
  visitedDimensions: DimensionKey[];
}) {
  const points = [
    { key: "create" as const, label: "创造力", subtitle: "Create Well" },
    { key: "live" as const, label: "身心安顿", subtitle: "Live Well" },
    { key: "benefit" as const, label: "公共性", subtitle: "Benefit Well" }
  ];

  return (
    <div className={`good-life-triangle active-${activeDimension}`}>
      <div className="triangle-lines" aria-hidden="true">
        <span className="triangle-line line-left" />
        <span className="triangle-line line-right" />
        <span className="triangle-line line-bottom" />
      </div>
      <div className="triangle-center">
        <strong>{centerText}</strong>
        <span>{centerSubtitle}</span>
      </div>
      {points.map((point, index) => (
        <button
          aria-pressed={activeDimension === point.key}
          className={`triangle-point point-${point.key} ${
            activeDimension === point.key ? "active" : ""
          }`}
          key={point.key}
          onClick={() => onSelect(point.key)}
          style={{ "--point-delay": `${index * 0.18}s` } as CSSProperties}
          type="button"
        >
          <span>{point.label}</span>
          <small>{point.subtitle}</small>
          {visitedDimensions.includes(point.key) ? (
            <i aria-hidden="true" className="visited-dot" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

function EmptyTriangleState({ profileData }: { profileData: MemberProfileData | null }) {
  return (
    <section className="dimension-panel">
      <div className="dimension-panel-head">
        <div>
          <span className="dimension-eyebrow">内容状态</span>
          <h2>
            {profileData
              ? "该成员的良好生活三角内容尚未整理。"
              : "暂未找到该成员的个人知识库内容。"}
          </h2>
        </div>
      </div>
      <section className="dimension-block">
        <p>
          {profileData
            ? "当前页面已根据成员 ID 显示基础资料与 AI 对话入口。后续补充该成员的三角数据后，会在这里展示对应的创造力、身心安顿与公共性内容。"
            : "请返回地图重新选择成员。"}
        </p>
      </section>
      <Link className="map-return-button" href="/?view=map">
        返回地图
      </Link>
    </section>
  );
}

function DimensionPanel({
  dimension,
  isLeaving
}: {
  dimension: DimensionData;
  isLeaving: boolean;
}) {
  return (
    <article className={`dimension-panel ${isLeaving ? "leaving" : ""}`} key={dimension.key}>
      <div className="dimension-panel-head">
        <div>
          <span className="dimension-eyebrow">当前维度</span>
          <h2>{dimension.title}</h2>
        </div>
        <span className="dimension-strength">{dimension.strength}</span>
      </div>

      {dimension.intro ? <p className="dimension-intro">{dimension.intro}</p> : null}

      <div className="good-life-sections">
        {dimension.sections.map((section) => (
          <GoodLifeSectionCard key={section.id} section={section} />
        ))}
      </div>
    </article>
  );
}

function GoodLifeSectionCard({ section }: { section: GoodLifeSection }) {
  return (
    <section className={`good-life-section-card section-kind-${section.kind}`}>
      <div className="good-life-section-heading">
        <h3>{section.title}</h3>
        {section.subtitle ? <p>{section.subtitle}</p> : null}
      </div>
      <div className="good-life-body">
        {section.blocks.map((block, index) => (
          <ContentBlockView block={block} key={`${section.id}-${block.type}-${index}`} />
        ))}
      </div>
    </section>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <div className="good-life-paragraphs">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="good-life-quote">
          <Quote size={15} />
          <span>{block.text}</span>
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      );
    case "bullet-list":
    case "ordered-list":
      return (
        <ul className="good-life-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "tag-list":
      return (
        <div className="good-life-tags">
          {block.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      );
    case "key-value":
      return (
        <dl className="good-life-key-values">
          {block.items.map((item) => (
            <div key={`${item.label}-${item.value}`}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "case-cards":
      return (
        <div className="good-life-case-list">
          {block.items.map((item) => (
            <article className="good-life-case-card" key={`${item.title}-${item.description}`}>
              <h4>{item.title}</h4>
              {item.meta && item.meta.length > 0 ? (
                <p className="good-life-case-meta">{item.meta.join(" · ")}</p>
              ) : null}
              {item.description ? <p>{item.description}</p> : null}
            </article>
          ))}
        </div>
      );
    case "method-list":
      return (
        <ol className="good-life-method-list">
          {block.items.map((item) => (
            <li key={`${item.index}-${item.title}`}>
              <span>{item.index}</span>
              <div>
                <strong>{item.title}</strong>
                {item.description ? <p>{item.description}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      );
    case "timeline":
      return (
        <ol className="good-life-timeline">
          {block.items.map((item) => (
            <li key={`${item.time}-${item.title}`}>
              <time>{item.time}</time>
              <div>
                <strong>{item.title}</strong>
                {item.description ? <p>{item.description}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      );
    case "preformatted":
      return <pre className="good-life-preformatted">{block.text}</pre>;
    default:
      return null;
  }
}

function AIChatPanel({
  canSend,
  error,
  input,
  isLoading,
  isOpen,
  messages,
  onClose,
  onInput,
  onSubmit,
  profileData,
  speaker
}: {
  canSend: boolean;
  error: string;
  input: string;
  isLoading: boolean;
  isOpen: boolean;
  messages: Message[];
  onClose: () => void;
  onInput: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  profileData: MemberProfileData | null;
  speaker: SpeakerInfo | null;
}) {
  const speakerName = profileData?.profile.name ?? speaker?.name ?? "该成员";
  const title = profileData?.aiPersona?.title ?? `和 ${speakerName} 对话`;
  const subtitle =
    profileData?.aiPersona?.subtitle ?? "基于公开资料与实践标签生成的成员视角";
  const placeholder =
    profileData?.aiPersona?.inputPlaceholder ?? `问 ${speakerName} 一个问题`;

  return (
    <section className={`member-chat-panel aku-chat-panel ${isOpen ? "open" : ""}`}>
      <div className="chat-header compact-chat-header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <button className="chat-panel-close" onClick={onClose} type="button">
          <X size={16} />
        </button>
        <span className="status">1:1</span>
      </div>

      {error ? <p className="error-text">服务暂时不可用：{error}</p> : null}

      <div className="messages compact-messages">
        {messages.map((message, index) => (
          <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
            <div className="message-icon">
              {message.role === "assistant" ? <Bot size={16} /> : <UserRound size={16} />}
            </div>
            <div className="message-body">
              <p>{message.content}</p>
              {message.citations?.length ? (
                <div className="message-citations">
                  {message.citations.slice(0, 3).map((citation) => (
                    <span key={citation.chunk_id}>
                      {citation.title} · {citation.score.toFixed(2)}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {isLoading ? (
          <div className="message assistant">
            <div className="message-icon">
              <Bot size={16} />
            </div>
            <p>{speakerName} 正在思考...</p>
          </div>
        ) : null}
      </div>

      <form className="composer compact-composer" onSubmit={onSubmit}>
        <input
          aria-label="输入问题"
          disabled={!speaker}
          onChange={(event) => onInput(event.target.value)}
          placeholder={speaker ? placeholder : "成员资料加载中"}
          value={input}
        />
        <button aria-label="发送" disabled={!canSend} type="submit">
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}

export default function MemberPage() {
  const params = useParams<{ speakerId: string }>();
  const speakerId = params.speakerId;
  const [speakers, setSpeakers] = useState<SpeakerInfo[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeDimension, setActiveDimension] = useState<DimensionKey>("create");
  const [displayedDimension, setDisplayedDimension] = useState<DimensionKey>("create");
  const [visitedDimensions, setVisitedDimensions] = useState<DimensionKey[]>(["create"]);
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [isPanelLeaving, setIsPanelLeaving] = useState(false);

  const speaker = useMemo(
    () => speakers.find((item) => item.speaker_id === speakerId) ?? null,
    [speakers, speakerId]
  );

  const profileData = useMemo(
    () => getMemberProfileById(speakerId, speaker),
    [speakerId, speaker]
  );

  const dimensions = useMemo(() => profileData?.dimensions ?? [], [profileData]);
  const hasTriangleData = dimensions.length > 0;

  const dimension = useMemo(
    () => dimensions.find((item) => item.key === displayedDimension) ?? dimensions[0],
    [dimensions, displayedDimension]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setPageReady(true), 50);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setActiveDimension("create");
    setDisplayedDimension("create");
    setVisitedDimensions(["create"]);
  }, [speakerId]);

  useEffect(() => {
    let isMounted = true;

    getRoundtableSpeakers()
      .then(async (items) => {
        if (!isMounted) {
          return;
        }
        setSpeakers(items);
        const currentSpeaker = items.find((item) => item.speaker_id === speakerId) ?? null;
        const currentProfile = getMemberProfileById(speakerId, currentSpeaker);

        const storedThreadId = readStoredThreadIds()[speakerId] ?? null;
        setThreadId(storedThreadId);
        if (!storedThreadId) {
          setMessages([introForProfile(currentProfile, currentSpeaker)]);
          return;
        }

        try {
          const conversation = await getConversation(
            speakerAgentId(speakerId),
            storedThreadId
          );
          setMessages(
            conversation.messages.length
              ? conversation.messages
              : [introForProfile(currentProfile, currentSpeaker)]
          );
        } catch {
          setMessages([introForProfile(currentProfile, currentSpeaker)]);
        }
      })
      .catch((caught) => {
        if (isMounted) {
          const message = caught instanceof Error ? caught.message : "成员加载失败";
          setError(message);
          setMessages([introForProfile(memberProfiles[speakerId] ?? null, null)]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [speakerId]);

  const canSend = Boolean(speaker) && input.trim().length > 0 && !isLoading;

  function selectDimension(key: DimensionKey) {
    setActiveDimension(key);
    setVisitedDimensions((current) => (current.includes(key) ? current : [...current, key]));

    if (key === displayedDimension) {
      return;
    }

    setIsPanelLeaving(true);
    window.setTimeout(() => {
      setDisplayedDimension(key);
      setIsPanelLeaving(false);
    }, 220);
  }

  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend || !speaker) {
      return;
    }

    const userMessage = input.trim();
    const currentMessages = messages;
    setInput("");
    setError("");
    setIsLoading(true);
    setMessages((current) => [...current, { role: "user", content: userMessage }]);

    try {
      const response = await sendSpeakerChat({
        message: userMessage,
        speaker_id: speaker.speaker_id,
        thread_id: threadId,
        messages: currentMessages
      });
      setThreadId(response.thread_id);
      storeSpeakerThreadId(speaker.speaker_id, response.thread_id);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: response.answer,
          citations: response.citations?.map((citation) => ({
            source_id: citation.source_id,
            chunk_id: citation.chunk_id,
            title: citation.title,
            score: citation.score,
            quote: citation.quote
          }))
        }
      ]);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "请求失败";
      setError(message);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: `服务暂时不可用：${message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={`member-page-shell aku-member-shell ${pageReady ? "ready" : ""}`}>
      <ProfileSidebar profileData={profileData} speakerId={speakerId} />

      <AIChatPanel
        canSend={canSend}
        error={error}
        input={input}
        isLoading={isLoading}
        isOpen={isChatPanelOpen}
        messages={messages}
        onClose={() => setIsChatPanelOpen(false)}
        onInput={setInput}
        onSubmit={handleSendMessage}
        profileData={profileData}
        speaker={speaker}
      />

      <section className="good-life-content-panel">
        <div className="good-life-panel-scroll">
        <header className="good-life-header">
          <div>
            <span className="status">良好生活标准</span>
            <h1>{profileData?.triangleTitle ?? "成员个人知识库"}</h1>
            <p>
              {profileData?.triangleSubtitle ??
                "暂未找到该成员的个人知识库内容。请返回地图重新选择成员。"}
            </p>
          </div>
          <button
            className="chat-toggle-button"
            onClick={() => setIsChatPanelOpen((current) => !current)}
            type="button"
          >
            <MessageCircle size={16} />
            和{profileData?.profile.name ?? "该成员"}对话
          </button>
        </header>

        {hasTriangleData ? (
          <GoodLifeTriangle
            activeDimension={activeDimension}
            centerSubtitle={profileData?.centerSubtitle ?? "良好生活三角"}
            centerText={profileData?.centerText ?? "Good Life Triangle"}
            onSelect={selectDimension}
            visitedDimensions={visitedDimensions}
          />
        ) : null}

        <div className="dimension-scroll-area">
          {hasTriangleData && dimension ? (
            <>
              <DimensionPanel
                dimension={dimension}
                isLeaving={isPanelLeaving}
              />
            </>
          ) : (
            <EmptyTriangleState profileData={profileData} />
          )}
        </div>
        </div>
      </section>

    </main>
  );
}
