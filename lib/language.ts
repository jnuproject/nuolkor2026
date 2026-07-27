import { useSyncExternalStore } from "react";
import {
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  LEGACY_LANGUAGE_STORAGE_KEY,
} from "./language-constants";

export type Language = "en" | "ko";

export function applyLanguage(language: Language, persist = false) {
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language;

  if (persist) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      window.localStorage.removeItem(LEGACY_LANGUAGE_STORAGE_KEY);
    } catch {
      // A private browser window may block storage; this page still switches.
    }
  }

  window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
}

export function detectLanguage(): Language {
  const selected = document.documentElement.dataset.language;
  if (selected === "ko" || selected === "en") {
    return selected;
  }

  try {
    const saved =
      window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_LANGUAGE_STORAGE_KEY);
    if (saved === "ko" || saved === "en") {
      return saved;
    }
  } catch {
    // Fall through to the browser language.
  }

  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function useLanguage(): Language {
  return useSyncExternalStore(subscribe, detectLanguage, () => "en");
}

export function localized(
  language: Language,
  english: string,
  korean: string,
): string {
  return language === "ko" ? korean : english;
}
