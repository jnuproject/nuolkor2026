"use client";

import { useEffect } from "react";
import {
  applyLanguage,
  detectLanguage,
  useLanguage,
  type Language,
} from "@/lib/language";

export function LanguageToggle() {
  const language = useLanguage();

  useEffect(() => {
    applyLanguage(detectLanguage());
  }, []);

  function chooseLanguage(nextLanguage: Language) {
    applyLanguage(nextLanguage, true);
  }

  return (
    <div
      aria-label="Language / 언어"
      className="language-toggle"
      role="group"
    >
      <button
        aria-pressed={language === "ko"}
        data-language-option="ko"
        lang="ko"
        onClick={() => chooseLanguage("ko")}
        type="button"
      >
        한국어
      </button>
      <button
        aria-pressed={language === "en"}
        data-language-option="en"
        lang="en"
        onClick={() => chooseLanguage("en")}
        type="button"
      >
        English
      </button>
    </div>
  );
}
