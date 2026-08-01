import { curriculumContent } from "@/content/generated";

type ReadingCopy = {
  title: string;
  body: string;
};

export type Reading = {
  id: string;
  title: string;
  body: string;
  translations?: {
    ko: ReadingCopy;
  };
};

function documentCopy(markdown: string, fallbackTitle: string): ReadingCopy {
  const heading = markdown.match(/^#\s+(.+)$/m);
  const title = heading?.[1]?.trim() || fallbackTitle;
  const body = heading
    ? markdown
        .slice(0, heading.index)
        .concat(markdown.slice((heading.index ?? 0) + heading[0].length))
        .trim()
    : markdown.trim();

  return { title, body };
}

export function getReadings(day: number): Reading[] {
  const content =
    curriculumContent.days[String(day) as keyof typeof curriculumContent.days];
  if (!content) {
    return [];
  }

  const lessonEn = documentCopy(content.lessonEn, "Lesson");
  const lessonKo = documentCopy(content.lessonKo, "수업 읽기");

  return [
    {
      id: `day${day}-lesson`,
      ...lessonEn,
      translations: { ko: lessonKo },
    },
  ];
}
