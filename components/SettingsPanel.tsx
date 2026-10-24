"use client";

import { useId } from "react";
import { inputToNumber } from "@/lib/calc";
import type { Settings } from "@/lib/types";

interface SettingsPanelProps {
  settings: Settings;
  onUpdate: (patch: Partial<Settings>) => void;
  onReset: () => void;
}

export function SettingsPanel({
  settings,
  onUpdate,
  onReset,
}: SettingsPanelProps) {
  const budgetId = useId();
  const spentId = useId();
  const coolingId = useId();

  function commit(
    field: keyof Settings,
    event: React.FocusEvent<HTMLInputElement>,
  ) {
    onUpdate({ [field]: Math.max(0, inputToNumber(event.currentTarget.value)) });
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink focus:border-ink/30 focus:outline-none focus:ring-2 focus:ring-ink/10";

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-base font-semibold text-ink">Your numbers</h2>
      <p className="mt-1 text-xs text-muted">Saved in this browser only.</p>

      <div className="mt-4 space-y-3">
        <div>
          <label
            htmlFor={budgetId}
            className="mb-1 block text-xs font-medium text-ink"
          >
            Spending budget this month
          </label>
          <input
            key={settings.monthlyBudget}
            id={budgetId}
            defaultValue={settings.monthlyBudget}
            inputMode="decimal"
            onBlur={(event) => commit("monthlyBudget", event)}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            }}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor={spentId}
            className="mb-1 block text-xs font-medium text-ink"
          >
            Already spent outside this app
          </label>
          <input
            key={settings.spentSoFar}
            id={spentId}
            defaultValue={settings.spentSoFar}
            inputMode="decimal"
            onBlur={(event) => commit("spentSoFar", event)}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            }}
            className={inputClass}
          />
          <p className="mt-1 text-[11px] text-muted">
            Rent, groceries, bills — whatever is not logged here.
          </p>
        </div>

        <div>
          <label
            htmlFor={coolingId}
            className="mb-1 block text-xs font-medium text-ink"
          >
            Default cooling-off window (hours)
          </label>
          <input
            key={settings.coolingHours}
            id={coolingId}
            defaultValue={settings.coolingHours}
            inputMode="numeric"
            onBlur={(event) => commit("coolingHours", event)}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            }}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (window.confirm("Delete all purchases and restore default settings?")) {
            onReset();
          }
        }}
        className="mt-4 w-full rounded-xl border border-line px-3 py-2 text-xs font-medium text-muted transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
      >
        Clear all data
      </button>
    </section>
  );
}
