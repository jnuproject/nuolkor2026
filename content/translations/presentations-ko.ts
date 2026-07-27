import type { Language } from "@/lib/language";
import type { PresentationSlide } from "@/content/present";

type SlideCopy = {
  title: string;
  content: string;
};

const completionEnglishByKorean: Record<string, string> = {
  "두 변경의 테스트 결과와 최종 파일명이 모두 기록됨":
    "Both change test results and the final filename are recorded.",
  "브라우저에 자기 페이지가 보이면 손을 키보드에서 떼고 화면을 바라본다.":
    "The learner's page is visible in the browser; hands leave the keyboard and eyes face the screen.",
  "전원이 카드 하나를 보이고, 워크시트 Actual 칸을 채운다.":
    "Everyone shows one card and completes the Actual field on the worksheet.",
  "학생이 읽기 전용 프롬프트를 보내고 파일 목록이 바뀌지 않았음을 확인한다.":
    "The learner sends the read-only prompt and confirms that the file list did not change.",
  "워크시트 Code Map 세 줄과 “No file changed” 체크가 끝난다.":
    "The three Code Map lines and the “No file changed” check are complete.",
  "학생이 브라우저에서 행동을 재현하고 세 칸을 채운다.":
    "The learner reproduces the action in the browser and completes all three fields.",
  "모든 학생이 Storage를 세 상태 중 하나로 기록한다.":
    "Every learner records Storage as one of the three states.",
  "MUST 후보, When I…, I see…, 회귀 항목이 작성된다.":
    "The MUST candidate, `When I…, I see…`, and regression item are written.",
  "복사본을 직접 열어 기존 동작을 통과시킨 학생이 Green ✓.":
    "A learner who opens the copy and passes the existing behavior shows Green ✓.",
  "01:15에 전원 착석, 워크시트와 복구 카드 준비.":
    "At 01:15 everyone is seated with the worksheet and recovery card ready.",
  "학생이 네 경로를 카드에서 손가락으로 짚는다.":
    "The learner points to all four paths on the card.",
  "학생이 한 상황에 맞는 첫 행동을 말하고 워크시트 Quick choice를 쓴다.":
    "The learner names the first action for one situation and writes the Quick choice.",
  "전원이 APPROVED, REDUCE, HOLD 중 하나를 받는다.":
    "Everyone receives one of `APPROVED`, `REDUCE`, or `HOLD`.",
  "학생 워크시트에 변경 예정 파일과 승인된 첫 단계가 적힌다.":
    "The learner's worksheet names the file to change and the approved first step.",
  "Success 표의 Actual과 Pass/Not yet가 채워진다.":
    "Actual and Pass/Not yet are completed in the Success table.",
  "성공 테스트와 회귀 테스트가 모두 Pass이거나 안전하게 Yellow/Red로 기록된다.":
    "Both the success and regression tests pass, or are safely recorded as Yellow/Red.",
  "복사본 두 테스트 통과와 Handoff 완성.":
    "The copy passes both tests and the Handoff is complete.",
  "페어 이니셜과 최종 G/Y/R이 워크시트에 있다.":
    "The worksheet contains the partner's initials and the final G/Y/R status.",
};

