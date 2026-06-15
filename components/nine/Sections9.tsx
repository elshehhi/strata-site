"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { TIERS, FOUNDING_DEADLINE } from "@/lib/tiers";
import FoundingCountdown from "./FoundingCountdown";
import BuyFlow from "./BuyFlow";
import type { Dict, Locale } from "@/lib/i18n";

/* Three arrivals, not one (panel P2 — "one verb kills tempo"):
   Rf  · reading text: a fast plain fade — words shouldn't commute.
   R   · plates/cards: the familiar rise, shortened.
   Rs  · human moments (creed, letter, close): a slow settle —
         opacity + scale .985→1, the design spec's "objects settle". */
const fade = {
  hidden: { opacity: 0 },
  shown: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 0.8, 0.24, 1] as const },
  }),
};
const rise = {
  hidden: { opacity: 0, y: 28 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.75, ease: [0.22, 0.8, 0.24, 1] as const },
  }),
};
const settle = {
  hidden: { opacity: 0, scale: 0.985 },
  shown: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.12, duration: 1.3, ease: [0.22, 0.8, 0.24, 1] as const },
  }),
};

function makeReveal(variants: Variants) {
  return function Reveal({
    i = 0,
    children,
    className,
  }: {
    i?: number;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <motion.div
        custom={i}
        variants={variants}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };
}

const Rf = makeReveal(fade);
const R = makeReveal(rise);
const Rs = makeReveal(settle);

/* ── 2 · the compromise ──────────────────────────────────────────────── */
export function Provoke9({ t }: { t: Dict["nine"] }) {
  return (
    <section className="relative px-6 py-36">
      <div className="mx-auto max-w-3xl text-center">
        <Rf i={0}>
          <p className="micro-label mb-7">{t.provokeLabel}</p>
          <p className="voice-moment text-2xl sm:text-3xl text-paper-hi leading-snug">
            {t.provoke1}
          </p>
        </Rf>
        <Rf i={1}>
          <p className="mt-7 text-paper-mid text-body leading-relaxed max-w-xl mx-auto">
            {t.provoke2}
          </p>
        </Rf>
        <Rf i={2}>
          <p className="voice-moment mt-7 text-xl sm:text-2xl text-dawn-hi">{t.provoke3}</p>
        </Rf>
      </div>
    </section>
  );
}

/* (Creed9 was replaced by the pinned CreedSetpiece — components/nine/CreedSetpiece.tsx) */

/* ── 4 · mechanism + honesty ─────────────────────────────────────────── */
export function How9({ t }: { t: Dict["nine"] }) {
  return (
    <section className="relative px-6 py-36">
      <div className="mx-auto max-w-4xl">
        <R i={0}>
          <p className="micro-label mb-10 text-center">{t.howLabel}</p>
        </R>
        <div className="grid sm:grid-cols-3 gap-4">
          {t.steps.map((s, i) => (
            <R key={s} i={1 + i}>
              <div className="rounded-lg bg-ink-1 hairline p-7 h-full">
                <p className="voice-truth text-caption text-dawn mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="voice-moment text-lg text-paper-hi leading-snug">{s}</p>
              </div>
            </R>
          ))}
        </div>
        <R i={4}>
          <p className="voice-truth mt-10 text-center text-caption text-paper-mid leading-relaxed">
            {t.howTrust1}
            <br />
            {t.howTrust2}
          </p>
        </R>
        <R i={5} className="mt-12 mx-auto max-w-xl rounded-lg bg-ink-1 hairline p-7">
          <p className="micro-label mb-4">{t.notTitle}</p>
          <ul className="space-y-2.5">
            {t.nots.map((n) => (
              <li key={n} className="flex gap-3 text-sm text-paper-mid leading-snug">
                <span className="text-rust mt-[1px]" aria-hidden>
                  —
                </span>
                {n}
              </li>
            ))}
          </ul>
        </R>
      </div>
    </section>
  );
}

/* ── 5 · custody ─────────────────────────────────────────────────────── */
export function Custody9({ t }: { t: Dict["nine"] }) {
  return (
    <section className="relative px-6 py-36">
      <div className="absolute inset-0 bg-[#080705]/80" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Rs i={0}>
          <p className="micro-label mb-7">{t.custodyLabel}</p>
          <h2 className="voice-moment text-3xl sm:text-5xl leading-[1.15] text-paper-hi">
            {t.custodyBig}
          </h2>
          <p className="voice-truth mt-7 text-caption text-paper-mid leading-relaxed">
            {t.custodyLic}
          </p>
        </Rs>
        <R i={2} className="mt-12 rounded-lg bg-ink-1 hairline-strong p-8 text-start">
          <p className="voice-moment text-xl text-dawn-hi mb-4">{t.cancelQ}</p>
          <p className="text-body text-paper-mid leading-relaxed">{t.cancelA}</p>
        </R>
      </div>
    </section>
  );
}

/* ── 7 · the compressed manifesto ────────────────────────────────────── */
export function Manifesto9({ t }: { t: Dict["nine"] }) {
  return (
    <section className="relative px-6 py-36">
      <div className="mx-auto max-w-xl">
        <Rf i={0}>
          <p className="micro-label mb-10 text-center">{t.manifestoLabel}</p>
        </Rf>
        <div className="space-y-0">
          {t.manifesto.map((m, i) => (
            <Rf key={m} i={1 + i}>
              <div className="flex items-baseline gap-5 py-4 border-b border-hairline">
                <span className="voice-truth text-caption text-dawn">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="voice-moment text-xl sm:text-2xl text-paper-hi">{m}</p>
              </div>
            </Rf>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8 · pricing — Professional carries the room; guarantees welded to
       the price; cards walk straight into checkout (no /pricing detour) ── */
export function Pricing9({
  lang,
  t,
  closing,
  tiersT,
}: {
  lang: Locale;
  t: Dict["nine"];
  closing: Dict["closing"];
  tiersT: Dict["tiers"];
}) {
  return (
    <section className="relative px-6 py-36">
      <div className="mx-auto max-w-5xl">
        <R i={0} className="text-center">
          <h2 className="voice-moment text-4xl sm:text-5xl text-paper-hi leading-tight">
            {closing.h}
          </h2>
          <p className="mt-5 text-paper-mid text-body">{closing.p}</p>
          <p className="mt-5 mx-auto max-w-xl text-sm text-dawn-hi/90 leading-relaxed">
            {t.foundingBanner}
          </p>
          {FOUNDING_DEADLINE && (
            <div className="mt-7 flex justify-center">
              <FoundingCountdown deadline={FOUNDING_DEADLINE} t={t.countdown} />
            </div>
          )}
        </R>

        <div className="mt-14 grid sm:grid-cols-3 gap-4 items-stretch">
          {TIERS.map((tier, i) => {
            const s = tiersT[tier.id];
            const label = t.buy.choose.replace("__PLAN__", s.name);
            return (
              <R key={tier.id} i={1 + i} className="h-full">
                {tier.recommended ? (
                  /* the one answer — weight, not light (glow softened per panel) */
                  <div className="relative rounded-lg bg-ink-1 hairline-strong p-8 sm:scale-[1.05] shadow-[0_0_44px_-20px_rgba(232,162,92,.28)]">
                    <p className="voice-moment text-2xl text-paper-hi">{s.name}</p>
                    <p className="mt-3">
                      <span className="voice-truth inline-flex items-center gap-2 rounded-full bg-dawn px-3.5 py-1.5 text-body font-medium tracking-tight text-[#1a1410]">
                        {t.off[tier.id]}
                        <span className="text-caption font-normal opacity-80">
                          {t.foundingBadge}
                        </span>
                      </span>
                    </p>
                    <p className="mt-3 flex items-baseline gap-2.5">
                      <span className="voice-truth text-xl text-paper-low/70 line-through decoration-rust/60 decoration-1">
                        ${tier.regularMonthly}
                      </span>
                      <span className="voice-moment text-5xl text-paper-hi">
                        ${tier.priceMonthly}
                      </span>
                      <span className="voice-truth text-caption text-paper-low">
                        {closing.perMonth}
                      </span>
                    </p>
                    <p className="voice-truth mt-2 text-caption text-dawn">{t.annual[tier.id]}</p>
                    <p className="mt-4 text-sm text-paper-mid leading-relaxed">{s.reading}</p>
                    <div className="mt-6">
                      <BuyFlow
                        tier={tier}
                        lang={lang}
                        label={label}
                        planName={s.name}
                        variant="cta"
                        t={t.buy}
                      />
                    </div>
                    <p className="voice-truth mt-4 text-caption text-dawn/85 leading-relaxed">
                      {t.priceLock}
                    </p>
                    <p className="voice-truth mt-2 text-caption text-paper-low leading-relaxed">
                      {t.weld}
                    </p>
                  </div>
                ) : (
                  /* the quiet alternatives */
                  <div className="rounded-lg bg-ink-1 hairline p-7 h-full flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <p className="voice-moment text-lg text-paper-hi">{s.name}</p>
                      <span className="voice-truth inline-flex items-center rounded-full bg-dawn px-2.5 py-1 text-caption font-medium text-[#1a1410]">
                        {t.off[tier.id]}
                      </span>
                    </div>
                    <p className="voice-truth mt-2 text-caption text-paper-low">
                      <span className="line-through decoration-rust/60 me-1.5">
                        ${tier.regularMonthly}
                      </span>
                      <span className="text-dawn">${tier.priceMonthly}</span> {closing.perMonth}
                      <span className="mx-1.5" aria-hidden>
                        ·
                      </span>
                      {t.annual[tier.id]}
                    </p>
                    <p className="mt-3 text-caption text-paper-mid leading-relaxed flex-1">
                      {s.reading}
                    </p>
                    <p className="voice-truth mt-4 text-caption text-paper-low">{t.weld}</p>
                    <div className="mt-5">
                      <BuyFlow
                        tier={tier}
                        lang={lang}
                        label={label}
                        planName={s.name}
                        variant="ghost"
                        t={t.buy}
                      />
                    </div>
                  </div>
                )}
              </R>
            );
          })}
        </div>

        <R i={4}>
          <p className="voice-truth mt-10 mx-auto max-w-2xl text-center text-caption text-paper-mid leading-relaxed">
            {t.guarantee}
          </p>
        </R>

        {t.trialLine && (
          <R i={5}>
            <p className="voice-truth mt-4 text-center text-caption text-sage">{t.trialLine}</p>
          </R>
        )}
      </div>
    </section>
  );
}

/* ── 9 · the close — shuts the arc the first line opened ─────────────── */
export function Close9({
  lang,
  t,
  closing,
}: {
  lang: Locale;
  t: Dict["nine"];
  closing: Dict["closing"];
}) {
  return (
    <section className="relative px-6 pt-24 pb-40 text-center">
      <Rs i={0}>
        <h2 className="voice-moment text-display leading-[1.08] text-paper-hi">
          {t.closeH}
        </h2>
      </Rs>
      <R i={1}>
        <Link href={`/${lang}/pricing`} className="cta mt-12">
          {closing.cta}
          <span aria-hidden>{lang === "ar" ? "←" : "→"}</span>
        </Link>
      </R>
      {/* the exclusion line lives AFTER the ask now — a sign-off, not a
          bouncer at the register (the copywriter's "renunciation mode" fix) */}
      <Rf i={2}>
        <p className="mt-14 text-sm text-paper-low">{t.exclusion}</p>
      </Rf>
    </section>
  );
}
