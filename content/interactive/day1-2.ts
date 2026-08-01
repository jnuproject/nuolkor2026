import { text, type InteractiveDayPlan } from "./types";

export const day1Plan: InteractiveDayPlan = {
  day: 1,
  title: text(
    "Build Your First Working Page",
    "처음으로 작동하는 페이지 만들기",
  ),
  question: text(
    "How do I build, test, and publish my first page with AI?",
    "AI와 함께 첫 페이지를 만들고, 확인하고, 공개하려면 어떻게 해야 할까요?",
  ),
  artifact: text(
    "A personalized working page, a test public URL, and a working backup",
    "개인화한 작동 페이지, 시험 공개 URL, 작동본 백업",
  ),
  stages: [
    {
      id: "day1-show-finished-result",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "WATCH",
      title: text(
        "See the finished result and the six-day path",
        "완성 결과와 6일의 흐름 보기",
      ),
      goal: text(
        "Understand that the course ends with a working service at a public URL.",
        "이 과정이 공개 URL에서 작동하는 서비스로 끝난다는 것을 이해합니다.",
      ),
      studentBrief: [
        text(
          "Watch the page open, respond to a click, and remain readable at phone width.",
          "페이지가 열리고, 클릭에 반응하고, 휴대전화 너비에서도 읽히는 모습을 보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Show the finished common sample before explaining the curriculum. Say clearly that learners choose their own project topic.",
          "커리큘럼을 설명하기 전에 완성된 공통 샘플을 보여 준다. 학생 프로젝트의 주제는 각자가 정한다는 점을 분명히 말한다.",
        ),
      ],
      completion: text(
        "The learner can name the kind of result they will carry away on Day 6.",
        "학생이 6일차에 가져갈 결과가 무엇인지 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-show-finished-result-read",
          kind: "read",
          title: text("Course outcome", "과정 결과"),
          instruction: text(
            "Observe the complete result and the path from a local file to a public page.",
            "로컬 파일이 공개 페이지가 되는 전체 결과와 흐름을 관찰하세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day1-check-opencode-nvidia-folder-browser",
      start: "00:15",
      end: "00:40",
      minutes: 25,
      phase: "TELL",
      title: text(
        "Check OpenCode, NVIDIA, the folder, and the browser",
        "OpenCode·NVIDIA·폴더·브라우저 확인",
      ),
      goal: text(
        "Confirm the prepared tools without turning setup into the lesson itself.",
        "세팅 자체를 수업 내용으로 만들지 않고 준비된 도구의 작동만 확인합니다.",
      ),
      studentBrief: [
        text(
          "Open the prepared project folder, run the class model, and confirm that a safe test file can be created.",
          "준비된 프로젝트 폴더를 열고 수업 모델을 실행한 뒤 안전한 테스트 파일이 만들어지는지 확인하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Keep working learners moving. Route installation or account problems to the support table and never expose an API key on the projector.",
          "작동하는 학생은 계속 진행시킨다. 설치·계정 문제는 지원 테이블로 보내고 프로젝터에 API 키를 노출하지 않는다.",
        ),
      ],
      completion: text(
        "OpenCode responds in the correct folder and the learner can open a local HTML file in the browser.",
        "올바른 폴더에서 OpenCode가 응답하고 학생이 로컬 HTML 파일을 브라우저에서 열 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-tools-ready-read",
          kind: "read",
          title: text("Prepared tool check", "준비된 도구 확인"),
          instruction: text(
            "Complete the setup check or ask the support teacher. Use the persistent side signal if help is needed.",
            "세팅 확인을 마치거나 지원 강사에게 도움을 요청하세요. 도움이 필요하면 계속 보이는 옆 상태 신호를 사용하세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day1-smallest-web-structure",
      start: "00:40",
      end: "00:55",
      minutes: 15,
      phase: "TELL",
      title: text(
        "Understand the smallest web-page structure",
        "웹페이지의 가장 작은 구조 이해",
      ),
      goal: text(
        "Connect the project folder, index.html, and the page shown by the browser.",
        "프로젝트 폴더, index.html, 브라우저에 보이는 페이지를 연결합니다.",
      ),
      studentBrief: [
        text(
          "Follow one file from the project folder to the browser screen.",
          "프로젝트 폴더의 파일 하나가 브라우저 화면으로 열리는 과정을 따라가세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use the real folder and browser. Explain only enough HTML, CSS, and JavaScript to identify content, appearance, and behavior.",
          "실제 폴더와 브라우저를 사용한다. HTML·CSS·JavaScript는 내용·모양·행동을 구분할 만큼만 설명한다.",
        ),
      ],
      completion: text(
        "The learner can explain folder → index.html → browser in everyday language.",
        "학생이 폴더 → index.html → 브라우저의 관계를 일상 언어로 설명할 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-smallest-web-structure-read",
          kind: "read",
          title: text("Folder, file, browser", "폴더, 파일, 브라우저"),
          instruction: text(
            "Observe where the file lives, which file is being changed, and where the result is tested.",
            "파일이 있는 위치, 변경하는 파일, 결과를 시험하는 위치를 확인하세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day1-live-build-demo",
      start: "00:55",
      end: "01:15",
      minutes: 20,
      phase: "WATCH",
      title: text("Watch a live build", "강사 라이브 제작 시연"),
      goal: text(
        "See the full request → build → browser check → small revision process.",
        "요청 → 제작 → 브라우저 확인 → 작은 수정의 전체 과정을 봅니다.",
      ),
      studentBrief: [
        text(
          "Notice the decisions the teacher makes before and after the AI writes code.",
          "AI가 코드를 만들기 전과 후에 강사가 내리는 결정에 주목하세요.",
        ),
      ],
      teacherCue: [
        text(
          "First show a weak request, then a bounded request. Test the real button in the browser and revise only one visible difference.",
          "먼저 약한 요청을 보여 준 뒤 범위가 분명한 요청을 사용한다. 브라우저에서 실제 버튼을 시험하고 눈에 보이는 차이 하나만 수정한다.",
        ),
      ],
      completion: text(
        "The learner can distinguish an AI completion message from a real browser test.",
        "학생이 AI의 완료 메시지와 실제 브라우저 테스트를 구분할 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-live-build-demo-read",
          kind: "read",
          title: text("Live build observation", "라이브 제작 관찰"),
          instruction: text(
            "Watch how the teacher defines success, limits the file change, tests the page, and reports one difference.",
            "강사가 성공 기준을 정하고, 파일 변경 범위를 제한하고, 페이지를 시험하고, 차이 하나를 전달하는 과정을 보세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day1-break",
      start: "01:15",
      end: "01:25",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest and return ready to build.", "쉬고 제작할 준비를 해서 돌아옵니다."),
      studentBrief: [
        text(
          "Pause your work and return when the ten-minute timer ends.",
          "작업을 멈추고 10분 타이머가 끝나면 돌아오세요.",
        ),
      ],
      teacherCue: [
        text(
          "Give a one-minute return signal. Do not turn the break into extra lecture time.",
          "종료 1분 전에 복귀 신호를 준다. 휴식 시간을 추가 강의로 바꾸지 않는다.",
        ),
      ],
      completion: text(
        "The learner returns to the project folder when the timer ends.",
        "타이머가 끝나면 학생이 프로젝트 폴더로 돌아옵니다.",
      ),
      activities: [
        {
          id: "day1-break-timer",
          kind: "timer",
          title: text("Ten-minute break", "10분 휴식"),
          instruction: text(
            "Rest your eyes and hands. Return when the timer ends.",
            "눈과 손을 쉬게 하세요. 타이머가 끝나면 돌아오세요.",
          ),
          durationMinutes: 10,
          hidden: true,
        },
      ],
    },
    {
      id: "day1-build-shared-first-page",
      start: "01:25",
      end: "01:55",
      minutes: 30,
      phase: "STUDIO",
      title: text("Build the shared first page", "공통 첫 페이지 제작"),
      goal: text(
        "Create one index.html and prove that its main action works.",
        "index.html 하나를 만들고 핵심 동작이 작동한다는 것을 확인합니다.",
      ),
      studentBrief: [
        text(
          "Build the shared page, open it in the browser, click the main button, and record the actual result.",
          "공통 페이지를 만들고 브라우저에서 연 뒤 핵심 버튼을 눌러 실제 결과를 기록하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Keep the first build to one file and one behavior. Help learners test in the browser before changing the design.",
          "첫 제작은 파일 하나와 동작 하나로 제한한다. 디자인을 바꾸기 전에 브라우저에서 시험하도록 돕는다.",
        ),
      ],
      completion: text(
        "The shared index.html opens and its main button shows the promised result.",
        "공통 index.html이 열리고 핵심 버튼이 약속한 결과를 보여 줍니다.",
      ),
      activities: [
        {
          id: "day1-shared-page-browser-evidence",
          kind: "short-answer",
          title: text(
            "Record the shared-page test",
            "공통 페이지 테스트 기록",
          ),
          instruction: text(
            "Write what you clicked, what you expected, and what actually appeared in the browser.",
            "무엇을 눌렀는지, 무엇을 예상했는지, 브라우저에 실제로 무엇이 나타났는지 적으세요.",
          ),
          placeholder: text(
            "I clicked… I expected… The browser showed…",
            "나는 …을 눌렀습니다. …을 예상했습니다. 브라우저에는 …이 나타났습니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day1-fix-one-difference",
      start: "01:55",
      end: "02:15",
      minutes: 20,
      phase: "FIX",
      title: text(
        "Revise one part and describe the difference",
        "한 부분 수정과 오류 설명",
      ),
      goal: text(
        "Ask for one controlled change by describing current and desired behavior.",
        "현재 상태와 원하는 상태의 차이를 설명해 한 가지 변경만 요청합니다.",
      ),
      studentBrief: [
        text(
          "Keep the working behavior, change one visible part, and test the original action again.",
          "작동하는 동작은 유지하고 눈에 보이는 부분 하나를 바꾼 뒤 원래 동작을 다시 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Require Current, Wanted, Keep, and Test before a revision request. Stop whole-page rewrites.",
          "수정 요청 전에 현재 상태, 원하는 상태, 유지할 것, 시험 방법을 말하게 한다. 전체 페이지 재작성을 막는다.",
        ),
      ],
      completion: text(
        "One intended difference is visible and the original main action still works.",
        "의도한 차이 하나가 보이고 원래 핵심 동작도 계속 작동합니다.",
      ),
      activities: [
        {
          id: "day1-one-revision-evidence",
          kind: "short-answer",
          title: text("Explain one revision", "수정 한 가지 설명"),
          instruction: text(
            "Record the original result, the result you wanted, what had to stay working, and the re-test result.",
            "원래 결과, 원하는 결과, 계속 작동해야 한 것, 다시 시험한 결과를 적으세요.",
          ),
          placeholder: text(
            "Before… I wanted… I kept… After the change I tested…",
            "수정 전에는… 나는 …을 원했습니다. …은 유지했습니다. 수정 후 …을 시험했습니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day1-personalize-and-check-mobile",
      start: "02:15",
      end: "02:40",
      minutes: 25,
      phase: "STUDIO",
      title: text(
        "Personalize the page and check phone width",
        "개인화와 모바일 확인",
      ),
      goal: text(
        "Replace generic choices with learner decisions without changing the working behavior.",
        "작동하는 동작을 유지하면서 일반적인 기본값을 학생의 결정으로 바꿉니다.",
      ),
      studentBrief: [
        text(
          "Choose the page words and one visual direction, then narrow the browser and check readability.",
          "페이지 문구와 시각 방향 하나를 정한 뒤 브라우저 폭을 좁혀 읽기 쉬운지 확인하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Ask what the learner decided and why. Do not give a topic list or choose the page identity for them.",
          "학생이 무엇을 왜 결정했는지 묻는다. 주제 목록을 주거나 페이지의 정체성을 대신 정하지 않는다.",
        ),
      ],
      completion: text(
        "The page contains learner-chosen content and remains readable at phone width.",
        "페이지에 학생이 고른 내용이 들어 있고 휴대전화 너비에서도 읽을 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-personalization-decision",
          kind: "short-answer",
          title: text(
            "Record one personal design decision",
            "개인화 결정 한 가지 기록",
          ),
          instruction: text(
            "Write one content or visual decision you made and what you observed at phone width.",
            "직접 내린 콘텐츠 또는 시각 결정 한 가지와 휴대전화 너비에서 관찰한 결과를 적으세요.",
          ),
          placeholder: text(
            "I chose… because… At phone width I saw…",
            "나는 …을 선택했습니다. 이유는 …입니다. 휴대전화 너비에서는 …을 확인했습니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day1-test-publish-github-pages",
      start: "02:40",
      end: "02:55",
      minutes: 15,
      phase: "SAVE",
      title: text(
        "Test-publish with GitHub Pages",
        "GitHub Pages 시험 배포",
      ),
      goal: text(
        "Move the working page from a local file to a URL that opens without sign-in.",
        "작동하는 로컬 파일을 로그인 없이 열리는 URL로 옮깁니다.",
      ),
      studentBrief: [
        text(
          "Upload the correct files, open the Pages URL, and test the main action there.",
          "올바른 파일을 업로드하고 Pages URL을 연 뒤 그 주소에서 핵심 동작을 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Demonstrate one repository path only. Treat deployment delays as support work, not a reason to erase the build time.",
          "저장소 경로 하나만 시연한다. 배포 지연은 지원할 문제로 다루고 제작 시간을 없애지 않는다.",
        ),
      ],
      completion: text(
        "A public URL or a clearly recorded deployment-pending state exists.",
        "공개 URL이 있거나 배포 대기 상태가 분명하게 기록되어 있습니다.",
      ),
      activities: [
        {
          id: "day1-test-public-url",
          kind: "short-answer",
          title: text("Save the test URL", "시험 URL 저장"),
          instruction: text(
            "Paste the public URL. If publishing is still pending, record the repository URL and the visible deployment status.",
            "공개 URL을 붙여넣으세요. 아직 배포 중이면 저장소 URL과 화면에 보이는 배포 상태를 적으세요.",
          ),
          placeholder: text(
            "Public URL or repository URL and status",
            "공개 URL 또는 저장소 URL과 상태",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day1-save-working-version",
      start: "02:55",
      end: "03:00",
      minutes: 5,
      phase: "SAVE",
      title: text("Keep the working version", "작동본 보관"),
      goal: text(
        "Leave with a tested backup that can be opened again.",
        "다시 열 수 있는 시험 완료 백업을 남깁니다.",
      ),
      studentBrief: [
        text(
          "Copy the working page to backups/day1-working.html and open the copy once.",
          "작동 페이지를 backups/day1-working.html로 복사하고 사본을 한 번 여세요.",
        ),
      ],
      teacherCue: [
        text(
          "A file name alone is not evidence. Ask learners to open the backup and run the main action.",
          "파일명만으로는 증거가 되지 않는다. 백업을 열고 핵심 동작을 실행하게 한다.",
        ),
      ],
      completion: text(
        "The Day 1 backup opens and the main action works in the copy.",
        "Day 1 백업이 열리고 사본에서 핵심 동작이 작동합니다.",
      ),
      activities: [
        {
          id: "day1-working-backup-location",
          kind: "short-answer",
          title: text("Record the working backup", "작동 백업 기록"),
          instruction: text(
            "Write the backup location and the result of opening and testing the copy.",
            "백업 위치와 사본을 열어 시험한 결과를 적으세요.",
          ),
          placeholder: text(
            "Backup path… Test result…",
            "백업 경로… 시험 결과…",
          ),
          minimum: 1,
        },
      ],
    },
  ],
};

export const day2Plan: InteractiveDayPlan = {
  day: 2,
  title: text(
    "Turn Your Idea into a Buildable Service",
    "아이디어를 실제로 만들 수 있는 서비스로 바꾸기",
  ),
  question: text(
    "How can a free-topic idea become one complete, testable user path?",
    "자유 주제 아이디어를 완전하고 시험 가능한 이용 흐름 하나로 만들려면 어떻게 해야 할까요?",
  ),
  artifact: text(
    "A project sentence, real content, one screen flow, a working personal v1, and a backup",
    "프로젝트 한 문장, 실제 콘텐츠, 화면 흐름, 작동하는 개인 v1, 백업",
  ),
  stages: [
    {
      id: "day2-reopen-test-url",
      start: "00:00",
      end: "00:10",
      minutes: 10,
      phase: "CHECK",
      title: text("Reopen the test URL", "시험 URL 다시 열기"),
      goal: text(
        "Begin from yesterday's real result, not from memory.",
        "기억이 아니라 어제의 실제 결과에서 시작합니다.",
      ),
      studentBrief: [
        text(
          "Open yesterday's page without signing in and test its main action.",
          "로그인하지 않고 어제의 페이지를 열어 핵심 동작을 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Place unresolved publishing problems in a support queue while the learner continues with project definition.",
          "해결되지 않은 배포 문제는 지원 목록으로 보내고 학생은 프로젝트 정의를 계속하게 한다.",
        ),
      ],
      completion: text(
        "The learner has either reopened the page or recorded the exact public problem.",
        "학생이 페이지를 다시 열었거나 공개 상태의 정확한 문제를 기록했습니다.",
      ),
      activities: [
        {
          id: "day2-reopen-url-read",
          kind: "read",
          title: text("Reopen and check", "다시 열고 확인"),
          instruction: text(
            "Check the title and main action on yesterday's public page.",
            "어제 공개한 페이지의 제목과 핵심 동작을 확인하세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day2-user-and-situation",
      start: "00:10",
      end: "00:30",
      minutes: 20,
      phase: "TELL",
      title: text("Define the person and situation", "사용자와 사용 상황"),
      goal: text(
        "Describe the idea through one person, one situation, and one useful result.",
        "사람 한 명, 상황 하나, 유용한 결과 하나로 아이디어를 설명합니다.",
      ),
      studentBrief: [
        text(
          "Write who the service is for, when they use it, and what it helps them finish.",
          "누구를 위한 서비스인지, 언제 사용하는지, 무엇을 끝내도록 돕는지 적으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Do not offer project topics. Ask about a real person, moment, and desired result until the sentence becomes specific.",
          "프로젝트 주제를 제시하지 않는다. 문장이 구체적으로 될 때까지 실제 사용자, 순간, 원하는 결과를 묻는다.",
        ),
      ],
      completion: text(
        "One sentence names a person, situation, and result without using vague words such as everyone or anything.",
        "한 문장에 사용자, 상황, 결과가 들어 있고 모두·무엇이든 같은 모호한 표현이 없습니다.",
      ),
      activities: [
        {
          id: "day2-project-sentence",
          kind: "short-answer",
          title: text("Write the project sentence", "프로젝트 한 문장 작성"),
          instruction: text(
            "Complete this idea in your own words: This is for… When… it helps them…",
            "자신의 말로 완성하세요: 이 서비스는 …을 위한 것입니다. …할 때 사용하며, …하도록 돕습니다.",
          ),
          placeholder: text(
            "This is for… When… it helps them…",
            "이 서비스는 …을 위한 것입니다. …할 때 사용하며, …하도록 돕습니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-one-complete-path",
      start: "00:30",
      end: "00:50",
      minutes: 20,
      phase: "TELL",
      title: text(
        "Choose one complete path and reduce scope",
        "핵심 이용 흐름과 범위 줄이기",
      ),
      goal: text(
        "Choose the smallest path that starts with a visit and ends with a useful visible result.",
        "방문으로 시작해 유용하고 눈에 보이는 결과로 끝나는 가장 작은 흐름을 고릅니다.",
      ),
      studentBrief: [
        text(
          "Describe what the visitor sees first, does once, and receives as a result.",
          "방문자가 처음 보는 것, 한 번 하는 행동, 결과로 받는 것을 설명하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Remove accounts, servers, payment, external APIs, and extra screens unless they are already working and essential.",
          "이미 작동하며 꼭 필요한 경우가 아니라면 계정, 서버, 결제, 외부 API, 추가 화면을 첫 버전에서 뺀다.",
        ),
      ],
      completion: text(
        "The first version has one beginning, one main action, and one visible result.",
        "첫 버전에 시작 하나, 핵심 행동 하나, 눈에 보이는 결과 하나가 있습니다.",
      ),
      activities: [
        {
          id: "day2-complete-path",
          kind: "short-answer",
          title: text("Write one complete path", "완전한 흐름 하나 작성"),
          instruction: text(
            "Describe the path from the visitor's first view to the useful result. Also name one thing that will wait.",
            "방문자의 첫 화면부터 유용한 결과까지의 흐름을 적고, 나중으로 미룰 것 한 가지도 적으세요.",
          ),
          placeholder: text(
            "First they see… Then they… The page shows… Later, not now…",
            "처음에는 …을 봅니다. 그다음 …합니다. 페이지는 …을 보여 줍니다. …은 지금이 아니라 나중에 만듭니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-real-content-and-order",
      start: "00:50",
      end: "01:10",
      minutes: 20,
      phase: "TELL",
      title: text(
        "Prepare real content and screen order",
        "실제 콘텐츠와 화면 순서",
      ),
      goal: text(
        "Decide the real title, guidance, button words, sample content, and result order before asking AI to decorate.",
        "AI에게 꾸미기를 맡기기 전에 실제 제목, 안내, 버튼 문구, 예시 콘텐츠, 결과 순서를 정합니다.",
      ),
      studentBrief: [
        text(
          "Write the words and sample content that belong on the first version of your page.",
          "첫 버전 화면에 들어갈 문구와 예시 콘텐츠를 직접 작성하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Reject placeholder marketing copy. Ask learners to order information by the visitor's questions.",
          "임시 홍보 문구를 그대로 쓰지 않게 한다. 방문자가 품을 질문의 순서대로 정보를 배치하게 한다.",
        ),
      ],
      completion: text(
        "The project has learner-written content and a clear top-to-bottom order.",
        "프로젝트에 학생이 직접 쓴 콘텐츠와 분명한 위에서 아래의 순서가 있습니다.",
      ),
      activities: [
        {
          id: "day2-real-content-draft",
          kind: "short-answer",
          title: text("Draft the real content", "실제 콘텐츠 초안"),
          instruction: text(
            "Record the page title, one-line explanation, main action label, sample content, and result message.",
            "페이지 제목, 한 줄 설명, 핵심 행동 문구, 예시 콘텐츠, 결과 메시지를 적으세요.",
          ),
          placeholder: text(
            "Title… Explanation… Action label… Sample content… Result…",
            "제목… 설명… 행동 문구… 예시 콘텐츠… 결과…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-break",
      start: "01:10",
      end: "01:20",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest before the personal build.", "개인 제작 전에 쉽니다."),
      studentBrief: [
        text(
          "Step away and return when the timer ends.",
          "자리에서 쉬고 타이머가 끝나면 돌아오세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use the break to prepare the live request demonstration, not to add another lecture.",
          "휴식 중에는 라이브 요청 시연을 준비하고 추가 강의를 하지 않는다.",
        ),
      ],
      completion: text(
        "The learner returns ready to turn the plan into a page.",
        "학생이 계획을 페이지로 만들 준비를 해서 돌아옵니다.",
      ),
      activities: [
        {
          id: "day2-break-timer",
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
      id: "day2-good-build-request-demo",
      start: "01:20",
      end: "01:40",
      minutes: 20,
      phase: "WATCH",
      title: text(
        "See a useful build request",
        "좋은 제작 요청과 강사 시연",
      ),
      goal: text(
        "Turn decisions about purpose, content, behavior, and limits into a build request.",
        "목적, 콘텐츠, 행동, 제약에 대한 결정을 제작 요청으로 바꿉니다.",
      ),
      studentBrief: [
        text(
          "Watch the teacher give AI decisions that are already made while leaving implementation work to the tool.",
          "이미 내린 결정은 AI에게 분명히 주고 구현 작업은 도구에 맡기는 과정을 보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Ask AI for a short plan first. Reject plans that introduce unrequested screens, frameworks, login, APIs, or invented content.",
          "AI에게 짧은 계획부터 요청한다. 요청하지 않은 화면, 프레임워크, 로그인, API, 임의 콘텐츠가 들어간 계획은 거절한다.",
        ),
      ],
      completion: text(
        "The learner can identify purpose, content, behavior, and constraints in the demonstrated request.",
        "학생이 시연 요청에서 목적, 콘텐츠, 행동, 제약을 찾을 수 있습니다.",
      ),
      activities: [
        {
          id: "day2-good-request-demo-read",
          kind: "read",
          title: text("Build-request demonstration", "제작 요청 시연"),
          instruction: text(
            "Observe how a project plan becomes a bounded request without giving AI the project decision.",
            "프로젝트 결정을 AI에게 넘기지 않으면서 계획을 범위가 분명한 요청으로 바꾸는 과정을 보세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day2-personal-plan-and-paper-screen",
      start: "01:40",
      end: "02:00",
      minutes: 20,
      phase: "TELL",
      title: text(
        "Complete the personal plan and paper screen",
        "개인 계획과 종이 스케치",
      ),
      goal: text(
        "Make project decisions visible before generating the first version.",
        "첫 버전을 생성하기 전에 프로젝트 결정을 눈에 보이게 만듭니다.",
      ),
      studentBrief: [
        text(
          "Finish the project plan and draw one screen with the important content in reading order.",
          "프로젝트 계획을 완성하고 중요한 콘텐츠가 읽는 순서대로 놓인 화면 하나를 그리세요.",
        ),
      ],
      teacherCue: [
        text(
          "Approve scope, not topic. Check for one person, one path, real content, a visible result, and a static-page scope.",
          "주제가 아니라 범위를 확인한다. 사용자 한 명, 흐름 하나, 실제 콘텐츠, 눈에 보이는 결과, 정적 페이지 범위를 점검한다.",
        ),
      ],
      completion: text(
        "The written plan and paper screen describe the same first version.",
        "작성한 계획과 종이 화면이 같은 첫 버전을 설명합니다.",
      ),
      activities: [
        {
          id: "day2-plan-and-sketch-location",
          kind: "short-answer",
          title: text(
            "Record the plan and sketch",
            "계획과 스케치 기록",
          ),
          instruction: text(
            "Write where your completed plan and paper screen are saved, then name the first thing a visitor will see.",
            "완성한 계획과 종이 화면의 보관 위치를 적고 방문자가 처음 보게 될 것을 쓰세요.",
          ),
          placeholder: text(
            "Plan location… Sketch location… First visible content…",
            "계획 위치… 스케치 위치… 처음 보이는 콘텐츠…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-build-personal-v1",
      start: "02:00",
      end: "02:45",
      minutes: 45,
      phase: "STUDIO",
      title: text("Build the personal project v1", "개인 프로젝트 v1 제작"),
      goal: text(
        "Create the first working version of the learner's own free-topic project.",
        "학생이 자유롭게 정한 개인 프로젝트의 첫 작동 버전을 만듭니다.",
      ),
      studentBrief: [
        text(
          "Build only the planned first path, test it in the browser, and keep the real content.",
          "계획한 첫 흐름만 만들고 브라우저에서 시험하며 실제 콘텐츠를 유지하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Protect the 45-minute studio. Help learners reduce scope or restore the last working file instead of adding features.",
          "45분 제작 시간을 지킨다. 기능을 추가하는 대신 범위를 줄이거나 마지막 작동본을 복구하도록 돕는다.",
        ),
      ],
      completion: text(
        "The personal index.html opens and shows the planned content and one complete path.",
        "개인 index.html이 열리고 계획한 콘텐츠와 완전한 흐름 하나를 보여 줍니다.",
      ),
      activities: [
        {
          id: "day2-v1-browser-evidence",
          kind: "short-answer",
          title: text("Record the v1 result", "v1 결과 기록"),
          instruction: text(
            "Write the file you opened, the action you tried, and the useful result the page showed.",
            "연 파일, 시험한 행동, 페이지가 보여 준 유용한 결과를 적으세요.",
          ),
          placeholder: text(
            "Opened… Tried… The page showed…",
            "열어 본 파일… 시험한 행동… 페이지에 나타난 결과…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-five-second-test",
      start: "02:45",
      end: "02:55",
      minutes: 10,
      phase: "SHARE",
      title: text("Run a five-second understanding test", "5초 이해 테스트"),
      goal: text(
        "Find out what a new visitor understands before receiving an explanation.",
        "설명을 듣기 전에 처음 방문한 사람이 무엇을 이해하는지 확인합니다.",
      ),
      studentBrief: [
        text(
          "Show the first screen briefly, hide it, and record what your partner thinks it is for and what they would do.",
          "첫 화면을 잠깐 보여 준 뒤 가리고, 짝이 무엇을 위한 페이지로 이해했는지와 무엇을 하려 했는지 기록하세요.",
        ),
      ],
      teacherCue: [
        text(
          "The maker stays silent until the observer answers. Collect observations, not design preferences.",
          "관찰자가 답할 때까지 제작자는 말하지 않는다. 디자인 취향이 아니라 관찰 결과를 받는다.",
        ),
      ],
      completion: text(
        "The learner has one unprompted observation about purpose and first action.",
        "학생이 목적과 첫 행동에 대한 설명 없는 관찰 한 건을 가지고 있습니다.",
      ),
      activities: [
        {
          id: "day2-five-second-observation",
          kind: "short-answer",
          title: text(
            "Record the five-second observation",
            "5초 관찰 기록",
          ),
          instruction: text(
            "Write what your partner thought the page was for and what they wanted to do first.",
            "짝이 이 페이지를 무엇을 위한 것으로 이해했는지와 처음 무엇을 하려 했는지 적으세요.",
          ),
          placeholder: text(
            "My partner thought… Their first action would be…",
            "짝은 …을 위한 페이지라고 생각했습니다. 처음에는 …을 하려고 했습니다.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-save-v1",
      start: "02:55",
      end: "03:00",
      minutes: 5,
      phase: "SAVE",
      title: text("Save v1", "v1 보관"),
      goal: text(
        "Keep the first personal version before tomorrow's design work.",
        "내일 디자인 작업을 시작하기 전에 개인 첫 버전을 보관합니다.",
      ),
      studentBrief: [
        text(
          "Copy the working version to backups/day2-v1.html and open the copy.",
          "작동 버전을 backups/day2-v1.html로 복사하고 사본을 여세요.",
        ),
      ],
      teacherCue: [
        text(
          "End with a tested copy and one next task. Do not begin a late redesign.",
          "시험한 사본과 다음 작업 한 가지를 남기고 끝낸다. 늦은 시간에 디자인 변경을 시작하지 않는다.",
        ),
      ],
      completion: text(
        "The Day 2 v1 backup opens and represents the learner's intended first version.",
        "Day 2 v1 백업이 열리고 학생이 의도한 첫 버전을 보여 줍니다.",
      ),
      activities: [
        {
          id: "day2-v1-backup-location",
          kind: "short-answer",
          title: text("Record the v1 backup", "v1 백업 기록"),
          instruction: text(
            "Write the backup location and one next task for Day 3.",
            "백업 위치와 Day 3에서 할 다음 작업 한 가지를 적으세요.",
          ),
          placeholder: text(
            "Backup… Next task…",
            "백업… 다음 작업…",
          ),
          minimum: 1,
        },
      ],
    },
  ],
};
