"use client";

import { countdown, formatDate, formatMoney, verdictFor } from "@/lib/calc";
import type { Purchase } from "@/lib/types";

interface PurchaseCardProps {
  purchase: Purchase;
  available: number;
  now: number;
  onDecide: (id: string, status: "kept" | "skipped") => void;
}

const toneStyles = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-800",
  tight: "border-amber-200 bg-amber-50 text-amber-800",
  over: "border-rose-200 bg-rose-50 text-rose-800",
};

export function PurchaseCard({
  purchase,
  available,
  now,
  onDecide,
}: PurchaseCardProps) {
  const ready = now >= purchase.readyAt;
  const verdict = verdictFor(purchase.amount, available);

  return (
    <article
      className={`rounded-2xl border bg-white p-4 sm:p-5 ${
        ready ? "border-emerald-300" : "border-line"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-ink">
            {purchase.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted">
            {purchase.category} · added {formatDate(purchase.createdAt)}
          </p>
        </div>
        <p className="shrink-0 text-lg font-semibold tabular-nums text-ink">
          {formatMoney(purchase.amount)}
        </p>
      </div>

      {purchase.note ? (
        <p className="mt-2 border-l-2 border-line pl-3 text-xs leading-relaxed text-muted italic">
          {purchase.note}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${toneStyles[verdict.tone]}`}
          title={verdict.detail}
        >
          {verdict.label}
        </span>
        <span
          className={`text-[11px] ${ready ? "font-semibold text-emerald-700" : "text-muted"}`}
        >
          {countdown(purchase.readyAt, now)}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onDecide(purchase.id, "kept")}
          disabled={!ready}
          title={ready ? undefined : "You can decide once the wait is over"}
          className="rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-ink/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:bg-line disabled:text-muted disabled:hover:bg-line sm:flex-1"
        >
          I still want it
        </button>
        <button
          type="button"
          onClick={() => onDecide(purchase.id, "skipped")}
          className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink transition hover:border-ink/25 hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 sm:flex-1"
        >
          Skip it
        </button>
      </div>
    </article>
  );
}
