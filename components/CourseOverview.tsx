import Link from "next/link";
import { interactiveDays } from "@/content/interactive";
import { getOverviewKorean } from "@/content/overview-ko";
import { getReadings } from "@/lib/readings";
import { BilingualText } from "./BilingualText";
import { BookHeader } from "./BookHeader";

function Copy({ children }: { children: string }) {
  return <BilingualText en={children} ko={getOverviewKorean(children)} />;
}

export function CourseOverview() {
  return (
    <>
      <BookHeader showLanguageToggle />
      <div className="book-shell">
        <aside aria-label="Course contents / 강의 목차" className="book-toc">
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
                  <ul>
                    {readings.map((reading, index) => (
                      <li key={reading.id}>
                        <Link href={`/day/${plan.day}`}>
                          {plan.day}.{index + 1} <Copy>{reading.title}</Copy>
                        </Link>
                      </li>
                    ))}
                    {plan.stages.map((stage, index) => (
                      <li key={stage.id}>
                        <Link href={`/day/${plan.day}`}>
                          {plan.day}.{readings.length + index + 1}{" "}
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

          <div className="book-cover-wrap">
            <div aria-hidden="true" className="book-cover-art">
              <em>BUILD LOOP</em>
              <strong>
                <span className="lang-en" lang="en">
                  Vibe
                  <br />
                  Coding
                  <br />
                  Bootcamp
                </span>
                <span className="lang-ko" lang="ko">
                  바이브
                  <br />
                  코딩
                  <br />
                  부트캠프
                </span>
              </strong>
              <span className="book-cover-tagline">
                <BilingualText
                  en="From an idea to a working prototype, in six days."
                  ko="아이디어에서 작동하는 프로토타입까지, 6일 만에."
                />
              </span>
              <i>
                <BilingualText
                  en="National University of Laos"
                  ko="라오스국립대학교"
                />
              </i>
            </div>
          </div>

          <div className="book-start">
            <Link className="book-start-primary" href="/day/1">
              <BilingualText en="Start Day 1 →" ko="1일차 시작하기 →" />
            </Link>
            <Link className="book-start-ghost" href="/join">
              <BilingualText
                en="I have a class code"
                ko="수업 코드로 참여하기"
              />
            </Link>
          </div>

          <section className="book-index">
            <h2>
              <BilingualText en="Contents" ko="목차" />
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
                    <div className="index-teacher">
                      <Link href={`/instructor/day/${plan.day}`}>
                        <BilingualText en="Guide" ko="강사 가이드" />
                      </Link>
                      <Link href={`/day/${plan.day}/present`}>
                        <BilingualText en="TV" ko="수업 화면" />
                      </Link>
                      <Link href={`/cards/day/${plan.day}`}>
                        <BilingualText en="Cards" ko="활동 카드" />
                      </Link>
                    </div>
                  </header>
                  <p className="index-question">
                    <Copy>{plan.question}</Copy>
                  </p>
                  <ol>
                    {readings.map((reading, index) => (
                      <li key={reading.id}>
                        <Link href={`/day/${plan.day}`}>
                          <span className="index-item-number">
                            {plan.day}.{index + 1}
                          </span>
                          <Copy>{reading.title}</Copy>
                          <i>
                            <BilingualText en="read" ko="읽기" />
                          </i>
                        </Link>
                      </li>
                    ))}
                    {plan.stages.map((stage, index) => (
                      <li key={stage.id}>
                        <Link href={`/day/${plan.day}`}>
                          <span className="index-item-number">
                            {plan.day}.{readings.length + index + 1}
                          </span>
                          <Copy>{stage.title}</Copy>
                          <i>{stage.start}</i>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </article>
              );
            })}
          </section>
        </main>
      </div>
    </>
  );
}
