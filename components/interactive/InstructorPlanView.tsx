"use client";

import Link from "next/link";
import { useState } from "react";
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
import { useLanguage } from "@/lib/language";
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
  const [selected, setSelected] = useState(0);
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
          <strong>{interactiveText(language, plan.title)}</strong>
        </div>
        <div>
          <Link href={`/day/${plan.day}/present`} target="_blank">
            {uiText(language, "Projector slides ↗")}
          </Link>
          <Link className="start-live-link" href="/instructor/live">
            {uiText(language, "Start live class")}
          </Link>
          <LanguageToggle />
        </div>
      </header>

      {dayInfo ? (
        <PresentationController
          day={dayInfo}
          slides={courseware.stages.flatMap((item) => item.slides)}
        />
      ) : null}

      <section className="instructor-plan-intro">
        <div>
          <span className="eyebrow">
            {uiText(language, "180-minute run of show").toUpperCase()}
          </span>
          <h1>{interactiveText(language, plan.question)}</h1>
          <p>
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
              onClick={() => setSelected(index)}
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
            <section className="instructor-teaching-sequence">
              <header>
                <div>
                  <span>{uiText(language, "Teaching sequence").toUpperCase()}</span>
                  <strong>
                    {uiText(language, "{count} authored slides", {
                      count: coursewareStage.slides.length,
                    })}
                  </strong>
                </div>
                <Link href={`/day/${plan.day}/present`} target="_blank">
                  {uiText(language, "Open projector slides ↗")}
                </Link>
              </header>
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
            </section>
          ) : null}

          <div className="student-screen-preview">
            <span>{uiText(language, "Student screen").toUpperCase()}</span>
            <h3>{uiText(language, "What students see now")}</h3>
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
              onClick={() => setSelected((value) => Math.max(0, value - 1))}
              type="button"
            >
              ← {uiText(language, "Previous")}
            </button>
            <button
              disabled={selected === plan.stages.length - 1}
              onClick={() =>
                setSelected((value) => Math.min(plan.stages.length - 1, value + 1))
              }
              type="button"
            >
              {uiText(language, "Next step")} →
            </button>
          </footer>
        </section>
      </div>

      <section className="instructor-full-guide">
        <header>
          <span>{uiText(language, "Full instructor manuscript")}</span>
          <h2>{uiText(language, "Detailed teaching guide")}</h2>
          <p>
            {language === "ko"
              ? "강의 대본, 시연 순서, 예상 문제와 대응을 위에서 아래로 확인할 수 있습니다."
              : "The bilingual stage guide above is the English teaching view. The complete operational manuscript below is currently maintained in Korean."}
          </p>
        </header>
        {language === "ko" ? (
          <div lang="ko">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {guideMarkdown}
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
      </section>
    </main>
  );
}
