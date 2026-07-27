"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/LanguageToggle";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";

export default function NotFound() {
  const language = useLanguage();

  return (
    <main className="not-found">
      <LanguageToggle />
      <span className="eyebrow">
        {uiText(language, "Not found").toUpperCase()}
      </span>
      <h1>{uiText(language, "This lesson is not in the six-day course.")}</h1>
      <p>{uiText(language, "Choose Day 1–6 from the course overview.")}</p>
      <Link className="button button-primary" href="/overview">
        {uiText(language, "Return to overview")}
      </Link>
    </main>
  );
}
