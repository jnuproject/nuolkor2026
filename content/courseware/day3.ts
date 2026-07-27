import { copy as c, type DayCourseware, type TeachingSlide } from "./types";

function slide(value: TeachingSlide): TeachingSlide {
  return value;
}

export const day3Courseware: DayCourseware = {
  day: 3,
  essentialQuestion: c(
    "How can your own observation become a small, testable project?",
    "나의 관찰을 어떻게 작고 테스트 가능한 프로젝트로 바꿀까?",
  ),
  stages: [
    {
      stageId: "day3-review-ownership",
      role: "preflight",
      slides: [
        slide({
          id: "day3-00-ownership-run",
          stageId: "day3-review-ownership",
          layout: "run",
          minutes: 3,
          kicker: c("RETRIEVAL · OWNERSHIP GATE", "회상 · 주도권 관문"),
          title: c(
            "Today the topic belongs to you.",
            "오늘부터 프로젝트 주제는 여러분의 것입니다.",
          ),
          lead: c(
            "Keep AI chat and my-app closed. First retrieve the build loop and state the decisions that no tool may make for you.",
            "AI 대화와 my-app은 닫아 둡니다. 먼저 빌드 루프를 떠올리고 어떤 도구도 대신할 수 없는 결정을 말합니다.",
          ),
          items: [
            {
              label: c("RECALL", "회상"),
              title: c("TELL → WATCH → CHECK → FIX → SAVE", "TELL → WATCH → CHECK → FIX → SAVE"),
              body: c(
                "Say one human action for each move.",
                "각 동작에서 사람이 하는 일을 하나씩 말합니다.",
              ),
            },
            {
              label: c("YOU DECIDE", "내가 결정"),
              title: c("Observation, user, problem, success, scope", "관찰, 사용자, 문제, 성공, 범위"),
              body: c(
                "AI may question a plan. It does not choose the direction.",
                "AI는 계획에 질문할 수 있지만 방향을 대신 고르지 않습니다.",
              ),
            },
            {
              label: c("BOUNDARY", "경계"),
              title: c("No topic list and no private data", "주제 목록과 개인정보 없음"),
              body: c(
                "Your direction starts from your own experience, described without identifying a real person.",
                "실제 사람을 식별하지 않는 방식으로 자신의 경험에서 방향을 찾습니다.",
              ),
            },
          ],
          takeaway: c(
            "Ownership begins before code: it begins with choosing what deserves to exist.",
            "주도권은 코드보다 먼저, 무엇을 만들 가치가 있는지 결정하는 데서 시작합니다.",
          ),
          teacherNotes: [
            c(
              "Hide the loop for one minute. Accept short English, a brief Lao note interpreted by a peer or facilitator, a sketch, or a gesture; assess the decision, not language fluency.",
              "1분 동안 루프를 가린다. 짧은 영어, 동료나 통역이 옮기는 짧은 라오어 메모, 그림, 몸짓을 허용하고 언어 유창성이 아니라 결정을 확인한다.",
            ),
            c(
              "This is an operational retrieval gate. Do not open a list of possible projects.",
              "이 구간은 운영용 회상 관문이다. 가능한 프로젝트 목록을 열어 보여 주지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-free-topic-exploration",
      role: "learn",
      slides: [
        slide({
          id: "day3-01-observation-question",
          stageId: "day3-free-topic-exploration",
          layout: "question",
          minutes: 2,
          kicker: c("START BEFORE THE SOLUTION", "해결책보다 먼저"),
          title: c(
            "Which sentence is an observation?",
            "어떤 문장이 관찰일까?",
          ),
          question: {
            prompt: c(
              "An observation describes a situation you noticed before choosing a feature.",
              "관찰은 기능을 고르기 전에 내가 알아차린 상황을 설명합니다.",
            ),
            options: [
              c("A. “When this happens, I usually add a second confirmation button.”", "A. “이런 일이 생기면 보통 두 번째 확인 버튼을 추가한다.”"),
              c("B. “In this situation, people repeat the same check because the result is easy to miss.”", "B. “이 상황에서는 결과를 놓치기 쉬워 같은 확인을 반복한다.”"),
              c("C. “People probably want a faster app because the current one feels inconvenient.”", "C. “현재 앱이 불편하게 느껴지므로 사람들은 아마 더 빠른 앱을 원할 것이다.”"),
            ],
            answer: c("B", "B"),
            explanation: c(
              "B names a situation and a difficulty without deciding the interface. It leaves room to investigate the real need.",
              "B는 화면을 미리 정하지 않고 상황과 어려움을 말합니다. 실제 필요를 더 살펴볼 여지를 남깁니다.",
            ),
          },
          takeaway: c(
            "Observation describes what happens; a feature proposes what to build.",
            "관찰은 무엇이 일어나는지, 기능은 무엇을 만들지 말합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to point to the feature word in A. Then ask what evidence would be needed to know whether three buttons help.",
              "A에서 기능을 나타내는 말을 찾게 한다. 버튼 세 개가 도움이 되는지 알려면 어떤 증거가 필요한지 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day3-01-demo-only-observation",
          stageId: "day3-free-topic-exploration",
          layout: "worked-example",
          minutes: 3,
          kicker: c("DEMONSTRATION ONLY · CLOSED CASE", "시연 전용 · 선택할 수 없는 사례"),
          title: c(
            "One neutral case will show the full reasoning chain.",
            "중립 사례 하나로 전체 사고 과정을 끝까지 봅니다.",
          ),
          lead: c(
            "This case exists only for the teacher demonstration. Learners may not select or copy it as their project topic.",
            "이 사례는 강사 시연에만 사용합니다. 학생은 이 사례를 프로젝트 주제로 선택하거나 복사하지 않습니다.",
          ),
          items: [
            {
              label: c("FICTIONAL SITUATION", "가상 상황"),
              title: c("A practice participant checks one sample item", "연습 참가자가 샘플 항목 하나를 확인함"),
              body: c(
                "No real person, class record, or private information is involved.",
                "실제 사람, 수업 기록, 개인정보는 전혀 사용하지 않습니다.",
              ),
            },
            {
              label: c("OBSERVATION", "관찰"),
              title: c("“Did my click work?”", "“내가 누른 게 적용됐나?”"),
              body: c(
                "After looking away, the participant cannot tell whether the sample check was recorded.",
                "잠깐 다른 곳을 본 뒤 샘플 확인이 기록됐는지 알 수 없습니다.",
              ),
              tone: "warning",
            },
            {
              label: c("NOT YET", "아직 아님"),
              title: c("No button, color, or layout decision", "버튼·색·배치 결정 없음"),
              body: c(
                "The observation names the uncertainty, not the interface.",
                "관찰은 화면이 아니라 불확실성을 말합니다.",
              ),
            },
          ],
          takeaway: c(
            "A useful observation is specific enough to remember and open enough to investigate.",
            "좋은 관찰은 기억할 만큼 구체적이고, 더 조사할 만큼 열려 있습니다.",
          ),
          teacherNotes: [
            c(
              "Keep a visible DEMONSTRATION ONLY label on every slide that uses this case.",
              "이 사례가 나오는 모든 화면에 ‘시연 전용’ 표시를 계속 유지한다.",
            ),
            c(
              "Do not add a second example. The purpose is to model reasoning without creating a topic menu.",
              "두 번째 사례를 추가하지 않는다. 주제 메뉴를 만들지 않고 사고 과정을 시연하는 것이 목적이다.",
            ),
          ],
        }),
        slide({
          id: "day3-01-observation-counterexample",
          stageId: "day3-free-topic-exploration",
          layout: "question",
          minutes: 3,
          kicker: c("COUNTEREXAMPLE · RETRIEVAL", "반례 · 회수 질문"),
          title: c(
            "“People need a better app” hides the observation.",
            "“사람들에게 더 좋은 앱이 필요하다”는 관찰을 숨깁니다.",
          ),
          question: {
            prompt: c("Which rewrite restores the missing evidence?", "어떤 문장이 빠진 증거를 되살릴까요?"),
            options: [
              c("A. “The app should look modern.”", "A. “앱이 현대적으로 보여야 한다.”"),
              c("B. “In [situation], I noticed [what happened], which made [what] difficult.”", "B. “[상황]에서 [일어난 일]을 보았고, 그 때문에 [무엇]이 어려웠다.”"),
              c("C. “Use AI to find an idea.”", "C. “AI로 아이디어를 찾는다.”"),
            ],
            answer: c("B", "B"),
            explanation: c(
              "The frame asks for a remembered situation, an observable event, and a difficulty. It does not insert a solution.",
              "이 틀은 기억한 상황, 관찰한 사건, 어려움을 요구합니다. 해결책을 끼워 넣지 않습니다.",
            ),
          },
          takeaway: c(
            "Write three observations first; choose a direction only after comparing them.",
            "관찰 세 개를 먼저 쓰고, 비교한 뒤에만 방향 하나를 고릅니다.",
          ),
          teacherNotes: [
            c(
              "Give learners quiet individual time. If someone is stuck, ask only: 'What situation do you remember?' and 'What was difficult, slow, or unclear?'",
              "개별로 조용히 쓰게 한다. 막힌 학생에게는 ‘어떤 상황이 기억나나요?’, ‘무엇이 어렵거나 느리거나 불분명했나요?’만 묻는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-user-problem-success",
      role: "learn",
      slides: [
        slide({
          id: "day3-02-ups-question",
          stageId: "day3-user-problem-success",
          layout: "question",
          minutes: 2,
          kicker: c("THREE CONNECTED DECISIONS", "연결된 세 결정"),
          title: c(
            "A feature is not yet a problem statement.",
            "기능은 아직 문제 정의가 아닙니다.",
          ),
          question: {
            prompt: c(
              'Which sentence explains a problem rather than a feature?',
              "어떤 문장이 기능이 아니라 문제를 설명할까요?",
            ),
            options: [
              c("A. “The page needs a Mark checked button.”", "A. “페이지에 Mark checked 버튼이 필요하다.”"),
              c("B. “The participant cannot tell whether the sample check was recorded.”", "B. “참가자가 샘플 확인이 기록됐는지 알 수 없다.”"),
              c("C. “Use blue for the checked state.”", "C. “확인 상태에는 파란색을 쓴다.”"),
            ],
            answer: c("B", "B"),
            explanation: c(
              "B can remain true even if the final solution is not a button. It names the user's difficulty.",
              "B는 최종 해결책이 버튼이 아니어도 성립합니다. 사용자의 어려움을 말하기 때문입니다.",
            ),
          },
          takeaway: c(
            "User and problem describe the world before your project changes it.",
            "사용자와 문제는 프로젝트가 세상을 바꾸기 전의 상태를 설명합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to cover the words button and blue. If the sentence loses all meaning, it was probably a feature statement.",
              "button과 blue를 가리게 한다. 문장이 의미를 잃으면 기능 문장일 가능성이 크다고 설명한다.",
            ),
          ],
        }),
        slide({
          id: "day3-02-ups-model",
          stageId: "day3-user-problem-success",
          layout: "flow",
          minutes: 2,
          kicker: c("CORE MODEL · USER → PROBLEM → SUCCESS", "핵심 모델 · 사용자 → 문제 → 성공"),
          title: c(
            "Each sentence constrains the next one.",
            "앞 문장이 다음 문장의 범위를 정합니다.",
          ),
          items: [
            {
              label: c("USER", "사용자"),
              title: c("One role or group", "역할 또는 집단 하나"),
              body: c(
                "Describe who acts. Do not name a real person.",
                "누가 행동하는지 씁니다. 실제 사람 이름은 쓰지 않습니다.",
              ),
            },
            {
              label: c("PROBLEM", "문제"),
              title: c("One current difficulty", "현재 어려움 하나"),
              body: c(
                "What is difficult, slow, uncertain, or easy to miss?",
                "무엇이 어렵거나 느리거나 불확실하거나 놓치기 쉬운가?",
              ),
            },
            {
              label: c("SUCCESS", "성공"),
              title: c("One observable change", "관찰 가능한 변화 하나"),
              body: c(
                "What can the user do, and what can we see afterward?",
                "사용자가 무엇을 하고, 그 뒤 무엇을 볼 수 있는가?",
              ),
            },
          ],
          takeaway: c(
            "Success is not “the user likes it.” Success is an action with an observable result.",
            "성공은 ‘사용자가 좋아한다’가 아니라 행동과 관찰 가능한 결과입니다.",
          ),
          teacherNotes: [
            c(
              "Draw arrows and test the logic aloud: this user has this problem, therefore this visible result would count as improvement.",
              "화살표를 그리고 소리 내어 논리를 확인한다. 이 사용자가 이 문제를 겪으므로 이 보이는 결과가 개선의 증거가 된다.",
            ),
          ],
        }),
        slide({
          id: "day3-02-ups-worked-case",
          stageId: "day3-user-problem-success",
          layout: "worked-example",
          minutes: 2,
          kicker: c("DEMONSTRATION ONLY · WORKED CHAIN", "시연 전용 · 완성된 연결"),
          title: c(
            "The same observation becomes a testable promise.",
            "같은 관찰이 테스트 가능한 약속으로 바뀝니다.",
          ),
          items: [
            {
              label: c("OBSERVATION", "관찰"),
              title: c("The result is easy to miss", "결과를 놓치기 쉬움"),
              body: c(
                "A fictional practice participant asks whether one sample check was recorded.",
                "가상 연습 참가자가 샘플 확인 하나가 기록됐는지 묻습니다.",
              ),
            },
            {
              label: c("USER", "사용자"),
              title: c("A participant in this fictional practice", "이 가상 연습의 참가자"),
              body: c(
                "A role, not a person's name or identifier.",
                "사람의 이름이나 식별정보가 아니라 역할입니다.",
              ),
            },
            {
              label: c("PROBLEM", "문제"),
              title: c("Cannot see whether the check was recorded", "확인 기록 여부를 볼 수 없음"),
              body: c(
                "The uncertainty remains after the action.",
                "행동 뒤에도 불확실성이 남습니다.",
              ),
            },
            {
              label: c("SUCCESS", "성공"),
              title: c("Action plus visible result", "행동과 보이는 결과"),
              body: c(
                'When the user clicks “Mark checked,” the status changes from “Not checked” to “Checked.”',
                '사용자가 “Mark checked”를 누르면 상태가 “Not checked”에서 “Checked”로 바뀝니다.',
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "The success sentence already contains the first browser test.",
            "성공 문장 안에 이미 첫 브라우저 테스트가 들어 있습니다.",
          ),
          teacherNotes: [
            c(
              "Keep the case labeled demonstration-only. Point to the action and result inside the Success line; do not discuss design yet.",
              "시연 전용 표시를 유지한다. Success 문장 속 행동과 결과를 짚고 아직 디자인은 논의하지 않는다.",
            ),
          ],
        }),
        slide({
          id: "day3-02-ups-counterexample",
          stageId: "day3-user-problem-success",
          layout: "question",
          minutes: 2,
          kicker: c("COUNTEREXAMPLE · CONNECTION CHECK", "반례 · 연결 확인"),
          title: c(
            "Three clear sentences can still describe three different projects.",
            "세 문장이 각각 명확해도 서로 다른 프로젝트를 말할 수 있습니다.",
          ),
          lead: c(
            "User: a participant. Problem: cannot tell whether a check was recorded. Success: a confirmation animation appears for one second, then the old status remains.",
            "User: 참가자. Problem: 확인 기록 여부를 알 수 없음. Success: 확인 애니메이션이 1초 나타난 뒤 이전 상태 문구가 그대로 남음.",
          ),
          question: {
            prompt: c("What is wrong?", "무엇이 문제일까요?"),
            options: [
              c("The Success result does not resolve the stated Problem", "Success 결과가 앞의 Problem을 해결하지 않는다"),
              c("The Problem should name the planned button", "Problem에 만들 버튼 이름이 들어가야 한다"),
              c("The Success line is too specific for a brief", "Success 문장이 Brief에 쓰기에는 너무 구체적이다"),
            ],
            answer: c("The Success result does not resolve the stated Problem", "Success 결과가 앞의 Problem을 해결하지 않는다"),
            explanation: c(
              "Clarity is not enough. User, Problem, and Success must form one causal chain.",
              "각 문장이 분명한 것만으로는 부족합니다. User, Problem, Success가 하나의 인과 관계로 이어져야 합니다.",
            ),
          },
          takeaway: c(
            "Read the three lines as one sentence joined by because and therefore.",
            "세 줄을 ‘왜냐하면’과 ‘그러므로’로 이어 한 문장처럼 읽습니다.",
          ),
          teacherNotes: [
            c(
              "Retrieval prompt: hide the labels and ask learners which line names who, which names the current difficulty, and which contains the future test.",
              "회수 질문: 라벨을 가리고 누가 사용자, 현재 어려움, 미래 테스트를 말하는지 찾게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-must-nice",
      role: "learn",
      slides: [
        slide({
          id: "day3-03-priority-question",
          stageId: "day3-must-nice",
          layout: "question",
          minutes: 2,
          kicker: c("PRIORITY IS A DECISION", "우선순위는 결정입니다"),
          title: c(
            "If everything is MUST, what can you safely postpone?",
            "모든 것이 MUST라면 무엇을 안전하게 미룰 수 있을까?",
          ),
          question: {
            prompt: c("Which definition protects a small first build?", "어떤 정의가 작은 첫 제작을 보호할까요?"),
            options: [
              c("MUST = every feature a user might expect in a first release", "MUST = 사용자가 첫 버전에서 기대할 수 있는 모든 기능"),
              c("MUST = needed for the promise; NICE = useful later", "MUST = 약속에 필요; NICE = 나중에 유용"),
              c("NICE = a useful extra we can include whenever AI can build it quickly", "NICE = AI가 빨리 만들 수 있으면 언제든 포함할 유용한 추가 기능"),
            ],
            answer: c("The second option", "두 번째 선택지"),
            explanation: c(
              "Priority is not a rating of how exciting an idea is. It decides what must exist for the promise to be true.",
              "우선순위는 아이디어가 얼마나 흥미로운지 매기는 점수가 아닙니다. 약속이 참이 되려면 무엇이 필요한지 정합니다.",
            ),
          },
          takeaway: c(
            "MUST protects the promise. NICE protects the future from being forgotten.",
            "MUST는 현재 약속을, NICE는 미래 아이디어를 잊지 않도록 보호합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners why writing a NICE list can reduce scope rather than increase it: the idea is stored, so it does not need to enter today's build.",
              "NICE 목록이 왜 범위를 늘리지 않고 줄일 수 있는지 묻는다. 아이디어를 보관했으므로 오늘 만들 필요가 없어진다.",
            ),
          ],
        }),
        slide({
          id: "day3-03-priority-worked",
          stageId: "day3-must-nice",
          layout: "worked-example",
          minutes: 3,
          kicker: c("DEMONSTRATION ONLY · SCOPE", "시연 전용 · 범위"),
          title: c(
            "This project needs two MUSTs and one NICE; v0 proves only MUST 1.",
            "이 프로젝트에는 MUST 두 개와 NICE 한 개가 필요하지만 v0는 MUST 1만 증명합니다.",
          ),
          items: [
            {
              label: c("MUST 1 · v0", "MUST 1 · v0"),
              title: c("Mark the sample as checked", "샘플을 확인 완료로 표시"),
              body: c(
                'Click “Mark checked” → status becomes “Checked.”',
                '“Mark checked” 클릭 → 상태가 “Checked”로 바뀜.',
              ),
              tone: "good",
            },
            {
              label: c("MUST 2 · LATER", "MUST 2 · 이후"),
              title: c("Reset the sample", "샘플 초기화"),
              body: c(
                'Click “Reset” → status returns to “Not checked.”',
                '“Reset” 클릭 → 상태가 “Not checked”로 돌아감.',
              ),
            },
            {
              label: c("NICE 1 · OUT", "NICE 1 · 제외"),
              title: c("Show a history", "기록 표시"),
              body: c(
                "Useful later, but not needed for the project promise.",
                "나중에는 유용하지만 프로젝트의 약속에는 필요하지 않습니다.",
              ),
            },
            {
              label: c("OPTIONAL SLOTS · BLANK", "선택 항목 · 빈칸"),
              title: c("No MUST 3 or NICE 2 is needed", "MUST 3과 NICE 2는 필요 없음"),
              body: c(
                "A blank optional slot is a valid scope decision; do not invent a feature to fill it.",
                "선택 항목을 비워 두는 것도 올바른 범위 결정입니다. 칸을 채우려고 기능을 만들지 않습니다.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "A Brief may have one to three MUSTs and zero to two NICEs. Today v0 follows only MUST 1: one action → one visible result; accessibility remains a constraint.",
            "Brief에는 MUST를 한 개에서 세 개, NICE를 0개에서 두 개까지 둘 수 있습니다. 오늘 v0는 MUST 1의 행동 하나 → 보이는 결과 하나만 따르며 접근성은 계속 지켜야 할 제약입니다.",
          ),
          teacherNotes: [
            c(
              "In this example, cross out MUST 2 and NICE 1 in the v0 column. Keep the unused MUST 3 and NICE 2 slots blank so learners see that optional slots do not need filler.",
              "이 예시에서는 v0 열의 MUST 2와 NICE 1에 선을 긋는다. 사용하지 않는 MUST 3과 NICE 2는 빈칸으로 두어 선택 항목을 억지로 채울 필요가 없음을 보여 준다.",
            ),
          ],
        }),
        slide({
          id: "day3-03-scope-counterexample",
          stageId: "day3-must-nice",
          layout: "question",
          minutes: 2,
          kicker: c("COUNTEREXAMPLE · SCOPE GATE", "반례 · 범위 관문"),
          title: c(
            "“Build every MUST quickly” is not a smaller v0.",
            "“모든 MUST를 빨리 만들자”는 작은 v0가 아닙니다.",
          ),
          question: {
            prompt: c("Which plan passes today's scope gate?", "어떤 계획이 오늘의 범위 관문을 통과할까요?"),
            options: [
              c("A. One action, one visible result, only MUST 1", "A. 행동 하나, 보이는 결과 하나, MUST 1만"),
              c("B. Finish MUST 1 and also start Reset if the plan is short", "B. MUST 1을 끝내고 계획이 짧으면 Reset도 시작"),
              c("C. Put every MUST in one file so the scope looks smaller", "C. 범위가 작아 보이도록 모든 MUST를 파일 하나에 넣기"),
            ],
            answer: c("A", "A"),
            explanation: c(
              "A creates one complete vertical path that can be tested today. B creates several incomplete paths; C gives away the decision.",
              "A는 오늘 테스트할 수 있는 완결된 경로 하나를 만듭니다. B는 불완전한 여러 경로를 만들고, C는 결정을 넘깁니다.",
            ),
          },
          takeaway: c(
            "Small is not fewer words on the plan; small is fewer behaviors in the build.",
            "작다는 것은 계획 문장이 적다는 뜻이 아니라 제작할 동작이 적다는 뜻입니다.",
          ),
          teacherNotes: [
            c(
              "Retrieval prompt: learners hold up one finger for v0 and say the action and result in one sentence.",
              "회수 질문: 학생이 손가락 하나를 들고 자신의 v0 행동과 결과를 한 문장으로 말하게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-break",
      role: "break",
      slides: [
        slide({
          id: "day3-break",
          stageId: "day3-break",
          layout: "run",
          minutes: 10,
          kicker: c("BREAK · 10 MINUTES", "휴식 · 10분"),
          title: c("Keep the plan. Close the build tools.", "계획은 남기고 제작 도구는 닫습니다."),
          lead: c(
            "Return with your User–Problem–Success and MUST/NICE decisions. No v0 is READY yet.",
            "User–Problem–Success와 MUST/NICE 결정을 준비한 상태로 돌아오세요. 아직 어떤 v0도 READY 상태가 아닙니다.",
          ),
          teacherNotes: [
            c(
              "Check that my-app and AI chat remain closed. Prepare the paper wireframe area.",
              "my-app과 AI 대화가 닫혀 있는지 확인하고 종이 와이어프레임 영역을 준비한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-wireframe-brief",
      role: "learn",
      slides: [
        slide({
          id: "day3-04-state-question",
          stageId: "day3-wireframe-brief",
          layout: "question",
          minutes: 2,
          kicker: c("DESIGN BEHAVIOR, NOT DECORATION", "장식이 아니라 동작 설계"),
          title: c(
            "A screen is incomplete if it shows only one moment.",
            "한 순간만 보여 주는 화면은 설계가 덜 됐습니다.",
          ),
          question: {
            prompt: c(
              "The success statement says a result changes after an action. What must the wireframe show?",
              "성공 문장은 행동 뒤 결과가 바뀐다고 합니다. 와이어프레임은 무엇을 보여 줘야 할까요?",
            ),
            options: [
              c("Only the final beautiful screen", "예쁜 최종 화면만"),
              c("The state before the action and the state after it", "행동 전 상태와 행동 후 상태"),
              c("A list of possible colors", "가능한 색 목록"),
            ],
            answer: c("The state before and the state after", "행동 전 상태와 행동 후 상태"),
            explanation: c(
              "The user needs a path, not a poster. Two states make the change visible and testable.",
              "사용자에게 필요한 것은 포스터가 아니라 경로입니다. 두 상태가 있어야 변화가 보이고 테스트할 수 있습니다.",
            ),
          },
          takeaway: c(
            "A state is what the interface shows at one meaningful moment.",
            "상태는 의미 있는 한 순간에 화면이 보여 주는 모습입니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to draw a vertical line down the paper: BEFORE on the left, AFTER on the right.",
              "종이에 세로선을 긋고 왼쪽은 BEFORE, 오른쪽은 AFTER로 두게 한다.",
            ),
          ],
        }),
        slide({
          id: "day3-04-state-worked",
          stageId: "day3-wireframe-brief",
          layout: "worked-example",
          minutes: 2,
          kicker: c("DEMONSTRATION ONLY · TWO STATES", "시연 전용 · 두 상태"),
          title: c(
            "The demonstration case needs only two v0 states.",
            "시연 사례의 v0에는 상태 두 개만 필요합니다.",
          ),
          items: [
            {
              label: c("STATE A · BEFORE", "상태 A · 전"),
              title: c("Not checked", "Not checked"),
              body: c(
                'Visible: sample label, “Not checked,” and “Mark checked” button.',
                '보이는 것: 샘플 문구, “Not checked”, “Mark checked” 버튼.',
              ),
            },
            {
              label: c("ACTION", "행동"),
              title: c("Click Mark checked", "Mark checked 클릭"),
              body: c(
                "The user performs one unambiguous action.",
                "사용자가 분명한 행동 하나를 합니다.",
              ),
            },
            {
              label: c("STATE B · AFTER", "상태 B · 후"),
              title: c("Checked", "Checked"),
              body: c(
                'Visible: the same sample label and the status “Checked.”',
                '보이는 것: 같은 샘플 문구와 “Checked” 상태.',
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "If you cannot draw the before and after, the success condition is probably still vague.",
            "행동 전후를 그릴 수 없다면 성공조건이 아직 모호할 가능성이 큽니다.",
          ),
          teacherNotes: [
            c(
              "Sketch the two states live with boxes and labels only. Deliberately avoid colors, icons, and visual polish.",
              "상자와 문구만 사용해 두 상태를 실시간으로 그린다. 색, 아이콘, 시각적 꾸밈은 의도적으로 피한다.",
            ),
          ],
        }),
        slide({
          id: "day3-04-brief-worked",
          stageId: "day3-wireframe-brief",
          layout: "worked-example",
          minutes: 2,
          kicker: c("DEMONSTRATION ONLY · COMPLETE BRIEF", "시연 전용 · 완성된 BRIEF"),
          title: c(
            "The brief preserves every decision in one place.",
            "Project Brief는 모든 결정을 한곳에 보존합니다.",
          ),
          code: c(
            `Observation: A fictional practice participant cannot tell whether one sample check was recorded.
User: A participant in this fictional practice.
Problem: The participant cannot see whether the check was recorded.
Success: Click “Mark checked”; “Not checked” becomes “Checked.”

MUST 1 (required): Mark the sample as checked.
MUST 2 (optional): Reset the sample.
MUST 3 (optional): — none needed for this promise.
NICE 1 (optional): Show a history.
NICE 2 (optional): — none needed.

v0 IN: MUST 1, one screen, one action, two visible states with exact words.
v0 OUT: MUST 2, NICE 1, login, storage, API, personal data.
States: Before “Not checked” → Action “Mark checked” → After “Checked.”
Test: Action: open and click “Mark checked.” Expected: visible status changes from “Not checked” to “Checked.”
Accessibility and safety: status always uses visible words; color is never the only signal; use no private or secret data.`,
            `Observation: 가상 연습 참가자가 샘플 확인 하나가 기록됐는지 알 수 없다.
User: 이 가상 연습의 참가자.
Problem: 참가자가 확인 기록 여부를 화면에서 볼 수 없다.
Success: “Mark checked”를 누르면 “Not checked”가 “Checked”로 바뀐다.

MUST 1 (필수): 샘플을 확인 완료로 표시한다.
MUST 2 (선택): 샘플을 초기화한다.
MUST 3 (선택): — 이 약속에는 필요 없음.
NICE 1 (선택): 기록을 보여 준다.
NICE 2 (선택): — 필요 없음.

v0 IN: MUST 1, 한 화면, 한 행동, 정확한 문구가 보이는 두 상태.
v0 OUT: MUST 2, NICE 1, 로그인, 저장, API, 개인정보.
States: Before “Not checked” → Action “Mark checked” → After “Checked.”
Test: Action: 열고 “Mark checked” 클릭. Expected: 보이는 상태가 “Not checked”에서 “Checked”로 바뀐다.
Accessibility and safety: 상태에는 항상 보이는 문구를 사용하고 색만으로 전달하지 않으며 개인정보나 비밀정보를 쓰지 않는다.`,
          ),
          takeaway: c(
            "A strong brief connects origin, promise, scope, states, and test without contradiction.",
            "좋은 Brief는 출발점, 약속, 범위, 상태, 테스트를 모순 없이 연결합니다.",
          ),
          teacherNotes: [
            c(
              "Trace every heading with a pointer: Observation → User → Problem → Success → MUST/NICE → v0 IN/OUT → States → Test → Accessibility and safety.",
              "포인터로 Observation → User → Problem → Success → MUST/NICE → v0 IN/OUT → States → Test → Accessibility and safety를 차례로 따라간다.",
            ),
            c(
              "Remind learners once more that this completed case is not a selectable project.",
              "이 완성 사례는 선택 가능한 프로젝트가 아님을 다시 한 번 알린다.",
            ),
          ],
        }),
        slide({
          id: "day3-04-brief-counterexample",
          stageId: "day3-wireframe-brief",
          layout: "question",
          minutes: 2,
          kicker: c("COUNTEREXAMPLE · CONSISTENCY CHECK", "반례 · 일관성 확인"),
          title: c(
            "The brief says one screen. The wireframe shows login, profile, and history.",
            "Brief는 한 화면이라는데 와이어프레임에는 로그인·프로필·기록이 있습니다.",
          ),
          question: {
            prompt: c("What should happen next?", "다음에는 무엇을 해야 할까요?"),
            options: [
              c("Update the brief so every extra screen becomes MUST", "추가 화면을 모두 MUST로 바꾸도록 Brief 수정"),
              c("Remove the extras and return to the reviewed v0 path", "추가 요소를 빼고 검토한 v0 경로로 복귀"),
              c("Ask AI to decide which version is better", "AI에게 어느 버전이 나은지 결정하게 함"),
            ],
            answer: c("Remove the extras", "추가 요소를 제거"),
            explanation: c(
              "The wireframe is a test of the scope, not permission to expand it.",
              "와이어프레임은 범위를 확인하는 도구이지 범위를 늘려도 된다는 허가가 아닙니다.",
            ),
          },
          takeaway: c(
            "Every element on the v0 wireframe must serve the one action–result path.",
            "v0 와이어프레임의 모든 요소는 행동–결과 한 경로를 위해 존재해야 합니다.",
          ),
          teacherNotes: [
            c(
              "Retrieval prompt: have learners point on their own paper to the action, the before state, and the after state.",
              "회수 질문: 자신의 종이에서 행동, 전 상태, 후 상태를 손으로 짚게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-plan-review",
      role: "learn",
      slides: [
        slide({
          id: "day3-05-review-role-question",
          stageId: "day3-plan-review",
          layout: "question",
          minutes: 2,
          kicker: c("AI AS CRITIC, NOT AUTHOR", "AI는 비평자, 저자는 나"),
          title: c(
            "What may AI change during a plan review?",
            "계획 검토 중 AI는 무엇을 바꿔도 될까?",
          ),
          question: {
            prompt: c("Choose the legitimate review action.", "정당한 검토 행동을 고르세요."),
            options: [
              c("A. Replace the learner's topic with a more impressive one", "A. 학생 주제를 더 멋진 것으로 교체"),
              c("B. Point out an unclear test or an oversized v0", "B. 불분명한 테스트나 너무 큰 v0 지적"),
              c("C. Add features the learner did not request", "C. 학생이 요청하지 않은 기능 추가"),
            ],
            answer: c("B", "B"),
            explanation: c(
              "The reviewer may identify risk and suggest a smaller version of the same plan. Direction remains with the learner.",
              "검토자는 위험을 찾고 같은 계획을 더 작게 만드는 방법을 제안할 수 있습니다. 방향은 학생에게 남습니다.",
            ),
          },
          takeaway: c(
            "Ask AI to challenge clarity and scope, not to supply identity and purpose.",
            "AI에게 정체성과 목적을 대신 정하게 하지 말고 명확성과 범위를 검토하게 합니다.",
          ),
          teacherNotes: [
            c(
              "Ask the room to say 'same topic, smaller risk' before opening the review prompt.",
              "검토 프롬프트를 열기 전에 전체가 ‘같은 주제, 더 작은 위험’이라고 말하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day3-05-review-worked",
          stageId: "day3-plan-review",
          layout: "compare",
          minutes: 2,
          kicker: c("DEMONSTRATION ONLY · REVIEW RESPONSE", "시연 전용 · 검토 답변"),
          title: c(
            "AI, self, partner, and teacher use the same headings.",
            "AI, 나, 짝, 강사는 같은 항목으로 검토합니다.",
          ),
          items: [
            {
              label: c("ORIGIN → PROMISE", "출발점 → 약속"),
              title: c("Observation · User · Problem · Success", "Observation · User · Problem · Success"),
              body: c(
                "Do these four lines form one causal chain without changing the topic?",
                "이 네 줄이 주제를 바꾸지 않고 하나의 인과 관계를 이루는가?",
              ),
            },
            {
              label: c("PRIORITY → SCOPE", "우선순위 → 범위"),
              title: c("MUST/NICE · v0 IN/OUT", "MUST/NICE · v0 IN/OUT"),
              body: c(
                "Does the Brief contain one to three MUSTs and no more than two NICEs, while v0 contains only the smallest MUST 1 path?",
                "Brief에는 MUST가 한 개에서 세 개, NICE가 최대 두 개 있으며 v0에는 가장 작은 MUST 1 경로만 있는가?",
              ),
            },
            {
              label: c("INTERACTION → EVIDENCE", "상호작용 → 증거"),
              title: c("States · Test", "States · Test"),
              body: c(
                "Do Before, Action, After, Test Action, and Expected result match Success?",
                "Before, Action, After, Test Action, Expected 결과가 Success와 일치하는가?",
              ),
            },
            {
              label: c("CONSTRAINT", "제약"),
              title: c("Accessibility and safety", "접근성과 안전"),
              body: c(
                "Do visible words carry state, is color never the only signal, and is private or secret data absent?",
                "상태를 보이는 문구로 전달하고, 색만으로 전달하지 않으며, 개인정보와 비밀정보가 없는가?",
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "Accept a specific risk under one heading; reject topic drift and feature growth.",
            "특정 항목의 구체적 위험은 받아들이고, 주제 이탈과 기능 증가는 거절합니다.",
          ),
          teacherNotes: [
            c(
              "Mark one heading PASS and one RISK. Cross out an added feature to show that the rubric reviews the learner's plan rather than expands it.",
              "항목 하나에는 PASS, 하나에는 RISK를 표시한다. 추가 기능에는 선을 그어 이 루브릭이 학생 계획을 늘리지 않고 검토한다는 점을 보여 준다.",
            ),
          ],
        }),
        slide({
          id: "day3-05-approval-gate",
          stageId: "day3-plan-review",
          layout: "question",
          minutes: 2,
          kicker: c("RETRIEVAL · READY ROUTE", "회수 질문 · READY 경로"),
          title: c(
            "A shared rubric removes the whole-class approval queue.",
            "공통 루브릭이 전원 승인 대기열을 없앱니다.",
          ),
          lead: c(
            "Observation · User · Problem · Success · MUST/NICE · v0 IN/OUT · States · Test · Accessibility and safety",
            "Observation · User · Problem · Success · MUST/NICE · v0 IN/OUT · States · Test · Accessibility and safety",
          ),
          question: {
            prompt: c(
              "Which route protects quality without making every learner wait for the teacher?",
              "모든 학생이 강사를 기다리지 않으면서 품질을 지키는 경로는 무엇일까요?",
            ),
            options: [
              c(
                "A. Each learner invents a personal checklist, then asks the teacher to approve everything.",
                "A. 각자 다른 체크리스트를 만든 뒤 모든 내용을 강사에게 승인받는다.",
              ),
              c(
                "B. Self-check every Brief heading, partner-check the same headings, and ask the teacher only about a Yellow mismatch.",
                "B. Brief의 모든 항목을 자가검수하고 짝이 같은 항목을 검수한 뒤, Yellow 불일치만 강사에게 묻는다.",
              ),
              c(
                "C. Build when the AI says the plan is complete, then fix scope during testing.",
                "C. AI가 계획이 완성됐다고 하면 제작하고 테스트 중 범위를 고친다.",
              ),
            ],
            answer: c("B", "B"),
            explanation: c(
              "The same schema makes the first two checks reliable. The teacher spends time only where two reviewers disagree or a criterion remains unclear.",
              "같은 스키마를 사용하면 앞의 두 검수를 신뢰할 수 있습니다. 강사는 두 검토자가 다르게 판단했거나 기준이 불분명한 곳에만 시간을 씁니다.",
            ),
          },
          takeaway: c(
            "Self PASS + peer PASS = READY. Any mismatch = Yellow, then a focused teacher check.",
            "자가 PASS + 짝 PASS = READY. 불일치가 있으면 Yellow로 표시하고 강사가 해당 항목만 확인합니다.",
          ),
          teacherNotes: [
            c(
              "Do not create a teacher approval line. Circulate to Yellow learners, ask which heading disagrees, and review only that heading with the same rubric.",
              "강사 승인 줄을 만들지 않는다. Yellow 학생에게 가서 어떤 항목이 불일치하는지 묻고 같은 루브릭으로 그 항목만 확인한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-v0-studio",
      role: "build",
      slides: [
        slide({
          id: "day3-06-v0-prompt-worked",
          stageId: "day3-v0-studio",
          layout: "demo",
          minutes: 1,
          kicker: c("DEMONSTRATION ONLY · BRIEF TO PROMPT", "시연 전용 · BRIEF에서 프롬프트로"),
          title: c(
            "The build request should contain no new decision.",
            "제작 요청에는 새로운 결정이 들어가면 안 됩니다.",
          ),
          code: c(
            `Work only in my-app/index.html.

User: a participant in this fictional practice.
Problem: the participant cannot see whether one sample check was recorded.
Success: clicking “Mark checked” changes “Not checked” to “Checked.”

Build only MUST 1:
- one sample label
- visible initial status “Not checked”
- one button labeled “Mark checked”
- after the click, visible status “Checked”

Use the exact visible status words; never use color as the only status signal.
Do not add Reset, history, login, storage, API, personal data, or another file.
Before editing, show a three-step plan.
After editing, name the exact browser test.`,
            `my-app/index.html에서만 작업하세요.

User: 이 가상 연습의 참가자.
Problem: 참가자가 샘플 확인 하나가 기록됐는지 볼 수 없다.
Success: “Mark checked”를 누르면 “Not checked”가 “Checked”로 바뀐다.

MUST 1만 만드세요.
- 샘플 문구 하나
- 보이는 초기 상태 “Not checked”
- “Mark checked” 버튼 하나
- 클릭 후 보이는 상태 “Checked”

정확한 상태 문구를 보이게 하고 색만으로 상태를 전달하지 마세요.
Reset, 기록, 로그인, 저장, API, 개인정보, 다른 파일을 추가하지 마세요.
수정 전에 세 단계 계획을 보여 주세요.
수정 뒤 정확한 브라우저 테스트를 말해 주세요.`,
          ),
          takeaway: c(
            "The prompt translates a reviewed READY brief; it does not brainstorm beyond it.",
            "프롬프트는 검토를 마친 READY Brief를 번역하며 그 밖의 아이디어를 탐색하지 않습니다.",
          ),
          teacherNotes: [
            c(
              "Show the Project Brief beside the prompt. Point out where every prompt line came from and reject any plan item with no source in the brief.",
              "Project Brief와 프롬프트를 나란히 보여 준다. 각 프롬프트 문장의 출처를 짚고 Brief에 근거가 없는 계획 항목은 거절한다.",
            ),
          ],
        }),
        slide({
          id: "day3-06-v0-browser-proof",
          stageId: "day3-v0-studio",
          layout: "worked-example",
          minutes: 2,
          kicker: c("DEMONSTRATION ONLY · v0 PROOF", "시연 전용 · v0 증거"),
          title: c(
            "The first version is small enough to test in one breath.",
            "첫 버전은 한 호흡에 테스트할 만큼 작습니다.",
          ),
          items: [
            {
              label: c("ACTION 1", "행동 1"),
              title: c("Open the page", "페이지 열기"),
              body: c('Expected: “Not checked” and “Mark checked” are visible.', 'Expected: “Not checked”와 “Mark checked”가 보인다.'),
            },
            {
              label: c("ACTION 2", "행동 2"),
              title: c("Click Mark checked", "Mark checked 클릭"),
              body: c('Expected: the status becomes exactly “Checked.”', 'Expected: 상태가 정확히 “Checked”가 된다.'),
            },
            {
              label: c("ACTUAL", "실제"),
              title: c("Record what the browser shows", "브라우저 결과 기록"),
              body: c(
                "Pass only when both observations match. The AI's completion message is not part of the test.",
                "두 관찰이 모두 일치할 때만 통과합니다. AI의 완료 메시지는 테스트에 포함되지 않습니다.",
              ),
              tone: "good",
            },
          ],
          takeaway: c(
            "v0 is complete when the smallest promise has evidence—not when all ideas are built.",
            "v0는 모든 아이디어를 만들 때가 아니라 가장 작은 약속에 증거가 생길 때 완료입니다.",
          ),
          teacherNotes: [
            c(
              "Run the demo without narrating the code. Ask the class to say Expected before each action and Actual after it.",
              "코드를 설명하지 않고 시연한다. 각 행동 전에 Expected, 실행 뒤 Actual을 학생이 말하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day3-06-v0-fix-save",
          stageId: "day3-v0-studio",
          layout: "flow",
          minutes: 1,
          kicker: c("IF v0 FAILS", "v0가 실패하면"),
          title: c(
            "Repair the reviewed READY path; do not redesign the project.",
            "검토를 마친 READY 경로를 고치고 프로젝트를 다시 설계하지 않습니다.",
          ),
          items: [
            {
              label: c("1 · RECORD", "1 · 기록"),
              title: c("Action–Expected–Actual", "Action–Expected–Actual"),
              body: c("Capture one specific gap.", "구체적인 차이 하나를 잡습니다."),
            },
            {
              label: c("2 · FIX", "2 · 수정"),
              title: c("Only that gap", "그 차이만"),
              body: c("Keep the reviewed user, promise, and scope.", "검토한 사용자, 약속, 범위를 지킵니다."),
            },
            {
              label: c("3 · RECHECK", "3 · 재시험"),
              title: c("Repeat the same action", "같은 행동 반복"),
              body: c("Do not lower the success condition.", "성공조건을 낮추지 않습니다."),
            },
            {
              label: c("4 · SAVE", "4 · 저장"),
              title: c("day3-v0-save.html", "day3-v0-save.html"),
              body: c("Open the copy and run the same path.", "복사본을 열어 같은 경로를 실행합니다."),
            },
          ],
          takeaway: c(
            "A verified v0 is a foundation. An oversized, untested draft is only risk.",
            "검증된 v0는 토대입니다. 너무 크고 테스트하지 않은 초안은 위험일 뿐입니다.",
          ),
          teacherNotes: [
            c(
              "During studio, ask only three questions at each desk: What is the action? What should appear? What did you actually see?",
              "Studio 중 각 자리에서 세 질문만 한다. 행동은 무엇인가? 무엇이 나타나야 하는가? 실제로 무엇을 보았는가?",
            ),
            c(
              "Fast learners explain the changed event and design one edge test; they do not start another optional MUST or NICE item.",
              "빠른 학생은 바뀐 이벤트를 설명하고 경계 테스트 하나를 설계한다. 다른 선택 MUST나 NICE 항목을 시작하지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day3-pitch",
      role: "share",
      slides: [
        slide({
          id: "day3-07-pitch-evidence",
          stageId: "day3-pitch",
          layout: "summary",
          minutes: 4,
          kicker: c("30-SECOND EVIDENCE PITCH", "30초 증거 피치"),
          title: c(
            "Tell the chain, then show the proof.",
            "연결을 말하고 증거를 보여 줍니다.",
          ),
          items: [
            {
              label: c("0–10 SEC", "0–10초"),
              title: c("User and problem", "사용자와 문제"),
              body: c(
                "“My user is… The problem is…”",
                "“나의 사용자는… 문제는…”",
              ),
            },
            {
              label: c("10–22 SEC", "10–22초"),
              title: c("Action and visible result", "행동과 보이는 결과"),
              body: c(
                "Perform the real v0 test in the browser.",
                "브라우저에서 실제 v0 테스트를 실행합니다.",
              ),
            },
            {
              label: c("22–27 SEC", "22–27초"),
              title: c("Scope", "범위"),
              body: c(
                "Name one thing deliberately left out.",
                "의도적으로 제외한 것 하나를 말합니다.",
              ),
            },
            {
              label: c("27–30 SEC", "27–30초"),
              title: c("Next check", "다음 확인"),
              body: c(
                "Name the first evidence you need on Day 4.",
                "Day 4에 가장 먼저 필요한 증거를 말합니다.",
              ),
            },
          ],
          takeaway: c(
            "A credible pitch links an owned decision to a visible test.",
            "신뢰할 수 있는 피치는 내가 내린 결정과 보이는 테스트를 연결합니다.",
          ),
          teacherNotes: [
            c(
              "The demonstration-only case ends here and must not appear in learner submissions. Partners assess only user, problem, real action, visible result, and one limit.",
              "시연 전용 사례는 여기서 끝나며 학생 제출물에 나타나면 안 된다. 짝은 사용자, 문제, 실제 행동, 보이는 결과, 한계 하나만 확인한다.",
            ),
            c(
              "Stop new edits in the final minute. Ask learners to write the first Day 4 action rather than add a feature.",
              "마지막 1분에는 새 편집을 중단한다. 기능을 추가하지 말고 Day 4 첫 행동을 쓰게 한다.",
            ),
          ],
        }),
      ],
    },
  ],
};
