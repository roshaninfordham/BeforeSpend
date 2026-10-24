# BeforeSpend

A calm cooling-off list for purchases. Log what you are tempted to buy, wait out a timer, then decide with your remaining monthly spending money in view.

Everything is local to the browser — no account, no server, no analytics.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
```

## How it works

1. **Log a purchase** — name, price, category, an optional reason, and how long it should cool off (24 hours, 2 days, 3 days, or a week). The form previews how the price lands against what is left this month.
2. **Wait** — "I still want it" stays locked until the countdown ends. "Skip it" is always available.
3. **Decide** — kept purchases count against this month's budget; skipped amounts are tallied as money not spent. Both land in the decision log.

### Budget math

```
safe to spend = monthly budget − already spent outside the app − kept purchases this month
```

A purchase is labeled:

- **Over budget** — costs more than what is left.
- **Would eat most of it** — takes 50% or more of what is left.
- **Fits comfortably** — everything else.

The "already spent outside the app" number is the baseline for rent, groceries, bills, and anything else you do not log here.

## Data

State lives in `localStorage` under the key `beforespend.v1`. "Clear all data" in the settings panel wipes it. Amounts are formatted as USD.

## Code map

| Path | Purpose |
| --- | --- |
| [app/page.tsx](app/page.tsx) | Dashboard layout and wiring |
| [lib/store.ts](lib/store.ts) | `localStorage` state hook, validation, actions |
| [lib/calc.ts](lib/calc.ts) | Money formatting, budget math, countdowns, verdicts |
| [lib/types.ts](lib/types.ts) | Purchase and settings types |
| [components/](components) | Summary, purchase form, cooling-off card, decision log, settings |
