import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import StrataMark from "@/components/StrataMark";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  return { title: getDict(lang).account.metaTitle, robots: { index: false } };
}

/**
 * The register, revisited. Subscription changes go through Stripe's
 * customer-portal login link (NEXT_PUBLIC_STRIPE_PORTAL_URL — the
 * no-code portal URL from the Stripe dashboard). Until the register
 * opens, the maker handles changes personally and the page says so.
 */
export default function AccountPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const d = getDict(lang);
  const t = d.account;
  const portalUrl = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL ?? null;

  return (
    <>
      <SiteHeader lang={lang} t={d.header} />
      <main className="relative min-h-screen px-6 pt-36 pb-28 bg-ink-0">
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center">
            <StrataMark size={30} />
          </div>
          <p className="micro-label mt-10 mb-4 text-center">{t.label}</p>
          <h1 className="voice-moment text-4xl sm:text-5xl text-paper-hi leading-tight text-center">
            {t.h}
          </h1>
          <p className="mt-6 text-paper-mid text-body leading-relaxed text-center max-w-md mx-auto">
            {t.p}
          </p>

          <div className="mt-14 rounded-lg bg-ink-1 hairline-strong p-9 text-center shadow-[0_0_70px_-22px_rgba(232,162,92,.3)]">
            {portalUrl ? (
              <>
                <a href={portalUrl} className="cta justify-center">
                  {t.open}
                  <span aria-hidden>{lang === "ar" ? "←" : "→"}</span>
                </a>
                <p className="voice-truth mt-6 text-caption text-paper-low leading-relaxed max-w-sm mx-auto">
                  {t.portalNote}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-paper-mid leading-relaxed max-w-sm mx-auto">
                  {t.notUp}
                </p>
                <a
                  href="mailto:a.elshehhi@gmail.com?subject=STRATA%20subscription"
                  className="ghost mt-7"
                >
                  {t.write}
                </a>
              </>
            )}
          </div>

          {/* honesty about cancelling — same custody voice as chapter five */}
          <div className="mt-10 rounded-lg bg-ink-1 hairline p-8">
            <p className="micro-label mb-5">{t.cancelTitle}</p>
            <ul className="space-y-3">
              {t.cancelLines.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-paper-mid leading-snug">
                  <span className="text-sage mt-[1px]" aria-hidden>
                    —
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
