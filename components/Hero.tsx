"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

/**
 * The opening: standing at the trailhead at first light. The WebGL land
 * lives behind this; here only light arrives — nothing slides in.
 */

const line = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.55 + i * 0.28,
      duration: 1.15,
      ease: [0.22, 0.8, 0.24, 1] as const,
    },
  }),
};

export default function Hero({ t }: { t: Dict["hero"] }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* drifting survey contours behind the words */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.14]" aria-hidden>
        <svg
          className="contour-drift absolute top-1/2 -translate-y-1/2 h-[140%] w-[200%]"
          viewBox="0 0 1600 800"
          preserveAspectRatio="none"
          fill="none"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M0 ${180 + i * 86} C 200 ${140 + i * 86}, 340 ${230 + i * 80}, 560 ${185 + i * 84} S 980 ${150 + i * 88}, 1170 ${200 + i * 82} S 1500 ${165 + i * 86}, 1600 ${190 + i * 84}`}
              stroke={i < 2 ? "#8FA6B8" : i < 4 ? "#C6A07A" : "#E8A25C"}
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <motion.p
        custom={0}
        variants={line}
        initial="hidden"
        animate="shown"
        className="wordmark text-[12px] sm:text-[13px] text-paper-mid mb-10"
      >
        Strata
      </motion.p>

      <h1 className="voice-moment text-[clamp(2.6rem,7.2vw,5.6rem)] leading-[1.06] text-paper-hi max-w-5xl">
        <motion.span custom={1} variants={line} initial="hidden" animate="shown" className="block">
          {t.l1}
        </motion.span>
        <motion.span custom={2} variants={line} initial="hidden" animate="shown" className="block">
          {t.l2}
        </motion.span>
        <motion.span
          custom={3}
          variants={line}
          initial="hidden"
          animate="shown"
          className="block text-dawn-hi"
        >
          {t.l3}
        </motion.span>
      </h1>

      <motion.p
        custom={4}
        variants={line}
        initial="hidden"
        animate="shown"
        className="mt-9 text-[15px] sm:text-base text-paper-mid max-w-md"
      >
        {t.sub}
      </motion.p>

      <motion.p
        custom={5}
        variants={line}
        initial="hidden"
        animate="shown"
        className="voice-truth mt-7 text-[11px] sm:text-xs tracking-micro uppercase text-paper-low"
      >
        {t.trust}
      </motion.p>

      {/* the trail begins — breathing contour cue, one ambient element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="micro-label">{t.walkIn}</span>
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none" className="breathe">
          <path d="M2 8 C7 4.5, 12 4.5, 16 7 C19.5 9, 22.5 8.5, 24 7.5" stroke="#8FA6B8" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M2 16 C7 12.5, 12 13, 16 15.2 C19.5 17, 22.5 16.5, 24 15.5" stroke="#C6A07A" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M2 24 C7 20.5, 12 21, 16 23.2 C19.5 25, 22.5 24.5, 24 23.5" stroke="#E8A25C" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
}