const koreanSlides: Record<number, SlideCopy[]> = {
  1: [
    {
      title: "시작할 준비",
      content: `1일차
AI와 첫 프로토타입

1. 컴퓨터 앞에 앉으세요.
2. 1일차 자료만 여세요.
3. 준비되면 GREEN을 보여 주세요.`,
    },
    {
      title: "오늘 무엇을 만들까요?",
      content: `오늘이 끝나면 다음 결과가 남습니다.

✓ 작동하는 웹페이지 하나
✓ 내가 선택한 변경 두 개
✓ Save Point 두 개
✓ 직접 테스트한 내용의 기록`,
    },
    {
      title: "빠른 확인 — 점수 없음",
      content: `다음을 사용해 본 적이 있다면 손을 드세요.

1. 터미널
2. HTML 또는 JavaScript
3. AI 코딩 도구

모든 답이 “아니요”여도 괜찮습니다.`,
    },
    {
      title: "실시간 시연 — 전체 루프 보기",
      content: `작은 페이지 하나를 만들겠습니다.

다섯 가지 행동을 찾아보세요.
TELL · WATCH · CHECK · FIX · SAVE`,
    },
    {
      title: "TELL — 명확한 목표 하나 전달하기",
      content: `목표
콘텐츠
행동 하나
제한

먼저 작은 결과 하나부터.`,
    },
    {
      title: "WATCH — 승인하기 전에 읽기",
      content: `AI가 무엇을 바꾸나요?
어떤 파일을 사용하나요?
계획이 여전히 작은가요?

읽지 않고 “yes”를 클릭하지 마세요.`,
    },
    {
      title: "CHECK — 사용자처럼 사용하기",
      content: `페이지를 여세요.
주요 메시지를 읽으세요.
버튼을 클릭하세요.

요청한 대로 작동하나요?`,
    },
    {
      title: "FIX — 차이 설명하기",
      content: `현재 보이는 것: ___
원하는 것: ___
바꿀 부분만: ___
그대로 둘 것: ___`,
    },
    {
      title: "SAVE — 작동하는 결과 보호하기",
      content: `지금 작동합니다.
다음 변경 전에 저장하세요.

작동하는 버전 → Save Point`,
    },
    {
      title: "바이브 코딩이란?",
      content: `무엇이 있어야 하는지 설명합니다.
AI가 만드는 일을 돕게 합니다.
실제 결과를 테스트합니다.
작은 단계로 개선합니다.`,
    },
    {
      title: "서로 다른 역할",
      content: `여러분이 결정:
목표 · 사용자 · 제한 · 품질

AI가 지원:
계획 · 작성 · 설명 · 변경`,
    },
    {
      title: "AI도 틀릴 수 있습니다",
      content: `AI가 만들 수 있는 것:

• 잘못된 사실
• 고장 난 동작
• 요청하지 않은 변경

보기 좋은 것과 올바른 것은 다릅니다.`,
    },
    {
      title: "6일 내내 사용할 루프",
      content: `TELL → WATCH → CHECK → FIX → SAVE

말하세요.
지켜보세요.
사용하세요.
개선하세요.
보호하세요.`,
    },
    {
      title: "안전은 보내기 전부터 시작됩니다",
      content: `AI에게 무엇이든 보내기 전에 질문하세요.

개인적인 정보인가?
내가 공유할 수 있는 정보인가?
이 작업에 꼭 필요한가?`,
    },
    {
      title: "비밀 정보는 절대 공유하지 마세요",
      content: `붙여 넣지 마세요.

✕ 비밀번호
✕ API 키 또는 비밀 코드
✕ 개인 식별 번호
✕ 개인 연락처`,
    },
    {
      title: "콘텐츠를 책임 있게 사용하기",
      content: `사용해도 되는 콘텐츠만 사용하세요.
다른 사람의 사진은 먼저 허락받으세요.
중요한 사실을 확인하세요.
공유하는 내용은 여러분의 책임입니다.`,
    },
    {
      title: "안전한가요?",
      content: `내 API 키를 붙여 넣어도 되나요?        NO
별명을 사용해도 되나요?                 YES
확인하지 않은 사실을 믿어도 되나요?      NO

확실하지 않으면 멈추고 물어보세요.`,
    },
    {
      title: "10분 휴식",
      content: `휴식 — 10분

프로젝트를 닫아 두세요.
타이머가 끝나기 전에 돌아오세요.

다음: 나만의 페이지 만들기`,
    },
    {
      title: "현재 상태 보여 주기",
      content: `✓ GREEN — 계속할 수 있습니다.
! YELLOW — 곧 도움이 필요합니다.
✕ RED — 계속할 수 없습니다.

카드를 보여 주세요. 말없이 기다리지 마세요.`,
    },
    {
      title: "세 장소, 하나의 프로젝트",
      content: `FOLDER
day1-first-build
     ↓
AI TOOL
opencode가 파일을 변경
     ↓
BROWSER
index.html이 결과를 표시`,
    },
    {
      title: "도구 열기",
      content: `1. day1-first-build 폴더를 여세요.
2. 이 폴더에서 터미널을 여세요.
3. opencode를 입력하세요.
4. Enter를 누르세요.

opencode가 열리지 않으면 RED를 보여 주세요.`,
    },
    {
      title: "첫 결과",
      content: `MY FIRST BUILD

□ 제목과 짧은 문장
□ “Human in Control” 카드
□ “Test the page” 버튼
□ “The button works!” 메시지
□ 개인정보 없음`,
    },
    {
      title: "TELL — 1일차 프롬프트 카드 사용하기",
      content: `1. 1일차 프롬프트 카드를 여세요.
2. 성공 조건을 읽으세요.
3. 프롬프트를 한 번 읽으세요.
4. 전체 프롬프트를 보내세요.

페이지 하나. 버튼 하나. 단순하게 유지하세요.`,
    },
    {
      title: "WATCH — 작업을 작게 유지하기",
      content: `AI가 작업하는 동안 확인하세요.

□ index.html을 만들 예정입니다.
□ 개인정보를 요구하지 않습니다.
□ 큰 새 시스템을 추가하지 않습니다.

확실하지 않으면 YELLOW를 보여 주세요.`,
    },
    {
      title: "CHECK — 페이지를 열고 사용하기",
      content: `1. 브라우저에서 index.html을 여세요.
2. 제목과 카드를 찾으세요.
3. “Test the page”를 클릭하세요.
4. 나타난 메시지를 적으세요.

AI가 “done”이라고 말한 것은 테스트가 아닙니다.`,
    },
    {
      title: "첫 결과가 생겼습니다",
      content: `첫 결과 ✓

완벽할 필요는 없습니다.
테스트할 수 있어야 합니다.

먼저 작동하게. 다음에 더 좋게.`,
    },
    {
      title: "FIX — 관찰한 내용 말하기",
      content: `내가 ___하면,
___가 보입니다.
___를 예상했습니다.

이 부분만 수정해 주세요.
___는 그대로 유지하세요.`,
    },
    {
      title: "FIX 하나 보내기",
      content: `FIX를 보내세요.
무엇이 바뀌는지 지켜보세요.
브라우저를 새로고침하세요.
같은 확인을 다시 실행하세요.

한 번에 하나씩 변경하세요.`,
    },
    {
      title: "SAVE — 첫 Save Point 만들기",
      content: `작동한다면:

1. 한 번 더 확인하세요.
2. index.html을 복사하세요.
3. 복사본 이름: day1-base.html
4. index.html에서 계속 작업하세요.

이제 GREEN을 보여 주세요.`,
    },
    {
      title: "Project Studio — 나의 페이지, 나의 결정",
      content: `STUDIO 목표 — 50분

✓ 내가 선택한 안전한 변경 두 개 만들기
✓ 변경할 때마다 테스트하기
✓ 실제로 일어난 일 기록하기
✓ 새 Save Point로 마치기`,
    },
    {
      title: "프롬프트 전에 계획하기",
      content: `변경 1
무엇이 달라져야 하나요?
어떻게 테스트할까요?

변경 2
무엇이 달라져야 하나요?
어떻게 테스트할까요?

두 변경을 함께 보내지 마세요.`,
    },
    {
      title: "1회차 — 변경 하나",
      content: `변경 하나를 TELL.
범위를 WATCH.
결과를 CHECK.
차이를 FIX.

변경 1이 통과하기 전에 변경 2를 시작하지 마세요.`,
    },
    {
      title: "체크포인트 — 현재 상태 보여 주기",
      content: `✓ GREEN
변경 1이 작동하고 테스트를 기록했습니다.

! YELLOW
페이지는 열리지만 변경이 통과하지 않습니다.

✕ RED
도구, 파일 또는 페이지를 열 수 없습니다.`,
    },
    {
      title: "2회차 — 변경 하나 더",
      content: `변경 2를 TELL.
AI가 무엇을 유지할지 WATCH.
변경 1과 변경 2를 CHECK.
실패한 부분만 FIX.

이미 작동하는 것을 보호하세요.`,
    },
    {
      title: "최종 CHECK + SAVE",
      content: `테스트:
□ 페이지가 열림
□ 변경 1이 작동함
□ 변경 2가 작동함
□ 버튼이 작동함

index.html을 복사하세요.
이름: day1-final-save.html`,
    },
    {
      title: "보여 주고, 테스트하고, 교대하기",
      content: `PARTNER A
변경 하나를 보여 주세요.

PARTNER B
버튼을 클릭해 테스트하세요.

말하기:
“___를 발견했습니다.”
“___가 좋습니다.”

그다음 역할을 바꾸세요.`,
    },
    {
      title: "마무리 기록 — 떠나기 전에",
      content: `세 줄을 완성하세요.

1. 이제 내가 할 수 있는 것: ___
2. 내가 확인한 것: ___
3. 아직 도움이 필요한 것: ___

표시: GREEN / YELLOW / RED`,
    },
    {
      title: "1일차 완료",
      content: `오늘:
TELL → WATCH → CHECK → FIX → SAVE

내일:
명확한 프롬프트. 더 나은 디버깅.

1일차 폴더를 가져오세요.`,
    },
  ],
  2: [
    {
      title: "2일차 — 명확한 요청과 더 나은 디버깅",
      content: `오늘 할 일:

✓ 테스트 가능한 규칙 작성
✓ Expected와 Actual 기록
✓ 한 번에 문제 하나 수정
✓ 새 세션으로 Context 전달`,
    },
    {
      title: "1일차 작업 보호하기",
      content: `열기: day1-first-build

□ index.html
□ day1-base.html
□ day1-final-save.html

확인한 뒤 폴더를 닫으세요.`,
    },
    {
      title: "루프의 이름을 말할 수 있나요?",
      content: `_____ → _____ → _____ → _____ → _____

다섯 단어를 말하세요.
각 단어에 해당하는 행동 하나를 말하세요.`,
    },
    {
      title: "빠른 확인 — YES 또는 NO",
      content: `API 키를 AI 채팅에 붙여 넣기?        NO
테스트 없이 “fixed”를 믿기?            NO
새 세션에 작동하는 것을 알려 주기?      YES

오늘: 모두가 같은 공통 실습을 합니다.`,
    },
    {
      title: "A/B 테스트 — 같은 도구, 다른 요청",
      content: `A: 모호한 요청
B: 테스트 가능한 요청

새 폴더 두 개.
새 세션 두 개.
규칙과 테스트를 비교하세요.`,
    },
    {
      title: "A — 무엇이 빠졌나요?",
      content: `“Make a page that checks input.”

어떤 입력인가요?
무엇이 올바른가요?
잘못된 값이면 무슨 일이 일어나나요?
어떻게 테스트하나요?`,
    },
    {
      title: "아직 판단하지 말고 기록하기",
      content: `일어난 일을 적으세요.

□ AI가 질문했습니다.
□ AI가 규칙을 추측했습니다.
□ 결과를 테스트하기 어려웠습니다.
□ 다른 일이 일어났습니다.`,
    },
    {
      title: "B — 테스트할 수 있는 규칙",
      content: `Goal
기능 하나
정확한 입력 규칙
제한
Success means: 행동 + 정확한 결과`,
    },
    {
      title: "어떤 결과를 테스트할 수 있나요?",
      content: `비교하세요.

□ 명확한 목표
□ 명확한 규칙
□ 정확한 예상 결과
□ Pass 또는 Not Yet

테스트할 수 있기 때문에 명확한 요청이 더 좋습니다.`,
    },
    {
      title: "프롬프트 프레임",
      content: `Goal · Context · Feature
Rules · Constraints
Do not change
Success means

필요한 부분을 사용하세요.`,
    },
    {
      title: "방향 정하기",
      content: `GOAL — 결과
CONTEXT — 현재 상황
FEATURE — 지금 바꿀 한 가지

현재 어디에 있나요?
다음 작은 움직임은 무엇인가요?`,
    },
    {
      title: "변경 통제하기",
      content: `RULES — 정확한 동작
CONSTRAINTS — 제한
DO NOT CHANGE — 작동하는 부분 보호
SUCCESS MEANS — 증거`,
    },
    {
      title: "증명할 수 있나요?",
      content: `약한 문장:
“The page is good.”

테스트 가능한 문장:
“Empty input shows ‘Enter a value.’”

행동 + 정확한 결과`,
    },
    {
      title: "프레임 만들기",
      content: `짝과 함께 작업하세요.

각 문장을 다음 항목 아래에 놓으세요.
Goal / Context / Feature / Rules /
Constraints / Do not change / Success means

선택 하나의 이유를 설명하세요.`,
    },
    {
      title: "긴 채팅, 복잡한 Context",
      content: `긴 채팅은 오래된 생각과 새로운 생각을 섞을 수 있습니다.

모든 것을 다시 보내지 마세요.
현재 사실을 보내세요.`,
    },
    {
      title: "새 세션에 무엇이 필요한가요?",
      content: `1. 현재 폴더와 파일
2. 페이지가 하는 일
3. 테스트한 내용
4. 다음 변경 하나
5. 그대로 유지할 것
6. 테스트 방법`,
    },
    {
      title: "Context Handoff 작성",
      content: `Current file: (현재 파일)
Already works: (이미 작동하는 것)
Test evidence: (테스트 증거)
Next change: (다음 변경)
Do not change: (바꾸지 않을 것)
Success means: (성공 기준)`,
    },
    {
      title: "초안 확인하기",
      content: `□ 테스트한 사실만 있음
□ 다음 변경 하나
□ 보호할 작동 부분
□ 행동 + 예상 결과

아직 보내지 마세요.`,
    },
    {
      title: "10분 휴식",
      content: `휴식 — 10분

파일을 안전하게 지키세요.
타이머가 끝나기 전에 돌아오세요.

다음: 버그 하나 재현하고 수정하기`,
    },
    {
      title: "먼저 추측하지 마세요",
      content: `먼저:
행동 반복
결과 기록

그다음:
FIX 하나 요청`,
    },
    {
      title: "같은 행동 재현하기",
      content: `1. 입력창을 비워 두세요.
2. “Check input”을 클릭하세요.
3. 메시지를 읽으세요.
4. 같은 행동을 반복하세요.`,
    },
    {
      title: "차이 말하기",
      content: `ACTION
비어 있음 → “Check input” 클릭

EXPECTED
“Enter a value.”

ACTUAL
실제로 본 것을 기록`,
    },
    {
      title: "실패한 규칙만 FIX",
      content: `Action
Expected
Actual
이 규칙만 수정하세요.
기존에 작동하던 규칙은 바꾸지 마세요.`,
    },
    {
      title: "FIX와 기존 규칙 테스트하기",
      content: `테스트:
□ 비어 있음
□ 숫자가 아님
□ 1–10 범위 밖
□ 올바른 정수

FIX 하나가 기존 동작을 망가뜨리면 안 됩니다.`,
    },
    {
      title: "검증된 FIX 저장하기",
      content: `필수 테스트가 모두 통과했습니다.

저장:
demo-day2-debug-fixed.html

저장한 복사본도 테스트하세요.`,
    },
    {
      title: "새 폴더에서 시작하기",
      content: `1. 생성: day2-prompt-lab
2. 이 폴더에서 터미널을 여세요.
3. 입력: opencode
4. 확인: 1일차 폴더가 아닙니다.`,
    },
    {
      title: "전체 프롬프트 프레임 사용하기",
      content: `Goal · Context · Feature
Rules · Constraints
Success means

보내기 전에 규칙을 읽으세요.
워크시트의 프롬프트를 사용하세요.`,
    },
    {
      title: "범위를 WATCH",
      content: `□ index.html 하나
□ 입력 규칙 네 개
□ 외부 라이브러리 없음
□ API, 로그인, 개인정보 없음

계획이 다르면 YELLOW를 보여 주세요.`,
    },
    {
      title: "기본 테스트 두 개 실행하기",
      content: `테스트 1:
5 → “Accepted: 5”

테스트 2:
비어 있음 → “Enter a value.”

Actual을 적은 뒤 Pass를 표시하세요.`,
    },
    {
      title: "기본 Save Point 만들기",
      content: `두 테스트가 모두 통과하면:

index.html 복사
이름: day2-base.html

저장한 복사본을 열고 테스트하세요.`,
    },
    {
      title: "Studio — 변경 전에 테스트",
      content: `다음 값의 Expected를 적으세요.

비어 있음 · abc · 2.5 · 0 · 1 · 10

정답을 AI에게 묻지 마세요.`,
    },
    {
      title: "테스트 6개 실행하기",
      content: `각 입력마다:

1. 입력
2. “Check input” 클릭
3. Actual 기록
4. Pass 또는 Not Yet 표시

행동하지 않았다면 Pass도 없습니다.`,
    },
    {
      title: "실패한 테스트 하나 선택하기",
      content: `Action
Expected
Actual

이 문제만 수정하세요.
기존 통과 테스트를 보호하세요.
다시 테스트하세요.`,
    },
    {
      title: "체크포인트 + 현재 사실",
      content: `✓ GREEN — 테스트 6개 통과 및 기록 완료
! YELLOW — 필수 테스트 하나가 아직 실패
✕ RED — 도구, 파일 또는 페이지가 열리지 않음

이제 Context Handoff를 완성하세요.`,
    },
    {
      title: "새 세션, 같은 파일",
      content: `강사가 보여 준
New Session 기능을 사용하세요.

단축키를 추측하지 마세요.
오래된 채팅 전체를 붙여 넣지 마세요.`,
    },
    {
      title: "다음 변경 하나 — Clear",
      content: `다음 변경:
“Clear” 버튼 하나 추가

버튼이 비울 것:
□ 입력창
□ 결과

기존 규칙을 모두 유지하세요.`,
    },
    {
      title: "새 기능 + 기존 기능 테스트",
      content: `테스트:
5 → Accepted
Clear → 입력과 결과가 비어 있음
비어 있음 · abc · 0 · 10

새 기능이 작동합니다.
기존 기능도 계속 작동합니다.`,
    },
    {
      title: "검증된 2일차 결과 저장하기",
      content: `최종 테스트 뒤:

index.html 복사
이름: day2-final-save.html

저장한 복사본을 열고 테스트하세요.`,
    },
    {
      title: "통제 문장 찾기",
      content: `유용한 요청 하나를 보여 주세요.

짝이 찾을 것:
1. 변경 하나
2. do not change
3. success means

그다음 역할을 바꾸세요.`,
    },
    {
      title: "마무리 기록",
      content: `다음을 적으세요.

1. 모호한 요청에서 빠진 것 하나
2. Action / Expected / Actual 하나
3. 중요한 Handoff 문장 하나
4. 아직 필요한 도움

표시: GREEN / YELLOW / RED`,
    },
    {
      title: "2일차 완료",
      content: `명확한 요청.
실제 테스트.
FIX 하나.
유용한 Context.
작동하는 Save Point.

2일차 폴더를 보관하세요.`,
    },
  ],
  3: [
    {
      title: "3일차 — 문제에서 v0로",
      content: `3일차
문제에서 v0로

열기:
3일차 학생 워크시트

닫아 두기:
AI 채팅
my-app`,
    },
    {
      title: "루프 떠올리기",
      content: `노트 없이. AI 없이.

다섯 단어를 적으세요.

_____ → _____ → _____ → _____ → _____

그다음 짝과 비교하세요.`,
    },
    {
      title: "이 프로젝트는 여러분의 것입니다",
      content: `주제는 여러분이 선택합니다.

AI가 선택하지 않습니다.
강사가 선택하지 않습니다.

작게 시작하세요.
테스트 가능하게 만드세요.
안전하게 지키세요.`,
    },
    {
      title: "약속하기",
      content: `워크시트의 약속 다섯 개를
모두 확인하세요.

그다음 현재 상태를 보여 주세요.

GREEN  = 준비됨
YELLOW = 질문 하나
RED    = 진행 불가`,
    },
    {
      title: "나의 방향, 나의 선택",
      content: `검색하지 마세요.
AI에게 묻지 마세요.
주제 목록을 사용하지 마세요.

자신의 관찰을 살펴보세요.
가능한 방향 세 가지를 적으세요.`,
    },
    {
      title: "관찰 세 가지 적기",
      content: `A, B, C마다 적을 것:

1. 어떤 상황을 발견했나요?
2. 누가 그 상황을 겪나요?
3. 무엇이 어렵거나 느리거나 불분명한가요?

개인정보는 사용하지 마세요.`,
    },
    {
      title: "A, B, C 비교하기",
      content: `각 방향을 확인하세요.

□ 나에게 중요합니다.
□ 사용자를 말할 수 있습니다.
□ 문제 하나를 설명할 수 있습니다.
□ 개인정보 없이 작업할 수 있습니다.
□ 브라우저 하나에서 작은 부분을 테스트할 수 있습니다.`,
    },
    {
      title: "하나 선택하기",
      content: `표시: A / B / C

적기:
선택한 이유는 __________입니다.

확인:
□ 이것은 내가 한 선택입니다.`,
    },
    {
      title: "사용자 말하기",
      content: `역할 또는 집단을 적으세요.
실제 사람의 이름은 쓰지 마세요.

The user is ____________________.

다른 사람이 이해할 수 있나요?`,
    },
    {
      title: "문제 하나 적기",
      content: `The user needs help because
________________________________.

문제 하나.
명확한 문장 하나.

아직 기능을 적지 마세요.`,
    },
    {
      title: "성공을 테스트 가능하게 만들기",
      content: `Success means the user can
________________________________.

질문:
눈으로 볼 수 있나요?
테스트할 수 있나요?`,
    },
    {
      title: "짝과 확인",
      content: `세 문장을 읽으세요.

짝은 다음 세 가지만 질문합니다.

1. 사용자는 누구인가?
2. 문제 하나는 무엇인가?
3. 성공을 어떻게 확인할 수 있는가?

불분명한 문장 하나를 고치세요.`,
    },
    {
      title: "MUST인가 NICE인가?",
      content: `MUST
문제를 해결하려면 필요합니다.

NICE
MUST가 끝날 때까지 기다릴 수 있습니다.

오늘은 MUST 1만 만듭니다.`,
    },
    {
      title: "MUST 1, 2, 3 작성하기",
      content: `각 MUST에 적을 것:

The user can __________.

Test:
When __________,
I can see __________.

각 MUST를 분리하세요.`,
    },
    {
      title: "NICE 1과 NICE 2 작성하기",
      content: `나중에 해도 되는 아이디어 두 개를 적으세요.

NICE 1: ____________________
NICE 2: ____________________

오늘 만들지 마세요.`,
    },
    {
      title: "범위 게이트",
      content: `계획을 확인하세요.

□ MUST 1을 테스트할 수 있습니다.
□ MUST 1이 50분 안에 가능합니다.
□ 브라우저 하나와 index.html 하나로 충분합니다.
□ 로그인, 서버, 결제, 외부 API가 없습니다.
□ 개인정보나 비밀 정보가 없습니다.

아니라면 YELLOW를 표시하세요.`,
    },
    {
      title: "휴식 — 10분",
      content: `휴식

01:25에 돌아오세요.

Project Brief 페이지를 준비해 두세요.
만들기 시작하지 마세요.`,
    },
    {
      title: "하나의 Project Brief",
      content: `Project Brief에는 12개 항목이 있습니다.

자신의 말로 작성하세요.
범위를 작게 유지하세요.
빈 항목을 남기지 마세요.

AI는 아직 닫아 둡니다.`,
    },
    {
      title: "12개 항목 모두 작성하기",
      content: `1–12번 항목 확인:

□ 프로젝트 이름
□ User
□ Problem
□ Success means
□ MUST 1, 2, 3 + 테스트
□ NICE 1, 2
□ Constraints
□ 안전 확인
□ v0 slice`,
    },
    {
      title: "v0 화면 그리기",
      content: `화면 하나를 그리세요.

표시:
1 = 프로젝트 제목
2 = MUST 1 시작
3 = 눈에 보이는 결과

행동 하나 → 결과 하나`,
    },
    {
      title: "검토할 준비가 되었나요?",
      content: `AI 검토 전에:

□ 12개 항목을 모두 작성했습니다.
□ 와이어프레임에 MUST 1이 보입니다.
□ 주제는 여전히 내가 선택한 것입니다.
□ 개인정보가 없습니다.

GREEN 또는 YELLOW를 보여 주세요.`,
    },
    {
      title: "AI는 검토합니다. AI가 선택하지 않습니다.",
      content: `AI가 해도 되는 일:
명확성, 크기, 테스트, 안전 확인

AI가 하면 안 되는 일:
주제 선택 또는 변경
기능 추가, 교체 또는 결합
지금 파일 만들기

워크시트의 검토 프롬프트를 사용하세요.`,
    },
    {
      title: "검토 프롬프트 하나 보내기",
      content: `1. AI 계획 검토 프롬프트를 복사하세요.
2. Project Brief를 추가하세요.
3. 한 번 보내세요.
4. 답을 읽으세요.
5. 새 주제나 기능은 받아들이지 마세요.

아직 파일을 만들지 않습니다.`,
    },
    {
      title: "강사 승인 게이트",
      content: `강사에게 보여 줄 것:

1. Project Brief
2. 와이어프레임
3. AI 검토

현재 상태:
APPROVED / REVISE

APPROVED 전에 만들지 마세요.`,
    },
    {
      title: "현재 상태 보여 주기",
      content: `APPROVED
my-app을 열고 v0를 시작합니다.

REVISE
표시된 계획 한 줄만 수정합니다.

APPROVED + BUILD PENDING
Offline Plan Pack을 사용합니다.`,
    },
    {
      title: "v0 Studio 시작하기",
      content: `APPROVED 학생:

열기: my-app
작업 파일: my-app/index.html

브라우저 하나.
index.html 하나.

아직 Save Point를 만들지 마세요.`,
    },
    {
      title: "v0 Slice만 만들기",
      content: `v0에 보여야 할 것:

□ 프로젝트 제목
□ 짧은 사용자 및 목적 문장
□ MUST 1 시작
□ 사용자 행동 하나
□ 눈에 보이는 결과 하나

워크시트의 제작 프롬프트를 사용하세요.`,
    },
    {
      title: "제작 과정 WATCH",
      content: `index.html에서 만드세요.

AI가 작업하는 동안:

□ 모든 변경을 읽으세요.
□ MUST 1만 유지하세요.
□ 기능 확장을 멈추세요.
□ 개인정보나 비밀 정보를 입력하지 마세요.

결과는 여러분의 책임입니다.`,
    },
    {
      title: "중간 확인",
      content: `현재 상태를 보여 주세요.

GREEN
MUST 1이 보입니다.

YELLOW
페이지는 열리지만 경로가 완성되지 않았습니다.

RED
페이지가 열리지 않거나 작업이 막혔습니다.`,
    },
    {
      title: "v0 CHECK",
      content: `브라우저 하나에서 테스트:

□ index.html이 열립니다.
□ 제목이 보입니다.
□ 사용자 및 목적 문장이 보입니다.
□ MUST 1을 시작할 수 있습니다.
□ 행동 하나가 눈에 보이는 결과 하나를 만듭니다.
□ 추가 기능이 작동하지 않습니다.
□ 개인정보나 비밀 정보가 없습니다.

PASS 또는 FAIL을 기록하세요.`,
    },
    {
      title: "작은 차이 하나 FIX",
      content: `확인 하나가 실패했다면:

1. 실패한 확인을 말하세요.
2. 작은 수정 하나를 요청하세요.
3. 그 부분만 바꾸세요.
4. 다시 테스트하세요.

기능을 추가하지 마세요.`,
    },
    {
      title: "Save Point 만들기",
      content: `모든 v0 확인이 통과한 뒤에만:

작업 파일 유지:
my-app/index.html

검증된 Save Point 생성:
my-app/day3-v0-save.html

Save Point를 열고 한 번 테스트하세요.`,
    },
    {
      title: "30초 소개 준비하기",
      content: `My user is __________.
The problem is __________.
Success means __________.
Today my v0 can __________.
My next action is __________.

30초.`,
    },
    {
      title: "짝 소개",
      content: `Partner A: 30초 동안 소개합니다.
Partner B: 분명하게 들린 점 하나를 말합니다.

역할을 바꾸세요.

새 주제나 기능을 제안하지 마세요.`,
    },
    {
      title: "마무리 기록",
      content: `세 줄을 적으세요.

1. 나의 상태:
   APPROVED / REVISE / BUILD PENDING
2. 오늘의 증거:
   __________________________
3. 다음 시간 첫 행동:
   __________________________

워크시트를 제출하세요.`,
    },
    {
      title: "3일차 완료",
      content: `여러분이 선택했습니다.
여러분이 계획했습니다.
여러분이 테스트했습니다.
여러분이 증거를 저장했습니다.

다음 시간:
검증된 Save Point에서 계속합니다.`,
    },
  ],
  4: [
    {
      title: "4일차 — 안전한 Slice 하나 만들기",
      content: `3일차 자신의 프로젝트를 계속합니다.
my-app/index.html을 여세요.
아직 어떤 파일도 바꾸지 마세요.`,
    },
    {
      title: "3일차 행동 하나 테스트하기",
      content: `Green ✓  페이지가 열리고 기존 행동이 작동함
Yellow ? 페이지가 열리지만 확인 하나가 불분명함
Red !    파일이 없거나, 고장 났거나, 진행 불가

지금 카드 하나를 보여 주세요.`,
    },
    {
      title: "자신의 코드 지도 만들기",
      content: `HTML       = structure
CSS        = presentation
JavaScript = behavior

읽기만 하세요. 파일을 수정하지 마세요.`,
    },
    {
      title: "외우지 말고 가리키기",
      content: `1. HTML 부분 하나를 가리키세요.
2. CSS 부분 하나를 가리키세요.
3. JavaScript 부분 하나를 가리키세요.
4. 확인: 파일이 바뀌었나요?

필요하면 “not used yet”이라고 적으세요.`,
    },
    {
      title: "행동 하나 추적하기",
      content: `Event → State → Screen

사용자가 무엇을 했나요?
무엇이 바뀌거나 읽혔나요?
사용자가 무엇을 보았나요?`,
    },
    {
      title: "사용한다면 Storage까지",
      content: `Event → State → Screen → Storage

변경 → 새로고침 → 다시 열기 → 확인

적기:
used / not used / not reliable`,
    },
    {
      title: "안전한 Sprint 하나",
      content: `ONE MUST SLICE → TELL → WATCH
→ CHECK SUCCESS → CHECK REGRESSION
→ SAVE → HANDOFF

3일차 계획에서 선택하세요.`,
    },
    {
      title: "시작 Save Point 만들기",
      content: `작업:  my-app
안전:  my-app-day4-start

두 폴더를 서로 나란히 두세요.
복사본을 열고 기존 행동 하나를 테스트하세요.`,
    },
    {
      title: "휴식 — 10분",
      content: `01:15에 돌아오세요.
프로젝트 파일을 바꾸지 마세요.

다음: 네 가지 복구 방법`,
    },
    {
      title: "막혔을 때",
      content: `1. 정확한 문제를 보고합니다.
2. 오늘 검증된 경우에만 /undo를 사용합니다.
3. 더 작은 단계를 요청합니다.
4. 새로운 Context로 시작합니다.

먼저 멈추고 안전 복사본을 찾으세요.`,
    },
    {
      title: "첫 번째 안전한 방법 선택하기",
      content: `정확하게: action + expected + actual
더 작게: 단계 하나 + 눈에 보이는 테스트 하나
새롭게: handoff + read + plan + wait

비밀번호나 비밀 키는 절대 공유하지 마세요.`,
    },
    {
      title: "승인받기",
      content: `3일차 계획의 MUST slice 하나
사용자 행동 하나
눈에 보이는 결과 하나
회귀 확인 하나
작동하는 시작 Save Point

APPROVED / REDUCE / HOLD`,
    },
    {
      title: "Studio A: 전달하고 관찰하기",
      content: `STUDIO A — TELL & WATCH

승인된 slice를 사용하세요.
먼저 짧은 계획을 요청하세요.
성공 + 회귀 + 파일 범위를 확인하세요.
가장 작은 첫 단계만 승인하세요.

Green ✓ / Yellow ? / Red !`,
    },
    {
      title: "Studio B: 만들고 확인하기",
      content: `STUDIO B — BUILD & CHECK

1. 새로고침합니다.
2. 성공 행동을 합니다.
3. 실제 결과를 적습니다.
4. Pass 또는 Not yet을 표시합니다.

AI가 “done”이라고 말한 것은 테스트가 아닙니다.`,
    },
    {
      title: "Studio C: 수정, 복구, 회귀 확인",
      content: `STUDIO C — FIX, RECOVER & REGRESS

02:10–02:25  수정하거나 복구 방법 하나 선택
02:25–02:35  같은 행동 다시 테스트

기존 행동 하나도 테스트하세요.
새 기능 작동 + 기존 기능도 계속 작동.`,
    },
    {
      title: "Studio D: 저장하고 인계하기",
      content: `STUDIO D — SAVE & HANDOFF

생성: my-app-day4-slice
my-app 옆에 두세요.
복사본을 열고 성공 + 회귀를 테스트하세요.

마지막 안전 복사본과 다음 작은 단계를 적으세요.`,
    },
    {
      title: "최종 체크포인트 — 수정 중지",
      content: `보여 줄 것:
1. 현재 my-app
2. 성공 결과
3. 회귀 결과
4. 작동하는 my-app-day4-slice
5. Context Handoff

최종: Green ✓ / Yellow ? / Red !`,
    },
  ],
  5: [
    {
      title: "5일차 미션",
      content: `5일차
테스트하고, 배우고, 완성하기

먼저 4일차 버전을 보호하세요.
오늘은 큰 새 기능을 추가하지 않습니다.
현재 약속한 기능을 작동하게 만드세요.`,
    },
    {
      title: "주장은 증거가 아니다",
      content: `“AI says it works.”
는 증거가 아닙니다.

Action + Expected + Actual
이 증거입니다.`,
    },
    {
      title: "네 가지 테스트 유형",
      content: `HAPPY — 의도한 사용
EMPTY — 필요한 것이 없음
INVALID — 허용되지 않음
BOUNDARY — 범위의 경계`,
    },
    {
      title: "테스트 카드",
      content: `TYPE (유형)
ACTION / INPUT (행동 / 입력)
EXPECTED (예상)
ACTUAL (실제)
PASS? (통과?)`,
    },
    {
      title: "Expected를 눈에 보이게",
      content: `이렇게 쓰지 마세요.
“It works well.”

눈으로 보거나, 반복하거나,
비교할 수 있는 결과를 적으세요.`,
    },
    {
      title: "카드 네 개 준비",
      content: `동료 테스트 전에:

□ HAPPY
□ EMPTY
□ INVALID
□ BOUNDARY

카드 하나가 불분명하면 YELLOW를 보여 주세요.`,
    },
    {
      title: "동료 테스트 규칙",
      content: `MAKER: 설명하지 말고 관찰합니다.
TESTER: 사용하며 생각을 말합니다.

개인정보 금지.
테스트 중 수정 금지.`,
    },
    {
      title: "1회차",
      content: `동료 테스트 — 1회차

테스터가 프로젝트를 사용합니다.
제작자가 기록할 것:
멈춤 · 반복 · 잘못 간 경로 · 결과`,
    },
    {
      title: "역할 바꾸기",
      content: `멈추세요.
관찰 내용을 저장하세요.
역할을 바꾸세요.

아직 수정하지 마세요.`,
    },
    {
      title: "2회차",
      content: `동료 테스트 — 2회차

카드를 사용하세요.
무엇을 시도하는지 말하세요.
실제로 일어나는 일을 기록하세요.`,
    },
    {
      title: "휴식",
      content: `휴식 — 10분

수정을 시작하지 마세요.
01:10에 돌아오세요.`,
    },
    {
      title: "증거 목록 만들기",
      content: `문제를 증거로 적으세요.

테스터가 ___했을 때,
프로젝트가 ___했습니다.
Expected: ___.`,
    },
    {
      title: "우선순위 선택하기",
      content: `MUST FIX — 막힘, 잘못됨, 안전하지 않음
SHOULD FIX — 어렵지만 우회 방법 있음
LATER — 새롭거나 크거나 오늘 할 일이 아님`,
    },
    {
      title: "최대 세 개",
      content: `수정은 최대 3개만 선택하세요.

1. 가장 중요
2. 그다음으로 중요
3. 시간이 남을 때만`,
    },
    {
      title: "안전 확인",
      content: `□ 비밀번호나 API 키 없음
□ 민감한 개인정보 없음
□ 중요한 사실 확인 완료
□ 외부 링크의 의미를 알고 있음`,
    },
    {
      title: "빠른 접근성 확인",
      content: `□ 분명한 제목과 버튼 이름
□ 읽을 수 있는 글자
□ Tab으로 주요 조작 요소에 도달
□ 키보드 포커스가 보임
□ 입력창에 라벨이 있음`,
    },
    {
      title: "좁은 창 테스트",
      content: `브라우저 창을 좁게 만드세요.

여전히 가능한가요?
읽기 · 클릭 · 입력 · 이해

문제 하나를 기록하세요.`,
    },
    {
      title: "수정 계획",
      content: `PROBLEM (문제)
EVIDENCE (증거)
SMALL FIX (작은 수정)
SUCCESS MEANS (성공 기준)
MUST KEEP WORKING (계속 작동해야 할 것)`,
    },
    {
      title: "승인 게이트",
      content: `Studio 전에:

□ MUST FIX 먼저
□ 작은 변경 하나
□ 테스트 가능한 성공
□ 큰 새 기능 없음

READY / MAKE IT SMALLER`,
    },
    {
      title: "Studio 규칙",
      content: `PROJECT STUDIO — 60분

문제 하나를 수정하세요.
수정 결과를 테스트하세요.
MUST 경로를 다시 테스트하세요.
작동하는 버전만 저장하세요.`,
    },
    {
      title: "수정 1",
      content: `FIX 1 — 가장 중요

Evidence → Expected → Small fix

작동하는 모든 MUST 기능을 유지하세요.`,
    },
    {
      title: "체크포인트 1",
      content: `✓ GREEN — 수정과 MUST 테스트 통과
! YELLOW — 프로젝트는 열리지만 수정 실패
✕ RED — 프로젝트 또는 주요 경로가 고장 남`,
    },
    {
      title: "수정 2",
      content: `FIX 2

승인된 문제만 바꾸세요.
Fix 1을 다시 테스트하세요.
주요 경로를 다시 테스트하세요.`,
    },
    {
      title: "체크포인트 2",
      content: `현재 상태를 보여 주세요.

GREEN — 계속
YELLOW — 수정을 더 작게
RED — 멈추고 복구`,
    },
    {
      title: "수정 3 또는 다시 테스트",
      content: `선택:

A. 작다면 Fix 3
B. 모든 MUST 기능 다시 테스트

더 많이 만드는 것보다 작동하는 것이 중요합니다.`,
    },
    {
      title: "최종 Smoke Test",
      content: `□ 처음부터 열림
□ 주요 데모 경로 작동
□ 새로고침하고 다시 시도
□ 작업을 막는 오류 없음
□ 개인정보나 비밀 정보 없음`,
    },
    {
      title: "발표 후보 버전(Release Candidate)",
      content: `단일 파일:
my-app/day5-release-candidate.html

여러 파일:
my-app-day5-release-candidate

복사본을 열고 테스트하세요.`,
    },
    {
      title: "데모 경로",
      content: `6일차 경로

Open:
Click or enter:
Show:`,
    },
    {
      title: "5일차 완료",
      content: `TEST → OBSERVE → PRIORITIZE
FIX → RE-TEST → SAVE

내일: 출시와 발표

GREEN / YELLOW / RED?`,
    },
  ],
  6: [
    {
      title: "6일차",
      content: `6일차
출시 · 발표 · 회고

오늘은 증명하는 날입니다.
새 기능을 만드는 날이 아닙니다.`,
    },
    {
      title: "작동하는 버전 선택하기",
      content: `열기:
1. my-app/day5-release-candidate.html
   또는 my-app-day5-release-candidate
2. 현재 my-app

가장 새로운 버전이 아니라
작동하는 버전을 선택하세요.`,
    },
    {
      title: "데모 경로 실행하기",
      content: `OPEN
CLICK OR ENTER
SHOW
REFRESH
REPEAT

전체 경로를 테스트하세요.`,
    },
    {
      title: "준비 상태",
      content: `✓ GREEN — 동결 준비 완료
! YELLOW — 데모 Blocker 하나
✕ RED — 프로젝트 또는 주요 경로 실패

지금 현재 상태를 보여 주세요.`,
    },
    {
      title: "최종 Blocker 게이트",
      content: `다음 조건을 모두 만족할 때만 최종 Blocker입니다.

□ 반복해서 재현할 수 있습니다.
□ 데모를 막습니다.
□ 새 기능이 아닙니다.
□ 작은 변경 하나로 테스트할 수 있습니다.`,
    },
    {
      title: "마지막 수정 시간",
      content: `10분 FIX 시간

Action → Actual → Expected
Blocker만 수정하세요.
모든 MUST 기능을 유지하세요.`,
    },
    {
      title: "다시 테스트하거나 복구하기",
      content: `전체 데모 경로를 다시 실행하세요.

PASS → 이 버전 사용
FAIL → 5일차 candidate 복구

고장 난 “더 새로운” 버전을 유지하지 마세요.`,
    },
    {
      title: "코드 동결(Code Freeze)",
      content: `CODE FREEZE

새 AI 변경 요청 금지.
새 기능 금지.
재설계 금지.

새 아이디어는 나중을 위해 적으세요.`,
    },
    {
      title: "최종 백업",
      content: `단일 파일: my-app/day6-final.html

여러 파일:
my-app-day6-final

복사본을 열고 테스트하세요.`,
    },
    {
      title: "휴식",
      content: `휴식 — 10분

개인 탭과 알림을 닫으세요.
01:00에 돌아오세요.
첫 발표자들은 준비하세요.`,
    },
    {
      title: "2분 구성",
      content: `0:00–0:20  USER & PROBLEM
0:20–1:20  작동하는 MUST 기능
1:20–1:45  테스트와 배움
1:45–2:00  한계와 다음 단계`,
    },
    {
      title: "클릭 경로 적기",
      content: `다음만 적으세요.

OPEN:
CLICK OR ENTER:
SHOW:
STOP:

불필요한 클릭을 제거하세요.`,
    },
    {
      title: "짝 리허설",
      content: `짝 리허설

2분: 데모
1분: 피드백
역할을 바꾸고 반복

최종 백업을 사용하세요.`,
    },
    {
      title: "발표자 최종 확인",
      content: `□ 최종 파일이 열려 있음
□ 클릭 경로 준비됨
□ 대체 자료 준비됨
□ 개인 탭 닫힘

발표자 1–3: 지금 준비하세요.`,
    },
    {
      title: "Showcase 타이머",
      content: `발표자 __ / __

2:00  DEMO
1:00  QUESTION OR FEEDBACK
1:00  SWITCH

증거를 보여 주세요.
다음 발표자의 시간을 지켜 주세요.`,
    },
    {
      title: "피드백: 직접 본 것",
      content: `FEEDBACK 1

I saw: (내가 본 것)
One clear decision: (분명한 결정 하나)
One question: (질문 하나)`,
    },
    {
      title: "피드백: 하나 더",
      content: `FEEDBACK 2

I saw: (내가 본 것)
One clear decision: (분명한 결정 하나)
One question: (질문 하나)`,
    },
    {
      title: "피드백 전달하기",
      content: `카드 두 장을 모두 전달하세요.

평가하지 않을 것:
영어 유창성 · 프로젝트 주제 · 시각 취향`,
    },
    {
      title: "개인 회고",
      content: `I decided: (내가 결정한 것)
I checked: (내가 확인한 것)
I recovered by: (내가 복구한 방법)
Next time I will: (다음에 할 것)
I want to learn: (배우고 싶은 것)`,
    },
    {
      title: "최종 인계",
      content: `□ 최종 프로젝트
□ 최종 백업
□ Project Brief
□ 테스트 카드
□ 유용한 프롬프트
□ 데모 대본
□ 회고`,
    },
    {
      title: "과정 완료",
      content: `GOAL → SLICE → BUILD
TEST → IMPROVE → SAVE

AI가 도왔습니다.
여러분이 결정하고, 확인하고, 책임졌습니다.`,
    },
  ],
};

export function getLocalizedPresentationSlides(
  day: number,
  language: Language,
  slides: PresentationSlide[],
): PresentationSlide[] {
  if (language !== "ko") {
    return slides.map((slide) => ({
      ...slide,
      completion: slide.completion
        ? (completionEnglishByKorean[slide.completion] ?? slide.completion)
        : undefined,
    }));
  }

  const translations = koreanSlides[day];
  if (!translations || translations.length !== slides.length) {
    return slides;
  }

  return slides.map((slide, index) => ({
    ...slide,
    ...translations[index],
  }));
}
