import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

// Verlet-rope lamp cord (leeter.site style): a 17-point rope simulated
// per-frame with gravity + damping, so it bends, stretches with resistance,
// clicks mid-pull, and keeps momentum for a pendulum sway on release.
const SEGMENTS = 16;
const REST_LEN = 11;
const ANCHOR_X = 32;
const REST_TOTAL = SEGMENTS * REST_LEN; // 176
const GRAVITY = 1250;
const DAMPING = 0.94;
const ITERATIONS = 20;
const STRETCH_MAX = 26;
const STRETCH_TOGGLE = 20;
const MAX_VELOCITY = 22;
const SLEEP_EPS = 0.15;
const HIT = 46;

interface Pt {
  x: number;
  y: number;
  ox: number;
  oy: number;
}

function freshRope(): Pt[] {
  return Array.from({ length: SEGMENTS + 1 }, (_, i) => ({
    x: ANCHOR_X,
    y: i * REST_LEN,
    ox: ANCHOR_X,
    oy: i * REST_LEN,
  }));
}

function smoothPath(pts: Pt[]): string {
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = ((pts[i].x + pts[i + 1].x) / 2).toFixed(2);
    const my = ((pts[i].y + pts[i + 1].y) / 2).toFixed(2);
    d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
  return d;
}

