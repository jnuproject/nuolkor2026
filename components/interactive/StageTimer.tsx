"use client";

import { useEffect, useState } from "react";

function format(seconds: number): string {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

export function StageTimer({
  minutes,
  compact = false,
}: {
  minutes: number;
  compact?: boolean;
}) {
  const duration = Math.max(1, Math.round(minutes * 60));
  const [seconds, setSeconds] = useState(duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }
    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <div className={`stage-timer ${compact ? "is-compact" : ""}`}>
      <div>
        <span>{seconds === 0 ? "TIME" : running ? "RUNNING" : "TIMER"}</span>
        <strong>{format(seconds)}</strong>
      </div>
      <div className="stage-timer-actions">
        <button
          onClick={() => {
            if (seconds === 0) {
              setSeconds(duration);
            }
            setRunning((value) => !value);
          }}
          type="button"
        >
          {running ? "Pause" : seconds === 0 ? "Restart" : "Start"}
        </button>
        <button
          onClick={() => {
            setSeconds(duration);
            setRunning(false);
          }}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
