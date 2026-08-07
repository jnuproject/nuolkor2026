import { notFound } from "next/navigation";
import { LockedDay } from "@/components/LockedDay";
import { LessonRunner } from "@/components/interactive/LessonRunner";
import { isDayReleased } from "@/content/course";
import { getDayCourseware } from "@/content/courseware";
import { getInteractiveDay } from "@/content/interactive";
import { getReadings } from "@/lib/readings";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((day) => ({ day: String(day) }));
}

export default async function StudentDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const value = Number((await params).day);
  const plan = getInteractiveDay(value);
  const courseware = getDayCourseware(value);
  if (!plan || !courseware) {
    notFound();
  }
  if (!isDayReleased(value)) {
    return <LockedDay day={value} />;
  }

  return (
    <LessonRunner
      courseware={courseware}
      plan={plan}
      readings={getReadings(value)}
    />
  );
}
