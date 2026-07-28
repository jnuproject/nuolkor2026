"use client";

import { useState } from "react";
import type { LessonActivity } from "@/content/interactive";
import type { LocalizedText } from "@/content/interactive/types";
import { interactiveText } from "@/content/translations/interactive-ko";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";
import { StageTimer } from "./StageTimer";

export type ActivityState = {
  value: unknown;
  completed: boolean;
};

type ActivityCardProps = {
  activity: LessonActivity;
  number: number;
  state?: ActivityState;
  onUpdate: (value: unknown, completed: boolean, persist?: boolean) => void;
};

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function recordValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function nestedRecords(value: unknown): Record<string, Record<string, string>> {
  const record = recordValue(value);
  return Object.fromEntries(
    Object.entries(record).map(([key, item]) => [
      key,
      Object.fromEntries(
        Object.entries(recordValue(item)).map(([field, fieldValue]) => [
          field,
          stringValue(fieldValue),
        ]),
      ),
    ]),
  );
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function textKey(value: LocalizedText): string {
  return typeof value === "string" ? value : value.en;
}

function promptFieldCount(prompt?: LocalizedText): number {
  if (!prompt) return 0;
  return textKey(prompt)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.endsWith(":")).length;
}

function textIsComplete(activity: LessonActivity, value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  if (activity.expected?.length) {
    const response = normalize(trimmed);
    const expectedCopy = activity.expected.map(textKey);
    const expected =
      expectedCopy.length === 1
        ? expectedCopy[0]
            .split(/[→,]/)
            .map((item) => item.trim())
            .filter(Boolean)
        : expectedCopy;
    return expected.every((item) => response.includes(normalize(item)));
  }

  const required = Math.max(
    1,
    activity.minimum ?? 1,
    promptFieldCount(activity.prompt),
  );
  if (required === 1) return trimmed.length >= 3;
  const lines = trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length >= required;
}

function isFieldGroup(items: LocalizedText[]): boolean {
  const joined = items.map(textKey).join(" ").toLowerCase();
  return (
    items.length <= 5 &&
    joined.includes("action") &&
    joined.includes("expected") &&
    joined.includes("actual")
  );
}

