import type { Purchase, Settings } from "./types";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const moneyRounded = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatMoney(value: number): string {
  return Number.isInteger(value) ? moneyRounded.format(value) : money.format(value);
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function isSameMonth(a: number, b: number): boolean {
  const left = new Date(a);
  const right = new Date(b);
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth()
  );
}

/** Money already committed this month: the manual baseline plus kept purchases. */
export function committedThisMonth(
  purchases: Purchase[],
  now: number,
): number {
  return purchases
    .filter(
      (purchase) =>
        purchase.status === "kept" &&
        purchase.decidedAt !== null &&
        isSameMonth(purchase.decidedAt, now),
    )
    .reduce((total, purchase) => total + purchase.amount, 0);
}

export function safeToSpend(
  settings: Settings,
  purchases: Purchase[],
  now: number,
): number {
  return (
    settings.monthlyBudget - settings.spentSoFar - committedThisMonth(purchases, now)
  );
}

export function savedBySkipping(purchases: Purchase[]): number {
  return purchases
    .filter((purchase) => purchase.status === "skipped")
    .reduce((total, purchase) => total + purchase.amount, 0);
}

export interface Verdict {
  label: string;
  tone: "good" | "tight" | "over";
  detail: string;
}

/** How a purchase would land against what is left this month. */
export function verdictFor(amount: number, available: number): Verdict {
  if (available <= 0) {
    return {
      label: "No room left",
      tone: "over",
      detail: "This month's spending money is already used up.",
    };
  }

  const share = Math.round((amount / available) * 100);

  if (amount > available) {
    return {
      label: "Over budget",
      tone: "over",
      detail: `${formatMoney(amount - available)} more than what is left.`,
    };
  }

  if (share >= 50) {
    return {
      label: "Would eat most of it",
      tone: "tight",
      detail: `${share}% of what is left this month.`,
    };
  }

  return {
    label: "Fits comfortably",
    tone: "good",
    detail: `${share}% of what is left this month.`,
  };
}

/** Human countdown, e.g. "1d 4h left" or "Ready to decide". */
export function countdown(readyAt: number, now: number): string {
  const ms = readyAt - now;
  if (ms <= 0) return "Ready to decide";

  const totalMinutes = Math.ceil(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export function inputToNumber(value: string): number {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
