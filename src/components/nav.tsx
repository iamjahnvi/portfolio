import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Nav({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Experience", path: "/experience" },
    { label: "Chat", path: "/chat" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <Shell className="flex items-center justify-between px-6 py-3 sm:px-8">
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-xl tracking-wide text-[var(--fg)] hover:opacity-80 transition-opacity"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-5 text-[13px] text-[var(--muted)]">
          {navLinks.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`group relative transition-colors hover:text-[var(--fg)] ${
                  isActive ? "text-[var(--fg)] font-semibold" : ""
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 ${
                    isActive ? "scale-x-100 origin-left" : ""
                  }`}
                />
              </Link>
            );
          })}

          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label="Search Command Palette"
              className="grid size-7 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-all duration-300 hover:text-[var(--fg)] cursor-pointer"
            >
              <Search className="size-3.5" />
            </button>
          )}
        </nav>

        {/* Mobile Navigation Trigger Button */}
        <div className="flex sm:hidden items-center gap-3">
          {onOpenPalette && (
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Search Command Palette"
            className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
          >
            <Search className="size-4" />
          </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle Mobile Menu"
            className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Shell>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden absolute top-full left-0 w-full bg-[var(--bg)] border-b border-[var(--line)] overflow-hidden shadow-lg z-50"
          >
            <div className="px-6 py-6 space-y-4 flex flex-col font-serif text-lg bg-[var(--bg)]">
              {navLinks.map(({ label, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 border-b border-dashed border-[var(--line)]/50 pb-2.5 transition-colors ${
                      isActive ? "text-[var(--fg)] font-semibold" : "text-[var(--muted)]"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full bg-[var(--fg)] ${isActive ? "opacity-100" : "opacity-0"}`} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
