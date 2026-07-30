"use client";

import Link from "next/link";
import type { DayInfo } from "@/content/course";
import type { TeachingSlide as TeachingSlideData } from "@/content/courseware/types";
import { uiText } from "@/content/translations/ui-ko";
import { localized, useLanguage } from "@/lib/language";
import { usePresentationState } from "@/lib/use-presentation-state";
import { StageTimer } from "./StageTimer";

export function PresentationController({
  day,
  slides,
}: {
  day: DayInfo;
  slides: TeachingSlideData[];
}) {
  const language = useLanguage();
  const [state, update] = usePresentationState(day.day, slides.length);
  const slide = slides[state.index];

  if (!slide) {
    return (
      <section
        aria-label={uiText(language, "Presentation controls")}
        className="presentation-controller"
      >
        <p>{uiText(language, "No presentation screens found.")}</p>
      </section>
    );
  }

  const title = localized(language, slide.title.en, slide.title.ko);
  const previousLabel = localized(
    language,
    "Previous slide",
    "이전 슬라이드",
  );
  const nextLabel = localized(language, "Next slide", "다음 슬라이드");

  return (
    <section
      aria-label={uiText(language, "Presentation controls")}
      className="presentation-controller"
    >
      <header className="presentation-controller-header">
        <div>
          <span>
            {uiText(language, "Screen {current} / {total}", {
              current: state.index + 1,
              total: slides.length,
            })}
          </span>
          <h2>{title}</h2>
          <p>
            {uiText(
              language,
              "The projector shows only the slide. Press F there once for full screen, then keep controls and notes here.",
            )}
          </p>
        </div>
        <Link
          href={`/day/${day.day}/present`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {uiText(language, "Projector slides ↗")}
        </Link>
      </header>

      <div
        aria-label={localized(
          language,
          "Projector navigation",
          "프로젝터 화면 이동",
        )}
        className="presentation-controller-actions"
        role="group"
      >
        <button
          aria-label={previousLabel}
          disabled={state.index === 0}
          onClick={() =>
            update({
              index: state.index - 1,
              revealed: false,
            })
          }
          type="button"
        >
          ← {uiText(language, "Previous")}
        </button>
        <button
          aria-label={nextLabel}
          disabled={state.index === slides.length - 1}
          onClick={() =>
            update({
              index: state.index + 1,
              revealed: false,
            })
          }
          type="button"
        >
          {uiText(language, "Next →")}
        </button>
        <button
          aria-pressed={state.blank}
          onClick={() => update({ blank: !state.blank })}
          type="button"
        >
          {state.blank
            ? localized(language, "Show slide", "화면 다시 보이기")
            : uiText(language, "Blank")}
        </button>
        {slide.question ? (
          <button
            aria-pressed={state.revealed}
            disabled={state.revealed}
            onClick={() => update({ revealed: true })}
            type="button"
          >
            {state.revealed
              ? localized(language, "Answer revealed", "정답 공개됨")
              : localized(language, "Reveal answer", "답과 해설 공개")}
          </button>
        ) : null}
      </div>

      <StageTimer compact key={slide.id} minutes={slide.minutes} />

      <aside
        aria-label={uiText(language, "Instructor notes")}
        className="presentation-controller-notes"
      >
        <h3>{uiText(language, "Instructor notes")}</h3>
        {slide.teacherNotes.length ? (
          <ol>
            {slide.teacherNotes.map((note, index) => (
              <li key={`${slide.id}-teacher-note-${index}`}>
                {localized(language, note.en, note.ko)}
              </li>
            ))}
          </ol>
        ) : (
          <p>
            {uiText(
              language,
              "This screen has no separate instructor cue.",
            )}
          </p>
        )}
      </aside>
    </section>
  );
}
