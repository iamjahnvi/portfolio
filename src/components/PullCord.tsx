import { useEffect, useRef, useCallback } from "react";
import { motion, PanInfo } from "framer-motion";
import { useTheme } from "./theme-provider";

// Verlet-rope lamp cord (leeter.site style): 16 segments simulated per-frame
// with gravity + damping, stretch resistance, mid-pull tactile toggle,
// and smooth pendulum momentum on release.
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
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
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
  const isDraggingRef = useRef(false);
  const isMovingRef = useRef(false);
  const isPulledRef = useRef(false);
  const dragPosRef = useRef({ x: ANCHOR_X, y: REST_TOTAL });
  const animFrameRef = useRef(0);
  const prevTimeRef = useRef(0);
  const prevDtRef = useRef(0);
  const reducedRef = useRef(false);

  const render = useCallback(() => {
    const pts = ptsRef.current;
    const lastIdx = pts.length - 1;
    pathRef.current?.setAttribute("d", smoothPath(pts));
    knobRef.current?.setAttribute(
      "transform",
      `translate(${(pts[lastIdx].x - ANCHOR_X).toFixed(2)} ${(pts[lastIdx].y - REST_TOTAL).toFixed(2)})`
    );
  }, []);

  const triggerToggle = useCallback(() => {
    toggleRef.current?.();
  }, []);

  const wakeSim = useCallback(() => {
    const step = (t: number) => {
      const pts = ptsRef.current;
      const lastIdx = pts.length - 1;
      const dt = prevTimeRef.current
        ? Math.min(0.04, Math.max(0.004, (t - prevTimeRef.current) / 1000))
        : 1 / 60;
      prevTimeRef.current = t;

      const damp = (prevDtRef.current > 0 ? dt / prevDtRef.current : 1) * Math.pow(DAMPING, dt * 60);
      const gSq = dt * dt;

      // Verlet integration
      for (let i = 1; i <= lastIdx; i++) {
        const p = pts[i];
        const vx = p.x - p.ox;
        const vy = p.y - p.oy;
        p.ox = p.x;
        p.oy = p.y;
        p.x += vx * damp;
        p.y += vy * damp + GRAVITY * gSq;
      }

      pts[0].x = ANCHOR_X;
      pts[0].y = 0;

      if (isDraggingRef.current) {
        pts[lastIdx].ox = pts[lastIdx].x;
        pts[lastIdx].oy = pts[lastIdx].y;
        pts[lastIdx].x = dragPosRef.current.x;
        pts[lastIdx].y = dragPosRef.current.y;
      }

      // Distance constraint relaxation
      for (let n = 0; n < ITERATIONS; n++) {
        for (let i = 0; i < lastIdx; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const delta = ((REST_LEN - dist) / dist) * 0.5;
          const cx = dx * delta;
          const cy = dy * delta;
          if (i !== 0) {
            p1.x -= cx;
            p1.y -= cy;
          }
          if (i + 1 !== lastIdx || !isDraggingRef.current) {
            p2.x += cx;
            p2.y += cy;
          }
        }
      }

      prevDtRef.current = dt;
      render();

      let movement = 0;
      for (let i = 1; i <= lastIdx; i++) {
        movement += Math.abs(pts[i].x - pts[i].ox) + Math.abs(pts[i].y - pts[i].oy);
      }

      if (!isDraggingRef.current && movement < SLEEP_EPS * dt * 60) {
        render();
        animFrameRef.current = 0;
        prevTimeRef.current = 0;
        return;
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    if (!animFrameRef.current) {
      prevTimeRef.current = 0;
      prevDtRef.current = 0;
      animFrameRef.current = requestAnimationFrame(step);
    }
  }, [render]);

  const flick = useCallback(() => {
    triggerToggle();
    const pts = ptsRef.current;
    pts[pts.length - 1].oy -= 22;
    wakeSim();
  }, [triggerToggle, wakeSim]);

  const handlePanStart = () => {
    isDraggingRef.current = true;
    isMovingRef.current = true;
    isPulledRef.current = false;
    wakeSim();
  };

  const handlePan = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dx = info.offset.x;
    const dy = REST_TOTAL + info.offset.y;
    const dist = Math.hypot(dx, dy) || 0.0001;
    const maxLen = REST_TOTAL + STRETCH_MAX;
    const scale = dist > maxLen ? maxLen / dist : 1;

    dragPosRef.current = {
      x: ANCHOR_X + dx * scale,
      y: dy * scale,
    };

    if (!isPulledRef.current && dist - REST_TOTAL >= STRETCH_TOGGLE) {
      isPulledRef.current = true;
      triggerToggle();
    }
  };

  const handlePanEnd = () => {
    isDraggingRef.current = false;
    const pts = ptsRef.current;
    const last = pts[pts.length - 1];
    const vx = last.x - last.ox;
    const vy = last.y - last.oy;
    const speed = Math.hypot(vx, vy);

    if (speed > MAX_VELOCITY) {
      const k = MAX_VELOCITY / speed;
      last.ox = last.x - vx * k;
      last.oy = last.y - vy * k;
    }

    wakeSim();
    requestAnimationFrame(() => {
      isMovingRef.current = false;
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (reducedRef.current) return;
    if (!isMovingRef.current && e.detail !== 0) {
      flick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!reducedRef.current) flick();
    }
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    render();
    if (!reducedRef.current) {
      // 1.7s delayed entrance tug matching leeter.site
      const timer = window.setTimeout(() => {
        const pts = ptsRef.current;
        pts[pts.length - 1].oy -= 13;
        pts[pts.length - 1].ox -= 6;
        wakeSim();
      }, 1700);
      return () => {
        window.clearTimeout(timer);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [render, wakeSim]);

  return (
    <div
      className="pointer-events-none fixed top-0 right-3 sm:right-6 md:right-8 lg:right-10 z-50 h-[340px] w-16"
      style={{
        top: "var(--pullcord-top, 0px)",
      }}
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
          stroke="var(--pullcord-ink, rgba(127, 127, 127, 0.45))"
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

      {/* Interactive Framer Motion Grab Button matching leeter.site */}
      <motion.button
        type="button"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={!dark}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="cursor-grab touch-none border-0 bg-transparent p-0 active:cursor-grabbing focus:outline-none"
        style={{
          position: "absolute",
          left: ANCHOR_X - HIT / 2,
          top: REST_TOTAL - HIT / 2,
          width: HIT,
          height: HIT,
          pointerEvents: "auto",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute top-[80px] right-[48px] hidden sm:block text-right select-none pointer-events-none whitespace-nowrap monospace"
        style={{
          fontSize: "1.00rem",
          lineHeight: 0.80,
          color: dark ? "var(--muted)" : "var(--muted)",
          letterSpacing: "0.01em",
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
