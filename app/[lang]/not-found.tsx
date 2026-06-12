import Link from "next/link";
import StrataMark from "@/components/StrataMark";
import { getDict } from "@/lib/i18n";

/**
 * Off the trail. Next's not-found boundary carries no params, so this
 * page speaks both languages — Arabic first, like everything else.
 */
export default function NotFound() {
  const ar = getDict("ar").notFound;
  const en = getDict("en").notFound;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-ink-0 overflow-hidden">
      {/* a lone contour wandering off the map */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M0 ${260 + i * 70} C 280 ${210 + i * 70}, 460 ${300 + i * 66}, 700 ${250 + i * 70} S 1080 ${230 + i * 72}, 1200 ${270 + i * 68}`}
              stroke={i === 2 ? "#E8A25C" : "#8FA6B8"}
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <StrataMark size={30} />
      <p className="voice-truth mt-10 text-[12px] tracking-micro text-paper-low">{ar.code}</p>

      <div dir="rtl" lang="ar" className="mt-6">
        <h1 className="voice-moment text-4xl sm:text-5xl text-paper-hi leading-tight">{ar.h}</h1>
        <p className="mt-4 text-paper-mid text-[15px]">{ar.p}</p>
      </div>

      <div dir="ltr" lang="en" className="mt-8 opacity-70">
        <h2 className="voice-moment text-2xl text-paper-mid leading-tight">{en.h}</h2>
        <p className="mt-2 text-paper-low text-[13px]">{en.p}</p>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Link href="/ar" className="cta">
          {ar.home}
        </Link>
        <a href="/docs/ar/index.html" className="ghost">
          {ar.docs}
        </a>
        <a href="/docs/en/index.html" className="ghost opacity-70" dir="ltr" lang="en">
          {en.docs}
        </a>
      </div>
    </main>
  );
}
