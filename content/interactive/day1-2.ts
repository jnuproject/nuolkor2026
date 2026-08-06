import { text, type InteractiveDayPlan } from "./types";

export const day1Plan: InteractiveDayPlan = {
  day: 1,
  title: text("Build a Bot That Answers You", "말을 걸면 답하는 봇 만들기"),
  question: text(
    "How do you build a running bot and read the code it was given?",
    "작동하는 봇을 만들고, 받은 코드를 읽으려면 어떻게 해야 할까요?",
  ),
  artifact: text(
    "A Telegram bot that replies to you, with the token kept out of the code",
    "나에게 답하는 텔레그램 봇, 코드 밖으로 분리된 토큰",
  ),
  stages: [
    {
      id: "day1-finished-demo",
      start: "00:00",
      end: "00:10",
      minutes: 10,
      phase: "WATCH",
      title: text("See the finished bot", "완성된 봇 보기"),
      goal: text(
        "Understand that this course ends with a bot that runs and chooses.",
        "이 과정이 스스로 실행되고 판단하는 봇으로 끝난다는 것을 이해합니다.",
      ),
      studentBrief: [
        text(
          "Watch the instructor's phone. The bot answers a question, then sends an alert nobody asked for.",
          "강사의 휴대전화를 보세요. 봇이 질문에 답하고, 아무도 시키지 않은 알림을 보냅니다.",
        ),
      ],
      teacherCue: [
        text(
          "Show the finished bot on your phone through the projector before explaining anything.",
          "설명하기 전에 완성된 봇을 휴대전화로 프로젝터에 먼저 보여 준다.",
        ),
        text(
          "Say the six-day path in one sentence: answers you, then checks by itself, then chooses its own tools.",
          "6일의 흐름을 한 문장으로 말한다. 답하고, 스스로 확인하고, 스스로 고른다.",
        ),
      ],
      completion: text(
        "The learner can say what they will have on Day 6.",
        "학생이 6일차에 무엇을 갖게 될지 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-finished-demo-read",
          kind: "read",
          title: text("Course outcome", "과정 결과"),
          instruction: text(
            "Watch a bot reply, and then watch it send a message on its own.",
            "봇이 답하는 것과, 스스로 메시지를 보내는 것을 보세요.",
          ),
          hidden: true,
        },
      ],
    },
    {
      id: "day1-three-layers",
      start: "00:10",
      end: "00:20",
      minutes: 10,
      phase: "TELL",
      title: text("Three layers, not one AI", "AI는 하나가 아니다 — 세 층위"),
      goal: text(
        "Separate the coding agent, your own program, and the model inside it.",
        "코딩 에이전트, 내가 만든 프로그램, 그 안의 모델을 구분합니다.",
      ),
      studentBrief: [
        text(
          "OpenCode writes your code and is turned off after class. Your bot runs without it. Inside your bot, the model makes judgments.",
          "OpenCode는 코드를 써 주고 수업이 끝나면 끕니다. 내 봇은 그것 없이도 돌아갑니다. 그 봇 안에서 모델이 판단합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Draw the three layers on the board and leave it there for the whole course.",
          "칠판에 세 층위를 그리고 과정 내내 지우지 않는다.",
        ),
        text(
          "Ask three learners the check questions before moving on. This misunderstanding breaks Day 3.",
          "넘어가기 전에 세 명에게 확인 질문을 한다. 이 오해가 Day 3을 무너뜨린다.",
        ),
      ],
      completion: text(
        "The learner can say which layer writes code and which layer makes judgments.",
        "학생이 어느 층이 코드를 쓰고 어느 층이 판단하는지 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day1-three-layers-choice",
          kind: "choice",
          title: text("Which layer?", "어느 층인가?"),
          instruction: text(
            "Class ends and you close OpenCode. What happens to your bot?",
            "수업이 끝나 OpenCode를 껐습니다. 내 봇은 어떻게 됩니까?",
          ),
          options: [
            {
              label: text("It keeps running", "계속 돌아간다"),
              value: "keeps-running",
              feedback: text(
                "Correct. Your bot is a separate program.",
                "맞습니다. 내 봇은 별개의 프로그램입니다.",
              ),
            },
            {
              label: text("It stops", "멈춘다"),
              value: "stops",
              feedback: text(
                "No. OpenCode only wrote the code. It is not part of your bot.",
                "아닙니다. OpenCode는 코드를 써 주었을 뿐 봇의 일부가 아닙니다.",
              ),
            },
            {
              label: text("It loses its answers", "답을 못 하게 된다"),
              value: "loses-answers",
              feedback: text(
                "No. Answers come from the model your bot calls, not from OpenCode.",
                "아닙니다. 답은 봇이 부르는 모델에서 나옵니다. OpenCode가 아닙니다.",
              ),
            },
          ],
        },
      ],
    },
    {
      id: "day1-bot-token",
      start: "00:20",
      end: "00:35",
      minutes: 15,
      phase: "CHECK",
      title: text("Get your bot token", "봇 토큰 발급"),
      goal: text(
        "Create a bot, get its token, and find your own chat id.",
        "봇을 만들고 토큰을 받고 자기 채팅 ID를 찾습니다.",
      ),
      studentBrief: [
        text(
          "Message @BotFather, send /newbot, choose a name and a username ending in bot, and copy the token.",
          "@BotFather에게 /newbot을 보내고, 이름과 bot으로 끝나는 사용자명을 정한 뒤 토큰을 복사하세요.",
        ),
        text(
          "Then send /start to your own bot and open the getUpdates address to find your chat id.",
          "그다음 자기 봇에게 /start를 보내고 getUpdates 주소를 열어 채팅 ID를 찾으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Say clearly that the token is a password. Never show a real one on the projector.",
          "토큰이 비밀번호임을 분명히 말한다. 실제 토큰을 프로젝터에 띄우지 않는다.",
        ),
        text(
          "Empty getUpdates almost always means the learner never messaged their own bot.",
          "getUpdates가 비어 있으면 거의 항상 자기 봇에게 말을 걸지 않은 것이다.",
        ),
      ],
      completion: text(
        "The learner has a token and a chat id written down.",
        "학생이 토큰과 채팅 ID를 적어 두었습니다.",
      ),
      activities: [
        {
          id: "day1-bot-token-checklist",
          kind: "checklist",
          title: text("Token checklist", "토큰 확인"),
          instruction: text(
            "Check each item once it is done.",
            "끝난 항목을 체크하세요.",
          ),
          items: [
            text("The bot was created with @BotFather", "@BotFather로 봇을 만들었습니다"),
            text("The token is saved somewhere private", "토큰을 다른 사람이 못 보는 곳에 저장했습니다"),
            text("I sent /start to my own bot", "내 봇에게 /start를 보냈습니다"),
            text("I found my chat id in getUpdates", "getUpdates에서 채팅 ID를 찾았습니다"),
          ],
        },
      ],
    },
    {
      id: "day1-first-send",
      start: "00:35",
      end: "01:10",
      minutes: 35,
      phase: "STUDIO",
      title: text("Send your first message from code", "코드로 첫 메시지 보내기"),
      goal: text(
        "Ask for something small enough to check, then run it and see it arrive.",
        "확인할 수 있을 만큼 작게 요청하고, 실행해서 도착하는 것을 봅니다.",
      ),
      studentBrief: [
        text(
          "Ask for one file that does one thing. Make the agent state its plan before it writes.",
          "한 가지 일을 하는 파일 하나를 요청하세요. 쓰기 전에 계획을 말하게 하세요.",
        ),
        text(
          "Run it, then check your phone. An agent saying Done is not proof.",
          "실행하고 휴대전화를 확인하세요. 에이전트의 '완료했습니다'는 증거가 아닙니다.",
        ),
      ],
      teacherCue: [
        text(
          "Demonstrate first. Read the agent's plan out loud and point out that you asked for one file, not a bot.",
          "먼저 시연한다. 계획을 소리 내어 읽고, 봇이 아니라 파일 하나를 요청했음을 짚는다.",
        ),
        text(
          "Teach how to hand an error back: what I ran, the full error, what is already filled in.",
          "에러를 되돌려주는 법을 가르친다. 무엇을 실행했고, 에러 전체는 무엇이고, 무엇은 이미 채워져 있는지.",
        ),
      ],
      completion: text(
        "A message written in code arrived on the learner's phone.",
        "코드로 보낸 메시지가 학생의 휴대전화에 도착했습니다.",
      ),
      activities: [
        {
          id: "day1-first-send-prompt",
          kind: "prompt",
          title: text("Ask for one small file", "작은 파일 하나 요청하기"),
          instruction: text(
            "Copy this into OpenCode. Read the plan before letting it write.",
            "OpenCode에 복사하세요. 쓰게 하기 전에 계획을 읽으세요.",
          ),
          prompt: text(
            "Create send.py in this folder.\n\nIt should send one Telegram message using the Bot API.\nRead the bot token and chat id from variables at the top of the file for now.\nSend the text \"hello from my bot\".\nUse only the standard library or requests.\nDo not add a web server, a framework, or extra files.\nBefore writing, tell me in one or two sentences what you will do.",
            "Create send.py in this folder.\n\nIt should send one Telegram message using the Bot API.\nRead the bot token and chat id from variables at the top of the file for now.\nSend the text \"hello from my bot\".\nUse only the standard library or requests.\nDo not add a web server, a framework, or extra files.\nBefore writing, tell me in one or two sentences what you will do.",
          ),
        },
        {
          id: "day1-first-send-arrived",
          kind: "test-record",
          title: text("Did it arrive?", "도착했습니까?"),
          instruction: text(
            "Run the file and write what happened on your phone.",
            "파일을 실행하고 휴대전화에서 무슨 일이 일어났는지 적으세요.",
          ),
          placeholder: text(
            "I ran it and… on my phone I saw…",
            "실행했더니… 휴대전화에는…",
          ),
          minimum: 1,
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
      goal: text("Rest before the most important part of the day.", "오늘 가장 중요한 부분 전에 쉽니다."),
      studentBrief: [text("Ten minutes.", "10분입니다.")],
      teacherCue: [
        text(
          "Use this time to find learners whose message never arrived.",
          "메시지가 도착하지 않은 학생을 이때 찾는다.",
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
      id: "day1-read-and-ask",
      start: "01:20",
      end: "01:45",
      minutes: 25,
      phase: "CHECK",
      title: text("Read the code and ask why", "코드를 읽고 왜인지 묻기"),
      goal: text(
        "Build the habit this whole course is really about.",
        "이 과정이 진짜로 목표하는 습관을 만듭니다.",
      ),
      studentBrief: [
        text(
          "Find three lines you do not understand. Ask the agent why each one is needed.",
          "모르는 줄 세 개를 찾으세요. 각각 왜 필요한지 에이전트에게 물으세요.",
        ),
        text(
          "Then write one sentence of your own for each. Not the agent's words.",
          "그다음 각각에 대해 자기 문장을 한 줄씩 쓰세요. 에이전트의 말이 아니라.",
        ),
      ],
      teacherCue: [
        text(
          "Do not explain the code yourself. Make learners ask the agent.",
          "강사가 코드를 설명해 주지 않는다. 학생이 에이전트에게 묻게 한다.",
        ),
        text(
          "Ask where the code checks whether sending succeeded. Most have no answer. Say it is handled on Day 4.",
          "발송 성공을 어디서 확인하는지 물어본다. 대개 답이 없다. Day 4에서 다룬다고 말한다.",
        ),
      ],
      completion: text(
        "Three lines are explained in the learner's own words.",
        "세 줄이 학생 자신의 말로 설명되었습니다.",
      ),
      activities: [
        {
          id: "day1-read-and-ask-prompt",
          kind: "prompt",
          title: text("Ask about one line", "한 줄에 대해 묻기"),
          instruction: text(
            "Use this for each line you do not understand.",
            "모르는 줄마다 이것을 사용하세요.",
          ),
          prompt: text(
            "In send.py, explain this line to me:\n\n[paste the line]\n\nWhy is it needed? What breaks if I remove it?\nAnswer in three sentences or less.",
            "In send.py, explain this line to me:\n\n[줄을 붙여넣습니다]\n\nWhy is it needed? What breaks if I remove it?\nAnswer in three sentences or less.",
          ),
        },
        {
          id: "day1-read-and-ask-notes",
          kind: "short-answer",
          title: text("Three lines in your own words", "세 줄, 내 말로"),
          instruction: text(
            "Write one sentence for each line. Use your own words, not the agent's.",
            "각 줄에 대해 한 문장씩 쓰세요. 에이전트의 말이 아니라 자기 말로.",
          ),
          placeholder: text(
            "Line 1 does… Line 2 does… Line 3 does…",
            "첫 줄은… 둘째 줄은… 셋째 줄은…",
          ),
          minimum: 3,
        },
      ],
    },
    {
      id: "day1-model-answers",
      start: "01:45",
      end: "02:10",
      minutes: 25,
      phase: "STUDIO",
      title: text("Let the model answer", "모델이 답하게 하기"),
      goal: text(
        "Receive first, answer second. Never both at once.",
        "먼저 받고, 그다음 답합니다. 한 번에 하지 않습니다.",
      ),
      studentBrief: [
        text(
          "First make the bot print incoming messages. Confirm that works before adding any answer.",
          "먼저 받은 메시지를 출력하게 하세요. 답하기를 붙이기 전에 그것부터 확인하세요.",
        ),
        text(
          "Then add the model call. End your request with: change only what is needed.",
          "그다음 모델 호출을 붙이세요. 요청 끝에 '필요한 것만 바꿔라'를 넣으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Stop learners who try to do both steps in one request. They will not know where it failed.",
          "두 단계를 한 번에 하려는 학생을 막는다. 어디서 실패했는지 알 수 없게 된다.",
        ),
      ],
      completion: text(
        "The learner sends a message from their phone and gets a model answer back.",
        "학생이 휴대전화에서 메시지를 보내면 모델의 답이 돌아옵니다.",
      ),
      activities: [
        {
          id: "day1-model-answers-receive",
          kind: "prompt",
          title: text("Step 1 — only receive", "1단계 — 받기만"),
          instruction: text("Confirm this works before going further.", "다음으로 넘어가기 전에 이것부터 확인하세요."),
          prompt: text(
            "Create bot.py.\n\nIt should keep checking for new Telegram messages sent to my bot,\nand print each message text to the terminal.\nUse long polling with getUpdates.\nKeep the token and chat id as variables at the top for now.\nDo not answer yet. Only print.",
            "Create bot.py.\n\nIt should keep checking for new Telegram messages sent to my bot,\nand print each message text to the terminal.\nUse long polling with getUpdates.\nKeep the token and chat id as variables at the top for now.\nDo not answer yet. Only print.",
          ),
        },
        {
          id: "day1-model-answers-reply",
          kind: "prompt",
          title: text("Step 2 — now answer", "2단계 — 이제 답하기"),
          instruction: text("Only after step 1 works.", "1단계가 된 다음에만 하세요."),
          prompt: text(
            "Now, when a message arrives, send its text to the model\nand reply to the user with the model's answer.\n\nUse the NVIDIA endpoint and the model name the instructor gave you.\nRead the API key from a variable at the top for now.\nKeep the printing so I can still see what is happening.\nChange only what is needed. Do not restructure the file.",
            "Now, when a message arrives, send its text to the model\nand reply to the user with the model's answer.\n\nUse the NVIDIA endpoint and the model name the instructor gave you.\nRead the API key from a variable at the top for now.\nKeep the printing so I can still see what is happening.\nChange only what is needed. Do not restructure the file.",
          ),
        },
      ],
    },
    {
      id: "day1-character",
      start: "02:10",
      end: "02:45",
      minutes: 35,
      phase: "STUDIO",
      title: text("Give your bot a character", "봇에게 성격 주기"),
      goal: text(
        "Change behavior by changing a sentence, not the code.",
        "코드가 아니라 문장을 바꿔서 행동을 바꿉니다.",
      ),
      studentBrief: [
        text(
          "Decide who your bot is, how it speaks, and what it should refuse.",
          "이 봇이 누구인지, 어떻게 말하는지, 무엇을 거절해야 하는지 정하세요.",
        ),
        text(
          "Then talk to it. If the answer is wrong, fix the sentence and try again.",
          "그리고 말을 걸어 보세요. 답이 아니면 문장을 고치고 다시 해 보세요.",
        ),
      ],
      teacherCue: [
        text(
          "Fast learners must not add features. Have them record how three different system messages change the answers.",
          "빠른 학생이 기능을 늘리지 못하게 한다. 시스템 메시지 세 개가 답을 어떻게 바꾸는지 기록시킨다.",
        ),
        text(
          "Struggling learners get a working bot.py and change only the system message.",
          "막힌 학생에게는 작동하는 bot.py를 주고 시스템 메시지만 바꾸게 한다.",
        ),
      ],
      completion: text(
        "The bot answers in a way the learner chose.",
        "봇이 학생이 정한 방식으로 답합니다.",
      ),
      activities: [
        {
          id: "day1-character-decide",
          kind: "short-answer",
          title: text("Decide the character", "성격 정하기"),
          instruction: text(
            "Who is this bot, how does it speak, and what will it refuse?",
            "이 봇은 누구이고, 어떻게 말하고, 무엇을 거절합니까?",
          ),
          placeholder: text(
            "It is… It speaks… It refuses…",
            "이 봇은… 말투는… 거절할 것은…",
          ),
          minimum: 1,
        },
        {
          id: "day1-character-prompt",
          kind: "prompt",
          title: text("Add a system message", "시스템 메시지 추가"),
          instruction: text("Fill in your own role and tone.", "자기 역할과 말투를 채워 넣으세요."),
          prompt: text(
            "Add a system message to the model call.\n\nThe system message should tell the model:\n[write your own role and tone here]\n\nKeep the answers short, under three sentences.\nDo not change anything else.",
            "Add a system message to the model call.\n\nThe system message should tell the model:\n[여기에 자신이 정한 역할과 말투를 씁니다]\n\nKeep the answers short, under three sentences.\nDo not change anything else.",
          ),
        },
      ],
    },
    {
      id: "day1-secrets-and-save",
      start: "02:45",
      end: "03:00",
      minutes: 15,
      phase: "SAVE",
      title: text("Move the secret out and save", "비밀을 밖으로 빼고 저장"),
      goal: text(
        "Keep the token out of the code, and keep a version you can return to.",
        "토큰을 코드 밖에 두고, 돌아올 수 있는 버전을 남깁니다.",
      ),
      studentBrief: [
        text(
          "Move the token, chat id, and API key into .env, and add .env to .gitignore.",
          "토큰, 채팅 ID, API 키를 .env로 옮기고 .env를 .gitignore에 넣으세요.",
        ),
        text(
          "Run it again. It must still work. Then copy it to backups/day1-working.py.",
          "다시 실행하세요. 여전히 작동해야 합니다. 그다음 backups/day1-working.py로 복사하세요.",
        ),
      ],
      teacherCue: [
        text(
          "Say plainly: sending this file to a friend sends your password too.",
          "분명히 말한다. 이 파일을 친구에게 보내면 비밀번호도 같이 간다.",
        ),
        text(
          "Any token shown on the projector or in a chat must be revoked with /revoke now.",
          "프로젝터나 채팅방에 노출된 토큰은 지금 /revoke로 폐기시킨다.",
        ),
      ],
      completion: text(
        "The bot still works with the token outside the code, and a backup exists.",
        "토큰이 코드 밖에 있는 상태로 봇이 여전히 작동하고, 백업이 있습니다.",
      ),
      activities: [
        {
          id: "day1-secrets-checklist",
          kind: "checklist",
          title: text("End of day check", "마무리 확인"),
          instruction: text("All four before you leave.", "가기 전에 네 가지 모두."),
          items: [
            text("The token is in .env, not in the code", "토큰이 코드가 아니라 .env에 있습니다"),
            text(".env is listed in .gitignore", ".env가 .gitignore에 있습니다"),
            text("The bot still works after the change", "바꾼 뒤에도 봇이 작동합니다"),
            text("backups/day1-working.py exists", "backups/day1-working.py가 있습니다"),
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
