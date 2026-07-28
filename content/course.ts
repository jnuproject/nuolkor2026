export type DayNumber = 1 | 2 | 3 | 4 | 5 | 6;

export type ScheduleItem = {
  start: string;
  end: string;
  title: string;
  minutes: number;
};

export type DayInfo = {
  day: DayNumber;
  phase: string;
  title: string;
  shortTitle: string;
  question: string;
  outcome: string;
  artifact: string;
  schedule: ScheduleItem[];
};

export const courseDays: DayInfo[] = [
  {
    day: 1,
    phase: "FIRST BUILD",
    title: "Build Your First Working Page",
    shortTitle: "First Build",
    question: "How can you use AI to build and verify your first working page?",
    outcome: "Build, test, improve, and publish a first working page.",
    artifact: "A working personal page, a test URL, and a saved working copy",
    schedule: [
      { start: "00:00", end: "00:15", title: "Finished result demo and course overview", minutes: 15 },
      { start: "00:15", end: "00:40", title: "Check OpenCode, NVIDIA, folder, and browser", minutes: 25 },
      { start: "00:40", end: "00:55", title: "From a web file to the browser", minutes: 15 },
      { start: "00:55", end: "01:15", title: "Instructor live build", minutes: 20 },
      { start: "01:15", end: "01:25", title: "Break", minutes: 10 },
      { start: "01:25", end: "01:55", title: "Build the shared first page", minutes: 30 },
      { start: "01:55", end: "02:15", title: "Change one part and describe an error", minutes: 20 },
      { start: "02:15", end: "02:40", title: "Personalize and check at phone width", minutes: 25 },
      { start: "02:40", end: "02:55", title: "GitHub Pages test publish", minutes: 15 },
      { start: "02:55", end: "03:00", title: "Save the URL and working copy", minutes: 5 },
    ],
  },
  {
    day: 2,
    phase: "DEFINE & BUILD",
    title: "Turn Your Idea into a Buildable Service",
    shortTitle: "Define & Build",
    question: "How can you turn your idea into something small enough to build and test?",
    outcome: "Define one user path, prepare real content, and build a personal v1.",
    artifact: "A one-sentence project definition, a paper screen, and a working v1",
    schedule: [
      { start: "00:00", end: "00:10", title: "Reopen the test URL", minutes: 10 },
      { start: "00:10", end: "00:30", title: "User and use situation", minutes: 20 },
      { start: "00:30", end: "00:50", title: "One core user flow and a smaller scope", minutes: 20 },
      { start: "00:50", end: "01:10", title: "Real content and screen order", minutes: 20 },
      { start: "01:10", end: "01:20", title: "Break", minutes: 10 },
      { start: "01:20", end: "01:40", title: "A useful build request and live demo", minutes: 20 },
      { start: "01:40", end: "02:00", title: "Personal plan and paper screen", minutes: 20 },
      { start: "02:00", end: "02:45", title: "Build personal project v1", minutes: 45 },
      { start: "02:45", end: "02:55", title: "Five-second comprehension test", minutes: 10 },
      { start: "02:55", end: "03:00", title: "Save v1", minutes: 5 },
    ],
  },
  {
    day: 3,
    phase: "DESIGN",
    title: "Make the Design Intentional",
    shortTitle: "Design",
    question: "How can you remove the generic AI-made look and make the page easier to understand?",
    outcome: "Use hierarchy, type, spacing, color, and real content to make the design intentional.",
    artifact: "A clear design direction, before-and-after evidence, and a mobile-readable project",
    schedule: [
      { start: "00:00", end: "00:15", title: "View each other's first screens without explanation", minutes: 15 },
      { start: "00:15", end: "00:30", title: "Design as an order of information", minutes: 15 },
      { start: "00:30", end: "00:45", title: "Diagnose common AI-generated design", minutes: 15 },
      { start: "00:45", end: "00:55", title: "Real content and consistent design constraints", minutes: 10 },
      { start: "00:55", end: "01:15", title: "Instructor before-and-after redesign", minutes: 20 },
      { start: "01:15", end: "01:25", title: "Break", minutes: 10 },
      { start: "01:25", end: "01:45", title: "Shared design clinic", minutes: 20 },
      { start: "01:45", end: "01:55", title: "Analyze a reference screen", minutes: 10 },
      { start: "01:55", end: "02:00", title: "Choose a personal design direction", minutes: 5 },
      { start: "02:00", end: "02:40", title: "Improve the personal project design", minutes: 40 },
      { start: "02:40", end: "02:55", title: "Check mobile, keyboard, and readability", minutes: 15 },
      { start: "02:55", end: "03:00", title: "Save before-and-after evidence and decisions", minutes: 5 },
    ],
  },
  {
    day: 4,
    phase: "INTERACT",
    title: "Complete One Core Interaction",
    shortTitle: "Interact",
    question: "How can you turn a static page into a service someone can actually use?",
    outcome: "Complete one core interaction and handle the relevant empty, invalid, or no-result state.",
    artifact: "A tested core interaction, one partner-informed fix, and a saved working version",
    schedule: [
      { start: "00:00", end: "00:15", title: "Choose today's user action and result", minutes: 15 },
      { start: "00:15", end: "00:25", title: "Input, choice, action, result, and screen state", minutes: 10 },
      { start: "00:25", end: "00:35", title: "Define success and no-result behavior before building", minutes: 10 },
      { start: "00:35", end: "00:55", title: "Instructor interaction build", minutes: 20 },
      { start: "00:55", end: "01:15", title: "Shared interaction lab", minutes: 20 },
      { start: "01:15", end: "01:25", title: "Break", minutes: 10 },
      { start: "01:25", end: "01:40", title: "Decide empty, invalid, and saved states", minutes: 15 },
      { start: "01:40", end: "02:35", title: "Build the personal project's core interaction", minutes: 55 },
      { start: "02:35", end: "02:50", title: "Partner use and one fix", minutes: 15 },
      { start: "02:50", end: "03:00", title: "Recheck the full path and save", minutes: 10 },
    ],
  },
  {
    day: 5,
    phase: "TEST & FINISH",
    title: "Make It Work for Someone Else",
    shortTitle: "Test & Finish",
    question: "How can you find out whether someone else can really use what you built?",
    outcome: "Observe a user without coaching, fix the main blocker, and publish a release candidate.",
    artifact: "A user-test record, a verified fix, and a public release candidate",
    schedule: [
      { start: "00:00", end: "00:15", title: "Write one user task", minutes: 15 },
      { start: "00:15", end: "00:35", title: "Observe without explaining", minutes: 20 },
      { start: "00:35", end: "01:00", title: "First cross-use session", minutes: 25 },
      { start: "01:00", end: "01:10", title: "Organize observations", minutes: 10 },
      { start: "01:10", end: "01:20", title: "Break", minutes: 10 },
      { start: "01:20", end: "01:35", title: "Choose what to fix now", minutes: 15 },
      { start: "01:35", end: "02:15", title: "Fix the most important problem", minutes: 40 },
      { start: "02:15", end: "02:35", title: "Check mobile, keyboard, and public safety", minutes: 20 },
      { start: "02:35", end: "02:50", title: "Upload the public release candidate", minutes: 15 },
      { start: "02:50", end: "03:00", title: "Check another device and record limitations", minutes: 10 },
    ],
  },
  {
    day: 6,
    phase: "PUBLISH & SHARE",
    title: "Publish, Recheck, and Hand It to Someone Else",
    shortTitle: "Publish & Share",
    question: "How can you publish the project, verify it on another device, and hand it to someone else?",
    outcome: "Publish, test on another device, republish one fix, and explain the finished project.",
    artifact: "A final public URL, a short handoff, a 90-second demo, and a next-step plan",
    schedule: [
      { start: "00:00", end: "00:15", title: "Check files and sensitive information before publishing", minutes: 15 },
      { start: "00:15", end: "00:35", title: "Final publish and republish demo", minutes: 20 },
      { start: "00:35", end: "01:05", title: "Publish the final personal project", minutes: 30 },
      { start: "01:05", end: "01:15", title: "Break", minutes: 10 },
      { start: "01:15", end: "01:35", title: "Test the core action on another device", minutes: 20 },
      { start: "01:35", end: "01:55", title: "Fix a public-environment issue and republish", minutes: 20 },
      { start: "01:55", end: "02:10", title: "Prepare the README and QR code", minutes: 15 },
      { start: "02:10", end: "02:45", title: "Small-group public showcase", minutes: 35 },
      { start: "02:45", end: "03:00", title: "Map the next step and reflect", minutes: 15 },
    ],
  },
];

export function isDayNumber(value: number): value is DayNumber {
  return Number.isInteger(value) && value >= 1 && value <= 6;
}

export function getDayInfo(day: number): DayInfo | undefined {
  return courseDays.find((item) => item.day === day);
}
