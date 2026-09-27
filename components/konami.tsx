"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEQUENCES = [
  [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ],
  ["j", "a", "h", "n", "v", "i"],
];

/**
 * A small reward for the curious: the Konami code rains a little confetti
 * and flips a hidden "achievement". Moderate, tasteful gamification.
 */
export function Konami() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let positions = SEQUENCES.map(() => 0);
    const onKey = (e: KeyboardEvent) => {
      // Ignore modifier keys so they don't break/reset the sequence (e.g. holding Shift for uppercase B/A)
      if (["Shift", "Control", "Alt", "Meta", "CapsLock"].includes(e.key)) {
        return;
      }
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      
      let hasUnlocked = false;
      positions = positions.map((pos, i) => {
        const seq = SEQUENCES[i];
        if (key === seq[pos]) {
          pos++;
          if (pos === seq.length) {
            hasUnlocked = true;
            return 0;
          }
          return pos;
        } else {
          return key === seq[0] ? 1 : 0;
        }
      });

      if (hasUnlocked) {
        setUnlocked(true);
        positions = SEQUENCES.map(() => 0);
        setTimeout(() => setUnlocked(false), 4000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pieces = Array.from({ length: 40 });

  return (
    <AnimatePresence>
      {unlocked && (
        <>
          <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {pieces.map((_, i) => {
              const left = (i * 37) % 100;
              const delay = (i % 10) * 0.05;
              const hue = (i * 53) % 360;
              return (
                <motion.span
                  key={i}
                  initial={{ y: -40, opacity: 1, rotate: 0 }}
                  animate={{ y: "110vh", opacity: [1, 1, 0], rotate: 720 }}
                  transition={{ duration: 2.2 + (i % 5) * 0.2, delay, ease: "easeIn" }}
                  style={{
                    left: `${left}%`,
                    background: `hsl(${hue} 90% 60%)`,
                  }}
                  className="absolute top-0 h-2 w-2 rounded-sm"
                />
              );
            })}
          </div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[101] -translate-x-1/2 rounded-full border bg-surface/90 px-5 py-2.5 text-sm font-medium shadow-xl backdrop-blur-xl"
          >
            🏆 Achievement unlocked — <span className="text-accent">you found the secret</span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
