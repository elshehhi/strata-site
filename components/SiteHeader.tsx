"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import StrataMark from "./StrataMark";
import { docsUrl, type Dict, type Locale } from "@/lib/i18n";

/**
 * Instrument titlebar, not a nav bar. Invisible over the opening; condenses
 * into a glass strip once the visitor begins to walk. Carries the field
 * guide (docs-site) link and the live language switch — the switch swaps
 * the locale prefix but keeps your place on the path.
 */
export default function SiteHeader({ lang, t }: { lang: Locale; t: Dict["header"] }) {
  const [walked, setWalked] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setWalked(window.scrollY > window.innerHeight * 0.55);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const other: Locale = lang === "ar" ? "en" : "ar";
  const switchedPath = pathname?.replace(new RegExp(`^/${lang}(?=/|$)`), `/${other}`) ?? `/${other}`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-stage ease-strata ${
        walked ? "glass" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <StrataMark size={24} />
          <span className="wordmark text-[13px] text-paper-hi group-hover:text-dawn-hi transition-colors duration-fast">
            Strata
          </span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-7">
          <a
            href={docsUrl(lang)}
            className="text-[13px] text-paper-mid hover:text-paper-hi transition-colors duration-fast"
          >
            {t.docs}
          </a>
          <Link
            href={`/${lang}/pricing`}
            className="text-[13px] text-paper-mid hover:text-paper-hi transition-colors duration-fast"
          >
            {t.pricing}
          </Link>
          <Link
            href={switchedPath}
            hrefLang={other}
            className="voice-truth text-[11px] text-paper-low hover:text-paper-mid transition-colors duration-fast"
          >
            {t.switchLabel}
          </Link>
          <Link
            href={`/${lang}/pricing`}
            className={`text-[13px] px-4 py-2 rounded transition-all duration-med ease-strata ${
              walked
                ? "bg-dawn text-[#1a1410] font-medium hover:bg-dawn-hi"
                : "border border-hairline-strong text-paper-mid hover:text-paper-hi"
            }`}
          >
            {t.get}
            {/* the UX/copywriter compromise: findable price, undetonated narrative */}
            <span
              className={`voice-truth ms-2 text-[10px] ${
                walked ? "opacity-70" : "text-paper-low"
              }`}
            >
              {t.fromPrice}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
