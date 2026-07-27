import type { Language } from "@/lib/language";

const day1Ko: Record<string, string> = {
  "AI and Your First Prototype": "AI와 첫 프로토타입",
  "What should a person decide and check when AI writes the code?":
    "AI가 코드를 작성할 때 사람은 무엇을 결정하고 확인해야 할까요?",
  "A tested first page and two safe changes":
    "테스트를 마친 첫 페이지와 안전한 변경 두 가지",
  "Welcome and readiness": "환영 및 준비 확인",
  "Start with a ready tool, folder, and safety signal.":
    "도구와 폴더를 준비하고 안전 상태를 알리는 것부터 시작합니다.",
  "Get your computer and coding tool ready.":
    "컴퓨터와 코딩 도구를 준비하세요.",
  "Use the side signal to show Green, Yellow, or Red.":
    "옆의 상태 신호에서 초록색, 노란색, 빨간색으로 현재 상태를 알려 주세요.",
  "The required tool and folder are open, and every learner shows their current status with the side signal.":
    "필요한 도구와 폴더가 열려 있고, 모든 학습자가 옆 상태 신호로 현재 상태를 알립니다.",
  "Ready to begin": "시작 준비",
  "Check each item you can confirm now.":
    "지금 확인할 수 있는 항목을 모두 체크하세요.",
  "My computer is on.": "컴퓨터가 켜져 있습니다.",
  "My coding tool opens.": "코딩 도구가 실행됩니다.",
  "I have a folder named day1-first-build.":
    "day1-first-build라는 폴더가 있습니다.",
  "I will not enter a secret key or private information on this page.":
    "이 페이지에 비밀 키나 개인정보를 입력하지 않겠습니다.",
  "Show your status": "현재 상태 알리기",
  "Choose the signal that is true now.":
    "지금 내 상태에 맞는 신호를 선택하세요.",
  "Green — I am ready.": "초록색 — 준비되었습니다.",
  "Yellow — I can continue with help.":
    "노란색 — 도움을 받으면 계속할 수 있습니다.",
  "Red — I cannot start yet.": "빨간색 — 아직 시작할 수 없습니다.",
  "Live build demo": "실시간 제작 시연",
  "Notice the decisions around AI-generated code.":
    "AI가 생성한 코드를 다루면서 사람이 내리는 결정에 주목하세요.",
  "Watch the full TELL → WATCH → CHECK → FIX → SAVE loop.":
    "TELL → WATCH → CHECK → FIX → SAVE 전체 과정을 지켜보세요.",
  "Record what the person does, not only what AI does.":
    "AI가 한 일뿐 아니라 사람이 한 일도 기록하세요.",
  "The learner records the human goal, test evidence, decision, and one claim that still needs testing.":
    "학습자가 사람의 목표, 테스트 증거, 결정, 아직 검증이 필요한 주장 하나를 기록합니다.",
  "Recover the decisions from the demo": "시연 속 판단 구조 복원하기",
  "Record the goal, the test evidence, and the decision made after the test.":
    "목표, 테스트 증거, 테스트 후 내린 결정을 기록하세요.",
  "Human goal": "사람이 세운 목표",
  "Test action and observed evidence": "테스트 행동과 관찰한 증거",
  "Human decision after the test": "테스트 후 사람이 내린 결정",
  "Challenge one untested claim": "검증되지 않은 주장 하나 찾기",
  "Write one statement from the demo that would still need a real test before you trust it.":
    "시연에서 들은 말 중 믿기 전에 실제 테스트가 더 필요한 문장 하나를 적으세요.",
  "The claim was... I would test it by...":
    "그 주장은... 나는 다음 방법으로 테스트하겠습니다...",
  "Watch for the loop": "제작 루프 관찰하기",
  "Mark each step when you see it in the demo.":
    "시연에서 각 단계를 볼 때마다 표시하세요.",
  TELL: "TELL",
  WATCH: "WATCH",
  CHECK: "CHECK",
  FIX: "FIX",
  SAVE: "SAVE",
  "Name one human decision": "사람이 내린 결정 한 가지 쓰기",
  "Write one choice the person made during the demo.":
    "시연 중 사람이 선택한 것 한 가지를 적으세요.",
  "The person decided to...": "사람은 다음과 같이 결정했습니다...",
  "The human role": "사람의 역할",
  "Separate AI drafting from human responsibility.":
    "AI의 초안 작성과 사람의 책임을 구분하세요.",
  "AI can draft code.": "AI는 코드 초안을 만들 수 있습니다.",
  "A person owns the goal, evidence, and decision to keep the result.":
    "목표와 증거, 결과물을 유지할지에 대한 결정은 사람의 책임입니다.",
  "The learner answers both responsibility choices and writes one testable success statement.":
    "학습자가 책임에 관한 두 문제에 답하고 테스트 가능한 성공 기준을 한 문장으로 씁니다.",
  "Who owns the decision?": "누가 결정할 책임이 있을까요?",
  "Choose the best answer.": "가장 알맞은 답을 고르세요.",
  "AI says the page is finished. Who decides if it really works?":
    "AI가 페이지를 완성했다고 말합니다. 실제로 작동하는지는 누가 결정할까요?",
  "The person, after a real test": "직접 테스트한 사람",
  "Correct. A claim is not evidence.": "맞습니다. 주장은 증거가 아닙니다.",
  "AI, because it wrote the code": "코드를 작성한 AI",
  "Try again. The person must test the result.":
    "다시 생각해 보세요. 결과는 사람이 직접 테스트해야 합니다.",
  "No one needs to check": "아무도 확인할 필요가 없음",
  "Try again. Working code needs observable evidence.":
    "다시 생각해 보세요. 코드가 작동한다는 사실은 직접 관찰할 수 있는 증거로 확인해야 합니다.",
  "Make success visible": "성공 기준을 눈에 보이게 만들기",
  "Finish the sentence with something you can see or do.":
    "직접 보거나 해 볼 수 있는 내용으로 문장을 완성하세요.",
  "Success means...": "성공이란...",
  "Success means I can...": "성공했다면 나는 ...할 수 있습니다.",
  "Safety promise": "안전 약속",
  "Replace unsafe habits with clear classroom rules.":
    "안전하지 않은 습관을 명확한 수업 규칙으로 바꾸세요.",
  "Protect secret keys and private information.":
    "비밀 키와 개인정보를 보호하세요.",
  "Stop and ask when a request changes more than expected.":
    "요청보다 더 많은 내용이 변경되면 멈추고 질문하세요.",
  "The learner checks all safety promises and corrects the unsafe choice.":
    "학습자가 모든 안전 약속을 확인하고 안전하지 않은 선택을 바로잡습니다.",
  "My safety promise": "나의 안전 약속",
  "Check each promise.": "약속을 하나씩 확인하세요.",
  "I will not paste a secret key into a page or chat message.":
    "페이지나 채팅 메시지에 비밀 키를 붙여넣지 않겠습니다.",
  "I will not add real personal information.":
    "실제 개인정보를 넣지 않겠습니다.",
  "I will read the plan before files change.":
    "파일이 변경되기 전에 계획을 읽겠습니다.",
  "I will stop when AI changes more than I asked.":
    "AI가 요청보다 더 많은 내용을 변경하면 멈추겠습니다.",
  "Fix the unsafe action": "안전하지 않은 행동 바로잡기",
  "Choose the safe next action.": "다음에 할 안전한 행동을 고르세요.",
  "A secret key appears in a message.":
    "메시지에 비밀 키가 나타났습니다.",
  "Stop, hide it, and ask the teacher": "멈추고 키를 가린 뒤 강사에게 질문하기",
  "Correct. Do not continue or share it.":
    "맞습니다. 계속 진행하거나 키를 공유하지 마세요.",
  "Copy it into the class page": "수업 페이지에 복사하기",
  "Unsafe. A secret key must not be exposed.":
    "안전하지 않습니다. 비밀 키가 노출되어서는 안 됩니다.",
  "Send it to a partner": "짝에게 보내기",
  "Unsafe. Do not share secret keys.":
    "안전하지 않습니다. 비밀 키를 공유하지 마세요.",
  Break: "휴식",
  "Rest and return ready for the build.":
    "쉬고 나서 다시 제작할 준비를 하세요.",
  "Take a break.": "잠시 쉬세요.",
  "Return when the timer ends.": "타이머가 끝나면 돌아오세요.",
  "The break timer reaches zero and the learner returns to the workspace.":
    "휴식 타이머가 0이 되면 학습자가 작업 자리로 돌아옵니다.",
  "Break timer": "휴식 타이머",
  "Pause your work and return when time is up.":
    "작업을 멈추고 시간이 끝나면 돌아오세요.",
  "Tools and files": "도구와 파일",
  "Know the folder, working file, browser, and Save Point.":
    "폴더, 작업 파일, 브라우저, 저장 지점의 역할을 알아봅니다.",
  "Work only in day1-first-build.":
    "day1-first-build 폴더 안에서만 작업하세요.",
  "Use index.html as the working file.":
    "index.html을 작업 파일로 사용하세요.",
  "The learner matches all four tools to their roles and confirms the correct folder.":
    "학습자가 네 가지 도구와 역할을 연결하고 올바른 폴더를 확인합니다.",
  "Four roles": "네 가지 역할",
  "Read each role before building.": "제작하기 전에 각 역할을 읽으세요.",
  "Folder: keeps this lab together.": "폴더: 이번 실습 파일을 한곳에 모읍니다.",
  "AI coding tool: drafts and changes code.":
    "AI 코딩 도구: 코드를 작성하고 변경합니다.",
  "index.html: the working page.": "index.html: 현재 작업하는 페이지입니다.",
  "Browser: gives real test evidence.":
    "브라우저: 실제 테스트 증거를 보여 줍니다.",
  "Confirm the location": "작업 위치 확인하기",
  "Check the folder and file rules.": "폴더와 파일 규칙을 확인하세요.",
  "I am inside day1-first-build.": "day1-first-build 폴더 안에 있습니다.",
  "I will work in index.html.": "index.html에서 작업하겠습니다.",
  "I will open the file in a browser to test it.":
    "파일을 브라우저에서 열어 테스트하겠습니다.",
  "Guided first build": "첫 제작 따라 하기",
  "Build the shared page with one clear, bounded request.":
    "범위가 분명한 요청 하나로 공통 페이지를 만드세요.",
  "Send one request for the common page.":
    "공통 페이지를 만드는 요청 하나를 보내세요.",
  "Read the plan before any file change.":
    "파일이 변경되기 전에 계획을 읽으세요.",
  "index.html opens with the required text, card, button, and click message.":
    "index.html을 열었을 때 필수 문구, 카드, 버튼, 클릭 메시지가 모두 보입니다.",
  "TELL the first build": "첫 제작을 TELL하기",
  "Use this request in the coding tool.":
    "이 요청을 코딩 도구에서 사용하세요.",
  "Create one file named index.html.": "index.html 파일 하나를 만드세요.",
  "Use the title \"My First Build\".":
    "제목은 \"My First Build\"로 하세요.",
  "Show: \"I am learning to build, test, and improve with AI.\"":
    "\"I am learning to build, test, and improve with AI.\" 문장을 표시하세요.",
  "Add a card titled \"Human in Control\".":
    "\"Human in Control\"이라는 제목의 카드를 추가하세요.",
  "In the card show: \"AI can draft. I choose the goal and check the result.\"":
    "카드 안에 \"AI can draft. I choose the goal and check the result.\" 문장을 표시하세요.",
  "Add a button labeled \"Test the page\".":
    "\"Test the page\"라는 버튼을 추가하세요.",
  "On click show: \"The button works!\"":
    "버튼을 클릭하면 \"The button works!\"를 표시하세요.",
  "Use large readable text, one file, and no external library or personal information.":
    "읽기 쉬운 큰 글자를 사용하고, 파일은 하나만 만들며, 외부 라이브러리나 개인정보는 넣지 마세요.",
  "Before changing a file, show a short two-step plan.":
    "파일을 변경하기 전에 짧은 2단계 계획을 보여 주세요.",
  "WATCH the plan": "계획을 WATCH하기",
  "Check the plan before you allow the change.":
    "변경을 허용하기 전에 계획을 확인하세요.",
  "The plan uses only index.html.": "계획에서 index.html만 사용합니다.",
  "The plan keeps the exact words and button action.":
    "계획에서 정해진 문구와 버튼 동작을 그대로 유지합니다.",
  "The plan adds no library or personal information.":
    "계획에 라이브러리나 개인정보가 추가되지 않습니다.",
  "Open the result": "결과물 열기",
  "Open index.html and check the visible result.":
    "index.html을 열고 화면에 보이는 결과를 확인하세요.",
  "The title and card are visible.": "제목과 카드가 보입니다.",
  "The text is easy to read.": "글자를 읽기 쉽습니다.",
  "The button shows \"The button works!\"":
    "버튼을 누르면 \"The button works!\"가 표시됩니다.",
  "CHECK, FIX, SAVE": "CHECK, FIX, SAVE",
  "Use evidence, repair only one problem, and keep a working copy.":
    "증거를 바탕으로 문제 하나만 수정하고 작동하는 사본을 보관하세요.",
  "Test before you claim success.":
    "성공했다고 말하기 전에 직접 테스트하세요.",
  "Fix one observed problem, then save a working copy.":
    "직접 확인한 문제 하나를 수정한 뒤 작동하는 사본을 저장하세요.",
  "The learner records three test results and opens a working day1-base.html.":
    "학습자가 테스트 결과 세 가지를 기록하고 작동하는 day1-base.html을 엽니다.",
  "CHECK the page": "페이지를 CHECK하기",
  "Run each action and record Expected and Actual.":
    "각 동작을 실행하고 예상 결과와 실제 결과를 기록하세요.",
  "Open index.html — title and card are visible.":
    "index.html 열기 — 제목과 카드가 보입니다.",
  "Click \"Test the page\" — \"The button works!\" appears.":
    "\"Test the page\" 클릭 — \"The button works!\"가 나타납니다.",
  "Refresh — the page opens and the button works again.":
    "새로고침 — 페이지가 열리고 버튼이 다시 작동합니다.",
  "Every action has an Actual result.":
    "모든 동작에 실제 결과가 기록되어 있습니다.",
  "Every passing result is based on a real browser action.":
    "통과한 모든 결과는 브라우저에서 직접 실행한 동작을 근거로 합니다.",
  "FIX one observed problem": "직접 확인한 문제 하나를 FIX하기",
  "Use this only if a test fails. Fill all three parts.":
    "테스트가 실패했을 때만 사용하세요. 세 부분을 모두 작성하세요.",
  "Action: [what I did]": "동작: [내가 한 일]",
  "Expected: [what should happen]": "예상 결과: [일어나야 하는 일]",
  "Actual: [what happened]": "실제 결과: [실제로 일어난 일]",
  "Fix only this problem in index.html. Keep working parts the same. Tell me what changed.":
    "index.html에서 이 문제만 수정하세요. 작동하던 부분은 그대로 유지하세요. 무엇을 변경했는지 알려 주세요.",
  "SAVE the base": "기본본을 SAVE하기",
  "After all tests pass, create and verify day1-base.html.":
    "모든 테스트를 통과한 뒤 day1-base.html을 만들고 확인하세요.",
  "index.html passes the tests.": "index.html이 테스트를 통과합니다.",
  "day1-base.html exists.": "day1-base.html 파일이 있습니다.",
  "day1-base.html opens.": "day1-base.html이 열립니다.",
  "Its button works.": "그 안의 버튼이 작동합니다.",
  "Project Studio": "프로젝트 제작 시간",
  "Make two chosen changes through two small tested loops.":
    "작게 테스트하는 두 번의 루프로 선택한 변경 두 가지를 완성하세요.",
  "Choose two small changes to the common page.":
    "공통 페이지에서 작게 바꿀 내용 두 가지를 고르세요.",
  "Build and test only one change at a time.":
    "한 번에 변경 하나만 만들고 테스트하세요.",
  "Two chosen changes pass their tests, the original button still works, and day1-final-save.html opens.":
    "선택한 변경 두 가지가 테스트를 통과하고, 기존 버튼도 계속 작동하며, day1-final-save.html이 열립니다.",
  "Plan two safe changes": "안전한 변경 두 가지 계획하기",
  "For each change, write the goal, success sign, and what must stay the same.":
    "각 변경의 목표, 성공 신호, 그대로 유지할 내용을 적으세요.",
  "Change 1 and Change 2": "변경 1과 변경 2",
  "Goal... Success means... Keep...": "목표... 성공 기준... 유지할 내용...",
  "Run one loop at a time": "한 번에 루프 하나씩 진행하기",
  "Fill this request for one change. Repeat only after the first change passes.":
    "변경 하나를 위한 요청을 작성하세요. 첫 변경이 통과한 뒤에만 반복하세요.",
  "Goal: [one small change]": "목표: [작은 변경 한 가지]",
  "Success means: [what I can see or do]":
    "성공 기준: [내가 보거나 할 수 있는 것]",
  "Keep this the same: [working behavior]":
    "그대로 유지할 것: [현재 작동하는 동작]",
  "Change only this part in index.html. Use no external library or personal information.":
    "index.html에서 이 부분만 변경하세요. 외부 라이브러리나 개인정보는 사용하지 마세요.",
  "First show a short plan. Then make the change.":
    "먼저 짧은 계획을 보여 준 다음 변경하세요.",
  "CHECK, FIX, and SAVE": "CHECK, FIX, SAVE하기",
  "Test after each change. Finish by verifying day1-final-save.html.":
    "변경할 때마다 테스트하세요. 마지막에는 day1-final-save.html을 확인하세요.",
  "Change 1 does what its success statement says.":
    "변경 1이 작성한 성공 기준대로 작동합니다.",
  "Change 2 does what its success statement says.":
    "변경 2가 작성한 성공 기준대로 작동합니다.",
  "The original \"Test the page\" button still works.":
    "기존 \"Test the page\" 버튼이 계속 작동합니다.",
  "No personal information is present.": "개인정보가 들어 있지 않습니다.",
  "day1-final-save.html opens and passes the same tests.":
    "day1-final-save.html이 열리고 같은 테스트를 통과합니다.",
  "Share and exit ticket": "공유 및 마무리 확인",
  "Show evidence and name one human decision.":
    "증거를 보여 주고 사람이 내린 결정 한 가지를 말하세요.",
  "Show one working action to a partner.":
    "짝에게 작동하는 동작 하나를 보여 주세요.",
  "Finish the exit ticket with evidence.":
    "증거를 바탕으로 마무리 질문에 답하세요.",
  "A partner observes one passing action and the learner submits both exit answers.":
    "짝이 통과한 동작 하나를 확인하고 학습자가 마무리 답변 두 개를 제출합니다.",
  "Show one proof": "증거 하나 보여 주기",
  "Let a partner choose one action. Run it and show the result.":
    "짝이 동작 하나를 고르게 하세요. 직접 실행하고 결과를 보여 주세요.",
  "My partner chose the action.": "짝이 동작을 골랐습니다.",
  "I ran the action in day1-final-save.html.":
    "day1-final-save.html에서 그 동작을 실행했습니다.",
  "My partner saw the result.": "짝이 결과를 확인했습니다.",
  "Exit ticket": "마무리 질문",
  "Answer both lines.": "두 문장에 모두 답하세요.",
  "One human decision I made... One check that proved my page worked...":
    "내가 내린 결정 한 가지... 페이지가 작동함을 증명한 확인 한 가지...",
  "I decided... I proved it by...":
    "나는 ...라고 결정했습니다. ...을 통해 증명했습니다.",
  "A tested five-promise first page and two safe changes":
    "다섯 가지 약속을 테스트한 첫 페이지와 안전한 변경 두 가지",
  "AI, after it reports that its own tests passed":
    "자체 테스트가 통과했다고 보고한 AI",
  "Not yet. A tool report is still a claim until the person runs the real browser test.":
    "아직 아닙니다. 사람이 실제 브라우저 테스트를 실행하기 전까지 도구의 보고는 주장일 뿐입니다.",
  "The person, after reading the generated code but without using the page":
    "페이지를 사용하지 않고 생성된 코드만 읽은 사람",
  "Not yet. Reading code does not replace observable browser evidence.":
    "아직 아닙니다. 코드를 읽는 것은 관찰 가능한 브라우저 증거를 대신하지 못합니다.",
  "index.html opens with all five exact promises from the prompt and offline backup.":
    "index.html이 열리고 프롬프트와 오프라인 백업의 정확한 다섯 가지 약속이 모두 보입니다.",
  'The title is exactly "My First Build".':
    '제목이 정확히 "My First Build"입니다.',
  'The message is exactly "I am learning to build, test, and improve with AI."':
    '안내 문장이 정확히 "I am learning to build, test, and improve with AI."입니다.',
  'The "Human in Control" card shows the exact control statement.':
    '"Human in Control" 카드에 정확한 주도권 문장이 보입니다.',
  'The button is labeled "Test the page".':
    '버튼 문구가 "Test the page"입니다.',
  'Clicking it shows "The button works!"':
    '버튼을 누르면 "The button works!"가 나타납니다.',
  "Open index.html — the exact title, message, and Human in Control card are visible.":
    "index.html 열기 — 정확한 제목, 안내 문장, Human in Control 카드가 보입니다.",
  "The learner answers the responsibility choice and writes one testable success statement.":
    "학습자가 책임에 관한 선택 문제에 답하고 테스트 가능한 성공 기준을 한 문장으로 씁니다.",
};

