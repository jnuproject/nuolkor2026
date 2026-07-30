"use client";

import { useEffect } from "react";
import { TeachingSlide } from "@/components/courseware/TeachingSlide";
import type { DayInfo } from "@/content/course";
import type { TeachingSlide as TeachingSlideData } from "@/content/courseware/types";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";
import { usePresentationState } from "@/lib/use-presentation-state";

export function Presenter({
  day,
  slides,
}: {
  day: DayInfo;
  slides: TeachingSlideData[];
}) {
  const language = useLanguage();
  const [state, updateState] = usePresentationState(day.day, slides.length);
  const slide = slides[state.index];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest(
          "button, a, input, textarea, select, summary, [contenteditable='true']",
        )
      ) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        updateState({
          index: Math.min(slides.length - 1, state.index + 1),
          revealed: false,
        });
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        updateState({
          index: Math.max(0, state.index - 1),
          revealed: false,
        });
      } else if (event.key === "Home") {
        event.preventDefault();
        updateState({ index: 0, revealed: false });
      } else if (event.key === "End") {
        event.preventDefault();
        updateState({ index: slides.length - 1, revealed: false });
      } else if (event.key.toLowerCase() === "b") {
        updateState({ blank: !state.blank });
      } else if (event.key.toLowerCase() === "f") {
        void document.documentElement.requestFullscreen?.();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slides.length, state.blank, state.index, updateState]);

  if (!slide) {
    return (
      <main className="presenter-empty">
        {uiText(language, "No presentation screens found.")}
      </main>
    );
  }

  return (
    <main
      aria-label={uiText(language, "Day {day} projector slides", {
        day: day.day,
      })}
      className={`presenter presenter-projector ${state.blank ? "is-blank" : ""}`}
      data-slide-count={slides.length}
      data-slide-index={state.index + 1}
    >
      <section className="presenter-stage">
        <TeachingSlide
          key={slide.id}
          onReveal={() => updateState({ revealed: true })}
          revealed={state.revealed}
          slide={slide}
          variant="presenter"
        />
      </section>

      <p aria-live="polite" className="presenter-status">
        {uiText(language, "Screen {current} / {total}", {
          current: state.index + 1,
          total: slides.length,
        })}
      </p>

      {state.blank ? (
        <button
          className="blank-screen"
          onClick={() => updateState({ blank: false })}
          type="button"
        >
          <span>{uiText(language, "Press B or click to return")}</span>
        </button>
      ) : null}
    </main>
  );
}
