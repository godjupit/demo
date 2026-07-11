"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LandmarkIllustration } from "@/components/community-map/LandmarkIllustration";
import type { LandmarkType } from "@/lib/memberMapVisuals";

type OnboardingPage = "intro" | "values";
type ValueKey = "create" | "live" | "benefit";

const MAP_ROUTE = "/?view=map";
const introTitle = "B Community";

type OnboardingDecorAsset = LandmarkType | "cloud" | "tree" | "flower";

type OnboardingDecorItem = {
  id: string;
  asset: OnboardingDecorAsset;
  position: CSSProperties;
  size: number;
  rotation?: number;
  opacity?: number;
  className?: string;
};

const onboardingPage1Decor: OnboardingDecorItem[] = [
  {
    id: "intro-cloud-upper-left",
    asset: "cloud",
    position: { left: "9%", top: "10%" },
    size: 118,
    opacity: 0.52,
    className: "decor-soft",
  },
  {
    id: "intro-ice-cream",
    asset: "ice-cream",
    position: { left: "16%", top: "30%" },
    size: 76,
    rotation: 6,
    opacity: 0.92,
  },
  {
    id: "intro-courtyard-house",
    asset: "courtyard-house",
    position: { left: "7%", bottom: "12%" },
    size: 124,
    rotation: -2,
  },
  {
    id: "intro-blue-book",
    asset: "blue-book",
    position: { left: "22%", bottom: "20%" },
    size: 84,
    rotation: -9,
  },
  {
    id: "intro-flower-left",
    asset: "flower",
    position: { left: "28%", bottom: "10%" },
    size: 58,
    opacity: 0.82,
    className: "decor-soft",
  },
  {
    id: "intro-framed-painting",
    asset: "framed-painting",
    position: { right: "14%", top: "13%" },
    size: 94,
    rotation: 5,
  },
  {
    id: "intro-cloud-right",
    asset: "cloud",
    position: { right: "8%", top: "28%" },
    size: 108,
    opacity: 0.45,
    className: "decor-soft",
  },
  {
    id: "intro-potted-flower",
    asset: "potted-flower",
    position: { right: "24%", top: "34%" },
    size: 70,
    opacity: 0.88,
  },
  {
    id: "intro-sofa",
    asset: "sofa",
    position: { right: "8%", bottom: "17%" },
    size: 132,
    rotation: 2,
  },
  {
    id: "intro-cat",
    asset: "cat",
    position: { right: "23%", bottom: "9%" },
    size: 82,
    rotation: -4,
  },
];

const onboardingPage2Decor: OnboardingDecorItem[] = [
  {
    id: "values-cloud-left",
    asset: "cloud",
    position: { left: "7%", top: "10%" },
    size: 112,
    opacity: 0.42,
    className: "decor-soft",
  },
  {
    id: "values-ballet-dancer",
    asset: "ballet-dancer",
    position: { left: "14%", top: "20%" },
    size: 78,
    rotation: -8,
  },
  {
    id: "values-apartment-building",
    asset: "apartment-building",
    position: { right: "11%", top: "12%" },
    size: 90,
    rotation: 2,
  },
  {
    id: "values-family",
    asset: "family-four",
    position: { right: "8%", top: "31%" },
    size: 82,
    opacity: 0.9,
  },
  {
    id: "values-courtyard-house",
    asset: "courtyard-house",
    position: { left: "6%", bottom: "17%" },
    size: 116,
    rotation: -3,
  },
  {
    id: "values-flower-left",
    asset: "potted-flower",
    position: { left: "20%", bottom: "8%" },
    size: 72,
    rotation: 5,
  },
  {
    id: "values-landscape-easel",
    asset: "landscape-easel",
    position: { right: "17%", bottom: "24%" },
    size: 100,
    rotation: -2,
  },
  {
    id: "values-ceramic-bowl",
    asset: "ceramic-bowl",
    position: { right: "9%", bottom: "13%" },
    size: 92,
    rotation: 3,
  },
  {
    id: "values-flower-right",
    asset: "flower",
    position: { right: "25%", bottom: "7%" },
    size: 56,
    opacity: 0.8,
    className: "decor-soft",
  },
];

