"use client";

import { useEffect, useState } from "react";
import { activateUrl, annualSaving, type Tier } from "@/lib/tiers";
import type { Dict, Locale } from "@/lib/i18n";

type Billing = "monthly" | "annual";

/**
 * The two-step buy popup (per Ahmed). Click a plan button →
 *  Step 1: choose billing — yearly (best value, with the $ saving shown) vs
 *          monthly, side by side.
 *  Step 2: confirm the chosen plan + price, and make the promise plainly —
 *          you pay nothing today; cancel before day 14 and you're not charged.
 * Then the CTA carries the tier+billing to the activation page (real checkout).
 * No pipeline/price logic is duplicated: prices come from the Tier object.
 */
export default function BuyFlow({
  tier,
  lang,
  label,
  planName,
  variant = "ghost",
  t,
}: {
  tier: Tier;
  lang: Locale;
  label: string;
  planName: string;
  variant?: "cta" | "ghost";
  t: Dict["nine"]["buy"];
}) {
  const [open, setOpen] = useState(false);
  const [billing, setBilling] = useState<Billing | null>(null);
  const save = annualSaving(tier);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function start() {
    setBilling(null);
    setOpen(true);
  }
  function close() {
    setOpen(false);
    setBilling(null);
  }

  const price = billing === "annual" ? tier.priceAnnual : tier.priceMonthly;
  const per = billing === "annual" ? t.perYear : t.perMonth;

  return (
    <>
      <button
        type="button"
        onClick={start}
        className={`${variant === "cta" ? "cta" : "ghost"} justify-center w-full`}
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-xl bg-ink-1 hairline-strong p-7 shadow-[0_0_90px_-20px_rgba(232,162,92,.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 end-4 text-paper-low hover:text-paper-hi transition-colors duration-fast text-lg leading-none"
            >
              ✕
            </button>

            {billing === null ? (
              /* ── Step 1 — billing choice ─────────────────────────────── */
              <div>
                <p className="micro-label text-dawn mb-1">{planName}</p>
                <h3 className="voice-moment text-2xl text-paper-hi leading-snug">
                  {t.chooseBilling}
                </h3>
                <p className="mt-2 text-[13px] text-paper-mid leading-relaxed">{t.billingSub}</p>

                <div className="mt-6 space-y-3">
                  {/* yearly — the recommended, with the saving */}
                  <button
                    type="button"
                    onClick={() => setBilling("annual")}
                    className="w-full text-start rounded-lg bg-ink-2 hairline-strong p-5 hover:bg-ink-0 transition-colors duration-fast"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="voice-moment text-lg text-paper-hi">{t.yearlyLabel}</span>
                      <span className="voice-truth text-[10px] tracking-micro uppercase px-2 py-0.5 rounded bg-dawn text-[#1a1410]">
                        {t.bestValue}
                      </span>
                    </div>
                    <p className="mt-1.5">
                      <span className="voice-moment text-3xl text-paper-hi">${tier.priceAnnual}</span>
                      <span className="voice-truth text-[11px] text-paper-low"> {t.perYear}</span>
                    </p>
                    <p className="voice-truth text-[11px] text-dawn mt-1.5">
                      {t.saveAYear.replace("__N__", String(save))}
                    </p>
                  </button>

                  {/* monthly */}
                  <button
                    type="button"
                    onClick={() => setBilling("monthly")}
                    className="w-full text-start rounded-lg bg-ink-2 hairline p-5 hover:bg-ink-0 transition-colors duration-fast"
                  >
                    <span className="voice-moment text-lg text-paper-hi">{t.monthlyLabel}</span>
                    <p className="mt-1.5">
                      <span className="voice-moment text-3xl text-paper-hi">${tier.priceMonthly}</span>
                      <span className="voice-truth text-[11px] text-paper-low"> {t.perMonth}</span>
                    </p>
                    <p className="voice-truth text-[11px] text-paper-low mt-1.5">{t.off50}</p>
                  </button>
                </div>
              </div>
            ) : (
              /* ── Step 2 — confirm + the no-charge promise ────────────── */
              <div>
                <button
                  type="button"
                  onClick={() => setBilling(null)}
                  className="voice-truth text-[11px] text-paper-low hover:text-paper-hi transition-colors duration-fast mb-4"
                >
                  {lang === "ar" ? "→" : "←"} {t.back}
                </button>
                <p className="micro-label text-dawn mb-1">{t.yourPlan}</p>
                <h3 className="voice-moment text-2xl text-paper-hi">{planName}</h3>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="voice-moment text-4xl text-paper-hi">${price}</span>
                  <span className="voice-truth text-[12px] text-paper-low">{per}</span>
                </p>

                <div className="mt-5 rounded-lg bg-ink-2 hairline p-5">
                  <p className="voice-moment text-lg text-dawn-hi">{t.nothingToday}</p>
                  <p className="mt-2 text-[13px] text-paper-mid leading-relaxed">{t.trialReassure}</p>
                  <p className="voice-truth mt-3 text-[11px] text-paper-low leading-relaxed">
                    {t.chargeAfter}
                  </p>
                </div>

                <a href={activateUrl(tier.id, billing)} className="cta justify-center w-full mt-5">
                  {t.startTrial}
                  <span aria-hidden>{lang === "ar" ? "←" : "→"}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
