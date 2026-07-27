"use client";

import { useSearchParams } from "next/navigation";
import { JoinClass } from "@/components/interactive/JoinClass";

export function JoinPageClient() {
  const searchParams = useSearchParams();
  const code = (searchParams.get("code") ?? "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 6);

  return <JoinClass initialCode={code} />;
}
