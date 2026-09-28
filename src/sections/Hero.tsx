import { motion } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { Search } from "lucide-react";

export function Hero({ onOpenPalette }: { onOpenPalette?: () => void }) {
  return (
    <Shell className="px-6 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="min-w-0 flex-1">
          <h1 className="hero-title font-serif text-5xl leading-[1.05] tracking-tight text-[var(--fg)] sm:text-6xl md:text-7xl">Hi, <span className="hero-title-name italic">Janhvi</span> Here</h1>
          <p className="mt-3 font-mono text-xs tracking-[0.12em] text-[var(--soft)]">{site.location}</p>
          {onOpenPalette && <button onClick={onOpenPalette} className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)]" title="Open Command Palette (Ctrl+K)"><Search size={14} /> <span>Explore the site</span><span className="ml-1 text-[var(--soft)]">Ctrl K</span></button>}
        </div>
        <div className="size-28 shrink-0 overflow-hidden rounded-full border border-[var(--line)] sm:size-36">
          <img src={site.profileImages[0]} alt="Janhvi" loading="eager" decoding="async" className="h-full w-full object-cover" />
        </div>
      </motion.div>
    </Shell>
  );
}
