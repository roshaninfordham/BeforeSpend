"use client";

import { formatDate, formatMoney } from "@/lib/calc";
import type { Purchase } from "@/lib/types";

interface HistoryListProps {
  purchases: Purchase[];
  onRemove: (id: string) => void;
}

export function HistoryList({ purchases, onRemove }: HistoryListProps) {
  const decided = purchases
    .filter((purchase) => purchase.status !== "waiting")
    .sort((a, b) => (b.decidedAt ?? 0) - (a.decidedAt ?? 0));

  return (
    <section className="rounded-2xl border border-line bg-white">
      <div className="flex items-baseline justify-between px-5 pt-5">
        <h2 className="text-base font-semibold text-ink">Decision log</h2>
        <span className="text-xs text-muted">
          {decided.length} {decided.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {decided.length === 0 ? (
        <p className="px-5 pt-2 pb-5 text-sm text-muted">
          Nothing decided yet. Once a wait ends, your call lands here.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-line">
          {decided.map((purchase) => {
            const kept = purchase.status === "kept";
            return (
              <li
                key={purchase.id}
                className="flex items-center gap-3 px-5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {purchase.name}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDate(purchase.decidedAt ?? purchase.createdAt)} ·{" "}
                    {purchase.category}
                  </p>
                </div>
                <p className="text-sm font-semibold tabular-nums text-ink">
                  {formatMoney(purchase.amount)}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    kept
                      ? "bg-stone-100 text-stone-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {kept ? "Bought" : "Skipped"}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(purchase.id)}
                  aria-label={`Remove ${purchase.name} from the log`}
                  className="rounded-lg px-1.5 py-1 text-muted transition hover:bg-paper hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
