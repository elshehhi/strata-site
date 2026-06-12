/**
 * The three field kits — structure and prices only; all display strings
 * live per-locale in lib/i18n.ts (`tiers` section). Tier ids match the
 * application's license claims (src/license.rs: personal | professional
 * | studio) — the JWT the buyer receives gates export formats with these
 * exact strings.
 *
 * Displayed prices are presentation only; the amount Stripe charges comes
 * from the STRIPE_PRICE_* price IDs in the environment. Keep them in sync.
 */
export type TierId = "personal" | "professional" | "studio";

export interface Tier {
  id: TierId;
  priceMonthly: number;
  /** Annual = 10× monthly — two months free (panel recommendation, approved). */
  priceAnnual: number;
  recommended?: boolean;
}

export const TIERS: Tier[] = [
  { id: "personal", priceMonthly: 9, priceAnnual: 90 },
  { id: "professional", priceMonthly: 19, priceAnnual: 190, recommended: true },
  { id: "studio", priceMonthly: 39, priceAnnual: 390 },
];

export type Billing = "monthly" | "annual";

export function isBilling(x: string | null | undefined): x is Billing {
  return x === "monthly" || x === "annual";
}

/** Stripe trial days (0 = no trial). NEXT_PUBLIC so SSG pages and the
 *  checkout API read the same value; inlined at build time. */
export const TRIAL_DAYS = Number(process.env.NEXT_PUBLIC_TRIAL_DAYS ?? 0) || 0;

export function getTier(id: string | null | undefined): Tier | undefined {
  return TIERS.find((t) => t.id === id);
}
