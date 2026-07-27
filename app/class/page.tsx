import { Suspense } from "react";
import {
  ClassPageClient,
  ClassroomLoadingFallback,
} from "./ClassPageClient";

export default function ClassPage() {
  return (
    <Suspense
      fallback={<ClassroomLoadingFallback />}
    >
      <ClassPageClient />
    </Suspense>
  );
}
