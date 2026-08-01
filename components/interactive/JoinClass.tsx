"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { uiText } from "@/content/translations/ui-ko";
import { classroomPathWithAccess } from "@/lib/classroom-access";
import { classroomFetch } from "@/lib/classroom-api";
import { useLanguage } from "@/lib/language";
import { LanguageToggle } from "../LanguageToggle";

const PARTICIPANT_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type StoredParticipantAccess = {
  expiresAt: number;
  token: string;
};

function participantAccessKey(storageKey: string): string {
  return `${storageKey}:participant-access`;
}

function readParticipantToken(storageKey: string): string {
  const key = participantAccessKey(storageKey);
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return "";

    const parsed = JSON.parse(saved) as Partial<StoredParticipantAccess>;
    const validToken =
      typeof parsed.token === "string" && /^[0-9a-f]{48}$/.test(parsed.token);
    const validExpiry =
      typeof parsed.expiresAt === "number" &&
      Number.isFinite(parsed.expiresAt) &&
      parsed.expiresAt > Date.now();
    if (validToken && validExpiry) return parsed.token!;

    localStorage.removeItem(key);
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {
      // The classroom can still be joined when browser storage is unavailable.
    }
  }
  return "";
}

function storeParticipantToken(storageKey: string, token: string): void {
  try {
    localStorage.setItem(
      participantAccessKey(storageKey),
      JSON.stringify({
        expiresAt: Date.now() + PARTICIPANT_TOKEN_TTL_MS,
        token,
      } satisfies StoredParticipantAccess),
    );
  } catch {
    // The current tab still receives the token through the URL fragment.
  }
}

function clearParticipantToken(storageKey: string): void {
  try {
    localStorage.removeItem(participantAccessKey(storageKey));
  } catch {
    // Ignore storage restrictions; the server response remains authoritative.
  }
}

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
      try {
        setDisplayName(localStorage.getItem(`${key}:display-name`) ?? "");
      } catch {
        setDisplayName("");
      }
      readParticipantToken(key);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialCode]);

  async function join(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCode = code.replace(/[^A-Z0-9]/g, "").toUpperCase();
    const storageKey = `build-loop:class:${normalizedCode}`;
    let savedDisplayName = "";
    try {
      savedDisplayName = localStorage.getItem(`${storageKey}:display-name`) ?? "";
    } catch {
      // Continue without a resume token when browser storage is unavailable.
    }
    const resumeToken =
      savedDisplayName.trim() === displayName.trim()
        ? readParticipantToken(storageKey)
        : "";
    setSubmitting(true);
    setError("");

    try {
      const response = await classroomFetch(
        `${encodeURIComponent(normalizedCode)}/join`,
        {
          body: JSON.stringify({
            displayName,
            ...(resumeToken ? { resumeToken } : {}),
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
        if (resumeToken && (response.status === 404 || response.status === 409)) {
          clearParticipantToken(storageKey);
        }
        throw new Error(
          data.error ?? uiText(language, "Could not join this class."),
        );
      }

      try {
        localStorage.setItem(`${storageKey}:display-name`, displayName.trim());
        if (data.day) {
          localStorage.setItem(`${storageKey}:day`, String(data.day));
        }
      } catch {
        // The classroom remains usable in this tab through the access fragment.
      }
      storeParticipantToken(storageKey, data.participantToken);
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

        <form aria-busy={submitting} onSubmit={join}>
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
            <div className="join-error" role="alert">
              {uiText(language, error)}
            </div>
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
