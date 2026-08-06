import { text, type InteractiveDayPlan } from "./types";

export const day1Plan: InteractiveDayPlan = {
  day: 1,
  title: text("Wake Up Your Assistant", "비서를 깨운다"),
  question: text(
    "How do you install an assistant that acts instead of only talking?",
    "말만 하는 것이 아니라 행동하는 비서를 어떻게 설치할까요?",
  ),
  artifact: text(
    "A working assistant on your laptop that answers you on Telegram",
    "텔레그램으로 답하는, 내 노트북에서 도는 비서",
  ),
  stages: [
    {
      id: "day1-join-and-install",
      start: "00:00",
      end: "00:10",
      minutes: 10,
      phase: "CHECK",
      title: text("Join the group and start the install", "그룹 참여와 설치 시작"),
      goal: text(
        "Get the download running before anyone explains anything.",
        "설명을 시작하기 전에 다운로드부터 돌립니다.",
      ),
      studentBrief: [
        text(
          "Join the class Telegram group, open a terminal, and run the command on the board.",
          "수업 텔레그램 그룹에 들어오고, 터미널을 열고, 칠판의 명령어를 실행하세요.",
        ),
        text(
          "Then leave it alone. Do not sit and watch it download.",
          "그다음 그대로 두세요. 앉아서 다운로드를 지켜보지 마세요.",
        ),
      ],
      teacherCue: [
        text(
          "Start the download first, then teach. Explaining while nothing downloads doubles the day.",
          "다운로드를 먼저 걸고 가르친다. 아무것도 안 받는 동안 설명하면 하루가 두 배가 된다.",
        ),
        text(
          "Do not wait for everyone. Hand the stuck learners to an assistant and move on.",
          "전원을 기다리지 않는다. 막힌 학생은 보조강사에게 넘기고 진행한다.",
        ),
      ],
      completion: text(
        "The install command is running and the learner is in the group.",
        "설치 명령이 돌고 있고 학생이 그룹에 들어왔습니다.",
      ),
      activities: [
        {
          id: "day1-join-and-install-checklist",
          kind: "checklist",
          title: text("Started", "시작 확인"),
          instruction: text("Both, then look up.", "둘 다 하고 고개를 드세요."),
          items: [
            text("I joined the class Telegram group", "수업 텔레그램 그룹에 들어왔습니다"),
            text("The install command is running in my terminal", "터미널에서 설치 명령이 돌고 있습니다"),
          ],
        },
      ],
    },
    {
      id: "day1-chatbot-vs-agent",
      start: "00:10",
      end: "00:25",
      minutes: 15,
      phase: "WATCH",
      title: text("A chatbot talks, an agent does", "챗봇은 말하고, 에이전트는 한다"),
      goal: text(
        "Feel the difference yourself instead of being told about it.",
        "설명을 듣는 대신 직접 차이를 느낍니다.",
      ),
      studentBrief: [
        text(
          "Your phone will buzz. Nobody typed that message by hand.",
          "여러분의 폰이 울립니다. 그 메시지를 사람이 직접 치지 않았습니다.",
        ),
        text(
          "Now open ChatGPT and ask it to do the same thing to your own files. It cannot.",
          "이제 ChatGPT를 열고 내 파일에 같은 것을 시켜보세요. 못 합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Send a message to the class group from your assistant, then stay silent for three seconds.",
          "비서로 수업 그룹에 메시지를 보내고, 3초간 아무 말도 하지 않는다.",
        ),
        text(
          "Then rename files in a messy folder on the projector so they see it change.",
          "그다음 프로젝터에서 지저분한 폴더의 파일 이름을 바꿔 눈앞에서 변하는 것을 보인다.",
        ),
        text(
          "If a learner's ChatGPT does produce a file, ask where that file actually is.",
          "학생의 ChatGPT가 파일을 만들어내면, 그 파일이 실제로 어디 있는지 되묻는다.",
        ),
      ],
      completion: text(
        "The learner can say why a chatbot could not do it.",
        "학생이 챗봇은 왜 못 하는지 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-chatbot-vs-agent-try",
          kind: "test-record",
          title: text("Try it on ChatGPT", "ChatGPT로 해보기"),
          instruction: text(
            "Ask ChatGPT to create a file on your computer or message your friend. Write what it did instead.",
            "ChatGPT에게 내 컴퓨터에 파일을 만들거나 친구에게 메시지를 보내라고 하세요. 대신 무엇을 했는지 적으세요.",
          ),
          placeholder: text(
            "I asked… and it…",
            "…라고 시켰더니…",
          ),
          minimum: 1,
        },
        {
          id: "day1-chatbot-vs-agent-why",
          kind: "choice",
          title: text("Why could it not?", "왜 못 했을까?"),
          instruction: text(
            "Why can a chatbot not rename the files on your laptop?",
            "챗봇은 왜 내 노트북의 파일 이름을 바꾸지 못할까요?",
          ),
          options: [
            {
              label: text("It has no hands — it can only send text back", "손이 없다 — 글자만 돌려줄 수 있다"),
              value: "no-hands",
              feedback: text(
                "Correct. Today you install one that can reach your computer.",
                "맞습니다. 오늘은 내 컴퓨터에 닿을 수 있는 것을 설치합니다.",
              ),
            },
            {
              label: text("It is not smart enough", "충분히 똑똑하지 않다"),
              value: "not-smart",
              feedback: text(
                "No. It knows how. It just cannot reach your machine.",
                "아닙니다. 방법은 압니다. 내 컴퓨터에 닿지 못할 뿐입니다.",
              ),
            },
            {
              label: text("It is not allowed to", "허락받지 못했다"),
              value: "not-allowed",
              feedback: text(
                "Closer, but the real reason is simpler: there is no connection to your computer at all.",
                "비슷하지만 진짜 이유는 더 단순합니다. 내 컴퓨터와 연결 자체가 없습니다.",
              ),
            },
          ],
        },
      ],
    },
    {
      id: "day1-three-lines",
      start: "00:25",
      end: "00:35",
      minutes: 10,
      phase: "TELL",
      title: text("Three lines — what would you hand over?", "세 줄 — 무엇을 넘기고 싶은가"),
      goal: text(
        "Give the install a reason before it finishes.",
        "설치가 끝나기 전에 그것을 하는 이유를 갖습니다.",
      ),
      studentBrief: [
        text(
          "On paper, answer three questions about your own work. Keep the paper until Day 4.",
          "종이에 자기 일에 대한 세 가지 질문에 답하세요. 4일차까지 보관합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Undergraduates stall on question 1. Question 3 always has an answer.",
          "학부생은 1번에서 막힌다. 3번은 누구나 답이 있다.",
        ),
        text(
          "Have two or three read theirs aloud, then say one of these becomes their Day 4 project.",
          "두세 명이 읽게 한 뒤, 이 중 하나가 4일차 과제가 된다고 말한다.",
        ),
      ],
      completion: text(
        "The learner has three written answers and keeps the paper.",
        "학생이 세 가지 답을 적고 종이를 보관합니다.",
      ),
      activities: [
        {
          id: "day1-three-lines-answer",
          kind: "short-answer",
          title: text("Your three lines", "내 세 줄"),
          instruction: text(
            "1) What do I repeat every week? 2) What takes long even once? 3) What can I not do for lack of skill?",
            "1) 매주 반복하는 일은? 2) 한 번뿐인데 오래 걸리는 일은? 3) 실력이 안 돼서 못 한 일은?",
          ),
          placeholder: text(
            "1… 2… 3…",
            "1… 2… 3…",
          ),
          minimum: 3,
        },
      ],
    },
    {
      id: "day1-finish-install",
      start: "00:35",
      end: "01:10",
      minutes: 35,
      phase: "CHECK",
      title: text("Finish the install", "설치 마무리"),
      goal: text(
        "Get the command working on every machine that can get there today.",
        "오늘 갈 수 있는 모든 기계에서 명령이 되게 만듭니다.",
      ),
      studentBrief: [
        text(
          "When it finishes, close your terminal and open a new one. This is the most common problem today.",
          "끝나면 터미널을 닫고 새로 여세요. 오늘 가장 흔한 문제입니다.",
        ),
        text(
          "Then type hermes. If something appears, you are done.",
          "그다음 hermes 라고 치세요. 뭔가 나오면 된 것입니다.",
        ),
      ],
      teacherCue: [
        text(
          "command not found after a successful install almost always means the shell was not reopened.",
          "설치가 됐는데 command not found 가 나오면 거의 항상 셸을 새로 안 연 것이다.",
        ),
        text(
          "If more than half fail, stop and find the one shared cause. Individual triage burns the whole class.",
          "절반 이상 실패하면 멈추고 공통 원인 하나를 찾는다. 개별 대응하면 수업이 통째로 날아간다.",
        ),
        text(
          "OpenCode can start here too, but it is the first thing to drop if time runs short.",
          "OpenCode도 여기서 시작할 수 있지만, 시간이 밀리면 가장 먼저 버린다.",
        ),
      ],
      completion: text(
        "Typing hermes in a fresh terminal produces output.",
        "새 터미널에서 hermes 를 치면 출력이 나옵니다.",
      ),
      activities: [
        {
          id: "day1-finish-install-checklist",
          kind: "checklist",
          title: text("Install check", "설치 확인"),
          instruction: text("In order.", "순서대로."),
          items: [
            text("The install finished without stopping on an error", "오류로 멈추지 않고 설치가 끝났습니다"),
            text("I closed the terminal and opened a new one", "터미널을 닫고 새로 열었습니다"),
            text("Typing hermes shows something", "hermes 를 치면 뭔가 나옵니다"),
          ],
        },
      ],
    },
    {
      id: "day1-break",
      start: "01:10",
      end: "01:20",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest while installs finish.", "설치가 끝나는 동안 쉽니다."),
      studentBrief: [text("Ten minutes.", "10분입니다.")],
      teacherCue: [
        text(
          "Use this to unblock the machines that failed, not to rest.",
          "쉬지 말고 실패한 기계를 푸는 데 쓴다.",
        ),
      ],
      completion: text("The class returns.", "학생이 돌아옵니다."),
      activities: [
        {
          id: "day1-break-timer",
          kind: "timer",
          title: text("Break", "휴식"),
          instruction: text("Ten minutes.", "10분."),
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day1-connect-model",
      start: "01:20",
      end: "01:50",
      minutes: 30,
      phase: "STUDIO",
      title: text("Connect a model and say hello", "모델 연결하고 인사하기"),
      goal: text(
        "Give the assistant a brain and hear it answer.",
        "비서에게 머리를 붙이고 답을 듣습니다.",
      ),
      studentBrief: [
        text(
          "Run hermes setup. Use the provider, model name, and key source from the board.",
          "hermes setup 을 실행하세요. 칠판의 제공자, 모델 이름, 키를 씁니다.",
        ),
        text(
          "Copy the model name exactly. One wrong letter gives model not found later.",
          "모델 이름을 정확히 복사하세요. 한 글자만 틀려도 나중에 model not found 가 납니다.",
        ),
      ],
      teacherCue: [
        text(
          "Never show a real API key on the projector. Demo with a pre-configured setup.",
          "프로젝터에 실제 API 키를 띄우지 않는다. 미리 설정해 둔 것으로 시연한다.",
        ),
        text(
          "401 means the key, model not found means the name. Post both on the board.",
          "401은 키, model not found는 이름 문제다. 둘 다 칠판에 써 둔다.",
        ),
      ],
      completion: text(
        "The assistant answered a question in the terminal.",
        "터미널에서 비서가 질문에 답했습니다.",
      ),
      activities: [
        {
          id: "day1-connect-model-record",
          kind: "test-record",
          title: text("First answer", "첫 답변"),
          instruction: text(
            "Ask it what it can do. Write the first line of its answer, or the error you got.",
            "무엇을 할 수 있는지 물어보세요. 답의 첫 줄이나 받은 에러를 적으세요.",
          ),
          placeholder: text(
            "It said… / I got the error…",
            "이렇게 답했습니다… / 이런 에러가 났습니다…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day1-real-work",
      start: "01:50",
      end: "02:20",
      minutes: 30,
      phase: "STUDIO",
      title: text("Give it real work", "실제로 일 시키기"),
      goal: text(
        "See a file appear that you did not make yourself.",
        "내가 직접 만들지 않은 파일이 생기는 것을 봅니다.",
      ),
      studentBrief: [
        text(
          "Talking is not the point. Make it create a file, list a folder, or make a folder.",
          "대화가 목적이 아닙니다. 파일을 만들고, 폴더를 보고, 폴더를 만들게 하세요.",
        ),
        text(
          "Then open the folder yourself. The file is really there.",
          "그다음 폴더를 직접 열어보세요. 파일이 진짜 있습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Say clearly that it really touches their machine, and that today they work only in a practice folder.",
          "정말로 자기 컴퓨터를 만진다는 것과, 오늘은 연습 폴더에서만 한다는 것을 분명히 말한다.",
        ),
        text(
          "This is the moment the morning demo becomes theirs. Do not let it become a chat session.",
          "아침 시연이 자기 것이 되는 순간이다. 대화 세션으로 흘러가게 두지 않는다.",
        ),
      ],
      completion: text(
        "A file the assistant made exists in the learner's folder.",
        "비서가 만든 파일이 학생의 폴더에 있습니다.",
      ),
      activities: [
        {
          id: "day1-real-work-record",
          kind: "test-record",
          title: text("What appeared?", "무엇이 생겼나?"),
          instruction: text(
            "Make it create something, then open the folder and write what you found.",
            "뭔가 만들게 하고, 폴더를 열어서 무엇을 찾았는지 적으세요.",
          ),
          placeholder: text(
            "I asked for… and in my folder I found…",
            "…를 시켰더니 폴더에…",
          ),
          minimum: 1,
        },
        {
          id: "day1-real-work-safety",
          kind: "checklist",
          title: text("Today's rule", "오늘의 규칙"),
          instruction: text("Agree before continuing.", "계속하기 전에 확인하세요."),
          items: [
            text("I am working inside a practice folder, not my real documents", "진짜 문서가 아니라 연습 폴더에서 하고 있습니다"),
            text("I only ask for things I could undo", "되돌릴 수 있는 것만 시킵니다"),
          ],
        },
      ],
    },
    {
      id: "day1-phone",
      start: "02:20",
      end: "02:50",
      minutes: 30,
      phase: "STUDIO",
      title: text("Reach it from your phone", "폰에서 닿기"),
      goal: text(
        "Give instructions from your pocket while the laptop does the work.",
        "일은 노트북이 하고 지시는 주머니에서 합니다.",
      ),
      studentBrief: [
        text(
          "Set up the gateway, create your bot, and message it from your phone.",
          "게이트웨이를 설정하고, 봇을 만들고, 폰에서 말을 거세요.",
        ),
      ],
      teacherCue: [
        text(
          "This is the emotional payoff of the day. Protect the time for it.",
          "오늘의 정서적 보상이다. 이 시간을 지킨다.",
        ),
        text(
          "No response usually means the gateway is not running. Check that first.",
          "응답이 없으면 대개 게이트웨이가 안 돌고 있다. 그것부터 확인한다.",
        ),
      ],
      completion: text(
        "The learner sent a message from their phone and the assistant answered.",
        "학생이 폰에서 메시지를 보내고 비서가 답했습니다.",
      ),
      activities: [
        {
          id: "day1-phone-record",
          kind: "test-record",
          title: text("From your phone", "폰에서"),
          instruction: text(
            "Message your assistant from your phone. Write what you asked and what came back.",
            "폰에서 비서에게 말을 거세요. 무엇을 물었고 무엇이 왔는지 적으세요.",
          ),
          placeholder: text(
            "From my phone I asked… and it…",
            "폰에서 …라고 물었더니…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day1-wrap",
      start: "02:50",
      end: "03:00",
      minutes: 10,
      phase: "SAVE",
      title: text("What works, and what is next", "무엇이 되고, 다음은 무엇인가"),
      goal: text(
        "Leave with a working tool and a reason to come back.",
        "작동하는 도구와 다시 올 이유를 갖고 갑니다.",
      ),
      studentBrief: [
        text(
          "You installed something that acts. It is not a useful assistant yet — that starts tomorrow.",
          "행동하는 것을 설치했습니다. 아직 쓸모 있는 비서는 아닙니다. 그건 내일부터입니다.",
        ),
      ],
      teacherCue: [
        text(
          "Close with the community advice: start with one boring reliable task, not everything at once.",
          "커뮤니티의 조언으로 끝맺는다. 지루하고 확실한 일 하나부터, 한 번에 다 하려 하지 말 것.",
        ),
        text(
          "Anyone who cannot reach it from their phone is the first recovery job tomorrow morning.",
          "폰에서 못 쓰는 학생은 내일 아침 최우선 복구 대상이다.",
        ),
      ],
      completion: text(
        "The five end-of-day checks pass.",
        "마무리 다섯 항목이 통과합니다.",
      ),
      activities: [
        {
          id: "day1-wrap-checklist",
          kind: "checklist",
          title: text("End of day", "마무리"),
          instruction: text("Check what is true. Tell your instructor what is not.", "되는 것을 체크하고, 안 되는 것은 강사에게 말하세요."),
          items: [
            text("hermes runs", "hermes 가 실행됩니다"),
            text("The model answers", "모델이 답합니다"),
            text("It can create a file", "파일을 만들 수 있습니다"),
            text("It answers me on my phone", "폰에서 답합니다"),
            text("I wrote and kept my three lines", "세 줄을 적어 보관했습니다"),
          ],
        },
      ],
    },
  ],
};

export const day2Plan: InteractiveDayPlan = {
  day: 2,
  title: text("Make the Bot Check on Its Own", "스스로 확인하는 봇 만들기"),
  question: text(
    "How does a bot notice something new without being asked?",
    "봇은 시키지 않아도 어떻게 새로운 것을 알아챌까요?",
  ),
  artifact: text(
    "A bot that sends you only new items, even after being turned off and on",
    "껐다 켜도 새것만 보내는 봇",
  ),
  stages: [
    {
      id: "day2-rerun-yesterday",
      start: "00:00",
      end: "00:10",
      minutes: 10,
      phase: "CHECK",
      title: text("Run yesterday's bot again", "어제 봇 다시 실행"),
      goal: text(
        "Confirm the base still works before building on it.",
        "위에 쌓기 전에 바닥이 여전히 작동하는지 확인합니다.",
      ),
      studentBrief: [
        text(
          "Run your bot and send it one message. If it fails, fix that before anything else.",
          "봇을 실행하고 메시지를 하나 보내세요. 안 되면 다른 것보다 먼저 고치세요.",
        ),
      ],
      teacherCue: [
        text(
          "Today stacks on yesterday. A learner whose bot is broken cannot follow anything after this.",
          "오늘은 어제 위에 쌓는다. 어제가 안 되는 학생은 이후를 따라올 수 없다.",
        ),
      ],
      completion: text("Yesterday's bot replies.", "어제 봇이 답합니다."),
      activities: [
        {
          id: "day2-rerun-yesterday-check",
          kind: "checklist",
          title: text("Base check", "바닥 확인"),
          instruction: text("Both must pass.", "둘 다 통과해야 합니다."),
          items: [
            text("The bot runs without an error", "봇이 오류 없이 실행됩니다"),
            text("It replies to a message from my phone", "휴대전화에서 보낸 메시지에 답합니다"),
          ],
        },
      ],
    },
    {
      id: "day2-polling",
      start: "00:10",
      end: "00:30",
      minutes: 20,
      phase: "TELL",
      title: text("Polling and its cost", "폴링과 그 대가"),
      goal: text(
        "Understand that checking often is not free.",
        "자주 확인하는 것이 공짜가 아님을 이해합니다.",
      ),
      studentBrief: [
        text(
          "A computer cannot be told when something new appears. It has to go and look, again and again.",
          "컴퓨터는 새것이 생겼다는 것을 통보받지 못합니다. 반복해서 가서 봐야 합니다.",
        ),
        text(
          "Checking every second gets you blocked. Checking every hour is useless for urgent things.",
          "1초마다 확인하면 차단당합니다. 1시간마다 확인하면 급한 일에 못 씁니다.",
        ),
      ],
      teacherCue: [
        text(
          "Ask what happens if you check every second. Let learners find the cost themselves.",
          "1초마다 확인하면 어떻게 되는지 물어본다. 대가를 학생이 직접 찾게 한다.",
        ),
        text(
          "Set 30 to 60 seconds for class so results appear during the lesson.",
          "수업 중에는 30~60초로 둔다. 수업 시간 안에 결과가 보여야 한다.",
        ),
      ],
      completion: text(
        "The learner can name one thing lost by checking too often.",
        "학생이 너무 자주 확인할 때 잃는 것을 하나 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day2-polling-choice",
          kind: "choice",
          title: text("Choosing an interval", "주기 고르기"),
          instruction: text(
            "You are building a bot for scholarship announcements. What interval fits best?",
            "장학금 공고 알림 봇을 만듭니다. 어떤 주기가 맞습니까?",
          ),
          options: [
            {
              label: text("Every hour", "1시간마다"),
              value: "hour",
              feedback: text(
                "Reasonable. Announcements are not urgent by the second.",
                "적절합니다. 공고는 초 단위로 급하지 않습니다.",
              ),
            },
            {
              label: text("Every second", "1초마다"),
              value: "second",
              feedback: text(
                "The server will block you, and you gain almost nothing.",
                "서버가 차단합니다. 얻는 것은 거의 없습니다.",
              ),
            },
            {
              label: text("Once a week", "일주일에 한 번"),
              value: "week",
              feedback: text(
                "Too slow. A deadline could pass before you hear about it.",
                "너무 느립니다. 듣기 전에 마감이 지날 수 있습니다.",
              ),
            },
          ],
        },
      ],
    },
    {
      id: "day2-connect-feed",
      start: "00:30",
      end: "01:00",
      minutes: 30,
      phase: "STUDIO",
      title: text("Read a feed, on its own", "피드 읽기, 따로"),
      goal: text(
        "Build the reading part as a separate file and confirm it alone.",
        "읽는 부분을 별도 파일로 만들고 그것만 확인합니다.",
      ),
      studentBrief: [
        text(
          "Do not attach this to your bot yet. Make feed.py and get the titles printing.",
          "아직 봇에 붙이지 마세요. feed.py를 만들어 제목이 출력되게 하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Insist on the separate file. Attaching everything at once hides which part failed.",
          "별도 파일을 고집한다. 한 번에 붙이면 어느 부분이 실패했는지 가려진다.",
        ),
        text(
          "Use one verified feed for everyone now. Personal sources come later today.",
          "지금은 검증된 피드 하나로 통일한다. 개인 소스는 오늘 뒤에 바꾼다.",
        ),
      ],
      completion: text("Titles appear in the terminal.", "터미널에 제목이 나타납니다."),
      activities: [
        {
          id: "day2-connect-feed-prompt",
          kind: "prompt",
          title: text("Read the feed only", "피드 읽기만"),
          instruction: text("Replace the address with the one you were given.", "주소는 받은 것으로 바꾸세요."),
          prompt: text(
            "Create feed.py, a separate file for now.\n\nRead this RSS feed and print the title and link of each item:\n[the address your instructor gave you]\n\nPrint nothing else.\nUse the standard library or requests and feedparser.\nDo not touch bot.py.",
            "Create feed.py, a separate file for now.\n\nRead this RSS feed and print the title and link of each item:\n[강사가 준 주소]\n\nPrint nothing else.\nUse the standard library or requests and feedparser.\nDo not touch bot.py.",
          ),
        },
      ],
    },
    {
      id: "day2-break",
      start: "01:00",
      end: "01:10",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest.", "쉽니다."),
      studentBrief: [text("Ten minutes.", "10분입니다.")],
      teacherCue: [
        text("Check who has no titles printing yet.", "제목이 아직 안 나오는 학생을 확인한다."),
      ],
      completion: text("The class returns.", "학생이 돌아옵니다."),
      activities: [
        {
          id: "day2-break-timer",
          kind: "timer",
          title: text("Break", "휴식"),
          instruction: text("Ten minutes.", "10분."),
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day2-what-to-remember",
      start: "01:10",
      end: "01:40",
      minutes: 30,
      phase: "TELL",
      title: text("What exactly do you remember?", "정확히 무엇을 기억할 것인가"),
      goal: text(
        "Decide the duplicate rule yourself before writing any code.",
        "코드를 쓰기 전에 중복 판정 기준을 스스로 정합니다.",
      ),
      studentBrief: [
        text(
          "Run every minute and the same news arrives every minute. You must remember what was sent.",
          "1분마다 돌리면 같은 뉴스가 1분마다 옵니다. 보낸 것을 기억해야 합니다.",
        ),
        text(
          "But remember what? The title, the link, or the date? Each one can be wrong.",
          "그런데 무엇을요? 제목, 링크, 날짜? 각각 틀릴 수 있습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Do not give the answer. Let learners name the weakness of each option first.",
          "답을 주지 않는다. 각 선택의 약점을 학생이 먼저 말하게 한다.",
        ),
        text(
          "A variable disappears on restart. That is why it goes in a file. Do not teach databases here.",
          "변수는 재시작하면 사라진다. 그래서 파일에 쓴다. 여기서 데이터베이스를 가르치지 않는다.",
        ),
      ],
      completion: text(
        "The learner has chosen a duplicate rule and can defend it.",
        "학생이 중복 기준을 정하고 그 이유를 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day2-what-to-remember-answer",
          kind: "short-answer",
          title: text("Your duplicate rule", "내 중복 기준"),
          instruction: text(
            "What will you store to decide something was already sent, and why not the others?",
            "이미 보냈다고 판단하려고 무엇을 저장하겠습니까? 다른 것은 왜 아닙니까?",
          ),
          placeholder: text(
            "I will store… because the others…",
            "저는 …를 저장하겠습니다. 다른 것은…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-prove-memory",
      start: "01:40",
      end: "02:10",
      minutes: 30,
      phase: "CHECK",
      title: text("Prove that it remembers", "기억하는지 증명하기"),
      goal: text(
        "Show that the memory survives a restart, and that deleting the file erases it.",
        "기억이 재시작을 견디고, 파일을 지우면 사라지는 것을 보입니다.",
      ),
      studentBrief: [
        text(
          "Run, run again, open the file, delete the file, run again. Watch each result.",
          "실행, 다시 실행, 파일 열기, 파일 삭제, 다시 실행. 각 결과를 보세요.",
        ),
        text(
          "The second run should print nothing. That empty screen is success.",
          "두 번째 실행에서는 아무것도 안 나와야 합니다. 그 빈 화면이 성공입니다.",
        ),
      ],
      teacherCue: [
        text(
          "Make every learner do all five steps. Skipping them means the concept did not land.",
          "전원이 다섯 단계를 다 하게 한다. 건너뛰면 개념이 자리잡지 않은 것이다.",
        ),
      ],
      completion: text(
        "The learner saw an empty second run and a full run after deleting the file.",
        "학생이 두 번째 실행의 빈 화면과, 파일 삭제 후 전부 다시 나오는 것을 확인했습니다.",
      ),
      activities: [
        {
          id: "day2-prove-memory-prompt",
          kind: "prompt",
          title: text("Add the memory", "기억 추가"),
          instruction: text("Then connect it to your bot.", "그다음 봇에 연결하세요."),
          prompt: text(
            "In feed.py, remember which items were already seen.\n\nSave the seen links to seen.json in this folder.\nOn start, load that file if it exists.\nOnly print items that are not in the file yet.\nAfter printing, add them to the file.\n\nDo not change how the feed is read.",
            "In feed.py, remember which items were already seen.\n\nSave the seen links to seen.json in this folder.\nOn start, load that file if it exists.\nOnly print items that are not in the file yet.\nAfter printing, add them to the file.\n\nDo not change how the feed is read.",
          ),
        },
        {
          id: "day2-prove-memory-record",
          kind: "test-record",
          title: text("The five steps", "다섯 단계"),
          instruction: text(
            "Record what happened on the second run, and after you deleted seen.json.",
            "두 번째 실행에서, 그리고 seen.json을 지운 뒤에 무슨 일이 있었는지 적으세요.",
          ),
          placeholder: text(
            "Second run… After deleting the file…",
            "두 번째 실행에서는… 파일을 지운 뒤에는…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day2-own-source",
      start: "02:10",
      end: "02:40",
      minutes: 30,
      phase: "STUDIO",
      title: text("Switch to a source you care about", "관심 있는 소스로 바꾸기"),
      goal: text(
        "Check whether a source is usable before spending time on it.",
        "시간을 쓰기 전에 그 소스가 쓸 수 있는 것인지 확인합니다.",
      ),
      studentBrief: [
        text(
          "Two questions: can you see it without logging in, and does it have a feed or public API?",
          "두 가지 질문. 로그인 없이 볼 수 있는가, 그리고 피드나 공개 API가 있는가?",
        ),
        text(
          "If both answers are no, ask for a source from the checked list instead.",
          "둘 다 아니면 확인된 목록에서 소스를 받으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Walk around and open each learner's address yourself. Block Facebook, Instagram, and login-only systems on the spot.",
          "돌아다니며 학생의 주소를 직접 열어 본다. 페이스북, 인스타그램, 로그인 필요 시스템은 그 자리에서 막는다.",
        ),
        text(
          "Assign a source to anyone still undecided. Do not let this consume the hour.",
          "아직 못 정한 학생에게는 소스를 배정한다. 이것이 한 시간을 잡아먹게 두지 않는다.",
        ),
      ],
      completion: text(
        "The bot is watching a source the learner chose.",
        "봇이 학생이 고른 소스를 보고 있습니다.",
      ),
      activities: [
        {
          id: "day2-own-source-check",
          kind: "checklist",
          title: text("Source check", "소스 확인"),
          instruction: text("Both must be true before you use it.", "쓰기 전에 둘 다 참이어야 합니다."),
          items: [
            text("I can see this data without logging in", "로그인 없이 이 데이터를 볼 수 있습니다"),
            text("It has an RSS feed or a public API", "RSS나 공개 API가 있습니다"),
          ],
        },
      ],
    },
    {
      id: "day2-survive-and-save",
      start: "02:40",
      end: "03:00",
      minutes: 20,
      phase: "SAVE",
      title: text("Do not let it die", "죽지 않게 만들기"),
      goal: text(
        "Keep the loop alive through a failed round.",
        "한 회차가 실패해도 반복이 계속되게 합니다.",
      ),
      studentBrief: [
        text(
          "Turn your wifi off while the bot is running. It should complain and continue, not crash.",
          "봇이 도는 동안 와이파이를 꺼 보세요. 죽지 않고 불평하면서 계속 돌아야 합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Have learners actually break the network. Reading about it is not the same as seeing it.",
          "학생이 실제로 네트워크를 끊게 한다. 읽는 것과 보는 것은 다르다.",
        ),
      ],
      completion: text(
        "The bot survived a network failure and a backup exists.",
        "봇이 네트워크 실패를 견뎠고 백업이 있습니다.",
      ),
      activities: [
        {
          id: "day2-survive-prompt",
          kind: "prompt",
          title: text("Survive failures", "실패 견디기"),
          instruction: text("Then test it by turning wifi off.", "그다음 와이파이를 꺼서 시험하세요."),
          prompt: text(
            "Make the loop survive failures.\n\nIf the feed cannot be fetched, print the error and keep going.\nIf there are no new items, print one short line and keep going.\nNever stop the loop because of one failed round.\n\nDo not add any new features.",
            "Make the loop survive failures.\n\nIf the feed cannot be fetched, print the error and keep going.\nIf there are no new items, print one short line and keep going.\nNever stop the loop because of one failed round.\n\nDo not add any new features.",
          ),
        },
        {
          id: "day2-save-checklist",
          kind: "checklist",
          title: text("End of day check", "마무리 확인"),
          instruction: text("All three before you leave.", "가기 전에 세 가지 모두."),
          items: [
            text("The bot survived wifi being turned off", "와이파이를 꺼도 봇이 살아남았습니다"),
            text("I asked the agent why one line was needed today", "오늘 한 줄에 대해 왜 필요한지 물었습니다"),
            text("backups/day2-working.py exists", "backups/day2-working.py가 있습니다"),
          ],
        },
      ],
    },
  ],
};
