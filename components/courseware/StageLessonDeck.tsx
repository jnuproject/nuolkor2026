"use client";

import type {
  CoursewareStageRole,
  TeachingSlide as TeachingSlideData,
} from "@/content/courseware";
import { useLanguage } from "@/lib/language";
import { TeachingSlide } from "./TeachingSlide";

const roleLabels: Record<CoursewareStageRole, { en: string; ko: string }> = {
  preflight: { en: "Class operation", ko: "수업 운영" },
  learn: { en: "Learn", ko: "배우기" },
  build: { en: "Build", ko: "만들기" },
  break: { en: "Break", ko: "휴식" },
  share: { en: "Share", ko: "공유하기" },
};

export function StageLessonDeck({
  role,
  slides,
}: {
  role: CoursewareStageRole;
  slides: TeachingSlideData[];
}) {
  const language = useLanguage();

  if (!slides.length) return null;

  return (
    <section
      aria-label={roleLabels[role][language]}
      className={`lesson-reading role-${role}`}
    >
      {slides.map((slide) => (
        <TeachingSlide key={slide.id} slide={slide} />
      ))}
    </section>
  );
}
