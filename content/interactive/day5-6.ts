import type { InteractiveDayPlan } from "./types";

export const day5Plan: InteractiveDayPlan = {
  day: 5,
  title: "Test, Learn, and Finish",
  question: "How can you prove that another person can use what you built?",
  artifact: "Test evidence and a verified release candidate",
  stages: [
    {
      id: "day5-test-strategy",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "TELL",
      title: "Test strategy",
      goal: "Know what counts as evidence and protect the last working build.",
      studentBrief: [
        "Do not add a new feature today.",
        "Write Expected before Actual.",
        "Use TELL → WATCH → CHECK → FIX → SAVE.",
      ],
      teacherCue: [
        "오늘은 기능 추가일이 아니라 작동 증거를 만드는 날이라고 선언한다.",
        "단일 파일과 다중 파일 학생이 각각 시작 Save Point를 만들고 복사본을 직접 열었는지 확인한다.",
        "AI의 설명이 아니라 학생이 직접 실행한 결과만 증거로 인정한다.",
      ],
      completion:
        "A Day 5 start copy opens and works, and the learner selects Action + Expected + Actual as test evidence.",
      activities: [
        {
          id: "day5-evidence-read",
          kind: "read",
          title: "A claim is not evidence",
          instruction: "Read the three parts of a test record.",
          content: [
            "Action: what you do.",
            "Expected: what should happen.",
            "Actual: what really happens.",
            "Write Expected before you run the test.",
          ],
        },
        {
          id: "day5-evidence-choice",
          kind: "choice",
          title: "Choose the evidence",
          instruction: "Which note is useful test evidence?",
          options: [
            {
              label: "AI says the project works.",
              value: "ai-claim",
              feedback: "This is a claim. Run the project yourself.",
            },
            {
              label: "Action, Expected, and Actual are recorded.",
              value: "test-record",
              feedback: "Correct. Another person can repeat this test.",
            },
            {
              label: "The page looks good.",
              value: "opinion",
              feedback: "This is an opinion, not a repeatable result.",
            },
          ],
          expected: ["test-record"],
        },
        {
          id: "day5-start-save",
          kind: "checklist",
          title: "Protect the working version",
          instruction: "Make and test the Day 5 start copy.",
          items: [
            "Open and test my-app.",
            "For one file, make my-app/day5-start.html.",
            "For many files, copy the full project as my-app-day5-start.",
            "Open the copy and run the main path.",
          ],
          minimum: 4,
        },
      ],
    },
    {
      id: "day5-write-test-cards",
      start: "00:15",
      end: "00:30",
      minutes: 15,
      phase: "CHECK",
      title: "Write test cards",
      goal: "Write a HAPPY test and handle each relevant risk with a visible expected result.",
      studentBrief: [
        "Write one HAPPY test.",
        "For EMPTY, INVALID, and BOUNDARY, write a test when the condition exists; otherwise write N/A and why.",
        "Use a result that another person can see.",
      ],
      teacherCue: [
        "학생이 Actual을 실행하기 전에 Expected를 쓰게 한다.",
        "기능 내용을 대신 제안하지 말고 EMPTY·INVALID·BOUNDARY가 학생의 기존 기능에 실제로 적용되는지 확인한다. 해당하지 않으면 N/A와 이유를 인정한다.",
        "‘It works’처럼 관찰할 수 없는 결과는 다시 쓰게 한다.",
      ],
      completion:
        "A HAPPY card checks a MUST feature, and EMPTY, INVALID, and BOUNDARY each have either a relevant test card or N/A with a reason.",
      activities: [
        {
          id: "day5-four-types",
          kind: "read",
          title: "Test risk types",
          instruction: "Read each type, then decide whether the risk exists in your feature.",
          content: [
            "HAPPY — the intended use.",
            "EMPTY — required input is missing; use N/A when no input is required.",
            "INVALID — a stated value or action rule is violated; use N/A when no such rule exists.",
            "BOUNDARY — the edge of a stated limit; use N/A when the feature has no limit.",
          ],
        },
        {
          id: "day5-four-cards",
          kind: "test-record",
          title: "Write the relevant test cards",
          instruction:
            "HAPPY is required. For each other type, record Feature, Action or Input, and Expected—or N/A with a reason. Do not run it yet.",
          items: [
            "HAPPY",
            "EMPTY or N/A + reason",
            "INVALID or N/A + reason",
            "BOUNDARY or N/A + reason",
          ],
          expected: [
            "Feature",
            "Action or Input",
            "Expected visible result",
          ],
          minimum: 4,
        },
        {
          id: "day5-card-check",
          kind: "checklist",
          title: "Check the cards",
          instruction: "Check the quality of the tests and N/A decisions.",
          items: [
            "The HAPPY card checks a MUST feature.",
            "Every relevant card has an action or input.",
            "Every Expected result can be seen or compared.",
            "Every N/A names why that risk does not exist in this feature.",
            "No card says only “It works.”",
          ],
          minimum: 5,
        },
      ],
    },
    {
      id: "day5-peer-test-rounds",
      start: "00:30",
      end: "01:00",
      minutes: 30,
      phase: "WATCH",
      title: "Two peer-test rounds",
      goal: "Watch a peer use the project and record what really happens.",
      studentBrief: [
        "Maker: watch and do not explain.",
        "Tester: think aloud and use no private data.",
        "Do not fix during the test.",
      ],
      teacherCue: [
        "앞 4분에는 테스터·제작자 규칙과 안전한 샘플 데이터 사용을 시연한다.",
        "다음 12분에는 첫 라운드를 진행하고, 2분 동안 기록을 저장한 뒤 역할과 프로젝트를 바꾼다.",
        "마지막 12분에는 둘째 라운드를 진행한다. 제작자는 키보드나 마우스를 잡지 않고, 취향 대신 멈춤·반복·예상 밖 행동을 기록한다.",
      ],
      completion:
        "Both learners complete one tester role and one maker role, with at least one pass and one clear observation recorded.",
      activities: [
        {
          id: "day5-peer-round-one",
          kind: "peer",
          title: "Peer test — Round 1",
          instruction:
            "The tester uses the cards. The maker watches and records evidence.",
          items: [
            "First action",
            "Pause or repeat",
            "Unexpected action or result",
            "One pass or fail",
          ],
          durationMinutes: 12,
          minimum: 1,
        },
        {
          id: "day5-peer-round-two",
          kind: "peer",
          title: "Peer test — Round 2",
          instruction:
            "Switch roles. Test the other project and record what happened.",
          items: [
            "Action or Input",
            "Expected",
            "Actual",
            "One clear observation",
          ],
          durationMinutes: 12,
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-break",
      start: "01:00",
      end: "01:10",
      minutes: 10,
      phase: "BREAK",
      title: "Break",
      goal: "Rest and return ready to sort the evidence.",
      studentBrief: ["Take a 10-minute break.", "Do not start a fix."],
      teacherCue: [
        "학생이 수정 작업을 시작하지 않게 하고, 반복된 문제와 안전 문제를 빠르게 파악한다.",
      ],
      completion: "The break timer ends and the learner returns at 01:10.",
      activities: [
        {
          id: "day5-break-timer",
          kind: "timer",
          title: "10-minute break",
          instruction: "Pause your work and return when the timer ends.",
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day5-sort-problems",
      start: "01:10",
      end: "01:25",
      minutes: 15,
      phase: "CHECK",
      title: "Sort problems",
      goal: "Turn observations into evidence and choose what matters first.",
      studentBrief: [
        "A new feature is not a bug.",
        "Choose no more than three fixes.",
      ],
      teacherCue: [
        "의견을 Action·Actual·Expected가 포함된 재현 가능한 문장으로 바꾸게 한다.",
        "핵심 행동 차단, 오답, 안전 문제, 발표 차단은 MUST FIX로 분류한다.",
        "새 기능과 큰 재설계는 LATER로 보내고 수정 후보를 최대 세 개로 제한한다.",
      ],
      completion:
        "The learner records evidence for each chosen problem, assigns a priority, and keeps no more than three fixes.",
      activities: [
        {
          id: "day5-problem-evidence",
          kind: "short-answer",
          title: "Write the evidence",
          instruction: "Describe one problem without giving an opinion.",
          prompt:
            "When the tester __________, the project __________. I expected __________.",
          placeholder: "Write one repeatable observation.",
          minimum: 1,
        },
        {
          id: "day5-priority-choice",
          kind: "choice",
          title: "Choose a priority",
          instruction: "Classify the first problem.",
          options: [
            {
              label: "MUST FIX",
              value: "must-fix",
              feedback:
                "Use this for a blocked main action, wrong result, unsafe result, or demo blocker.",
            },
            {
              label: "SHOULD FIX",
              value: "should-fix",
              feedback:
                "Use this when the action is hard but a safe workaround exists.",
            },
            {
              label: "LATER",
              value: "later",
              feedback:
                "Use this for a new feature, large redesign, or unsafe test.",
            },
          ],
        },
        {
          id: "day5-priority-check",
          kind: "checklist",
          title: "Keep the plan small",
          instruction: "Check the problem list.",
          items: [
            "Each problem has evidence.",
            "A new feature is not listed as a bug.",
            "Safety and the main path come first.",
            "I chose no more than three fixes.",
          ],
          minimum: 4,
        },
      ],
    },
    {
      id: "day5-safety-accessibility",
      start: "01:25",
      end: "01:40",
      minutes: 15,
      phase: "CHECK",
      title: "Safety and accessibility",
      goal: "Find an obvious safety or access barrier before fixing.",
      studentBrief: [
        "Check secrets, private data, text, labels, focus, and a narrow window.",
        "Record one issue.",
      ],
      teacherCue: [
        "비밀정보가 보이면 즉시 RED로 전환하고 화면 공유와 추가 입력을 중단시킨다.",
        "완전한 접근성 인증이 아니라 명백한 사용 장벽을 찾는 빠른 점검임을 설명한다.",
        "Tab 이동과 좁은 브라우저 창을 학생이 직접 시험하게 한다.",
      ],
      completion:
        "All safety and quick-access checks are marked, and one observed issue or “no issue found” is recorded.",
      activities: [
        {
          id: "day5-safety-check",
          kind: "checklist",
          title: "Safety check",
          instruction: "Check the current project.",
          items: [
            "No password, API key, or secret is visible.",
            "No sensitive personal data is stored or shown.",
            "Important facts or numbers were checked.",
            "Every external link or library is understood.",
            "The project does not ask a user to pay or sign in.",
          ],
          minimum: 5,
        },
        {
          id: "day5-access-check",
          kind: "checklist",
          title: "Quick access check",
          instruction: "Use the keyboard and a narrow browser window.",
          items: [
            "The page has a clear title.",
            "Buttons say what they do.",
            "Text is readable.",
            "Tab reaches the main controls.",
            "I can identify the focused control while using Tab.",
            "Every input has a visible label, or this project has no input.",
            "The main path works in a narrow window.",
          ],
          minimum: 7,
        },
        {
          id: "day5-access-issue",
          kind: "short-answer",
          title: "Record one result",
          instruction: "Write one issue. If none was found, say what you tested.",
          placeholder: "I tested… I found…",
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-approve-fix-plan",
      start: "01:40",
      end: "01:50",
      minutes: 10,
      phase: "FIX",
      title: "Review the fix plan",
      goal: "Use self-check and peer-check to make one small fix READY or identify one Yellow mismatch.",
      studentBrief: [
        "Start with a MUST FIX item.",
        "One problem, one small change, one success check.",
        "Self-check, then peer-check the same gate. Use Yellow only for a mismatch or help request.",
      ],
      teacherCue: [
        "전원 강사 승인 줄을 만들지 않는다. 학생이 같은 기준으로 자가검수한 뒤 짝이 다시 검수하게 한다.",
        "자가검수와 짝검수가 모두 통과하면 READY로 표시한다. 불일치나 도움 요청은 Yellow로 표시하고 강사는 그 항목만 확인한다.",
        "READY 또는 Yellow 불일치 해결 전에는 AI 변경 요청을 보내지 않게 하며, 강사는 학생의 프로젝트 선택을 대신 쓰지 않는다.",
      ],
      completion:
        "The first fix has Problem, Evidence, Small fix, Success means, and Must keep working; the learner completes the same self/peer gate and either marks READY or resolves one Yellow mismatch with focused teacher help.",
      activities: [
        {
          id: "day5-fix-plan",
          kind: "short-answer",
          title: "Write Fix 1",
          instruction: "Write the first small fix plan.",
          prompt:
            "Problem:\nEvidence:\nPriority:\nSmall fix:\nSuccess means:\nMust keep working:",
          placeholder: "Complete every line.",
          minimum: 1,
        },
        {
          id: "day5-fix-approval",
          kind: "checklist",
          title: "Self → peer → Yellow gate",
          instruction:
            "Self-check the five plan criteria, then have a partner repeat them. If both agree, mark READY; if one item differs or needs help, mark Yellow and show only that item to the teacher.",
          items: [
            "MUST FIX comes first.",
            "The change is small.",
            "Success can be tested.",
            "One working MUST path is named for regression.",
            "No large new feature is added.",
            "My partner repeated the same five checks.",
            "Both checks agree, or I marked the mismatched item Yellow for focused teacher help.",
          ],
          minimum: 7,
        },
      ],
    },
    {
      id: "day5-project-studio",
      start: "01:50",
      end: "02:45",
      minutes: 55,
      phase: "STUDIO",
      title: "Project Studio",
      goal: "Fix one reviewed READY problem at a time, re-test, and save only working code.",
      studentBrief: [
        "Fix one problem.",
        "Test the failed path and the main HAPPY path.",
        "Save only after the tests pass.",
      ],
      teacherCue: [
        "학생이 검수한 READY Fix 1부터 시작하고 한 번에 하나의 변경만 요청하게 한다.",
        "수정 뒤 실패했던 테스트와 핵심 HAPPY 경로를 모두 다시 실행하게 한다.",
        "RED 상태에서는 새 프롬프트를 멈추고 마지막 작동 Save Point로 복구하게 한다.",
      ],
      completion:
        "At least the first reviewed READY fix passes its failed test, the main HAPPY path and named MUST paths still pass, and a working Save Point is recorded.",
      activities: [
        {
          id: "day5-fix-prompt",
          kind: "prompt",
          title: "Fix one problem",
          instruction:
            "Complete this request for one reviewed READY problem. Read it before you send it.",
          prompt:
            "Problem:\n[write the problem]\n\nEvidence:\n[write what happened]\n\nExpected:\n[write the result you need]\n\nPlease fix only this problem.\nKeep every working MUST feature working.\nDo not add a new feature, library, login, API, or file unless I approve it.\nAfter the change, tell me what I should test again.",
        },
        {
          id: "day5-fix-record",
          kind: "test-record",
          title: "Test after the fix",
          instruction: "Record all five results after each reviewed READY fix.",
          items: [
            "Failed test before",
            "Actual result after",
            "Main HAPPY re-test",
            "Other MUST paths",
            "Save Point",
          ],
          expected: [
            "The failed test passes.",
            "The main path still works.",
            "No private or secret data appears.",
          ],
          minimum: 5,
        },
        {
          id: "day5-studio-timer",
          kind: "timer",
          title: "50-minute fix window",
          instruction:
            "Repeat CHECK → FIX → CHECK → SAVE. Use the remaining time to close the record and stop before the final smoke test.",
          durationMinutes: 50,
        },
      ],
    },
    {
      id: "day5-backup-demo",
      start: "02:45",
      end: "03:00",
      minutes: 15,
      phase: "SAVE",
      title: "Backup and demo path",
      goal: "Verify the release candidate and record the Day 6 demo path.",
      studentBrief: [
        "Run one final smoke test.",
        "Open and test the release candidate copy.",
        "Write the exact demo path.",
      ],
      teacherCue: [
        "앞 5분에는 활성 프로젝트에서 최종 smoke test 다섯 항목을 기록하게 한다.",
        "다음 5분에는 단일 파일은 day5-release-candidate.html, 다중 파일은 my-app-day5-release-candidate로 복사하고 복사본을 직접 연다.",
        "마지막 5분에는 복사본에서 핵심 경로를 다시 통과하고 Open·Click or enter·Show·Stop 데모 경로를 저장하게 한다.",
      ],
      completion:
        "The verified release candidate opens and passes the smoke test, and an exact open–act–show demo path is saved.",
      activities: [
        {
          id: "day5-smoke-test",
          kind: "test-record",
          title: "Final smoke test",
          instruction: "Run the project from the beginning.",
          items: [
            "Open the project",
            "Run the main demo path",
            "Refresh and verify the project's stated storage behavior, then run the main path again",
            "Check for private or secret data",
            "Check for a blocking error",
          ],
          expected: [
            "The first screen appears.",
            "The main result appears.",
            "After refresh, stored or reset state matches the project promise and the main path can run again.",
            "No private or secret data appears.",
            "No blocking error appears.",
          ],
          minimum: 5,
        },
        {
          id: "day5-release-copy",
          kind: "checklist",
          title: "Make the release candidate",
          instruction: "Copy, open, and test the correct release candidate.",
          items: [
            "For one file, make my-app/day5-release-candidate.html.",
            "For many files, copy the project as my-app-day5-release-candidate.",
            "Open the release candidate copy.",
            "Run the smoke test on the copy.",
          ],
          minimum: 4,
        },
        {
          id: "day5-demo-path",
          kind: "short-answer",
          title: "Draft the demo path",
          instruction: "Write only the actions and visible result.",
          prompt: "Open:\nClick or enter:\nShow:\nStop:",
          placeholder: "Write the exact path for Day 6.",
          minimum: 1,
        },
      ],
    },
  ],
};

export const day6Plan: InteractiveDayPlan = {
  day: 6,
  title: "Ship, Showcase, Reflect",
  question: "How can you explain your result and your AI collaboration responsibly?",
  artifact: "A final backup, a two-minute demo, feedback, and reflection",
  stages: [
    {
      id: "day6-final-readiness",
      start: "00:00",
      end: "00:20",
      minutes: 20,
      phase: "CHECK",
      title: "Final readiness",
      goal: "Choose the working version and test the full demo path.",
      studentBrief: [
        "Choose the version that works, not only the newest one.",
        "Run the full path twice.",
        "Use TELL → WATCH → CHECK → FIX → SAVE.",
      ],
      teacherCue: [
        "Day 5 발표 후보와 현재 프로젝트를 비교하고 실제 작동하는 버전을 고르게 한다.",
        "처음부터 데모 경로를 실행하고 새로고침 뒤 한 번 더 실행하게 한다.",
        "GREEN은 대본 작성, YELLOW는 한 개의 승인된 blocker, RED는 마지막 작동본 복구로 보낸다.",
      ],
      completion:
        "The learner records the exact version, runs the full demo path twice, and updates the side signal with evidence.",
      activities: [
        {
          id: "day6-version-choice",
          kind: "short-answer",
          title: "Choose the working version",
          instruction:
            "Open the Day 5 release candidate and the current project. Record the version you will test first.",
          prompt: "File or folder:\nWhy this version:",
          placeholder: "Choose it because it works.",
          minimum: 1,
        },
        {
          id: "day6-readiness-test",
          kind: "test-record",
          title: "Run the full path",
          instruction:
            "Test from a known start, refresh and compare the result with the project's stated storage behavior, then run the path with a second safe sample.",
          items: [
            "Open the project",
            "Run the demo path with Sample A or another safe sample",
            "Refresh and compare stored or reset state with the project promise",
            "Run the path with Sample B or a different safe sample",
            "Check for private or secret data",
            "Confirm the final file or folder",
          ],
          expected: [
            "The first screen appears.",
            "The MUST results appear.",
            "After refresh, the state matches the project's promise.",
            "The second sample produces the expected result without a false duplicate.",
            "No private or secret data appears.",
            "The exact version is known.",
          ],
          minimum: 6,
        },
      ],
    },
    {
      id: "day6-last-blocker",
      start: "00:20",
      end: "00:40",
      minutes: 20,
      phase: "FIX",
      title: "Last blocker fix",
      goal: "Fix only one repeatable demo blocker or restore the last working version.",
      studentBrief: [
        "No new feature.",
        "Fix only a repeatable demo blocker.",
        "If the fix fails, restore the Day 5 candidate.",
      ],
      teacherCue: [
        "반복 가능하고 데모를 막으며 새 기능이 아니고 작은 변경으로 시험 가능한 문제만 승인한다.",
        "GREEN 학생은 코드를 바꾸지 않고 대본을 정리하게 한다.",
        "20분 안에 통과하지 못하면 더 새 버전을 고집하지 말고 Day 5 발표 후보로 복구하게 한다.",
      ],
      completion:
        "The learner either records “READY — NO CHANGE” or re-tests one approved blocker and chooses a working version to freeze.",
      activities: [
        {
          id: "day6-blocker-gate",
          kind: "choice",
          title: "Use the blocker gate",
          instruction: "Choose the safe next action.",
          options: [
            {
              label: "READY — no code change",
              value: "no-change",
              feedback: "Keep the working version. Prepare the demo.",
            },
            {
              label: "One repeatable demo blocker — ask for approval",
              value: "approve-fix",
              feedback:
                "The problem must block the demo and fit one small testable change.",
            },
            {
              label: "Main path fails — restore the Day 5 candidate",
              value: "restore",
              feedback: "A working older version is safer than a broken newer one.",
            },
          ],
        },
        {
          id: "day6-blocker-prompt",
          kind: "prompt",
          optional: true,
          title: "Fix only the blocker",
          instruction:
            "Use this only after teacher approval. If you are ready, do not send it.",
          prompt:
            "This is the final blocker before my demo.\n\nAction:\n[write the action]\n\nActual:\n[write what happened]\n\nExpected:\n[write what must happen]\n\nFix only this blocker.\nDo not add a new feature, library, API, login, or file.\nKeep every working MUST feature unchanged.\nAfter the change, tell me the exact demo path to re-test.",
        },
        {
          id: "day6-blocker-retest",
          kind: "test-record",
          title: "Re-test or restore",
          instruction:
            "Run the blocker test and the full demo path. If it fails, restore the Day 5 candidate.",
          content: [
            "Blocker test or no-change decision",
            "Full demo path",
            "Refresh and repeat",
            "Version to freeze",
          ],
          expected: [
            "The chosen version completes the full demo path.",
            "No new feature was added.",
          ],
          minimum: 4,
        },
      ],
    },
    {
      id: "day6-code-freeze",
      start: "00:40",
      end: "00:50",
      minutes: 10,
      phase: "SAVE",
      title: "Code Freeze",
      goal: "Stop code changes and verify the final backup.",
      studentBrief: [
        "No new AI change request after freeze.",
        "Open and test the final backup.",
        "Write new ideas as a Next Step.",
      ],
      teacherCue: [
        "전체가 Code Freeze 규칙을 확인한 뒤 코드 변경을 멈추게 한다.",
        "단일 파일은 day6-final.html, 다중 파일은 my-app-day6-final로 복사하게 한다.",
        "파일 존재가 아니라 복사본에서 데모 경로가 통과하는 것을 완료 기준으로 삼는다.",
      ],
      completion:
        "Code Freeze is confirmed, the exact final backup opens, and its full demo path passes.",
      activities: [
        {
          id: "day6-freeze-rules",
          kind: "read",
          title: "Code Freeze",
          instruction: "Read the freeze rules before you make the final copy.",
          content: [
            "No new AI change request.",
            "No new feature.",
            "No redesign.",
            "Write every new idea as a Next Step.",
          ],
        },
        {
          id: "day6-final-copy",
          kind: "checklist",
          title: "Make the final backup",
          instruction: "Copy and open the final version.",
          items: [
            "I created the final backup: my-app/day6-final.html for a one-file project, or my-app-day6-final for a multi-file project.",
            "I opened the final backup.",
            "The full demo path passes in the final backup.",
            "The Day 5 candidate and Day 5 test record are easy to locate.",
          ],
          minimum: 4,
        },
        {
          id: "day6-final-record",
          kind: "test-record",
          title: "Verify the frozen version",
          instruction: "Record the exact backup and its result.",
          content: [
            "Final file or folder",
            "Open result",
            "Demo path result",
            "Final status",
          ],
          expected: ["The final backup opens and the demo path works."],
          minimum: 4,
        },
      ],
    },
    {
      id: "day6-break",
      start: "00:50",
      end: "01:00",
      minutes: 10,
      phase: "BREAK",
      title: "Break",
      goal: "Rest and prepare a private, clean presentation screen.",
      studentBrief: [
        "Take a 10-minute break.",
        "Close private tabs and notifications.",
      ],
      teacherCue: [
        "발표 순서, 케이블, 브라우저, 타이머를 최종 확인하고 첫 발표자를 준비시킨다.",
      ],
      completion:
        "The break timer ends, private tabs are closed, and the learner returns at 01:00.",
      activities: [
        {
          id: "day6-break-timer",
          kind: "timer",
          title: "10-minute break",
          instruction:
            "Close private tabs and notifications. Return when the timer ends.",
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day6-partner-rehearsal",
      start: "01:00",
      end: "01:20",
      minutes: 20,
      phase: "WATCH",
      title: "Partner rehearsal",
      goal: "Rehearse a clear two-minute demo with a partner.",
      studentBrief: [
        "Show User & Problem, Working MUST Features, Test & Learning, and Limit & Next Step.",
        "Use the final backup.",
        "Remove extra clicks and words.",
      ],
      teacherCue: [
        "20초·60초·25초·15초의 네 구간으로 2분 발표를 구성하게 한다.",
        "학생이 긴 대본보다 Open·Click or enter·Show·Stop 경로를 먼저 고정하게 한다.",
        "짝이 실제로 보거나 듣지 못한 부분을 한 가지씩 피드백하게 한다.",
      ],
      completion:
        "Each learner completes one timed rehearsal in two minutes or less, records partner feedback, and saves the final click path.",
      activities: [
        {
          id: "day6-demo-script",
          kind: "short-answer",
          title: "Write the two-minute demo",
          instruction: "Write short notes for the four parts.",
          prompt:
            "0:00–0:20 — User & Problem:\n0:20–1:20 — Working MUST Features:\n1:20–1:45 — Test & Learning:\n1:45–2:00 — Limit & Next Step:\n\nOpen:\nClick or enter:\nShow:\nStop:",
          placeholder: "Use short notes, not a long speech.",
          minimum: 1,
        },
        {
          id: "day6-rehearsal-timer",
          kind: "timer",
          title: "Two-minute rehearsal",
          instruction: "Start the final backup and finish before the timer ends.",
          durationMinutes: 2,
        },
        {
          id: "day6-partner-feedback",
          kind: "peer",
          title: "Partner check",
          instruction: "Give short feedback, then switch roles.",
          items: [
            "The clearest part",
            "One click or sentence to remove",
            "One part I could not see or hear",
          ],
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-showcase",
      start: "01:20",
      end: "02:40",
      minutes: 80,
      phase: "SHARE",
      title: "Showcase",
      goal: "Show working evidence in a fair, timed presentation slot.",
      studentBrief: [
        "2 minutes: demo.",
        "1 minute: question or feedback.",
        "1 minute: switch.",
        "Start from the final backup, show evidence, and respect the next presenter.",
      ],
      teacherCue: [
        "발표자마다 2분 데모, 1분 질문 또는 피드백, 1분 전환을 동일하게 적용한다.",
        "발표 시작·동기화에 8분을 두고, 조당 발표 창은 72분이다. N명이면 G = ceil(N ÷ 18)개 조로 나누며, 1–18명은 1개 조, 19–36명은 2개 조, 37–54명은 3개 조다.",
        "각 조에 진행 담당, 시간 담당, 증거 기록 담당을 지정한다. 8분에 전 조가 1번 슬롯을 시작하고 80분에 발표·대체·결석 인원을 합산해 보고한다.",
        "발표는 Final 백업에서 시작한다. 실행 실패 시 알려진 시작 상태에서 한 번만 재시도한 뒤 Day 5 후보, Day 5 테스트 기록 순으로 전환한다. 테스트 기록만 보일 때는 과거 통과를 증명할 뿐 현재 라이브 동작은 증명하지 못한다고 밝힌다.",
      ],
      completion:
        "The learner starts from the final backup, completes the scheduled demo or makes one controlled retry before using the Day 5 candidate and then the Day 5 test record, and the audience records what the evidence actually proves.",
      activities: [
        {
          id: "day6-showcase-timer",
          kind: "timer",
          title: "Four-minute showcase slot",
          instruction:
            "Repeat this timer for each presenter: 2:00 demo, 1:00 feedback, 1:00 switch.",
          content: ["DEMO — 2:00", "FEEDBACK — 1:00", "SWITCH — 1:00"],
          durationMinutes: 4,
        },
        {
          id: "day6-showcase-record",
          kind: "peer",
          title: "Show the evidence",
          instruction:
            "Present your final build. As an audience member, record what you saw.",
          items: [
            "User and problem",
            "Working result",
            "Test and learning",
            "Limit and next step",
          ],
          minimum: 4,
        },
      ],
    },
    {
      id: "day6-peer-feedback",
      start: "02:40",
      end: "02:50",
      minutes: 10,
      phase: "SHARE",
      title: "Peer feedback",
      goal: "Give two specific feedback notes based on what you saw or heard.",
      studentBrief: [
        "Write what you saw.",
        "Do not judge English, project topic, or visual taste.",
      ],
      teacherCue: [
        "서로 다른 발표 두 개에 대해 실제 관찰, 명확한 결정, 질문을 기록하게 한다.",
        "영어 유창성, 주제 취향, 화려함에 대한 평가는 받지 않는다.",
        "두 피드백 카드를 발표자에게 전달하게 한다.",
      ],
      completion:
        "Two feedback records each contain I saw, One clear decision, and One question, and both are delivered.",
      activities: [
        {
          id: "day6-feedback-one",
          kind: "peer",
          title: "Feedback 1",
          instruction: "Write specific feedback for one presenter.",
          items: ["I saw", "One clear decision", "One question"],
          minimum: 3,
        },
        {
          id: "day6-feedback-two",
          kind: "peer",
          title: "Feedback 2",
          instruction: "Write specific feedback for a different presenter.",
          items: ["I saw", "One clear decision", "One question"],
          minimum: 3,
        },
      ],
    },
    {
      id: "day6-reflection-close",
      start: "02:50",
      end: "03:00",
      minutes: 10,
      phase: "SAVE",
      title: "Reflection and close",
      goal: "Explain one decision, one AI check, and one next learning habit.",
      studentBrief: [
        "Name what you decided.",
        "Name what you checked or changed.",
        "Save the final handoff.",
      ],
      teacherCue: [
        "화려한 결과보다 학생의 판단, 검증, 복구 행동을 구체적으로 쓰게 한다.",
        "AI의 역할과 학생의 책임을 구분한 마지막 문장을 완성하게 한다.",
        "최종 백업, 테스트 증거, 대본, 피드백, 회고의 위치를 확인하게 한다.",
      ],
      completion:
        "The reflection and responsibility statement are complete, and the learner confirms the final handoff files.",
      activities: [
        {
          id: "day6-reflection",
          kind: "short-answer",
          title: "Reflect on the build",
          instruction: "Answer with short, honest notes.",
          prompt:
            "One important decision I made:\nOne AI result I checked or changed:\nOne recovery method that helped:\nOne habit for my next project:\nOne thing I want to learn next:",
          placeholder: "Write your own evidence.",
          minimum: 1,
        },
        {
          id: "day6-responsibility",
          kind: "short-answer",
          title: "Name the responsibility",
          instruction: "Complete the final statement.",
          prompt:
            "AI helped me __________, and I was responsible for __________.",
          placeholder: "Name both roles.",
          minimum: 1,
        },
        {
          id: "day6-handoff-check",
          kind: "checklist",
          title: "Final handoff",
          instruction: "Confirm the files and records you will keep.",
          items: [
            "Final working file or folder",
            "Final backup",
            "Project Brief",
            "Test cards",
            "Useful prompts",
            "Two-minute demo script",
            "Feedback and reflection",
          ],
          minimum: 7,
        },
      ],
    },
  ],
};