const day2Ko: Record<string, string> = {
  "Clear Requests and Debugging": "명확한 요청과 디버깅",
  "How can a request become testable, and how can a failure become useful evidence?":
    "어떻게 요청을 테스트 가능하게 만들고, 실패를 유용한 증거로 바꿀 수 있을까요?",
  "Prompt Precision Lab, six tests, and a Context Handoff":
    "프롬프트 정밀도 실습, 테스트 여섯 가지, 맥락 인계문",
  "Day 1 review": "1일차 복습",
  "Recover the five-step loop and verify the Day 1 Save Point.":
    "5단계 루프를 다시 떠올리고 1일차 저장 지점을 확인하세요.",
  "Recall the loop without notes.": "노트를 보지 않고 루프를 떠올려 보세요.",
  "Open the Day 1 final Save Point and test it once.":
    "1일차 최종 저장본을 열고 한 번 테스트하세요.",
  "The learner records one passing or failing Day 1 test with Action, Expected, and Actual.":
    "학습자가 행동, 예상, 실제 결과를 포함한 1일차 통과 또는 실패 테스트 하나를 기록합니다.",
  "Recall the loop": "루프 떠올리기",
  "Write the five words in order.": "다섯 단어를 순서대로 쓰세요.",
  "TELL → WATCH → CHECK → FIX → SAVE": "TELL → WATCH → CHECK → FIX → SAVE",
  "Verify, do not edit": "수정하지 말고 확인하기",
  "Open day1-final-save.html and run one button test.":
    "day1-final-save.html을 열고 버튼 테스트를 한 번 실행하세요.",
  "Action: click the original button.": "동작: 기존 버튼을 클릭합니다.",
  "Expected: \"The button works!\" appears.":
    "예상 결과: \"The button works!\"가 나타납니다.",
  "Actual: record what appeared.": "실제 결과: 나타난 내용을 기록합니다.",
  "Vague / clear A–B test": "모호한 요청과 명확한 요청 A/B 테스트",
  "Compare requests by the evidence they make possible.":
    "각 요청으로 어떤 증거를 얻을 수 있는지 비교하세요.",
  "Compare a vague request with a clear request.":
    "모호한 요청과 명확한 요청을 비교하세요.",
  "Judge the goal, limits, and success check.":
    "목표, 제한 조건, 성공 확인 방법을 판단하세요.",
  "The learner selects the testable request and records two pieces of evidence.":
    "학습자가 테스트 가능한 요청을 고르고 근거 두 가지를 기록합니다.",
  "Which request is testable?": "어떤 요청을 테스트할 수 있을까요?",
  "Choose the request that gives a clear check.":
    "확인 방법이 분명한 요청을 고르세요.",
  "A — Make this page better.": "A — 이 페이지를 더 좋게 만들어 주세요.",
  "This has no visible success check or limit.":
    "이 요청에는 눈에 보이는 성공 기준이나 제한 조건이 없습니다.",
  "B — Change one named part, keep one rule, and pass one named test.":
    "B — 지정한 부분 하나를 변경하고, 규칙 하나를 유지하며, 지정한 테스트 하나를 통과하게 해 주세요.",
  "Correct. The change and success evidence are bounded.":
    "맞습니다. 변경 범위와 성공 증거가 명확히 정해져 있습니다.",
  "Record the difference": "차이 기록하기",
  "Write two details that make one request easier to test.":
    "요청을 더 쉽게 테스트하게 해 주는 요소 두 가지를 적으세요.",
  "It names... It keeps... Success means...":
    "지정한 것... 유지할 것... 성공 기준...",
  "The Prompt Frame": "프롬프트 작성 틀",
  "Turn an intention into a bounded, testable request.":
    "하고 싶은 일을 범위가 분명하고 테스트 가능한 요청으로 바꾸세요.",
  "Use Goal, Context, Feature, Rules, Constraints, and Success means.":
    "목표, 맥락, 기능, 규칙, 제한 조건, 성공 기준을 사용하세요.",
  "Write what must not change.": "바뀌면 안 되는 내용도 적으세요.",
  "Every Prompt Frame field is filled and Success means names an observable result.":
    "프롬프트 작성 틀의 모든 칸이 채워지고 성공 기준에 관찰 가능한 결과가 적혀 있습니다.",
  "Read the frame": "작성 틀 읽기",
  "Use every line to control the request.":
    "모든 항목을 사용해 요청의 범위를 조절하세요.",
  "Goal — one result.": "목표 — 결과 하나.",
  "Context — the current page and file.": "맥락 — 현재 페이지와 파일.",
  "Feature — one change.": "기능 — 변경 하나.",
  "Rules — exact behavior.": "규칙 — 정확한 동작.",
  "Constraints — limits and what must stay.":
    "제한 조건 — 범위와 유지해야 할 내용.",
  "Success means — an action and visible result.":
    "성공 기준 — 실행할 동작과 눈에 보이는 결과.",
  "Build a Prompt Frame": "프롬프트 작성 틀 완성하기",
  "Fill every bracket. Do not send it yet.":
    "대괄호를 모두 채우세요. 아직 보내지는 마세요.",
  "Goal: [one result]": "목표: [결과 하나]",
  "Context: [current page and file]": "맥락: [현재 페이지와 파일]",
  "Feature: [one change]": "기능: [변경 하나]",
  "Rules: [exact behavior]": "규칙: [정확한 동작]",
  "Constraints: [limits and what must stay]":
    "제한 조건: [범위와 유지해야 할 내용]",
  "Success means: [action and visible result]":
    "성공 기준: [동작과 눈에 보이는 결과]",
  "Check before sending": "보내기 전에 확인하기",
  "Confirm that another person could test your request.":
    "다른 사람도 내 요청을 테스트할 수 있는지 확인하세요.",
  "The goal is one result.": "목표가 결과 하나로 정해져 있습니다.",
  "The file and limits are named.": "파일과 제한 조건이 명시되어 있습니다.",
  "The rule is exact.": "규칙이 정확합니다.",
  "Success means includes an action and a visible result.":
    "성공 기준에 동작과 눈에 보이는 결과가 포함되어 있습니다.",
  "Context management": "맥락 관리",
  "Create a handoff that can restart work without guessing.":
    "추측하지 않고 작업을 다시 시작할 수 있는 인계문을 만드세요.",
  "Keep tested facts, file names, and the next change.":
    "테스트로 확인한 사실, 파일 이름, 다음 변경을 남기세요.",
  "Do not call an untested claim a fact.":
    "테스트하지 않은 주장을 사실이라고 부르지 마세요.",
  "The learner writes a four-part Context Handoff with one real test record.":
    "학습자가 실제 테스트 기록 하나가 포함된 네 부분의 맥락 인계문을 씁니다.",
  "Four parts of a handoff": "인계문의 네 부분",
  "Keep only useful, verified context.":
    "유용하고 검증된 맥락만 남기세요.",
  "Current: folder, file, and page.": "현재 상태: 폴더, 파일, 페이지.",
  "Already works: only tested behavior.":
    "이미 작동하는 것: 테스트를 마친 동작만.",
  "Evidence: Action, Expected, Actual.":
    "증거: 동작, 예상 결과, 실제 결과.",
  "Next: one change and what must stay.":
    "다음 작업: 변경 하나와 유지할 내용.",
  "Draft the handoff": "인계문 초안 작성하기",
  "Write one line for each part.": "각 부분을 한 줄씩 쓰세요.",
  "Current... Already works... Evidence... Next...":
    "현재 상태... 이미 작동하는 것... 증거... 다음 작업...",
  "Remove guesses": "추측 없애기",
  "Check the draft before you keep it.":
    "초안을 저장하기 전에 확인하세요.",
  "Every file name is exact.": "모든 파일 이름이 정확합니다.",
  "Every 'works' claim has a test.":
    "작동한다는 모든 주장에 테스트 근거가 있습니다.",
  "The next change is only one change.": "다음 변경은 한 가지뿐입니다.",
  "What must stay is named.": "유지해야 할 내용이 명시되어 있습니다.",
  "Rest and return ready to debug.":
    "쉬고 나서 디버깅할 준비를 하세요.",
  "Debugging demo": "디버깅 시연",
  "Turn one failure into a small, evidence-based fix request.":
    "실패 하나를 증거에 근거한 작은 수정 요청으로 바꾸세요.",
  "Reproduce the same failure.": "같은 실패를 다시 재현하세요.",
  "Record Action, Expected, and Actual before asking for a fix.":
    "수정을 요청하기 전에 동작, 예상 결과, 실제 결과를 기록하세요.",
  "The learner records Action, Expected, Actual and writes a fix request limited to one failure.":
    "학습자가 동작, 예상 결과, 실제 결과를 기록하고 실패 하나만 다루는 수정 요청을 씁니다.",
  "Watch the evidence order": "증거를 모으는 순서 관찰하기",
  "Mark each step when the teacher does it.":
    "강사가 각 단계를 실행할 때마다 표시하세요.",
  "Run one action.": "동작 하나를 실행합니다.",
  "Reproduce the failure.": "실패를 재현합니다.",
  "Write Expected.": "예상 결과를 씁니다.",
  "Write Actual.": "실제 결과를 씁니다.",
  "Ask to fix only this problem.": "이 문제만 수정해 달라고 요청합니다.",
  "Repeat the failed test and one old test.":
    "실패했던 테스트와 기존 테스트 하나를 다시 실행합니다.",
  "Record the failure": "실패 기록하기",
  "Use only what you can observe.": "직접 관찰할 수 있는 내용만 사용하세요.",
  "Action: what was typed or clicked.":
    "동작: 입력하거나 클릭한 내용.",
  "Expected: the exact result wanted.":
    "예상 결과: 원했던 정확한 결과.",
  "Actual: the exact result observed.":
    "실제 결과: 관찰한 정확한 결과.",
  "Write the FIX": "FIX 요청 작성하기",
  "Fill this request with the recorded evidence.":
    "기록한 증거로 이 요청을 완성하세요.",
  "Action: [observed action]": "동작: [관찰한 동작]",
  "Expected: [exact expected result]": "예상 결과: [정확한 예상 결과]",
  "Actual: [exact actual result]": "실제 결과: [정확한 실제 결과]",
  "Fix only this problem. Keep all passing behavior the same. Tell me what changed.":
    "이 문제만 수정하세요. 통과한 모든 동작은 그대로 유지하세요. 무엇을 변경했는지 알려 주세요.",
  "Guided lab build": "실습 따라 하기",
  "Build the shared Prompt Precision Lab from exact rules.":
    "정확한 규칙에 따라 공통 프롬프트 정밀도 실습 페이지를 만드세요.",
  "Build one local index.html.": "로컬 index.html 파일 하나를 만드세요.",
  "Read the plan, then test the basic rules.":
    "계획을 읽은 다음 기본 규칙을 테스트하세요.",
  "index.html passes the valid-input and empty-input tests, and day2-base.html opens.":
    "index.html이 유효한 입력과 빈 입력 테스트를 통과하고 day2-base.html이 열립니다.",
  "TELL the lab rules": "실습 규칙을 TELL하기",
  "Use this bounded request in day2-prompt-lab.":
    "day2-prompt-lab에서 범위가 정해진 이 요청을 사용하세요.",
  "Create one index.html page titled \"Prompt Precision Lab\".":
    "\"Prompt Precision Lab\"이라는 제목의 index.html 페이지 하나를 만드세요.",
  "Show: \"Enter a whole number from 1 to 10.\"":
    "\"Enter a whole number from 1 to 10.\" 문장을 표시하세요.",
  "Add a text input labeled \"Number\" and a button labeled \"Check input\".":
    "\"Number\"라는 텍스트 입력란과 \"Check input\"이라는 버튼을 추가하세요.",
  "Empty or spaces: \"Enter a value.\"":
    "비어 있거나 공백만 있는 경우: \"Enter a value.\"",
  "Not a number or not whole: \"Use a whole number.\"":
    "숫자가 아니거나 정수가 아닌 경우: \"Use a whole number.\"",
  "Below 1 or above 10: \"Use a number from 1 to 10.\"":
    "1보다 작거나 10보다 큰 경우: \"Use a number from 1 to 10.\"",
  "A whole number from 1 to 10: \"Accepted: N\".":
    "1부터 10까지의 정수인 경우: \"Accepted: N\".",
  "Use no external library, API, login, payment, or personal data.":
    "외부 라이브러리, API, 로그인, 결제, 개인정보를 사용하지 마세요.",
  "Before changing a file, show a short plan.":
    "파일을 변경하기 전에 짧은 계획을 보여 주세요.",
  "Allow the build only when all checks are true.":
    "모든 확인 항목이 맞을 때만 제작을 진행하세요.",
  "The plan includes all four rules.": "계획에 네 가지 규칙이 모두 포함되어 있습니다.",
  "The plan adds no external service or personal data.":
    "계획에 외부 서비스나 개인정보가 추가되지 않습니다.",
  "CHECK and SAVE the base": "기본본을 CHECK하고 SAVE하기",
  "Run both tests. When both pass, verify day2-base.html.":
    "두 테스트를 실행하세요. 모두 통과하면 day2-base.html을 확인하세요.",
  "Enter 5 — \"Accepted: 5\".": "5 입력 — \"Accepted: 5\".",
  "Leave it empty — \"Enter a value.\"": "비워 두기 — \"Enter a value.\"",
  "day2-base.html opens and passes both tests.":
    "day2-base.html이 열리고 두 테스트를 모두 통과합니다.",
  "Run six tests, fix with evidence, hand off context, and save the result.":
    "테스트 여섯 가지를 실행하고, 증거로 수정하고, 맥락을 인계한 뒤 결과를 저장하세요.",
  "Write Expected before each test.":
    "각 테스트를 실행하기 전에 예상 결과를 쓰세요.",
  "Fix one failure at a time and retest old rules.":
    "한 번에 실패 하나만 수정하고 기존 규칙을 다시 테스트하세요.",
  "Six test records are complete, the Context Handoff is used, old rules still pass, and day2-final-save.html opens.":
    "테스트 기록 여섯 개를 완성하고 맥락 인계문을 사용했으며, 기존 규칙이 계속 통과하고 day2-final-save.html이 열립니다.",
  "CHECK six inputs": "입력 여섯 가지 CHECK하기",
  "Write Expected first. Then run each input and record Actual.":
    "예상 결과를 먼저 쓰세요. 그런 다음 각 입력을 실행하고 실제 결과를 기록하세요.",
  Empty: "빈 입력",
  abc: "abc",
  "2.5": "2.5",
  "0": "0",
  "1": "1",
  "10": "10",
  "Enter a value.": "Enter a value.",
  "Use a whole number.": "Use a whole number.",
  "Use a number from 1 to 10.": "Use a number from 1 to 10.",
  "Accepted: 1": "Accepted: 1",
  "Accepted: 10": "Accepted: 10",
  "FIX, then hand off": "FIX한 뒤 인계하기",
  "Fix one failed test. When all rules pass, start a new session with this handoff.":
    "실패한 테스트 하나를 수정하세요. 모든 규칙이 통과하면 이 인계문으로 새 세션을 시작하세요.",
  "Current: day2-prompt-lab / index.html / Prompt Precision Lab.":
    "현재 상태: day2-prompt-lab / index.html / Prompt Precision Lab.",
  "Already works: [tested passing cases].":
    "이미 작동하는 것: [테스트를 통과한 사례].",
  "Evidence: Action [ ], Expected [ ], Actual [ ].":
    "증거: 동작 [ ], 예상 결과 [ ], 실제 결과 [ ].",
  "Next: add one \"Clear\" button that empties the input and result.":
    "다음 작업: 입력과 결과를 비우는 \"Clear\" 버튼 하나를 추가합니다.",
  "Keep: the title, Check input button, four rules, exact messages, layout, and file names.":
    "유지할 것: 제목, Check input 버튼, 네 가지 규칙, 정확한 메시지, 레이아웃, 파일 이름.",
  "Success means Clear works and all old tests still pass.":
    "성공 기준: Clear가 작동하고 기존 테스트가 모두 계속 통과합니다.",
  "Retest and SAVE": "다시 테스트하고 SAVE하기",
  "Check the new action and the old rules, then verify the final copy.":
    "새 동작과 기존 규칙을 확인한 다음 최종 사본을 검증하세요.",
  "Clear empties the input and result.":
    "Clear 버튼이 입력과 결과를 비웁니다.",
  "All four old input rules still pass.":
    "기존 입력 규칙 네 가지가 모두 계속 통과합니다.",
  "Every failed test was repeated after its fix.":
    "실패했던 모든 테스트를 수정 후 다시 실행했습니다.",
  "At least one old passing test was repeated.":
    "기존에 통과한 테스트를 하나 이상 다시 실행했습니다.",
  "day2-final-save.html opens and passes the same checks.":
    "day2-final-save.html이 열리고 같은 확인 절차를 통과합니다.",
  "Compare and exit ticket": "비교 및 마무리 확인",
  "Compare evidence and leave a reusable debugging record.":
    "증거를 비교하고 다시 사용할 수 있는 디버깅 기록을 남기세요.",
  "Compare one test record with a partner.":
    "테스트 기록 하나를 짝과 비교하세요.",
  "Submit the clearest request and the most useful evidence.":
    "가장 명확한 요청과 가장 유용한 증거를 제출하세요.",
  "A partner confirms one complete test record and the learner submits both exit answers.":
    "짝이 완성된 테스트 기록 하나를 확인하고 학습자가 마무리 답변 두 개를 제출합니다.",
  "Compare one record": "기록 하나 비교하기",
  "Show one Action, Expected, Actual record. Your partner checks all three parts.":
    "동작, 예상 결과, 실제 결과가 담긴 기록 하나를 보여 주세요. 짝이 세 부분을 모두 확인합니다.",
  "The action is exact.": "동작이 정확합니다.",
  "The expected result is testable.": "예상 결과를 테스트할 수 있습니다.",
  "The actual result is observed, not guessed.":
    "실제 결과는 추측이 아니라 관찰한 내용입니다.",
  "My clearest request line... My most useful failure evidence...":
    "가장 명확했던 요청 문장... 가장 유용했던 실패 증거...",
  "The line was... The evidence was...":
    "그 문장은... 그 증거는...",
  "Use all seven parts: Goal, Context, Feature, Rules, Constraints, Do not change, and Success means.":
    "Goal, Context, Feature, Rules, Constraints, Do not change, Success means 일곱 요소를 모두 사용하세요.",
  "Keep technical limits separate from the working behavior you must protect.":
    "기술적 제한과 보호해야 할 작동 중인 동작을 구분하세요.",
  "Constraints — technical and safety limits.":
    "Constraints — 기술 및 안전 제한.",
  "Do not change — working behavior to protect.":
    "Do not change — 보호해야 할 작동 중인 동작.",
  "Constraints: [technical and safety limits]":
    "Constraints: [기술 및 안전 제한]",
  "Do not change: [working behavior to protect]":
    "Do not change: [보호해야 할 작동 중인 동작]",
  "The current file and behavior are named.":
    "현재 파일과 동작이 명시되어 있습니다.",
  "The feature and exact behavior are named.":
    "기능과 정확한 동작이 명시되어 있습니다.",
  "Technical and safety limits are named.":
    "기술 및 안전 제한이 명시되어 있습니다.",
  "Working behavior to protect is named.":
    "보호해야 할 작동 중인 동작이 명시되어 있습니다.",
  "Use Current, Works, Evidence, Next, Keep, and Success.":
    "Current, Works, Evidence, Next, Keep, Success 여섯 요소를 사용하세요.",
  "The learner writes all six Context Handoff parts with one real test record.":
    "학습자가 실제 테스트 기록 하나와 Context Handoff 여섯 요소를 모두 작성합니다.",
  "Six parts of a handoff": "인계문의 여섯 요소",
  "Works: only tested behavior.": "Works: 테스트한 동작만.",
  "Next: one change.": "Next: 변경 하나.",
  "Keep: working behavior to protect.":
    "Keep: 보호해야 할 작동 중인 동작.",
  "Success: the new test and regression tests.":
    "Success: 새 테스트와 회귀 테스트.",
  "Write one line for each of the six parts.":
    "여섯 요소를 각각 한 줄로 쓰세요.",
  "Current... Works... Evidence... Next... Keep... Success...":
    "Current... Works... Evidence... Next... Keep... Success...",
  "Keep names the old behavior to protect.":
    "Keep에 보호해야 할 기존 동작이 적혀 있습니다.",
  "Success includes the new action and visible result.":
    "Success에 새 행동과 보이는 결과가 포함되어 있습니다.",
  "Success includes regression tests for protected behavior.":
    "Success에 보호할 동작의 회귀 테스트가 포함되어 있습니다.",
  "Works: [tested passing cases].":
    "Works: [테스트로 통과한 경우].",
  'Next: add one "Clear" button that empties the input and result, then returns focus to the input.':
    'Next: 입력과 결과를 비운 뒤 입력 칸으로 초점을 돌리는 "Clear" 버튼 하나를 추가한다.',
  "Success: after any check, Clear empties the input and result, focus returns to the input, and all six old tests still pass.":
    "Success: 어떤 확인 뒤에도 Clear가 입력과 결과를 비우고 초점이 입력 칸으로 돌아오며 기존 여섯 테스트가 모두 통과한다.",
  "Clear empties the input and result and returns focus to the input.":
    "Clear가 입력과 결과를 비우고 초점을 입력 칸으로 돌립니다.",
  'Goal: Create a local page titled "Prompt Precision Lab" that checks one input.':
    'Goal: 입력 하나를 확인하는 "Prompt Precision Lab" 로컬 페이지를 만든다.',
  "Context: Work in day2-prompt-lab and create only index.html.":
    "Context: day2-prompt-lab에서 작업하고 index.html만 만든다.",
  'Feature: Show the instruction, a text input labeled "Number", and a "Check input" button.':
    'Feature: 안내 문장, "Number"라는 입력 칸, "Check input" 버튼을 표시한다.',
  'Rules: empty/spaces → "Enter a value."; not a number or not whole → "Use a whole number."; below 1 or above 10 → "Use a number from 1 to 10."; whole number 1–10 → "Accepted: N".':
    'Rules: 빈칸/공백 → "Enter a value."; 숫자가 아니거나 정수가 아님 → "Use a whole number."; 1 미만 또는 10 초과 → "Use a number from 1 to 10."; 1–10 정수 → "Accepted: N".',
  "Constraints: Use one local file and no external library, API, login, payment, or personal data.":
    "Constraints: 로컬 파일 하나만 사용하고 외부 라이브러리, API, 로그인, 결제, 개인정보를 쓰지 않는다.",
  "Do not change: Keep the exact title, labels, four rules, and result messages in this request.":
    "Do not change: 이 요청의 정확한 제목, 라벨, 네 규칙, 결과 문구를 유지한다.",
  'Success means: empty shows "Enter a value."; 5 shows "Accepted: 5"; day2-base.html opens and passes both tests.':
    'Success means: 빈칸에는 "Enter a value.", 5에는 "Accepted: 5"가 나오고 day2-base.html도 열려 두 테스트를 통과한다.',
  "Before changing a file, show a short plan mapped to all seven parts.":
    "파일을 바꾸기 전에 일곱 요소에 연결된 짧은 계획을 보여 주세요.",
};