export function PullCord() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const toggleRef = useRef(toggleTheme);
  toggleRef.current = toggleTheme;

  const ptsRef = useRef<Pt[]>(freshRope());
  const pathRef = useRef<SVGPathElement>(null);
  const knobRef = useRef<SVGGElement>(null);
  const simRef = useRef({
    dragging: false,
    dragX: ANCHOR_X,
    dragY: REST_TOTAL,
    pulled: false,
    moved: false,
    awake: false,
    prevT: 0,
    raf: 0,
    startX: 0,
    startY: 0,
  });
  const reducedRef = useRef(false);

  const render = () => {
    const pts = ptsRef.current;
    pathRef.current?.setAttribute("d", smoothPath(pts));
    const last = pts[pts.length - 1];
    knobRef.current?.setAttribute(
      "transform",
      `translate(${(last.x - ANCHOR_X).toFixed(2)} ${(last.y - REST_TOTAL).toFixed(2)})`,
    );
  };

  const step = (t: number) => {
    const s = simRef.current;
    const dt = Math.min(0.04, Math.max(0.004, (t - s.prevT) / 1000));
    s.prevT = t;
    const damp = Math.pow(DAMPING, dt * 60);
    const g = GRAVITY * dt * dt;
    const pts = ptsRef.current;
    const lastIdx = pts.length - 1;

    // Verlet integration.
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      if (s.dragging && i === lastIdx) {
        // Pinned to the pointer; freeze velocity while held.
        p.ox = p.x;
        p.oy = p.y;
        p.x = s.dragX;
        p.y = s.dragY;
        continue;
      }
      const vx = (p.x - p.ox) * damp;
      const vy = (p.y - p.oy) * damp;
      p.ox = p.x;
      p.oy = p.y;
      p.x += vx;
      p.y += vy + g;
    }

    // Constraint relaxation.
    for (let k = 0; k < ITERATIONS; k++) {
      pts[0].x = ANCHOR_X;
      pts[0].y = 0;
      pts[0].ox = ANCHOR_X;
      pts[0].oy = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 0.0001;
        const diff = ((REST_LEN - len) / len) * 0.5;
        if (i === 0) {
          b.x += dx * diff * 2;
          b.y += dy * diff * 2;
        } else if (s.dragging && i + 1 === lastIdx) {
          a.x -= dx * diff * 2;
          a.y -= dy * diff * 2;
        } else {
          a.x -= dx * diff;
          a.y -= dy * diff;
          b.x += dx * diff;
          b.y += dy * diff;
        }
      }
    }
    pts[0].x = ANCHOR_X;
    pts[0].y = 0;
    if (s.dragging) {
      const last = pts[lastIdx];
      last.x = s.dragX;
      last.y = s.dragY;
    }

    render();

    let move = 0;
    for (const p of pts) move += Math.abs(p.x - p.ox) + Math.abs(p.y - p.oy);
    if (!s.dragging && move < SLEEP_EPS) {
      s.awake = false;
      return;
    }
    s.raf = requestAnimationFrame(step);
  };

  const wake = () => {
    const s = simRef.current;
    if (s.awake) return;
    s.awake = true;
    s.prevT = performance.now();
    s.raf = requestAnimationFrame(step);
  };

  const endDrag = () => {
    const s = simRef.current;
    if (!s.dragging) return;
    // Preserve momentum on release (clamped), so the cord swings.
    const last = ptsRef.current[ptsRef.current.length - 1];
    const vx = last.x - last.ox;
    const vy = last.y - last.oy;
    const sp = Math.hypot(vx, vy);
    if (sp > MAX_VELOCITY) {
      const k = MAX_VELOCITY / sp;
      last.ox = last.x - vx * k;
      last.oy = last.y - vy * k;
    }
    s.dragging = false;
    wake();
  };

  const flick = () => {
    const last = ptsRef.current[ptsRef.current.length - 1];
    last.oy -= MAX_VELOCITY;
    wake();
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    render();
    if (!reducedRef.current) {
      // Gentle diagonal tug on entrance so it sways in like a real cord.
      const last = ptsRef.current[ptsRef.current.length - 1];
      last.oy -= 13;
      last.ox -= 6;
      wake();
    }
    return () => cancelAnimationFrame(simRef.current.raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedRef.current) {
      toggleRef.current();
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = simRef.current;
    s.dragging = true;
    s.pulled = false;
    s.moved = false;
    s.startX = e.clientX;
    s.startY = e.clientY;
    s.dragX = ANCHOR_X;
    s.dragY = REST_TOTAL;
    wake();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = simRef.current;
    if (!s.dragging || reducedRef.current) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    const ext = Math.hypot(dx, dy);
    if (ext > 6) s.moved = true;
    // Hard stretch limit with radial clamping (resistance feel).
    const max = REST_TOTAL + STRETCH_MAX;
    const k = ext > max ? max / ext : 1;
    s.dragX = ANCHOR_X + dx * k;
    s.dragY = REST_TOTAL + dy * k;
    // The "click": fires once, mid-pull — dark becomes light and vice versa.
    if (!s.pulled && ext - REST_TOTAL >= STRETCH_TOGGLE) {
      s.pulled = true;
      toggleRef.current();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (reducedRef.current) return;
    // A plain tap (not a drag) flicks the cord and toggles.
    if (!simRef.current.moved && e.detail !== 0) {
      flick();
      toggleRef.current();
    }
    simRef.current.moved = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!reducedRef.current) flick();
      toggleRef.current();
    }
  };

  return (
    <div className="pointer-events-none fixed top-0 right-6 z-[60] h-[340px] w-16 sm:right-[150px]">
      <svg
        viewBox="0 0 64 340"
        width={64}
        height={340}
        aria-hidden="true"
        className="block"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="pc-knob" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e7e7ec" />
          </linearGradient>
          <filter id="pc-knob-sh" x="-70%" y="-70%" width="240%" height="240%">
            <feDropShadow dx="0" dy="1.4" stdDeviation="1.5" floodColor="rgba(0,0,0,0.32)" />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d=""
          fill="none"
          stroke="rgba(127,127,127,0.45)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <g ref={knobRef}>
          <g filter="url(#pc-knob-sh)">
            <circle
              cx={ANCHOR_X}
              cy={REST_TOTAL}
              r={6.5}
              fill="url(#pc-knob)"
              stroke="rgba(0,0,0,0.10)"
              strokeWidth={0.5}
            />
          </g>
        </g>
      </svg>

      {/* Generous invisible grab area over the resting knob. */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={!dark}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="cursor-grab touch-none border-0 bg-transparent p-0 active:cursor-grabbing"
        style={{
          position: "absolute",
          left: ANCHOR_X - HIT / 2,
          top: REST_TOTAL - HIT / 2,
          width: HIT,
          height: HIT,
          pointerEvents: "auto",
        }}
      />

      {/* Handwritten hint, fades in shortly after load. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute top-[150px] right-[70px] text-right font-medium whitespace-nowrap select-none"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "1.15rem",
          lineHeight: 1,
          color: "var(--soft)",
          pointerEvents: "none",
        }}
      >
        pull the
        <br />
        cord!
      </motion.div>
    </div>
  );
}

export default PullCord;
