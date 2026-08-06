"""Day 3 복구용 참고본 — 모델이 도구를 고르는 봇.

이 파일에서 학생이 봐야 할 것은 하나다.

    모델은 함수를 실행하지 않는다.
    "이 함수를 이 값으로 불러 달라"고 말할 뿐이고, 실행은 아래 RUNNERS 가 한다.

TOOLS 의 description 은 주석이 아니다. 모델이 읽고 판단하는 자료다.
모델이 잘못 고르면 고칠 곳은 모델이 아니라 description 이다.
"""

import json
import os

import requests

API_KEY = os.environ["NVIDIA_API_KEY"]
MODEL = os.environ.get("MODEL", "강사가 지정한 모델 이름")
NVIDIA = "https://integrate.api.nvidia.com/v1/chat/completions"


# --- 1. 실제로 일하는 함수들 -------------------------------------------------

def get_weather(city):
    return f"{city}: 32도, 맑음"  # 강사가 검증한 날씨 API로 교체


def get_exchange_rate(from_currency, to_currency):
    return f"1 {from_currency} = 000 {to_currency}"  # 검증한 환율 API로 교체


RUNNERS = {
    "get_weather": get_weather,
    "get_exchange_rate": get_exchange_rate,
}


# --- 2. 모델이 읽는 설명 -----------------------------------------------------

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": (
                "Returns the current temperature and sky condition for one city. "
                "Use this when the user asks about weather, temperature, or rain. "
                "Do NOT use this for currency, prices, or campus notices."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "City name in English, for example Vientiane",
                    }
                },
                "required": ["city"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_exchange_rate",
            "description": (
                "Returns how much one unit of one currency is worth in another. "
                "Use this when the user asks about money conversion or exchange rates. "
                "Do NOT use this for weather or for product prices."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "from_currency": {"type": "string", "description": "e.g. USD"},
                    "to_currency": {"type": "string", "description": "e.g. LAK"},
                },
                "required": ["from_currency", "to_currency"],
            },
        },
    },
]


# --- 3. 대화 한 번 ----------------------------------------------------------

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
    messages = [{"role": "user", "content": question}]
    reply = call_model(messages)

    calls = reply.get("tool_calls")
    if not calls:
        # 도구가 필요 없다고 모델이 판단한 경우다. 이것도 정상이다.
        print("(no tool used)")
        return reply["content"]

    messages.append(reply)

    for call in calls:
        name = call["function"]["name"]
        raw_args = call["function"]["arguments"]
        print(f"(tool used: {name} {raw_args})")

        try:
            result = RUNNERS[name](**json.loads(raw_args))
        except Exception as error:
            # 인자가 이상하거나 도구가 실패해도 봇을 멈추지 않는다.
            result = f"tool failed: {error}"

        messages.append(
            {
                "role": "tool",
                "tool_call_id": call["id"],
                "content": str(result),
            }
        )

    final = call_model(messages)
    return final["content"]


if __name__ == "__main__":
    # 세 가지를 모두 시험한다.
    print(answer("What is the weather in Vientiane?"))   # 도구가 불려야 한다
    print(answer("How much is 1 USD in LAK?"))           # 다른 도구가 불려야 한다
    print(answer("Hello, who are you?"))                 # 아무것도 안 불려야 한다