const day3Ko: Record<string, string> = {
  "From a Problem to a Project": "문제에서 프로젝트로",
  "How can your own idea become a small, testable project?":
    "나만의 아이디어를 작고 테스트 가능한 프로젝트로 어떻게 발전시킬 수 있을까요?",
  "An approved Project Brief and a working v0 in my-app":
    "승인된 프로젝트 기획서와 my-app에서 작동하는 v0",
  "Review and ownership": "복습 및 주도권",
  "Recall the build loop and take ownership of every project decision.":
    "제작 루프를 떠올리고 프로젝트의 모든 결정을 스스로 책임지세요.",
  "Recall TELL → WATCH → CHECK → FIX → SAVE.":
    "TELL → WATCH → CHECK → FIX → SAVE를 떠올려 보세요.",
  "You choose the topic. AI and the teacher do not choose it.":
    "주제는 여러분이 선택합니다. AI나 강사가 대신 고르지 않습니다.",
  "Keep AI chat and my-app closed for now.":
    "지금은 AI 채팅과 my-app을 열지 마세요.",
  "The class can say the loop aloud and explain why the learner—not AI or the teacher—owns the project decisions.":
    "학급이 빌드 루프를 소리 내어 말하고, AI나 강사가 아니라 학습자가 프로젝트 결정을 책임지는 이유를 설명할 수 있습니다.",
  "Write the five words in order. Do not use notes.":
    "노트를 보지 말고 다섯 단어를 순서대로 쓰세요.",
  "Project ownership": "프로젝트 주도권",
  "Check each promise before you continue.":
    "계속하기 전에 각 약속을 확인하세요.",
  "I will choose my own topic.": "내 주제는 내가 직접 고르겠습니다.",
  "I will decide what success means.": "성공의 기준은 내가 정하겠습니다.",
  "I will check AI output myself.": "AI의 결과를 내가 직접 확인하겠습니다.",
  "I will not use private or secret information.":
    "개인정보나 비밀 정보를 사용하지 않겠습니다.",
  "Free topic exploration": "자유 주제 탐색",
  "Choose one project direction from the learner's own observation.":
    "자신이 직접 관찰한 것에서 프로젝트 방향 하나를 고르세요.",
  "Work alone first.": "먼저 혼자 생각하세요.",
  "Write three things you have noticed or wanted to improve.":
    "관찰했거나 개선하고 싶었던 것 세 가지를 쓰세요.",
  "Choose one direction that matters to you.":
    "나에게 의미 있는 방향 하나를 고르세요.",
  "The learner records three personal observations and selects one direction in their own words.":
    "학습자가 개인적인 관찰 세 가지를 기록하고 자신의 말로 방향 하나를 선택합니다.",
  "Notice before you choose": "고르기 전에 관찰하기",
  "Write three things you have noticed, needed, or wanted to improve. Use your own experience.":
    "직접 관찰했거나 필요했거나 개선하고 싶었던 것 세 가지를 자신의 경험을 바탕으로 쓰세요.",
  "Observation A": "관찰 A",
  "Observation B": "관찰 B",
  "Observation C": "관찰 C",
  "Write three short observations here.":
    "여기에 짧은 관찰 세 가지를 적으세요.",
  "Choose one direction": "방향 하나 고르기",
  "Choose one of your own observations. Say why you want to work on it.":
    "자신의 관찰 중 하나를 고르고 그것을 다루고 싶은 이유를 말하세요.",
  "I choose ... because ...": "나는 ...을 선택합니다. 그 이유는 ...입니다.",
  "User, problem, success": "사용자, 문제, 성공 기준",
  "Turn the chosen direction into a clear user, problem, and visible success.":
    "선택한 방향을 명확한 사용자, 문제, 눈에 보이는 성공 기준으로 바꾸세요.",
  "Name one user.": "사용자 한 명을 정하세요.",
  "Write one problem in plain words.": "문제 하나를 쉬운 말로 쓰세요.",
  "Describe one result you can see and test.":
    "직접 보고 테스트할 수 있는 결과 하나를 설명하세요.",
  "The learner completes one connected User / Problem / Success statement and passes a partner clarity check.":
    "학습자가 서로 연결된 사용자/문제/성공 기준 문장을 완성하고 짝의 명확성 확인을 통과합니다.",
  User: "사용자",
  "Who will use this project? Name one clear user.":
    "이 프로젝트는 누가 사용할까요? 분명한 사용자 한 명을 적으세요.",
  "The user is ...": "사용자는 ...입니다.",
  Problem: "문제",
  "What problem does this user face? Write one sentence.":
    "이 사용자는 어떤 문제를 겪나요? 한 문장으로 쓰세요.",
  "The user needs to ... but ...":
    "사용자는 ...해야 하지만 ...한 문제가 있습니다.",
  "Success check": "성공 기준",
  "Write a visible success result. Read all three lines to a partner. The partner says what they expect to see.":
    "눈에 보이는 성공 결과를 쓰세요. 세 문장을 모두 짝에게 읽어 주세요. 짝은 어떤 결과가 보일 것 같은지 말합니다.",
  "Success means: when the user ..., they see ...":
    "성공 기준: 사용자가 ...하면 ...이 보입니다.",
  "The user is clear.": "사용자가 명확합니다.",
  "The problem is clear.": "문제가 명확합니다.",
  "The result can be seen and tested.":
    "결과를 직접 보고 테스트할 수 있습니다.",
  "MUST 3 / NICE 2": "필수 3개 / 선택 2개",
  "Set priorities and protect a small first build.":
    "우선순위를 정하고 첫 제작 범위를 작게 지키세요.",
  "Write three MUST items.": "필수 항목 세 개를 쓰세요.",
  "Write two NICE items.": "선택 항목 두 개를 쓰세요.",
  "Build only the smallest path through MUST 1 today.":
    "오늘은 필수 1을 구현하는 가장 작은 경로만 만드세요.",
  "The learner records exactly three MUST items, two NICE items, and names the smallest v0 path through MUST 1.":
    "학습자가 필수 항목 세 개와 선택 항목 두 개를 정확히 기록하고 필수 1을 구현하는 가장 작은 v0 경로를 정합니다.",
  "Priority rule": "우선순위 규칙",
  "Read the rule, then say it to a partner.":
    "규칙을 읽은 다음 짝에게 말해 보세요.",
  "MUST = needed for the project promise.":
    "MUST = 프로젝트의 약속을 지키는 데 꼭 필요한 것.",
  "NICE = useful later, but not needed now.":
    "NICE = 나중에는 유용하지만 지금은 필요하지 않은 것.",
  "Today = only the smallest working path through MUST 1.":
    "오늘 = MUST 1을 구현하는 가장 작은 작동 경로만.",
  "Write your priorities": "우선순위 작성하기",
  "Write exactly three MUST items and two NICE items.":
    "MUST 항목 세 개와 NICE 항목 두 개를 정확히 쓰세요.",
  "MUST 1": "MUST 1",
  "MUST 2": "MUST 2",
  "MUST 3": "MUST 3",
  "NICE 1": "NICE 1",
  "NICE 2": "NICE 2",
  "Use one short line for each item.":
    "각 항목을 짧은 한 줄로 쓰세요.",
  "v0 scope gate": "v0 범위 확인",
  "Check the scope before the break.": "휴식 전에 범위를 확인하세요.",
  "My v0 starts with MUST 1.": "내 v0는 MUST 1부터 시작합니다.",
  "My v0 has one user action.": "내 v0에는 사용자 동작 하나가 있습니다.",
  "My v0 has one visible result.": "내 v0에는 눈에 보이는 결과 하나가 있습니다.",
  "My NICE items stay out of v0.": "NICE 항목은 v0에 넣지 않습니다.",
  "Pause work and return ready for the planning block.":
    "작업을 멈추고 계획 수업을 준비해 돌아오세요.",
  "Stop editing.": "편집을 멈추세요.",
  "Take a 10-minute break.": "10분 동안 쉬세요.",
  "Return with your Project Brief notes.":
    "프로젝트 기획서 메모를 준비해 돌아오세요.",
  "The learner returns by 01:25 with the planning notes ready.":
    "학습자가 01:25까지 계획 메모를 준비해 돌아옵니다.",
  "Return before the timer ends.": "타이머가 끝나기 전에 돌아오세요.",
  "Wireframe and Project Brief": "와이어프레임과 프로젝트 기획서",
  "Make one clear project brief and one-screen wireframe.":
    "명확한 프로젝트 기획서와 한 화면짜리 와이어프레임을 만드세요.",
  "Join your decisions in one Project Brief.":
    "지금까지의 결정을 프로젝트 기획서 하나로 정리하세요.",
  "Draw only one screen.": "화면 하나만 그리세요.",
  "Label the main action and visible result.":
    "핵심 동작과 눈에 보이는 결과에 이름을 붙이세요.",
  "The learner completes all Project Brief fields and a one-screen wireframe with one action and one result labeled.":
    "학습자가 프로젝트 기획서의 모든 칸과 동작 하나, 결과 하나가 표시된 한 화면 와이어프레임을 완성합니다.",
  "Complete the brief": "기획서 완성하기",
  "Join your decisions into one short Project Brief.":
    "결정한 내용을 짧은 프로젝트 기획서 하나로 정리하세요.",
  "Topic in my own words": "내 말로 쓴 주제",
  Success: "성공 기준",
  "MUST 1 / MUST 2 / MUST 3": "MUST 1 / MUST 2 / MUST 3",
  "NICE 1 / NICE 2": "NICE 1 / NICE 2",
  "What v0 will do": "v0가 할 일",
  "What v0 will not do": "v0가 하지 않을 일",
  "Write short, testable lines.": "짧고 테스트 가능한 문장으로 쓰세요.",
  "Draw one screen": "화면 하나 그리기",
  "Draw the screen on paper or in your worksheet. Then check the labels.":
    "종이나 워크시트에 화면을 그린 다음 표시한 내용을 확인하세요.",
  "I drew one screen.": "화면 하나를 그렸습니다.",
  "I labeled the user action.": "사용자 동작을 표시했습니다.",
  "I labeled the visible result.": "눈에 보이는 결과를 표시했습니다.",
  "The screen matches MUST 1.": "화면이 MUST 1과 일치합니다.",
  "I did not add a NICE item.": "NICE 항목을 추가하지 않았습니다.",
  "Plan review and approval": "계획 검토 및 승인",
  "Use AI only to review scope, then receive teacher approval.":
    "AI는 범위를 검토하는 데만 사용하고 강사의 승인을 받으세요.",
  "Ask AI to review your plan, not choose your topic.":
    "AI에게 주제를 정해 달라고 하지 말고 계획을 검토해 달라고 요청하세요.",
  "Remove extra work from the reply.":
    "AI의 답변에서 불필요한 작업을 제거하세요.",
  "Build only after the teacher marks APPROVED.":
    "강사가 APPROVED로 표시한 뒤에만 제작하세요.",
  "The learner records the AI review, removes scope growth, and receives APPROVED or a clear REVISE note from the teacher.":
    "학습자가 AI 검토 내용을 기록하고 범위 확대를 제거한 뒤 강사에게 APPROVED 또는 명확한 REVISE 메모를 받습니다.",
  "Review the plan": "계획 검토하기",
  "Complete the brackets. Ask for a scope review only. Read the full reply before any action.":
    "대괄호를 모두 채우세요. 범위 검토만 요청하세요. 행동하기 전에 답변 전체를 읽으세요.",
  "Review this project plan without changing my topic or adding features.\n\nUser: [my user]\nProblem: [my problem]\nSuccess: [my visible success]\nMUST 1: [my MUST 1]\nMUST 2: [my MUST 2]\nMUST 3: [my MUST 3]\nToday I will build only the smallest path through MUST 1.\n\nCheck:\n1. Is the user action clear?\n2. Is the result visible and testable?\n3. Is the v0 small enough for today?\n4. Is any private or secret information requested?\n\nGive only risks and ways to make the same plan smaller. Do not suggest a new topic or new feature. Do not edit files.":
    "내 주제를 바꾸거나 기능을 추가하지 말고 이 프로젝트 계획을 검토해 주세요.\n\n사용자: [내 사용자]\n문제: [내 문제]\n성공 기준: [눈에 보이는 성공 결과]\nMUST 1: [내 MUST 1]\nMUST 2: [내 MUST 2]\nMUST 3: [내 MUST 3]\n오늘은 MUST 1을 구현하는 가장 작은 경로만 만들겠습니다.\n\n확인할 내용:\n1. 사용자 동작이 명확한가요?\n2. 결과를 보고 테스트할 수 있나요?\n3. v0가 오늘 완성할 만큼 작은가요?\n4. 개인정보나 비밀 정보를 요구하나요?\n\n위험 요소와 같은 계획을 더 작게 만드는 방법만 알려 주세요. 새 주제나 새 기능을 제안하지 마세요. 파일을 편집하지 마세요.",
  "WATCH the review": "검토 내용을 WATCH하기",
  "Check the reply before you accept any advice.":
    "조언을 받아들이기 전에 답변을 확인하세요.",
  "The reply keeps my topic.": "답변이 내 주제를 그대로 유지합니다.",
  "The reply keeps my user and problem.":
    "답변이 내 사용자와 문제를 그대로 유지합니다.",
  "The reply does not add a feature.": "답변이 기능을 추가하지 않습니다.",
  "I wrote one useful risk or smaller step.":
    "유용한 위험 요소나 더 작은 단계 하나를 적었습니다.",
  "No file changed.": "변경된 파일이 없습니다.",
  "Teacher approval gate": "강사 승인 단계",
  "Choose the status the teacher gives you.":
    "강사가 알려 준 상태를 선택하세요.",
  APPROVED: "APPROVED",
  "Open my-app only after this status.":
    "이 상태를 받은 뒤에만 my-app을 여세요.",
  REVISE: "REVISE",
  "Make the same plan smaller, then ask again.":
    "같은 계획의 범위를 더 작게 줄인 뒤 다시 요청하세요.",
  "BUILD PENDING": "BUILD PENDING",
  "Keep the approved paper plan if the tool is blocked.":
    "도구를 사용할 수 없다면 승인받은 종이 계획을 보관하세요.",
  "v0 Project Studio": "v0 프로젝트 제작 시간",
  "Build and verify the smallest working path through MUST 1.":
    "MUST 1을 구현하는 가장 작은 작동 경로를 만들고 확인하세요.",
  "Use TELL → WATCH → CHECK → FIX → SAVE.":
    "TELL → WATCH → CHECK → FIX → SAVE를 사용하세요.",
  "Build only the approved v0.": "승인받은 v0만 만드세요.",
  "Test the real page before you save.":
    "저장하기 전에 실제 페이지를 테스트하세요.",
  "my-app/index.html shows the approved MUST 1 path, the learner records a passing browser test, and day3-v0-save.html passes the same test.":
    "my-app/index.html에 승인받은 MUST 1 경로가 나타나고, 학습자가 통과한 브라우저 테스트를 기록하며, day3-v0-save.html이 같은 테스트를 통과합니다.",
  "TELL and WATCH": "TELL하고 WATCH하기",
  "Complete the brackets. Ask for the smallest approved v0. Read the plan and file changes before you test.":
    "대괄호를 모두 채우세요. 승인받은 가장 작은 v0를 요청하세요. 테스트하기 전에 계획과 파일 변경 내용을 읽으세요.",
  "Work only in my-app/index.html.\n\nMy approved user: [user]\nMy approved problem: [problem]\nMy approved success result: [success]\nMy MUST 1: [MUST 1]\n\nBuild only the smallest working path through MUST 1.\nUse one user action and one visible result.\nDo not add MUST 2, MUST 3, any NICE item, login, server, external API, personal data, or extra file.\nFirst show a short plan. Do not edit until I approve the plan.":
    "my-app/index.html에서만 작업하세요.\n\n승인받은 사용자: [사용자]\n승인받은 문제: [문제]\n승인받은 성공 결과: [성공 기준]\n내 MUST 1: [MUST 1]\n\nMUST 1을 구현하는 가장 작은 작동 경로만 만드세요.\n사용자 동작 하나와 눈에 보이는 결과 하나를 사용하세요.\nMUST 2, MUST 3, NICE 항목, 로그인, 서버, 외부 API, 개인정보, 추가 파일을 넣지 마세요.\n먼저 짧은 계획을 보여 주세요. 내가 계획을 승인하기 전에는 편집하지 마세요.",
  "CHECK and FIX": "CHECK하고 FIX하기",
  "Open the real page. Record Action, Expected, Actual, and Result. If it fails, ask for one small fix and run the same test again.":
    "실제 페이지를 여세요. 동작, 예상 결과, 실제 결과, 판정을 기록하세요. 실패하면 작은 수정 하나를 요청하고 같은 테스트를 다시 실행하세요.",
  Action: "동작",
  Expected: "예상 결과",
  Actual: "실제 결과",
  "Pass / Not yet": "통과 / 아직 미완료",
  "The page opens.": "페이지가 열립니다.",
  "The approved user action can be performed.":
    "승인받은 사용자 동작을 실행할 수 있습니다.",
  "The visible result matches the success statement.":
    "눈에 보이는 결과가 성공 기준과 일치합니다.",
  "No work outside the approved v0 appears.":
    "승인받은 v0 범위 밖의 내용이 없습니다.",
  "SAVE the working v0": "작동하는 v0를 SAVE하기",
  "Save only after the real test passes.":
    "실제 테스트를 통과한 뒤에만 저장하세요.",
  "my-app/index.html passes the v0 test.":
    "my-app/index.html이 v0 테스트를 통과합니다.",
  "I copied it as my-app/day3-v0-save.html.":
    "my-app/day3-v0-save.html로 복사했습니다.",
  "I opened day3-v0-save.html.": "day3-v0-save.html을 열었습니다.",
  "The same action passes in the saved copy.":
    "저장한 사본에서도 같은 동작이 통과합니다.",
  "I recorded what works now.": "현재 작동하는 내용을 기록했습니다.",
  "30-second pitch": "30초 소개",
  "Explain the project decision and show one piece of working evidence.":
    "프로젝트에서 내린 결정을 설명하고 작동 증거 하나를 보여 주세요.",
  "Say the user and problem.": "사용자와 문제를 말하세요.",
  "Show the working v0 action.": "작동하는 v0 동작을 보여 주세요.",
  "Name the first action for Day 4.": "4일차에 먼저 할 일을 말하세요.",
  "The learner gives a timed 30-second pitch, receives one evidence-based partner check, and records a Day 4 first action.":
    "학습자가 30초 소개를 하고, 짝에게 증거 기반 확인을 받은 뒤, 4일차에 먼저 할 일을 기록합니다.",
  "Say: user, problem, working action, visible result, and one limit.":
    "사용자, 문제, 작동하는 동작, 눈에 보이는 결과, 제한점 하나를 말하세요.",
  "Partner evidence check": "짝의 증거 확인",
  "Listen once. Check only what you heard and saw. Then switch roles.":
    "한 번 듣고 직접 듣고 본 내용만 확인하세요. 그런 다음 역할을 바꾸세요.",
  "I heard one user.": "사용자 한 명을 들었습니다.",
  "I heard one problem.": "문제 하나를 들었습니다.",
  "I saw one real action.": "실제 동작 하나를 보았습니다.",
  "I saw one visible result.": "눈에 보이는 결과 하나를 보았습니다.",
  "Day 4 first action": "4일차에 먼저 할 일",
  "Write the first thing you will check on Day 4.":
    "4일차에 가장 먼저 확인할 내용을 쓰세요.",
  "On Day 4, I will first ...":
    "4일차에는 먼저 ...하겠습니다.",
  "A reviewed Project Brief and a working v0 in my-app":
    "검토를 마친 프로젝트 기획서와 my-app에서 작동하는 v0",
  Observation: "관찰",
  "v0 IN / v0 OUT": "v0 포함 / v0 제외",
  "States: Before / Action / After": "상태: 행동 전 / 행동 / 행동 후",
  "Test: Action / Expected": "테스트: 행동 / 예상 결과",
  "Accessibility and safety: use visible words, never color alone, and no private or secret data":
    "접근성과 안전: 보이는 문구를 사용하고 색만으로 전달하지 않으며 개인정보나 비밀정보를 쓰지 않기",
  "Plan review and READY gate": "계획 검토 및 READY 관문",
  "Use one shared rubric for AI review, self-check, peer check, and focused teacher help.":
    "AI 검토, 자가검수, 짝 검수, 강사의 집중 지원에 하나의 공통 루브릭을 사용하세요.",
  "Self-check every Brief field, then ask a partner to use the same rubric.":
    "Brief의 모든 항목을 자가검수한 뒤 짝에게 같은 루브릭으로 확인해 달라고 하세요.",
  "Build when both checks pass. Use Yellow only when one mismatch needs teacher review.":
    "두 검수가 모두 통과하면 제작하세요. 불일치를 강사가 확인해야 할 때만 Yellow를 사용하세요.",
  "The learner records the AI review, completes the shared self/peer rubric, and either reaches READY or resolves one Yellow mismatch with the teacher.":
    "학습자가 AI 검토를 기록하고 공통 자가·짝 루브릭을 완료한 뒤 READY가 되거나 Yellow 불일치를 강사와 해결합니다.",
  "Review this Project Brief without changing my topic or adding features.\n\nObservation: [what I noticed]\nUser: [my user]\nProblem: [one current difficulty]\nSuccess: [one action and visible result]\nMUST: [MUST 1 / MUST 2 / MUST 3]\nNICE: [NICE 1 / NICE 2]\nv0 IN: [one smallest path]\nv0 OUT: [everything excluded]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: visible words, never color alone, no private or secret data.\n\nUse exactly these headings in your review. For each heading, write PASS or one specific RISK. Check that the fields agree, v0 is small enough for today, the test matches Success, and no excluded item returns. Give only ways to make this same plan smaller or clearer. Do not suggest a new topic or feature. Do not edit files.":
    "내 주제를 바꾸거나 기능을 추가하지 말고 이 Project Brief를 검토해 주세요.\n\nObservation: [내가 관찰한 것]\nUser: [내 사용자]\nProblem: [현재 어려움 하나]\nSuccess: [행동 하나와 보이는 결과]\nMUST: [MUST 1 / MUST 2 / MUST 3]\nNICE: [NICE 1 / NICE 2]\nv0 IN: [가장 작은 경로 하나]\nv0 OUT: [제외할 모든 것]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: 보이는 문구, 색만으로 전달하지 않기, 개인정보와 비밀정보 없음.\n\n검토에서도 정확히 이 제목을 사용하세요. 각 제목마다 PASS 또는 구체적인 RISK 하나를 쓰세요. 항목들이 서로 일치하는지, v0가 오늘 만들 만큼 작은지, Test가 Success와 일치하는지, 제외한 항목이 다시 들어오지 않았는지 확인하세요. 같은 계획을 더 작거나 명확하게 만드는 방법만 제시하세요. 새 주제나 기능을 제안하지 말고 파일을 편집하지 마세요.",
  "Observation, User, Problem, and Success still form one chain.":
    "Observation, User, Problem, Success가 여전히 하나의 연결을 이룹니다.",
  "MUST/NICE and v0 IN/OUT agree.":
    "MUST/NICE와 v0 IN/OUT이 서로 일치합니다.",
  "Before, Action, and After match Success.":
    "Before, Action, After가 Success와 일치합니다.",
  "The Test action and Expected result match the states.":
    "Test의 행동과 예상 결과가 상태와 일치합니다.",
  "Accessibility and safety use visible words, never color alone, and no private or secret data.":
    "접근성과 안전에서 보이는 문구를 사용하고 색만으로 전달하지 않으며 개인정보나 비밀정보를 쓰지 않습니다.",
  "The reply keeps my topic and adds no feature.":
    "답변이 내 주제를 유지하고 기능을 추가하지 않습니다.",
  "I recorded each PASS or one specific risk.":
    "각 PASS 또는 구체적 위험 하나를 기록했습니다.",
  "Self → peer → Yellow": "자가검수 → 짝 검수 → Yellow",
  "Use the same rubric in this order. Do not join a whole-class approval queue.":
    "같은 루브릭을 이 순서로 사용하세요. 전원 강사 승인 대기열에 서지 마세요.",
  "I self-checked every Project Brief heading.":
    "Project Brief의 모든 제목을 자가검수했습니다.",
  "My partner checked the same headings and named any mismatch.":
    "짝이 같은 제목을 확인하고 불일치를 말했습니다.",
  "If both checks pass, I mark READY and begin the reviewed v0.":
    "두 검수가 모두 통과하면 READY로 표시하고 검토한 v0를 시작합니다.",
  "If one or more headings disagree, I mark Yellow and ask the teacher to check only those headings.":
    "하나 이상의 제목이 일치하지 않으면 Yellow로 표시하고 강사에게 해당 제목만 확인해 달라고 합니다.",
  "Build only the reviewed READY v0.":
    "검토를 마친 READY v0만 만드세요.",
  "my-app/index.html shows the reviewed MUST 1 path, the learner records a passing browser test, and day3-v0-save.html passes the same test.":
    "my-app/index.html에 검토한 MUST 1 경로가 나타나고, 학습자가 통과한 브라우저 테스트를 기록하며, day3-v0-save.html이 같은 테스트를 통과합니다.",
  "Complete the brackets from the reviewed Brief. Ask for the smallest READY v0. Read the plan and file changes before you test.":
    "검토한 Brief를 바탕으로 대괄호를 채우세요. 가장 작은 READY v0를 요청하고 테스트 전에 계획과 파일 변경을 읽으세요.",
  "Work only in my-app/index.html.\n\nObservation: [reviewed observation]\nUser: [reviewed user]\nProblem: [reviewed problem]\nSuccess: [reviewed action and visible result]\nMUST 1: [reviewed MUST 1]\nv0 IN: [reviewed smallest path]\nv0 OUT: [reviewed exclusions]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: use visible words, never color alone, and no private or secret data.\n\nBuild only this v0 path through MUST 1.\nDo not add MUST 2, MUST 3, any NICE item, login, server, external API, personal data, or extra file.\nFirst show a short plan mapped to the same Brief headings. Do not edit until I approve the plan.":
    "my-app/index.html에서만 작업하세요.\n\nObservation: [검토한 관찰]\nUser: [검토한 사용자]\nProblem: [검토한 문제]\nSuccess: [검토한 행동과 보이는 결과]\nMUST 1: [검토한 MUST 1]\nv0 IN: [검토한 가장 작은 경로]\nv0 OUT: [검토한 제외 항목]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: 보이는 문구를 사용하고 색만으로 전달하지 않으며 개인정보나 비밀정보를 쓰지 않기.\n\nMUST 1을 통과하는 이 v0 경로만 만드세요.\nMUST 2, MUST 3, NICE 항목, 로그인, 서버, 외부 API, 개인정보, 추가 파일을 넣지 마세요.\n먼저 같은 Brief 제목에 연결된 짧은 계획을 보여 주세요. 내가 계획을 승인하기 전에는 편집하지 마세요.",
  "The reviewed user action can be performed.":
    "검토한 사용자 동작을 실행할 수 있습니다.",
  "No work outside the reviewed v0 appears.":
    "검토한 v0 범위 밖의 내용이 없습니다.",
  "MUST 1–3 / NICE up to 2": "MUST 1–3개 / NICE 최대 2개",
  "Write one to three MUST items; MUST 1 is required.":
    "MUST 항목을 한 개에서 세 개까지 쓰세요. MUST 1은 필수입니다.",
  "Write up to two NICE items; leave them blank if none are useful.":
    "NICE 항목은 최대 두 개까지 쓰세요. 필요한 항목이 없으면 비워 두세요.",
  "The learner records one to three MUST items, zero to two NICE items, and names the smallest v0 path through MUST 1.":
    "학습자가 MUST 항목 한 개에서 세 개, NICE 항목 0개에서 두 개를 기록하고 MUST 1을 통과하는 가장 작은 v0 경로를 정합니다.",
  "MUST = one to three items needed for the project promise; MUST 1 is required.":
    "MUST = 프로젝트의 약속에 필요한 항목 한 개에서 세 개. MUST 1은 필수.",
  "NICE = zero to two useful items for later; leave the slots blank if none are needed.":
    "NICE = 나중에 유용한 항목 0개에서 두 개. 필요한 항목이 없으면 칸을 비워 두기.",
  "Write MUST 1, add MUST 2–3 only when the promise needs them, and add no more than two NICE items.":
    "MUST 1을 쓰고, 프로젝트의 약속에 필요할 때만 MUST 2–3을 추가하세요. NICE는 두 개를 넘기지 마세요.",
  "MUST 1 (required)": "MUST 1 (필수)",
  "MUST 2 (optional)": "MUST 2 (선택)",
  "MUST 3 (optional)": "MUST 3 (선택)",
  "NICE 1 (optional)": "NICE 1 (선택)",
  "NICE 2 (optional)": "NICE 2 (선택)",
  "Every optional MUST or NICE item stays out of v0.":
    "MUST 1 이외에 적어 둔 MUST와 NICE 항목은 모두 v0 범위 밖에 둡니다.",
  "MUST 1 (required) / MUST 2–3 (optional)":
    "MUST 1 (필수) / MUST 2–3 (선택)",
  "NICE 1–2 (optional; write none if not needed)":
    "NICE 1–2 (선택; 필요하지 않으면 없음이라고 쓰기)",
  "I did not add any optional MUST or NICE item.":
    "MUST 1 이외의 MUST나 NICE 항목을 v0에 추가하지 않았습니다.",
  "Review this Project Brief without changing my topic or adding features.\n\nObservation: [what I noticed]\nUser: [my user]\nProblem: [one current difficulty]\nSuccess: [one action and visible result]\nMUST: [MUST 1 is required; add MUST 2 and MUST 3 only if the promise needs them]\nNICE: [zero to two optional items; write none if they are not needed]\nv0 IN: [one smallest path through MUST 1]\nv0 OUT: [every other listed item and exclusion]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: visible words, never color alone, no private or secret data.\n\nUse exactly these headings in your review. For each heading, write PASS or one specific RISK. Check that the fields agree, there are one to three MUST items and no more than two NICE items, blank optional slots did not become features, v0 is small enough for today, the test matches Success, and every item outside v0 remains outside. Give only ways to make this same plan smaller or clearer. Do not suggest a new topic or feature. Do not edit files.":
    "내 주제를 바꾸거나 기능을 추가하지 말고 이 Project Brief를 검토해 주세요.\n\nObservation: [내가 관찰한 것]\nUser: [내 사용자]\nProblem: [현재 어려움 하나]\nSuccess: [행동 하나와 보이는 결과]\nMUST: [MUST 1은 필수. 프로젝트의 약속에 필요할 때만 MUST 2와 MUST 3 추가]\nNICE: [선택 항목 0개에서 두 개. 필요하지 않으면 없음이라고 쓰기]\nv0 IN: [MUST 1을 통과하는 가장 작은 경로 하나]\nv0 OUT: [그 밖에 적어 둔 항목과 제외 항목 모두]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: 보이는 문구를 사용하고 색만으로 전달하지 않으며 개인정보나 비밀정보를 쓰지 않기.\n\n검토에서도 정확히 이 제목을 사용하세요. 각 제목마다 PASS 또는 구체적인 RISK 하나를 쓰세요. 항목들이 서로 일치하는지, MUST가 한 개에서 세 개이고 NICE가 두 개를 넘지 않는지, 비워 둔 선택 칸이 기능으로 바뀌지 않았는지, v0가 오늘 만들 만큼 작은지, Test가 Success와 일치하는지, v0 밖의 모든 항목이 계속 밖에 있는지 확인하세요. 같은 계획을 더 작거나 명확하게 만드는 방법만 제시하세요. 새 주제나 기능을 제안하지 말고 파일을 편집하지 마세요.",
  "The Brief has MUST 1, no more than three MUST items, and no more than two NICE items.":
    "Brief에 MUST 1이 있고, MUST 항목은 세 개 이하이며 NICE 항목은 두 개 이하입니다.",
  "Only listed items appear in v0 IN/OUT; blank optional slots did not become features.":
    "v0 IN/OUT에는 내가 적은 항목만 있고, 비워 둔 선택 칸이 기능으로 바뀌지 않았습니다.",
  "Work only in my-app/index.html.\n\nObservation: [reviewed observation]\nUser: [reviewed user]\nProblem: [reviewed problem]\nSuccess: [reviewed action and visible result]\nMUST 1: [reviewed MUST 1]\nv0 IN: [reviewed smallest path]\nv0 OUT: [reviewed optional items and exclusions]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: use visible words, never color alone, and no private or secret data.\n\nBuild only this v0 path through MUST 1.\nDo not add any optional MUST or NICE item, login, server, external API, personal data, or extra file.\nFirst show a short plan mapped to the same Brief headings. Do not edit until I approve the plan.":
    "my-app/index.html에서만 작업하세요.\n\nObservation: [검토한 관찰]\nUser: [검토한 사용자]\nProblem: [검토한 문제]\nSuccess: [검토한 행동과 보이는 결과]\nMUST 1: [검토한 MUST 1]\nv0 IN: [검토한 가장 작은 경로]\nv0 OUT: [검토한 선택 항목과 제외 항목]\nStates: Before [ ] / Action [ ] / After [ ]\nTest: Action [ ] / Expected [ ]\nAccessibility and safety: 보이는 문구를 사용하고 색만으로 전달하지 않으며 개인정보나 비밀정보를 쓰지 않기.\n\nMUST 1을 통과하는 이 v0 경로만 만드세요.\nMUST 1 이외의 MUST나 NICE 항목, 로그인, 서버, 외부 API, 개인정보, 추가 파일을 넣지 마세요.\n먼저 같은 Brief 제목에 연결된 짧은 계획을 보여 주세요. 내가 계획을 승인하기 전에는 편집하지 마세요.",
};

