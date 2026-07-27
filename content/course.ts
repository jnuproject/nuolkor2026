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
    phase: "MAKE",
    title: "AI and Your First Prototype",
    shortTitle: "Make",
    question: "What should a person decide and check when AI writes the code?",
    outcome: "Run the full TELL → WATCH → CHECK → FIX → SAVE loop.",
    artifact: "A tested first page and two safe changes",
    schedule: [
      { start: "00:00", end: "00:10", title: "Welcome and readiness", minutes: 10 },
      { start: "00:10", end: "00:25", title: "Live build demo", minutes: 15 },
      { start: "00:25", end: "00:40", title: "The human role", minutes: 15 },
      { start: "00:40", end: "00:55", title: "Safety promise", minutes: 15 },
      { start: "00:55", end: "01:05", title: "Break", minutes: 10 },
      { start: "01:05", end: "01:25", title: "Tools and files", minutes: 20 },
      { start: "01:25", end: "01:50", title: "Guided first build", minutes: 25 },
      { start: "01:50", end: "02:00", title: "CHECK, FIX, SAVE", minutes: 10 },
      { start: "02:00", end: "02:50", title: "Project Studio", minutes: 50 },
      { start: "02:50", end: "03:00", title: "Share and exit ticket", minutes: 10 },
    ],
  },
  {
    day: 2,
    phase: "ASK & FIX",
    title: "Clear Requests and Debugging",
    shortTitle: "Ask & Fix",
    question: "How can a request become testable, and how can a failure become useful evidence?",
    outcome: "Write precise requests, reproduce one problem, and hand context to a new session.",
    artifact: "Prompt Precision Lab, six tests, and a Context Handoff",
    schedule: [
      { start: "00:00", end: "00:15", title: "Day 1 review", minutes: 15 },
      { start: "00:15", end: "00:35", title: "Vague / clear A–B test", minutes: 20 },
      { start: "00:35", end: "00:55", title: "The Prompt Frame", minutes: 20 },
      { start: "00:55", end: "01:10", title: "Context management", minutes: 15 },
      { start: "01:10", end: "01:20", title: "Break", minutes: 10 },
      { start: "01:20", end: "01:40", title: "Debugging demo", minutes: 20 },
      { start: "01:40", end: "02:00", title: "Guided lab build", minutes: 20 },
      { start: "02:00", end: "02:50", title: "Project Studio", minutes: 50 },
      { start: "02:50", end: "03:00", title: "Compare and exit ticket", minutes: 10 },
    ],
  },
  {
    day: 3,
    phase: "DEFINE",
    title: "From a Problem to a Project",
    shortTitle: "Define",
    question: "How can your own idea become a small, testable project?",
    outcome: "Define the user, problem, success, priorities, and the smallest v0.",
    artifact: "An approved Project Brief and a working v0 in my-app",
    schedule: [
      { start: "00:00", end: "00:15", title: "Review and ownership", minutes: 15 },
      { start: "00:15", end: "00:35", title: "Free topic exploration", minutes: 20 },
      { start: "00:35", end: "00:55", title: "User, problem, success", minutes: 20 },
      { start: "00:55", end: "01:15", title: "MUST 3 / NICE 2", minutes: 20 },
      { start: "01:15", end: "01:25", title: "Break", minutes: 10 },
      { start: "01:25", end: "01:45", title: "Wireframe and Project Brief", minutes: 20 },
      { start: "01:45", end: "02:00", title: "Plan review and approval", minutes: 15 },
      { start: "02:00", end: "02:50", title: "v0 Project Studio", minutes: 50 },
      { start: "02:50", end: "03:00", title: "30-second pitch", minutes: 10 },
    ],
  },
  {
    day: 4,
    phase: "EXTEND",
    title: "One Safe Slice",
    shortTitle: "Extend",
    question: "Can you understand a little, extend one slice, and recover safely?",
    outcome: "Map the generated code, build one approved slice, and leave a safe handoff.",
    artifact: "One tested slice, a regression test, and a verified Save Point",
    schedule: [
      { start: "00:00", end: "00:10", title: "Project status", minutes: 10 },
      { start: "00:10", end: "00:30", title: "Code map", minutes: 20 },
      { start: "00:30", end: "00:50", title: "Event, state, screen, storage", minutes: 20 },
      { start: "00:50", end: "01:05", title: "Sprint and Save Point", minutes: 15 },
      { start: "01:05", end: "01:15", title: "Break", minutes: 10 },
      { start: "01:15", end: "01:30", title: "Recovery paths", minutes: 15 },
      { start: "01:30", end: "01:40", title: "Approve one slice", minutes: 10 },
      { start: "01:40", end: "02:50", title: "Project Studio", minutes: 70 },
      { start: "02:50", end: "03:00", title: "Final checkpoint", minutes: 10 },
    ],
  },
  {
    day: 5,
    phase: "TEST",
    title: "Test, Learn, and Finish",
    shortTitle: "Test",
    question: "How can you prove that another person can use what you built?",
    outcome: "Collect test evidence, observe a peer, and fix what blocks the user first.",
    artifact: "Test evidence and a verified release candidate",
    schedule: [
      { start: "00:00", end: "00:15", title: "Test strategy", minutes: 15 },
      { start: "00:15", end: "00:30", title: "Write test cards", minutes: 15 },
      { start: "00:30", end: "01:00", title: "Two peer-test rounds", minutes: 30 },
      { start: "01:00", end: "01:10", title: "Break", minutes: 10 },
      { start: "01:10", end: "01:25", title: "Sort problems", minutes: 15 },
      { start: "01:25", end: "01:40", title: "Safety and accessibility", minutes: 15 },
      { start: "01:40", end: "01:50", title: "Approve the fix plan", minutes: 10 },
      { start: "01:50", end: "02:50", title: "Project Studio", minutes: 60 },
      { start: "02:50", end: "03:00", title: "Backup and demo path", minutes: 10 },
    ],
  },
  {
    day: 6,
    phase: "SHOW",
    title: "Ship, Showcase, Reflect",
    shortTitle: "Show",
    question: "How can you explain your result and your AI collaboration responsibly?",
    outcome: "Freeze a working version, demonstrate evidence, and explain the learning.",
    artifact: "A final backup, a two-minute demo, feedback, and reflection",
    schedule: [
      { start: "00:00", end: "00:20", title: "Final readiness", minutes: 20 },
      { start: "00:20", end: "00:40", title: "Last blocker fix", minutes: 20 },
      { start: "00:40", end: "00:50", title: "Code Freeze", minutes: 10 },
      { start: "00:50", end: "01:00", title: "Break", minutes: 10 },
      { start: "01:00", end: "01:20", title: "Partner rehearsal", minutes: 20 },
      { start: "01:20", end: "02:40", title: "Showcase", minutes: 80 },
      { start: "02:40", end: "02:50", title: "Peer feedback", minutes: 10 },
      { start: "02:50", end: "03:00", title: "Reflection and close", minutes: 10 },
    ],
  },
];

export function isDayNumber(value: number): value is DayNumber {
  return Number.isInteger(value) && value >= 1 && value <= 6;
}

export function getDayInfo(day: number): DayInfo | undefined {
  return courseDays.find((item) => item.day === day);
}
