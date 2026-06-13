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
  /** Founding (launch) monthly price — MUST equal the live Stripe price. */
  priceMonthly: number;
  /** Founding annual price — MUST equal the live Stripe annual price. The
   *  yearly saving is derived (priceMonthly×12 − priceAnnual), not a fixed
   *  "two months" — Stripe's annual prices are more generous than that. */
  priceAnnual: number;
  /** The "regular" monthly price the founding rate is discounted from — the
   *  struck-through anchor on the cards. Set to 2× the founding price so the
   *  founding rate reads as a clean 50% discount (the headline figure). It can
   *  go higher (up to ~70% off) later. Presentation only: there is no Stripe
   *  price for it yet; add one when the rate actually rises. */
  regularMonthly: number;
  recommended?: boolean;
}

/**
 * Prices below mirror the live Stripe products (test acct, Jun 2026):
 *   personal      $5/mo · $39/yr      (tier: personal)
 *   professional  $9/mo · $79/yr      (tier: professional)
 *   studio        $24/mo · $199/yr    (tier: studio)
 * These ARE the founding/launch prices. `regularMonthly` is the higher
 * post-launch rate we anchor against (struck through on the cards).
 */
export const TIERS: Tier[] = [
  { id: "personal", priceMonthly: 5, priceAnnual: 39, regularMonthly: 10 },
  { id: "professional", priceMonthly: 9, priceAnnual: 79, regularMonthly: 18, recommended: true },
  { id: "studio", priceMonthly: 24, priceAnnual: 199, regularMonthly: 48 },
];

/** Yearly saving in whole dollars vs. paying monthly for a year. */
export function annualSaving(t: Tier): number {
  return t.priceMonthly * 12 - t.priceAnnual;
}

/** Founding discount vs. the regular price, as a whole percentage (e.g. 50). */
export function discountPct(t: Tier): number {
  return Math.round((1 - t.priceMonthly / t.regularMonthly) * 100);
}

export type Billing = "monthly" | "annual";

export function isBilling(x: string | null | undefined): x is Billing {
  return x === "monthly" || x === "annual";
}

/** Stripe trial days (0 = no trial). NEXT_PUBLIC so SSG pages and the
 *  checkout API read the same value; inlined at build time. */
export const TRIAL_DAYS = Number(process.env.NEXT_PUBLIC_TRIAL_DAYS ?? 0) || 0;

/**
 * When the 50%-off founding offer ends — a REAL deadline the countdown ticks
 * to. This must be a date you actually honour: on it, raise the Stripe prices
 * to the regular rate AND set lib/tiers.ts priceMonthly to regularMonthly in
 * the same commit. The countdown hides itself once this passes, so it never
 * shows an expired/negative timer. ISO 8601 with an explicit offset (UAE,
 * +04:00) so it means the same instant for every visitor. Override per-env
 * with NEXT_PUBLIC_FOUNDING_DEADLINE. Set empty to remove the countdown.
 */
export const FOUNDING_DEADLINE =
  process.env.NEXT_PUBLIC_FOUNDING_DEADLINE?.trim() ?? "2026-07-13T23:59:59+04:00";

export function getTier(id: string | null | undefined): Tier | undefined {
  return TIERS.find((t) => t.id === id);
}

/**
 * The hosted activation page. The website never charges directly — a desktop
 * license must be bound to a Supabase account, so every "buy" routes here
 * (sign in → pay → the app unlocks). The chosen tier/billing rides along so
 * the activation page can pre-select it.
 */
export const ACTIVATE_URL =
  process.env.NEXT_PUBLIC_ACTIVATE_URL?.trim() || "https://activate.aelshehhi.com";

export function activateUrl(tier: TierId, billing: Billing = "monthly"): string {
  const p = new URLSearchParams({ tier, billing });
  return `${ACTIVATE_URL}/?${p.toString()}`;
}
