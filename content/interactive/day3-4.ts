import type { InteractiveDayPlan } from "./types";

export const day3Plan: InteractiveDayPlan = {
  day: 3,
  title: "From a Problem to a Project",
  question: "How can your own idea become a small, testable project?",
  artifact: "A reviewed Project Brief and a working v0 in my-app",
  stages: [
    {
      id: "day3-review-ownership",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "TELL",
      title: "Review and ownership",
      goal: "Recall the build loop and take ownership of every project decision.",
      studentBrief: [
        "Recall TELL → WATCH → CHECK → FIX → SAVE.",
        "You choose the topic. AI and the teacher do not choose it.",
        "Keep AI chat and my-app closed for now.",
      ],
      teacherCue: [
        "학생이 자료를 보지 않고 다섯 단계를 먼저 떠올리게 한다.",
        "오늘부터 주제 선택권과 최종 판단 책임이 학생에게 있음을 분명히 말한다.",
        "응답은 짧은 영어, 짧은 라오어 메모(동료나 통역 지원), 그림, 몸짓 모두 허용하고 언어 유창성보다 판단을 본다.",
        "아직 AI 대화나 프로젝트 폴더를 열지 않게 한다.",
      ],
      completion:
        "The class can say the loop aloud and explain why the learner—not AI or the teacher—owns the project decisions.",
      activities: [
        {
          id: "day3-loop-recall",
          hidden: true,
          kind: "short-answer",
          title: "Recall the loop",
          instruction: "Write the five words in order. Do not use notes.",
          placeholder: "_____ → _____ → _____ → _____ → _____",
          expected: ["TELL", "WATCH", "CHECK", "FIX", "SAVE"],
        },
        {
          id: "day3-ownership-check",
          hidden: true,
          kind: "checklist",
          title: "Project ownership",
          instruction: "Check each promise before you continue.",
          items: [
            "I will choose my own topic.",
            "I will decide what success means.",
            "I will check AI output myself.",
            "I will not use private or secret information.",
          ],
          minimum: 4,
        },
      ],
    },
    {
      id: "day3-free-topic-exploration",
      start: "00:15",
      end: "00:35",
      minutes: 20,
      phase: "STUDIO",
      title: "Free topic exploration",
      goal: "Choose one project direction from the learner's own observation.",
      studentBrief: [
        "Work alone first.",
        "Write three things you have noticed or wanted to improve.",
        "Choose one direction that matters to you.",
      ],
      teacherCue: [
        "완전한 자유 주제 탐색 시간이다. 주제나 전공별 예시를 제시하지 않는다.",
        "학생이 막히면 무엇을 자주 보았는지, 무엇이 불편했는지만 질문한다.",
        "학생은 짧은 영어, 라오어 메모, 작은 그림 중 편한 방식으로 관찰을 먼저 표현하고 필요하면 동료나 통역이 영어 한 줄로 옮긴다.",
        "아이디어를 대신 선택하거나 더 화려한 방향으로 유도하지 않는다.",
      ],
      completion:
        "The learner records three personal observations and selects one direction in their own words.",
      activities: [
        {
          id: "day3-own-observations",
          kind: "short-answer",
          title: "Notice before you choose",
          instruction:
            "Write three things you have noticed, needed, or wanted to improve. Use your own experience.",
          content: [
            "Observation A",
            "Observation B",
            "Observation C",
          ],
          placeholder: "Write three short observations here.",
          minimum: 3,
        },
        {
          id: "day3-own-choice",
          kind: "short-answer",
          title: "Choose one direction",
          instruction:
            "Choose one of your own observations. Say why you want to work on it.",
          placeholder: "I choose ... because ...",
        },
      ],
    },
    {
      id: "day3-user-problem-success",
      start: "00:35",
      end: "00:55",
      minutes: 20,
      phase: "TELL",
      title: "User, problem, success",
      goal: "Turn the chosen direction into a clear user, problem, and visible success.",
      studentBrief: [
        "Name one user.",
        "Write one problem in plain words.",
        "Describe one result you can see and test.",
      ],
      teacherCue: [
        "User, Problem, Success가 한 줄로 이어지는지 확인한다.",
        "성공 문장이 보거나 반복하거나 비교할 수 있는 결과인지 묻는다.",
        "모호한 표현은 학생이 직접 관찰 가능한 문장으로 고치게 한다.",
      ],
      completion:
        "The learner completes one connected User / Problem / Success statement and passes a partner clarity check.",
      activities: [
        {
          id: "day3-user",
          kind: "short-answer",
          title: "User",
          instruction: "Who will use this project? Name one clear user.",
          placeholder: "The user is ...",
        },
        {
          id: "day3-problem",
          kind: "short-answer",
          title: "Problem",
          instruction: "What problem does this user face? Write one sentence.",
          placeholder: "The user needs to ... but ...",
        },
        {
          id: "day3-success",
          kind: "peer",
          title: "Success check",
          instruction:
            "Write a visible success result. Read all three lines to a partner. The partner says what they expect to see.",
          placeholder: "Success means: when the user ..., they see ...",
          expected: [
            "The user is clear.",
            "The problem is clear.",
            "The result can be seen and tested.",
          ],
        },
      ],
    },
    {
      id: "day3-must-nice",
      start: "00:55",
      end: "01:15",
      minutes: 20,
      phase: "CHECK",
      title: "MUST 1–3 / NICE up to 2",
      goal: "Set priorities and protect a small first build.",
      studentBrief: [
        "Write one to three MUST items; MUST 1 is required.",
        "Write up to two NICE items; leave them blank if none are useful.",
        "Build only the smallest path through MUST 1 today.",
      ],
      teacherCue: [
        "MUST 1은 필수지만 프로젝트에 필요하지 않은 MUST 2·3을 억지로 만들지 않게 한다.",
        "각 항목이 한 가지 결과만 담는지 확인한다.",
        "NICE는 최대 두 개이며 없어도 된다. 적은 NICE 항목은 오늘 범위에서 제외하도록 범위 문을 운영한다.",
      ],
      completion:
        "The learner records one to three MUST items, zero to two NICE items, and names the smallest v0 path through MUST 1.",
      activities: [
        {
          id: "day3-priority-read",
          kind: "read",
          title: "Priority rule",
          instruction: "Read the rule, then say it to a partner.",
          content: [
            "MUST = one to three items needed for the project promise; MUST 1 is required.",
            "NICE = zero to two useful items for later; leave the slots blank if none are needed.",
            "Today = only the smallest working path through MUST 1.",
          ],
        },
        {
          id: "day3-priority-list",
          kind: "short-answer",
          title: "Write your priorities",
          instruction:
            "Write MUST 1, add MUST 2–3 only when the promise needs them, and add no more than two NICE items.",
          content: [
            "MUST 1 (required)",
            "MUST 2 (optional)",
            "MUST 3 (optional)",
            "NICE 1 (optional)",
            "NICE 2 (optional)",
          ],
          placeholder: "Use one short line for each item.",
          minimum: 1,
        },
        {
          id: "day3-v0-scope-gate",
          kind: "checklist",
          title: "v0 scope gate",
          instruction: "Check the scope before the break.",
          items: [
            "My v0 starts with MUST 1.",
            "My v0 has one user action.",
            "My v0 has one visible result.",
            "Every optional MUST or NICE item stays out of v0.",
          ],
          minimum: 4,
        },
      ],
    },
    {
      id: "day3-break",
      start: "01:15",
      end: "01:25",
      minutes: 10,
      phase: "BREAK",
      title: "Break",
      goal: "Pause work and return ready for the planning block.",
      studentBrief: [
        "Stop editing.",
        "Take a 10-minute break.",
        "Return with your Project Brief notes.",
      ],
      teacherCue: [
        "학생이 AI나 프로젝트 작업을 계속하지 않게 한다.",
        "종료 1분 전에 복귀 신호를 주고 Project Brief 화면을 준비한다.",
      ],
      completion: "The learner returns by 01:25 with the planning notes ready.",
      activities: [
        {
          id: "day3-break-timer",
          kind: "timer",
          title: "Break timer",
          instruction: "Return before the timer ends.",
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day3-wireframe-brief",
      start: "01:25",
      end: "01:50",
      minutes: 25,
      phase: "STUDIO",
      title: "Wireframe and Project Brief",
      goal: "Make one clear project brief and one-screen wireframe.",
      studentBrief: [
        "Join your decisions in one Project Brief.",
        "Draw only one screen.",
        "Label the main action and visible result.",
      ],
      teacherCue: [
        "앞에서 정한 내용을 다시 발명하지 않고 하나의 Brief로 통합하게 한다.",
        "와이어프레임은 한 화면과 한 핵심 흐름만 그리게 한다.",
        "영어 문장이 막히면 라오어 메모와 그림으로 뜻을 먼저 고정한 뒤 동료나 통역과 짧은 영어 문장으로 바꾸게 한다.",
        "화려함보다 행동과 결과가 분명한지 확인한다.",
      ],
      completion:
        "The learner completes all Project Brief fields and a one-screen wireframe with one action and one result labeled.",
      activities: [
        {
          id: "day3-project-brief",
          kind: "short-answer",
          title: "Complete the brief",
          instruction: "Join your decisions into one short Project Brief.",
          content: [
            "Observation",
            "User",
            "Problem",
            "Success",
            "MUST 1 (required) / MUST 2–3 (optional)",
            "NICE 1–2 (optional; write none if not needed)",
            "v0 IN / v0 OUT",
            "States: Before / Action / After",
            "Test: Action / Expected",
            "Accessibility and safety: use visible words, never color alone, and no private or secret data",
          ],
          placeholder: "Write short, testable lines.",
          minimum: 10,
        },
        {
          id: "day3-one-screen-wireframe",
          kind: "checklist",
          title: "Draw one screen",
          instruction:
            "Draw the screen on paper or in your worksheet. Then check the labels.",
          items: [
            "I drew one screen.",
            "I labeled the user action.",
            "I labeled the visible result.",
            "The screen matches MUST 1.",
            "I did not add any optional MUST or NICE item.",
          ],
          minimum: 5,
        },
      ],
    },
    {
      id: "day3-plan-review",
      start: "01:50",
      end: "02:10",
      minutes: 20,
      phase: "WATCH",
      title: "Plan review and READY gate",
      goal: "Use one shared rubric for AI review, self-check, peer check, and focused teacher help.",
      studentBrief: [
        "Ask AI to review your plan, not choose your topic.",
        "Self-check every Brief field, then ask a partner to use the same rubric.",
        "Build when both checks pass. Use Yellow only when one mismatch needs teacher review.",
      ],
      teacherCue: [
        "AI가 주제 변경이나 추가 기능을 제안하면 학생이 제거하게 한다.",
        "Observation, User, Problem, Success, MUST/NICE, v0 IN/OUT, States, Test, 접근성·안전을 자가검수와 짝 검수에 똑같이 사용한다.",
        "전원 승인 줄을 만들지 않는다. 자가검수와 짝 검수가 모두 통과하면 READY, 불일치가 하나라도 있으면 Yellow로 표시하고 강사는 그 항목만 확인한다.",
        "READY 또는 Yellow 확인 완료 전에는 my-app이나 index.html을 만들지 않게 한다.",
      ],
      completion:
        "The learner records the AI review, completes the shared self/peer rubric, and either reaches READY or resolves one Yellow mismatch with the teacher.",
      activities: [
        {
          id: "day3-ai-plan-review",
          kind: "prompt",
          title: "Review the plan",
          instruction:
            "Complete the brackets. Ask for a scope review only. Read the full reply before any action.",
          prompt:
            "Review this Project Brief without changing my topic or adding features.\n\nObservation: [what I noticed]\nUser: [my user]\nProblem: [one current difficulty]\nSuccess: [one action and visible result]\nMUST: [MUST 1 is required; add MUST 2 and MUST 3 only if the promise needs them]\nNICE: [zero to two optional items; write none if they are not needed]\nv0 IN: [one smallest path through MUST 1]\nv0 OUT: [every other listed item and exclusion]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: visible words, never color alone, no private or secret data.\n\nUse exactly these headings in your review. For each heading, write PASS or one specific RISK. Check that the fields agree, there are one to three MUST items and no more than two NICE items, blank optional slots did not become features, v0 is small enough for today, the test matches Success, and every item outside v0 remains outside. Give only ways to make this same plan smaller or clearer. Do not suggest a new topic or feature. Do not edit files.",
        },
        {
          id: "day3-review-watch",
          kind: "checklist",
          title: "WATCH the review",
          instruction: "Check the reply before you accept any advice.",
          items: [
            "Observation, User, Problem, and Success still form one chain.",
            "The Brief has MUST 1, no more than three MUST items, and no more than two NICE items.",
            "Only listed items appear in v0 IN/OUT; blank optional slots did not become features.",
            "Before, Action, and After match Success.",
            "The Test action and Expected result match the states.",
            "Accessibility and safety use visible words, never color alone, and no private or secret data.",
            "The reply keeps my topic and adds no feature.",
            "I recorded each PASS or one specific risk.",
            "No file changed.",
          ],
          minimum: 9,
        },
        {
          id: "day3-approval-gate",
          kind: "peer",
          title: "Self → peer → Yellow",
          instruction: "Use the same rubric in this order. Do not join a whole-class approval queue.",
          items: [
            "I self-checked every Project Brief heading.",
            "My partner checked the same headings and named any mismatch.",
            "If both checks pass, I mark READY and begin the reviewed v0.",
            "If one or more headings disagree, I mark Yellow and ask the teacher to check only those headings.",
          ],
          minimum: 4,
        },
      ],
    },
    {
      id: "day3-v0-studio",
      start: "02:10",
      end: "02:50",
      minutes: 40,
      phase: "STUDIO",
      title: "v0 Project Studio",
      goal: "Build and verify the smallest working path through MUST 1.",
      studentBrief: [
        "Use TELL → WATCH → CHECK → FIX → SAVE.",
        "Build only the reviewed READY v0.",
        "Test the real page before you save.",
      ],
      teacherCue: [
        "READY 학생과 Yellow 불일치를 해결한 학생만 my-app/index.html을 만들게 한다.",
        "AI가 범위를 넓히면 즉시 멈추고 검토한 READY v0로 되돌린다.",
        "브라우저에서 학생이 직접 실행한 결과만 완료 증거로 인정한다.",
        "작동 확인 후 day3-v0-save.html을 만들고 복사본도 다시 시험하게 한다.",
      ],
      completion:
        "my-app/index.html shows the reviewed MUST 1 path, the learner records a passing browser test, and day3-v0-save.html passes the same test.",
      activities: [
        {
          id: "day3-v0-tell-watch",
          kind: "prompt",
          title: "TELL and WATCH",
          instruction:
            "Complete the brackets from the reviewed Brief. Ask for the smallest READY v0. Read the plan and file changes before you test.",
          prompt:
            "Work only in my-app/index.html.\n\nObservation: [reviewed observation]\nUser: [reviewed user]\nProblem: [reviewed problem]\nSuccess: [reviewed action and visible result]\nMUST 1: [reviewed MUST 1]\nv0 IN: [reviewed smallest path]\nv0 OUT: [reviewed optional items and exclusions]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: use visible words, never color alone, and no private or secret data.\n\nBuild only this v0 path through MUST 1.\nDo not add any optional MUST or NICE item, login, server, external API, personal data, or extra file.\nFirst show a short plan mapped to the same Brief headings. Do not edit until I approve the plan.",
        },
        {
          id: "day3-v0-check-fix",
          kind: "test-record",
          title: "CHECK and FIX",
          instruction:
            "Open the real page. Record Action, Expected, Actual, and Result. If it fails, ask for one small fix and run the same test again.",
          content: ["Action", "Expected", "Actual", "Pass / Not yet"],
          expected: [
            "The page opens.",
            "The reviewed user action can be performed.",
            "The visible result matches the success statement.",
            "No work outside the reviewed v0 appears.",
          ],
        },
        {
          id: "day3-v0-save",
          kind: "checklist",
          title: "SAVE the working v0",
          instruction: "Save only after the real test passes.",
          items: [
            "my-app/index.html passes the v0 test.",
            "I copied it as my-app/day3-v0-save.html.",
            "I opened day3-v0-save.html.",
            "The same action passes in the saved copy.",
            "I recorded what works now.",
          ],
          minimum: 5,
        },
      ],
    },
    {
      id: "day3-pitch",
      start: "02:50",
      end: "03:00",
      minutes: 10,
      phase: "SHARE",
      title: "30-second pitch",
      goal: "Explain the project decision and show one piece of working evidence.",
      studentBrief: [
        "Say the user and problem.",
        "Show the working v0 action.",
        "Name the first action for Day 4.",
      ],
      teacherCue: [
        "30초 구조를 먼저 준비하게 한 뒤 짝 발표를 진행한다.",
        "짧은 영어를 기본으로 하되 라오어 메모를 동료나 통역이 짧게 옮기거나, 학생이 화면과 그림을 가리키고 몸짓으로 행동을 보여도 된다. 언어 유창성이나 주제 취향보다 사용자·문제·작동 증거를 본다.",
        "마지막 1분에는 편집과 새 AI 요청을 모두 멈추게 한다.",
      ],
      completion:
        "The learner gives a timed 30-second pitch, receives one evidence-based partner check, and records a Day 4 first action.",
      activities: [
        {
          id: "day3-pitch-timer",
          kind: "timer",
          title: "30-second pitch",
          instruction:
            "Say: user, problem, working action, visible result, and one limit.",
          durationMinutes: 0.5,
        },
        {
          id: "day3-pitch-peer",
          kind: "peer",
          title: "Partner evidence check",
          instruction:
            "Listen once. Check only what you heard and saw. Then switch roles.",
          items: [
            "I heard one user.",
            "I heard one problem.",
            "I saw one real action.",
            "I saw one visible result.",
          ],
          minimum: 4,
        },
        {
          id: "day3-exit-action",
          kind: "short-answer",
          title: "Day 4 first action",
          instruction: "Write the first thing you will check on Day 4.",
          placeholder: "On Day 4, I will first ...",
        },
      ],
    },
  ],
};

export const day4Plan: InteractiveDayPlan = {
  day: 4,
  title: "One Safe Slice",
  question: "Can you understand a little, extend one slice, and recover safely?",
  artifact: "One tested slice, a regression test, and a verified Save Point",
  stages: [
    {
      id: "day4-project-status",
      start: "00:00",
      end: "00:10",
      minutes: 10,
      phase: "CHECK",
      title: "Project status",
      goal: "Open the Day 3 project and prove that the old working path still works.",
      studentBrief: [
        "Open your own Day 3 my-app.",
        "Do not change a file yet.",
        "Run one old action and record the result.",
      ],
      teacherCue: [
        "새 프로젝트를 만들지 않고 Day 3의 my-app을 그대로 열게 한다.",
        "파일을 수정하기 전에 기존 핵심 동작을 학생이 직접 재현하게 한다.",
        "Red 학생은 새 기능을 시작하지 말고 마지막 작동본 복구로 보낸다.",
      ],
      completion:
        "The learner opens my-app, runs one Day 3 action, records the actual result, and updates the side signal.",
      activities: [
        {
          id: "day4-old-path-test",
          kind: "test-record",
          title: "Test before editing",
          instruction:
            "Run one Day 3 action. Write Action, Expected, Actual, and Result.",
          content: ["Action", "Expected", "Actual", "Pass / Not yet"],
          expected: ["my-app opens", "One old action can be repeated"],
        },
      ],
    },
    {
      id: "day4-code-map",
      start: "00:10",
      end: "00:30",
      minutes: 20,
      phase: "WATCH",
      title: "Code map",
      goal: "Locate structure, presentation, and behavior in the learner's real project.",
      studentBrief: [
        "Read only. Do not edit.",
        "Find one HTML place, one CSS place, and one JavaScript place.",
        "Write 'not used yet' when a part is not present.",
      ],
      teacherCue: [
        "문법 강의로 확장하지 않고 구조·표현·동작의 세 역할만 다룬다.",
        "AI의 답에 나온 위치를 실제 파일에서 학생이 직접 가리키게 한다.",
        "읽기 전용 요청 뒤 파일이 바뀌지 않았는지 반드시 확인한다.",
      ],
      completion:
        "The learner points to one real HTML, CSS, and JavaScript location or records 'not used yet,' and confirms no file changed.",
      activities: [
        {
          id: "day4-code-role-read",
          kind: "read",
          title: "Three code roles",
          instruction: "Read the three roles. Do not memorize syntax.",
          content: [
            "HTML = structure",
            "CSS = presentation",
            "JavaScript = behavior",
          ],
        },
        {
          id: "day4-code-map-prompt",
          kind: "prompt",
          title: "Ask for a read-only map",
          instruction:
            "Ask AI to point to real places. Do not allow file changes.",
          prompt:
            "Read my current project only. Do not edit any file.\n\nMake a short code map:\n1. Where is the main HTML structure?\n2. Where is the main CSS presentation?\n3. Where is the main JavaScript behavior?\n\nUse the real file names and nearby text so I can find each place. If a role is not used, say 'not used yet.'",
        },
        {
          id: "day4-code-map-check",
          kind: "checklist",
          title: "Check the real files",
          instruction: "Point to each place in your project, then check file safety.",
          items: [
            "I found one HTML place or wrote 'not used yet.'",
            "I found one CSS place or wrote 'not used yet.'",
            "I found one JavaScript place or wrote 'not used yet.'",
            "The file list did not change.",
            "No file content changed.",
          ],
          minimum: 5,
        },
      ],
    },
    {
      id: "day4-action-trace",
      start: "00:30",
      end: "00:50",
      minutes: 20,
      phase: "WATCH",
      title: "Action path and optional storage",
      goal: "Trace one real action through the generated project.",
      studentBrief: [
        "Choose one action that already works.",
        "Trace Event → handler → State → render → Screen.",
        "Record Storage load/save separately, or write 'not used.'",
      ],
      teacherCue: [
        "학생 자신의 기존 동작 하나를 Event → handler → State → render → Screen 순서로 추적하게 한다.",
        "각 단계에 AI 설명이 아니라 실제 파일·코드와 브라우저 증거를 연결하게 한다.",
        "Storage는 화면 뒤의 다음 단계가 아니다. 지속 저장을 약속한 경우에만 Storage → State 불러오기와 State → Storage 저장을 별도로 기록하고, 없으면 not used로 쓴다.",
      ],
      completion:
        "The learner records and verifies Event, handler, State, render, and Screen for one real action, plus a separate Storage load/save note or 'not used.'",
      activities: [
        {
          id: "day4-action-flow-read",
          kind: "read",
          title: "Action flow",
          instruction: "Read the action-path questions and the separate storage question.",
          content: [
            "Event: What did the user do?",
            "Handler: Which listener or function received the event?",
            "State: What value changed or was read?",
            "Render: Which code turned state into interface output?",
            "Screen: What did the user see?",
            "Storage, if promised: What loads into State on start, and what saves from State after a change?",
          ],
        },
        {
          id: "day4-action-trace-prompt",
          kind: "prompt",
          title: "Trace without editing",
          instruction:
            "Complete the action line. Ask for an explanation only.",
          prompt:
            "Read my current project only. Do not edit any file.\n\nTrace this working user action: [my action]\n\nAction path:\nEvent → handler → State → render → Screen\n\nSeparate persistence check:\nStorage → State on start, and State → Storage after a change.\nIf persistence is not promised, write 'Storage: not used.'\n\nPoint to the real file and nearby code for each step. Keep the answer short.",
        },
        {
          id: "day4-action-trace-record",
          kind: "short-answer",
          title: "Record the real trace",
          instruction:
            "Write the five-step action path. Then record the separate storage branch or 'not used,' run the action, and refresh once.",
          content: [
            "Event",
            "Handler",
            "State",
            "Render",
            "Screen",
            "Storage load/save or not used",
          ],
          placeholder: "Use a short line for each step.",
          minimum: 6,
        },
      ],
    },
    {
      id: "day4-sprint-save-point",
      start: "00:50",
      end: "01:05",
      minutes: 15,
      phase: "SAVE",
      title: "Sprint and Save Point",
      goal: "Define one safe sprint and protect the working starting state.",
      studentBrief: [
        "Write one success test and one old-action test.",
        "Make my-app-day4-start next to my-app.",
        "Open the copy and test it.",
      ],
      teacherCue: [
        "Sprint를 TELL → WATCH → CHECK → FIX → SAVE 한 사이클로 설명한다.",
        "단일 파일은 index.html을 형제 폴더에 복사하고, 다중 파일은 폴더 전체를 복사하게 한다.",
        "백업을 직접 열어 기존 동작이 통과하기 전에는 Save Point 완료로 인정하지 않는다.",
      ],
      completion:
        "The learner writes success and regression tests, creates my-app-day4-start beside my-app, and proves the copied version opens and works.",
      activities: [
        {
          id: "day4-sprint-loop",
          kind: "read",
          title: "One safe sprint",
          instruction: "Use the full loop for one small slice.",
          content: [
            "TELL — ask for one reviewed READY change",
            "WATCH — inspect the plan and changed files",
            "CHECK — run the success test",
            "FIX — recover or correct one gap",
            "SAVE — protect only a working version",
          ],
        },
        {
          id: "day4-test-before-sprint",
          kind: "test-record",
          title: "Write tests first",
          instruction:
            "Write one new-slice test and one old-action regression test before any change.",
          content: [
            "New action",
            "New expected result",
            "Old action",
            "Old expected result",
          ],
          minimum: 4,
        },
        {
          id: "day4-start-save-point",
          kind: "checklist",
          title: "Verify the start Save Point",
          instruction: "Make the copy beside my-app, then test the copy.",
          items: [
            "I made my-app-day4-start next to my-app.",
            "I copied index.html or the whole project as required.",
            "I opened the project from the copy.",
            "The old action passes in the copy.",
            "I did not put the backup inside my-app.",
          ],
          minimum: 5,
        },
      ],
    },
    {
      id: "day4-break",
      start: "01:05",
      end: "01:15",
      minutes: 10,
      phase: "BREAK",
      title: "Break",
      goal: "Pause editing and return ready for recovery practice.",
      studentBrief: [
        "Stop editing.",
        "Take a 10-minute break.",
        "Return with my-app and my-app-day4-start closed.",
      ],
      teacherCue: [
        "모든 편집과 AI 요청을 멈추게 한다.",
        "종료 1분 전에 복귀 신호를 주고 복구 경로 카드를 준비한다.",
      ],
      completion:
        "The learner returns by 01:15 with the project protected and ready.",
      activities: [
        {
          id: "day4-break-timer",
          kind: "timer",
          title: "Break timer",
          instruction: "Return before the timer ends.",
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day4-recovery-paths",
      start: "01:15",
      end: "01:30",
      minutes: 15,
      phase: "FIX",
      title: "Recovery paths",
      goal: "Choose a safe recovery move instead of repeating an unclear request.",
      studentBrief: [
        "STOP when the result is unclear or broken.",
        "Choose one recovery move.",
        "Run the same test again after recovery.",
      ],
      teacherCue: [
        "정확한 오류 보고, 검증된 undo, 더 작은 요청, 새 맥락과 수동 복구를 구분한다.",
        "undo는 당일 실제 환경에서 검증된 경우에만 선택 가능하다고 표시한다.",
        "같은 모호한 요청을 세 번 반복하지 않게 한다.",
      ],
      completion:
        "The learner chooses a safe first recovery move for the practice situation and explains how to verify recovery.",
      activities: [
        {
          id: "day4-recovery-read",
          kind: "read",
          title: "Four recovery moves",
          instruction: "Read the moves. The teacher will mark undo as available or unavailable.",
          content: [
            "1. Report the exact action, expected result, and actual result.",
            "2. Use undo only when the teacher says VERIFIED TODAY.",
            "3. Ask for a smaller step.",
            "4. Start with fresh context or restore the start Save Point.",
          ],
        },
        {
          id: "day4-recovery-choice",
          kind: "choice",
          title: "Choose the first move",
          instruction:
            "A change breaks the page. You can repeat the failure. What should you do first?",
          options: [
            {
              label: "Send the same request again",
              value: "repeat",
              feedback: "Stop. Repeating an unclear request adds risk.",
            },
            {
              label: "Record Action, Expected, and Actual",
              value: "report",
              feedback: "Good. Make the failure clear before the next change.",
            },
            {
              label: "Ask for more features",
              value: "expand",
              feedback: "Stop. More scope does not repair the current failure.",
            },
          ],
          expected: ["report"],
        },
        {
          id: "day4-recovery-proof",
          kind: "short-answer",
          title: "Prove recovery",
          instruction:
            "Write the exact test you will run after the recovery move.",
          placeholder: "I will repeat ... and expect to see ...",
        },
      ],
    },
    {
      id: "day4-slice-approval",
      start: "01:30",
      end: "01:40",
      minutes: 10,
      phase: "CHECK",
      title: "Review one slice",
      goal: "Use self-check and peer-check to make one Day 3 slice READY or identify one Yellow mismatch.",
      studentBrief: [
        "Choose one small slice from your Day 3 MUST plan.",
        "Write one action, one visible result, and one regression test.",
        "Self-check, then peer-check the same gate. Use Yellow only for a mismatch or help request.",
      ],
      teacherCue: [
        "전원 강사 승인 줄을 만들지 않는다. 학생이 같은 여섯 항목으로 자가검수한 뒤 짝이 다시 검수하게 한다.",
        "자가검수와 짝검수가 모두 통과하면 학생이 READY로 표시하고 바로 진행한다.",
        "두 검수가 다르거나 도움이 필요하면 Yellow로 표시한다. 강사는 불일치 항목만 확인하고 같은 목표를 작게 만드는 질문만 한다.",
      ],
      completion:
        "The learner records one slice with success, regression, and limits, completes the same self/peer gate, and either marks READY or resolves one Yellow mismatch with focused teacher help.",
      activities: [
        {
          id: "day4-slice-definition",
          kind: "short-answer",
          title: "Define one slice",
          instruction: "Use your own Day 3 plan. Write short, testable lines.",
          content: [
            "One MUST slice",
            "One user action",
            "One visible result",
            "One old action to keep working",
            "Files allowed to change",
          ],
          placeholder: "Complete all five lines.",
          minimum: 5,
        },
        {
          id: "day4-slice-gate",
          kind: "checklist",
          title: "Self + peer scope gate",
          instruction:
            "Self-check each item, then have a partner repeat the same gate. Check an item here only when both agree it passes.",
          items: [
            "The slice comes from my Day 3 plan.",
            "I can test it with one user action.",
            "The expected result is visible.",
            "I named one regression test.",
            "my-app-day4-start works.",
            "The plan adds no private data, login, server, or external API.",
          ],
          minimum: 6,
        },
        {
          id: "day4-slice-status",
          kind: "choice",
          title: "READY or Yellow",
          instruction:
            "Choose READY when both checks pass. Choose Yellow only for a mismatch or help request, then show the teacher that item.",
          options: [
            {
              label: "READY — both checks pass",
              value: "ready",
              feedback: "Continue with only this reviewed slice.",
            },
            {
              label: "Yellow — one mismatch or help request",
              value: "yellow",
              feedback: "Ask the teacher to review only the mismatched item.",
            },
          ],
        },
      ],
    },
    {
      id: "day4-project-studio",
      start: "01:40",
      end: "02:50",
      minutes: 70,
      phase: "STUDIO",
      title: "Project Studio",
      goal: "Build one reviewed READY slice, recover safely, regress, save, and hand off.",
      studentBrief: [
        "Use TELL → WATCH → CHECK → FIX → SAVE.",
        "Build only the reviewed READY slice.",
        "Pass the new test and the old test before SAVE.",
      ],
      teacherCue: [
        "READY 또는 Yellow 불일치 해결을 마친 조각만 Studio에서 시작하게 한다.",
        "새 조각의 성공 테스트와 기존 동작의 회귀 테스트를 학생이 직접 실행하게 한다.",
        "실패하면 한 가지 복구 경로만 골라 같은 테스트를 다시 수행하게 한다.",
        "두 테스트 통과 후 my-app-day4-slice를 만들고 복사본도 검증하게 한다.",
        "마지막 5분에는 Context Handoff를 완성하게 한다.",
      ],
      completion:
        "The reviewed READY slice and one old action pass in the browser and in my-app-day4-slice, and the learner completes a safe Context Handoff.",
      activities: [
        {
          id: "day4-studio-tell-watch",
          kind: "prompt",
          title: "TELL and WATCH",
          instruction:
            "Complete the brackets from the reviewed READY slice. Ask for a plan first and accept only the smallest first step.",
          prompt:
            "Work only in my current project.\n\nMy reviewed READY MUST slice is:\n[my own words]\n\nSuccess means:\nWhen I [action], I see [visible result].\n\nKeep this working:\n[old action and expected result]\n\nAllowed files:\n[reviewed file list]\n\nDo not add a library, server, login, external API, personal data, or extra feature.\nFirst show a short plan:\n1. what you will change;\n2. how I will test success;\n3. how I will test the old action.\n\nDo not edit until I approve the AI plan.",
        },
        {
          id: "day4-studio-check-fix",
          kind: "test-record",
          title: "CHECK, FIX, and regress",
          instruction:
            "Test the real browser. If the new test fails, choose one recovery move and repeat the same test. Then test the old action.",
          content: [
            "New action / Expected / Actual / Result",
            "Old action / Expected / Actual / Result",
            "Refresh or reopen / Expected / Actual / Result",
            "Recovery move used, if needed",
          ],
          expected: [
            "The reviewed READY slice passes.",
            "The old action still passes.",
            "Refresh or reopen does not hide a failure.",
            "No file outside the plan changed.",
          ],
        },
        {
          id: "day4-studio-save-handoff",
          kind: "checklist",
          title: "SAVE and hand off",
          instruction:
            "Save only a working version. Then leave enough context for the next session.",
          items: [
            "The new test passes in active my-app.",
            "The old-action regression test passes in active my-app.",
            "I made my-app-day4-slice next to my-app.",
            "I opened the saved copy.",
            "Both tests pass in the saved copy.",
            "My handoff says what works now.",
            "My handoff names my-app-day4-slice.",
            "My handoff records any current problem.",
            "My handoff gives one next smallest step.",
            "My handoff has no private or secret information.",
          ],
          minimum: 10,
        },
      ],
    },
    {
      id: "day4-final-checkpoint",
      start: "02:50",
      end: "03:00",
      minutes: 10,
      phase: "SHARE",
      title: "Final checkpoint",
      goal: "Show observable evidence and leave the project in a safe state.",
      studentBrief: [
        "Stop editing.",
        "Show the new result, old result, Save Point, and handoff.",
        "Update the side signal.",
      ],
      teacherCue: [
        "앞 3분에는 짝검증 경로와 종료 기준을 안내하고 편집을 멈추게 한다.",
        "다음 4분에는 짝이 복사본에서 새 동작과 기존 동작을 직접 실행한다. 파일명만 확인하는 것은 증거로 인정하지 않는다.",
        "마지막 3분에는 side signal, Day 5 첫 행동, exit 기록을 완료하며 새 AI 요청은 보내지 않는다.",
      ],
      completion:
        "A partner verifies five pieces of evidence, the learner updates the side signal, and records the first Day 5 action.",
      activities: [
        {
          id: "day4-final-peer-check",
          kind: "peer",
          title: "Show the evidence",
          instruction: "Your partner watches. Do not only point to a file name.",
          items: [
            "Active my-app opens.",
            "The reviewed new result can be shown.",
            "The old action still works.",
            "my-app-day4-slice opens and passes both tests.",
            "The Context Handoff is complete.",
          ],
          minimum: 5,
        },
        {
          id: "day4-day5-first-action",
          kind: "short-answer",
          title: "Day 5 first action",
          instruction: "Write the first thing you will test on Day 5.",
          placeholder: "On Day 5, I will first test ...",
        },
      ],
    },
  ],
};
