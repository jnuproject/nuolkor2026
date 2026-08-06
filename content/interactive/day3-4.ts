import { text, type InteractiveDayPlan } from "./types";

export const day3Plan: InteractiveDayPlan = {
  day: 3,
  title: text("Let the Model Choose the Tool", "모델이 도구를 고르게 하기"),
  question: text(
    "How does a program become an agent?",
    "프로그램은 어떻게 에이전트가 될까요?",
  ),
  artifact: text(
    "A bot that picks the right tool for whatever you ask it",
    "무엇을 묻든 알맞은 도구를 골라 쓰는 봇",
  ),
  stages: [
    {
      id: "day3-code-vs-model",
      start: "00:00",
      end: "00:15",
      minutes: 15,
      phase: "TELL",
      title: text("What code decides, what the model decides", "코드가 정할 것과 모델이 정할 것"),
      goal: text(
        "Learn the most important judgment in this course.",
        "이 과정에서 가장 중요한 판단을 배웁니다.",
      ),
      studentBrief: [
        text(
          "If you can write it as a rule, use code. Code is fast, free, and always the same.",
          "규칙으로 쓸 수 있으면 코드로 하세요. 코드는 빠르고 공짜고 항상 같습니다.",
        ),
        text(
          "Give the model only what cannot be a rule. It is slow, costs money, and varies.",
          "규칙이 될 수 없는 것만 모델에게 주세요. 느리고 비용이 들고 매번 다릅니다.",
        ),
      ],
      teacherCue: [
        text(
          "Read a list of jobs aloud and have learners call out code or model for each.",
          "일 목록을 읽어 주고 각각 코드인지 모델인지 학생이 답하게 한다.",
        ),
        text(
          "Add the practical reason: sending 100 articles to a model is slow and expensive.",
          "실무적인 이유를 덧붙인다. 기사 100개를 모델에 넣으면 느리고 비싸다.",
        ),
      ],
      completion: text(
        "The learner can sort a new job into code or model and say why.",
        "학생이 새로운 일을 코드와 모델로 나누고 이유를 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day3-code-vs-model-choice",
          kind: "choice",
          title: text("Who does this job?", "이 일은 누가 합니까?"),
          instruction: text(
            "Deciding whether an article title contains the word scholarship.",
            "기사 제목에 '장학'이라는 단어가 들어 있는지 판단하기.",
          ),
          options: [
            {
              label: text("Code", "코드"),
              value: "code",
              feedback: text(
                "Correct. This is a rule, so it should never cost a model call.",
                "맞습니다. 이것은 규칙이므로 모델 호출을 쓸 이유가 없습니다.",
              ),
            },
            {
              label: text("The model", "모델"),
              value: "model",
              feedback: text(
                "This works, but it is slow and expensive for something a rule can do.",
                "되기는 하지만, 규칙으로 되는 일에 느리고 비싼 방법입니다.",
              ),
            },
          ],
        },
        {
          id: "day3-code-vs-model-answer",
          kind: "short-answer",
          title: text("One of each in your bot", "내 봇에서 각각 하나씩"),
          instruction: text(
            "Name one job in your own bot for code, and one for the model.",
            "내 봇에서 코드가 할 일 하나와 모델이 할 일 하나를 적으세요.",
          ),
          placeholder: text(
            "Code should… The model should…",
            "코드가 할 일은… 모델이 할 일은…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-structured-output",
      start: "00:15",
      end: "00:35",
      minutes: 20,
      phase: "TELL",
      title: text("Free text cannot be used by code", "자유 문장은 코드가 쓸 수 없다"),
      goal: text(
        "See why an answer for a person and an answer for code are different.",
        "사람에게 주는 답과 코드에게 주는 답이 왜 다른지 봅니다.",
      ),
      studentBrief: [
        text(
          "Ask for yes or no and you may get \"Yes, this seems relevant because...\". Your code cannot match that.",
          "yes나 no를 물으면 \"Yes, this seems relevant because...\"가 올 수 있습니다. 코드는 그것을 맞출 수 없습니다.",
        ),
        text(
          "So ask for a fixed shape instead. JSON only, no other text.",
          "그래서 정해진 형식을 요구합니다. JSON만, 다른 글자 없이.",
        ),
      ],
      teacherCue: [
        text(
          "Show the messy answer on screen first, then show why an if statement fails on it.",
          "먼저 지저분한 답을 화면에 보여 주고, if 문이 왜 실패하는지 보인다.",
        ),
        text(
          "Learners will see the model break the format sometimes. Say it is expected and handled this afternoon.",
          "모델이 가끔 형식을 깨는 것을 학생이 본다. 정상이며 오후에 다룬다고 말한다.",
        ),
      ],
      completion: text(
        "The learner's code reads a value out of a JSON answer.",
        "학생의 코드가 JSON 답에서 값을 읽습니다.",
      ),
      activities: [
        {
          id: "day3-structured-output-prompt",
          kind: "prompt",
          title: text("Ask for a shape", "형식 요구하기"),
          instruction: text("Run it several times and watch for a broken one.", "여러 번 실행해서 깨지는 경우를 보세요."),
          prompt: text(
            "Change the model call so it returns JSON in this exact shape:\n{\"relevant\": true, \"reason\": \"...\"}\n\nParse the JSON in the code and print only the relevant field.\nDo not change anything else yet.",
            "Change the model call so it returns JSON in this exact shape:\n{\"relevant\": true, \"reason\": \"...\"}\n\nParse the JSON in the code and print only the relevant field.\nDo not change anything else yet.",
          ),
        },
      ],
    },
    {
      id: "day3-function-calling",
      start: "00:35",
      end: "01:00",
      minutes: 25,
      phase: "TELL",
      title: text("What function calling actually is", "function calling이 실제로 무엇인가"),
      goal: text(
        "Correct the most common misunderstanding in this whole course.",
        "이 과정에서 가장 흔한 오해를 바로잡습니다.",
      ),
      studentBrief: [
        text(
          "The model does not run functions. It only says which function to call, with which values.",
          "모델은 함수를 실행하지 않습니다. 어떤 함수를 어떤 값으로 부를지 말할 뿐입니다.",
        ),
        text(
          "Your code does the running. Your code goes on the internet, not the model.",
          "실행은 내 코드가 합니다. 인터넷에 접속하는 것도 모델이 아니라 내 코드입니다.",
        ),
      ],
      teacherCue: [
        text(
          "Ask whether a model can know today's weather, then ask what giving it a tool means.",
          "모델이 오늘 날씨를 알 수 있는지 묻고, 도구를 준다는 것이 무슨 뜻인지 묻는다.",
        ),
        text(
          "Show a model making up an answer when it has no tool. It lands harder than an explanation.",
          "도구가 없을 때 모델이 지어내는 것을 보여 준다. 설명보다 강하게 남는다.",
        ),
      ],
      completion: text(
        "The learner can say exactly what the model did and what their code did.",
        "학생이 모델이 한 일과 자기 코드가 한 일을 정확히 말할 수 있습니다.",
      ),
      activities: [
        {
          id: "day3-function-calling-choice",
          kind: "choice",
          title: text("Who ran the function?", "함수를 실행한 것은 누구인가?"),
          instruction: text(
            "The user asked for the weather and a weather API was called. Who called it?",
            "사용자가 날씨를 물었고 날씨 API가 호출됐습니다. 누가 호출했습니까?",
          ),
          options: [
            {
              label: text("My code", "내 코드"),
              value: "my-code",
              feedback: text(
                "Correct. The model only named the function and the arguments.",
                "맞습니다. 모델은 함수 이름과 인자를 말했을 뿐입니다.",
              ),
            },
            {
              label: text("The model", "모델"),
              value: "the-model",
              feedback: text(
                "No. The model cannot reach the internet. It asked your code to do it.",
                "아닙니다. 모델은 인터넷에 접속할 수 없습니다. 내 코드에게 해 달라고 한 것입니다.",
              ),
            },
            {
              label: text("Telegram", "텔레그램"),
              value: "telegram",
              feedback: text(
                "No. Telegram only carries the message to and from the user.",
                "아닙니다. 텔레그램은 사용자와 메시지를 주고받을 뿐입니다.",
              ),
            },
          ],
        },
      ],
    },
    {
      id: "day3-break",
      start: "01:00",
      end: "01:10",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest.", "쉽니다."),
      studentBrief: [text("Ten minutes.", "10분입니다.")],
      teacherCue: [
        text(
          "Confirm your model actually performs tool calls before the lab starts.",
          "실습 전에 모델이 실제로 도구 호출을 하는지 확인한다.",
        ),
      ],
      completion: text("The class returns.", "학생이 돌아옵니다."),
      activities: [
        {
          id: "day3-break-timer",
          kind: "timer",
          title: text("Break", "휴식"),
          instruction: text("Ten minutes.", "10분."),
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day3-two-tools",
      start: "01:10",
      end: "01:45",
      minutes: 35,
      phase: "STUDIO",
      title: text("Register two tools", "도구 두 개 등록"),
      goal: text(
        "See the model choose a tool, and see it choose none.",
        "모델이 도구를 고르는 것과, 아무것도 고르지 않는 것을 봅니다.",
      ),
      studentBrief: [
        text(
          "Add one tool first and confirm it works. Then add the second.",
          "도구 하나를 먼저 붙여 확인하세요. 그다음 두 번째를 붙이세요.",
        ),
        text(
          "Keep the printing. You need to see in the terminal which tool was called.",
          "출력을 남겨 두세요. 어느 도구가 불렸는지 터미널에서 봐야 합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Ask the bot something ordinary like hello and point out that no tool was called. That is choosing too.",
          "'안녕' 같은 평범한 것을 물어보고 도구가 안 불린 것을 짚는다. 그것도 고르는 것이다.",
        ),
        text(
          "If the model never calls a tool, switch to the JSON fallback and keep the concept.",
          "모델이 도구를 전혀 안 부르면 JSON 대체안으로 바꾸고 개념은 유지한다.",
        ),
      ],
      completion: text(
        "Two tools are registered and the terminal shows which one was chosen.",
        "도구 두 개가 등록되고, 터미널에 어느 것이 선택됐는지 보입니다.",
      ),
      activities: [
        {
          id: "day3-two-tools-prompt",
          kind: "prompt",
          title: text("Add the first tool", "첫 도구 추가"),
          instruction: text("Then repeat for a second tool.", "그다음 두 번째 도구에 대해 반복하세요."),
          prompt: text(
            "Add function calling to bot.py.\n\nDefine one tool: get_weather(city) that returns the current weather\nfor a city using [the API your instructor gave you].\n\nRegister it with the model.\nWhen the model asks for the tool, run it in my code and send the result back.\nThen reply to the user with the model's final answer.\n\nKeep the printing so I can see when a tool is called.\nChange only what is needed.",
            "Add function calling to bot.py.\n\nDefine one tool: get_weather(city) that returns the current weather\nfor a city using [강사가 준 API].\n\nRegister it with the model.\nWhen the model asks for the tool, run it in my code and send the result back.\nThen reply to the user with the model's final answer.\n\nKeep the printing so I can see when a tool is called.\nChange only what is needed.",
          ),
        },
        {
          id: "day3-two-tools-record",
          kind: "test-record",
          title: text("Three questions", "세 가지 질문"),
          instruction: text(
            "Ask something for tool one, something for tool two, and something for neither. Record which tool was called each time.",
            "첫 도구용, 둘째 도구용, 아무것도 아닌 것을 각각 물어보고 어느 도구가 불렸는지 적으세요.",
          ),
          placeholder: text(
            "Q1 called… Q2 called… Q3 called…",
            "질문1에서는… 질문2에서는… 질문3에서는…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-wrong-choice",
      start: "01:45",
      end: "02:15",
      minutes: 30,
      phase: "FIX",
      title: text("Make it choose wrong, then fix the description", "일부러 틀리게 하고 설명 고치기"),
      goal: text(
        "Learn that a bad choice is usually a bad description.",
        "잘못된 선택은 대개 잘못된 설명 때문임을 배웁니다.",
      ),
      studentBrief: [
        text(
          "Add a third tool that overlaps a little, then ask unclear questions until it chooses wrong.",
          "조금 겹치는 세 번째 도구를 추가하고, 틀리게 고를 때까지 애매한 질문을 하세요.",
        ),
        text(
          "The model is not stupid. Your description was unclear. Fix the description, not the code.",
          "모델이 멍청한 것이 아닙니다. 설명이 불분명했습니다. 코드가 아니라 설명을 고치세요.",
        ),
      ],
      teacherCue: [
        text(
          "Learners who never see a wrong choice have not learned this. Push them to ask vaguer questions.",
          "오선택을 못 본 학생은 이것을 배우지 못한 것이다. 더 애매하게 묻게 한다.",
        ),
        text(
          "Say it plainly: a tool description is not a comment, it is what the model reads to decide.",
          "분명히 말한다. 도구 설명은 주석이 아니라 모델이 읽고 판단하는 자료다.",
        ),
      ],
      completion: text(
        "A wrong choice was observed and improved by editing the description.",
        "오선택을 관찰하고 설명을 고쳐 개선했습니다.",
      ),
      activities: [
        {
          id: "day3-wrong-choice-prompt",
          kind: "prompt",
          title: text("Improve the descriptions", "설명 개선"),
          instruction: text("Change only the descriptions.", "설명만 바꾸세요."),
          prompt: text(
            "Improve the tool descriptions so the model chooses correctly.\n\nEach description should say:\n- exactly what the tool returns\n- when to use it\n- when NOT to use it\n\nDo not change the tool code, only the descriptions.",
            "Improve the tool descriptions so the model chooses correctly.\n\nEach description should say:\n- exactly what the tool returns\n- when to use it\n- when NOT to use it\n\nDo not change the tool code, only the descriptions.",
          ),
        },
        {
          id: "day3-wrong-choice-record",
          kind: "test-record",
          title: text("Before and after", "전과 후"),
          instruction: text(
            "Write the question, the wrong tool it chose, what you changed, and the result after.",
            "질문, 잘못 고른 도구, 무엇을 바꿨는지, 바꾼 뒤 결과를 적으세요.",
          ),
          placeholder: text(
            "Question… It chose… I changed… After…",
            "질문… 고른 것… 바꾼 것… 결과…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day3-defend",
      start: "02:15",
      end: "02:45",
      minutes: 30,
      phase: "FIX",
      title: text("Defend against bad answers", "잘못된 답 방어하기"),
      goal: text(
        "Keep the bot alive when the model breaks its own format.",
        "모델이 형식을 깨뜨려도 봇이 살아 있게 합니다.",
      ),
      studentBrief: [
        text(
          "A model does not answer the same way every time. Sometimes JSON arrives with text around it.",
          "모델은 매번 같은 방식으로 답하지 않습니다. JSON 앞뒤에 글자가 붙어 오기도 합니다.",
        ),
        text(
          "Send strange questions on purpose. The bot should keep running.",
          "일부러 이상한 질문을 보내세요. 봇이 계속 돌아야 합니다.",
        ),
      ],
      teacherCue: [
        text(
          "Have learners deliberately break their own bot before fixing it.",
          "고치기 전에 학생이 자기 봇을 일부러 깨뜨려 보게 한다.",
        ),
      ],
      completion: text(
        "The bot survives a broken answer instead of crashing.",
        "봇이 깨진 답에 죽지 않고 살아남습니다.",
      ),
      activities: [
        {
          id: "day3-defend-prompt",
          kind: "prompt",
          title: text("Survive bad output", "잘못된 출력 견디기"),
          instruction: text("Then try to break it on purpose.", "그다음 일부러 깨뜨려 보세요."),
          prompt: text(
            "Make the bot survive bad model output.\n\nIf the JSON cannot be parsed, log it and reply with a short apology\ninstead of crashing.\nIf a tool is called with missing or wrong arguments, log it and\nreply that the request could not be understood.\nIf a tool itself fails, log the error and tell the user it is unavailable.\n\nNever let one bad round stop the bot.",
            "Make the bot survive bad model output.\n\nIf the JSON cannot be parsed, log it and reply with a short apology\ninstead of crashing.\nIf a tool is called with missing or wrong arguments, log it and\nreply that the request could not be understood.\nIf a tool itself fails, log the error and tell the user it is unavailable.\n\nNever let one bad round stop the bot.",
          ),
        },
      ],
    },
    {
      id: "day3-save",
      start: "02:45",
      end: "03:00",
      minutes: 15,
      phase: "SAVE",
      title: text("Save and review", "저장과 정리"),
      goal: text(
        "Name what changed today: the program became an agent.",
        "오늘 무엇이 바뀌었는지 말합니다. 프로그램이 에이전트가 되었습니다.",
      ),
      studentBrief: [
        text(
          "Yesterday your code decided the order. Today the model chooses inside it.",
          "어제는 내 코드가 순서를 정했습니다. 오늘은 그 안에서 모델이 고릅니다.",
        ),
      ],
      teacherCue: [
        text(
          "Draw the full loop on the board: question, model chooses, code runs, model phrases, answer.",
          "칠판에 전체 흐름을 그린다. 질문, 모델이 고름, 코드가 실행, 모델이 문장화, 답.",
        ),
      ],
      completion: text("A backup exists.", "백업이 있습니다."),
      activities: [
        {
          id: "day3-save-checklist",
          kind: "checklist",
          title: text("End of day check", "마무리 확인"),
          instruction: text("All three before you leave.", "가기 전에 세 가지 모두."),
          items: [
            text("The model chose correctly at least once after I fixed a description", "설명을 고친 뒤 모델이 최소 한 번 올바르게 골랐습니다"),
            text("The bot survived a strange question", "이상한 질문에도 봇이 살아남았습니다"),
            text("backups/day3-working.py exists", "backups/day3-working.py가 있습니다"),
          ],
        },
      ],
    },
  ],
};

export const day4Plan: InteractiveDayPlan = {
  day: 4,
  title: text("Build Your Own Tool and Plug It In", "내 도구 만들어 꽂기"),
  question: text(
    "How do you make this bot yours instead of everyone's?",
    "이 봇을 모두의 것이 아니라 내 것으로 만들려면 어떻게 할까요?",
  ),
  artifact: text(
    "A bot with your own tool inside, that logs instead of dying",
    "내 도구가 들어 있고, 죽는 대신 기록을 남기는 봇",
  ),
  stages: [
    {
      id: "day4-choose-topic",
      start: "00:00",
      end: "00:20",
      minutes: 20,
      phase: "CHECK",
      title: text("Choose a topic you can actually build", "실제로 만들 수 있는 주제 고르기"),
      goal: text(
        "Check the data source before spending the day on it.",
        "하루를 쓰기 전에 데이터 소스를 확인합니다.",
      ),
      studentBrief: [
        text(
          "Can you see it without logging in? Does it have a feed or public API?",
          "로그인 없이 볼 수 있습니까? 피드나 공개 API가 있습니까?",
        ),
        text(
          "If not, build a tool that works on what the user gives it: translate, summarize, quiz, tasks.",
          "아니라면 사용자가 준 것을 처리하는 도구를 만드세요. 번역, 요약, 퀴즈, 할일.",
        ),
      ],
      teacherCue: [
        text(
          "Open every learner's source yourself, right now. This is where the day is won or lost.",
          "지금 바로 학생의 소스를 직접 열어 본다. 오늘의 성패가 여기서 갈린다.",
        ),
        text(
          "Assign a topic to anyone undecided after 20 minutes. Do not let them keep deliberating.",
          "20분이 지나도 못 정한 학생에게는 주제를 배정한다. 계속 고민하게 두지 않는다.",
        ),
      ],
      completion: text(
        "The learner has an approved topic and a reachable source.",
        "학생이 승인된 주제와 접근 가능한 소스를 갖고 있습니다.",
      ),
      activities: [
        {
          id: "day4-choose-topic-answer",
          kind: "short-answer",
          title: text("Your tool in one sentence", "내 도구 한 문장"),
          instruction: text(
            "What will your tool do, and where does its data come from?",
            "내 도구는 무엇을 하고, 데이터는 어디서 옵니까?",
          ),
          placeholder: text(
            "My tool will… using…",
            "내 도구는 …를 합니다. 데이터는 …에서 옵니다.",
          ),
          minimum: 1,
        },
        {
          id: "day4-choose-topic-check",
          kind: "checklist",
          title: text("Source check", "소스 확인"),
          instruction: text("One of these must be true.", "다음 중 하나는 참이어야 합니다."),
          items: [
            text("Visible without logging in, and has a feed or API", "로그인 없이 보이고 피드나 API가 있습니다"),
            text("Or my tool works only on what the user sends it", "또는 사용자가 보낸 것만 처리하는 도구입니다"),
          ],
        },
      ],
    },
    {
      id: "day4-build-tool",
      start: "00:20",
      end: "01:00",
      minutes: 40,
      phase: "STUDIO",
      title: text("Write your own tool and register it", "내 도구 만들어 등록하기"),
      goal: text(
        "Write the function, the description, and the registration.",
        "함수, 설명, 등록을 씁니다.",
      ),
      studentBrief: [
        text(
          "A tool has three parts. Most people only think about the first one.",
          "도구는 세 부분입니다. 대부분 첫 번째만 생각합니다.",
        ),
        text(
          "The description is what makes the model choose correctly. Say when NOT to use it.",
          "모델이 제대로 고르게 하는 것은 설명입니다. 언제 쓰지 않는지를 쓰세요.",
        ),
      ],
      teacherCue: [
        text(
          "Check that each description says what it returns, when to use, and when not to use.",
          "각 설명에 무엇을 반환하는지, 언제 쓰고 언제 안 쓰는지가 있는지 확인한다.",
        ),
        text(
          "Confirm the existing tools still work. Some agents quietly break them.",
          "기존 도구가 여전히 작동하는지 확인한다. 조용히 망가뜨리는 경우가 있다.",
        ),
      ],
      completion: text(
        "The learner's own tool is called when it should be.",
        "학생의 도구가 불려야 할 때 불립니다.",
      ),
      activities: [
        {
          id: "day4-build-tool-prompt",
          kind: "prompt",
          title: text("Add your tool", "내 도구 추가"),
          instruction: text("Fill in your own tool name and source.", "도구 이름과 소스를 채워 넣으세요."),
          prompt: text(
            "Add a new tool to bot.py: [your tool name]\n\nIt should [what it does] using [your source].\n\nWrite a clear description that says what it returns,\nwhen to use it, and when not to use it.\nRegister it with the model like the other tools.\nDo not change the existing tools.",
            "Add a new tool to bot.py: [내 도구 이름]\n\nIt should [무엇을 하는지] using [내 소스].\n\nWrite a clear description that says what it returns,\nwhen to use it, and when not to use it.\nRegister it with the model like the other tools.\nDo not change the existing tools.",
          ),
        },
        {
          id: "day4-build-tool-record",
          kind: "test-record",
          title: text("All three cases", "세 경우 모두"),
          instruction: text(
            "Ask something for your tool, something for another tool, and something needing no tool.",
            "내 도구용, 다른 도구용, 도구가 필요 없는 것을 각각 물어보세요.",
          ),
          placeholder: text(
            "Mine was called when… not called when… nothing called when…",
            "내 것이 불린 경우… 안 불린 경우… 아무것도 안 불린 경우…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-break",
      start: "01:00",
      end: "01:10",
      minutes: 10,
      phase: "BREAK",
      title: text("Break", "휴식"),
      goal: text("Rest.", "쉽니다."),
      studentBrief: [text("Ten minutes.", "10분입니다.")],
      teacherCue: [
        text("Check who still has no working tool.", "아직 도구가 작동하지 않는 학생을 확인한다."),
      ],
      completion: text("The class returns.", "학생이 돌아옵니다."),
      activities: [
        {
          id: "day4-break-timer",
          kind: "timer",
          title: text("Break", "휴식"),
          instruction: text("Ten minutes.", "10분."),
          durationMinutes: 10,
        },
      ],
    },
    {
      id: "day4-orchestration",
      start: "01:10",
      end: "01:30",
      minutes: 20,
      phase: "TELL",
      title: text("Your flow has a name", "내 흐름에는 이름이 있다"),
      goal: text(
        "Name what was already built, and see why it is shaped this way.",
        "이미 만든 것에 이름을 붙이고, 왜 이런 모양인지 봅니다.",
      ),
      studentBrief: [
        text(
          "Your code decides the order. The model only enters the boxes where judgment is needed.",
          "순서는 내 코드가 정합니다. 모델은 판단이 필요한 칸에만 들어갑니다.",
        ),
        text(
          "Agents that work in the real world are narrow, repetitive, checked by a person, and reversible.",
          "현장에서 잘 되는 에이전트는 범위가 좁고, 반복적이고, 사람이 확인하고, 되돌릴 수 있습니다.",
        ),
      ],
      teacherCue: [
        text(
          "Have learners draw their own flow on paper first, then put two on the board.",
          "학생이 먼저 종이에 자기 흐름을 그리게 하고, 두 명이 칠판에 그린다.",
        ),
        text(
          "This is naming, not new material. Do not turn it into a lecture.",
          "새 내용이 아니라 이름 붙이기다. 강의로 만들지 않는다.",
        ),
      ],
      completion: text(
        "The learner can describe their bot as a sequence of code and model steps.",
        "학생이 자기 봇을 코드와 모델 단계의 순서로 설명할 수 있습니다.",
      ),
      activities: [
        {
          id: "day4-orchestration-answer",
          kind: "short-answer",
          title: text("Your flow, step by step", "내 흐름, 단계별로"),
          instruction: text(
            "Write your bot's steps in order. Mark each one as code or model.",
            "내 봇의 단계를 순서대로 쓰고, 각각 코드인지 모델인지 표시하세요.",
          ),
          placeholder: text(
            "1 code… 2 code… 3 model… 4 code…",
            "1 코드… 2 코드… 3 모델… 4 코드…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-isolate-failures",
      start: "01:30",
      end: "02:10",
      minutes: 40,
      phase: "FIX",
      title: text("One failure must not kill everything", "하나의 실패가 전체를 죽이면 안 된다"),
      goal: text(
        "Contain a tool failure and leave a record you can read later.",
        "도구 실패를 가두고, 나중에 읽을 기록을 남깁니다.",
      ),
      studentBrief: [
        text(
          "Break it on purpose first. Change your tool's address to something wrong and run it.",
          "먼저 일부러 깨뜨리세요. 도구 주소를 틀리게 바꾸고 실행하세요.",
        ),
        text(
          "A useful log answers four things: when, which tool, what went in, what error came out.",
          "쓸모 있는 로그는 네 가지에 답합니다. 언제, 어느 도구가, 무엇을 넣었을 때, 어떤 에러인지.",
        ),
      ],
      teacherCue: [
        text(
          "Learners who never break their own bot cannot tell whether isolation worked.",
          "자기 봇을 깨뜨려 보지 않은 학생은 격리가 됐는지 알 수 없다.",
        ),
        text(
          "Explain why a file log matters: nobody watches the terminal at night.",
          "파일 로그가 왜 필요한지 설명한다. 밤에는 아무도 터미널을 보지 않는다.",
        ),
      ],
      completion: text(
        "One tool fails, the user is told, other tools still work, and the log shows the cause.",
        "도구 하나가 실패해도 사용자에게 알리고, 다른 도구는 작동하고, 로그에 원인이 남습니다.",
      ),
      activities: [
        {
          id: "day4-isolate-prompt",
          kind: "prompt",
          title: text("Isolate failures", "실패 격리"),
          instruction: text("Then break it again and check all four results.", "그다음 다시 깨뜨려서 네 가지를 확인하세요."),
          prompt: text(
            "Isolate failures in bot.py.\n\nWrap each tool call so that if one tool fails:\n- log the error with the tool name and the arguments\n- tell the user that this one thing is unavailable\n- keep the bot running and keep the other tools working\n\nAlso write the log to a file so I can read it later.\nDo not change what the tools do when they succeed.",
            "Isolate failures in bot.py.\n\nWrap each tool call so that if one tool fails:\n- log the error with the tool name and the arguments\n- tell the user that this one thing is unavailable\n- keep the bot running and keep the other tools working\n\nAlso write the log to a file so I can read it later.\nDo not change what the tools do when they succeed.",
          ),
        },
        {
          id: "day4-isolate-check",
          kind: "checklist",
          title: text("Break it and check", "깨뜨리고 확인"),
          instruction: text("All four, with a broken tool address.", "도구 주소를 틀린 채로 네 가지 모두."),
          items: [
            text("The bot does not die", "봇이 죽지 않습니다"),
            text("The user is told that one thing is unavailable", "사용자에게 그 기능만 안 된다고 알립니다"),
            text("The other tools still work", "다른 도구는 여전히 작동합니다"),
            text("The log file shows the cause", "로그 파일에 원인이 남습니다"),
          ],
        },
      ],
    },
    {
      id: "day4-partner",
      start: "02:10",
      end: "02:45",
      minutes: 35,
      phase: "SHARE",
      title: text("Let someone else use it", "다른 사람이 써 보게 하기"),
      goal: text(
        "Watch a real person get stuck, then fix exactly one thing.",
        "실제 사람이 막히는 것을 보고, 정확히 하나만 고칩니다.",
      ),
      studentBrief: [
        text(
          "The builder does not explain. Just watch and write down where they got stuck.",
          "만든 사람은 설명하지 않습니다. 보고, 막히는 지점을 적기만 합니다.",
        ),
        text(
          "Then fix one problem. Write down what you decided not to fix, and why.",
          "그다음 문제 하나를 고치세요. 고치지 않기로 한 것과 그 이유도 적으세요.",
        ),
      ],
      teacherCue: [
        text(
          "Stop builders who start explaining. Explaining destroys the observation.",
          "설명하기 시작하는 학생을 막는다. 설명하면 관찰이 사라진다.",
        ),
        text(
          "Fifteen minutes each way, then swap. Do not let anyone add features here.",
          "15분씩 교대한다. 여기서 기능을 늘리지 못하게 한다.",
        ),
      ],
      completion: text(
        "One problem found by a partner was fixed and rechecked.",
        "짝이 발견한 문제 하나를 고치고 다시 확인했습니다.",
      ),
      activities: [
        {
          id: "day4-partner-observe",
          kind: "peer",
          title: text("Watch without helping", "돕지 않고 보기"),
          instruction: text(
            "Use each other's bots, fifteen minutes each way. Say your thoughts out loud.",
            "서로의 봇을 15분씩 사용하세요. 생각을 소리 내어 말하세요.",
          ),
          minimum: 1,
        },
        {
          id: "day4-partner-fix",
          kind: "test-record",
          title: text("One fix, one deferral", "고친 것 하나, 미룬 것 하나"),
          instruction: text(
            "Where did your partner get stuck? What did you fix, and what did you decide to leave?",
            "짝이 어디서 막혔습니까? 무엇을 고쳤고, 무엇을 남기기로 했습니까?",
          ),
          placeholder: text(
            "They got stuck at… I fixed… I left… because…",
            "짝이 막힌 곳… 고친 것… 남긴 것… 이유…",
          ),
          minimum: 1,
        },
      ],
    },
    {
      id: "day4-save",
      start: "02:45",
      end: "03:00",
      minutes: 15,
      phase: "SAVE",
      title: text("Save", "저장"),
      goal: text("Keep today's working version and its log.", "오늘의 작동본과 로그를 남깁니다."),
      studentBrief: [
        text("Copy your bot to backups/day4-working.py.", "봇을 backups/day4-working.py로 복사하세요."),
      ],
      teacherCue: [
        text(
          "Tell them tomorrow the tool leaves the bot and goes into OpenCode.",
          "내일 그 도구가 봇을 떠나 OpenCode로 간다고 말한다.",
        ),
      ],
      completion: text("A backup exists.", "백업이 있습니다."),
      activities: [
        {
          id: "day4-save-checklist",
          kind: "checklist",
          title: text("End of day check", "마무리 확인"),
          instruction: text("All three before you leave.", "가기 전에 세 가지 모두."),
          items: [
            text("My own tool is registered and gets called", "내 도구가 등록되어 있고 불립니다"),
            text("A broken tool does not kill the bot", "도구가 깨져도 봇이 죽지 않습니다"),
            text("backups/day4-working.py exists", "backups/day4-working.py가 있습니다"),
          ],
        },
      ],
    },
  ],
};
