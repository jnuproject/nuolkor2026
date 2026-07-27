export function BilingualText({
  en,
  ko,
}: {
  en: string;
  ko: string;
}) {
  return (
    <>
      <span className="lang-en" lang="en">
        {en}
      </span>
      <span className="lang-ko" lang="ko">
        {ko}
      </span>
    </>
  );
}
