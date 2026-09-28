import { useEffect, useState } from "react";
import { Shell } from "@/components/Layout";

export function Footer() {
  const [localTime, setLocalTime] = useState("");
  const [updatedDate] = useState(() => new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date()));

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date()));
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="relative z-10 w-full border-t border-[var(--line)]">
      <div aria-hidden="true" className="footer-bars" />
      <Shell className="px-6 pb-5 pt-2 sm:px-8">
        <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--soft)]">
          <span>Updated {updatedDate}</span>
          <span aria-hidden="true" className="text-[var(--muted)]">·</span>
          <span>Delhi, India</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[var(--muted)]">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
          <time className="font-mono text-[11px] tabular-nums text-[var(--muted)]">
            {localTime || "IST"}
          </time>
        </div>
      </Shell>
    </footer>
  );
}
