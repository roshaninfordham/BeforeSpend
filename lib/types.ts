export const CATEGORIES = [
  "Shopping",
  "Tech",
  "Home",
  "Clothing",
  "Hobby",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type PurchaseStatus = "waiting" | "kept" | "skipped";

export interface Purchase {
  id: string;
  name: string;
  amount: number;
  category: Category;
  note: string;
  createdAt: number;
  readyAt: number;
  status: PurchaseStatus;
  decidedAt: number | null;
}

export interface Settings {
  /** Money available for discretionary spending this month. */
  monthlyBudget: number;
  /** Money already spent this month outside of BeforeSpend. */
  spentSoFar: number;
  /** Default cooling-off window in hours. */
  coolingHours: number;
}

export interface StoreState {
  settings: Settings;
  purchases: Purchase[];
}
