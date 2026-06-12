import { NextRequest, NextResponse } from "next/server";
import { getStripe, priceIdFor } from "@/lib/stripe";
import { getTier, isBilling, TRIAL_DAYS } from "@/lib/tiers";
import { isLocale } from "@/lib/i18n";

export const runtime = "nodejs";

/**
 * Creates an embedded Stripe Checkout session for one of the three kits.
 * The tier id rides into the subscription metadata so license issuance
 * (the activation server signing the Ed25519 JWT) knows which claims to mint.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "checkout_not_configured" },
      { status: 503 }
    );
  }

  let tierId: unknown;
  let langRaw: unknown;
  let billingRaw: unknown;
  try {
    ({ tier: tierId, lang: langRaw, billing: billingRaw } = await req.json());
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const lang = typeof langRaw === "string" && isLocale(langRaw) ? langRaw : "ar";
  const billing =
    typeof billingRaw === "string" && isBilling(billingRaw) ? billingRaw : "monthly";

  const tier = getTier(typeof tierId === "string" ? tierId : null);
  if (!tier) {
    return NextResponse.json({ error: "unknown_tier" }, { status: 400 });
  }

  const price = priceIdFor(tier.id, billing);
  if (!price) {
    return NextResponse.json(
      { error: "checkout_not_configured" },
      { status: 503 }
    );
  }

  const origin =
    req.headers.get("origin")?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3010";

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "subscription",
      // Stripe Checkout has no Arabic locale; "auto" lets it follow the
      // browser. English is passed explicitly.
      locale: lang === "en" ? "en" : "auto",
      line_items: [{ price, quantity: 1 }],
      subscription_data: {
        metadata: { strata_tier: tier.id, strata_billing: billing },
        // a real test window for an audience whose subject only shows up at dawn
        ...(TRIAL_DAYS > 0 ? { trial_period_days: TRIAL_DAYS } : {}),
      },
      metadata: { strata_tier: tier.id, strata_billing: billing },
      return_url: `${origin}/${lang}/success?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("checkout session failed:", err);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
