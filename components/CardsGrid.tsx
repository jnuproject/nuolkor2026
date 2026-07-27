"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DayInfo } from "@/content/course";
import { getLocalizedCardsMarkdown } from "@/content/translations/cards-ko";
import { interactiveText } from "@/content/translations/interactive-ko";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";

export type ClassroomCard = {
  number: number;
  title: string;
  body: string;
};

export function parseClassroomCards(markdown: string): {
  intro: string;
  cards: ClassroomCard[];
} {
  const pattern = /^##\s+card\s+(\d+)\s*[—–-]\s*(.+)$/gim;
  const starts = [...markdown.matchAll(pattern)];
  if (starts.length === 0) {
    return { intro: markdown, cards: [] };
  }

  const intro = markdown
    .slice(0, starts[0].index ?? 0)
    .replace(/^#\s+.+$/m, "")
    .replace(/^---$/gm, "")
    .trim();

  const cards = starts.map((match, index) => {
    const from = (match.index ?? 0) + match[0].length;
    const to = index + 1 < starts.length ? starts[index + 1].index : markdown.length;
    return {
      number: Number(match[1]),
      title: match[2].trim(),
      body: markdown.slice(from, to).replace(/^---$/gm, "").trim(),
    };
  });

  return { intro, cards };
}

export function CardsGrid({ day, markdown }: { day: DayInfo; markdown: string }) {
  const language = useLanguage();
  const localizedMarkdown = getLocalizedCardsMarkdown(
    day.day,
    language,
    markdown,
  );
  const { intro, cards } = parseClassroomCards(localizedMarkdown);

  return (
    <main className="cards-page">
      <section className="cards-hero">
        <div>
          <span className="eyebrow">
            {uiText(language, "Day {day} · Classroom cards", {
              day: day.day,
            }).toUpperCase()}
          </span>
          <h1>
            {uiText(language, "{title} Cards", {
              title: interactiveText(language, day.shortTitle),
            })}
          </h1>
          <p>
            {intro ||
              uiText(
                language,
                "Quick-reference cards for the desk, screen, or printer.",
              )}
          </p>
        </div>
        <button className="cards-print" onClick={() => window.print()} type="button">
          🖨 {uiText(language, "Print cards")}
        </button>
      </section>

      <section className="cards-grid">
        {cards.map((card) => (
          <article className="classroom-card" key={card.number}>
            <header>
              <span>
                {uiText(language, "Card {number}", {
                  number: card.number,
                }).toUpperCase()}
              </span>
              <h2>{card.title}</h2>
            </header>
            <div className="classroom-card-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.body}</ReactMarkdown>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
