"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  const isLessonOverview =
    variant === "lesson" && slide.id.endsWith("-overview");
  const isSequential = ["flow", "demo", "studio", "run"].includes(
    slide.layout,
  );
  const isFocusedQuestion = slide.layout === "question";
  const SlideTitle = variant === "presenter" ? "h1" : "h2";
  const titleId = `${slide.id}-title`;
  const answerId = `${slide.id}-answer`;

  return (
    <article
      className={[
        "course-article",
        `layout-${slide.layout}`,
        `is-${variant}`,
        isLessonOverview ? "is-overview" : "",
      ].join(" ")}
      id={slide.id}
      aria-label={
        isLessonOverview ? localized(slide.title, language) : undefined
      }
      aria-labelledby={isLessonOverview ? undefined : titleId}
      data-slide-id={slide.id}
    >
      <header className="course-article-heading">
        <span>{localized(slide.kicker, language)}</span>
        {isLessonOverview ? null : (
          <SlideTitle id={titleId}>{localized(slide.title, language)}</SlideTitle>
        )}
        {slide.lead ? <p>{localized(slide.lead, language)}</p> : null}
      </header>

      {slide.items?.length ? (
        isSequential ? (
          <ol className="course-article-sections is-sequential">
            {slide.items.map((item, index) => (
              <li
                className={`course-article-section tone-${item.tone ?? "neutral"}`}
                key={`${slide.id}-item-${index}`}
              >
                <div>
                  {item.label ? (
                    <small>{localized(item.label, language)}</small>
                  ) : null}
                  <h3>{localized(item.title, language)}</h3>
                  <p>{localized(item.body, language)}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="course-article-sections">
            {slide.items.map((item, index) => (
              <section
                className={`course-article-section tone-${item.tone ?? "neutral"}`}
                key={`${slide.id}-item-${index}`}
              >
                {item.label ? (
                  <small>{localized(item.label, language)}</small>
                ) : null}
                <h3>{localized(item.title, language)}</h3>
                <p>{localized(item.body, language)}</p>
              </section>
            ))}
          </div>
        )
      ) : null}

      {slide.code ? (
        <figure className="course-code-example">
          <figcaption>
            {language === "ko"
              ? slide.layout === "demo"
                ? "시연에 사용할 입력"
                : "예시"
              : slide.layout === "demo"
                ? "Demo input"
                : "Example"}
          </figcaption>
          <pre>
            <code>{localized(slide.code, language)}</code>
          </pre>
        </figure>
      ) : null}

      {slide.markdown ? (
        <div className="course-article-markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {localized(slide.markdown, language)}
          </ReactMarkdown>
        </div>
      ) : null}

      {slide.question ? (
        <section
          className={[
            "course-question",
            isFocusedQuestion ? "is-focus" : "is-inline",
          ].join(" ")}
        >
          <span>
            {language === "ko"
              ? isFocusedQuestion
                ? "함께 판단해 보기"
                : "생각해 보기"
              : isFocusedQuestion
                ? "Decide together"
                : "Pause and think"}
          </span>
          <h3>{localized(slide.question.prompt, language)}</h3>
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
            <div
              className="course-question-answer"
              id={answerId}
              aria-live="polite"
            >
              <b>{localized(slide.question.answer, language)}</b>
              <p>{localized(slide.question.explanation, language)}</p>
            </div>
          ) : (
            <button
              aria-controls={answerId}
              aria-expanded="false"
              onClick={() => setRevealed(true)}
              type="button"
            >
              {language === "ko" ? "답과 해설 보기" : "Reveal answer"}
            </button>
          )}
        </section>
      ) : null}

      {slide.takeaway ? (
        <footer className="course-article-conclusion">
          <span>{language === "ko" ? "기억할 문장" : "Remember"}</span>
          <strong>{localized(slide.takeaway, language)}</strong>
        </footer>
      ) : null}

      {isQuestion && variant === "presenter" ? (
        <small className="course-article-presenter-hint">
          {language === "ko"
            ? "먼저 답을 받은 뒤 해설을 공개하세요."
            : "Collect answers before revealing the explanation."}
        </small>
      ) : null}
    </article>
  );
}
