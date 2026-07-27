"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { uiText } from "@/content/translations/ui-ko";
import { classroomPathWithAccess } from "@/lib/classroom-access";
import { classroomFetch } from "@/lib/classroom-api";
import { useLanguage } from "@/lib/language";
import { LanguageToggle } from "../LanguageToggle";

export function JoinClass({ initialCode = "" }: { initialCode?: string }) {
  const language = useLanguage();
  const [code, setCode] = useState(initialCode.toUpperCase());
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!initialCode) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      const key = `build-loop:class:${initialCode.toUpperCase()}`;
      setDisplayName(localStorage.getItem(`${key}:display-name`) ?? "");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialCode]);

  async function join(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCode = code.replace(/[^A-Z0-9]/g, "").toUpperCase();
    const storageKey = `build-loop:class:${normalizedCode}`;
    setSubmitting(true);
    setError("");

    try {
      const response = await classroomFetch(
        `${encodeURIComponent(normalizedCode)}/join`,
        {
          body: JSON.stringify({
            displayName,
          }),
          headers: { "content-type": "application/json" },
          method: "POST",
        },
      );
      const data = (await response.json()) as {
        day?: number;
        error?: string;
        participantToken?: string;
      };
      if (!response.ok || !data.participantToken) {
        throw new Error(
          data.error ?? uiText(language, "Could not join this class."),
        );
      }

      localStorage.setItem(`${storageKey}:display-name`, displayName.trim());
      if (data.day) {
        localStorage.setItem(`${storageKey}:day`, String(data.day));
      }
      window.location.assign(
        classroomPathWithAccess(
          `/class/?code=${encodeURIComponent(normalizedCode)}`,
          data.participantToken,
        ),
      );
    } catch (joinError) {
      setError(
        joinError instanceof Error
          ? joinError.message
          : uiText(language, "Could not join this class."),
      );
      setSubmitting(false);
    }
  }

  return (
    <main className="join-page">
      <header className="join-header">
        <Link className="runner-brand" href="/">
          <span>BL</span>
          <strong>BUILD LOOP</strong>
        </Link>
        <div>
          <Link href="/overview">{uiText(language, "Course overview")}</Link>
          <LanguageToggle />
        </div>
      </header>

      <section className="join-card">
        <div className="join-intro">
          <span className="eyebrow">
            {uiText(language, "Live classroom").toUpperCase()}
          </span>
          <h1>{uiText(language, "Join the lesson.")}</h1>
          <p>
            {uiText(
              language,
              "Enter the six-character code on the classroom screen. Use only a short name or seat code your instructor can recognize.",
            )}
          </p>
        </div>

        <form onSubmit={join}>
          <label>
            <span>{uiText(language, "Class code").toUpperCase()}</span>
            <input
              autoCapitalize="characters"
              autoComplete="off"
              autoFocus
              inputMode="text"
              maxLength={6}
              onChange={(event) =>
                setCode(event.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())
              }
              placeholder="ABC234"
              required
              value={code}
            />
          </label>
          <label>
            <span>{uiText(language, "Name or seat code").toUpperCase()}</span>
            <input
              autoComplete="nickname"
              maxLength={20}
              minLength={2}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder={uiText(language, "Seat 12")}
              required
              value={displayName}
            />
          </label>
          {error ? (
            <div className="join-error">{uiText(language, error)}</div>
          ) : null}
          <button disabled={submitting || code.length !== 6} type="submit">
            {uiText(language, submitting ? "Joining…" : "Join classroom →")}
          </button>
        </form>

        <div className="join-privacy">
          <strong>{uiText(language, "Keep it classroom-safe.")}</strong>
          <span>
            {uiText(
              language,
              "No email, phone number, student ID, password, or API key.",
            )}
          </span>
        </div>
      </section>
    </main>
  );
}
