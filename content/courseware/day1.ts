import { copy as c, type DayCourseware, type TeachingSlide } from "./types";

function slide(value: TeachingSlide): TeachingSlide {
  return value;
}

export const day1Courseware: DayCourseware = {
  day: 1,
  essentialQuestion: c(
    "When AI writes the code, what must the human decide and verify?",
    "AI가 코드를 작성할 때, 사람은 무엇을 결정하고 검증해야 할까?",
  ),
  stages: [
    {
      stageId: "day1-welcome-readiness",
      role: "preflight",
      slides: [
        slide({
          id: "day1-00-outcome",
          stageId: "day1-welcome-readiness",
          layout: "opening",
          minutes: 2,
          kicker: c("DAY 1 · THE PROMISE", "1일차 · 오늘의 약속"),
          title: c(
            "Today you will make something that works.",
            "오늘, 실제로 작동하는 것을 만듭니다.",
          ),
          lead: c(
            "Not a mock-up or screenshot: one real webpage with the same five visible promises as the offline backup.",
            "모형이나 스크린샷이 아닙니다. 오프라인 백업과 같은 다섯 가지 약속이 실제로 작동하는 웹페이지입니다.",
          ),
          items: [
            {
              label: c("1 · TITLE", "1 · 제목"),
              title: c("My First Build", "My First Build"),
              body: c(
                "The exact page title is visible.",
                "정확한 페이지 제목이 보입니다.",
              ),
            },
            {
              label: c("2 · MESSAGE", "2 · 안내 문장"),
              title: c("Build, test, and improve", "만들고, 테스트하고, 개선하기"),
              body: c(
                "“I am learning to build, test, and improve with AI.”",
                "“I am learning to build, test, and improve with AI.”",
              ),
            },
            {
              label: c("3 · CARD", "3 · 카드"),
              title: c("Human in Control", "Human in Control"),
              body: c(
                "“AI can draft. I choose the goal and check the result.”",
                "“AI can draft. I choose the goal and check the result.”",
              ),
            },
            {
              label: c("4 · ACTION", "4 · 행동"),
              title: c("Test the page", "Test the page"),
              body: c(
                "A button with this exact label can be clicked.",
                "이 정확한 문구의 버튼을 누를 수 있습니다.",
              ),
            },
            {
              label: c("5 · RESULT", "5 · 결과"),
              title: c("The button works!", "The button works!"),
              body: c(
                "This exact message appears after the click.",
                "클릭 뒤 이 정확한 문장이 나타납니다.",
              ),
            },
          ],
          takeaway: c(
            "The product of today is not only a page. It is a repeatable way to build.",
            "오늘의 결과물은 페이지 하나만이 아니라, 다시 사용할 수 있는 제작 방법입니다.",
          ),
          teacherNotes: [
            c(
              "Show the finished neutral demo page for 20 seconds, but do not explain how it was made yet.",
              "완성된 중립 데모 페이지를 20초간 먼저 보여 주되, 아직 만드는 방법은 설명하지 않는다.",
            ),
            c(
              "Ask learners to name one visible behavior that would prove the page works.",
              "페이지가 작동한다는 것을 증명할 수 있는 눈에 보이는 행동 한 가지를 학생에게 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day1-00-preflight",
          stageId: "day1-welcome-readiness",
          layout: "run",
          minutes: 2,
          kicker: c("PREFLIGHT · NOT A LESSON", "수업 전 확인 · 강의 내용 아님"),
          title: c("Four things must be ready.", "네 가지만 준비하면 됩니다."),
          lead: c(
            "This is a technical preflight. It is not part of your learning score.",
            "이 화면은 기술 준비 확인입니다. 학습 점수나 강의 진도에 포함되지 않습니다.",
          ),
          items: [
            {
              title: c("Workspace", "작업 폴더"),
              body: c("Open only the folder for today's practice.", "오늘 실습 폴더만 엽니다."),
            },
            {
              title: c("AI coding tool", "AI 코딩 도구"),
              body: c("Confirm that it opens inside that folder.", "그 폴더 안에서 도구가 열리는지 확인합니다."),
            },
            {
              title: c("Browser", "브라우저"),
              body: c("Keep it ready for the real test.", "실제 테스트를 위해 준비해 둡니다."),
            },
            {
              title: c("Safety", "안전"),
              body: c(
                "No secret keys or real personal information in prompts or files.",
                "프롬프트와 파일에 비밀 키나 실제 개인정보를 넣지 않습니다.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "If something is not ready, use the side signal. You do not need to explain publicly.",
            "준비되지 않은 것이 있으면 옆의 상태 신호를 사용하세요. 공개적으로 이유를 설명할 필요는 없습니다.",
          ),
          teacherNotes: [
            c(
              "Treat this as room operation. Help Yellow and Red learners while Green learners preview the finished page.",
              "이 부분은 강의가 아니라 수업 운영으로 다룬다. Green 학생은 완성본을 미리 보고, 강사는 Yellow/Red 학생을 지원한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-live-build-demo",
      role: "learn",
      slides: [
        slide({
          id: "day1-01-hook",
          stageId: "day1-live-build-demo",
          layout: "question",
          minutes: 1,
          kicker: c("A CONFLICT", "서로 다른 두 주장"),
          title: c("AI says “Done.” The button does nothing.", "AI는 “완료”라고 했지만 버튼은 작동하지 않습니다."),
          question: {
            prompt: c(
              "Which statement should we trust?",
              "어느 쪽을 믿어야 할까요?",
            ),
            options: [
              c("A. “The implementation is complete.”", "A. “구현을 완료했습니다.”"),
              c("B. I clicked the button and nothing changed.", "B. 버튼을 눌렀지만 아무 변화가 없었습니다."),
            ],
            answer: c("B — the observed result", "B — 직접 관찰한 결과"),
            explanation: c(
              "AI produces a claim. The browser produces evidence. When they disagree, evidence wins.",
              "AI는 주장을 만들고, 브라우저는 증거를 보여 줍니다. 둘이 다르면 증거를 따릅니다.",
            ),
          },
          takeaway: c("A claim is not evidence.", "주장은 증거가 아닙니다."),
          teacherNotes: [
            c(
              "Do not reveal immediately. Ask for a show of hands and one reason from each side.",
              "바로 정답을 공개하지 않는다. 손들기로 선택을 받고 양쪽에서 이유를 하나씩 듣는다.",
            ),
          ],
        }),
        slide({
          id: "day1-01-loop-model",
          stageId: "day1-live-build-demo",
          layout: "flow",
          minutes: 1,
          kicker: c("THE BUILD LOOP", "빌드 루프"),
          title: c("Five moves turn an idea into evidence.", "다섯 동작이 아이디어를 증거로 바꿉니다."),
          items: [
            {
              label: c("1 · TELL", "1 · 요청"),
              title: c("Define one visible result", "눈에 보이는 결과 하나 정의"),
              body: c("Say what should exist and how success will look.", "무엇이 있어야 하고 성공이 어떻게 보일지 말합니다."),
            },
            {
              label: c("2 · WATCH", "2 · 검토"),
              title: c("Inspect the proposed change", "제안된 변경 확인"),
              body: c("Which file? What behavior? What stays unchanged?", "어떤 파일, 어떤 동작, 무엇은 그대로인지 확인합니다."),
            },
            {
              label: c("3 · CHECK", "3 · 테스트"),
              title: c("Use the result", "결과 직접 사용"),
              body: c("Open it, click it, type into it, and observe.", "열고, 누르고, 입력하고, 관찰합니다."),
            },
            {
              label: c("4 · FIX", "4 · 수정"),
              title: c("Describe one gap", "차이 하나 설명"),
              body: c("State what happened and what should happen.", "실제 결과와 원하는 결과를 말합니다."),
            },
            {
              label: c("5 · SAVE", "5 · 저장"),
              title: c("Protect a verified version", "검증된 버전 보호"),
              body: c("Save only after the important test passes.", "중요한 테스트가 통과한 뒤 저장합니다."),
            },
          ],
          takeaway: c(
            "The loop is not a slogan. Each move answers a different risk.",
            "이 루프는 구호가 아닙니다. 각 단계는 서로 다른 위험을 줄입니다.",
          ),
          teacherNotes: [
            c(
              "Point forward through the loop, then point from FIX back to CHECK to emphasize repetition.",
              "루프를 순서대로 짚은 뒤 FIX에서 CHECK로 되돌아가 반복된다는 점을 강조한다.",
            ),
          ],
        }),
        slide({
          id: "day1-01-success-contract",
          stageId: "day1-live-build-demo",
          layout: "worked-example",
          minutes: 1,
          kicker: c("BEFORE THE PROMPT", "프롬프트보다 먼저"),
          title: c("Write the test before asking AI to build.", "AI에게 만들라고 하기 전에 테스트부터 정합니다."),
          lead: c(
            "Our demo page is finished only when all five promises can be observed in a browser.",
            "데모 페이지는 아래 다섯 가지 약속을 브라우저에서 직접 확인할 수 있을 때만 완료입니다.",
          ),
          items: [
            {
              label: c("VISIBLE", "화면"),
              title: c("Title", "제목"),
              body: c('I can read “My First Build.”', "“My First Build”가 보인다."),
            },
            {
              label: c("VISIBLE", "화면"),
              title: c("Message", "안내 문장"),
              body: c(
                'I can read “I am learning to build, test, and improve with AI.”',
                '“I am learning to build, test, and improve with AI.”가 보인다.',
              ),
            },
            {
              label: c("VISIBLE", "화면"),
              title: c("Human in Control card", "Human in Control 카드"),
              body: c(
                'The card says “AI can draft. I choose the goal and check the result.”',
                '카드에 “AI can draft. I choose the goal and check the result.”가 보인다.',
              ),
            },
            {
              label: c("ACTION", "행동"),
              title: c("Button", "버튼"),
              body: c('I can click “Test the page.”', "“Test the page” 버튼을 누를 수 있다."),
            },
            {
              label: c("RESULT", "결과"),
              title: c("Feedback", "피드백"),
              body: c('After the click, “The button works!” appears.', "클릭 후 “The button works!”가 나타난다."),
            },
          ],
          takeaway: c(
            "A success criterion contains an action and an observable result.",
            "성공조건에는 행동과 관찰 가능한 결과가 들어갑니다.",
          ),
          teacherNotes: [
            c(
              "Ask which criterion would fail if the button exists but has no behavior.",
              "버튼은 보이지만 아무 동작도 하지 않을 때 어떤 성공조건이 실패하는지 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day1-01-demo-prompt",
          stageId: "day1-live-build-demo",
          layout: "demo",
          minutes: 1,
          kicker: c("TELL · LIVE DEMO", "TELL · 라이브 시연"),
          title: c("One small request, with a boundary.", "작은 요청 하나에 경계를 함께 줍니다."),
          lead: c(
            "Notice that the prompt names the file, the visible behavior, and what must not change.",
            "프롬프트가 파일, 보이는 동작, 바꾸지 않을 범위를 모두 말하는지 보세요.",
          ),
          code: c(
            `Create one file named index.html in this folder.

The page must show:
- the title “My First Build”
- the sentence “I am learning to build, test, and improve with AI.”
- a card titled “Human in Control”
- inside the card: “AI can draft. I choose the goal and check the result.”
- a button labeled “Test the page”

When I click the button, show “The button works!”

Use only HTML, CSS, and JavaScript in this one file.
Do not install packages. Do not create other files.
Before editing, tell me your plan in three bullets.`,
            `이 폴더에 index.html 파일 하나를 만드세요.

페이지에는 다음이 보여야 합니다.
- “My First Build”라는 제목
- “I am learning to build, test, and improve with AI.”라는 문장
- “Human in Control”이라는 제목의 카드
- 카드 안 문장: “AI can draft. I choose the goal and check the result.”
- “Test the page”라는 버튼

버튼을 누르면 “The button works!”를 보여 주세요.

HTML, CSS, JavaScript를 이 파일 하나 안에서만 사용하세요.
패키지를 설치하거나 다른 파일을 만들지 마세요.
수정하기 전에 계획을 세 문장으로 알려 주세요.`,
          ),
          takeaway: c(
            "Specific does not mean long. It means testable and bounded.",
            "구체적이라는 것은 길다는 뜻이 아니라, 시험 가능하고 범위가 정해졌다는 뜻입니다.",
          ),
          teacherNotes: [
            c(
              "Paste this exact prompt into the coding tool. Keep the tool, file tree, and browser visible during the demo.",
              "이 프롬프트를 그대로 코딩 도구에 붙여넣는다. 시연 중 도구, 파일 목록, 브라우저가 모두 보이게 한다.",
            ),
          ],
        }),
        slide({
          id: "day1-01-watch-plan",
          stageId: "day1-live-build-demo",
          layout: "compare",
          minutes: 1,
          kicker: c("WATCH · PLAN REVIEW", "WATCH · 계획 검토"),
          title: c("A plan is useful only if it respects the request.", "계획은 요청의 경계를 지킬 때만 유용합니다."),
          items: [
            {
              label: c("ACCEPT", "진행 가능"),
              title: c("One file, five visible promises", "파일 하나, 다섯 가지 약속"),
              body: c(
                "Edit index.html; add the exact title, message, card, button, and click result; then test.",
                "index.html만 수정하고 정확한 제목·안내·카드·버튼·클릭 결과를 만든 뒤 테스트한다.",
              ),
              tone: "good",
            },
            {
              label: c("STOP", "중단"),
              title: c("A framework, database, and login", "프레임워크·데이터베이스·로그인"),
              body: c(
                "This plan adds files and features we did not request. It increases risk without helping the test.",
                "요청하지 않은 파일과 기능을 추가합니다. 테스트에는 도움 없이 위험만 키웁니다.",
              ),
              tone: "danger",
            },
          ],
          takeaway: c(
            "WATCH asks: same goal, correct file, small scope?",
            "WATCH에서는 목표가 같은지, 파일이 맞는지, 범위가 작은지 확인합니다.",
          ),
          teacherNotes: [
            c(
              "Read the model's plan aloud. If it drifts, demonstrate stopping and asking for a smaller plan rather than accepting.",
              "모델의 계획을 소리 내어 읽는다. 범위를 벗어나면 승인하지 말고 더 작은 계획을 다시 요청하는 모습을 보여 준다.",
            ),
          ],
        }),
        slide({
          id: "day1-01-check-evidence",
          stageId: "day1-live-build-demo",
          layout: "worked-example",
          minutes: 1,
          kicker: c("CHECK · OBSERVE", "CHECK · 관찰"),
          title: c("A real test has three parts.", "실제 테스트에는 세 부분이 있습니다."),
          items: [
            {
              label: c("ACTION", "행동"),
              title: c("What I do", "내가 하는 것"),
              body: c('Open index.html and click “Test the page.”', "index.html을 열고 “Test the page”를 누른다."),
            },
            {
              label: c("EXPECTED", "예상"),
              title: c("What should happen", "일어나야 하는 것"),
              body: c('The text “The button works!” appears.', "“The button works!”라는 문장이 나타난다."),
            },
            {
              label: c("ACTUAL", "실제"),
              title: c("What I observe", "실제로 관찰한 것"),
              body: c(
                "Write exactly what the browser shows—even when it is wrong.",
                "틀렸더라도 브라우저에 보인 것을 정확히 기록한다.",
              ),
            },
          ],
          takeaway: c(
            "Pass means Expected and Actual match after the stated Action.",
            "정해진 행동 뒤 Expected와 Actual이 같을 때 통과입니다.",
          ),
          teacherNotes: [
            c(
              "Perform the click. Narrate only what is visible; avoid saying 'the code looks correct.'",
              "실제로 클릭한다. 보이는 결과만 말하고 ‘코드가 맞아 보인다’는 표현은 쓰지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-human-role",
      role: "learn",
      slides: [
        slide({
          id: "day1-02-role",
          stageId: "day1-human-role",
          layout: "compare",
          minutes: 1,
          kicker: c("WHO DOES WHAT?", "누가 무엇을 하나?"),
          title: c("AI drafts. The human directs and accepts responsibility.", "AI는 초안을 만들고, 사람은 방향과 책임을 맡습니다."),
          items: [
            {
              label: c("AI CAN", "AI가 할 수 있는 일"),
              title: c("Draft and transform", "초안 작성과 변환"),
              body: c(
                "Generate code, suggest structures, explain errors, and attempt a fix.",
                "코드 생성, 구조 제안, 오류 설명, 수정 시도.",
              ),
            },
            {
              label: c("HUMAN MUST", "사람이 해야 하는 일"),
              title: c("Set and verify intent", "의도 설정과 검증"),
              body: c(
                "Choose the user and goal, protect data, inspect scope, run the real test, and decide what to keep.",
                "사용자와 목표를 정하고, 데이터를 보호하고, 범위를 검토하고, 실제 테스트를 하고, 무엇을 남길지 결정.",
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "Delegating implementation does not delegate judgment.",
            "구현을 맡긴다고 판단까지 맡기는 것은 아닙니다.",
          ),
          teacherNotes: [
            c(
              "Use the live demo to name one AI action and one human decision; do not discuss abstract intelligence.",
              "방금 시연에서 AI가 한 일 하나와 사람이 한 결정 하나를 찾게 한다. 추상적인 지능 논쟁으로 가지 않는다.",
            ),
          ],
        }),
        slide({
          id: "day1-02-claim-evidence",
          stageId: "day1-human-role",
          layout: "compare",
          minutes: 2,
          kicker: c("CLAIM VS EVIDENCE", "주장과 증거"),
          title: c("These sentences sound similar. Only one proves the feature.", "비슷하게 들리지만, 기능을 증명하는 문장은 하나뿐입니다."),
          items: [
            {
              label: c("CLAIM", "주장"),
              title: c("“I fixed the button.”", "“버튼을 수정했습니다.”"),
              body: c(
                "This tells us what the AI believes it changed. No user action or result is shown.",
                "AI가 무엇을 바꿨다고 생각하는지는 알 수 있지만, 사용자 행동과 결과는 없습니다.",
              ),
              tone: "warning",
            },
            {
              label: c("EVIDENCE", "증거"),
              title: c("“I clicked it; the message appeared.”", "“직접 눌렀고, 문장이 나타났습니다.”"),
              body: c(
                "The action and observed result match the success criterion.",
                "행동과 관찰 결과가 성공조건과 일치합니다.",
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "Evidence is something another person could reproduce.",
            "증거는 다른 사람도 같은 방식으로 재현할 수 있어야 합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to rewrite one claim from the live demo as an evidence sentence.",
              "라이브 시연에서 나온 주장 하나를 증거 문장으로 바꾸게 한다.",
            ),
          ],
        }),
        slide({
          id: "day1-02-responsibility-question",
          stageId: "day1-human-role",
          layout: "question",
          minutes: 2,
          kicker: c("DECISION CHECK", "판단 확인"),
          title: c("The page looks right, but the main button was never clicked.", "화면은 멀쩡해 보이지만 핵심 버튼은 한 번도 누르지 않았습니다."),
          question: {
            prompt: c("Is the page ready to save?", "이 페이지를 최종본으로 저장해도 될까요?"),
            options: [
              c("A. Yes—the AI reported no errors.", "A. 예—AI가 오류가 없다고 말했습니다."),
              c("B. Yes—the colors and spacing look finished.", "B. 예—색과 간격이 완성되어 보입니다."),
              c("C. Not yet—the promised behavior has no evidence.", "C. 아직—약속한 동작의 증거가 없습니다."),
            ],
            answer: c("C", "C"),
            explanation: c(
              "Visual appearance cannot replace a behavior test. Run the promised user action first.",
              "보이는 모양은 동작 테스트를 대신할 수 없습니다. 약속한 사용자 행동을 먼저 실행해야 합니다.",
            ),
          },
          takeaway: c(
            "The human decides ‘done’ after testing the promise.",
            "사람은 약속을 테스트한 뒤 ‘완료’를 결정합니다.",
          ),
          teacherNotes: [
            c(
              "Collect an answer and a reason. Then connect the reason to the Action–Expected–Actual model.",
              "답과 이유를 함께 받은 뒤 Action–Expected–Actual 모델에 연결한다.",
            ),
          ],
        }),
        slide({
          id: "day1-02-role-summary",
          stageId: "day1-human-role",
          layout: "summary",
          minutes: 1,
          kicker: c("THE WORKING AGREEMENT", "AI와 일하는 원칙"),
          title: c("Use AI for speed. Keep human control at the gates.", "AI로 속도를 얻고, 중요한 관문은 사람이 지킵니다."),
          items: [
            {
              title: c("Before", "전"),
              body: c("The human defines the goal and boundaries.", "사람이 목표와 경계를 정합니다."),
            },
            {
              title: c("During", "중"),
              body: c("The human reads the plan and watches the scope.", "사람이 계획을 읽고 범위를 살핍니다."),
            },
            {
              title: c("After", "후"),
              body: c("The human tests, decides, and owns the result.", "사람이 테스트하고, 결정하고, 결과에 책임집니다."),
            },
          ],
          takeaway: c(
            "Human agency is a sequence of observable decisions.",
            "사람의 주도성은 눈에 보이는 결정의 연속입니다.",
          ),
          teacherNotes: [
            c(
              "Transition directly into the two formative activities on the learner page.",
              "학생 화면의 두 형성평가 활동으로 바로 전환한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-safety-promise",
      role: "learn",
      slides: [
        slide({
          id: "day1-03-agent-power",
          stageId: "day1-safety-promise",
          layout: "concept",
          minutes: 1,
          kicker: c("WHY SAFETY COMES FIRST", "왜 안전을 먼저 배우나"),
          title: c("A coding agent can act, not only answer.", "코딩 에이전트는 답만 하지 않고 행동합니다."),
          lead: c(
            "It may read files, write files, run commands, install packages, and send data to online services. A careless request can therefore change more than a chat message.",
            "파일을 읽고 쓰며, 명령을 실행하고, 패키지를 설치하고, 온라인 서비스로 데이터를 보낼 수 있습니다. 따라서 부주의한 요청은 채팅 문장보다 훨씬 큰 변화를 만들 수 있습니다.",
          ),
          items: [
            {
              title: c("Data risk", "데이터 위험"),
              body: c("A secret or personal detail can leave the computer.", "비밀정보나 개인정보가 컴퓨터 밖으로 나갈 수 있습니다."),
              tone: "danger",
            },
            {
              title: c("Change risk", "변경 위험"),
              body: c("A broad instruction can overwrite working files.", "넓은 지시는 작동하던 파일을 덮어쓸 수 있습니다."),
              tone: "warning",
            },
            {
              title: c("Trust risk", "신뢰 위험"),
              body: c("Plausible code may use a false API or unsafe dependency.", "그럴듯한 코드가 존재하지 않는 API나 위험한 의존성을 사용할 수 있습니다."),
              tone: "warning",
            },
          ],
          takeaway: c(
            "Safety is part of the build loop, not a separate lecture after building.",
            "안전은 제작이 끝난 뒤 듣는 별도 강의가 아니라 빌드 루프의 일부입니다.",
          ),
          teacherNotes: [
            c(
              "Keep examples within classroom scope. Do not display a real API key even as a bad example.",
              "사례는 수업 범위 안에서 든다. 나쁜 예시로도 실제 API 키를 화면에 표시하지 않는다.",
            ),
          ],
        }),
        slide({
          id: "day1-03-data-cases",
          stageId: "day1-safety-promise",
          layout: "compare",
          minutes: 2,
          kicker: c("SAFE INPUT OR STOP?", "입력해도 될까, 멈춰야 할까?"),
          title: c("Classroom data should be fictional, minimal, and replaceable.", "수업 데이터는 가상이고, 최소이며, 바꿀 수 있어야 합니다."),
          items: [
            {
              label: c("SAFE FOR THIS LAB", "이 실습에서 안전"),
              title: c("Invented content", "가상 내용"),
              body: c(
                "A made-up name, sample event, placeholder email, or fictional record that identifies nobody.",
                "가상 이름, 예시 행사, placeholder 이메일, 누구도 식별하지 않는 가짜 기록.",
              ),
              tone: "good",
            },
            {
              label: c("DO NOT ENTER", "입력 금지"),
              title: c("Secrets and real identity", "비밀과 실제 신원"),
              body: c(
                "API keys, passwords, student IDs, phone numbers, private photos, or another person's data.",
                "API 키, 비밀번호, 학번, 전화번호, 비공개 사진, 다른 사람의 개인정보.",
              ),
              tone: "danger",
            },
            {
              label: c("ASK FIRST", "먼저 확인"),
              title: c("Unclear ownership", "소유권이 불분명한 자료"),
              body: c(
                "Images, text, datasets, or code you did not create and do not clearly have permission to use.",
                "직접 만들지 않았고 사용 허락이 분명하지 않은 이미지, 글, 데이터, 코드.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "If the exercise still works with fictional data, use fictional data.",
            "가상 데이터로도 실습이 된다면 반드시 가상 데이터를 사용합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners for one safe substitute for a real phone number or student name.",
              "실제 전화번호나 학생 이름 대신 쓸 수 있는 안전한 대체값을 하나씩 제안하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day1-03-stop-hide-ask",
          stageId: "day1-safety-promise",
          layout: "flow",
          minutes: 2,
          kicker: c("IF A SECRET APPEARS", "비밀정보가 보였다면"),
          title: c("Do not continue the workflow.", "그 상태로 작업을 계속하지 않습니다."),
          items: [
            {
              label: c("1 · STOP", "1 · 중단"),
              title: c("Do not send or copy it", "전송·복사하지 않기"),
              body: c("Pause the agent and the screen share.", "에이전트와 화면 공유를 멈춥니다."),
              tone: "danger",
            },
            {
              label: c("2 · HIDE", "2 · 가리기"),
              title: c("Remove it from view", "화면에서 숨기기"),
              body: c("Close the panel; do not take a screenshot.", "패널을 닫고 스크린샷을 찍지 않습니다."),
              tone: "warning",
            },
            {
              label: c("3 · ASK", "3 · 요청"),
              title: c("Tell the instructor privately", "강사에게 조용히 알리기"),
              body: c("Use the Red side signal and get help.", "옆의 Red 신호를 사용하고 도움을 받습니다."),
            },
            {
              label: c("4 · REVOKE", "4 · 폐기"),
              title: c("Replace an exposed key", "노출된 키 교체"),
              body: c("A hidden screenshot does not make an exposed key safe again.", "화면을 가렸다고 노출된 키가 다시 안전해지는 것은 아닙니다."),
            },
          ],
          takeaway: c(
            "An exposed key is replaced, not merely hidden.",
            "노출된 키는 가리는 것이 아니라 폐기하고 교체합니다.",
          ),
          teacherNotes: [
            c(
              "Explain the institution's actual revoke path without displaying credentials.",
              "자격 증명을 화면에 띄우지 않고 기관의 실제 키 폐기 경로를 설명한다.",
            ),
          ],
        }),
        slide({
          id: "day1-03-safety-question",
          stageId: "day1-safety-promise",
          layout: "question",
          minutes: 1,
          kicker: c("SAFETY DECISION", "안전 판단"),
          title: c("The AI asks for sample student records to finish the page.", "AI가 페이지 완성을 위해 학생 기록 예시를 달라고 합니다."),
          question: {
            prompt: c("What is the safest next action?", "가장 안전한 다음 행동은 무엇일까요?"),
            options: [
              c("A. Paste three real records because the page is local.", "A. 로컬 페이지이므로 실제 기록 세 개를 붙여넣는다."),
              c("B. Use clearly fictional records with no real identifiers.", "B. 실제 식별정보가 없는 명확한 가상 기록을 사용한다."),
              c("C. Ask a classmate to share their details.", "C. 반 친구에게 개인정보를 보내 달라고 한다."),
            ],
            answer: c("B", "B"),
            explanation: c(
              "The interface can be tested without exposing a real person. Local files can still be copied, projected, uploaded, or sent to a model.",
              "실제 사람을 노출하지 않아도 화면을 테스트할 수 있습니다. 로컬 파일도 복사·투사·업로드되거나 모델에 전송될 수 있습니다.",
            ),
          },
          takeaway: c(
            "Use the least sensitive data that can still test the behavior.",
            "동작을 시험할 수 있는 범위에서 가장 덜 민감한 데이터를 사용합니다.",
          ),
          teacherNotes: [
            c(
              "After the reveal, ask why 'local' does not automatically mean 'private.'",
              "정답 공개 후 ‘로컬’이 자동으로 ‘비공개’를 뜻하지 않는 이유를 묻는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-break",
      role: "break",
      slides: [
        slide({
          id: "day1-break",
          stageId: "day1-break",
          layout: "run",
          minutes: 10,
          kicker: c("BREAK · 10 MINUTES", "휴식 · 10분"),
          title: c("Step away from the screen.", "화면에서 잠시 떨어지세요."),
          lead: c(
            "Return with the coding tool, index.html, and browser ready.",
            "코딩 도구, index.html, 브라우저를 준비한 상태로 돌아오세요.",
          ),
          teacherNotes: [
            c(
              "This slide is operational and excluded from learning progress.",
              "이 화면은 운영용이며 학습 진도에서 제외한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-tools-files",
      role: "learn",
      slides: [
        slide({
          id: "day1-05-four-places",
          stageId: "day1-tools-files",
          layout: "flow",
          minutes: 3,
          kicker: c("ONE PROJECT, FOUR PLACES", "프로젝트 하나, 네 장소"),
          title: c("Know where each kind of truth lives.", "어떤 사실이 어디에 있는지 구분합니다."),
          items: [
            {
              label: c("FOLDER", "폴더"),
              title: c("Boundary", "작업 경계"),
              body: c("The agent may change files inside this workspace.", "에이전트가 이 작업공간 안의 파일을 바꿀 수 있습니다."),
            },
            {
              label: c("AI TOOL", "AI 도구"),
              title: c("Proposal", "제안"),
              body: c("The conversation holds requests, plans, and claims.", "대화에는 요청, 계획, 주장이 들어 있습니다."),
            },
            {
              label: c("index.html", "index.html"),
              title: c("Implementation", "구현"),
              body: c("The file contains the page that currently exists.", "파일에는 현재 존재하는 페이지가 들어 있습니다."),
            },
            {
              label: c("BROWSER", "브라우저"),
              title: c("Evidence", "증거"),
              body: c("User actions reveal what actually works.", "사용자 행동을 통해 실제 작동 여부가 드러납니다."),
              tone: "good",
            },
          ],
          takeaway: c(
            "Chat tells you what was intended. The browser tells you what happened.",
            "채팅은 의도를 말하고, 브라우저는 실제 결과를 보여 줍니다.",
          ),
          teacherNotes: [
            c(
              "Physically point to each window and then ask learners to point to the place that produces evidence.",
              "각 창을 실제로 가리킨 뒤, 증거를 만드는 장소를 학생이 손으로 가리키게 한다.",
            ),
          ],
        }),
        slide({
          id: "day1-05-file-change",
          stageId: "day1-tools-files",
          layout: "worked-example",
          minutes: 3,
          kicker: c("FOLLOW ONE CHANGE", "변경 하나 따라가기"),
          title: c("A request becomes a result through a chain.", "요청은 여러 단계를 거쳐 결과가 됩니다."),
          items: [
            {
              label: c("1", "1"),
              title: c("Request", "요청"),
              body: c('“Change the button label to Try it.”', "“버튼 문구를 Try it으로 바꿔 주세요.”"),
            },
            {
              label: c("2", "2"),
              title: c("Plan", "계획"),
              body: c("Edit only the button text in index.html.", "index.html의 버튼 문구만 수정한다."),
            },
            {
              label: c("3", "3"),
              title: c("File change", "파일 변경"),
              body: c("The HTML text changes; behavior stays untouched.", "HTML 문구가 바뀌고 동작은 그대로다."),
            },
            {
              label: c("4", "4"),
              title: c("Browser test", "브라우저 테스트"),
              body: c("Refresh, read the label, click, observe the old behavior.", "새로고침하고 문구를 읽고 클릭해 기존 동작도 확인한다."),
            },
          ],
          takeaway: c(
            "A small request should leave a small, explainable trail.",
            "작은 요청은 작고 설명 가능한 변경 흔적을 남겨야 합니다.",
          ),
          teacherNotes: [
            c(
              "Demonstrate a refresh after the file change; novices often mistake an old browser view for a failed edit.",
              "파일 변경 후 새로고침을 시연한다. 초보자는 오래된 브라우저 화면을 수정 실패로 오해하기 쉽다.",
            ),
          ],
        }),
        slide({
          id: "day1-05-evidence-question",
          stageId: "day1-tools-files",
          layout: "question",
          minutes: 2,
          kicker: c("LOCATE THE EVIDENCE", "증거의 위치"),
          title: c("The chat says the new label is present. The browser still shows the old label.", "채팅은 새 문구가 적용됐다고 하지만 브라우저에는 이전 문구가 보입니다."),
          question: {
            prompt: c("What should you do first?", "가장 먼저 무엇을 해야 할까요?"),
            options: [
              c("A. Ask AI to rewrite the whole page.", "A. AI에게 페이지 전체를 다시 쓰게 한다."),
              c("B. Refresh the browser and inspect the actual file.", "B. 브라우저를 새로고침하고 실제 파일을 확인한다."),
              c("C. Trust the chat and save.", "C. 채팅을 믿고 저장한다."),
            ],
            answer: c("B", "B"),
            explanation: c(
              "First rule out stale display and confirm whether index.html changed. Then describe the observed gap.",
              "먼저 오래된 화면인지 확인하고 index.html이 실제로 바뀌었는지 봅니다. 그다음 관찰한 차이를 설명합니다.",
            ),
          },
          takeaway: c(
            "Before asking for another change, locate the current truth.",
            "다시 수정을 요청하기 전에 현재 사실이 어디에 있는지 확인합니다.",
          ),
          teacherNotes: [
            c(
              "Use this question to check whether learners understand the folder–file–browser relationship.",
              "이 질문으로 폴더–파일–브라우저 관계를 이해했는지 확인한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-guided-first-build",
      role: "build",
      slides: [
        slide({
          id: "day1-06-build-contract",
          stageId: "day1-guided-first-build",
          layout: "studio",
          minutes: 2,
          kicker: c("GUIDED BUILD · CONTRACT", "함께 만들기 · 성공조건"),
          title: c("Build the same small page, then prove it.", "같은 작은 페이지를 만들고, 작동을 증명합니다."),
          lead: c(
            "Do not personalize yet. Keeping the target identical lets us compare the process, not design taste.",
            "아직 개인화하지 않습니다. 목표를 같게 두면 디자인 취향이 아니라 제작 과정을 비교할 수 있습니다.",
          ),
          items: [
            {
              title: c("One file", "파일 하나"),
              body: c("day1-first-build/index.html", "day1-first-build/index.html"),
            },
            {
              title: c("Five promises", "약속 다섯 가지"),
              body: c(
                "Exact title, message, Human in Control card, button, and visible click result.",
                "정확한 제목, 안내 문장, Human in Control 카드, 버튼, 보이는 클릭 결과.",
              ),
            },
            {
              title: c("One boundary", "경계 하나"),
              body: c("No packages and no additional files.", "패키지와 추가 파일 없음."),
            },
          ],
          takeaway: c(
            "Everyone builds the same target; everyone keeps their own evidence.",
            "모두 같은 목표를 만들지만, 각자 자신의 증거를 남깁니다.",
          ),
          teacherNotes: [
            c(
              "Pause before learners send the prompt. Ask them to point to the five success criteria.",
              "학생이 프롬프트를 보내기 전에 멈추고 다섯 가지 성공조건을 손으로 짚게 한다.",
            ),
          ],
        }),
        slide({
          id: "day1-06-plan-gate",
          stageId: "day1-guided-first-build",
          layout: "compare",
          minutes: 2,
          kicker: c("WATCH · PLAN GATE", "WATCH · 계획 관문"),
          title: c("Read for scope, not for technical vocabulary.", "기술 용어가 아니라 범위를 읽습니다."),
          items: [
            {
              title: c("What will change?", "무엇을 바꾸나?"),
              body: c(
                "The plan should name index.html and all five promised results.",
                "계획에 index.html과 다섯 가지 약속이 모두 보여야 합니다.",
              ),
            },
            {
              title: c("What will stay?", "무엇을 유지하나?"),
              body: c("The plan should not add packages, servers, accounts, or extra files.", "패키지, 서버, 계정, 추가 파일을 넣지 않아야 합니다."),
            },
            {
              title: c("How will we know?", "어떻게 확인하나?"),
              body: c("The plan should end with opening the file and clicking the button.", "계획은 파일을 열고 버튼을 누르는 테스트로 끝나야 합니다."),
            },
          ],
          takeaway: c(
            "You do not need to understand every line of code to reject an out-of-scope plan.",
            "코드 한 줄 한 줄을 몰라도 범위를 벗어난 계획은 거절할 수 있습니다.",
          ),
          teacherNotes: [
            c(
              "Model one rejection sentence: 'Keep it to index.html; do not add a framework.'",
              "거절 문장 하나를 시연한다: ‘index.html 하나로 유지하고 프레임워크는 추가하지 마세요.’",
            ),
          ],
        }),
        slide({
          id: "day1-06-test-gate",
          stageId: "day1-guided-first-build",
          layout: "demo",
          minutes: 1,
          kicker: c("CHECK · TEST GATE", "CHECK · 테스트 관문"),
          title: c("Test in the browser before asking for improvements.", "개선을 요청하기 전에 브라우저에서 테스트합니다."),
          items: [
            {
              label: c("TEST 1", "테스트 1"),
              title: c("Read", "읽기"),
              body: c(
                "Can you find the exact title, message, and Human in Control card?",
                "정확한 제목, 안내 문장, Human in Control 카드를 찾을 수 있나요?",
              ),
            },
            {
              label: c("TEST 2", "테스트 2"),
              title: c("Act", "행동"),
              body: c("Can you click the button?", "버튼을 누를 수 있나요?"),
            },
            {
              label: c("TEST 3", "테스트 3"),
              title: c("Observe", "관찰"),
              body: c("Does the exact success message appear?", "정확한 성공 문장이 나타나나요?"),
            },
            {
              label: c("TEST 4", "테스트 4"),
              title: c("Repeat", "반복"),
              body: c("After refresh, does the behavior still work?", "새로고침 후에도 같은 동작이 되나요?"),
            },
          ],
          takeaway: c(
            "A working first version is more valuable than an untested beautiful version.",
            "테스트한 첫 버전이 테스트하지 않은 멋진 버전보다 가치 있습니다.",
          ),
          teacherNotes: [
            c(
              "Do not let fast learners start styling until all five promises have an Actual result.",
              "빠른 학생도 다섯 가지 약속의 Actual을 기록하기 전에는 스타일 변경을 시작하지 않게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-check-fix-save",
      role: "build",
      slides: [
        slide({
          id: "day1-07-failure-is-data",
          stageId: "day1-check-fix-save",
          layout: "concept",
          minutes: 1,
          kicker: c("A FAILED TEST IS USEFUL", "실패한 테스트는 쓸모가 있습니다"),
          title: c("Failure becomes useful when it is specific.", "실패는 구체적으로 기록할 때 유용해집니다."),
          lead: c(
            "“It is broken” gives the next attempt nothing to target. Action, Expected, and Actual turn frustration into a repair instruction.",
            "“안 됩니다”만으로는 다음 시도가 겨냥할 곳이 없습니다. Action, Expected, Actual은 답답함을 수리 지시로 바꿉니다.",
          ),
          takeaway: c(
            "Do not hide a failed test. Use it to narrow the next change.",
            "실패한 테스트를 숨기지 말고 다음 변경의 범위를 좁히는 데 사용합니다.",
          ),
          teacherNotes: [
            c(
              "Open the prepared broken page and let everyone observe the same failure before showing the fix.",
              "준비된 고장난 페이지를 열고 수정 전에 모두가 같은 실패를 관찰하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day1-07-fix-frame",
          stageId: "day1-check-fix-save",
          layout: "worked-example",
          minutes: 1,
          kicker: c("ONE-GAP FIX", "차이 하나만 수정"),
          title: c("A useful FIX message contains four boundaries.", "쓸모 있는 FIX 문장에는 네 가지 경계가 있습니다."),
          items: [
            {
              label: c("CURRENT", "현재"),
              title: c("Observed result", "관찰 결과"),
              body: c("Clicking the button changes nothing.", "버튼을 눌러도 아무 변화가 없다."),
            },
            {
              label: c("EXPECTED", "예상"),
              title: c("Promised result", "약속한 결과"),
              body: c("The success message should appear.", "성공 문장이 나타나야 한다."),
            },
            {
              label: c("CHANGE", "변경"),
              title: c("One target", "대상 하나"),
              body: c("Fix only the button behavior.", "버튼 동작만 고친다."),
            },
            {
              label: c("KEEP", "유지"),
              title: c("Regression boundary", "회귀 방지 경계"),
              body: c("Keep the title, text, and style unchanged.", "제목, 문장, 스타일은 그대로 둔다."),
            },
          ],
          takeaway: c(
            "The word “only” protects working parts.",
            "‘~만’이라는 말이 이미 작동하는 부분을 보호합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners which phrase prevents the AI from redesigning the whole page.",
              "AI가 전체 페이지를 다시 디자인하지 못하게 막는 문구가 무엇인지 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day1-07-save-rule",
          stageId: "day1-check-fix-save",
          layout: "summary",
          minutes: 1,
          kicker: c("SAVE POINT", "SAVE POINT"),
          title: c("Save after proof, not after effort.", "많이 작업한 뒤가 아니라, 증명한 뒤 저장합니다."),
          items: [
            {
              title: c("Run the new test", "새 테스트 실행"),
              body: c("The repaired behavior must pass.", "수정한 동작이 통과해야 합니다."),
            },
            {
              title: c("Run the old test", "기존 테스트 실행"),
              body: c("The parts that worked before must still pass.", "이전에 작동하던 부분도 여전히 통과해야 합니다."),
            },
            {
              title: c("Name the copy", "복사본 이름"),
              body: c("Use a name that tells you what has been verified.", "무엇을 검증했는지 알 수 있는 이름을 사용합니다."),
            },
          ],
          takeaway: c(
            "A Save Point is a tested recovery option.",
            "Save Point는 테스트를 마친 복구 지점입니다.",
          ),
          teacherNotes: [
            c(
              "Have learners open the saved copy once; file existence alone is not proof that the copy works.",
              "저장한 복사본을 한 번 직접 열게 한다. 파일이 존재하는 것만으로 복사본이 작동한다는 증거는 아니다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-project-studio",
      role: "build",
      slides: [
        slide({
          id: "day1-08-studio-loop",
          stageId: "day1-project-studio",
          layout: "studio",
          minutes: 1,
          kicker: c("PROJECT STUDIO · TWO ROUNDS", "PROJECT STUDIO · 두 번의 라운드"),
          title: c("Change one thing. Prove two things.", "하나를 바꾸고, 두 가지를 증명합니다."),
          items: [
            {
              label: c("ROUND 1", "라운드 1"),
              title: c("Your first decision", "첫 번째 결정"),
              body: c("Choose one visible content or style change.", "눈에 보이는 내용 또는 스타일 변경 하나를 고릅니다."),
            },
            {
              label: c("NEW TEST", "새 테스트"),
              title: c("Did the change happen?", "변경이 되었나?"),
              body: c("Write an Action, Expected, and Actual result.", "Action, Expected, Actual을 기록합니다."),
            },
            {
              label: c("REGRESSION", "회귀 테스트"),
              title: c("Does the button still work?", "버튼도 여전히 작동하나?"),
              body: c("Re-run the original click test.", "원래의 클릭 테스트를 다시 실행합니다."),
            },
          ],
          takeaway: c(
            "Every new change must preserve the old promise.",
            "새 변경은 기존 약속을 깨뜨리지 않아야 합니다.",
          ),
          teacherNotes: [
            c(
              "Do not suggest project themes. Help learners make their chosen change smaller and testable.",
              "프로젝트 주제를 제안하지 않는다. 학생이 고른 변경을 더 작고 시험 가능하게 만드는 것만 돕는다.",
            ),
          ],
        }),
        slide({
          id: "day1-08-studio-quality",
          stageId: "day1-project-studio",
          layout: "compare",
          minutes: 1,
          kicker: c("QUALITY BAR", "완료 기준"),
          title: c("More change is not more learning.", "많이 바꾸는 것이 더 많이 배우는 것은 아닙니다."),
          items: [
            {
              label: c("STRONG", "좋은 진행"),
              title: c("Two small, verified decisions", "작고 검증된 결정 두 가지"),
              body: c(
                "Each change has a reason, a narrow prompt, a new test, and a regression test.",
                "각 변경에 이유, 좁은 프롬프트, 새 테스트, 회귀 테스트가 있습니다.",
              ),
              tone: "good",
            },
            {
              label: c("WEAK", "약한 진행"),
              title: c("A large, untested redesign", "크고 테스트하지 않은 재설계"),
              body: c(
                "Many visible changes make it hard to know what caused a failure.",
                "눈에 보이는 변경이 많으면 무엇이 실패를 만들었는지 알기 어렵습니다.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "Depth comes from decisions and evidence, not feature count.",
            "학습의 깊이는 기능 수가 아니라 결정과 증거에서 나옵니다.",
          ),
          teacherNotes: [
            c(
              "Redirect fast learners to explain the changed code or design an edge test instead of adding a third feature.",
              "빠른 학생은 세 번째 기능 대신 바뀐 코드를 설명하거나 경계 테스트를 설계하게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day1-share-exit",
      role: "share",
      slides: [
        slide({
          id: "day1-09-peer-proof",
          stageId: "day1-share-exit",
          layout: "demo",
          minutes: 2,
          kicker: c("SHOW, TEST, SWITCH", "보여주고, 시험하고, 바꾸기"),
          title: c("Your partner chooses the action.", "짝이 테스트할 행동을 고릅니다."),
          items: [
            {
              label: c("OWNER", "제작자"),
              title: c("Do not coach", "설명으로 유도하지 않기"),
              body: c("Hand over the page and watch silently.", "페이지를 넘기고 조용히 관찰합니다."),
            },
            {
              label: c("TESTER", "테스터"),
              title: c("Use the page", "페이지 사용"),
              body: c("Read, click, and say what you expected and saw.", "읽고, 누르고, 예상과 실제를 말합니다."),
            },
            {
              label: c("BOTH", "함께"),
              title: c("Record one fact", "사실 하나 기록"),
              body: c("Write one observed success or gap.", "관찰한 성공 또는 차이 하나를 기록합니다."),
            },
          ],
          takeaway: c(
            "If another person cannot reproduce it, your evidence is incomplete.",
            "다른 사람이 재현할 수 없다면 증거가 아직 부족합니다.",
          ),
          teacherNotes: [
            c(
              "Interrupt coaching gently. The tester's confusion is valuable evidence, not a problem to hide.",
              "제작자가 설명으로 유도하면 부드럽게 멈춘다. 테스터의 혼란은 숨길 문제가 아니라 중요한 증거다.",
            ),
          ],
        }),
        slide({
          id: "day1-09-exit",
          stageId: "day1-share-exit",
          layout: "summary",
          minutes: 2,
          kicker: c("DAY 1 · EXIT", "1일차 · 마무리"),
          title: c("Name your part in the work.", "이 결과에서 내가 한 일을 구분해 말합니다."),
          items: [
            {
              label: c("I DECIDED", "내가 결정"),
              title: c("One choice", "선택 하나"),
              body: c("What did you choose that AI could not choose for you?", "AI가 대신할 수 없었던 내 선택은 무엇인가요?"),
            },
            {
              label: c("AI DRAFTED", "AI가 작성"),
              title: c("One implementation", "구현 하나"),
              body: c("What code or change did the tool produce?", "도구가 어떤 코드나 변경을 만들었나요?"),
            },
            {
              label: c("I VERIFIED", "내가 검증"),
              title: c("One piece of evidence", "증거 하나"),
              body: c("What action did you run, and what did you observe?", "어떤 행동을 실행했고 무엇을 관찰했나요?"),
            },
          ],
          takeaway: c(
            "TELL → WATCH → CHECK → FIX → SAVE. Tomorrow we make each request more precise.",
            "TELL → WATCH → CHECK → FIX → SAVE. 내일은 각 요청을 더 정밀하게 만듭니다.",
          ),
          teacherNotes: [
            c(
              "Collect one answer from each category, not three answers from the same confident learner.",
              "한 명의 자신 있는 학생에게서 세 답을 모두 받지 말고, 각 범주마다 서로 다른 학생의 답을 받는다.",
            ),
          ],
        }),
      ],
    },
  ],
};
