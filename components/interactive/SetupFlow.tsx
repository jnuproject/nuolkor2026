"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sitePath } from "@/lib/site-path";

type OperatingSystem = "mac" | "windows";

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

const filePrompt =
  "Create a file named setup-check.txt.\nWrite only this line in the file: READY\nDo not change any other file.";

function CodeCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

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
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}

export function SetupFlow() {
  const [active, setActive] = useState(0);
  const [os, setOs] = useState<OperatingSystem>("mac");
  const [checks, setChecks] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"green" | "yellow" | "red">("green");
  const storageKey = "build-loop:setup:v2";
  const step = steps[active];
  const selected = checks[step.id] ?? [];
  const stepComplete = selected.length === step.checks.length;
  const completeCount = steps.filter(
    (item) => (checks[item.id] ?? []).length === item.checks.length,
  ).length;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved) as {
          active?: number;
          os?: OperatingSystem;
          checks?: Record<string, string[]>;
          status?: "green" | "yellow" | "red";
        };
        setActive(Math.max(0, Math.min(steps.length - 1, parsed.active ?? 0)));
        setOs(parsed.os === "windows" ? "windows" : "mac");
        setChecks(parsed.checks ?? {});
        setStatus(parsed.status ?? "green");
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
    setChecks(nextChecks);
    persist(nextChecks);
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
          <span>MY COMPUTER</span>
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
              ? "Use Terminal.app or another terminal."
              : "Windows Terminal with PowerShell is recommended."}
          </p>
        </div>
      );
    }

    if (step.id === "key") {
      return (
        <div className="setup-action-panel">
          <a href="https://build.nvidia.com" rel="noreferrer" target="_blank">
            Open NVIDIA Build ↗
          </a>
          <ol>
            <li>Sign in or create an account.</li>
            <li>Open the model page chosen by your instructor.</li>
            <li>Select Get API Key, then Generate API Key.</li>
            <li>Keep the nvapi-… value private.</li>
          </ol>
          <strong>Never enter your API key on this course website.</strong>
        </div>
      );
    }

    if (step.id === "install") {
      return (
        <div className="setup-command-stack">
          <span>1 · INSTALL</span>
          <CodeCopy code={installCommands[os]} />
          <span>2 · VERIFY IN A NEW TERMINAL</span>
          <CodeCopy code="opencode --version" />
          <p>
            If the command is not found, stop and use the detailed guide or ask
            the instructor. Do not change unrelated computer settings.
          </p>
        </div>
      );
    }

    if (step.id === "connect") {
      return (
        <div className="setup-command-stack">
          <span>1 · OPEN YOUR PRACTICE FOLDER</span>
          <CodeCopy code={openCommands[os]} />
          <span>2 · CONNECT THE PROVIDER</span>
          <CodeCopy code="/connect" />
          <p>Select NVIDIA. Paste your key only when OpenCode shows its API key box.</p>
          <span>3 · CHOOSE THE CLASS MODEL</span>
          <CodeCopy code="/models" />
        </div>
      );
    }

    if (step.id === "response") {
      return <CodeCopy code={safeResponsePrompt} />;
    }

    return <CodeCopy code={filePrompt} />;
  })();

  return (
    <main className="setup-flow">
      <header className="setup-flow-header">
        <Link className="runner-brand" href="/">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </Link>
        <div>
          <span>BEFORE DAY 1</span>
          <strong>SETUP CHECK</strong>
        </div>
        <Link href="/instructor/start">Instructor guide →</Link>
      </header>

      <div className="setup-flow-layout">
        <aside className="setup-flow-rail">
          <div>
            <span>READY</span>
            <strong>
              {completeCount}/{steps.length}
            </strong>
            <i>
              <b style={{ width: `${(completeCount / steps.length) * 100}%` }} />
            </i>
          </div>
          <nav aria-label="Setup steps">
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
                    <small>{item.label}</small>
                    <strong>{item.title}</strong>
                  </div>
                </button>
              );
            })}
          </nav>
          <a
            href={sitePath("/downloads/setting.html")}
            rel="noreferrer"
            target="_blank"
          >
            Open full original setup guide ↗
          </a>
        </aside>

        <section className="setup-flow-main">
          <header>
            <div>
              <span>{step.label}</span>
              <small>
                STEP {active + 1} / {steps.length} · {step.minutes}
              </small>
            </div>
            <h1>{step.title}</h1>
            <p>{step.intro}</p>
          </header>

          <div className="setup-tool">{stepTool}</div>

          <section className="setup-proof">
            <span>CHECK THE RESULT YOURSELF</span>
            <div>
              {step.checks.map((item) => (
                <label key={item}>
                  <input
                    checked={selected.includes(item)}
                    onChange={() => toggleCheck(item)}
                    type="checkbox"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </section>

          {active === steps.length - 1 && stepComplete ? (
            <section className={`setup-final-status status-${status}`}>
              <div>
                <span>MY SETUP STATUS</span>
                <strong>
                  {status === "green"
                    ? "Everything works"
                    : status === "yellow"
                      ? "OpenCode opens, but one check needs help"
                      : "OpenCode does not open"}
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
                    {value}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <footer>
            <button disabled={active === 0} onClick={() => goTo(active - 1)} type="button">
              ← Previous
            </button>
            <span>{stepComplete ? "Step complete ✓" : "Complete every check to continue"}</span>
            {active < steps.length - 1 ? (
              <button
                className="setup-next"
                disabled={!stepComplete}
                onClick={() => goTo(active + 1)}
                type="button"
              >
                Next step →
              </button>
            ) : (
              <Link
                aria-disabled={!stepComplete}
                className={`setup-next ${stepComplete ? "" : "is-disabled"}`}
                href={stepComplete ? "/day/1" : "#"}
              >
                Open Day 1 →
              </Link>
            )}
          </footer>
        </section>

        <aside className="setup-safety">
          <span>KEY SAFETY</span>
          <strong>Your key is a password.</strong>
          <ul>
            <li>Use only the provider key box.</li>
            <li>Never paste it into an AI prompt.</li>
            <li>Never put it in a project file.</li>
            <li>Never show it in a screenshot.</li>
          </ul>
          <p>If exposed, revoke it and make a new key.</p>
        </aside>
      </div>
    </main>
  );
}

const instructorChecks = [
  {
    id: "room",
    title: "장비·계정",
    checks: [
      "학생 PC 운영체제와 수량을 확인했다.",
      "관리자 권한 필요 여부를 확인했다.",
      "NVIDIA 계정 생성·인증 절차를 확인했다.",
      "공통 실습 폴더명과 백업 방식을 정했다.",
    ],
  },
  {
    id: "tool",
    title: "OpenCode·모델",
    checks: [
      "macOS와 Windows 설치를 각각 시험했다.",
      "/connect에서 NVIDIA가 표시되는지 확인했다.",
      "수업에 사용할 모델 하나와 대체 모델 하나를 정했다.",
      "모델이 안전한 파일 생성 테스트를 통과했다.",
    ],
  },
  {
    id: "network",
    title: "네트워크·복구",
    checks: [
      "강의실 Wi-Fi에서 실제 연결을 확인했다.",
      "여러 기기에서 동시 요청을 시험했다.",
      "401·429·timeout 대응 순서를 정했다.",
      "오프라인 공통 파일을 준비했다.",
    ],
  },
];

export function InstructorSetupConsole() {
  const [checks, setChecks] = useState<string[]>([]);
  const [green, setGreen] = useState(0);
  const [yellow, setYellow] = useState(0);
  const [red, setRed] = useState(0);
  const total = green + yellow + red;
  const ratio = total ? Math.round((green / total) * 100) : 0;
  const decision = total === 0 ? "WAITING" : ratio >= 90 ? "GREEN" : ratio >= 70 ? "YELLOW" : "RED";

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
          <span>BEFORE DAY 1 · INSTRUCTOR</span>
          <strong>세팅 운영 콘솔</strong>
        </div>
        <div>
          <a
            href={sitePath("/downloads/setting.html")}
            rel="noreferrer"
            target="_blank"
          >
            원본 상세 가이드 ↗
          </a>
          <Link className="start-live-link" href="/start">
            학생 화면
          </Link>
        </div>
      </header>

      <section className="instructor-setup-hero">
        <div>
          <span className="eyebrow">PRE-FLIGHT CHECK</span>
          <h1>정규 18시간 전에 기술 문제를 끝냅니다.</h1>
          <p>
            기존 OpenCode + NVIDIA 세팅 순서는 그대로 사용합니다. 이 화면은
            강사가 사전 점검과 수업 시작 판정을 놓치지 않도록 만든 운영판입니다.
          </p>
        </div>
        <div className={`readiness-decision decision-${decision.toLowerCase()}`}>
          <span>수업 시작 판정</span>
          <strong>{decision}</strong>
          <small>{total ? `Green ${ratio}% · 총 ${total}명` : "학생 현황을 입력하세요"}</small>
        </div>
      </section>

      <section className="setup-roster-counts">
        {[
          { label: "GREEN · 전체 테스트 완료", value: green, setter: setGreen },
          { label: "YELLOW · 일부 도움 필요", value: yellow, setter: setYellow },
          { label: "RED · OpenCode 실행 불가", value: red, setter: setRed },
        ].map((item) => (
          <label key={item.label}>
            <span>{item.label}</span>
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
              <h2>{group.title}</h2>
            </header>
            <div>
              {group.checks.map((item) => (
                <label key={item}>
                  <input
                    checked={checks.includes(item)}
                    onChange={() => {
                      const next = checks.includes(item)
                        ? checks.filter((value) => value !== item)
                        : [...checks, item];
                      setChecks(next);
                      save(next);
                    }}
                    type="checkbox"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="setup-decision-guide">
        <article>
          <strong>GREEN · 90% 이상</strong>
          <p>정상 진행. Day 1에서는 연결과 파일 생성만 짧게 재확인합니다.</p>
        </article>
        <article>
          <strong>YELLOW · 70–89%</strong>
          <p>미완료 학생을 보조강사·페어로 지원하며 공통 활동을 시작합니다.</p>
        </article>
        <article>
          <strong>RED · 70% 미만</strong>
          <p>오프라인 공통 파일로 시작하고 AI 호출은 강사 시연으로 대체합니다.</p>
        </article>
      </section>

      <footer className="instructor-setup-footer">
        <p>
          API 키는 학생 개인이 직접 입력합니다. 강사는 키 값을 수집하거나 화면에
          노출하지 않습니다.
        </p>
        <div>
          <Link href="/instructor/day/1">Day 1 운영안</Link>
          <Link className="start-live-link" href="/instructor/live">
            라이브 수업 시작 →
          </Link>
        </div>
      </footer>
    </main>
  );
}
