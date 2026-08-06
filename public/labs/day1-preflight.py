"""강사 사전 점검 — 수업 전날 밤에 반드시 한 번 실행한다.

이 스크립트 하나가 6일 커리큘럼의 세 가지 위험을 미리 확인한다.

    1. 모델에 연결이 되는가            → Day 1 이 성립하는가
    2. 어떤 모델 이름을 써야 하는가     → 학생에게 알려 줄 값
    3. function calling 이 되는가      → Day 3 전체가 여기 걸려 있다

사용법:

    export NVIDIA_API_KEY="nvapi-..."
    export BOT_TOKEN="8123456789:AAF..."      # 없으면 텔레그램 점검은 건너뛴다
    python3 day1-preflight.py

마지막에 나오는 판정만 보면 된다.
"""

import json
import os
import sys
import time

MODELS_URL = "https://integrate.api.nvidia.com/v1/models"
CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

results = []


def check(name, ok, detail=""):
    results.append((name, ok, detail))
    mark = "OK  " if ok else "FAIL"
    print(f"[{mark}] {name}" + (f" — {detail}" if detail else ""))
    return ok


# --- 0. 파이썬과 라이브러리 -------------------------------------------------

print("\n=== 0. 실행 환경 ===")
check("python 3.9 이상", sys.version_info >= (3, 9), sys.version.split()[0])

try:
    import requests
except ImportError:
    check("requests 설치됨", False, "pip3 install requests 를 먼저 실행하세요")
    sys.exit(1)
check("requests 설치됨", True)

API_KEY = os.environ.get("NVIDIA_API_KEY", "").strip()
BOT_TOKEN = os.environ.get("BOT_TOKEN", "").strip()

if not API_KEY:
    check("NVIDIA_API_KEY 환경변수", False, "설정되지 않았습니다. 여기서 중단합니다")
    sys.exit(1)
check("NVIDIA_API_KEY 환경변수", True, f"...{API_KEY[-6:]}")

HEADERS = {"Authorization": f"Bearer {API_KEY}"}


# --- 1. 텔레그램 도달 가능 여부 ---------------------------------------------

print("\n=== 1. 텔레그램 ===")
try:
    response = requests.get("https://api.telegram.org", timeout=15)
    check("api.telegram.org 접속", response.status_code < 500, f"HTTP {response.status_code}")
except Exception as error:
    check(
        "api.telegram.org 접속",
        False,
        f"{type(error).__name__}. 교실 네트워크에서 차단될 수 있습니다",
    )

if BOT_TOKEN:
    try:
        me = requests.get(
            f"https://api.telegram.org/bot{BOT_TOKEN}/getMe", timeout=15
        ).json()
        check("봇 토큰 유효", me.get("ok") is True, me.get("result", {}).get("username", ""))
    except Exception as error:
        check("봇 토큰 유효", False, str(error))
else:
    print("[SKIP] 봇 토큰 점검 — BOT_TOKEN 이 없습니다")


# --- 2. 사용 가능한 모델 목록 -----------------------------------------------

print("\n=== 2. 사용 가능한 모델 ===")
model_ids = []
try:
    listing = requests.get(MODELS_URL, headers=HEADERS, timeout=30)
    if listing.status_code == 401:
        check("모델 목록 조회", False, "401 — API 키가 잘못되었습니다")
        sys.exit(1)
    model_ids = [item["id"] for item in listing.json().get("data", [])]
    check("모델 목록 조회", bool(model_ids), f"{len(model_ids)}개")
except Exception as error:
    check("모델 목록 조회", False, str(error))

# 도구 호출에 강한 계열을 먼저 보여 준다.
preferred = [m for m in model_ids if any(k in m.lower() for k in ("hermes", "nemotron", "llama-3.3", "qwen"))]
if preferred:
    print("\n  수업에 쓸 만한 후보:")
    for name in preferred[:12]:
        print(f"    {name}")
    print("\n  이 중 하나를 골라 MODEL 환경변수로 지정한 뒤 다시 실행하세요.")

MODEL = os.environ.get("MODEL", "").strip()
if not MODEL:
    if not preferred:
        print("\nMODEL 을 지정해야 이후 점검을 진행할 수 있습니다.")
        sys.exit(1)
    MODEL = preferred[0]
    print(f"\n  MODEL 이 없어 임시로 {MODEL} 을 사용합니다.")

print(f"\n  점검할 모델: {MODEL}")


