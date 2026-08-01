"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { DayNumber } from "@/content/course";
import { getClassSlides } from "@/content/courseware";
import { interactiveDays } from "@/content/interactive";
import { stageReportsProgress } from "@/content/interactive/types";
import {
  interactiveText,
  teacherCueText,
} from "@/content/translations/interactive-ko";
import { uiText } from "@/content/translations/ui-ko";
import {
  clearClassroomAccessToken,
  consumeClassroomAccessToken,
  rememberedClassroomAccessPath,
  rememberClassroomAccessToken,
} from "@/lib/classroom-access";
import { classroomFetch } from "@/lib/classroom-api";
import { localized, useLanguage, type Language } from "@/lib/language";
import { absoluteSiteUrl } from "@/lib/site-path";
import { usePresentationState } from "@/lib/use-presentation-state";
import { LanguageToggle } from "../LanguageToggle";
import { StageTimer } from "./StageTimer";

type SessionStatus = "open" | "paused" | "closed";

type DashboardParticipant = {
  id: string;
  displayName: string;
  helpStatus: "green" | "yellow" | "red";
  currentStage: number;
  completedCount: number;
  joinedAt: number;
  updatedAt: number;
  currentActivityCount: number;
  currentActivityTotal: number;
  lastActivityAt: number | null;
};

type DashboardState = {
  session: {
    code: string;
    day: number;
    currentStage: number;
    status: SessionStatus;
    updatedAt: number;
  };
  participants: DashboardParticipant[];
  stageCounts: Record<string, number>;
};

type TeacherSession = {
  code: string;
  day: number;
  teacherToken: string;
};

function relativeTime(
  timestamp: number,
  clock: number,
  language: Language,
): string {
  const seconds = Math.max(0, Math.round((clock - timestamp) / 1000));
  if (seconds < 10) return uiText(language, "now");
  if (seconds < 60) {
    return uiText(language, "{seconds}s", { seconds });
  }
  return uiText(language, "{minutes}m", {
    minutes: Math.floor(seconds / 60),
  });
}

