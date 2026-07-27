/**
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
  1: {
    "stages": [
      {
        "id": "day1-welcome-readiness",
        "activities": [
          {
            "id": "day1-readiness-check",
            "required": true
          },
          {
            "id": "day1-readiness-signal",
            "required": true
          }
        ]
      },
      {
        "id": "day1-live-build-demo",
        "activities": [
          {
            "id": "day1-demo-watch",
            "required": true
          },
          {
            "id": "day1-demo-human-decision",
            "required": true
          }
        ]
      },
      {
        "id": "day1-human-role",
        "activities": [
          {
            "id": "day1-role-choice",
            "required": true
          },
          {
            "id": "day1-success-statement",
            "required": true
          }
        ]
      },
      {
        "id": "day1-safety-promise",
        "activities": [
          {
            "id": "day1-safety-checklist",
            "required": true
          },
          {
            "id": "day1-safety-fix-choice",
            "required": true
          }
        ]
      },
      {
        "id": "day1-break",
        "activities": [
          {
            "id": "day1-break-timer",
            "required": false
          }
        ]
      },
      {
        "id": "day1-tools-files",
        "activities": [
          {
            "id": "day1-tool-roles",
            "required": true
          },
          {
            "id": "day1-correct-location",
            "required": true
          }
        ]
      },
      {
        "id": "day1-guided-first-build",
        "activities": [
          {
            "id": "day1-build-prompt",
            "required": true
          },
          {
            "id": "day1-watch-plan",
            "required": true
          },
          {
            "id": "day1-first-build-check",
            "required": true
          }
        ]
      },
      {
        "id": "day1-check-fix-save",
        "activities": [
          {
            "id": "day1-base-tests",
            "required": true
          },
          {
            "id": "day1-one-fix",
            "required": false
          },
          {
            "id": "day1-base-save",
            "required": true
          }
        ]
      },
      {
        "id": "day1-project-studio",
        "activities": [
          {
            "id": "day1-studio-plan",
            "required": true
          },
          {
            "id": "day1-studio-build",
            "required": true
          },
          {
            "id": "day1-studio-tests-save",
            "required": true
          }
        ]
      },
      {
        "id": "day1-share-exit",
        "activities": [
          {
            "id": "day1-partner-share",
            "required": true
          },
          {
            "id": "day1-exit-answer",
            "required": true
          }
        ]
      }
    ]
  },
  2: {
    "stages": [
      {
        "id": "day2-review",
        "activities": [
          {
            "id": "day2-loop-order",
            "required": true
          },
          {
            "id": "day2-day1-test",
            "required": true
          }
        ]
      },
      {
        "id": "day2-ab-test",
        "activities": [
          {
            "id": "day2-ab-choice",
            "required": true
          },
          {
            "id": "day2-ab-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day2-prompt-frame",
        "activities": [
          {
            "id": "day2-frame-read",
            "required": true
          },
          {
            "id": "day2-frame-write",
            "required": true
          },
          {
            "id": "day2-frame-check",
            "required": true
          }
        ]
      },
      {
        "id": "day2-context-management",
        "activities": [
          {
            "id": "day2-handoff-read",
            "required": true
          },
          {
            "id": "day2-handoff-draft",
            "required": true
          },
          {
            "id": "day2-handoff-fact-check",
            "required": true
          }
        ]
      },
      {
        "id": "day2-break",
        "activities": [
          {
            "id": "day2-break-timer",
            "required": false
          }
        ]
      },
      {
        "id": "day2-debugging-demo",
        "activities": [
          {
            "id": "day2-debug-watch",
            "required": true
          },
          {
            "id": "day2-debug-record",
            "required": true
          },
          {
            "id": "day2-debug-prompt",
            "required": true
          }
        ]
      },
      {
        "id": "day2-guided-lab",
        "activities": [
          {
            "id": "day2-lab-prompt",
            "required": true
          },
          {
            "id": "day2-lab-watch",
            "required": true
          },
          {
            "id": "day2-basic-tests",
            "required": true
          }
        ]
      },
      {
        "id": "day2-project-studio",
        "activities": [
          {
            "id": "day2-six-tests",
            "required": true
          },
          {
            "id": "day2-studio-fix-handoff",
            "required": true
          },
          {
            "id": "day2-regression-save",
            "required": true
          }
        ]
      },
      {
        "id": "day2-compare-exit",
        "activities": [
          {
            "id": "day2-peer-compare",
            "required": true
          },
          {
            "id": "day2-exit-ticket",
            "required": true
          }
        ]
      }
    ]
  },
  3: {
    "stages": [
      {
        "id": "day3-review-ownership",
        "activities": [
          {
            "id": "day3-loop-recall",
            "required": true
          },
          {
            "id": "day3-ownership-check",
            "required": true
          }
        ]
      },
      {
        "id": "day3-free-topic-exploration",
        "activities": [
          {
            "id": "day3-own-observations",
            "required": true
          },
          {
            "id": "day3-own-choice",
            "required": true
          }
        ]
      },
      {
        "id": "day3-user-problem-success",
        "activities": [
          {
            "id": "day3-user",
            "required": true
          },
          {
            "id": "day3-problem",
            "required": true
          },
          {
            "id": "day3-success",
            "required": true
          }
        ]
      },
      {
        "id": "day3-must-nice",
        "activities": [
          {
            "id": "day3-priority-read",
            "required": true
          },
          {
            "id": "day3-priority-list",
            "required": true
          },
          {
            "id": "day3-v0-scope-gate",
            "required": true
          }
        ]
      },
      {
        "id": "day3-break",
        "activities": [
          {
            "id": "day3-break-timer",
            "required": false
          }
        ]
      },
      {
        "id": "day3-wireframe-brief",
        "activities": [
          {
            "id": "day3-project-brief",
            "required": true
          },
          {
            "id": "day3-one-screen-wireframe",
            "required": true
          }
        ]
      },
      {
        "id": "day3-plan-review",
        "activities": [
          {
            "id": "day3-ai-plan-review",
            "required": true
          },
          {
            "id": "day3-review-watch",
            "required": true
          },
          {
            "id": "day3-approval-gate",
            "required": true
          }
        ]
      },
      {
        "id": "day3-v0-studio",
        "activities": [
          {
            "id": "day3-v0-tell-watch",
            "required": true
          },
          {
            "id": "day3-v0-check-fix",
            "required": true
          },
          {
            "id": "day3-v0-save",
            "required": true
          }
        ]
      },
      {
        "id": "day3-pitch",
        "activities": [
          {
            "id": "day3-pitch-timer",
            "required": false
          },
          {
            "id": "day3-pitch-peer",
            "required": true
          },
          {
            "id": "day3-exit-action",
            "required": true
          }
        ]
      }
    ]
  },
  4: {
    "stages": [
      {
        "id": "day4-project-status",
        "activities": [
          {
            "id": "day4-old-path-test",
            "required": true
          },
          {
            "id": "day4-start-status",
            "required": true
          }
        ]
      },
      {
        "id": "day4-code-map",
        "activities": [
          {
            "id": "day4-code-role-read",
            "required": true
          },
          {
            "id": "day4-code-map-prompt",
            "required": true
          },
          {
            "id": "day4-code-map-check",
            "required": true
          }
        ]
      },
      {
        "id": "day4-action-trace",
        "activities": [
          {
            "id": "day4-action-flow-read",
            "required": true
          },
          {
            "id": "day4-action-trace-prompt",
            "required": true
          },
          {
            "id": "day4-action-trace-record",
            "required": true
          }
        ]
      },
      {
        "id": "day4-sprint-save-point",
        "activities": [
          {
            "id": "day4-sprint-loop",
            "required": true
          },
          {
            "id": "day4-test-before-sprint",
            "required": true
          },
          {
            "id": "day4-start-save-point",
            "required": true
          }
        ]
      },
      {
        "id": "day4-break",
        "activities": [
          {
            "id": "day4-break-timer",
            "required": false
          }
        ]
      },
      {
        "id": "day4-recovery-paths",
        "activities": [
          {
            "id": "day4-recovery-read",
            "required": true
          },
          {
            "id": "day4-recovery-choice",
            "required": true
          },
          {
            "id": "day4-recovery-proof",
            "required": true
          }
        ]
      },
      {
        "id": "day4-slice-approval",
        "activities": [
          {
            "id": "day4-slice-definition",
            "required": true
          },
          {
            "id": "day4-slice-gate",
            "required": true
          },
          {
            "id": "day4-slice-status",
            "required": true
          }
        ]
      },
      {
        "id": "day4-project-studio",
        "activities": [
          {
            "id": "day4-studio-tell-watch",
            "required": true
          },
          {
            "id": "day4-studio-check-fix",
            "required": true
          },
          {
            "id": "day4-studio-save-handoff",
            "required": true
          }
        ]
      },
      {
        "id": "day4-final-checkpoint",
        "activities": [
          {
            "id": "day4-final-peer-check",
            "required": true
          },
          {
            "id": "day4-final-status",
            "required": true
          },
          {
            "id": "day4-day5-first-action",
            "required": true
          }
        ]
      }
    ]
  },
  5: {
    "stages": [
      {
        "id": "day5-test-strategy",
        "activities": [
          {
            "id": "day5-evidence-read",
            "required": true
          },
          {
            "id": "day5-evidence-choice",
            "required": true
          },
          {
            "id": "day5-start-save",
            "required": true
          }
        ]
      },
      {
        "id": "day5-write-test-cards",
        "activities": [
          {
            "id": "day5-four-types",
            "required": true
          },
          {
            "id": "day5-four-cards",
            "required": true
          },
          {
            "id": "day5-card-check",
            "required": true
          }
        ]
      },
      {
        "id": "day5-peer-test-rounds",
        "activities": [
          {
            "id": "day5-peer-round-one",
            "required": true
          },
          {
            "id": "day5-peer-round-two",
            "required": true
          }
        ]
      },
      {
        "id": "day5-break",
        "activities": [
          {
            "id": "day5-break-timer",
            "required": false
          }
        ]
      },
      {
        "id": "day5-sort-problems",
        "activities": [
          {
            "id": "day5-problem-evidence",
            "required": true
          },
          {
            "id": "day5-priority-choice",
            "required": true
          },
          {
            "id": "day5-priority-check",
            "required": true
          }
        ]
      },
      {
        "id": "day5-safety-accessibility",
        "activities": [
          {
            "id": "day5-safety-check",
            "required": true
          },
          {
            "id": "day5-access-check",
            "required": true
          },
          {
            "id": "day5-access-issue",
            "required": true
          }
        ]
      },
      {
        "id": "day5-approve-fix-plan",
        "activities": [
          {
            "id": "day5-fix-plan",
            "required": true
          },
          {
            "id": "day5-fix-approval",
            "required": true
          }
        ]
      },
      {
        "id": "day5-project-studio",
        "activities": [
          {
            "id": "day5-fix-prompt",
            "required": true
          },
          {
            "id": "day5-fix-record",
            "required": true
          },
          {
            "id": "day5-studio-timer",
            "required": false
          }
        ]
      },
      {
        "id": "day5-backup-demo",
        "activities": [
          {
            "id": "day5-smoke-test",
            "required": true
          },
          {
            "id": "day5-release-copy",
            "required": true
          },
          {
            "id": "day5-demo-path",
            "required": true
          }
        ]
      }
    ]
  },
  6: {
    "stages": [
      {
        "id": "day6-final-readiness",
        "activities": [
          {
            "id": "day6-version-choice",
            "required": true
          },
          {
            "id": "day6-readiness-test",
            "required": true
          },
          {
            "id": "day6-readiness-status",
            "required": true
          }
        ]
      },
      {
        "id": "day6-last-blocker",
        "activities": [
          {
            "id": "day6-blocker-gate",
            "required": true
          },
          {
            "id": "day6-blocker-prompt",
            "required": false
          },
          {
            "id": "day6-blocker-retest",
            "required": true
          }
        ]
      },
      {
        "id": "day6-code-freeze",
        "activities": [
          {
            "id": "day6-freeze-rules",
            "required": true
          },
          {
            "id": "day6-final-copy",
            "required": true
          },
          {
            "id": "day6-final-record",
            "required": true
          }
        ]
      },
      {
        "id": "day6-break",
        "activities": [
          {
            "id": "day6-break-timer",
            "required": false
          }
        ]
      },
      {
        "id": "day6-partner-rehearsal",
        "activities": [
          {
            "id": "day6-demo-script",
            "required": true
          },
          {
            "id": "day6-rehearsal-timer",
            "required": false
          },
          {
            "id": "day6-partner-feedback",
            "required": true
          }
        ]
      },
      {
        "id": "day6-showcase",
        "activities": [
          {
            "id": "day6-presenter-ready",
            "required": true
          },
          {
            "id": "day6-showcase-timer",
            "required": false
          },
          {
            "id": "day6-showcase-record",
            "required": true
          }
        ]
      },
      {
        "id": "day6-peer-feedback",
        "activities": [
          {
            "id": "day6-feedback-one",
            "required": true
          },
          {
            "id": "day6-feedback-two",
            "required": true
          }
        ]
      },
      {
        "id": "day6-reflection-close",
        "activities": [
          {
            "id": "day6-reflection",
            "required": true
          },
          {
            "id": "day6-responsibility",
            "required": true
          },
          {
            "id": "day6-handoff-check",
            "required": true
          }
        ]
      }
    ]
  },
} as const satisfies Record<number, CourseDayManifest>;

export function getCourseDay(day: number): CourseDayManifest | undefined {
  return (COURSE_MANIFEST as Record<number, CourseDayManifest | undefined>)[
    day
  ];
}
