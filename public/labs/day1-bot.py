"""Day 1 복구용 참고본 — 말을 걸면 답하는 봇.

학생이 진도를 따라오지 못했을 때 실행부터 성공시키기 위한 강사용 파일이다.
학생에게 이 파일을 그대로 베끼게 하지 않는다. 실행이 되는 것을 확인시킨 뒤
학생이 자기 요청으로 다시 만들게 한다.

실행 전:
    pip3 install requests
    .env 에 BOT_TOKEN, NVIDIA_API_KEY 를 넣는다
"""

import os
import time

import requests

BOT_TOKEN = os.environ["BOT_TOKEN"]
API_KEY = os.environ["NVIDIA_API_KEY"]
MODEL = os.environ.get("MODEL", "강사가 지정한 모델 이름")

TELEGRAM = f"https://api.telegram.org/bot{BOT_TOKEN}"
NVIDIA = "https://integrate.api.nvidia.com/v1/chat/completions"

SYSTEM = "You are a helpful assistant. Answer in three sentences or less."


def send_message(chat_id, text):
    """텔레그램으로 메시지 하나를 보낸다."""
    requests.post(
        f"{TELEGRAM}/sendMessage",
        json={"chat_id": chat_id, "text": text},
        timeout=10,
    )


def ask_model(question):
    """모델에게 물어보고 답 문자열을 돌려준다."""
    response = requests.post(
        NVIDIA,
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "model": MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": question},
            ],
        },
        timeout=60,
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]


def main():
    # offset 은 이미 처리한 메시지를 다시 받지 않기 위한 것이다.
    offset = None
    print("waiting for messages...")

    while True:
        params = {"timeout": 30}
        if offset is not None:
            params["offset"] = offset

        result = requests.get(f"{TELEGRAM}/getUpdates", params=params, timeout=40)
        for update in result.json().get("result", []):
            offset = update["update_id"] + 1

            message = update.get("message")
            if not message or "text" not in message:
                continue

            chat_id = message["chat"]["id"]
            text = message["text"]
            print(f"received: {text}")

            answer = ask_model(text)
            send_message(chat_id, answer)
            print(f"replied: {answer}")

        time.sleep(1)


if __name__ == "__main__":
    main()
