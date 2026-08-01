"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { uiText } from "@/content/translations/ui-ko";
import { useLanguage } from "@/lib/language";
import { sitePath } from "@/lib/site-path";
import { LanguageToggle } from "../LanguageToggle";

type OperatingSystem = "mac" | "windows";
type SetupStatus = "green" | "yellow" | "red";

type SetupStep = {
  id: string;
  label: string;
  title: string;
  minutes: string;
  intro: string;
  checks: string[];
};

const steps: SetupStep[] = [
  {
    id: "prepare",
    label: "PREPARE",
    title: "Choose your computer path",
    minutes: "5 min",
    intro:
      "Use one computer for the course. You need a terminal and an NVIDIA account.",
    checks: [
      "I know which operating system I am using.",
      "I can open a terminal.",
      "I can sign in to build.nvidia.com.",
    ],
  },
  {
    id: "key",
    label: "ACCESS",
    title: "Create and protect your API key",
    minutes: "10 min",
    intro:
      "Create a free NVIDIA API key. Treat it like a password and never paste it into this website.",
    checks: [
      "I created my own NVIDIA API key.",
      "I stored the key privately.",
      "The key is not visible in a screenshot, chat, file, or message.",
    ],
  },
  {
    id: "install",
    label: "INSTALL",
    title: "Install OpenCode",
    minutes: "15–30 min",
    intro:
      "Run the command for your computer, open a fresh terminal, and verify the installation.",
    checks: [
      "The install command finished without an unresolved error.",
      "I opened a new terminal after installation.",
      "The version command shows an OpenCode version.",
    ],
  },
  {
    id: "connect",
    label: "CONNECT",
    title: "Connect NVIDIA inside OpenCode",
    minutes: "10 min",
    intro:
      "Connect the provider from inside OpenCode. The API key belongs only in the provider key box.",
    checks: [
      "I opened OpenCode inside my practice folder.",
      "I selected NVIDIA after using /connect.",
      "I selected the class model after using /models.",
    ],
  },
  {
    id: "response",
    label: "CHECK",
    title: "Check the model response",
    minutes: "5 min",
    intro:
      "Send a request that cannot change a file. Confirm the exact reply before moving on.",
    checks: [
      "The AI replied with READY.",
      "No file was created, edited, renamed, or deleted.",
    ],
  },
  {
    id: "file",
    label: "PROVE",
    title: "Create one safe test file",
    minutes: "5 min",
    intro:
      "Ask OpenCode to create one exact file, then inspect the folder yourself.",
    checks: [
      "setup-check.txt is inside my practice folder.",
      "The file contains one line: READY.",
      "No other file changed.",
    ],
  },
];

const installCommands: Record<OperatingSystem, string> = {
  mac: "curl -fsSL https://opencode.ai/install | bash",
  windows: "npm install -g opencode-ai",
};

const openCommands: Record<OperatingSystem, string> = {
  mac: "cd /path/to/practice-folder\nopencode",
  windows: "cd C:\\path\\to\\practice-folder\nopencode",
};

const safeResponsePrompt =
  "Reply with only the word READY.\nDo not create, edit, rename, or delete any file.";
const safeResponsePromptKo =
  "READY라는 단어로만 답하세요.\n어떤 파일도 생성, 수정, 이름 변경 또는 삭제하지 마세요.";

const filePrompt =
  "Create a file named setup-check.txt.\nWrite only this line in the file: READY\nDo not change any other file.";
const filePromptKo =
  "setup-check.txt라는 파일을 만드세요.\n파일에는 다음 한 줄만 작성하세요: READY\n다른 파일은 변경하지 마세요.";

function CodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const language = useLanguage();

  return (
    <div className="setup-code">
      <pre>{code}</pre>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        }}
        type="button"
      >
        {uiText(language, copied ? "Copied ✓" : "Copy")}
      </button>
    </div>
  );
}

