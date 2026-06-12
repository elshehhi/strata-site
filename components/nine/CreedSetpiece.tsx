"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dict } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * P4 — the resurrected set-piece, the one beat both the Awwwards judge
 * and the WebGL director asked for because it ARGUES the product:
 * the real Nikon pair separates into its two focus planes (near lifts
 * toward the viewer, far sinks toward the horizon), the creed lands in
 * the opening between them — "The tool suggests. The artist decides." —
 * and the planes converge back into the one finished photograph.
 *
 * Pinned + scrubbed on desktop; on mobile / reduced-motion it degrades
 * to a quiet static composition (the merge + the creed).
 */
export default function CreedSetpiece({
  t,
  layers,
  shot,
  shotAlt,
}: {
  t: Dict["nine"];
  layers: Dict["layers"];
  shot: string;
  shotAlt: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=2000",
              scrub: 0.9,
              pin: true,
              anticipatePin: 1,
            },
            defaults: { ease: "none" },
          });

          // beat 1 — the photograph splits into its two focus planes
          tl.to(".cs-result", { opacity: 0.14, duration: 0.9 })
            .fromTo(
              ".cs-near",
              { yPercent: 0, rotateX: 0, z: 0, opacity: 0 },
              { yPercent: 24, rotateX: 9, z: 130, opacity: 1, duration: 1.4 },
              "<"
            )
            .fromTo(
              ".cs-far",
              { yPercent: 0, rotateX: 0, z: 0, opacity: 0 },
              { yPercent: -24, rotateX: 9, z: -150, opacity: 1, duration: 1.4 },
              "<"
            )
            .fromTo(
              ".cs-label",
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.45, stagger: 0.15 },
              "-=0.5"
            )

            // beat 2 — the creed arrives in the opening between the planes
            .fromTo(
              ".cs-creed",
              { opacity: 0, y: 26, filter: "blur(6px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 },
              "-=0.2"
            )
            .to({}, { duration: 0.7 })

            // beat 3 — the artist decides: the planes converge into one
            .to(".cs-near", { yPercent: 0, rotateX: 0, z: 0, opacity: 0, duration: 1.3 })
            .to(".cs-far", { yPercent: 0, rotateX: 0, z: 0, opacity: 0, duration: 1.3 }, "<")
            .to(".cs-label", { opacity: 0, duration: 0.35 }, "<")
            .to(".cs-result", { opacity: 1, duration: 1.1 }, "-=0.9")
            .fromTo(
              ".cs-seam",
              { scaleX: 0, opacity: 0.9 },
              { scaleX: 1, opacity: 0, duration: 0.9, ease: "power2.out" },
              "-=0.7"
            )
            .to({}, { duration: 0.6 });

          return () => tl.kill();
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0a08d9] to-transparent" />

      {/* the pinned stage */}
      <div ref={root} className="relative overflow-hidden">
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <p className="micro-label mb-4">{t.creedLabel}</p>
          <p className="voice-truth text-[12px] text-far mb-10">{t.depthLine}</p>

          <div
            className="relative w-full max-w-[330px] sm:max-w-[360px] aspect-[2/3]"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <div className="cs-far absolute inset-0 will-change-transform md:opacity-0">
              <Image
                src="/img/flower5_frame2.jpg"
                alt={layers.altFar}
                fill
                sizes="360px"
                className="object-cover rounded-lg"
              />
              <span
                className="cs-label voice-truth absolute -right-3 top-6 translate-x-full text-[10px] text-far hidden md:block"
                dir="auto"
              >
                {layers.farLabel}
              </span>
            </div>
            <div className="cs-near absolute inset-0 will-change-transform md:opacity-0">
              <Image
                src="/img/flower5_frame1.jpg"
                alt={layers.altNear}
                fill
                sizes="360px"
                className="object-cover rounded-lg"
              />
              <span
                className="cs-label voice-truth absolute -right-3 bottom-6 translate-x-full text-[10px] text-dawn hidden md:block"
                dir="auto"
              >
                {layers.nearLabel}
              </span>
            </div>
            <div className="cs-result absolute inset-0 matted rounded-lg overflow-hidden">
              <Image
                src="/img/flower5_result.jpg"
                alt={layers.altResult}
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <div
              className="cs-seam absolute left-0 right-0 top-1/2 h-px depth-ribbon opacity-0 origin-left"
              aria-hidden
            />
          </div>

          {/* the creed — lands in the opening between the planes */}
          <div className="cs-creed md:opacity-0 mt-12 text-center pointer-events-none">
            <h2 className="voice-moment text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.12] text-paper-hi">
              {t.creed1}
              <br />
              <span className="text-dawn-hi">{t.creed2}</span>
            </h2>
          </div>
        </div>
      </div>

      {/* after the merge: the reading, and the instrument's own proposal */}
      <div className="relative px-6 pb-36">
        <p className="mx-auto max-w-lg text-center text-paper-mid text-[15px] leading-relaxed">
          {t.creedBody}
        </p>
        <div className="mt-12 mx-auto max-w-3xl ridge-clip overflow-hidden">
          <Image src={shot} alt={shotAlt} width={1920} height={888} className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
