import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";

const BASE_LENGTH = 120;
const MAX_PULL = 130;
const PULL_THRESHOLD = 55;

/**
 * A hanging lamp cord on the right edge of the screen.
 * Pull it down past the threshold (or just click it) to flip the theme —
 * dark becomes light, light becomes dark — then it springs back with a sway.
 */
export function PullCord() {
  const { theme, toggleTheme } = useTheme();
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [swingKey, setSwingKey] = useState(0);
  const startY = useRef(0);
  const dark = theme === "dark";

  const doToggle = () => {
    toggleTheme();
    setSwingKey((k) => k + 1);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dy = e.clientY - startY.current;
    setPull(Math.max(0, Math.min(MAX_PULL, dy)));
  };

  const endPull = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dy = e.clientY - startY.current;
    setDragging(false);
    setPull(0);
    // A proper pull past the threshold — or a plain click — flips the theme.
    if (dy >= PULL_THRESHOLD || dy < 8) doToggle();
  };

  const cancelPull = () => {
    setDragging(false);
    setPull(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      doToggle();
    }
  };

  return (
    <motion.div
      key={swingKey}
      initial={false}
      animate={{ rotate: [0, 2.5, -2, 1.2, -0.6, 0] }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      style={{ transformOrigin: "top center" }}
      className="fixed top-0 z-[60] right-6 sm:right-[150px]"
    >
      <div className="relative flex flex-col items-center">
        {/* Cord */}
        <div
          className="w-px bg-[var(--soft)]"
          style={{
            height: BASE_LENGTH + pull,
            transition: dragging ? "none" : "height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
        {/* Knob */}
        <div
          role="switch"
          aria-checked={dark}
          aria-label="Pull the cord to toggle between dark and light mode"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPull}
          onPointerCancel={cancelPull}
          className={`size-3.5 rounded-full bg-[var(--fg)] shadow-[0_0_12px_1px_rgba(150,150,150,0.35)] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[var(--soft)] ${
            dragging ? "cursor-grabbing scale-125" : "cursor-grab hover:scale-125"
          }`}
          style={{ touchAction: "none" }}
        />
        {/* Handwritten-style hint */}
        <span className="pointer-events-none absolute top-[112px] right-5 select-none whitespace-nowrap font-serif text-[13px] italic text-[var(--soft)]">
          pull the cord!
        </span>
      </div>
    </motion.div>
  );
}

export default PullCord;
