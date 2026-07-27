"use client";

import {
  isValidElement,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DayInfo } from "@/content/course";
import { sitePath } from "@/lib/site-path";

type LessonMode = "student" | "instructor" | "cards" | "start-student" | "start-instructor";

type MarkdownLessonProps = {
  day?: DayInfo;
  markdown: string;
  mode: LessonMode;
  eyebrow: string;
  title: string;
  description: string;
};

type Heading = {
  depth: number;
  label: string;
  id: string;
};

function plainText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(plainText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(value)) {
    return plainText(value.props.children);
  }

  return "";
}

function cleanMarkdownLabel(value: string): string {
  return value
    .replace(/[`*_~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}

function slugify(value: string): string {
  return cleanMarkdownLabel(value)
    .toLowerCase()
    .replace(/[^a-z0-9\u3131-\uD79D]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadings(markdown: string): Heading[] {
  const seen = new Map<string, number>();

  return [...markdown.matchAll(/^(##|###)\s+(.+)$/gm)]
    .map((match) => {
      const label = cleanMarkdownLabel(match[2]);
      const root = slugify(label) || `section-${match.index ?? 0}`;
      const count = seen.get(root) ?? 0;
      seen.set(root, count + 1);

      return {
        depth: match[1].length,
        label,
        id: count === 0 ? root : `${root}-${count + 1}`,
      };
    });
}

function subscribeToProgress(callback: () => void) {
  window.addEventListener("build-loop-progress", callback);
  return () => window.removeEventListener("build-loop-progress", callback);
}

function useLessonProgress(storagePrefix: string, markdown: string) {
  const total = useMemo(
    () => [...markdown.matchAll(/^- \[[ xX]\]\s/gm)].length,
    [markdown],
  );
  const getSnapshot = useCallback(() => {
    let count = 0;
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith(`${storagePrefix}:check:`) && localStorage.getItem(key) === "1") {
        count += 1;
      }
    }
    return count;
  }, [storagePrefix]);
  const checked = useSyncExternalStore(subscribeToProgress, getSnapshot, () => 0);

  return { total, checked };
}

function SavedCheckbox({
  node,
  storagePrefix,
  ...props
}: ComponentProps<"input"> & {
  node?: { position?: { start?: { offset?: number } } };
  storagePrefix: string;
}) {
  const offset = node?.position?.start?.offset ?? 0;
  const storageKey = `${storagePrefix}:check:${offset}`;
  const getSnapshot = useCallback(
    () => localStorage.getItem(storageKey) === "1",
    [storageKey],
  );
  const checked = useSyncExternalStore(
    subscribeToProgress,
    getSnapshot,
    () => Boolean(props.checked),
  );

  return (
    <input
      {...props}
      checked={checked}
      disabled={false}
      onChange={(event) => {
        const next = event.target.checked;
        localStorage.setItem(storageKey, next ? "1" : "0");
        window.dispatchEvent(new Event("build-loop-progress"));
      }}
      type="checkbox"
    />
  );
}

function CopyablePre({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const text = plainText(children).replace(/\n$/, "");

  return (
    <div className="code-shell">
      <button
        aria-label="Copy this text"
        className="copy-button"
        onClick={async () => {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
        type="button"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
      <pre>{children}</pre>
    </div>
  );
}

function HelpSignal() {
  const [signal, setSignal] = useState<"green" | "yellow" | "red">("green");

  const labels = {
    green: "✓ GREEN — I can continue",
    yellow: "? YELLOW — I need a check",
    red: "! RED — I cannot continue",
  } as const;

  return (
    <section className={`help-signal signal-${signal}`} aria-live="polite">
      <div>
        <span className="mini-label">MY STATUS</span>
        <strong>{labels[signal]}</strong>
      </div>
      <div className="signal-buttons" role="group" aria-label="Choose your help status">
        {(["green", "yellow", "red"] as const).map((item) => (
          <button
            aria-pressed={signal === item}
            className={signal === item ? "is-active" : ""}
            key={item}
            onClick={() => setSignal(item)}
            type="button"
          >
            {item === "green" ? "✓" : item === "yellow" ? "?" : "!"}
            <span>{item}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function headingComponent(
  Tag: "h2" | "h3",
  headings: Heading[],
  cursor: { value: number },
) {
  return function HeadingRenderer({ children }: { children?: ReactNode }) {
    const fallback = slugify(plainText(children));
    const current = headings[cursor.value];
    cursor.value += 1;
    const id = current?.id ?? fallback;
    return <Tag id={id}>{children}</Tag>;
  };
}

export function MarkdownLesson({
  day,
  markdown,
  mode,
  eyebrow,
  title,
  description,
}: MarkdownLessonProps) {
  const headings = useMemo(() => extractHeadings(markdown), [markdown]);
  const storagePrefix = `build-loop:v1:${day?.day ?? "start"}:${mode}`;
  const progress = useLessonProgress(storagePrefix, markdown);
  const headingCursor = { value: 0 };
  const studentMode = mode === "student" || mode === "start-student";

  const components: Components = {
    h2: headingComponent("h2", headings, headingCursor),
    h3: headingComponent("h3", headings, headingCursor),
    pre: ({ children }) => <CopyablePre>{children}</CopyablePre>,
    input: ({ node, ...props }) =>
      props.type === "checkbox" ? (
        <SavedCheckbox
          {...props}
          node={node as { position?: { start?: { offset?: number } } }}
          storagePrefix={storagePrefix}
        />
      ) : (
        <input {...props} />
      ),
    a: ({ children, href, ...props }) => (
      <a
        {...props}
        href={href?.startsWith("/") ? sitePath(href) : href}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        target={href?.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="table-scroll">
        <table>{children}</table>
      </div>
    ),
  };

  return (
    <main className={`lesson-page lesson-${mode}`}>
      <section className="lesson-hero">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="lesson-proof" aria-label="Lesson facts">
          {day ? (
            <>
              <span>DAY {day.day}</span>
              <strong>180</strong>
              <small>MINUTES</small>
            </>
          ) : (
            <>
              <span>START HERE</span>
              <strong>✓</strong>
              <small>READY</small>
            </>
          )}
        </div>
      </section>

      {studentMode ? <HelpSignal /> : null}

      {progress.total > 0 ? (
        <section className="lesson-progress" aria-label="Saved checklist progress">
          <div>
            <span className="mini-label">SAVED ON THIS DEVICE</span>
            <strong>
              {progress.checked} / {progress.total} checks
            </strong>
          </div>
          <div
            aria-hidden="true"
            className="progress-track"
            style={
              {
                "--progress": `${Math.min(
                  100,
                  Math.round((progress.checked / progress.total) * 100),
                )}%`,
              } as CSSProperties
            }
          />
        </section>
      ) : null}

      <div className="lesson-layout">
        <aside className="lesson-toc" aria-label="On this page">
          <span className="mini-label">ON THIS PAGE</span>
          <nav>
            {headings.slice(0, 24).map((heading) => (
              <a
                className={heading.depth === 3 ? "toc-subitem" : ""}
                href={`#${heading.id}`}
                key={heading.id}
              >
                {heading.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="markdown-body">
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
