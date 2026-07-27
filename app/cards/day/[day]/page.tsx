import { notFound } from "next/navigation";
import { CardsGrid } from "@/components/CardsGrid";
import { SiteHeader } from "@/components/SiteHeader";
import { getDayInfo, isDayNumber } from "@/content/course";
import { curriculumContent } from "@/content/generated";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((day) => ({ day: String(day) }));
}

export default async function CardsDayPage({
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

  return (
    <>
      <SiteHeader day={value} mode="cards" />
      <CardsGrid day={day} markdown={content.cards} />
    </>
  );
}
