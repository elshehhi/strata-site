import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import MakerLetter from "@/components/nine/MakerLetter";
import { TIERS, activateUrl } from "@/lib/tiers";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const t = getDict(lang);
  return { title: t.pricing.metaTitle, description: t.pricing.metaDesc };
}

/**
 * Not a comparison matrix — three kit cases on a bench. Each states what
 * it carries and, honestly, where its edge is. Exactly one action per card.
 */
export default function PricingPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const d = getDict(lang);
  const t = d.pricing;

  return (
    <>
      <SiteHeader lang={lang} t={d.header} />
      <main className="relative min-h-screen px-6 pt-36 pb-28 bg-ink-0">
        {/* faint survey contours on the bench */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden>
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <path
                key={i}
                d={`M0 ${90 + i * 95} C 240 ${60 + i * 95}, 420 ${130 + i * 92}, 640 ${95 + i * 94} S 1040 ${70 + i * 96}, 1200 ${100 + i * 94}`}
                stroke="#E8A25C"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <p className="micro-label mb-5">{t.register}</p>
          <h1 className="voice-moment text-4xl sm:text-6xl text-paper-hi leading-[1.08] max-w-2xl">
            {t.h1a}
            <br />
            {t.h1b}
          </h1>
          <p className="mt-6 text-paper-mid text-[15px] max-w-lg leading-relaxed">{t.p}</p>

          {/* the bridge between conviction and the ask */}
          <div className="mt-14">
            <MakerLetter t={d.nine} />
          </div>

          <div className="mt-14 grid lg:grid-cols-3 gap-5 items-stretch">
            {TIERS.map((tier) => {
              const s = d.tiers[tier.id];
              return (
                <div
                  id={tier.id}
                  key={tier.id}
                  className={`relative flex flex-col rounded-lg bg-ink-1 p-8 scroll-mt-28 ${
                    tier.recommended
                      ? "hairline-strong shadow-[0_0_44px_-20px_rgba(232,162,92,.25)]"
                      : "hairline"
                  }`}
                >
                  {tier.recommended && (
                    <span className="voice-truth absolute -top-3 start-8 px-3 py-1 rounded bg-ink-2 border border-hairline-strong text-[10px] tracking-micro uppercase text-dawn">
                      {t.badge}
                    </span>
                  )}

                  <h2 className="voice-moment text-2xl text-paper-hi">{s.name}</h2>
                  <p className="mt-3 text-[13px] text-paper-mid leading-relaxed min-h-[40px]">
                    {s.reading}
                  </p>

                  <p className="mt-7 flex items-baseline gap-2">
                    <span className="voice-moment text-5xl text-paper-hi">${tier.priceMonthly}</span>
                    <span className="voice-truth text-[11px] text-paper-low">{t.perMonth}</span>
                  </p>
                  <p className="voice-truth mt-1.5 text-[11px] text-dawn">
                    {d.nine.annual[tier.id]}
                  </p>

                  <ul className="mt-8 space-y-3 flex-1">
                    {s.carries.map((c) => (
                      <li key={c} className="flex gap-3 text-[13px] text-paper-mid leading-snug">
                        <span className="text-sage mt-[1px]" aria-hidden>
                          —
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>

                  {s.edge && (
                    <p className="voice-truth mt-6 text-[11px] text-paper-low leading-relaxed">
                      {s.edge}
                    </p>
                  )}

                  <a
                    href={activateUrl(tier.id, "monthly")}
                    className={`mt-8 text-center ${
                      tier.recommended ? "cta justify-center" : "ghost justify-center"
                    }`}
                  >
                    {t.take(s.name)}
                  </a>
                  <a
                    href={activateUrl(tier.id, "annual")}
                    className="voice-truth mt-3 text-center text-[11px] text-paper-low hover:text-dawn transition-colors duration-fast"
                  >
                    {d.nine.payAnnual[tier.id]}
                  </a>
                  {/* the guarantees, welded to the price — not four chapters away */}
                  <p className="voice-truth mt-5 text-[10px] text-paper-low leading-relaxed text-center">
                    {d.nine.weld}
                  </p>
                </div>
              );
            })}
          </div>

          {d.nine.trialLine && (
            <p className="voice-truth mt-10 text-[12px] text-sage text-center">
              {d.nine.trialLine}
            </p>
          )}
          <p className="voice-truth mt-6 text-[11px] text-paper-low text-center">{t.note}</p>
        </div>
      </main>
    </>
  );
}
