export const overviewKorean: Record<string, string> = {
  "Vibe Coding Bootcamp": "바이브 코딩 부트캠프",
  "AI Agent Bootcamp": "AI 에이전트 부트캠프",
  Break: "휴식",

  "Build a Bot That Answers You": "말을 걸면 답하는 봇 만들기",
  "How do you build a running bot and read the code it was given?":
    "작동하는 봇을 만들고, 받은 코드를 읽으려면 어떻게 해야 하는가?",
  "Finished result demo": "완성본 시연",
  "Three layers: OpenCode, your bot, the model":
    "세 층위 — OpenCode, 내 봇, 모델",
  "Get a Telegram bot token": "텔레그램 봇 토큰 발급",
  "Build the send script and receive it on your phone":
    "발송 스크립트 제작과 휴대전화 수신 확인",
  "Read the code and ask why each line is there":
    "코드를 읽고 각 줄이 왜 있는지 묻기",
  "Answer an incoming message with the model": "받은 메시지에 모델이 답하게 하기",
  "Change how your bot replies": "봇이 답하는 방식 바꾸기",
  "Move the token to .env and save": "토큰을 .env로 옮기고 저장",

  "Make the Bot Check on Its Own": "스스로 확인하는 봇 만들기",
  "How does a bot notice something new without being asked?":
    "봇은 시키지 않아도 어떻게 새로운 것을 알아채는가?",
  "Run yesterday's bot again": "어제 봇 다시 실행",
  "Polling, and the cost of checking too often":
    "폴링과 너무 자주 확인할 때의 대가",
  "Connect a feed and print the titles": "피드 연결과 제목 출력",
  "What has to be saved so nothing is sent twice":
    "두 번 보내지 않으려면 무엇을 저장해야 하는가",
  "Store it, restart, and confirm it remembers":
    "저장하고, 재시작하고, 기억하는지 확인",
  "Switch to a source you actually care about": "관심 있는 실제 소스로 교체",
  "Handle empty results and network errors": "빈 결과와 네트워크 오류 처리",

  "Let the Model Choose the Tool": "모델이 도구를 고르게 하기",
  "How does a program become an agent?": "프로그램은 어떻게 에이전트가 되는가?",
  "What code decides and what the model decides":
    "코드가 정할 것과 모델이 정할 것",
  "Structured output: why free text cannot be used":
    "구조화된 출력 — 자유 문장을 쓸 수 없는 이유",
  "Function calling: the model only asks, your code runs it":
    "function calling — 모델은 말할 뿐, 실행은 내 코드가 한다",
  "Register two tools and let the model choose":
    "도구 두 개 등록하고 모델이 고르게 하기",
  "Add a third tool and watch it choose wrong":
    "세 번째 도구를 넣고 잘못 고르는 것 관찰하기",
  "Defend against broken or unexpected answers": "깨지거나 예상 밖인 답 방어하기",
  "Save and review": "저장과 정리",

  "Build Your Own Tool and Plug It In": "내 도구 만들어 꽂기",
  "How do you make this bot yours instead of everyone's?":
    "이 봇을 모두의 것이 아니라 내 것으로 만들려면?",
  "Choose a topic and check the data source": "주제 선택과 데이터 소스 검증",
  "Write your own tool and register it": "자기 도구 제작과 등록",
  "Trace the whole flow: this is orchestration":
    "전체 흐름 되짚기 — 이것이 오케스트레이션이다",
  "Isolate failures so one error cannot kill the bot":
    "실패 격리 — 하나의 오류가 봇을 죽이지 못하게",
  "Partner use and one fix": "짝 사용과 문제 한 가지 수정",
  Save: "저장",

  "Lend Your Tool to Another Agent": "내 도구를 다른 에이전트에게 빌려주기",
  "Can the tool you built be used by the coding agent you have been using all week?":
    "내가 만든 도구를 일주일 내내 써 온 코딩 에이전트가 쓸 수 있는가?",
  "MCP: a shared way to lend a tool": "MCP — 도구를 빌려주는 공통 규격",
  "Wrap yesterday's tool as an MCP server": "어제 도구를 MCP 서버로 감싸기",
  "Register it in OpenCode and confirm it appears":
    "OpenCode에 등록하고 목록에 보이는지 확인",
  "Ask OpenCode to use your tool": "OpenCode에게 내 도구를 쓰게 하기",
  "Rewrite the description until it gets chosen correctly":
    "올바르게 선택될 때까지 설명 고쳐 쓰기",
  "The same rule you learned on Day 3 is at work here":
    "3일차에 배운 규칙이 여기서도 작동한다",

  "Finish It and Show Someone": "마무리하고 보여 주기",
  "Can someone else run your bot and understand what it does?":
    "다른 사람이 내 봇을 실행하고 무엇을 하는지 이해할 수 있는가?",
  "Fix what is left and clean up": "남은 문제 수정과 정리",
  "Small-group showcase with the bot running": "봇을 실행하며 하는 소그룹 쇼케이스",
  "Use someone else's bot and leave one sentence":
    "다른 사람의 봇을 써 보고 한 문장 남기기",
  "Reflect: what the AI did and what you decided":
    "회고 — AI가 한 일과 내가 결정한 일",
  "Extension demo: multi-agent and frameworks":
    "확장 시연 — 멀티 에이전트와 프레임워크",
};

export function getOverviewKorean(english: string) {
  return overviewKorean[english] ?? english;
}
