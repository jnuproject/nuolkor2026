import { copy as c, type DayCourseware, type TeachingSlide } from "./types";

function slide(value: TeachingSlide): TeachingSlide {
  return value;
}

export const day5Courseware: DayCourseware = {
  day: 5,
  essentialQuestion: c(
    "What evidence proves that another person can use the project safely and correctly?",
    "다른 사람이 프로젝트를 안전하고 올바르게 사용할 수 있다는 것을 어떤 증거로 증명할까?",
  ),
  stages: [
    {
      stageId: "day5-test-strategy",
      role: "learn",
      slides: [
        slide({
          id: "day5-00-evidence-question",
          stageId: "day5-test-strategy",
          layout: "question",
          minutes: 1,
          kicker: c("DAY 5 · FROM CLAIM TO EVIDENCE", "5일차 · 주장부터 증거까지"),
          title: c(
            "AI says, “Everything works.” What do we know?",
            "AI가 ‘모두 작동합니다’라고 말했습니다. 우리가 실제로 아는 것은 무엇일까요?",
          ),
          question: {
            prompt: c("Choose the strongest statement.", "가장 강한 문장을 고르세요."),
            options: [
              c("The project is finished.", "프로젝트가 완성되었다."),
              c("AI made a claim that still needs a test.", "AI가 아직 테스트가 필요한 주장을 했다."),
              c("The code has no bugs.", "코드에는 버그가 없다."),
            ],
            answer: c(
              "AI made a claim that still needs a test.",
              "AI가 아직 테스트가 필요한 주장을 했습니다.",
            ),
            explanation: c(
              "A test records a repeatable action, a result predicted in advance, and what a person actually observes.",
              "테스트는 반복 가능한 행동, 미리 정한 예상 결과, 사람이 실제로 관찰한 결과를 기록합니다.",
            ),
          },
          takeaway: c(
            "A confident sentence is not a test result.",
            "확신에 찬 문장은 테스트 결과가 아닙니다.",
          ),
          teacherNotes: [
            c(
              "Take a vote before revealing the answer. Ask what new information a browser test would add.",
              "정답을 공개하기 전에 투표한다. 브라우저 테스트가 어떤 새로운 정보를 더하는지 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day5-00-test-record",
          stageId: "day5-test-strategy",
          layout: "concept",
          minutes: 2,
          kicker: c("CORE MODEL · TEST RECORD", "핵심 모델 · 테스트 기록"),
          title: c(
            "Write Expected before Actual.",
            "Actual보다 Expected를 먼저 씁니다.",
          ),
          items: [
            {
              label: c("ACTION / INPUT", "행동 / 입력"),
              title: c("Make it repeatable", "반복 가능하게 쓰기"),
              body: c(
                "“Type 4 and click Check the number.”",
                "‘4를 입력하고 Check the number를 누른다.’",
              ),
            },
            {
              label: c("EXPECTED", "예상"),
              title: c("Commit before seeing", "실행 전에 약속"),
              body: c(
                "“The page shows Result: 8.”",
                "‘페이지에 Result: 8이 나타난다.’",
              ),
            },
            {
              label: c("ACTUAL", "실제"),
              title: c("Copy the observation", "관찰 결과 그대로 기록"),
              body: c(
                "Write what appeared, even when it is surprising.",
                "예상 밖이어도 실제로 나타난 것을 그대로 씁니다.",
              ),
            },
            {
              label: c("RESULT", "판정"),
              title: c("Compare, do not guess", "추측하지 말고 비교"),
              body: c(
                "PASS only when Expected and Actual match.",
                "Expected와 Actual이 같을 때만 PASS입니다.",
              ),
            },
          ],
          takeaway: c(
            "Writing Expected first prevents the result from rewriting the requirement.",
            "Expected를 먼저 쓰면 실제 결과에 맞춰 요구사항을 바꾸는 일을 막을 수 있습니다.",
          ),
          teacherNotes: [
            c(
              "Cover the Actual column. Have learners predict the result for input 4 before opening either lab file.",
              "Actual 열을 가린다. 어느 실습 파일도 열기 전에 입력 4의 결과를 먼저 예측하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day5-00-lab-demo",
          stageId: "day5-test-strategy",
          layout: "demo",
          minutes: 3,
          kicker: c("CENTRAL EXPERIMENT · TWO LAB FILES", "핵심 실험 · 두 개의 실습 파일"),
          title: c(
            "Same interface. Different evidence.",
            "같아 보이는 화면, 다른 테스트 증거.",
          ),
          lead: c(
            "Use `day5-test-lab-broken.html` for discovery and `day5-test-lab-working.html` as a reference after the class has collected evidence.",
            "먼저 `day5-test-lab-broken.html`에서 문제를 발견하고, 학급이 증거를 모은 뒤 `day5-test-lab-working.html`을 참고 작동본으로 사용합니다.",
          ),
          items: [
            {
              label: c("WORKED TEST", "풀이 테스트"),
              title: c("Input 4", "입력 4"),
              body: c(
                "Action: enter 4, click Check. Expected: Result: 8. Both files pass this HAPPY test.",
                "행동: 4 입력, Check 클릭. 예상: Result: 8. 두 파일 모두 이 HAPPY 테스트를 통과합니다.",
              ),
              tone: "good",
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("“Input 4 passed, so the form works.”", "‘입력 4가 통과했으니 폼은 작동한다.’"),
              body: c(
                "One passing example says nothing about empty, decimal, or out-of-range input.",
                "통과 사례 하나만으로는 빈 값, 소수, 범위 밖 입력을 알 수 없습니다.",
              ),
              tone: "danger",
            },
          ],
          question: {
            prompt: c(
              "Why must the working file stay hidden until predictions are written?",
              "예상 결과를 쓰기 전까지 작동 파일을 숨겨야 하는 이유는 무엇일까요?",
            ),
            answer: c(
              "Seeing the answer first turns testing into imitation instead of prediction and comparison.",
              "답을 먼저 보면 테스트가 예측과 비교가 아니라 모방이 되기 때문입니다.",
            ),
            explanation: c(
              "The learning comes from the gap between Expected and Actual in the broken file.",
              "학습은 고장 난 파일에서 Expected와 Actual의 차이를 발견하는 데서 일어납니다.",
            ),
          },
          takeaway: c(
            "A HAPPY pass is evidence for one path, not the whole product.",
            "HAPPY 통과는 한 경로의 증거이지 제품 전체의 증거가 아닙니다.",
          ),
          teacherNotes: [
            c(
              "Live demo only the HAPPY case in the broken lab. Do not reveal the working lab yet. Ask: “What have we proved, and what have we not proved?”",
              "고장 난 실습 파일에서 HAPPY 사례만 시연한다. 아직 작동 파일은 공개하지 않는다. ‘무엇을 증명했고 무엇은 증명하지 못했나?’라고 묻는다.",
            ),
            c(
              "Have learners create and open their Day 5 start copy before testing their own project.",
              "자기 프로젝트를 시험하기 전에 5일차 시작 복사본을 만들고 직접 열게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-write-test-cards",
      role: "learn",
      slides: [
        slide({
          id: "day5-01-four-doors",
          stageId: "day5-write-test-cards",
          layout: "concept",
          minutes: 1,
          kicker: c("CORE MODEL · FOUR TEST DOORS", "핵심 모델 · 네 개의 테스트 문"),
          title: c(
            "Start with HAPPY, then choose the risk tests that fit the feature.",
            "HAPPY로 시작하고, 그 기능에 맞는 위험 테스트를 고릅니다.",
          ),
          items: [
            {
              label: c("HAPPY", "HAPPY"),
              title: c("Does the intended path work?", "의도한 경로가 작동하는가?"),
              body: c("Use an ordinary allowed value.", "일반적인 허용 값을 사용합니다."),
            },
            {
              label: c("EMPTY", "EMPTY"),
              title: c("Does this feature require input?", "이 기능에 필수 입력이 있는가?"),
              body: c(
                "If yes, submit blank or spaces. If no input is required, write N/A and why.",
                "그렇다면 빈 값이나 공백을 제출합니다. 필수 입력이 없다면 N/A와 이유를 씁니다.",
              ),
            },
            {
              label: c("INVALID", "INVALID"),
              title: c("Does the feature reject a kind of value or action?", "거절해야 할 값이나 행동이 있는가?"),
              body: c(
                "Test one stated rule. If every available action is allowed, write N/A and the reason.",
                "명시된 규칙 하나를 시험합니다. 가능한 행동을 모두 허용한다면 N/A와 이유를 씁니다.",
              ),
            },
            {
              label: c("BOUNDARY", "BOUNDARY"),
              title: c("Does the promise have an edge?", "약속에 경계가 있는가?"),
              body: c(
                "Test at and just beyond a stated limit. If no limit exists, write N/A and why.",
                "명시된 한계와 바로 바깥을 시험합니다. 한계가 없다면 N/A와 이유를 씁니다.",
              ),
            },
          ],
          takeaway: c(
            "HAPPY is required. EMPTY, INVALID, and BOUNDARY are used only when the feature has that condition.",
            "HAPPY는 필수입니다. EMPTY, INVALID, BOUNDARY는 기능에 해당 조건이 있을 때만 사용합니다.",
          ),
          teacherNotes: [
            c(
              "Use the number lab to distinguish the four risks, then ask for a non-input feature. Model `EMPTY: N/A — this feature has no required input` rather than inventing a form.",
              "숫자 실습으로 네 위험을 구분한 뒤 입력이 없는 기능도 제시한다. 억지로 폼을 만들지 말고 `EMPTY: N/A — 이 기능에는 필수 입력이 없음`을 시연한다.",
            ),
          ],
        }),
        slide({
          id: "day5-01-lab-cards",
          stageId: "day5-write-test-cards",
          layout: "worked-example",
          minutes: 2,
          kicker: c("WORKED EXAMPLE · PREDICT FIRST", "풀이 예시 · 먼저 예측하기"),
          title: c(
            "Four cards for this number lab—not a universal template",
            "이 숫자 실습의 네 카드—모든 프로젝트의 의무 양식은 아닙니다",
          ),
          items: [
            {
              label: c("HAPPY · 4", "HAPPY · 4"),
              title: c("Expected: `Result: 8`", "예상: `Result: 8`"),
              body: c("An ordinary allowed whole number.", "일반적인 허용 정수."),
              tone: "good",
            },
            {
              label: c("EMPTY · blank", "EMPTY · 빈 값"),
              title: c(
                "Expected: `Enter a number before you continue.`",
                "예상: `Enter a number before you continue.`",
              ),
              body: c("No required value was supplied.", "필수 값이 입력되지 않음."),
            },
            {
              label: c("INVALID · 2.5", "INVALID · 2.5"),
              title: c(
                "Expected: `Use a whole number.`",
                "예상: `Use a whole number.`",
              ),
              body: c("A number, but not the allowed kind.", "숫자이지만 허용된 종류가 아님."),
            },
            {
              label: c("BOUNDARY · 10 / 11", "BOUNDARY · 10 / 11"),
              title: c(
                "Expected: `Result: 20` / range message",
                "예상: `Result: 20` / 범위 안내",
              ),
              body: c("The upper edge and one step beyond it.", "상한 경계와 바로 다음 값."),
            },
          ],
          takeaway: c(
            "A relevant card names the risk, exact action or input, and visible Expected result.",
            "해당되는 카드에는 위험, 정확한 행동 또는 입력, 눈에 보이는 Expected 결과가 들어갑니다.",
          ),
          teacherNotes: [
            c(
              "Do not run the cards yet. Check that every learner has written all four Expected results before the experiment.",
              "아직 카드를 실행하지 않는다. 실험 전에 모든 학생이 네 Expected 결과를 모두 썼는지 확인한다.",
            ),
          ],
        }),
        slide({
          id: "day5-01-type-counterexamples",
          stageId: "day5-write-test-cards",
          layout: "compare",
          minutes: 1,
          kicker: c("COMMON CONFUSIONS", "자주 생기는 혼동"),
          title: c(
            "A different value is not automatically a different test type.",
            "값이 다르다고 자동으로 다른 테스트 유형이 되는 것은 아닙니다.",
          ),
          items: [
            {
              label: c("GOOD BOUNDARY", "좋은 BOUNDARY"),
              title: c("1, 10, 0, 11", "1, 10, 0, 11"),
              body: c(
                "These values reveal the promised range and its immediate outside.",
                "약속한 범위와 그 바로 바깥을 드러내는 값입니다.",
              ),
              tone: "good",
            },
            {
              label: c("NOT A BOUNDARY", "BOUNDARY 아님"),
              title: c("4, 5, 6", "4, 5, 6"),
              body: c(
                "All are ordinary valid values; they repeat the HAPPY idea.",
                "모두 일반적인 허용 값이므로 HAPPY 사례를 반복할 뿐입니다.",
              ),
              tone: "warning",
            },
            {
              label: c("GOOD INVALID", "좋은 INVALID"),
              title: c("2.5 for a whole-number rule", "정수 규칙에 2.5 입력"),
              body: c(
                "The value violates the promised kind, even though JavaScript can multiply it.",
                "JavaScript가 곱셈은 할 수 있어도 약속한 값의 종류를 어깁니다.",
              ),
              tone: "good",
            },
            {
              label: c("VALID N/A", "근거 있는 N/A"),
              title: c("“EMPTY: N/A — no required input exists.”", "‘EMPTY: N/A — 필수 입력이 없음.’"),
              body: c(
                "The reason connects the omitted type to the actual feature. Do not invent an input only to fill a label.",
                "이유가 생략한 유형과 실제 기능을 연결합니다. 유형을 채우려고 입력 기능을 만들어 내지 않습니다.",
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "Test type describes the risk; Expected describes the product promise.",
            "테스트 유형은 위험을, Expected는 제품의 약속을 설명합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to classify spaces, `abc`, and 1 for the number lab, then show a button-only feature and ask which types are genuinely applicable.",
              "숫자 실습에서 공백, `abc`, 1을 분류한 뒤 버튼만 있는 기능을 보여 주고 실제로 어떤 유형이 해당되는지 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day5-01-broken-lab-retrieval",
          stageId: "day5-write-test-cards",
          layout: "demo",
          minutes: 2,
          kicker: c("EXPERIMENT · REVEAL ACTUAL", "실험 · ACTUAL 공개"),
          title: c(
            "Run the broken lab. Preserve every surprise.",
            "고장 난 실습 파일을 실행하고 예상 밖 결과를 모두 남깁니다.",
          ),
          code: c(
            `// broken lab
button.addEventListener("click", () => {
  const number = Number(input.value);
  result.textContent = \`Result: \${number * 2}\`;
});`,
            `// 고장 난 실습 파일
button.addEventListener("click", () => {
  const number = Number(input.value);
  result.textContent = \`Result: \${number * 2}\`;
});`,
          ),
          question: {
            prompt: c(
              "Predict the broken lab's Actual results for blank, 2.5, and 11.",
              "고장 난 실습 파일에서 빈 값, 2.5, 11의 Actual 결과를 예측하세요.",
            ),
            answer: c(
              "Blank → Result: 0; 2.5 → Result: 5; 11 → Result: 22.",
              "빈 값 → Result: 0, 2.5 → Result: 5, 11 → Result: 22.",
            ),
            explanation: c(
              "`Number(\"\")` becomes 0, and the code validates neither integer type nor the 1–10 range.",
              "`Number(\"\")`는 0이 되고, 이 코드는 정수 여부와 1–10 범위를 모두 검사하지 않습니다.",
            ),
          },
          takeaway: c(
            "A program can calculate correctly and still violate the product rule.",
            "프로그램이 계산은 정확히 해도 제품 규칙을 어길 수 있습니다.",
          ),
          teacherNotes: [
            c(
              "Live demo the three inputs in `day5-test-lab-broken.html`. After each click, pause and let learners write Actual before discussing why.",
              "`day5-test-lab-broken.html`에서 세 입력을 시연한다. 클릭할 때마다 멈추고, 이유를 논의하기 전에 학생이 Actual을 쓰게 한다.",
            ),
            c(
              "Do not open the working lab until all three mismatches are visible on the class evidence board.",
              "세 가지 불일치가 학급 증거판에 모두 보이기 전에는 작동 파일을 열지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-peer-test-rounds",
      role: "learn",
      slides: [
        slide({
          id: "day5-02-peer-question",
          stageId: "day5-peer-test-rounds",
          layout: "question",
          minutes: 1,
          kicker: c("THE MAKER'S PARADOX", "제작자의 역설"),
          title: c(
            "If the maker explains every step, did the interface pass?",
            "제작자가 모든 단계를 설명했다면 인터페이스가 통과한 걸까요?",
          ),
          question: {
            prompt: c(
              "A tester cannot find the submit button. The maker points to it. What evidence was lost?",
              "테스터가 제출 버튼을 찾지 못하자 제작자가 가리켜 줬습니다. 어떤 증거를 잃었을까요?",
            ),
            options: [
              c("Whether the tester could discover the action unaided", "테스터가 도움 없이 행동을 찾을 수 있었는지"),
              c("Whether the maker knows the app", "제작자가 앱을 아는지"),
              c("Whether the button has a blue color", "버튼이 파란색인지"),
            ],
            answer: c(
              "Whether the tester could discover the action unaided",
              "테스터가 도움 없이 행동을 찾을 수 있었는지",
            ),
            explanation: c(
              "Coaching changes the test conditions. Confusion is evidence about the interface, not a mistake to hide.",
              "설명으로 도와주면 테스트 조건이 바뀝니다. 혼란은 숨길 실수가 아니라 인터페이스에 대한 증거입니다.",
            ),
          },
          takeaway: c(
            "During a peer test, the maker watches instead of rescuing.",
            "짝 테스트에서 제작자는 도와주는 대신 관찰합니다.",
          ),
          teacherNotes: [
            c(
              "Use the first four minutes for the coached/uncoached contrast, the observation model, the tester/maker roles, and the safe-sample reminder.",
              "앞 4분에 설명으로 유도한 테스트와 유도하지 않은 테스트를 비교하고, 관찰 기록, 테스터·제작자 역할, 안전한 샘플 데이터 규칙을 안내한다.",
            ),
          ],
        }),
        slide({
          id: "day5-02-observation-interpretation",
          stageId: "day5-peer-test-rounds",
          layout: "compare",
          minutes: 2,
          kicker: c("CORE MODEL · OBSERVE FIRST", "핵심 모델 · 먼저 관찰"),
          title: c(
            "Record behavior before explaining its cause.",
            "원인을 해석하기 전에 행동부터 기록합니다.",
          ),
          items: [
            {
              label: c("OBSERVATION", "관찰"),
              title: c(
                "“The tester clicked Check twice after entering 2.5.”",
                "‘테스터가 2.5를 입력한 뒤 Check를 두 번 눌렀다.’",
              ),
              body: c(
                "Another person could watch and agree that this happened.",
                "다른 사람도 보고 같은 사실에 동의할 수 있습니다.",
              ),
              tone: "good",
            },
            {
              label: c("INTERPRETATION", "해석"),
              title: c("“The tester was confused.”", "‘테스터가 혼란스러워했다.’"),
              body: c(
                "Possible, but it needs the observed behavior and result underneath it.",
                "가능한 해석이지만 그 근거가 되는 행동과 결과가 필요합니다.",
              ),
              tone: "warning",
            },
            {
              label: c("OPINION", "취향"),
              title: c("“The visual style is not my preference.”", "‘시각 스타일이 내 취향은 아니다.’"),
              body: c(
                "It does not identify a blocked task or repeatable condition.",
                "막힌 과업이나 반복 가능한 조건을 알려 주지 못합니다.",
              ),
              tone: "danger",
            },
            {
              label: c("TEST EVIDENCE", "테스트 증거"),
              title: c(
                "“Input 2.5; expected whole-number message; actual Result: 5.”",
                "‘2.5 입력, 예상: 정수 안내, 실제: Result: 5.’",
              ),
              body: c(
                "Action, Expected, and Actual make the gap repeatable.",
                "Action, Expected, Actual이 차이를 재현 가능하게 만듭니다.",
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "Observation describes what happened; interpretation proposes why.",
            "관찰은 무슨 일이 있었는지, 해석은 왜 그랬는지를 말합니다.",
          ),
          teacherNotes: [
            c(
              "Read three statements aloud and have learners signal Observation or Interpretation. Ask them to rewrite one interpretation as observable evidence.",
              "세 문장을 읽고 학생이 Observation 또는 Interpretation 신호를 보내게 한다. 해석 하나를 관찰 가능한 증거로 다시 쓰게 한다.",
            ),
          ],
        }),
        slide({
          id: "day5-02-peer-demo",
          stageId: "day5-peer-test-rounds",
          layout: "demo",
          minutes: 1,
          kicker: c("DEMO · TESTER / MAKER PROTOCOL", "시연 · 테스터 / 제작자 규칙"),
          title: c(
            "The tester acts and thinks aloud. The maker records and stays silent.",
            "테스터는 행동하며 생각을 말하고, 제작자는 조용히 기록합니다.",
          ),
          items: [
            {
              label: c("TESTER", "테스터"),
              title: c("Read the card, then act", "카드를 읽고 행동"),
              body: c(
                "Use safe sample data. Say what you expect before the click.",
                "안전한 샘플 데이터를 사용하고 클릭 전에 예상 결과를 말합니다.",
              ),
            },
            {
              label: c("MAKER", "제작자"),
              title: c("Hands off", "손대지 않기"),
              body: c(
                "Record first action, pause, repeat, Expected, and Actual. Do not explain.",
                "첫 행동, 멈춤, 반복, Expected, Actual을 기록합니다. 설명하지 않습니다.",
              ),
            },
            {
              label: c("AFTER", "테스트 뒤"),
              title: c("Ask one neutral question", "중립 질문 하나"),
              body: c(
                "“What did you expect to happen there?”",
                "‘그때 무엇이 일어날 거라고 예상했나요?’",
              ),
            },
          ],
          question: {
            prompt: c(
              "The tester pauses for five seconds. What should the maker do?",
              "테스터가 5초 동안 멈췄습니다. 제작자는 무엇을 해야 할까요?",
            ),
            answer: c(
              "Record the pause and continue observing.",
              "멈춤을 기록하고 계속 관찰합니다.",
            ),
            explanation: c(
              "Pointing, explaining, or taking the mouse would erase evidence about discoverability.",
              "가리키거나 설명하거나 마우스를 가져오면 발견 가능성에 대한 증거가 사라집니다.",
            ),
          },
          takeaway: c(
            "Do not fix during the test; preserve the conditions that produced the evidence.",
            "테스트 중에는 고치지 말고 증거가 나온 조건을 그대로 보존합니다.",
          ),
          teacherNotes: [
            c(
              "After the four-minute briefing, run Round 1 for 12 minutes. Use two minutes to save notes and switch tester/maker roles and projects. Run Round 2 for 12 minutes. The maker stays silent until each action ends.",
              "4분 안내 뒤 첫 라운드를 12분 진행한다. 2분 동안 기록을 저장하고 테스터·제작자 역할과 프로젝트를 바꾼 뒤 둘째 라운드를 12분 진행한다. 제작자는 각 행동이 끝날 때까지 침묵한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-break",
      role: "break",
      slides: [
        slide({
          id: "day5-03-break",
          stageId: "day5-break",
          layout: "run",
          minutes: 10,
          kicker: c("BREAK · 10 MINUTES", "휴식 · 10분"),
          title: c("Stop testing. Do not start a fix.", "테스트를 멈추고 아직 수정하지 마세요."),
          lead: c(
            "Leave the evidence visible. We will sort it after the break.",
            "증거는 화면에 남겨 둡니다. 휴식 뒤에 분류합니다.",
          ),
          takeaway: c("Return at 01:10.", "01:10에 돌아옵니다."),
          teacherNotes: [
            c(
              "Do not teach during the break. Quietly scan for repeated blockers and any exposed private or secret data.",
              "휴식 중에는 강의하지 않는다. 반복된 차단 문제와 노출된 개인정보·비밀정보가 있는지만 조용히 확인한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-sort-problems",
      role: "learn",
      slides: [
        slide({
          id: "day5-04-priority-question",
          stageId: "day5-sort-problems",
          layout: "question",
          minutes: 1,
          kicker: c("EVIDENCE IS NOT YET A PLAN", "증거는 아직 수정 계획이 아님"),
          title: c(
            "Three issues, ten minutes. Which one goes first?",
            "문제 세 개, 시간은 10분. 무엇을 먼저 고칠까요?",
          ),
          question: {
            prompt: c(
              "Choose the highest priority in a number-input tool.",
              "숫자 입력 도구에서 가장 우선순위가 높은 문제를 고르세요.",
            ),
            options: [
              c("The button blue could be darker.", "버튼의 파란색을 더 진하게 할 수 있다."),
              c("Blank input produces `Result: 0`.", "빈 입력이 `Result: 0`을 만든다."),
              c("Add a history chart.", "기록 차트를 추가한다."),
            ],
            answer: c(
              "Blank input produces `Result: 0`.",
              "빈 입력이 `Result: 0`을 만듭니다.",
            ),
            explanation: c(
              "It gives a wrong result on a predictable path. The color is a possible polish item; the chart is a new feature.",
              "예측 가능한 경로에서 잘못된 결과를 냅니다. 색상은 다듬기 후보이고 차트는 새 기능입니다.",
            ),
          },
          takeaway: c(
            "Priority follows harm and blocked use, not excitement.",
            "우선순위는 흥미가 아니라 피해와 사용 차단 정도를 따릅니다.",
          ),
          teacherNotes: [
            c(
              "Ask what evidence would change the color issue into MUST FIX—for example, unreadable contrast that blocks use.",
              "색상 문제가 어떤 증거가 있을 때 MUST FIX가 되는지 묻는다. 예: 읽기 어려운 대비로 사용이 막히는 경우.",
            ),
          ],
        }),
        slide({
          id: "day5-04-priority-model",
          stageId: "day5-sort-problems",
          layout: "concept",
          minutes: 2,
          kicker: c("CORE MODEL · THREE BUCKETS", "핵심 모델 · 세 가지 분류"),
          title: c(
            "MUST FIX protects use and safety. SHOULD FIX removes friction. LATER protects scope.",
            "MUST FIX는 사용과 안전을 지키고, SHOULD FIX는 불편을 줄이며, LATER는 범위를 지킵니다.",
          ),
          items: [
            {
              label: c("MUST FIX", "MUST FIX"),
              title: c("Blocked, wrong, unsafe, or demo-breaking", "차단, 오답, 위험, 발표 방해"),
              body: c(
                "Example: input 11 is accepted although the stated range ends at 10.",
                "예: 허용 범위가 10까지인데 11이 받아들여짐.",
              ),
              tone: "danger",
            },
            {
              label: c("SHOULD FIX", "SHOULD FIX"),
              title: c("Hard, but a safe path remains", "어렵지만 안전한 우회 경로가 있음"),
              body: c(
                "Example: a button label is vague, but the tester can discover it after reading nearby text.",
                "예: 버튼 문구가 모호하지만 주변 안내를 읽으면 안전하게 찾을 수 있음.",
              ),
              tone: "warning",
            },
            {
              label: c("LATER", "LATER"),
              title: c("New feature or large redesign", "새 기능 또는 큰 재설계"),
              body: c(
                "Example: add charts, accounts, cloud sync, or a new theme.",
                "예: 차트, 계정, 클라우드 동기화, 새 테마 추가.",
              ),
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("“I dislike it” → MUST FIX", "‘마음에 안 든다’ → MUST FIX"),
              body: c(
                "Preference without a blocked action, wrong result, or safety consequence is not enough evidence.",
                "막힌 행동, 잘못된 결과, 안전 영향 없이 취향만으로는 충분한 증거가 아닙니다.",
              ),
              tone: "danger",
            },
          ],
          takeaway: c(
            "Limit the plan to three evidence-backed fixes.",
            "증거가 있는 수정 후보를 최대 세 개로 제한합니다.",
          ),
          teacherNotes: [
            c(
              "Make a visible parking lot named LATER. Moving an idea there protects it without allowing it to consume today's release time.",
              "LATER라는 보이는 보관 구역을 만든다. 아이디어를 버리지 않으면서 오늘의 출시 시간을 쓰지 않게 한다.",
            ),
          ],
        }),
        slide({
          id: "day5-04-sort-demo",
          stageId: "day5-sort-problems",
          layout: "demo",
          minutes: 2,
          kicker: c("WORKED EXAMPLE · FROM NOTE TO PRIORITY", "풀이 예시 · 메모에서 우선순위로"),
          title: c(
            "Rewrite the opinion until another person can reproduce it.",
            "다른 사람이 재현할 수 있을 때까지 의견을 다시 씁니다.",
          ),
          items: [
            {
              label: c("WEAK NOTE", "약한 메모"),
              title: c("“Validation is bad.”", "‘검증이 안 좋다.’"),
              body: c("No action, expected rule, or actual result.", "행동, 예상 규칙, 실제 결과가 없습니다."),
              tone: "danger",
            },
            {
              label: c("EVIDENCE", "증거"),
              title: c("Blank → wrong numeric result", "빈 값 → 잘못된 숫자 결과"),
              body: c(
                "When the tester leaves the input blank and clicks Check, the page shows Result: 0. Expected: ask for a number.",
                "테스터가 입력을 비우고 Check를 누르면 Result: 0이 보임. 예상: 숫자를 입력하라는 안내.",
              ),
              tone: "good",
            },
            {
              label: c("PRIORITY", "우선순위"),
              title: c("MUST FIX", "MUST FIX"),
              body: c(
                "A required-input path returns a false calculation, and the failure is repeatable.",
                "필수 입력 경로가 잘못된 계산 결과를 내며 실패를 반복할 수 있습니다.",
              ),
              tone: "good",
            },
          ],
          question: {
            prompt: c(
              "“Add a graph of previous results.” Bug or new feature? Which bucket?",
              "‘이전 결과 그래프 추가.’ 버그일까요, 새 기능일까요? 어느 분류일까요?",
            ),
            answer: c("New feature — LATER", "새 기능 — LATER"),
            explanation: c(
              "No existing promise or tested path failed. It may be valuable, but it is outside today's repair scope.",
              "기존 약속이나 테스트 경로가 실패한 것이 아닙니다. 가치가 있을 수 있지만 오늘 수정 범위 밖입니다.",
            ),
          },
          takeaway: c(
            "Observation → reproducible evidence → priority",
            "관찰 → 재현 가능한 증거 → 우선순위",
          ),
          teacherNotes: [
            c(
              "Live rewrite one learner's anonymized note. Preserve the learner's observation; do not invent a different product problem.",
              "익명 처리한 학생 메모 하나를 실시간으로 다시 쓴다. 학생의 관찰은 유지하고 다른 제품 문제를 만들어 내지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-safety-accessibility",
      role: "learn",
      slides: [
        slide({
          id: "day5-05-access-question",
          stageId: "day5-safety-accessibility",
          layout: "question",
          minutes: 1,
          kicker: c("CAN EVERY USER REACH THE PATH?", "모든 사용자가 그 경로에 도달할 수 있을까?"),
          title: c(
            "The result appears. Can a new user still identify the input?",
            "결과는 나타납니다. 처음 온 사용자가 입력창의 뜻도 알 수 있을까요?",
          ),
          question: {
            prompt: c(
              "Which observation can we reproduce in the supplied broken lab?",
              "제공된 고장 실습에서 어떤 관찰을 실제로 재현할 수 있을까요?",
            ),
            options: [
              c(
                "The input has no visible label connected to it.",
                "입력창에 연결된 보이는 라벨이 없다.",
              ),
              c(
                "Tab cannot reach the button.",
                "Tab으로 버튼에 도달할 수 없다.",
              ),
              c(
                "The button disappears in every narrow window.",
                "좁은 창에서는 언제나 버튼이 사라진다.",
              ),
            ],
            answer: c(
              "The input has no visible label connected to it.",
              "입력창에 연결된 보이는 라벨이 없습니다.",
            ),
            explanation: c(
              "The introductory sentence describes the task, but clicking it does not focus the input and it is not an explicit label-input pair. Tab does reach the controls, so record that check as a pass instead of inventing a failure.",
              "도입 문장은 과업을 설명하지만 눌러도 입력창으로 포커스가 이동하지 않고 명시적인 라벨-입력 쌍도 아닙니다. Tab은 조작 요소에 도달하므로 그 검사는 실패를 만들어 내지 말고 통과로 기록합니다.",
            ),
          },
          takeaway: c(
            "A path is not working for a person who cannot perceive or operate it.",
            "사용자가 경로를 인식하거나 조작할 수 없다면 그 사람에게는 작동하는 경로가 아닙니다.",
          ),
          teacherNotes: [
            c(
              "Run three reproducible checks in the broken lab: click the instruction text and see whether the input receives focus; Tab through input and button while naming the current focus; resize the window to about 320px and check for horizontal scrolling. Record pass or fail for each—do not claim the browser's default focus is missing.",
              "고장 실습에서 세 가지를 재현한다. 안내 문구를 눌러 입력창에 포커스가 가는지, Tab으로 입력창과 버튼을 이동하며 현재 포커스를 말할 수 있는지, 창을 약 320px로 줄였을 때 가로 스크롤이 생기는지 확인한다. 각 검사는 통과 또는 실패로 기록하고 브라우저 기본 포커스가 없다고 단정하지 않는다.",
            ),
          ],
        }),
        slide({
          id: "day5-05-quick-access-model",
          stageId: "day5-safety-accessibility",
          layout: "concept",
          minutes: 2,
          kicker: c("CORE MODEL · QUICK ACCESS CHECK", "핵심 모델 · 빠른 접근 점검"),
          title: c(
            "Perceive, understand, operate, and receive feedback.",
            "인식하고, 이해하고, 조작하고, 피드백을 받습니다.",
          ),
          items: [
            {
              label: c("PERCEIVE", "인식"),
              title: c("Readable text and visible focus", "읽을 수 있는 글과 보이는 포커스"),
              body: c(
                "Text has enough contrast and focus does not disappear.",
                "글의 대비가 충분하고 포커스가 사라지지 않습니다.",
              ),
            },
            {
              label: c("UNDERSTAND", "이해"),
              title: c("Labels name the input and action", "라벨이 입력과 행동을 설명"),
              body: c(
                "A visible label says “Whole number from 1 to 10”; the button says “Check the number.”",
                "보이는 라벨은 ‘1부터 10까지 정수’, 버튼은 ‘숫자 확인’처럼 말합니다.",
              ),
            },
            {
              label: c("OPERATE", "조작"),
              title: c("Keyboard reaches the main controls", "키보드로 주요 조작 요소에 도달"),
              body: c(
                "Tab order follows the task, and Enter or Space activates the button.",
                "Tab 순서가 과업을 따르고 Enter 또는 Space로 버튼을 실행합니다.",
              ),
            },
            {
              label: c("FEEDBACK", "피드백"),
              title: c("The result stays near the action", "결과가 행동 가까이에 유지됨"),
              body: c(
                "The result is visible after the action. If a screen reader is available, test whether the update is announced.",
                "행동 뒤 결과가 화면에 보입니다. 스크린 리더를 사용할 수 있다면 갱신 내용이 전달되는지도 시험합니다.",
              ),
            },
          ],
          takeaway: c(
            "This is a fast barrier check, not a complete accessibility certification.",
            "이것은 명백한 장벽을 찾는 빠른 점검이지 완전한 접근성 인증은 아닙니다.",
          ),
          teacherNotes: [
            c(
              "State the limit clearly. The goal is to catch obvious barriers before release, not to claim full compliance.",
              "한계를 분명히 말한다. 목표는 출시 전 명백한 장벽을 찾는 것이지 완전한 준수를 선언하는 것이 아니다.",
            ),
          ],
        }),
        slide({
          id: "day5-05-access-code-demo",
          stageId: "day5-safety-accessibility",
          layout: "demo",
          minutes: 2,
          kicker: c("WORKED EXAMPLE · BROKEN TO WORKING", "풀이 예시 · 고장 상태에서 작동 상태로"),
          title: c(
            "The working lab adds relationships and feedback, not decoration.",
            "작동 실습 파일은 장식이 아니라 관계와 피드백을 추가합니다.",
          ),
          code: c(
            `<!-- working lab -->
<label for="number-input">Whole number from 1 to 10</label>
<input id="number-input" inputmode="numeric" autocomplete="off">
<button id="check-button" type="button">Check the number</button>
<p id="result" aria-live="polite">The result will appear here.</p>

<style>
  input:focus-visible,
  button:focus-visible {
    outline: 4px solid #f4b740;
    outline-offset: 3px;
  }
</style>`,
            `<!-- 작동 실습 파일 -->
<label for="number-input">1부터 10까지의 정수</label>
<input id="number-input" inputmode="numeric" autocomplete="off">
<button id="check-button" type="button">숫자 확인</button>
<p id="result" aria-live="polite">결과가 여기에 나타납니다.</p>

<style>
  input:focus-visible,
  button:focus-visible {
    outline: 4px solid #f4b740;
    outline-offset: 3px;
  }
</style>`,
          ),
          items: [
            {
              label: c("WORKED CHANGE", "맞는 변경"),
              title: c("`label for` matches the input `id`", "`label for`와 input `id` 연결"),
              body: c(
                "The visible instruction and input become an explicit pair.",
                "보이는 안내와 입력창이 명시적인 한 쌍이 됩니다.",
              ),
              tone: "good",
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("Placeholder only", "placeholder만 사용"),
              body: c(
                "The instruction disappears while typing and may not provide an equivalent accessible name.",
                "입력하는 동안 안내가 사라지고 동등한 접근 가능한 이름을 주지 못할 수 있습니다.",
              ),
              tone: "danger",
            },
          ],
          takeaway: c(
            "Record what each check proves; an attribute alone is not proof of the user experience.",
            "각 검사가 무엇을 증명하는지 기록합니다. 속성 하나만으로 사용자 경험이 증명되지는 않습니다.",
          ),
          teacherNotes: [
            c(
              "Compare the supplied labs side by side. Click the working label to move focus to the input, Tab through both files and record the actual order and visible focus, then resize both to about 320px and inspect overflow. Treat `aria-live` as a code-review observation unless a screen reader is available to verify the announcement.",
              "두 실습 파일을 나란히 비교한다. 작동 파일의 라벨을 눌러 입력창으로 포커스를 이동하고, 두 파일을 Tab으로 이동하며 실제 순서와 보이는 포커스를 기록한 뒤, 두 창을 약 320px로 줄여 넘침을 확인한다. 스크린 리더로 전달을 검증할 수 없다면 `aria-live`는 코드 검토 관찰로만 기록한다.",
            ),
          ],
        }),
        slide({
          id: "day5-05-safety-retrieval",
          stageId: "day5-safety-accessibility",
          layout: "question",
          minutes: 1,
          kicker: c("RETRIEVE · RELEASE BARRIER", "회수 질문 · 출시 장벽"),
          title: c(
            "A demo works, but an API key is visible in the file.",
            "데모는 작동하지만 파일에 API 키가 보입니다.",
          ),
          question: {
            prompt: c(
              "What is the correct priority and first response?",
              "올바른 우선순위와 첫 대응은 무엇일까요?",
            ),
            options: [
              c("SHOULD FIX; improve it after the presentation.", "SHOULD FIX; 발표 뒤 개선한다."),
              c(
                "MUST FIX; stop sharing and remove or rotate the exposed secret.",
                "MUST FIX; 공유를 멈추고 노출된 비밀정보를 제거하거나 교체한다.",
              ),
              c("LATER; the feature still works.", "LATER; 기능은 작동한다."),
            ],
            answer: c(
              "MUST FIX; stop sharing and secure the exposed secret.",
              "MUST FIX; 공유를 멈추고 노출된 비밀정보를 안전하게 처리합니다.",
            ),
            explanation: c(
              "Safety overrides feature success. A working path with exposed credentials is not a releasable path.",
              "안전은 기능 성공보다 우선합니다. 인증정보가 노출된 작동 경로는 출시 가능한 경로가 아닙니다.",
            ),
          },
          takeaway: c(
            "No secret, private data, payment, or sign-in flow belongs in this classroom prototype.",
            "이 수업의 프로토타입에는 비밀정보, 개인정보, 결제, 로그인 흐름을 넣지 않습니다.",
          ),
          teacherNotes: [
            c(
              "Do not ask a learner to display the secret again. Stop screen sharing, isolate the file, and follow the institution's credential-rotation procedure.",
              "학생에게 비밀정보를 다시 화면에 띄우라고 하지 않는다. 화면 공유를 중단하고 파일을 격리한 뒤 기관의 인증정보 교체 절차를 따른다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-approve-fix-plan",
      role: "learn",
      slides: [
        slide({
          id: "day5-06-fix-question",
          stageId: "day5-approve-fix-plan",
          layout: "question",
          minutes: 1,
          kicker: c("ONE PROBLEM PER FIX", "수정 한 번에 문제 하나"),
          title: c(
            "Three failing tests do not justify one giant request.",
            "실패 테스트가 세 개라고 거대한 요청 하나가 정당화되지는 않습니다.",
          ),
          question: {
            prompt: c(
              "Which request is easier to verify and recover?",
              "어느 요청이 검증과 복구가 더 쉬울까요?",
            ),
            options: [
              c(
                "“Fix validation, redesign the form, and improve everything.”",
                "‘검증을 고치고 폼을 다시 디자인하고 전부 개선해 줘.’",
              ),
              c(
                "“For blank input only, show the required-number message. Keep valid-number behavior unchanged.”",
                "‘빈 입력일 때만 숫자 입력 안내를 보여 줘. 유효한 숫자 동작은 그대로 유지해.’",
              ),
            ],
            answer: c("The second request", "두 번째 요청"),
            explanation: c(
              "It names one failed condition, one visible success result, and one regression promise.",
              "실패 조건 하나, 눈에 보이는 성공 결과 하나, 회귀 약속 하나를 말합니다.",
            ),
          },
          takeaway: c(
            "One observed gap becomes one reviewed READY fix.",
            "관찰한 차이 하나가 검수된 READY 수정 하나가 됩니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to circle the failure condition, success result, and keep-working clause in the narrow request.",
              "작은 요청에서 실패 조건, 성공 결과, 유지 조건을 각각 표시하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day5-06-fix-anatomy",
          stageId: "day5-approve-fix-plan",
          layout: "concept",
          minutes: 1,
          kicker: c("CORE MODEL · FIX CONTRACT", "핵심 모델 · 수정 계약"),
          title: c(
            "A fix plan connects evidence to a bounded change.",
            "수정 계획은 증거를 범위가 정해진 변경에 연결합니다.",
          ),
          items: [
            {
              label: c("PROBLEM", "문제"),
              title: c("Name the failed condition", "실패 조건 말하기"),
              body: c("Blank input is accepted as zero.", "빈 입력을 0으로 받아들임."),
            },
            {
              label: c("EVIDENCE", "증거"),
              title: c("Action, Expected, Actual", "Action, Expected, Actual"),
              body: c("Make the failure repeatable.", "실패를 반복 가능하게 만듭니다."),
            },
            {
              label: c("PRIORITY + SCOPE", "우선순위 + 범위"),
              title: c("MUST FIX, with no new feature", "MUST FIX이며 새 기능 없음"),
              body: c(
                "The plan addresses one release-relevant problem without expanding the project.",
                "프로젝트 범위를 넓히지 않고 출시와 관련된 문제 하나를 다룹니다.",
              ),
            },
            {
              label: c("SMALL FIX", "작은 수정"),
              title: c("One validation branch", "검증 분기 하나"),
              body: c("Handle blank before converting to Number.", "Number로 바꾸기 전에 빈 값을 처리합니다."),
            },
            {
              label: c("SUCCESS + REGRESSION", "성공 + 회귀"),
              title: c("Two tests after the edit", "수정 뒤 테스트 두 개"),
              body: c("Blank shows a message; input 4 still shows Result: 8.", "빈 값은 안내를 보이고, 입력 4는 계속 Result: 8을 보입니다."),
            },
          ],
          takeaway: c(
            "Self-check the contract; a peer repeats it. Matching checks become READY, and a mismatch becomes Yellow.",
            "수정 계약을 자가검수하고 짝이 반복합니다. 두 검수가 일치하면 READY, 다르면 Yellow입니다.",
          ),
          teacherNotes: [
            c(
              "Learners self-check the fix contract, then a partner repeats the same five criteria. Matching checks become READY without a teacher queue. A mismatch or help request becomes Yellow, and the teacher reviews only that item without rewriting the project choice.",
              "학생이 수정 계약을 자가검수한 뒤 짝이 같은 다섯 기준으로 다시 검수한다. 두 검수가 일치하면 강사 줄 없이 READY가 된다. 불일치나 도움 요청은 Yellow로 표시하고, 강사는 프로젝트 선택을 대신 쓰지 않고 그 항목만 확인한다.",
            ),
          ],
        }),
        slide({
          id: "day5-06-validation-demo",
          stageId: "day5-approve-fix-plan",
          layout: "demo",
          minutes: 2,
          kicker: c("WORKED EXAMPLE · FIRST GUARD", "풀이 예시 · 첫 번째 보호 조건"),
          title: c(
            "Check the raw input before converting it.",
            "값을 변환하기 전에 원래 입력을 확인합니다.",
          ),
          code: c(
            `const rawValue = input.value.trim();

if (rawValue === "") {
  result.textContent = "Enter a number before you continue.";
  return;
}

const number = Number(rawValue);`,
            `const rawValue = input.value.trim();

if (rawValue === "") {
  result.textContent = "숫자를 먼저 입력하세요.";
  return;
}

const number = Number(rawValue);`,
          ),
          items: [
            {
              label: c("WORKED FIX", "맞는 수정"),
              title: c("Guard then return", "검사 후 종료"),
              body: c(
                "The invalid path stops before calculation; valid input continues.",
                "잘못된 경로는 계산 전에 멈추고 유효한 입력은 계속 진행합니다.",
              ),
              tone: "good",
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("Change the initial result text only", "초기 결과 문구만 변경"),
              body: c(
                "The page may look clearer before the click, but blank input still becomes Result: 0.",
                "클릭 전 화면은 더 명확해 보여도 빈 입력은 여전히 Result: 0이 됩니다.",
              ),
              tone: "danger",
            },
          ],
          question: {
            prompt: c(
              "After this fix, which two exact inputs should be run immediately?",
              "이 수정 뒤 어떤 두 입력을 즉시 실행해야 할까요?",
            ),
            answer: c(
              "Blank for the failed test, then 4 for the HAPPY regression.",
              "실패 테스트인 빈 값, 이어서 HAPPY 회귀 테스트인 4.",
            ),
            explanation: c(
              "The guard must repair the target without blocking a valid calculation.",
              "보호 조건은 목표 문제를 고치면서 유효한 계산은 막지 않아야 합니다.",
            ),
          },
          takeaway: c(
            "Fix → failed test → HAPPY regression",
            "수정 → 실패했던 테스트 → HAPPY 회귀 테스트",
          ),
          teacherNotes: [
            c(
              "Live edit a disposable copy of the broken lab. Run blank and 4 in that order. Keep the original broken file unchanged for comparison.",
              "고장 난 실습 파일의 별도 복사본을 실시간 수정한다. 빈 값과 4를 그 순서로 실행한다. 비교를 위해 원본 고장 파일은 그대로 둔다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-project-studio",
      role: "build",
      slides: [
        slide({
          id: "day5-07-studio-loop",
          stageId: "day5-project-studio",
          layout: "studio",
          minutes: 2,
          kicker: c("STUDIO · EVIDENCE-LED REPAIR", "스튜디오 · 증거로 이끄는 수정"),
          title: c(
            "Fix one reviewed READY problem, then close the loop.",
            "검수한 READY 문제 하나를 고친 뒤 루프를 닫습니다.",
          ),
          items: [
            {
              label: c("1 · REPRODUCE", "1 · 재현"),
              title: c("Run the failed card again", "실패 카드를 다시 실행"),
              body: c(
                "Confirm the recorded Actual still happens before editing.",
                "수정 전에 기록한 Actual이 여전히 나타나는지 확인합니다.",
              ),
            },
            {
              label: c("2 · FIX ONE", "2 · 하나만 수정"),
              title: c("Use a reviewed bounded plan", "검수한 범위 제한 계획 사용"),
              body: c(
                "Reject new features, files, libraries, login, APIs, and unrelated redesign.",
                "새 기능, 파일, 라이브러리, 로그인, API, 관련 없는 재설계를 거절합니다.",
              ),
            },
            {
              label: c("3 · RETEST", "3 · 재테스트"),
              title: c("Failed path + HAPPY path", "실패 경로 + HAPPY 경로"),
              body: c(
                "Write Actual for both. A claim from AI cannot fill this column.",
                "둘 다 Actual을 씁니다. AI의 주장은 이 열을 채울 수 없습니다.",
              ),
            },
            {
              label: c("4 · SAVE", "4 · 저장"),
              title: c("Only after both pass", "둘 다 통과한 뒤에만"),
              body: c(
                "Protect the working state before choosing another problem.",
                "다음 문제를 고르기 전에 작동 상태를 보호합니다.",
              ),
            },
          ],
          takeaway: c(
            "CHECK → FIX → CHECK → SAVE, one problem at a time.",
            "CHECK → FIX → CHECK → SAVE, 한 번에 문제 하나씩.",
          ),
          teacherNotes: [
            c(
              "At the 30-minute mark, stop new fix requests for learners without one completed failed-test and HAPPY-test pair.",
              "30분 시점에 실패 테스트와 HAPPY 테스트 한 쌍을 완료하지 못한 학생은 새 수정 요청을 중단시킨다.",
            ),
          ],
        }),
        slide({
          id: "day5-07-regression-lab",
          stageId: "day5-project-studio",
          layout: "worked-example",
          minutes: 2,
          kicker: c("REGRESSION BOARD · THE LAB", "회귀 증거판 · 실습 파일"),
          title: c(
            "Three fixes create a growing test set.",
            "수정 세 번은 점점 커지는 테스트 묶음을 만듭니다.",
          ),
          items: [
            {
              label: c("FIX 1 · EMPTY", "수정 1 · EMPTY"),
              title: c("Blank shows the required message", "빈 값에 필수 입력 안내"),
              body: c(
                "Regression: 4 still produces Result: 8.",
                "회귀: 4는 계속 Result: 8을 만듭니다.",
              ),
            },
            {
              label: c("FIX 2 · INVALID", "수정 2 · INVALID"),
              title: c("2.5 shows the whole-number message", "2.5에 정수 안내"),
              body: c(
                "Regressions: blank message and input 4 both still pass.",
                "회귀: 빈 값 안내와 입력 4가 모두 계속 통과합니다.",
              ),
            },
            {
              label: c("FIX 3 · BOUNDARY", "수정 3 · BOUNDARY"),
              title: c("11 shows the 1–10 range message", "11에 1–10 범위 안내"),
              body: c(
                "Regressions: blank, 2.5, 4, and 10 are run again.",
                "회귀: 빈 값, 2.5, 4, 10을 다시 실행합니다.",
              ),
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("Only run the newest test", "가장 새 테스트만 실행"),
              body: c(
                "A later validation branch can shadow or change an earlier path.",
                "나중에 추가한 검증 분기가 앞선 경로를 가리거나 바꿀 수 있습니다.",
              ),
              tone: "danger",
            },
          ],
          question: {
            prompt: c(
              "After Fix 3, input 11 passes but blank now shows `Use a number from 1 to 10.` Is the release ready?",
              "수정 3 뒤 11은 통과하지만 빈 값이 `Use a number from 1 to 10.`을 보입니다. 출시 준비가 되었을까요?",
            ),
            answer: c("No — EMPTY regressed.", "아니요 — EMPTY가 회귀했습니다."),
            explanation: c(
              "The page displays a message, but it is not the promised message for the missing-input condition.",
              "안내는 보이지만 입력 누락 조건에 약속한 안내가 아닙니다.",
            ),
          },
          takeaway: c(
            "Regression grows from the promises you have already verified.",
            "회귀 테스트는 이미 검증한 약속이 쌓이면서 자랍니다.",
          ),
          teacherNotes: [
            c(
              "Keep the four lab cards visible as a model test suite. Learners adapt the structure to their own features; they do not copy the number inputs blindly.",
              "네 실습 카드를 모범 테스트 묶음으로 계속 보이게 둔다. 학생은 구조를 자기 기능에 맞추되 숫자 입력을 그대로 베끼지는 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day5-backup-demo",
      role: "share",
      slides: [
        slide({
          id: "day5-08-release-question",
          stageId: "day5-backup-demo",
          layout: "question",
          minutes: 1,
          kicker: c("RELEASE CANDIDATE", "출시 후보"),
          title: c(
            "The active project passes. Is the copied release candidate ready?",
            "활성 프로젝트가 통과했습니다. 복사한 출시 후보도 준비된 걸까요?",
          ),
          question: {
            prompt: c("What evidence is still missing?", "어떤 증거가 아직 빠졌을까요?"),
            options: [
              c(
                "Open the copy itself and repeat the smoke test.",
                "복사본 자체를 열고 스모크 테스트를 반복한다.",
              ),
              c("Ask AI whether the copy is correct.", "AI에게 복사본이 맞는지 묻는다."),
              c("Rename the folder `final-final`.", "폴더 이름을 `final-final`로 바꾼다."),
            ],
            answer: c(
              "Open the copy itself and repeat the smoke test.",
              "복사본 자체를 열고 스모크 테스트를 반복합니다.",
            ),
            explanation: c(
              "Copying can omit assets, point to the wrong path, or preserve an older file. Only the copied artifact can prove itself.",
              "복사 과정에서 파일이 빠지거나 경로가 틀리거나 오래된 파일이 남을 수 있습니다. 복사된 결과물은 그 자체를 실행해야 증명됩니다.",
            ),
          },
          takeaway: c(
            "A release candidate is a tested artifact, not a filename.",
            "출시 후보는 파일명이 아니라 테스트한 결과물입니다.",
          ),
          teacherNotes: [
            c(
              "Minutes 0–5: run and record the five-item smoke test in the active project. Require the browser path or opened folder before the run begins.",
              "0–5분: 활성 프로젝트에서 다섯 항목 스모크 테스트를 실행하고 기록한다. 시작 전에 브라우저 경로나 연 폴더를 확인하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day5-08-smoke-demo",
          stageId: "day5-backup-demo",
          layout: "demo",
          minutes: 1,
          kicker: c("WORKED EXAMPLE · FINAL SMOKE PATH", "풀이 예시 · 최종 스모크 경로"),
          title: c(
            "Open → act → refresh → repeat → inspect",
            "열기 → 행동 → 새로고침 → 반복 → 점검",
          ),
          items: [
            {
              label: c("OPEN", "열기"),
              title: c("First screen appears", "첫 화면 표시"),
              body: c(
                "Open `day5-release-candidate.html` or the copied release folder.",
                "`day5-release-candidate.html` 또는 복사한 출시 폴더를 엽니다.",
              ),
            },
            {
              label: c("ACT", "행동"),
              title: c("Run the main HAPPY path", "핵심 HAPPY 경로 실행"),
              body: c(
                "For the lab: enter 4, click Check the number, observe Result: 8.",
                "실습 파일: 4 입력, Check the number 클릭, Result: 8 관찰.",
              ),
            },
            {
              label: c("REFRESH + REPEAT", "새로고침 + 반복"),
              title: c("Prove the path starts cleanly", "경로가 다시 시작되는지 증명"),
              body: c(
                "Refresh, then run the same path again.",
                "새로고침한 뒤 같은 경로를 다시 실행합니다.",
              ),
            },
            {
              label: c("INSPECT", "점검"),
              title: c("No release blocker", "출시 차단 문제 없음"),
              body: c(
                "No secret or private data, blocking error, missing asset, or hidden control.",
                "비밀정보·개인정보, 차단 오류, 빠진 파일, 숨은 조작 요소가 없어야 합니다.",
              ),
            },
          ],
          takeaway: c(
            "The demo path is the shortest repeatable proof of the project's main promise.",
            "데모 경로는 프로젝트의 핵심 약속을 증명하는 가장 짧고 반복 가능한 경로입니다.",
          ),
          teacherNotes: [
            c(
              "Minutes 5–10: make the release-candidate copy, open that copy, and repeat the smoke path there. Deliberately point out the path before the copied run.",
              "5–10분: 출시 후보 복사본을 만들고 그 복사본을 연 뒤 스모크 경로를 반복한다. 복사본 실행 전에 경로를 명확히 가리킨다.",
            ),
          ],
        }),
        slide({
          id: "day5-08-exit-retrieval",
          stageId: "day5-backup-demo",
          layout: "summary",
          minutes: 1,
          kicker: c("DAY 5 · RELEASE DECISION", "5일차 · 출시 판단"),
          title: c(
            "Freeze evidence, not perfection.",
            "완벽함이 아니라 증거를 고정합니다.",
          ),
          items: [
            {
              label: c("TEST SET", "테스트 묶음"),
              title: c("HAPPY plus relevant risks", "HAPPY와 해당되는 위험"),
              body: c(
                "Use EMPTY, INVALID, and BOUNDARY when applicable; otherwise record N/A with a reason.",
                "EMPTY, INVALID, BOUNDARY는 해당될 때 사용하고, 아니면 이유와 함께 N/A를 기록합니다.",
              ),
            },
            {
              label: c("QUALITY", "품질"),
              title: c("Use and access", "사용과 접근"),
              body: c(
                "A peer can discover, operate, and perceive the main result.",
                "짝이 도움 없이 핵심 결과를 찾고, 조작하고, 인식할 수 있습니다.",
              ),
            },
            {
              label: c("SAFETY", "안전"),
              title: c("No release blocker", "출시 차단 문제 없음"),
              body: c(
                "No exposed secret, private data, unsafe claim, payment, or sign-in.",
                "노출된 비밀정보, 개인정보, 위험한 주장, 결제, 로그인이 없습니다.",
              ),
            },
            {
              label: c("ARTIFACT", "결과물"),
              title: c("Verified release candidate", "검증된 출시 후보"),
              body: c(
                "The copied file or folder opens and passes the exact demo path.",
                "복사한 파일 또는 폴더가 열리고 정확한 데모 경로를 통과합니다.",
              ),
            },
          ],
          question: {
            prompt: c(
              "A newer build has one demo-blocking failure; an older verified candidate passes. Which goes to Day 6?",
              "더 최신 빌드에는 발표 차단 오류가 하나 있고, 이전 검증 후보는 통과합니다. 6일차에는 무엇을 가져갈까요?",
            ),
            answer: c(
              "The older verified release candidate",
              "이전의 검증된 출시 후보",
            ),
            explanation: c(
              "Release readiness is determined by repeatable evidence, not recency or feature count.",
              "출시 준비 여부는 최신성이나 기능 수가 아니라 반복 가능한 증거로 판단합니다.",
            ),
          },
          takeaway: c(
            "Tomorrow: open the verified candidate, run the exact path, and explain what you learned from the evidence.",
            "내일은 검증된 후보를 열고 정확한 경로를 실행하며 증거에서 무엇을 배웠는지 설명합니다.",
          ),
          teacherNotes: [
            c(
              "Minutes 10–15: end new work, write the exact four-line demo path—Open, Click or enter, Show, Stop—and confirm the candidate path is saved.",
              "10–15분: 새 작업을 종료하고 Open, Click or enter, Show, Stop 네 줄의 정확한 데모 경로를 쓴 뒤 후보 경로가 저장되었는지 확인한다.",
            ),
          ],
        }),
      ],
    },
  ],
};
