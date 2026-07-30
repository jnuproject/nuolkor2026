"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DayNumber } from "@/content/course";

const STORAGE_PREFIX = "build-loop:presentation:";
const CHANNEL_NAME = "build-loop:presentation";
const SAME_TAB_EVENT = "build-loop:presentation-change";

export type PresentationState = {
  index: number;
  blank: boolean;
  revealed: boolean;
  updatedAt: number;
};

export type PresentationStatePatch = Partial<
  Pick<PresentationState, "index" | "blank" | "revealed">
>;

type PresentationMessage = {
  day: DayNumber;
  state: PresentationState;
};

const defaultState: PresentationState = {
  index: 0,
  blank: false,
  revealed: false,
  updatedAt: 0,
};

function sanitizeState(value: unknown, slideCount: number): PresentationState {
  const candidate =
    value && typeof value === "object"
      ? (value as Partial<Record<keyof PresentationState, unknown>>)
      : {};
  const lastIndex = Math.max(0, Math.floor(slideCount) - 1);
  const requestedIndex =
    typeof candidate.index === "number" && Number.isFinite(candidate.index)
      ? Math.floor(candidate.index)
      : 0;

  return {
    index: Math.min(lastIndex, Math.max(0, requestedIndex)),
    blank: candidate.blank === true,
    revealed: candidate.revealed === true,
    updatedAt:
      typeof candidate.updatedAt === "number" &&
      Number.isFinite(candidate.updatedAt) &&
      candidate.updatedAt >= 0
        ? candidate.updatedAt
        : 0,
  };
}

function isSameState(
  current: PresentationState,
  incoming: PresentationState,
): boolean {
  return (
    current.index === incoming.index &&
    current.blank === incoming.blank &&
    current.revealed === incoming.revealed &&
    current.updatedAt === incoming.updatedAt
  );
}

function parseStoredState(value: string | null): unknown {
  if (!value) {
    return defaultState;
  }

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return defaultState;
  }
}

function isPresentationMessage(value: unknown): value is PresentationMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<PresentationMessage>;
  return (
    typeof candidate.day === "number" &&
    candidate.day >= 1 &&
    candidate.day <= 6 &&
    Boolean(candidate.state) &&
    typeof candidate.state === "object"
  );
}

export function usePresentationState(
  day: DayNumber,
  slideCount: number,
): readonly [
  PresentationState,
  (patch: PresentationStatePatch) => void,
] {
  const storageKey = `${STORAGE_PREFIX}${day}`;
  const [state, setState] = useState<PresentationState>(() =>
    sanitizeState(defaultState, slideCount),
  );
  const stateRef = useRef(state);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const applyIncoming = useCallback(
    (value: unknown) => {
      const incoming = sanitizeState(value, slideCount);
      const current = stateRef.current;

      if (
        incoming.updatedAt < current.updatedAt ||
        isSameState(current, incoming)
      ) {
        return;
      }

      stateRef.current = incoming;
      setState(incoming);
    },
    [slideCount],
  );

  useEffect(() => {
    const syncStoredState = window.setTimeout(() => {
      let storedState: PresentationState;

      try {
        storedState = sanitizeState(
          parseStoredState(window.localStorage.getItem(storageKey)),
          slideCount,
        );
      } catch {
        storedState = sanitizeState(defaultState, slideCount);
      }

      stateRef.current = storedState;
      setState(storedState);
    }, 0);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        applyIncoming(parseStoredState(event.newValue));
      }
    };

    const handleSameTab = (event: Event) => {
      if (!(event instanceof CustomEvent)) {
        return;
      }
      const message = event.detail as unknown;
      if (isPresentationMessage(message) && message.day === day) {
        applyIncoming(message.state);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(SAME_TAB_EVENT, handleSameTab);

    let channel: BroadcastChannel | null = null;
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channelRef.current = channel;
      channel.addEventListener("message", (event: MessageEvent<unknown>) => {
        if (
          isPresentationMessage(event.data) &&
          event.data.day === day
        ) {
          applyIncoming(event.data.state);
        }
      });
    }

    return () => {
      window.clearTimeout(syncStoredState);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(SAME_TAB_EVENT, handleSameTab);
      channel?.close();
      if (channelRef.current === channel) {
        channelRef.current = null;
      }
    };
  }, [applyIncoming, day, slideCount, storageKey]);

  const update = useCallback(
    (patch: PresentationStatePatch) => {
      const next = sanitizeState(
        {
          ...stateRef.current,
          ...patch,
          updatedAt: Math.max(
            Date.now(),
            stateRef.current.updatedAt + 1,
          ),
        },
        slideCount,
      );
      const message: PresentationMessage = { day, state: next };

      stateRef.current = next;
      setState(next);

      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Storage can be unavailable in private browsing. The live tab still works.
      }

      channelRef.current?.postMessage(message);
      window.dispatchEvent(
        new CustomEvent<PresentationMessage>(SAME_TAB_EVENT, {
          detail: message,
        }),
      );
    },
    [day, slideCount, storageKey],
  );

  return [state, update] as const;
}
