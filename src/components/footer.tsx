import { useEffect, useState } from "react";
import { Shell } from "@/components/Layout";

export function Footer() {
  const [localTime, setLocalTime] = useState("");

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
      <Shell className="flex items-center justify-between gap-4 px-6 py-5 sm:px-8">
        <p className="font-mono text-[11px] text-[var(--muted)]">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <time className="font-mono text-[11px] tabular-nums text-[var(--muted)]">
          {localTime || "IST"}
        </time>
      </Shell>
    </footer>
  );
}
