import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

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

async function loadTypeScriptData(file, dependencies = {}) {
  const source = await readFile(file, "utf8");
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const exports = {};
  const commonJsModule = { exports };
  vm.runInNewContext(javascript, {
    exports,
    module: commonJsModule,
    require(identifier) {
      if (identifier in dependencies) return dependencies[identifier];
      throw new Error(`Unexpected runtime import ${identifier} in ${file}`);
    },
  });
  return commonJsModule.exports;
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
  assert.match(lesson, /Today you will make something that works/);
  assert.match(lesson, /오늘, 실제로 작동하는 것을 만듭니다/);
  assert.match(presenter, /Full screen/);
  assert.match(presenter, /Five moves turn an idea into evidence/);
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

test("ships six days of authored teaching slides instead of generated stage checklists", async () => {
  const [indexSource, runner, presenter, overview, ...days] = await Promise.all([
    readFile(path.join(projectRoot, "content", "courseware", "index.ts"), "utf8"),
    readFile(
      path.join(projectRoot, "components", "interactive", "LessonRunner.tsx"),
      "utf8",
    ),
    readFile(path.join(projectRoot, "components", "Presenter.tsx"), "utf8"),
    readFile(path.join(projectRoot, "components", "CourseOverview.tsx"), "utf8"),
    ...Array.from({ length: 6 }, (_, index) =>
      readFile(
        path.join(
          projectRoot,
          "content",
          "courseware",
          `day${index + 1}.ts`,
        ),
        "utf8",
      ),
    ),
  ]);

  assert.match(indexSource, /import \{ day6Courseware \}/);
  assert.match(runner, /<StageLessonDeck/);
  assert.match(runner, /useState<number \| null>\(null\)/);
  assert.doesNotMatch(runner, /localizedReadings\.length \+/);
  assert.doesNotMatch(presenter, /content\/present|PresentationSlide/);
  assert.match(overview, /Background reading/);
  assert.match(overview, /Live lesson and practice/);

  const minimumSlideCounts = [30, 20, 20, 20, 20, 20];
  days.forEach((source, index) => {
    const slideCount = source.match(/^\s+id: "day[1-6]-/gm)?.length ?? 0;
    const notesCount = source.match(/^\s+teacherNotes:/gm)?.length ?? 0;
    assert.ok(
      slideCount >= minimumSlideCounts[index],
      `Day ${index + 1} has only ${slideCount} authored slides`,
    );
    assert.equal(
      notesCount,
      slideCount,
      `Day ${index + 1} must give every slide instructor notes`,
    );
    assert.match(source, /\bquestion:\s*\{/);
    assert.match(source, /layout: "(demo|worked-example)"/);
    assert.doesNotMatch(source, /전력 사용량|자재 수량|물 사용량|장비 점검|공간 요구사항|학습 타이머|여행 계획/);
  });
});

test("keeps the public cards and readings aligned with the live course", async () => {
  const generatedModule = await loadTypeScriptData(
    path.join(projectRoot, "content", "generated.ts"),
  );
  const days = generatedModule.curriculumContent.days;
  const day3 = `${days["3"].student}\n${days["3"].cards}\n${days["3"].lecture}`;
  const day4 = `${days["4"].student}\n${days["4"].cards}\n${days["4"].lecture}`;
  const day5 = `${days["5"].student}\n${days["5"].cards}\n${days["5"].lecture}`;
  const day6 = `${days["6"].student}\n${days["6"].cards}\n${days["6"].lecture}`;

  assert.match(day3, /`MUST 1` is required/);
  assert.match(day3, /MUST 2.*MUST 3.*only when.*needs them/i);
  assert.match(day3, /self-check[\s\S]*peer[\s\S]*READY/i);
  assert.match(day3, /01:25–01:50[\s\S]*01:50–02:10[\s\S]*02:10–02:50/);
  assert.doesNotMatch(
    day3,
    /MUST 3\s*\/\s*NICE 2|APPROVAL GATE|Do not build before `APPROVED`/i,
  );

  assert.match(day4, /Event → handler → State → render → Screen/);
  assert.match(day4, /Storage.*load.*save.*separate/is);
  assert.match(day4, /without a teacher queue/i);
  assert.doesNotMatch(day4, /Event → State → Screen → Storage/);

  assert.match(day5, /12 min(?:ute)?s? Round 1[\s\S]*2 min(?:ute)?s?[\s\S]*12 min(?:ute)?s? Round 2/i);
  assert.match(day5, /self-check[\s\S]*peer[\s\S]*YELLOW/i);
  assert.match(day5, /01:50–02:45[\s\S]*02:45–03:00/);

  assert.match(day6, /G = ceil\(N ÷ 18\)/);
  assert.match(day6, /known-start retry ONCE/i);
  assert.match(day6, /Day 5 candidate[\s\S]*Day 5 test record/i);
  assert.doesNotMatch(day6, /20 learners[\s\S]*two groups/i);

  for (let day = 1; day <= 6; day += 1) {
    const cards = days[String(day)].cards;
    assert.doesNotMatch(cards, /My current signal|Keep the card visible/i);
  }

  const allMaterials = Object.values(days)
    .flatMap((day) => Object.values(day))
    .join("\n");
  assert.doesNotMatch(
    allMaterials,
    /전력 사용량 계산기|자재 수량·비용 계산기|물 사용량 기록 도구|장비 점검 체크리스트|공간 요구사항 정리 도구|학습 타이머|행사 안내|여행 계획|퀴즈 앱|포트폴리오/,
  );
});

test("keeps non-evidence activities non-required in the classroom manifest", async () => {
  const interactiveModules = await Promise.all(
    ["day1-2.ts", "day3-4.ts", "day5-6.ts"].map((file) =>
      loadTypeScriptData(
        path.join(projectRoot, "content", "interactive", file),
      ),
    ),
  );
  const manifestModule = await loadTypeScriptData(
    path.join(
      projectRoot,
      "supabase",
      "functions",
      "classrooms",
      "course_manifest.ts",
    ),
  );
  const plans = Object.assign({}, ...interactiveModules);
  const manifest = manifestModule.COURSE_MANIFEST;

  for (let day = 1; day <= 6; day += 1) {
    const plan = plans[`day${day}Plan`];
    const manifestActivities = new Map(
      manifest[day].stages.flatMap((stage) =>
        stage.activities.map((activity) => [activity.id, activity]),
      ),
    );

    for (const stage of plan.stages) {
      for (const activity of stage.activities) {
        const manifestActivity = manifestActivities.get(activity.id);
        assert.ok(
          manifestActivity,
          `${activity.id} is missing from the classroom manifest`,
        );
        const shouldBeRequired =
          !activity.optional &&
          !activity.hidden &&
          activity.kind !== "read" &&
          activity.kind !== "timer";
        assert.equal(
          manifestActivity.required,
          shouldBeRequired,
          `${activity.id} has the wrong required state in the classroom manifest`,
        );
      }
    }
  }
});

test("derives learner and dashboard progress from evidence instead of courseware roles", async () => {
  const [typesSource, runner, dashboard] = await Promise.all([
    readFile(
      path.join(projectRoot, "content", "interactive", "types.ts"),
      "utf8",
    ),
    readFile(
      path.join(
        projectRoot,
        "components",
        "interactive",
        "LessonRunner.tsx",
      ),
      "utf8",
    ),
    readFile(
      path.join(
        projectRoot,
        "components",
        "interactive",
        "ClassroomDashboard.tsx",
      ),
      "utf8",
    ),
  ]);
  const interactiveTypes = await loadTypeScriptData(
    path.join(projectRoot, "content", "interactive", "types.ts"),
  );
  const operationalStage = {
    activities: [
      { hidden: true, kind: "checklist" },
      { kind: "read" },
      { kind: "timer" },
    ],
  };
  const evidenceStage = {
    activities: [{ kind: "short-answer" }],
  };

  assert.equal(interactiveTypes.stageReportsProgress(operationalStage), false);
  assert.equal(interactiveTypes.stageReportsProgress(evidenceStage), true);
  assert.match(
    typesSource,
    /export function stageReportsProgress[\s\S]*?stage\.activities\.some\(activityRequiresEvidence\)/,
  );

  for (const source of [runner, dashboard]) {
    assert.match(source, /stageReportsProgress/);
    assert.match(source, /\.filter\(stageReportsProgress\)/);
    assert.doesNotMatch(
      source,
      /role\s*(?:===|!==|==|!=)\s*["']preflight["']/,
    );
  }
  assert.match(runner, /\{stageReportsProgress\(stage\) \?/);
  assert.match(dashboard, /!stageReportsProgress\(stage\)/);
});

test("retries only transient progress failures and rejects invalid updates", async () => {
  const runner = await readFile(
    path.join(
      projectRoot,
      "components",
      "interactive",
      "LessonRunner.tsx",
    ),
    "utf8",
  );
  const retryClause = runner.match(/const retryable =([\s\S]*?);/)?.[1];

  assert.ok(retryClause, "LessonRunner must classify retryable responses");
  assert.equal(
    retryClause.replace(/\s+/g, " ").trim(),
    "response.status === 408 || response.status === 425 || response.status === 429 || response.status >= 500",
  );
  assert.match(runner, /\.slice\(retryable \? index : index \+ 1\)/);
  assert.match(runner, /setProgressError\(message\)/);
  assert.match(runner, /setSaveState\("rejected"\)/);
  assert.match(
    runner,
    /failed\.completed === true[\s\S]*?typeof failed\.completedStageId === "string"[\s\S]*?setCompletedStages[\s\S]*?next\.delete\(failed\.completedStageId as string\)/,
  );
});

test("keeps every authored deck inside its 180-minute class plan", async () => {
  const interactiveModules = await Promise.all(
    ["day1-2.ts", "day3-4.ts", "day5-6.ts"].map((file) =>
      loadTypeScriptData(
        path.join(projectRoot, "content", "interactive", file),
      ),
    ),
  );
  const courseModule = await loadTypeScriptData(
    path.join(projectRoot, "content", "course.ts"),
  );
  const plans = Object.assign({}, ...interactiveModules);
  const seenSlideIds = new Set();

  for (let day = 1; day <= 6; day += 1) {
    const coursewareModule = await loadTypeScriptData(
      path.join(projectRoot, "content", "courseware", `day${day}.ts`),
      { "./types": { copy: (en, ko) => ({ en, ko }) } },
    );
    const courseware = coursewareModule[`day${day}Courseware`];
    const plan = plans[`day${day}Plan`];
    const overviewDay = courseModule.courseDays.find(
      (entry) => entry.day === day,
    );

    assert.equal(
      plan.stages.reduce((total, stage) => total + stage.minutes, 0),
      180,
      `Day ${day} must remain a three-hour class`,
    );
    assert.ok(overviewDay, `Day ${day} is missing from the course overview`);
    assert.equal(
      overviewDay.schedule.length,
      plan.stages.length,
      `Day ${day} overview and live plan must have the same stage count`,
    );
    plan.stages.forEach((stage, stageIndex) => {
      const scheduleItem = overviewDay.schedule[stageIndex];
      assert.equal(
        `${scheduleItem.start}-${scheduleItem.end}-${scheduleItem.minutes}`,
        `${stage.start}-${stage.end}-${stage.minutes}`,
        `Day ${day} stage ${stageIndex + 1} overview timing is stale`,
      );
    });
    assert.deepEqual(
      Array.from(courseware.stages, (stage) => stage.stageId),
      Array.from(plan.stages, (stage) => stage.id),
      `Day ${day} courseware must map one-to-one to the live class stages`,
    );

    courseware.stages.forEach((stage, stageIndex) => {
      const stageMinutes = plan.stages[stageIndex].minutes;
      const slideMinutes = stage.slides.reduce(
        (total, slide) => total + slide.minutes,
        0,
      );
      assert.ok(
        slideMinutes <= stageMinutes,
        `${stage.stageId} has ${slideMinutes} slide minutes inside a ${stageMinutes}-minute stage`,
      );
      stage.slides.forEach((slide) => {
        assert.ok(slide.minutes >= 1, `${slide.id} must have a usable timer`);
        assert.equal(seenSlideIds.has(slide.id), false, `${slide.id} is duplicated`);
        seenSlideIds.add(slide.id);
      });
    });
  }
});

test("uses the persistent side signal as the only learner status control", async () => {
  const [day12, day34, day56, manifest, classroomFunction, runner] =
    await Promise.all([
    readFile(path.join(projectRoot, "content", "interactive", "day1-2.ts"), "utf8"),
    readFile(path.join(projectRoot, "content", "interactive", "day3-4.ts"), "utf8"),
    readFile(path.join(projectRoot, "content", "interactive", "day5-6.ts"), "utf8"),
    readFile(
      path.join(
        projectRoot,
        "supabase",
        "functions",
        "classrooms",
        "course_manifest.ts",
      ),
      "utf8",
    ),
    readFile(
      path.join(
        projectRoot,
        "supabase",
        "functions",
        "classrooms",
        "index.ts",
      ),
      "utf8",
    ),
    readFile(
      path.join(
        projectRoot,
        "components",
        "interactive",
        "LessonRunner.tsx",
      ),
      "utf8",
    ),
  ]);

  for (const removedActivityId of [
    "day1-readiness-signal",
    "day4-start-status",
    "day4-final-status",
    "day6-readiness-status",
  ]) {
    for (const source of [day12, day34, day56, manifest]) {
      assert.equal(source.includes(removedActivityId), false);
    }
    assert.equal(classroomFunction.includes(removedActivityId), true);
  }

  assert.match(classroomFunction, /REMOVED_STATUS_ACTIVITY_STAGES/);
  assert.match(runner, /className={`book-status help-\${helpStatus}`}/);
  assert.match(runner, /onClick=\{\(\) => chooseHelp\(status\)\}/);
});

test("copies offline teaching files and a base-path-aware service worker", async () => {
  const [setting, serviceWorker] = await Promise.all([
    readFile(path.join(outputRoot, "downloads", "setting.html"), "utf8"),
    readFile(path.join(outputRoot, "sw.js"), "utf8"),
  ]);

  assert.match(setting, /OpenCode/i);
  assert.match(setting, /NVIDIA_API_KEY/);
  assert.doesNotMatch(setting, /NVIDIA_NIM_API_KEY/);
  assert.doesNotMatch(setting, /@ai-sdk\/openai-compatible|provider\.nvidia/);
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
