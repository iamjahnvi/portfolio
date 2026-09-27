"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import {
  GitHubIcon,
  TwitterIcon,
  LinkedInIcon,
  MailIcon,
  FileIcon,
  DiscordIcon,
  MediumIcon
} from "./icons";

const items = [
  { key: "github", href: site.socials.github, label: "GitHub", Icon: GitHubIcon },
  { key: "twitter", href: site.socials.twitter, label: "Twitter", Icon: TwitterIcon },
  { key: "linkedin", href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { key: "medium", href: (site.socials as any).medium, label: "Medium", Icon: MediumIcon },
  { key: "email", href: site.socials.email, label: "Mail", Icon: MailIcon },
  { key: "resume", href: site.socials.resume, label: "Resume", Icon: FileIcon },
  { key: "discord", href: (site.socials as any).discord, label: "Discord", Icon: DiscordIcon },
];

const hoverCardsData: Record<string, {
  pronouns?: string;
  handle: string;
  bio: string;
  stats?: string[];
  bannerText: string;
  bannerGradient: string;
}> = {
  github: {
    handle: "@iamjahnvi",
    bio: "Full Stack Developer. Building products, learning technologies, shipping consistently. Obsessed with clean code.",
    stats: ["5+ Projects", "500+ Contributions"],
    bannerText: "learn • build • ship",
    bannerGradient: "from-neutral-900 to-neutral-800",
  },
  twitter: {
    handle: "@fireflybuilds",
    bio: "Building clean, modern web apps where design, functionality, and even the smallest details matter.",
    stats: ["100+ Followers", "Tech bro"],
    bannerText: "connect • share • grow",
    bannerGradient: "from-sky-900 to-indigo-900",
  },
  linkedin: {
    pronouns: "He/Him",
    handle: "in/jahnvi-11a189358",
    bio: "Frontend & Backend Developer. Experienced in React, Next.js, Node.js, and database systems.",
    stats: ["Open for Work", "Delhi, India"],
    bannerText: "network • build • impact",
    bannerGradient: "from-blue-900 to-blue-800",
  },
  medium: {
    handle: "@jahnvidotdev",
    bio: "Writing technical articles about software development, system design, Next.js, and backend architecture.",
    stats: ["Tech Writer", "Publications"],
    bannerText: "write • share • read",
    bannerGradient: "from-neutral-800 to-zinc-950",
  },
  email: {
    handle: "conveytojahnvi@gmail.com",
    bio: "Available for contract work, internship opportunities, and collaborative software engineering projects.",
    stats: ["Fast Response", "Direct Email"],
    bannerText: "collab • contact • direct",
    bannerGradient: "from-rose-900 to-orange-900",
  },
  resume: {
    handle: "Curriculum Vitae",
    bio: "View academic records (SIH Hackathon Winner), key developer skills, and internship details.",
    stats: ["PDF Format", "1-Page Resume"],
    bannerText: "skills • experience • cv",
    bannerGradient: "from-teal-900 to-emerald-900",
  },
  discord: {
    handle: "jahnvi.dev",
    bio: "Join my server or drop a DM to chat about web dev, coding challenges, or side projects.",
    stats: ["Developer Server", "Chat Active"],
    bannerText: "hangout • chat • code",
    bannerGradient: "from-indigo-950 to-purple-900",
  },
};

export function Socials({ className = "" }: { className?: string }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className={`flex flex-wrap items-center gap-3.5 ${className}`}>
      {items
        .filter((i) => i.href)
        .map(({ key, href, label, Icon }) => {
          const card = hoverCardsData[key];

          return (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-dashed border-border/80 bg-surface/30 px-3.5 py-1.5 font-mono text-xs text-muted hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg hover:bg-surface/60 hover:shadow-lg hover:shadow-accent/5 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110 text-muted-foreground group-hover:text-accent" />
                <span>{label}</span>
                <span className="text-[10px] text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">↗</span>
              </a>

              <AnimatePresence>
                {hoveredKey === key && card && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 z-50 w-72 overflow-hidden rounded-2xl border bg-surface/95 shadow-2xl backdrop-blur-xl pointer-events-none select-none border-border/80"
                  >
                    {/* Banner header */}
                    <div className="relative h-20 w-full overflow-hidden flex items-center justify-center bg-neutral-950">
                      <img
                        src={(site as any).socialBannerImage || "/banner.png"}
                        alt="Banner"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="relative z-10 font-mono text-[9px] uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 shadow-sm">
                        {card.bannerText}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
                    </div>

                    {/* Profile body details */}
                    <div className="relative px-4 pb-4 pt-1">
                      {/* Avatar */}
                      <div className="absolute -top-6 left-4 h-12 w-12 rounded-full border-2 border-surface bg-bg overflow-hidden shadow-md">
                        <img
                          src={site.profileImages[0]}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-7">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-foreground">
                            {site.name}
                          </span>
                          <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          {card.pronouns && (
                            <span className="text-[9px] font-mono text-muted-foreground bg-surface/50 border rounded-md px-1.5 py-0.2">
                              {card.pronouns}
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                          {card.handle}
                        </p>

                        <p className="text-[10px] text-muted leading-relaxed mt-2.5">
                          {card.bio}
                        </p>

                        {card.stats && (
                          <div className="mt-3 flex gap-3 border-t border-border/40 pt-2 text-[9px] font-mono text-faint">
                            {card.stats.map((s, idx) => (
                              <span key={idx} className="flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-accent/40" />
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
    </div>
  );
}
