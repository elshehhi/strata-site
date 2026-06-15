"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * The emotional center. Not features — the order of authority.
 *
 * Four beats, scrubbed:
 *   I    the tool reads the scene          (strategy screen rises from the land)
 *   II   it proposes three readings        (the choice glows, alternates wait)
 *   III  the artist paints the decision    (the brush that confesses its donor frame)
 *   IV   the creed, full bleed             ("The tool suggests. The artist decides.")
 *
 * The screenshots are the real instrument — no browser chrome, no laptop
 * mockups. They surface through a ridgeline clip, like strata exposed in
 * a cut bank.
 */
export default function ArtistChapter({ t }: { t: Dict["artist"] }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          quiet: "(max-width: 767px), (prefers-reduced-motion: reduce)",
        },
        (c) => {
          if (!c.conditions?.desktop) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=4200",
              scrub: 0.9,
              pin: true,
              anticipatePin: 1,
            },
            defaults: { ease: "none" },
          });

          // ── beat I — the proposal rises out of the terrain ─────────────
          tl.fromTo(
            ".ac-screen-strategy",
            { clipPath: "inset(100% 0% 0% 0%)", y: 80 },
            { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 2.0, ease: "power1.inOut" }
          )
            .fromTo(
              ".ac-copy-1",
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.8 },
              "-=1.0"
            )
            .to({}, { duration: 0.7 })

            // ── beat II — three readings of one scene ────────────────────
            .to(".ac-copy-1", { opacity: 0, y: -18, duration: 0.5 })
            .fromTo(
              ".ac-copy-2",
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.8 }
            )
            .fromTo(
              ".ac-reading",
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.22 },
              "-=0.4"
            )
            .to({}, { duration: 0.9 })

            // ── beat III — the hand takes over ───────────────────────────
            .to(".ac-copy-2", { opacity: 0, y: -18, duration: 0.5 })
            .to(".ac-readings", { opacity: 0, duration: 0.5 }, "<")
            .to(
              ".ac-screen-strategy",
              { opacity: 0, scale: 0.985, duration: 0.9 },
              "<"
            )
            .fromTo(
              ".ac-screen-brush",
              { clipPath: "inset(100% 0% 0% 0%)", y: 80, opacity: 1 },
              { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 2.0, ease: "power1.inOut" },
              "-=0.4"
            )
            .fromTo(
              ".ac-copy-3",
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.8 },
              "-=1.0"
            )
            .to({}, { duration: 0.9 })

            // ── beat IV — the creed ──────────────────────────────────────
            .to(".ac-copy-3", { opacity: 0, y: -18, duration: 0.5 })
            .to(".ac-screen-brush", { opacity: 0.12, scale: 0.985, duration: 1.0 }, "<")
            .fromTo(
              ".ac-creed-1",
              { opacity: 0, y: 30, filter: "blur(6px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 }
            )
            .fromTo(
              ".ac-creed-2",
              { opacity: 0, y: 30, filter: "blur(6px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
              "-=0.5"
            )
            .fromTo(
              ".ac-creed-3",
              { opacity: 0 },
              { opacity: 1, duration: 0.8 },
              "-=0.3"
            )
            .to({}, { duration: 1.2 });

          return () => tl.kill();
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden">
      {/* a darker stratum behind this chapter so the screens read */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0a08e6] to-transparent" />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <p className="micro-label mb-12">{t.chapter}</p>

        {/* the instrument, surfacing from the land */}
        <div className="relative w-full max-w-4xl">
          <div className="ac-screen-strategy ridge-clip relative w-full overflow-hidden will-change-transform">
            <Image
              src={t.strategyShot}
              alt={t.altStrategy}
              width={1920}
              height={888}
              className="w-full h-auto"
              priority={false}
            />
            {/* dawn light pass over the surfacing screen */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#e8a25c14]"
              aria-hidden
            />
          </div>

          <div className="ac-screen-brush ridge-clip absolute inset-0 w-full overflow-hidden will-change-transform md:[clip-path:inset(100%_0%_0%_0%)]">
            <Image
              src={t.brushShot}
              alt={t.altBrush}
              width={1920}
              height={888}
              className="w-full h-auto"
            />
          </div>

          {/* three readings — chips over the strategy screen */}
          <div className="ac-readings absolute -bottom-6 left-1/2 -translate-x-1/2 hidden md:flex gap-3">
            {t.readings.map((k, i) => (
              <span
                key={k}
                className={`ac-reading voice-truth text-caption px-4 py-2 rounded glass opacity-0 ${
                  i === 0
                    ? "text-dawn-hi border-dawn/40 shadow-[0_0_30px_-6px_rgba(232,162,92,.5)]"
                    : "text-paper-low"
                }`}
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* the readings of each beat */}
        <div className="relative mt-16 w-full max-w-xl text-center min-h-[150px]">
          <div className="ac-copy-1 md:absolute md:inset-x-0">
            <h2 className="voice-moment text-heading text-paper-hi leading-tight">
              {t.b1h}
            </h2>
            <p className="mt-5 text-paper-mid text-body leading-relaxed">{t.b1p}</p>
          </div>

          <div className="ac-copy-2 md:absolute md:inset-x-0 md:opacity-0">
            <h2 className="voice-moment text-heading text-paper-hi leading-tight">
              {t.b2h}
            </h2>
            <p className="mt-5 text-paper-mid text-body leading-relaxed">{t.b2p}</p>
          </div>

          <div className="ac-copy-3 md:absolute md:inset-x-0 md:opacity-0">
            <h2 className="voice-moment text-heading text-paper-hi leading-tight">
              {t.b3h}
            </h2>
            <p className="mt-5 text-paper-mid text-body leading-relaxed">{t.b3p}</p>
          </div>
        </div>

        {/* beat IV — the creed, above everything */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="ac-creed-1 voice-moment opacity-0 text-display leading-[1.1] text-paper-hi">
            {t.creed1}
          </h2>
          <h2 className="ac-creed-2 voice-moment opacity-0 text-display leading-[1.1] text-dawn-hi">
            {t.creed2}
          </h2>
          <p className="ac-creed-3 opacity-0 mt-8 text-paper-mid text-body">{t.creed3}</p>
        </div>
      </div>
    </section>
  );
}
