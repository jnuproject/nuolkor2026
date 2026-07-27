"use client";

import Link from "next/link";
import { useState } from "react";
import type { InteractiveDayPlan } from "@/content/interactive";

export function InstructorPlanView({ plan }: { plan: InteractiveDayPlan }) {
  const [selected, setSelected] = useState(0);
  const stage = plan.stages[selected];

  return (
    <main className="instructor-plan">
      <header className="instructor-plan-header">
        <Link className="runner-brand" href="/">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </Link>
        <div>
          <span>DAY {plan.day} · INSTRUCTOR PLAN</span>
          <strong>{plan.title}</strong>
        </div>
        <div>
          <Link href={`/day/${plan.day}/present`} target="_blank">
            Present ↗
          </Link>
          <Link className="start-live-link" href="/instructor/live">
            Start live class
          </Link>
        </div>
      </header>

      <section className="instructor-plan-intro">
        <div>
          <span className="eyebrow">180-MINUTE RUN OF SHOW</span>
          <h1>{plan.question}</h1>
          <p>
            한 번에 한 단계만 진행합니다. 학생 활동의 완료 기준을 확인한 뒤
            다음 단계로 이동하세요.
          </p>
        </div>
        <div>
          <span>TODAY&apos;S ARTIFACT</span>
          <strong>{plan.artifact}</strong>
        </div>
      </section>

      <div className="instructor-plan-layout">
        <nav className="instructor-stage-list" aria-label="Lesson timeline">
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
                  {item.start}–{item.end} · {item.minutes}분
                </small>
                <strong>{item.title}</strong>
              </div>
              <i>{item.phase}</i>
            </button>
          ))}
        </nav>

        <section className="instructor-stage-detail">
          <header>
            <div>
              <span className={`phase-chip phase-${stage.phase.toLowerCase()}`}>
                {stage.phase}
              </span>
              <small>
                STAGE {selected + 1} · {stage.minutes} MIN
              </small>
            </div>
            <h2>{stage.title}</h2>
            <p>{stage.goal}</p>
          </header>

          <div className="instructor-cue-panel">
            <span>강사 진행 큐</span>
            <ol>
              {stage.teacherCue.map((cue) => (
                <li key={cue}>{cue}</li>
              ))}
            </ol>
          </div>

          <div className="student-screen-preview">
            <span>STUDENT SCREEN</span>
            <h3>What students see now</h3>
            <ol>
              {stage.studentBrief.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </div>

          <div className="instructor-activity-preview">
            <span>INTERACTIVE ACTIVITIES</span>
            {stage.activities.map((activity, index) => (
              <article key={activity.id}>
                <i>{String(index + 1).padStart(2, "0")}</i>
                <div>
                  <small>{activity.kind}</small>
                  <strong>{activity.title}</strong>
                  <p>{activity.instruction}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="instructor-completion">
            <span>다음 단계로 넘어가는 기준</span>
            <strong>{stage.completion}</strong>
          </div>

          <footer>
            <button
              disabled={selected === 0}
              onClick={() => setSelected((value) => Math.max(0, value - 1))}
              type="button"
            >
              ← 이전
            </button>
            <button
              disabled={selected === plan.stages.length - 1}
              onClick={() =>
                setSelected((value) => Math.min(plan.stages.length - 1, value + 1))
              }
              type="button"
            >
              다음 단계 →
            </button>
          </footer>
        </section>
      </div>
    </main>
  );
}
