#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");
const outputPath = path.join(
  repositoryRoot,
  "supabase/functions/classrooms/course_manifest.ts",
);
const sourcePaths = [
  "content/interactive/day1-2.ts",
  "content/interactive/day3-4.ts",
  "content/interactive/day5-6.ts",
].map((relativePath) => path.join(repositoryRoot, relativePath));

function parseSource(source, sourcePath, days) {
  let currentDay;
  let currentStage;
  let currentActivity;

  const finishActivity = () => {
    if (!currentActivity) return;
    if (!currentActivity.kind) {
      throw new Error(
        `Activity ${currentActivity.id} has no kind in ${sourcePath}`,
      );
    }
    currentActivity.required =
      !currentActivity.optional &&
      !currentActivity.hidden &&
      currentActivity.kind !== "timer" &&
      currentActivity.kind !== "read";
    delete currentActivity.kind;
    delete currentActivity.optional;
    delete currentActivity.hidden;
    currentStage.activities.push(currentActivity);
    currentActivity = undefined;
  };

  const finishStage = () => {
    finishActivity();
    if (!currentStage) return;
    if (currentStage.activities.length === 0) {
      throw new Error(`Stage ${currentStage.id} has no activities`);
    }
    days.get(currentDay).stages.push(currentStage);
    currentStage = undefined;
  };

  for (const line of source.split(/\r?\n/)) {
    const dayMatch = line.match(/^export const day([1-6])Plan:/);
    if (dayMatch) {
      finishStage();
      currentDay = Number(dayMatch[1]);
      if (days.has(currentDay)) {
        throw new Error(`Duplicate Day ${currentDay}`);
      }
      days.set(currentDay, { day: currentDay, stages: [] });
      continue;
    }

    const stageMatch = line.match(/^ {6}id: "([^"]+)",$/);
    if (stageMatch) {
      if (!currentDay) {
        throw new Error(`Stage found before day in ${sourcePath}`);
      }
      finishStage();
      currentStage = { id: stageMatch[1], activities: [] };
      continue;
    }

    const activityMatch = line.match(/^ {10}id: "([^"]+)",$/);
    if (activityMatch) {
      if (!currentStage) {
        throw new Error(`Activity found before stage in ${sourcePath}`);
      }
      finishActivity();
      currentActivity = {
        id: activityMatch[1],
        kind: undefined,
        optional: false,
        hidden: false,
      };
      continue;
    }

    if (!currentActivity) continue;

    const kindMatch = line.match(/^ {10}kind: "([^"]+)",$/);
    if (kindMatch) {
      currentActivity.kind = kindMatch[1];
      continue;
    }

    if (/^ {10}optional: true,$/.test(line)) {
      currentActivity.optional = true;
      continue;
    }

    if (/^ {10}hidden: true,$/.test(line)) {
      currentActivity.hidden = true;
    }
  }

  finishStage();
}

function assertManifest(days) {
  const expectedDays = [1, 2, 3, 4, 5, 6];
  const actualDays = [...days.keys()].sort((a, b) => a - b);
  if (JSON.stringify(actualDays) !== JSON.stringify(expectedDays)) {
    throw new Error(`Expected Days 1–6, found: ${actualDays.join(", ")}`);
  }

  const ids = new Set();
  for (const day of days.values()) {
    for (const stage of day.stages) {
      if (!stage.id.startsWith(`day${day.day}-`)) {
        throw new Error(`Stage ${stage.id} is assigned to the wrong day`);
      }
      if (ids.has(stage.id)) throw new Error(`Duplicate ID: ${stage.id}`);
      ids.add(stage.id);
      for (const activity of stage.activities) {
        if (!activity.id.startsWith(`day${day.day}-`)) {
          throw new Error(`Activity ${activity.id} is assigned to the wrong day`);
        }
        if (ids.has(activity.id)) {
          throw new Error(`Duplicate ID: ${activity.id}`);
        }
        ids.add(activity.id);
      }
    }
  }
}

function renderManifest(days) {
  const records = [...days.values()]
    .sort((a, b) => a.day - b.day)
    .map(
      (day) =>
        `  ${day.day}: ${JSON.stringify(
          {
            stages: day.stages,
          },
          null,
          2,
        )
          .split("\n")
          .map((line, index) => (index === 0 ? line : `  ${line}`))
          .join("\n")},`,
    )
    .join("\n");

  return `/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Source: content/interactive/day1-2.ts, day3-4.ts, day5-6.ts
 * Regenerate: node supabase/scripts/generate-course-manifest.mjs
 *
 * Only IDs and whether an activity is required are included. This keeps the
 * Edge Function deploy independent from the Next.js module graph.
 */

export type CourseActivityManifest = {
  id: string;
  required: boolean;
};

export type CourseStageManifest = {
  id: string;
  activities: CourseActivityManifest[];
};

export type CourseDayManifest = {
  stages: CourseStageManifest[];
};

export const COURSE_MANIFEST = {
${records}
} as const satisfies Record<number, CourseDayManifest>;

export function getCourseDay(day: number): CourseDayManifest | undefined {
  return (COURSE_MANIFEST as Record<number, CourseDayManifest | undefined>)[
    day
  ];
}
`;
}

const days = new Map();
for (const sourcePath of sourcePaths) {
  parseSource(await readFile(sourcePath, "utf8"), sourcePath, days);
}
assertManifest(days);
const output = renderManifest(days);

if (process.argv.includes("--check")) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== output) {
    console.error(
      "Course manifest is stale. Run: node supabase/scripts/generate-course-manifest.mjs",
    );
    process.exitCode = 1;
  } else {
    console.log("Course manifest is current.");
  }
} else {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output);
  console.log(`Wrote ${path.relative(repositoryRoot, outputPath)}`);
}
