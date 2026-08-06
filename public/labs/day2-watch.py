"""Day 2 복구용 참고본 — 스스로 확인하고 기억하는 봇.

핵심은 두 가지다.
1. 폴링: 반복해서 가서 확인한다.
2. 기억: 이미 보낸 것을 파일에 남겨 두 번 보내지 않는다.

seen.json 을 지우고 다시 실행하면 전부 다시 보낸다. 기억이 파일에 있다는 증거다.

실행 전:
    pip3 install requests feedparser
"""

import json
import os
import time
from pathlib import Path

import feedparser
import requests

BOT_TOKEN = os.environ["BOT_TOKEN"]
CHAT_ID = os.environ["CHAT_ID"]
FEED_URL = os.environ.get("FEED_URL", "강사가 검증한 RSS 주소")

TELEGRAM = f"https://api.telegram.org/bot{BOT_TOKEN}"
SEEN_FILE = Path("seen.json")
INTERVAL_SECONDS = 60


def load_seen():
    """이미 본 링크 목록을 불러온다. 파일이 없으면 빈 집합이다."""
    if not SEEN_FILE.exists():
        return set()
    return set(json.loads(SEEN_FILE.read_text()))


def save_seen(seen):
    SEEN_FILE.write_text(json.dumps(sorted(seen), ensure_ascii=False, indent=2))


def send_message(text):
    requests.post(
        f"{TELEGRAM}/sendMessage",
        json={"chat_id": CHAT_ID, "text": text},
        timeout=10,
    )


def check_once(seen):
    """한 번 확인하고 새로 보낸 링크 개수를 돌려준다."""
    feed = feedparser.parse(FEED_URL)
    new_count = 0

    for entry in feed.entries:
        # 링크를 중복 판정 기준으로 삼았다. 제목은 겹칠 수 있다.
        link = entry.get("link")
        if not link or link in seen:
            continue

        send_message(f"{entry.get('title', '(제목 없음)')}\n{link}")
        seen.add(link)
        new_count += 1

    if new_count:
        save_seen(seen)
    return new_count


def main():
    seen = load_seen()
    print(f"remembered {len(seen)} links")

    while True:
        try:
            count = check_once(seen)
            print(f"new items: {count}" if count else "nothing new")
        except Exception as error:
            # 한 번 실패했다고 멈추지 않는다.
            print(f"check failed: {error}")

        time.sleep(INTERVAL_SECONDS)


if __name__ == "__main__":
    main()
