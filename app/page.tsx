"use client";

import { HistoryList } from "@/components/HistoryList";
import { PurchaseCard } from "@/components/PurchaseCard";
import { PurchaseForm } from "@/components/PurchaseForm";
import { SettingsPanel } from "@/components/SettingsPanel";
import { Summary } from "@/components/Summary";
import { safeToSpend, savedBySkipping } from "@/lib/calc";
import { useBeforeSpend } from "@/lib/store";

export default function Home() {
  const {
    settings,
    purchases,
    ready,
    now,
    addPurchase,
    decide,
    remove,
    updateSettings,
    reset,
  } = useBeforeSpend();

  const available = safeToSpend(settings, purchases, now);
  const waiting = purchases
    .filter((purchase) => purchase.status === "waiting")
    .sort((a, b) => a.readyAt - b.readyAt);
  const saved = savedBySkipping(purchases);
  const kept = purchases.filter((purchase) => purchase.status === "kept").length;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-[13px] font-bold text-white"
            >
              B
            </span>
            <p className="text-lg font-semibold tracking-tight text-ink">
              BeforeSpend
            </p>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Sleep on it. Then decide.
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted">
            Log what you are tempted to buy, wait out the timer, and make the
            call with your real budget in front of you.
          </p>
        </div>
        <p className="hidden text-xs text-muted sm:block">
          Saved in this browser
        </p>
      </header>

      {ready ? (
        <div className="space-y-4 sm:space-y-5">
          <Summary
            available={available}
            monthlyBudget={settings.monthlyBudget}
            waiting={waiting.length}
            saved={saved}
            kept={kept}
          />

          <div className="grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-4 sm:space-y-5">
              <PurchaseForm
                available={available}
                defaultCoolingHours={settings.coolingHours}
                onAdd={addPurchase}
              />

              <section aria-labelledby="cooling-heading">
                <div className="mb-3 flex items-baseline justify-between">
                  <h2
                    id="cooling-heading"
                    className="text-base font-semibold text-ink"
                  >
                    Cooling off
                  </h2>
                  <span className="text-xs text-muted">
                    {waiting.length === 0
                      ? "empty"
                      : `${waiting.length} ${waiting.length === 1 ? "item" : "items"}`}
                  </span>
                </div>

                {waiting.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-line px-5 py-8 text-center">
                    <p className="text-sm text-ink">Nothing is waiting.</p>
                    <p className="mt-1 text-xs text-muted">
                      Add something above and give it a day or two to cool off.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {waiting.map((purchase) => (
                      <PurchaseCard
                        key={purchase.id}
                        purchase={purchase}
                        available={available}
                        now={now}
                        onDecide={decide}
                      />
                    ))}
                  </div>
                )}
              </section>

              <HistoryList purchases={purchases} onRemove={remove} />
            </div>

            <aside className="space-y-4 sm:space-y-5">
              <SettingsPanel
                settings={settings}
                onUpdate={updateSettings}
                onReset={reset}
              />

              <section className="rounded-2xl border border-line bg-white p-5">
                <h2 className="text-base font-semibold text-ink">
                  How it works
                </h2>
                <ol className="mt-3 space-y-3 text-xs text-muted">
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-[11px] font-semibold text-ink">
                      1
                    </span>
                    <span>
                      <span className="font-medium text-ink">Log it.</span> Name
                      the thing and what it costs.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-[11px] font-semibold text-ink">
                      2
                    </span>
                    <span>
                      <span className="font-medium text-ink">Wait.</span> Buying
                      stays locked until the timer runs out.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-paper text-[11px] font-semibold text-ink">
                      3
                    </span>
                    <span>
                      <span className="font-medium text-ink">Decide.</span> Buy
                      it or skip it — skipped money is tallied for you.
                    </span>
                  </li>
                </ol>
              </section>

              <p className="px-1 text-[11px] leading-relaxed text-muted">
                No account, no sync. Everything lives in this browser, and
                clearing site data removes it.
              </p>
            </aside>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-2xl border border-line bg-white"
            />
          ))}
        </div>
      )}
    </div>
  );
}
