import type { Metadata } from "next";
import { OfflineRegister } from "@/components/OfflineRegister";
import { sitePath } from "@/lib/site-path";
import "./globals.css";

const siteOrigin = new URL("https://jnuproject.github.io/");
const siteUrl = new URL("nuolkor2026/", siteOrigin);
const socialImage = new URL("og.png", siteUrl).toString();
const languageBasePath = sitePath("/").replace(/\/$/, "");
const description =
  "A six-day, 18-hour interactive vibe coding classroom with guided activities, live progress, help signals, and instructor controls.";

const languageInitScript = `
  (function () {
    try {
      var basePath = ${JSON.stringify(languageBasePath)};
      var path = window.location.pathname;
      if (
        basePath &&
        (path === basePath || path.indexOf(basePath + "/") === 0)
      ) {
        path = path.slice(basePath.length) || "/";
      }
      path = path.replace(/\\/+$/, "") || "/";
      var isHome =
        path === "/" ||
        path === "/overview";
      if (!isHome) {
        document.documentElement.lang = "en";
        delete document.documentElement.dataset.homeLanguage;
        return;
      }
      var key = "build-loop:home-language:v1";
      var saved = null;
      try {
        saved = window.localStorage.getItem(key);
      } catch (_) {}
      var language =
        saved === "ko" || saved === "en"
          ? saved
          : (window.navigator.language || "").toLowerCase().indexOf("ko") === 0
            ? "ko"
            : "en";
      document.documentElement.dataset.homeLanguage = language;
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
