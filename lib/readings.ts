import { curriculumContent } from "@/content/generated";

export type Reading = {
  id: string;
  title: string;
  body: string;
};

export function getReadings(day: number): Reading[] {
  const content =
    curriculumContent.days[String(day) as keyof typeof curriculumContent.days];
  const markdown = content?.lecture ?? "";
  if (!markdown.trim()) {
    return [];
  }
  const matches = [...markdown.matchAll(/^## (.+)$/gm)];
  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end =
      index + 1 < matches.length ? matches[index + 1].index : markdown.length;
    return {
      id: `day${day}-reading-${index + 1}`,
      title: match[1].trim(),
      body: markdown.slice(start, end).trim(),
    };
  });
}
