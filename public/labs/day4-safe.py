"""Day 4 복구용 참고본 — 실패해도 죽지 않는 봇.

Day 3 과 달라진 곳은 두 군데뿐이다.

1. 도구 호출을 감싸서, 하나가 실패해도 나머지가 계속 작동한다.
2. 실패를 파일에 남긴다. 자는 동안 실패하면 화면을 볼 수 없기 때문이다.

확인 방법: 도구 안의 주소를 일부러 틀리게 바꾸고 실행한다.
    - 봇이 죽지 않는다
    - 사용자에게 그 기능만 안 된다고 알린다
    - 다른 도구는 여전히 작동한다
    - agent.log 에 원인이 남는다
"""

import json
import logging
import os

import requests

API_KEY = os.environ["NVIDIA_API_KEY"]
MODEL = os.environ.get("MODEL", "강사가 지정한 모델 이름")
NVIDIA = "https://integrate.api.nvidia.com/v1/chat/completions"

logging.basicConfig(
    filename="agent.log",
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)


def get_weather(city):
    return f"{city}: 32도, 맑음"


def get_exchange_rate(from_currency, to_currency):
    return f"1 {from_currency} = 000 {to_currency}"


RUNNERS = {
    "get_weather": get_weather,
    "get_exchange_rate": get_exchange_rate,
}

TOOLS = []  # Day 3 의 TOOLS 를 그대로 가져온다


def run_tool(name, raw_args):
    """도구 하나를 안전하게 실행한다. 실패해도 예외를 밖으로 던지지 않는다."""
    if name not in RUNNERS:
        logging.error("unknown tool: %s", name)
        return "This feature is not available."

    try:
        args = json.loads(raw_args)
    except json.JSONDecodeError as error:
        # 모델이 인자를 형식에 맞지 않게 채운 경우다.
        logging.error("bad arguments for %s: %s (%s)", name, raw_args, error)
        return "I could not understand that request."

    try:
        return RUNNERS[name](**args)
    except Exception as error:
        # 도구 자체가 실패한 경우다. 로그에 무엇을 넣었는지까지 남긴다.
        logging.exception("tool %s failed with %s: %s", name, args, error)
        return "This feature is temporarily unavailable."


def call_model(messages):
    response = requests.post(
        NVIDIA,
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={"model": MODEL, "messages": messages, "tools": TOOLS},
        timeout=60,
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]


def answer(question):
    """한 라운드가 실패해도 봇 전체를 멈추지 않는다."""
    try:
        messages = [{"role": "user", "content": question}]
        reply = call_model(messages)

        calls = reply.get("tool_calls")
        if not calls:
            return reply["content"]

        messages.append(reply)
        for call in calls:
            result = run_tool(call["function"]["name"], call["function"]["arguments"])
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": call["id"],
                    "content": str(result),
                }
            )

        return call_model(messages)["content"]

    except Exception as error:
        logging.exception("round failed for %r: %s", question, error)
        return "Sorry, something went wrong. Please try again."


if __name__ == "__main__":
    print(answer("What is the weather in Vientiane?"))
    print(answer("Hello"))
