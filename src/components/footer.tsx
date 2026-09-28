import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Shell } from "@/components/Layout";

const BAR_COUNT = 130;
const MIN_H = 12;
const MAX_H = 40;

/**
 * Static full-width waveform strip: 130 thin bars, bottom-aligned.
 * Heights follow a smooth low-frequency wave (sum of 2 sines):
 * tall at left, dip ~1/3 across, rise mid, peak ~70%, dip near right.
 * Computed once in JS; no animation, so reduced-motion safe by default.
 */
function Waveform() {
  const bars = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < BAR_COUNT; i++) {
      const f = i / (BAR_COUNT - 1);
      const n =
        0.5611 +
        0.2374 * Math.sin(2 * Math.PI * 1.4866 * f + 1.6779) +
        0.2311 * Math.sin(2 * Math.PI * 2.0252 * f + 0.0828);
      out.push(Math.round(MIN_H + (MAX_H - MIN_H) * Math.min(1, Math.max(0, n))));
    }
    return out;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="w-full bg-[#0c0d0f]"
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1.5px)",
        backgroundSize: "55px 55px",
      }}
    >
      <div className="flex h-[66px] items-end justify-between px-4 pb-[10px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[1px] shrink-0 bg-[#777] sm:w-[2px]"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <span className="sr-only">Decorative waveform strip</span>
    </div>
  );
}

export function Footer() {
  const [localTime, setLocalTime] = useState("");

  const updatedLabel = useMemo(() => {
    const label = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date());
    return `Updated ${label}`;
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };
    updateTime();
    const id = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 mt-14 w-full">
      <Waveform />
      <p className="py-2 text-center font-mono text-[10px] tracking-[0.06em] text-[var(--soft)]">
        {updatedLabel}
      </p>
      <div className="border-t border-[var(--line)]">
        <Shell className="px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-wide text-[var(--muted)]">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>

            <Link
              to="/"
              aria-label="Back to home"
              className="hidden select-none items-center gap-2 font-mono text-[11px] text-[var(--soft)] transition-colors duration-200 hover:text-[var(--fg)] sm:flex"
            >
              <span aria-hidden="true">—</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
              </svg>
              <span aria-hidden="true">—</span>
            </Link>

            <time className="font-mono text-[11px] tabular-nums tracking-wide text-[var(--muted)]">
              {localTime || "IST"}
            </time>
          </div>
        </Shell>
      </div>
    </footer>
  );
}
