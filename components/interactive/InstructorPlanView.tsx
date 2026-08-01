"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDayInfo } from "@/content/course";
import type { DayCourseware } from "@/content/courseware";
import type { InteractiveDayPlan } from "@/content/interactive";
import {
  interactiveText,
  teacherCueText,
} from "@/content/translations/interactive-ko";
import { uiText } from "@/content/translations/ui-ko";
import { localized, useLanguage } from "@/lib/language";
import { usePresentationState } from "@/lib/use-presentation-state";
import { LanguageToggle } from "../LanguageToggle";
import { PresentationController } from "./PresentationController";

export function InstructorPlanView({
  plan,
  courseware,
  guideMarkdown,
}: {
  plan: InteractiveDayPlan;
  courseware: DayCourseware;
  guideMarkdown: string;
}) {
  const language = useLanguage();
  const dayInfo = getDayInfo(plan.day);
  const slides = courseware.stages.flatMap((item) => item.slides);
  const [presentationState, updatePresentation] = usePresentationState(
    plan.day,
    slides.length,
  );
  const activeSlide = slides[presentationState.index];
  const activeStageIndex = plan.stages.findIndex(
    (item) => item.id === activeSlide?.stageId,
  );
  const selected = activeStageIndex >= 0 ? activeStageIndex : 0;
  const stage = plan.stages[selected];
  const coursewareStage = courseware.stages.find(
    (item) => item.stageId === stage.id,
  );
  const evidenceActivities = stage.activities.filter(
    (activity) =>
      activity.kind !== "read" &&
      activity.kind !== "timer" &&
      !activity.hidden,
  );
  const guideBody = guideMarkdown.replace(/^#\s+.+(?:\r?\n|$)/, "").trim();
  const selectStage = (index: number) => {
    const nextStage = plan.stages[index];
    const nextSlideIndex = slides.findIndex(
      (slide) => slide.stageId === nextStage.id,
    );

    if (nextSlideIndex >= 0) {
      updatePresentation({
        index: nextSlideIndex,
        revealed: false,
      });
    }
  };

  return (
    <main className="instructor-plan">
      <header className="instructor-plan-header">
        <Link className="runner-brand" href="/">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </Link>
        <div>
          <span>
            {uiText(language, "Day {day} · Instructor plan", {
              day: plan.day,
            }).toUpperCase()}
          </span>
        </div>
        <div>
          <Link className="class-status-link" href="/instructor/live">
            {uiText(language, "Learner status")}
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <section className="instructor-plan-intro">
        <div>
          <span className="eyebrow">
            {uiText(language, "Day {day} · 180-minute run of show", {
              day: plan.day,
            }).toUpperCase()}
          </span>
          <h1>{interactiveText(language, plan.title)}</h1>
          <p className="instructor-plan-question">
            {interactiveText(language, plan.question)}
          </p>
          <p className="instructor-plan-direction">
            {uiText(
              language,
              "Proceed one stage at a time. Check the completion criteria for student activities before moving on.",
            )}
          </p>
        </div>
        <div>
          <span>{uiText(language, "Today's artifact").toUpperCase()}</span>
          <strong>{interactiveText(language, plan.artifact)}</strong>
        </div>
      </section>

      {dayInfo ? (
        <PresentationController
          day={dayInfo}
          slides={slides}
          state={presentationState}
          update={updatePresentation}
        />
      ) : null}

      <div className="instructor-plan-layout">
        <nav
          className="instructor-stage-list"
          aria-label={uiText(language, "Lesson timeline")}
        >
          {plan.stages.map((item, index) => (
            <button
              aria-current={selected === index ? "step" : undefined}
              className={selected === index ? "is-active" : ""}
              key={item.id}
              onClick={() => selectStage(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>
                  {item.start}–{item.end} ·{" "}
                  {uiText(language, "{minutes} min", {
                    minutes: item.minutes,
                  })}
                </small>
                <strong>{interactiveText(language, item.title)}</strong>
              </div>
              <i>{interactiveText(language, item.phase)}</i>
            </button>
          ))}
        </nav>

        <section className="instructor-stage-detail">
          <header>
            <div>
              <span className={`phase-chip phase-${stage.phase.toLowerCase()}`}>
                {interactiveText(language, stage.phase)}
              </span>
              <small>
                {uiText(language, "Stage {current} · {minutes} min", {
                  current: selected + 1,
                  minutes: stage.minutes,
                }).toUpperCase()}
              </small>
            </div>
            <h2>{interactiveText(language, stage.title)}</h2>
            <p>{interactiveText(language, stage.goal)}</p>
          </header>

          <div className="instructor-cue-panel">
            <span>{uiText(language, "Instructor cue")}</span>
            <ol>
              {stage.teacherCue.map((cue, index) => (
                <li key={`${stage.id}-cue-${index}`}>
                  {teacherCueText(language, cue)}
                </li>
              ))}
            </ol>
          </div>

          {coursewareStage?.slides.length ? (
            <details className="instructor-teaching-sequence">
              <summary>
                <div>
                  <span>{uiText(language, "Teaching sequence").toUpperCase()}</span>
                  <strong>
                    {uiText(language, "{count} authored slides", {
                      count: coursewareStage.slides.length,
                    })}
                  </strong>
                </div>
                <i aria-hidden="true">+</i>
              </summary>
              <ol>
                {coursewareStage.slides.map((slide, index) => (
                  <li key={slide.id}>
                    <div>
                      <i>{String(index + 1).padStart(2, "0")}</i>
                      <div>
                        <small>{slide.kicker[language]}</small>
                        <strong>{slide.title[language]}</strong>
                      </div>
                      <em>
                        {uiText(language, "{minutes} min", {
                          minutes: slide.minutes,
                        })}
                      </em>
                    </div>
                    <ul>
                      {slide.teacherNotes.map((note, noteIndex) => (
                        <li key={`${slide.id}-note-${noteIndex}`}>
                          {note[language]}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </details>
          ) : null}

          <div className="student-screen-preview">
            <span>
              {localized(language, "Stage guidance", "단계 안내").toUpperCase()}
            </span>
            <h3>
              {localized(
                language,
                "What to tell students in this stage",
                "이 단계에서 학생에게 안내할 내용",
              )}
            </h3>
            <ol>
              {stage.studentBrief.map((line, index) => (
                <li key={`${stage.id}-brief-${index}`}>
                  {interactiveText(language, line)}
                </li>
              ))}
            </ol>
          </div>

          {evidenceActivities.length ? (
            <div className="instructor-activity-preview">
              <span>{uiText(language, "Evidence activities").toUpperCase()}</span>
              {evidenceActivities.map((activity, index) => (
                <article key={activity.id}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <div>
                    <small>
                      {uiText(language, activity.kind.replace("-", " "))}
                    </small>
                    <strong>{interactiveText(language, activity.title)}</strong>
                    <p>{interactiveText(language, activity.instruction)}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          <div className="instructor-completion">
            <span>{uiText(language, "Criteria for moving to the next stage")}</span>
            <strong>{interactiveText(language, stage.completion)}</strong>
          </div>

          <footer>
            <button
              disabled={selected === 0}
              onClick={() => selectStage(Math.max(0, selected - 1))}
              type="button"
            >
              ← {uiText(language, "Previous")}
            </button>
            <button
              disabled={selected === plan.stages.length - 1}
              onClick={() =>
                selectStage(Math.min(plan.stages.length - 1, selected + 1))
              }
              type="button"
            >
              {uiText(language, "Next step")} →
            </button>
          </footer>
        </section>
      </div>

      <details className="instructor-full-guide">
        <summary>
          <div>
            <span>{uiText(language, "Full instructor manuscript")}</span>
            <h2>{uiText(language, "Detailed teaching guide")}</h2>
            <p>
              {language === "ko"
                ? "강의 대본, 시연 순서, 예상 문제와 대응이 필요할 때 펼쳐 보세요."
                : "Open this only when you need the complete script, demonstration order, and troubleshooting notes."}
            </p>
          </div>
          <strong>
            <span className="guide-open-label">
              {uiText(language, "Open guide")}
            </span>
            <span className="guide-close-label">
              {uiText(language, "Close guide")}
            </span>
          </strong>
        </summary>
        {language === "ko" ? (
          <div lang="ko">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {guideBody}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="instructor-guide-language-note">
            <p>
              Use the stage timeline above for the complete English teaching
              sequence, student instructions, evidence activities, and
              completion criteria.
            </p>
          </div>
        )}
      </details>
    </main>
  );
}
