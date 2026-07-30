import { curriculumContent } from "@/content/generated";
import { getInteractiveDay } from "@/content/interactive";
import { interactiveText } from "@/content/translations/interactive-ko";
import type { LocalizedText } from "@/content/interactive/types";
import type { DayNumber } from "@/content/course";
import type { CoursewareStage, DayCourseware, TeachingSlide } from "./types";

type MarkdownSection = {
  title: string;
  body: string;
};

type MarkdownDocument = {
  title: string;
  intro: string;
  sections: MarkdownSection[];
};

function parseMarkdownDocument(markdown: string): MarkdownDocument {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let inFence = false;
  let title = "";
  const intro: string[] = [];
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection | null = null;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
    }

    if (!inFence) {
      const headingOne = line.match(/^#\s+(.+)$/);
      if (headingOne && !title) {
        title = headingOne[1].trim();
        continue;
      }

      const headingTwo = line.match(/^##\s+(.+)$/);
      if (headingTwo) {
        current = { title: headingTwo[1].trim(), body: "" };
        sections.push(current);
        continue;
      }
    }

    if (current) {
      current.body += `${line}\n`;
    } else if (title) {
      intro.push(line);
    }
  }

  return {
    title,
    intro: intro.join("\n").trim(),
    sections: sections.map((section) => ({
      ...section,
      body: section.body.trim(),
    })),
  };
}

function shortenForSlide(value: string, maxLength = 260): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= maxLength) {
    return compact;
  }

  const window = compact.slice(0, maxLength + 1);
  const sentenceEnds = [...window.matchAll(/[.!?。！？](?=\s|$)/g)];
  const lastSentence = sentenceEnds.at(-1);
  if (lastSentence?.index !== undefined && lastSentence.index >= maxLength * 0.55) {
    return window.slice(0, lastSentence.index + 1);
  }

  const lastSpace = window.lastIndexOf(" ");
  return `${window.slice(0, lastSpace > maxLength * 0.65 ? lastSpace : maxLength).trim()}…`;
}

function buildPresenterExcerpt(markdown: string): string {
  const firstCode = markdown.match(/```([^\n]*)\n([\s\S]*?)```/);
  const withoutCode = markdown.replace(/```[^\n]*\n[\s\S]*?```/g, "");
  const listItems = [...withoutCode.matchAll(/^\s*(?:[-*+]|\d+[.)])\s+(.+)$/gm)]
    .map((match) => shortenForSlide(match[1].replace(/^\[[ xX]\]\s*/, ""), 150))
    .slice(0, 4);
  const paragraphs = withoutCode
    .split(/\n\s*\n+/)
    .map((block) =>
      block
        .split("\n")
        .filter(
          (line) =>
            !/^\s*(?:#{2,}|[-*+]|\d+[.)]|\||---+$)/.test(line),
        )
        .map((line) => line.replace(/^\s*>\s?/, "").trim())
        .filter(Boolean)
        .join(" "),
    )
    .filter(Boolean)
    .map((paragraph) => shortenForSlide(paragraph));

  const output: string[] = [];
  if (paragraphs[0]) {
    output.push(paragraphs[0]);
  }

  if (listItems.length >= 2) {
    output.push(listItems.map((item) => `- ${item}`).join("\n"));
  } else if (firstCode) {
    const codeLines = firstCode[2].trim().split("\n");
    if (codeLines.length <= 8 && firstCode[2].trim().length <= 640) {
      output.push(
        `\`\`\`${firstCode[1].trim()}\n${codeLines.join("\n")}\n\`\`\``,
      );
    }
  } else if (paragraphs[1]) {
    output.push(paragraphs[1]);
  }

  return output.join("\n\n") || shortenForSlide(markdown);
}

function localizedCopy(value: LocalizedText): { en: string; ko: string } {
  if (typeof value === "string") {
    return {
      en: value,
      ko: interactiveText("ko", value),
    };
  }
  return value;
}

function stageRole(
  phase: string,
): CoursewareStage["role"] {
  if (phase === "BREAK") return "break";
  if (phase === "STUDIO") return "build";
  if (phase === "SHARE") return "share";
  if (phase === "CHECK" || phase === "FIX" || phase === "SAVE") return "build";
  return "learn";
}

