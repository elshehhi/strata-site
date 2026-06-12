import SiteHeader from "./SiteHeader";
import StrataMark from "./StrataMark";
import type { Dict, Locale } from "@/lib/i18n";

export interface LedgerSection {
  h: string;
  body: string[];
}

/**
 * The shared frame for the legal ledgers (privacy, terms): a field
 * notebook, not a wall of grey legalese — serif section heads, hairline
 * rules, mono dateline, one column of honest sentences.
 */
export default function LedgerPage({
  lang,
  header,
  label,
  title,
  updated,
  intro,
  sections,
}: {
  lang: Locale;
  header: Dict["header"];
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: LedgerSection[];
}) {
  return (
    <>
      <SiteHeader lang={lang} t={header} />
      <main className="relative min-h-screen px-6 pt-36 pb-28 bg-ink-0">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 mb-8">
            <StrataMark size={22} />
            <p className="micro-label">{label}</p>
          </div>
          <h1 className="voice-moment text-4xl sm:text-5xl text-paper-hi leading-tight">{title}</h1>
          <p className="voice-truth mt-4 text-[11px] text-paper-low">{updated}</p>
          <p className="mt-8 text-paper-mid text-[15px] leading-relaxed">{intro}</p>

          <div className="depth-ribbon h-px my-12" dir="ltr" />

          <div className="space-y-12">
            {sections.map((s, i) => (
              <section key={s.h}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="voice-truth text-[11px] text-dawn">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="voice-moment text-xl sm:text-2xl text-paper-hi">{s.h}</h2>
                </div>
                <div className="space-y-3 ps-9">
                  {s.body.map((p) => (
                    <p key={p} className="text-[14px] text-paper-mid leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-hairline">
            <a
              href="mailto:a.elshehhi@gmail.com?subject=STRATA"
              className="voice-truth text-[12px] text-paper-low hover:text-paper-mid transition-colors duration-fast"
            >
              a.elshehhi@gmail.com
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
