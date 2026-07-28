import { notFound } from "next/navigation";
import Link from "next/link";
import { BilingualText } from "@/components/BilingualText";
import { BookHeader } from "@/components/BookHeader";
import { isDayNumber } from "@/content/course";

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

  return (
    <>
      <BookHeader showLanguageToggle />
      <main className="legacy-workbook-link">
        <span>
          <BilingualText
            en={`Day ${value} · Workbook`}
            ko={`${value}일차 · 워크북`}
          />
        </span>
        <h1>
          <BilingualText
            en="The activities now live in one continuous workbook."
            ko="활동은 이제 하나의 연속된 워크북에서 진행합니다."
          />
        </h1>
        <p>
          <BilingualText
            en="The separate card deck was removed so the explanation and practice can be read in order."
            ko="설명과 실습을 순서대로 읽을 수 있도록 별도의 카드 모음은 없앴습니다."
          />
        </p>
        <Link href={`/day/${value}?reading=1`}>
          <BilingualText en="Open the workbook →" ko="워크북 열기 →" />
        </Link>
      </main>
    </>
  );
}
