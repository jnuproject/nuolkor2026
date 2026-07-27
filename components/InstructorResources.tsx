import type { DayNumber } from "@/content/course";
import { sitePath } from "@/lib/site-path";

const classroomFiles: Partial<
  Record<DayNumber, Array<{ href: string; label: string }>>
> = {
  1: [
    { href: "/downloads/day1/day1-offline-v0.html", label: "Offline v0" },
    { href: "/downloads/day1/day1-offline-broken.html", label: "Broken state" },
    { href: "/downloads/day1/day1-offline-changed.html", label: "Changed state" },
  ],
  2: [
    { href: "/downloads/day2/day2-offline-vague.html", label: "Vague result" },
    { href: "/downloads/day2/day2-offline-specific.html", label: "Specific result" },
    { href: "/downloads/day2/day2-offline-broken.html", label: "Debugging lab" },
    {
      href: "/downloads/day2/day2-offline-context-after.html",
      label: "Context handoff result",
    },
  ],
  5: [
    { href: "/downloads/day5/day5-test-lab-working.html", label: "Working test lab" },
    { href: "/downloads/day5/day5-test-lab-broken.html", label: "Broken test lab" },
  ],
};

export function InstructorResources({ day }: { day: DayNumber }) {
  const files = classroomFiles[day];
  if (!files) {
    return null;
  }

  return (
    <section className="classroom-files" aria-label="Offline classroom files">
      <div>
        <span className="mini-label">CLASSROOM FILES</span>
        <strong>오프라인 실습 파일</strong>
      </div>
      <div className="classroom-file-links">
        {files.map((file) => (
          <a download href={sitePath(file.href)} key={file.href}>
            {file.label} <span aria-hidden="true">↓</span>
          </a>
        ))}
      </div>
    </section>
  );
}
