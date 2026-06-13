"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CompareSlider from "./CompareSlider";
import FoundingCountdown from "./FoundingCountdown";
import { FOUNDING_DEADLINE } from "@/lib/tiers";
import type { Dict, Locale } from "@/lib/i18n";

const line = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.35 + i * 0.22, duration: 1.05, ease: [0.22, 0.8, 0.24, 1] as const },
  }),
};

/**
 * Above the fold, the merged verdict of five judges: the accusation the
 * reader recognizes from their own archive, and — beside it, in the same
 * first screen — the proof under their own hand. The Nikon Z 6 pair is
 * shown at its native 2:3 portrait ratio, upright, uncropped.
 */
export default function Hero9({ t, lang }: { t: Dict["nine"]; lang: Locale }) {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-24 pb-16">
      {/* A5 (drifting SVG contours) removed — the living terrain already
          owns the contour language; two terrains was one too many. */}
      <div className="mx-auto max-w-6xl w-full grid lg:grid-cols-[1fr_minmax(300px,420px)] gap-12 lg:gap-16 items-center">
        {/* the accusation */}
        <div>
          <motion.p
            custom={0}
            variants={line}
            initial="hidden"
            animate="shown"
            className="wordmark text-[12px] text-paper-mid mb-9"
          >
            Strata
          </motion.p>

          <h1 className="voice-moment text-[clamp(2.1rem,5vw,3.9rem)] leading-[1.14] text-paper-hi">
            <motion.span custom={1} variants={line} initial="hidden" animate="shown" className="block">
              {t.heroL1}
            </motion.span>
            <motion.span custom={2} variants={line} initial="hidden" animate="shown" className="block">
              {t.heroL2}
            </motion.span>
            <motion.span
              custom={3}
              variants={line}
              initial="hidden"
              animate="shown"
              className="block text-dawn-hi"
            >
              {t.heroL3}
            </motion.span>
          </h1>

          {/* STORY — the epiphany bridge, in the maker's voice */}
          <motion.p
            custom={4}
            variants={line}
            initial="hidden"
            animate="shown"
            className="mt-7 text-[15px] text-paper-mid max-w-md leading-relaxed"
          >
            {t.heroStory}
          </motion.p>

          {/* OFFER — the launch discount, brought up to the first screen */}
          <motion.div
            custom={5}
            variants={line}
            initial="hidden"
            animate="shown"
            className="mt-8"
          >
            <span className="voice-truth inline-flex items-center rounded-full bg-dawn px-3.5 py-1.5 text-[14px] font-medium tracking-tight text-[#1a1410]">
              {t.heroOfferLabel}
            </span>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href={`/${lang}/pricing`} className="cta">
                {t.heroOfferCta}
                <span aria-hidden>{lang === "ar" ? "←" : "→"}</span>
              </Link>
              {FOUNDING_DEADLINE && (
                <FoundingCountdown deadline={FOUNDING_DEADLINE} t={t.countdown} compact />
              )}
            </div>
            <p className="voice-truth mt-3 text-[11px] text-paper-low leading-relaxed">
              {t.heroOfferSub}
            </p>
          </motion.div>

          <motion.p
            custom={6}
            variants={line}
            initial="hidden"
            animate="shown"
            className="mt-7 text-[14px] text-paper-mid max-w-md leading-relaxed"
          >
            {t.drag}
          </motion.p>

          <motion.p
            custom={7}
            variants={line}
            initial="hidden"
            animate="shown"
            className="voice-truth mt-5 text-[11px] tracking-micro uppercase text-paper-low"
          >
            {t.trust}
          </motion.p>
        </div>

        {/* the proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 0.8, 0.24, 1] }}
        >
          <CompareSlider
            beforeSrc="/img/flower5_frame1.jpg"
            afterSrc="/img/flower5_result.jpg"
            beforeAlt={t.altBefore}
            afterAlt={t.altAfter}
            beforeLabel={t.beforeLabel}
            afterLabel={t.afterLabel}
            aspectClass="aspect-[2/3]"
            priority
          />
          <p className="voice-truth mt-4 text-[10px] leading-relaxed text-paper-low">
            {t.credit}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
