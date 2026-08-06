import { text, type InteractiveDayPlan } from "./types";

export const day5Plan: InteractiveDayPlan = {
  day: 5,
  title: text("Lend Your Tool to Another Agent", "내 도구를 다른 에이전트에게 빌려주기"),
  question: text(
    "Can the tool you built be used by the coding agent you have used all week?",
    "내가 만든 도구를 일주일 내내 써 온 코딩 에이전트가 쓸 수 있을까요?",
  ),
  artifact: text(
    "OpenCode running with a tool you wrote yourself",
    "내가 쓴 도구가 붙은 OpenCode",
  ),
  stages: [
    {
      id: "day5-what-is-mcp",
      start: "00:00",
      end: "00:20",
      minutes: 20,
      phase: "TELL",
      title: text("A shared way to lend a tool", "도구를 빌려주는 공통 규격"),
      goal: text(
        "Understand the problem MCP solves before writing any of it.",
        "쓰기 전에 MCP가 해결하는 문제를 이해합니다.",
      ),
      studentBrief: [
        text(
          "Your tool is inside your bot. To let another program use it, you would copy the code every time.",
          "내 도구는 내 봇 안에 있습니다. 다른 프로그램이 쓰게 하려면 매번 코드를 복사해야 합니다.",
        ),
        text(
          "With a shared format, programs can ask each other what tools they have. No advance agreement needed.",
          "공통 규격이 있으면 프로그램끼리 무슨 도구가 있는지 물어볼 수 있습니다. 미리 약속할 필요가 없습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Ask where yesterday's tool lives, then ask how OpenCode could use it. Let the problem appear first.",
          "어제 도구가 어디 있는지 묻고, OpenCode가 그것을 어떻게 쓸지 묻는다. 문제를 먼저 드러낸다.",
        ),
        text(
          "Confirm the OpenCode MCP settings path and format before class. Finding it live costs the lesson.",
          "수업 전에 OpenCode의 MCP 설정 경로와 형식을 확인해 둔다. 당일에 찾으면 수업을 잃는다.",
        ),
      ],
      completion: text(
        "The learner can say what changes when a tool moves out of their bot.",
        "학생이 도구가 봇 밖으로 나가면 무엇이 달라지는지 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day5-what-is-mcp-choice",
          kind: "choice",
          title: text("Why a shared format?", "공통 규격이 왜 필요한가?"),
          instruction: text(
            "What does a shared format let you avoid?",
            "공통 규격이 있으면 무엇을 피할 수 있습니까?",
          ),
          options: [
            {
              label: text("Rebuilding the tool for every program", "프로그램마다 도구를 다시 만드는 것"),
              value: "rebuild",
              feedback: text(
                "Correct. Write it once, and any program that knows the format can use it.",
                "맞습니다. 한 번 만들면 규격을 아는 모든 프로그램이 쓸 수 있습니다.",
              ),
            },
            {
              label: text("Paying for the model", "모델 사용료"),
              value: "cost",
              feedback: text(
                "No. The format is about sharing tools, not about cost.",
                "아닙니다. 규격은 비용이 아니라 도구 공유에 관한 것입니다.",
              ),
            },
            {
              label: text("Writing the function at all", "함수를 아예 안 쓰는 것"),
              value: "function",
              feedback: text(
                "No. You still write the function. Only the wrapping changes.",
                "아닙니다. 함수는 여전히 씁니다. 포장만 달라집니다.",
              ),
            },
          ],
        },
      ],
    },
    {
      id: "day5-wrap-tool",
      start: "00:20",
      end: "00:45",
      minutes: 25,
      phase: "STUDIO",
      title: text("Wrap, do not rebuild", "새로 만들지 말고 포장만"),
      goal: text(
        "Move an existing function into a small server without rewriting it.",
        "이미 있는 함수를 다시 쓰지 않고 작은 서버로 옮깁니다.",
      ),
      studentBrief: [
        text(
          "Reuse yesterday's function body. Only the wrapping changes.",
          "어제 함수 내용을 그대로 씁니다. 포장만 바뀝니다.",
        ),
        text(
          "Run the server by itself first. It should start without errors.",
          "먼저 서버를 직접 실행하세요. 오류 없이 떠야 합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Keep saying: do not write a new tool today. Learners who rebuild will run out of time.",
          "계속 말한다. 오늘 새 도구를 만들지 않는다. 다시 만드는 학생은 시간이 모자란다.",
        ),
      ],
      completion: text(
        "The server starts without errors.",
        "서버가 오류 없이 실행됩니다.",
      ),
      activities: [
        {
          id: "day5-wrap-tool-prompt",
          kind: "prompt",
          title: text("Wrap your tool", "도구 감싸기"),
          instruction: text("Fill in your own tool from yesterday.", "어제 만든 도구를 채워 넣으세요."),
          prompt: text(
            "Create mcp_server.py.\n\nMake a minimal MCP server that exposes one tool:\n[your tool from yesterday, and what it does]\n\nReuse the same function body from bot.py. Do not rewrite the logic.\nGive the tool a clear name and description.\nUse stdio transport.\nKeep it as short as possible.",
            "Create mcp_server.py.\n\nMake a minimal MCP server that exposes one tool:\n[어제 만든 도구와 하는 일]\n\nReuse the same function body from bot.py. Do not rewrite the logic.\nGive the tool a clear name and description.\nUse stdio transport.\nKeep it as short as possible.",
          ),
        },
      ],
    },
    {
      id: "day5-register",
      start: "00:45",
      end: "01:10",
      minutes: 25,
      phase: "CHECK",
      title: text("Register it in OpenCode", "OpenCode에 등록"),
      goal: text(
        "Make your tool appear in a program you did not write.",
        "내가 만들지 않은 프로그램에 내 도구가 나타나게 합니다.",
      ),
      studentBrief: [
        text(
          "Copy the settings example and change the path and the name. Use an absolute path.",
          "설정 예시를 복사하고 경로와 이름만 바꾸세요. 절대 경로를 쓰세요.",
        ),
        text(
          "If it does not appear, run your server directly and read the error first.",
          "안 나타나면 먼저 서버를 직접 실행해서 에러를 읽으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Give the settings file as a copyable example. Do not make learners find the format themselves.",
          "설정 파일을 복사 가능한 예시로 준다. 형식을 학생이 찾게 하지 않는다.",
        ),
        text(
          "After fifteen minutes, move on. Assistants take the rest; server-runs-cleanly is enough for them.",
          "15분이 지나면 진행한다. 나머지는 보조강사가 맡고, 서버 실행 확인까지만 시킨다.",
        ),
      ],
      completion: text(
        "The tool is listed in OpenCode, or the server runs cleanly on its own.",
        "OpenCode 목록에 도구가 보이거나, 최소한 서버가 단독으로 잘 실행됩니다.",
      ),
      activities: [
        {
          id: "day5-register-checklist",
          kind: "checklist",
          title: text("Registration check", "등록 확인"),
          instruction: text("Work down the list until it appears.", "나타날 때까지 순서대로 확인하세요."),
          items: [
            text("The server runs on its own without an error", "서버가 단독으로 오류 없이 실행됩니다"),
            text("The path in the settings is absolute", "설정의 경로가 절대 경로입니다"),
            text("OpenCode was restarted after the change", "바꾼 뒤 OpenCode를 재시작했습니다"),
            text("My tool appears in the tool list", "도구 목록에 내 도구가 보입니다"),
          ],
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
      goal: text("Rest.", "쉽니다."),
      studentBrief: [text("Ten minutes.", "10분입니다.")],
      teacherCue: [
        text(
          "Use this to unblock registrations rather than letting the whole class wait.",
          "전체를 기다리게 하지 말고 이 시간에 등록 문제를 푼다.",
        ),
      ],
      completion: text("The class returns.", "학생이 돌아옵니다."),
      activities: [
        {
          id: "day5-break-timer",
          kind: "timer",
          title: text("Break", "휴식"),
          instruction: text("Ten minutes.", "10분."),
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day5-make-it-use",
      start: "01:20",
      end: "01:50",
      minutes: 30,
      phase: "CHECK",
      title: text("Ask OpenCode to use your tool", "OpenCode에게 쓰라고 하기"),
      goal: text(
        "See a program you did not write run a function you did write.",
        "내가 만들지 않은 프로그램이 내가 쓴 함수를 실행하는 것을 봅니다.",
      ),
      studentBrief: [
        text(
          "Make a request in plain language that needs your tool. Do not name the function.",
          "도구가 필요한 요청을 평범한 문장으로 하세요. 함수 이름을 말하지 마세요.",
        ),
        text(
          "It decided on its own. This is exactly what happened on Day 3.",
          "스스로 판단한 것입니다. 3일차에 일어난 일과 정확히 같습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Say it out loud: nobody told it to call that function. This is the moment of the day.",
          "소리 내어 말한다. 아무도 그 함수를 부르라고 하지 않았다. 오늘의 순간이다.",
        ),
      ],
      completion: text(
        "OpenCode called the learner's tool without being told the function name.",
        "함수 이름을 알려 주지 않았는데 OpenCode가 학생의 도구를 불렀습니다.",
      ),
      activities: [
        {
          id: "day5-make-it-use-record",
          kind: "test-record",
          title: text("What did you ask, what happened?", "무엇을 물었고 무슨 일이 있었나?"),
          instruction: text(
            "Write the request you made and whether your tool was called.",
            "어떤 요청을 했고 도구가 불렸는지 적으세요.",
          ),
          placeholder: text(
            "I asked… and my tool was…",
            "저는 …라고 요청했고, 제 도구는…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-fix-description",
      start: "01:50",
      end: "02:30",
      minutes: 40,
      phase: "FIX",
      title: text("Fix the description, not the model", "모델이 아니라 설명을 고친다"),
      goal: text(
        "Apply the Day 3 rule outside your own code.",
        "3일차의 규칙을 내 코드 밖에서 적용합니다.",
      ),
      studentBrief: [
        text(
          "Try several unclear requests. Watch when it is called and when it is not.",
          "애매한 요청을 여러 개 해 보세요. 언제 불리고 언제 안 불리는지 보세요.",
        ),
        text(
          "When it chooses wrong, change the description. Do not change the function.",
          "잘못 고르면 설명을 바꾸세요. 함수는 바꾸지 마세요.",
        ),
      ],
      teacherCue: [
        text(
          "This is the same activity as Day 3. Point that out explicitly so the principle transfers.",
          "3일차와 같은 활동이다. 원리가 옮겨 가도록 명시적으로 짚는다.",
        ),
      ],
      completion: text(
        "Choice accuracy improved after a description change.",
        "설명을 바꾼 뒤 선택 정확도가 좋아졌습니다.",
      ),
      activities: [
        {
          id: "day5-fix-description-prompt",
          kind: "prompt",
          title: text("Improve the description", "설명 개선"),
          instruction: text("Then register again and retest.", "그다음 다시 등록하고 다시 시험하세요."),
          prompt: text(
            "Improve the tool description in mcp_server.py.\n\nIt should say clearly:\n- exactly what this tool returns\n- when to use it\n- when NOT to use it\n- an example of valid arguments\n\nDo not change the function logic.",
            "Improve the tool description in mcp_server.py.\n\nIt should say clearly:\n- exactly what this tool returns\n- when to use it\n- when NOT to use it\n- an example of valid arguments\n\nDo not change the function logic.",
          ),
        },
        {
          id: "day5-fix-description-record",
          kind: "test-record",
          title: text("Before and after", "전과 후"),
          instruction: text(
            "What was wrong, what did you change, and what happened after?",
            "무엇이 잘못됐고, 무엇을 바꿨고, 그 뒤 어떻게 됐습니까?",
          ),
          placeholder: text(
            "Before… I changed… After…",
            "전에는… 바꾼 것은… 그 뒤에는…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-same-principle",
      start: "02:30",
      end: "02:50",
      minutes: 20,
      phase: "TELL",
      title: text("The same rule, a different program", "같은 규칙, 다른 프로그램"),
      goal: text(
        "See that Day 3 was a principle, not a product feature.",
        "3일차가 제품 기능이 아니라 원리였음을 확인합니다.",
      ),
      studentBrief: [
        text(
          "Day 3: your bot, a tool definition, the model chooses. Day 5: your tool, a shared format, OpenCode chooses.",
          "3일차는 내 봇, 도구 정의, 모델이 고름. 5일차는 내 도구, 공통 규격, OpenCode가 고름.",
        ),
        text(
          "You stopped being someone who uses tools and became someone who builds them for others.",
          "도구를 쓰는 사람에서, 다른 사람이 쓸 도구를 만드는 사람이 되었습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Draw both lines on the board side by side. If learners do not make this link, today was wasted.",
          "칠판에 두 줄을 나란히 그린다. 학생이 이 연결을 못 하면 오늘이 낭비된 것이다.",
        ),
      ],
      completion: text(
        "The learner can state the shared principle in one sentence.",
        "학생이 공통 원리를 한 문장으로 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day5-same-principle-answer",
          kind: "short-answer",
          title: text("The rule in one sentence", "한 문장으로 규칙"),
          instruction: text(
            "What is the same between Day 3 and today?",
            "3일차와 오늘 사이에 같은 것은 무엇입니까?",
          ),
          placeholder: text(
            "In both cases…",
            "두 경우 모두…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day5-save",
      start: "02:50",
      end: "03:00",
      minutes: 10,
      phase: "SAVE",
      title: text("Save", "저장"),
      goal: text("Keep the server file.", "서버 파일을 남깁니다."),
      studentBrief: [
        text("Copy it to backups/day5-mcp-server.py.", "backups/day5-mcp-server.py로 복사하세요."),
      ],
      teacherCue: [
        text("Tell them to bring a list of what is still broken tomorrow.", "내일 아직 안 되는 것 목록을 가져오라고 말한다."),
      ],
      completion: text("A backup exists.", "백업이 있습니다."),
      activities: [
        {
          id: "day5-save-checklist",
          kind: "checklist",
          title: text("End of day check", "마무리 확인"),
          instruction: text("Both before you leave.", "가기 전에 둘 다."),
          items: [
            text("backups/day5-mcp-server.py exists", "backups/day5-mcp-server.py가 있습니다"),
            text("I wrote down what is still broken in my bot", "내 봇에서 아직 안 되는 것을 적었습니다"),
          ],
        },
      ],
    },
  ],
};

export const day6Plan: InteractiveDayPlan = {
  day: 6,
  title: text("Finish It and Show Someone", "마무리하고 보여 주기"),
  question: text(
    "Can someone else run your bot and understand what it does?",
    "다른 사람이 내 봇을 실행하고 무엇을 하는지 이해할 수 있을까요?",
  ),
  artifact: text(
    "A working demo, a short handoff, and a next-step plan",
    "작동하는 시연, 짧은 인계, 다음 단계 계획",
  ),
  stages: [
    {
      id: "day6-fix-not-add",
      start: "00:00",
      end: "01:00",
      minutes: 60,
      phase: "FIX",
      title: text("Fix, do not add", "고치되 더하지 않기"),
      goal: text(
        "Get to a bot that runs, in priority order.",
        "우선순위대로, 실행되는 봇까지 갑니다.",
      ),
      studentBrief: [
        text(
          "Order: things that will not run, then the main action failing, then crashing on failure.",
          "순서. 실행이 안 되는 것, 핵심 동작 실패, 실패할 때 죽는 것.",
        ),
        text(
          "If your bot will not run, go back to backups/ first. A smaller working bot beats a bigger broken one.",
          "봇이 실행되지 않으면 먼저 backups/로 돌아가세요. 작아도 되는 봇이 크고 안 되는 봇보다 낫습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Ban new features out loud at the start. Every year someone breaks everything before the showcase.",
          "시작할 때 새 기능 금지를 소리 내어 말한다. 매년 누군가 쇼케이스 전에 전부 망가뜨린다.",
        ),
        text(
          "Nobody reaches the showcase without something to run. Recover from backups or the instructor version.",
          "보여 줄 것 없이 쇼케이스에 가는 학생이 없게 한다. 백업이나 강사 완성본으로 복구시킨다.",
        ),
      ],
      completion: text(
        "The bot runs and the main action succeeds.",
        "봇이 실행되고 핵심 동작이 성공합니다.",
      ),
      activities: [
        {
          id: "day6-fix-checklist",
          kind: "checklist",
          title: text("Ready to show", "보여 줄 준비"),
          instruction: text("All four before the showcase.", "쇼케이스 전에 네 가지 모두."),
          items: [
            text("The bot runs without an error", "봇이 오류 없이 실행됩니다"),
            text("The main action works", "핵심 동작이 됩니다"),
            text(".env is in .gitignore and no key is left in the code", ".env가 .gitignore에 있고 코드에 키가 없습니다"),
            text("My backups are in place", "백업이 있습니다"),
          ],
        },
      ],
    },
    {
      id: "day6-break",
      start: "01:00",
      end: "01:10",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest before the showcase.", "쇼케이스 전에 쉽니다."),
      studentBrief: [text("Ten minutes.", "10분입니다.")],
      teacherCue: [
        text("Form groups of four to six and confirm every bot runs.", "4~6명 그룹을 만들고 모든 봇이 실행되는지 확인한다."),
      ],
      completion: text("Groups are formed.", "그룹이 만들어집니다."),
      activities: [
        {
          id: "day6-break-timer",
          kind: "timer",
          title: text("Break", "휴식"),
          instruction: text("Ten minutes.", "10분."),
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day6-showcase",
      start: "01:10",
      end: "01:50",
      minutes: 40,
      phase: "SHARE",
      title: text("Small-group showcase", "소그룹 쇼케이스"),
      goal: text(
        "Show the bot running and name one thing that still does not work.",
        "봇이 도는 것을 보이고, 아직 안 되는 것 하나를 말합니다.",
      ),
      studentBrief: [
        text(
          "Ninety seconds: who it is for, run it, what tool you built and why, and one thing still broken.",
          "90초. 누구를 위한 것인지, 실행해 보이기, 만든 도구와 이유, 아직 안 되는 것 하나.",
        ),
        text(
          "Saying what does not work is required. It is not a penalty.",
          "안 되는 것을 말하는 것은 필수입니다. 감점이 아닙니다.",
        ),
      ],
      teacherCue: [
        text(
          "Keep time strictly. If a bot will not start, move on and give them another turn later.",
          "시간을 정확히 지킨다. 봇이 안 뜨면 넘기고 나중에 기회를 준다.",
        ),
        text(
          "Judge working behavior and judgment, never English fluency.",
          "실제 작동과 판단을 본다. 영어 유창성은 보지 않는다.",
        ),
      ],
      completion: text(
        "Each learner demonstrated a running bot to their group.",
        "각자 그룹에게 실행되는 봇을 시연했습니다.",
      ),
      activities: [
        {
          id: "day6-showcase-peer",
          kind: "peer",
          title: text("Ninety seconds each", "한 사람당 90초"),
          instruction: text(
            "Present in your group. Cover all four points.",
            "그룹에서 발표하세요. 네 가지를 모두 다루세요.",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day6-use-others",
      start: "01:50",
      end: "02:20",
      minutes: 30,
      phase: "SHARE",
      title: text("Use each other's bots", "서로의 봇 써 보기"),
      goal: text(
        "Find out what a demo hides.",
        "시연이 감추는 것을 찾아냅니다.",
      ),
      studentBrief: [
        text(
          "Talk to at least two other bots yourself. The builder watches but does not explain.",
          "다른 봇 두 개 이상에 직접 말을 거세요. 만든 사람은 보되 설명하지 않습니다.",
        ),
      ],
      teacherCue: [
        text(
          "No scores. One sentence per bot is all that is collected.",
          "점수는 없다. 봇마다 한 문장만 걷는다.",
        ),
      ],
      completion: text(
        "The learner used two other bots and left one sentence for each.",
        "학생이 다른 봇 두 개를 쓰고 각각 한 문장을 남겼습니다.",
      ),
      activities: [
        {
          id: "day6-use-others-record",
          kind: "test-record",
          title: text("One sentence per bot", "봇마다 한 문장"),
          instruction: text(
            "For each bot you used: I understood ___. I was unsure about ___.",
            "사용한 봇마다: I understood ___. I was unsure about ___.",
          ),
          placeholder: text(
            "Bot 1: I understood… I was unsure about…",
            "봇 1: I understood… I was unsure about…",
          ),
          minimum: 2,
        },
      ],
    },
    {
      id: "day6-reflect",
      start: "02:20",
      end: "02:45",
      minutes: 25,
      phase: "SAVE",
      title: text("What the AI did, what you decided", "AI가 한 일과 내가 결정한 일"),
      goal: text(
        "Separate the agent's work from your own judgment, honestly.",
        "에이전트의 일과 자신의 판단을 솔직하게 구분합니다.",
      ),
      studentBrief: [
        text(
          "Be honest about what you verified yourself and what you still do not understand.",
          "직접 확인한 것과 아직 이해하지 못한 것을 솔직하게 쓰세요.",
        ),
        text(
          "You barely wrote code in six days. But you decided, checked, asked why, and fixed descriptions.",
          "6일 동안 코드를 거의 안 썼습니다. 하지만 결정했고, 확인했고, 왜인지 물었고, 설명을 고쳤습니다.",
        ),
      ],
      teacherCue: [
        text(
          "If someone writes that the AI did everything, help them find the decisions they actually made.",
          "AI가 다 했다고 쓴 학생에게는 실제로 내린 결정을 같이 찾아 준다.",
        ),
      ],
      completion: text(
        "The reflection names at least one decision and one gap in understanding.",
        "회고에 자신이 내린 결정 하나와 이해하지 못한 부분 하나가 적혀 있습니다.",
      ),
      activities: [
        {
          id: "day6-reflect-answer",
          kind: "short-answer",
          title: text("Five questions", "다섯 가지 질문"),
          instruction: text(
            "What did the AI do? What did you decide? What did you verify? What do you still not understand? What will you build next?",
            "AI가 한 일은? 내가 결정한 것은? 직접 확인한 것은? 아직 모르는 것은? 다음에 만들 것은?",
          ),
          placeholder: text(
            "The AI… I decided… I verified… I still do not understand… Next I will…",
            "AI는… 내가 결정한 것은… 직접 확인한 것은… 아직 모르는 것은… 다음에는…",
          ),
          minimum: 3,
        },
      ],
    },
    {
      id: "day6-what-next",
      start: "02:45",
      end: "03:00",
      minutes: 15,
      phase: "WATCH",
      title: text("Where to go next", "다음에 갈 곳"),
      goal: text(
        "See two directions beyond this course without starting them today.",
        "오늘 시작하지는 않되, 이 과정 밖의 두 방향을 봅니다.",
      ),
      studentBrief: [
        text(
          "One agent can hand work to another. Same principle as Day 5, but it costs more and is harder to debug.",
          "에이전트가 다른 에이전트에게 일을 넘길 수 있습니다. 5일차와 같은 원리지만 비용이 크고 디버깅이 어렵습니다.",
        ),
        text(
          "Frameworks draw these flows for you. You can read them because you built one by hand.",
          "프레임워크는 이 흐름을 그림으로 그려 줍니다. 직접 만들어 봤기 때문에 읽을 수 있습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Demonstrate only. Learners must not try this today; it needs two paid accounts.",
          "시연만 한다. 오늘 학생이 따라 하지 않게 한다. 유료 계정이 두 개 필요하다.",
        ),
        text(
          "Close with the habit, not the bot: keep asking why a line is there.",
          "봇이 아니라 습관으로 끝맺는다. 그 줄이 왜 있는지 계속 물으라고.",
        ),
      ],
      completion: text(
        "The learner has a next step in mind.",
        "학생이 다음 단계를 생각하고 있습니다.",
      ),
      activities: [
        {
          id: "day6-what-next-read",
          kind: "read",
          title: text("Extension demo", "확장 시연"),
          instruction: text(
            "Watch one agent hand work to another. Do not try it today.",
            "한 에이전트가 다른 에이전트에게 일을 넘기는 것을 보세요. 오늘 따라 하지 마세요.",
          ),
          hidden: true,
        },
      ],
    },
  ],
};
