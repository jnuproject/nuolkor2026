import { notFound } from "next/navigation";
import { Presenter } from "@/components/Presenter";
import { LockedDay } from "@/components/LockedDay";
import { getDayInfo, isDayNumber, isDayReleased } from "@/content/course";
import { getClassSlides } from "@/content/courseware";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((day) => ({ day: String(day) }));
}

export default async function PresentDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const value = Number((await params).day);
  if (!isDayNumber(value)) {
    notFound();
  }

  const day = getDayInfo(value);
  if (!day) {
    notFound();
  }
  if (!isDayReleased(value)) {
    return <LockedDay day={value} />;
  }

  const slides = getClassSlides(value);
  return <Presenter day={day} slides={slides} />;
}
