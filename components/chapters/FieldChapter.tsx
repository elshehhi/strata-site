"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * Work from the field — every photograph here is a real STRATA merge
 * (the same images that anchor the product documentation). The strip
 * drifts laterally as the visitor walks, like reading a panorama.
 */
/* Each plate hangs at its photograph's NATIVE aspect — landscape 3:2,
   portrait 2:3 — never cropped sideways into a uniform box. */
const WORK = [
  { src: "/img/dunes_result.jpg", key: "dunes", portrait: false },
  { src: "/img/flowers8_result.jpg", key: "poppies", portrait: false },
  { src: "/img/cave_result.jpg", key: "towers", portrait: true },
  { src: "/img/rocks_result.jpg", key: "wadi", portrait: false },
  { src: "/img/flowers1_result.jpg", key: "bloom", portrait: true },
  { src: "/img/dunes200_result.jpg", key: "ridges", portrait: false },
] as const;

export default function FieldChapter({ t, lede }: { t: Dict["field"]; lede?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;
        const drift = () => -(el.scrollWidth - window.innerWidth + 96);
        const tween = gsap.fromTo(
          el,
          { x: 0 },
          {
            x: drift,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              // shortened ~40% (panel: the pin sat between the warm buyer
              // and the price; the plates can sell without holding anyone)
              end: "+=1400",
              scrub: 0.8,
              pin: true,
              invalidateOnRefresh: true,
            },
          }
        );
        return () => tween.kill();
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center py-20">
        <div className="px-6 md:px-16 mb-12">
          <p className="micro-label mb-5">{t.chapter}</p>
          <h2 className="voice-moment text-4xl sm:text-5xl text-paper-hi leading-tight">
            {t.h}
          </h2>
          <p className="mt-4 text-paper-mid text-body max-w-md">{t.p}</p>
          {lede && (
            <p className="voice-moment mt-6 text-xl text-dawn-hi">{lede}</p>
          )}
        </div>

        <div
          ref={track}
          className="flex items-center gap-8 px-6 md:px-16 will-change-transform md:flex-nowrap flex-wrap"
        >
          {WORK.map((w) => (
            <figure
              key={w.src}
              className={`shrink-0 ${w.portrait ? "w-[52vw] sm:w-[238px]" : "w-[78vw] sm:w-[480px]"}`}
            >
              <div className="matted rounded overflow-hidden">
                <Image
                  src={w.src}
                  alt={`${t.titles[w.key]} — ${t.altSuffix}`}
                  width={w.portrait ? 600 : 900}
                  height={w.portrait ? 900 : 600}
                  className={`w-full object-cover ${w.portrait ? "aspect-[2/3]" : "aspect-[3/2]"}`}
                />
              </div>
              {/* gallery plate */}
              <figcaption className="mt-5 flex items-baseline justify-between gap-3">
                <span className="voice-moment text-lg text-paper-hi">{t.titles[w.key]}</span>
                <span className="voice-truth text-micro tracking-micro uppercase text-paper-low">
                  {t.chip}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
