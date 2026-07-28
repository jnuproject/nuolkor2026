import type { DayNumber } from "@/content/course";

export type LocalizedText =
  | string
  | {
      en: string;
      ko: string;
    };

export function text(en: string, ko: string): LocalizedText {
  return { en, ko };
}

export type ActivityKind =
  | "read"
  | "watch"
  | "checklist"
  | "short-answer"
  | "choice"
  | "prompt"
  | "test-record"
  | "peer"
  | "timer";

export type ChoiceOption = {
  label: LocalizedText;
  value: string;
  feedback?: LocalizedText;
};

export type LessonActivity = {
  id: string;
  kind: ActivityKind;
  title: LocalizedText;
  instruction: LocalizedText;
  content?: LocalizedText[];
  items?: LocalizedText[];
  prompt?: LocalizedText;
  placeholder?: LocalizedText;
  options?: ChoiceOption[];
  expected?: LocalizedText[];
  durationMinutes?: number;
  minimum?: number;
  optional?: boolean;
  hidden?: boolean;
};

export type LessonStage = {
  id: string;
  start: string;
  end: string;
  minutes: number;
  phase: "TELL" | "WATCH" | "CHECK" | "FIX" | "SAVE" | "STUDIO" | "SHARE" | "BREAK";
  title: LocalizedText;
  goal: LocalizedText;
  studentBrief: LocalizedText[];
  teacherCue: LocalizedText[];
  completion: LocalizedText;
  activities: LessonActivity[];
};

export type InteractiveDayPlan = {
  day: DayNumber;
  title: LocalizedText;
  question: LocalizedText;
  artifact: LocalizedText;
  stages: LessonStage[];
};

export function activityRequiresEvidence(activity: LessonActivity): boolean {
  return (
    !activity.optional &&
    !activity.hidden &&
    activity.kind !== "timer" &&
    activity.kind !== "read"
  );
}

export function stageReportsProgress(stage: LessonStage): boolean {
  return stage.activities.some(activityRequiresEvidence);
}
