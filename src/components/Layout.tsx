import React from "react";
import { Link, useLocation } from "react-router-dom";

export function Shell({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <div className={`relative mx-auto w-full max-w-[760px] ${className}`}>{children}</div>;
}

export function SectionHeader({ title, aside, anchorId }: { title: string; aside?: React.ReactNode; anchorId?: string }) {
  const location = useLocation();
  return (
    <div className="relative w-full">
      <Shell className="bg-[var(--bg)]">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-3 sm:px-8">
          {anchorId ? (
            <Link to={location.pathname === "/" ? `#${anchorId}` : `/#${anchorId}`} className="section-heading-link">
              <h2 className="font-serif text-2xl tracking-wide text-[var(--fg)]">{title}</h2>
            </Link>
          ) : <h2 className="font-serif text-2xl tracking-wide text-[var(--fg)]">{title}</h2>}
          {aside}
        </div>
      </Shell>
    </div>
  );
}

export function GapBand({ h = "h-7", className = "" }: { h?: string; className?: string }) {
  return <div className={`relative w-full ${h} ${className}`} />;
}
