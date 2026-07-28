"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  localized,
  TeachingSlide,
} from "@/components/courseware/TeachingSlide";
import type { DayInfo } from "@/content/course";
import type { TeachingSlide as TeachingSlideData } from "@/content/courseware/types";
import { getInteractiveDay } from "@/content/interactive";
import { interactiveText } from "@/content/translations/interactive-ko";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";
import { LanguageToggle } from "./LanguageToggle";

function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const minutesPart = Math.floor(safe / 60);
  const secondsPart = safe % 60;
  return `${String(minutesPart).padStart(2, "0")}:${String(secondsPart).padStart(2, "0")}`;
}

const showcasePhases = [
  { label: "DEMO", seconds: 90 },
  { label: "SWITCH", seconds: 30 },
] as const;

export function Presenter({
  day,
  slides,
}: {
  day: DayInfo;
  slides: TeachingSlideData[];
}) {
  const language = useLanguage();
  const localizedSlides = slides;
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [blank, setBlank] = useState(false);
  const [notes, setNotes] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const [showcasePhase, setShowcasePhase] = useState(0);
  const slide = localizedSlides[index];
  const plan = getInteractiveDay(day.day);
  const stage = plan?.stages.find((item) => item.id === slide?.stageId);
  const stageNumber = stage
    ? plan?.stages.findIndex((item) => item.id === stage.id) ?? -1
    : -1;
  const slideSeconds = slide ? Math.max(60, slide.minutes * 60) : 60;
  const stageDuration = Math.max(60, (stage?.minutes ?? slide?.minutes ?? 1) * 60);
  const activeDuration = showcase ? showcasePhases[showcasePhase].seconds : slideSeconds;
  const [seconds, setSeconds] = useState(slideSeconds);
  const [stageSeconds, setStageSeconds] = useState(stageDuration);
  const [stageRunning, setStageRunning] = useState(false);

  function resetTimer(nextIndex = index) {
    const nextSlide = localizedSlides[nextIndex];
    setSeconds(
      showcase
        ? showcasePhases[showcasePhase].seconds
        : Math.max(60, nextSlide.minutes * 60),
    );
    setRunning(false);
  }

  function goTo(nextIndex: number) {
    const bounded = Math.max(
      0,
      Math.min(localizedSlides.length - 1, nextIndex),
    );
    const nextSlide = localizedSlides[bounded];
    const nextStage = plan?.stages.find((item) => item.id === nextSlide.stageId);
    const changesStage = nextSlide.stageId !== slide?.stageId;
    setIndex(bounded);
    setShowcase(false);
    setShowcasePhase(0);
    setSeconds(
      Math.max(60, localizedSlides[bounded].minutes * 60),
    );
    setRunning(false);
    if (changesStage) {
      setStageSeconds(
        Math.max(60, (nextStage?.minutes ?? nextSlide.minutes) * 60),
      );
      setStageRunning(false);
    }
  }

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (!stageRunning) {
      return;
    }

    const interval = window.setInterval(() => {
      setStageSeconds((current) => {
        if (current <= 1) {
          setStageRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [stageRunning]);

  useEffect(() => {
    function goToFromKeyboard(nextIndex: number) {
      const bounded = Math.max(
        0,
        Math.min(localizedSlides.length - 1, nextIndex),
      );
      const nextSlide = localizedSlides[bounded];
      const nextStage = plan?.stages.find((item) => item.id === nextSlide.stageId);
      const changesStage =
        nextSlide.stageId !== localizedSlides[index]?.stageId;
      setIndex(bounded);
      setShowcase(false);
      setShowcasePhase(0);
      setSeconds(Math.max(60, localizedSlides[bounded].minutes * 60));
      setRunning(false);
      if (changesStage) {
        setStageSeconds(
          Math.max(60, (nextStage?.minutes ?? nextSlide.minutes) * 60),
        );
        setStageRunning(false);
      }
    }

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
      if (event.key === "ArrowRight") {
        goToFromKeyboard(index + 1);
      } else if (event.key === "ArrowLeft") {
        goToFromKeyboard(index - 1);
      } else if (event.key === " ") {
        event.preventDefault();
        setRunning((current) => !current);
      } else if (event.key.toLowerCase() === "b") {
        setBlank((current) => !current);
      } else if (event.key.toLowerCase() === "n") {
        setNotes((current) => !current);
      } else if (event.key.toLowerCase() === "f") {
        void document.documentElement.requestFullscreen?.();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, localizedSlides, plan]);

  if (!slide) {
    return (
      <main className="presenter-empty">
        <LanguageToggle />
        {uiText(language, "No presentation screens found.")}
      </main>
    );
  }

  const alert =
    running || seconds === 0
      ? seconds === 0
        ? {
            tone: "over",
            text: `⏰ ${uiText(language, "Time — move on?").toUpperCase()}`,
          }
        : seconds <= 10
          ? {
              tone: "final",
              text: `⚠ ${uiText(language, "{seconds} seconds", {
                seconds,
              }).toUpperCase()}`,
            }
          : seconds <= 60
            ? {
                tone: "soon",
                text: `◔ ${uiText(language, "1 minute left").toUpperCase()}`,
              }
            : null
      : null;

  return (
    <main className={`presenter ${blank ? "is-blank" : ""}`}>
      <div className="presenter-topbar">
        <div>
          <span>
            {uiText(language, "Day {day}", { day: day.day }).toUpperCase()}
            {stageNumber >= 0 ? ` · ${String(stageNumber + 1).padStart(2, "0")}` : ""}
          </span>
          <strong>
            {stage
              ? interactiveText(language, stage.title)
              : interactiveText(language, day.phase)}
          </strong>
          <LanguageToggle />
        </div>
        <div className="presenter-progress">
          <span>
            {uiText(language, "Screen {current} / {total}", {
              current: index + 1,
              total: localizedSlides.length,
            }).toUpperCase()}
          </span>
          <div>
            <i
              style={{ width: `${((index + 1) / localizedSlides.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="presenter-clock">
          {alert ? (
            <em className={`presenter-alert is-${alert.tone}`} aria-live="assertive">
              {alert.text}
            </em>
          ) : (
            <span>
              {showcase
                ? uiText(
                    language,
                    showcasePhases[showcasePhase].label === "DEMO"
                      ? "Demo"
                      : "Switch",
                  ).toUpperCase()
                : `${slide.minutes} ${uiText(language, "min")}`}
            </span>
          )}
          <div className="presenter-stage-clock">
            <span>{uiText(language, "Stage remaining").toUpperCase()}</span>
            <b className={stageSeconds === 0 ? "is-elapsed" : ""}>
              {formatTime(stageSeconds)}
            </b>
          </div>
          <div className="presenter-slide-clock">
            <span>{uiText(language, "Slide remaining").toUpperCase()}</span>
            <strong className={seconds === 0 ? "is-elapsed" : ""}>
              {formatTime(seconds)}
            </strong>
          </div>
        </div>
      </div>

      <section className="presenter-stage">
        <TeachingSlide key={slide.id} slide={slide} variant="presenter" />
      </section>

      {notes ? (
        <aside
          className="presenter-notes"
          aria-label={uiText(language, "Instructor notes")}
        >
          <header>
            <span>
              {uiText(
                language,
                "These notes appear on this screen. Open them only on a private instructor display.",
              )}
            </span>
            <button onClick={() => setNotes(false)} type="button">
              {uiText(language, "Close (N)")}
            </button>
          </header>
          {slide.teacherNotes.length > 0 ? (
            <ul>
              {slide.teacherNotes.map((cue, cueIndex) => (
                <li key={`${slide.id}-note-${cueIndex}`}>
                  {localized(cue, language)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="notes-empty">
              {uiText(language, "This screen has no separate instructor cue.")}
            </p>
          )}
        </aside>
      ) : null}

      <div
        className="presenter-controls"
        aria-label={uiText(language, "Presentation controls")}
      >
        <Link href={`/instructor/day/${day.day}`}>{uiText(language, "Exit")}</Link>
        <button onClick={() => goTo(index - 1)} type="button">
          ← {uiText(language, "Previous")}
        </button>
        <button
          className="control-primary"
          onClick={() => {
            if (seconds === 0) {
              setSeconds(activeDuration);
              setRunning(true);
              return;
            }
            setRunning((value) => !value);
          }}
          type="button"
        >
          {uiText(
            language,
            running ? "Pause" : seconds === 0 ? "Start again" : "Start",
          )}
        </button>
        <button onClick={() => resetTimer()} type="button">
          {uiText(language, "Reset")}
        </button>
        <button
          className={stageRunning ? "is-active" : ""}
          onClick={() => {
            if (stageSeconds === 0) {
              setStageSeconds(stageDuration);
              setStageRunning(true);
              return;
            }
            setStageRunning((value) => !value);
          }}
          type="button"
        >
          {uiText(
            language,
            stageRunning
              ? "Pause stage clock"
              : stageSeconds === 0
                ? "Start stage clock again"
                : "Start stage clock",
          )}
        </button>
        <button
          onClick={() => {
            setStageSeconds(stageDuration);
            setStageRunning(false);
          }}
          type="button"
        >
          {uiText(language, "Reset stage clock")}
        </button>
        <button onClick={() => goTo(index + 1)} type="button">
          {uiText(language, "Next →")}
        </button>
        <button className={notes ? "is-active" : ""} onClick={() => setNotes((value) => !value)} type="button">
          {uiText(language, "Notes (N)")}
        </button>
        {day.day === 6 ? (
          <button
            className={showcase ? "is-active" : ""}
            onClick={() => {
              const nextValue = !showcase;
              setShowcase(nextValue);
              setShowcasePhase(0);
              setSeconds(nextValue ? showcasePhases[0].seconds : slideSeconds);
              setRunning(false);
            }}
            type="button"
          >
            {uiText(language, "90-sec showcase")}
          </button>
        ) : null}
        {showcase ? (
          <button
            onClick={() => {
              const nextPhase = (showcasePhase + 1) % showcasePhases.length;
              setShowcasePhase(nextPhase);
              setSeconds(showcasePhases[nextPhase].seconds);
              setRunning(false);
            }}
            type="button"
          >
            {uiText(language, "Next phase")}
          </button>
        ) : null}
        <button onClick={() => void document.documentElement.requestFullscreen?.()} type="button">
          {uiText(language, "Full screen")}
        </button>
        <button onClick={() => setBlank((value) => !value)} type="button">
          {uiText(language, "Blank")}
        </button>
      </div>

      {blank ? (
        <button className="blank-screen" onClick={() => setBlank(false)} type="button">
          <span>{uiText(language, "Press B or click to return")}</span>
        </button>
      ) : null}
    </main>
  );
}
