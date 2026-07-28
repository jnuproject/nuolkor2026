import { text, type InteractiveDayPlan } from "./types";

export const day5Plan: InteractiveDayPlan = {
  day: 5,
  title: text(
    "Make It Work for Someone Else",
    "다른 사람도 사용할 수 있게 만들기",
  ),
  question: text(
    "What can I learn when another person uses the project without my explanation?",
    "다른 사람이 내 설명 없이 프로젝트를 사용할 때 무엇을 배울 수 있을까요?",
  ),
  artifact: text(
    "An unmoderated user observation, one prioritized and re-tested fix, a public release candidate, and a complete backup",
    "설명 없는 사용자 관찰, 우선순위를 정해 재시험한 수정, 공개 후보 URL, 전체 백업",
  ),
  stages: [
    {
      id: "day5-write-one-user-task",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "TELL",
      title: text(
        "Write one task for another person",
        "다른 사람에게 줄 사용 과제 작성",
      ),
      goal: text(
        "Ask for a useful outcome without teaching the clicks.",
        "클릭 방법을 알려 주지 않고 유용한 결과를 요청합니다.",
      ),
      studentBrief: [
        text(
          "Write one sentence that tells the tester what to achieve, not which controls to use.",
          "어떤 조작을 할지가 아니라 무엇을 이루어야 하는지를 한 문장으로 적으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Reject tasks that name button colors, positions, or exact click sequences. Keep the tester's goal and safe sample data.",
          "버튼 색·위치·정확한 클릭 순서를 알려 주는 과제는 다시 쓰게 한다. 테스터의 목표와 안전한 예시 데이터만 남긴다.",
        ),
      ],
      completion: text(
        "The task states a result and does not reveal the interface path.",
        "과제가 결과를 말하고 화면 사용 방법은 알려 주지 않습니다.",
      ),
      activities: [
        {
          id: "day5-one-user-task",
          kind: "short-answer",
          title: text("Write the user task", "사용 과제 작성"),
          instruction: text(
            "Write the one-sentence task and the safe sample information the tester may use.",
            "한 문장 사용 과제와 테스터가 사용할 수 있는 안전한 예시 정보를 적으세요.",
          ),
          placeholder: text(
            "Task… Safe sample information…",
            "과제… 안전한 예시 정보…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-observe-without-explaining",
      start: "00:15",
      end: "00:35",
      minutes: 20,
      phase: "WATCH",
      title: text(
        "Learn to observe without explaining",
        "설명하지 않고 관찰하는 법",
      ),
      goal: text(
        "Separate what a person does from what they later say they liked.",
        "사람이 실제로 한 행동과 나중에 말한 취향을 구분합니다.",
      ),
      studentBrief: [
        text(
          "Watch for the first action, pauses, repeated actions, unexpected choices, and whether the task is completed.",
          "첫 행동, 멈춤, 반복 행동, 예상 밖의 선택, 과제 완료 여부를 관찰하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Demonstrate the maker staying silent and keeping hands away from the tester's keyboard and mouse.",
          "제작자가 말하지 않고 테스터의 키보드와 마우스에 손대지 않는 모습을 시연한다.",
        ),
      ],
      completion: text(
        "The learner can distinguish an observation from an opinion or suggestion.",
        "학생이 관찰, 의견, 제안을 구분할 수 있습니다.",
      ),
      activities: [
        {
          id: "day5-observation-method-read",
          kind: "read",
          title: text("Observation method", "관찰 방법"),
          instruction: text(
            "Learn what to watch and what the maker must not do during the session.",
            "사용 중 무엇을 보고 제작자가 무엇을 하지 않아야 하는지 익히세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day5-first-cross-use",
      start: "00:35",
      end: "01:00",
      minutes: 25,
      phase: "CHECK",
      title: text("Run the first cross-use session", "1차 교차 사용"),
      goal: text(
        "Collect behavior evidence from another person using the real project.",
        "다른 사람이 실제 프로젝트를 사용하는 행동 근거를 모읍니다.",
      ),
      studentBrief: [
        text(
          "Give the task, stay silent, observe the full attempt, then switch roles.",
          "과제를 건네고 말하지 않은 채 전체 시도를 관찰한 뒤 역할을 바꾸세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use the planned pairs. Protect silent observation and safe data; intervene only for safety or a complete technical stop.",
          "계획한 짝을 사용한다. 설명 없는 관찰과 안전한 데이터를 지키고 안전 문제나 완전한 기술 중단일 때만 개입한다.",
        ),
      ],
      completion: text(
        "Each learner has observed one complete attempt and recorded behavior rather than only an opinion.",
        "각 학생이 한 번의 전체 시도를 관찰하고 의견만이 아니라 행동을 기록했습니다.",
      ),
      activities: [
        {
          id: "day5-first-use-observation",
          kind: "short-answer",
          title: text(
            "Record the first user session",
            "첫 사용자 테스트 기록",
          ),
          instruction: text(
            "Record the first action, one pause or repeated action, one unexpected action, and whether the task was completed.",
            "첫 행동, 멈춤 또는 반복 행동 하나, 예상 밖 행동 하나, 과제 완료 여부를 적으세요.",
          ),
          placeholder: text(
            "First action… Pause/repetition… Unexpected action… Completed or not…",
            "첫 행동… 멈춤/반복… 예상 밖 행동… 완료 여부…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-turn-observation-into-problem",
      start: "01:00",
      end: "01:10",
      minutes: 10,
      phase: "CHECK",
      title: text(
        "Turn the observation into a problem statement",
        "관찰 결과 정리",
      ),
      goal: text(
        "Describe a reproducible difference between expected and actual use.",
        "예상한 사용과 실제 사용의 재현 가능한 차이를 설명합니다.",
      ),
      studentBrief: [
        text(
          "Write what the tester tried, what happened, what should have happened, and why it mattered.",
          "테스터가 한 행동, 실제로 일어난 일, 일어나야 했던 일, 중요한 이유를 적으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Replace labels such as confusing or bad with a specific action and visible result.",
          "헷갈린다·나쁘다 같은 표현을 구체적인 행동과 눈에 보이는 결과로 바꾸게 한다.",
        ),
      ],
      completion: text(
        "The problem statement can be reproduced and checked after a change.",
        "문제 문장을 다시 재현하고 수정 뒤 확인할 수 있습니다.",
      ),
      activities: [
        {
          id: "day5-problem-statement",
          kind: "short-answer",
          title: text(
            "Write the observed problem",
            "관찰한 문제 작성",
          ),
          instruction: text(
            "Write the action, actual result, expected result, and user impact.",
            "행동, 실제 결과, 기대 결과, 사용자에게 미친 영향을 적으세요.",
          ),
          placeholder: text(
            "Action… Actual… Expected… Impact…",
            "행동… 실제… 기대… 영향…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-break",
      start: "01:10",
      end: "01:20",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest before choosing and fixing a problem.", "고칠 문제를 고르기 전에 쉽니다."),
      studentBrief: [
        text(
          "Pause and return with the observation record.",
          "작업을 멈추고 관찰 기록을 가지고 돌아오세요.",
        ),
      ],
      teacherCue: [
        text(
          "Do not solve learners' problems during the break. Prepare to help with prioritization.",
          "휴식 중 학생의 문제를 대신 해결하지 않는다. 우선순위 판단을 도울 준비를 한다.",
        ),
      ],
      completion: text(
        "The learner returns ready to choose one evidence-based fix.",
        "학생이 근거가 있는 수정 하나를 고를 준비를 해서 돌아옵니다.",
      ),
      activities: [
        {
          id: "day5-break-timer",
          kind: "timer",
          title: text("Ten-minute break", "10분 휴식"),
          instruction: text(
            "Rest and return when the timer ends.",
            "쉬고 타이머가 끝나면 돌아오세요.",
          ),
          durationMinutes: 10,
          hidden: true,
        },
      ],
    },
    {
      id: "day5-choose-fix-priority",
      start: "01:20",
      end: "01:35",
      minutes: 15,
      phase: "TELL",
      title: text(
        "Decide what to fix now",
        "무엇을 지금 고칠지 판단",
      ),
      goal: text(
        "Prioritize the problem that most blocks the main path and can be re-tested today.",
        "핵심 흐름을 가장 많이 막고 오늘 다시 시험할 수 있는 문제를 우선합니다.",
      ),
      studentBrief: [
        text(
          "Choose one fix for now, one possible fix if time remains, and one item for a later version.",
          "지금 고칠 것 하나, 시간이 남으면 고칠 것 하나, 다음 버전으로 미룰 것 하나를 정하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Do not let visual preference outrank a task blocker. Do not let learners try to implement every comment.",
          "시각 취향이 과제 방해 문제보다 우선하지 않게 한다. 모든 의견을 구현하려 하지 않게 한다.",
        ),
      ],
      completion: text(
        "One observed problem is selected with a reason and a clear re-test.",
        "관찰한 문제 하나가 이유와 분명한 재시험 방법과 함께 선택되었습니다.",
      ),
      activities: [
        {
          id: "day5-fix-priority",
          kind: "short-answer",
          title: text("Record the fix priority", "수정 우선순위 기록"),
          instruction: text(
            "Write what you will fix now, why it is first, how the same user will re-test it, and what will wait.",
            "지금 고칠 것, 그것이 우선인 이유, 같은 사용자가 다시 시험할 방법, 미룰 것을 적으세요.",
          ),
          placeholder: text(
            "Fix now… Reason… Re-test… Later…",
            "지금 수정… 이유… 재시험… 나중에…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-fix-and-retest",
      start: "01:35",
      end: "02:15",
      minutes: 40,
      phase: "FIX",
      title: text(
        "Fix the important problem and re-test",
        "중요한 문제 수정",
      ),
      goal: text(
        "Make one bounded change, preserve existing behavior, and ask the original tester to attempt the same task again.",
        "범위가 작은 변경 하나를 만들고 기존 동작을 유지하며 원래 테스터가 같은 과제를 다시 시도하게 합니다.",
      ),
      studentBrief: [
        text(
          "Give AI the observation evidence, change only the blocker, then run the same unassisted task with the same tester.",
          "AI에게 관찰 근거를 주고 방해 문제만 고친 뒤 같은 테스터에게 같은 과제를 설명 없이 다시 맡기세요.",
        ),
      ],
      teacherCue: [
        text(
          "Require one change at a time. A maker's own check is not a substitute for the original user's uncoached re-test.",
          "한 번에 변경 하나만 허용한다. 제작자의 자체 확인으로 원래 사용자의 설명 없는 재시험을 대신하지 않는다.",
        ),
      ],
      completion: text(
        "The original tester has repeated the same task and the learner has recorded success or the remaining blocker.",
        "원래 테스터가 같은 과제를 다시 수행했고 학생이 성공 또는 남은 막힘을 기록했습니다.",
      ),
      activities: [
        {
          id: "day5-fix-retest-evidence",
          kind: "short-answer",
          title: text(
            "Record the change and re-test",
            "변경과 재시험 기록",
          ),
          instruction: text(
            "Write what changed, what stayed working, what the original tester did in the re-test, and whether the blocker remains.",
            "바꾼 것, 계속 작동한 것, 원래 테스터가 재시험에서 한 행동, 막힘이 남았는지를 적으세요.",
          ),
          placeholder: text(
            "Changed… Preserved… Re-test behavior… Result…",
            "변경… 유지… 재시험 행동… 결과…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-quality-and-public-safety",
      start: "02:15",
      end: "02:35",
      minutes: 20,
      phase: "CHECK",
      title: text(
        "Check mobile, keyboard, content, and public safety",
        "모바일·키보드·공개 안전 확인",
      ),
      goal: text(
        "Use the real page to check the first screen, main path, relevant alternative state, phone width, keyboard, refresh, and public files.",
        "실제 페이지에서 첫 화면, 핵심 흐름, 관련 대체 상태, 휴대전화, 키보드, 새로고침, 공개 파일을 확인합니다.",
      ),
      studentBrief: [
        text(
          "Run the release checks and record any failure before uploading the candidate.",
          "배포 전 확인을 실행하고 실패가 있으면 후보를 올리기 전에 기록하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Ask for observed results. Remove private information, secret keys, unnecessary files, and broken paths before publication.",
          "관찰한 결과를 요구한다. 공개 전에 개인정보, 비밀 키, 불필요한 파일, 깨진 경로를 제거한다.",
        ),
      ],
      completion: text(
        "The project has recorded results for its main path, relevant edge state, mobile, keyboard, refresh, and public-safety checks.",
        "프로젝트에 핵심 흐름, 관련 예외 상태, 모바일, 키보드, 새로고침, 공개 안전 확인 결과가 기록되어 있습니다.",
      ),
      activities: [
        {
          id: "day5-release-check-evidence",
          kind: "short-answer",
          title: text(
            "Record the release checks",
            "배포 전 확인 기록",
          ),
          instruction: text(
            "Record the first-screen, main-path, relevant edge-state, phone, keyboard, refresh, and public-safety results.",
            "첫 화면, 핵심 흐름, 관련 예외 상태, 휴대전화, 키보드, 새로고침, 공개 안전 결과를 적으세요.",
          ),
          placeholder: text(
            "First screen… Main path… Edge state… Phone… Keyboard… Refresh… Safety…",
            "첫 화면… 핵심 흐름… 예외 상태… 휴대전화… 키보드… 새로고침… 안전…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-upload-release-candidate",
      start: "02:35",
      end: "02:50",
      minutes: 15,
      phase: "SAVE",
      title: text(
        "Upload the public release candidate",
        "공개 후보 버전 업로드",
      ),
      goal: text(
        "Publish the tested candidate or preserve verifiable fallback evidence when an external service is unavailable.",
        "시험한 후보를 공개하거나 외부 서비스 장애 때 검증 가능한 대체 근거를 보관합니다.",
      ),
      studentBrief: [
        text(
          "Upload the complete project, open the candidate URL, and run the main task without signing in.",
          "전체 프로젝트를 올리고 후보 URL을 연 뒤 로그인 없이 핵심 과제를 실행하세요.",
        ),
      ],
      teacherCue: [
        text(
          "For multi-file projects, preserve every referenced relative path. Use the documented fallback only for a confirmed external outage.",
          "여러 파일 프로젝트는 참조되는 모든 상대 경로를 유지한다. 확인된 외부 장애에서만 정해 둔 대체 근거를 사용한다.",
        ),
      ],
      completion: text(
        "A working candidate URL or instructor-verifiable fallback package exists.",
        "작동하는 후보 URL 또는 강사가 검증할 수 있는 대체 패키지가 있습니다.",
      ),
      activities: [
        {
          id: "day5-release-candidate-url",
          kind: "short-answer",
          title: text(
            "Record the release candidate",
            "공개 후보 기록",
          ),
          instruction: text(
            "Save the candidate URL. For a confirmed outage, record the full fallback package location and the teacher's verification.",
            "후보 URL을 저장하세요. 확인된 장애라면 전체 대체 패키지 위치와 강사의 검증을 기록하세요.",
          ),
          placeholder: text(
            "Candidate URL or verified fallback location…",
            "후보 URL 또는 검증된 대체 위치…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-other-environment-and-backup",
      start: "02:50",
      end: "03:00",
      minutes: 10,
      phase: "SAVE",
      title: text(
        "Check another environment and record the limitation",
        "다른 기기 확인과 한계 기록",
      ),
      goal: text(
        "Confirm the public candidate outside the maker's normal browser and preserve the complete Day 5 version.",
        "제작자가 평소 쓰는 브라우저 밖에서 공개 후보를 확인하고 Day 5 전체 버전을 보관합니다.",
      ),
      studentBrief: [
        text(
          "Open the candidate on another device or browser, run the main task, and save the complete Day 5 backup and one known limitation.",
          "다른 기기나 브라우저에서 후보를 열어 핵심 과제를 실행하고 Day 5 전체 백업과 알려진 한계 하나를 저장하세요.",
        ),
      ],
      teacherCue: [
        text(
          "A single-file project may use backups/day5-release.html; a multi-file project must preserve the complete referenced structure.",
          "단일 파일 프로젝트는 backups/day5-release.html을 사용할 수 있고 여러 파일 프로젝트는 참조 구조 전체를 보관해야 한다.",
        ),
      ],
      completion: text(
        "The candidate has an external-use result, one honest limitation, and a complete Day 5 backup.",
        "후보에 다른 환경 사용 결과, 솔직한 한계 하나, 완전한 Day 5 백업이 있습니다.",
      ),
      activities: [
        {
          id: "day5-external-check-and-backup",
          kind: "short-answer",
          title: text(
            "Record the external check and backup",
            "다른 환경 확인과 백업 기록",
          ),
          instruction: text(
            "Write the device or browser, the main-task result, one known limitation, and the complete backup location.",
            "사용한 기기 또는 브라우저, 핵심 과제 결과, 알려진 한계 하나, 전체 백업 위치를 적으세요.",
          ),
          placeholder: text(
            "Environment… Result… Limitation… Backup…",
            "환경… 결과… 한계… 백업…",
          ),
          minimum: 1,
        },
      ],
    },
  ],
};

export const day6Plan: InteractiveDayPlan = {
  day: 6,
  title: text(
    "Publish, Recheck, and Hand It to Someone Else",
    "배포하고, 다시 확인하고, 다른 사람에게 넘겨주기",
  ),
  question: text(
    "How do I make a project work in another person's environment and hand it over responsibly?",
    "프로젝트가 다른 사람의 환경에서도 작동하게 하고 책임 있게 전달하려면 어떻게 해야 할까요?",
  ),
  artifact: text(
    "A final public URL, one verified republish, a concise handoff, a 90-second live demo, and a next-step reflection",
    "최종 공개 URL, 검증한 재배포, 짧은 인수인계, 90초 실제 시연, 다음 단계 회고",
  ),
  stages: [
    {
      id: "day6-check-public-files-and-secrets",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "CHECK",
      title: text(
        "Check public files and sensitive information",
        "공개 전 파일과 민감정보 확인",
      ),
      goal: text(
        "Prepare the exact folder that another person may safely receive.",
        "다른 사람에게 안전하게 건넬 정확한 폴더를 준비합니다.",
      ),
      studentBrief: [
        text(
          "Keep required project files and remove secrets, private information, temporary files, and broken absolute paths.",
          "필요한 프로젝트 파일은 유지하고 비밀 정보, 개인정보, 임시 파일, 깨진 절대 경로는 제거하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Show the local project folder → GitHub repository → public Pages URL relationship. Stop immediately if a secret is visible.",
          "로컬 프로젝트 폴더 → GitHub 저장소 → 공개 Pages URL의 관계를 보여 준다. 비밀 정보가 보이면 즉시 중단한다.",
        ),
      ],
      completion: text(
        "The public folder contains every required file and no private or secret information.",
        "공개 폴더에 필요한 파일이 모두 있고 개인정보나 비밀 정보는 없습니다.",
      ),
      activities: [
        {
          id: "day6-public-folder-evidence",
          kind: "short-answer",
          title: text(
            "Record the public-folder check",
            "공개 폴더 확인 기록",
          ),
          instruction: text(
            "Write the folder location, required files, items removed, and the result of opening index.html locally.",
            "폴더 위치, 필요한 파일, 제거한 항목, index.html을 로컬에서 연 결과를 적으세요.",
          ),
          placeholder: text(
            "Folder… Required files… Removed… Local result…",
            "폴더… 필요한 파일… 제거한 것… 로컬 결과…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-live-publish-and-republish-demo",
      start: "00:15",
      end: "00:35",
      minutes: 20,
      phase: "WATCH",
      title: text(
        "Watch a publish and republish demonstration",
        "최종 배포와 수정 배포 시연",
      ),
      goal: text(
        "See one complete cycle from tested files to a public URL and a visible update at the same URL.",
        "시험한 파일이 공개 URL이 되고 같은 URL에 눈에 보이는 수정이 반영되는 전체 과정을 봅니다.",
      ),
      studentBrief: [
        text(
          "Watch the first publish, public test, visible change, upload, deployment wait, and second public test.",
          "첫 배포, 공개 테스트, 눈에 보이는 변경, 업로드, 배포 대기, 두 번째 공개 테스트를 보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use the prepared candidate as index.html. Show the deployment status and refresh the public URL only after it completes.",
          "준비된 후보를 index.html로 사용한다. 배포 상태를 보여 주고 완료된 뒤에만 공개 URL을 새로고침한다.",
        ),
      ],
      completion: text(
        "The learner can explain why a local change is not public until the changed files are uploaded and deployed.",
        "학생이 변경 파일을 업로드하고 배포하기 전에는 로컬 변경이 공개되지 않는 이유를 설명할 수 있습니다.",
      ),
      activities: [
        {
          id: "day6-publish-demo-read",
          kind: "read",
          title: text("Publish and republish", "배포와 재배포"),
          instruction: text(
            "Observe how one public URL receives a tested update.",
            "공개 URL 하나에 시험한 수정이 반영되는 과정을 보세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day6-final-personal-publish",
      start: "00:35",
      end: "01:05",
      minutes: 30,
      phase: "SAVE",
      title: text("Publish the final personal project", "개인 최종 배포"),
      goal: text(
        "Create the final sign-in-free URL or an instructor-verified fallback for a confirmed external outage.",
        "로그인 없이 열리는 최종 URL을 만들거나 확인된 외부 장애 때 강사가 검증한 대체 결과를 만듭니다.",
      ),
      studentBrief: [
        text(
          "Upload the complete public folder, wait for deployment, open the final URL, and run the main action.",
          "공개 폴더 전체를 올리고 배포를 기다린 뒤 최종 URL을 열어 핵심 행동을 실행하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Check repository settings, index.html location, and deployment status before changing code. Use fallback evidence only for confirmed external failure.",
          "코드를 바꾸기 전에 저장소 설정, index.html 위치, 배포 상태를 확인한다. 확인된 외부 장애에서만 대체 근거를 사용한다.",
        ),
      ],
      completion: text(
        "The final URL opens without sign-in and the main action works, or the approved fallback proves the same result.",
        "최종 URL이 로그인 없이 열리고 핵심 행동이 작동하거나 승인된 대체 결과에서 같은 작동을 증명합니다.",
      ),
      activities: [
        {
          id: "day6-final-url",
          kind: "short-answer",
          title: text("Save the final URL", "최종 URL 저장"),
          instruction: text(
            "Paste the final public URL and record the main action you tested there. For a confirmed outage, record the verified fallback location.",
            "최종 공개 URL을 붙여넣고 그 주소에서 시험한 핵심 행동을 적으세요. 확인된 장애라면 검증된 대체 위치를 기록하세요.",
          ),
          placeholder: text(
            "Final URL… Public test… or verified fallback…",
            "최종 URL… 공개 테스트… 또는 검증된 대체 결과…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-break",
      start: "01:05",
      end: "01:15",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest before cross-device testing.", "다른 기기 테스트 전에 쉽니다."),
      studentBrief: [
        text(
          "Pause and return with the final URL ready to share.",
          "작업을 멈추고 최종 URL을 공유할 준비를 해서 돌아오세요.",
        ),
      ],
      teacherCue: [
        text(
          "Prepare device pairs and QR support during the break.",
          "휴식 중 기기 짝과 QR 지원을 준비한다.",
        ),
      ],
      completion: text(
        "The learner returns ready to test another environment.",
        "학생이 다른 환경을 시험할 준비를 해서 돌아옵니다.",
      ),
      activities: [
        {
          id: "day6-break-timer",
          kind: "timer",
          title: text("Ten-minute break", "10분 휴식"),
          instruction: text(
            "Rest and return when the timer ends.",
            "쉬고 타이머가 끝나면 돌아오세요.",
          ),
          durationMinutes: 10,
          hidden: true,
        },
      ],
    },
    {
      id: "day6-test-another-device",
      start: "01:15",
      end: "01:35",
      minutes: 20,
      phase: "CHECK",
      title: text(
        "Use the public project on another device",
        "다른 기기에서 핵심 행동 확인",
      ),
      goal: text(
        "Find differences that appear only outside the maker's computer.",
        "제작자의 컴퓨터 밖에서만 나타나는 차이를 찾습니다.",
      ),
      studentBrief: [
        text(
          "Open the final URL on another device or browser, run the main action, and check phone width, refresh, and file paths.",
          "다른 기기나 브라우저에서 최종 URL을 열고 핵심 행동, 휴대전화 너비, 새로고침, 파일 경로를 확인하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Remind learners that localStorage and local files do not automatically move to another device.",
          "localStorage의 내용과 로컬 파일은 다른 기기로 자동 이동하지 않는다는 점을 알려 준다.",
        ),
      ],
      completion: text(
        "The learner has an observed result from another environment and one exact public issue or a clean pass.",
        "학생이 다른 환경의 관찰 결과와 정확한 공개 문제 하나 또는 정상 통과 기록을 가지고 있습니다.",
      ),
      activities: [
        {
          id: "day6-other-device-evidence",
          kind: "short-answer",
          title: text(
            "Record the other-device test",
            "다른 기기 테스트 기록",
          ),
          instruction: text(
            "Write the device or browser, main-action result, phone-width result, refresh result, and any path problem.",
            "기기 또는 브라우저, 핵심 행동 결과, 휴대전화 너비 결과, 새로고침 결과, 경로 문제를 적으세요.",
          ),
          placeholder: text(
            "Environment… Main action… Phone width… Refresh… Paths…",
            "환경… 핵심 행동… 휴대전화 너비… 새로고침… 경로…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-fix-public-problem-and-republish",
      start: "01:35",
      end: "01:55",
      minutes: 20,
      phase: "FIX",
      title: text(
        "Fix one public issue and republish",
        "공개 환경 문제 수정과 재배포",
      ),
      goal: text(
        "Make one evidence-based public change and verify it at the same URL.",
        "근거가 있는 공개 변경 하나를 만들고 같은 URL에서 확인합니다.",
      ),
      studentBrief: [
        text(
          "Fix the observed public problem or make one small visible verified change, upload it, wait, and test the same URL again.",
          "관찰한 공개 문제를 고치거나 눈에 보이는 작은 변경 하나를 만든 뒤 업로드하고 기다려 같은 URL을 다시 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Prioritize path and behavior problems. Do not allow a last-minute redesign or new feature.",
          "경로와 동작 문제를 우선한다. 마지막 순간의 전체 디자인 변경이나 새 기능 추가를 허용하지 않는다.",
        ),
      ],
      completion: text(
        "The same public URL shows the intended update and the main action still works.",
        "같은 공개 URL에 의도한 수정이 보이고 핵심 행동도 계속 작동합니다.",
      ),
      activities: [
        {
          id: "day6-republish-evidence",
          kind: "short-answer",
          title: text("Record the republish", "재배포 기록"),
          instruction: text(
            "Write the public issue or visible change, the uploaded file, the deployment result, and the re-test at the same URL.",
            "공개 문제 또는 눈에 보이는 변경, 올린 파일, 배포 결과, 같은 URL의 재시험을 적으세요.",
          ),
          placeholder: text(
            "Issue/change… File… Deployment… Same-URL re-test…",
            "문제/변경… 파일… 배포… 같은 URL 재시험…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-readme-and-qr",
      start: "01:55",
      end: "02:10",
      minutes: 15,
      phase: "SAVE",
      title: text(
        "Prepare the README and QR",
        "README와 QR 준비",
      ),
      goal: text(
        "Give another person enough information to open, use, and understand the current limit of the project.",
        "다른 사람이 프로젝트를 열고 사용하고 현재 한계를 이해할 수 있는 정보를 제공합니다.",
      ),
      studentBrief: [
        text(
          "Write the project name, user, purpose, opening URL, short use steps, current limitation, and tools used; then create and test the QR.",
          "프로젝트 이름, 사용자, 목적, URL, 짧은 사용법, 현재 한계, 사용 도구를 쓰고 QR을 만들어 시험하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Keep the handoff short and factual. Test the QR with a second device before accepting it.",
          "인수인계는 짧고 사실적으로 작성하게 한다. QR은 다른 기기로 시험한 뒤 인정한다.",
        ),
      ],
      completion: text(
        "The handoff explains the project and its limitation, and the tested QR opens the final URL.",
        "인수인계가 프로젝트와 한계를 설명하고 시험한 QR이 최종 URL을 엽니다.",
      ),
      activities: [
        {
          id: "day6-handoff-and-qr-evidence",
          kind: "short-answer",
          title: text(
            "Record the handoff and QR",
            "인수인계와 QR 기록",
          ),
          instruction: text(
            "Write where the README and QR are saved, the current limitation, and the result of opening the QR on another device.",
            "README와 QR 보관 위치, 현재 한계, 다른 기기에서 QR을 연 결과를 적으세요.",
          ),
          placeholder: text(
            "README… QR… Limitation… QR test…",
            "README… QR… 한계… QR 시험…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-small-group-showcase",
      start: "02:10",
      end: "02:45",
      minutes: 35,
      phase: "SHARE",
      title: text(
        "Run the small-group public showcase",
        "소그룹 공개 쇼케이스",
      ),
      goal: text(
        "Demonstrate the real public project in 90 seconds and receive evidence-based peer feedback.",
        "실제 공개 프로젝트를 90초 동안 시연하고 근거 중심의 동료 피드백을 받습니다.",
      ),
      studentBrief: [
        text(
          "Show the user and purpose, run the main action at the public URL, explain one tested change, and name one limitation.",
          "사용자와 목적을 말하고 공개 URL에서 핵심 행동을 실행하며 시험한 변경 하나와 한계 하나를 설명하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Use groups of four to six. Keep each demo to 90 seconds and feedback to observation, one clear decision, and one question.",
          "4~6명 소그룹으로 운영한다. 시연은 90초로 지키고 피드백은 관찰, 분명한 결정 하나, 질문 하나로 제한한다.",
        ),
      ],
      completion: text(
        "The learner has completed a live public demo and recorded peer use or feedback.",
        "학생이 실제 공개 시연을 마치고 동료 사용 또는 피드백을 기록했습니다.",
      ),
      activities: [
        {
          id: "day6-showcase-evidence",
          kind: "short-answer",
          title: text(
            "Record the showcase evidence",
            "쇼케이스 근거 기록",
          ),
          instruction: text(
            "Write what you demonstrated, one observed peer response, one clear decision a peer noticed, and one question received.",
            "시연한 것, 관찰한 동료 반응 하나, 동료가 발견한 분명한 결정 하나, 받은 질문 하나를 적으세요.",
          ),
          placeholder: text(
            "Demonstrated… Peer response… Clear decision… Question…",
            "시연… 동료 반응… 분명한 결정… 질문…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-next-step-and-reflection",
      start: "02:45",
      end: "03:00",
      minutes: 15,
      phase: "SAVE",
      title: text(
        "Map the next step and complete the reflection",
        "다음 단계 지도와 개인 회고",
      ),
      goal: text(
        "Separate AI contribution, human decisions, direct verification, current limits, and the next learning step.",
        "AI의 기여, 사람의 결정, 직접 검증, 현재 한계, 다음 학습 단계를 구분합니다.",
      ),
      studentBrief: [
        text(
          "Record what AI helped with, what you decided, what you verified, what remains limited, and what you would learn or build next.",
          "AI가 도운 일, 자신이 결정한 일, 직접 확인한 일, 남은 한계, 다음에 배우거나 만들 일을 적으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Explain the signs that a later version may need a backend or external API, but do not add one now. End with a verified final handoff.",
          "다음 버전에 백엔드나 외부 API가 필요할 수 있는 신호를 설명하되 지금 추가하지 않는다. 검증된 최종 인계로 끝낸다.",
        ),
      ],
      completion: text(
        "The final project, URL, backup, handoff, evidence, reflection, and one next step are all locatable.",
        "최종 프로젝트, URL, 백업, 인수인계, 근거, 회고, 다음 단계 한 가지를 모두 찾을 수 있습니다.",
      ),
      activities: [
        {
          id: "day6-final-reflection",
          kind: "short-answer",
          title: text("Complete the final reflection", "최종 회고 작성"),
          instruction: text(
            "Write what AI helped with, what you decided, what you verified yourself, one current limitation, and one next step.",
            "AI가 도운 일, 자신이 결정한 일, 직접 검증한 일, 현재 한계 하나, 다음 단계 하나를 적으세요.",
          ),
          placeholder: text(
            "AI helped… I decided… I verified… Current limit… Next step…",
            "AI가 도운 일… 내가 결정한 일… 직접 검증한 일… 현재 한계… 다음 단계…",
          ),
          minimum: 1,
        },
      ],
    },
  ],
};
