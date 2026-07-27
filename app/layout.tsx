import type { Metadata } from "next";
import { OfflineRegister } from "@/components/OfflineRegister";
import {
  LANGUAGE_STORAGE_KEY,
  LEGACY_LANGUAGE_STORAGE_KEY,
} from "@/lib/language-constants";
import "./globals.css";

const siteOrigin = new URL("https://jnuproject.github.io/");
const siteUrl = new URL("nuolkor2026/", siteOrigin);
const socialImage = new URL("og.png", siteUrl).toString();
const description =
  "A six-day, 18-hour interactive vibe coding classroom with guided activities, live progress, help signals, and instructor controls.";

const languageInitScript = `
  (function () {
    try {
      var key = ${JSON.stringify(LANGUAGE_STORAGE_KEY)};
      var legacyKey = ${JSON.stringify(LEGACY_LANGUAGE_STORAGE_KEY)};
      var saved = null;
      try {
        saved =
          window.localStorage.getItem(key) ||
          window.localStorage.getItem(legacyKey);
      } catch (_) {}
      var language =
        saved === "ko" || saved === "en"
          ? saved
          : (window.navigator.language || "").toLowerCase().indexOf("ko") === 0
            ? "ko"
            : "en";
      document.documentElement.dataset.language = language;
      document.documentElement.lang = language;
    } catch (_) {}
  })();
`;

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: {
    default: "Build Loop — Vibe Coding Bootcamp",
    template: "%s · Build Loop",
  },
  description,
  alternates: {
    canonical: siteUrl.toString(),
  },
  openGraph: {
    title: "Build Loop — Vibe Coding Bootcamp",
    description,
    images: [{ url: socialImage, width: 1200, height: 630 }],
    type: "website",
    url: siteUrl.toString(),
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Loop — Vibe Coding Bootcamp",
    description,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageInitScript }} />
      </head>
      <body>
        <OfflineRegister />
        {children}
      </body>
    </html>
  );
}
