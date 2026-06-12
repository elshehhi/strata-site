"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import StrataMark from "@/components/StrataMark";
import type { Billing, Tier } from "@/lib/tiers";
import type { Dict, Locale, TierStrings } from "@/lib/i18n";

/**
 * The counter at the trailhead store. One side: what the kit carries — the
 * gallery-plate summary. The other: Stripe's embedded checkout, the only
 * surface on the site we don't draw ourselves, framed so it reads as
 * part of the room. Stripe renders its own form in the visitor's locale.
 */
export default function CheckoutClient({
  lang,
  tier,
  billing,
  tierT,
  t,
  nine,
  publishableKey,
}: {
  lang: Locale;
  tier: Tier;
  billing: Billing;
  tierT: TierStrings;
  t: Dict["checkout"];
  nine: Dict["nine"];
  publishableKey: string | null;
}) {
  const [failed, setFailed] = useState(false);

  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey]
  );

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: tier.id, lang, billing }),
    });
    if (!res.ok) {
      setFailed(true);
      throw new Error("checkout unavailable");
    }
    const data = (await res.json()) as { clientSecret: string };
    return data.clientSecret;
  }, [tier.id, lang, billing]);

  const ready = Boolean(stripePromise) && !failed;

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-10 items-start">
      {/* the kit, restated */}
      <aside className="rounded-lg bg-ink-1 hairline p-8 lg:sticky lg:top-28">
        <div className="flex items-center gap-3 mb-7">
          <StrataMark size={22} />
          <span className="wordmark text-[11px] text-paper-mid">Strata</span>
        </div>
        <p className="micro-label mb-2">{t.yourKit}</p>
        <h1 className="voice-moment text-3xl text-paper-hi">{tierT.name}</h1>
        <p className="mt-3 text-[13px] text-paper-mid leading-relaxed">{tierT.reading}</p>
        <div className="depth-ribbon h-px my-7" dir="ltr" />
        <ul className="space-y-3">
          {tierT.carries.map((c) => (
            <li key={c} className="flex gap-3 text-[13px] text-paper-mid leading-snug">
              <span className="text-sage mt-[1px]" aria-hidden>
                —
              </span>
              {c}
            </li>
          ))}
        </ul>
        <p className="voice-moment mt-8 text-3xl text-paper-hi">
          ${billing === "annual" ? tier.priceAnnual : tier.priceMonthly}
          <span className="voice-truth text-[11px] text-paper-low ms-2">
            {billing === "annual" ? t.perYear : t.perMonth}
          </span>
        </p>
        {billing === "annual" && (
          <p className="voice-truth mt-1.5 text-[11px] text-dawn">{t.annualNote}</p>
        )}
        {nine.trialLine && (
          <p className="voice-truth mt-3 text-[11px] text-sage leading-relaxed">
            {nine.trialLine}
          </p>
        )}
        {/* conviction survives the form: one line of the letter at the counter */}
        <p className="voice-moment mt-6 text-[13px] text-dawn-hi">{nine.counterLine}</p>
        <p className="voice-truth mt-4 text-[11px] text-paper-low leading-relaxed">{t.after}</p>
        <p className="voice-truth mt-2 text-[10px] text-paper-low leading-relaxed">{nine.weld}</p>
        <Link
          href={`/${lang}/pricing`}
          className="mt-6 inline-block text-[12px] text-paper-low hover:text-paper-mid transition-colors duration-fast"
        >
          {t.back}
        </Link>
      </aside>

      {/* the payment surface — matted deliberately so Stripe's light form
          reads as a lit counter inside the dark room, not a broken theme.
          (Set Stripe Dashboard → Branding to the ink/dawn palette too.) */}
      <div className="checkout-shell rounded-lg bg-ink-1 hairline p-3 sm:p-6 min-h-[560px]">
        {ready ? (
          <div className="animate-[checkout-in_.5s_cubic-bezier(.22,.8,.24,1)]">
            <p className="micro-label text-center mb-4">{t.room}</p>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : (
          <div className="h-full min-h-[520px] flex flex-col items-center justify-center text-center px-8">
            <StrataMark size={30} />
            <h2 className="voice-moment text-2xl text-paper-hi mt-7">{t.closedH}</h2>
            <p className="mt-4 text-[13px] text-paper-mid max-w-sm leading-relaxed">
              {failed ? t.closedFail : t.closedDemo}
            </p>
            <a href="mailto:a.elshehhi@gmail.com?subject=STRATA" className="ghost mt-8">
              {t.write}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
