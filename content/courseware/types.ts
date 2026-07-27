import type { DayNumber } from "@/content/course";

export type BilingualCopy = {
  en: string;
  ko: string;
};

export type TeachingSlideLayout =
  | "opening"
  | "concept"
  | "compare"
  | "flow"
  | "worked-example"
  | "demo"
  | "question"
  | "summary"
  | "studio"
  | "run";

export type TeachingSlideItem = {
  label?: BilingualCopy;
  title: BilingualCopy;
  body: BilingualCopy;
  tone?: "neutral" | "good" | "warning" | "danger";
};

export type TeachingSlideQuestion = {
  prompt: BilingualCopy;
  options?: BilingualCopy[];
  answer: BilingualCopy;
  explanation: BilingualCopy;
};

export type TeachingSlide = {
  id: string;
  stageId: string;
  layout: TeachingSlideLayout;
  minutes: number;
  kicker: BilingualCopy;
  title: BilingualCopy;
  lead?: BilingualCopy;
  items?: TeachingSlideItem[];
  code?: BilingualCopy;
  question?: TeachingSlideQuestion;
  takeaway?: BilingualCopy;
  teacherNotes: BilingualCopy[];
};

export type CoursewareStageRole = "preflight" | "learn" | "build" | "break" | "share";

export type CoursewareStage = {
  stageId: string;
  role: CoursewareStageRole;
  slides: TeachingSlide[];
};

export type DayCourseware = {
  day: DayNumber;
  essentialQuestion: BilingualCopy;
  stages: CoursewareStage[];
};

export function copy(en: string, ko: string): BilingualCopy {
  return { en, ko };
}
