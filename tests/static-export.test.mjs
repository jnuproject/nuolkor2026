import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputRoot = path.join(projectRoot, "out");

async function readRoute(route = "") {
  return readFile(path.join(outputRoot, route, "index.html"), "utf8");
}

async function filesBelow(directory) {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry);
    if ((await stat(target)).isDirectory()) {
      files.push(...(await filesBelow(target)));
    } else {
      files.push(target);
    }
  }
  return files;
}

test("exports the bilingual course overview at the GitHub Pages base path", async () => {
  const [home, overview] = await Promise.all([
    readRoute(),
    readRoute("overview"),
  ]);

  for (const html of [home, overview]) {
    assert.match(html, /<title>Build Loop — Vibe Coding Bootcamp<\/title>/i);
    assert.match(html, /Vibe Coding Bootcamp/);
    assert.match(html, /바이브 코딩 부트캠프/);
    assert.match(html, /AI와 첫 프로토타입/);
    assert.match(html, /완성하고, 발표하고, 돌아보기/);
    assert.match(html, /build-loop:language:v2/);
    assert.match(html, /build-loop:home-language:v1/);
    assert.match(html, /\/nuolkor2026\/_next\//);
    assert.doesNotMatch(html, /react-loading-skeleton|codex-preview/i);
  }
});

test("exports all classroom-facing routes without a runtime Next server", async () => {
  const [lesson, presenter, join, classroom, instructor, setup, cards, guide] =
    await Promise.all([
      readRoute(path.join("day", "1")),
      readRoute(path.join("day", "1", "present")),
      readRoute("join"),
      readRoute("class"),
      readRoute(path.join("instructor", "live")),
      readRoute("start"),
      readRoute(path.join("cards", "day", "1")),
      readRoute(path.join("instructor", "day", "1")),
    ]);

  assert.match(lesson, /SELF-PACED/);
  assert.match(lesson, /Welcome and readiness/);
  assert.match(presenter, /Full screen/);
  assert.match(join, /Join the lesson\./);
  assert.match(join, /NAME OR SEAT CODE/);
  assert.match(classroom, /Connecting to your classroom/);
  assert.match(instructor, /Start a live classroom\./);
  assert.match(instructor, /Students join with one code\./);
  assert.match(instructor, /INSTRUCTOR LAUNCH PIN/);

  for (const html of [
    lesson,
    presenter,
    join,
    classroom,
    instructor,
    setup,
    cards,
    guide,
  ]) {
    assert.match(html, /build-loop:language:v2/);
    assert.match(html, />한국어</);
    assert.match(html, />English</);
  }
});

test("copies offline teaching files and a base-path-aware service worker", async () => {
  const [setting, serviceWorker] = await Promise.all([
    readFile(path.join(outputRoot, "downloads", "setting.html"), "utf8"),
    readFile(path.join(outputRoot, "sw.js"), "utf8"),
  ]);

  assert.match(setting, /OpenCode/i);
  assert.match(serviceWorker, /self\.location\.href/);
  assert.match(serviceWorker, /build-loop/);
  assert.match(serviceWorker, /isWithinBasePath/);
});

test("embeds only public Supabase configuration in the browser bundle", async () => {
  const assetRoot = path.join(outputRoot, "_next", "static");
  const assets = await filesBelow(assetRoot);
  const javascript = (
    await Promise.all(
      assets
        .filter((file) => file.endsWith(".js"))
        .map((file) => readFile(file, "utf8")),
    )
  ).join("\n");

  assert.match(javascript, /https:\/\/ehqvxjpzqqhqfifjrfrz\.supabase\.co/);
  assert.match(javascript, /\/functions\/v1\/classrooms/);
  assert.match(javascript, /sb_publishable_TsBcP5_aoEg8hZYPMooU8Q_ENRVK5ON/);
  assert.match(javascript, /x-instructor-pin/);
  assert.match(javascript, /환영 및 준비 확인/);
  assert.match(javascript, /최종 준비 확인/);
  assert.match(javascript, /수업에 참여하세요/);
  assert.match(javascript, /완료는 하나의 결정/);
  assert.match(javascript, /1일차 — 수업 활동 카드/);
  assert.doesNotMatch(javascript, /participant-token|build-loop:teacher:current/);
  assert.doesNotMatch(javascript, /sb_secret_|service_role/i);
  assert.doesNotMatch(javascript, /chatgpt\.site/i);

  try {
    const localEnvironment = await readFile(
      path.join(projectRoot, ".env.local"),
      "utf8",
    );
    const instructorPin = localEnvironment
      .match(/^SUPABASE_INSTRUCTOR_LAUNCH_PIN=(.+)$/m)?.[1]
      ?.trim();
    if (instructorPin) {
      assert.equal(javascript.includes(instructorPin), false);
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
});
