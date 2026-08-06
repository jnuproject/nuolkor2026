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

const DAY_TITLES = [
  {
    en: "Day 1 — Wake Up Your Assistant",
    ko: "1일차 — 비서를 깨운다",
  },
  {
    en: "Day 2 — Make the Bot Check on Its Own",
    ko: "2일차 — 스스로 확인하는 봇 만들기",
  },
  {
    en: "Day 3 — Let the Model Choose the Tool",
    ko: "3일차 — 모델이 도구를 고르게 하기",
  },
  {
    en: "Day 4 — Build Your Own Tool and Plug It In",
    ko: "4일차 — 내 도구 만들어 꽂기",
  },
  {
    en: "Day 5 — Lend Your Tool to Another Agent",
    ko: "5일차 — 내 도구를 다른 에이전트에게 빌려주기",
  },
  {
    en: "Day 6 — Finish It and Show Someone",
    ko: "6일차 — 마무리하고 보여 주기",
  },
];

const STAGE_COUNTS = [9, 8, 8, 7, 8, 6];

const LAB_FILES = [
  "day2-watch.py",
  "day3-tools.py",
  "day4-safe.py",
  "day5-mcp-server.py",
];

const PROHIBITED_PROJECT_EXAMPLES =
  /전력 사용량 계산기|자재 수량·비용 계산기|물 사용량 기록 도구|장비 점검 체크리스트|공간 요구사항 정리 도구|학습 타이머|행사 안내|여행 계획|퀴즈 앱|포트폴리오|power usage calculator|material quantity(?: and cost)? calculator|water usage (?:tracker|log)|equipment inspection checklist|space requirements tool|study timer|event guide|travel planner|quiz app|portfolio/i;

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

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function firstHeading(markdown) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

function markdownSections(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const sections = [];
  let current = null;
  let inFence = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    const heading = !inFence ? line.match(/^##\s+(.+)$/) : null;
    if (heading) {
      current = { title: heading[1].trim(), body: "" };
      sections.push(current);
      continue;
    }
    if (current) current.body += `${line}\n`;
  }

  return sections.map((section) => ({
    title: section.title,
    body: section.body.trim(),
  }));
}

let interactiveFixturePromise;

function loadInteractiveFixture() {
  interactiveFixturePromise ??= (async () => {
    const types = await loadTypeScriptData(
      path.join(projectRoot, "content", "interactive", "types.ts"),
    );
    const modules = await Promise.all(
      ["day1-2.ts", "day3-4.ts", "day5-6.ts"].map((file) =>
        loadTypeScriptData(
          path.join(projectRoot, "content", "interactive", file),
          { "./types": types },
        ),
      ),
    );
    return {
      types,
      plans: Object.assign({}, ...modules),
    };
  })();
  return interactiveFixturePromise;
}

