"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import StrataMark from "./StrataMark";
import { type Dict, type Locale } from "@/lib/i18n";

/**
 * Instrument titlebar, not a nav bar. Invisible over the opening; condenses
 * into a glass strip once the visitor begins to walk. Carries the field
 * guide (docs-site) link and the live language switch — the switch swaps
 * the locale prefix but keeps your place on the path.
 *
 * On phones the four controls don't fit a 375px row (Arabic labels are
 * wide), so they collapse behind a single mark; the desktop row is
 * unchanged at sm and up.
 */
export default function SiteHeader({ lang, t }: { lang: Locale; t: Dict["header"] }) {
  const [walked, setWalked] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setWalked(window.scrollY > window.innerHeight * 0.55);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close the sheet whenever the route changes (a link was followed).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const other: Locale = lang === "ar" ? "en" : "ar";
  const switchedPath = pathname?.replace(new RegExp(`^/${lang}(?=/|$)`), `/${other}`) ?? `/${other}`;

  const linkBase = "text-[13px] text-paper-mid hover:text-paper-hi transition-colors duration-fast";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-stage ease-strata ${
        walked || open ? "glass" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <StrataMark size={24} />
          <span className="wordmark text-[13px] text-paper-hi group-hover:text-dawn-hi transition-colors duration-fast">
            Strata
          </span>
        </Link>

        {/* Desktop row — unchanged, hidden on phones */}
        <nav className="hidden sm:flex items-center gap-5 sm:gap-7">
          <Link href={`/${lang}/pricing`} className={linkBase}>
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
            <span className={`voice-truth ms-2 text-[10px] ${walked ? "opacity-70" : "text-paper-low"}`}>
              {t.fromPrice}
            </span>
          </Link>
        </nav>

        {/* Mobile trigger — a quiet mark, not a loud bar */}
        <button
          type="button"
          aria-label={t.pricing}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden -me-2 p-2 text-paper-mid hover:text-paper-hi transition-colors duration-fast"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3.5" y1="7" x2="20.5" y2="7" />
                <line x1="3.5" y1="12" x2="20.5" y2="12" />
                <line x1="3.5" y1="17" x2="20.5" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile sheet — stacked, generous touch targets, glass behind it */}
      {open && (
        <nav className="sm:hidden border-t border-hairline px-6 pt-3 pb-6 flex flex-col">
          <Link href={`/${lang}/pricing`} className={`${linkBase} py-3`}>
            {t.pricing}
          </Link>
          <Link
            href={switchedPath}
            hrefLang={other}
            className="voice-truth text-[12px] text-paper-low hover:text-paper-mid transition-colors duration-fast py-3 border-t border-hairline/60"
          >
            {t.switchLabel}
          </Link>
          <Link
            href={`/${lang}/pricing`}
            className="mt-4 text-[14px] text-center px-4 py-3 rounded bg-dawn text-[#1a1410] font-medium hover:bg-dawn-hi transition-all duration-med ease-strata"
          >
            {t.get}
            <span className="voice-truth ms-2 text-[11px] opacity-70">{t.fromPrice}</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
