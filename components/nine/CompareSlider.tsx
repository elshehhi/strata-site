"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

/**
 * The proof above the fold: one frame against the STRATA merge, divided
 * by a handle the visitor drags. Shown at the pair's NATIVE aspect, never
 * cropped or rotated — the orientation of the photograph is part of its
 * honesty. Internally LTR in both site directions so "drag right reveals
 * more of the single frame" stays physically consistent.
 */
export default function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  aspectClass,
  priority = false,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  /** Tailwind aspect class matching the pair's native ratio, e.g. "aspect-[2/3]" */
  aspectClass: string;
  priority?: boolean;
}) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setTouched(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
    setTouched(true);
  };

  return (
    <div
      ref={box}
      dir="ltr"
      className={`relative ${aspectClass} w-full overflow-hidden rounded matted select-none cursor-ew-resize`}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* the merge — the ground truth underneath */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 90vw, 440px"
        className="object-cover"
        priority={priority}
        draggable={false}
      />
      {/* the single frame, clipped to the left of the handle */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 90vw, 440px"
          className="object-cover"
          priority={priority}
          draggable={false}
        />
      </div>

      {/* plates */}
      <span className="voice-truth absolute top-3 left-3 z-10 text-[9px] tracking-micro uppercase px-2.5 py-1.5 rounded glass text-paper-hi">
        {beforeLabel}
      </span>
      <span className="voice-truth absolute top-3 right-3 z-10 text-[9px] tracking-micro uppercase px-2.5 py-1.5 rounded glass text-dawn-hi">
        {afterLabel}
      </span>

      {/* the seam — the one meaningful gradient axis stays out of it; the
          handle is dawn because a hand is on it */}
      <div
        className="absolute top-0 bottom-0 z-10 w-px bg-dawn/80 shadow-[0_0_12px_rgba(232,162,92,.55)]"
        style={{ left: `${pos}%` }}
        aria-hidden
      />
      <button
        type="button"
        role="slider"
        aria-label={`${beforeLabel} / ${afterLabel}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
        className={`absolute z-20 top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full glass flex items-center justify-center gap-1 text-paper-hi text-[13px] cursor-ew-resize ${
          touched ? "" : "breathe-once"
        }`}
        style={{ left: `${pos}%` }}
      >
        <span aria-hidden>‹</span>
        <span aria-hidden>›</span>
      </button>
    </div>
  );
}
