"use client";

import { useState } from "react";
import type {
  BilingualCopy,
  TeachingSlide as TeachingSlideData,
} from "@/content/courseware/types";
import type { Language } from "@/lib/language";
import { useLanguage } from "@/lib/language";

export function localized(copy: BilingualCopy, language: Language): string {
  return copy[language];
}

export function TeachingSlide({
  slide,
  variant = "lesson",
}: {
  slide: TeachingSlideData;
  variant?: "lesson" | "presenter";
}) {
  const language = useLanguage();
  const [revealed, setRevealed] = useState(false);
  const isQuestion = Boolean(slide.question);
  const isDense =
    Boolean(slide.code) ||
    Boolean(slide.question && slide.items?.length) ||
    (slide.items?.length ?? 0) >= 4;

  return (
    <article
      className={[
        "teaching-slide",
        `layout-${slide.layout}`,
        `is-${variant}`,
        isDense ? "is-dense" : "",
      ].join(" ")}
      data-slide-id={slide.id}
    >
      <div className="teaching-slide-layout-mark" aria-hidden="true">
        <span>{slide.layout.replace("-", " ")}</span>
        <i />
      </div>

      <header className="teaching-slide-heading">
        <span>{localized(slide.kicker, language)}</span>
        <h2>{localized(slide.title, language)}</h2>
        {slide.lead ? <p>{localized(slide.lead, language)}</p> : null}
      </header>

      {slide.items?.length ? (
        <div className="teaching-slide-items">
          {slide.items.map((item, index) => (
            <section
              className={`teaching-slide-item tone-${item.tone ?? "neutral"}`}
              key={`${slide.id}-item-${index}`}
            >
              <span className="teaching-slide-item-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label ? <small>{localized(item.label, language)}</small> : null}
              <h3>{localized(item.title, language)}</h3>
              <p>{localized(item.body, language)}</p>
            </section>
          ))}
        </div>
      ) : null}

      {slide.code ? (
        <div className="teaching-slide-code-shell">
          <span>
            {language === "ko"
              ? slide.layout === "demo"
                ? "실시간 시연 입력"
                : "함께 읽는 예시"
              : slide.layout === "demo"
                ? "LIVE DEMO INPUT"
                : "WORKED EXAMPLE"}
          </span>
          <i aria-hidden="true">
            <b />
            <b />
            <b />
          </i>
          <pre className="teaching-slide-code">
            <code>{localized(slide.code, language)}</code>
          </pre>
        </div>
      ) : null}

      {slide.question ? (
        <section className="teaching-slide-question">
          <strong>{localized(slide.question.prompt, language)}</strong>
          {slide.question.options?.length ? (
            <ol>
              {slide.question.options.map((option, index) => (
                <li key={`${slide.id}-option-${index}`}>
                  <span aria-hidden="true">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <strong>{localized(option, language)}</strong>
                </li>
              ))}
            </ol>
          ) : null}
          {revealed ? (
            <div className="teaching-slide-answer" aria-live="polite">
              <b>{localized(slide.question.answer, language)}</b>
              <p>{localized(slide.question.explanation, language)}</p>
            </div>
          ) : (
            <button onClick={() => setRevealed(true)} type="button">
              {language === "ko" ? "답과 해설 보기" : "Reveal answer"}
            </button>
          )}
        </section>
      ) : null}

      {slide.takeaway ? (
        <footer className="teaching-slide-takeaway">
          <span>{language === "ko" ? "핵심" : "TAKEAWAY"}</span>
          <strong>{localized(slide.takeaway, language)}</strong>
        </footer>
      ) : null}

      {isQuestion && variant === "presenter" ? (
        <small className="teaching-slide-presenter-hint">
          {language === "ko"
            ? "먼저 답을 받은 뒤 해설을 공개하세요."
            : "Collect answers before revealing the explanation."}
        </small>
      ) : null}
    </article>
  );
}