# --- 3. 기본 응답과 지연 시간 -----------------------------------------------

print("\n=== 3. 기본 응답 ===")
started = time.time()
try:
    basic = requests.post(
        CHAT_URL,
        headers=HEADERS,
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": "Reply with the single word: READY"}],
            "max_tokens": 20,
        },
        timeout=90,
    )
    elapsed = time.time() - started
    if basic.status_code != 200:
        check("모델 응답", False, f"HTTP {basic.status_code} {basic.text[:150]}")
    else:
        answer = basic.json()["choices"][0]["message"]["content"]
        check("모델 응답", True, f"{elapsed:.1f}초 — {answer.strip()[:40]}")
        if elapsed > 10:
            print("      ! 응답이 10초를 넘습니다. 실습 시간을 넉넉히 잡으세요.")
except Exception as error:
    check("모델 응답", False, str(error))


# --- 4. function calling — Day 3 의 생사가 걸린 점검 -------------------------

print("\n=== 4. function calling (Day 3) ===")

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": (
                "Returns the current temperature for one city. "
                "Use this when the user asks about weather. "
                "Do NOT use it for anything else."
            ),
            "parameters": {
                "type": "object",
                "properties": {"city": {"type": "string", "description": "e.g. Vientiane"}},
                "required": ["city"],
            },
        },
    }
]


def ask_with_tools(question):
    response = requests.post(
        CHAT_URL,
        headers=HEADERS,
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": question}],
            "tools": TOOLS,
        },
        timeout=90,
    )
    if response.status_code != 200:
        return None, f"HTTP {response.status_code} {response.text[:150]}"
    return response.json()["choices"][0]["message"], None


calls_when_needed = False
skips_when_not = False

message, error = ask_with_tools("What is the weather in Vientiane right now?")
if error:
    check("도구가 필요할 때 호출함", False, error)
else:
    calls = message.get("tool_calls") or []
    if calls:
        name = calls[0]["function"]["name"]
        args = calls[0]["function"]["arguments"]
        calls_when_needed = name == "get_weather"
        check("도구가 필요할 때 호출함", calls_when_needed, f"{name}({args})")
        try:
            parsed = json.loads(args)
            check("인자를 형식에 맞게 채움", "city" in parsed, str(parsed))
        except json.JSONDecodeError:
            check("인자를 형식에 맞게 채움", False, "JSON 파싱 실패")
    else:
        check("도구가 필요할 때 호출함", False, "tool_calls 가 비어 있습니다")

message, error = ask_with_tools("Hello, who are you?")
if error:
    check("불필요할 때 호출하지 않음", False, error)
else:
    skips_when_not = not (message.get("tool_calls") or [])
    check("불필요할 때 호출하지 않음", skips_when_not)


# --- 5. 대체안 — 구조화된 출력이라도 되는가 ---------------------------------

print("\n=== 5. 대체안 (JSON 출력) ===")
json_ok = False
try:
    fallback = requests.post(
        CHAT_URL,
        headers=HEADERS,
        json={
            "model": MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": (
                        'Answer with JSON only, no other text: '
                        '{"tool": "weather" or "none", "city": "..."}\n\n'
                        "User asked: what is the weather in Vientiane?"
                    ),
                }
            ],
            "max_tokens": 100,
        },
        timeout=90,
    )
    raw = fallback.json()["choices"][0]["message"]["content"].strip()
    raw = raw.removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    json.loads(raw)
    json_ok = True
    check("JSON 형식으로 답함", True, raw[:60])
except Exception as error:
    check("JSON 형식으로 답함", False, str(error)[:100])


# --- 판정 ------------------------------------------------------------------

print("\n" + "=" * 60)
failed = [name for name, ok, _ in results if not ok]

if calls_when_needed and skips_when_not:
    print("판정: Day 3 을 계획대로 진행할 수 있습니다.")
elif json_ok:
    print("판정: function calling 이 불안정합니다.")
    print("      Day 3 을 JSON 대체안으로 진행하세요.")
    print("      강사교안 3일차의 '모델이 function calling 을 못 할 때' 항목을 따릅니다.")
else:
    print("판정: 이 모델로는 Day 3 을 진행할 수 없습니다.")
    print("      다른 모델을 골라 MODEL 을 바꾼 뒤 다시 실행하세요.")

if failed:
    print(f"\n실패한 점검: {', '.join(failed)}")

print(f"\n학생에게 알려 줄 값:  MODEL={MODEL}")
print("=" * 60)
