import { text, type InteractiveDayPlan } from "./types";

export const day3Plan: InteractiveDayPlan = {
  day: 3,
  title: text(
    "Make the Design Intentional",
    "의도가 보이는 디자인 만들기",
  ),
  question: text(
    "How can I remove generic AI defaults and make the page fit its user and content?",
    "AI의 일반적인 기본값을 줄이고 사용자와 콘텐츠에 맞는 화면을 만들려면 어떻게 해야 할까요?",
  ),
  artifact: text(
    "A clear design direction, a refined personal project, before-and-after evidence, and a tested backup",
    "분명한 디자인 방향, 개선된 개인 프로젝트, 전후 근거, 시험한 백업",
  ),
  stages: [
    {
      id: "day3-first-screen-observation",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "CHECK",
      title: text(
        "Observe the first screen without explanation",
        "설명 없이 서로의 첫 화면 보기",
      ),
      goal: text(
        "Learn what the screen communicates before the maker explains it.",
        "제작자가 설명하기 전에 화면이 무엇을 전달하는지 확인합니다.",
      ),
      studentBrief: [
        text(
          "Open a partner's first screen, stay silent, and record the first focus, first intended action, and understood purpose.",
          "짝의 첫 화면을 열고 말하지 않은 채 첫 시선, 처음 하려는 행동, 이해한 목적을 기록하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Keep the maker silent for the observation. This is an information-order check, not a taste vote.",
          "관찰 중 제작자는 말하지 않게 한다. 취향 투표가 아니라 정보 순서 확인임을 강조한다.",
        ),
      ],
      completion: text(
        "The learner records what a partner noticed and attempted without instruction.",
        "학생이 설명 없이 짝이 무엇을 보고 무엇을 하려 했는지 기록했습니다.",
      ),
      activities: [
        {
          id: "day3-first-impression-evidence",
          kind: "short-answer",
          title: text("Record the first impression", "첫인상 기록"),
          instruction: text(
            "Write where your partner looked first, what they wanted to do first, and what they thought the page was for.",
            "짝이 처음 본 곳, 처음 하려 한 행동, 페이지의 목적이라고 이해한 것을 적으세요.",
          ),
          placeholder: text(
            "First focus… First action… Understood purpose…",
            "첫 시선… 첫 행동… 이해한 목적…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-design-is-information-order",
      start: "00:15",
      end: "00:30",
      minutes: 15,
      phase: "TELL",
      title: text(
        "Treat design as information order",
        "디자인은 정보의 순서라는 설명",
      ),
      goal: text(
        "Use position, size, weight, spacing, and contrast to show what matters first.",
        "위치, 크기, 굵기, 간격, 대비로 중요한 순서를 보여 줍니다.",
      ),
      studentBrief: [
        text(
          "Look for the page's one main message, one main action, and supporting information.",
          "페이지의 핵심 메시지 하나, 핵심 행동 하나, 보조 정보를 찾아보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Demonstrate that emphasizing everything removes hierarchy. Change order and scale before discussing decoration.",
          "모든 것을 강조하면 위계가 사라짐을 보여 준다. 장식을 말하기 전에 순서와 크기를 바꾼다.",
        ),
      ],
      completion: text(
        "The learner can point to the main message, main action, and supporting content.",
        "학생이 핵심 메시지, 핵심 행동, 보조 콘텐츠를 짚을 수 있습니다.",
      ),
      activities: [
        {
          id: "day3-information-order-read",
          kind: "read",
          title: text("Information hierarchy", "정보 위계"),
          instruction: text(
            "Observe how position, size, weight, spacing, and contrast change reading order.",
            "위치, 크기, 굵기, 간격, 대비가 읽는 순서를 어떻게 바꾸는지 관찰하세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day3-diagnose-ai-defaults",
      start: "00:30",
      end: "00:45",
      minutes: 15,
      phase: "CHECK",
      title: text(
        "Diagnose common AI-generated defaults",
        "흔한 AI 생성 화면 진단",
      ),
      goal: text(
        "Replace the vague phrase 'AI-looking' with observable content, structure, style, or interaction problems.",
        "‘AI처럼 보인다’는 모호한 표현을 관찰 가능한 콘텐츠·구조·스타일·상호작용 문제로 바꿉니다.",
      ),
      studentBrief: [
        text(
          "Use the common diagnostic file and name one specific problem that can be changed.",
          "공통 진단 파일을 보고 실제로 바꿀 수 있는 구체적인 문제 하나를 말하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Open labs/day3-ai-looking.html. Ask for observations, not a blanket ban on gradients, cards, rounded corners, or any single style.",
          "labs/day3-ai-looking.html을 연다. 그라데이션·카드·둥근 모서리 같은 특정 스타일을 전부 금지하지 말고 관찰을 요구한다.",
        ),
      ],
      completion: text(
        "The learner writes one observable problem and explains why it harms the page's purpose.",
        "학생이 관찰 가능한 문제 하나와 그것이 페이지 목적을 방해하는 이유를 적었습니다.",
      ),
      activities: [
        {
          id: "day3-ai-default-diagnosis",
          kind: "short-answer",
          title: text("Write a concrete diagnosis", "구체적인 진단 작성"),
          instruction: text(
            "Name the exact content, structure, style, or interaction problem and its effect on the visitor.",
            "정확한 콘텐츠·구조·스타일·상호작용 문제와 그것이 방문자에게 미치는 영향을 적으세요.",
          ),
          placeholder: text(
            "I observed… This makes it harder to…",
            "나는 …을 관찰했습니다. 이 때문에 방문자가 …하기 어렵습니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-real-content-consistent-limits",
      start: "00:45",
      end: "00:55",
      minutes: 10,
      phase: "TELL",
      title: text(
        "Use real content and consistent design limits",
        "실제 콘텐츠와 일관된 디자인 제한",
      ),
      goal: text(
        "Build a small visual system from typography, spacing, color, and surfaces.",
        "글자, 간격, 색, 표면으로 작고 일관된 시각 체계를 만듭니다.",
      ),
      studentBrief: [
        text(
          "Keep a small number of text roles, spacing steps, colors, and surface styles.",
          "글자 역할, 간격 단계, 색, 표면 스타일의 수를 작게 유지하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Show consistency as a decision aid, not a universal minimalist style.",
          "일관성을 모두에게 같은 미니멀 스타일을 강요하는 규칙이 아니라 결정을 돕는 기준으로 설명한다.",
        ),
      ],
      completion: text(
        "The learner understands that repeated limits create coherence.",
        "학생이 반복되는 제한이 일관성을 만든다는 것을 이해합니다.",
      ),
      activities: [
        {
          id: "day3-visual-system-read",
          kind: "read",
          title: text("Small visual system", "작은 시각 체계"),
          instruction: text(
            "Observe how a limited set of type, spacing, color, and surfaces supports the content.",
            "제한된 글자·간격·색·표면 체계가 콘텐츠를 어떻게 돕는지 관찰하세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day3-live-before-after-demo",
      start: "00:55",
      end: "01:15",
      minutes: 20,
      phase: "WATCH",
      title: text(
        "Watch a before-and-after improvement",
        "강사 전후 개선 시연",
      ),
      goal: text(
        "See a safe sequence: audit first, then structure, type and spacing, then color and surfaces.",
        "먼저 진단하고 구조, 글자와 여백, 색과 표면 순서로 안전하게 개선하는 과정을 봅니다.",
      ),
      studentBrief: [
        text(
          "Notice what the teacher preserves, what changes first, and how every layer is tested.",
          "강사가 무엇을 유지하고 무엇을 먼저 바꾸며 각 층을 어떻게 시험하는지 보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Ask AI for an audit before a redesign. Approve one layer at a time and repeatedly test the existing behavior.",
          "새 디자인 전에 AI에게 진단부터 요청한다. 한 번에 한 층만 승인하고 기존 동작을 반복해서 시험한다.",
        ),
      ],
      completion: text(
        "The learner can state a useful order for design improvements.",
        "학생이 도움이 되는 디자인 개선 순서를 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day3-live-design-demo-read",
          kind: "read",
          title: text("Design improvement sequence", "디자인 개선 순서"),
          instruction: text(
            "Watch the audit, structure, typography, spacing, color, surface, mobile, and keyboard checks.",
            "진단, 구조, 글자, 간격, 색, 표면, 모바일, 키보드 확인 순서를 보세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day3-break",
      start: "01:15",
      end: "01:25",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest before the design clinic.", "디자인 클리닉 전에 쉽니다."),
      studentBrief: [
        text(
          "Pause and return when the timer ends.",
          "작업을 멈추고 타이머가 끝나면 돌아오세요.",
        ),
      ],
      teacherCue: [
        text(
          "Prepare the practice copy and reference screens during the break.",
          "휴식 중 공통 연습 사본과 참고 화면을 준비한다.",
        ),
      ],
      completion: text(
        "The learner returns ready to work in a safe copy.",
        "학생이 안전한 사본에서 작업할 준비를 해서 돌아옵니다.",
      ),
      activities: [
        {
          id: "day3-break-timer",
          kind: "timer",
          title: text("Ten-minute break", "10분 휴식"),
          instruction: text(
            "Rest and return at the end of the timer.",
            "쉬고 타이머가 끝나면 돌아오세요.",
          ),
          durationMinutes: 10,
          hidden: true,
        },
      ],
    },
    {
      id: "day3-common-design-clinic",
      start: "01:25",
      end: "01:45",
      minutes: 20,
      phase: "STUDIO",
      title: text("Run the common design clinic", "공통 디자인 클리닉"),
      goal: text(
        "Practice diagnosis and one-layer improvement in a disposable copy.",
        "버려도 되는 사본에서 진단과 한 층 개선을 연습합니다.",
      ),
      studentBrief: [
        text(
          "Copy the diagnostic file, change one design layer, and check that its behavior still works.",
          "진단 파일을 복사하고 디자인 층 하나를 바꾼 뒤 동작이 계속 작동하는지 확인하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Keep this practice separate from personal projects. Compare with the refined file only after learners make and explain a change.",
          "이 연습은 개인 프로젝트와 분리한다. 학생이 직접 바꾸고 설명한 뒤에만 개선본과 비교한다.",
        ),
      ],
      completion: text(
        "The practice copy shows one justified improvement and keeps the original behavior.",
        "연습 사본에 근거 있는 개선 한 가지가 보이고 원래 동작도 유지됩니다.",
      ),
      activities: [
        {
          id: "day3-clinic-change-evidence",
          kind: "short-answer",
          title: text("Explain the clinic change", "클리닉 변경 설명"),
          instruction: text(
            "Write the diagnosed problem, the one layer you changed, and the behavior you re-tested.",
            "진단한 문제, 바꾼 한 층, 다시 시험한 동작을 적으세요.",
          ),
          placeholder: text(
            "Problem… Changed layer… Re-tested behavior…",
            "문제… 바꾼 층… 다시 시험한 동작…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-analyze-reference",
      start: "01:45",
      end: "01:55",
      minutes: 10,
      phase: "CHECK",
      title: text("Analyze a reference screen", "참고 화면 분석"),
      goal: text(
        "Use references as evidence for decisions without copying a brand or layout.",
        "브랜드나 화면을 복제하지 않고 참고 자료를 결정 근거로 사용합니다.",
      ),
      studentBrief: [
        text(
          "Choose one principle to borrow and one visible element not to copy.",
          "가져올 원칙 하나와 복사하지 않을 눈에 보이는 요소 하나를 고르세요.",
        ),
      ],
      teacherCue: [
        text(
          "Require a source and a reason. Do not let learners recreate an entire reference screen.",
          "출처와 이유를 요구한다. 참고 화면 전체를 그대로 재현하지 않게 한다.",
        ),
      ],
      completion: text(
        "The learner records one reusable principle and one excluded element.",
        "학생이 재사용할 원칙 하나와 제외할 요소 하나를 기록했습니다.",
      ),
      activities: [
        {
          id: "day3-reference-decision",
          kind: "short-answer",
          title: text("Record the reference decision", "참고 자료 결정 기록"),
          instruction: text(
            "Save the reference source, the principle you will use, and what you will not copy.",
            "참고 자료 출처, 사용할 원칙, 복사하지 않을 것을 적으세요.",
          ),
          placeholder: text(
            "Source… Principle… I will not copy…",
            "출처… 가져올 원칙… 복사하지 않을 것…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-personal-design-direction",
      start: "01:55",
      end: "02:00",
      minutes: 5,
      phase: "TELL",
      title: text("Choose a personal design direction", "개인 디자인 방향"),
      goal: text(
        "Name three qualities that fit the project's user and situation.",
        "프로젝트의 사용자와 상황에 맞는 특성 세 가지를 정합니다.",
      ),
      studentBrief: [
        text(
          "Choose three direction words and connect each one to a visible decision.",
          "방향 단어 세 가지를 고르고 각각을 눈에 보이는 결정과 연결하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Reject vague words that have no visible consequence. Ask what each word changes on the page.",
          "화면에 드러나는 결과가 없는 모호한 단어는 다시 쓰게 한다. 각 단어가 페이지에서 무엇을 바꾸는지 묻는다.",
        ),
      ],
      completion: text(
        "Three direction words have a reason connected to the user or content.",
        "방향 단어 세 가지에 사용자 또는 콘텐츠와 연결된 이유가 있습니다.",
      ),
      activities: [
        {
          id: "day3-three-direction-words",
          kind: "short-answer",
          title: text("Write three direction words", "방향 단어 세 가지"),
          instruction: text(
            "Write three visual-direction words and one sentence explaining why they fit.",
            "시각 방향 단어 세 가지와 그 방향이 맞는 이유 한 문장을 적으세요.",
          ),
          placeholder: text(
            "Three words… They fit because…",
            "세 단어… 이 방향이 맞는 이유…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-improve-personal-design",
      start: "02:00",
      end: "02:40",
      minutes: 40,
      phase: "STUDIO",
      title: text(
        "Improve the personal project design",
        "개인 프로젝트 디자인 개선",
      ),
      goal: text(
        "Improve hierarchy and visual consistency while preserving the project's words and behavior.",
        "프로젝트의 문구와 동작을 유지하면서 정보 위계와 시각 일관성을 개선합니다.",
      ),
      studentBrief: [
        text(
          "Work from structure to typography and spacing, then color and surfaces, testing after each layer.",
          "구조, 글자와 간격, 색과 표면 순서로 작업하고 각 층 뒤에 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Stop whole-page rewrites and feature additions. Ask for before-and-after evidence and the reason for each accepted change.",
          "전체 페이지 재작성과 기능 추가를 막는다. 받아들인 변경마다 전후 근거와 이유를 요구한다.",
        ),
      ],
      completion: text(
        "The project has a clearer reading order, consistent visual choices, and its original main action still works.",
        "프로젝트의 읽는 순서가 더 분명하고 시각 선택이 일관되며 원래 핵심 동작도 작동합니다.",
      ),
      activities: [
        {
          id: "day3-design-change-evidence",
          kind: "short-answer",
          title: text(
            "Explain two design decisions",
            "디자인 결정 두 가지 설명",
          ),
          instruction: text(
            "Record two visible changes, why each helps this user, and which original behavior you kept working.",
            "눈에 보이는 변경 두 가지, 각각이 이 사용자에게 도움이 되는 이유, 계속 작동하게 유지한 원래 동작을 적으세요.",
          ),
          placeholder: text(
            "Decision 1… Reason… Decision 2… Reason… Preserved behavior…",
            "결정 1… 이유… 결정 2… 이유… 유지한 동작…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-mobile-keyboard-readability",
      start: "02:40",
      end: "02:55",
      minutes: 15,
      phase: "CHECK",
      title: text(
        "Check mobile, keyboard, and readability",
        "모바일·키보드·가독성 확인",
      ),
      goal: text(
        "Test the real page beyond the wide desktop view.",
        "넓은 데스크톱 화면을 벗어나 실제 페이지를 시험합니다.",
      ),
      studentBrief: [
        text(
          "Narrow the window, use Tab and Enter, and read the page without zooming.",
          "창을 좁히고 Tab과 Enter를 사용하며 확대하지 않고 페이지를 읽어 보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Accept observations from actual use, not AI claims about responsiveness or accessibility.",
          "반응형·접근성에 대한 AI의 주장 대신 실제 사용 관찰만 증거로 인정한다.",
        ),
      ],
      completion: text(
        "The main content and action remain usable at phone width and with the keyboard.",
        "휴대전화 너비와 키보드에서도 핵심 콘텐츠와 행동을 사용할 수 있습니다.",
      ),
      activities: [
        {
          id: "day3-usability-check-evidence",
          kind: "short-answer",
          title: text("Record the real-page checks", "실제 페이지 확인 기록"),
          instruction: text(
            "Record what happened at phone width, with Tab and Enter, and while reading the main content.",
            "휴대전화 너비, Tab과 Enter 사용, 핵심 콘텐츠 읽기에서 실제로 일어난 일을 적으세요.",
          ),
          placeholder: text(
            "Phone width… Keyboard… Readability…",
            "휴대전화 너비… 키보드… 가독성…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-save-before-after",
      start: "02:55",
      end: "03:00",
      minutes: 5,
      phase: "SAVE",
      title: text(
        "Keep before-and-after evidence",
        "전후 화면과 결정 보관",
      ),
      goal: text(
        "Preserve the design version and the evidence behind its decisions.",
        "디자인 버전과 그 결정을 뒷받침하는 근거를 보관합니다.",
      ),
      studentBrief: [
        text(
          "Save the desktop and mobile before-and-after views and open backups/day3-design.html.",
          "데스크톱과 모바일 전후 화면을 저장하고 backups/day3-design.html을 여세요.",
        ),
      ],
      teacherCue: [
        text(
          "Finish with the tested backup and evidence locations, not one more visual change.",
          "시각 변경을 하나 더 하지 말고 시험한 백업과 근거 위치를 남기고 끝낸다.",
        ),
      ],
      completion: text(
        "The design backup opens and the learner can locate the before-and-after evidence.",
        "디자인 백업이 열리고 학생이 전후 근거를 찾을 수 있습니다.",
      ),
      activities: [
        {
          id: "day3-design-backup-and-evidence",
          kind: "short-answer",
          title: text(
            "Record the backup and evidence",
            "백업과 근거 기록",
          ),
          instruction: text(
            "Write the design backup location and the locations of the desktop and mobile evidence.",
            "디자인 백업 위치와 데스크톱·모바일 근거 위치를 적으세요.",
          ),
          placeholder: text(
            "Backup… Desktop evidence… Mobile evidence…",
            "백업… 데스크톱 근거… 모바일 근거…",
          ),
          minimum: 1,
        },
      ],
    },
  ],
};

export const day4Plan: InteractiveDayPlan = {
  day: 4,
  title: text(
    "Complete One Core Interaction",
    "핵심 상호작용 하나 완성하기",
  ),
  question: text(
    "How can one user action produce a complete, visible, and trustworthy result?",
    "사용자의 행동 하나가 완전하고 눈에 보이며 믿을 수 있는 결과를 만들게 하려면 어떻게 해야 할까요?",
  ),
  artifact: text(
    "One working core interaction, relevant edge-state decisions, partner evidence, and a tested backup",
    "작동하는 핵심 상호작용, 관련 상태 결정, 짝의 사용 근거, 시험한 백업",
  ),
  stages: [
    {
      id: "day4-choose-one-user-action",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "TELL",
      title: text(
        "Choose today's one user action",
        "오늘 완성할 사용자 행동 정하기",
      ),
      goal: text(
        "Define one action and the visible result that will count as success today.",
        "오늘 성공으로 인정할 사용자 행동 하나와 눈에 보이는 결과를 정합니다.",
      ),
      studentBrief: [
        text(
          "Finish the sentence: When the user types, chooses, or clicks…, the page…",
          "문장을 완성하세요: 사용자가 …을 입력·선택·클릭하면 페이지는 …합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Reject feature lists. Keep narrowing until one person can perform one action and see one result.",
          "기능 목록을 받지 않는다. 한 사람이 행동 하나를 하고 결과 하나를 볼 수 있을 때까지 범위를 줄인다.",
        ),
      ],
      completion: text(
        "The sentence contains both a user action and an observable screen result.",
        "문장에 사용자 행동과 관찰 가능한 화면 결과가 모두 들어 있습니다.",
      ),
      activities: [
        {
          id: "day4-one-success-sentence",
          kind: "short-answer",
          title: text("Define one success", "성공 경험 하나 정의"),
          instruction: text(
            "Write the exact user action and the exact visible result you will complete today.",
            "오늘 완성할 정확한 사용자 행동과 정확한 화면 결과를 적으세요.",
          ),
          placeholder: text(
            "When the user… the page…",
            "사용자가 …하면 페이지는 …합니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-interaction-and-screen-state",
      start: "00:15",
      end: "00:25",
      minutes: 10,
      phase: "TELL",
      title: text(
        "Connect input, action, result, and screen state",
        "입력·선택·행동·결과와 화면 상태",
      ),
      goal: text(
        "Describe interaction in everyday language before discussing generated code.",
        "생성된 코드를 보기 전에 상호작용을 일상 언어로 설명합니다.",
      ),
      studentBrief: [
        text(
          "Identify what the page receives, what the person does, what changes, and what the page must remember now.",
          "페이지가 받는 것, 사람이 하는 것, 바뀌는 것, 지금 페이지가 기억해야 하는 것을 찾으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use visible examples of input, selection, action, result, and current state. Do not turn this into a JavaScript vocabulary lecture.",
          "입력, 선택, 행동, 결과, 현재 상태를 눈에 보이는 예로 설명한다. JavaScript 용어 강의로 바꾸지 않는다.",
        ),
      ],
      completion: text(
        "The learner can explain the interaction without relying on code terms.",
        "학생이 코드 용어 없이 상호작용을 설명할 수 있습니다.",
      ),
      activities: [
        {
          id: "day4-interaction-state-read",
          kind: "read",
          title: text("Interaction and state", "상호작용과 상태"),
          instruction: text(
            "Observe the chain from a person's action to the changed screen.",
            "사람의 행동이 바뀐 화면으로 이어지는 과정을 관찰하세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day4-define-results-before-build",
      start: "00:25",
      end: "00:35",
      minutes: 10,
      phase: "TELL",
      title: text(
        "Define normal and no-result behavior",
        "구현 전 정상 결과와 결과 없음 정의",
      ),
      goal: text(
        "Decide what the visitor sees in normal use and in one relevant empty, invalid, or no-result case.",
        "정상 사용과 관련 있는 빈값·잘못된 값·결과 없음 상황에서 방문자가 볼 것을 정합니다.",
      ),
      studentBrief: [
        text(
          "Write the normal result, one relevant non-normal result, and what must stay working.",
          "정상 결과, 관련 있는 비정상 결과 하나, 계속 작동해야 할 것을 적으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Do not force every project to have every error or storage state. Require only states that follow from the real use.",
          "모든 프로젝트에 모든 오류·저장 상태를 강제하지 않는다. 실제 사용에서 생기는 상태만 정하게 한다.",
        ),
      ],
      completion: text(
        "The learner has testable descriptions of the normal result and one relevant alternative state.",
        "학생이 정상 결과와 관련 있는 대체 상태 하나를 시험 가능한 문장으로 적었습니다.",
      ),
      activities: [
        {
          id: "day4-result-rules",
          kind: "short-answer",
          title: text("Write the result rules", "결과 규칙 작성"),
          instruction: text(
            "Record the normal result, one relevant empty, invalid, or no-result response, and what must remain unchanged.",
            "정상 결과, 관련 있는 빈값·잘못된 값·결과 없음 응답 하나, 바뀌면 안 되는 것을 적으세요.",
          ),
          placeholder: text(
            "Normal result… Relevant alternative… Keep working…",
            "정상 결과… 관련 대체 상태… 계속 작동할 것…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-live-feature-demo",
      start: "00:35",
      end: "00:55",
      minutes: 20,
      phase: "WATCH",
      title: text(
        "Watch a live interaction build",
        "강사 기능 구현 시연",
      ),
      goal: text(
        "See an existing page gain one interaction without losing its design or working parts.",
        "기존 페이지가 디자인과 작동 부분을 잃지 않고 상호작용 하나를 얻는 과정을 봅니다.",
      ),
      studentBrief: [
        text(
          "Watch the teacher inspect the current page, request a plan, approve one change, and test real inputs.",
          "강사가 현재 페이지를 확인하고 계획을 요청하고 변경 하나를 승인하고 실제 입력을 시험하는 과정을 보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use the Day 3 sample. Ask for a plan only, protect existing behavior and design, then test a match, another match, and no result.",
          "Day 3 공통 샘플을 사용한다. 계획만 먼저 요청하고 기존 동작과 디자인을 보호한 뒤 일치 결과, 다른 결과, 결과 없음을 시험한다.",
        ),
      ],
      completion: text(
        "The learner can describe the plan, implementation, and browser-test sequence.",
        "학생이 계획, 구현, 브라우저 테스트의 순서를 설명할 수 있습니다.",
      ),
      activities: [
        {
          id: "day4-live-feature-demo-read",
          kind: "read",
          title: text("Live feature demonstration", "라이브 기능 시연"),
          instruction: text(
            "Observe how one feature is added and checked without a redesign.",
            "디자인을 다시 만들지 않고 기능 하나를 추가하고 확인하는 과정을 보세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day4-common-filter-lab",
      start: "00:55",
      end: "01:15",
      minutes: 20,
      phase: "STUDIO",
      title: text("Complete the common interaction lab", "공통 기능 실습"),
      goal: text(
        "Practice making a selection change visible results and a result count.",
        "선택에 따라 눈에 보이는 결과와 결과 수가 바뀌게 만드는 연습을 합니다.",
      ),
      studentBrief: [
        text(
          "Work in the provided start file, make the filter respond, and test a matching and no-result choice.",
          "제공된 시작 파일에서 필터가 반응하게 만들고 일치 선택과 결과 없음 선택을 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use labs/day4-filter-start.html. Keep the task on interaction; reveal the working file only for checking or recovery.",
          "labs/day4-filter-start.html을 사용한다. 상호작용에 집중하고 확인·복구할 때만 완성본을 보여 준다.",
        ),
      ],
      completion: text(
        "The practice filter changes visible services and shows a clear no-result response.",
        "연습 필터가 보이는 서비스를 바꾸고 분명한 결과 없음 응답을 보여 줍니다.",
      ),
      activities: [
        {
          id: "day4-common-lab-evidence",
          kind: "short-answer",
          title: text("Record the common lab tests", "공통 실습 기록"),
          instruction: text(
            "Record one matching choice, the visible result count, one no-result choice, and what remained working.",
            "일치하는 선택 하나, 보이는 결과 수, 결과 없음 선택 하나, 계속 작동한 것을 적으세요.",
          ),
          placeholder: text(
            "Matching choice… Count… No-result choice… Preserved behavior…",
            "일치 선택… 결과 수… 결과 없음 선택… 유지된 동작…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-break",
      start: "01:15",
      end: "01:25",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest before the personal feature build.", "개인 기능 제작 전에 쉽니다."),
      studentBrief: [
        text(
          "Pause and return when the timer ends.",
          "작업을 멈추고 타이머가 끝나면 돌아오세요.",
        ),
      ],
      teacherCue: [
        text(
          "Prepare to help learners protect their Day 3 backup before personal implementation.",
          "개인 구현 전에 학생들이 Day 3 백업을 보호하도록 도울 준비를 한다.",
        ),
      ],
      completion: text(
        "The learner returns with the personal project and Day 3 backup ready.",
        "학생이 개인 프로젝트와 Day 3 백업을 준비해 돌아옵니다.",
      ),
      activities: [
        {
          id: "day4-break-timer",
          kind: "timer",
          title: text("Ten-minute break", "10분 휴식"),
          instruction: text(
            "Rest and return when the timer reaches zero.",
            "쉬고 타이머가 0이 되면 돌아오세요.",
          ),
          durationMinutes: 10,
          hidden: true,
        },
      ],
    },
    {
      id: "day4-decide-edge-and-storage",
      start: "01:25",
      end: "01:40",
      minutes: 15,
      phase: "TELL",
      title: text(
        "Decide relevant edge behavior and storage",
        "빈값·잘못된 값·저장 여부 판단",
      ),
      goal: text(
        "Choose only the empty, invalid, no-result, and refresh behavior that the real project needs.",
        "실제 프로젝트에 필요한 빈값·잘못된 값·결과 없음·새로고침 동작만 고릅니다.",
      ),
      studentBrief: [
        text(
          "Decide what should happen before input, after a relevant bad input, with no result, and after refresh.",
          "입력 전, 관련 있는 잘못된 입력, 결과 없음, 새로고침 뒤에 일어날 일을 정하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Explain that localStorage stays in one browser and device. Do not add storage when forgetting on refresh is acceptable.",
          "localStorage는 한 브라우저와 기기에만 남는다고 설명한다. 새로고침 뒤 사라져도 괜찮다면 저장을 추가하지 않는다.",
        ),
      ],
      completion: text(
        "The learner has made an explicit, use-based decision about relevant states and refresh behavior.",
        "학생이 실제 사용에 근거해 관련 상태와 새로고침 동작을 분명히 결정했습니다.",
      ),
      activities: [
        {
          id: "day4-edge-storage-decision",
          kind: "short-answer",
          title: text("Record the state decisions", "상태 결정 기록"),
          instruction: text(
            "Write which non-normal state matters, what the page should show, and whether the result should remain after refresh.",
            "중요한 비정상 상태, 페이지가 보여 줄 내용, 새로고침 뒤 결과 유지 여부를 적으세요.",
          ),
          placeholder: text(
            "Relevant state… Screen response… After refresh… Reason…",
            "관련 상태… 화면 응답… 새로고침 뒤… 이유…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-build-personal-core-interaction",
      start: "01:40",
      end: "02:35",
      minutes: 55,
      phase: "STUDIO",
      title: text(
        "Build the personal core interaction",
        "개인 프로젝트 기능 제작",
      ),
      goal: text(
        "Complete one meaningful action from the initial state to a visible result.",
        "초기 상태부터 눈에 보이는 결과까지 의미 있는 행동 하나를 완성합니다.",
      ),
      studentBrief: [
        text(
          "Protect the current design, implement only the chosen interaction, and test real examples after every change.",
          "현재 디자인을 보호하고 고른 상호작용만 구현하며 변경 뒤마다 실제 예를 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Keep one interaction per request. When the project breaks, restore the Day 3 backup or report action, actual result, and expected result.",
          "요청 한 번에 상호작용 하나만 다룬다. 프로젝트가 깨지면 Day 3 백업을 복구하거나 행동·실제 결과·기대 결과를 전달하게 한다.",
        ),
      ],
      completion: text(
        "The chosen action produces its promised result and existing important behavior still works.",
        "고른 행동이 약속한 결과를 만들고 기존의 중요한 동작도 계속 작동합니다.",
      ),
      activities: [
        {
          id: "day4-core-interaction-evidence",
          kind: "short-answer",
          title: text(
            "Record the working interaction",
            "작동하는 상호작용 기록",
          ),
          instruction: text(
            "Record the action or input, expected result, actual result, relevant edge result, and preserved behavior.",
            "행동 또는 입력, 기대 결과, 실제 결과, 관련 예외 결과, 유지한 동작을 적으세요.",
          ),
          placeholder: text(
            "Action/input… Expected… Actual… Edge result… Preserved…",
            "행동/입력… 기대… 실제… 예외 결과… 유지한 동작…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-partner-use-and-one-fix",
      start: "02:35",
      end: "02:50",
      minutes: 15,
      phase: "FIX",
      title: text(
        "Let a partner use it and fix one problem",
        "짝 사용과 문제 한 가지 수정",
      ),
      goal: text(
        "Observe another person complete the action and fix one reproducible blocker.",
        "다른 사람이 행동을 수행하는 모습을 관찰하고 재현 가능한 문제 하나를 고칩니다.",
      ),
      studentBrief: [
        text(
          "Give the page without instructions, observe the action and result, then fix and re-test one important problem.",
          "설명 없이 페이지를 건네고 행동과 결과를 관찰한 뒤 중요한 문제 하나를 고쳐 다시 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "The maker does not control the mouse during observation. Permit only one evidence-based fix.",
          "관찰 중 제작자가 마우스를 잡지 않게 한다. 근거가 있는 수정 하나만 허용한다.",
        ),
      ],
      completion: text(
        "A partner has used the interaction and the learner has recorded one observation and its re-test.",
        "짝이 상호작용을 사용했고 학생이 관찰 한 건과 수정 뒤 재시험을 기록했습니다.",
      ),
      activities: [
        {
          id: "day4-partner-fix-evidence",
          kind: "short-answer",
          title: text(
            "Record the partner observation and fix",
            "짝 관찰과 수정 기록",
          ),
          instruction: text(
            "Write what the partner did, where they paused or failed, what you changed, and what happened in the re-test.",
            "짝이 한 행동, 멈추거나 실패한 지점, 바꾼 것, 재시험 결과를 적으세요.",
          ),
          placeholder: text(
            "Observed… Problem… Changed… Re-test…",
            "관찰… 문제… 변경… 재시험…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-recheck-and-save",
      start: "02:50",
      end: "03:00",
      minutes: 10,
      phase: "SAVE",
      title: text(
        "Recheck the full path and keep the working version",
        "전체 경로 재확인과 보관",
      ),
      goal: text(
        "Prove the whole main path in a tested Day 4 backup.",
        "시험한 Day 4 백업에서 전체 핵심 흐름을 확인합니다.",
      ),
      studentBrief: [
        text(
          "Open backups/day4-working.html, run the main path and relevant alternative state, and refresh once.",
          "backups/day4-working.html을 열고 핵심 흐름과 관련 대체 상태를 실행한 뒤 한 번 새로고침하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Require the copied version itself to pass. A newer broken version is not better than the tested backup.",
          "복사한 버전 자체가 통과해야 한다. 더 최신인 깨진 버전은 시험한 백업보다 낫지 않다고 설명한다.",
        ),
      ],
      completion: text(
        "The Day 4 backup passes the main path and the project's chosen refresh behavior.",
        "Day 4 백업이 핵심 흐름과 프로젝트가 정한 새로고침 동작을 통과합니다.",
      ),
      activities: [
        {
          id: "day4-working-backup-evidence",
          kind: "short-answer",
          title: text(
            "Record the final path and backup",
            "최종 흐름과 백업 기록",
          ),
          instruction: text(
            "Write the backup location, main-path result, relevant alternative-state result, and refresh result.",
            "백업 위치, 핵심 흐름 결과, 관련 대체 상태 결과, 새로고침 결과를 적으세요.",
          ),
          placeholder: text(
            "Backup… Main path… Alternative state… Refresh…",
            "백업… 핵심 흐름… 대체 상태… 새로고침…",
          ),
          minimum: 1,
        },
      ],
    },
  ],
};
