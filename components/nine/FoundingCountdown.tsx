"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/lib/i18n";

/**
 * The founding-offer countdown — ticks to the REAL deadline in
 * tiers.ts FOUNDING_DEADLINE (the date the 50%-off rate ends). Honest by
 * construction: it computes from the browser clock, and once the deadline
 * passes it renders nothing — there is no fake reset, no negative timer.
 *
 * It stays null until mounted so the server (SSG, build-time clock) and the
 * client agree on first paint; the live value fills in after hydration.
 * The number row is forced LTR so DD:HH:MM:SS reads the same in Arabic.
 */
export default function FoundingCountdown({
  deadline,
  t,
  compact = false,
}: {
  deadline: string;
  t: Dict["nine"]["countdown"];
  /** Inline one-line variant for tight spots (the hero offer). */
  compact?: boolean;
}) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(deadline).getTime();
    if (Number.isNaN(end)) return;
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  // Pre-hydration, bad date, or past the deadline → show nothing.
  if (left === null || left <= 0) return null;

  const total = Math.floor(left / 1000);
  const cells: [number, string][] = [
    [Math.floor(total / 86400), t.days],
    [Math.floor((total % 86400) / 3600), t.hours],
    [Math.floor((total % 3600) / 60), t.mins],
    [total % 60, t.secs],
  ];

  if (compact) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return (
      <span className="voice-truth inline-flex items-center gap-2 text-caption text-paper-low">
        <span className="text-dawn">{t.label}</span>
        <span className="tabular-nums text-paper-hi" dir="ltr">
          {cells.map(([n]) => pad(n)).join(":")}
        </span>
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col gap-2.5">
      <span className="micro-label text-dawn">{t.label}</span>
      <div className="flex items-center gap-1.5" dir="ltr">
        {cells.map(([n, label], i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="flex min-w-[3.1rem] flex-col items-center rounded-md bg-ink-1 hairline-strong px-2.5 py-2">
              <span className="voice-truth text-2xl tabular-nums text-paper-hi">
                {String(n).padStart(2, "0")}
              </span>
              <span className="voice-truth mt-0.5 text-micro uppercase tracking-micro text-paper-low">
                {label}
              </span>
            </div>
            {i < cells.length - 1 && (
              <span className="voice-truth self-start pt-2 text-lg text-dawn/50">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
