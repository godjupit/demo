"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppleProp } from "@/components/onboarding/props/AppleProp";
import { PlantProp } from "@/components/onboarding/props/PlantProp";
import { FolderProp } from "@/components/onboarding/props/FolderProp";
import { NotebookProp } from "@/components/onboarding/props/NotebookProp";
import { LaptopProp } from "@/components/onboarding/props/LaptopProp";
import { CoffeeCupProp } from "@/components/onboarding/props/CoffeeCupProp";
import { PaperProp } from "@/components/onboarding/props/PaperProp";
import { PencilProp } from "@/components/onboarding/props/PencilProp";
import { LampProp } from "@/components/onboarding/props/LampProp";

type OnboardingPage = "intro" | "values";
type ValueKey = "create" | "live" | "benefit";

const MAP_ROUTE = "/?view=map";
const introTitle = "B Community";

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
      {/* Background props layer */}
      <div className="onboarding-props" aria-hidden="true">
        <div className="onboarding-prop prop-apple-top">
          <AppleProp size={52} accent="red" />
        </div>
        <div className="onboarding-prop prop-plant-top">
          <PlantProp size={72} />
        </div>
        <div className="onboarding-prop prop-folder-top">
          <FolderProp size={68} rotation={-6} />
        </div>
        <div className="onboarding-prop prop-notebook-top">
          <NotebookProp size={58} rotation={4} />
        </div>
        <div className="onboarding-prop prop-laptop-bottom">
          <LaptopProp size={76} rotation={-3} />
        </div>
        <div className="onboarding-prop prop-coffee-bottom">
          <CoffeeCupProp size={44} rotation={-8} />
        </div>
        <div className="onboarding-prop prop-paper-left">
          <PaperProp size={50} rotation={-5} />
        </div>
        <div className="onboarding-prop prop-pencil-right">
          <PencilProp size={62} accent="orange" rotation={10} />
        </div>
        <div className="onboarding-prop prop-lamp-right">
          <LampProp size={54} rotation={5} />
        </div>
      </div>

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
      {/* Background props */}
      <div className="onboarding-props" aria-hidden="true">
        {/* Create area — top */}
        <div className="onboarding-prop prop-apple-create">
          <AppleProp size={46} accent="green" />
        </div>
        <div className="onboarding-prop prop-notebook-create">
          <NotebookProp size={52} rotation={3} />
        </div>
        <div className="onboarding-prop prop-pencil-create">
          <PencilProp size={56} accent="blue" rotation={-8} />
        </div>

        {/* Live area — left/bottom-left */}
        <div className="onboarding-prop prop-plant-live">
          <PlantProp size={64} />
        </div>
        <div className="onboarding-prop prop-coffee-live">
          <CoffeeCupProp size={40} rotation={-4} />
        </div>
        <div className="onboarding-prop prop-lamp-live">
          <LampProp size={50} rotation={-6} />
        </div>

        {/* Benefit area — right/bottom-right */}
        <div className="onboarding-prop prop-folder-benefit">
          <FolderProp size={60} rotation={5} />
        </div>
        <div className="onboarding-prop prop-paper-benefit">
          <PaperProp size={48} rotation={-3} />
        </div>
        <div className="onboarding-prop prop-laptop-benefit">
          <LaptopProp size={68} rotation={-5} />
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
