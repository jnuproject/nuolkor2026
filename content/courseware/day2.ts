import { copy as c, type DayCourseware, type TeachingSlide } from "./types";

function slide(value: TeachingSlide): TeachingSlide {
  return value;
}

export const day2Courseware: DayCourseware = {
  day: 2,
  essentialQuestion: c(
    "How can a request become testable, and how can a failure become useful evidence?",
    "요청을 어떻게 테스트 가능하게 만들고, 실패를 어떻게 쓸모 있는 증거로 바꿀까?",
  ),
  stages: [
    {
      stageId: "day2-review",
      role: "preflight",
      slides: [
        slide({
          id: "day2-00-retrieve-and-verify",
          stageId: "day2-review",
          layout: "run",
          minutes: 3,
          kicker: c("RETRIEVAL · BEFORE NEW LEARNING", "회상 · 새 학습 전"),
          title: c(
            "Can yesterday's loop survive a new day?",
            "어제의 루프를 오늘도 사용할 수 있을까?",
          ),
          lead: c(
            "First retrieve the five moves from memory. Then open the Day 1 Save Point and run one real test without editing it.",
            "먼저 다섯 동작을 기억에서 꺼냅니다. 그다음 Day 1 Save Point를 열어 수정하지 않고 실제 테스트 하나를 실행합니다.",
          ),
          items: [
            {
              label: c("RECALL", "회상"),
              title: c("TELL → WATCH → CHECK → FIX → SAVE", "TELL → WATCH → CHECK → FIX → SAVE"),
              body: c(
                "Do not copy the words. Reconstruct what each move protects.",
                "단어를 베끼지 말고 각 동작이 무엇을 지키는지 떠올립니다.",
              ),
            },
            {
              label: c("VERIFY", "검증"),
              title: c("Click the original button", "기존 버튼 클릭"),
              body: c(
                'Expected: “The button works!” appears. Actual: write only what the browser shows.',
                'Expected: “The button works!”가 나타난다. Actual: 브라우저에 보인 것만 기록합니다.',
              ),
            },
            {
              label: c("BOUNDARY", "경계"),
              title: c("Do not repair yesterday's file now", "지금 어제 파일을 고치지 않기"),
              body: c(
                "A failed check is still useful evidence. Keep it and start Day 2 in a new folder.",
                "실패한 확인도 쓸모 있는 증거입니다. 기록만 남기고 Day 2는 새 폴더에서 시작합니다.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "Retrieval checks your model; the browser checks your artifact.",
            "회상은 내 머릿속 모델을, 브라우저는 실제 결과물을 확인합니다.",
          ),
          teacherNotes: [
            c(
              "Hide the loop for 45 seconds. Ask for both the word and one concrete action before revealing each step.",
              "45초 동안 루프를 가린다. 각 단계를 공개하기 전에 단어와 구체 행동 하나를 함께 받는다.",
            ),
            c(
              "This is classroom operation and diagnostic retrieval, not the Day 2 explanation block.",
              "이 구간은 수업 운영과 진단적 회상이며 Day 2의 본 설명 구간이 아니다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-ab-test",
      role: "learn",
      slides: [
        slide({
          id: "day2-01-ab-prediction",
          stageId: "day2-ab-test",
          layout: "question",
          minutes: 2,
          kicker: c("PREDICT BEFORE THE DEMO", "시연 전 예측"),
          title: c(
            "Two requests use the same tool. Will they produce the same rules?",
            "같은 도구에 두 요청을 보내면 같은 규칙이 나올까?",
          ),
          question: {
            prompt: c(
              'Request A says only: “Make a page that checks input.” What must the AI do next?',
              '요청 A는 “입력을 확인하는 페이지를 만들어 줘”라고만 말합니다. AI는 다음에 무엇을 해야 할까요?',
            ),
            options: [
              c("A. Discover the teacher's hidden rules", "A. 강사가 숨겨 둔 규칙을 알아낸다"),
              c("B. Ask questions or invent missing rules", "B. 질문하거나 빠진 규칙을 임의로 정한다"),
              c("C. Produce the one objectively correct page", "C. 객관적으로 유일한 정답 페이지를 만든다"),
            ],
            answer: c("B", "B"),
            explanation: c(
              "The request does not define valid input, error cases, exact messages, or a test. The tool must ask or guess.",
              "유효한 입력, 오류 경우, 정확한 문구, 테스트가 정해지지 않았기 때문에 도구는 묻거나 추측해야 합니다.",
            ),
          },
          takeaway: c(
            "A vague request transfers hidden decisions to the model.",
            "모호한 요청은 숨은 결정을 모델에게 넘깁니다.",
          ),
          teacherNotes: [
            c(
              "Collect predictions before opening either file. Do not treat 'the AI will ask' as failure; it is evidence that information is missing.",
              "두 파일을 열기 전에 예측을 받는다. AI가 되묻는 것을 실패로 취급하지 않는다. 정보가 빠졌다는 증거다.",
            ),
          ],
        }),
        slide({
          id: "day2-01-ab-live-evidence",
          stageId: "day2-ab-test",
          layout: "worked-example",
          minutes: 4,
          kicker: c("WORKED A/B · REAL FILES", "A/B 완성 사례 · 실제 파일"),
          title: c(
            "The difference is not style. It is whether the result can be judged.",
            "차이는 디자인이 아니라 결과를 판정할 수 있느냐입니다.",
          ),
          items: [
            {
              label: c("A · VAGUE ASSET", "A · 모호한 파일"),
              title: c("day2-offline-vague.html", "day2-offline-vague.html"),
              body: c(
                'It accepts any non-empty text and answers “Looks good.” Nobody defined what “good” means.',
                '빈칸이 아닌 모든 글을 받고 “Looks good.”라고 답합니다. 무엇이 “좋은지” 아무도 정의하지 않았습니다.',
              ),
              tone: "warning",
            },
            {
              label: c("B · SPECIFIC ASSET", "B · 구체적 파일"),
              title: c("day2-offline-specific.html", "day2-offline-specific.html"),
              body: c(
                "It distinguishes empty, non-whole, out-of-range, and valid input with four exact results.",
                "빈 입력, 정수가 아님, 범위 밖, 유효 입력을 네 가지 정확한 결과로 구분합니다.",
              ),
              tone: "good",
            },
            {
              label: c("SAME ACTION", "같은 행동"),
              title: c("Try empty, abc, 0, and 5", "빈칸, abc, 0, 5 입력"),
              body: c(
                "For each input, write Expected before clicking. Then record Actual.",
                "각 입력마다 클릭하기 전에 Expected를 쓰고, 실행 뒤 Actual을 기록합니다.",
              ),
            },
          ],
          takeaway: c(
            "A testable request creates results we can predict before the page exists.",
            "테스트 가능한 요청은 페이지가 생기기 전에도 결과를 예측할 수 있게 합니다.",
          ),
          teacherNotes: [
            c(
              "Open the provided vague and specific assets in separate tabs. Use exactly the same four inputs in both.",
              "제공된 vague와 specific 파일을 별도 탭에서 연다. 두 파일에 정확히 같은 네 입력을 사용한다.",
            ),
            c(
              "Ask learners to read the result text aloud. Keep the comparison on rules and evidence, not color or layout.",
              "학생에게 결과 문구를 소리 내어 읽게 한다. 색이나 배치가 아니라 규칙과 증거를 비교한다.",
            ),
          ],
        }),
        slide({
          id: "day2-01-ab-explanation-check",
          stageId: "day2-ab-test",
          layout: "question",
          minutes: 2,
          kicker: c("RETRIEVAL · EXPLAIN THE CAUSE", "회수 질문 · 원인 설명"),
          title: c(
            "Why is B stronger?",
            "왜 B가 더 좋은 요청일까?",
          ),
          question: {
            prompt: c("Choose the explanation that would still be true with a different AI model.", "다른 AI 모델을 써도 성립할 설명을 고르세요."),
            options: [
              c("A. B includes several examples, so the AI cannot make implementation mistakes.", "A. B에 예시가 여러 개 있어서 AI가 구현 실수를 할 수 없기 때문이다."),
              c("B. B gives rules, boundaries, and observable results.", "B. B가 규칙, 경계, 관찰 가능한 결과를 주기 때문이다."),
              c("C. B describes the visual design more completely.", "C. B가 시각 디자인을 더 완전하게 설명하기 때문이다."),
            ],
            answer: c("B", "B"),
            explanation: c(
              "Length is not the mechanism. B reduces the decisions the model must invent and gives the human a pass/fail test.",
              "길이가 작동 원리가 아닙니다. B는 모델이 임의로 정할 결정을 줄이고, 사람에게 통과/실패 테스트를 줍니다.",
            ),
          },
          items: [
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("A long request can still be vague", "긴 요청도 모호할 수 있음"),
              body: c(
                "“Make it modern, amazing, intuitive, and professional” is long but has no exact behavior or test.",
                "“현대적이고 멋지고 직관적이며 전문적으로 만들어 줘”는 길지만 정확한 동작이나 테스트가 없습니다.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "Precise means testable and bounded—not long.",
            "구체적이라는 말은 길다는 뜻이 아니라, 테스트 가능하고 범위가 정해졌다는 뜻입니다.",
          ),
          teacherNotes: [
            c(
              "Require a because-clause from one learner: 'B is stronger because…'. Correct answers that mention length alone.",
              "학생 한 명에게 ‘B가 더 좋은 이유는…’ 형태로 이유까지 말하게 한다. 길이만 언급하면 바로잡는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-prompt-frame",
      role: "learn",
      slides: [
        slide({
          id: "day2-02-frame-diagnosis",
          stageId: "day2-prompt-frame",
          layout: "question",
          minutes: 1,
          kicker: c("DIAGNOSE THE REQUEST", "요청 진단"),
          title: c(
            "“Add a Clear button.” What is still unknown?",
            "“Clear 버튼을 추가해 줘.” 아직 무엇이 불분명할까?",
          ),
          question: {
            prompt: c("Which missing detail most directly blocks a test?", "어떤 빠진 정보가 테스트를 가장 직접적으로 막을까요?"),
            options: [
              c("A. Whether Clear sits beside Check input or below the field", "A. Clear를 Check input 옆에 둘지 입력 칸 아래에 둘지"),
              c("B. What Clear must remove and what must stay", "B. Clear가 무엇을 지우고 무엇을 유지해야 하는지"),
              c("C. Whether Clear uses the existing button color", "C. Clear가 기존 버튼 색을 사용할지"),
            ],
            answer: c("B", "B"),
            explanation: c(
              "A button label does not define behavior. We need an action, an exact result, and a boundary around existing behavior.",
              "버튼 이름만으로는 동작이 정해지지 않습니다. 행동, 정확한 결과, 기존 동작을 지키는 경계가 필요합니다.",
            ),
          },
          takeaway: c(
            "Before writing more, identify which decision is missing.",
            "문장을 늘리기 전에 어떤 결정이 빠졌는지 찾습니다.",
          ),
          teacherNotes: [
            c(
              "Let pairs name one possible interpretation of Clear. Use their different answers to show ambiguity.",
              "짝별로 Clear 동작을 하나씩 해석하게 한다. 서로 다른 답을 이용해 모호성을 보여 준다.",
            ),
          ],
        }),
        slide({
          id: "day2-02-seven-part-frame",
          stageId: "day2-prompt-frame",
          layout: "flow",
          minutes: 2,
          kicker: c("CORE MODEL · SEVEN PARTS", "핵심 모델 · 일곱 요소"),
          title: c(
            "The Prompt Frame separates direction from control.",
            "Prompt Frame은 방향과 통제를 분리합니다.",
          ),
          items: [
            {
              label: c("1 · GOAL", "1 · 목표"),
              title: c("The result", "원하는 결과"),
              body: c("What one outcome do I want?", "한 가지 어떤 결과를 원하는가?"),
            },
            {
              label: c("2 · CONTEXT", "2 · 현재 맥락"),
              title: c("The current truth", "현재 사실"),
              body: c("Which folder, file, and behavior exist now?", "어떤 폴더·파일·동작이 지금 존재하는가?"),
            },
            {
              label: c("3 · FEATURE", "3 · 기능"),
              title: c("One change now", "지금 할 변경 하나"),
              body: c("What is the smallest next move?", "가장 작은 다음 동작은 무엇인가?"),
            },
            {
              label: c("4 · RULES", "4 · 규칙"),
              title: c("Exact behavior", "정확한 동작"),
              body: c("For each relevant action or input, what happens?", "관련 행동이나 입력마다 무엇이 일어나는가?"),
            },
            {
              label: c("5 · CONSTRAINTS", "5 · 제약"),
              title: c("Technical limits", "기술적 한계"),
              body: c("One file? No API? No personal data?", "파일 하나? API 없음? 개인정보 없음?"),
            },
            {
              label: c("6 · DO NOT CHANGE", "6 · 변경 금지"),
              title: c("Protected behavior", "보호할 동작"),
              body: c("Which working parts must remain identical?", "어떤 작동 중인 부분을 그대로 지킬 것인가?"),
            },
            {
              label: c("7 · SUCCESS MEANS", "7 · 성공조건"),
              title: c("Proof", "증거"),
              body: c("What action and visible result will pass the test?", "어떤 행동과 보이는 결과가 테스트를 통과시키는가?"),
            },
          ],
          takeaway: c(
            "The seven parts are a thinking tool, not a ritual that makes every prompt long.",
            "일곱 요소는 모든 프롬프트를 길게 만드는 의식이 아니라 생각을 돕는 도구입니다.",
          ),
          teacherNotes: [
            c(
              "Group Goal–Context–Feature as direction and Rules–Constraints–Do not change–Success means as control.",
              "Goal–Context–Feature는 방향, Rules–Constraints–Do not change–Success means는 통제로 묶어 설명한다.",
            ),
            c(
              "Keep all seven labels visible for the worked example that follows.",
              "다음 완성 예시 동안 일곱 항목을 계속 보이게 둔다.",
            ),
          ],
        }),
        slide({
          id: "day2-02-frame-worked",
          stageId: "day2-prompt-frame",
          layout: "worked-example",
          minutes: 3,
          kicker: c("WORKED EXAMPLE · CLEAR BUTTON", "완성 사례 · CLEAR 버튼"),
          title: c(
            "Seven short decisions make one controlled change.",
            "짧은 결정 일곱 개가 하나의 통제된 변경을 만듭니다.",
          ),
          code: c(
            `Goal: Make it easy to start another check.
Context: day2-prompt-lab/index.html already checks one input.
Feature: Add one button labeled “Clear.”
Rules: Clicking Clear empties the input and result, then focuses the input.
Constraints: Use the existing file only. No library, API, or personal data.
Do not change: Keep the title, Check input button, four input rules, and exact messages.
Success means: After any check, click Clear; both fields become empty, focus returns, and all six old tests still pass.`,
            `Goal: 다음 입력 확인을 쉽게 시작한다.
Context: day2-prompt-lab/index.html에는 입력 하나를 확인하는 기능이 이미 있다.
Feature: “Clear” 버튼 하나를 추가한다.
Rules: Clear를 누르면 입력과 결과를 비우고 입력 칸에 초점을 둔다.
Constraints: 기존 파일 하나만 사용한다. 라이브러리·API·개인정보는 사용하지 않는다.
Do not change: 제목, Check input 버튼, 네 입력 규칙, 정확한 결과 문구를 유지한다.
Success means: 어떤 확인 뒤에도 Clear를 누르면 두 칸이 비고 초점이 돌아오며 기존 여섯 테스트도 모두 통과한다.`,
          ),
          takeaway: c(
            "Success includes the new proof and the old promises.",
            "성공조건에는 새 기능의 증거와 기존 약속이 함께 들어갑니다.",
          ),
          teacherNotes: [
            c(
              "Reveal one line at a time. After each line, ask which uncertainty it removes.",
              "한 줄씩 공개하고 각 줄이 어떤 불확실성을 없애는지 묻는다.",
            ),
            c(
              "Demonstrate the success path in day2-offline-context-after.html only after learners predict the result.",
              "학생이 결과를 예측한 뒤에만 day2-offline-context-after.html에서 성공 경로를 시연한다.",
            ),
          ],
        }),
        slide({
          id: "day2-02-frame-counterexample",
          stageId: "day2-prompt-frame",
          layout: "question",
          minutes: 2,
          kicker: c("COUNTEREXAMPLE · RETRIEVAL", "반례 · 회수 질문"),
          title: c(
            "A complete-looking prompt can still lose control.",
            "모양이 완성된 프롬프트도 통제력을 잃을 수 있습니다.",
          ),
          lead: c(
            "“Add Clear. Make it better. Change anything you need. Success means it looks professional.”",
            "“Clear를 추가하고 더 좋게 만들어 줘. 필요한 것은 무엇이든 바꿔도 돼. 전문적으로 보이면 성공이야.”",
          ),
          question: {
            prompt: c("Which two Prompt Frame parts are most seriously broken?", "Prompt Frame의 어떤 두 항목이 가장 심하게 무너졌을까요?"),
            options: [
              c("Context and Feature", "Context와 Feature"),
              c("Do not change and Success means", "Do not change와 Success means"),
              c("Goal and file name only", "Goal과 파일 이름만"),
            ],
            answer: c("Do not change and Success means", "Do not change와 Success means"),
            explanation: c(
              "The prompt authorizes unlimited change and uses taste as proof. It cannot protect old behavior or define pass/fail.",
              "무제한 변경을 허용하고 취향을 증거로 삼습니다. 기존 동작을 지킬 수도, 통과/실패를 정할 수도 없습니다.",
            ),
          },
          takeaway: c(
            "A boundary says what stays; a test says how we know.",
            "경계는 무엇을 지킬지, 테스트는 어떻게 알 수 있을지를 말합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to repair only the two broken lines orally. Do not let them rewrite the whole example.",
              "학생에게 무너진 두 줄만 말로 고치게 한다. 예시 전체를 다시 쓰게 하지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-context-management",
      role: "learn",
      slides: [
        slide({
          id: "day2-03-context-question",
          stageId: "day2-context-management",
          layout: "question",
          minutes: 1,
          kicker: c("A NEW SESSION KNOWS NOTHING", "새 대화는 아무것도 모릅니다"),
          title: c(
            "Which message lets a new session continue safely?",
            "어떤 메시지가 새 대화를 안전하게 이어 줄까?",
          ),
          question: {
            prompt: c(
              "The old chat contains 80 messages and several rejected ideas. What should you send to a fresh session?",
              "이전 대화에는 메시지 80개와 버린 아이디어 여러 개가 있습니다. 새 대화에는 무엇을 보내야 할까요?",
            ),
            options: [
              c("A. The entire chat transcript", "A. 전체 대화 기록"),
              c("B. “Continue where we stopped”", "B. “하던 데서 계속해 줘”"),
              c("C. A short handoff with current files, tested facts, the next change, and boundaries", "C. 현재 파일·검증된 사실·다음 변경·경계를 담은 짧은 인계"),
            ],
            answer: c("C", "C"),
            explanation: c(
              "A fresh session needs the current truth, not every old thought. Unverified claims and abandoned ideas add noise.",
              "새 대화에는 모든 옛 생각이 아니라 현재 사실이 필요합니다. 검증하지 않은 주장과 버린 아이디어는 잡음을 만듭니다.",
            ),
          },
          takeaway: c(
            "Context is selected evidence, not conversation history.",
            "맥락은 대화 기록 전체가 아니라 선택한 증거입니다.",
          ),
          teacherNotes: [
            c(
              "Ask what the phrase 'continue' refers to in a truly new session. Let the silence expose the missing context.",
              "완전히 새 대화에서 ‘계속’이 무엇을 가리키는지 묻는다. 답하기 어려운 침묵 자체로 맥락 누락을 드러낸다.",
            ),
          ],
        }),
        slide({
          id: "day2-03-handoff-worked",
          stageId: "day2-context-management",
          layout: "worked-example",
          minutes: 3,
          kicker: c("WORKED EXAMPLE · CURRENT TRUTH", "완성 사례 · 현재 사실"),
          title: c(
            "A handoff is a compact contract for the next move.",
            "Context Handoff는 다음 변경을 위한 압축 계약입니다.",
          ),
          code: c(
            `CURRENT
Folder: day2-prompt-lab
File: index.html
Page: Prompt Precision Lab

WORKS
The page distinguishes empty, non-whole, out-of-range, and valid input.

EVIDENCE
Action: enter 5 and click Check input.
Expected: “Accepted: 5”
Actual: “Accepted: 5” — Pass

NEXT
Add one Clear button.

KEEP
Keep all four rules, exact messages, layout, and file names.

SUCCESS
Clear empties input and result, returns focus to the input, and all six old tests still pass.`,
            `CURRENT
폴더: day2-prompt-lab
파일: index.html
페이지: Prompt Precision Lab

WORKS
빈 입력, 정수가 아님, 범위 밖, 유효 입력을 구분한다.

EVIDENCE
Action: 5를 입력하고 Check input을 누른다.
Expected: “Accepted: 5”
Actual: “Accepted: 5” — Pass

NEXT
Clear 버튼 하나를 추가한다.

KEEP
네 규칙, 정확한 문구, 배치, 파일 이름을 유지한다.

SUCCESS
Clear가 입력과 결과를 비우고 입력 칸으로 초점을 돌리며 기존 여섯 테스트도 모두 통과한다.`,
          ),
          items: [
            {
              label: c("FACT", "사실"),
              title: c("“Works” has evidence", "“작동함”에는 증거가 있음"),
              body: c(
                "The handoff includes one reproducible Action–Expected–Actual record.",
                "인계문에는 재현 가능한 Action–Expected–Actual 기록 하나가 들어 있습니다.",
              ),
              tone: "good",
            },
            {
              label: c("BOUNDARY", "경계"),
              title: c("The next move is singular", "다음 변경은 하나"),
              body: c(
                "A new session receives one task and a clear list of protected behavior.",
                "새 대화는 작업 하나와 보호할 동작 목록을 받습니다.",
              ),
            },
          ],
          takeaway: c(
            "Write what is true now, how you know, and what happens next.",
            "지금 무엇이 사실인지, 어떻게 아는지, 다음에 무엇을 할지 씁니다.",
          ),
          teacherNotes: [
            c(
              "Read the handoff into a fresh session. Before accepting any plan, ask learners to underline every statement the tool could verify from files and every statement it must trust from the test record.",
              "새 대화에 인계문을 넣는다. 계획을 승인하기 전에 파일에서 확인할 수 있는 문장과 테스트 기록을 믿어야 하는 문장을 구분하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day2-03-handoff-counterexample",
          stageId: "day2-context-management",
          layout: "question",
          minutes: 2,
          kicker: c("COUNTEREXAMPLE · FACT CHECK", "반례 · 사실 확인"),
          title: c(
            "Two vague lines can send the next session in two wrong directions.",
            "모호한 두 문장은 새 대화를 두 방향 모두에서 어긋나게 합니다.",
          ),
          lead: c(
            "Works: “Everything works.” Next: “Finish the app.”",
            "Works: “다 잘 됩니다.” Next: “앱을 완성하세요.”",
          ),
          question: {
            prompt: c("Which replacement repairs both evidence and scope?", "어떤 수정안이 증거와 범위를 모두 바로잡을까요?"),
            options: [
              c(
                "Works: six named tests pass; Evidence: one A–E–A record. Next: add only Clear; Keep the old rules; Success names the Clear and regression tests.",
                "Works: 이름 있는 테스트 여섯 개 통과; Evidence: A–E–A 기록 하나. Next: Clear만 추가; 기존 규칙 유지; Success에 Clear와 회귀 테스트 명시.",
              ),
              c(
                "Works: the main screen looks finished. Next: polish anything that seems incomplete.",
                "Works: 메인 화면이 완성되어 보임. Next: 미완성처럼 보이는 것을 모두 다듬기.",
              ),
              c(
                "Works: the AI reported success. Next: add Clear and any helpful improvements.",
                "Works: AI가 성공했다고 보고함. Next: Clear와 도움이 될 개선 사항 추가.",
              ),
            ],
            answer: c("The first option", "첫 번째 선택지"),
            explanation: c(
              "The first repair replaces the Works guess with evidence and replaces unlimited Next scope with one change, protected behavior, and a pass/fail test.",
              "첫 수정안은 Works의 추측을 증거로 바꾸고, 무제한 Next를 변경 하나·보호할 동작·통과 기준으로 바꿉니다.",
            ),
          },
          takeaway: c(
            "Every handoff needs all six: Current, Works, Evidence, Next, Keep, Success.",
            "모든 인계문에는 Current, Works, Evidence, Next, Keep, Success 여섯 요소가 필요합니다.",
          ),
          teacherNotes: [
            c(
              "Retrieval prompt: close the worked example and ask learners to name Current, Works, Evidence, Next, Keep, and Success in order.",
              "회수 질문: 완성 예시를 가리고 Current, Works, Evidence, Next, Keep, Success를 순서대로 말하게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-break",
      role: "break",
      slides: [
        slide({
          id: "day2-break",
          stageId: "day2-break",
          layout: "run",
          minutes: 10,
          kicker: c("BREAK · 10 MINUTES", "휴식 · 10분"),
          title: c("Leave the problem on the screen, not in your head.", "문제는 화면에 두고, 머리는 잠시 쉽니다."),
          lead: c(
            "Return with the Prompt Frame card ready. The next block begins with a page that is broken on purpose.",
            "Prompt Frame 카드를 준비한 상태로 돌아오세요. 다음 구간은 의도적으로 고장난 페이지에서 시작합니다.",
          ),
          teacherNotes: [
            c(
              "Open day2-offline-broken.html but do not reveal the defect before learners return.",
              "day2-offline-broken.html을 열어 두되 학생이 돌아오기 전에는 결함을 공개하지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-debugging-demo",
      role: "learn",
      slides: [
        slide({
          id: "day2-04-debug-prediction",
          stageId: "day2-debugging-demo",
          layout: "question",
          minutes: 1,
          kicker: c("PREDICT THE FAILURE", "실패 예측"),
          title: c(
            "What should an empty input produce?",
            "빈 입력은 어떤 결과를 내야 할까?",
          ),
          question: {
            prompt: c(
              "The rule says empty or spaces must show “Enter a value.” What result will count as a failure?",
              "규칙은 빈칸이나 공백에 “Enter a value.”가 나와야 한다고 합니다. 어떤 결과가 나오면 실패일까요?",
            ),
            options: [
              c('“Enter a value.”', "“Enter a value.”"),
              c('“Use a number from 1 to 10.”', "“Use a number from 1 to 10.”"),
              c("Both are acceptable", "둘 다 가능"),
            ],
            answer: c('“Use a number from 1 to 10.”', "“Use a number from 1 to 10.”"),
            explanation: c(
              "The message is valid for 0 or 11, not for an empty field. Exact categories matter.",
              "그 문구는 0이나 11에는 맞지만 빈칸에는 맞지 않습니다. 정확한 입력 범주가 중요합니다.",
            ),
          },
          takeaway: c(
            "Expected must be written before Actual, or we may move the goal after seeing the result.",
            "Actual을 보기 전에 Expected를 써야 결과를 본 뒤 기준을 바꾸지 않습니다.",
          ),
          teacherNotes: [
            c(
              "Do not click yet. Require every learner to commit to an Expected result first.",
              "아직 클릭하지 않는다. 모든 학생이 Expected 결과를 먼저 정하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day2-04-aea-model",
          stageId: "day2-debugging-demo",
          layout: "concept",
          minutes: 2,
          kicker: c("CORE MODEL · ACTION–EXPECTED–ACTUAL", "핵심 모델 · ACTION–EXPECTED–ACTUAL"),
          title: c(
            "A bug report is a comparison, not a feeling.",
            "버그 기록은 느낌이 아니라 비교입니다.",
          ),
          items: [
            {
              label: c("ACTION", "행동"),
              title: c("The reproducible move", "재현할 수 있는 동작"),
              body: c(
                "Open the broken file, leave Number empty, click Check input.",
                "고장난 파일을 열고 Number를 비운 채 Check input을 누른다.",
              ),
            },
            {
              label: c("EXPECTED", "예상"),
              title: c("The rule's promised result", "규칙이 약속한 결과"),
              body: c('The page shows “Enter a value.”', "페이지에 “Enter a value.”가 나타난다."),
            },
            {
              label: c("ACTUAL", "실제"),
              title: c("The observed result", "관찰한 결과"),
              body: c(
                "Copy the exact visible message. Do not explain the cause yet.",
                "화면에 보인 정확한 문구를 옮깁니다. 아직 원인을 설명하지 않습니다.",
              ),
            },
          ],
          takeaway: c(
            "When Expected and Actual differ after the same Action, we have a specific gap to fix.",
            "같은 Action 뒤 Expected와 Actual이 다르면, 고칠 수 있는 구체적 차이가 생깁니다.",
          ),
          teacherNotes: [
            c(
              "Contrast 'It doesn't work' with the three-part record. Ask which one a classmate could reproduce without asking another question.",
              "‘안 돼요’와 세 부분 기록을 비교하고, 어느 쪽을 짝이 추가 질문 없이 재현할 수 있는지 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day2-04-broken-asset-demo",
          stageId: "day2-debugging-demo",
          layout: "demo",
          minutes: 3,
          kicker: c("LIVE DEMO · ONE DEFECT", "라이브 시연 · 결함 하나"),
          title: c(
            "Reproduce first. Explain the code second.",
            "먼저 재현하고, 코드는 그다음 설명합니다.",
          ),
          lead: c(
            "Use day2-offline-broken.html. Keep the source closed until the class has reproduced the same failure and completed Action–Expected–Actual.",
            "day2-offline-broken.html을 사용합니다. 모두가 같은 실패를 재현하고 Action–Expected–Actual을 완성할 때까지 소스는 열지 않습니다.",
          ),
          items: [
            {
              label: c("1 · OBSERVE", "1 · 관찰"),
              title: c("Empty → wrong category", "빈칸 → 잘못된 범주"),
              body: c(
                'Actual: “Use a number from 1 to 10.”',
                'Actual: “Use a number from 1 to 10.”',
              ),
              tone: "danger",
            },
            {
              label: c("2 · LOCALIZE", "2 · 위치 좁히기"),
              title: c("Find the smallest suspect area", "가장 작은 의심 영역 찾기"),
              body: c(
                "After recording evidence, inspect only the input-validation function and mark the first decision that handles empty input.",
                "증거를 기록한 뒤 입력 검증 함수만 보고, 빈 입력을 다루는 첫 결정을 표시합니다.",
              ),
              tone: "warning",
            },
            {
              label: c("3 · PROTECT", "3 · 보호"),
              title: c("Other cases already pass", "다른 경우는 이미 통과"),
              body: c(
                "abc, 0, 1, and 10 must keep their current results.",
                "abc, 0, 1, 10은 현재 결과를 그대로 유지해야 합니다.",
              ),
              tone: "good",
            },
          ],
          code: c(
            `Action: Leave Number empty. Click “Check input.”
Expected: “Enter a value.”
Actual: “Use a number from 1 to 10.”

Fix only the empty-input case.
Before editing, state your suspected cause and point to the smallest relevant branch.
Keep every other rule, message, style, and file unchanged.
After the fix, repeat the failed test and one old passing test.`,
            `Action: Number를 비워 두고 “Check input”을 누른다.
Expected: “Enter a value.”
Actual: “Use a number from 1 to 10.”

빈 입력 경우만 수정하세요.
수정하기 전에 의심하는 원인을 말하고 가장 작은 관련 분기를 짚으세요.
다른 모든 규칙, 문구, 스타일, 파일은 그대로 유지하세요.
수정 후 실패했던 테스트와 기존 통과 테스트 하나를 반복하세요.`,
          ),
          takeaway: c(
            "A fix request targets one observed gap and protects everything else.",
            "FIX 요청은 관찰한 차이 하나를 겨냥하고 나머지를 보호합니다.",
          ),
          teacherNotes: [
            c(
              "Run the failing action twice before opening the source. Let pairs mark a suspected branch first; only then reveal that conversion happens before the empty check.",
              "소스를 열기 전에 실패 행동을 두 번 반복한다. 짝이 의심 분기를 먼저 표시하게 한 뒤에만 빈 입력 확인보다 숫자 변환이 먼저 일어난다는 원인을 공개한다.",
            ),
            c(
              "After the change, repeat empty and 5. If time allows, ask why testing only empty is insufficient.",
              "수정 뒤 빈칸과 5를 다시 시험한다. 시간이 되면 빈칸만 시험하면 부족한 이유를 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day2-04-debug-retrieval",
          stageId: "day2-debugging-demo",
          layout: "question",
          minutes: 2,
          kicker: c("COUNTEREXAMPLE · RETRIEVAL", "반례 · 회수 질문"),
          title: c(
            "Which FIX request is safe enough to send?",
            "어떤 FIX 요청을 보내도 될 만큼 안전할까?",
          ),
          question: {
            prompt: c("Choose the request that preserves scope and evidence.", "범위와 증거를 보존하는 요청을 고르세요."),
            options: [
              c("A. “It is broken. Rewrite the JavaScript.”", "A. “고장났어. JavaScript를 다시 써 줘.”"),
              c("B. “Empty gives the range message; it should give the empty message. Fix only that branch and repeat empty plus 5.”", "B. “빈칸에 범위 문구가 나오지만 빈칸 문구가 나와야 해. 그 분기만 고치고 빈칸과 5를 다시 시험해.”"),
              c("C. “Make all validation smarter.”", "C. “모든 검증을 더 똑똑하게 만들어 줘.”"),
            ],
            answer: c("B", "B"),
            explanation: c(
              "B includes the gap, limits the repair, and names a failed test plus a regression test.",
              "B에는 차이, 수정 범위, 실패 테스트와 회귀 테스트가 모두 있습니다.",
            ),
          },
          takeaway: c(
            "Fix one cause; repeat one failed test and one old passing test.",
            "원인 하나를 고치고, 실패 테스트 하나와 기존 통과 테스트 하나를 반복합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to say the three letters A–E–A and then name the two tests to run after the fix.",
              "학생에게 A–E–A 세 글자를 말하게 한 뒤 수정 후 실행할 두 테스트를 묻는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-guided-lab",
      role: "build",
      slides: [
        slide({
          id: "day2-05-lab-contract",
          stageId: "day2-guided-lab",
          layout: "studio",
          minutes: 2,
          kicker: c("GUIDED LAB · BUILD CONTRACT", "공통 실습 · 제작 계약"),
          title: c(
            "Build the shared rules before you personalize anything.",
            "개인화하기 전에 공통 규칙부터 만듭니다.",
          ),
          lead: c(
            "Everyone builds the same Prompt Precision Lab so we can compare requests, tests, and fixes under the same conditions.",
            "같은 조건에서 요청·테스트·수정을 비교할 수 있도록 모두 동일한 Prompt Precision Lab을 만듭니다.",
          ),
          items: [
            {
              label: c("FILE", "파일"),
              title: c("day2-prompt-lab/index.html", "day2-prompt-lab/index.html"),
              body: c("One local file; no external service.", "로컬 파일 하나; 외부 서비스 없음."),
            },
            {
              label: c("INPUT", "입력"),
              title: c("A whole number from 1 to 10", "1부터 10까지의 정수"),
              body: c("Four categories must produce four exact messages.", "네 입력 범주가 네 정확한 문구를 만듭니다."),
            },
            {
              label: c("FIRST PROOF", "첫 증거"),
              title: c("Empty and 5", "빈칸과 5"),
              body: c(
                'Empty → “Enter a value.”; 5 → “Accepted: 5”.',
                '빈칸 → “Enter a value.”; 5 → “Accepted: 5”.',
              ),
            },
          ],
          takeaway: c(
            "A common target lets us study the process instead of comparing taste.",
            "공통 목표를 사용하면 취향이 아니라 제작 과정을 공부할 수 있습니다.",
          ),
          teacherNotes: [
            c(
              "Point learners to the full seven-part request in the activity. Stop any added login, API, image, or second file before generation.",
              "학생 활동의 일곱 요소 요청을 사용하게 한다. 생성 전에 로그인·API·이미지·두 번째 파일 추가를 막는다.",
            ),
          ],
        }),
        slide({
          id: "day2-05-plan-and-proof",
          stageId: "day2-guided-lab",
          layout: "demo",
          minutes: 2,
          kicker: c("WATCH → CHECK", "WATCH → CHECK"),
          title: c(
            "Approve the plan only when it predicts the tests.",
            "계획이 테스트를 예측할 때만 승인합니다.",
          ),
          items: [
            {
              label: c("PLAN", "계획"),
              title: c("One file, four branches", "파일 하나, 분기 네 개"),
              body: c(
                "The plan should name empty, non-whole, out-of-range, and accepted input.",
                "계획에 빈 입력, 정수가 아님, 범위 밖, 유효 입력이 보여야 합니다.",
              ),
            },
            {
              label: c("TEST 1", "테스트 1"),
              title: c("Empty input", "빈 입력"),
              body: c(
                'Expected before click: “Enter a value.”',
                '클릭 전 Expected: “Enter a value.”',
              ),
            },
            {
              label: c("TEST 2", "테스트 2"),
              title: c("Input 5", "입력 5"),
              body: c(
                'Expected before click: “Accepted: 5”.',
                '클릭 전 Expected: “Accepted: 5”.',
              ),
            },
            {
              label: c("SAVE", "저장"),
              title: c("Verify day2-base.html", "day2-base.html 검증"),
              body: c("Open the copy and repeat both tests.", "복사본을 열어 두 테스트를 반복합니다."),
            },
          ],
          takeaway: c(
            "A file copy becomes a Save Point only after the copy passes.",
            "파일 복사본은 그 복사본이 테스트를 통과해야 Save Point가 됩니다.",
          ),
          teacherNotes: [
            c(
              "Use one learner's plan anonymously. Ask the room to point to the four validation branches before allowing the build.",
              "학생 한 명의 계획을 익명으로 보여 준다. 제작을 허용하기 전에 네 검증 분기를 찾게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-project-studio",
      role: "build",
      slides: [
        slide({
          id: "day2-06-six-tests",
          stageId: "day2-project-studio",
          layout: "worked-example",
          minutes: 2,
          kicker: c("SIX TESTS · FOUR RULES", "여섯 테스트 · 네 규칙"),
          title: c(
            "Good tests cover categories and boundaries.",
            "좋은 테스트는 범주와 경계를 다룹니다.",
          ),
          items: [
            {
              label: c("EMPTY", "빈 입력"),
              title: c("empty", "빈칸"),
              body: c('Expected: “Enter a value.”', 'Expected: “Enter a value.”'),
            },
            {
              label: c("NOT WHOLE", "정수가 아님"),
              title: c("abc · 2.5", "abc · 2.5"),
              body: c('Expected: “Use a whole number.”', 'Expected: “Use a whole number.”'),
            },
            {
              label: c("OUTSIDE", "범위 밖"),
              title: c("0", "0"),
              body: c('Expected: “Use a number from 1 to 10.”', 'Expected: “Use a number from 1 to 10.”'),
            },
            {
              label: c("BOUNDARIES", "경계값"),
              title: c("1 · 10", "1 · 10"),
              body: c('Expected: “Accepted: 1” and “Accepted: 10”.', 'Expected: “Accepted: 1”, “Accepted: 10”.'),
            },
          ],
          takeaway: c(
            "The six inputs are not random. Each represents a rule or a boundary where code often fails.",
            "여섯 입력은 무작위가 아닙니다. 각각 규칙이나 코드가 자주 실패하는 경계값을 대표합니다.",
          ),
          teacherNotes: [
            c(
              "Require Expected for all six before learners run any of them. This prevents answer-key copying from the page output.",
              "학생이 실행하기 전에 여섯 Expected를 모두 쓰게 한다. 페이지 출력에서 답을 베끼는 것을 막는다.",
            ),
          ],
        }),
        slide({
          id: "day2-06-one-failure-at-a-time",
          stageId: "day2-project-studio",
          layout: "flow",
          minutes: 2,
          kicker: c("WHEN A TEST FAILS", "테스트가 실패하면"),
          title: c(
            "Do not repair the whole page. Isolate one gap.",
            "페이지 전체를 고치지 말고 차이 하나를 분리합니다.",
          ),
          items: [
            {
              label: c("1", "1"),
              title: c("Freeze the evidence", "증거 고정"),
              body: c("Write Action, Expected, Actual exactly.", "Action, Expected, Actual을 정확히 씁니다."),
            },
            {
              label: c("2", "2"),
              title: c("Fix only one failed category", "실패 범주 하나만 수정"),
              body: c("Name what must stay unchanged.", "유지할 것을 명시합니다."),
            },
            {
              label: c("3", "3"),
              title: c("Repeat the failure", "실패 테스트 반복"),
              body: c("Use the same input and same expected result.", "같은 입력과 같은 예상 결과를 사용합니다."),
            },
            {
              label: c("4", "4"),
              title: c("Run one old pass", "기존 통과 하나 재시험"),
              body: c("Catch regression before the next change.", "다음 변경 전에 회귀를 찾습니다."),
            },
          ],
          takeaway: c(
            "One change keeps the evidence and repair scope close enough to judge.",
            "한 번에 하나만 바꾸면 증거와 수정 범위를 판정할 수 있을 만큼 가깝게 둡니다.",
          ),
          teacherNotes: [
            c(
              "If several tests fail, have learners number them and start with the first rule in program order rather than sending a combined fix.",
              "여러 테스트가 실패하면 번호를 붙이고 통합 수정 대신 프로그램 순서상 첫 규칙부터 다루게 한다.",
            ),
          ],
        }),
        slide({
          id: "day2-06-handoff-clear-regression",
          stageId: "day2-project-studio",
          layout: "demo",
          minutes: 1,
          kicker: c("FRESH SESSION · CONTROLLED CHANGE", "새 대화 · 통제된 변경"),
          title: c(
            "The Clear button is new. The four validation rules are not.",
            "Clear 버튼은 새 기능이지만 네 검증 규칙은 그대로입니다.",
          ),
          lead: c(
            "Use the Context Handoff in a new session, then compare the result with day2-offline-context-after.html.",
            "새 대화에 Context Handoff를 사용한 뒤 결과를 day2-offline-context-after.html과 비교합니다.",
          ),
          items: [
            {
              label: c("NEW TEST", "새 테스트"),
              title: c("Clear after a result", "결과가 나온 뒤 Clear"),
              body: c(
                "The input and result become empty, and focus returns to Number.",
                "입력과 결과가 비고 초점이 Number로 돌아옵니다.",
              ),
              tone: "good",
            },
            {
              label: c("REGRESSION", "회귀 테스트"),
              title: c("All old categories", "기존 모든 범주"),
              body: c(
                "Empty, abc, 2.5, 0, 1, and 10 still produce their exact messages.",
                "빈칸, abc, 2.5, 0, 1, 10이 여전히 정확한 문구를 냅니다.",
              ),
            },
            {
              label: c("FINAL SAVE", "최종 저장"),
              title: c("day2-final-save.html", "day2-final-save.html"),
              body: c(
                "Open the copy and repeat Clear plus one boundary test.",
                "복사본을 열어 Clear와 경계값 테스트 하나를 반복합니다.",
              ),
            },
          ],
          takeaway: c(
            "A new feature is complete only when the new promise and old promises both pass.",
            "새 기능은 새 약속과 기존 약속이 모두 통과해야 완료입니다.",
          ),
          teacherNotes: [
            c(
              "Demonstrate a deliberately weak handoff first: 'Add Clear.' Ask what could regress. Then use the complete handoff and compare.",
              "먼저 ‘Clear 추가’라는 약한 인계로 무엇이 깨질 수 있는지 묻는다. 그다음 완전한 인계를 사용해 비교한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day2-compare-exit",
      role: "share",
      slides: [
        slide({
          id: "day2-07-exit-evidence",
          stageId: "day2-compare-exit",
          layout: "summary",
          minutes: 4,
          kicker: c("DAY 2 · RETRIEVAL EXIT", "2일차 · 회수 마무리"),
          title: c(
            "Turn a wish into an instruction; turn a failure into evidence.",
            "바람을 지시로, 실패를 증거로 바꿉니다.",
          ),
          items: [
            {
              label: c("REQUEST", "요청"),
              title: c("Seven-part Prompt Frame", "일곱 요소 Prompt Frame"),
              body: c(
                "Goal · Context · Feature · Rules · Constraints · Do not change · Success means",
                "Goal · Context · Feature · Rules · Constraints · Do not change · Success means",
              ),
            },
            {
              label: c("DEBUG", "디버깅"),
              title: c("Action · Expected · Actual", "Action · Expected · Actual"),
              body: c(
                "Reproduce one gap, fix only that gap, and run a regression test.",
                "차이 하나를 재현하고 그것만 고친 뒤 회귀 테스트를 합니다.",
              ),
            },
            {
              label: c("HANDOFF", "인계"),
              title: c("Current truth, not old noise", "오래된 잡음이 아니라 현재 사실"),
              body: c(
                "Name the file, tested facts, evidence, next change, protected behavior, and success.",
                "파일, 검증된 사실, 증거, 다음 변경, 보호할 동작, 성공조건을 말합니다.",
              ),
            },
          ],
          takeaway: c(
            "Tomorrow you will use these controls to turn your own observation into a small project.",
            "내일은 이 통제 방법을 사용해 자신의 관찰을 작은 프로젝트로 바꿉니다.",
          ),
          teacherNotes: [
            c(
              "Have partners inspect one A–E–A record. The listener must be able to repeat the action and predict the result.",
              "짝끼리 A–E–A 기록 하나를 확인하게 한다. 듣는 학생이 행동을 반복하고 결과를 예측할 수 있어야 한다.",
            ),
            c(
              "Collect one sentence for each prompt: 'My clearest boundary was…' and 'My most useful failure evidence was…'.",
              "‘가장 명확한 경계는…’, ‘가장 쓸모 있던 실패 증거는…’에 각각 한 문장을 받는다.",
            ),
          ],
        }),
      ],
    },
  ],
};
