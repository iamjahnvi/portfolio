import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { TechStack } from "@/sections/TechStack";
import { GithubActivity } from "@/sections/GithubActivity";
import { ChatPage } from "@/pages/ChatPage";
import { CommandPalette } from "@/components/command-palette";
import { PullCord } from "@/components/PullCord";
import { Konami } from "@/components/konami";
import { Analytics } from "@vercel/analytics/react";

/**
 * Minimal dot + trailing-ring cursor (Stanley-inspired).
 * - Dot tracks 1:1, ring eases behind it on rAF (no React state per move).
 * - Ring widens slightly over interactive elements, tightens on press.
 * - Inactive on touch devices and when reduced-motion is preferred.
 */
function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    const RING = 26;
    const RING_HOVER = 36;
    const RING_PRESS = 20;
    const SELECTOR = "a, button, [role='button'], input, textarea, select, label";
    const SETTLE = 0.08;

    let x = -300;
    let y = -300;
    let rx = -300;
    let ry = -300;
    let shown = false;
    let hovering = false;
    let pressed = false;
    let raf = 0;

    const paint = () => {
      dot.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
    };

    const sizeRing = () => {
      const s = pressed ? RING_PRESS : hovering ? RING_HOVER : RING;
      ring.style.width = `${s}px`;
      ring.style.height = `${s}px`;
      ring.style.opacity = hovering ? "0.35" : "0.22";
    };

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (
        Math.abs(x - rx) < SETTLE &&
        Math.abs(y - ry) < SETTLE &&
        Math.abs(x - rx) + Math.abs(y - ry) < SETTLE
      ) {
        rx = x;
        ry = y;
        paint();
        raf = 0;
        return;
      }
      paint();
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (raf === 0) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        dot.style.opacity = "1";
        sizeRing();
      }
      paint();
      kick();
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const h = !!t?.closest?.(SELECTOR);
      if (h !== hovering) {
        hovering = h;
        sizeRing();
      }
    };

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      pressed = true;
      sizeRing();
    };

    const onUp = () => {
      pressed = false;
      sizeRing();
    };

    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.classList.add("cursor-on");
    paint();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" aria-hidden="true" />
      <div id="cursor-ring" aria-hidden="true" />
    </>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function MainLayout({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <>
      <Hero onOpenPalette={onOpenPalette} />
      <About />
      <Projects isSearchable={false} />
      <TechStack />
      <GithubActivity />
      <Contact />
    </>
  );
}

export function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
          <Analytics />
          <ScrollToTop />
          <Konami />
          <Cursor />
          <div className="atmosphere min-h-screen bg-[var(--bg)] pb-20 font-sans text-[var(--fg)] antialiased transition-colors duration-300 relative">
            <div className="ambient" aria-hidden="true">
              <div className="ambient-blob ambient-blob--a" />
              <div className="ambient-blob ambient-blob--b" />
            </div>
            <Nav onOpenPalette={() => setPaletteOpen(true)} />
            <PullCord />

            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<MainLayout onOpenPalette={() => setPaletteOpen(true)} />} />
                <Route path="/projects" element={<Projects isSearchable={true} />} />
                <Route
                  path="/experience"
                  element={
                    <>
                      <Experience />
                    </>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </main>

            <Footer />
            <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
          </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
