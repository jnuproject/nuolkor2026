import { notFound } from "next/navigation";
import { InstructorPlanView } from "@/components/interactive/InstructorPlanView";
import { LockedDay } from "@/components/LockedDay";
import { isDayReleased } from "@/content/course";
import { getDayCourseware } from "@/content/courseware";
import { curriculumContent } from "@/content/generated";
import { getInteractiveDay } from "@/content/interactive";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((day) => ({ day: String(day) }));
}

export default async function InstructorDayPage({
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

  const content =
    curriculumContent.days[
      String(value) as keyof typeof curriculumContent.days
    ];

  return (
    <InstructorPlanView
      courseware={courseware}
      guideMarkdown={content.instructor}
      plan={plan}
    />
  );
}