const valueItems: Array<{
  key: ValueKey;
  title: string;
  subtitle: string;
  lines: string[];
}> = [
  {
    key: "create",
    title: "创造力",
    subtitle: "Create Well",
    lines: [
      "仍然愿意想象、表达、创造，",
      "是在既有路径之外，在线性的成功学叙事之外，",
      "并把一些新的可能带进现实。",
    ],
  },
  {
    key: "live",
    title: "身心安顿",
    subtitle: "Live Well",
    lines: [
      "依然能够诚实地面对自己，",
      "慢慢找到一种内在自洽，",
      "",
      "如何在不确定、不断变化、",
      "也并不总是友好的现实里，",
      "",
      "同时保有韧性的生活方式。",
    ],
  },
  {
    key: "benefit",
    title: "公共性",
    subtitle: "Benefit Well",
    lines: [
      "如何在关照自我的同时，",
      "关切他人、回应周遭、关心公共，",
      "",
      "参与塑造我们共同身处的世界。",
    ],
  },
];

/* ── Page 1: Intro ── */

function OnboardingTreeDecor() {
  return (
    <svg className="onboarding-map-decor-svg" viewBox="0 0 80 80" aria-hidden="true">
      <rect x="35" y="45" width="10" height="22" rx="4" fill="#c49a62" />
      <circle cx="31" cy="39" r="16" fill="#9fcb7d" />
      <circle cx="48" cy="38" r="18" fill="#83b568" />
      <circle cx="40" cy="25" r="16" fill="#badd93" />
      <circle cx="31" cy="24" r="8" fill="#d9ecb8" opacity="0.78" />
    </svg>
  );
}

function OnboardingFlowerDecor() {
  return (
    <svg className="onboarding-map-decor-svg" viewBox="0 0 80 80" aria-hidden="true">
      <path
        d="M39 46 C34 52 31 59 30 68"
        fill="none"
        stroke="#8eb866"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M36 56 C28 53 22 55 18 62"
        fill="none"
        stroke="#8eb866"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <circle cx="39" cy="32" r="9" fill="#ffd75e" />
      <circle cx="39" cy="18" r="10" fill="#ff7f9b" />
      <circle cx="53" cy="32" r="10" fill="#ff7f9b" />
      <circle cx="39" cy="46" r="10" fill="#ff7f9b" />
      <circle cx="25" cy="32" r="10" fill="#ff7f9b" />
    </svg>
  );
}

function OnboardingDecorAssetView({ asset }: { asset: OnboardingDecorAsset }) {
  if (asset === "cloud") {
    return <span className="onboarding-cloud-decor" />;
  }
  if (asset === "tree") {
    return <OnboardingTreeDecor />;
  }
  if (asset === "flower") {
    return <OnboardingFlowerDecor />;
  }

  return <LandmarkIllustration type={asset} className="onboarding-map-decor-svg" />;
}

function OnboardingDecorLayer({ items }: { items: OnboardingDecorItem[] }) {
  return (
    <div className="onboarding-props" aria-hidden="true">
      {items.map((item, index) => (
        <div
          className={`onboarding-map-decor ${item.className ?? ""}`}
          data-asset={item.asset}
          key={item.id}
          style={
            {
              ...item.position,
              "--decor-size": `${item.size}px`,
              "--decor-rotation": `${item.rotation ?? 0}deg`,
              "--decor-delay": `${index * 0.18}s`,
              opacity: item.opacity ?? 1,
            } as CSSProperties
          }
        >
          <OnboardingDecorAssetView asset={item.asset} />
        </div>
      ))}
    </div>
  );
}

function IntroPage({ onEnter }: { onEnter: () => void }) {
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(introTitle.slice(0, index));
      if (index >= introTitle.length) {
        window.clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 175);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isTypingComplete) return;
    const t = window.setTimeout(() => setShowPrompt(true), 500);
    return () => window.clearTimeout(t);
  }, [isTypingComplete]);

  function handleClick() {
    if (!isTypingComplete || isLeaving) return;
    setIsLeaving(true);
    window.setTimeout(onEnter, 620);
  }

  return (
    <main
      aria-label="B Community onboarding"
      className={`onboarding-shell onboarding-intro ${isLeaving ? "onboarding-intro--leaving" : ""}`}
      onClick={handleClick}
    >
      <OnboardingDecorLayer items={onboardingPage1Decor} />

      {/* Center content */}
      <section className="onboarding-intro-center" aria-live="polite">
        <p className="onboarding-kicker">A community of practices</p>
        <h1 className="onboarding-intro-title">
          <span>{typedText}</span>
          <span
            aria-hidden="true"
            className={`type-cursor ${isTypingComplete ? "type-cursor-done" : ""}`}
          />
        </h1>
        <p className={`onboarding-intro-prompt ${showPrompt ? "visible" : ""}`}>
          点击任意位置继续
        </p>
      </section>
    </main>
  );
}

/* ── Page 2: Good Life Triangle ── */