export function ActivityCard({
  activity,
  number,
  state,
  onUpdate,
}: ActivityCardProps) {
  const language = useLanguage();
  const [copied, setCopied] = useState(false);
  const value = state?.value;

  const header = (
    <header className="activity-card-header">
      <span>{String(number).padStart(2, "0")}</span>
      <div>
        <small>
          {uiText(language, activity.kind.replace("-", " "))}
          {activity.optional ? ` · ${uiText(language, "optional")}` : ""}
        </small>
        <h3>{interactiveText(language, activity.title)}</h3>
      </div>
      <i className={state?.completed ? "is-done" : ""}>
        {uiText(
          language,
          state?.completed ? "Done" : activity.optional ? "If needed" : "Do",
        ).toUpperCase()}
      </i>
    </header>
  );

  if (activity.kind === "timer") {
    return (
      <section className="activity-card activity-timer-card">
        {header}
        <p>{interactiveText(language, activity.instruction)}</p>
        {activity.content?.length ? (
          <div className="activity-hints">
            {activity.content.map((line, index) => (
              <span key={`${activity.id}-hint-${index}`}>
                {interactiveText(language, line)}
              </span>
            ))}
          </div>
        ) : null}
        <StageTimer minutes={activity.durationMinutes ?? 5} />
        <small className="timer-guide-note">
          {uiText(
            language,
            "The timer guides the activity. Your work, not the clock, is the completion evidence.",
          )}
        </small>
      </section>
    );
  }

  if (activity.kind === "checklist" || activity.kind === "watch") {
    const selected = stringArray(value);
    const items = activity.items ?? activity.content ?? [];
    const minimum = Math.min(activity.minimum ?? items.length, items.length);
    return (
      <section className="activity-card">
        {header}
        <p>{interactiveText(language, activity.instruction)}</p>
        <div className="interactive-checklist">
          {items.map((item, index) => {
            const itemKey = textKey(item);
            const checked = selected.includes(itemKey);
            return (
              <label key={`${activity.id}-check-${index}`}>
                <input
                  checked={checked}
                  onChange={() => {
                    const next = checked
                      ? selected.filter((entry) => entry !== itemKey)
                      : [...selected, itemKey];
                    onUpdate(next, next.length >= minimum);
                  }}
                  type="checkbox"
                />
                <span>{interactiveText(language, item)}</span>
              </label>
            );
          })}
        </div>
        {minimum < items.length ? (
          <small className="activity-requirement">
            {uiText(language, "Complete at least {minimum} of {total}.", {
              minimum,
              total: items.length,
            })}
          </small>
        ) : null}
      </section>
    );
  }

  if (activity.kind === "short-answer") {
    const fields = activity.content ?? [];
    if (fields.length) {
      const data = recordValue(value);
      const answers = recordValue(data.answers);
      const minimum = Math.min(activity.minimum ?? fields.length, fields.length);
      const update = (nextAnswers: Record<string, unknown>, persist = false) => {
        const filled = Object.values(nextAnswers).filter(
          (item) => stringValue(item).trim().length >= 2,
        ).length;
        onUpdate({ answers: nextAnswers }, filled >= minimum, persist);
      };

      return (
        <section className="activity-card">
          {header}
          <p>{interactiveText(language, activity.instruction)}</p>
          <div className="answer-field-grid">
            {fields.map((field, index) => {
              const fieldKey = textKey(field);
              return (
              <label key={`${activity.id}-field-${index}`}>
                <span>{interactiveText(language, field)}</span>
                <textarea
                  onBlur={() => update(answers, true)}
                  onChange={(event) =>
                    update({ ...answers, [fieldKey]: event.target.value })
                  }
                  placeholder={uiText(language, "Write your evidence…")}
                  rows={2}
                  value={stringValue(answers[fieldKey])}
                />
              </label>
              );
            })}
          </div>
          <small className="activity-requirement">
            {uiText(
              language,
              minimum === fields.length
                ? "Complete every field."
                : "Complete at least {minimum} fields.",
              { minimum },
            )}
          </small>
        </section>
      );
    }

    const text = stringValue(value);
    const required = Math.max(1, activity.minimum ?? 1, promptFieldCount(activity.prompt));
    return (
      <section className="activity-card">
        {header}
        <p>{interactiveText(language, activity.instruction)}</p>
        {activity.prompt ? (
          <pre className="answer-prompt">
            {interactiveText(language, activity.prompt)}
          </pre>
        ) : null}
        <textarea
          aria-label={interactiveText(language, activity.title)}
          onBlur={() => onUpdate(text, textIsComplete(activity, text), true)}
          onChange={(event) =>
            onUpdate(event.target.value, textIsComplete(activity, event.target.value), false)
          }
          placeholder={
            activity.placeholder
              ? interactiveText(language, activity.placeholder)
              : uiText(
                  language,
                  required > 1
                    ? "Use one line for each part…"
                    : "Write your evidence…",
                )
          }
          rows={Math.max(3, Math.min(9, required + 1))}
          value={text}
        />
        <small className="autosave-note">
          {activity.expected?.length
            ? uiText(
                language,
                "Check the requested words and order before you finish.",
              )
            : required > 1
              ? uiText(language, "Use at least {required} complete lines.", {
                  required,
                })
              : uiText(language, "Saved when you leave this box.")}
        </small>
      </section>
    );
  }

  if (activity.kind === "choice") {
    const selected = stringValue(value);
    const chosen = activity.options?.find((option) => option.value === selected);
    const inferredCorrect = (option: NonNullable<typeof chosen>) =>
      /^(correct|good)\b/i.test(
        option.feedback ? textKey(option.feedback) : "",
      );
    const expectedValues = activity.expected?.map(textKey) ?? [];
    const hasCorrectOption = Boolean(
      expectedValues.length ||
        activity.options?.some((option) => inferredCorrect(option)),
    );
    const isCorrect = Boolean(
      chosen &&
        (expectedValues.includes(chosen.value) ||
          (!expectedValues.length && inferredCorrect(chosen))),
    );

    return (
      <section className="activity-card">
        {header}
        <p>
          {interactiveText(language, activity.prompt ?? activity.instruction)}
        </p>
        <div className="choice-grid">
          {activity.options?.map((option) => (
            <button
              aria-pressed={selected === option.value}
              className={selected === option.value ? "is-selected" : ""}
              key={option.value}
              onClick={() =>
                onUpdate(
                  option.value,
                  hasCorrectOption
                    ? Boolean(
                        expectedValues.includes(option.value) ||
                          (!expectedValues.length && inferredCorrect(option)),
                      )
                    : true,
                )
              }
              type="button"
            >
              <span>{interactiveText(language, option.label)}</span>
            </button>
          ))}
        </div>
        {chosen?.feedback ? (
          <div
            className={`choice-feedback ${
              hasCorrectOption ? (isCorrect ? "is-correct" : "is-retry") : ""
            }`}
          >
            {interactiveText(language, chosen.feedback)}
          </div>
        ) : null}
      </section>
    );
  }

  if (activity.kind === "prompt") {
    const data = recordValue(value);
    const checks = stringArray(data.checks);
    const expected = activity.expected ?? [];
    const expectedKeys = expected.map(textKey);
    const prompt = interactiveText(
      language,
      activity.prompt ??
        activity.content
          ?.map((line) => interactiveText(language, line))
          .join("\n") ??
        "",
    );
    const confirmed = Boolean(data.confirmed);
    const complete = confirmed && checks.length === expectedKeys.length;

    return (
      <section className="activity-card activity-prompt-card">
        {header}
        <p>{interactiveText(language, activity.instruction)}</p>
        <div className="prompt-box">
          <pre>{prompt}</pre>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(prompt);
              setCopied(true);
              onUpdate({ ...data, copied: true, confirmed, checks }, complete);
              window.setTimeout(() => setCopied(false), 1600);
            }}
            type="button"
          >
            {uiText(language, copied ? "Copied ✓" : "Copy prompt")}
          </button>
        </div>
        {expected.length ? (
          <div className="interactive-checklist prompt-expectations">
            {expected.map((item, index) => {
              const itemKey = textKey(item);
              const checked = checks.includes(itemKey);
              return (
                <label key={`${activity.id}-expectation-${index}`}>
                  <input
                    checked={checked}
                    onChange={() => {
                      const nextChecks = checked
                        ? checks.filter((entry) => entry !== itemKey)
                        : [...checks, itemKey];
                      onUpdate(
                        { ...data, checks: nextChecks, confirmed },
                        confirmed && nextChecks.length === expectedKeys.length,
                      );
                    }}
                    type="checkbox"
                  />
                  <span>{interactiveText(language, item)}</span>
                </label>
              );
            })}
          </div>
        ) : null}
        <label className="prompt-confirmation">
          <input
            checked={confirmed}
            onChange={(event) => {
              const nextConfirmed = event.target.checked;
              onUpdate(
                { ...data, confirmed: nextConfirmed, checks },
                nextConfirmed && checks.length === expectedKeys.length,
              );
            }}
            type="checkbox"
          />
          <span>
            {activity.optional
              ? uiText(
                  language,
                  "I needed this, filled every bracket, and used the request.",
                )
              : uiText(
                  language,
                  "I filled every bracket, read the request, and used it in the coding tool.",
                )}
          </span>
        </label>
      </section>
    );
  }

  if (activity.kind === "test-record") {
    const data = recordValue(value);
    const explicitItems = activity.items ?? [];
    const content = activity.content ?? [];
    const fieldLabels =
      !explicitItems.length && content.length
        ? content
        : isFieldGroup(explicitItems)
          ? explicitItems
          : [];

    if (fieldLabels.length) {
      const fields = recordValue(data.fields);
      const minimum = Math.min(
        activity.minimum ?? fieldLabels.length,
        fieldLabels.length,
      );
      const update = (nextFields: Record<string, unknown>, persist = false) => {
        const filled = Object.values(nextFields).filter(
          (item) => stringValue(item).trim().length > 0,
        ).length;
        onUpdate({ ...data, fields: nextFields }, filled >= minimum, persist);
      };

      return (
        <section className="activity-card">
          {header}
          <p>{interactiveText(language, activity.instruction)}</p>
          <div className="test-field-group">
            {fieldLabels.map((field, index) => {
              const fieldKey = textKey(field);
              const isResult = /pass|not yet|result/i.test(fieldKey);
              return (
                <label key={`${activity.id}-test-field-${index}`}>
                  <span>{interactiveText(language, field)}</span>
                  {isResult ? (
                    <select
                      onChange={(event) => {
                        const next = {
                          ...fields,
                          [fieldKey]: event.target.value,
                        };
                        update(next, true);
                      }}
                      value={stringValue(fields[fieldKey])}
                    >
                      <option value="">{uiText(language, "Choose…")}</option>
                      <option value="PASS">{uiText(language, "Pass")}</option>
                      <option value="NOT YET">{uiText(language, "Not yet")}</option>
                    </select>
                  ) : (
                    <input
                      onBlur={() => update(fields, true)}
                      onChange={(event) =>
                        update({
                          ...fields,
                          [fieldKey]: event.target.value,
                        })
                      }
                      placeholder={uiText(language, "Record what you observed…")}
                      value={stringValue(fields[fieldKey])}
                    />
                  )}
                </label>
              );
            })}
          </div>
          {activity.expected?.length ? (
            <div className="test-quality-guide">
              <span>{uiText(language, "Check against").toUpperCase()}</span>
              {activity.expected.map((item, index) => (
                <p key={`${activity.id}-quality-${index}`}>
                  {interactiveText(language, item)}
                </p>
              ))}
            </div>
          ) : null}
        </section>
      );
    }

    const rows = explicitItems.length
      ? explicitItems
      : [{ en: "Browser test", ko: "브라우저 테스트" }];
    const expected = activity.expected ?? [];
    const pairedExpected = expected.length === rows.length;
    const draftMode =
      Boolean(expected.length && !pairedExpected) &&
      /do not run|write.*card|test card/i.test(
        `${textKey(activity.instruction)} ${textKey(activity.title)}`,
      );
    const rowData = nestedRecords(data.rows);
    const criteria = stringArray(data.criteria);
    const minimum = Math.min(activity.minimum ?? rows.length, rows.length);

    if (draftMode) {
      const completedRows = rows.filter((row) =>
        expected.every((field) =>
          stringValue(rowData[textKey(row)]?.[textKey(field)]).trim(),
        ),
      ).length;
      const update = (
        nextRows: Record<string, Record<string, string>>,
        persist = false,
      ) => {
        const done = rows.filter((row) =>
          expected.every((field) =>
            stringValue(nextRows[textKey(row)]?.[textKey(field)]).trim(),
          ),
        ).length;
        onUpdate({ ...data, rows: nextRows }, done >= minimum, persist);
      };

      return (
        <section className="activity-card">
          {header}
          <p>{interactiveText(language, activity.instruction)}</p>
          <div className="test-card-builder">
            {rows.map((row, rowIndex) => {
              const rowKey = textKey(row);
              return (
              <article key={`${activity.id}-draft-row-${rowIndex}`}>
                <strong>
                  {uiText(language, interactiveText(language, row))}
                </strong>
                {expected.map((field, fieldIndex) => {
                  const fieldKey = textKey(field);
                  return (
                  <label key={`${activity.id}-draft-field-${fieldIndex}`}>
                    <span>{interactiveText(language, field)}</span>
                    <input
                      onBlur={() => update(rowData, true)}
                      onChange={(event) =>
                        update({
                          ...rowData,
                          [rowKey]: {
                            ...rowData[rowKey],
                            [fieldKey]: event.target.value,
                          },
                        })
                      }
                      value={stringValue(rowData[rowKey]?.[fieldKey])}
                    />
                  </label>
                  );
                })}
              </article>
              );
            })}
          </div>
          <small className="activity-requirement">
            {uiText(
              language,
              "{done}/{minimum} required test cards complete",
              { done: completedRows, minimum },
            )}
          </small>
        </section>
      );
    }

    const completedRows = rows.filter(
      (row) =>
        stringValue(rowData[textKey(row)]?.actual).trim() &&
        stringValue(rowData[textKey(row)]?.result),
    ).length;
    const globalCriteria = pairedExpected ? [] : expected;
    const complete =
      completedRows >= minimum &&
      globalCriteria.every((item) => criteria.includes(textKey(item)));
    const updateRows = (
      nextRows: Record<string, Record<string, string>>,
      nextCriteria = criteria,
      persist = false,
    ) => {
      const done = rows.filter(
        (row) =>
          stringValue(nextRows[textKey(row)]?.actual).trim() &&
          stringValue(nextRows[textKey(row)]?.result),
      ).length;
      onUpdate(
        { ...data, rows: nextRows, criteria: nextCriteria },
        done >= minimum &&
          globalCriteria.every((item) =>
            nextCriteria.includes(textKey(item)),
          ),
        persist,
      );
    };

    return (
      <section className="activity-card">
        {header}
        <p>{interactiveText(language, activity.instruction)}</p>
        <div className="multi-test-record">
          {rows.map((row, index) => {
            const rowKey = textKey(row);
            return (
            <article key={`${activity.id}-test-row-${index}`}>
              <header>
                <span>
                  {uiText(language, "Test {number}", {
                    number: String(index + 1).padStart(2, "0"),
                  }).toUpperCase()}
                </span>
                <strong>
                  {uiText(language, interactiveText(language, row))}
                </strong>
                {pairedExpected ? (
                  <small>
                    {uiText(language, "Expected: {expected}", {
                      expected: interactiveText(language, expected[index]),
                    })}
                  </small>
                ) : null}
              </header>
              <label>
                <span>{uiText(language, "Actual result").toUpperCase()}</span>
                <input
                  onBlur={() => updateRows(rowData, criteria, true)}
                  onChange={(event) =>
                    updateRows({
                      ...rowData,
                      [rowKey]: {
                        ...rowData[rowKey],
                        actual: event.target.value,
                      },
                    })
                  }
                  placeholder={uiText(language, "What really happened?")}
                  value={stringValue(rowData[rowKey]?.actual)}
                />
              </label>
              <div className="test-result-buttons">
                {["PASS", "NOT YET"].map((option) => (
                  <button
                    aria-pressed={rowData[rowKey]?.result === option}
                    className={
                      rowData[rowKey]?.result === option ? "is-selected" : ""
                    }
                    key={option}
                    onClick={() => {
                      const nextRows = {
                        ...rowData,
                        [rowKey]: { ...rowData[rowKey], result: option },
                      };
                      updateRows(nextRows, criteria, true);
                    }}
                    type="button"
                  >
                    {uiText(language, option === "PASS" ? "Pass" : "Not yet")}
                  </button>
                ))}
              </div>
            </article>
            );
          })}
        </div>
        {globalCriteria.length ? (
          <div className="interactive-checklist test-criteria">
            <strong>{uiText(language, "Final check").toUpperCase()}</strong>
            {globalCriteria.map((item, index) => {
              const itemKey = textKey(item);
              const checked = criteria.includes(itemKey);
              return (
                <label key={`${activity.id}-criterion-${index}`}>
                  <input
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? criteria.filter((entry) => entry !== itemKey)
                        : [...criteria, itemKey];
                      updateRows(rowData, next, true);
                    }}
                    type="checkbox"
                  />
                  <span>{interactiveText(language, item)}</span>
                </label>
              );
            })}
          </div>
        ) : null}
        <small className="activity-requirement">
          {complete
            ? uiText(language, "Evidence recorded ✓")
            : uiText(language, "{done}/{minimum} required tests recorded", {
                done: completedRows,
                minimum,
              })}
        </small>
      </section>
    );
  }

  if (activity.kind === "peer") {
    const data = recordValue(value);
    const checks = stringArray(data.checks);
    const observation = stringValue(data.observation);
    const items =
      activity.items ??
      activity.expected ??
      activity.content ??
      ["Show", "Test", "Switch"];
    const minimum = Math.min(activity.minimum ?? items.length, items.length);
    const complete = checks.length >= minimum && observation.trim().length > 2;

    return (
      <section className="activity-card">
        {header}
        <p>{interactiveText(language, activity.instruction)}</p>
        <div className="interactive-checklist">
          {items.map((item, index) => {
            const itemKey = textKey(item);
            const checked = checks.includes(itemKey);
            return (
              <label key={`${activity.id}-peer-${index}`}>
                <input
                  checked={checked}
                  onChange={() => {
                    const nextChecks = checked
                      ? checks.filter((entry) => entry !== itemKey)
                      : [...checks, itemKey];
                    onUpdate(
                      { ...data, checks: nextChecks, observation },
                      nextChecks.length >= minimum && observation.trim().length > 2,
                    );
                  }}
                  type="checkbox"
                />
                <span>
                  {uiText(language, interactiveText(language, item))}
                </span>
              </label>
            );
          })}
        </div>
        <textarea
          onBlur={() =>
            onUpdate({ ...data, checks, observation }, complete, true)
          }
          onChange={(event) =>
            onUpdate(
              { ...data, checks, observation: event.target.value },
              checks.length >= minimum && event.target.value.trim().length > 2,
              false,
            )
          }
          placeholder={
            activity.placeholder
              ? interactiveText(language, activity.placeholder)
              : uiText(language, "Record one thing your partner observed…")
          }
          rows={2}
          value={observation}
        />
        <small className="activity-requirement">
          {uiText(
            language,
            minimum === 1
              ? "Check at least {minimum} item and record one observation."
              : "Check at least {minimum} items and record one observation.",
            { minimum },
          )}
        </small>
      </section>
    );
  }

  const reviewed = Boolean(recordValue(value).reviewed);
  return (
    <section className="activity-card">
      {header}
      <p>{interactiveText(language, activity.instruction)}</p>
      {activity.content?.length ? (
        <div className="read-points">
          {activity.content.map((line, index) => (
            <p key={`${activity.id}-read-${index}`}>
              {interactiveText(language, line)}
            </p>
          ))}
        </div>
      ) : null}
      {activity.items?.length ? (
        <ul className="read-list">
          {activity.items.map((item, index) => (
            <li key={`${activity.id}-item-${index}`}>
              {interactiveText(language, item)}
            </li>
          ))}
        </ul>
      ) : null}
      <button
        className="activity-done-button"
        onClick={() => onUpdate({ reviewed: !reviewed }, !reviewed)}
        type="button"
      >
        {uiText(language, reviewed ? "Reviewed ✓" : "I reviewed this")}
      </button>
    </section>
  );
}
