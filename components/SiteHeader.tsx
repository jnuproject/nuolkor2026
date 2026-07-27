import Link from "next/link";
import type { DayNumber } from "@/content/course";

type Mode = "overview" | "start" | "student" | "instructor" | "present" | "cards";

type SiteHeaderProps = {
  day?: DayNumber;
  mode: Mode;
};

const modeLinks = [
  { id: "student", label: "Student", path: (day: number) => `/day/${day}` },
  {
    id: "instructor",
    label: "Instructor",
    path: (day: number) => `/instructor/day/${day}`,
  },
  { id: "present", label: "Present", path: (day: number) => `/day/${day}/present` },
  { id: "cards", label: "Cards", path: (day: number) => `/cards/day/${day}` },
] as const;

export function SiteHeader({ day, mode }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="header-primary">
        <Link className="brand" href="/" aria-label="Build Loop home">
          <span className="brand-mark" aria-hidden="true">
            BL
          </span>
          <span className="brand-copy">
            <strong>BUILD LOOP</strong>
            <small>Vibe Coding Bootcamp</small>
          </span>
        </Link>

        <nav className="global-nav" aria-label="Course navigation">
          <Link className={mode === "overview" ? "is-active" : ""} href="/overview">
            Overview
          </Link>
          <Link className={mode === "start" ? "is-active" : ""} href="/start">
            Setup
          </Link>
          <Link href="/join">Join</Link>
          <Link href="/instructor/live">Teach</Link>
        </nav>
      </div>

      {day ? (
        <div className="header-context">
          <nav className="day-switcher" aria-label="Choose a day">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link
                aria-current={item === day ? "page" : undefined}
                className={item === day ? "is-active" : ""}
                href={
                  mode === "instructor"
                    ? `/instructor/day/${item}`
                    : mode === "present"
                      ? `/day/${item}/present`
                      : mode === "cards"
                        ? `/cards/day/${item}`
                        : `/day/${item}`
                }
                key={item}
              >
                {item}
              </Link>
            ))}
          </nav>

          <nav className="mode-switcher" aria-label="Choose a view">
            {modeLinks.map((item) => (
              <Link
                className={mode === item.id ? "is-active" : ""}
                href={item.path(day)}
                key={item.id}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