test("syncs six substantial bilingual lessons into canonical fields", async () => {
  const [generatedModule, syncSource] = await Promise.all([
    loadTypeScriptData(path.join(projectRoot, "content", "generated.ts")),
    readFile(path.join(projectRoot, "scripts", "sync-content.mjs"), "utf8"),
  ]);
  const { curriculumContent } = generatedModule;

  assert.deepEqual(Object.keys(curriculumContent.days), [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]);
  assert.match(curriculumContent.start.instructor, /강사 사전 준비/);
  assert.match(curriculumContent.start.studentEn, /Student Setup Check/);
  assert.match(curriculumContent.start.studentKo, /학생 설정 확인/);

  for (const fileName of [
    "01-강사교안-ko.md",
    "02-student-lesson-en.md",
    "02-student-lesson-ko.md",
  ]) {
    assert.ok(
      syncSource.includes(fileName),
      `The content sync must read ${fileName}`,
    );
  }
  assert.doesNotMatch(syncSource, /student-workbook|workbookEn|workbookKo/);
  assert.match(syncSource, /copyFile\(/);

  assert.ok(
    curriculumContent.days["4"].lessonEn.includes(
      "Your topic is free. But the data has to be reachable.",
    ),
  );
  assert.match(
    curriculumContent.days["4"].lessonKo,
    /주제는 자유입니다.*데이터에 접근할 수 있어야 합니다/s,
  );

  for (let day = 1; day <= 6; day += 1) {
    const content = curriculumContent.days[String(day)];
    const titles = DAY_TITLES[day - 1];

    for (const field of [
      "instructor",
      "lessonEn",
      "lessonKo",
      "labs",
    ]) {
      assert.ok(
        Object.hasOwn(content, field),
        `Day ${day} is missing canonical field ${field}`,
      );
    }

    assert.ok(content.instructor.length > 5_000);
    assert.ok(content.lessonEn.length > 1_800);
    assert.ok(content.lessonKo.length > 1_800);
    assert.equal(Object.hasOwn(content, "workbookEn"), false);
    assert.equal(Object.hasOwn(content, "workbookKo"), false);
    assert.equal(firstHeading(content.lessonEn), titles.en);
    assert.equal(firstHeading(content.lessonKo), titles.ko);

    const lessonEnSections = markdownSections(content.lessonEn);
    const lessonKoSections = markdownSections(content.lessonKo);
    assert.equal(lessonEnSections.length, lessonKoSections.length);
    assert.ok(
      lessonEnSections.length >= 6,
      `Day ${day} lesson is too abbreviated`,
    );
  }

  const flowChecks = [
    [/A chatbot talks\. An agent does\./i, /챗봇은 말하고, 에이전트는 한다/],
    [/Prove that it remembers/i, /기억하는지 증명하기/],
    [/The model does not execute functions/i, /모델은 함수를 실행하지 않습니다/],
    [/orchestration/i, /오케스트레이션/],
    [/MCP/, /MCP/],
    [/showcase/i, /쇼케이스/],
  ];

  flowChecks.forEach(([english, korean], index) => {
    const content = curriculumContent.days[String(index + 1)];
    assert.match(content.lessonEn, english);
    assert.match(content.lessonKo, korean);
  });

  const allCurriculum = JSON.stringify(curriculumContent);
  assert.doesNotMatch(allCurriculum, PROHIBITED_PROJECT_EXAMPLES);
});

test("exposes exactly one long lesson per day", async () => {
  const generatedModule = await loadTypeScriptData(
    path.join(projectRoot, "content", "generated.ts"),
  );
  const readingsModule = await loadTypeScriptData(
    path.join(projectRoot, "lib", "readings.ts"),
    { "@/content/generated": generatedModule },
  );
  const translationsModule = await loadTypeScriptData(
    path.join(projectRoot, "content", "translations", "readings-ko.ts"),
  );

  for (let day = 1; day <= 6; day += 1) {
    const source = generatedModule.curriculumContent.days[String(day)];
    const readings = readingsModule.getReadings(day);

    assert.deepEqual(
      plain(readings.map((reading) => reading.id)),
      [`day${day}-lesson`],
    );
    assert.equal(readings[0].title, DAY_TITLES[day - 1].en);
    assert.equal(
      readings[0].translations.ko.title,
      DAY_TITLES[day - 1].ko,
    );
    assert.equal(readings[0].body, source.lessonEn.replace(/^#\s+.+$/m, "").trim());
    assert.equal(
      readings[0].translations.ko.body,
      source.lessonKo.replace(/^#\s+.+$/m, "").trim(),
    );
    const english = translationsModule.getLocalizedReadings(
      day,
      "en",
      readings,
    );
    const korean = translationsModule.getLocalizedReadings(
      day,
      "ko",
      readings,
    );
    assert.equal(english[0].title, DAY_TITLES[day - 1].en);
    assert.equal(korean[0].title, DAY_TITLES[day - 1].ko);
    assert.equal(english.length, 1);
    assert.equal(korean.length, 1);
  }
});

test("exports the new six-day bilingual course and every public classroom route", async () => {
  const [home, overview] = await Promise.all([
    readRoute(),
    readRoute("overview"),
  ]);

  for (const html of [home, overview]) {
    assert.match(html, /<title>Build Loop — Vibe Coding Bootcamp<\/title>/i);
    assert.match(html, /Vibe Coding Bootcamp/);
    assert.match(html, /바이브 코딩 부트캠프/);
    assert.match(html, />Lesson</);
    assert.match(html, />교재</);
    assert.doesNotMatch(html, /Workbook|워크북/);
    assert.match(html, /Class timeline/);
    assert.match(html, /수업 시간표/);
    assert.match(html, /\/nuolkor2026\/_next\//);
    assert.doesNotMatch(html, /react-loading-skeleton|codex-preview/i);

    DAY_TITLES.forEach((titles) => {
      assert.ok(html.includes(titles.en));
      assert.ok(html.includes(titles.ko));
    });
  }

  const routes = [
    "join",
    "class",
    "instructor/live",
    "start",
    ...Array.from({ length: 6 }, (_, index) => `day/${index + 1}`),
    ...Array.from(
      { length: 6 },
      (_, index) => `day/${index + 1}/present`,
    ),
    ...Array.from(
      { length: 6 },
      (_, index) => `instructor/day/${index + 1}`,
    ),
  ];
  const pages = await Promise.all(routes.map((route) => readRoute(route)));

  pages.forEach((html, index) => {
    const route = routes[index];
    assert.match(
      html,
      /build-loop:language:v2/,
      `${route} does not share the bilingual language state`,
    );
    if (!route.endsWith("/present")) {
      assert.match(html, />한국어</);
      assert.match(html, />English</);
    }
  });

  const presenterPages = routes
    .map((route, index) => ({ route, html: pages[index] }))
    .filter(({ route }) => route.endsWith("/present"));
  presenterPages.forEach(({ html, route }) => {
    assert.match(html, /class="presenter presenter-projector/);
    assert.doesNotMatch(
      html,
      /presenter-topbar|presenter-controls|presenter-notes|class="language-toggle"/,
      `${route} contains instructor controls on the projector surface`,
    );
  });

  const dayOne = pages[routes.indexOf("day/1")];
  assert.match(dayOne, /SELF-PACED/);
  assert.match(dayOne, /What you will do today/);
  assert.match(dayOne, /<article class="book-read">/);
  assert.doesNotMatch(home, /reading=/);
});

test("does not export the retired workbook route", async () => {
  await assert.rejects(stat(path.join(outputRoot, "cards")));
});

test("keeps projector slides clean and moves controls to the instructor page", async () => {
  const [
    presenter,
    instructorPlan,
    controller,
    presentationState,
    instructorPage,
  ] =
    await Promise.all([
      readFile(path.join(projectRoot, "components", "Presenter.tsx"), "utf8"),
      readFile(
        path.join(
          projectRoot,
          "components",
          "interactive",
          "InstructorPlanView.tsx",
        ),
        "utf8",
      ),
      readFile(
        path.join(
          projectRoot,
          "components",
          "interactive",
          "PresentationController.tsx",
        ),
        "utf8",
      ),
      readFile(
        path.join(projectRoot, "lib", "use-presentation-state.ts"),
        "utf8",
      ),
      readRoute("instructor/day/1"),
    ]);

  assert.match(presenter, /presenter-projector/);
  assert.doesNotMatch(
    presenter,
    /presenter-topbar|presenter-controls|presenter-notes|LanguageToggle/,
  );
  assert.match(instructorPlan, /<PresentationController/);
  assert.match(instructorPlan, /state=\{presentationState\}/);
  assert.match(instructorPlan, /slide\.stageId === nextStage\.id/);
  assert.match(instructorPlan, /stage\.teacherCue\.map/);
  assert.match(controller, /StageTimer/);
  assert.doesNotMatch(controller, /presentation-controller-notes/);
  assert.match(controller, /update\(\{ revealed: !state\.revealed \}\)/);
  assert.match(controller, /index: 0, blank: false, revealed: false/);
  assert.match(presentationState, /BroadcastChannel/);
  assert.match(presentationState, /localStorage/);

  const hierarchy = [
    'class="instructor-plan-intro"',
    'class="presentation-controller"',
    'class="instructor-plan-layout"',
    'class="instructor-teaching-sequence"',
    'class="instructor-full-guide"',
  ].map((marker) => instructorPage.indexOf(marker));

  assert.ok(
    hierarchy.every((position) => position >= 0) &&
      hierarchy.every(
        (position, index) => index === 0 || position > hierarchy[index - 1],
      ),
    "Instructor page hierarchy is out of order",
  );

  for (const className of [
    "instructor-teaching-sequence",
    "instructor-full-guide",
  ]) {
    const openingTag = instructorPage.match(
      new RegExp(`<details[^>]*class="${className}"[^>]*>`),
    )?.[0];

    assert.ok(openingTag, `${className} is not a details element`);
    assert.doesNotMatch(
      openingTag,
      /\sopen(?:=|[\s>])/,
      `${className} should be collapsed initially`,
    );
  }
});

test("derives continuous courseware from lesson Markdown and renders it top to bottom", async () => {
  const [
    generatedModule,
    { plans },
    indexSource,
    typesSource,
    deckSource,
    slideSource,
    styles,
  ] = await Promise.all([
    loadTypeScriptData(path.join(projectRoot, "content", "generated.ts")),
    loadInteractiveFixture(),
    readFile(path.join(projectRoot, "content", "courseware", "index.ts"), "utf8"),
    readFile(path.join(projectRoot, "content", "courseware", "types.ts"), "utf8"),
    readFile(
      path.join(projectRoot, "components", "courseware", "StageLessonDeck.tsx"),
      "utf8",
    ),
    readFile(
      path.join(projectRoot, "components", "courseware", "TeachingSlide.tsx"),
      "utf8",
    ),
    readFile(path.join(projectRoot, "app", "globals.css"), "utf8"),
  ]);

  assert.match(indexSource, /import \{ curriculumContent \}/);
  assert.match(indexSource, /source\.lessonEn/);
  assert.match(indexSource, /source\.lessonKo/);
  assert.match(indexSource, /parseMarkdownDocument/);
  assert.doesNotMatch(indexSource, /from ["']\.\/day[1-6]["']/);
  assert.match(typesSource, /markdown\?: BilingualCopy/);
  assert.match(typesSource, /presenterMarkdown\?: BilingualCopy/);
  assert.match(indexSource, /buildPresenterExcerpt/);
  assert.match(slideSource, /import ReactMarkdown from "react-markdown"/);
  assert.match(slideSource, /remarkPlugins=\{\[remarkGfm\]\}/);
  assert.match(
    slideSource,
    /localized\(markdown,\s*language\)/,
  );
  assert.match(deckSource, /slides\.map\(\(slide\)/);
  assert.doesNotMatch(deckSource, /useState|stage-courseware-nav|aria-pressed/);
  assert.match(styles, /\.lesson-reading > \.course-article \+ \.course-article/);
  assert.match(styles, /\.course-article-markdown/);

  const coursewareModule = await loadTypeScriptData(
    path.join(projectRoot, "content", "courseware", "index.ts"),
    {
      "@/content/generated": generatedModule,
      "@/content/interactive": {
        getInteractiveDay(day) {
          return plans[`day${day}Plan`];
        },
      },
      "@/content/translations/interactive-ko": {
        interactiveText(_language, value) {
          return typeof value === "string" ? value : value.en;
        },
      },
    },
  );
  const seenSlideIds = new Set();

  for (let day = 1; day <= 6; day += 1) {
    const source = generatedModule.curriculumContent.days[String(day)];
    const expectedEnglish = markdownSections(source.lessonEn);
    const expectedKorean = markdownSections(source.lessonKo);
    const courseware = coursewareModule.getDayCourseware(day);
    const plan = plans[`day${day}Plan`];

    assert.ok(courseware);
    assert.deepEqual(
      plain(courseware.stages.map((stage) => stage.stageId)),
      plain(plan.stages.map((stage) => stage.id)),
    );

    const markdownSlides = courseware.stages
      .flatMap((stage) => stage.slides)
      .filter((slide) => slide.markdown);
    assert.equal(markdownSlides.length, expectedEnglish.length);
    assert.deepEqual(
      plain(markdownSlides.map((slide) => slide.title)),
      expectedEnglish.map((section, index) => ({
        en: section.title,
        ko: expectedKorean[index].title,
      })),
    );
    assert.deepEqual(
      plain(markdownSlides.map((slide) => slide.markdown)),
      expectedEnglish.map((section, index) => ({
        en: section.body,
        ko: expectedKorean[index].body,
      })),
    );
    markdownSlides.forEach((slide) => {
      assert.ok(slide.presenterMarkdown);
      assert.ok(
        slide.presenterMarkdown.en.split("\n").filter(Boolean).length <= 12,
        `${slide.id} English projector copy is too dense`,
      );
      assert.ok(
        slide.presenterMarkdown.ko.split("\n").filter(Boolean).length <= 12,
        `${slide.id} Korean projector copy is too dense`,
      );
    });

    courseware.stages.forEach((stage, index) => {
      const slideMinutes = stage.slides.reduce(
        (total, slide) => total + slide.minutes,
        0,
      );
      assert.ok(slideMinutes <= plan.stages[index].minutes);
      stage.slides.forEach((slide) => {
        assert.ok(slide.minutes >= 1);
        assert.equal(seenSlideIds.has(slide.id), false, `${slide.id} is duplicated`);
        seenSlideIds.add(slide.id);
      });
    });
  }
});

test("keeps the exact stage counts and every day inside one 180-minute plan", async () => {
  const [{ plans }, courseModule] = await Promise.all([
    loadInteractiveFixture(),
    loadTypeScriptData(path.join(projectRoot, "content", "course.ts")),
  ]);

  for (let day = 1; day <= 6; day += 1) {
    const plan = plans[`day${day}Plan`];
    const overview = courseModule.courseDays.find((item) => item.day === day);
    const titles = DAY_TITLES[day - 1];
    const englishTitle = titles.en.replace(/^Day \d+ — /, "");
    const koreanTitle = titles.ko.replace(/^\d+일차 — /, "");

    assert.ok(overview);
    assert.equal(overview.title, englishTitle);
    assert.deepEqual(plain(plan.title), {
      en: englishTitle,
      ko: koreanTitle,
    });
    assert.equal(plan.stages.length, STAGE_COUNTS[day - 1]);
    assert.equal(overview.schedule.length, STAGE_COUNTS[day - 1]);
    assert.equal(
      plan.stages.reduce((total, stage) => total + stage.minutes, 0),
      180,
    );
    assert.equal(
      overview.schedule.reduce((total, stage) => total + stage.minutes, 0),
      180,
    );
    assert.equal(plan.stages[0].start, "00:00");
    assert.equal(plan.stages.at(-1).end, "03:00");
    assert.equal(
      new Set(plan.stages.map((stage) => stage.id)).size,
      plan.stages.length,
    );

    plan.stages.forEach((stage, index) => {
      const schedule = overview.schedule[index];
      assert.deepEqual(
        [stage.start, stage.end, stage.minutes],
        [schedule.start, schedule.end, schedule.minutes],
        `Day ${day} stage ${index + 1} is stale in content/course.ts`,
      );
      if (index > 0) {
        assert.equal(stage.start, plan.stages[index - 1].end);
      }
    });
  }
});

test("keeps the classroom manifest identical to the learner evidence contract", async () => {
  const [{ plans, types }, manifestModule, runner, dashboard] =
    await Promise.all([
      loadInteractiveFixture(),
      loadTypeScriptData(
        path.join(
          projectRoot,
          "supabase",
          "functions",
          "classrooms",
          "course_manifest.ts",
        ),
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

  const expectedManifest = {};
  for (let day = 1; day <= 6; day += 1) {
    const plan = plans[`day${day}Plan`];
    expectedManifest[day] = {
      stages: plan.stages.map((stage) => ({
        id: stage.id,
        activities: stage.activities.map((activity) => ({
          id: activity.id,
          required: types.activityRequiresEvidence(activity),
        })),
      })),
    };
  }
  assert.deepEqual(
    plain(manifestModule.COURSE_MANIFEST),
    plain(expectedManifest),
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
  assert.equal(types.stageReportsProgress(operationalStage), false);
  assert.equal(types.stageReportsProgress(evidenceStage), true);

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

test("uses the persistent side signal without separate status activities", async () => {
  const [
    { plans },
    manifestSource,
    classroomFunction,
    runner,
    styles,
  ] = await Promise.all([
    loadInteractiveFixture(),
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
    readFile(path.join(projectRoot, "app", "globals.css"), "utf8"),
  ]);
  const planSource = JSON.stringify(plans);

  for (const removedActivityId of [
    "day1-readiness-signal",
    "day4-start-status",
    "day4-final-status",
    "day6-readiness-status",
  ]) {
    assert.equal(planSource.includes(removedActivityId), false);
    assert.equal(manifestSource.includes(removedActivityId), false);
    assert.equal(classroomFunction.includes(removedActivityId), true);
  }

  for (let day = 1; day <= 6; day += 1) {
    for (const stage of plans[`day${day}Plan`].stages) {
      for (const activity of stage.activities) {
        assert.doesNotMatch(activity.id, /-(?:status|signal)$/);
      }
    }
  }

  assert.match(classroomFunction, /REMOVED_STATUS_ACTIVITY_STAGES/);
  assert.equal(
    runner.match(/className=\{`book-status help-\$\{helpStatus\}`\}/g)?.length,
    1,
  );
  assert.match(runner, /onClick=\{\(\) => chooseHelp\(status\)\}/);
  assert.match(styles, /\.book-status\s*\{[\s\S]*?position:\s*fixed/);
});

test("guards the audited mobile, setup, rejoin, and classroom control flows", async () => {
  const [setup, join, header, dashboard, access, runner, styles] =
    await Promise.all([
      readFile(
        path.join(projectRoot, "components", "interactive", "SetupFlow.tsx"),
        "utf8",
      ),
      readFile(
        path.join(projectRoot, "components", "interactive", "JoinClass.tsx"),
        "utf8",
      ),
      readFile(path.join(projectRoot, "components", "BookHeader.tsx"), "utf8"),
      readFile(
        path.join(
          projectRoot,
          "components",
          "interactive",
          "ClassroomDashboard.tsx",
        ),
        "utf8",
      ),
      readFile(path.join(projectRoot, "lib", "classroom-access.ts"), "utf8"),
      readFile(
        path.join(
          projectRoot,
          "components",
          "interactive",
          "LessonRunner.tsx",
        ),
        "utf8",
      ),
      readFile(path.join(projectRoot, "app", "globals.css"), "utf8"),
    ]);

  assert.match(setup, /const allStepsComplete = completeCount === steps\.length/);
  assert.match(setup, /const canOpenDayOne = allStepsComplete && status !== null/);
  assert.match(setup, /os === "mac"[\s\S]*?source ~\/\.zshrc/);
  assert.match(setup, /completely close Terminal and open it again/);
  assert.match(join, /resumeToken/);
  assert.match(join, /participant-access/);
  assert.match(header, /className="book-header-status"/);
  assert.match(header, /aria-live="polite"/);
  assert.match(access, /sessionStorage/);
  assert.match(dashboard, /aria-current=\{active \? "step" : undefined\}/);
  assert.doesNotMatch(
    dashboard,
    /currentStage:[^}]+\+ 1,[\s\S]{0,80}status: "open"/,
  );
  assert.match(runner, /\{classroomCode \? \(/);
  assert.match(styles, /\.book-shell > \*\s*\{[\s\S]*?min-width:\s*0/);
  assert.match(styles, /@media print[\s\S]*?\.book-header[\s\S]*?display:\s*none/);
});

test("copies the six public labs and offline setup files into the export", async () => {
  const generatedLabs = await loadTypeScriptData(
    path.join(projectRoot, "content", "generated-labs.ts"),
  );
  const [publicFiles, exportedFiles, setting, serviceWorker] = await Promise.all([
    readdir(path.join(projectRoot, "public", "labs")),
    readdir(path.join(outputRoot, "labs")),
    readFile(path.join(outputRoot, "downloads", "setting.html"), "utf8"),
    readFile(path.join(outputRoot, "sw.js"), "utf8"),
  ]);

  assert.deepEqual(
    publicFiles.filter((file) => file.endsWith(".py")).sort(),
    LAB_FILES,
  );
  assert.deepEqual(
    exportedFiles.filter((file) => file.endsWith(".py")).sort(),
    LAB_FILES,
  );
  assert.deepEqual(
    [
      ...new Set(
        Object.values(generatedLabs.curriculumLabs)
          .flat()
          .map((lab) => lab.fileName),
      ),
    ].sort(),
    LAB_FILES,
  );

  for (const file of LAB_FILES) {
    const [publicCopy, exportedCopy] = await Promise.all([
      readFile(path.join(projectRoot, "public", "labs", file), "utf8"),
      readFile(path.join(outputRoot, "labs", file), "utf8"),
    ]);
    assert.equal(exportedCopy, publicCopy, `${file} is stale in out/labs`);
  }

  assert.match(setting, /OpenCode/i);
  assert.match(setting, /NVIDIA_API_KEY/);
  assert.match(setting, /source ~\/\.zshrc/);
  assert.match(setting, /터미널을 완전히 닫고 새로 열었다면 건너뛰어도 됩니다/);
  assert.doesNotMatch(setting, /NVIDIA_NIM_API_KEY/);
  assert.doesNotMatch(setting, /@ai-sdk\/openai-compatible|provider\.nvidia/);
  assert.match(serviceWorker, /self\.location\.href/);
  assert.match(serviceWorker, /build-loop/);
  assert.match(serviceWorker, /isWithinBasePath/);
});

test("ships only public Supabase configuration and keeps classroom tables private", async () => {
  const [
    clientSource,
    edgeFunction,
    workflow,
    classroomMigration,
    dashboardMigration,
  ] = await Promise.all([
    readFile(path.join(projectRoot, "lib", "classroom-api.ts"), "utf8"),
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
      path.join(projectRoot, ".github", "workflows", "deploy-pages.yml"),
      "utf8",
    ),
    readFile(
      path.join(
        projectRoot,
        "supabase",
        "migrations",
        "20260727000000_classrooms.sql",
      ),
      "utf8",
    ),
    readFile(
      path.join(
        projectRoot,
        "supabase",
        "migrations",
        "20260727010000_dashboard_retention.sql",
      ),
      "utf8",
    ),
  ]);

  assert.match(clientSource, /NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(clientSource, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(
    `${clientSource}\n${workflow}`,
    /SUPABASE_SERVICE_ROLE_KEY|NEXT_PUBLIC_SUPABASE_ANON_KEY|sb_secret_/,
  );
  assert.match(edgeFunction, /requiredEnvironment\(\s*"SUPABASE_SERVICE_ROLE_KEY"/);

  for (const table of [
    "classroom_sessions",
    "classroom_participants",
    "stage_progress",
    "activity_progress",
  ]) {
    assert.match(
      classroomMigration,
      new RegExp(`alter table public\\.${table} enable row level security;`),
    );
  }
  assert.match(
    classroomMigration,
    /revoke all on table[\s\S]*from public, anon, authenticated;/,
  );
  assert.match(
    classroomMigration,
    /grant select, insert, update, delete on table[\s\S]*to service_role;/,
  );
  assert.match(
    dashboardMigration,
    /revoke all on function public\.classrooms_teacher_dashboard\(uuid, jsonb\)[\s\S]*from public, anon, authenticated;/,
  );
  assert.match(
    dashboardMigration,
    /grant execute on function public\.classrooms_teacher_dashboard\(uuid, jsonb\)[\s\S]*to service_role;/,
  );

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
  assert.match(javascript, /sb_publishable_/);
  assert.match(javascript, /x-instructor-pin/);
  assert.doesNotMatch(
    javascript,
    /sb_secret_|service_role|SUPABASE_SERVICE_ROLE_KEY/i,
  );
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
