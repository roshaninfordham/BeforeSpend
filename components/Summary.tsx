import { formatMoney } from "@/lib/calc";

interface SummaryProps {
  available: number;
  monthlyBudget: number;
  waiting: number;
  saved: number;
  kept: number;
}

function StatCard({
  label,
  value,
  hint,
  tone = "ink",
}: {
  label: string;
  value: string | number;
  hint: string;
  tone?: "ink" | "emerald" | "rose";
}) {
  const toneClass =
    tone === "emerald"
      ? "text-emerald-600"
      : tone === "rose"
        ? "text-rose-600"
        : "text-ink";

  return (
    <div className="rounded-2xl border border-line bg-white p-4 sm:p-5">
      <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
        {label}
      </p>
      <p
        className={`mt-2 text-xl font-semibold tracking-tight tabular-nums break-words sm:text-2xl lg:text-3xl ${toneClass}`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}

export function Summary({
  available,
  monthlyBudget,
  waiting,
  saved,
  kept,
}: SummaryProps) {
  return (
    <section
      aria-label="This month at a glance"
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      <StatCard
        label="Safe to spend"
        value={formatMoney(available)}
        hint={`Left of a ${formatMoney(monthlyBudget)} budget`}
        tone={available > 0 ? "ink" : "rose"}
      />
      <StatCard
        label="Cooling off"
        value={waiting}
        hint={waiting === 1 ? "purchase waiting" : "purchases waiting"}
      />
      <StatCard
        label="Not spent"
        value={formatMoney(saved)}
        hint="Kept out of your cart"
        tone="emerald"
      />
      <StatCard
        label="Bought"
        value={kept}
        hint="Decisions you went through with"
      />
    </section>
  );
}
