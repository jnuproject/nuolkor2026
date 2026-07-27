"use client";

import { useState } from "react";
import type {
  CoursewareStageRole,
  TeachingSlide as TeachingSlideData,
} from "@/content/courseware";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";
import { TeachingSlide } from "./TeachingSlide";

const roleLabels: Record<CoursewareStageRole, { en: string; ko: string }> = {
  preflight: { en: "Class operation", ko: "수업 운영" },
  learn: { en: "Learn", ko: "배우기" },
  build: { en: "Build", ko: "만들기" },
  break: { en: "Break", ko: "휴식" },
  share: { en: "Share", ko: "공유하기" },
};

const roleDescriptions: Record<CoursewareStageRole, { en: string; ko: string }> = {
  preflight: { en: "Prepare · recover · verify", ko: "준비·복구·확인" },
  learn: { en: "Explain · examine · decide", ko: "설명·사례·판단" },
  build: { en: "Plan · make · test", ko: "계획·제작·검증" },
  break: { en: "Pause · reset · return", ko: "멈춤·회복·복귀" },
  share: { en: "Show · listen · improve", ko: "공유·경청·개선" },
};

export function StageLessonDeck({
  role,
  slides,
}: {
  role: CoursewareStageRole;
  slides: TeachingSlideData[];
}) {
  const language = useLanguage();
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  if (!slide) return null;

  return (
    <section className={`stage-courseware role-${role}`}>
      <header className="stage-courseware-bar">
        <div>
          <span>{roleLabels[role][language]}</span>
          <strong>{roleDescriptions[role][language]}</strong>
        </div>
        <small>
          {index + 1} / {slides.length}
        </small>
      </header>

      <TeachingSlide key={slide.id} slide={slide} />

      <nav
        aria-label={language === "ko" ? "강의 화면 이동" : "Lesson slide navigation"}
        className="stage-courseware-nav"
      >
        <button
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          type="button"
        >
          ← {uiText(language, "Previous")}
        </button>
        <div>
          {slides.map((item, itemIndex) => (
            <button
              aria-label={`${itemIndex + 1}`}
              aria-pressed={itemIndex === index}
              className={itemIndex === index ? "is-active" : ""}
              key={item.id}
              onClick={() => setIndex(itemIndex)}
              type="button"
            />
          ))}
        </div>
        <button
          disabled={index === slides.length - 1}
          onClick={() =>
            setIndex((current) => Math.min(slides.length - 1, current + 1))
          }
          type="button"
        >
          {uiText(language, "Next")} →
        </button>
      </nav>
    </section>
  );
}
