import { copy as c, type DayCourseware, type TeachingSlide } from "./types";

function slide(value: TeachingSlide): TeachingSlide {
  return value;
}

export const day6Courseware: DayCourseware = {
  day: 6,
  essentialQuestion: c(
    "What evidence makes a project ready to release, and what must the human still own?",
    "어떤 증거가 프로젝트의 출시 준비를 증명하며, 그 과정에서 사람이 끝까지 책임져야 할 것은 무엇일까?",
  ),
  stages: [
    {
      stageId: "day6-final-readiness",
      role: "learn",
      slides: [
        slide({
          id: "day6-00-readiness-evidence",
          stageId: "day6-final-readiness",
          layout: "concept",
          minutes: 2,
          kicker: c("RELEASE READINESS", "출시 준비"),
          title: c(
            "“Ready” is a claim until the whole path works twice.",
            "전체 경로가 두 번 작동하기 전까지 “준비 완료”는 주장일 뿐입니다.",
          ),
          lead: c(
            "A release candidate is an exact version that completes the important user path repeatedly, without exposing private data.",
            "출시 후보는 중요한 사용자 경로를 반복해서 완료하고 개인정보를 노출하지 않는, 정확히 식별된 버전입니다.",
          ),
          items: [
            {
              label: c("IDENTITY", "버전 식별"),
              title: c("Name the exact artifact", "정확한 결과물 지정"),
              body: c(
                "Record the file or folder you are testing. “My latest one” cannot be reproduced.",
                "테스트할 파일이나 폴더를 기록합니다. “가장 최신 것”이라는 말만으로는 재현할 수 없습니다.",
              ),
            },
            {
              label: c("PATH", "핵심 경로"),
              title: c("Start with a user action", "사용자 행동에서 시작"),
              body: c(
                "Open, click or enter, then name the visible result that proves the core promise.",
                "열고, 누르거나 입력한 뒤, 핵심 약속이 지켜졌음을 보여 주는 화면 결과를 확인합니다.",
              ),
            },
            {
              label: c("REPEAT", "반복"),
              title: c("Refresh and run it again", "새로고침 후 다시 실행"),
              body: c(
                "The second run catches hidden state, stale data, and lucky first attempts.",
                "두 번째 실행은 숨은 상태, 남아 있던 데이터, 우연히 성공한 첫 실행을 찾아냅니다.",
              ),
            },
            {
              label: c("SAFETY", "안전"),
              title: c("Inspect what leaves the room", "공개될 내용을 점검"),
              body: c(
                "Remove secret keys, private names, personal accounts, and unintended files before presentation.",
                "발표 전에 비밀 키, 실제 이름, 개인 계정, 의도하지 않은 파일을 제거합니다.",
              ),
              tone: "warning",
            },
          ],
          question: {
            prompt: c(
              "The newest version has one extra feature but fails after refresh. The Day 5 candidate completes the core path twice. Which one is release-ready?",
              "최신 버전에는 기능이 하나 더 있지만 새로고침 후 실패합니다. 5일차 후보는 핵심 경로를 두 번 완료합니다. 어느 쪽이 출시 준비가 되었을까요?",
            ),
            options: [
              c("A. The newest version", "A. 가장 최신 버전"),
              c("B. The verified Day 5 candidate", "B. 검증된 5일차 후보"),
            ],
            answer: c(
              "B — the verified Day 5 candidate",
              "B — 검증된 5일차 후보",
            ),
            explanation: c(
              "Release readiness rewards repeatable evidence, not recency or feature count.",
              "출시 준비는 최신 여부나 기능 수가 아니라 반복 가능한 증거로 판단합니다.",
            ),
          },
          takeaway: c(
            "Ready = exact version + complete path + repeatable result + safe content.",
            "준비 완료 = 정확한 버전 + 완전한 경로 + 반복 가능한 결과 + 안전한 내용.",
          ),
          teacherNotes: [
            c(
              "Collect votes before revealing the answer. Ask one learner who chose the newest version what risk they were willing to accept.",
              "정답 공개 전에 투표를 받는다. 최신 버전을 고른 학생 한 명에게 어떤 위험을 감수한 선택인지 묻는다.",
            ),
            c(
              "Emphasize that a polished screen is not proof of the path behind it.",
              "화면이 세련되어 보이는 것만으로 그 뒤의 경로가 작동한다는 증거가 되지 않음을 강조한다.",
            ),
          ],
        }),
        slide({
          id: "day6-00-candidate-comparison",
          stageId: "day6-final-readiness",
          layout: "worked-example",
          minutes: 2,
          kicker: c("WORKED EXAMPLE · THREE CANDIDATES", "사례 · 세 가지 후보"),
          title: c(
            "Choose the version with the strongest evidence, not the strongest story.",
            "설명이 가장 그럴듯한 버전이 아니라 증거가 가장 강한 버전을 고릅니다.",
          ),
          items: [
            {
              label: c("CANDIDATE A", "후보 A"),
              title: c("New and polished", "새롭고 보기 좋음"),
              body: c(
                "The new layout looks better. The save action worked once, then failed after refresh. Cause unknown.",
                "새 레이아웃이 더 보기 좋습니다. 저장은 한 번 성공했지만 새로고침 후 실패했습니다. 원인은 모릅니다.",
              ),
              tone: "warning",
            },
            {
              label: c("CANDIDATE B", "후보 B"),
              title: c("Older and verified", "이전 버전이지만 검증됨"),
              body: c(
                "The core path passed twice from a clean start. One known limitation is written down.",
                "빈 상태에서 핵심 경로가 두 번 통과했습니다. 알려진 한계 하나도 기록했습니다.",
              ),
              tone: "good",
            },
            {
              label: c("CANDIDATE C", "후보 C"),
              title: c("A perfect screenshot", "완벽한 스크린샷"),
              body: c(
                "The screen looks complete, but nobody can click it or repeat the test.",
                "화면은 완성되어 보이지만 누구도 직접 눌러 보거나 테스트를 반복할 수 없습니다.",
              ),
              tone: "danger",
            },
          ],
          question: {
            prompt: c(
              "What essential evidence is missing from Candidate C?",
              "후보 C에 빠진 핵심 증거는 무엇인가요?",
            ),
            answer: c(
              "A reproducible action and its observed result",
              "다시 실행할 수 있는 행동과 그 행동에서 관찰된 결과",
            ),
            explanation: c(
              "A screenshot can support a claim about appearance, but it cannot prove that an interaction works.",
              "스크린샷은 화면 모양에 대한 주장은 뒷받침할 수 있지만 상호작용이 작동한다는 사실은 증명하지 못합니다.",
            ),
          },
          takeaway: c(
            "A known limitation is safer than an unknown failure.",
            "알고 있는 한계는 원인을 모르는 실패보다 안전합니다.",
          ),
          teacherNotes: [
            c(
              "Reveal the candidates one at a time. Have learners state what each candidate proves and what it does not prove.",
              "후보를 하나씩 공개한다. 각 후보가 무엇을 증명하고 무엇은 증명하지 못하는지 학생이 말하게 한다.",
            ),
            c(
              "Do not describe Candidate B as perfect. Its strength is that its limitation is known and bounded.",
              "후보 B를 완벽하다고 설명하지 않는다. 한계를 알고 있고 범위가 정해져 있다는 점이 강점이다.",
            ),
          ],
        }),
        slide({
          id: "day6-00-readiness-demo",
          stageId: "day6-final-readiness",
          layout: "demo",
          minutes: 3,
          kicker: c("TEACHER DEMO · 90-SECOND GATE", "강사 시연 · 90초 출시 판정"),
          title: c(
            "Say the evidence while you produce it.",
            "증거를 만들어 내는 동안 무엇을 확인하는지 말합니다.",
          ),
          lead: c(
            "The teacher runs the path once, checks the project's stated refresh behavior, then runs the path with a second sample without changing code.",
            "강사가 경로를 한 번 실행하고 프로젝트가 약속한 새로고침 동작을 확인한 뒤, 코드를 바꾸지 않고 두 번째 샘플로 경로를 다시 실행합니다.",
          ),
          code: c(
            `Version: day5-release-candidate
Open: index.html
Action: enter “Sample A” and click Add
Expected: one row labeled “Sample A” appears
Actual: one row appeared

Refresh.
Refresh expectation: Sample A remains because this project promises persistence
Actual after refresh: Sample A remains

Second run: enter “Sample B” and click Add
Expected: one new row labeled “Sample B” appears
Actual: Sample B appeared once
Result: PASS

Known limit: blank input has no message
Decision: release this version; record the limit`,
            `버전: day5-release-candidate
열기: index.html
행동: “Sample A”를 입력하고 Add 누르기
예상: “Sample A” 행 하나가 나타남
실제: 행 하나가 나타남

새로고침.
새로고침 예상: 이 프로젝트는 지속 저장을 약속하므로 Sample A가 남음
새로고침 실제: Sample A가 남아 있음

두 번째 실행: “Sample B”를 입력하고 Add 누르기
예상: “Sample B” 새 행 하나가 나타남
실제: Sample B가 한 번 나타남
결과: 통과

알려진 한계: 빈 입력에 안내 문구가 없음
결정: 이 버전을 발표하고 한계를 기록`,
          ),
          question: {
            prompt: c(
              "Which sentence lets another person reproduce this test?",
              "다른 사람이 이 테스트를 다시 실행할 수 있게 하는 문장은 무엇인가요?",
            ),
            answer: c(
              "The exact version, action, and expected visible result",
              "정확한 버전, 실행할 행동, 예상되는 화면 결과",
            ),
            explanation: c(
              "“It works” cannot be repeated. A named artifact and action-result path can.",
              "“작동합니다”라는 말은 반복할 수 없습니다. 이름이 있는 결과물과 행동-결과 경로는 반복할 수 있습니다.",
            ),
          },
          takeaway: c(
            "Release readiness is a short demonstration that another person could repeat.",
            "출시 준비 증거는 다른 사람이 반복할 수 있는 짧은 시연입니다.",
          ),
          teacherNotes: [
            c(
              "Use a neutral sample project. State its storage promise before refresh. If persistence is not promised, the correct post-refresh expectation is a clean state. Use Sample B for the second run so saved Sample A cannot create a false duplicate failure.",
              "중립적인 예제 프로젝트를 사용한다. 새로고침 전에 저장 약속을 말한다. 지속 저장을 약속하지 않았다면 깨끗한 상태로 돌아오는 것이 올바른 예상이다. 두 번째 실행에는 Sample B를 사용하여 저장된 Sample A 때문에 중복 실패가 생기지 않게 한다.",
            ),
            c(
              "After the demo, hide the script and ask the class to reconstruct Version, Action, Expected, and Actual.",
              "시연 후 대본을 가리고 학생들이 버전, 행동, 예상, 실제를 다시 말하게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day6-last-blocker",
      role: "build",
      slides: [
        slide({
          id: "day6-01-blocker-definition",
          stageId: "day6-last-blocker",
          layout: "concept",
          minutes: 2,
          kicker: c("THE LAST CHANGE", "마지막 변경"),
          title: c(
            "A final blocker prevents the required evidence.",
            "마지막 장애물은 필요한 증거를 만들지 못하게 하는 문제입니다.",
          ),
          lead: c(
            "At this point, a change is allowed only when the demo cannot show an existing MUST result without it.",
            "이 시점에는 수정하지 않으면 기존 필수 결과를 시연할 수 없을 때만 변경을 허용합니다.",
          ),
          items: [
            {
              label: c("1 · REPEATABLE", "1 · 반복 가능"),
              title: c("Can we make it fail again?", "같은 실패를 다시 만들 수 있는가?"),
              body: c(
                "If the failure cannot be reproduced, changing code is guessing.",
                "실패를 재현할 수 없다면 코드 변경은 추측에 불과합니다.",
              ),
            },
            {
              label: c("2 · BLOCKING", "2 · 시연 차단"),
              title: c("Does it stop a MUST path?", "필수 경로를 막는가?"),
              body: c(
                "Cosmetic discomfort and new ideas are not final blockers.",
                "마음에 들지 않는 모양이나 새로운 아이디어는 마지막 장애물이 아닙니다.",
              ),
            },
            {
              label: c("3 · BOUNDED", "3 · 범위 제한"),
              title: c("Is one small cause testable?", "작은 원인 하나를 시험할 수 있는가?"),
              body: c(
                "The change must name one behavior and preserve every working MUST feature.",
                "변경은 동작 하나를 지정하고 이미 작동하는 모든 필수 기능을 보존해야 합니다.",
              ),
            },
            {
              label: c("4 · REVERSIBLE", "4 · 복구 가능"),
              title: c("Can we return immediately?", "즉시 이전 상태로 돌아갈 수 있는가?"),
              body: c(
                "A verified candidate must remain untouched while the fix is tested elsewhere.",
                "검증된 후보는 그대로 보존하고 다른 복사본에서 수정을 시험해야 합니다.",
              ),
            },
          ],
          question: {
            prompt: c(
              "Which problem passes the blocker gate?",
              "다음 중 마지막 장애물 기준을 통과하는 문제는 무엇인가요?",
            ),
            options: [
              c("A. The colors do not feel modern.", "A. 색상이 세련되어 보이지 않는다."),
              c(
                "B. Clicking Save never shows the required saved result.",
                "B. Save를 눌러도 필수 저장 결과가 나타나지 않는다.",
              ),
              c("C. It would be nice to add login.", "C. 로그인을 추가하면 좋겠다."),
            ],
            answer: c("B — it blocks an existing MUST result", "B — 기존 필수 결과를 막기 때문"),
            explanation: c(
              "A and C may be future work. B is repeatable, blocks the demo, and can be tested with one action.",
              "A와 C는 다음 작업이 될 수 있습니다. B는 반복 가능하고 시연을 막으며 한 가지 행동으로 시험할 수 있습니다.",
            ),
          },
          takeaway: c(
            "Final change criteria: one reproducible blocker, one bounded test, and one verified rollback.",
            "마지막 변경 기준: 재현 가능한 장애물 하나, 범위가 정해진 테스트 하나, 검증된 복구안 하나.",
          ),
          teacherNotes: [
            c(
              "Read each option without signaling the answer. Ask learners to defend the option with evidence, not preference.",
              "정답을 암시하지 말고 각 선택지를 읽는다. 취향이 아니라 증거로 선택을 설명하게 한다.",
            ),
            c(
              "Clarify that a text problem can be a blocker when the user cannot understand the required action; appearance alone is not.",
              "사용자가 필수 행동을 이해하지 못하는 문구 문제는 장애물일 수 있지만, 단순한 미관 문제는 아니라는 경계를 설명한다.",
            ),
          ],
        }),
        slide({
          id: "day6-01-fix-or-polish",
          stageId: "day6-last-blocker",
          layout: "worked-example",
          minutes: 2,
          kicker: c("EXAMPLE AND COUNTEREXAMPLE", "예시와 반례"),
          title: c(
            "The same ten minutes can improve or weaken release evidence.",
            "같은 10분이라도 출시 증거를 더 강하게 만들거나 약하게 만들 수 있습니다.",
          ),
          items: [
            {
              label: c("APPROVE", "승인"),
              title: c("Save fails after refresh", "새로고침 후 저장 실패"),
              body: c(
                "Action: refresh, enter one item, click Save. Actual: nothing appears. Expected: one saved row. Scope: inspect and fix only the Save handler.",
                "행동: 새로고침, 항목 하나 입력, Save 누르기. 실제: 아무것도 나타나지 않음. 예상: 저장 행 하나. 범위: Save 처리 부분만 확인하고 수정.",
              ),
              tone: "good",
            },
            {
              label: c("REJECT", "거절"),
              title: c("Make the whole interface professional", "전체 화면을 전문적으로 재설계"),
              body: c(
                "There is no single failing action, no bounded acceptance test, and many working parts may change.",
                "실패하는 행동 하나가 없고, 범위가 정해진 통과 테스트도 없으며, 이미 작동하는 여러 부분이 바뀔 수 있습니다.",
              ),
              tone: "danger",
            },
            {
              label: c("INVESTIGATE FIRST", "먼저 확인"),
              title: c("It felt slow once", "한 번 느리게 느껴짐"),
              body: c(
                "Repeat the same start and action. If the delay cannot be measured or reproduced, do not edit.",
                "같은 시작과 행동을 반복합니다. 지연을 측정하거나 재현할 수 없으면 수정하지 않습니다.",
              ),
              tone: "warning",
            },
          ],
          question: {
            prompt: c(
              "A blank label makes users click the wrong required button. Is that only cosmetic?",
              "빈 라벨 때문에 사용자가 필수 버튼을 잘못 누릅니다. 이것은 단순한 미관 문제일까요?",
            ),
            answer: c(
              "No — it blocks the required path and can be tested",
              "아니요 — 필수 경로를 막고 행동으로 시험할 수 있습니다",
            ),
            explanation: c(
              "Classify by impact on the user path, not by whether the change involves text, style, or code.",
              "텍스트·스타일·코드 중 무엇을 바꾸는지가 아니라 사용자 경로에 미치는 영향으로 분류합니다.",
            ),
          },
          takeaway: c(
            "A blocker is defined by user-path impact, not by technical category.",
            "장애물은 기술 분류가 아니라 사용자 경로에 미치는 영향으로 정의합니다.",
          ),
          teacherNotes: [
            c(
              "Have learners rewrite the rejected request as a future Next Step instead of treating it as a bad idea.",
              "거절된 요청을 나쁜 아이디어로 취급하지 말고 향후 작업 항목으로 다시 쓰게 한다.",
            ),
            c(
              "Ask what regression test is required after the approved Save fix: the entire demo path, not only Save.",
              "승인된 Save 수정 뒤 필요한 회귀 테스트가 무엇인지 묻는다. Save만이 아니라 전체 데모 경로가 답이다.",
            ),
          ],
        }),
        slide({
          id: "day6-01-blocker-demo",
          stageId: "day6-last-blocker",
          layout: "demo",
          minutes: 2,
          kicker: c("TEACHER DEMO · FIX OR RESTORE", "강사 시연 · 수정 또는 복구"),
          title: c(
            "A final fix has a stop condition before it begins.",
            "마지막 수정은 시작하기 전에 중단 조건부터 정합니다.",
          ),
          lead: c(
            "The teacher works in a copy, requests one change, re-tests the blocker, then runs the whole path—or restores immediately.",
            "강사는 복사본에서 한 가지 변경만 요청하고, 장애물 테스트 뒤 전체 경로를 실행합니다. 통과하지 못하면 즉시 복구합니다.",
          ),
          code: c(
            `Final blocker
Action: refresh → enter “Sample A” → click Save
Actual: no saved row appears
Expected: one saved row appears

Change boundary
Fix only the Save behavior.
Do not add files, libraries, redesign, or new features.
Keep the verified candidate unchanged.

Stop condition
If the blocker test or any MUST path fails after one attempt,
restore the verified candidate and present its known limitation.`,
            `마지막 장애물
행동: 새로고침 → “Sample A” 입력 → Save 누르기
실제: 저장된 행이 나타나지 않음
예상: 저장된 행 하나가 나타남

변경 경계
Save 동작만 수정.
파일, 라이브러리, 재설계, 새 기능을 추가하지 않음.
검증된 후보는 그대로 보존.

중단 조건
한 번의 시도 뒤 장애물 테스트나 필수 경로 하나라도 실패하면,
검증된 후보로 복구하고 알려진 한계를 설명.`,
          ),
          question: {
            prompt: c(
              "The blocker test passes, but the original Add action now fails. Do we freeze the fix?",
              "장애물 테스트는 통과했지만 원래의 Add 동작이 실패합니다. 수정본을 동결할까요?",
            ),
            answer: c("No — restore the verified candidate", "아니요 — 검증된 후보로 복구합니다"),
            explanation: c(
              "A local fix is not a release improvement when it breaks an existing promise.",
              "부분 수정이 기존 약속을 깨뜨린다면 출시 품질을 높인 것이 아닙니다.",
            ),
          },
          takeaway: c(
            "The safe outcome may be “no change” or “restore.” Both are engineering decisions.",
            "안전한 결론은 “변경 없음”이나 “복구”일 수 있습니다. 둘 다 공학적 판단입니다.",
          ),
          teacherNotes: [
            c(
              "Model one intentional regression. Say the stop condition aloud, restore the candidate, and re-run the core path.",
              "의도적으로 회귀 오류 하나를 만든다. 중단 조건을 소리 내어 말하고 후보를 복구한 뒤 핵심 경로를 다시 실행한다.",
            ),
            c(
              "Do not rescue the failed fix with a second unplanned prompt; the point is disciplined stopping.",
              "계획하지 않은 두 번째 프롬프트로 실패한 수정을 살리려 하지 않는다. 핵심은 규칙에 따라 멈추는 판단이다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day6-code-freeze",
      role: "build",
      slides: [
        slide({
          id: "day6-02-freeze-tradeoff",
          stageId: "day6-code-freeze",
          layout: "compare",
          minutes: 1,
          kicker: c("CODE FREEZE · THE TRADEOFF", "코드 동결 · 선택의 대가"),
          title: c(
            "After strong evidence, change has asymmetric risk.",
            "증거가 충분해진 뒤에는 변경의 위험과 이익이 대칭적이지 않습니다.",
          ),
          lead: c(
            "A small visual improvement has limited value, but a late regression can remove the evidence for the entire demo.",
            "작은 시각 개선의 이익은 제한적이지만, 막판 회귀 오류는 전체 시연의 증거를 없앨 수 있습니다.",
          ),
          items: [
            {
              label: c("BEFORE FREEZE", "동결 전"),
              title: c("Learn through bounded change", "경계가 있는 변경으로 학습"),
              body: c(
                "There is time to predict, test, compare, and recover. A small change may teach something useful.",
                "예측하고 시험하고 비교하고 복구할 시간이 있습니다. 작은 변경이 유용한 학습이 될 수 있습니다.",
              ),
            },
            {
              label: c("AFTER FREEZE", "동결 후"),
              title: c("Protect the verified artifact", "검증된 결과물 보호"),
              body: c(
                "New code can create a regression, missing dependency, cache mismatch, or a file that was never tested.",
                "새 코드는 회귀 오류, 누락된 의존성, 캐시 불일치, 테스트하지 않은 파일을 만들 수 있습니다.",
              ),
              tone: "warning",
            },
            {
              label: c("NEXT STEP", "다음 단계"),
              title: c("Ideas are deferred, not deleted", "아이디어는 삭제하지 않고 연기"),
              body: c(
                "Record the idea, the user benefit, and the first test for the next version.",
                "아이디어, 사용자 이점, 다음 버전에서 먼저 실행할 테스트를 기록합니다.",
              ),
              tone: "good",
            },
          ],
          question: {
            prompt: c(
              "After freeze, AI offers a one-click redesign that “should not affect behavior.” Do you accept it?",
              "동결 뒤 AI가 “동작에는 영향이 없을 것”이라며 한 번에 재설계하자고 제안합니다. 받아들일까요?",
            ),
            answer: c("No — record it as a Next Step", "아니요 — 다음 단계로 기록합니다"),
            explanation: c(
              "“Should not” is a prediction. The verified artifact is evidence, and there is no longer enough test-and-recovery time.",
              "“영향이 없을 것”은 예측입니다. 검증된 결과물은 증거이며, 이제 충분히 시험하고 복구할 시간이 없습니다.",
            ),
          },
          takeaway: c(
            "Freeze does not mean the product is perfect. It means this version is known.",
            "동결은 제품이 완벽하다는 뜻이 아니라, 이 버전의 상태를 알고 있다는 뜻입니다.",
          ),
          teacherNotes: [
            c(
              "Draw a simple balance: small possible improvement on one side, loss of verified evidence on the other.",
              "한쪽에는 작은 개선 가능성, 다른 쪽에는 검증된 증거 전체의 상실을 놓고 간단한 저울을 그린다.",
            ),
            c(
              "Invite one attractive late idea from the room and model converting it into a bounded Next Step.",
              "학생에게 매력적인 막판 아이디어 하나를 받고, 그것을 범위가 정해진 다음 단계로 바꾸는 과정을 보여 준다.",
            ),
          ],
        }),
        slide({
          id: "day6-02-freeze-protocol",
          stageId: "day6-code-freeze",
          layout: "run",
          minutes: 2,
          kicker: c("CLASS OPERATION · FREEZE PROTOCOL", "수업 운영 · 동결 절차"),
          title: c(
            "The copy is not the backup until the copy passes.",
            "복사본에서 테스트가 통과하기 전까지는 백업이 아닙니다.",
          ),
          items: [
            {
              label: c("DECLARE", "선언"),
              title: c("Name the candidate", "후보 이름 지정"),
              body: c(
                "Say and record the exact source file or folder before copying it.",
                "복사하기 전에 원본 파일이나 폴더의 정확한 이름을 말하고 기록합니다.",
              ),
            },
            {
              label: c("COPY", "복사"),
              title: c("Create the final artifact", "최종 결과물 생성"),
              body: c(
                "Use a clear final name. Keep the verified source untouched.",
                "최종본임을 알 수 있는 이름을 사용하고 검증된 원본은 그대로 둡니다.",
              ),
            },
            {
              label: c("PROVE", "검증"),
              title: c("Open the copy itself", "복사본 자체를 열기"),
              body: c(
                "Run the complete path from the copied artifact. Testing the source does not verify the backup.",
                "복사된 결과물에서 전체 경로를 실행합니다. 원본 테스트는 백업 검증이 아닙니다.",
              ),
            },
            {
              label: c("HOLD", "유지"),
              title: c("Stop code-changing prompts", "코드 변경 프롬프트 중단"),
              body: c(
                "Keep new ideas in notes. The frozen artifact changes only through an explicit recovery decision.",
                "새 아이디어는 메모에 남깁니다. 동결된 결과물은 명시적인 복구 결정 없이는 바꾸지 않습니다.",
              ),
            },
          ],
          question: {
            prompt: c(
              "What exactly is frozen: the clock, the idea, or the verified artifact?",
              "정확히 무엇을 동결하는 것인가요? 시간, 아이디어, 아니면 검증된 결과물인가요?",
            ),
            answer: c("The exact verified artifact", "정확히 지정된 검증 완료 결과물"),
            explanation: c(
              "Ideas can continue and time can pass. The release artifact stays unchanged so its evidence remains valid.",
              "아이디어는 계속 생길 수 있고 시간도 흐릅니다. 증거가 유효하도록 출시 결과물만 변경하지 않습니다.",
            ),
          },
          takeaway: c(
            "Copy → open the copy → run the path → declare freeze.",
            "복사 → 복사본 열기 → 경로 실행 → 동결 선언.",
          ),
          teacherNotes: [
            c(
              "Announce one room-wide freeze time. Ask learners to hold up or name the exact final artifact only after its own test passes.",
              "전체 수업의 동결 시각을 하나로 선언한다. 복사본 자체의 테스트가 통과한 뒤에만 정확한 최종 결과물을 표시하거나 말하게 한다.",
            ),
            c(
              "This is class operation, not a scored checkbox. Help learners who cannot open the copy before moving on.",
              "이 단계는 점수용 체크리스트가 아니라 수업 운영이다. 복사본을 열지 못한 학생을 해결한 뒤 다음으로 넘어간다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day6-break",
      role: "break",
      slides: [
        slide({
          id: "day6-03-break-protects-performance",
          stageId: "day6-break",
          layout: "run",
          minutes: 10,
          kicker: c("BREAK · RELIABILITY CONTROL", "휴식 · 수행 안정성"),
          title: c(
            "Take a real break, then return to the frozen artifact.",
            "실제로 쉰 뒤 동결된 결과물로 돌아옵니다.",
          ),
          lead: c(
            "The artifact is frozen. Step away from code, water and stretch, then return to a clean presentation screen.",
            "결과물은 동결되었습니다. 코드에서 손을 떼고 물을 마시고 몸을 움직인 뒤, 정리된 발표 화면으로 돌아옵니다.",
          ),
          items: [
            {
              label: c("PROTECT", "보호"),
              title: c("Leave the final artifact unchanged", "최종 결과물 변경 금지"),
              body: c(
                "Do not use the break for one last AI request or visual edit.",
                "휴식 시간을 마지막 AI 요청이나 시각 수정에 사용하지 않습니다.",
              ),
              tone: "warning",
            },
            {
              label: c("PRIVACY", "개인정보"),
              title: c("Close private surfaces", "개인 화면 닫기"),
              body: c(
                "Close messages, accounts, unrelated tabs, and notifications before screen sharing.",
                "화면 공유 전에 메시지, 계정, 관계없는 탭, 알림을 닫습니다.",
              ),
            },
            {
              label: c("RESET", "회복"),
              title: c("Take an actual break", "실제로 쉬기"),
              body: c(
                "Stand, stretch, drink water, and let your attention reset. Rehearsal begins after the break.",
                "일어나 몸을 움직이고 물을 마시며 집중력을 회복합니다. 리허설은 휴식 뒤에 시작합니다.",
              ),
              tone: "good",
            },
          ],
          question: {
            prompt: c(
              "Can the break be used for a harmless-looking text change?",
              "해가 없어 보이는 문구 수정이라면 휴식 중에 해도 될까요?",
            ),
            answer: c("No — the artifact is already frozen", "아니요 — 결과물은 이미 동결되었습니다"),
            explanation: c(
              "Even a text edit can target the wrong file, change layout, or invalidate the tested copy.",
              "문구 수정도 잘못된 파일을 건드리거나 레이아웃을 바꾸고 검증된 복사본의 증거를 무효로 만들 수 있습니다.",
            ),
          },
          takeaway: c(
            "Protect the artifact, protect privacy, restore attention.",
            "결과물을 보호하고, 개인정보를 보호하고, 집중력을 회복합니다.",
          ),
          teacherNotes: [
            c(
              "Keep this as a real break. The instructor, not the learners, checks cables, display mode, and the presentation queue.",
              "이 시간을 실제 휴식으로 보장한다. 케이블, 화면 모드, 발표 순서는 학생이 아니라 강사가 확인한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day6-partner-rehearsal",
      role: "build",
      slides: [
        slide({
          id: "day6-04-demo-argument",
          stageId: "day6-partner-rehearsal",
          layout: "concept",
          minutes: 2,
          kicker: c("THE TWO-MINUTE DEMO", "2분 데모"),
          title: c(
            "A demo is an argument made with visible evidence.",
            "데모는 눈에 보이는 증거로 펼치는 주장입니다.",
          ),
          lead: c(
            "The audience should understand who the result helps, watch the core promise happen, hear how it was tested, and know one honest limit.",
            "청중은 누구를 위한 결과인지 이해하고, 핵심 약속이 작동하는 모습을 보고, 어떻게 테스트했는지 들으며, 솔직한 한계 하나를 알아야 합니다.",
          ),
          items: [
            {
              label: c("0:00–0:20", "0:00–0:20"),
              title: c("User and problem", "사용자와 문제"),
              body: c(
                "One person, one situation, one problem. Do not begin with tools or code.",
                "한 사람, 한 상황, 한 문제만 말합니다. 도구나 코드 설명으로 시작하지 않습니다.",
              ),
            },
            {
              label: c("0:20–1:20", "0:20–1:20"),
              title: c("Working MUST evidence", "작동하는 필수 증거"),
              body: c(
                "Perform the shortest action-result path. Let the audience see the result before you explain it.",
                "가장 짧은 행동-결과 경로를 실행합니다. 설명보다 먼저 청중이 결과를 보게 합니다.",
              ),
              tone: "good",
            },
            {
              label: c("1:20–1:45", "1:20–1:45"),
              title: c("Test and learning", "테스트와 배움"),
              body: c(
                "Name one expected result, one observed result, and one decision that followed.",
                "예상 결과 하나, 관찰 결과 하나, 그 뒤 내린 결정 하나를 말합니다.",
              ),
            },
            {
              label: c("1:45–2:00", "1:45–2:00"),
              title: c("Limit and next step", "한계와 다음 단계"),
              body: c(
                "State one real boundary and the first test for a future improvement.",
                "실제 한계 하나와 향후 개선에서 먼저 할 테스트를 말합니다.",
              ),
            },
          ],
          question: {
            prompt: c(
              "Which section deserves the most time?",
              "어느 구간에 가장 많은 시간을 써야 할까요?",
            ),
            answer: c("The working action-result evidence", "작동하는 행동-결과 증거"),
            explanation: c(
              "The central claim is that the result works. The longest section must produce evidence for that claim.",
              "발표의 중심 주장은 결과물이 작동한다는 것입니다. 가장 긴 구간은 그 주장의 증거를 만들어야 합니다.",
            ),
          },
          takeaway: c(
            "Context briefly. Evidence visibly. Learning honestly.",
            "맥락은 짧게, 증거는 눈에 보이게, 배움은 솔직하게.",
          ),
          teacherNotes: [
            c(
              "Ask learners to point at the screen during the evidence minute and put their hands down during the opening. This makes the change from claim to evidence physical.",
              "증거 1분에는 화면을 가리키게 하고 도입에서는 손을 내리게 한다. 주장과 증거의 전환을 몸으로 구분하게 한다.",
            ),
            c(
              "Allow notes in either language. Evaluate the visible path and reasoning, not English fluency.",
              "메모는 어느 언어로 작성해도 허용한다. 영어 유창성이 아니라 보이는 경로와 판단을 평가한다.",
            ),
          ],
        }),
        slide({
          id: "day6-04-weak-strong-demo",
          stageId: "day6-partner-rehearsal",
          layout: "compare",
          minutes: 2,
          kicker: c("WEAK CLAIM · STRONG EVIDENCE", "약한 주장 · 강한 증거"),
          title: c(
            "Completion is not how much you say. It is what the audience can verify.",
            "완성도는 말을 얼마나 많이 하는지가 아니라 청중이 무엇을 확인할 수 있는지로 판단합니다.",
          ),
          items: [
            {
              label: c("WEAK", "약한 데모"),
              title: c("“I made many features with AI.”", "“AI로 기능을 많이 만들었습니다.”"),
              body: c(
                "The presenter scrolls through screens, names tools, and says everything works. No user action reaches a visible result. The limitation is hidden.",
                "발표자는 여러 화면을 넘기고 도구 이름을 말하며 모두 작동한다고 설명합니다. 사용자 행동이 보이는 결과까지 이어지지 않고 한계도 숨깁니다.",
              ),
              tone: "danger",
            },
            {
              label: c("STRONG", "강한 데모"),
              title: c("“Watch this one promise happen.”", "“이 한 가지 약속이 작동하는 모습을 보세요.”"),
              body: c(
                "The presenter names the user, performs one exact action, waits for the visible result, reports a repeat test, and states one known limit.",
                "발표자는 사용자를 말하고 정확한 행동 하나를 실행하며 화면 결과를 기다린 뒤 반복 테스트와 알려진 한계를 설명합니다.",
              ),
              tone: "good",
            },
          ],
          question: {
            prompt: c(
              "Which sentence is still only a claim: “The row appeared after I clicked Add” or “All features work”?",
              "다음 중 여전히 주장에 불과한 문장은 무엇인가요? “Add를 누르자 행이 나타났습니다” 또는 “모든 기능이 작동합니다.”",
            ),
            answer: c("“All features work.”", "“모든 기능이 작동합니다.”"),
            explanation: c(
              "It does not name a test action, an observed result, or the boundaries of “all.”",
              "테스트 행동, 관찰 결과, “모든”의 범위를 말하지 않기 때문입니다.",
            ),
          },
          takeaway: c(
            "One verified promise is stronger than ten narrated features.",
            "검증된 약속 하나가 말로 나열한 기능 열 개보다 강합니다.",
          ),
          teacherNotes: [
            c(
              "Perform the weak opening for 20 seconds with exaggerated scrolling, then ask the class what they can actually verify.",
              "과장되게 화면을 넘기며 약한 도입을 20초 시연한 뒤, 학생들이 실제로 확인할 수 있었던 것이 무엇인지 묻는다.",
            ),
            c(
              "Do not equate visual simplicity with weak work. The distinction is unsupported claim versus visible evidence.",
              "시각적으로 단순한 결과물을 약한 작업과 동일시하지 않는다. 구분 기준은 근거 없는 주장과 보이는 증거다.",
            ),
          ],
        }),
        slide({
          id: "day6-04-teacher-demo-script",
          stageId: "day6-partner-rehearsal",
          layout: "demo",
          minutes: 2,
          kicker: c("TEACHER DEMO · EVIDENCE SCRIPT", "강사 시연 · 증거 대본"),
          title: c(
            "Write cues for actions, not paragraphs to memorize.",
            "외울 문단이 아니라 실행할 행동의 단서를 적습니다.",
          ),
          code: c(
            `0:00  “This page helps one user record one item without losing the next step.”

0:20  OPEN the frozen copy.
      ENTER “Sample A.”
      CLICK Add.
      PAUSE until the row is visible.
      SAY “The promised result is this new row.”

1:20  “I expected one Sample A row and saw it.
      After refresh, the saved row remained as promised.
      I then added Sample B once and saw one new row, so I froze this version.”

1:45  “Blank input still has no guidance.
      My next test is whether a clear message appears after an empty submit.”

2:00  STOP.`,
            `0:00  “이 페이지는 사용자가 항목 하나를 기록하고 다음 행동을 놓치지 않게 돕습니다.”

0:20  동결된 복사본 열기.
      “Sample A” 입력.
      Add 누르기.
      행이 보일 때까지 기다리기.
      “약속한 결과는 이 새 행입니다”라고 말하기.

1:20  “Sample A 행 하나를 예상했고 그대로 보았습니다.
      새로고침 뒤 저장된 행이 약속대로 남았습니다.
      이어 Sample B를 한 번 추가해 새 행 하나를 확인하고 이 버전을 동결했습니다.”

1:45  “빈 입력에는 아직 안내가 없습니다.
      다음 테스트는 빈 입력 뒤 명확한 안내가 나타나는지 확인하는 것입니다.”

2:00  멈추기.`,
          ),
          question: {
            prompt: c(
              "If time reaches 2:00 before the limitation, what should be removed first?",
              "한계를 말하기 전에 2분이 되었다면 무엇을 가장 먼저 줄여야 할까요?",
            ),
            options: [
              c("A. The visible action-result path", "A. 보이는 행동-결과 경로"),
              c("B. Extra feature descriptions and tool history", "B. 추가 기능 설명과 도구 사용 이력"),
              c("C. The honest limitation", "C. 솔직한 한계"),
            ],
            answer: c("B — remove extra narration", "B — 추가 설명을 줄입니다"),
            explanation: c(
              "Keep the core evidence and honest boundary. Cut material that does not help the audience verify the promise.",
              "핵심 증거와 솔직한 경계는 남깁니다. 청중이 약속을 검증하는 데 도움 되지 않는 내용을 줄입니다.",
            ),
          },
          takeaway: c(
            "Open → act → pause → point to the result → name the test → state the limit → stop.",
            "열기 → 행동 → 기다리기 → 결과 가리키기 → 테스트 말하기 → 한계 말하기 → 멈추기.",
          ),
          teacherNotes: [
            c(
              "Deliver this once too quickly and once with a deliberate pause after the click. Ask which version made the evidence easier to see.",
              "한 번은 너무 빠르게, 한 번은 클릭 뒤 의도적으로 기다리며 시연한다. 어느 쪽이 증거를 더 쉽게 보게 했는지 묻는다.",
            ),
            c(
              "During partner rehearsal, the observer should name one thing they could not see or hear, not redesign the project.",
              "짝 리허설에서 관찰자는 프로젝트를 재설계하지 말고 보거나 들을 수 없었던 것 하나를 말하게 한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day6-showcase",
      role: "share",
      slides: [
        slide({
          id: "day6-05-failure-fallback",
          stageId: "day6-showcase",
          layout: "concept",
          minutes: 2,
          kicker: c("WHEN THE LIVE DEMO FAILS", "라이브 데모가 실패할 때"),
          title: c(
            "A demo failure is an incident, not a verdict on the learner.",
            "데모 실패는 하나의 사건이지, 학습자에 대한 판정이 아닙니다.",
          ),
          lead: c(
            "A responsible presenter names what happened, stops improvising, and moves through a prepared evidence ladder.",
            "책임 있는 발표자는 실제로 일어난 일을 말하고 즉흥 수정을 멈춘 뒤 준비된 증거 전환 순서를 따릅니다.",
          ),
          items: [
            {
              label: c("1 · OBSERVE", "1 · 관찰"),
              title: c("Name the visible failure", "보이는 실패 말하기"),
              body: c(
                "“The expected row did not appear.” Do not invent a cause you have not tested.",
                "“예상한 행이 나타나지 않았습니다.” 시험하지 않은 원인을 지어내지 않습니다.",
              ),
            },
            {
              label: c("2 · RETRY ONCE", "2 · 한 번만 재시도"),
              title: c("Return to the known start", "알려진 시작 상태로 돌아가기"),
              body: c(
                "One controlled reopen or refresh is enough. Repeated clicking creates new uncertainty.",
                "통제된 다시 열기나 새로고침 한 번이면 충분합니다. 반복 클릭은 새로운 불확실성을 만듭니다.",
              ),
            },
            {
              label: c("3 · FALL BACK", "3 · 대체본 전환"),
              title: c("Use the prepared evidence ladder", "준비한 증거 순서 사용"),
              body: c(
                "After one controlled retry of the final backup, open the Day 5 candidate. If it does not run, show the Day 5 test record and candidate path, and state that this proves a past test—not a live interaction now.",
                "최종 백업을 알려진 시작 상태에서 한 번만 재시도한 뒤 5일차 후보를 엽니다. 후보도 실행되지 않으면 5일차 테스트 기록과 후보 경로를 보여 주고, 이는 과거 테스트를 증명할 뿐 현재 라이브 동작은 증명하지 못한다고 밝힙니다.",
              ),
              tone: "good",
            },
            {
              label: c("4 · DISCLOSE", "4 · 공개"),
              title: c("State the boundary honestly", "경계를 솔직히 밝히기"),
              body: c(
                "Say which version or evidence the audience is seeing and what it cannot prove.",
                "청중이 보고 있는 버전이나 증거가 무엇이며 무엇까지는 증명하지 못하는지 말합니다.",
              ),
              tone: "warning",
            },
          ],
          question: {
            prompt: c(
              "The live click fails once. Should the presenter keep clicking until it works?",
              "라이브 클릭이 한 번 실패했습니다. 작동할 때까지 계속 눌러야 할까요?",
            ),
            answer: c(
              "No — retry once from a known start, then use the fallback",
              "아니요 — 알려진 시작 상태에서 한 번만 재시도한 뒤 대체본을 사용합니다",
            ),
            explanation: c(
              "Repeated uncontrolled attempts consume the fair time slot and make the evidence less trustworthy.",
              "통제되지 않은 반복 시도는 공정한 발표 시간을 소모하고 증거의 신뢰도를 낮춥니다.",
            ),
          },
          takeaway: c(
            "Observe → one controlled retry → verified fallback → honest disclosure.",
            "관찰 → 통제된 재시도 한 번 → 검증된 대체본 → 솔직한 공개.",
          ),
          teacherNotes: [
            c(
              "Say explicitly that fallback use does not reduce the learner's worth. Evaluate preparation, evidence, and recovery judgment.",
              "대체본 사용이 학습자의 가치를 낮추지 않는다고 명시한다. 준비, 증거, 복구 판단을 평가한다.",
            ),
            c(
              "Use the visible final-copy checklist to confirm that every learner has opened the final backup and can locate the Day 5 candidate and Day 5 test record before presentations.",
              "발표 전에 보이는 최종 복사본 체크리스트로 모든 학습자가 최종 백업을 열었고 5일차 후보와 5일차 테스트 기록 위치를 찾을 수 있는지 확인한다.",
            ),
          ],
        }),
        slide({
          id: "day6-05-fallback-example",
          stageId: "day6-showcase",
          layout: "worked-example",
          minutes: 2,
          kicker: c("EXAMPLE AND COUNTEREXAMPLE", "예시와 반례"),
          title: c(
            "Recovery language can preserve trust—or spend it.",
            "복구할 때 쓰는 말은 신뢰를 지킬 수도, 잃게 할 수도 있습니다.",
          ),
          items: [
            {
              label: c("STRONG", "강한 복구"),
              title: c("Report, switch, disclose", "보고하고, 전환하고, 밝히기"),
              body: c(
                "“The expected row did not appear. I will switch to the verified Day 5 candidate. It does not include the new filter, but it proves the core Add path.”",
                "“예상한 행이 나타나지 않았습니다. 검증된 5일차 후보로 전환하겠습니다. 새 필터는 없지만 핵심 Add 경로는 증명할 수 있습니다.”",
              ),
              tone: "good",
            },
            {
              label: c("WEAK", "약한 복구"),
              title: c("Excuse, guess, keep editing", "변명하고, 추측하고, 계속 수정"),
              body: c(
                "“It worked yesterday. The Wi-Fi must be bad. Give me a minute to ask AI and change the code.”",
                "“어제는 됐습니다. 와이파이 문제인 것 같아요. 잠깐 AI에게 물어보고 코드를 바꾸겠습니다.”",
              ),
              tone: "danger",
            },
          ],
          question: {
            prompt: c(
              "Why is the strong recovery still valid evidence?",
              "강한 복구는 왜 여전히 유효한 증거인가요?",
            ),
            answer: c(
              "It identifies the failure, uses a verified version, and states exactly what that version proves",
              "실패를 식별하고 검증된 버전을 사용하며 그 버전이 무엇을 증명하는지 정확히 밝히기 때문",
            ),
            explanation: c(
              "Trust comes from accurate boundaries, not from pretending that no failure occurred.",
              "신뢰는 실패가 없었던 척하는 데서가 아니라 증거의 경계를 정확히 밝히는 데서 생깁니다.",
            ),
          },
          takeaway: c(
            "A prepared fallback is evidence of engineering discipline.",
            "준비된 대체본은 공학적 절제의 증거입니다.",
          ),
          teacherNotes: [
            c(
              "Role-play both responses. Ask the audience which facts they know after each one and which claims remain unsupported.",
              "두 반응을 역할극으로 보여 준다. 각 반응 뒤 청중이 알게 된 사실과 여전히 근거 없는 주장을 묻는다.",
            ),
          ],
        }),
        slide({
          id: "day6-05-showcase-operation",
          stageId: "day6-showcase",
          layout: "run",
          minutes: 2,
          kicker: c("SHOWCASE · FAIR EVIDENCE SLOTS", "발표 · 공정한 증거 시간"),
          title: c(
            "The same structure gives every project a fair hearing.",
            "같은 구조를 적용해야 모든 프로젝트를 공정하게 볼 수 있습니다.",
          ),
          items: [
            {
              label: c("CALCULATE BEFORE CLASS", "수업 전 산식"),
              title: c("72 minutes ÷ 4 minutes = 18 presenters per group", "72분 ÷ 4분 = 조당 발표자 18명"),
              body: c(
                "Reserve 8 minutes for launch and synchronization. For N learners, use G = ceil(N ÷ 18) parallel groups and distribute the roster as evenly as possible.",
                "시작과 동기화에 8분을 남깁니다. 학습자 N명이라면 G = ceil(N ÷ 18)개 병렬 조를 만들고 명단을 최대한 고르게 나눕니다.",
              ),
            },
            {
              label: c("BRANCH BY HEADCOUNT", "인원별 분기"),
              title: c("1–18: one group · 19–36: two · 37–54: three", "1–18명: 1개 조 · 19–36명: 2개 · 37–54명: 3개"),
              body: c(
                "Example: N = 20 gives G = 2, so assign 10 learners to A and 10 to B. If a group finishes early, use the remaining window for equipment buffer or cross-group observation—not code edits.",
                "예: N = 20이면 G = 2이므로 A조 10명, B조 10명으로 배정합니다. 조가 일찍 끝나면 남은 시간은 장비 대응이나 다른 조 관찰에 사용하고 코드는 수정하지 않습니다.",
              ),
            },
            {
              label: c("EVERY SLOT · 4 MIN", "모든 슬롯 · 4분"),
              title: c("2:00 demo · 1:00 question · 1:00 handover", "2:00 데모 · 1:00 질문 · 1:00 전환"),
              body: c(
                "The fallback ladder stays inside the same slot. Equipment failure caused by the room is the only reason the facilitator pauses that station's clock.",
                "대체 증거 전환도 같은 슬롯 안에서 진행합니다. 강의실 장비 문제일 때만 진행 담당자가 해당 조의 시계를 멈춥니다.",
              ),
            },
            {
              label: c("THREE STATION ROLES", "조별 세 역할"),
              title: c("Facilitator · timekeeper · evidence recorder", "진행 · 시간 · 증거 기록"),
              body: c(
                "The facilitator calls the roster and fallback step; the timekeeper calls 2:00, 3:00, and 4:00; the recorder marks presented / fallback / absent and one observed result.",
                "진행 담당은 명단과 대체 단계, 시간 담당은 2:00·3:00·4:00, 증거 기록 담당은 발표·대체·결석 상태와 관찰 결과 하나를 기록합니다.",
              ),
            },
            {
              label: c("SYNCHRONIZE", "동기화"),
              title: c("One launch signal and one closing report", "공통 시작 신호와 종료 보고"),
              body: c(
                "At showcase minute 08, every station starts slot 1. At minute 80, all stations stop and report presenter count, fallback count, and unresolved equipment issues to the instructor.",
                "발표 구간 8분에 모든 조가 1번 슬롯을 시작합니다. 80분에는 모두 멈추고 발표 인원, 대체 사용 수, 미해결 장비 문제를 강사에게 보고합니다.",
              ),
              tone: "warning",
            },
          ],
          question: {
            prompt: c(
              "If a presenter misses the slot, should they edit while waiting for another chance?",
              "발표 순서를 놓친 학생이 다음 기회를 기다리며 수정해도 될까요?",
            ),
            answer: c(
              "No — preserve the frozen artifact and follow the instructor's queue",
              "아니요 — 동결된 결과물을 유지하고 강사의 발표 순서를 따릅니다",
            ),
            explanation: c(
              "Silent edits create an unfair and unverified version. Rescheduling should not change the release standard.",
              "몰래 한 수정은 검증되지 않은 다른 버전을 만들고 공정성을 해칩니다. 순서 변경이 출시 기준을 바꾸어서는 안 됩니다.",
            ),
          },
          takeaway: c(
            "Equal time, visible evidence, prepared recovery, respectful transition.",
            "동일한 시간, 보이는 증거, 준비된 복구, 존중하는 전환.",
          ),
          teacherNotes: [
            c(
              "Before class, write N, G = ceil(N ÷ 18), and each group roster on the instructor board. Assign the three station roles by name and provide the same four-minute timer and evidence sheet at every station.",
              "수업 전에 강사용 보드에 N, G = ceil(N ÷ 18), 조별 명단을 적는다. 조별 세 역할을 이름으로 지정하고 모든 조에 같은 4분 타이머와 증거 기록지를 제공한다.",
            ),
            c(
              "Use one master launch signal at minute 08 and a closing signal at minute 80. Station recorders return their sheets immediately; reconcile the counts before the peer-feedback stage.",
              "8분에 공통 시작 신호, 80분에 공통 종료 신호를 사용한다. 조별 증거 기록지를 즉시 회수하고 다음 피드백 단계 전에 인원 수를 대조한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day6-peer-feedback",
      role: "share",
      slides: [
        slide({
          id: "day6-06-feedback-anatomy",
          stageId: "day6-peer-feedback",
          layout: "concept",
          minutes: 1,
          kicker: c("EVIDENCE-BASED FEEDBACK", "증거 기반 피드백"),
          title: c(
            "Useful feedback begins with a fact the presenter can recognize.",
            "유용한 피드백은 발표자가 알아볼 수 있는 사실에서 시작합니다.",
          ),
          items: [
            {
              label: c("I SAW / HEARD", "내가 본 것 / 들은 것"),
              title: c("Record an observation", "관찰 기록"),
              body: c(
                "Name the action, result, phrase, or recovery you actually witnessed.",
                "실제로 본 행동, 결과, 문장, 복구 행동을 구체적으로 말합니다.",
              ),
            },
            {
              label: c("CLEAR DECISION", "명확한 결정"),
              title: c("Connect choice to effect", "선택과 효과 연결"),
              body: c(
                "Identify one human decision and explain what it made clearer, safer, or easier to test.",
                "사람이 내린 결정 하나를 찾아 그것이 무엇을 더 명확하고 안전하며 시험하기 쉽게 했는지 말합니다.",
              ),
            },
            {
              label: c("ONE QUESTION", "질문 하나"),
              title: c("Open the next investigation", "다음 탐구 열기"),
              body: c(
                "Ask about an evidence boundary, a user condition, or the next test—not your preferred redesign.",
                "내가 원하는 재설계가 아니라 증거의 경계, 사용자 조건, 다음 테스트를 질문합니다.",
              ),
            },
          ],
          question: {
            prompt: c(
              "Which sentence is an observation?",
              "어느 문장이 관찰인가요?",
            ),
            options: [
              c("A. The UX is good.", "A. 사용자 경험이 좋다."),
              c(
                "B. After Reset, the three visible rows disappeared.",
                "B. Reset 뒤 화면에 있던 행 세 개가 사라졌다.",
              ),
              c("C. You should add login.", "C. 로그인을 추가해야 한다."),
            ],
            answer: c("B — it names an action and visible result", "B — 행동과 보이는 결과를 말합니다"),
            explanation: c(
              "A is an unsupported judgment. C is an unrequested solution. B gives the presenter a fact they can verify.",
              "A는 근거 없는 평가이고 C는 요청받지 않은 해결책입니다. B는 발표자가 확인할 수 있는 사실을 줍니다.",
            ),
          },
          takeaway: c(
            "Observation → decision and effect → one testable question.",
            "관찰 → 결정과 효과 → 시험 가능한 질문 하나.",
          ),
          teacherNotes: [
            c(
              "Reject feedback about English fluency, project topic, or visual taste unless the learner explicitly asked for it.",
              "학습자가 명시적으로 요청하지 않았다면 영어 유창성, 프로젝트 주제, 시각 취향에 대한 피드백은 받지 않는다.",
            ),
          ],
        }),
        slide({
          id: "day6-06-feedback-comparison",
          stageId: "day6-peer-feedback",
          layout: "compare",
          minutes: 1,
          kicker: c("VAGUE · SPECIFIC · OUT OF SCOPE", "모호함 · 구체적임 · 범위 밖"),
          title: c(
            "Specific does not mean harsh. It means traceable to evidence.",
            "구체적이라는 것은 가혹하다는 뜻이 아니라 증거를 따라갈 수 있다는 뜻입니다.",
          ),
          items: [
            {
              label: c("VAGUE", "모호함"),
              title: c("“Nice app.”", "“좋은 앱이에요.”"),
              body: c(
                "The presenter cannot tell which decision or result to preserve.",
                "발표자는 어떤 결정이나 결과를 유지해야 하는지 알 수 없습니다.",
              ),
              tone: "warning",
            },
            {
              label: c("SPECIFIC", "구체적임"),
              title: c("“The error stayed beside the empty field.”", "“오류가 빈 입력칸 옆에 계속 보였습니다.”"),
              body: c(
                "“Keeping the message near the action made recovery clear. What happens after a second empty submit?”",
                "“행동 옆에 메시지를 둔 결정이 복구 방법을 명확하게 했습니다. 빈 입력을 두 번 제출하면 어떻게 되나요?”",
              ),
              tone: "good",
            },
            {
              label: c("OUT OF SCOPE", "범위 밖"),
              title: c("“Your English sounded awkward.”", "“영어가 어색했어요.”"),
              body: c(
                "It judges the person and language, not the product evidence or engineering decision.",
                "제품 증거나 공학적 결정이 아니라 사람과 언어를 평가합니다.",
              ),
              tone: "danger",
            },
          ],
          question: {
            prompt: c(
              "What makes the specific feedback useful even if the presenter disagrees?",
              "발표자가 동의하지 않더라도 구체적 피드백이 유용한 이유는 무엇인가요?",
            ),
            answer: c(
              "It points to an observable moment and a question that can be tested",
              "관찰 가능한 순간과 시험할 수 있는 질문을 가리키기 때문",
            ),
            explanation: c(
              "The presenter can return to the same moment, inspect the decision, and choose whether to test the question.",
              "발표자는 같은 순간으로 돌아가 결정을 살피고 그 질문을 시험할지 스스로 선택할 수 있습니다.",
            ),
          },
          takeaway: c(
            "Describe the work precisely without judging the person.",
            "사람을 평가하지 말고 작업을 정확히 묘사합니다.",
          ),
          teacherNotes: [
            c(
              "Ask the class to improve “Nice app” orally. Accept only versions that name something actually seen or heard.",
              "학생들에게 “좋은 앱이에요”를 말로 개선하게 한다. 실제로 보거나 들은 것을 말한 문장만 받는다.",
            ),
          ],
        }),
        slide({
          id: "day6-06-feedback-demo",
          stageId: "day6-peer-feedback",
          layout: "demo",
          minutes: 1,
          kicker: c("TEACHER DEMO · REWRITE THE COMMENT", "강사 시연 · 댓글 다시 쓰기"),
          title: c(
            "Turn preference into evidence, then return choice to the maker.",
            "취향을 증거로 바꾸고 선택권을 다시 제작자에게 돌려줍니다.",
          ),
          code: c(
            `Instead of:
“It is too simple. Add login.”

Write:
“I saw the core Add path finish in one click.
Keeping one path made the result easy to verify.
Who needs to keep their data after closing the page,
and what test would show that need?”`,
            `다음 문장 대신:
“너무 단순해요. 로그인을 추가하세요.”

이렇게 씁니다:
“핵심 Add 경로가 한 번의 클릭으로 끝나는 것을 보았습니다.
경로를 하나로 유지한 결정 덕분에 결과를 확인하기 쉬웠습니다.
페이지를 닫은 뒤에도 데이터를 보관해야 하는 사용자는 누구이며,
그 필요를 어떤 테스트로 확인할 수 있을까요?”`,
          ),
          question: {
            prompt: c(
              "Why does the rewritten question not force a new feature?",
              "다시 쓴 질문은 왜 새 기능을 강요하지 않나요?",
            ),
            answer: c(
              "It asks for a user condition and evidence before choosing a solution",
              "해결책을 고르기 전에 사용자 조건과 증거를 묻기 때문",
            ),
            explanation: c(
              "Login is only one possible solution. The evidence may show that persistence is unnecessary or that a smaller solution is enough.",
              "로그인은 가능한 해결책 중 하나일 뿐입니다. 증거에 따라 저장이 불필요하거나 더 작은 해결책으로 충분할 수 있습니다.",
            ),
          },
          takeaway: c(
            "Good feedback expands the next investigation without taking ownership away.",
            "좋은 피드백은 제작자의 선택권을 빼앗지 않으면서 다음 탐구를 넓힙니다.",
          ),
          teacherNotes: [
            c(
              "Rewrite one anonymous real comment from the showcase. Remove personal judgment, add the observed moment, then add one testable question.",
              "발표에서 나온 익명의 실제 댓글 하나를 다시 쓴다. 사람에 대한 평가를 빼고 관찰한 순간과 시험 가능한 질문 하나를 더한다.",
            ),
          ],
        }),
      ],
    },
    {
      stageId: "day6-reflection-close",
      role: "share",
      slides: [
        slide({
          id: "day6-07-contribution-layers",
          stageId: "day6-reflection-close",
          layout: "concept",
          minutes: 1,
          kicker: c("RESPONSIBLE ATTRIBUTION", "책임 있는 기여 구분"),
          title: c(
            "AI participation does not remove human responsibility.",
            "AI가 참여해도 사람의 책임은 사라지지 않습니다.",
          ),
          lead: c(
            "A truthful project account separates intent, generation, verification, and final judgment.",
            "정직한 프로젝트 설명은 의도, 생성, 검증, 최종 판단을 구분합니다.",
          ),
          items: [
            {
              label: c("HUMAN · INTENT", "사람 · 의도"),
              title: c("Purpose and success", "목적과 성공 기준"),
              body: c(
                "The learner chose the user, problem, boundaries, and what observable result would count.",
                "학습자가 사용자, 문제, 경계, 성공으로 인정할 관찰 가능한 결과를 정했습니다.",
              ),
            },
            {
              label: c("AI · GENERATION", "AI · 생성"),
              title: c("Drafts and suggestions", "초안과 제안"),
              body: c(
                "The tool produced code, explanations, alternatives, or debugging suggestions.",
                "도구가 코드, 설명, 대안, 디버깅 제안을 만들었습니다.",
              ),
            },
            {
              label: c("HUMAN · VERIFICATION", "사람 · 검증"),
              title: c("Tests and rejection", "테스트와 거절"),
              body: c(
                "The learner ran the result, compared Expected and Actual, rejected unsafe changes, and chose the frozen version.",
                "학습자가 결과를 실행하고 예상과 실제를 비교하며 위험한 변경을 거절하고 동결할 버전을 선택했습니다.",
              ),
            },
            {
              label: c("SHARED RECORD", "공동 기록"),
              title: c("What the evidence shows", "증거가 보여 주는 것"),
              body: c(
                "Prompts, change notes, tests, failures, and recovery make the collaboration inspectable.",
                "프롬프트, 변경 기록, 테스트, 실패, 복구가 협업 과정을 확인 가능하게 만듭니다.",
              ),
            },
          ],
          question: {
            prompt: c(
              "AI wrote most of the code. Did AI therefore own the release decision?",
              "AI가 코드 대부분을 작성했습니다. 그렇다면 출시 결정도 AI가 맡은 것일까요?",
            ),
            answer: c("No — the human owns the release decision", "아니요 — 출시 결정은 사람이 책임집니다"),
            explanation: c(
              "The decision requires choosing acceptable evidence, risk, and limitation. AI output can inform that judgment but cannot assume accountability.",
              "출시 결정에는 받아들일 증거, 위험, 한계를 선택하는 판단이 필요합니다. AI 출력은 판단을 도울 수 있지만 책임을 맡을 수는 없습니다.",
            ),
          },
          takeaway: c(
            "Use AI assistance openly; own decisions and verification explicitly.",
            "AI의 도움은 투명하게 밝히고, 결정과 검증은 사람이 명시적으로 책임집니다.",
          ),
          teacherNotes: [
            c(
              "Avoid asking what percentage AI made. Percentages hide the different kinds of contribution.",
              "AI가 몇 퍼센트를 만들었는지 묻지 않는다. 비율은 서로 다른 기여의 종류를 가린다.",
            ),
            c(
              "Ask for one verb under each layer: chose, drafted, tested, rejected, restored, or froze.",
              "각 층위에 해당하는 동사 하나를 말하게 한다. 예: 선택했다, 작성했다, 시험했다, 거절했다, 복구했다, 동결했다.",
            ),
          ],
        }),
        slide({
          id: "day6-07-attribution-example",
          stageId: "day6-reflection-close",
          layout: "worked-example",
          minutes: 1,
          kicker: c("HONEST ACCOUNT · FALSE ACCOUNT", "정직한 설명 · 잘못된 설명"),
          title: c(
            "Good attribution names decisions and checks, not just authorship.",
            "좋은 기여 설명은 작성자만이 아니라 결정과 검증을 말합니다.",
          ),
          items: [
            {
              label: c("STRONG", "강한 설명"),
              title: c("Separate the contributions", "기여를 구분"),
              body: c(
                "“I chose the one-action success criterion. AI drafted the handler. I rejected its database suggestion, tested the browser result twice, and froze the version with one known limit.”",
                "“저는 한 번의 행동으로 확인할 성공조건을 정했습니다. AI가 처리 코드를 작성했습니다. 저는 데이터베이스 제안을 거절하고 브라우저 결과를 두 번 테스트한 뒤 한계 하나가 있는 버전을 동결했습니다.”",
              ),
              tone: "good",
            },
            {
              label: c("INCOMPLETE ACCOUNT", "불완전한 설명"),
              title: c("“AI made everything.”", "“AI가 전부 만들었습니다.”"),
              body: c(
                "This erases the learner's purpose, boundaries, tests, rejections, and release decision.",
                "학습자의 목적, 경계, 테스트, 거절, 출시 결정을 지워 버립니다.",
              ),
              tone: "warning",
            },
            {
              label: c("INCOMPLETE ACCOUNT", "불완전한 설명"),
              title: c("“I made it all myself.”", "“전부 혼자 만들었습니다.”"),
              body: c(
                "This hides material AI assistance and makes the process impossible to evaluate honestly.",
                "중요한 AI 도움을 숨기고 과정을 정직하게 평가할 수 없게 만듭니다.",
              ),
              tone: "danger",
            },
          ],
          question: {
            prompt: c(
              "What makes the strong account credible?",
              "강한 설명을 신뢰할 수 있게 만드는 것은 무엇인가요?",
            ),
            answer: c(
              "It names observable decisions, AI output, human checks, and a bounded result",
              "관찰 가능한 결정, AI 출력, 사람의 검증, 범위가 있는 결과를 모두 말하기 때문",
            ),
            explanation: c(
              "Each claim can be connected to a prompt, test record, rejected change, or frozen artifact.",
              "각 주장을 프롬프트, 테스트 기록, 거절한 변경, 동결된 결과물과 연결할 수 있습니다.",
            ),
          },
          takeaway: c(
            "Describe AI assistance and human agency in the same evidence-based account.",
            "AI의 도움과 사람의 주도권을 같은 증거 기반 설명 안에 담습니다.",
          ),
          teacherNotes: [
            c(
              "Read the two incomplete accounts neutrally. Offer verbs such as chose, drafted, tested, rejected, restored, and froze so learners can describe each contribution precisely.",
              "두 불완전한 설명을 중립적으로 읽는다. 선택했다, 작성했다, 시험했다, 거절했다, 복구했다, 동결했다 같은 동사를 제공해 각 기여를 정확히 설명하게 한다.",
            ),
          ],
        }),
        slide({
          id: "day6-07-reflection-demo",
          stageId: "day6-reflection-close",
          layout: "demo",
          minutes: 1,
          kicker: c("TEACHER DEMO · REFLECT FROM EVIDENCE", "강사 시연 · 증거에서 회고하기"),
          title: c(
            "Reflection turns current evidence into the next learning step.",
            "회고는 현재의 증거를 다음 학습 단계로 연결합니다.",
          ),
          code: c(
            `Decision I made:
I released the older verified candidate instead of the newer broken version.

AI result I checked or changed:
AI suggested a redesign; I deferred it because it had no bounded release test.

Recovery that helped:
The untouched Day 5 candidate let me restore the core path.

Limit and next learning habit:
Blank input still lacks guidance.
Next time I will write the empty-input test before requesting the feature.`,
            `내가 내린 결정:
새롭지만 고장 난 버전 대신 이전의 검증된 후보를 발표했습니다.

내가 확인하거나 바꾼 AI 결과:
AI가 재설계를 제안했지만 범위가 정해진 출시 테스트가 없어 다음 단계로 미뤘습니다.

도움이 된 복구:
손대지 않은 5일차 후보 덕분에 핵심 경로를 복구했습니다.

한계와 다음 학습 습관:
빈 입력에는 아직 안내가 없습니다.
다음에는 기능을 요청하기 전에 빈 입력 테스트부터 쓰겠습니다.`,
          ),
          question: {
            prompt: c(
              "What evidence would a future teammate need to continue this project safely?",
              "미래의 팀원이 이 프로젝트를 안전하게 이어 가려면 어떤 증거가 필요할까요?",
            ),
            answer: c(
              "The exact frozen artifact, last passing test, known limit, and first next test",
              "정확한 동결 결과물, 마지막 통과 테스트, 알려진 한계, 다음에 먼저 할 테스트",
            ),
            explanation: c(
              "These records preserve the current truth and define a safe place to resume learning.",
              "이 기록은 현재 상태를 보존하고 다음 학습을 안전하게 시작할 지점을 정해 줍니다.",
            ),
          },
          takeaway: c(
            "Finish with evidence of what is true now and a test for what comes next.",
            "지금 무엇이 사실인지 보여 주는 증거와 다음에 실행할 테스트로 마무리합니다.",
          ),
          teacherNotes: [
            c(
              "Model an imperfect reflection with one real limitation. Do not end the course by implying that every project must be complete.",
              "실제 한계 하나가 포함된 불완전한 회고를 시연한다. 모든 프로젝트가 완벽히 끝나야 한다는 인상을 주며 수업을 마치지 않는다.",
            ),
            c(
              "Retrieve the essential question. Invite three short answers: evidence for release, one human decision, and one responsible AI attribution.",
              "핵심 질문을 다시 제시한다. 출시 증거, 사람의 결정 하나, 책임 있는 AI 기여 설명 하나를 서로 다른 학생에게서 짧게 받는다.",
            ),
          ],
        }),
      ],
    },
  ],
};
