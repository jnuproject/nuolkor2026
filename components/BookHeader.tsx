import Link from "next/link";
import type { ReactNode } from "react";
import { BilingualText } from "./BilingualText";
import { LanguageToggle } from "./LanguageToggle";

export function BookHeader({
  crumb,
  right,
  showLanguageToggle = false,
}: {
  crumb?: ReactNode;
  right?: ReactNode;
  showLanguageToggle?: boolean;
}) {
  return (
    <header
      className={`book-header${showLanguageToggle ? " has-language-toggle" : ""}`}
    >
      <Link
        aria-label="Build Loop home / 빌드 루프 홈"
        className="book-logo"
        href="/"
      >
        <span aria-hidden="true">BL</span>
        <strong>
          <BilingualText en="Build Loop" ko="빌드 루프" />
        </strong>
      </Link>
      <div className="book-header-crumb">{crumb}</div>
      <div className="book-header-actions">
        <nav
          aria-label="Site navigation / 사이트 메뉴"
          className="book-header-nav"
        >
          {right ?? (
            <>
              <Link href="/start">
                <BilingualText en="Setup" ko="시작 설정" />
              </Link>
              <Link href="/join">
                <BilingualText en="Join" ko="수업 참여" />
              </Link>
              <Link href="/instructor/live">
                <BilingualText en="Teach" ko="강사 화면" />
              </Link>
            </>
          )}
        </nav>
        {showLanguageToggle ? <LanguageToggle /> : null}
      </div>
    </header>
  );
}
