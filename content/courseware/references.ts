import type { BilingualCopy } from "./types";

export type CourseReference = {
  title: BilingualCopy;
  note: BilingualCopy;
  url: string;
};

export const courseReferences: CourseReference[] = [
  {
    title: {
      en: "Elice · Four-day university no-code AI program",
      ko: "엘리스 · 대학 신입생 4일 AI·SW 교육 사례",
    },
    note: {
      en: "Mixed-background learners, staged concepts and practice, free-topic prototype, presentation.",
      ko: "비전공 포함 학습자, 단계별 개념·실습, 자유 주제 프로토타입, 발표.",
    },
    url: "https://elice.io/ko/resources/case-study/freshman-nocode-ai-app-education",
  },
  {
    title: {
      en: "Replit · Vibe Coding 101",
      ko: "Replit · Vibe Coding 101",
    },
    note: {
      en: "Goal, small slices, context, review and testing, feedback.",
      ko: "목표, 작은 슬라이스, 맥락, 검토와 테스트, 피드백.",
    },
    url: "https://docs.replit.com/learn/foundations/vibe-coding-101",
  },
  {
    title: {
      en: "GitHub · Prompt engineering for Copilot",
      ko: "GitHub · Copilot 프롬프트 엔지니어링",
    },
    note: {
      en: "Specific requirements, examples, task decomposition, relevant context.",
      ko: "구체적 요구, 예시, 작업 분해, 관련 맥락.",
    },
    url: "https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering",
  },
  {
    title: {
      en: "GitHub · Review AI-generated code",
      ko: "GitHub · AI 생성 코드 검토",
    },
    note: {
      en: "Functional evidence, intent, dependencies, AI-specific failure modes.",
      ko: "기능 증거, 의도 적합성, 의존성, AI 특유의 실패.",
    },
    url: "https://docs.github.com/en/copilot/tutorials/review-ai-generated-code",
  },
  {
    title: {
      en: "UNESCO · Guidance for generative AI in education and research",
      ko: "UNESCO · 교육·연구 분야 생성형 AI 지침",
    },
    note: {
      en: "Human agency, privacy, critical evaluation, responsible use.",
      ko: "인간 주도성, 개인정보 보호, 비판적 평가, 책임 있는 사용.",
    },
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000386693",
  },
  {
    title: {
      en: "OWASP · Secure Coding with AI",
      ko: "OWASP · AI와 함께하는 안전한 코딩",
    },
    note: {
      en: "Sensitive data, agent permissions, output verification, accountability.",
      ko: "민감정보, 에이전트 권한, 출력 검증, 인간 책임.",
    },
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Coding_with_AI_Cheat_Sheet.html",
  },
  {
    title: {
      en: "Code.org · AI Foundations project curriculum",
      ko: "Code.org · AI Foundations 프로젝트 과정",
    },
    note: {
      en: "Milestones, rubrics, user testing, peer feedback, reflection.",
      ko: "마일스톤, 루브릭, 사용자 테스트, 동료 피드백, 성찰.",
    },
    url: "https://studio.code.org/courses/ai-foundations-designing-and-building-with-ai-2026/units/3/lessons/11",
  },
  {
    title: {
      en: "Carnegie Mellon · Active learning strategies",
      ko: "카네기멜런대 · 능동학습 수업 전략",
    },
    note: {
      en: "Concept questions, worked examples, application cards, peer explanation.",
      ko: "개념 질문, 풀이 예시, 적용 카드, 동료 설명.",
    },
    url: "https://www.cmu.edu/teaching/online/designteach/strategies/activelearning.html",
  },
];
