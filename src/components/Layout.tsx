import React from "react";

export function Shell({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <div className={`relative mx-auto w-full max-w-[760px] ${className}`}>{children}</div>;
}

export function SectionHeader({ title, aside, id }: { title: string; aside?: React.ReactNode; id?: string }) {
  return <div id={id} className="relative w-full"><Shell className="bg-[var(--bg)]"><div className="flex items-center justify-between gap-4 px-6 py-3 sm:px-8 w-full"><h2 className="font-serif text-2xl tracking-wide text-[var(--fg)]">{title}</h2>{aside}</div></Shell></div>;
}

export function GapBand({ h = "h-7", className = "" }: { h?: string; className?: string }) {
  return <div className={`relative w-full ${h} ${className}`} />;
}
