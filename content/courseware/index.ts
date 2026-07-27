import { day1Courseware } from "./day1";
import { day2Courseware } from "./day2";
import { day3Courseware } from "./day3";
import { day4Courseware } from "./day4";
import { day5Courseware } from "./day5";
import { day6Courseware } from "./day6";
import type { CoursewareStage, DayCourseware, TeachingSlide } from "./types";

const coursewareDays: DayCourseware[] = [
  day1Courseware,
  day2Courseware,
  day3Courseware,
  day4Courseware,
  day5Courseware,
  day6Courseware,
];

export function getDayCourseware(day: number): DayCourseware | undefined {
  return coursewareDays.find((courseware) => courseware.day === day);
}

export function getCoursewareStage(
  day: number,
  stageId: string,
): CoursewareStage | undefined {
  return getDayCourseware(day)?.stages.find((stage) => stage.stageId === stageId);
}

export function getClassSlides(day: number): TeachingSlide[] {
  return getDayCourseware(day)?.stages.flatMap((stage) => stage.slides) ?? [];
}

export type {
  BilingualCopy,
  CoursewareStage,
  CoursewareStageRole,
  DayCourseware,
  TeachingSlide,
  TeachingSlideItem,
  TeachingSlideLayout,
  TeachingSlideQuestion,
} from "./types";
