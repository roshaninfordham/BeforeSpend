"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { CATEGORIES, type Category, type Purchase, type Settings, type StoreState } from "./types";

const STORAGE_KEY = "beforespend.v1";

export const DEFAULT_SETTINGS: Settings = {
  monthlyBudget: 800,
  spentSoFar: 0,
  coolingHours: 48,
};

interface Snapshot extends StoreState {
  loaded: boolean;
}

const SERVER_SNAPSHOT: Snapshot = {
  settings: DEFAULT_SETTINGS,
  purchases: [],
  loaded: false,
};

let snapshot: Snapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();
let initialized = false;

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);
}

function cleanNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : fallback;
}

function parseState(raw: string | null): StoreState | null {
  if (!raw) return null;

  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;

    const record = data as { settings?: unknown; purchases?: unknown };
    const rawSettings =
      record.settings && typeof record.settings === "object"
        ? (record.settings as Record<string, unknown>)
        : {};

    const settings: Settings = {
      monthlyBudget: cleanNumber(rawSettings.monthlyBudget, DEFAULT_SETTINGS.monthlyBudget),
      spentSoFar: cleanNumber(rawSettings.spentSoFar, DEFAULT_SETTINGS.spentSoFar),
      coolingHours:
        cleanNumber(rawSettings.coolingHours, DEFAULT_SETTINGS.coolingHours) ||
        DEFAULT_SETTINGS.coolingHours,
    };

    const purchases: Purchase[] = Array.isArray(record.purchases)
      ? record.purchases.flatMap((entry): Purchase[] => {
          if (!entry || typeof entry !== "object") return [];
          const item = entry as Record<string, unknown>;
          const status = item.status;
          if (status !== "waiting" && status !== "kept" && status !== "skipped") return [];
          if (typeof item.name !== "string" || typeof item.amount !== "number") return [];

          return [
            {
              id: typeof item.id === "string" ? item.id : crypto.randomUUID(),
              name: item.name,
              amount: item.amount,
              category: isCategory(item.category) ? item.category : "Other",
              note: typeof item.note === "string" ? item.note : "",
              createdAt: typeof item.createdAt === "number" ? item.createdAt : Date.now(),
              readyAt: typeof item.readyAt === "number" ? item.readyAt : Date.now(),
              status,
              decidedAt: typeof item.decidedAt === "number" ? item.decidedAt : null,
            },
          ];
        })
      : [];

    return { settings, purchases };
  } catch {
    return null;
  }
}

/** Read localStorage once, when the browser takes over from the server render. */
function loadFromStorage() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const parsed = parseState(window.localStorage.getItem(STORAGE_KEY));
  snapshot = {
    settings: parsed?.settings ?? DEFAULT_SETTINGS,
    purchases: parsed?.purchases ?? [],
    loaded: true,
  };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  loadFromStorage();
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  loadFromStorage();
  return snapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function commit(next: StoreState) {
  if (typeof window === "undefined") return;

  snapshot = { settings: next.settings, purchases: next.purchases, loaded: true };
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ settings: snapshot.settings, purchases: snapshot.purchases }),
  );
  listeners.forEach((listener) => listener());
}

export interface PurchaseInput {
  name: string;
  amount: number;
  category: Category;
  note: string;
  coolingHours: number;
}

function addPurchase(input: PurchaseInput) {
  const createdAt = Date.now();
  const purchase: Purchase = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    amount: input.amount,
    category: input.category,
    note: input.note.trim(),
    createdAt,
    readyAt: createdAt + input.coolingHours * 60 * 60 * 1000,
    status: "waiting",
    decidedAt: null,
  };

  commit({
    settings: snapshot.settings,
    purchases: [purchase, ...snapshot.purchases],
  });
}

function decide(id: string, status: "kept" | "skipped") {
  const decidedAt = Date.now();
  commit({
    settings: snapshot.settings,
    purchases: snapshot.purchases.map((purchase) =>
      purchase.id === id ? { ...purchase, status, decidedAt } : purchase,
    ),
  });
}

function remove(id: string) {
  commit({
    settings: snapshot.settings,
    purchases: snapshot.purchases.filter((purchase) => purchase.id !== id),
  });
}

function updateSettings(patch: Partial<Settings>) {
  const next = { ...snapshot.settings, ...patch };
  commit({
    settings: {
      monthlyBudget: Math.max(0, next.monthlyBudget),
      spentSoFar: Math.max(0, next.spentSoFar),
      coolingHours: Math.max(1, Math.round(next.coolingHours)),
    },
    purchases: snapshot.purchases,
  });
}

function reset() {
  commit({ settings: DEFAULT_SETTINGS, purchases: [] });
}

export function useBeforeSpend() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [now, setNow] = useState(0);

  // Keep countdowns and month boundaries fresh. The clock is an external
  // system: the first read waits for the browser to paint so the server
  // render stays stable.
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const frame = window.requestAnimationFrame(tick);
    const timer = window.setInterval(tick, 1000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  return {
    settings: state.settings,
    purchases: state.purchases,
    ready: state.loaded && now > 0,
    now,
    addPurchase,
    decide,
    remove,
    updateSettings,
    reset,
  };
}
