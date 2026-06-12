"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const rise = {
  hidden: { opacity: 0, y: 36 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.22, 0.8, 0.24, 1] as const },
  },
};

/**
 * "Depth is a place." The reserved near→far axis — the one gradient in the
 * whole product that is allowed to mean something — and the focus map the
 * instrument actually draws. The ribbon keeps its physical direction
 * (warm start → cool end) in both reading directions; the labels follow
 * the document flow.
 */
export default function DepthChapter({ t }: { t: Dict["depth"] }) {
  return (
    <section className="relative px-6 py-40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="micro-label mb-5">{t.chapter}</p>
          <h2 className="voice-moment text-4xl sm:text-5xl leading-[1.12] text-paper-hi max-w-3xl">
            {t.h1a}
            <br />
            {t.h1b}
          </h2>
        </motion.div>

        {/* the depth axis itself */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16"
        >
          <div className="depth-ribbon h-px w-full" dir="ltr" />
          <div className="voice-truth mt-3 flex justify-between text-[11px] text-paper-low" dir="ltr">
            <span className="text-dawn" dir="auto">{t.near}</span>
            <span dir="auto">{t.mid}</span>
            <span className="text-far" dir="auto">{t.far}</span>
          </div>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.4 }}
            className="ridge-clip-b overflow-hidden"
          >
            <Image
              src="/screens/en_11_focusmap.png"
              alt={t.altMap}
              width={1920}
              height={888}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.4 }}
          >
            <h3 className="voice-moment text-2xl sm:text-3xl text-paper-hi leading-snug">
              {t.h2}
            </h3>
            <p className="mt-5 text-paper-mid text-[15px] leading-relaxed">{t.p}</p>
            <p className="voice-truth mt-7 text-[11px] tracking-micro uppercase text-paper-low">
              {t.note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