function ValuesPage({ onEnter }: { onEnter: () => void }) {
  const [activeValue, setActiveValue] = useState<ValueKey | null>(null);
  const [visitedValues, setVisitedValues] = useState<ValueKey[]>([]);

  function chooseValue(key: ValueKey) {
    setActiveValue(key);
    setVisitedValues((c) => (c.includes(key) ? c : [...c, key]));
  }

  const hasVisitedValue = visitedValues.length > 0;
  const hasVisitedAll = visitedValues.length === valueItems.length;

  return (
    <main className="onboarding-shell onboarding-values">
      <OnboardingDecorLayer items={onboardingPage2Decor} />
      {/* Background props */}
      <div className="onboarding-props" aria-hidden="true">
        {/* Create area — top */}
        <div className="onboarding-prop prop-apple-create">
        </div>
        <div className="onboarding-prop prop-notebook-create">
        </div>
        <div className="onboarding-prop prop-pencil-create">
        </div>

        {/* Live area — left/bottom-left */}
        <div className="onboarding-prop prop-plant-live">
        </div>
        <div className="onboarding-prop prop-coffee-live">
        </div>
        <div className="onboarding-prop prop-lamp-live">
        </div>

        {/* Benefit area — right/bottom-right */}
        <div className="onboarding-prop prop-folder-benefit">
        </div>
        <div className="onboarding-prop prop-paper-benefit">
        </div>
        <div className="onboarding-prop prop-laptop-benefit">
        </div>
      </div>

      {/* Main content */}
      <section className="onboarding-values-stage">
        <h1 className="onboarding-values-title">
          我们定义的良好生活是什么？
        </h1>

        <div
          className={`onboarding-triangle-grid active-${activeValue ?? "none"}`}
          aria-label="良好生活三角"
        >
          {/* Triangle lines */}
          <div className="value-triangle-lines" aria-hidden="true">
            <span className="value-triangle-line value-line-left" />
            <span className="value-triangle-line value-line-right" />
            <span className="value-triangle-line value-line-bottom" />
          </div>

          {/* Center */}
          <div className="value-triangle-center">
            <strong>良好生活</strong>
            <span>Good Life</span>
          </div>

          {/* Three dimension nodes */}
          {valueItems.map((item, index) => {
            const isActive = activeValue === item.key;
            const isVisited = visitedValues.includes(item.key);

            return (
              <button
                aria-pressed={isActive}
                className={`value-choice value-point-${item.key} ${
                  isActive ? "active" : ""
                } ${activeValue && !isActive ? "muted" : ""}`}
                key={item.key}
                onClick={() => chooseValue(item.key)}
                style={{ "--entry-delay": `${index * 0.2}s` } as CSSProperties}
                type="button"
              >
                <span className="value-choice-title">{item.title}</span>
                <span className="value-choice-subtitle">{item.subtitle}</span>
                {isVisited ? (
                  <span className="value-choice-mark" aria-hidden="true" />
                ) : null}
              </button>
            );
          })}

          {/* Dimension note cards */}
          {valueItems.map((item) => (
            <aside
              aria-hidden={activeValue !== item.key}
              className={`dimension-note dimension-note-${item.key} ${
                activeValue === item.key ? "active" : ""
              }`}
              key={`note-${item.key}`}
            >
              <span className="dimension-note-line" aria-hidden="true" />
              <div>
                {item.lines.map((line, i) =>
                  line ? (
                    <p
                      className="dimension-note-text"
                      key={`${item.key}-${i}`}
                      style={{ "--line-delay": `${i * 0.08}s` } as CSSProperties}
                    >
                      {line}
                    </p>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="dimension-note-break"
                      key={`${item.key}-${i}`}
                    />
                  ),
                )}
              </div>
            </aside>
          ))}
        </div>

        {/* Enter button */}
        <div className={`onboarding-actions ${hasVisitedValue ? "visible" : ""}`}>
          <button className="enter-community-button" onClick={onEnter} type="button">
            {hasVisitedAll
              ? "带着这三个问题进入 B Community"
              : "进入 B Community"}
          </button>
        </div>
      </section>
    </main>
  );
}

/* ── Gate ── */

export function OnboardingGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [page, setPage] = useState<OnboardingPage>("intro");
  const [hasCompleted, setHasCompleted] = useState(false);

  function goToValues() {
    window.setTimeout(() => setPage("values"), 620);
  }

  function completeOnboarding() {
    setHasCompleted(true);
    router.replace(MAP_ROUTE);
  }

  if (hasCompleted) {
    return <>{children}</>;
  }

  if (page === "intro") {
    return <IntroPage onEnter={goToValues} />;
  }

  return <ValuesPage onEnter={completeOnboarding} />;
}
