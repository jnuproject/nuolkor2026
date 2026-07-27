import { notFound } from "next/navigation";
import { Presenter } from "@/components/Presenter";
import { getDayInfo, isDayNumber } from "@/content/course";
import { curriculumContent } from "@/content/generated";
import { parsePresentationSlides } from "@/content/present";

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

  const content = curriculumContent.days[String(value) as keyof typeof curriculumContent.days];
  const slides = parsePresentationSlides(content.present, value);
  return <Presenter day={day} slides={slides} />;
}
