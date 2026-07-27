import { Suspense } from "react";
import { ClassPageClient } from "./ClassPageClient";

export default function ClassPage() {
  return (
    <Suspense
      fallback={
        <main className="classroom-loading">
          <span className="runner-brand">
            <span>BL</span>
            <strong>BUILD LOOP</strong>
          </span>
          <div className="classroom-loading-pulse" />
          <h1>Connecting to your classroom…</h1>
        </main>
      }
    >
      <ClassPageClient />
    </Suspense>
  );
}
