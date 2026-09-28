import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

// Verlet-rope lamp cord: an 18-point rope simulated per-frame with gravity +
// light damping, so it bends, stretches with rubber-band resistance, clicks
// mid-pull, then springs back with overshoot and keeps momentum for a long
// pendulum sway. The grab area follows the knob so you can catch it mid-swing.
const SEGMENTS = 18;
const REST_LEN = 10;
const ANCHOR_X = 32;
const REST_TOTAL = SEGMENTS * REST_LEN; // 180
const GRAVITY = 2100;
const DAMPING = 0.982;
const ITERATIONS = 24;
const STRETCH_MAX = 110;
const STRETCH_TOGGLE = 42;
const MAX_VELOCITY = 48;
const SLEEP_EPS = 0.08;
const HIT_RADIUS = 38;

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

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

export function PullCord() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  const toggleRef = useRef(toggleTheme);
  toggleRef.current = toggleTheme;

  const ptsRef = useRef<Pt[]>(freshRope());
  const pathRef = useRef<SVGPathElement>(null);
  const knobRef = useRef<SVGGElement>(null);
  const knobScaleRef = useRef<SVGGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
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
    const dx = last.x - ANCHOR_X;
    const dy = last.y - REST_TOTAL;
    knobRef.current?.setAttribute("transform", `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);

    // Tension visuals: cord thickens and the knob swells slightly while stretched.
    const ext = clamp(Math.hypot(dx, dy) / STRETCH_MAX, 0, 1);
    pathRef.current?.setAttribute("stroke-width", (1.5 + ext * 1.4).toFixed(2));
    const s = simRef.current.dragging ? 1 + ext * 0.18 : 1;
    knobScaleRef.current?.setAttribute(
      "transform",
      `translate(${ANCHOR_X} ${REST_TOTAL}) scale(${s.toFixed(3)}) translate(${-ANCHOR_X} ${-REST_TOTAL})`
    );
  };

  const step = (t: number) => {
    const s = simRef.current;
    const dt = Math.min(0.04, Math.max(0.004, (t - (s.prevT || t)) / 1000));
    s.prevT = t;
    const damp = Math.pow(DAMPING, dt * 60);
    const g = GRAVITY * dt * dt;
    const pts = ptsRef.current;
    const lastIdx = pts.length - 1;

    // Verlet integration
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      if (s.dragging && i === lastIdx) {
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

    // Constraint relaxation
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

  const clampVelocity = (last: Pt) => {
    const vx = last.x - last.ox;
    const vy = last.y - last.oy;
    const sp = Math.hypot(vx, vy);
    if (sp > MAX_VELOCITY) {
      const k = MAX_VELOCITY / sp;
      last.ox = last.x - vx * k;
      last.oy = last.y - vy * k;
    }
  };

  const endDrag = () => {
    const s = simRef.current;
    if (!s.dragging) return;
    const last = ptsRef.current[ptsRef.current.length - 1];
    const stretch = last.y - REST_TOTAL;
    // Spring snap-back: fling upward proportional to how far it was pulled
    // so the cord overshoots, bounces, and settles with a pendulum sway.
    last.oy += stretch * 0.55;
    // Keep (and slightly boost) horizontal momentum for a longer swing,
    // with a whisper of randomness so it never looks robotic.
    const vx = last.x - last.ox;
    last.ox -= vx * 0.15;
    if (Math.abs(vx) < 4) last.ox += (Math.random() - 0.5) * 5;
    clampVelocity(last);
    s.dragging = false;
    wake();
  };

  const flick = () => {
    const last = ptsRef.current[ptsRef.current.length - 1];
    // Sharp downward yank + sideways kick: the cord stretches, snaps back,
    // overshoots past rest, then sways like a real lamp pull.
    last.oy -= 26;
    last.ox -= 9 + Math.random() * 4;
    clampVelocity(last);
    wake();
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    render();
    if (!reducedRef.current) {
      // Gentle delayed entrance tug with a sideways nudge so visitors see
      // the spring + sway the moment it settles.
      const timer = window.setTimeout(() => {
        const last = ptsRef.current[ptsRef.current.length - 1];
        last.oy -= 18;
        last.ox -= 11;
        wake();
      }, 1700);
      return () => {
        window.clearTimeout(timer);
        cancelAnimationFrame(simRef.current.raf);
      };
    }
    return () => cancelAnimationFrame(simRef.current.raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const knobScreenPos = () => {
    const last = ptsRef.current[ptsRef.current.length - 1];
    return { x: last.x, y: last.y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedRef.current) {
      toggleRef.current();
      return;
    }
    // The grab zone covers the whole cord box but only starts a drag when
    // pressing near the knob — so you can catch it mid-swing.
    const box = boxRef.current?.getBoundingClientRect();
    if (box) {
      const lx = e.clientX - box.left;
      const ly = e.clientY - box.top;
      const k = knobScreenPos();
      if (Math.hypot(lx - k.x, ly - k.y) > HIT_RADIUS) return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = simRef.current;
    s.dragging = true;
    s.pulled = false;
    s.moved = false;
    s.startX = e.clientX;
    s.startY = e.clientY;
    const k = knobScreenPos();
    s.dragX = k.x;
    s.dragY = k.y;
    wake();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = simRef.current;
    if (!s.dragging || reducedRef.current) return;
    const dx = e.clientX - s.startX;
    const dy = e.clientY - s.startY;
    const raw = Math.hypot(dx, dy);
    if (raw > 6) s.moved = true;
    // Rubber-band resistance: the further you pull, the harder it fights back.
    let tdx = dx;
    let tdy = dy;
    if (raw > 0.001) {
      const rubber = STRETCH_MAX * (1 - Math.exp(-raw / STRETCH_MAX));
      const k = rubber / raw;
      tdx = dx * k;
      tdy = dy * k;
    }
    s.dragX = clamp(ANCHOR_X + tdx, ANCHOR_X - 90, ANCHOR_X + 90);
    s.dragY = clamp(REST_TOTAL + tdy, REST_TOTAL - 24, REST_TOTAL + STRETCH_MAX);
    if (!s.pulled && s.dragY - REST_TOTAL >= STRETCH_TOGGLE) {
      s.pulled = true;
      toggleRef.current();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (reducedRef.current) return;
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
    <div
      ref={boxRef}
      className="pointer-events-none fixed top-0 right-3 sm:right-6 md:right-8 lg:right-10 z-50 h-[340px] w-16"
    >
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
          <g ref={knobScaleRef}>
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
        </g>
      </svg>

      {/* Full-box grab area: press near the knob (even mid-swing) to pull */}
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
        className="cursor-grab touch-none border-0 bg-transparent p-0 active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--soft)] focus-visible:rounded-full"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "auto",
        }}
      />

      {/* Text hint matching your specified font style & size */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute top-[80px] right-[48px] hidden sm:block text-right select-none pointer-events-none whitespace-nowrap font-mono"
        style={{
          fontSize: "0.75rem",
          lineHeight: "1rem",
          color: dark ? "var(--muted)" : "var(--muted)",
          fontWeight: 400,
          letterSpacing: "0.02em",
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
