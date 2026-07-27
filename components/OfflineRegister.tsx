"use client";

import { useEffect } from "react";
import { sitePath } from "@/lib/site-path";

export function OfflineRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register(sitePath("/sw.js"), {
        scope: sitePath("/"),
      });
    }
  }, []);

  return null;
}
