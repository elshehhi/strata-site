"use client";

import { useEffect, useState } from "react";
import { activateUrl, annualSaving, type Tier } from "@/lib/tiers";
import type { Dict, Locale } from "@/lib/i18n";

/**
 * The buy popup — ONE step (shortest path). Click a plan → choose yearly or
 * monthly → you go straight to the activation page (sign in → pay). The
 * $0-today / cancel promise rides inside the same popup, so no extra screen.
 * Prices come from the Tier object; no pipeline logic duplicated.
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

  // Choosing a billing cycle takes you straight to checkout (activation → pay).
  function go(billing: "monthly" | "annual") {
    window.location.href = activateUrl(tier.id, billing);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${variant === "cta" ? "cta" : "ghost"} justify-center w-full`}
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-xl bg-ink-1 hairline-strong p-7 shadow-[0_0_90px_-20px_rgba(232,162,92,.45)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 end-4 text-paper-low hover:text-paper-hi transition-colors duration-fast text-lg leading-none"
            >
              ✕
            </button>

            <p className="micro-label text-dawn mb-1">{planName}</p>
            <h3 className="voice-moment text-2xl text-paper-hi leading-snug">{t.chooseBilling}</h3>
            <p className="mt-2 text-[13px] text-paper-mid leading-relaxed">{t.billingSub}</p>

            <div className="mt-5 space-y-3">
              {/* yearly — choosing it goes straight to checkout */}
              <button
                type="button"
                onClick={() => go("annual")}
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
                onClick={() => go("monthly")}
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

            {/* the promise, compact, in the same popup — no extra screen */}
            <div className="mt-5 rounded-lg bg-ink-2 hairline p-4">
              <p className="voice-moment text-[15px] text-dawn-hi">{t.nothingToday}</p>
              <p className="mt-1.5 text-[12.5px] text-paper-mid leading-relaxed">{t.trialReassure}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
