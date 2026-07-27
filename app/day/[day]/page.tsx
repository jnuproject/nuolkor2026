import { notFound } from "next/navigation";
import { LessonRunner } from "@/components/interactive/LessonRunner";
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

  return (
    <LessonRunner
      courseware={courseware}
      plan={plan}
      readings={getReadings(value)}
    />
  );
}
