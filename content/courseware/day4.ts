import { copy as c, type DayCourseware, type TeachingSlide } from "./types";

function slide(value: TeachingSlide): TeachingSlide {
  return value;
}

export const day4Courseware: DayCourseware = {
  day: 4,
  essentialQuestion: c(
    "How can we change one part of a generated project without losing what already works?",
    "생성된 프로젝트에서 이미 작동하는 부분을 지키면서 한 부분만 바꾸려면 어떻게 해야 할까?",
  ),
  stages: [
    {
      stageId: "day4-project-status",
      role: "preflight",
      slides: [
        slide({
          id: "day4-00-baseline",
          stageId: "day4-project-status",
          layout: "run",
          minutes: 3,
          kicker: c("PREFLIGHT · NOT NEW WORK", "수업 전 확인 · 새 작업 아님"),
          title: c(
            "Prove the old path before touching the code.",
            "코드를 건드리기 전에 기존 경로부터 증명합니다.",
          ),
          lead: c(
            "A baseline is the result you can reproduce before a change. Without it, you cannot know whether the change caused a later failure.",
            "기준선은 변경 전에 다시 재현할 수 있는 결과입니다. 기준선이 없으면 나중의 실패가 이번 변경 때문인지 판단할 수 없습니다.",
          ),
          items: [
            {
              label: c("ACTION", "행동"),
              title: c("Repeat one Day 3 path", "3일차 경로 하나 반복"),
              body: c(
                "Open the project and perform one important action.",
                "프로젝트를 열고 중요한 행동 하나를 실행합니다.",
              ),
            },
            {
              label: c("EXPECTED", "예상"),
              title: c("State the old promise", "기존 약속 말하기"),
              body: c(
                "Write what should appear before you run the action.",
                "행동을 실행하기 전에 무엇이 나타나야 하는지 씁니다.",
              ),
            },
            {
              label: c("ACTUAL", "실제"),
              title: c("Record what appears", "나타난 결과 기록"),
              body: c(
                "If it does not match, restore first. Do not add a feature.",
                "예상과 다르면 먼저 복구합니다. 새 기능은 추가하지 않습니다.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "Today begins from a verified result, not from an assumption.",
            "오늘 수업은 추측이 아니라 검증된 결과에서 시작합니다.",
          ),
          teacherNotes: [
            c(
              "Keep this as room operation. Ask two learners to state an old path as Action and Expected, then release the class to run it.",
              "이 단계는 수업 운영으로 짧게 처리한다. 학생 두 명에게 기존 경로를 Action과 Expected로 말하게 한 뒤 전원이 실행하게 한다.",
            ),
            c(
              "Move a learner whose baseline fails to recovery; do not let that learner start the new slice.",
              "기준선이 실패한 학생은 복구로 이동시키고 새 조각을 시작하지 않게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-code-map",
      role: "learn",
      slides: [
        slide({
          id: "day4-01-map-question",
          stageId: "day4-code-map",
          layout: "question",
          minutes: 2,
          kicker: c("DIAGNOSE BEFORE EDITING", "수정 전에 진단"),
          title: c(
            "The button needs a new label and a new action. Is that one kind of change?",
            "버튼의 문구와 동작을 모두 바꾸려 합니다. 같은 종류의 변경일까요?",
          ),
          question: {
            prompt: c(
              "Which answer gives the safer code map?",
              "어느 답이 더 안전한 코드 지도를 만들까요?",
            ),
            options: [
              c(
                "A. Both changes are “design,” so ask AI to redesign the button.",
                "A. 둘 다 ‘디자인’이므로 AI에게 버튼을 다시 디자인하라고 한다.",
              ),
              c(
                "B. The label belongs to structure; the click result belongs to behavior.",
                "B. 버튼 문구는 구조에, 클릭 결과는 동작에 속한다.",
              ),
            ],
            answer: c(
              "B — the two visible changes lead to different code roles.",
              "B — 눈에 보이는 두 변경은 서로 다른 코드 역할로 이어집니다.",
            ),
            explanation: c(
              "A vague category such as “design” hides the edit location. A code map separates what exists, how it looks, and what it does.",
              "‘디자인’처럼 모호한 범주는 수정 위치를 숨깁니다. 코드 지도는 무엇이 있는지, 어떻게 보이는지, 무엇을 하는지를 나눕니다.",
            ),
          },
          takeaway: c(
            "The first debugging question is not “What syntax?” but “Which role?”",
            "디버깅의 첫 질문은 ‘무슨 문법?’이 아니라 ‘어떤 역할?’입니다.",
          ),
          teacherNotes: [
            c(
              "Collect predictions before showing code. Ask one learner to point to the visible label and another to describe the click result.",
              "코드를 보여 주기 전에 먼저 예측을 받는다. 한 학생은 보이는 문구를, 다른 학생은 클릭 결과를 설명하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day4-01-three-roles",
          stageId: "day4-code-map",
          layout: "concept",
          minutes: 2,
          kicker: c("CORE MODEL · THREE ROLES", "핵심 모델 · 세 가지 역할"),
          title: c(
            "HTML names the parts. CSS presents them. JavaScript reacts.",
            "HTML은 구성요소를 만들고, CSS는 보여 주며, JavaScript는 반응합니다.",
          ),
          items: [
            {
              label: c("HTML · STRUCTURE", "HTML · 구조"),
              title: c("What exists?", "무엇이 있는가?"),
              body: c(
                "Headings, labels, inputs, buttons, lists, and their order.",
                "제목, 라벨, 입력창, 버튼, 목록과 그 순서.",
              ),
            },
            {
              label: c("CSS · PRESENTATION", "CSS · 표현"),
              title: c("How does it look and respond to space?", "어떻게 보이고 공간에 반응하는가?"),
              body: c(
                "Color, spacing, size, focus, and narrow-screen layout.",
                "색상, 여백, 크기, 포커스, 좁은 화면 배치.",
              ),
            },
            {
              label: c("JAVASCRIPT · BEHAVIOR", "JAVASCRIPT · 동작"),
              title: c("What happens after an event?", "이벤트 뒤에 무엇이 일어나는가?"),
              body: c(
                "Read a value, change state, update the screen, or save data.",
                "값을 읽고, 상태를 바꾸고, 화면을 갱신하거나 데이터를 저장합니다.",
              ),
            },
          ],
          takeaway: c(
            "The roles cooperate, but they are not interchangeable.",
            "세 역할은 함께 작동하지만 서로 대신할 수는 없습니다.",
          ),
          teacherNotes: [
            c(
              "Use the learners' current page, not an abstract framework diagram. Point to one real element for each role.",
              "추상적인 프레임워크 그림 대신 학생의 현재 페이지를 사용한다. 각 역할에 해당하는 실제 요소를 하나씩 가리킨다.",
            ),
            c(
              "Say explicitly that a project may place CSS or JavaScript inside HTML; role and file count are different ideas.",
              "CSS나 JavaScript가 HTML 파일 안에 있을 수도 있음을 명확히 말한다. 역할과 파일 개수는 서로 다른 개념이다.",
            ),
          ],
        }),
        slide({
          id: "day4-01-code-demo",
          stageId: "day4-code-map",
          layout: "demo",
          minutes: 3,
          kicker: c("WORKED EXAMPLE · ONE BUTTON", "풀이 예시 · 버튼 하나"),
          title: c(
            "Three short lines explain one visible behavior.",
            "짧은 세 부분이 눈에 보이는 동작 하나를 설명합니다.",
          ),
          code: c(
            `<button id="saveButton">Save note</button>
<p id="status">Not saved</p>

<style>
  #saveButton { background: navy; color: white; }
</style>

<script>
  const button = document.querySelector("#saveButton");
  const status = document.querySelector("#status");

  button.addEventListener("click", () => {
    status.textContent = "Saved";
  });
</script>`,
            `<button id="saveButton">메모 저장</button>
<p id="status">저장되지 않음</p>

<style>
  #saveButton { background: navy; color: white; }
</style>

<script>
  const button = document.querySelector("#saveButton");
  const status = document.querySelector("#status");

  button.addEventListener("click", () => {
    status.textContent = "저장됨";
  });
</script>`,
          ),
          items: [
            {
              label: c("WORKS", "맞는 수정"),
              title: c("Change the color in CSS", "CSS에서 색상 변경"),
              body: c(
                "The button's appearance changes; its click behavior remains.",
                "버튼 모양은 바뀌고 클릭 동작은 그대로 유지됩니다.",
              ),
              tone: "good",
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("Change CSS to repair a silent click", "반응 없는 클릭을 CSS로 고치기"),
              body: c(
                "Color rules cannot attach the missing click event. Inspect the selector and event listener.",
                "색상 규칙은 빠진 클릭 이벤트를 연결할 수 없습니다. 선택자와 이벤트 리스너를 확인해야 합니다.",
              ),
              tone: "danger",
            },
          ],
          takeaway: c(
            "Map the symptom to a role before asking AI to edit.",
            "AI에게 수정을 요청하기 전에 증상을 코드 역할에 연결합니다.",
          ),
          teacherNotes: [
            c(
              "Live demo: change only `navy` to `green`, reload, and show that the click still works. Then temporarily misspell `#saveButton` in JavaScript and show that CSS cannot repair the silent click.",
              "강사 시연: `navy`만 `green`으로 바꾸고 새로고침하여 클릭은 계속 작동함을 보인다. 이어 JavaScript의 `#saveButton` 철자를 잠시 틀리게 하고 CSS로는 반응 없는 클릭을 고칠 수 없음을 보여 준다.",
            ),
            c(
              "Restore the working selector before leaving the slide.",
              "슬라이드를 넘기기 전에 올바른 선택자로 복구한다.",
            ),
          ],
        }),
        slide({
          id: "day4-01-map-retrieval",
          stageId: "day4-code-map",
          layout: "question",
          minutes: 1,
          kicker: c("RETRIEVE · NO NOTES", "회수 질문 · 자료 보지 않기"),
          title: c(
            "The button is visible and styled, but clicking changes nothing.",
            "버튼은 보이고 스타일도 적용되지만 눌러도 아무 변화가 없습니다.",
          ),
          question: {
            prompt: c(
              "Which role should you inspect first, and what real link would you verify?",
              "어떤 역할을 먼저 살피고, 실제로 어떤 연결을 확인해야 할까요?",
            ),
            options: [
              c("HTML — the page title", "HTML — 페이지 제목"),
              c(
                "CSS — the background color",
                "CSS — 배경색",
              ),
              c(
                "JavaScript — the selector, event listener, and result element",
                "JavaScript — 선택자, 이벤트 리스너, 결과 요소",
              ),
            ],
            answer: c(
              "JavaScript — verify that the selected element exists, receives the event, and updates the intended result.",
              "JavaScript — 선택한 요소가 실제로 존재하고 이벤트를 받으며 의도한 결과 요소를 갱신하는지 확인합니다.",
            ),
            explanation: c(
              "Visibility proves that some HTML and CSS are present. It does not prove the behavior chain.",
              "요소가 보인다는 것은 HTML과 CSS 일부가 있다는 증거일 뿐, 동작 연결이 완성되었다는 증거는 아닙니다.",
            ),
          },
          takeaway: c(
            "Use the code map to narrow the search, then verify in the browser.",
            "코드 지도로 탐색 범위를 줄인 뒤 브라우저에서 검증합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to answer in the form “role + one thing to verify.” Accept equivalent concrete checks.",
              "학생이 ‘역할 + 확인할 것 하나’ 형식으로 답하게 한다. 구체적이고 동등한 확인 방법도 정답으로 인정한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-action-trace",
      role: "learn",
      slides: [
        slide({
          id: "day4-02-trace-question",
          stageId: "day4-action-trace",
          layout: "question",
          minutes: 2,
          kicker: c("FOLLOW THE CAUSE", "원인을 따라가기"),
          title: c(
            "Saved notes were promised, but the note disappears after refresh. What failed?",
            "메모 저장을 약속했지만 새로고침하면 메모가 사라집니다. 무엇이 빠졌을까요?",
          ),
          question: {
            prompt: c(
              "Which observation is most precise?",
              "어느 관찰이 가장 정확할까요?",
            ),
            options: [
              c("A. The whole app is broken.", "A. 앱 전체가 고장 났다."),
              c(
                "B. The click updates state and screen, but the promised save-and-load path does not.",
                "B. 클릭으로 상태와 화면은 바뀌지만, 약속한 저장·불러오기 경로는 작동하지 않는다.",
              ),
              c("C. The CSS is probably wrong.", "C. 아마 CSS가 잘못되었다."),
            ],
            answer: c(
              "B — the trace tells us exactly where the observed promise stops.",
              "B — 추적하면 관찰 가능한 약속이 어디에서 끊겼는지 정확히 말할 수 있습니다.",
            ),
            explanation: c(
              "The click was received, a value changed, and the screen updated. Refresh tests whether that value was stored and restored.",
              "클릭은 전달되었고 값도 바뀌었으며 화면도 갱신되었습니다. 새로고침은 그 값이 저장되고 다시 불러와지는지 시험합니다.",
            ),
          },
          takeaway: c(
            "A trace replaces “broken” with the last step that still worked.",
            "동작 추적은 ‘고장 났다’를 ‘마지막으로 작동한 단계’로 바꿉니다.",
          ),
          teacherNotes: [
            c(
              "Have learners separate the click path from the optional persistence path before naming Storage. Use a real refresh, not a verbal explanation.",
              "Storage라고 말하기 전에 클릭 경로와 선택적인 지속 저장 경로를 구분하게 한다. 말로만 설명하지 말고 실제로 새로고침한다.",
            ),
          ],
        }),
        slide({
          id: "day4-02-flow-model",
          stageId: "day4-action-trace",
          layout: "flow",
          minutes: 2,
          kicker: c("CORE MODEL · ACTION TRACE", "핵심 모델 · 동작 추적"),
          title: c(
            "Event → handler → State → render → Screen; Storage branches in and out",
            "Event → 처리 함수 → State → render → Screen, Storage는 읽기·쓰기 분기",
          ),
          items: [
            {
              label: c("EVENT", "이벤트"),
              title: c("What did the user do?", "사용자가 무엇을 했는가?"),
              body: c(
                "Click, type, select, submit, or refresh.",
                "클릭, 입력, 선택, 제출, 새로고침.",
              ),
            },
            {
              label: c("HANDLER", "처리 함수"),
              title: c("Which code received the event?", "어떤 코드가 이벤트를 받았는가?"),
              body: c(
                "An event listener or called function begins the behavior.",
                "이벤트 리스너나 호출된 함수가 동작을 시작합니다.",
              ),
            },
            {
              label: c("STATE", "상태"),
              title: c("What value changed or was read?", "어떤 값을 읽거나 바꿨는가?"),
              body: c(
                "A count, selected item, input text, or list in memory.",
                "개수, 선택 항목, 입력 텍스트, 메모리 속 목록.",
              ),
            },
            {
              label: c("RENDER", "렌더링"),
              title: c("Which code turned state into output?", "어떤 코드가 상태를 화면 출력으로 바꿨는가?"),
              body: c(
                "A render function or DOM update maps the current value to the interface.",
                "렌더 함수나 DOM 갱신 코드가 현재 값을 화면에 연결합니다.",
              ),
            },
            {
              label: c("SCREEN", "화면"),
              title: c("What visible result represents the state?", "상태가 어떤 결과로 보이는가?"),
              body: c(
                "Text, a card, a disabled control, or an error message.",
                "텍스트, 카드, 비활성화된 조작 요소, 오류 안내.",
              ),
            },
            {
              label: c("STORAGE · OPTIONAL BRANCH", "저장 · 선택 분기"),
              title: c("What is loaded into or saved from state?", "상태로 무엇을 불러오거나 저장하는가?"),
              body: c(
                "On start: Storage → State. After a change: State → Storage. Some projects use neither.",
                "시작할 때는 Storage → State, 변경 뒤에는 State → Storage입니다. 둘 다 쓰지 않는 프로젝트도 있습니다.",
              ),
            },
          ],
          takeaway: c(
            "Storage is not the next screen step. It is an optional load/save path around state.",
            "Storage는 화면 다음 단계가 아니라 상태 주변의 선택적인 불러오기·저장 경로입니다.",
          ),
          teacherNotes: [
            c(
              "Do not imply that every app needs storage. Contrast a temporary calculator result with a saved checklist.",
              "모든 앱에 저장이 필요하다고 암시하지 않는다. 일시적인 계산 결과와 저장되는 체크리스트를 비교한다.",
            ),
          ],
        }),
        slide({
          id: "day4-02-trace-demo",
          stageId: "day4-action-trace",
          layout: "demo",
          minutes: 3,
          kicker: c("WORKED EXAMPLE · COUNT ONE ACTION", "풀이 예시 · 행동 하나 추적"),
          title: c(
            "Trace the click from the button to refresh.",
            "버튼 클릭부터 새로고침까지 따라갑니다.",
          ),
          code: c(
            `let count = Number(localStorage.getItem("count") ?? 0);
const output = document.querySelector("#count");

function render() {
  output.textContent = count;
}

document.querySelector("#add").addEventListener("click", () => {
  count += 1;
  render();
  localStorage.setItem("count", String(count));
});

render();`,
            `let count = Number(localStorage.getItem("count") ?? 0);
const output = document.querySelector("#count");

function render() {
  output.textContent = count;
}

document.querySelector("#add").addEventListener("click", () => {
  count += 1;
  render();
  localStorage.setItem("count", String(count));
});

render();`,
          ),
          items: [
            {
              label: c("TRACE", "추적"),
              title: c(
                "Click → listener → count + 1 → render → visible text",
                "클릭 → 리스너 → count + 1 → render → 보이는 텍스트",
              ),
              body: c(
                "Separate branch: State saves to Storage after the change; refresh loads Storage into State before the first render.",
                "별도 분기: 변경 뒤 State를 Storage에 저장하고, 새로고침 뒤 첫 render 전에 Storage를 State로 불러옵니다.",
              ),
              tone: "good",
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("Only update the text", "텍스트만 바꾸기"),
              body: c(
                "`output.textContent = 1` can look correct once while state and storage remain wrong.",
                "`output.textContent = 1`은 한 번은 맞아 보이지만 상태와 저장은 여전히 잘못될 수 있습니다.",
              ),
              tone: "warning",
            },
          ],
          takeaway: c(
            "Observable behavior, not code shape, decides whether the trace is complete.",
            "추적의 완성 여부는 코드 모양이 아니라 관찰 가능한 동작으로 판단합니다.",
          ),
          teacherNotes: [
            c(
              "Live demo in three passes: click and observe; refresh and observe; comment out `localStorage.setItem`, click again, refresh, and ask where the trace now stops.",
              "강사 시연은 세 번 진행한다. 클릭 후 관찰, 새로고침 후 관찰, `localStorage.setItem`을 주석 처리한 뒤 다시 클릭·새로고침하고 추적이 어디에서 끊기는지 묻는다.",
            ),
            c(
              "Restore the line and clear the demo's localStorage after the comparison.",
              "비교가 끝나면 해당 줄을 복구하고 데모의 localStorage를 비운다.",
            ),
          ],
        }),
        slide({
          id: "day4-02-trace-retrieval",
          stageId: "day4-action-trace",
          layout: "question",
          minutes: 1,
          kicker: c("RETRIEVE · TRACE FROM EVIDENCE", "회수 질문 · 증거에서 추적하기"),
          title: c(
            "The count changes and survives refresh, but the displayed text is one step behind.",
            "개수는 바뀌고 새로고침 뒤에도 남지만 화면 텍스트가 한 단계 늦습니다.",
          ),
          question: {
            prompt: c(
              "Which link should be inspected first?",
              "어느 연결을 먼저 확인해야 할까요?",
            ),
            options: [
              c("Event → handler", "Event → 처리 함수"),
              c("State → render → Screen", "State → render → Screen"),
              c("State → Storage save", "State → Storage 저장"),
            ],
            answer: c("State → render → Screen", "State → render → Screen"),
            explanation: c(
              "The value changed and persisted, so the first suspicious link is when the updated state is rendered.",
              "값이 바뀌고 저장도 되었으므로, 먼저 의심할 연결은 바뀐 상태를 화면에 렌더링하는 부분입니다.",
            ),
          },
          takeaway: c(
            "Start at the last fact you can prove, then inspect the next link.",
            "마지막으로 증명할 수 있는 사실에서 시작해 다음 연결을 살핍니다.",
          ),
          teacherNotes: [
            c(
              "Ask for the evidence that rules out Event → handler and the load/save branch. Require the observation, not only the option.",
              "Event → 처리 함수와 불러오기·저장 분기를 제외할 수 있는 증거도 말하게 한다. 선택지만이 아니라 관찰 결과를 요구한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-sprint-save-point",
      role: "learn",
      slides: [
        slide({
          id: "day4-03-slice-question",
          stageId: "day4-sprint-save-point",
          layout: "question",
          minutes: 2,
          kicker: c("ONE SAFE SPRINT", "안전한 스프린트 하나"),
          title: c(
            "Which request can you actually explain when it fails?",
            "실패했을 때 원인을 설명할 수 있는 요청은 어느 쪽일까요?",
          ),
          question: {
            prompt: c("Choose the safer next slice.", "더 안전한 다음 조각을 고르세요."),
            options: [
              c(
                "A. Add search, sorting, dark mode, export, and animation.",
                "A. 검색, 정렬, 다크 모드, 내보내기, 애니메이션을 모두 추가한다.",
              ),
              c(
                "B. Add one Clear button that empties the visible list after confirmation.",
                "B. 확인 뒤 보이는 목록을 비우는 Clear 버튼 하나를 추가한다.",
              ),
            ],
            answer: c("B — one action and one visible result", "B — 행동 하나와 눈에 보이는 결과 하나"),
            explanation: c(
              "The smaller slice has a clear success test and a short list of places that may change.",
              "작은 조각은 성공 테스트가 분명하고 바뀔 수 있는 위치도 적습니다.",
            ),
          },
          takeaway: c(
            "Small is not simplistic. Small makes cause and evidence visible.",
            "작다는 것은 단순하다는 뜻이 아닙니다. 작아야 원인과 증거가 보입니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to underline the single user action and visible result in option B.",
              "학생에게 B에서 사용자 행동 하나와 눈에 보이는 결과를 밑줄 치게 한다.",
            ),
          ],
        }),
        slide({
          id: "day4-03-test-pair",
          stageId: "day4-sprint-save-point",
          layout: "worked-example",
          minutes: 2,
          kicker: c("CORE MODEL · TWO TESTS", "핵심 모델 · 두 가지 테스트"),
          title: c(
            "A new promise needs a success test and an old promise needs a regression test.",
            "새 약속에는 성공 테스트가, 기존 약속에는 회귀 테스트가 필요합니다.",
          ),
          items: [
            {
              label: c("NEW-SLICE TEST", "새 조각 테스트"),
              title: c("Clear the list", "목록 비우기"),
              body: c(
                "Action: add two items, click Clear, confirm. Expected: the list shows zero items.",
                "행동: 항목 두 개 추가, Clear 클릭, 확인. 예상: 목록에 항목이 0개로 보인다.",
              ),
              tone: "good",
            },
            {
              label: c("REGRESSION TEST", "회귀 테스트"),
              title: c("Adding still works", "추가 기능도 계속 작동"),
              body: c(
                "Action: type “Water” and click Add. Expected: one “Water” item appears.",
                "행동: ‘Water’를 입력하고 Add 클릭. 예상: ‘Water’ 항목 하나가 나타난다.",
              ),
              tone: "good",
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("“The page looks fine”", "‘페이지가 괜찮아 보인다’"),
              body: c(
                "No action, no expected result, and no protection for the old path.",
                "행동도 예상 결과도 없고 기존 경로를 보호하지도 못합니다.",
              ),
              tone: "danger",
            },
          ],
          takeaway: c(
            "A slice is not complete until both the new and old promises pass.",
            "새 약속과 기존 약속이 모두 통과해야 조각이 완료됩니다.",
          ),
          teacherNotes: [
            c(
              "Ask the room which test should be run first after the edit. Accept either order only if both are run before SAVE; recommend the new test first for fast feedback.",
              "수정 뒤 어떤 테스트를 먼저 실행할지 묻는다. SAVE 전에 둘 다 실행한다면 어느 순서도 인정하되, 빠른 피드백을 위해 새 테스트를 먼저 권한다.",
            ),
          ],
        }),
        slide({
          id: "day4-03-save-demo",
          stageId: "day4-sprint-save-point",
          layout: "demo",
          minutes: 2,
          kicker: c("DEMO · SAVE POINT IS A CLAIM TO TEST", "시연 · 저장 지점도 검증해야 할 주장"),
          title: c(
            "A copied folder is not a Save Point until it opens and passes.",
            "복사한 폴더를 직접 열어 통과하기 전에는 저장 지점이 아닙니다.",
          ),
          items: [
            {
              label: c("1 · COPY", "1 · 복사"),
              title: c("Create `my-app-day4-start` beside `my-app`", "`my-app` 옆에 `my-app-day4-start` 만들기"),
              body: c(
                "A sibling copy avoids accidentally editing the backup through the active project.",
                "형제 폴더로 복사하면 활성 프로젝트를 통해 백업을 실수로 수정할 가능성이 줄어듭니다.",
              ),
            },
            {
              label: c("2 · OPEN", "2 · 열기"),
              title: c("Open the copy itself", "복사본 자체 열기"),
              body: c(
                "Check the browser path or editor folder name.",
                "브라우저 경로나 편집기의 폴더 이름을 확인합니다.",
              ),
            },
            {
              label: c("3 · PROVE", "3 · 증명"),
              title: c("Run the baseline test", "기준선 테스트 실행"),
              body: c(
                "Only a passing copy is a recovery point.",
                "테스트를 통과한 복사본만 복구 지점입니다.",
              ),
            },
          ],
          question: {
            prompt: c(
              "You copied the folder but never opened it. What evidence is missing?",
              "폴더를 복사했지만 열어 보지 않았습니다. 어떤 증거가 빠졌을까요?",
            ),
            answer: c(
              "Evidence that the copy itself opens and reproduces the old path.",
              "복사본 자체가 열리고 기존 경로를 재현한다는 증거.",
            ),
            explanation: c(
              "A wrong folder, missing asset, or nested copy can exist even when the copy command appeared to succeed.",
              "복사 명령이 성공해 보이더라도 잘못된 폴더, 빠진 파일, 중첩된 복사본 문제가 있을 수 있습니다.",
            ),
          },
          takeaway: c(
            "SAVE means copy, open, and test.",
            "SAVE는 복사하고, 열고, 시험하는 것입니다.",
          ),
          teacherNotes: [
            c(
              "Live demo: deliberately open the active project after copying. Ask learners how they know it is the wrong one, then switch to the copy and run the old action.",
              "강사 시연: 복사한 뒤 일부러 활성 프로젝트를 연다. 잘못된 프로젝트라는 것을 어떻게 알 수 있는지 물은 뒤 복사본으로 바꾸어 기존 행동을 실행한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-break",
      role: "break",
      slides: [
        slide({
          id: "day4-04-break",
          stageId: "day4-break",
          layout: "run",
          minutes: 10,
          kicker: c("BREAK · 10 MINUTES", "휴식 · 10분"),
          title: c("Stop editing. Protect the baseline.", "편집을 멈추고 기준선을 보호하세요."),
          lead: c(
            "Close the active project and the start Save Point. Return ready to practice recovery.",
            "활성 프로젝트와 시작 저장 지점을 닫습니다. 복구 연습을 할 준비를 하고 돌아오세요.",
          ),
          takeaway: c("Return at 01:15.", "01:15에 돌아옵니다."),
          teacherNotes: [
            c(
              "Do not teach over the break. Give a one-minute return signal and prepare the intentional failure demo.",
              "휴식 중에는 강의하지 않는다. 종료 1분 전에 복귀 신호를 주고 의도적 실패 시연을 준비한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-recovery-paths",
      role: "learn",
      slides: [
        slide({
          id: "day4-05-recovery-question",
          stageId: "day4-recovery-paths",
          layout: "question",
          minutes: 2,
          kicker: c("STOP BEFORE ANOTHER EDIT", "다음 수정 전에 멈추기"),
          title: c(
            "The page goes blank after a change. What is the first safe move?",
            "변경 뒤 페이지가 빈 화면이 되었습니다. 가장 먼저 할 안전한 행동은 무엇일까요?",
          ),
          question: {
            prompt: c("Choose the first move.", "첫 행동을 고르세요."),
            options: [
              c("Send “fix it” three times.", "‘고쳐 줘’를 세 번 보낸다."),
              c(
                "Repeat the failing action and record Expected and Actual.",
                "실패한 행동을 반복하고 Expected와 Actual을 기록한다.",
              ),
              c("Ask for two new features.", "새 기능 두 개를 추가로 요청한다."),
            ],
            answer: c(
              "Repeat once and record the failure precisely.",
              "한 번 재현하고 실패를 정확히 기록합니다.",
            ),
            explanation: c(
              "A repeatable failure gives the next repair a target. More edits before diagnosis erase useful evidence.",
              "재현 가능한 실패는 다음 수정의 목표를 만듭니다. 진단 전 추가 수정은 유용한 증거를 지웁니다.",
            ),
          },
          takeaway: c(
            "STOP is an engineering action, not a sign of failure.",
            "STOP은 실패의 표시가 아니라 공학적 행동입니다.",
          ),
          teacherNotes: [
            c(
              "Require an Action, Expected, and Actual statement before accepting any recovery suggestion.",
              "복구 제안을 받기 전에 반드시 Action, Expected, Actual 문장을 말하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day4-05-recovery-demo",
          stageId: "day4-recovery-paths",
          layout: "demo",
          minutes: 3,
          kicker: c("WORKED EXAMPLE · NARROW THE FAILURE", "풀이 예시 · 실패 범위 좁히기"),
          title: c(
            "A useful report tells us what to repeat and what to preserve.",
            "유용한 오류 보고는 무엇을 반복하고 무엇을 지킬지 알려 줍니다.",
          ),
          items: [
            {
              label: c("EVIDENCE", "증거"),
              title: c("Precise failure", "정확한 실패"),
              body: c(
                "Action: click Add with “Water.” Expected: one item appears. Actual: nothing appears; the old Clear button still works.",
                "행동: ‘Water’를 입력하고 Add 클릭. 예상: 항목 하나가 나타남. 실제: 아무것도 나타나지 않음. 기존 Clear 버튼은 계속 작동함.",
              ),
              tone: "good",
            },
            {
              label: c("SMALL REPAIR", "작은 수정"),
              title: c("Inspect only the Add path", "Add 경로만 살피기"),
              body: c(
                "Ask for the first broken link in Event → handler → State → render → Screen. Keep Clear unchanged.",
                "Event → 처리 함수 → State → render → Screen에서 처음 끊긴 연결을 찾게 하고 Clear는 그대로 유지합니다.",
              ),
              tone: "good",
            },
            {
              label: c("COUNTEREXAMPLE", "반례"),
              title: c("“Rewrite the app so it works”", "‘앱이 작동하도록 다시 만들어 줘’"),
              body: c(
                "A rewrite can hide the original cause and break the working Clear path.",
                "전체 재작성은 원래 원인을 숨기고 작동하던 Clear 경로도 깨뜨릴 수 있습니다.",
              ),
              tone: "danger",
            },
          ],
          takeaway: c(
            "Repair the first broken link, then repeat the same test.",
            "처음 끊긴 연결만 고친 뒤 같은 테스트를 반복합니다.",
          ),
          teacherNotes: [
            c(
              "Live demo: disable the Add listener in a prepared copy. First model the vague request and reject it aloud; then write the precise report and inspect only the Add listener.",
              "강사 시연: 준비된 복사본에서 Add 리스너를 비활성화한다. 먼저 모호한 요청을 보여 주고 소리 내어 거절한 뒤, 정확한 오류 보고를 작성하고 Add 리스너만 살핀다.",
            ),
            c(
              "After repair, run both Add and Clear to model recovery plus regression.",
              "수정 뒤 Add와 Clear를 모두 실행하여 복구와 회귀 테스트를 함께 보여 준다.",
            ),
          ],
        }),
        slide({
          id: "day4-05-recovery-retrieval",
          stageId: "day4-recovery-paths",
          layout: "question",
          minutes: 1,
          kicker: c("RETRIEVE · CHOOSE A PATH", "회수 질문 · 복구 경로 고르기"),
          title: c(
            "The same clear failure remains after one narrow repair.",
            "작게 한 번 수정했지만 같은 분명한 실패가 남아 있습니다.",
          ),
          question: {
            prompt: c(
              "Which next move is justified?",
              "어떤 다음 행동이 근거가 있을까요?",
            ),
            options: [
              c(
                "Use a verified undo or restore the tested start Save Point.",
                "검증된 undo를 사용하거나 테스트한 시작 저장 지점으로 복구한다.",
              ),
              c("Keep sending the same prompt.", "같은 프롬프트를 계속 보낸다."),
              c("Add logging, login, and a database.", "로그, 로그인, 데이터베이스를 추가한다."),
            ],
            answer: c(
              "Use a verified recovery route, then repeat the baseline test.",
              "검증된 복구 경로를 사용한 뒤 기준선 테스트를 반복합니다.",
            ),
            explanation: c(
              "A recovery is complete only when observable behavior returns, not when files merely look older.",
              "파일이 이전처럼 보이는 것이 아니라 관찰 가능한 동작이 돌아와야 복구가 완료됩니다.",
            ),
          },
          takeaway: c(
            "Restore → open → test. Recovery also needs evidence.",
            "복원 → 열기 → 테스트. 복구에도 증거가 필요합니다.",
          ),
          teacherNotes: [
            c(
              "Mark undo as available only if it has been verified in today's actual tool. Otherwise require the tested Save Point.",
              "오늘 실제 도구에서 검증된 경우에만 undo를 사용할 수 있다고 표시한다. 그렇지 않으면 테스트한 저장 지점을 사용하게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-slice-approval",
      role: "learn",
      slides: [
        slide({
          id: "day4-06-gate-question",
          stageId: "day4-slice-approval",
          layout: "question",
          minutes: 1,
          kicker: c("SCOPE GATE", "범위 게이트"),
          title: c(
            "“Improve my project” is a goal, not a READY slice.",
            "‘프로젝트를 개선한다’는 목표이지 READY 조각이 아닙니다.",
          ),
          question: {
            prompt: c(
              "What is the smallest missing information?",
              "가장 먼저 빠진 정보는 무엇일까요?",
            ),
            options: [
              c("A user action and a visible result", "사용자 행동 하나와 눈에 보이는 결과 하나"),
              c("A new framework name", "새 프레임워크 이름"),
              c("A longer prompt", "더 긴 프롬프트"),
            ],
            answer: c(
              "A user action and a visible result",
              "사용자 행동 하나와 눈에 보이는 결과 하나",
            ),
            explanation: c(
              "Those two lines create a test. A framework or longer wording does not define success.",
              "두 문장이 있어야 테스트를 만들 수 있습니다. 프레임워크나 긴 문장은 성공을 정의하지 못합니다.",
            ),
          },
          takeaway: c(
            "Readiness begins with a test, not with implementation detail.",
            "READY 검수는 구현 방식이 아니라 테스트에서 시작합니다.",
          ),
          teacherNotes: [
            c(
              "Ask learners to turn the vague goal into one “When I…, I see…” sentence before continuing.",
              "다음으로 넘어가기 전에 모호한 목표를 ‘내가 …하면, …가 보인다’ 한 문장으로 바꾸게 한다.",
            ),
          ],
        }),
        slide({
          id: "day4-06-slice-anatomy",
          stageId: "day4-slice-approval",
          layout: "concept",
          minutes: 2,
          kicker: c("CORE MODEL · FIVE LINES", "핵심 모델 · 다섯 문장"),
          title: c(
            "A reviewable slice fits on one small card.",
            "검수 가능한 조각은 작은 카드 한 장에 들어갑니다.",
          ),
          items: [
            {
              label: c("1", "1"),
              title: c("MUST slice", "MUST 조각"),
              body: c("One part already chosen in the Day 3 plan.", "3일차 계획에서 이미 고른 부분 하나."),
            },
            {
              label: c("2–3", "2–3"),
              title: c("Action → visible result", "행동 → 눈에 보이는 결과"),
              body: c("The exact success test for today.", "오늘 실행할 정확한 성공 테스트."),
            },
            {
              label: c("4", "4"),
              title: c("Regression promise", "회귀 약속"),
              body: c("One old action that must still pass.", "계속 통과해야 할 기존 행동 하나."),
            },
            {
              label: c("5", "5"),
              title: c("Allowed files", "수정 허용 파일"),
              body: c("A boundary the plan can be checked against.", "계획을 검토할 수 있게 만드는 변경 경계."),
            },
          ],
          takeaway: c(
            "If one line is unknown, investigate before editing.",
            "한 문장이라도 모르면 수정 전에 먼저 조사합니다.",
          ),
          teacherNotes: [
            c(
              "Do not supply project ideas. Ask questions that help the learner make their own existing MUST item smaller.",
              "프로젝트 아이디어를 대신 제안하지 않는다. 학생이 이미 고른 MUST 항목을 더 작게 만들도록 질문한다.",
            ),
          ],
        }),
        slide({
          id: "day4-06-approval-demo",
          stageId: "day4-slice-approval",
          layout: "demo",
          minutes: 1,
          kicker: c("WORKED EXAMPLE · READY OR YELLOW", "풀이 예시 · READY 또는 YELLOW"),
          title: c(
            "Self-check, peer-check, then use Yellow only for a mismatch.",
            "자가검수, 짝검수 뒤 불일치에만 Yellow를 사용합니다.",
          ),
          items: [
            {
              label: c("READY", "READY"),
              title: c("Both reviewers can repeat the same test", "두 검수자가 같은 테스트를 반복할 수 있음"),
              body: c(
                "Self and peer both find: one action, one visible result, one regression test, a working start copy, and a bounded file list.",
                "본인과 짝 모두 행동 하나, 보이는 결과 하나, 회귀 테스트 하나, 작동하는 시작 복사본, 제한된 파일 목록을 확인합니다.",
              ),
              tone: "good",
            },
            {
              label: c("YELLOW", "YELLOW"),
              title: c("The peer cannot find the regression test", "짝이 회귀 테스트를 찾을 수 없음"),
              body: c(
                "Mark only the regression item Yellow. The teacher checks that item and asks how to protect one old action; the rest of the plan does not enter a queue.",
                "회귀 항목만 Yellow로 표시합니다. 강사는 그 항목만 확인하고 기존 행동 하나를 어떻게 지킬지 묻습니다. 나머지 계획은 승인 줄에 서지 않습니다.",
              ),
              tone: "warning",
            },
          ],
          question: {
            prompt: c(
              "Self-check passes, but the peer cannot identify an allowed file. What is the next status?",
              "자가검수는 통과했지만 짝이 수정 허용 파일을 찾을 수 없습니다. 다음 상태는 무엇일까요?",
            ),
            answer: c(
              "Yellow for the allowed-file item; ask the teacher to review only that mismatch.",
              "수정 허용 파일 항목만 Yellow로 표시하고 강사에게 그 불일치만 확인받습니다.",
            ),
            explanation: c(
              "Teacher attention goes to disagreement or help, while matching self/peer checks move directly to READY.",
              "강사 지원은 불일치나 도움 요청에 집중하고, 자가·짝 검수가 일치하면 바로 READY로 이동합니다.",
            ),
          },
          takeaway: c(
            "READY = self and peer agree the slice is testable, bounded, and reversible.",
            "READY = 본인과 짝 모두 조각이 시험 가능하고, 범위가 정해졌으며, 복구 가능하다고 확인한 상태.",
          ),
          teacherNotes: [
            c(
              "Model a 60-second self-check and peer-check. When one item disagrees, mark only that item Yellow and show a focused teacher question. Learners whose checks match do not wait for teacher approval.",
              "60초 자가검수와 짝검수를 시연한다. 한 항목이 다르면 그 항목만 Yellow로 표시하고 강사의 초점 질문을 보여 준다. 두 검수가 일치한 학생은 강사 승인을 기다리지 않는다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-project-studio",
      role: "build",
      slides: [
        slide({
          id: "day4-07-studio-loop",
          stageId: "day4-project-studio",
          layout: "studio",
          minutes: 3,
          kicker: c("STUDIO · ONE REVIEWED READY SLICE", "스튜디오 · 검수한 READY 조각 하나"),
          title: c(
            "Change one cause, then collect two results.",
            "원인 하나를 바꾸고 결과 두 가지를 수집합니다.",
          ),
          items: [
            {
              label: c("TELL + WATCH", "TELL + WATCH"),
              title: c("Plan before edit", "수정 전 계획"),
              body: c(
                "Name the reviewed READY slice, allowed files, success test, and regression test. Reject extra scope.",
                "검수한 READY 조각, 허용 파일, 성공 테스트, 회귀 테스트를 말합니다. 추가 범위는 거절합니다.",
              ),
            },
            {
              label: c("CHECK + FIX", "CHECK + FIX"),
              title: c("Run the browser", "브라우저 실행"),
              body: c(
                "If the new path fails, report one precise gap and repeat the same test.",
                "새 경로가 실패하면 정확한 차이 하나를 보고하고 같은 테스트를 반복합니다.",
              ),
            },
            {
              label: c("CHECK + SAVE", "CHECK + SAVE"),
              title: c("Protect both promises", "두 약속 보호"),
              body: c(
                "The new test and old test must pass in the active project and saved copy.",
                "새 테스트와 기존 테스트가 활성 프로젝트와 저장 복사본에서 모두 통과해야 합니다.",
              ),
            },
          ],
          takeaway: c(
            "No second slice until the first slice and regression evidence are complete.",
            "첫 조각과 회귀 증거가 완성되기 전에는 두 번째 조각을 시작하지 않습니다.",
          ),
          teacherNotes: [
            c(
              "Circulate by evidence state: first help learners who cannot reproduce the baseline, then plans without boundaries, then failed new tests.",
              "증거 상태를 기준으로 순회한다. 기준선을 재현하지 못한 학생, 경계 없는 계획, 새 테스트 실패 순으로 먼저 돕는다.",
            ),
          ],
        }),
        slide({
          id: "day4-07-regression-board",
          stageId: "day4-project-studio",
          layout: "worked-example",
          minutes: 2,
          kicker: c("VISIBLE EVIDENCE BOARD", "눈에 보이는 증거판"),
          title: c(
            "A green row needs Actual, not confidence.",
            "초록색 행에는 자신감이 아니라 Actual이 필요합니다.",
          ),
          items: [
            {
              label: c("NEW", "새 기능"),
              title: c("Filter test", "필터 테스트"),
              body: c(
                "Action: select Open. Expected: two open cards. Actual: two open cards. PASS.",
                "행동: Open 선택. 예상: 미완료 카드 2개. 실제: 미완료 카드 2개. PASS.",
              ),
              tone: "good",
            },
            {
              label: c("OLD", "기존 기능"),
              title: c("Add regression", "Add 회귀 테스트"),
              body: c(
                "Action: add “Water.” Expected: new card. Actual: no card. NOT YET.",
                "행동: ‘Water’ 추가. 예상: 새 카드. 실제: 카드 없음. NOT YET.",
              ),
              tone: "danger",
            },
            {
              label: c("DECISION", "판단"),
              title: c("Do not SAVE", "SAVE하지 않기"),
              body: c(
                "The new feature works, but the project is not a working version.",
                "새 기능은 작동하지만 프로젝트 전체는 작동 버전이 아닙니다.",
              ),
              tone: "warning",
            },
          ],
          question: {
            prompt: c(
              "What must happen before this row set becomes a Save Point?",
              "이 결과를 저장 지점으로 만들기 전에 무엇이 필요할까요?",
            ),
            answer: c(
              "Repair Add, then re-run both Filter and Add.",
              "Add를 고친 뒤 Filter와 Add를 모두 다시 실행합니다.",
            ),
            explanation: c(
              "A repair can affect the new path too, so both promises must be rechecked.",
              "수정이 새 경로에도 영향을 줄 수 있으므로 두 약속을 모두 다시 확인해야 합니다.",
            ),
          },
          takeaway: c(
            "One red regression blocks SAVE.",
            "회귀 테스트 하나라도 실패하면 SAVE할 수 없습니다.",
          ),
          teacherNotes: [
            c(
              "Pause the room halfway through the studio and ask everyone to point to one Actual result. Learners without one return to CHECK.",
              "스튜디오 중간에 전원을 잠시 멈추고 Actual 결과 하나를 가리키게 한다. Actual이 없는 학생은 CHECK로 돌아간다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day4-final-checkpoint",
      role: "share",
      slides: [
        slide({
          id: "day4-08-peer-proof",
          stageId: "day4-final-checkpoint",
          layout: "demo",
          minutes: 2,
          kicker: c("PEER PROOF · NO FILE-NAME CLAIMS", "짝 검증 · 파일명만 보여 주지 않기"),
          title: c(
            "Your partner runs the evidence path.",
            "짝이 직접 증거 경로를 실행합니다.",
          ),
          items: [
            {
              label: c("1", "1"),
              title: c("Open the saved copy", "저장 복사본 열기"),
              body: c("Confirm the path or folder name.", "경로나 폴더 이름을 확인합니다."),
            },
            {
              label: c("2", "2"),
              title: c("Run the new test", "새 테스트 실행"),
              body: c("Observe the reviewed visible result.", "검수한 눈에 보이는 결과를 관찰합니다."),
            },
            {
              label: c("3", "3"),
              title: c("Run the regression test", "회귀 테스트 실행"),
              body: c("Observe the old promise still working.", "기존 약속이 계속 작동하는지 관찰합니다."),
            },
            {
              label: c("4", "4"),
              title: c("Read the handoff", "인계 메모 읽기"),
              body: c("Find what works, the safe copy, and the next step.", "작동 상태, 안전한 복사본, 다음 단계를 찾습니다."),
            },
          ],
          takeaway: c(
            "A filename is a label. Running the path is evidence.",
            "파일명은 이름표일 뿐입니다. 경로를 실행한 결과가 증거입니다.",
          ),
          teacherNotes: [
            c(
              "Minutes 0–3: explain the evidence path and stop all editing. Minutes 3–7: the partner uses the mouse or keyboard to open the copy and run the new and regression tests; the owner records any failure without explaining it away.",
              "0–3분: 증거 경로를 안내하고 모든 편집을 멈춘다. 3–7분: 짝이 직접 마우스나 키보드로 복사본을 열고 새 테스트와 회귀 테스트를 실행하며, 제작자는 실패를 설명으로 덮지 않고 기록한다.",
            ),
          ],
        }),
        slide({
          id: "day4-08-exit-retrieval",
          stageId: "day4-final-checkpoint",
          layout: "summary",
          minutes: 1,
          kicker: c("DAY 4 · RETRIEVE", "4일차 · 회수"),
          title: c(
            "Explain your slice as a chain of evidence.",
            "내 조각을 증거의 사슬로 설명합니다.",
          ),
          items: [
            {
              label: c("MAP", "지도"),
              title: c("Which code role changed?", "어떤 코드 역할이 바뀌었나?"),
              body: c("HTML, CSS, JavaScript—or more than one with a reason.", "HTML, CSS, JavaScript 중 무엇인지, 둘 이상이면 그 이유."),
            },
            {
              label: c("TRACE", "추적"),
              title: c("Where does the action travel?", "행동은 어디를 지나가나?"),
              body: c(
                "Event → handler → State → render → Screen; add Storage load/save only when promised.",
                "Event → 처리 함수 → State → render → Screen, 약속한 경우에만 Storage 불러오기·저장 추가.",
              ),
            },
            {
              label: c("PROVE", "증명"),
              title: c("Which two tests pass?", "어떤 두 테스트가 통과했나?"),
              body: c("The new-slice test and one old-path regression test.", "새 조각 테스트와 기존 경로 회귀 테스트 하나."),
            },
            {
              label: c("RECOVER", "복구"),
              title: c("Where is the verified copy?", "검증된 복사본은 어디 있나?"),
              body: c("Name it and state the test run inside it.", "이름과 그 안에서 실행한 테스트를 말합니다."),
            },
          ],
          question: {
            prompt: c(
              "What is the first action on Day 5?",
              "5일차의 첫 행동은 무엇일까요?",
            ),
            answer: c(
              "Open the verified build and write Expected before running a test.",
              "검증된 작동본을 열고 테스트를 실행하기 전에 Expected부터 씁니다.",
            ),
            explanation: c(
              "Day 5 begins from a protected build and turns use into repeatable test evidence.",
              "5일차는 보호된 작동본에서 시작해 사용 경험을 반복 가능한 테스트 증거로 바꿉니다.",
            ),
          },
          takeaway: c(
            "Understand one link. Change one slice. Prove the new and old paths. Save the proof.",
            "연결 하나를 이해하고, 조각 하나를 바꾸고, 새 경로와 기존 경로를 증명하고, 그 증거를 저장합니다.",
          ),
          teacherNotes: [
            c(
              "Minutes 7–10: learners update the side signal, write the first Day 5 action, and submit the exit record. Retrieve the four evidence words with brief observable answers; do not start another AI request.",
              "7–10분: side signal을 갱신하고 5일차 첫 행동과 exit 기록을 제출하게 한다. 네 증거 항목은 관찰 가능한 짧은 답으로 회수하며 새 AI 요청은 시작하지 않는다.",
            ),
          ],
        }),
      ],
    },
  ],
};
