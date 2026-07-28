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
        "id": "day1-show-finished-result",
        "activities": [
          {
            "id": "day1-show-finished-result-read",
            "required": false
          }
        ]
      },
      {
        "id": "day1-check-opencode-nvidia-folder-browser",
        "activities": [
          {
            "id": "day1-tools-ready-read",
            "required": false
          }
        ]
      },
      {
        "id": "day1-smallest-web-structure",
        "activities": [
          {
            "id": "day1-smallest-web-structure-read",
            "required": false
          }
        ]
      },
      {
        "id": "day1-live-build-demo",
        "activities": [
          {
            "id": "day1-live-build-demo-read",
            "required": false
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
        "id": "day1-build-shared-first-page",
        "activities": [
          {
            "id": "day1-shared-page-browser-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day1-fix-one-difference",
        "activities": [
          {
            "id": "day1-one-revision-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day1-personalize-and-check-mobile",
        "activities": [
          {
            "id": "day1-personalization-decision",
            "required": true
          }
        ]
      },
      {
        "id": "day1-test-publish-github-pages",
        "activities": [
          {
            "id": "day1-test-public-url",
            "required": true
          }
        ]
      },
      {
        "id": "day1-save-working-version",
        "activities": [
          {
            "id": "day1-working-backup-location",
            "required": true
          }
        ]
      }
    ]
  },
  2: {
    "stages": [
      {
        "id": "day2-reopen-test-url",
        "activities": [
          {
            "id": "day2-reopen-url-read",
            "required": false
          }
        ]
      },
      {
        "id": "day2-user-and-situation",
        "activities": [
          {
            "id": "day2-project-sentence",
            "required": true
          }
        ]
      },
      {
        "id": "day2-one-complete-path",
        "activities": [
          {
            "id": "day2-complete-path",
            "required": true
          }
        ]
      },
      {
        "id": "day2-real-content-and-order",
        "activities": [
          {
            "id": "day2-real-content-draft",
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
        "id": "day2-good-build-request-demo",
        "activities": [
          {
            "id": "day2-good-request-demo-read",
            "required": false
          }
        ]
      },
      {
        "id": "day2-personal-plan-and-paper-screen",
        "activities": [
          {
            "id": "day2-plan-and-sketch-location",
            "required": true
          }
        ]
      },
      {
        "id": "day2-build-personal-v1",
        "activities": [
          {
            "id": "day2-v1-browser-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day2-five-second-test",
        "activities": [
          {
            "id": "day2-five-second-observation",
            "required": true
          }
        ]
      },
      {
        "id": "day2-save-v1",
        "activities": [
          {
            "id": "day2-v1-backup-location",
            "required": true
          }
        ]
      }
    ]
  },
  3: {
    "stages": [
      {
        "id": "day3-first-screen-observation",
        "activities": [
          {
            "id": "day3-first-impression-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day3-design-is-information-order",
        "activities": [
          {
            "id": "day3-information-order-read",
            "required": false
          }
        ]
      },
      {
        "id": "day3-diagnose-ai-defaults",
        "activities": [
          {
            "id": "day3-ai-default-diagnosis",
            "required": true
          }
        ]
      },
      {
        "id": "day3-real-content-consistent-limits",
        "activities": [
          {
            "id": "day3-visual-system-read",
            "required": false
          }
        ]
      },
      {
        "id": "day3-live-before-after-demo",
        "activities": [
          {
            "id": "day3-live-design-demo-read",
            "required": false
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
        "id": "day3-common-design-clinic",
        "activities": [
          {
            "id": "day3-clinic-change-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day3-analyze-reference",
        "activities": [
          {
            "id": "day3-reference-decision",
            "required": true
          }
        ]
      },
      {
        "id": "day3-personal-design-direction",
        "activities": [
          {
            "id": "day3-three-direction-words",
            "required": true
          }
        ]
      },
      {
        "id": "day3-improve-personal-design",
        "activities": [
          {
            "id": "day3-design-change-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day3-mobile-keyboard-readability",
        "activities": [
          {
            "id": "day3-usability-check-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day3-save-before-after",
        "activities": [
          {
            "id": "day3-design-backup-and-evidence",
            "required": true
          }
        ]
      }
    ]
  },
  4: {
    "stages": [
      {
        "id": "day4-choose-one-user-action",
        "activities": [
          {
            "id": "day4-one-success-sentence",
            "required": true
          }
        ]
      },
      {
        "id": "day4-interaction-and-screen-state",
        "activities": [
          {
            "id": "day4-interaction-state-read",
            "required": false
          }
        ]
      },
      {
        "id": "day4-define-results-before-build",
        "activities": [
          {
            "id": "day4-result-rules",
            "required": true
          }
        ]
      },
      {
        "id": "day4-live-feature-demo",
        "activities": [
          {
            "id": "day4-live-feature-demo-read",
            "required": false
          }
        ]
      },
      {
        "id": "day4-common-filter-lab",
        "activities": [
          {
            "id": "day4-common-lab-evidence",
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
        "id": "day4-decide-edge-and-storage",
        "activities": [
          {
            "id": "day4-edge-storage-decision",
            "required": true
          }
        ]
      },
      {
        "id": "day4-build-personal-core-interaction",
        "activities": [
          {
            "id": "day4-core-interaction-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day4-partner-use-and-one-fix",
        "activities": [
          {
            "id": "day4-partner-fix-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day4-recheck-and-save",
        "activities": [
          {
            "id": "day4-working-backup-evidence",
            "required": true
          }
        ]
      }
    ]
  },
  5: {
    "stages": [
      {
        "id": "day5-write-one-user-task",
        "activities": [
          {
            "id": "day5-one-user-task",
            "required": true
          }
        ]
      },
      {
        "id": "day5-observe-without-explaining",
        "activities": [
          {
            "id": "day5-observation-method-read",
            "required": false
          }
        ]
      },
      {
        "id": "day5-first-cross-use",
        "activities": [
          {
            "id": "day5-first-use-observation",
            "required": true
          }
        ]
      },
      {
        "id": "day5-turn-observation-into-problem",
        "activities": [
          {
            "id": "day5-problem-statement",
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
        "id": "day5-choose-fix-priority",
        "activities": [
          {
            "id": "day5-fix-priority",
            "required": true
          }
        ]
      },
      {
        "id": "day5-fix-and-retest",
        "activities": [
          {
            "id": "day5-fix-retest-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day5-quality-and-public-safety",
        "activities": [
          {
            "id": "day5-release-check-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day5-upload-release-candidate",
        "activities": [
          {
            "id": "day5-release-candidate-url",
            "required": true
          }
        ]
      },
      {
        "id": "day5-other-environment-and-backup",
        "activities": [
          {
            "id": "day5-external-check-and-backup",
            "required": true
          }
        ]
      }
    ]
  },
  6: {
    "stages": [
      {
        "id": "day6-check-public-files-and-secrets",
        "activities": [
          {
            "id": "day6-public-folder-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day6-live-publish-and-republish-demo",
        "activities": [
          {
            "id": "day6-publish-demo-read",
            "required": false
          }
        ]
      },
      {
        "id": "day6-final-personal-publish",
        "activities": [
          {
            "id": "day6-final-url",
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
        "id": "day6-test-another-device",
        "activities": [
          {
            "id": "day6-other-device-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day6-fix-public-problem-and-republish",
        "activities": [
          {
            "id": "day6-republish-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day6-readme-and-qr",
        "activities": [
          {
            "id": "day6-handoff-and-qr-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day6-small-group-showcase",
        "activities": [
          {
            "id": "day6-showcase-evidence",
            "required": true
          }
        ]
      },
      {
        "id": "day6-next-step-and-reflection",
        "activities": [
          {
            "id": "day6-final-reflection",
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