export function ClassroomDashboard() {
  const language = useLanguage();
  const [selectedDay, setSelectedDay] = useState(1);
  const [launchPin, setLaunchPin] = useState("");
  const [teacherSession, setTeacherSession] = useState<TeacherSession | null>(null);
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [clock, setClock] = useState(0);

  const activeDay = (dashboard?.session.day ??
    teacherSession?.day ??
    selectedDay) as DayNumber;
  const projectorSlides = getClassSlides(activeDay);
  const [, updatePresentation] = usePresentationState(
    activeDay,
    projectorSlides.length,
  );

  const plan = interactiveDays.find(
    (day) => day.day === activeDay,
  );
  const currentStage = plan?.stages[dashboard?.session.currentStage ?? 0];
  const currentStageReportsProgress = currentStage
    ? stageReportsProgress(currentStage)
    : false;
  const progressStageTotal =
    plan?.stages.filter(stageReportsProgress).length ?? 0;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const currentParams = new URLSearchParams(window.location.search);
      const rememberedPath = rememberedClassroomAccessPath("teacher");
      const rememberedParams = rememberedPath
        ? new URL(rememberedPath, window.location.origin).searchParams
        : new URLSearchParams();
      const params = /^[A-Z0-9]{6}$/.test(
        (currentParams.get("code") ?? "").toUpperCase(),
      )
        ? currentParams
        : rememberedParams;
      const code = (params.get("code") ?? "").toUpperCase();
      const day = Number(params.get("day"));
      const teacherToken = consumeClassroomAccessToken("teacher");
      if (
        !/^[A-Z0-9]{6}$/.test(code) ||
        !interactiveDays.some((item) => item.day === day) ||
        !teacherToken
      ) {
        return;
      }
      if (!currentParams.get("code") && rememberedPath) {
        window.history.replaceState(
          window.history.state,
          "",
          rememberedPath,
        );
      }
      setTeacherSession({ code, day, teacherToken });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const loadDashboard = useCallback(async () => {
    if (!teacherSession) {
      return;
    }
    try {
      const response = await classroomFetch(
        encodeURIComponent(teacherSession.code),
        {
          cache: "no-store",
          headers: { authorization: `Bearer ${teacherSession.teacherToken}` },
        },
      );
      if (response.status === 401 || response.status === 404) {
        clearClassroomAccessToken("teacher", "/instructor/live/");
        setTeacherSession(null);
        setDashboard(null);
        setError(uiText(language, "This saved classroom is no longer available."));
        return;
      }
      if (!response.ok) {
        throw new Error(uiText(language, "Dashboard is temporarily unavailable."));
      }
      setDashboard((await response.json()) as DashboardState);
      setClock(Date.now());
      setError("");
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : uiText(language, "Dashboard is temporarily unavailable."),
      );
    }
  }, [language, teacherSession]);

  useEffect(() => {
    if (!teacherSession) {
      return;
    }
    const firstLoad = window.setTimeout(() => void loadDashboard(), 0);
    const interval = window.setInterval(() => void loadDashboard(), 3000);
    return () => {
      window.clearTimeout(firstLoad);
      window.clearInterval(interval);
    };
  }, [loadDashboard, teacherSession]);

  async function createClassroom() {
    setCreating(true);
    setError("");
    try {
      const response = await classroomFetch("", {
        body: JSON.stringify({ day: selectedDay }),
        headers: {
          "content-type": "application/json",
          "x-instructor-pin": launchPin,
        },
        method: "POST",
      });
      const data = (await response.json()) as TeacherSession & { error?: string };
      if (!response.ok || !data.teacherToken) {
        throw new Error(
          data.error ?? uiText(language, "Could not create a classroom."),
        );
      }
      const next = {
        code: data.code,
        day: data.day,
        teacherToken: data.teacherToken,
      };
      rememberClassroomAccessToken(
        "teacher",
        next.teacherToken,
        `/instructor/live/?code=${encodeURIComponent(next.code)}&day=${next.day}`,
      );
      const firstStage = interactiveDays.find(
        (day) => day.day === next.day,
      )?.stages[0];
      const firstSlideIndex = firstStage
        ? projectorSlides.findIndex((slide) => slide.stageId === firstStage.id)
        : -1;
      if (firstSlideIndex >= 0) {
        updatePresentation({
          index: firstSlideIndex,
          blank: false,
          revealed: false,
        });
      }
      setLaunchPin("");
      setTeacherSession(next);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : uiText(language, "Could not create a classroom."),
      );
    } finally {
      setCreating(false);
    }
  }

  async function updateClassroom(input: {
    currentStage?: number;
    status?: SessionStatus;
  }) {
    if (!teacherSession) {
      return;
    }
    try {
      const response = await classroomFetch(
        encodeURIComponent(teacherSession.code),
        {
          body: JSON.stringify(input),
          headers: {
            authorization: `Bearer ${teacherSession.teacherToken}`,
            "content-type": "application/json",
          },
          method: "PATCH",
        },
      );
      if (!response.ok) {
        throw new Error(uiText(language, "Could not update the classroom."));
      }
      if (typeof input.currentStage === "number") {
        const nextStage = plan?.stages[input.currentStage];
        const nextSlideIndex = nextStage
          ? projectorSlides.findIndex(
              (slide) => slide.stageId === nextStage.id,
            )
          : -1;
        if (nextSlideIndex >= 0) {
          updatePresentation({
            index: nextSlideIndex,
            blank: false,
            revealed: false,
          });
        }
      }
      await loadDashboard();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : uiText(language, "Could not update the classroom."),
      );
    }
  }

  const participants = dashboard?.participants ?? [];
  const summary = {
    total: participants.length,
    online: participants.filter((item) => clock - item.updatedAt < 35_000).length,
    doneCurrent: currentStage
      ? Number(dashboard?.stageCounts[currentStage.id] ?? 0)
      : 0,
    blocked: participants.filter((item) => item.helpStatus === "red").length,
    needsCheck: participants.filter((item) => item.helpStatus === "yellow")
      .length,
  };
  const isClosed = dashboard?.session.status === "closed";
  const helpOrder = { red: 0, yellow: 1, green: 2 };
  const sortedParticipants = [...participants].sort(
    (a, b) =>
      helpOrder[a.helpStatus] - helpOrder[b.helpStatus] ||
      a.displayName.localeCompare(b.displayName),
  );

  if (!teacherSession) {
    return (
      <main className="dashboard-launch">
        <header className="dashboard-simple-header">
          <Link className="runner-brand" href="/">
            <span>BL</span>
            <strong>BUILD LOOP</strong>
          </Link>
          <div>
            <span>{uiText(language, "Instructor console").toUpperCase()}</span>
            <LanguageToggle />
          </div>
        </header>
        <section>
          <div className="dashboard-launch-copy">
            <span className="eyebrow">
              {uiText(language, "Run the room").toUpperCase()}
            </span>
            <h1>{uiText(language, "Start a live classroom.")}</h1>
            <p>
              {uiText(
                language,
                "Students join with one code. You see completion, current stage, help signals, and last activity without collecting accounts.",
              )}
            </p>
          </div>
          <div className="day-picker">
            <span>{uiText(language, "Choose today").toUpperCase()}</span>
            {interactiveDays.map((day) => (
              <button
                aria-pressed={selectedDay === day.day}
                className={selectedDay === day.day ? "is-selected" : ""}
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                type="button"
              >
                <strong>
                  {uiText(language, "Day {day}", { day: day.day }).toUpperCase()}
                </strong>
                <span>{interactiveText(language, day.title)}</span>
                <small>
                  {uiText(language, "{count} stages · 180 min", {
                    count: day.stages.length,
                  })}
                </small>
              </button>
            ))}
          </div>
          <label className="instructor-pin-field">
            <span>{uiText(language, "Instructor launch PIN").toUpperCase()}</span>
            <input
              autoComplete="off"
              onChange={(event) => setLaunchPin(event.target.value)}
              placeholder={uiText(language, "Enter the private instructor PIN")}
              required
              type="password"
              value={launchPin}
            />
            <small>
              {uiText(
                language,
                "The PIN creates a classroom and is never saved here.",
              )}
            </small>
          </label>
          {error ? (
            <div className="dashboard-error" role="alert">
              {uiText(language, error)}
            </div>
          ) : null}
          <button
            className="launch-class-button"
            disabled={creating || !launchPin.trim()}
            onClick={createClassroom}
            type="button"
          >
            {creating
              ? uiText(language, "Creating classroom…")
              : uiText(language, "Start Day {day} classroom →", {
                  day: selectedDay,
                })}
          </button>
          <p className="dashboard-privacy-note">
            {uiText(
              language,
              "Ask students to use a seat code or short classroom name, never a student ID or private contact information. Classroom data expires after seven days.",
            )}
          </p>
        </section>
      </main>
    );
  }

  const joinUrl = absoluteSiteUrl(
    `/join/?code=${encodeURIComponent(teacherSession.code)}`,
  );

  return (
    <main className="classroom-dashboard">
      <header className="dashboard-header">
        <div>
          <Link className="runner-brand" href="/">
            <span>BL</span>
            <strong>BUILD LOOP</strong>
          </Link>
          <div className="dashboard-day-title">
            <span>
              {uiText(language, "Day {day}", { day: plan?.day ?? "" }).toUpperCase()}
            </span>
            <strong>
              {plan ? interactiveText(language, plan.title) : ""}
            </strong>
          </div>
        </div>
        <div className="dashboard-code">
          <span>{uiText(language, "Join code").toUpperCase()}</span>
          <strong>{teacherSession.code}</strong>
          <button
            aria-live="polite"
            onClick={async () => {
              try {
                if (!navigator.clipboard?.writeText) {
                  throw new Error("Clipboard unavailable");
                }
                await navigator.clipboard.writeText(joinUrl);
                setCopyStatus("copied");
              } catch {
                setCopyStatus("failed");
              }
              window.setTimeout(() => setCopyStatus("idle"), 1800);
            }}
            type="button"
          >
            {copyStatus === "copied"
              ? uiText(language, "Copied ✓")
              : copyStatus === "failed"
                ? localized(language, "Copy failed", "복사하지 못했습니다")
                : uiText(language, "Copy join link")}
          </button>
        </div>
        <div className="dashboard-header-actions">
          <Link
            href={`/instructor/day/${teacherSession.day}`}
            rel="noreferrer"
            target="_blank"
          >
            {localized(language, "Teaching plan ↗", "강의 진행 화면 ↗")}
          </Link>
          <a href={joinUrl} rel="noreferrer" target="_blank">
            {uiText(language, "Student view ↗")}
          </a>
          <button
            onClick={() => {
              const confirmed = window.confirm(
                localized(
                  language,
                  "Leave this classroom on this tab? The classroom will remain open for its participants.",
                  "이 탭에서 현재 강의실을 나갈까요? 학생들의 강의실은 열린 상태로 유지됩니다.",
                ),
              );
              if (!confirmed) {
                return;
              }
              clearClassroomAccessToken("teacher", "/instructor/live/");
              setTeacherSession(null);
              setDashboard(null);
            }}
            type="button"
          >
            {localized(language, "Leave classroom", "강의실 나가기")}
          </button>
          <LanguageToggle />
        </div>
      </header>

      {error ? (
        <div
          className="dashboard-error dashboard-error-wide"
          role="alert"
        >
          {uiText(language, error)}
        </div>
      ) : null}

      <section className="dashboard-control">
        <div className="current-stage-card">
          <div>
            <span className={`phase-chip phase-${currentStage?.phase.toLowerCase()}`}>
              {currentStage
                ? interactiveText(language, currentStage.phase)
                : ""}
            </span>
            <small>
              {uiText(language, "Stage {current} / {total}", {
                current: (dashboard?.session.currentStage ?? 0) + 1,
                total: plan?.stages.length ?? 0,
              })}
              {" · "}
              {uiText(language, "Room status")}: {dashboard?.session.status
                ? uiText(language, dashboard.session.status)
                : "…"}
            </small>
            <h1>
              {currentStage ? interactiveText(language, currentStage.title) : ""}
            </h1>
            <p>
              {currentStage ? interactiveText(language, currentStage.goal) : ""}
            </p>
          </div>
          {currentStage ? (
            <StageTimer key={currentStage.id} minutes={currentStage.minutes} />
          ) : null}
        </div>
        <div className="teacher-cues">
          <span>{uiText(language, "Teacher cue").toUpperCase()}</span>
          <ul>
            {currentStage?.teacherCue.map((cue, index) => (
              <li key={`${currentStage.id}-cue-${index}`}>
                {teacherCueText(language, cue)}
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-control-buttons">
          <button
            disabled={isClosed || (dashboard?.session.currentStage ?? 0) === 0}
            onClick={() =>
              void updateClassroom({
                currentStage: (dashboard?.session.currentStage ?? 0) - 1,
              })
            }
            type="button"
          >
            ← {uiText(language, "Previous")}
          </button>
          <button
            className="control-main"
            disabled={
              isClosed ||
              !plan ||
              (dashboard?.session.currentStage ?? 0) >= plan.stages.length - 1
            }
            onClick={() =>
              void updateClassroom({
                currentStage: (dashboard?.session.currentStage ?? 0) + 1,
              })
            }
            type="button"
          >
            {uiText(language, "Advance everyone →")}
          </button>
          <button
            aria-pressed={dashboard?.session.status === "paused"}
            disabled={isClosed}
            onClick={() =>
              void updateClassroom({
                status: dashboard?.session.status === "paused" ? "open" : "paused",
              })
            }
            type="button"
          >
            {uiText(
              language,
              dashboard?.session.status === "paused"
                ? "Resume class"
                : "Pause class",
            )}
          </button>
          <button
            aria-pressed={isClosed}
            className="control-close"
            onClick={() =>
              void updateClassroom({
                status: dashboard?.session.status === "closed" ? "open" : "closed",
              })
            }
            type="button"
          >
            {uiText(
              language,
              dashboard?.session.status === "closed" ? "Reopen" : "Close class",
            )}
          </button>
        </div>
      </section>

      <section
        aria-label={localized(language, "Classroom summary", "강의실 요약")}
        className="dashboard-summary"
      >
        <article>
          <span>{uiText(language, "Joined").toUpperCase()}</span>
          <strong>{summary.total}</strong>
          <small>
            {uiText(language, "{count} active now", { count: summary.online })}
          </small>
        </article>
        <article>
          <span>{uiText(language, "Current stage done").toUpperCase()}</span>
          <strong>
            {!currentStageReportsProgress
              ? "—"
              : `${summary.doneCurrent}/${summary.total}`}
          </strong>
          <small>
            {!currentStageReportsProgress
              ? uiText(language, "Class operation")
              : currentStage
                ? interactiveText(language, currentStage.title)
                : ""}
          </small>
        </article>
        <article className={summary.blocked ? "has-alert has-critical" : ""}>
          <span>{localized(language, "Blocked", "진행 불가").toUpperCase()}</span>
          <strong>{summary.blocked}</strong>
          <small>{localized(language, "red signals", "빨강 신호")}</small>
        </article>
        <article className={summary.needsCheck ? "has-alert" : ""}>
          <span>{uiText(language, "Need a check").toUpperCase()}</span>
          <strong>{summary.needsCheck}</strong>
          <small>{localized(language, "yellow signals", "노랑 신호")}</small>
        </article>
      </section>

      <section
        className="dashboard-stage-strip"
        aria-label={uiText(language, "Class timeline")}
      >
        {plan?.stages.map((stage, index) => {
          const active = index === dashboard?.session.currentStage;
          const count = Number(dashboard?.stageCounts[stage.id] ?? 0);
          return (
            <button
              aria-current={active ? "step" : undefined}
              className={active ? "is-active" : ""}
              disabled={isClosed}
              key={stage.id}
              onClick={() => void updateClassroom({ currentStage: index })}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{interactiveText(language, stage.title)}</strong>
              <small>
                {(() => {
                  return !stageReportsProgress(stage)
                    ? uiText(language, "Class operation")
                    : uiText(language, "{done}/{total} done", {
                        done: count,
                        total: summary.total,
                      });
                })()}
              </small>
            </button>
          );
        })}
      </section>

      <section className="participant-section">
        <header>
          <div>
            <span className="eyebrow">
              {uiText(language, "Room pulse").toUpperCase()}
            </span>
            <h2>{uiText(language, "Who is moving, waiting, or blocked?")}</h2>
          </div>
          <div className="pulse-legend">
            <span className="legend-green">{uiText(language, "✓ moving")}</span>
            <span className="legend-yellow">{uiText(language, "? check")}</span>
            <span className="legend-red">{uiText(language, "! blocked")}</span>
          </div>
        </header>

        {sortedParticipants.length ? (
          <div className="participant-grid">
            {sortedParticipants.map((participant) => {
              const participantStage =
                plan?.stages[Math.min(participant.currentStage, (plan?.stages.length ?? 1) - 1)];
              const isOnline = clock - participant.updatedAt < 35_000;
              return (
                <article
                  className={`participant-card signal-${participant.helpStatus}`}
                  key={participant.id}
                >
                  <header>
                    <div>
                      <i>
                        {participant.helpStatus === "green"
                          ? "✓"
                          : participant.helpStatus === "yellow"
                            ? "?"
                            : "!"}
                      </i>
                      <strong>{participant.displayName}</strong>
                    </div>
                    <span className={isOnline ? "is-online" : ""}>
                      {isOnline
                        ? uiText(language, "Live").toUpperCase()
                        : relativeTime(participant.updatedAt, clock, language)}
                    </span>
                  </header>
                  <div className="participant-progress">
                    <span>{uiText(language, "Day progress").toUpperCase()}</span>
                    <strong>
                      {participant.completedCount}/{progressStageTotal}
                    </strong>
                    <div>
                      <i
                        style={{
                          width: `${Math.round(
                            (participant.completedCount /
                              Math.max(1, progressStageTotal)) *
                              100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <footer>
                    <div>
                      <span>{uiText(language, "Now").toUpperCase()}</span>
                      <strong>
                        {participantStage
                          ? interactiveText(language, participantStage.title)
                          : uiText(language, "Joining…")}
                      </strong>
                    </div>
                    <div>
                      <span>{uiText(language, "Activities").toUpperCase()}</span>
                      <strong>
                        {participant.currentActivityCount}/
                        {participant.currentActivityTotal}
                      </strong>
                    </div>
                    <small>
                      {participant.lastActivityAt
                        ? uiText(language, "Last evidence {time} ago", {
                            time: relativeTime(
                              participant.lastActivityAt,
                              clock,
                              language,
                            ),
                          })
                        : uiText(language, "No activity evidence yet")}
                    </small>
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-room">
            <strong>{uiText(language, "Waiting for students.")}</strong>
            <span>
              {uiText(language, "Show code {code} or share the join link.", {
                code: teacherSession.code,
              })}
            </span>
          </div>
        )}
      </section>
    </main>
  );
}