const day4Ko: Record<string, string> = {
  "One Safe Slice": "기능 하나를 안전하게 확장하기",
  "Can you understand a little, extend one slice, and recover safely?":
    "코드를 조금 이해하고, 기능 하나를 확장한 뒤, 문제가 생겨도 안전하게 복구할 수 있을까요?",
  "One tested slice, a regression test, and a verified Save Point":
    "테스트한 기능 하나, 회귀 테스트, 확인된 저장 지점",
  "Project status": "프로젝트 상태 확인",
  "Open the Day 3 project and prove that the old working path still works.":
    "3일차 프로젝트를 열고 기존 작동 경로가 계속 작동하는지 증명하세요.",
  "Open your own Day 3 my-app.": "자신의 3일차 my-app을 여세요.",
  "Do not change a file yet.": "아직 파일을 변경하지 마세요.",
  "Run one old action and record the result.":
    "기존 동작 하나를 실행하고 결과를 기록하세요.",
  "The learner opens my-app, runs one Day 3 action, records the actual result, and updates the side signal.":
    "학습자가 my-app을 열고 3일차 동작 하나를 실행해 실제 결과를 기록한 뒤 옆의 상태 신호를 갱신합니다.",
  "Test before editing": "편집하기 전에 테스트하기",
  "Run one Day 3 action. Write Action, Expected, Actual, and Result.":
    "3일차 동작 하나를 실행하고 동작, 예상 결과, 실제 결과, 판정을 쓰세요.",
  "my-app opens": "my-app이 열립니다",
  "One old action can be repeated": "기존 동작 하나를 다시 실행할 수 있습니다",
  "Choose the status that matches your real test.":
    "실제 테스트 결과에 맞는 상태를 고르세요.",
  "GREEN — page and old action work":
    "초록색 — 페이지와 기존 동작이 작동함",
  "YELLOW — page opens, but one check is unclear":
    "노란색 — 페이지는 열리지만 확인 항목 하나가 불분명함",
  "RED — missing, broken, or blocked":
    "빨간색 — 파일이 없거나, 고장 났거나, 진행할 수 없음",
  "Code map": "코드 지도",
  "Locate structure, presentation, and behavior in the learner's real project.":
    "자신의 실제 프로젝트에서 구조, 표현, 동작을 담당하는 위치를 찾으세요.",
  "Read only. Do not edit.": "읽기만 하고 편집하지 마세요.",
  "Find one HTML place, one CSS place, and one JavaScript place.":
    "HTML, CSS, JavaScript 위치를 하나씩 찾으세요.",
  "Write 'not used yet' when a part is not present.":
    "해당 부분이 없으면 'not used yet'이라고 쓰세요.",
  "The learner points to one real HTML, CSS, and JavaScript location or records 'not used yet,' and confirms no file changed.":
    "학습자가 실제 HTML, CSS, JavaScript 위치를 하나씩 찾거나 'not used yet'이라고 기록하고 파일이 변경되지 않았음을 확인합니다.",
  "Three code roles": "코드의 세 가지 역할",
  "Read the three roles. Do not memorize syntax.":
    "세 가지 역할을 읽으세요. 문법을 외울 필요는 없습니다.",
  "HTML = structure": "HTML = 구조",
  "CSS = presentation": "CSS = 표현",
  "JavaScript = behavior": "JavaScript = 동작",
  "Ask for a read-only map": "읽기 전용 코드 지도 요청하기",
  "Ask AI to point to real places. Do not allow file changes.":
    "AI에게 실제 위치를 알려 달라고 하세요. 파일 변경은 허용하지 마세요.",
  "Read my current project only. Do not edit any file.\n\nMake a short code map:\n1. Where is the main HTML structure?\n2. Where is the main CSS presentation?\n3. Where is the main JavaScript behavior?\n\nUse the real file names and nearby text so I can find each place. If a role is not used, say 'not used yet.'":
    "현재 프로젝트를 읽기만 하세요. 어떤 파일도 편집하지 마세요.\n\n짧은 코드 지도를 만들어 주세요:\n1. 주요 HTML 구조는 어디에 있나요?\n2. 주요 CSS 표현은 어디에 있나요?\n3. 주요 JavaScript 동작은 어디에 있나요?\n\n각 위치를 찾을 수 있도록 실제 파일 이름과 주변 텍스트를 사용하세요. 사용하지 않는 역할은 'not used yet'이라고 하세요.",
  "Check the real files": "실제 파일 확인하기",
  "Point to each place in your project, then check file safety.":
    "프로젝트에서 각 위치를 직접 찾은 뒤 파일이 안전한지 확인하세요.",
  "I found one HTML place or wrote 'not used yet.'":
    "HTML 위치 하나를 찾았거나 'not used yet'이라고 썼습니다.",
  "I found one CSS place or wrote 'not used yet.'":
    "CSS 위치 하나를 찾았거나 'not used yet'이라고 썼습니다.",
  "I found one JavaScript place or wrote 'not used yet.'":
    "JavaScript 위치 하나를 찾았거나 'not used yet'이라고 썼습니다.",
  "The file list did not change.": "파일 목록이 변경되지 않았습니다.",
  "No file content changed.": "파일 내용이 변경되지 않았습니다.",
  "Event, state, screen, storage": "이벤트, 상태, 화면, 저장소",
  "Trace one real action through the generated project.":
    "생성된 프로젝트에서 실제 동작 하나의 흐름을 추적하세요.",
  "Choose one action that already works.": "이미 작동하는 동작 하나를 고르세요.",
  "Trace Event → State → Screen → Storage.":
    "이벤트 → 상태 → 화면 → 저장소 순서로 추적하세요.",
  "Write 'not used' for a step your project does not use.":
    "프로젝트에서 사용하지 않는 단계에는 'not used'라고 쓰세요.",
  "The learner records Event, State, Screen, and Storage for one real action and verifies the trace in the browser.":
    "학습자가 실제 동작 하나의 이벤트, 상태, 화면, 저장소를 기록하고 브라우저에서 흐름을 확인합니다.",
  "Action flow": "동작 흐름",
  "Read the four questions before you trace your project.":
    "프로젝트를 추적하기 전에 네 가지 질문을 읽으세요.",
  "Event: What did the user do?": "이벤트: 사용자가 무엇을 했나요?",
  "State: What value changed or was read?":
    "상태: 어떤 값이 바뀌거나 읽혔나요?",
  "Screen: What did the user see?": "화면: 사용자가 무엇을 보았나요?",
  "Storage: What stays after refresh, if anything?":
    "저장소: 새로고침 후에도 남는 것이 있나요?",
  "Trace without editing": "편집하지 않고 추적하기",
  "Complete the action line. Ask for an explanation only.":
    "동작 문장을 완성하고 설명만 요청하세요.",
  "Read my current project only. Do not edit any file.\n\nTrace this working user action: [my action]\n\nExplain:\nEvent → State → Screen → Storage\n\nPoint to the real file and nearby code for each step. If a step is not used, say 'not used.' Keep the answer short.":
    "현재 프로젝트를 읽기만 하세요. 어떤 파일도 편집하지 마세요.\n\n이 작동하는 사용자 동작을 추적하세요: [내 동작]\n\n다음을 설명하세요:\n이벤트 → 상태 → 화면 → 저장소\n\n각 단계의 실제 파일과 주변 코드를 알려 주세요. 사용하지 않는 단계는 'not used'라고 하세요. 답변은 짧게 하세요.",
  "Record the real trace": "실제 흐름 기록하기",
  "Write the four steps. Then run the action and refresh once.":
    "네 단계를 적은 다음 동작을 실행하고 한 번 새로고침하세요.",
  Event: "이벤트",
  State: "상태",
  Screen: "화면",
  Storage: "저장소",
  "Use a short line for each step.": "각 단계를 짧은 한 줄로 쓰세요.",
  "Sprint and Save Point": "스프린트와 저장 지점",
  "Define one safe sprint and protect the working starting state.":
    "안전한 스프린트 하나를 정하고 작동하는 시작 상태를 보호하세요.",
  "Write one success test and one old-action test.":
    "성공 테스트 하나와 기존 동작 테스트 하나를 쓰세요.",
  "Make my-app-day4-start next to my-app.":
    "my-app 옆에 my-app-day4-start를 만드세요.",
  "Open the copy and test it.": "사본을 열고 테스트하세요.",
  "The learner writes success and regression tests, creates my-app-day4-start beside my-app, and proves the copied version opens and works.":
    "학습자가 성공 테스트와 회귀 테스트를 쓰고 my-app 옆에 my-app-day4-start를 만든 뒤 사본이 열리고 작동함을 증명합니다.",
  "One safe sprint": "안전한 스프린트 하나",
  "Use the full loop for one small slice.":
    "작은 기능 하나에 전체 루프를 사용하세요.",
  "TELL — ask for one approved change": "TELL — 승인받은 변경 하나를 요청하기",
  "WATCH — inspect the plan and changed files":
    "WATCH — 계획과 변경된 파일 살펴보기",
  "CHECK — run the success test": "CHECK — 성공 테스트 실행하기",
  "FIX — recover or correct one gap": "FIX — 복구하거나 문제 하나 바로잡기",
  "SAVE — protect only a working version":
    "SAVE — 작동하는 버전만 보호하기",
  "Write tests first": "테스트 먼저 작성하기",
  "Write one new-slice test and one old-action regression test before any change.":
    "변경하기 전에 새 기능 테스트 하나와 기존 동작 회귀 테스트 하나를 쓰세요.",
  "New action": "새 동작",
  "New expected result": "새 예상 결과",
  "Old action": "기존 동작",
  "Old expected result": "기존 예상 결과",
  "Verify the start Save Point": "시작 저장 지점 확인하기",
  "Make the copy beside my-app, then test the copy.":
    "my-app 옆에 사본을 만든 뒤 그 사본을 테스트하세요.",
  "I made my-app-day4-start next to my-app.":
    "my-app 옆에 my-app-day4-start를 만들었습니다.",
  "I copied index.html or the whole project as required.":
    "필요에 따라 index.html 또는 프로젝트 전체를 복사했습니다.",
  "I opened the project from the copy.":
    "사본에서 프로젝트를 열었습니다.",
  "The old action passes in the copy.": "사본에서 기존 동작이 통과합니다.",
  "I did not put the backup inside my-app.":
    "백업을 my-app 안에 넣지 않았습니다.",
  "Pause editing and return ready for recovery practice.":
    "편집을 멈추고 복구 실습을 준비해 돌아오세요.",
  "Return with my-app and my-app-day4-start closed.":
    "my-app과 my-app-day4-start를 닫은 상태로 돌아오세요.",
  "The learner returns by 01:15 with the project protected and ready.":
    "학습자가 01:15까지 프로젝트를 안전하게 보호하고 준비한 상태로 돌아옵니다.",
  "Recovery paths": "복구 방법",
  "Choose a safe recovery move instead of repeating an unclear request.":
    "불분명한 요청을 반복하지 말고 안전한 복구 방법을 고르세요.",
  "STOP when the result is unclear or broken.":
    "결과가 불분명하거나 고장 나면 멈추세요.",
  "Choose one recovery move.": "복구 방법 하나를 고르세요.",
  "Run the same test again after recovery.":
    "복구한 뒤 같은 테스트를 다시 실행하세요.",
  "The learner chooses a safe first recovery move for the practice situation and explains how to verify recovery.":
    "학습자가 실습 상황에 맞는 안전한 첫 복구 방법을 고르고 복구 확인 방법을 설명합니다.",
  "Four recovery moves": "네 가지 복구 방법",
  "Read the moves. The teacher will mark undo as available or unavailable.":
    "복구 방법을 읽으세요. 강사가 실행 취소 사용 가능 여부를 알려 줍니다.",
  "1. Report the exact action, expected result, and actual result.":
    "1. 정확한 동작, 예상 결과, 실제 결과를 보고합니다.",
  "2. Use undo only when the teacher says VERIFIED TODAY.":
    "2. 강사가 VERIFIED TODAY라고 안내한 경우에만 실행 취소를 사용합니다.",
  "3. Ask for a smaller step.": "3. 더 작은 단계를 요청합니다.",
  "4. Start with fresh context or restore the start Save Point.":
    "4. 새 맥락으로 시작하거나 시작 저장 지점을 복원합니다.",
  "Choose the first move": "첫 복구 방법 고르기",
  "A change breaks the page. You can repeat the failure. What should you do first?":
    "변경 후 페이지가 고장 났고 실패를 재현할 수 있습니다. 무엇을 먼저 해야 할까요?",
  "Send the same request again": "같은 요청을 다시 보내기",
  "Stop. Repeating an unclear request adds risk.":
    "멈추세요. 불분명한 요청을 반복하면 위험이 커집니다.",
  "Record Action, Expected, and Actual":
    "동작, 예상 결과, 실제 결과 기록하기",
  "Good. Make the failure clear before the next change.":
    "좋습니다. 다음 변경 전에 실패를 분명히 기록하세요.",
  "Ask for more features": "기능을 더 추가해 달라고 요청하기",
  "Stop. More scope does not repair the current failure.":
    "멈추세요. 범위를 늘려도 현재 실패가 해결되지는 않습니다.",
  report: "보고하기",
  "Prove recovery": "복구 증명하기",
  "Write the exact test you will run after the recovery move.":
    "복구 후 실행할 정확한 테스트를 쓰세요.",
  "I will repeat ... and expect to see ...":
    "...을 다시 실행하고 ...이 나타나는지 확인하겠습니다.",
  "Approve one slice": "기능 하나 승인받기",
  "Approve one testable slice from the existing Day 3 plan.":
    "기존 3일차 계획에서 테스트 가능한 기능 하나를 승인받으세요.",
  "Choose one small slice from your Day 3 MUST plan.":
    "3일차 MUST 계획에서 작은 기능 하나를 고르세요.",
  "Write one action, one visible result, and one regression test.":
    "동작 하나, 눈에 보이는 결과 하나, 회귀 테스트 하나를 쓰세요.",
  "Wait for APPROVED before editing.":
    "편집하기 전에 APPROVED를 받을 때까지 기다리세요.",
  "The learner records one slice with success, regression, and limits, and receives APPROVED, REDUCE, or HOLD.":
    "학습자가 성공 기준, 회귀 테스트, 제한 조건이 포함된 기능 하나를 기록하고 APPROVED, REDUCE, HOLD 중 하나를 받습니다.",
  "Define one slice": "기능 하나 정의하기",
  "Use your own Day 3 plan. Write short, testable lines.":
    "자신의 3일차 계획을 사용하고 짧고 테스트 가능한 문장으로 쓰세요.",
  "One MUST slice": "MUST 기능 하나",
  "One user action": "사용자 동작 하나",
  "One visible result": "눈에 보이는 결과 하나",
  "One old action to keep working": "계속 작동해야 할 기존 동작 하나",
  "Files allowed to change": "변경해도 되는 파일",
  "Complete all five lines.": "다섯 항목을 모두 작성하세요.",
  "Scope gate": "범위 확인",
  "Check the plan before asking for approval.":
    "승인을 요청하기 전에 계획을 확인하세요.",
  "The slice comes from my Day 3 plan.":
    "이 기능은 내 3일차 계획에서 가져왔습니다.",
  "I can test it with one user action.":
    "사용자 동작 하나로 테스트할 수 있습니다.",
  "The expected result is visible.": "예상 결과가 눈에 보입니다.",
  "I named one regression test.": "회귀 테스트 하나를 정했습니다.",
  "my-app-day4-start works.": "my-app-day4-start가 작동합니다.",
  "The plan adds no private data, login, server, or external API.":
    "계획에 개인정보, 로그인, 서버, 외부 API가 추가되지 않습니다.",
  "Teacher status": "강사 상태",
  "Choose the status the teacher gives this slice.":
    "강사가 이 기능에 부여한 상태를 고르세요.",
  "Continue with only this slice.": "이 기능만 계속 제작하세요.",
  REDUCE: "REDUCE",
  "Make the same slice smaller, then ask again.":
    "같은 기능의 범위를 더 작게 줄인 뒤 다시 요청하세요.",
  HOLD: "HOLD",
  "Protect the working project and wait for support.":
    "작동하는 프로젝트를 보호하고 지원을 기다리세요.",
  "Build one approved slice, recover safely, regress, save, and hand off.":
    "승인받은 기능 하나를 만들고, 안전하게 복구하고, 회귀 테스트하고, 저장하고, 인계하세요.",
  "Build only the approved slice.": "승인받은 기능만 만드세요.",
  "Pass the new test and the old test before SAVE.":
    "SAVE하기 전에 새 테스트와 기존 테스트를 모두 통과하세요.",
  "The approved slice and one old action pass in the browser and in my-app-day4-slice, and the learner completes a safe Context Handoff.":
    "승인받은 기능과 기존 동작 하나가 브라우저와 my-app-day4-slice에서 모두 통과하고 학습자가 안전한 맥락 인계문을 완성합니다.",
  "Complete the brackets. Ask for a plan first. Approve only the smallest first step.":
    "대괄호를 모두 채우세요. 먼저 계획을 요청하고 가장 작은 첫 단계만 승인하세요.",
  "Work only in my current project.\n\nMy approved MUST slice is:\n[my own words]\n\nSuccess means:\nWhen I [action], I see [visible result].\n\nKeep this working:\n[old action and expected result]\n\nAllowed files:\n[approved file list]\n\nDo not add a library, server, login, external API, personal data, or extra feature.\nFirst show a short plan:\n1. what you will change;\n2. how I will test success;\n3. how I will test the old action.\n\nDo not edit until I approve the plan.":
    "현재 프로젝트에서만 작업하세요.\n\n승인받은 MUST 기능:\n[내 말로 작성]\n\n성공 기준:\n내가 [동작]하면 [눈에 보이는 결과]가 나타납니다.\n\n계속 작동해야 할 것:\n[기존 동작과 예상 결과]\n\n변경해도 되는 파일:\n[승인받은 파일 목록]\n\n라이브러리, 서버, 로그인, 외부 API, 개인정보, 추가 기능을 넣지 마세요.\n먼저 짧은 계획을 보여 주세요:\n1. 변경할 내용\n2. 성공을 테스트할 방법\n3. 기존 동작을 테스트할 방법\n\n내가 계획을 승인하기 전에는 편집하지 마세요.",
  "CHECK, FIX, and regress": "CHECK하고 FIX하고 회귀 테스트하기",
  "Test the real browser. If the new test fails, choose one recovery move and repeat the same test. Then test the old action.":
    "실제 브라우저에서 테스트하세요. 새 테스트가 실패하면 복구 방법 하나를 고르고 같은 테스트를 반복하세요. 그런 다음 기존 동작을 테스트하세요.",
  "New action / Expected / Actual / Result":
    "새 동작 / 예상 결과 / 실제 결과 / 판정",
  "Old action / Expected / Actual / Result":
    "기존 동작 / 예상 결과 / 실제 결과 / 판정",
  "Refresh or reopen / Expected / Actual / Result":
    "새로고침 또는 다시 열기 / 예상 결과 / 실제 결과 / 판정",
  "Recovery move used, if needed": "사용한 복구 방법(필요한 경우)",
  "The approved new slice passes.": "승인받은 새 기능이 통과합니다.",
  "The old action still passes.": "기존 동작이 계속 통과합니다.",
  "Refresh or reopen does not hide a failure.":
    "새로고침하거나 다시 열어도 실패가 숨겨지지 않습니다.",
  "No file outside the plan changed.":
    "계획에 없는 파일은 변경되지 않았습니다.",
  "SAVE and hand off": "SAVE하고 인계하기",
  "Save only a working version. Then leave enough context for the next session.":
    "작동하는 버전만 저장한 뒤 다음 세션에 필요한 맥락을 충분히 남기세요.",
  "The new test passes in active my-app.":
    "현재 my-app에서 새 테스트가 통과합니다.",
  "The old-action regression test passes in active my-app.":
    "현재 my-app에서 기존 동작 회귀 테스트가 통과합니다.",
  "I made my-app-day4-slice next to my-app.":
    "my-app 옆에 my-app-day4-slice를 만들었습니다.",
  "I opened the saved copy.": "저장한 사본을 열었습니다.",
  "Both tests pass in the saved copy.": "저장한 사본에서 두 테스트가 모두 통과합니다.",
  "My handoff says what works now.":
    "인계문에 현재 작동하는 내용이 적혀 있습니다.",
  "My handoff names my-app-day4-slice.":
    "인계문에 my-app-day4-slice가 명시되어 있습니다.",
  "My handoff records any current problem.":
    "인계문에 현재 문제가 기록되어 있습니다.",
  "My handoff gives one next smallest step.":
    "인계문에 다음으로 할 가장 작은 단계 하나가 적혀 있습니다.",
  "My handoff has no private or secret information.":
    "인계문에 개인정보나 비밀 정보가 없습니다.",
  "Final checkpoint": "최종 점검",
  "Show observable evidence and leave the project in a safe state.":
    "관찰 가능한 증거를 보여 주고 프로젝트를 안전한 상태로 남기세요.",
  "Show the new result, old result, Save Point, and handoff.":
    "새 결과, 기존 결과, 저장 지점, 인계문을 보여 주세요.",
  "Update the side signal.": "옆의 상태 신호를 갱신하세요.",
  "A partner verifies five pieces of evidence, the learner updates the side signal, and records the first Day 5 action.":
    "짝이 증거 다섯 가지를 확인하고 학습자는 옆의 상태 신호를 갱신한 뒤 5일차에 먼저 할 일을 기록합니다.",
  "Show the evidence": "증거 보여 주기",
  "Your partner watches. Do not only point to a file name.":
    "짝이 직접 지켜봅니다. 파일 이름만 가리키지 마세요.",
  "Active my-app opens.": "현재 my-app이 열립니다.",
  "The approved new result can be shown.":
    "승인받은 새 결과를 보여 줄 수 있습니다.",
  "my-app-day4-slice opens and passes both tests.":
    "my-app-day4-slice가 열리고 두 테스트를 모두 통과합니다.",
  "The Context Handoff is complete.": "맥락 인계문이 완성되었습니다.",
  "Final status": "최종 상태",
  "Choose the status that matches the evidence.":
    "증거에 맞는 상태를 고르세요.",
  "GREEN — all five pieces of evidence are ready":
    "초록색 — 증거 다섯 가지가 모두 준비됨",
  "YELLOW — the safe version works, but one record is incomplete":
    "노란색 — 안전한 버전은 작동하지만 기록 하나가 미완성임",
  "RED — the project or safe copy does not work":
    "빨간색 — 프로젝트 또는 안전 사본이 작동하지 않음",
  "Day 5 first action": "5일차에 먼저 할 일",
  "Write the first thing you will test on Day 5.":
    "5일차에 가장 먼저 테스트할 내용을 쓰세요.",
  "On Day 5, I will first test ...":
    "5일차에는 먼저 ...을 테스트하겠습니다.",
  "Action path and optional storage": "동작 경로와 선택적 저장",
  "Trace Event → handler → State → render → Screen.":
    "Event → handler → State → render → Screen 순서로 추적하세요.",
  "Record Storage load/save separately, or write 'not used.'":
    "Storage 불러오기와 저장은 별도로 기록하고, 사용하지 않으면 'not used'라고 쓰세요.",
  "The learner records and verifies Event, handler, State, render, and Screen for one real action, plus a separate Storage load/save note or 'not used.'":
    "학습자가 실제 동작 하나의 Event, handler, State, render, Screen을 기록하고 검증하며, Storage 불러오기·저장을 별도로 기록하거나 'not used'라고 씁니다.",
  "Read the action-path questions and the separate storage question.":
    "동작 경로 질문과 별도의 저장 질문을 읽으세요.",
  "Handler: Which listener or function received the event?":
    "Handler: 어떤 리스너나 함수가 이벤트를 받았나요?",
  "Render: Which code turned state into interface output?":
    "Render: 어떤 코드가 상태를 화면 출력으로 바꾸었나요?",
  "Storage, if promised: What loads into State on start, and what saves from State after a change?":
    "Storage를 약속한 경우: 시작할 때 무엇을 State로 불러오고, 변경 후 무엇을 State에서 저장하나요?",
  "Read my current project only. Do not edit any file.\n\nTrace this working user action: [my action]\n\nAction path:\nEvent → handler → State → render → Screen\n\nSeparate persistence check:\nStorage → State on start, and State → Storage after a change.\nIf persistence is not promised, write 'Storage: not used.'\n\nPoint to the real file and nearby code for each step. Keep the answer short.":
    "현재 프로젝트를 읽기만 하고 어떤 파일도 편집하지 마세요.\n\n작동하는 다음 사용자 동작을 추적하세요: [내 동작]\n\n동작 경로:\nEvent → handler → State → render → Screen\n\n별도의 지속 저장 확인:\n시작할 때 Storage → State, 변경 후 State → Storage.\n지속 저장을 약속하지 않았다면 'Storage: not used.'라고 쓰세요.\n\n각 단계마다 실제 파일과 가까운 코드를 가리키세요. 답은 짧게 쓰세요.",
  "Write the five-step action path. Then record the separate storage branch or 'not used,' run the action, and refresh once.":
    "5단계 동작 경로를 쓰세요. 그런 다음 별도의 저장 분기를 기록하거나 'not used'라고 쓰고, 동작을 실행한 뒤 한 번 새로고침하세요.",
  Handler: "처리 함수",
  Render: "렌더링",
  "Storage load/save or not used": "Storage 불러오기·저장 또는 사용 안 함",
  "TELL — ask for one reviewed READY change":
    "TELL — 검토를 마친 READY 변경 하나 요청하기",
  "Review one slice": "기능 하나 검토하기",
  "Use self-check and peer-check to make one Day 3 slice READY or identify one Yellow mismatch.":
    "자가검수와 짝 검수로 3일차 기능 하나를 READY 상태로 만들거나 Yellow 불일치 하나를 찾으세요.",
  "Self-check, then peer-check the same gate. Use Yellow only for a mismatch or help request.":
    "자가검수한 뒤 짝이 같은 관문을 검수하세요. 불일치나 도움 요청이 있을 때만 Yellow를 사용하세요.",
  "The learner records one slice with success, regression, and limits, completes the same self/peer gate, and either marks READY or resolves one Yellow mismatch with focused teacher help.":
    "학습자가 성공 기준, 회귀 테스트, 제한 조건을 갖춘 기능 하나를 기록하고 같은 자가·짝 검수 관문을 완료한 뒤 READY로 표시하거나 강사의 집중 지원으로 Yellow 불일치 하나를 해결합니다.",
  "Self + peer scope gate": "자가검수 + 짝 범위 관문",
  "Self-check each item, then have a partner repeat the same gate. Check an item here only when both agree it passes.":
    "각 항목을 자가검수한 뒤 짝이 같은 관문을 다시 확인하게 하세요. 두 사람이 모두 통과에 동의한 항목만 여기에서 체크하세요.",
  "READY or Yellow": "READY 또는 Yellow",
  "Choose READY when both checks pass. Choose Yellow only for a mismatch or help request, then show the teacher that item.":
    "두 검수가 모두 통과하면 READY를 고르세요. 불일치나 도움 요청이 있을 때만 Yellow를 고르고 해당 항목만 강사에게 보여 주세요.",
  "READY — both checks pass": "READY — 두 검수 모두 통과",
  "Continue with only this reviewed slice.":
    "검토를 마친 이 기능만 계속 제작하세요.",
  "Yellow — one mismatch or help request":
    "Yellow — 불일치 또는 도움 요청 한 가지",
  "Ask the teacher to review only the mismatched item.":
    "강사에게 불일치 항목만 확인해 달라고 하세요.",
  "Build one reviewed READY slice, recover safely, regress, save, and hand off.":
    "검토를 마친 READY 기능 하나를 만들고 안전하게 복구하고 회귀 테스트한 뒤 저장하고 인계하세요.",
  "Build only the reviewed READY slice.":
    "검토를 마친 READY 기능만 만드세요.",
  "The reviewed READY slice and one old action pass in the browser and in my-app-day4-slice, and the learner completes a safe Context Handoff.":
    "검토를 마친 READY 기능과 기존 동작 하나가 브라우저와 my-app-day4-slice에서 모두 통과하고, 학습자가 안전한 Context Handoff를 완성합니다.",
  "Complete the brackets from the reviewed READY slice. Ask for a plan first and accept only the smallest first step.":
    "검토를 마친 READY 기능을 바탕으로 대괄호를 채우세요. 먼저 계획을 요청하고 가장 작은 첫 단계만 받아들이세요.",
  "Work only in my current project.\n\nMy reviewed READY MUST slice is:\n[my own words]\n\nSuccess means:\nWhen I [action], I see [visible result].\n\nKeep this working:\n[old action and expected result]\n\nAllowed files:\n[reviewed file list]\n\nDo not add a library, server, login, external API, personal data, or extra feature.\nFirst show a short plan:\n1. what you will change;\n2. how I will test success;\n3. how I will test the old action.\n\nDo not edit until I approve the AI plan.":
    "현재 프로젝트 안에서만 작업하세요.\n\n검토를 마친 나의 READY MUST 기능:\n[내 표현으로 쓰기]\n\n성공 기준:\n내가 [동작]하면 [보이는 결과]가 나타난다.\n\n계속 작동해야 할 것:\n[기존 동작과 예상 결과]\n\n변경을 허용한 파일:\n[검토한 파일 목록]\n\n라이브러리, 서버, 로그인, 외부 API, 개인정보, 추가 기능을 넣지 마세요.\n먼저 짧은 계획을 보여 주세요:\n1. 무엇을 바꿀지\n2. 성공을 어떻게 테스트할지\n3. 기존 동작을 어떻게 테스트할지\n\n내가 AI의 계획을 승인하기 전에는 편집하지 마세요.",
  "The reviewed READY slice passes.":
    "검토를 마친 READY 기능이 통과합니다.",
  "The reviewed new result can be shown.":
    "검토를 마친 새 결과를 보여 줄 수 있습니다.",
};

