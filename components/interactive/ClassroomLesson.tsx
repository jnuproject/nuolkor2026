"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDayCourseware } from "@/content/courseware";
import { getInteractiveDay } from "@/content/interactive";
import { uiText } from "@/content/translations/ui-ko";
import { consumeClassroomAccessToken } from "@/lib/classroom-access";
import {
  ClassroomApiConfigurationError,
  classroomFetch,
} from "@/lib/classroom-api";
import { sitePath } from "@/lib/site-path";
import { useLanguage } from "@/lib/language";
import { LanguageToggle } from "../LanguageToggle";
import { LessonRunner } from "./LessonRunner";

export function ClassroomLesson({ code }: { code: string }) {
  const language = useLanguage();
  const storageKey = `build-loop:class:${code}`;
  const [classroom, setClassroom] = useState<{
    day: number;
    participantToken: string;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(async () => {
      const token = consumeClassroomAccessToken("participant");
      if (!token) {
        window.location.assign(
          sitePath(`/join/?code=${encodeURIComponent(code)}`),
        );
        return;
      }

      const savedDay = Number(localStorage.getItem(`${storageKey}:day`));
      if (getInteractiveDay(savedDay)) {
        setClassroom({ day: savedDay, participantToken: token });
        return;
      }

      try {
        const response = await classroomFetch(
          `${encodeURIComponent(code)}/student`,
          {
            headers: { authorization: `Bearer ${token}` },
            cache: "no-store",
          },
        );
        if (!response.ok) {
          window.location.assign(
            sitePath(`/join/?code=${encodeURIComponent(code)}`),
          );
          return;
        }
        const data = (await response.json()) as { session: { day: number } };
        localStorage.setItem(`${storageKey}:day`, String(data.session.day));
        setClassroom({
          day: data.session.day,
          participantToken: token,
        });
      } catch (connectError) {
        setError(
          connectError instanceof ClassroomApiConfigurationError
            ? connectError.message
            : uiText(language, "Could not connect to the classroom."),
        );
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [code, language, storageKey]);

  const plan = classroom ? getInteractiveDay(classroom.day) : undefined;
  const courseware = classroom ? getDayCourseware(classroom.day) : undefined;
  if (plan && courseware && classroom) {
    return (
      <LessonRunner
        classroomCode={code}
        classroomToken={classroom.participantToken}
        courseware={courseware}
        plan={plan}
      />
    );
  }

  return (
    <main className="classroom-loading">
      <LanguageToggle />
      <span className="runner-brand">
        <span>BL</span>
        <strong>BUILD LOOP</strong>
      </span>
      <div className="classroom-loading-pulse" />
      <h1>
        {error
          ? uiText(language, error)
          : uiText(language, "Connecting to your classroom…")}
      </h1>
      {error ? (
        <Link href={`/join/?code=${encodeURIComponent(code)}`}>
          {uiText(language, "Return to join →")}
        </Link>
      ) : null}
    </main>
  );
}
