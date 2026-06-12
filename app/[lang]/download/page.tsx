import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import StrataMark from "@/components/StrataMark";
import { docsUrl, getDict, isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const t = getDict(lang);
  return { title: t.download.metaTitle, description: t.download.p };
}

/**
 * The supply point. One real build (Windows), stated plainly; macOS
 * promised honestly, not pretended. The download button lights up when
 * NEXT_PUBLIC_DOWNLOAD_URL_WIN points at the shipped bundle — until
 * then the card says so and routes to the maker.
 */
export default function DownloadPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const d = getDict(lang);
  const t = d.download;
  const winUrl = process.env.NEXT_PUBLIC_DOWNLOAD_URL_WIN ?? null;

  return (
    <>
      <SiteHeader lang={lang} t={d.header} />
      <main className="relative min-h-screen px-6 pt-36 pb-28 bg-ink-0 overflow-hidden">
        {/* faint survey contours, same bench as pricing */}
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
          <p className="micro-label mb-5">{t.label}</p>
          <h1 className="voice-moment text-4xl sm:text-6xl text-paper-hi leading-[1.08] max-w-2xl">
            {t.h1a}
            <br />
            {t.h1b}
          </h1>
          <p className="mt-6 text-paper-mid text-[15px] max-w-lg leading-relaxed">{t.p}</p>

          <div className="mt-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            {/* the build cards */}
            <div className="space-y-5">
              {/* Windows — the real build */}
              <div className="rounded-lg bg-ink-1 hairline-strong p-8 shadow-[0_0_70px_-22px_rgba(232,162,92,.35)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="voice-moment text-2xl text-paper-hi">{t.winTitle}</h2>
                    <p className="voice-truth mt-2 text-[11px] text-paper-low">{t.winSpec}</p>
                  </div>
                  <span className="voice-truth text-[10px] tracking-micro uppercase px-3 py-1.5 rounded bg-ink-2 border border-hairline text-dawn">
                    {t.version}
                  </span>
                </div>
                <div className="depth-ribbon h-px my-7" dir="ltr" />
                {winUrl ? (
                  <div>
                    <a href={winUrl} className="cta justify-center w-full sm:w-auto">
                      {t.get}
                      <span aria-hidden>↓</span>
                    </a>
                    <p className="mt-5 text-[12px] text-paper-low leading-relaxed max-w-md">
                      {t.smartscreen}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[13px] text-paper-mid leading-relaxed">{t.notUp}</p>
                    <a
                      href="mailto:a.elshehhi@gmail.com?subject=STRATA%20build"
                      className="ghost mt-5"
                    >
                      {t.notify}
                    </a>
                  </div>
                )}
              </div>

              {/* macOS — honest */}
              <div className="rounded-lg bg-ink-1 hairline p-8">
                <h2 className="voice-moment text-xl text-paper-mid">{t.macTitle}</h2>
                <p className="mt-3 text-[13px] text-paper-low leading-relaxed">{t.macLine}</p>
              </div>

              {/* requirements */}
              <div className="rounded-lg bg-ink-1 hairline p-8">
                <p className="micro-label mb-5">{t.reqTitle}</p>
                <ul className="space-y-3">
                  {t.reqs.map((r) => (
                    <li key={r} className="flex gap-3 text-[13px] text-paper-mid leading-snug">
                      <span className="text-sage mt-[1px]" aria-hidden>
                        —
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* after the install — the photograph stays the hero */}
            <div className="lg:sticky lg:top-28">
              <div className="matted rounded overflow-hidden">
                <Image
                  src="/img/flowers8_result.jpg"
                  alt={d.field.titles.poppies}
                  width={900}
                  height={599}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-8 rounded-lg bg-ink-1 hairline p-7">
                <div className="flex items-center gap-3 mb-5">
                  <StrataMark size={20} />
                  <p className="micro-label">{t.afterTitle}</p>
                </div>
                <ol className="space-y-3">
                  {t.afterSteps.map((s, i) => (
                    <li key={s} className="flex gap-4 text-[13px] text-paper-mid leading-snug">
                      <span className="voice-truth text-[11px] text-dawn mt-[1px]">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="border-t border-hairline mt-6 pt-5">
                  <p className="text-[12px] text-paper-low">{t.guideLine}</p>
                  <a
                    href={docsUrl(lang)}
                    className="mt-3 inline-block text-[13px] text-dawn hover:text-dawn-hi transition-colors duration-fast"
                  >
                    {t.guideCta} {lang === "ar" ? "←" : "→"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