function buildDayCourseware(day: DayNumber): DayCourseware | undefined {
  const plan = getInteractiveDay(day);
  const source =
    curriculumContent.days[String(day) as keyof typeof curriculumContent.days];
  if (!plan || !source) return undefined;

  const english = parseMarkdownDocument(source.lessonEn);
  const korean = parseMarkdownDocument(source.lessonKo);
  const sectionCount = Math.min(english.sections.length, korean.sections.length);
  const teachableStages = plan.stages
    .map((stage, index) => ({ stage, index }))
    .filter(({ stage }) => stage.phase !== "BREAK");
  const sectionsByStage = new Map<number, number[]>();

  for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex += 1) {
    const targetPosition =
      sectionCount <= 1 || teachableStages.length <= 1
        ? 0
        : Math.round(
            (sectionIndex * (teachableStages.length - 1)) / (sectionCount - 1),
          );
    const targetStage = teachableStages[targetPosition]?.index ?? 0;
    const assigned = sectionsByStage.get(targetStage) ?? [];
    assigned.push(sectionIndex);
    sectionsByStage.set(targetStage, assigned);
  }

  const stages = plan.stages.map((stage, stageIndex): CoursewareStage => {
    const role = stageRole(stage.phase);
    const assignedSections = sectionsByStage.get(stageIndex) ?? [];
    const overviewItems = stage.studentBrief.map((line, index) => ({
      label: {
        en: `Step ${index + 1}`,
        ko: `${index + 1}단계`,
      },
      title: {
        en: `What to do ${index + 1}`,
        ko: `할 일 ${index + 1}`,
      },
      body: localizedCopy(line),
    }));
    const slideCount = 1 + assignedSections.length;
    const minutesPerSlide = Math.max(1, Math.floor(stage.minutes / slideCount));
    const slides: TeachingSlide[] = [
      {
        id: `${stage.id}-overview`,
        stageId: stage.id,
        layout:
          role === "break"
            ? "summary"
            : role === "build"
              ? "studio"
              : role === "share"
                ? "run"
                : "opening",
        minutes: minutesPerSlide,
        kicker: {
          en: role === "break" ? "Pause" : "Class path",
          ko: role === "break" ? "휴식" : "수업 흐름",
        },
        title: localizedCopy(stage.title),
        lead: localizedCopy(stage.goal),
        items: overviewItems.length ? overviewItems : undefined,
        takeaway: localizedCopy(stage.completion),
        teacherNotes: stage.teacherCue.map(localizedCopy),
      },
    ];

    for (const sectionIndex of assignedSections) {
      const enSection = english.sections[sectionIndex];
      const koSection = korean.sections[sectionIndex];
      slides.push({
        id: `${stage.id}-lesson-${sectionIndex + 1}`,
        stageId: stage.id,
        layout: "concept",
        minutes: minutesPerSlide,
        kicker: {
          en: "Lesson",
          ko: "교재",
        },
        title: {
          en: enSection.title,
          ko: koSection.title,
        },
        markdown: {
          en: enSection.body,
          ko: koSection.body,
        },
        presenterMarkdown: {
          en: buildPresenterExcerpt(enSection.body),
          ko: buildPresenterExcerpt(koSection.body),
        },
        teacherNotes: [],
      });
    }

    return {
      stageId: stage.id,
      role,
      slides,
    };
  });

  return {
    day,
    essentialQuestion: localizedCopy(plan.question),
    stages,
  };
}

const coursewareDays = ([1, 2, 3, 4, 5, 6] as const)
  .map(buildDayCourseware)
  .filter((day): day is DayCourseware => Boolean(day));

export function getDayCourseware(day: number): DayCourseware | undefined {
  return coursewareDays.find((courseware) => courseware.day === day);
}

export function getCoursewareStage(
  day: number,
  stageId: string,
): CoursewareStage | undefined {
  return getDayCourseware(day)?.stages.find((stage) => stage.stageId === stageId);
}

export function getClassSlides(day: number): TeachingSlide[] {
  return getDayCourseware(day)?.stages.flatMap((stage) => stage.slides) ?? [];
}

export type {
  BilingualCopy,
  CoursewareStage,
  CoursewareStageRole,
  DayCourseware,
  TeachingSlide,
  TeachingSlideItem,
  TeachingSlideLayout,
  TeachingSlideQuestion,
} from "./types";
