import type { DayNumber } from "@/content/course";

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
  label: string;
  value: string;
  feedback?: string;
};

export type LessonActivity = {
  id: string;
  kind: ActivityKind;
  title: string;
  instruction: string;
  content?: string[];
  items?: string[];
  prompt?: string;
  placeholder?: string;
  options?: ChoiceOption[];
  expected?: string[];
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
  title: string;
  goal: string;
  studentBrief: string[];
  teacherCue: string[];
  completion: string;
  activities: LessonActivity[];
};

export type InteractiveDayPlan = {
  day: DayNumber;
  title: string;
  question: string;
  artifact: string;
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
