"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { DayInfo } from "@/content/course";
import type { PresentationSlide } from "@/content/present";
import {
  interactiveText,
  teacherCueText,
} from "@/content/translations/interactive-ko";
import { getLocalizedPresentationSlides } from "@/content/translations/presentations-ko";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";
import { LanguageToggle } from "./LanguageToggle";

function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const minutesPart = Math.floor(safe / 60);
  const secondsPart = safe % 60;
  return `${String(minutesPart).padStart(2, "0")}:${String(secondsPart).padStart(2, "0")}`;
}

function minuteLabel(totalMinutes: number): string {
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, "0")}:${String(
    totalMinutes % 60,
  ).padStart(2, "0")}`;
}

const showcasePhases = [
  { label: "DEMO", seconds: 120 },
  { label: "FEEDBACK", seconds: 60 },
  { label: "SWITCH", seconds: 60 },
] as const;

export function Presenter({
  day,
  slides,
}: {
  day: DayInfo;
  slides: PresentationSlide[];
}) {
  const language = useLanguage();
  const localizedSlides = useMemo(
    () => getLocalizedPresentationSlides(day.day, language, slides),
    [day.day, language, slides],
  );
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [blank, setBlank] = useState(false);
  const [notes, setNotes] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const [showcasePhase, setShowcasePhase] = useState(0);
  const slide = localizedSlides[index];
  const next = localizedSlides[index + 1];
  const slideSeconds = slide ? Math.max(60, (slide.endMinute - slide.startMinute) * 60) : 60;
  const activeDuration = showcase ? showcasePhases[showcasePhase].seconds : slideSeconds;
  const [seconds, setSeconds] = useState(slideSeconds);

  const resetTimer = useCallback(
    (nextIndex = index) => {
      const nextSlide = localizedSlides[nextIndex];
      setSeconds(
        showcase
          ? showcasePhases[showcasePhase].seconds
          : Math.max(60, (nextSlide.endMinute - nextSlide.startMinute) * 60),
      );
      setRunning(false);
    },
    [index, localizedSlides, showcase, showcasePhase],
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      const bounded = Math.max(
        0,
        Math.min(localizedSlides.length - 1, nextIndex),
      );
      setIndex(bounded);
      setShowcase(false);
      setShowcasePhase(0);
      setSeconds(
        Math.max(
          60,
          (localizedSlides[bounded].endMinute -
            localizedSlides[bounded].startMinute) *
            60,
        ),
      );
      setRunning(false);
    },
    [localizedSlides],
  );

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
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        goTo(index + 1);
      } else if (event.key === "ArrowLeft") {
        goTo(index - 1);
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
  }, [goTo, index]);

  if (!slide) {
    return (
      <main className="presenter-empty">
        <LanguageToggle />
        {uiText(language, "No presentation screens found.")}
      </main>
    );
  }

  const dense = slide.content.length > 380 || slide.content.split("\n").length > 10;
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
          </span>
          <strong>{interactiveText(language, day.phase)}</strong>
          <LanguageToggle />
        </div>
        <div className="presenter-progress">
          <span>
            {uiText(language, "Screen {current} / {total}", {
              current: index + 1,
              total: localizedSlides.length,
            }).toUpperCase()}
            {slide.timeLabel ? ` · ${slide.timeLabel}` : ""}
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
                      : showcasePhases[showcasePhase].label === "FEEDBACK"
                        ? "Feedback"
                        : "Switch",
                  ).toUpperCase()
                : slide.timeLabel}
            </span>
          )}
          <strong className={seconds === 0 ? "is-elapsed" : ""}>{formatTime(seconds)}</strong>
        </div>
      </div>

      <section className={`presenter-stage ${dense ? "is-dense" : ""}`}>
        <span className="presenter-kicker">
          {showcase
            ? uiText(language, "Showcase · {phase}", {
                phase: uiText(
                  language,
                  showcasePhases[showcasePhase].label === "DEMO"
                    ? "Demo"
                    : showcasePhases[showcasePhase].label === "FEEDBACK"
                      ? "Feedback"
                      : "Switch",
                  ),
              }).toUpperCase()
            : language === "ko"
              ? slide.section ?? interactiveText(language, day.title)
              : slide.section && !/[가-힣]/.test(slide.section)
                ? slide.section
                : interactiveText(language, day.title)}
        </span>
        <h1>{slide.title}</h1>
        <div className="presenter-copy">{slide.content}</div>
      </section>

      {next && !showcase ? (
        <button className="presenter-next" onClick={() => goTo(index + 1)} type="button">
          <span>
            {uiText(language, "Next · {time}", {
              time: minuteLabel(next.startMinute),
            }).toUpperCase()}
          </span>
          <strong>{next.title}</strong>
        </button>
      ) : null}

      {notes ? (
        <aside
          className="presenter-notes"
          aria-label={uiText(language, "Instructor notes")}
        >
          <header>
            <span>
              {uiText(
                language,
                "Instructor notes — do not project this panel to students",
              )}
            </span>
            <button onClick={() => setNotes(false)} type="button">
              {uiText(language, "Close (N)")}
            </button>
          </header>
          {slide.cues.length > 0 ? (
            <ul>
              {slide.cues.map((cue) => (
                <li key={cue}>{teacherCueText(language, cue)}</li>
              ))}
            </ul>
          ) : (
            <p className="notes-empty">
              {uiText(language, "This screen has no separate instructor cue.")}
            </p>
          )}
          {slide.completion ? (
            <p className="notes-completion">
              <strong>{uiText(language, "Completion signal")}</strong>{" "}
              {slide.completion}
            </p>
          ) : null}
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
            {uiText(language, "4-min showcase")}
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
