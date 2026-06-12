"use client";

import { motion } from "framer-motion";
import StrataMark from "../StrataMark";
import type { Dict } from "@/lib/i18n";

/**
 * The Maker's Letter — the bridge between conviction and the ask.
 * One matted page from the field journal: why a subscription, what it
 * funds, and the promise that the photographs never depend on it.
 * Signed, because the signature IS the continuity answer.
 */
export default function MakerLetter({ t }: { t: Dict["nine"] }) {
  return (
    <motion.div
      /* the letter settles like a page laid on the bench — no commute */
      initial={{ opacity: 0, scale: 0.985 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.3, ease: [0.22, 0.8, 0.24, 1] }}
      className="mx-auto max-w-xl"
    >
      <div className="matted rounded-lg bg-ink-1 p-9 sm:p-10">
        <div className="flex items-center gap-3 mb-7">
          <StrataMark size={20} />
          <p className="micro-label">{t.letterLabel}</p>
        </div>
        <p className="voice-moment text-xl text-paper-hi">{t.letter1}</p>
        <p className="mt-5 text-[14.5px] text-paper-mid leading-relaxed">{t.letter2}</p>
        <p className="mt-4 text-[14.5px] text-paper-mid leading-relaxed">{t.letter3}</p>
        <p className="voice-moment mt-7 text-[15px] text-dawn-hi">{t.letterSign}</p>
      </div>
    </motion.div>
  );
}
