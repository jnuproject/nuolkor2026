"use client";

import Link from "next/link";
import type { DayNumber } from "@/content/course";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";
import { LanguageToggle } from "./LanguageToggle";

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
  const language = useLanguage();

  return (
    <header className="site-header">
      <div className="header-primary">
        <Link
          className="brand"
          href="/"
          aria-label={uiText(language, "Build Loop home")}
        >
          <span className="brand-mark" aria-hidden="true">
            BL
          </span>
          <span className="brand-copy">
            <strong>BUILD LOOP</strong>
            <small>{uiText(language, "Vibe Coding Bootcamp")}</small>
          </span>
        </Link>

        <nav
          className="global-nav"
          aria-label={uiText(language, "Course navigation")}
        >
          <Link className={mode === "overview" ? "is-active" : ""} href="/overview">
            {uiText(language, "Overview")}
          </Link>
          <Link className={mode === "start" ? "is-active" : ""} href="/start">
            {uiText(language, "Setup")}
          </Link>
          <Link href="/join">{uiText(language, "Join")}</Link>
          <Link href="/instructor/live">{uiText(language, "Teach")}</Link>
        </nav>
        <LanguageToggle />
      </div>

      {day ? (
        <div className="header-context">
          <nav
            className="day-switcher"
            aria-label={uiText(language, "Choose a day")}
          >
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

          <nav
            className="mode-switcher"
            aria-label={uiText(language, "Choose a view")}
          >
            {modeLinks.map((item) => (
              <Link
                className={mode === item.id ? "is-active" : ""}
                href={item.path(day)}
                key={item.id}
              >
                {uiText(language, item.label)}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