const day5Ko: Record<string, string> = {
  "Test, Learn, and Finish": "테스트하고, 배우고, 완성하기",
  "How can you prove that another person can use what you built?":
    "다른 사람이 내가 만든 것을 사용할 수 있다는 사실을 어떻게 증명할 수 있을까요?",
  "Test evidence and a verified release candidate":
    "테스트 증거와 검증된 출시 후보본",
  "Test strategy": "테스트 전략",
  "Know what counts as evidence and protect the last working build.":
    "무엇이 증거가 되는지 알고 마지막 작동본을 보호하세요.",
  "Do not add a new feature today.": "오늘은 새 기능을 추가하지 마세요.",
  "Write Expected before Actual.": "실제 결과보다 예상 결과를 먼저 쓰세요.",
  "A Day 5 start copy opens and works, and the learner selects Action + Expected + Actual as test evidence.":
    "5일차 시작 사본이 열리고 작동하며, 학습자가 동작+예상 결과+실제 결과를 테스트 증거로 선택합니다.",
  "A claim is not evidence": "주장은 증거가 아니다",
  "Read the three parts of a test record.":
    "테스트 기록의 세 부분을 읽으세요.",
  "Action: what you do.": "동작: 내가 하는 일.",
  "Expected: what should happen.": "예상 결과: 일어나야 하는 일.",
  "Actual: what really happens.": "실제 결과: 실제로 일어난 일.",
  "Write Expected before you run the test.":
    "테스트를 실행하기 전에 예상 결과를 쓰세요.",
  "Choose the evidence": "증거 고르기",
  "Which note is useful test evidence?":
    "어떤 기록이 유용한 테스트 증거일까요?",
  "AI says the project works.": "AI가 프로젝트가 작동한다고 말했습니다.",
  "This is a claim. Run the project yourself.":
    "이것은 주장입니다. 프로젝트를 직접 실행하세요.",
  "Action, Expected, and Actual are recorded.":
    "동작, 예상 결과, 실제 결과가 기록되어 있습니다.",
  "Correct. Another person can repeat this test.":
    "맞습니다. 다른 사람도 이 테스트를 반복할 수 있습니다.",
  "The page looks good.": "페이지가 보기 좋습니다.",
  "This is an opinion, not a repeatable result.":
    "이것은 의견이지 반복 가능한 결과가 아닙니다.",
  "test-record": "테스트 기록",
  "Protect the working version": "작동하는 버전 보호하기",
  "Make and test the Day 5 start copy.":
    "5일차 시작 사본을 만들고 테스트하세요.",
  "Open and test my-app.": "my-app을 열고 테스트하세요.",
  "For one file, make my-app/day5-start.html.":
    "단일 파일 프로젝트라면 my-app/day5-start.html을 만드세요.",
  "For many files, copy the full project as my-app-day5-start.":
    "여러 파일 프로젝트라면 전체 프로젝트를 my-app-day5-start로 복사하세요.",
  "Open the copy and run the main path.":
    "사본을 열고 핵심 경로를 실행하세요.",
  "Write test cards": "테스트 카드 작성",
  "Write a HAPPY test and handle each relevant risk with a visible expected result.":
    "HAPPY 테스트를 작성하고, 해당하는 위험마다 눈으로 확인할 수 있는 예상 결과를 정하세요.",
  "Write one HAPPY test.": "HAPPY 테스트 하나를 작성하세요.",
  "For EMPTY, INVALID, and BOUNDARY, write a test when the condition exists; otherwise write N/A and why.":
    "EMPTY, INVALID, BOUNDARY는 해당 조건이 있을 때 테스트를 작성하고, 해당하지 않으면 N/A와 그 이유를 쓰세요.",
  "A HAPPY card checks a MUST feature, and EMPTY, INVALID, and BOUNDARY each have either a relevant test card or N/A with a reason.":
    "HAPPY 카드는 MUST 기능을 확인하고, EMPTY, INVALID, BOUNDARY에는 각각 관련 테스트 카드 또는 이유를 적은 N/A가 있습니다.",
  "Test risk types": "테스트 위험 유형",
  "Read each type, then decide whether the risk exists in your feature.":
    "각 유형을 읽고 내 기능에 그 위험이 있는지 판단하세요.",
  "EMPTY — required input is missing; use N/A when no input is required.":
    "EMPTY — 필수 입력이 비어 있음. 입력이 필요 없는 기능이면 N/A를 사용하세요.",
  "INVALID — a stated value or action rule is violated; use N/A when no such rule exists.":
    "INVALID — 정해 둔 값 또는 동작 규칙을 위반함. 그런 규칙이 없으면 N/A를 사용하세요.",
  "BOUNDARY — the edge of a stated limit; use N/A when the feature has no limit.":
    "BOUNDARY — 정해 둔 제한의 경계. 기능에 제한이 없으면 N/A를 사용하세요.",
  "Write the relevant test cards": "해당하는 테스트 카드 작성하기",
  "HAPPY is required. For each other type, record Feature, Action or Input, and Expected—or N/A with a reason. Do not run it yet.":
    "HAPPY는 필수입니다. 나머지 유형마다 기능, 동작 또는 입력, 예상 결과를 기록하거나, 해당하지 않으면 N/A와 이유를 쓰세요. 아직 실행하지 마세요.",
  "EMPTY or N/A + reason": "EMPTY 또는 N/A + 이유",
  "INVALID or N/A + reason": "INVALID 또는 N/A + 이유",
  "BOUNDARY or N/A + reason": "BOUNDARY 또는 N/A + 이유",
  "Check the quality of the tests and N/A decisions.":
    "테스트와 N/A 판단이 타당한지 확인하세요.",
  "The HAPPY card checks a MUST feature.":
    "HAPPY 카드가 MUST 기능을 확인합니다.",
  "Every relevant card has an action or input.":
    "해당하는 모든 카드에 동작이나 입력이 있습니다.",
  "Every N/A names why that risk does not exist in this feature.":
    "모든 N/A에 그 위험이 이 기능에 해당하지 않는 이유가 적혀 있습니다.",
  "Write four tests with visible expected results.":
    "눈에 보이는 예상 결과가 있는 테스트 네 개를 쓰세요.",
  "Write one HAPPY, EMPTY, INVALID, and BOUNDARY test.":
    "HAPPY, EMPTY, INVALID, BOUNDARY 테스트를 하나씩 쓰세요.",
  "Use a result that another person can see.":
    "다른 사람이 볼 수 있는 결과를 사용하세요.",
  "Four test cards exist, each with Action or Input and a visible Expected result; at least one checks a MUST feature.":
    "네 테스트 카드에 동작 또는 입력과 눈에 보이는 예상 결과가 있고, 하나 이상이 MUST 기능을 확인합니다.",
  "Four test types": "네 가지 테스트 유형",
  "Read each test type.": "각 테스트 유형을 읽으세요.",
  "HAPPY — the intended use.": "HAPPY — 의도한 사용.",
  "EMPTY — something needed is missing.": "EMPTY — 필요한 값이 비어 있음.",
  "INVALID — the value or action is not allowed.":
    "INVALID — 허용되지 않는 값이나 동작.",
  "BOUNDARY — the edge of the allowed case.":
    "BOUNDARY — 허용 범위의 경계.",
  "Write four test cards": "테스트 카드 네 개 작성하기",
  "For each type, record Feature, Action or Input, and Expected. Do not run it yet.":
    "각 유형의 기능, 동작 또는 입력, 예상 결과를 기록하세요. 아직 실행하지는 마세요.",
  HAPPY: "HAPPY",
  EMPTY: "EMPTY",
  INVALID: "INVALID",
  BOUNDARY: "BOUNDARY",
  Feature: "기능",
  "Action or Input": "동작 또는 입력",
  "Expected visible result": "눈에 보이는 예상 결과",
  "Check the cards": "카드 확인하기",
  "Check the quality of your four cards.":
    "테스트 카드 네 개의 품질을 확인하세요.",
  "Every card has an action or input.":
    "모든 카드에 동작이나 입력이 있습니다.",
  "Every Expected result can be seen or compared.":
    "모든 예상 결과를 보거나 비교할 수 있습니다.",
  "At least one card checks a MUST feature.":
    "카드 하나 이상이 MUST 기능을 확인합니다.",
  "No card says only “It works.”":
    "어떤 카드도 “작동한다”라고만 쓰지 않았습니다.",
  "I can identify the focused control while using Tab.":
    "Tab 키로 이동할 때 현재 초점을 받은 요소를 알아볼 수 있습니다.",
  "Every input has a visible label, or this project has no input.":
    "모든 입력 요소에 보이는 레이블이 있거나, 이 프로젝트에는 입력 요소가 없습니다.",
  "Two peer-test rounds": "동료 테스트 2회",
  "Watch a peer use the project and record what really happens.":
    "동료가 프로젝트를 사용하는 모습을 보고 실제로 일어난 일을 기록하세요.",
  "Maker: watch and do not explain.": "제작자: 지켜보고 설명하지 않습니다.",
  "Tester: think aloud and use no private data.":
    "테스터: 생각을 소리 내어 말하고 개인정보를 사용하지 않습니다.",
  "Do not fix during the test.": "테스트 중에는 수정하지 마세요.",
  "Both learners complete one tester role and one maker role, with at least one pass and one clear observation recorded.":
    "두 학습자가 테스터와 제작자 역할을 한 번씩 수행하고, 통과 결과 하나 이상과 명확한 관찰 하나를 기록합니다.",
  "Peer test — Round 1": "동료 테스트 — 1회차",
  "The tester uses the cards. The maker watches and records evidence.":
    "테스터는 카드를 사용하고 제작자는 지켜보며 증거를 기록합니다.",
  "First action": "첫 동작",
  "Pause or repeat": "멈추거나 반복한 지점",
  "Unexpected action or result": "예상하지 못한 동작 또는 결과",
  "One pass or fail": "통과 또는 실패 한 가지",
  "Peer test — Round 2": "동료 테스트 — 2회차",
  "Switch roles. Test the other project and record what happened.":
    "역할을 바꾸세요. 상대 프로젝트를 테스트하고 일어난 일을 기록하세요.",
  "One clear observation": "명확한 관찰 한 가지",
  "Rest and return ready to sort the evidence.":
    "쉬고 나서 증거를 분류할 준비를 하세요.",
  "Do not start a fix.": "수정을 시작하지 마세요.",
  "The break timer ends and the learner returns at 01:10.":
    "휴식 타이머가 끝나면 학습자가 01:10에 돌아옵니다.",
  "10-minute break": "10분 휴식",
  "Pause your work and return when the timer ends.":
    "작업을 멈추고 타이머가 끝나면 돌아오세요.",
  "Sort problems": "문제 분류",
  "Turn observations into evidence and choose what matters first.":
    "관찰 내용을 증거로 바꾸고 무엇이 가장 중요한지 정하세요.",
  "A new feature is not a bug.": "새 기능은 버그가 아닙니다.",
  "Choose no more than three fixes.": "수정 항목은 세 개 이하로 고르세요.",
  "The learner records evidence for each chosen problem, assigns a priority, and keeps no more than three fixes.":
    "학습자가 선택한 문제마다 증거와 우선순위를 기록하고 수정 항목을 세 개 이하로 유지합니다.",
  "Write the evidence": "증거 작성하기",
  "Describe one problem without giving an opinion.":
    "의견을 덧붙이지 말고 문제 하나를 설명하세요.",
  "When the tester __________, the project __________. I expected __________.":
    "테스터가 __________했을 때 프로젝트는 __________했습니다. 나는 __________을 예상했습니다.",
  "Write one repeatable observation.": "반복 가능한 관찰 하나를 쓰세요.",
  "Choose a priority": "우선순위 정하기",
  "Classify the first problem.": "첫 번째 문제를 분류하세요.",
  "MUST FIX": "반드시 수정",
  "Use this for a blocked main action, wrong result, unsafe result, or demo blocker.":
    "핵심 동작 차단, 잘못된 결과, 안전하지 않은 결과, 데모 방해 문제에 사용하세요.",
  "SHOULD FIX": "가능하면 수정",
  "Use this when the action is hard but a safe workaround exists.":
    "동작이 어렵지만 안전한 우회 방법이 있을 때 사용하세요.",
  LATER: "나중에",
  "Use this for a new feature, large redesign, or unsafe test.":
    "새 기능, 큰 재설계, 안전하지 않은 테스트에 사용하세요.",
  "Keep the plan small": "계획을 작게 유지하기",
  "Check the problem list.": "문제 목록을 확인하세요.",
  "Each problem has evidence.": "각 문제에 증거가 있습니다.",
  "A new feature is not listed as a bug.":
    "새 기능이 버그로 기록되어 있지 않습니다.",
  "Safety and the main path come first.":
    "안전과 핵심 경로를 가장 먼저 다룹니다.",
  "I chose no more than three fixes.":
    "수정 항목을 세 개 이하로 골랐습니다.",
  "Safety and accessibility": "안전성과 접근성",
  "Find an obvious safety or access barrier before fixing.":
    "수정하기 전에 명확한 안전 또는 접근 장벽을 찾으세요.",
  "Check secrets, private data, text, labels, focus, and a narrow window.":
    "비밀 정보, 개인정보, 글자, 레이블, 포커스, 좁은 화면을 확인하세요.",
  "Record one issue.": "문제 하나를 기록하세요.",
  "All safety and quick-access checks are marked, and one observed issue or “no issue found” is recorded.":
    "모든 안전·간단 접근성 항목을 확인하고 관찰한 문제 하나 또는 “문제 없음”을 기록합니다.",
  "Safety check": "안전 확인",
  "Check the current project.": "현재 프로젝트를 확인하세요.",
  "No password, API key, or secret is visible.":
    "비밀번호, API 키, 비밀 정보가 보이지 않습니다.",
  "No sensitive personal data is stored or shown.":
    "민감한 개인정보가 저장되거나 표시되지 않습니다.",
  "Important facts or numbers were checked.":
    "중요한 사실이나 숫자를 확인했습니다.",
  "Every external link or library is understood.":
    "모든 외부 링크와 라이브러리의 용도를 이해합니다.",
  "The project does not ask a user to pay or sign in.":
    "프로젝트가 사용자에게 결제나 로그인을 요구하지 않습니다.",
  "Quick access check": "간단 접근성 확인",
  "Use the keyboard and a narrow browser window.":
    "키보드와 좁은 브라우저 창을 사용하세요.",
  "The page has a clear title.": "페이지에 명확한 제목이 있습니다.",
  "Buttons say what they do.": "버튼 이름이 하는 일을 설명합니다.",
  "Text is readable.": "글자를 읽기 쉽습니다.",
  "Tab reaches the main controls.": "Tab 키로 주요 조작 요소에 이동할 수 있습니다.",
  "Keyboard focus is visible.": "키보드 포커스가 눈에 보입니다.",
  "Every input has a visible label.": "모든 입력란에 눈에 보이는 레이블이 있습니다.",
  "The main path works in a narrow window.":
    "좁은 창에서도 핵심 경로가 작동합니다.",
  "Record one result": "결과 하나 기록하기",
  "Write one issue. If none was found, say what you tested.":
    "문제 하나를 쓰세요. 문제가 없다면 무엇을 테스트했는지 쓰세요.",
  "I tested… I found…": "테스트한 것… 발견한 것…",
  "Approve the fix plan": "수정 계획 승인",
  "Get approval for a small, testable fix plan.":
    "작고 테스트 가능한 수정 계획을 승인받으세요.",
  "Start with a MUST FIX item.": "MUST FIX 항목부터 시작하세요.",
  "One problem, one small change, one success check.":
    "문제 하나, 작은 변경 하나, 성공 확인 하나.",
  "The first fix has Problem, Evidence, Small fix, Success means, and Must keep working, and the teacher marks READY.":
    "첫 수정 계획에 문제, 증거, 작은 수정, 성공 기준, 계속 작동해야 할 내용이 있고 강사가 READY로 표시합니다.",
  "Write Fix 1": "수정 1 작성하기",
  "Write the first small fix plan.": "첫 번째 작은 수정 계획을 쓰세요.",
  "Problem:\nEvidence:\nPriority:\nSmall fix:\nSuccess means:\nMust keep working:":
    "문제:\n증거:\n우선순위:\n작은 수정:\n성공 기준:\n계속 작동해야 할 것:",
  "Complete every line.": "모든 항목을 작성하세요.",
  "Approval gate": "승인 단계",
  "Show this checklist to the teacher.": "이 체크리스트를 강사에게 보여 주세요.",
  "MUST FIX comes first.": "MUST FIX 항목이 가장 먼저입니다.",
  "The change is small.": "변경 범위가 작습니다.",
  "Success can be tested.": "성공 여부를 테스트할 수 있습니다.",
  "No large new feature is added.": "큰 새 기능이 추가되지 않습니다.",
  "Teacher marked READY.": "강사가 READY로 표시했습니다.",
  "Fix one approved problem at a time, re-test, and save only working code.":
    "승인받은 문제를 한 번에 하나씩 수정하고 다시 테스트한 뒤 작동하는 코드만 저장하세요.",
  "Fix one problem.": "문제 하나를 수정하세요.",
  "Test the failed path and the main HAPPY path.":
    "실패했던 경로와 핵심 HAPPY 경로를 테스트하세요.",
  "Save only after the tests pass.": "테스트를 통과한 뒤에만 저장하세요.",
  "At least the first approved fix passes its failed test, the main HAPPY path still passes, and a working Save Point is recorded.":
    "첫 번째 승인 수정이 실패했던 테스트를 통과하고 핵심 HAPPY 경로도 계속 통과하며 작동하는 저장 지점이 기록됩니다.",
  "Fix one problem": "문제 하나 수정하기",
  "Complete this request for one approved problem. Read it before you send it.":
    "승인받은 문제 하나에 맞게 이 요청을 완성하고 보내기 전에 읽으세요.",
  "Problem:\n[write the problem]\n\nEvidence:\n[write what happened]\n\nExpected:\n[write the result you need]\n\nPlease fix only this problem.\nKeep every working MUST feature working.\nDo not add a new feature, library, login, API, or file unless I approve it.\nAfter the change, tell me what I should test again.":
    "문제:\n[문제를 쓰세요]\n\n증거:\n[일어난 일을 쓰세요]\n\n예상 결과:\n[필요한 결과를 쓰세요]\n\n이 문제만 수정해 주세요.\n작동하는 모든 MUST 기능을 계속 작동하게 유지하세요.\n내 승인 없이 새 기능, 라이브러리, 로그인, API, 파일을 추가하지 마세요.\n변경 후 무엇을 다시 테스트해야 하는지 알려 주세요.",
  "Test after the fix": "수정 후 테스트하기",
  "Record the result after each approved fix.":
    "승인받은 수정을 할 때마다 결과를 기록하세요.",
  "Failed test before": "수정 전 실패한 테스트",
  "Actual result after": "수정 후 실제 결과",
  "Main HAPPY re-test": "핵심 HAPPY 재테스트",
  "50-minute fix window": "50분 수정 시간",
  "Repeat CHECK → FIX → CHECK → SAVE. Use the remaining time to close the record and stop before the final smoke test.":
    "CHECK → FIX → CHECK → SAVE를 반복하세요. 남은 시간에는 기록을 마무리하고 최종 스모크 테스트 전에는 수정을 멈추세요.",
  "Other MUST paths": "다른 MUST 경로",
  "Save Point": "저장 지점",
  "The failed test passes.": "실패했던 테스트가 통과합니다.",
  "The main path still works.": "핵심 경로가 계속 작동합니다.",
  "No private or secret data appears.":
    "개인정보나 비밀 정보가 나타나지 않습니다.",
  "60-minute fix window": "60분 수정 시간",
  "Repeat CHECK → FIX → CHECK → SAVE. Stop new work before the final smoke test.":
    "CHECK → FIX → CHECK → SAVE를 반복하세요. 최종 스모크 테스트 전에 새 작업을 멈추세요.",
  "Backup and demo path": "백업과 데모 경로",
  "Verify the release candidate and record the Day 6 demo path.":
    "출시 후보본을 검증하고 6일차 데모 경로를 기록하세요.",
  "Run one final smoke test.": "최종 스모크 테스트를 한 번 실행하세요.",
  "Open and test the release candidate copy.":
    "출시 후보 사본을 열고 테스트하세요.",
  "Write the exact demo path.": "정확한 데모 경로를 쓰세요.",
  "The verified release candidate opens and passes the smoke test, and an exact open–act–show demo path is saved.":
    "검증된 출시 후보본이 열리고 스모크 테스트를 통과하며 정확한 열기–동작–보여주기 데모 경로가 저장됩니다.",
  "Final smoke test": "최종 스모크 테스트",
  "Run the project from the beginning.": "프로젝트를 처음부터 실행하세요.",
  "Open the project": "프로젝트 열기",
  "Run the main demo path": "핵심 데모 경로 실행하기",
  "Refresh and repeat": "새로고침하고 반복하기",
  "Check for private or secret data": "개인정보나 비밀 정보 확인하기",
  "Check for a blocking error": "진행을 막는 오류 확인하기",
  "The first screen appears.": "첫 화면이 나타납니다.",
  "The main result appears.": "핵심 결과가 나타납니다.",
  "The path works again after refresh.":
    "새로고침 후에도 경로가 다시 작동합니다.",
  "No blocking error appears.": "진행을 막는 오류가 나타나지 않습니다.",
  "Make the release candidate": "출시 후보본 만들기",
  "Copy, open, and test the correct release candidate.":
    "올바른 출시 후보본을 복사하고 열어 테스트하세요.",
  "For one file, make my-app/day5-release-candidate.html.":
    "단일 파일 프로젝트라면 my-app/day5-release-candidate.html을 만드세요.",
  "For many files, copy the project as my-app-day5-release-candidate.":
    "여러 파일 프로젝트라면 프로젝트를 my-app-day5-release-candidate로 복사하세요.",
  "Open the release candidate copy.": "출시 후보 사본을 여세요.",
  "Run the smoke test on the copy.": "사본에서 스모크 테스트를 실행하세요.",
  "Refresh and verify the project's stated storage behavior, then run the main path again":
    "새로고침한 뒤 프로젝트가 약속한 저장 동작을 확인하고 핵심 경로를 다시 실행하기",
  "After refresh, stored or reset state matches the project promise and the main path can run again.":
    "새로고침 후 저장되거나 초기화된 상태가 프로젝트의 약속과 일치하고 핵심 경로를 다시 실행할 수 있습니다.",
  "Draft the demo path": "데모 경로 초안 작성하기",
  "Write only the actions and visible result.":
    "동작과 눈에 보이는 결과만 쓰세요.",
  "Open:\nClick or enter:\nShow:\nStop:":
    "열기:\n클릭 또는 입력:\n보여 줄 결과:\n종료:",
  "Write the exact path for Day 6.": "6일차에 사용할 정확한 경로를 쓰세요.",
  "Review the fix plan": "수정 계획 검토하기",
  "Use self-check and peer-check to make one small fix READY or identify one Yellow mismatch.":
    "자가검수와 짝 검수로 작은 수정 하나를 READY 상태로 만들거나 Yellow 불일치 하나를 찾으세요.",
  "The first fix has Problem, Evidence, Small fix, Success means, and Must keep working; the learner completes the same self/peer gate and either marks READY or resolves one Yellow mismatch with focused teacher help.":
    "첫 수정에 Problem, Evidence, Small fix, Success means, Must keep working이 모두 있고, 학습자가 같은 자가·짝 검수 관문을 완료한 뒤 READY로 표시하거나 강사의 집중 지원으로 Yellow 불일치 하나를 해결합니다.",
  "Self → peer → Yellow gate": "자가검수 → 짝 검수 → Yellow 관문",
  "Self-check the five plan criteria, then have a partner repeat them. If both agree, mark READY; if one item differs or needs help, mark Yellow and show only that item to the teacher.":
    "계획 기준 다섯 가지를 자가검수한 뒤 짝이 같은 기준을 다시 확인하게 하세요. 두 사람이 모두 동의하면 READY로 표시하고, 항목 하나가 다르거나 도움이 필요하면 Yellow로 표시한 뒤 그 항목만 강사에게 보여 주세요.",
  "One working MUST path is named for regression.":
    "회귀 테스트할 작동 중인 MUST 경로 하나가 명시되어 있습니다.",
  "My partner repeated the same five checks.":
    "짝이 같은 다섯 가지 검사를 반복했습니다.",
  "Both checks agree, or I marked the mismatched item Yellow for focused teacher help.":
    "두 검수 결과가 일치하거나, 불일치 항목을 Yellow로 표시해 강사의 집중 지원을 요청했습니다.",
  "Fix one reviewed READY problem at a time, re-test, and save only working code.":
    "검토를 마친 READY 문제를 한 번에 하나씩 수정하고 다시 테스트한 뒤 작동하는 코드만 저장하세요.",
  "At least the first reviewed READY fix passes its failed test, the main HAPPY path and named MUST paths still pass, and a working Save Point is recorded.":
    "검토를 마친 첫 READY 수정이 실패했던 테스트를 통과하고, 핵심 HAPPY 경로와 기록한 MUST 경로가 계속 통과하며, 작동하는 Save Point가 기록됩니다.",
  "Complete this request for one reviewed READY problem. Read it before you send it.":
    "검토를 마친 READY 문제 하나에 맞게 이 요청을 완성하고 보내기 전에 읽으세요.",
  "Record all five results after each reviewed READY fix.":
    "검토를 마친 READY 수정마다 결과 다섯 가지를 기록하세요.",
};

