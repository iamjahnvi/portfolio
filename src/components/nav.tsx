import { Link, useLocation } from "react-router-dom";
import { Shell } from "@/components/Layout";
import { Search } from "lucide-react";

export function Nav({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const location = useLocation();
  const navLinks = [
    { label: "projects", path: "/projects" },
    { label: "about", path: "/#about" },
    { label: "tech stack", path: "/#skills" },
    { label: "chat", path: "/chat" },
    { label: "contact", path: "/contact" },
  ];

  return (
    <header className="relative z-40 bg-transparent">
      <Shell className="flex items-center justify-between gap-5 px-6 py-5 sm:px-8">
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--muted)] sm:gap-x-6">
          {navLinks.map(({ label, path }) => {
            const hash = path.includes("#") ? path.slice(path.indexOf("#")) : "";
            const isActive = hash
              ? location.pathname === "/" && location.hash === hash
              : location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                aria-current={isActive ? "page" : undefined}
                className={`nav-link relative py-1 transition-colors hover:text-[var(--fg)] focus-visible:text-[var(--fg)] ${isActive ? "text-[var(--fg)]" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        {onOpenPalette && (
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open search"
            className="grid size-7 shrink-0 place-items-center text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]"
          >
            <Search className="size-3.5" />
          </button>
        )}
      </Shell>
    </header>
  );
}
