export type PresentationSlide = {
  id: string;
  title: string;
  content: string;
  startMinute: number;
  endMinute: number;
  timeLabel: string;
  section?: string;
  cues: string[];
  completion?: string;
};

function minutes(hour: string, minute: string): number {
  return Number(hour) * 60 + Number(minute);
}

function stripInlineMarkdown(value: string): string {
  return value
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^[“"'\s]+|[”"'\s]+$/g, "")
    .trim();
}

const FIELD_STOP =
  /^\s*(?:-\s*)?(?:\*\*[^*]+\*\*\s*$|\*{0,2}(?:시간|화면 제목|학생용 영어|학생 화면\s*:|학생에게 보|시각|완료 신호|준비물|보조))/;

function chooseEnglishTitle(block: string, heading: string, content: string): string {
  const explicit = block.match(
    /^\s*(?:-\s*)?\*{0,2}화면 제목\*{0,2}\s*:?\*{0,2}\s*(.+)$/m,
  );
  if (explicit?.[1]) {
    return stripInlineMarkdown(explicit[1]);
  }

  const headingTitle = heading.replace(/^#{2,3}\s+화면\s+\d+\s*[—–-]?\s*/, "").trim();
  if (headingTitle && !/[가-힣]/.test(headingTitle)) {
    return headingTitle;
  }

  return content.split("\n").find((line) => line.trim())?.trim() ?? "Class focus";
}

function extractCues(block: string): string[] {
  const lines = block.split("\n");
  const cues: string[] = [];
  let collecting = false;

  for (const line of lines) {
    if (!collecting) {
      const marker = line.match(
        /^\s*(?:-\s*)?\*{0,2}강사\s*(?:cue|큐)\*{0,2}\s*:?\*{0,2}\s*(.*)$/i,
      );
      if (marker) {
        collecting = true;
        if (marker[1]?.trim()) {
          cues.push(stripInlineMarkdown(marker[1]));
        }
      }
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    if (/^#{1,4}\s/.test(trimmed) || /^---/.test(trimmed) || FIELD_STOP.test(line)) {
      break;
    }

    const bullet = trimmed.match(/^[-•]\s+(.+)$/);
    cues.push(stripInlineMarkdown(bullet ? bullet[1] : trimmed));
  }

  return cues;
}

function extractCompletion(block: string): string | undefined {
  const match = block.match(
    /^\s*(?:-\s*)?\*{0,2}완료 신호\*{0,2}\s*:?\*{0,2}\s*(.+)$/m,
  );
  return match?.[1] ? stripInlineMarkdown(match[1]) : undefined;
}

export function parsePresentationSlides(
  markdown: string,
  day: number,
): PresentationSlide[] {
  const sectionPattern = /^##\s+[A-Z]\.\s*(.+?)\s*$/gm;
  const sections: { index: number; label: string }[] = [];
  for (const match of markdown.matchAll(sectionPattern)) {
    sections.push({
      index: match.index ?? 0,
      label: match[1].replace(/\s*[—–-]\s*\d{1,2}:\d{2}.*$/, "").trim(),
    });
  }

  const screenPattern = /^#{2,3}\s+화면\s+\d+/gm;
  const starts = [...markdown.matchAll(screenPattern)].map((match) => match.index ?? 0);

  return starts.map((start, index) => {
    const end = index + 1 < starts.length ? starts[index + 1] : markdown.length;
    const block = markdown.slice(start, end);

    const heading = block.match(/^#{2,3}\s+(.+)$/m)?.[0] ?? `Screen ${index + 1}`;
    const time = block.match(/(\d{2}):(\d{2})–(\d{2}):(\d{2})/);
    const startMinute = time ? minutes(time[1], time[2]) : 0;
    const endMinute = time ? minutes(time[3], time[4]) : startMinute + 1;

    const cueIndex = block.search(/(?:-\s*)?\*{0,2}강사\s*(?:cue|큐)/i);
    const studentBlock = cueIndex >= 0 ? block.slice(0, cueIndex) : block;
    const codeBlocks = [...studentBlock.matchAll(/```(?:text)?\s*\n([\s\S]*?)```/g)]
      .map((match) => match[1].trimEnd())
      .filter(Boolean);
    let content = codeBlocks.join("\n\n").trim();

    if (!content) {
      const marker = studentBlock.search(/학생용 영어|학생 화면|학생용 문구|학생에게 보/i);
      content = (marker >= 0 ? studentBlock.slice(marker) : studentBlock)
        .replace(/^#{2,4}.+$/gm, "")
        .replace(/^\s*(?:-\s*)?\*{0,2}(?:시간|화면 제목|학생[^:\n]*)\*{0,2}\s*:?\*{0,2}\s*/gm, "")
        .trim();
    }

    const section = sections.filter((item) => item.index < start).at(-1)?.label;

    const title = chooseEnglishTitle(block, heading, content);
    const contentLines = content.split("\n");
    if (contentLines[0]?.trim() === title.trim()) {
      content = contentLines.slice(1).join("\n").replace(/^\n+/, "");
    }

    return {
      id: `day-${day}-screen-${String(index + 1).padStart(2, "0")}`,
      title,
      content,
      startMinute,
      endMinute,
      timeLabel: time ? `${time[1]}:${time[2]}–${time[3]}:${time[4]}` : "",
      section,
      cues: extractCues(block),
      completion: extractCompletion(block),
    };
  });
}