const day6Ko: Record<string, string> = {
  "Ship, Showcase, Reflect": "완성하고, 발표하고, 돌아보기",
  "How can you explain your result and your AI collaboration responsibly?":
    "결과물과 AI 협업 과정을 어떻게 책임 있게 설명할 수 있을까요?",
  "A final backup, a two-minute demo, feedback, and reflection":
    "최종 백업, 2분 데모, 피드백, 회고",
  "Final readiness": "최종 준비 확인",
  "Choose the working version and test the full demo path.":
    "작동하는 버전을 고르고 전체 데모 경로를 테스트하세요.",
  "Choose the version that works, not only the newest one.":
    "가장 최신 버전이 아니라 실제로 작동하는 버전을 고르세요.",
  "Run the full path twice.": "전체 경로를 두 번 실행하세요.",
  "The learner records the exact version, runs the full demo path twice, and updates the side signal with evidence.":
    "학습자가 정확한 버전을 기록하고 전체 데모 경로를 두 번 실행한 뒤 증거에 맞게 옆의 상태 신호를 갱신합니다.",
  "Choose the working version": "작동하는 버전 고르기",
  "Open the Day 5 release candidate and the current project. Record the version you will test first.":
    "5일차 출시 후보본과 현재 프로젝트를 열고 먼저 테스트할 버전을 기록하세요.",
  "File or folder:\nWhy this version:":
    "파일 또는 폴더:\n이 버전을 고른 이유:",
  "Choose it because it works.": "작동한다는 이유로 선택하세요.",
  "Run the full path": "전체 경로 실행하기",
  "Test from the beginning, refresh, and test again.":
    "처음부터 테스트하고 새로고침한 뒤 다시 테스트하세요.",
  "Test from a known start, refresh and compare the result with the project's stated storage behavior, then run the path with a second safe sample.":
    "알려진 시작 상태에서 테스트하고, 새로고침 후 결과가 프로젝트의 저장 약속과 일치하는지 비교한 다음, 안전한 두 번째 샘플로 경로를 실행하세요.",
  "Run the demo path": "데모 경로 실행하기",
  "Confirm the final file or folder": "최종 파일 또는 폴더 확인하기",
  "Run the demo path with Sample A or another safe sample":
    "샘플 A 또는 다른 안전한 샘플로 데모 경로 실행하기",
  "Refresh and compare stored or reset state with the project promise":
    "새로고침한 뒤 저장되거나 초기화된 상태를 프로젝트의 약속과 비교하기",
  "Run the path with Sample B or a different safe sample":
    "샘플 B 또는 다른 안전한 샘플로 경로 실행하기",
  "The MUST results appear.": "MUST 결과가 나타납니다.",
  "The path works again.": "경로가 다시 작동합니다.",
  "After refresh, the state matches the project's promise.":
    "새로고침 후 상태가 프로젝트의 약속과 일치합니다.",
  "The second sample produces the expected result without a false duplicate.":
    "두 번째 샘플이 잘못된 중복 없이 예상 결과를 냅니다.",
  "The exact version is known.": "정확한 버전을 알고 있습니다.",
  "Choose the status supported by your test.":
    "테스트 증거에 맞는 상태를 고르세요.",
  "✓ GREEN — ready to freeze": "✓ 초록색 — 동결 준비 완료",
  "Do not add a feature. Prepare the demo.":
    "기능을 추가하지 말고 데모를 준비하세요.",
  "! YELLOW — one demo blocker": "! 노란색 — 데모를 막는 문제 한 가지",
  "Ask for approval before one small fix.":
    "작은 수정 하나를 하기 전에 승인을 받으세요.",
  "✕ RED — project or main path fails":
    "✕ 빨간색 — 프로젝트 또는 핵심 경로가 실패함",
  "Stop new work and restore the last working version.":
    "새 작업을 멈추고 마지막 작동본을 복원하세요.",
  "Last blocker fix": "마지막 핵심 문제 해결",
  "Fix only one repeatable demo blocker or restore the last working version.":
    "재현 가능한 데모 방해 문제 하나만 수정하거나 마지막 작동본을 복원하세요.",
  "No new feature.": "새 기능은 추가하지 않습니다.",
  "Fix only a repeatable demo blocker.":
    "재현 가능한 데모 방해 문제만 수정하세요.",
  "If the fix fails, restore the Day 5 candidate.":
    "수정이 실패하면 5일차 후보본을 복원하세요.",
  "The learner either records “READY — NO CHANGE” or re-tests one approved blocker and chooses a working version to freeze.":
    "학습자가 “READY — NO CHANGE”를 기록하거나 승인받은 문제 하나를 다시 테스트하고 동결할 작동 버전을 고릅니다.",
  "Use the blocker gate": "핵심 문제 판단 기준 사용하기",
  "READY — no code change": "READY — 코드 변경 없음",
  "Keep the working version. Prepare the demo.":
    "작동하는 버전을 유지하고 데모를 준비하세요.",
  "One repeatable demo blocker — ask for approval":
    "재현 가능한 데모 방해 문제 하나 — 승인 요청",
  "The problem must block the demo and fit one small testable change.":
    "문제가 데모를 막고 작고 테스트 가능한 변경 하나로 해결 가능해야 합니다.",
  "Main path fails — restore the Day 5 candidate":
    "핵심 경로 실패 — 5일차 후보본 복원",
  "A working older version is safer than a broken newer one.":
    "작동하는 이전 버전이 고장 난 최신 버전보다 안전합니다.",
  "Fix only the blocker": "핵심 문제만 수정하기",
  "Use this only after teacher approval. If you are ready, do not send it.":
    "강사 승인 후에만 사용하세요. 이미 준비되었다면 보내지 마세요.",
  "This is the final blocker before my demo.\n\nAction:\n[write the action]\n\nActual:\n[write what happened]\n\nExpected:\n[write what must happen]\n\nFix only this blocker.\nDo not add a new feature, library, API, login, or file.\nKeep every working MUST feature unchanged.\nAfter the change, tell me the exact demo path to re-test.":
    "데모 전 마지막 핵심 문제입니다.\n\n동작:\n[동작을 쓰세요]\n\n실제 결과:\n[일어난 일을 쓰세요]\n\n예상 결과:\n[일어나야 할 일을 쓰세요]\n\n이 문제만 수정하세요.\n새 기능, 라이브러리, API, 로그인, 파일을 추가하지 마세요.\n작동하는 모든 MUST 기능을 그대로 유지하세요.\n변경 후 다시 테스트할 정확한 데모 경로를 알려 주세요.",
  "Re-test or restore": "다시 테스트하거나 복원하기",
  "Run the blocker test and the full demo path. If it fails, restore the Day 5 candidate.":
    "핵심 문제 테스트와 전체 데모 경로를 실행하세요. 실패하면 5일차 후보본을 복원하세요.",
  "Blocker test or no-change decision": "핵심 문제 테스트 또는 변경 없음 결정",
  "Full demo path": "전체 데모 경로",
  "Version to freeze": "동결할 버전",
  "The chosen version completes the full demo path.":
    "선택한 버전이 전체 데모 경로를 완료합니다.",
  "No new feature was added.": "새 기능을 추가하지 않았습니다.",
  "Code Freeze": "코드 동결",
  "Stop code changes and verify the final backup.":
    "코드 변경을 멈추고 최종 백업을 확인하세요.",
  "No new AI change request after freeze.":
    "동결 후에는 AI에게 새 변경을 요청하지 않습니다.",
  "Open and test the final backup.": "최종 백업을 열고 테스트하세요.",
  "Write new ideas as a Next Step.": "새 아이디어는 다음 단계로 기록하세요.",
  "Code Freeze is confirmed, the exact final backup opens, and its full demo path passes.":
    "코드 동결을 확인하고 정확한 최종 백업이 열리며 전체 데모 경로가 통과합니다.",
  "Read the freeze rules before you make the final copy.":
    "최종 사본을 만들기 전에 동결 규칙을 읽으세요.",
  "No new AI change request.": "AI에게 새 변경을 요청하지 않습니다.",
  "No redesign.": "재설계하지 않습니다.",
  "Write every new idea as a Next Step.":
    "모든 새 아이디어를 다음 단계로 기록하세요.",
  "Make the final backup": "최종 백업 만들기",
  "Copy and open the final version.": "최종 버전을 복사하고 여세요.",
  "For one file, make my-app/day6-final.html.":
    "단일 파일 프로젝트라면 my-app/day6-final.html을 만드세요.",
  "For many files, copy the project as my-app-day6-final.":
    "여러 파일 프로젝트라면 프로젝트를 my-app-day6-final로 복사하세요.",
  "Open the final backup.": "최종 백업을 여세요.",
  "Run the demo path on the backup.": "백업에서 데모 경로를 실행하세요.",
  "Verify the frozen version": "동결된 버전 확인하기",
  "Record the exact backup and its result.":
    "정확한 백업과 그 결과를 기록하세요.",
  "Final file or folder": "최종 파일 또는 폴더",
  "Open result": "열기 결과",
  "Demo path result": "데모 경로 결과",
  "The final backup opens and the demo path works.":
    "최종 백업이 열리고 데모 경로가 작동합니다.",
  "Rest and prepare a private, clean presentation screen.":
    "쉬고 나서 개인정보가 보이지 않는 깔끔한 발표 화면을 준비하세요.",
  "Close private tabs and notifications.":
    "개인 탭과 알림을 닫으세요.",
  "The break timer ends, private tabs are closed, and the learner returns at 01:00.":
    "휴식 타이머가 끝나고 개인 탭을 닫은 상태로 학습자가 01:00에 돌아옵니다.",
  "Close private tabs and notifications. Return when the timer ends.":
    "개인 탭과 알림을 닫고 타이머가 끝나면 돌아오세요.",
  "Partner rehearsal": "짝과 발표 연습",
  "Rehearse a clear two-minute demo with a partner.":
    "짝과 명확한 2분 데모를 연습하세요.",
  "Show User & Problem, Working MUST Features, Test & Learning, and Limit & Next Step.":
    "사용자와 문제, 작동하는 MUST 기능, 테스트와 배움, 한계와 다음 단계를 보여 주세요.",
  "Use the final backup.": "최종 백업을 사용하세요.",
  "Remove extra clicks and words.": "불필요한 클릭과 말을 줄이세요.",
  "Each learner completes one timed rehearsal in two minutes or less, records partner feedback, and saves the final click path.":
    "각 학습자가 2분 이내의 연습을 완료하고 짝의 피드백을 기록한 뒤 최종 클릭 경로를 저장합니다.",
  "Write the two-minute demo": "2분 데모 작성하기",
  "Write short notes for the four parts.":
    "네 부분에 대한 짧은 메모를 쓰세요.",
  "0:00–0:20 — User & Problem:\n0:20–1:20 — Working MUST Features:\n1:20–1:45 — Test & Learning:\n1:45–2:00 — Limit & Next Step:\n\nOpen:\nClick or enter:\nShow:\nStop:":
    "0:00–0:20 — 사용자와 문제:\n0:20–1:20 — 작동하는 MUST 기능:\n1:20–1:45 — 테스트와 배움:\n1:45–2:00 — 한계와 다음 단계:\n\n열기:\n클릭 또는 입력:\n보여 줄 결과:\n종료:",
  "Use short notes, not a long speech.": "긴 대본 대신 짧은 메모를 사용하세요.",
  "Two-minute rehearsal": "2분 리허설",
  "Start the final backup and finish before the timer ends.":
    "최종 백업으로 시작하고 타이머가 끝나기 전에 마치세요.",
  "Partner check": "짝 확인",
  "Give short feedback, then switch roles.":
    "짧게 피드백한 뒤 역할을 바꾸세요.",
  "The clearest part": "가장 명확했던 부분",
  "One click or sentence to remove": "줄일 클릭 또는 문장 하나",
  "One part I could not see or hear": "보거나 듣지 못한 부분 하나",
  Showcase: "결과물 발표",
  "Show working evidence in a fair, timed presentation slot.":
    "정해진 공정한 발표 시간 안에 작동 증거를 보여 주세요.",
  "2 minutes: demo.": "2분: 데모.",
  "1 minute: question or feedback.": "1분: 질문 또는 피드백.",
  "1 minute: switch.": "1분: 발표자 전환.",
  "Show evidence and respect the next presenter.":
    "증거를 보여 주고 다음 발표자의 시간을 지켜 주세요.",
  "The learner completes the scheduled demo within the slot or uses the approved fallback, and the audience records visible evidence.":
    "학습자가 정해진 시간 안에 데모를 마치거나 승인된 대체 방법을 사용하고 청중은 눈에 보인 증거를 기록합니다.",
  "The learner completes the scheduled demo within the slot or follows the prepared final-backup → Day 5 candidate → Day 5 test-record ladder, and the audience records what the evidence actually proves.":
    "학습자가 정해진 시간 안에 데모를 완료하거나 준비한 최종 백업 → 5일차 후보본 → 5일차 테스트 기록 순서로 대체하고, 청중은 그 증거가 실제로 무엇을 입증하는지 기록합니다.",
  "Presenter ready": "발표자 준비",
  "Check these items before your slot.": "발표 전에 다음 항목을 확인하세요.",
  "The final file is open.": "최종 파일이 열려 있습니다.",
  "The click path is ready.": "클릭 경로가 준비되었습니다.",
  "A fallback is ready.": "대체 자료가 준비되었습니다.",
  "The Day 5 candidate and Day 5 test record are easy to locate.":
    "5일차 후보본과 5일차 테스트 기록을 쉽게 찾을 수 있습니다.",
  "Private tabs are closed.": "개인 탭을 닫았습니다.",
  "Four-minute showcase slot": "4분 발표 시간",
  "Repeat this timer for each presenter: 2:00 demo, 1:00 feedback, 1:00 switch.":
    "발표자마다 이 타이머를 반복하세요: 데모 2분, 피드백 1분, 전환 1분.",
  "DEMO — 2:00": "데모 — 2:00",
  "FEEDBACK — 1:00": "피드백 — 1:00",
  "SWITCH — 1:00": "전환 — 1:00",
  "Present your final build. As an audience member, record what you saw.":
    "최종 결과물을 발표하세요. 청중은 직접 본 내용을 기록하세요.",
  "User and problem": "사용자와 문제",
  "Working result": "작동하는 결과",
  "Test and learning": "테스트와 배움",
  "Limit and next step": "한계와 다음 단계",
  "Peer feedback": "동료 피드백",
  "Give two specific feedback notes based on what you saw or heard.":
    "직접 보거나 들은 내용을 바탕으로 구체적인 피드백 두 개를 작성하세요.",
  "Write what you saw.": "직접 본 내용을 쓰세요.",
  "Do not judge English, project topic, or visual taste.":
    "영어 실력, 프로젝트 주제, 시각적 취향을 평가하지 마세요.",
  "Two feedback records each contain I saw, One clear decision, and One question, and both are delivered.":
    "피드백 두 개에 각각 본 것, 명확한 결정 하나, 질문 하나가 포함되고 모두 전달됩니다.",
  "Feedback 1": "피드백 1",
  "Write specific feedback for one presenter.":
    "발표자 한 명에게 구체적인 피드백을 쓰세요.",
  "I saw": "내가 본 것",
  "One clear decision": "명확한 결정 하나",
  "One question": "질문 하나",
  "Feedback 2": "피드백 2",
  "Write specific feedback for a different presenter.":
    "다른 발표자에게 구체적인 피드백을 쓰세요.",
  "Reflection and close": "성찰 및 마무리",
  "Explain one decision, one AI check, and one next learning habit.":
    "결정 하나, AI 결과 확인 하나, 다음 학습 습관 하나를 설명하세요.",
  "Name what you decided.": "내가 결정한 것을 말하세요.",
  "Name what you checked or changed.": "확인하거나 변경한 것을 말하세요.",
  "Save the final handoff.": "최종 인계 자료를 저장하세요.",
  "The reflection and responsibility statement are complete, and the learner confirms the final handoff files.":
    "회고와 책임 문장을 완성하고 학습자가 최종 인계 파일을 확인합니다.",
  "Reflect on the build": "제작 과정 돌아보기",
  "Answer with short, honest notes.": "짧고 솔직하게 답하세요.",
  "One important decision I made:\nOne AI result I checked or changed:\nOne recovery method that helped:\nOne habit for my next project:\nOne thing I want to learn next:":
    "내가 내린 중요한 결정 하나:\n내가 확인하거나 바꾼 AI 결과 하나:\n도움이 된 복구 방법 하나:\n다음 프로젝트에서 지킬 습관 하나:\n다음에 배우고 싶은 것 하나:",
  "Write your own evidence.": "자신의 증거를 쓰세요.",
  "Name the responsibility": "책임 말하기",
  "Complete the final statement.": "마지막 문장을 완성하세요.",
  "AI helped me __________, and I was responsible for __________.":
    "AI는 내가 __________하는 것을 도왔고, 나는 __________을 책임졌습니다.",
  "Name both roles.": "두 역할을 모두 말하세요.",
  "Final handoff": "최종 인계",
  "Confirm the files and records you will keep.":
    "보관할 파일과 기록을 확인하세요.",
  "Final working file or folder": "최종 작동 파일 또는 폴더",
  "Final backup": "최종 백업",
  "Project Brief": "프로젝트 기획서",
  "Test cards": "테스트 카드",
  "Useful prompts": "유용한 프롬프트",
  "Two-minute demo script": "2분 데모 대본",
  "Feedback and reflection": "피드백과 회고",
  "I created the final backup: my-app/day6-final.html for a one-file project, or my-app-day6-final for a multi-file project.":
    "최종 백업을 만들었습니다. 단일 파일 프로젝트는 my-app/day6-final.html, 다중 파일 프로젝트는 my-app-day6-final입니다.",
  "I opened the final backup.": "최종 백업을 열었습니다.",
  "The full demo path passes in the final backup.":
    "최종 백업에서 전체 데모 경로가 통과합니다.",
  "Start from the final backup, show evidence, and respect the next presenter.":
    "최종 백업에서 시작해 증거를 보여 주고 다음 발표자의 시간을 지키세요.",
  "The learner starts from the final backup, completes the scheduled demo or makes one controlled retry before using the Day 5 candidate and then the Day 5 test record, and the audience records what the evidence actually proves.":
    "학습자가 최종 백업에서 시작해 정해진 데모를 완료하거나, 통제된 재시도 한 번 후 5일차 후보본과 5일차 테스트 기록 순으로 전환하며, 청중은 그 증거가 실제로 무엇을 입증하는지 기록합니다.",
};

