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
    phase: "REQUEST AGENT",
    title: "Build a Bot That Answers You",
    shortTitle: "Request Agent",
    question: "How do you build a running bot and read the code it was given?",
    outcome: "Send a message from code, then let a model answer inside your bot.",
    artifact: "A Telegram bot that replies to you, with the token kept out of the code",
    schedule: [
      { start: "00:00", end: "00:10", title: "Finished result demo", minutes: 10 },
      { start: "00:10", end: "00:20", title: "Three layers: OpenCode, your bot, the model", minutes: 10 },
      { start: "00:20", end: "00:35", title: "Get a Telegram bot token", minutes: 15 },
      { start: "00:35", end: "01:10", title: "Build the send script and receive it on your phone", minutes: 35 },
      { start: "01:10", end: "01:20", title: "Break", minutes: 10 },
      { start: "01:20", end: "01:45", title: "Read the code and ask why each line is there", minutes: 25 },
      { start: "01:45", end: "02:10", title: "Answer an incoming message with the model", minutes: 25 },
      { start: "02:10", end: "02:45", title: "Change how your bot replies", minutes: 35 },
      { start: "02:45", end: "03:00", title: "Move the token to .env and save", minutes: 15 },
    ],
  },
  {
    day: 2,
    phase: "WATCH AGENT",
    title: "Make the Bot Check on Its Own",
    shortTitle: "Watch Agent",
    question: "How does a bot notice something new without being asked?",
    outcome: "Poll a real source, remember what was already sent, and survive a restart.",
    artifact: "A bot that sends you only new items, even after being turned off and on",
    schedule: [
      { start: "00:00", end: "00:10", title: "Run yesterday's bot again", minutes: 10 },
      { start: "00:10", end: "00:30", title: "Polling, and the cost of checking too often", minutes: 20 },
      { start: "00:30", end: "01:00", title: "Connect a feed and print the titles", minutes: 30 },
      { start: "01:00", end: "01:10", title: "Break", minutes: 10 },
      { start: "01:10", end: "01:40", title: "What has to be saved so nothing is sent twice", minutes: 30 },
      { start: "01:40", end: "02:10", title: "Store it, restart, and confirm it remembers", minutes: 30 },
      { start: "02:10", end: "02:40", title: "Switch to a source you actually care about", minutes: 30 },
      { start: "02:40", end: "03:00", title: "Handle empty results and network errors", minutes: 20 },
    ],
  },
  {
    day: 3,
    phase: "TOOL AGENT",
    title: "Let the Model Choose the Tool",
    shortTitle: "Tool Agent",
    question: "How does a program become an agent?",
    outcome: "Register tools, let the model pick one, and defend against a bad answer.",
    artifact: "A bot that picks the right tool for whatever you ask it",
    schedule: [
      { start: "00:00", end: "00:15", title: "What code decides and what the model decides", minutes: 15 },
      { start: "00:15", end: "00:35", title: "Structured output: why free text cannot be used", minutes: 20 },
      { start: "00:35", end: "01:00", title: "Function calling: the model only asks, your code runs it", minutes: 25 },
      { start: "01:00", end: "01:10", title: "Break", minutes: 10 },
      { start: "01:10", end: "01:45", title: "Register two tools and let the model choose", minutes: 35 },
      { start: "01:45", end: "02:15", title: "Add a third tool and watch it choose wrong", minutes: 30 },
      { start: "02:15", end: "02:45", title: "Defend against broken or unexpected answers", minutes: 30 },
      { start: "02:45", end: "03:00", title: "Save and review", minutes: 15 },
    ],
  },
  {
    day: 4,
    phase: "MY TOOL",
    title: "Build Your Own Tool and Plug It In",
    shortTitle: "My Tool",
    question: "How do you make this bot yours instead of everyone's?",
    outcome: "Write one tool of your own, register it, and keep the bot alive when it fails.",
    artifact: "A bot with your own tool inside, that logs instead of dying",
    schedule: [
      { start: "00:00", end: "00:20", title: "Choose a topic and check the data source", minutes: 20 },
      { start: "00:20", end: "01:00", title: "Write your own tool and register it", minutes: 40 },
      { start: "01:00", end: "01:10", title: "Break", minutes: 10 },
      { start: "01:10", end: "01:30", title: "Trace the whole flow: this is orchestration", minutes: 20 },
      { start: "01:30", end: "02:10", title: "Isolate failures so one error cannot kill the bot", minutes: 40 },
      { start: "02:10", end: "02:45", title: "Partner use and one fix", minutes: 35 },
      { start: "02:45", end: "03:00", title: "Save", minutes: 15 },
    ],
  },
  {
    day: 5,
    phase: "EXTEND",
    title: "Lend Your Tool to Another Agent",
    shortTitle: "Extend",
    question: "Can the tool you built be used by the coding agent you have been using all week?",
    outcome: "Wrap your tool as an MCP server and make OpenCode use it.",
    artifact: "OpenCode running with a tool you wrote yourself",
    schedule: [
      { start: "00:00", end: "00:20", title: "MCP: a shared way to lend a tool", minutes: 20 },
      { start: "00:20", end: "00:45", title: "Wrap yesterday's tool as an MCP server", minutes: 25 },
      { start: "00:45", end: "01:10", title: "Register it in OpenCode and confirm it appears", minutes: 25 },
      { start: "01:10", end: "01:20", title: "Break", minutes: 10 },
      { start: "01:20", end: "01:50", title: "Ask OpenCode to use your tool", minutes: 30 },
      { start: "01:50", end: "02:30", title: "Rewrite the description until it gets chosen correctly", minutes: 40 },
      { start: "02:30", end: "02:50", title: "The same rule you learned on Day 3 is at work here", minutes: 20 },
      { start: "02:50", end: "03:00", title: "Save", minutes: 10 },
    ],
  },
  {
    day: 6,
    phase: "SHIP & SHARE",
    title: "Finish It and Show Someone",
    shortTitle: "Ship & Share",
    question: "Can someone else run your bot and understand what it does?",
    outcome: "Fix what remains, demo the bot live, and explain what you decided.",
    artifact: "A working demo, a short handoff, and a next-step plan",
    schedule: [
      { start: "00:00", end: "01:00", title: "Fix what is left and clean up", minutes: 60 },
      { start: "01:00", end: "01:10", title: "Break", minutes: 10 },
      { start: "01:10", end: "01:50", title: "Small-group showcase with the bot running", minutes: 40 },
      { start: "01:50", end: "02:20", title: "Use someone else's bot and leave one sentence", minutes: 30 },
      { start: "02:20", end: "02:45", title: "Reflect: what the AI did and what you decided", minutes: 25 },
      { start: "02:45", end: "03:00", title: "Extension demo: multi-agent and frameworks", minutes: 15 },
    ],
  },
];

export function isDayNumber(value: number): value is DayNumber {
  return Number.isInteger(value) && value >= 1 && value <= 6;
}

export function getDayInfo(day: number): DayInfo | undefined {
  return courseDays.find((item) => item.day === day);
}
