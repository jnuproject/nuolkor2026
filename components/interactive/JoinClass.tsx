"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { classroomPathWithAccess } from "@/lib/classroom-access";
import { classroomFetch } from "@/lib/classroom-api";

export function JoinClass({ initialCode = "" }: { initialCode?: string }) {
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
        throw new Error(data.error ?? "Could not join this class.");
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
        joinError instanceof Error ? joinError.message : "Could not join this class.",
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
        <Link href="/overview">Course overview</Link>
      </header>

      <section className="join-card">
        <div className="join-intro">
          <span className="eyebrow">LIVE CLASSROOM</span>
          <h1>Join the lesson.</h1>
          <p>
            Enter the six-character code on the classroom screen. Use only a
            short name or seat code your instructor can recognize.
          </p>
        </div>

        <form onSubmit={join}>
          <label>
            <span>CLASS CODE</span>
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
            <span>NAME OR SEAT CODE</span>
            <input
              autoComplete="nickname"
              maxLength={20}
              minLength={2}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Seat 12"
              required
              value={displayName}
            />
          </label>
          {error ? <div className="join-error">{error}</div> : null}
          <button disabled={submitting || code.length !== 6} type="submit">
            {submitting ? "Joining…" : "Join classroom →"}
          </button>
        </form>

        <div className="join-privacy">
          <strong>Keep it classroom-safe.</strong>
          <span>No email, phone number, student ID, password, or API key.</span>
        </div>
      </section>
    </main>
  );
}
