import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shell } from "@/components/Layout";

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
    <footer className="relative z-10 mt-14 w-full">
      <div className="border-t border-[var(--line)]">
        <Shell className="px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-wide text-[var(--muted)]">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>

            <Link
              to="/"
              aria-label="Back to home"
              className="hidden select-none items-center gap-2 font-mono text-[11px] text-[var(--soft)] transition-colors duration-200 hover:text-[var(--fg)] sm:flex"
            >
              <span aria-hidden="true">—</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 7.7l5.4-.8L12 2z" />
              </svg>
              <span aria-hidden="true">—</span>
            </Link>

            <time className="font-mono text-[11px] tabular-nums tracking-wide text-[var(--muted)]">
              {localTime || "IST"}
            </time>
          </div>
        </Shell>
      </div>
    </footer>
  );
}