const courseKo: Record<string, string> = {
  BREAK: "휴식",
  STUDIO: "제작 실습",
  SHARE: "공유",
  "_____ → _____ → _____ → _____ → _____":
    "_____ → _____ → _____ → _____ → _____",
  Make: "만들기",
  "Run the full TELL → WATCH → CHECK → FIX → SAVE loop.":
    "TELL → WATCH → CHECK → FIX → SAVE 전체 루프를 실행합니다.",
  "Ask & Fix": "요청하고 수정하기",
  "Write precise requests, reproduce one problem, and hand context to a new session.":
    "정확한 요청을 작성하고 문제 하나를 재현한 뒤 새 세션에 맥락을 인계합니다.",
  Define: "정의하기",
  "Define the user, problem, success, priorities, and the smallest v0.":
    "사용자, 문제, 성공 기준, 우선순위, 가장 작은 v0를 정의합니다.",
  Extend: "확장하기",
  "Map the generated code, build one approved slice, and leave a safe handoff.":
    "생성된 코드의 지도를 만들고 승인받은 기능 하나를 구현한 뒤 안전한 인계문을 남깁니다.",
  Test: "테스트하기",
  "Collect test evidence, observe a peer, and fix what blocks the user first.":
    "테스트 증거를 모으고 동료를 관찰한 뒤 사용자를 막는 문제부터 수정합니다.",
  Show: "발표하기",
  "Freeze a working version, demonstrate evidence, and explain the learning.":
    "작동하는 버전을 동결하고 증거를 시연하며 배운 점을 설명합니다.",
  "The old action still works.": "기존 동작이 계속 작동합니다.",
};

const koreanByEnglish: Record<string, string> = {
  ...courseKo,
  ...day1Ko,
  ...day2Ko,
  ...day3Ko,
  ...day4Ko,
  ...day5Ko,
  ...day6Ko,
};

export function interactiveText(
  language: Language,
  english: string,
): string {
  return language === "ko" ? (koreanByEnglish[english] ?? english) : english;
}

