"""학생 설정 확인 — Day 1 시작 전에 각자 한 번 실행한다.

Setup check — run this once before Day 1 starts.

무엇을 하는가 / What it does:
    같은 폴더의 .env 를 읽고, 다섯 가지를 순서대로 확인한 다음,
    성공하면 여러분의 휴대전화로 메시지를 하나 보냅니다.
    Reads .env in this folder, checks five things in order,
    and sends one message to your phone if everything works.

사용법 / How to use:

    1) 같은 폴더에 .env 파일을 만들고 아래 세 줄을 채웁니다.
       Create a .env file in this folder with these three lines.

           BOT_TOKEN=8123456789:AAF...
           CHAT_ID=123456789
           NVIDIA_API_KEY=nvapi-...

    2) 실행합니다 / Run it:

           python3 day1-setup-check.py

휴대전화에 메시지가 오면 준비가 끝난 것입니다.
If the message arrives on your phone, you are ready.
"""

import sys
from pathlib import Path

CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

problems = []


def ok(message):
    print(f"  [OK]   {message}")


def fail(message, fix):
    print(f"  [FAIL] {message}")
    print(f"         → {fix}")
    problems.append(message)


def load_env(path=".env"):
    """.env 를 읽어 딕셔너리로 돌려준다. 라이브러리를 설치하지 않아도 되게 직접 읽는다."""
    values = {}
    env_file = Path(path)
    if not env_file.exists():
        return values

    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        # 따옴표를 붙여 쓴 경우와 뒤에 공백이 붙은 경우를 모두 받아 준다.
        values[key.strip()] = value.strip().strip("'\"")
    return values


print("\n설정 확인 / Setup check")
print("-" * 46)

# 1. 파이썬 -----------------------------------------------------------------
print("\n1. 파이썬 / Python")
if sys.version_info >= (3, 9):
    ok(f"python {sys.version.split()[0]}")
else:
    fail(
        f"python {sys.version.split()[0]} 은 너무 낮습니다 / too old",
        "python3 를 다시 설치하세요 / install a newer python3",
    )
    sys.exit(1)

# 2. requests ---------------------------------------------------------------
print("\n2. requests")
try:
    import requests

    ok("requests")
except ImportError:
    fail(
        "requests 가 없습니다 / not installed",
        "pip3 install requests",
    )
    sys.exit(1)

# 3. .env -------------------------------------------------------------------
print("\n3. .env")
env = load_env()

if not env:
    fail(
        ".env 를 찾을 수 없습니다 / .env not found",
        "이 파일과 같은 폴더에 .env 를 만드세요 / create .env next to this file",
    )
    sys.exit(1)

BOT_TOKEN = env.get("BOT_TOKEN", "")
CHAT_ID = env.get("CHAT_ID", "")
API_KEY = env.get("NVIDIA_API_KEY", "")
MODEL = env.get("MODEL", "")

for key, value in [
    ("BOT_TOKEN", BOT_TOKEN),
    ("CHAT_ID", CHAT_ID),
    ("NVIDIA_API_KEY", API_KEY),
]:
    if value:
        ok(f"{key} 있음 / present")
    else:
        fail(f"{key} 가 비어 있습니다 / is empty", f".env 의 {key} 를 채우세요")

if problems:
    sys.exit(1)

# 4. 텔레그램 ---------------------------------------------------------------
print("\n4. 텔레그램 / Telegram")
TELEGRAM = f"https://api.telegram.org/bot{BOT_TOKEN}"

try:
    me = requests.get(f"{TELEGRAM}/getMe", timeout=20).json()
except Exception as error:
    fail(
        f"텔레그램에 연결할 수 없습니다 / cannot reach Telegram ({type(error).__name__})",
        "네트워크를 확인하고 강사에게 알리세요 / check the network and tell your instructor",
    )
    sys.exit(1)

if me.get("ok"):
    ok(f"봇 이름 / bot: @{me['result'].get('username')}")
else:
    fail(
        "봇 토큰이 거부되었습니다 / token rejected",
        "BotFather 에서 받은 줄을 공백 없이 다시 붙여넣으세요 / re-copy the token, no spaces",
    )
    sys.exit(1)

send = requests.post(
    f"{TELEGRAM}/sendMessage",
    json={"chat_id": CHAT_ID, "text": "설정 확인 완료 / setup check passed"},
    timeout=20,
).json()

if send.get("ok"):
    ok("메시지를 보냈습니다. 휴대전화를 보세요 / message sent, look at your phone")
else:
    fail(
        f"메시지를 보내지 못했습니다 / send failed: {send.get('description')}",
        "봇 대화방을 열어 /start 를 먼저 보내고, CHAT_ID 를 다시 확인하세요"
        " / send /start to your bot first, then recheck CHAT_ID",
    )

# 5. 모델 -------------------------------------------------------------------
print("\n5. 모델 / Model")
if not MODEL:
    fail(
        "MODEL 이 비어 있습니다 / MODEL is empty",
        "강사가 알려 준 모델 이름을 .env 의 MODEL 에 넣으세요"
        " / put the model name your instructor gave you into .env",
    )
else:
    try:
        response = requests.post(
            CHAT_URL,
            headers={"Authorization": f"Bearer {API_KEY}"},
            json={
                "model": MODEL,
                "messages": [{"role": "user", "content": "Reply with one word: READY"}],
                "max_tokens": 20,
            },
            timeout=90,
        )
        if response.status_code == 200:
            answer = response.json()["choices"][0]["message"]["content"].strip()
            ok(f"모델 응답 / model replied: {answer[:30]}")
        elif response.status_code == 401:
            fail(
                "API 키가 거부되었습니다 / API key rejected",
                "NVIDIA_API_KEY 를 다시 확인하세요 / recheck NVIDIA_API_KEY",
            )
        else:
            fail(
                f"모델이 HTTP {response.status_code} 를 돌려줬습니다",
                "모델 이름이 맞는지 강사에게 확인하세요 / confirm the model name",
            )
    except Exception as error:
        fail(
            f"모델에 연결할 수 없습니다 / cannot reach the model ({type(error).__name__})",
            "네트워크를 확인하세요 / check the network",
        )

# 결과 ----------------------------------------------------------------------
print("\n" + "-" * 46)
if problems:
    print(f"확인이 필요한 항목 {len(problems)}개 / {len(problems)} item(s) to fix")
    print("강사에게 이 화면을 보여 주세요 / show this screen to your instructor")
    sys.exit(1)

print("준비 완료 / Ready")
print("휴대전화에 메시지가 왔는지 확인하세요 / check your phone for the message")
