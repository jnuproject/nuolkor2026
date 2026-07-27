"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { StageLessonDeck } from "@/components/courseware/StageLessonDeck";
import type { DayCourseware } from "@/content/courseware";
import { interactiveDays, type InteractiveDayPlan } from "@/content/interactive";
import {
  activityRequiresEvidence,
  stageReportsProgress,
} from "@/content/interactive/types";
import { interactiveText } from "@/content/translations/interactive-ko";
import { getLocalizedReadings } from "@/content/translations/readings-ko";
import { uiText } from "@/content/translations/ui-ko";
import { clearClassroomAccessToken } from "@/lib/classroom-access";
import {
  ClassroomApiConfigurationError,
  classroomFetch,
} from "@/lib/classroom-api";
import { useLanguage } from "@/lib/language";
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
  courseware,
  classroomCode,
  classroomToken,
  readings = [],
}: {
  plan: InteractiveDayPlan;
  courseware: DayCourseware;
  classroomCode?: string;
  classroomToken?: string;
  readings?: LessonReading[];
}) {
  const language = useLanguage();
  const localizedReadings = useMemo(
    () => getLocalizedReadings(plan.day, language, readings),
    [language, plan.day, readings],
  );
  const storageKey = classroomCode
    ? `build-loop:class:${classroomCode.toUpperCase()}`
    : `build-loop:solo:day:${plan.day}`;
  const [activeStage, setActiveStage] = useState(0);
  const [activeReading, setActiveReading] = useState<number | null>(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [teacherStage, setTeacherStage] = useState(0);
  const [activityStates, setActivityStates] = useState<Record<string, ActivityState>>({});
  const [completedStages, setCompletedStages] = useState<Set<string>>(new Set());
  const [helpStatus, setHelpStatus] = useState<HelpStatus>("green");
  const [participantName, setParticipantName] = useState("");
  const [classStatus, setClassStatus] = useState<"open" | "paused" | "closed">("open");
  const [connection, setConnection] = useState<"solo" | "connecting" | "live" | "offline">(
    classroomCode ? "connecting" : "solo",
  );
  const [saveState, setSaveState] = useState<
    "saved" | "saving" | "error" | "rejected"
  >("saved");
  const [classroomError, setClassroomError] = useState("");
  const [progressError, setProgressError] = useState("");
  const teacherStageRef = useRef<number | null>(null);
  const hydratedRef = useRef(false);

  const stage = plan.stages[activeStage];
  const stageCourseware = courseware.stages.find(
    (item) => item.stageId === stage.id,
  );
  const visibleActivities = stage.activities.filter(
    (activity) =>
      activity.kind !== "timer" &&
      activity.kind !== "read" &&
      !activity.hidden &&
      stageCourseware?.role !== "break",
  );
  const requiredActivities = visibleActivities.filter(activityRequiresEvidence);
  const completedActivityCount = requiredActivities.filter(
    (activity) => activityStates[activity.id]?.completed,
  ).length;
  const stageReady =
    requiredActivities.length === 0 ||
    completedActivityCount === requiredActivities.length;
  const progressStages = plan.stages.filter(stageReportsProgress);
  const totalCompleted = progressStages.filter((item) =>
    completedStages.has(item.id),
  ).length;
  const overallPercent = Math.round(
    (totalCompleted / Math.max(1, progressStages.length)) * 100,
  );

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
      let rejected = false;
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
            const retryable =
              response.status === 408 ||
              response.status === 425 ||
              response.status === 429 ||
              response.status >= 500;
            const remaining = pending
              .slice(retryable ? index : index + 1)
              .slice(-100);
            if (remaining.length) {
              localStorage.setItem(pendingKey, JSON.stringify(remaining));
            } else {
              localStorage.removeItem(pendingKey);
            }
            if (retryable) {
              throw new Error("Progress is queued");
            }

            rejected = true;
            let message = "This progress update was not saved.";
            try {
              const payload = (await response.json()) as { error?: string };
              if (payload.error) message = payload.error;
            } catch {
              // The status still tells us this request must not be retried.
            }
            setProgressError(message);
            setSaveState("rejected");

            const failed = pending[index];
            if (
              failed.completed === true &&
              typeof failed.completedStageId === "string"
            ) {
              setCompletedStages((current) => {
                const next = new Set(current);
                next.delete(failed.completedStageId as string);
                return next;
              });
            }
          }
        }
        localStorage.removeItem(pendingKey);
        if (!rejected) {
          setProgressError("");
          setSaveState("saved");
        }
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
      if (saved) {
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
      }

      const query = new URLSearchParams(window.location.search);
      const requestedReading = Number(query.get("reading"));
      const requestedStage = Number(query.get("stage"));
      if (
        query.has("reading") &&
        Number.isInteger(requestedReading) &&
        requestedReading >= 0 &&
        requestedReading < localizedReadings.length
      ) {
        setActiveReading(requestedReading);
      } else if (
        query.has("stage") &&
        Number.isInteger(requestedStage) &&
        requestedStage >= 0 &&
        requestedStage < plan.stages.length
      ) {
        setActiveStage(requestedStage);
        setActiveReading(null);
      }
      hydratedRef.current = true;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [classroomCode, localizedReadings.length, plan.stages.length, storageKey]);

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
      const required = Boolean(activity && activityRequiresEvidence(activity));
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
    setMobileTocOpen(false);
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
      return uiText(language, "Self-paced").toUpperCase();
    }
    if (connection === "connecting") {
      return uiText(language, "Connecting").toUpperCase();
    }
    if (connection === "offline") {
      return uiText(language, "Reconnecting").toUpperCase();
    }
    return uiText(language, "Live · {code}", {
      code: classroomCode.toUpperCase(),
    }).toUpperCase();
  }, [classroomCode, connection, language]);

  return (
    <div className="book-page">
      <BookHeader
        crumb={
          <span className="book-crumb-top">
            {uiText(language, "Day {day}", { day: plan.day })} ·{" "}
            {interactiveText(language, plan.title)}
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
        <div className="classroom-banner is-closed">
          {uiText(language, classroomError)}
        </div>
      ) : progressError ? (
        <div className="classroom-banner">
          {uiText(language, progressError)}
        </div>
      ) : classStatus !== "open" ? (
        <div className={`classroom-banner is-${classStatus}`}>
          {classStatus === "paused"
            ? uiText(
                language,
                "The instructor paused the class. Keep this screen open.",
              )
            : uiText(
                language,
                "This class is closed. Your saved work remains on the dashboard.",
              )}
        </div>
      ) : null}

      <div
        className={`book-shell ${classStatus === "open" ? "" : "is-classroom-frozen"}`}
      >
        <aside
          aria-label={uiText(language, "Course contents")}
          className={`book-toc ${mobileTocOpen ? "is-mobile-open" : ""}`}
        >
          <button
            aria-expanded={mobileTocOpen}
            className="mobile-toc-toggle"
            onClick={() => setMobileTocOpen((current) => !current)}
            type="button"
          >
            <span>
              {uiText(language, "Day {day}", { day: plan.day })} ·{" "}
              {activeReading === null
                ? interactiveText(language, stage.title)
                : localizedReadings[activeReading]?.title}
            </span>
            <strong>
              {uiText(language, mobileTocOpen ? "Close menu" : "Course menu")}
            </strong>
          </button>
          <div className="book-toc-body">
            <p className="toc-title">{uiText(language, "Contents")}</p>
            <nav>
            {interactiveDays.map((other) =>
              other.day === plan.day ? (
                <section className="toc-open" key={other.day}>
                  <p className="toc-day is-active">
                    <span>{uiText(language, "Day {day}", { day: plan.day })}</span>{" "}
                    {interactiveText(language, plan.title)}
                  </p>
                  {localizedReadings.length > 0 ? (
                    <>
                      <p className="toc-group-label">
                        {uiText(language, "Background reading")}
                      </p>
                      <ul>
                        {localizedReadings.map((reading, index) => (
                          <li key={reading.id}>
                            <button
                              aria-current={
                                activeReading === index ? "page" : undefined
                              }
                              className={activeReading === index ? "is-active" : ""}
                              onClick={() => {
                                setActiveReading(index);
                                setMobileTocOpen(false);
                              }}
                              type="button"
                            >
                              <span>R{index + 1}</span>
                              <em>{reading.title}</em>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <p className="toc-group-label">
                        {uiText(language, "Live lesson")}
                      </p>
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
                              {done
                                ? "✓"
                                : String(index + 1).padStart(2, "0")}
                            </span>
                            <em>{interactiveText(language, item.title)}</em>
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
                    <span>
                      {uiText(language, "Day {day}", { day: other.day })}
                    </span>{" "}
                    {interactiveText(language, other.title)}
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
                {uiText(language, "{done} of {total} stages done", {
                  done: totalCompleted,
                  total: progressStages.length,
                })}
              </span>
            </div>
          </div>
        </aside>

        <main className="book-content">
          {activeReading !== null && localizedReadings[activeReading] ? (
            <>
              <nav
                aria-label={uiText(language, "Breadcrumb")}
                className="book-crumb"
              >
                {uiText(language, "Day {day} · Reading {current} of {total}", {
                  day: plan.day,
                  current: activeReading + 1,
                  total: localizedReadings.length,
                })}
              </nav>

              <div className="book-section-head">
                <h1>
                  R{activeReading + 1}{" "}
                  {localizedReadings[activeReading].title}
                </h1>
                <div className="book-section-meta">
                  <span className="book-section-time">
                    {uiText(language, "Reading · about {minutes} min", {
                      minutes: Math.max(
                      1,
                      Math.round(
                          localizedReadings[activeReading].body.split(/\s+/).length /
                            150,
                      ),
                      ),
                    })}
                  </span>
                </div>
              </div>

              <article className="book-read">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {localizedReadings[activeReading].body}
                </ReactMarkdown>
              </article>

              <nav
                aria-label={uiText(language, "Reading pagination")}
                className="book-pagenav"
              >
                <button
                  aria-label={uiText(language, "Previous reading")}
                  className="page-round"
                  disabled={activeReading === 0}
                  onClick={() => setActiveReading(activeReading - 1)}
                  type="button"
                >
                  ←
                </button>
                <span>
                  {uiText(language, "Reading {current} / {total}", {
                    current: activeReading + 1,
                    total: localizedReadings.length,
                  })}
                </span>
                <button
                  aria-label={uiText(language, "Next")}
                  className="page-round"
                  onClick={() => {
                    if (activeReading < localizedReadings.length - 1) {
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
          <nav
            aria-label={uiText(language, "Breadcrumb")}
            className="book-crumb"
          >
            {uiText(language, "Day {day} · Class activity {current} of {total}", {
              day: plan.day,
              current: activeStage + 1,
              total: plan.stages.length,
            })}
          </nav>

          <div className="book-section-head">
            <h1>{interactiveText(language, stage.title)}</h1>
            <div className="book-section-meta">
              <span className={`phase-chip phase-${stage.phase.toLowerCase()}`}>
                {interactiveText(language, stage.phase)}
              </span>
              <span className="book-section-time">
                {uiText(language, "{start}–{end} · {minutes} min", {
                  start: stage.start,
                  end: stage.end,
                  minutes: stage.minutes,
                })}
              </span>
              <StageTimer compact key={stage.id} minutes={stage.minutes} />
            </div>
          </div>

          {stageCourseware?.slides.length ? (
            <StageLessonDeck
              key={stage.id}
              role={stageCourseware.role}
              slides={stageCourseware.slides}
            />
          ) : (
            <>
              <p className="book-lede">{interactiveText(language, stage.goal)}</p>
              <ol className="book-brief">
                {stage.studentBrief.map((line) => (
                  <li key={line}>{interactiveText(language, line)}</li>
                ))}
              </ol>
            </>
          )}

          {visibleActivities.length ? (
            <section className="stage-practice">
              <header className="stage-practice-heading">
                <span>{uiText(language, "Try · leave evidence")}</span>
                <h2>{uiText(language, "Apply what you just learned")}</h2>
                <p>
                  {uiText(
                    language,
                    "Completion comes from a decision, test, or artifact—not from merely viewing the screen.",
                  )}
                </p>
              </header>
              <div className="activity-stack">
                {visibleActivities.map((activity, index) => (
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
            </section>
          ) : null}

          {stageReportsProgress(stage) ? (
            <section className={`book-finish ${stageReady ? "is-ready" : ""}`}>
              <p>
                <strong>{uiText(language, "Before you move on:")}</strong>{" "}
                {interactiveText(language, stage.completion)}
              </p>
              <div className="book-finish-row">
                <small>
                  {uiText(language, "{done} / {total} activities done", {
                    done: completedActivityCount,
                    total: requiredActivities.length,
                  })}
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
                    ? uiText(language, "Stage complete ✓")
                    : stageReady
                      ? uiText(language, "Complete this stage")
                      : uiText(language, "Finish every activity first")}
                </button>
              </div>
            </section>
          ) : null}

          <nav
            aria-label={uiText(language, "Stage pagination")}
            className="book-pagenav"
          >
            <button
              aria-label={uiText(language, "Previous stage")}
              className="page-round"
              disabled={activeStage === 0 && localizedReadings.length === 0}
              onClick={() => {
                if (activeStage === 0 && localizedReadings.length > 0) {
                  setActiveReading(localizedReadings.length - 1);
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
                ? uiText(language, "Saving…")
                : saveState === "error"
                  ? uiText(language, "Will retry when connected")
                  : saveState === "rejected"
                    ? uiText(language, "Not saved — review this activity")
                  : uiText(language, "{current} / {total} · saved", {
                      current: activeStage + 1,
                      total: plan.stages.length,
                    })}
            </span>
            <button
              aria-label={uiText(language, "Next stage")}
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

      <aside
        className={`book-status help-${helpStatus}`}
        aria-label={uiText(language, "Help signal")}
      >
        <strong>{uiText(language, helpLabels[helpStatus])}</strong>
        <div>
          {(["green", "yellow", "red"] as const).map((status) => (
            <button
              aria-label={uiText(language, helpLabels[status])}
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
