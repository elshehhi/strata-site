"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * "The land is made of layers."
 * The real bracket: a near-focused frame, a far-focused frame, and the
 * merged photograph (flower5 — actual STRATA output, not stock). On scroll
 * the plates fan apart in depth like strata in a cut bank, then settle
 * back into the single finished image.
 */
export default function LayersChapter({ t }: { t: Dict["layers"] }) {
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
              end: "+=2600",
              scrub: 0.9,
              pin: true,
              anticipatePin: 1,
            },
            defaults: { ease: "none" },
          });

          // beat 1 — the stack fans apart in depth
          tl.fromTo(
            ".plate-near",
            { yPercent: 0, rotateX: 0, z: 0, opacity: 0.0 },
            { yPercent: 26, rotateX: 9, z: 120, opacity: 1, duration: 1.4 }
          )
            .fromTo(
              ".plate-far",
              { yPercent: 0, rotateX: 0, z: 0, opacity: 0.0 },
              { yPercent: -26, rotateX: 9, z: -140, opacity: 1, duration: 1.4 },
              "<"
            )
            .fromTo(
              ".plate-label",
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
              "-=0.5"
            )
            .fromTo(
              ".layers-copy-1",
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.7 },
              "-=0.6"
            )

            // beat 2 — hold, breathe
            .to({}, { duration: 0.8 })
            .to(".layers-copy-1", { opacity: 0, y: -18, duration: 0.5 })

            // beat 3 — the layers converge into one image
            .to(".plate-near", { yPercent: 0, rotateX: 0, z: 0, duration: 1.5 })
            .to(".plate-far", { yPercent: 0, rotateX: 0, z: 0, duration: 1.5 }, "<")
            .to(".plate-label", { opacity: 0, duration: 0.4 }, "<")
            .fromTo(
              ".plate-result",
              { opacity: 0 },
              { opacity: 1, duration: 1.2 },
              "-=0.9"
            )
            // dawn seam flash as the merge lands
            .fromTo(
              ".merge-seam",
              { scaleX: 0, opacity: 0.9 },
              { scaleX: 1, opacity: 0, duration: 1.0, ease: "power2.out" },
              "-=0.8"
            )
            .fromTo(
              ".layers-copy-2",
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.8 },
              "-=0.5"
            )
            .to({}, { duration: 0.8 });

          return () => tl.kill();
        }
      );

      // quiet fallback handled by CSS defaults (everything visible, stacked)
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden">
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="grid md:grid-cols-[1fr_minmax(300px,420px)] gap-14 items-center max-w-6xl w-full">
          {/* the stack */}
          <div
            className="relative mx-auto w-full max-w-[420px] aspect-[2/3]"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <div className="plate-far absolute inset-0 will-change-transform">
              <Image
                src="/img/flower5_frame2.jpg"
                alt={t.altFar}
                fill
                sizes="420px"
                className="object-cover rounded-lg"
              />
              <span className="plate-label voice-truth absolute -right-3 top-5 translate-x-full text-caption text-far hidden md:block" dir="auto">
                {t.farLabel}
              </span>
            </div>
            <div className="plate-near absolute inset-0 will-change-transform">
              <Image
                src="/img/flower5_frame1.jpg"
                alt={t.altNear}
                fill
                sizes="420px"
                className="object-cover rounded-lg"
              />
              <span className="plate-label voice-truth absolute -right-3 bottom-5 translate-x-full text-caption text-dawn hidden md:block" dir="auto">
                {t.nearLabel}
              </span>
            </div>
            <div className="plate-result absolute inset-0 md:opacity-0 matted rounded-lg overflow-hidden">
              <Image
                src="/img/flower5_result.jpg"
                alt={t.altResult}
                fill
                sizes="420px"
                className="object-cover"
              />
            </div>
            <div
              className="merge-seam absolute left-0 right-0 top-1/2 h-px depth-ribbon opacity-0 origin-left"
              aria-hidden
            />
          </div>

          {/* the reading */}
          <div className="relative min-h-[200px]">
            <div className="layers-copy-1 md:absolute md:inset-0">
              <p className="micro-label mb-5">{t.chapter}</p>
              <h2 className="voice-moment text-3xl sm:text-4xl leading-[1.15] text-paper-hi">
                {t.h1a}
                <br />
                {t.h1b}
              </h2>
              <p className="mt-6 text-paper-mid leading-relaxed text-body">{t.p1}</p>
            </div>
            <div className="layers-copy-2 md:absolute md:inset-0 md:opacity-0 mt-10 md:mt-0">
              <p className="micro-label mb-5">{t.mergeLabel}</p>
              <h2 className="voice-moment text-3xl sm:text-4xl leading-[1.15] text-paper-hi">
                {t.h2a}
                <br />
                {t.h2b}
              </h2>
              <p className="mt-6 text-paper-mid leading-relaxed text-body">{t.p2}</p>
              <p className="voice-truth mt-6 text-caption tracking-micro uppercase text-paper-low">
                {t.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
