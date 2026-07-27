import { Suspense } from "react";
import { JoinClass } from "@/components/interactive/JoinClass";
import { JoinPageClient } from "./JoinPageClient";

export default function JoinPage() {
  return (
    <Suspense fallback={<JoinClass />}>
      <JoinPageClient />
    </Suspense>
  );
}
