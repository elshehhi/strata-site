"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import StrataMark from "../StrataMark";
import { TIERS } from "@/lib/tiers";
import { docsUrl, type Dict, type Locale } from "@/lib/i18n";

const rise = {
  hidden: { opacity: 0, y: 30 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 1.0, ease: [0.22, 0.8, 0.24, 1] as const },
  }),
};

/**
 * The print room, then the trailhead register. The finished photograph
 * hangs matted; beneath it, the three kits — and the maker's plate.
 */
export default function ClosingChapter({
  lang,
  t,
  tiersT,
}: {
  lang: Locale;
  t: Dict["closing"];
  tiersT: Dict["tiers"];
}) {
  return (
    <section className="relative px-6 pt-40 pb-16">
      <div className="mx-auto max-w-5xl">
        {/* the print on the wall */}
        <motion.div
          custom={0}
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl"
        >
          <div className="matted rounded overflow-hidden">
            <Image
              src="/img/flowers7_refined.jpg"
              alt={t.altPrint}
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
          <div className="mt-6 flex items-baseline justify-between">
            <span className="voice-moment text-lg text-paper-hi">{t.printTitle}</span>
            <span className="voice-truth text-[10px] tracking-micro uppercase text-paper-low">
              {t.printChip}
            </span>
          </div>
        </motion.div>

        {/* the ask — quiet, once */}
        <motion.div
          custom={1}
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-32 text-center"
        >
          <h2 className="voice-moment text-4xl sm:text-5xl text-paper-hi leading-tight">
            {t.h}
          </h2>
          <p className="mt-5 text-paper-mid text-[15px]">{t.p}</p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-4">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              custom={2 + i}
              variants={rise}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Link
                href={`/${lang}/pricing#${tier.id}`}
                className={`block rounded-lg p-7 transition-all duration-med ease-strata bg-ink-1 hover:bg-ink-2 ${
                  tier.recommended
                    ? "hairline-strong shadow-[0_0_50px_-18px_rgba(232,162,92,.4)]"
                    : "hairline"
                }`}
              >
                <p className="voice-moment text-xl text-paper-hi">{tiersT[tier.id].name}</p>
                <p className="voice-truth mt-2 text-[12px] text-paper-low">
                  {t.from} <span className="text-dawn">${tier.priceMonthly}</span> {t.perMonth}
                </p>
                <p className="mt-4 text-[13px] text-paper-mid leading-relaxed">
                  {tiersT[tier.id].reading}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          custom={5}
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href={`/${lang}/pricing`} className="cta">
            {t.cta}
            <span aria-hidden>{lang === "ar" ? "←" : "→"}</span>
          </Link>
        </motion.div>

        {/* maker's plate */}
        <footer className="mt-36 pt-10 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <StrataMark size={22} />
            <span className="wordmark text-[11px] text-paper-mid">Strata</span>
          </div>
          <p className="voice-truth text-[11px] text-paper-low text-center">{t.credit}</p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] text-paper-low">
            <Link
              href={`/${lang}/download`}
              className="hover:text-paper-mid transition-colors duration-fast"
            >
              {t.navDownload}
            </Link>
            <Link
              href={`/${lang}/pricing`}
              className="hover:text-paper-mid transition-colors duration-fast"
            >
              {t.navPricing}
            </Link>
            <a
              href={docsUrl(lang)}
              className="hover:text-paper-mid transition-colors duration-fast"
            >
              {t.navDocs}
            </a>
            <Link
              href={`/${lang}/account`}
              className="hover:text-paper-mid transition-colors duration-fast"
            >
              {t.navAccount}
            </Link>
            <Link
              href={`/${lang}/privacy`}
              className="hover:text-paper-mid transition-colors duration-fast"
            >
              {t.navPrivacy}
            </Link>
            <Link
              href={`/${lang}/terms`}
              className="hover:text-paper-mid transition-colors duration-fast"
            >
              {t.navTerms}
            </Link>
            <a
              href="mailto:a.elshehhi@gmail.com"
              className="hover:text-paper-mid transition-colors duration-fast"
            >
              {t.navWrite}
            </a>
          </nav>
        </footer>
      </div>
    </section>
  );
}
