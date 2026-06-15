"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const rise = {
  hidden: { opacity: 0, y: 30 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.16, duration: 1.0, ease: [0.22, 0.8, 0.24, 1] as const },
  }),
};

/**
 * The quietest room on the site. Premium perception is mostly kept
 * promises, visibly kept — these three are the engine's real guarantees,
 * stated without raising the voice.
 */
export default function TrustChapter({ t }: { t: Dict["trust"] }) {
  return (
    <section className="relative px-6 py-44">
      {/* deepen the night for this room */}
      <div className="absolute inset-0 bg-[#080705]/80" />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          custom={0}
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          className="micro-label mb-7"
        >
          {t.chapter}
        </motion.p>

        <motion.h2
          custom={1}
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          className="voice-moment text-4xl sm:text-6xl leading-[1.1] text-paper-hi"
        >
          {t.h}
        </motion.h2>

        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-7 text-paper-mid text-body max-w-lg mx-auto leading-relaxed"
        >
          {t.p}
        </motion.p>

        <div className="mt-20 grid sm:grid-cols-3 gap-px bg-[rgba(255,214,165,.07)] hairline rounded-lg overflow-hidden text-start">
          {t.promises.map((p, i) => (
            <motion.div
              key={p.k}
              custom={3 + i}
              variants={rise}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.5 }}
              className="bg-ink-1 p-8"
            >
              <p className="voice-truth text-caption tracking-micro text-sage mb-4">{p.k}</p>
              <p className="text-paper-mid text-sm leading-relaxed">{p.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
