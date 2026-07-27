"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ClassroomLesson } from "@/components/interactive/ClassroomLesson";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";

export function ClassroomLoadingFallback() {
  const language = useLanguage();

  return (
    <main className="classroom-loading">
      <LanguageToggle />
      <span className="runner-brand">
        <span>BL</span>
        <strong>BUILD LOOP</strong>
      </span>
      <div className="classroom-loading-pulse" />
      <h1>{uiText(language, "Connecting to your classroom…")}</h1>
    </main>
  );
}

export function ClassPageClient() {
  const language = useLanguage();
  const searchParams = useSearchParams();
  const code = (searchParams.get("code") ?? "").toUpperCase();

  if (!/^[A-Z0-9]{6}$/.test(code)) {
    return (
      <main className="classroom-loading">
        <LanguageToggle />
        <span className="runner-brand">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </span>
        <h1>{uiText(language, "Enter a valid six-character class code.")}</h1>
        <Link href="/join">{uiText(language, "Return to join →")}</Link>
      </main>
    );
  }

  return <ClassroomLesson code={code} />;
}
