import Stripe from "stripe";
import type { Billing, TierId } from "./tiers";

/**
 * Server-side Stripe handle. Lazily constructed so the site builds and runs
 * (in "field demo" mode) without keys — checkout then explains itself
 * instead of erroring.
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!_stripe) {
    _stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  }
  return _stripe;
}

export function priceIdFor(tier: TierId, billing: Billing = "monthly"): string | undefined {
  const monthly: Record<TierId, string | undefined> = {
    personal: process.env.STRIPE_PRICE_PERSONAL,
    professional: process.env.STRIPE_PRICE_PROFESSIONAL,
    studio: process.env.STRIPE_PRICE_STUDIO,
  };
  const annual: Record<TierId, string | undefined> = {
    personal: process.env.STRIPE_PRICE_PERSONAL_ANNUAL,
    professional: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL,
    studio: process.env.STRIPE_PRICE_STUDIO_ANNUAL,
  };
  return billing === "annual" ? annual[tier] : monthly[tier];
}

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
}
