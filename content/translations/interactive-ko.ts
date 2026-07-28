import type { LocalizedText } from "@/content/interactive/types";
import type { Language } from "@/lib/language";

const koreanByEnglish: Record<string, string> = {
  TELL: "설명·정의",
  WATCH: "시연·관찰",
  CHECK: "확인",
  FIX: "수정",
  SAVE: "보관",
  STUDIO: "제작",
  SHARE: "공유",
  BREAK: "휴식",
  "FIRST BUILD": "첫 제작",
  "DEFINE & BUILD": "정의와 제작",
  DESIGN: "디자인",
  INTERACT: "상호작용",
  "TEST & FINISH": "테스트와 완성",
  "PUBLISH & SHARE": "배포와 공유",
  "First Build": "첫 제작",
  "Define & Build": "정의와 제작",
  Design: "디자인",
  Interact: "상호작용",
  "Test & Finish": "테스트와 완성",
  "Publish & Share": "배포와 공유",
  "Browser test": "브라우저 테스트",
  Show: "보여 주기",
  Test: "시험하기",
  Switch: "역할 바꾸기",
};

export function interactiveText(
  language: Language,
  copy: LocalizedText,
): string {
  if (typeof copy !== "string") {
    return copy[language];
  }
  return language === "ko" ? (koreanByEnglish[copy] ?? copy) : copy;
}

export function teacherCueText(
  language: Language,
  copy: LocalizedText,
): string {
  return interactiveText(language, copy);
}
