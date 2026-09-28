import { Link, useLocation } from "react-router-dom";
import { Shell } from "@/components/Layout";
import { Search } from "lucide-react";

export function Nav({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const location = useLocation();
  const navLinks = [
    { label: "home", path: "/" },
    { label: "about", path: "/#about" },
    { label: "projects", path: "/#projects" },
    { label: "tech stack", path: "/#skills" },
    { label: "contact", path: "/#contact" },
    { label: "chat", path: "/chat" },
  ];

  return (
    <header className="relative z-40 bg-transparent">
      <Shell className="flex items-center justify-end gap-5 px-6 py-5 sm:px-8">
        <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[13px] text-[var(--muted)] sm:gap-x-6">
          {navLinks.map(({ label, path }) => {
            const hash = path.includes("#") ? path.slice(path.indexOf("#")) : "";
            let isActive: boolean;
            if (path === "/") {
              isActive = location.pathname === "/" && !location.hash;
            } else if (path === "/#projects") {
              isActive =
                (location.pathname === "/" && location.hash === hash) ||
                location.pathname === "/projects";
            } else if (hash) {
              isActive = location.pathname === "/" && location.hash === hash;
            } else {
              isActive = location.pathname === path;
            }

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
