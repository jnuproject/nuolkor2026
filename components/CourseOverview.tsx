import Link from "next/link";
import { interactiveDays } from "@/content/interactive";
import type { LocalizedText } from "@/content/interactive/types";
import { getOverviewKorean } from "@/content/overview-ko";
import { getReadings } from "@/lib/readings";
import { BilingualText } from "./BilingualText";
import { BookHeader } from "./BookHeader";

function Copy({ children }: { children: LocalizedText }) {
  if (typeof children === "string") {
    return <BilingualText en={children} ko={getOverviewKorean(children)} />;
  }
  return <BilingualText en={children.en} ko={children.ko} />;
}

export function CourseOverview() {
  return (
    <>
      <BookHeader showLanguageToggle />
      <div className="book-shell">
        <aside
          aria-label="Course contents / 강의 목차"
          className="book-toc overview-toc"
        >
          <p className="toc-title">
            <Copy>Vibe Coding Bootcamp</Copy>
          </p>
          <nav>
            {interactiveDays.map((plan) => {
              const readings = getReadings(plan.day);
              return (
                <details key={plan.day} open={plan.day === 1}>
                  <summary>
                    <span className="toc-day-label">
                      <BilingualText
                        en={`Day ${plan.day}`}
                        ko={`${plan.day}일차`}
                      />
                    </span>{" "}
                    <Copy>{plan.title}</Copy>
                  </summary>
                      <p className="toc-group-label">
                        <BilingualText en="Lesson and workbook" ko="교재와 워크북" />
                      </p>
                  <ul>
                    {readings.map((reading, index) => (
                      <li key={reading.id}>
                        <Link href={`/day/${plan.day}?reading=${index}`}>
                          R{index + 1}{" "}
                          <BilingualText
                            en={reading.title}
                            ko={
                              reading.translations?.ko.title ??
                              getOverviewKorean(reading.title)
                            }
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                      <p className="toc-group-label">
                        <BilingualText en="Class timeline" ko="수업 시간표" />
                  </p>
                  <ul>
                    {plan.stages.map((stage, index) => (
                      <li key={stage.id}>
                        <Link href={`/day/${plan.day}?stage=${index}`}>
                          {String(index + 1).padStart(2, "0")}{" "}
                          <Copy>{stage.title}</Copy>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </nav>
          <footer className="toc-footer">
            <BilingualText
              en="National University of Laos"
              ko="라오스국립대학교"
            />
            <br />
            <BilingualText en="6 days · 18 hours" ko="6일 · 18시간" />
          </footer>
        </aside>

        <main className="book-main">
          <nav aria-label="Breadcrumb / 현재 위치" className="book-crumb">
            <BilingualText en="Build Loop" ko="빌드 루프" />
          </nav>
          <h1 className="book-title">
            <Copy>Vibe Coding Bootcamp</Copy>
          </h1>

          <section className="book-page-intro">
            <p>
              <BilingualText
                en="From an idea to a working prototype, in six days."
                ko="아이디어에서 작동하는 프로토타입까지, 6일 동안 완성합니다."
              />
            </p>
            <div>
              <span>
                <BilingualText
                  en="National University of Laos"
                  ko="라오스국립대학교"
                />
              </span>
              <span>
                <BilingualText en="6 days · 18 hours" ko="6일 · 18시간" />
              </span>
            </div>
          </section>

          <div className="book-start">
            <Link className="book-start-primary" href="/start">
              <BilingualText en="Set up for Day 1 →" ko="1일차 시작 설정 →" />
            </Link>
            <Link className="book-start-ghost" href="/join">
              <BilingualText
                en="I have a class code"
                ko="수업 코드로 참여하기"
              />
            </Link>
          </div>

          <section className="course-material-map">
            <article>
              <span>01 · LEARN</span>
              <h2>
                <BilingualText en="Lecture" ko="강의" />
              </h2>
              <p>
                <BilingualText
                  en="Concepts, worked examples, counterexamples, live demonstrations, and retrieval questions."
                  ko="개념, 완성 사례, 반례, 라이브 시연, 회수 질문을 다룹니다."
                />
              </p>
            </article>
            <article>
              <span>02 · BUILD</span>
              <h2>
                <BilingualText en="Practice" ko="실습" />
              </h2>
              <p>
                <BilingualText
                  en="Learners make decisions, build, test, and leave observable evidence."
                  ko="학생이 결정하고, 만들고, 시험하여 관찰 가능한 증거를 남깁니다."
                />
              </p>
            </article>
            <article>
              <span>03 · RUN</span>
              <h2>
                <BilingualText en="Class operation" ko="수업 운영" />
              </h2>
              <p>
                <BilingualText
                  en="Setup, timers, breaks, and help signals are visually separated from the teaching content."
                  ko="세팅, 타이머, 휴식, 도움 신호는 학습 내용과 시각적으로 구분해 운영합니다."
                />
              </p>
            </article>
          </section>

          <section className="book-index">
            <h2>
              <BilingualText en="Six-day course" ko="6일 과정" />
            </h2>
            {interactiveDays.map((plan) => {
              const readings = getReadings(plan.day);
              return (
                <article className="index-day" key={plan.day}>
                  <header>
                    <h3>
                      <Link href={`/day/${plan.day}`}>
                        <span className="index-day-label">
                          <BilingualText
                            en={`Day ${plan.day}.`}
                            ko={`${plan.day}일차`}
                          />
                        </span>{" "}
                        <Copy>{plan.title}</Copy>
                      </Link>
                    </h3>
                  </header>
                  <p className="index-question">
                    <Copy>{plan.question}</Copy>
                  </p>
                  <p className="index-day-meta">
                    <BilingualText
                      en={`${plan.stages.length} stages · 180 minutes`}
                      ko={`${plan.stages.length}단계 · 180분`}
                    />
                  </p>
                  <nav
                    aria-label={`Day ${plan.day} materials / ${plan.day}일차 자료`}
                    className="index-day-actions"
                  >
                    <Link className="is-primary" href={`/day/${plan.day}`}>
                      <BilingualText en="Open day →" ko="수업 열기 →" />
                    </Link>
                    {readings.slice(0, 2).map((reading, index) => (
                      <Link
                        href={`/day/${plan.day}?reading=${index}`}
                        key={reading.id}
                      >
                        <BilingualText
                          en={index === 0 ? "Lesson" : "Workbook"}
                          ko={index === 0 ? "교재" : "워크북"}
                        />
                      </Link>
                    ))}
                  </nav>
                </article>
              );
            })}
          </section>

        </main>
      </div>
    </>
  );
}
