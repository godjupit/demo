"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      "并把一些新的可能带进现实。"
    ]
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
      "同时保有韧性的生活方式。"
    ]
  },
  {
    key: "benefit",
    title: "公共性",
    subtitle: "Benefit Well",
    lines: [
      "如何在关照自我的同时，",
      "关切他人、回应周遭、关心公共，",
      "",
      "参与塑造我们共同身处的世界。"
    ]
  }
];

function Onboarding({ onEnter }: { onEnter: () => void }) {
  const [currentPage, setCurrentPage] = useState<OnboardingPage>("intro");
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showIntroPrompt, setShowIntroPrompt] = useState(false);
  const [isIntroLeaving, setIsIntroLeaving] = useState(false);
  const [activeValue, setActiveValue] = useState<ValueKey | null>(null);
  const [visitedValues, setVisitedValues] = useState<ValueKey[]>([]);

  useEffect(() => {
    if (currentPage !== "intro") {
      return;
    }

    let index = 0;
    const typeTimer = window.setInterval(() => {
      index += 1;
      setTypedText(introTitle.slice(0, index));

      if (index >= introTitle.length) {
        window.clearInterval(typeTimer);
        setIsTypingComplete(true);
      }
    }, 175);

    return () => {
      window.clearInterval(typeTimer);
    };
  }, [currentPage]);

  useEffect(() => {
    if (!isTypingComplete) {
      return;
    }

    const promptTimer = window.setTimeout(() => {
      setShowIntroPrompt(true);
    }, 500);

    return () => {
      window.clearTimeout(promptTimer);
    };
  }, [isTypingComplete]);

  function openValuesPage() {
    if (!isTypingComplete || isIntroLeaving) {
      return;
    }
    setIsIntroLeaving(true);
    window.setTimeout(() => {
      setCurrentPage("values");
    }, 620);
  }

  function chooseValue(key: ValueKey) {
    setActiveValue(key);
    setVisitedValues((current) => (current.includes(key) ? current : [...current, key]));
  }

  const hasVisitedValue = visitedValues.length > 0;
  const hasVisitedAllValues = visitedValues.length === valueItems.length;

  if (currentPage === "intro") {
    return (
      <main
        aria-label="B Community onboarding"
        className={`onboarding-shell intro-shell ${isIntroLeaving ? "intro-shell-leaving" : ""}`}
        onClick={openValuesPage}
      >
        <section className="intro-center" aria-live="polite">
          <h1 className="intro-title">
            <span>{typedText}</span>
            <span
              aria-hidden="true"
              className={`type-cursor ${isTypingComplete ? "type-cursor-done" : ""}`}
            />
          </h1>
          <p className={`intro-prompt ${showIntroPrompt ? "intro-prompt-visible" : ""}`}>
            轻点进入
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="onboarding-shell values-shell">
      <section className="values-stage" aria-labelledby="values-title">
        <h1 className="values-title" id="values-title">
          那么，我们定义的良好生活是什么？
        </h1>

        <div className={`value-grid active-${activeValue ?? "none"}`} aria-label="良好生活三角">
          <div className="value-triangle-lines" aria-hidden="true">
            <span className="value-triangle-line value-line-left" />
            <span className="value-triangle-line value-line-right" />
            <span className="value-triangle-line value-line-bottom" />
          </div>

          <div className="value-triangle-center">
            <strong>良好生活</strong>
            <span>Good Life</span>
          </div>

          {valueItems.map((item, index) => {
            const isActive = activeValue === item.key;
            const isVisited = visitedValues.includes(item.key);

            return (
              <button
                aria-pressed={isActive}
                className={`value-choice value-point-${item.key} ${isActive ? "active" : ""} ${
                  activeValue && !isActive ? "muted" : ""
                }`}
                key={item.key}
                onClick={() => chooseValue(item.key)}
                style={{ "--entry-delay": `${index * 0.2}s` } as CSSProperties}
                type="button"
              >
                <span className="value-choice-title">{item.title}</span>
                <span className="value-choice-subtitle">{item.subtitle}</span>
                {isVisited ? <span className="value-choice-mark" aria-hidden="true" /> : null}
              </button>
            );
          })}

          {valueItems.map((item) => (
            <aside
              aria-hidden={activeValue !== item.key}
              className={`value-annotation value-annotation-${item.key} ${
                activeValue === item.key ? "active" : ""
              }`}
              key={`annotation-${item.key}`}
            >
              <span className="value-annotation-line" aria-hidden="true" />
              <div>
                {item.lines.map((line, index) =>
                  line ? (
                    <p
                      className="value-annotation-text"
                      key={`${item.key}-${index}`}
                      style={{ "--line-delay": `${index * 0.08}s` } as CSSProperties}
                    >
                      {line}
                    </p>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="value-annotation-break"
                      key={`${item.key}-${index}`}
                    />
                  )
                )}
              </div>
            </aside>
          ))}
        </div>

        <div className={`onboarding-actions ${hasVisitedValue ? "visible" : ""}`}>
          <button className="enter-community-button" onClick={onEnter} type="button">
            {hasVisitedAllValues ? "带着这三个问题进入 B Community" : "进入 B Community"}
          </button>
        </div>
      </section>
    </main>
  );
}

export function OnboardingGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  function completeOnboarding() {
    console.log("Enter B Community");
    setHasCompletedOnboarding(true);
    router.replace(MAP_ROUTE);
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onEnter={completeOnboarding} />;
  }

  return <>{children}</>;
}
