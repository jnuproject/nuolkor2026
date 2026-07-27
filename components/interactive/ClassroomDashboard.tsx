"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { interactiveDays } from "@/content/interactive";
import {
  clearClassroomAccessToken,
  consumeClassroomAccessToken,
  rememberClassroomAccessToken,
} from "@/lib/classroom-access";
import { classroomFetch } from "@/lib/classroom-api";
import { absoluteSiteUrl } from "@/lib/site-path";
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

function relativeTime(timestamp: number, clock: number): string {
  const seconds = Math.max(0, Math.round((clock - timestamp) / 1000));
  if (seconds < 10) return "now";
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m`;
}

export function ClassroomDashboard() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [launchPin, setLaunchPin] = useState("");
  const [teacherSession, setTeacherSession] = useState<TeacherSession | null>(null);
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState(0);

  const plan = interactiveDays.find(
    (day) => day.day === (dashboard?.session.day ?? teacherSession?.day ?? selectedDay),
  );
  const currentStage = plan?.stages[dashboard?.session.currentStage ?? 0];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
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
        setError("This saved classroom is no longer available.");
        return;
      }
      if (!response.ok) {
        throw new Error("Dashboard is temporarily unavailable.");
      }
      setDashboard((await response.json()) as DashboardState);
      setClock(Date.now());
      setError("");
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Dashboard is temporarily unavailable.",
      );
    }
  }, [teacherSession]);

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
        throw new Error(data.error ?? "Could not create a classroom.");
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
      setLaunchPin("");
      setTeacherSession(next);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Could not create a classroom.",
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
        throw new Error("Could not update the classroom.");
      }
      await loadDashboard();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Could not update the classroom.",
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
    needsHelp: participants.filter(
      (item) => item.helpStatus === "yellow" || item.helpStatus === "red",
    ).length,
  };
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
          <span>INSTRUCTOR CONSOLE</span>
        </header>
        <section>
          <div className="dashboard-launch-copy">
            <span className="eyebrow">RUN THE ROOM</span>
            <h1>Start a live classroom.</h1>
            <p>
              Students join with one code. You see completion, current stage,
              help signals, and last activity without collecting accounts.
            </p>
          </div>
          <div className="day-picker">
            <span>CHOOSE TODAY</span>
            {interactiveDays.map((day) => (
              <button
                aria-pressed={selectedDay === day.day}
                className={selectedDay === day.day ? "is-selected" : ""}
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                type="button"
              >
                <strong>DAY {day.day}</strong>
                <span>{day.title}</span>
                <small>{day.stages.length} stages · 180 min</small>
              </button>
            ))}
          </div>
          <label className="instructor-pin-field">
            <span>INSTRUCTOR LAUNCH PIN</span>
            <input
              autoComplete="off"
              onChange={(event) => setLaunchPin(event.target.value)}
              placeholder="Enter the private instructor PIN"
              required
              type="password"
              value={launchPin}
            />
            <small>The PIN creates a classroom and is never saved here.</small>
          </label>
          {error ? <div className="dashboard-error">{error}</div> : null}
          <button
            className="launch-class-button"
            disabled={creating || !launchPin.trim()}
            onClick={createClassroom}
            type="button"
          >
            {creating ? "Creating classroom…" : `Start Day ${selectedDay} classroom →`}
          </button>
          <p className="dashboard-privacy-note">
            Ask students to use a seat code or short classroom name, never a
            student ID or private contact information. Classroom data expires
            after seven days.
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
            <span>DAY {plan?.day}</span>
            <strong>{plan?.title}</strong>
          </div>
        </div>
        <div className="dashboard-code">
          <span>JOIN CODE</span>
          <strong>{teacherSession.code}</strong>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(joinUrl);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1500);
            }}
            type="button"
          >
            {copied ? "Copied ✓" : "Copy join link"}
          </button>
        </div>
        <div className="dashboard-header-actions">
          <a href={joinUrl} rel="noreferrer" target="_blank">
            Student view ↗
          </a>
          <button
            onClick={() => {
              clearClassroomAccessToken("teacher", "/instructor/live/");
              setTeacherSession(null);
              setDashboard(null);
            }}
            type="button"
          >
            New class
          </button>
        </div>
      </header>

      {error ? <div className="dashboard-error dashboard-error-wide">{error}</div> : null}

      <section className="dashboard-summary">
        <article>
          <span>JOINED</span>
          <strong>{summary.total}</strong>
          <small>{summary.online} active now</small>
        </article>
        <article>
          <span>CURRENT STAGE DONE</span>
          <strong>
            {summary.doneCurrent}/{summary.total}
          </strong>
          <small>{currentStage?.title}</small>
        </article>
        <article className={summary.needsHelp ? "has-alert" : ""}>
          <span>NEED A CHECK</span>
          <strong>{summary.needsHelp}</strong>
          <small>yellow or red signals</small>
        </article>
        <article>
          <span>ROOM STATUS</span>
          <strong className="status-word">{dashboard?.session.status ?? "…"}</strong>
          <small>updates every 3 seconds</small>
        </article>
      </section>

      <section className="dashboard-control">
        <div className="current-stage-card">
          <div>
            <span className={`phase-chip phase-${currentStage?.phase.toLowerCase()}`}>
              {currentStage?.phase}
            </span>
            <small>
              STAGE {(dashboard?.session.currentStage ?? 0) + 1} / {plan?.stages.length}
            </small>
            <h1>{currentStage?.title}</h1>
            <p>{currentStage?.goal}</p>
          </div>
          {currentStage ? (
            <StageTimer key={currentStage.id} minutes={currentStage.minutes} />
          ) : null}
        </div>
        <div className="teacher-cues">
          <span>TEACHER CUE</span>
          <ul>
            {currentStage?.teacherCue.map((cue) => (
              <li key={cue}>{cue}</li>
            ))}
          </ul>
        </div>
        <div className="dashboard-control-buttons">
          <button
            disabled={(dashboard?.session.currentStage ?? 0) === 0}
            onClick={() =>
              void updateClassroom({
                currentStage: (dashboard?.session.currentStage ?? 0) - 1,
              })
            }
            type="button"
          >
            ← Previous
          </button>
          <button
            className="control-main"
            disabled={
              !plan ||
              (dashboard?.session.currentStage ?? 0) >= plan.stages.length - 1
            }
            onClick={() =>
              void updateClassroom({
                currentStage: (dashboard?.session.currentStage ?? 0) + 1,
                status: "open",
              })
            }
            type="button"
          >
            Advance everyone →
          </button>
          <button
            onClick={() =>
              void updateClassroom({
                status: dashboard?.session.status === "paused" ? "open" : "paused",
              })
            }
            type="button"
          >
            {dashboard?.session.status === "paused" ? "Resume class" : "Pause class"}
          </button>
          <button
            className="control-close"
            onClick={() =>
              void updateClassroom({
                status: dashboard?.session.status === "closed" ? "open" : "closed",
              })
            }
            type="button"
          >
            {dashboard?.session.status === "closed" ? "Reopen" : "Close class"}
          </button>
        </div>
      </section>

      <section className="dashboard-stage-strip" aria-label="Class timeline">
        {plan?.stages.map((stage, index) => {
          const active = index === dashboard?.session.currentStage;
          const count = Number(dashboard?.stageCounts[stage.id] ?? 0);
          return (
            <button
              className={active ? "is-active" : ""}
              key={stage.id}
              onClick={() => void updateClassroom({ currentStage: index })}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage.title}</strong>
              <small>
                {count}/{summary.total} done
              </small>
            </button>
          );
        })}
      </section>

      <section className="participant-section">
        <header>
          <div>
            <span className="eyebrow">ROOM PULSE</span>
            <h2>Who is moving, waiting, or blocked?</h2>
          </div>
          <div className="pulse-legend">
            <span className="legend-green">✓ moving</span>
            <span className="legend-yellow">? check</span>
            <span className="legend-red">! blocked</span>
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
                        ? "LIVE"
                        : relativeTime(participant.updatedAt, clock)}
                    </span>
                  </header>
                  <div className="participant-progress">
                    <span>DAY PROGRESS</span>
                    <strong>
                      {participant.completedCount}/{plan?.stages.length}
                    </strong>
                    <div>
                      <i
                        style={{
                          width: `${Math.round(
                            (participant.completedCount / (plan?.stages.length ?? 1)) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                  <footer>
                    <div>
                      <span>NOW</span>
                      <strong>{participantStage?.title ?? "Joining…"}</strong>
                    </div>
                    <div>
                      <span>ACTIVITIES</span>
                      <strong>
                        {participant.currentActivityCount}/
                        {participant.currentActivityTotal}
                      </strong>
                    </div>
                    <small>
                      {participant.lastActivityAt
                        ? `Last evidence ${relativeTime(
                            participant.lastActivityAt,
                            clock,
                          )} ago`
                        : "No activity evidence yet"}
                    </small>
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-room">
            <strong>Waiting for students.</strong>
            <span>
              Show code <b>{teacherSession.code}</b> or share the join link.
            </span>
          </div>
        )}
      </section>
    </main>
  );
}
