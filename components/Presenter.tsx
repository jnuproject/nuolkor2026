"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { DayInfo } from "@/content/course";
import type { PresentationSlide } from "@/content/present";

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
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [blank, setBlank] = useState(false);
  const [notes, setNotes] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const [showcasePhase, setShowcasePhase] = useState(0);
  const slide = slides[index];
  const next = slides[index + 1];
  const slideSeconds = slide ? Math.max(60, (slide.endMinute - slide.startMinute) * 60) : 60;
  const activeDuration = showcase ? showcasePhases[showcasePhase].seconds : slideSeconds;
  const [seconds, setSeconds] = useState(slideSeconds);

  const resetTimer = useCallback(
    (nextIndex = index) => {
      const nextSlide = slides[nextIndex];
      setSeconds(
        showcase
          ? showcasePhases[showcasePhase].seconds
          : Math.max(60, (nextSlide.endMinute - nextSlide.startMinute) * 60),
      );
      setRunning(false);
    },
    [index, showcase, showcasePhase, slides],
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      const bounded = Math.max(0, Math.min(slides.length - 1, nextIndex));
      setIndex(bounded);
      setShowcase(false);
      setShowcasePhase(0);
      setSeconds(
        Math.max(60, (slides[bounded].endMinute - slides[bounded].startMinute) * 60),
      );
      setRunning(false);
    },
    [slides],
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
    return <main className="presenter-empty">No presentation screens found.</main>;
  }

  const dense = slide.content.length > 380 || slide.content.split("\n").length > 10;
  const alert =
    running || seconds === 0
      ? seconds === 0
        ? { tone: "over", text: "⏰ TIME — MOVE ON?" }
        : seconds <= 10
          ? { tone: "final", text: `⚠ ${seconds} SECONDS` }
          : seconds <= 60
            ? { tone: "soon", text: "◔ 1 MINUTE LEFT" }
            : null
      : null;

  return (
    <main className={`presenter ${blank ? "is-blank" : ""}`}>
      <div className="presenter-topbar">
        <div>
          <span>DAY {day.day}</span>
          <strong>{day.phase}</strong>
        </div>
        <div className="presenter-progress">
          <span>
            SCREEN {index + 1} / {slides.length}
            {slide.timeLabel ? ` · ${slide.timeLabel}` : ""}
          </span>
          <div>
            <i style={{ width: `${((index + 1) / slides.length) * 100}%` }} />
          </div>
        </div>
        <div className="presenter-clock">
          {alert ? (
            <em className={`presenter-alert is-${alert.tone}`} aria-live="assertive">
              {alert.text}
            </em>
          ) : (
            <span>{showcase ? showcasePhases[showcasePhase].label : slide.timeLabel}</span>
          )}
          <strong className={seconds === 0 ? "is-elapsed" : ""}>{formatTime(seconds)}</strong>
        </div>
      </div>

      <section className={`presenter-stage ${dense ? "is-dense" : ""}`}>
        <span className="presenter-kicker">
          {showcase
            ? `SHOWCASE · ${showcasePhases[showcasePhase].label}`
            : slide.section && !/[가-힣]/.test(slide.section)
              ? slide.section
              : day.title}
        </span>
        <h1>{slide.title}</h1>
        <div className="presenter-copy">{slide.content}</div>
      </section>

      {next && !showcase ? (
        <button className="presenter-next" onClick={() => goTo(index + 1)} type="button">
          <span>NEXT · {minuteLabel(next.startMinute)}</span>
          <strong>{next.title}</strong>
        </button>
      ) : null}

      {notes ? (
        <aside className="presenter-notes" aria-label="Instructor notes">
          <header>
            <span>강사 노트 — 학생 화면에 비추지 마세요</span>
            <button onClick={() => setNotes(false)} type="button">
              닫기 (N)
            </button>
          </header>
          {slide.cues.length > 0 ? (
            <ul>
              {slide.cues.map((cue) => (
                <li key={cue}>{cue}</li>
              ))}
            </ul>
          ) : (
            <p className="notes-empty">이 화면에는 별도 강사 cue가 없습니다.</p>
          )}
          {slide.completion ? (
            <p className="notes-completion">
              <strong>완료 신호</strong> {slide.completion}
            </p>
          ) : null}
        </aside>
      ) : null}

      <div className="presenter-controls" aria-label="Presentation controls">
        <Link href={`/instructor/day/${day.day}`}>Exit</Link>
        <button onClick={() => goTo(index - 1)} type="button">
          ← Previous
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
          {running ? "Pause" : seconds === 0 ? "Start again" : "Start"}
        </button>
        <button onClick={() => resetTimer()} type="button">
          Reset
        </button>
        <button onClick={() => goTo(index + 1)} type="button">
          Next →
        </button>
        <button className={notes ? "is-active" : ""} onClick={() => setNotes((value) => !value)} type="button">
          Notes (N)
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
            4-min showcase
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
            Next phase
          </button>
        ) : null}
        <button onClick={() => void document.documentElement.requestFullscreen?.()} type="button">
          Full screen
        </button>
        <button onClick={() => setBlank((value) => !value)} type="button">
          Blank
        </button>
      </div>

      {blank ? (
        <button className="blank-screen" onClick={() => setBlank(false)} type="button">
          <span>Press B or click to return</span>
        </button>
      ) : null}
    </main>
  );
}
