"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { interactiveDays, type InteractiveDayPlan } from "@/content/interactive";
import { clearClassroomAccessToken } from "@/lib/classroom-access";
import {
  ClassroomApiConfigurationError,
  classroomFetch,
} from "@/lib/classroom-api";
import { sitePath } from "@/lib/site-path";
import { BookHeader } from "../BookHeader";
import { ActivityCard, type ActivityState } from "./ActivityCard";
import { StageTimer } from "./StageTimer";

export type LessonReading = {
  id: string;
  title: string;
  body: string;
};

type HelpStatus = "green" | "yellow" | "red";

type ClassroomState = {
  session: {
    code: string;
    day: number;
    currentStage: number;
    status: "open" | "paused" | "closed";
  };
  participant: {
    id: string;
    displayName: string;
    helpStatus: HelpStatus;
    currentStage: number;
    completedStages: string[];
    activities: Record<
      string,
      { stageId: string; value: unknown; completed: boolean }
    >;
  };
};

type PersistedLessonState = {
  activeStage: number;
  helpStatus: HelpStatus;
  completedStages: string[];
  activities: Record<string, ActivityState>;
};

const helpLabels = {
  green: "I can continue",
  yellow: "Please check me",
  red: "I cannot continue",
} as const;

export function LessonRunner({
  plan,
  classroomCode,
  classroomToken,
  readings = [],
}: {
  plan: InteractiveDayPlan;
  classroomCode?: string;
  classroomToken?: string;
  readings?: LessonReading[];
}) {
  const storageKey = classroomCode
    ? `build-loop:class:${classroomCode.toUpperCase()}`
    : `build-loop:solo:day:${plan.day}`;
  const [activeStage, setActiveStage] = useState(0);
  const [activeReading, setActiveReading] = useState<number | null>(
    readings.length > 0 && !classroomCode ? 0 : null,
  );
  const [teacherStage, setTeacherStage] = useState(0);
  const [activityStates, setActivityStates] = useState<Record<string, ActivityState>>({});
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set());
  const [helpStatus, setHelpStatus] = useState<HelpStatus>("green");
  const [participantName, setParticipantName] = useState("");
  const [classStatus, setClassStatus] = useState<"open" | "paused" | "closed">("open");
  const [connection, setConnection] = useState<"solo" | "connecting" | "live" | "offline">(
    classroomCode ? "connecting" : "solo",
  );
  const [saveState, setSaveState] = useState<"saved" | "saving" | "error">("saved");
  const [classroomError, setClassroomError] = useState("");
  const teacherStageRef = useRef<number | null>(null);
  const hydratedRef = useRef(false);

  const stage = plan.stages[activeStage];
  const requiredActivities = stage.activities.filter(
    (activity) => !activity.optional && activity.kind !== "timer",
  );
  const completedActivityCount = requiredActivities.filter(
    (activity) => activityStates[activity.id]?.completed,
  ).length;
  const stageReady =
    requiredActivities.length === 0 ||
    completedActivityCount === requiredActivities.length;
  const totalCompleted = completedStages.size;
  const overallPercent = Math.round((totalCompleted / plan.stages.length) * 100);

  const saveSolo = useCallback(
    (next: PersistedLessonState) => {
      localStorage.setItem(storageKey, JSON.stringify(next));
    },
    [storageKey],
  );

  const syncProgressQueue = useCallback(
    async (body?: Record<string, unknown>) => {
      if (!classroomCode) {
        return;
      }
      const token = classroomToken;
      if (!token) {
        window.location.assign(
          sitePath(`/join/?code=${encodeURIComponent(classroomCode)}`),
        );
        return;
      }
      const pendingKey = `${storageKey}:pending-progress`;
      let pending: Record<string, unknown>[] = [];
      try {
        const saved = localStorage.getItem(pendingKey);
        pending = saved ? (JSON.parse(saved) as Record<string, unknown>[]) : [];
      } catch {
        localStorage.removeItem(pendingKey);
      }
      if (body) pending.push(body);
      if (!pending.length) return;

      localStorage.setItem(pendingKey, JSON.stringify(pending.slice(-100)));
      setSaveState("saving");
      try {
        for (let index = 0; index < pending.length; index += 1) {
          const response = await classroomFetch(
            `${encodeURIComponent(classroomCode)}/progress`,
            {
              body: JSON.stringify(pending[index]),
              headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
              },
              method: "POST",
            },
          );
          if (!response.ok) {
            localStorage.setItem(
              pendingKey,
              JSON.stringify(pending.slice(index).slice(-100)),
            );
            throw new Error("Save failed");
          }
        }
        localStorage.removeItem(pendingKey);
        setSaveState("saved");
      } catch {
        setSaveState("error");
        throw new Error("Progress is queued");
      }
    },
    [classroomCode, classroomToken, storageKey],
  );

  const postClassProgress = useCallback(
    async (body: Record<string, unknown>) => {
      try {
        await syncProgressQueue(body);
      } catch {
        setConnection("offline");
      }
    },
    [syncProgressQueue],
  );

  useEffect(() => {
    if (classroomCode) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        hydratedRef.current = true;
        return;
      }
      try {
        const parsed = JSON.parse(saved) as PersistedLessonState;
        setActiveStage(
          Math.max(0, Math.min(plan.stages.length - 1, parsed.activeStage ?? 0)),
        );
        setHelpStatus(parsed.helpStatus ?? "green");
        setCompletedStages(new Set(parsed.completedStages ?? []));
        setActivityStates(parsed.activities ?? {});
        setActiveReading(null);
      } catch {
        localStorage.removeItem(storageKey);
      }
      hydratedRef.current = true;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [classroomCode, plan.stages.length, storageKey]);

  useEffect(() => {
    if (!classroomCode) {
      return;
    }

    let cancelled = false;
    let interval = 0;

    async function loadClassroom() {
      const token = classroomToken;
      if (!token) {
        window.location.assign(
          sitePath(`/join/?code=${encodeURIComponent(classroomCode ?? "")}`),
        );
        return;
      }

      try {
        try {
          await syncProgressQueue();
        } catch {
          // Keep loading the latest classroom state. Queued work will retry.
        }
        const response = await classroomFetch(
          `${encodeURIComponent(classroomCode ?? "")}/student`,
          {
            headers: { authorization: `Bearer ${token}` },
            cache: "no-store",
          },
        );
        if (response.status === 401 || response.status === 404) {
          clearClassroomAccessToken(
            "participant",
            `/join/?code=${encodeURIComponent(classroomCode ?? "")}`,
          );
          window.location.assign(
            sitePath(`/join/?code=${encodeURIComponent(classroomCode ?? "")}`),
          );
          return;
        }
        if (!response.ok) {
          throw new Error("Connection failed");
        }
        const data = (await response.json()) as ClassroomState;
        if (cancelled) {
          return;
        }
        setParticipantName(data.participant.displayName);
        setHelpStatus(data.participant.helpStatus);
        setClassStatus(data.session.status);
        setTeacherStage(data.session.currentStage);
        setCompletedStages(new Set(data.participant.completedStages));
        setConnection("live");
        setClassroomError("");

        if (!hydratedRef.current) {
          setActivityStates(
            Object.fromEntries(
              Object.entries(data.participant.activities).map(([id, activity]) => [
                id,
                { value: activity.value, completed: activity.completed },
              ]),
            ),
          );
          hydratedRef.current = true;
        }

        if (teacherStageRef.current !== data.session.currentStage) {
          teacherStageRef.current = data.session.currentStage;
          setActiveStage(data.session.currentStage);
          setActiveReading(null);
          void postClassProgress({
            currentStage: data.session.currentStage,
            helpStatus: data.participant.helpStatus,
          });
        }
      } catch (loadError) {
        if (!cancelled) {
          setConnection("offline");
          if (loadError instanceof ClassroomApiConfigurationError) {
            setClassroomError(loadError.message);
          }
        }
      }
    }

    void loadClassroom();
    interval = window.setInterval(() => void loadClassroom(), 4000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [
    classroomCode,
    classroomToken,
    postClassProgress,
    storageKey,
    syncProgressQueue,
  ]);

  const updateActivity = useCallback(
    (
      activityId: string,
      stageId: string,
      value: unknown,
      completed: boolean,
      persist = true,
    ) => {
      const activity = plan.stages
        .flatMap((item) => item.activities)
        .find((item) => item.id === activityId);
      const required = Boolean(activity && !activity.optional && activity.kind !== "timer");
      const shouldReopenStage =
        required && !completed && completedStages.has(stageId);
      const nextCompletedStages = new Set(completedStages);
      if (shouldReopenStage) {
        nextCompletedStages.delete(stageId);
        setCompletedStages(nextCompletedStages);
      }

      setActivityStates((current) => {
        const next = { ...current, [activityId]: { value, completed } };
        if (!classroomCode && persist) {
          saveSolo({
            activeStage,
            activities: next,
            completedStages: [...nextCompletedStages],
            helpStatus,
          });
        }
        return next;
      });

      if (classroomCode && persist) {
        void postClassProgress({
          activities: [{ activityId, stageId, value, completed }],
          ...(shouldReopenStage
            ? { completedStageId: stageId, completed: false }
            : {}),
          currentStage: activeStage,
          helpStatus,
        });
      }
    },
    [
      activeStage,
      classroomCode,
      completedStages,
      helpStatus,
      postClassProgress,
      plan.stages,
      saveSolo,
    ],
  );

  function chooseHelp(next: HelpStatus) {
    setHelpStatus(next);
    if (classroomCode) {
      void postClassProgress({ currentStage: activeStage, helpStatus: next });
    } else {
      saveSolo({
        activeStage,
        activities: activityStates,
        completedStages: [...completedStages],
        helpStatus: next,
      });
    }
  }

  function goToStage(nextIndex: number) {
    const max = classroomCode ? teacherStage : plan.stages.length - 1;
    const bounded = Math.max(0, Math.min(max, nextIndex));
    setActiveReading(null);
    setActiveStage(bounded);
    if (classroomCode) {
      void postClassProgress({ currentStage: bounded, helpStatus });
    } else {
      saveSolo({
        activeStage: bounded,
        activities: activityStates,
        completedStages: [...completedStages],
        helpStatus,
      });
    }
  }

  function markStageComplete() {
    if (!stageReady) {
      return;
    }
    const next = new Set(completedStages);
    next.add(stage.id);
    setCompletedStages(next);
    if (classroomCode) {
      void postClassProgress({
        completed: true,
        completedStageId: stage.id,
        currentStage: activeStage,
        helpStatus,
      });
    } else {
      const nextIndex = Math.min(plan.stages.length - 1, activeStage + 1);
      saveSolo({
        activeStage: nextIndex,
        activities: activityStates,
        completedStages: [...next],
        helpStatus,
      });
      if (activeStage < plan.stages.length - 1) {
        setActiveStage(nextIndex);
      }
    }
  }

  const connectionLabel = useMemo(() => {
    if (!classroomCode) {
      return "SELF-PACED";
    }
    if (connection === "connecting") {
      return "CONNECTING";
    }
    if (connection === "offline") {
      return "RECONNECTING";
    }
    return `LIVE · ${classroomCode.toUpperCase()}`;
  }, [classroomCode, connection]);

  return (
    <div className="book-page">
      <BookHeader
        crumb={
          <span className="book-crumb-top">
            Day {plan.day} · {plan.title}
          </span>
        }
        right={
          <div className={`runner-connection connection-${connection}`}>
            <i />
            <span>{connectionLabel}</span>
            {participantName ? <strong>{participantName}</strong> : null}
          </div>
        }
      />

      {classroomError ? (
        <div className="classroom-banner is-closed">{classroomError}</div>
      ) : classStatus !== "open" ? (
        <div className={`classroom-banner is-${classStatus}`}>
          {classStatus === "paused"
            ? "The instructor paused the class. Keep this screen open."
            : "This class is closed. Your saved work remains on the dashboard."}
        </div>
      ) : null}

      <div
        className={`book-shell ${classStatus === "open" ? "" : "is-classroom-frozen"}`}
      >
        <aside aria-label="Course contents" className="book-toc">
          <p className="toc-title">Contents</p>
          <nav>
            {interactiveDays.map((other) =>
              other.day === plan.day ? (
                <section className="toc-open" key={other.day}>
                  <p className="toc-day is-active">
                    <span>Day {plan.day}</span> {plan.title}
                  </p>
                  {readings.length > 0 ? (
                    <>
                      <p className="toc-group-label">Reading</p>
                      <ul>
                        {readings.map((reading, index) => (
                          <li key={reading.id}>
                            <button
                              aria-current={
                                activeReading === index ? "page" : undefined
                              }
                              className={activeReading === index ? "is-active" : ""}
                              onClick={() => setActiveReading(index)}
                              type="button"
                            >
                              <span>
                                {plan.day}.{index + 1}
                              </span>
                              <em>{reading.title}</em>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <p className="toc-group-label">In class</p>
                    </>
                  ) : null}
                  <ul>
                    {plan.stages.map((item, index) => {
                      const done = completedStages.has(item.id);
                      const locked = Boolean(classroomCode && index > teacherStage);
                      return (
                        <li key={item.id}>
                          <button
                            aria-current={
                              activeReading === null && index === activeStage
                                ? "step"
                                : undefined
                            }
                            className={[
                              activeReading === null && index === activeStage
                                ? "is-active"
                                : "",
                              done ? "is-done" : "",
                              locked ? "is-locked" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            disabled={locked}
                            onClick={() => goToStage(index)}
                            type="button"
                          >
                            <span>
                              {done ? "✓" : `${plan.day}.${readings.length + index + 1}`}
                            </span>
                            <em>{item.title}</em>
                            <small>{item.start}</small>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : (
                <p className="toc-day" key={other.day}>
                  <Link href={`/day/${other.day}`}>
                    <span>Day {other.day}</span> {other.title}
                  </Link>
                </p>
              ),
            )}
          </nav>
          <div className="toc-progress">
            <div>
              <i style={{ width: `${overallPercent}%` }} />
            </div>
            <span>
              {totalCompleted} of {plan.stages.length} stages done
            </span>
          </div>
        </aside>

        <main className="book-content">
          {activeReading !== null && readings[activeReading] ? (
            <>
              <nav aria-label="Breadcrumb" className="book-crumb">
                Day {plan.day} · Reading {activeReading + 1} of {readings.length}
              </nav>

              <div className="book-section-head">
                <h1>
                  {plan.day}.{activeReading + 1} {readings[activeReading].title}
                </h1>
                <div className="book-section-meta">
                  <span className="book-section-time">
                    Reading · about{" "}
                    {Math.max(
                      1,
                      Math.round(
                        readings[activeReading].body.split(/\s+/).length / 150,
                      ),
                    )}{" "}
                    min
                  </span>
                </div>
              </div>

              <article className="book-read">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readings[activeReading].body}
                </ReactMarkdown>
              </article>

              <nav aria-label="Reading pagination" className="book-pagenav">
                <button
                  aria-label="Previous reading"
                  className="page-round"
                  disabled={activeReading === 0}
                  onClick={() => setActiveReading(activeReading - 1)}
                  type="button"
                >
                  ←
                </button>
                <span>
                  Reading {activeReading + 1} / {readings.length}
                </span>
                <button
                  aria-label="Next"
                  className="page-round"
                  onClick={() => {
                    if (activeReading < readings.length - 1) {
                      setActiveReading(activeReading + 1);
                    } else {
                      setActiveReading(null);
                    }
                  }}
                  type="button"
                >
                  →
                </button>
              </nav>
            </>
          ) : (
            <>
          <nav aria-label="Breadcrumb" className="book-crumb">
            Day {plan.day} · Stage {activeStage + 1} of {plan.stages.length}
          </nav>

          <div className="book-section-head">
            <h1>
              {plan.day}.{readings.length + activeStage + 1} {stage.title}
            </h1>
            <div className="book-section-meta">
              <span className={`phase-chip phase-${stage.phase.toLowerCase()}`}>
                {stage.phase}
              </span>
              <span className="book-section-time">
                {stage.start}–{stage.end} · {stage.minutes} min
              </span>
              <StageTimer compact key={stage.id} minutes={stage.minutes} />
            </div>
          </div>

          <p className="book-lede">{stage.goal}</p>

          <ol className="book-brief">
            {stage.studentBrief.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>

          <div className="activity-stack">
            {stage.activities.map((activity, index) => (
              <ActivityCard
                activity={activity}
                key={activity.id}
                number={index + 1}
                onUpdate={(value, completed, persist) =>
                  updateActivity(activity.id, stage.id, value, completed, persist)
                }
                state={activityStates[activity.id]}
              />
            ))}
          </div>

          <section className={`book-finish ${stageReady ? "is-ready" : ""}`}>
            <p>
              <strong>Before you move on:</strong> {stage.completion}
            </p>
            <div className="book-finish-row">
              <small>
                {completedActivityCount} / {requiredActivities.length} activities done
              </small>
              <button
                disabled={
                  !stageReady ||
                  completedStages.has(stage.id) ||
                  classStatus !== "open"
                }
                onClick={markStageComplete}
                type="button"
              >
                {completedStages.has(stage.id)
                  ? "Stage complete ✓"
                  : stageReady
                    ? "Complete this stage"
                    : "Finish every activity first"}
              </button>
            </div>
          </section>

          <nav aria-label="Stage pagination" className="book-pagenav">
            <button
              aria-label="Previous stage"
              className="page-round"
              disabled={activeStage === 0 && readings.length === 0}
              onClick={() => {
                if (activeStage === 0 && readings.length > 0) {
                  setActiveReading(readings.length - 1);
                } else {
                  goToStage(activeStage - 1);
                }
              }}
              type="button"
            >
              ←
            </button>
            <span>
              {saveState === "saving"
                ? "Saving…"
                : saveState === "error"
                  ? "Will retry when connected"
                  : `${activeStage + 1} / ${plan.stages.length} · saved`}
            </span>
            <button
              aria-label="Next stage"
              className="page-round"
              disabled={
                activeStage === plan.stages.length - 1 ||
                Boolean(classroomCode && activeStage >= teacherStage)
              }
              onClick={() => goToStage(activeStage + 1)}
              type="button"
            >
              →
            </button>
          </nav>
            </>
          )}
        </main>
      </div>

      <aside className={`book-status help-${helpStatus}`} aria-label="Help signal">
        <strong>{helpLabels[helpStatus]}</strong>
        <div>
          {(["green", "yellow", "red"] as const).map((status) => (
            <button
              aria-pressed={helpStatus === status}
              className={helpStatus === status ? "is-active" : ""}
              key={status}
              onClick={() => chooseHelp(status)}
              type="button"
            >
              {status === "green" ? "✓" : status === "yellow" ? "?" : "!"}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
