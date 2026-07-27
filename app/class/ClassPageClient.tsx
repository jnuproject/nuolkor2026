"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClassroomLesson } from "@/components/interactive/ClassroomLesson";

export function ClassPageClient() {
  const searchParams = useSearchParams();
  const code = (searchParams.get("code") ?? "").toUpperCase();

  if (!/^[A-Z0-9]{6}$/.test(code)) {
    return (
      <main className="classroom-loading">
        <span className="runner-brand">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </span>
        <h1>Enter a valid six-character class code.</h1>
        <Link href="/join">Return to join →</Link>
      </main>
    );
  }

  return <ClassroomLesson code={code} />;
}
