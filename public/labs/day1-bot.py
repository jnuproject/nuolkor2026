"""Day 1 복구용 참고본 — 말을 걸면 답하는 봇.

학생이 진도를 따라오지 못했을 때 실행부터 성공시키기 위한 강사용 파일이다.
학생에게 그대로 베끼게 하지 않는다. 실행이 되는 것을 확인시킨 뒤,
학생이 자기 요청으로 다시 만들게 한다.

실행 전:
    pip3 install requests
    같은 폴더에 .env 를 만들고 아래 네 줄을 채운다.

        BOT_TOKEN=8123456789:AAF...
        CHAT_ID=123456789
        NVIDIA_API_KEY=nvapi-...
        MODEL=강사가 확인한 모델 이름

실행:
    python3 day1-bot.py

멈추려면 Ctrl+C 를 누른다.
"""

import sys
import time
from pathlib import Path

import requests

CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

SYSTEM = "You are a helpful assistant. Answer in three sentences or less."


def load_env(path=".env"):
    """.env 를 직접 읽는다. 라이브러리를 추가로 설치하지 않기 위해서다."""
    values = {}
    env_file = Path(path)
    if not env_file.exists():
        sys.exit(".env 를 찾을 수 없습니다. 이 파일과 같은 폴더에 만드세요.")

    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        values[key.strip()] = value.strip().strip("'\"")
    return values


env = load_env()
BOT_TOKEN = env["BOT_TOKEN"]
API_KEY = env["NVIDIA_API_KEY"]
MODEL = env["MODEL"]

TELEGRAM = f"https://api.telegram.org/bot{BOT_TOKEN}"


def send_message(chat_id, text):
    """텔레그램으로 메시지 하나를 보낸다."""
    response = requests.post(
        f"{TELEGRAM}/sendMessage",
        json={"chat_id": chat_id, "text": text},
        timeout=20,
    )
    # Day 1 에서는 실패해도 조용히 넘어가지 않고 화면에만 알린다.
    # 제대로 된 실패 처리는 Day 4 에서 배운다.
    if response.status_code != 200:
        print(f"  ! 발송 실패 {response.status_code}: {response.text[:120]}")


def ask_model(question):
    """모델에게 물어보고 답 문자열을 돌려준다."""
    response = requests.post(
        CHAT_URL,
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "model": MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": question},
            ],
        },
        timeout=90,
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]


def main():
    offset = None
    print(f"모델: {MODEL}")
    print("메시지를 기다리는 중입니다. 휴대전화에서 봇에게 말을 걸어 보세요.")
    print("멈추려면 Ctrl+C 를 누르세요.\n")

    while True:
        params = {"timeout": 30}
        if offset is not None:
            params["offset"] = offset

        try:
            result = requests.get(f"{TELEGRAM}/getUpdates", params=params, timeout=45)
        except requests.exceptions.RequestException as error:
            print(f"  ! 네트워크 오류: {type(error).__name__}. 5초 뒤 다시 시도합니다.")
            time.sleep(5)
            continue

        if result.status_code == 409:
            # 교실에서 가장 자주 나오는 실패다.
            # 같은 봇 토큰으로 두 개의 프로그램이 동시에 기다릴 수 없다.
            sys.exit(
                "\n같은 봇이 이미 다른 곳에서 실행 중입니다.\n"
                "다른 터미널 창이나 이전에 켜 둔 프로그램을 끄고 다시 실행하세요."
            )

        if result.status_code != 200:
            print(f"  ! 텔레그램 오류 {result.status_code}: {result.text[:120]}")
            time.sleep(5)
            continue

        for update in result.json().get("result", []):
            # offset 은 이미 처리한 메시지를 다시 받지 않기 위한 것이다.
            offset = update["update_id"] + 1

            message = update.get("message")
            if not message or "text" not in message:
                continue

            chat_id = message["chat"]["id"]
            text = message["text"]
            print(f"받음: {text}")

            try:
                answer = ask_model(text)
            except Exception as error:
                # 모델이 실패해도 봇 전체를 멈추지 않는다.
                print(f"  ! 모델 오류: {error}")
                send_message(chat_id, "지금은 답할 수 없습니다. 다시 시도해 주세요.")
                continue

            send_message(chat_id, answer)
            print(f"보냄: {answer[:60]}\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n종료합니다.")
