import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Shell } from "@/components/Layout";

/**
 * Interactive wave visualizer — a compact strip of vertical bars animated
 * with layered sine waves inside the portfolio's centered content column.
 * - Bars idle with a gentle drift.
 * - Hovering over the strip swells the amplitude.
 * - Clicking drops a ripple that travels outward.
 * - Pauses off-screen (IntersectionObserver), handles resize + reduced-motion.
 */
function WaveViz() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const BAR_GAP = 10;
    const BAR_W = 4;
    const MIN_H = 4;
    const BASE = 52; // reserved bottom area so bars hang from the top like the reference
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = true;
    let hover = 0; // 0..1 lerped amplitude boost
    let hoverTarget = 0;
    let mouseX = -1;
    let t0: number | null = null;
    const ripples: { x: number; t: number; amp: number; alive: boolean }[] = Array.from(
      { length: 6 },
      () => ({ x: 0, t: 0, amp: 0, alive: false })
    );

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const barColor = () =>
      document.documentElement.classList.contains("light")
        ? "rgba(0,0,0,0.38)"
        : "rgba(255,255,255,0.28)";

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = barColor();
      const amp = 0.2 + 0.8 * hover;
      const top = H - BASE;
      const count = Math.floor(W / BAR_GAP);
      for (let i = 0; i < count; i++) {
        const f = i / Math.max(1, count);
        const wave =
          (1 * Math.sin(t * 1.88 + f * 9.42) +
            0.35 * Math.sin(t * 1.19 + f * 18.85 + 1.5) +
            0.2 * Math.sin(t * 3.2 + f * 28.27 + 0.8) +
            1.55) /
          3.1;
        let h = MIN_H + (top - MIN_H) * Math.max(0, Math.min(1, wave * amp + 0.12));
        // click ripples
        const bx = i * BAR_GAP;
        for (const r of ripples) {
          if (!r.alive) continue;
          const dist = Math.abs(bx - r.x);
          const front = r.t * 120;
          const d = dist - front;
          const env = Math.exp(-(d * d) / (2 * 30 * 30));
          h += r.amp * env * Math.cos(d * 0.15) * 0.25 * top;
        }
        h = Math.max(MIN_H, Math.min(H, h));
        ctx.fillRect(bx, H - h, BAR_W, h);
      }
    };

    const tick = (now: number) => {
      if (t0 === null) t0 = now;
      const t = (now - t0) / 1000;
      hover += (hoverTarget - hover) * 0.08;
      for (const r of ripples) {
        if (!r.alive) continue;
        r.t += 1 / 60;
        r.amp = Math.exp(-r.t / 2.2);
        if (r.amp < 0.005) r.alive = false;
      }
      draw(t);
      if (running) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        hoverTarget = 1;
        mouseX = e.clientX - rect.left;
      } else {
        hoverTarget = 0.45;
        mouseX = -1;
      }
    };

    const onLeave = () => {
      hoverTarget = 0.45;
      mouseX = -1;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      const x = e.clientX - rect.left;
      const slot = ripples.find((r) => !r.alive) ?? ripples[0];
      slot.x = x;
      slot.t = 0;
      slot.amp = 1;
      slot.alive = true;
    };

    resize();
    hover = 0.45;
    hoverTarget = 0.45;

    if (reduced) {
      draw(0.6);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return;
      const vis = entry.isIntersecting;
      if (vis && !running) {
        running = true;
        t0 = null;
        raf = requestAnimationFrame(tick);
      } else if (!vis && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0.6);
    });
    ro.observe(wrap);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("click", onClick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[84px] w-full overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" role="presentation" />
      <span className="sr-only">Decorative audio-wave strip</span>
    </div>
  );
}

export function Footer() {
  const [localTime, setLocalTime] = useState("");

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
    <footer className="relative z-10 w-full border-t border-[var(--line)]">
      <Shell className="px-6 pb-5 sm:px-8">
        <WaveViz />
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[var(--muted)]">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>

          <Link
            to="/"
            aria-label="Back to home"
            className="hidden select-none items-center gap-2 font-mono text-[11px] text-[var(--soft)] transition-colors hover:text-[var(--fg)] sm:flex"
          >
            <span aria-hidden="true">—</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
            </svg>
            <span aria-hidden="true">—</span>
          </Link>

          <div className="flex items-center gap-3">
            <time className="font-mono text-[11px] tabular-nums text-[var(--muted)]">
              {localTime || "IST"}
            </time>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
