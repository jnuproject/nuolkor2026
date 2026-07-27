import { notFound } from "next/navigation";
import { InstructorPlanView } from "@/components/interactive/InstructorPlanView";
import { getDayCourseware } from "@/content/courseware";
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

  return <InstructorPlanView courseware={courseware} plan={plan} />;
}