export function SetupFlow() {
  const language = useLanguage();
  const [active, setActive] = useState(0);
  const [os, setOs] = useState<OperatingSystem>("mac");
  const [checks, setChecks] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<SetupStatus | null>(null);
  const storageKey = "build-loop:setup:v2";
  const step = steps[active];
  const selected = checks[step.id] ?? [];
  const stepComplete = selected.length === step.checks.length;
  const completeCount = steps.filter(
    (item) => (checks[item.id] ?? []).length === item.checks.length,
  ).length;
  const allStepsComplete = completeCount === steps.length;
  const canOpenDayOne = allStepsComplete && status !== null;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved) as {
          active?: number;
          os?: OperatingSystem;
          checks?: Record<string, string[]>;
          status?: SetupStatus | null;
        };
        const restoredChecks = parsed.checks ?? {};
        const restoredStatus = ["green", "yellow", "red"].includes(
          parsed.status ?? "",
        )
          ? parsed.status ?? null
          : null;
        setActive(Math.max(0, Math.min(steps.length - 1, parsed.active ?? 0)));
        setOs(parsed.os === "windows" ? "windows" : "mac");
        setChecks(restoredChecks);
        setStatus(
          steps.every(
            (item) =>
              (restoredChecks[item.id] ?? []).length === item.checks.length,
          )
            ? restoredStatus
            : null,
        );
      } catch {
        localStorage.removeItem(storageKey);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function persist(
    nextChecks = checks,
    nextActive = active,
    nextOs = os,
    nextStatus = status,
  ) {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        active: nextActive,
        os: nextOs,
        checks: nextChecks,
        status: nextStatus,
      }),
    );
  }

  function toggleCheck(item: string) {
    const nextSelected = selected.includes(item)
      ? selected.filter((value) => value !== item)
      : [...selected, item];
    const nextChecks = { ...checks, [step.id]: nextSelected };
    const nextAllStepsComplete = steps.every(
      (entry) =>
        (nextChecks[entry.id] ?? []).length === entry.checks.length,
    );
    const nextStatus = nextAllStepsComplete ? status : null;
    setChecks(nextChecks);
    setStatus(nextStatus);
    persist(nextChecks, active, os, nextStatus);
  }

  function goTo(next: number) {
    const bounded = Math.max(0, Math.min(steps.length - 1, next));
    setActive(bounded);
    persist(checks, bounded);
  }

  const stepTool = (() => {
    if (step.id === "prepare") {
      return (
        <div className="setup-os-choice">
          <span>{uiText(language, "My computer").toUpperCase()}</span>
          <div>
            {(["mac", "windows"] as const).map((value) => (
              <button
                aria-pressed={os === value}
                className={os === value ? "is-selected" : ""}
                key={value}
                onClick={() => {
                  setOs(value);
                  persist(checks, active, value);
                }}
                type="button"
              >
                {value === "mac" ? "macOS" : "Windows"}
              </button>
            ))}
          </div>
          <p>
            {os === "mac"
              ? uiText(language, "Use Terminal.app or another terminal.")
              : uiText(language, "Windows Terminal with PowerShell is recommended.")}
          </p>
        </div>
      );
    }

    if (step.id === "key") {
      return (
        <div className="setup-action-panel">
          <a href="https://build.nvidia.com" rel="noreferrer" target="_blank">
            {uiText(language, "Open NVIDIA Build ↗")}
          </a>
          <ol>
            <li>{uiText(language, "Sign in or create an account.")}</li>
            <li>{uiText(language, "Open the model page chosen by your instructor.")}</li>
            <li>{uiText(language, "Select Get API Key, then Generate API Key.")}</li>
            <li>{uiText(language, "Keep the nvapi-… value private.")}</li>
          </ol>
          <strong>
            {uiText(language, "Never enter your API key on this course website.")}
          </strong>
        </div>
      );
    }

    if (step.id === "install") {
      return (
        <div className="setup-command-stack">
          <span>{uiText(language, "1 · Install").toUpperCase()}</span>
          <CodeCopy code={installCommands[os]} />
          <span>{uiText(language, "2 · Verify in a new terminal").toUpperCase()}</span>
          <CodeCopy code="opencode --version" />
          <p>
            {uiText(
              language,
              "If the command is not found, stop and use the detailed guide or ask the instructor. Do not change unrelated computer settings.",
            )}
          </p>
        </div>
      );
    }

    if (step.id === "connect") {
      return (
        <div className="setup-command-stack">
          <span>{uiText(language, "1 · Open your practice folder").toUpperCase()}</span>
          <CodeCopy code={openCommands[os]} />
          <span>{uiText(language, "2 · Connect the provider").toUpperCase()}</span>
          <CodeCopy code="/connect" />
          <p>
            {uiText(
              language,
              "Select NVIDIA. Paste your key only when OpenCode shows its API key box.",
            )}
          </p>
          <span>{uiText(language, "3 · Choose the class model").toUpperCase()}</span>
          <CodeCopy code="/models" />
        </div>
      );
    }

    if (step.id === "response") {
      return (
        <CodeCopy
          code={language === "ko" ? safeResponsePromptKo : safeResponsePrompt}
        />
      );
    }

    return <CodeCopy code={language === "ko" ? filePromptKo : filePrompt} />;
  })();

  return (
    <main className="setup-flow">
      <header className="setup-flow-header">
        <Link className="runner-brand" href="/">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </Link>
        <div>
          <span>{uiText(language, "Before Day 1").toUpperCase()}</span>
          <strong>{uiText(language, "Setup check").toUpperCase()}</strong>
        </div>
        <div>
          <Link href="/instructor/start">
            {uiText(language, "Instructor guide →")}
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <div className="setup-flow-layout">
        <aside className="setup-flow-rail">
          <div>
            <span>{uiText(language, "Ready").toUpperCase()}</span>
            <strong>
              {completeCount}/{steps.length}
            </strong>
            <i>
              <b style={{ width: `${(completeCount / steps.length) * 100}%` }} />
            </i>
          </div>
          <nav aria-label={uiText(language, "Setup steps")}>
            {steps.map((item, index) => {
              const done = (checks[item.id] ?? []).length === item.checks.length;
              return (
                <button
                  aria-current={index === active ? "step" : undefined}
                  className={`${index === active ? "is-active" : ""} ${done ? "is-done" : ""}`}
                  key={item.id}
                  onClick={() => goTo(index)}
                  type="button"
                >
                  <span>{done ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{uiText(language, item.label)}</small>
                    <strong>{uiText(language, item.title)}</strong>
                  </div>
                </button>
              );
            })}
          </nav>
          <a
            href={
              language === "ko"
                ? sitePath("/downloads/setting.html")
                : "https://opencode.ai/docs/providers/#nvidia"
            }
            rel="noreferrer"
            target="_blank"
          >
            {uiText(language, "Open detailed setup guide ↗")}
          </a>
        </aside>

        <section className="setup-flow-main">
          <header>
            <div>
              <span>{uiText(language, step.label)}</span>
              <small>
                {uiText(language, "Step {current} / {total} · {minutes}", {
                  current: active + 1,
                  total: steps.length,
                  minutes:
                    language === "ko"
                      ? step.minutes.replace(" min", "분")
                      : step.minutes,
                })}
              </small>
            </div>
            <h1>{uiText(language, step.title)}</h1>
            <p>{uiText(language, step.intro)}</p>
          </header>

          <div className="setup-tool">{stepTool}</div>

          <section className="setup-proof">
            <span>{uiText(language, "Check the result yourself").toUpperCase()}</span>
            <div>
              {step.checks.map((item) => (
                <label key={item}>
                  <input
                    checked={selected.includes(item)}
                    onChange={() => toggleCheck(item)}
                    type="checkbox"
                  />
                  <span>{uiText(language, item)}</span>
                </label>
              ))}
            </div>
          </section>

          {active === steps.length - 1 && allStepsComplete ? (
            <section
              className={`setup-final-status${status ? ` status-${status}` : ""}`}
            >
              <div>
                <span>{uiText(language, "My setup status").toUpperCase()}</span>
                <strong>
                  {status === null
                    ? language === "ko"
                      ? "아래에서 현재 상태를 선택하세요."
                      : "Choose your current status below."
                    : status === "green"
                    ? uiText(language, "Everything works")
                    : status === "yellow"
                      ? uiText(language, "OpenCode opens, but one check needs help")
                      : uiText(language, "OpenCode does not open")}
                </strong>
              </div>
              <div>
                {(["green", "yellow", "red"] as const).map((value) => (
                  <button
                    aria-pressed={status === value}
                    className={status === value ? "is-active" : ""}
                    key={value}
                    onClick={() => {
                      setStatus(value);
                      persist(checks, active, os, value);
                    }}
                    type="button"
                  >
                    {value === "green" ? "✓" : value === "yellow" ? "?" : "!"}{" "}
                    {uiText(language, value)}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <footer>
            <button disabled={active === 0} onClick={() => goTo(active - 1)} type="button">
              ← {uiText(language, "Previous")}
            </button>
            <span>
              {active === steps.length - 1 && stepComplete && !allStepsComplete
                ? language === "ko"
                  ? "남은 설정 단계를 모두 완료하세요"
                  : "Complete the remaining setup steps"
                : active === steps.length - 1 &&
                    allStepsComplete &&
                    status === null
                  ? language === "ko"
                    ? "현재 설정 상태를 선택하세요"
                    : "Choose your current setup status"
                  : uiText(
                      language,
                      stepComplete
                        ? "Step complete ✓"
                        : "Complete every check to continue",
                    )}
            </span>
            {active < steps.length - 1 ? (
              <button
                className="setup-next"
                disabled={!stepComplete}
                onClick={() => goTo(active + 1)}
                type="button"
              >
                {uiText(language, "Next step →")}
              </button>
            ) : (
              <Link
                aria-disabled={!canOpenDayOne}
                className={`setup-next ${canOpenDayOne ? "" : "is-disabled"}`}
                href={canOpenDayOne ? "/day/1" : "#"}
                onClick={(event) => {
                  if (!canOpenDayOne) event.preventDefault();
                }}
                tabIndex={canOpenDayOne ? undefined : -1}
              >
                {uiText(language, "Open Day 1 →")}
              </Link>
            )}
          </footer>
        </section>

        <aside className="setup-safety">
          <span>{uiText(language, "Key safety").toUpperCase()}</span>
          <strong>{uiText(language, "Your key is a password.")}</strong>
          <ul>
            <li>{uiText(language, "Use only the provider key box.")}</li>
            <li>{uiText(language, "Never paste it into an AI prompt.")}</li>
            <li>{uiText(language, "Never put it in a project file.")}</li>
            <li>{uiText(language, "Never show it in a screenshot.")}</li>
          </ul>
          <p>{uiText(language, "If exposed, revoke it and make a new key.")}</p>
        </aside>
      </div>
    </main>
  );
}

const instructorChecks = [
  {
    id: "room",
    titleEn: "Devices and accounts",
    title: "장비·계정",
    checks: [
      {
        en: "I checked the operating systems and number of student computers.",
        ko: "학생 PC 운영체제와 수량을 확인했다.",
      },
      {
        en: "I checked whether administrator access is required.",
        ko: "관리자 권한 필요 여부를 확인했다.",
      },
      {
        en: "I checked the NVIDIA account creation and verification process.",
        ko: "NVIDIA 계정 생성·인증 절차를 확인했다.",
      },
      {
        en: "I chose a shared practice-folder name and backup method.",
        ko: "공통 실습 폴더명과 백업 방식을 정했다.",
      },
    ],
  },
  {
    id: "tool",
    titleEn: "OpenCode and models",
    title: "OpenCode·모델",
    checks: [
      {
        en: "I tested installation on both macOS and Windows.",
        ko: "macOS와 Windows 설치를 각각 시험했다.",
      },
      {
        en: "I confirmed that NVIDIA appears after /connect.",
        ko: "/connect에서 NVIDIA가 표시되는지 확인했다.",
      },
      {
        en: "I chose one class model and one backup model.",
        ko: "수업에 사용할 모델 하나와 대체 모델 하나를 정했다.",
      },
      {
        en: "The model passed the safe file-creation test.",
        ko: "모델이 안전한 파일 생성 테스트를 통과했다.",
      },
    ],
  },
  {
    id: "network",
    titleEn: "Network and recovery",
    title: "네트워크·복구",
    checks: [
      {
        en: "I tested the real classroom Wi-Fi connection.",
        ko: "강의실 Wi-Fi에서 실제 연결을 확인했다.",
      },
      {
        en: "I tested simultaneous requests from multiple devices.",
        ko: "여러 기기에서 동시 요청을 시험했다.",
      },
      {
        en: "I set the response sequence for 401, 429, and timeout errors.",
        ko: "401·429·timeout 대응 순서를 정했다.",
      },
      {
        en: "I prepared the shared offline files.",
        ko: "오프라인 공통 파일을 준비했다.",
      },
    ],
  },
];

export function InstructorSetupConsole() {
  const language = useLanguage();
  const [checks, setChecks] = useState<string[]>([]);
  const [green, setGreen] = useState(0);
  const [yellow, setYellow] = useState(0);
  const [red, setRed] = useState(0);
  const total = green + yellow + red;
  const ratio = total ? Math.round((green / total) * 100) : 0;
  const decision =
    total === 0 ? "Waiting" : ratio >= 90 ? "Green" : ratio >= 70 ? "Yellow" : "Red";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = localStorage.getItem("build-loop:instructor-setup:v2");
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved) as {
          checks?: string[];
          green?: number;
          yellow?: number;
          red?: number;
        };
        setChecks(parsed.checks ?? []);
        setGreen(parsed.green ?? 0);
        setYellow(parsed.yellow ?? 0);
        setRed(parsed.red ?? 0);
      } catch {
        localStorage.removeItem("build-loop:instructor-setup:v2");
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function save(nextChecks: string[], nextGreen = green, nextYellow = yellow, nextRed = red) {
    localStorage.setItem(
      "build-loop:instructor-setup:v2",
      JSON.stringify({
        checks: nextChecks,
        green: nextGreen,
        yellow: nextYellow,
        red: nextRed,
      }),
    );
  }

  return (
    <main className="instructor-setup-console">
      <header className="instructor-plan-header">
        <Link className="runner-brand" href="/">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </Link>
        <div>
          <span>{uiText(language, "Before Day 1 · Instructor").toUpperCase()}</span>
          <strong>{uiText(language, "Setup operations console")}</strong>
        </div>
        <div>
          <a
            href={
              language === "ko"
                ? sitePath("/downloads/setting.html")
                : "https://opencode.ai/docs/providers/#nvidia"
            }
            rel="noreferrer"
            target="_blank"
          >
            {uiText(language, "Open detailed setup guide ↗")}
          </a>
          <Link className="start-live-link" href="/start">
            {uiText(language, "Student screen")}
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <section className="instructor-setup-hero">
        <div>
          <span className="eyebrow">
            {uiText(language, "Pre-flight check").toUpperCase()}
          </span>
          <h1>
            {uiText(
              language,
              "Resolve technical issues before the regular 18-hour course.",
            )}
          </h1>
          <p>
            {uiText(
              language,
              "The existing OpenCode + NVIDIA setup sequence stays the same. This console helps the instructor complete pre-class checks and make a clear start decision.",
            )}
          </p>
        </div>
        <div className={`readiness-decision decision-${decision.toLowerCase()}`}>
          <span>{uiText(language, "Class start decision")}</span>
          <strong>{uiText(language, decision).toUpperCase()}</strong>
          <small>
            {total
              ? uiText(language, "Green {ratio}% · {total} students", {
                  ratio,
                  total,
                })
              : uiText(language, "Enter student status counts")}
          </small>
        </div>
      </section>

      <section className="setup-roster-counts">
        {[
          { label: "GREEN · All tests complete", value: green, setter: setGreen },
          { label: "YELLOW · Some help needed", value: yellow, setter: setYellow },
          { label: "RED · OpenCode cannot run", value: red, setter: setRed },
        ].map((item) => (
          <label key={item.label}>
            <span>{uiText(language, item.label)}</span>
            <input
              inputMode="numeric"
              min={0}
              onChange={(event) => {
                const value = Math.max(0, Number(event.target.value) || 0);
                item.setter(value);
                const values =
                  item.setter === setGreen
                    ? [value, yellow, red]
                    : item.setter === setYellow
                      ? [green, value, red]
                      : [green, yellow, value];
                save(checks, values[0], values[1], values[2]);
              }}
              type="number"
              value={item.value}
            />
          </label>
        ))}
      </section>

      <section className="instructor-setup-grid">
        {instructorChecks.map((group) => (
          <article key={group.id}>
            <header>
              <span>{String(instructorChecks.indexOf(group) + 1).padStart(2, "0")}</span>
              <h2>
                {language === "ko" ? group.title : group.titleEn}
              </h2>
            </header>
            <div>
              {group.checks.map((item) => (
                <label key={item.ko}>
                  <input
                    checked={checks.includes(item.ko)}
                    onChange={() => {
                      const next = checks.includes(item.ko)
                        ? checks.filter((value) => value !== item.ko)
                        : [...checks, item.ko];
                      setChecks(next);
                      save(next);
                    }}
                    type="checkbox"
                  />
                  <span>{uiText(language, item.en)}</span>
                </label>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="setup-decision-guide">
        <article>
          <strong>{uiText(language, "GREEN · 90% or more")}</strong>
          <p>
            {uiText(
              language,
              "Proceed normally. On Day 1, briefly recheck the connection and file creation.",
            )}
          </p>
        </article>
        <article>
          <strong>{uiText(language, "YELLOW · 70–89%")}</strong>
          <p>
            {uiText(
              language,
              "Start the shared activity while assistants or partners support unfinished students.",
            )}
          </p>
        </article>
        <article>
          <strong>{uiText(language, "RED · Below 70%")}</strong>
          <p>
            {uiText(
              language,
              "Start with shared offline files and replace AI calls with an instructor demonstration.",
            )}
          </p>
        </article>
      </section>

      <footer className="instructor-setup-footer">
        <p>
          {uiText(
            language,
            "Students enter their own API keys. Instructors do not collect or expose key values.",
          )}
        </p>
        <div>
          <Link href="/instructor/day/1">{uiText(language, "Day 1 plan")}</Link>
          <Link className="start-live-link" href="/instructor/live">
            {uiText(language, "Start live classroom →")}
          </Link>
        </div>
      </footer>
    </main>
  );
}