const teacherCueEnglishByKorean: Record<string, string> = {
  "오늘의 결과물과 5단계 루프를 짧게 소개한다.":
    "Briefly introduce today's artifact and the five-step loop.",
  "학생이 막힌 이유를 설명하게 하지 말고 Green, Yellow, Red 신호부터 받는다.":
    "Ask for a Green, Yellow, or Red signal before asking learners to explain why they are stuck.",
  "중립 공통 페이지를 처음부터 끝까지 시연한다.":
    "Demonstrate the shared neutral page from start to finish.",
  "AI 응답보다 목표 확인, 계획 검토, 실제 클릭 테스트, 저장 시점을 소리 내어 말한다.":
    "Think aloud about checking the goal, reviewing the plan, testing real clicks, and choosing when to save.",
  "정답을 바로 말하지 말고 각 상황에서 누가 결정해야 하는지 먼저 선택하게 한다.":
    "Do not reveal the answer immediately; first ask learners who should make each decision.",
  "작동 여부는 채팅 답변이 아니라 브라우저 행동으로 확인한다는 점을 강조한다.":
    "Emphasize that browser behavior, not a chat response, proves whether something works.",
  "실제 API 키나 개인정보를 화면에 입력하지 않게 한다.":
    "Do not let learners enter a real API key or personal information on screen.",
  "안전 규칙을 읽는 데서 끝내지 말고 잘못된 행동을 안전한 행동으로 바꾸게 한다.":
    "Have learners replace unsafe actions with safe ones instead of only reading the rules.",
  "도구 문제 학생을 별도로 확인하되 휴식 시간을 수업으로 바꾸지 않는다.":
    "Support learners with tool problems separately without turning the break into class time.",
  "종료 1분 전에 복귀 신호를 준다.":
    "Give a return signal one minute before the end.",
  "폴더, 터미널, AI 도구, 파일, 브라우저의 역할을 실제 화면으로 연결한다.":
    "Connect the roles of the folder, terminal, AI tool, file, and browser to the real screen.",
  "작업 파일과 Save Point 사본의 차이를 확인한다.":
    "Check the difference between the working file and a Save Point copy.",
  "모든 학생이 같은 중립 공통 페이지를 만든다.":
    "Have every learner build the same neutral shared page.",
  "프롬프트를 보내기 전 Success means와 파일 제한을 손가락으로 짚게 한다.":
    "Before sending the prompt, have learners point to Success means and the file limits.",
  "Expected와 Actual을 말하게 한 뒤에만 수정 프롬프트를 쓰게 한다.":
    "Let learners write a fix prompt only after stating Expected and Actual.",
  "모든 테스트가 통과한 학생만 day1-base.html을 만들게 한다.":
    "Only learners whose tests all pass should create day1-base.html.",
  "주제나 기능 예시를 제시하지 않고 학생이 두 가지 작은 변경을 직접 정하게 한다.":
    "Do not suggest topics or features; let learners choose two small changes themselves.",
  "첫 변경이 통과하기 전 두 번째 변경을 시작하지 않게 한다.":
    "Do not let learners start the second change before the first one passes.",
  "설명보다 실제 클릭과 결과를 먼저 보여 주게 한다.":
    "Ask learners to show a real click and result before explaining.",
  "종료 신호를 모아 Day 2에서 다시 다룰 문제를 기록한다.":
    "Collect exit signals and note issues to revisit on Day 2.",
  "학생이 먼저 다섯 단계를 순서대로 복원하게 한다.":
    "Have learners reconstruct the five steps in order before anything else.",
  "Day 1 파일은 수정하지 말고 열기와 한 번의 클릭 테스트만 하게 한다.":
    "Do not let learners edit the Day 1 file; have them only open it and run one click test.",
  "A와 B를 같은 조건에서 보여 주고 결과 차이를 관찰하게 한다.":
    "Show A and B under the same conditions and have learners observe the difference in results.",
  "문장이 길어서가 아니라 성공 기준과 제한이 확인 가능해서 명확하다는 점을 이끈다.":
    "Guide learners to see that the request is clear because its success criteria and limits can be checked, not because it is long.",
  "각 칸을 설명한 뒤 학생이 짧은 문장으로 직접 채우게 한다.":
    "Explain each field, then have learners fill it in themselves with short sentences.",
  "Success means가 브라우저에서 관찰 가능한지 짝과 확인하게 한다.":
    "Have partners check whether Success means describes something observable in the browser.",
  "새 세션은 이전 대화를 자동으로 안다고 가정하지 않게 한다.":
    "Do not let learners assume that a new session automatically knows the previous conversation.",
  "이미 작동함, 테스트 증거, 다음 변경, 유지할 항목을 구분한다.":
    "Distinguish what already works, test evidence, the next change, and what must stay.",
  "디버깅 시연 파일을 준비하고 학생의 작업 파일은 건드리지 않는다.":
    "Prepare a separate debugging demo file and do not touch learners' working files.",
  "오류를 고치기 전에 같은 행동으로 재현한다.":
    "Reproduce the error with the same action before fixing it.",
  "한 번에 첫 번째 실패만 고치고 이전 통과 테스트를 다시 실행한다.":
    "Fix only the first failure at a time, then rerun a previously passing test.",
  "day2-prompt-lab 폴더와 index.html 한 파일만 사용하게 한다.":
    "Have learners use only the day2-prompt-lab folder and a single index.html file.",
  "학생이 네 규칙을 읽은 뒤 프롬프트를 보내고 두 기본 테스트를 실제로 실행하게 한다.":
    "Have learners read all four rules, send the prompt, and run both basic tests themselves.",
  "여섯 입력의 Expected를 먼저 쓰고 Actual은 실제 실행 후 기록하게 한다.":
    "Have learners write Expected for all six inputs first and record Actual only after running each test.",
  "네 규칙이 모두 통과한 학생만 새 세션에서 Context Handoff로 Clear 변경을 진행한다.":
    "Only learners whose four rules all pass should use the Context Handoff in a new session to make the Clear change.",
  "완성도 비교가 아니라 요청과 증거의 명확성을 비교하게 한다.":
    "Have learners compare the clarity of requests and evidence, not the polish of the projects.",
  "다음 수업을 위해 Yellow와 Red 원인을 짧게 수집한다.":
    "Briefly collect the reasons for Yellow and Red to prepare for the next class.",
  "학생이 자료를 보지 않고 다섯 단계를 먼저 떠올리게 한다.":
    "First have learners recall the five steps without looking at the materials.",
  "오늘부터 주제 선택권과 최종 판단 책임이 학생에게 있음을 분명히 말한다.":
    "State clearly that from today onward, learners choose the topic and are responsible for the final judgment.",
  "아직 AI 대화나 프로젝트 폴더를 열지 않게 한다.":
    "Do not let learners open the AI chat or project folder yet.",
  "완전한 자유 주제 탐색 시간이다. 주제나 전공별 예시를 제시하지 않는다.":
    "This is fully open topic exploration; do not provide topic examples or examples by major.",
  "학생이 막히면 무엇을 자주 보았는지, 무엇이 불편했는지만 질문한다.":
    "If a learner is stuck, ask only what they often notice and what has been inconvenient.",
  "아이디어를 대신 선택하거나 더 화려한 방향으로 유도하지 않는다.":
    "Do not choose an idea for the learner or steer it toward something more elaborate.",
  "User, Problem, Success가 한 줄로 이어지는지 확인한다.":
    "Check that User, Problem, and Success connect as one coherent statement.",
  "성공 문장이 보거나 반복하거나 비교할 수 있는 결과인지 묻는다.":
    "Ask whether the success statement describes a result that can be seen, repeated, or compared.",
  "모호한 표현은 학생이 직접 관찰 가능한 문장으로 고치게 한다.":
    "Have learners rewrite vague language as statements they can observe directly.",
  "MUST는 프로젝트의 우선순위이며 오늘 세 개를 모두 구현하는 뜻이 아님을 강조한다.":
    "Emphasize that MUST identifies project priorities; it does not mean all three must be built today.",
  "각 항목이 한 가지 결과만 담는지 확인한다.":
    "Check that each item contains only one result.",
  "NICE 항목은 오늘 범위에서 제외하도록 범위 문을 운영한다.":
    "Use the scope gate to keep NICE items out of today's work.",
  "학생이 AI나 프로젝트 작업을 계속하지 않게 한다.":
    "Do not let learners continue working with AI or on the project.",
  "종료 1분 전에 복귀 신호를 주고 Project Brief 화면을 준비한다.":
    "Give a return signal one minute before the end and prepare the Project Brief screen.",
  "앞에서 정한 내용을 다시 발명하지 않고 하나의 Brief로 통합하게 한다.":
    "Have learners combine earlier decisions into one Brief instead of reinventing them.",
  "와이어프레임은 한 화면과 한 핵심 흐름만 그리게 한다.":
    "Limit the wireframe to one screen and one main flow.",
  "화려함보다 행동과 결과가 분명한지 확인한다.":
    "Check that the action and result are clear rather than visually elaborate.",
  "AI가 주제 변경이나 추가 기능을 제안하면 학생이 제거하게 한다.":
    "If AI suggests changing the topic or adding features, have the learner remove those suggestions.",
  "사용자·문제·성공·범위·안전이 모두 확인된 계획만 승인한다.":
    "Approve only plans whose user, problem, success, scope, and safety have all been checked.",
  "승인 전에는 my-app이나 index.html을 만들지 않게 한다.":
    "Do not let learners create my-app or index.html before approval.",
  "APPROVED 학생만 my-app/index.html을 만들게 한다.":
    "Only learners with APPROVED status should create my-app/index.html.",
  "AI가 범위를 넓히면 즉시 멈추고 승인된 v0로 되돌린다.":
    "If AI expands the scope, stop immediately and return to the approved v0.",
  "브라우저에서 학생이 직접 실행한 결과만 완료 증거로 인정한다.":
    "Accept only results learners run themselves in the browser as completion evidence.",
  "작동 확인 후 day3-v0-save.html을 만들고 복사본도 다시 시험하게 한다.":
    "After confirming that it works, have learners create day3-v0-save.html and test the copy again.",
  "30초 구조를 먼저 준비하게 한 뒤 짝 발표를 진행한다.":
    "Have learners prepare the 30-second structure before presenting to a partner.",
  "영어 유창성이나 주제 취향보다 사용자·문제·작동 증거를 듣게 한다.":
    "Ask partners to listen for the user, problem, and working evidence rather than English fluency or topic preference.",
  "마지막 1분에는 편집과 새 AI 요청을 모두 멈추게 한다.":
    "During the final minute, stop all editing and new AI requests.",
  "새 프로젝트를 만들지 않고 Day 3의 my-app을 그대로 열게 한다.":
    "Have learners open their Day 3 my-app as it is instead of creating a new project.",
  "파일을 수정하기 전에 기존 핵심 동작을 학생이 직접 재현하게 한다.":
    "Before editing any file, have learners reproduce the existing main action themselves.",
  "Red 학생은 새 기능을 시작하지 말고 마지막 작동본 복구로 보낸다.":
    "Direct Red learners to restore the last working version instead of starting a new feature.",
  "문법 강의로 확장하지 않고 구조·표현·동작의 세 역할만 다룬다.":
    "Cover only the three roles of structure, presentation, and behavior without expanding into a syntax lecture.",
  "AI의 답에 나온 위치를 실제 파일에서 학생이 직접 가리키게 한다.":
    "Have learners point to the locations from AI's answer in the actual files themselves.",
  "읽기 전용 요청 뒤 파일이 바뀌지 않았는지 반드시 확인한다.":
    "Always confirm that no file changed after a read-only request.",
  "학생 자신의 기존 동작 하나만 추적하게 한다.":
    "Have each learner trace only one existing action from their own project.",
  "AI 설명과 실제 브라우저 행동이 맞는지 비교하게 한다.":
    "Have learners compare AI's explanation with the actual browser behavior.",
  "Storage는 사용 여부를 억지로 만들지 말고 없으면 not used로 기록하게 한다.":
    "Do not force the project to use Storage; if it is absent, record not used.",
  "Sprint를 TELL → WATCH → CHECK → FIX → SAVE 한 사이클로 설명한다.":
    "Explain a Sprint as one TELL → WATCH → CHECK → FIX → SAVE cycle.",
  "단일 파일은 index.html을 형제 폴더에 복사하고, 다중 파일은 폴더 전체를 복사하게 한다.":
    "For a single-file project, copy index.html to a sibling folder; for a multi-file project, copy the entire folder.",
  "백업을 직접 열어 기존 동작이 통과하기 전에는 Save Point 완료로 인정하지 않는다.":
    "Do not count the Save Point as complete until the learner opens the backup and the old action passes.",
  "모든 편집과 AI 요청을 멈추게 한다.":
    "Stop all editing and AI requests.",
  "종료 1분 전에 복귀 신호를 주고 복구 경로 카드를 준비한다.":
    "Give a return signal one minute before the end and prepare the recovery-path card.",
  "정확한 오류 보고, 검증된 undo, 더 작은 요청, 새 맥락과 수동 복구를 구분한다.":
    "Distinguish exact error reporting, verified undo, a smaller request, fresh context, and manual restoration.",
  "undo는 당일 실제 환경에서 검증된 경우에만 선택 가능하다고 표시한다.":
    "Mark undo as available only if it has been verified in the actual environment that day.",
  "같은 모호한 요청을 세 번 반복하지 않게 한다.":
    "Do not let learners repeat the same vague request three times.",
  "기능 대안을 제안하지 않고 학생이 기존 계획에서 한 조각을 고르게 한다.":
    "Do not suggest alternative features; have learners choose one slice from their existing plan.",
  "한 행동과 한 결과로 오늘 시험할 수 있는지 확인한다.":
    "Check whether the slice can be tested today with one action and one result.",
  "범위가 크면 같은 목표를 더 작게 줄여 REDUCE로 돌려보낸다.":
    "If the scope is too large, keep the same goal, make it smaller, and return it as REDUCE.",
  "먼저 짧은 계획을 요구하고 학생이 승인하기 전에는 편집하지 않게 한다.":
    "Require a short plan first and do not allow editing until the learner approves it.",
  "새 조각의 성공 테스트와 기존 동작의 회귀 테스트를 학생이 직접 실행하게 한다.":
    "Have learners run the success test for the new slice and the regression test for the old action themselves.",
  "실패하면 한 가지 복구 경로만 골라 같은 테스트를 다시 수행하게 한다.":
    "If it fails, have learners choose one recovery path and rerun the same test.",
  "두 테스트 통과 후 my-app-day4-slice를 만들고 복사본도 검증하게 한다.":
    "After both tests pass, have learners create my-app-day4-slice and verify the copy as well.",
  "마지막 5분에는 Context Handoff를 완성하게 한다.":
    "Use the final five minutes to complete the Context Handoff.",
  "앞 5분에는 짝이 실제 증거를 확인하고, 뒤 5분에는 최종 상태를 기록한다.":
    "During the first five minutes, partners verify real evidence; during the last five, learners record final status.",
  "파일명만 보지 말고 복사본에서 새 동작과 기존 동작을 직접 실행하게 한다.":
    "Do not accept a file name alone; have learners run both the new and old actions in the copy.",
  "마지막 1분에는 새 AI 요청을 보내지 않게 한다.":
    "Do not let learners send a new AI request during the final minute.",
  "오늘은 기능 추가일이 아니라 작동 증거를 만드는 날이라고 선언한다.":
    "State that today is for producing evidence that the project works, not for adding features.",
  "단일 파일과 다중 파일 학생이 각각 시작 Save Point를 만들고 복사본을 직접 열었는지 확인한다.":
    "Check that learners with single-file and multi-file projects created the appropriate start Save Point and opened the copy themselves.",
  "AI의 설명이 아니라 학생이 직접 실행한 결과만 증거로 인정한다.":
    "Accept only results learners run themselves as evidence, not AI's explanation.",
  "학생이 Actual을 실행하기 전에 Expected를 쓰게 한다.":
    "Have learners write Expected before they run the action and record Actual.",
  "기능 내용을 대신 제안하지 말고 네 테스트 유형이 학생의 기존 기능에 적용됐는지만 확인한다.":
    "Do not suggest feature content; only check that the four test types were applied to the learner's existing features.",
  "기능 내용을 대신 제안하지 말고 EMPTY·INVALID·BOUNDARY가 학생의 기존 기능에 실제로 적용되는지 확인한다. 해당하지 않으면 N/A와 이유를 인정한다.":
    "Do not suggest feature content for the learner. Check whether EMPTY, INVALID, and BOUNDARY actually apply to the learner's existing feature; accept N/A with a reason when a type does not apply.",
  "‘It works’처럼 관찰할 수 없는 결과는 다시 쓰게 한다.":
    "Have learners rewrite unobservable results such as ‘It works.’",
  "제작자가 키보드나 마우스를 잡지 않고 관찰만 하게 한다.":
    "Have the maker observe without touching the keyboard or mouse.",
  "15분 뒤 역할을 바꾸고, 취향 평가 대신 멈춤·반복·예상 밖 행동을 기록하게 한다.":
    "Switch roles after 15 minutes and record pauses, repetitions, and unexpected actions instead of judgments about taste.",
  "테스트 중 개인정보를 입력하지 않도록 상기시킨다.":
    "Remind learners not to enter personal information during testing.",
  "학생이 수정 작업을 시작하지 않게 하고, 반복된 문제와 안전 문제를 빠르게 파악한다.":
    "Do not let learners start fixing yet; quickly identify repeated problems and safety issues.",
  "의견을 Action·Actual·Expected가 포함된 재현 가능한 문장으로 바꾸게 한다.":
    "Have learners turn opinions into reproducible statements containing Action, Actual, and Expected.",
  "핵심 행동 차단, 오답, 안전 문제, 발표 차단은 MUST FIX로 분류한다.":
    "Classify a blocked main action, wrong result, safety issue, or demo blocker as MUST FIX.",
  "새 기능과 큰 재설계는 LATER로 보내고 수정 후보를 최대 세 개로 제한한다.":
    "Move new features and major redesigns to LATER and limit fix candidates to three.",
  "비밀정보가 보이면 즉시 RED로 전환하고 화면 공유와 추가 입력을 중단시킨다.":
    "If secret information appears, switch to RED immediately and stop screen sharing and further input.",
  "완전한 접근성 인증이 아니라 명백한 사용 장벽을 찾는 빠른 점검임을 설명한다.":
    "Explain that this is a quick check for obvious usability barriers, not a complete accessibility certification.",
  "Tab 이동과 좁은 브라우저 창을 학생이 직접 시험하게 한다.":
    "Have learners test Tab navigation and a narrow browser window themselves.",
  "첫 수정이 실제 MUST FIX인지 확인하고, 한 번에 한 문제만 다루게 한다.":
    "Confirm that the first fix is truly MUST FIX and address only one problem at a time.",
  "각 수정에 성공조건과 계속 작동해야 하는 MUST 경로가 있는지 확인한다.":
    "Check that each fix has a success condition and a MUST path that must keep working.",
  "큰 수정은 MAKE IT SMALLER로 돌려보내고 승인 전에는 AI 변경 요청을 보내지 않게 한다.":
    "Return large fixes as MAKE IT SMALLER and do not allow AI change requests before approval.",
  "학생이 승인된 Fix 1부터 시작하고 한 번에 하나의 변경만 요청하게 한다.":
    "Have learners begin with approved Fix 1 and request only one change at a time.",
  "수정 뒤 실패했던 테스트와 핵심 HAPPY 경로를 모두 다시 실행하게 한다.":
    "After a fix, have learners rerun both the failed test and the main HAPPY path.",
  "RED 상태에서는 새 프롬프트를 멈추고 마지막 작동 Save Point로 복구하게 한다.":
    "In RED status, stop new prompts and restore the last working Save Point.",
  "활성 프로젝트에서 먼저 최종 smoke test를 실행하게 한다.":
    "Have learners run the final smoke test in the active project first.",
  "단일 파일은 day5-release-candidate.html, 다중 파일은 my-app-day5-release-candidate로 복사하게 한다.":
    "For a single-file project, copy to day5-release-candidate.html; for a multi-file project, copy to my-app-day5-release-candidate.",
  "복사본을 직접 열고 핵심 경로를 다시 통과해야 완료로 인정한다.":
    "Count the work as complete only after the learner opens the copy and the main path passes again.",
  "Day 5 발표 후보와 현재 프로젝트를 비교하고 실제 작동하는 버전을 고르게 한다.":
    "Have learners compare the Day 5 release candidate with the current project and choose the version that actually works.",
  "처음부터 데모 경로를 실행하고 새로고침 뒤 한 번 더 실행하게 한다.":
    "Have learners run the demo path from the beginning, refresh, and run it once more.",
  "GREEN은 대본 작성, YELLOW는 한 개의 승인된 blocker, RED는 마지막 작동본 복구로 보낸다.":
    "Direct GREEN learners to script preparation, YELLOW learners to one approved blocker, and RED learners to restoring the last working version.",
  "반복 가능하고 데모를 막으며 새 기능이 아니고 작은 변경으로 시험 가능한 문제만 승인한다.":
    "Approve only problems that are repeatable, block the demo, are not new features, and can be tested with one small change.",
  "GREEN 학생은 코드를 바꾸지 않고 대본을 정리하게 한다.":
    "Have GREEN learners prepare their script without changing code.",
  "20분 안에 통과하지 못하면 더 새 버전을 고집하지 말고 Day 5 발표 후보로 복구하게 한다.":
    "If the fix does not pass within 20 minutes, stop insisting on the newer version and restore the Day 5 release candidate.",
  "전체가 Code Freeze 규칙을 확인한 뒤 코드 변경을 멈추게 한다.":
    "Have the whole class confirm the Code Freeze rules, then stop all code changes.",
  "단일 파일은 day6-final.html, 다중 파일은 my-app-day6-final로 복사하게 한다.":
    "For a single-file project, copy to day6-final.html; for a multi-file project, copy to my-app-day6-final.",
  "파일 존재가 아니라 복사본에서 데모 경로가 통과하는 것을 완료 기준으로 삼는다.":
    "Use a passing demo path in the copy—not merely the file's existence—as the completion criterion.",
  "발표 순서, 케이블, 브라우저, 타이머를 최종 확인하고 첫 발표자를 준비시킨다.":
    "Make a final check of presentation order, cables, browser, and timer, and prepare the first presenter.",
  "20초·60초·25초·15초의 네 구간으로 2분 발표를 구성하게 한다.":
    "Structure the two-minute presentation in four sections of 20, 60, 25, and 15 seconds.",
  "학생이 긴 대본보다 Open·Click or enter·Show·Stop 경로를 먼저 고정하게 한다.":
    "Have learners lock in the Open · Click or enter · Show · Stop path before writing a long script.",
  "짝이 실제로 보거나 듣지 못한 부분을 한 가지씩 피드백하게 한다.":
    "Have partners identify one part they could not actually see or hear.",
  "발표자마다 2분 데모, 1분 질문 또는 피드백, 1분 전환을 동일하게 적용한다.":
    "Use the same timing for every presenter: two minutes for the demo, one minute for questions or feedback, and one minute to switch.",
  "20명 기준 4분 슬롯을 반복하고, 학생이 많으면 두 조로 병렬 운영한다.":
    "Repeat four-minute slots for up to 20 learners; if there are more, run two groups in parallel.",
  "발표 시작·동기화에 8분을 두고, 조당 발표 창은 72분이다. N명이면 G = ceil(N ÷ 18)개 조로 나누며, 1–18명은 1개 조, 19–36명은 2개 조, 37–54명은 3개 조다.":
    "Allow 8 minutes to launch and synchronize the showcase; each group's presentation window is 72 minutes. For N learners, use G = ceil(N ÷ 18) groups: one group for 1–18 learners, two for 19–36, and three for 37–54.",
  "각 조에 진행 담당, 시간 담당, 증거 기록 담당을 지정한다. 8분에 전 조가 1번 슬롯을 시작하고 80분에 발표·대체·결석 인원을 합산해 보고한다.":
    "Assign a facilitator, timekeeper, and evidence recorder in each group. Have all groups begin slot 1 at minute 8 and report the totals for presentations, fallbacks, and absences at minute 80.",
  "실행 실패 시 Final 백업, Day 5 후보, 강사가 승인한 대체 증거 순으로 전환한다.":
    "If the demo fails, switch in order to the Final backup, the Day 5 candidate, and then teacher-approved alternative evidence.",
  "실행 실패 시 Final 백업, Day 5 후보, Day 5 테스트 기록 순으로 전환한다. 테스트 기록만 보일 때는 과거 통과를 증명할 뿐 현재 라이브 동작은 증명하지 못한다고 밝힌다.":
    "If the live run fails, move in order to the Final backup, the Day 5 candidate, and the Day 5 test record. When only the test record is shown, state that it proves a past pass, not current live operation.",
  "서로 다른 발표 두 개에 대해 실제 관찰, 명확한 결정, 질문을 기록하게 한다.":
    "For two different presentations, have learners record a real observation, one clear decision, and one question.",
  "영어 유창성, 주제 취향, 화려함에 대한 평가는 받지 않는다.":
    "Do not accept evaluations of English fluency, topic preference, or visual flashiness.",
  "두 피드백 카드를 발표자에게 전달하게 한다.":
    "Have learners deliver both feedback cards to the presenters.",
  "화려한 결과보다 학생의 판단, 검증, 복구 행동을 구체적으로 쓰게 한다.":
    "Have learners write specifically about their decisions, verification, and recovery actions rather than flashy results.",
  "AI의 역할과 학생의 책임을 구분한 마지막 문장을 완성하게 한다.":
    "Have learners complete a final statement that distinguishes AI's role from the learner's responsibility.",
  "최종 백업, 테스트 증거, 대본, 피드백, 회고의 위치를 확인하게 한다.":
    "Confirm the locations of the final backup, test evidence, script, feedback, and reflection.",
  "응답은 짧은 영어, 짧은 라오어 메모(동료나 통역 지원), 그림, 몸짓 모두 허용하고 언어 유창성보다 판단을 본다.":
    "Accept short English, a brief Lao note supported by a peer or interpreter, a sketch, or a gesture; assess the decision rather than language fluency.",
  "학생은 짧은 영어, 라오어 메모, 작은 그림 중 편한 방식으로 관찰을 먼저 표현하고 필요하면 동료나 통역이 영어 한 줄로 옮긴다.":
    "Let learners express an observation first with short English, a Lao note, or a small sketch; a peer or interpreter may help turn it into one short English line.",
  "영어 문장이 막히면 라오어 메모와 그림으로 뜻을 먼저 고정한 뒤 동료나 통역과 짧은 영어 문장으로 바꾸게 한다.":
    "If an English sentence blocks progress, let the learner fix the meaning first with a Lao note and sketch, then work with a peer or interpreter to make one short English sentence.",
  "Observation, User, Problem, Success, MUST/NICE, v0 IN/OUT, States, Test, 접근성·안전을 자가검수와 짝 검수에 똑같이 사용한다.":
    "Use Observation, User, Problem, Success, MUST/NICE, v0 IN/OUT, States, Test, accessibility, and safety identically for self-check and peer check.",
  "전원 승인 줄을 만들지 않는다. 자가검수와 짝 검수가 모두 통과하면 READY, 불일치가 하나라도 있으면 Yellow로 표시하고 강사는 그 항목만 확인한다.":
    "Do not create a whole-class approval queue. Mark the plan READY when self and peer checks both pass; if any item disagrees, mark Yellow and have the teacher check only that item.",
  "READY 또는 Yellow 확인 완료 전에는 my-app이나 index.html을 만들지 않게 한다.":
    "Do not let learners create my-app or index.html until they reach READY or resolve the Yellow check.",
  "READY 학생과 Yellow 불일치를 해결한 학생만 my-app/index.html을 만들게 한다.":
    "Only READY learners and learners who resolved their Yellow mismatch should create my-app/index.html.",
  "AI가 범위를 넓히면 즉시 멈추고 검토한 READY v0로 되돌린다.":
    "If AI expands the scope, stop immediately and return to the reviewed READY v0.",
  "짧은 영어를 기본으로 하되 라오어 메모를 동료나 통역이 짧게 옮기거나, 학생이 화면과 그림을 가리키고 몸짓으로 행동을 보여도 된다. 언어 유창성이나 주제 취향보다 사용자·문제·작동 증거를 본다.":
    "Use short English by default, but allow a peer or interpreter to translate a brief Lao note, or let the learner point to the screen and sketch and show the action with a gesture. Assess user, problem, and working evidence rather than fluency or topic preference.",
  "MUST 1은 필수지만 프로젝트에 필요하지 않은 MUST 2·3을 억지로 만들지 않게 한다.":
    "Require MUST 1, but do not make learners invent MUST 2 or MUST 3 when the project does not need them.",
  "NICE는 최대 두 개이며 없어도 된다. 적은 NICE 항목은 오늘 범위에서 제외하도록 범위 문을 운영한다.":
    "Allow up to two NICE items and accept none. Keep any listed NICE items outside today's scope.",
  "학생 자신의 기존 동작 하나를 Event → handler → State → render → Screen 순서로 추적하게 한다.":
    "Have learners trace one existing action from their own project through Event → handler → State → render → Screen.",
  "각 단계에 AI 설명이 아니라 실제 파일·코드와 브라우저 증거를 연결하게 한다.":
    "Have learners connect each step to real files, code, and browser evidence rather than an AI explanation.",
  "Storage는 화면 뒤의 다음 단계가 아니다. 지속 저장을 약속한 경우에만 Storage → State 불러오기와 State → Storage 저장을 별도로 기록하고, 없으면 not used로 쓴다.":
    "Storage is not the next step after Screen. Only when persistence is promised, record Storage → State loading and State → Storage saving separately; otherwise write 'not used.'",
  "전원 강사 승인 줄을 만들지 않는다. 학생이 같은 여섯 항목으로 자가검수한 뒤 짝이 다시 검수하게 한다.":
    "Do not create a whole-class teacher approval queue. Have each learner self-check the same six items, then have a partner repeat the check.",
  "자가검수와 짝검수가 모두 통과하면 학생이 READY로 표시하고 바로 진행한다.":
    "When both the self-check and peer check pass, have the learner mark READY and continue immediately.",
  "두 검수가 다르거나 도움이 필요하면 Yellow로 표시한다. 강사는 불일치 항목만 확인하고 같은 목표를 작게 만드는 질문만 한다.":
    "If the two checks disagree or help is needed, mark Yellow. The teacher checks only the mismatched item and asks questions that make the same goal smaller.",
  "READY 또는 Yellow 불일치 해결을 마친 조각만 Studio에서 시작하게 한다.":
    "Allow learners to begin in Studio only with a READY slice or after resolving its Yellow mismatch.",
  "앞 3분에는 짝검증 경로와 종료 기준을 안내하고 편집을 멈추게 한다.":
    "During the first three minutes, explain the peer-verification path and stopping criteria, and have learners stop editing.",
  "다음 4분에는 짝이 복사본에서 새 동작과 기존 동작을 직접 실행한다. 파일명만 확인하는 것은 증거로 인정하지 않는다.":
    "During the next four minutes, have partners run the new action and the old action in the copy themselves. Do not accept a file name alone as evidence.",
  "마지막 3분에는 side signal, Day 5 첫 행동, exit 기록을 완료하며 새 AI 요청은 보내지 않는다.":
    "During the final three minutes, complete the side signal, the first Day 5 action, and the exit record; do not send a new AI request.",
  "앞 4분에는 테스터·제작자 규칙과 안전한 샘플 데이터 사용을 시연한다.":
    "During the first four minutes, demonstrate the tester and maker rules and the use of safe sample data.",
  "다음 12분에는 첫 라운드를 진행하고, 2분 동안 기록을 저장한 뒤 역할과 프로젝트를 바꾼다.":
    "Run the first round for the next 12 minutes, save the records for two minutes, then switch roles and projects.",
  "마지막 12분에는 둘째 라운드를 진행한다. 제작자는 키보드나 마우스를 잡지 않고, 취향 대신 멈춤·반복·예상 밖 행동을 기록한다.":
    "Run the second round during the final 12 minutes. The maker does not touch the keyboard or mouse, and records pauses, repetitions, and unexpected actions rather than judgments of taste.",
  "전원 강사 승인 줄을 만들지 않는다. 학생이 같은 기준으로 자가검수한 뒤 짝이 다시 검수하게 한다.":
    "Do not create a whole-class teacher approval queue. Have each learner self-check with the same criteria, then have a partner repeat the check.",
  "자가검수와 짝검수가 모두 통과하면 READY로 표시한다. 불일치나 도움 요청은 Yellow로 표시하고 강사는 그 항목만 확인한다.":
    "Mark the fix READY when both the self-check and peer check pass. Mark a mismatch or help request Yellow, and have the teacher check only that item.",
  "READY 또는 Yellow 불일치 해결 전에는 AI 변경 요청을 보내지 않게 하며, 강사는 학생의 프로젝트 선택을 대신 쓰지 않는다.":
    "Do not let learners send an AI change request before reaching READY or resolving the Yellow mismatch, and do not let the teacher write the learner's project choice for them.",
  "학생이 검수한 READY Fix 1부터 시작하고 한 번에 하나의 변경만 요청하게 한다.":
    "Have learners begin with their reviewed READY Fix 1 and request only one change at a time.",
  "앞 5분에는 활성 프로젝트에서 최종 smoke test 다섯 항목을 기록하게 한다.":
    "During the first five minutes, have learners record all five final smoke-test results in the active project.",
  "다음 5분에는 단일 파일은 day5-release-candidate.html, 다중 파일은 my-app-day5-release-candidate로 복사하고 복사본을 직접 연다.":
    "During the next five minutes, copy a single-file project to day5-release-candidate.html or a multi-file project to my-app-day5-release-candidate, then open the copy directly.",
  "마지막 5분에는 복사본에서 핵심 경로를 다시 통과하고 Open·Click or enter·Show·Stop 데모 경로를 저장하게 한다.":
    "During the final five minutes, rerun the main path in the copy and save the Open · Click or enter · Show · Stop demo path.",
  "발표는 Final 백업에서 시작한다. 실행 실패 시 알려진 시작 상태에서 한 번만 재시도한 뒤 Day 5 후보, Day 5 테스트 기록 순으로 전환한다. 테스트 기록만 보일 때는 과거 통과를 증명할 뿐 현재 라이브 동작은 증명하지 못한다고 밝힌다.":
    "Start every presentation from the Final backup. If the live run fails, retry once from a known start, then move to the Day 5 candidate and the Day 5 test record in that order. When only the test record is shown, state that it proves a past pass, not current live operation.",
};

export function teacherCueText(
  language: Language,
  korean: string,
): string {
  return language === "en"
    ? (teacherCueEnglishByKorean[korean] ?? korean)
    : korean;
}
