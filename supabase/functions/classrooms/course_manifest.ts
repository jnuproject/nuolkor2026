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
        "id": "day1-finished-demo",
        "activities": [
          {
            "id": "day1-finished-demo-read",
            "required": false
          }
        ]
      },
      {
        "id": "day1-three-layers",
        "activities": [
          {
            "id": "day1-three-layers-choice",
            "required": true
          }
        ]
      },
      {
        "id": "day1-bot-token",
        "activities": [
          {
            "id": "day1-bot-token-checklist",
            "required": true
          }
        ]
      },
      {
        "id": "day1-first-send",
        "activities": [
          {
            "id": "day1-first-send-prompt",
            "required": true
          },
          {
            "id": "day1-first-send-arrived",
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
        "id": "day1-read-and-ask",
        "activities": [
          {
            "id": "day1-read-and-ask-prompt",
            "required": true
          },
          {
            "id": "day1-read-and-ask-notes",
            "required": true
          }
        ]
      },
      {
        "id": "day1-model-answers",
        "activities": [
          {
            "id": "day1-model-answers-receive",
            "required": true
          },
          {
            "id": "day1-model-answers-reply",
            "required": true
          }
        ]
      },
      {
        "id": "day1-character",
        "activities": [
          {
            "id": "day1-character-decide",
            "required": true
          },
          {
            "id": "day1-character-prompt",
            "required": true
          }
        ]
      },
      {
        "id": "day1-secrets-and-save",
        "activities": [
          {
            "id": "day1-secrets-checklist",
            "required": true
          }
        ]
      }
    ]
  },
  2: {
    "stages": [
      {
        "id": "day2-rerun-yesterday",
        "activities": [
          {
            "id": "day2-rerun-yesterday-check",
            "required": true
          }
        ]
      },
      {
        "id": "day2-polling",
        "activities": [
          {
            "id": "day2-polling-choice",
            "required": true
          }
        ]
      },
      {
        "id": "day2-connect-feed",
        "activities": [
          {
            "id": "day2-connect-feed-prompt",
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
        "id": "day2-what-to-remember",
        "activities": [
          {
            "id": "day2-what-to-remember-answer",
            "required": true
          }
        ]
      },
      {
        "id": "day2-prove-memory",
        "activities": [
          {
            "id": "day2-prove-memory-prompt",
            "required": true
          },
          {
            "id": "day2-prove-memory-record",
            "required": true
          }
        ]
      },
      {
        "id": "day2-own-source",
        "activities": [
          {
            "id": "day2-own-source-check",
            "required": true
          }
        ]
      },
      {
        "id": "day2-survive-and-save",
        "activities": [
          {
            "id": "day2-survive-prompt",
            "required": true
          },
          {
            "id": "day2-save-checklist",
            "required": true
          }
        ]
      }
    ]
  },
  3: {
    "stages": [
      {
        "id": "day3-code-vs-model",
        "activities": [
          {
            "id": "day3-code-vs-model-choice",
            "required": true
          },
          {
            "id": "day3-code-vs-model-answer",
            "required": true
          }
        ]
      },
      {
        "id": "day3-structured-output",
        "activities": [
          {
            "id": "day3-structured-output-prompt",
            "required": true
          }
        ]
      },
      {
        "id": "day3-function-calling",
        "activities": [
          {
            "id": "day3-function-calling-choice",
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
        "id": "day3-two-tools",
        "activities": [
          {
            "id": "day3-two-tools-prompt",
            "required": true
          },
          {
            "id": "day3-two-tools-record",
            "required": true
          }
        ]
      },
      {
        "id": "day3-wrong-choice",
        "activities": [
          {
            "id": "day3-wrong-choice-prompt",
            "required": true
          },
          {
            "id": "day3-wrong-choice-record",
            "required": true
          }
        ]
      },
      {
        "id": "day3-defend",
        "activities": [
          {
            "id": "day3-defend-prompt",
            "required": true
          }
        ]
      },
      {
        "id": "day3-save",
        "activities": [
          {
            "id": "day3-save-checklist",
            "required": true
          }
        ]
      }
    ]
  },
  4: {
    "stages": [
      {
        "id": "day4-choose-topic",
        "activities": [
          {
            "id": "day4-choose-topic-answer",
            "required": true
          },
          {
            "id": "day4-choose-topic-check",
            "required": true
          }
        ]
      },
      {
        "id": "day4-build-tool",
        "activities": [
          {
            "id": "day4-build-tool-prompt",
            "required": true
          },
          {
            "id": "day4-build-tool-record",
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
        "id": "day4-orchestration",
        "activities": [
          {
            "id": "day4-orchestration-answer",
            "required": true
          }
        ]
      },
      {
        "id": "day4-isolate-failures",
        "activities": [
          {
            "id": "day4-isolate-prompt",
            "required": true
          },
          {
            "id": "day4-isolate-check",
            "required": true
          }
        ]
      },
      {
        "id": "day4-partner",
        "activities": [
          {
            "id": "day4-partner-observe",
            "required": true
          },
          {
            "id": "day4-partner-fix",
            "required": true
          }
        ]
      },
      {
        "id": "day4-save",
        "activities": [
          {
            "id": "day4-save-checklist",
            "required": true
          }
        ]
      }
    ]
  },
  5: {
    "stages": [
      {
        "id": "day5-what-is-mcp",
        "activities": [
          {
            "id": "day5-what-is-mcp-choice",
            "required": true
          }
        ]
      },
      {
        "id": "day5-wrap-tool",
        "activities": [
          {
            "id": "day5-wrap-tool-prompt",
            "required": true
          }
        ]
      },
      {
        "id": "day5-register",
        "activities": [
          {
            "id": "day5-register-checklist",
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
        "id": "day5-make-it-use",
        "activities": [
          {
            "id": "day5-make-it-use-record",
            "required": true
          }
        ]
      },
      {
        "id": "day5-fix-description",
        "activities": [
          {
            "id": "day5-fix-description-prompt",
            "required": true
          },
          {
            "id": "day5-fix-description-record",
            "required": true
          }
        ]
      },
      {
        "id": "day5-same-principle",
        "activities": [
          {
            "id": "day5-same-principle-answer",
            "required": true
          }
        ]
      },
      {
        "id": "day5-save",
        "activities": [
          {
            "id": "day5-save-checklist",
            "required": true
          }
        ]
      }
    ]
  },
  6: {
    "stages": [
      {
        "id": "day6-fix-not-add",
        "activities": [
          {
            "id": "day6-fix-checklist",
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
        "id": "day6-showcase",
        "activities": [
          {
            "id": "day6-showcase-peer",
            "required": true
          }
        ]
      },
      {
        "id": "day6-use-others",
        "activities": [
          {
            "id": "day6-use-others-record",
            "required": true
          }
        ]
      },
      {
        "id": "day6-reflect",
        "activities": [
          {
            "id": "day6-reflect-answer",
            "required": true
          }
        ]
      },
      {
        "id": "day6-what-next",
        "activities": [
          {
            "id": "day6-what-next-read",
            "required": false
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
