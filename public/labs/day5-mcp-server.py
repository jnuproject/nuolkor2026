"""Day 5 복구용 참고본 — 최소 MCP 서버.

새로 만드는 것이 아니다. Day 4 에서 이미 작동하던 함수를 그대로 가져와
겉포장만 MCP 규격으로 바꾼 것이다.

Day 3 에서 배운 것과 같은 원리다.
    도구에 이름과 설명을 붙여 등록하면, 모델이 언제 쓸지 스스로 고른다.
다른 점은 고르는 쪽이 내 봇이 아니라 OpenCode 같은 다른 프로그램이라는 것뿐이다.

실행 전:
    pip3 install "mcp[cli]"

직접 실행해서 오류 없이 뜨는지 먼저 확인한 뒤 OpenCode 설정에 등록한다.
등록 경로는 반드시 절대 경로로 쓴다.
"""

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("my-tools")


@mcp.tool()
def get_weather(city: str) -> str:
    """Return the current temperature and sky condition for one city.

    Use this when the user asks about weather, temperature, or rain.
    Do NOT use this for currency, prices, or campus notices.

    Args:
        city: City name in English, for example Vientiane.
    """
    # Day 4 의 함수 내용을 그대로 옮긴다. 로직을 다시 쓰지 않는다.
    return f"{city}: 32도, 맑음"


if __name__ == "__main__":
    # stdio 로 통신한다. OpenCode 가 이 프로세스를 직접 실행한다.
    mcp.run()
