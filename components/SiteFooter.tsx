import Link from "next/link";
import StrataMark from "./StrataMark";
import { docsUrl, type Dict, type Locale } from "@/lib/i18n";

/** The maker's plate — the same register the closing chapter carried. */
export default function SiteFooter({ lang, t }: { lang: Locale; t: Dict["closing"] }) {
  return (
    <footer className="relative px-6 pb-14">
      <div className="mx-auto max-w-5xl pt-10 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <StrataMark size={22} />
          <span className="wordmark text-[11px] text-paper-mid">Strata</span>
        </div>
        <p className="voice-truth text-[11px] text-paper-low text-center">{t.credit}</p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] text-paper-low">
          <Link href={`/${lang}/download`} className="hover:text-paper-mid transition-colors duration-fast">
            {t.navDownload}
          </Link>
          <Link href={`/${lang}/pricing`} className="hover:text-paper-mid transition-colors duration-fast">
            {t.navPricing}
          </Link>
          <a href={docsUrl(lang)} className="hover:text-paper-mid transition-colors duration-fast">
            {t.navDocs}
          </a>
          <Link href={`/${lang}/account`} className="hover:text-paper-mid transition-colors duration-fast">
            {t.navAccount}
          </Link>
          <Link href={`/${lang}/privacy`} className="hover:text-paper-mid transition-colors duration-fast">
            {t.navPrivacy}
          </Link>
          <Link href={`/${lang}/terms`} className="hover:text-paper-mid transition-colors duration-fast">
            {t.navTerms}
          </Link>
          <a href="mailto:a.elshehhi@gmail.com" className="hover:text-paper-mid transition-colors duration-fast">
            {t.navWrite}
          </a>
        </nav>
      </div>
    </footer>
  );
}
