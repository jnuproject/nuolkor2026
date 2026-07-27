import { day1Plan, day2Plan } from "./day1-2";
import { day3Plan, day4Plan } from "./day3-4";
import { day5Plan, day6Plan } from "./day5-6";
import type { InteractiveDayPlan } from "./types";

export const interactiveDays: InteractiveDayPlan[] = [
  day1Plan,
  day2Plan,
  day3Plan,
  day4Plan,
  day5Plan,
  day6Plan,
];

export function getInteractiveDay(day: number): InteractiveDayPlan | undefined {
  return interactiveDays.find((plan) => plan.day === day);
}

export type { InteractiveDayPlan, LessonActivity, LessonStage } from "./types";
