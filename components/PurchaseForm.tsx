"use client";

import { useId, useMemo, useState } from "react";
import { formatMoney, inputToNumber, verdictFor } from "@/lib/calc";
import type { PurchaseInput } from "@/lib/store";
import { CATEGORIES, type Category } from "@/lib/types";

interface PurchaseFormProps {
  available: number;
  defaultCoolingHours: number;
  onAdd: (input: PurchaseInput) => void;
}

const COOLING_PRESETS = [
  { hours: 24, label: "24 hours" },
  { hours: 48, label: "2 days" },
  { hours: 72, label: "3 days" },
  { hours: 168, label: "1 week" },
];

const toneStyles = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-800",
  tight: "border-amber-200 bg-amber-50 text-amber-800",
  over: "border-rose-200 bg-rose-50 text-rose-800",
};

export function PurchaseForm({
  available,
  defaultCoolingHours,
  onAdd,
}: PurchaseFormProps) {
  const nameId = useId();
  const amountId = useId();
  const categoryId = useId();
  const coolingId = useId();
  const noteId = useId();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Shopping");
  const [chosenCooling, setChosenCooling] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // `null` means "use the current default", so a settings change is picked up.
  const coolingHours = chosenCooling ?? defaultCoolingHours;

  const coolingOptions = useMemo(() => {
    const hours = new Set([
      ...COOLING_PRESETS.map((option) => option.hours),
      defaultCoolingHours,
      coolingHours,
    ]);

    return Array.from(hours)
      .sort((a, b) => a - b)
      .map((value) => ({
        hours: value,
        label:
          COOLING_PRESETS.find((option) => option.hours === value)?.label ??
          `${value} hours`,
      }));
  }, [defaultCoolingHours, coolingHours]);

  const parsedAmount = inputToNumber(amount);
  const preview =
    parsedAmount > 0 ? verdictFor(parsedAmount, available) : null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Give the purchase a name.");
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Enter an amount above $0.");
      return;
    }

    onAdd({
      name,
      amount: parsedAmount,
      category,
      note,
      coolingHours,
    });

    setError("");
    setName("");
    setAmount("");
    setNote("");
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:border-ink/30 focus:outline-none focus:ring-2 focus:ring-ink/10";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-ink">
          What are you about to buy?
        </h2>
        <p className="text-xs text-muted">
          {formatMoney(available)} available this month
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_140px]">
        <div>
          <label
            htmlFor={nameId}
            className="mb-1 block text-xs font-medium text-ink"
          >
            Item
          </label>
          <input
            id={nameId}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            placeholder="Noise-cancelling headphones"
            className={inputClass}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor={amountId}
            className="mb-1 block text-xs font-medium text-ink"
          >
            Price
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted">
              $
            </span>
            <input
              id={amountId}
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                if (error) setError("");
              }}
              inputMode="decimal"
              placeholder="249"
              className={`${inputClass} pl-7`}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor={categoryId}
            className="mb-1 block text-xs font-medium text-ink"
          >
            Category
          </label>
          <select
            id={categoryId}
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
            className={inputClass}
          >
            {CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={coolingId}
            className="mb-1 block text-xs font-medium text-ink"
          >
            Wait before deciding
          </label>
          <select
            id={coolingId}
            value={coolingHours}
            onChange={(event) => setChosenCooling(Number(event.target.value))}
            className={inputClass}
          >
            {coolingOptions.map((option) => (
              <option key={option.hours} value={option.hours}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor={noteId}
          className="mb-1 block text-xs font-medium text-ink"
        >
          Why do you want it?{" "}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={noteId}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={2}
          placeholder="The old ones hurt my ears on calls."
          className={`${inputClass} resize-none`}
        />
      </div>

      {preview ? (
        <div
          className={`mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border px-3 py-2 text-xs ${toneStyles[preview.tone]}`}
        >
          <span className="font-semibold">{preview.label}.</span>
          <span>{preview.detail}</span>
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="mt-3 text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
      >
        Start the wait
      </button>
    </form>
  );
}
