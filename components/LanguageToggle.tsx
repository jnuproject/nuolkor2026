"use client";

import { useEffect, useSyncExternalStore } from "react";

type Language = "en" | "ko";

const storageKey = "build-loop:home-language:v1";
const languageChangeEvent = "build-loop:home-language-change";

function applyLanguage(language: Language) {
  document.documentElement.dataset.homeLanguage = language;
  document.documentElement.lang = language;
}

function detectLanguage(): Language {
  const selected = document.documentElement.dataset.homeLanguage;
  if (selected === "ko" || selected === "en") {
    return selected;
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "ko" || saved === "en") {
      return saved;
    }
  } catch {
    // The switch still works when storage is unavailable.
  }

  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(languageChangeEvent, onStoreChange);
  return () => window.removeEventListener(languageChangeEvent, onStoreChange);
}

function getServerLanguage(): Language {
  return "en";
}

export function LanguageToggle() {
  const language = useSyncExternalStore(
    subscribe,
    detectLanguage,
    getServerLanguage,
  );

  useEffect(() => {
    const initialLanguage = detectLanguage();
    applyLanguage(initialLanguage);
    window.dispatchEvent(new Event(languageChangeEvent));
    return () => {
      delete document.documentElement.dataset.homeLanguage;
      document.documentElement.lang = "en";
    };
  }, []);

  function chooseLanguage(nextLanguage: Language) {
    applyLanguage(nextLanguage);
    try {
      window.localStorage.setItem(storageKey, nextLanguage);
    } catch {
      // A private browser window may block storage; the current page still switches.
    }
    window.dispatchEvent(new Event(languageChangeEvent));
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
