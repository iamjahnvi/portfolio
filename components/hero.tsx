"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { site } from "@/config/site";
import { Socials } from "./socials";
import { RotateCw } from "lucide-react";

export function Hero() {
  const [imgIndex, setImgIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (imgIndex + 1) % site.profileImages.length;
    setImgIndex(nextIndex);
    window.dispatchEvent(new CustomEvent("profileImageChanged", { detail: nextIndex }));
  };

  const roles = [
    "Full Stack Developer.",
    "Backend Engineer.",
    "Problem Solver."
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[roleIndex];
    
    const typingSpeed = isDeleting ? 30 : 60;
    const delayBeforeDelete = 2000;
    const delayBeforeType = 400;

    const tick = () => {
      if (!isDeleting) {
        const nextText = fullText.slice(0, currentText.length + 1);
        setCurrentText(nextText);
        
        if (nextText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), delayBeforeDelete);
          return;
        }
      } else {
        const nextText = fullText.slice(0, currentText.length - 1);
        setCurrentText(nextText);
        
        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          timer = setTimeout(() => {}, delayBeforeType);
          return;
        }
      }
      
      timer = setTimeout(tick, typingSpeed);
    };

    timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pb-12 pt-20"
    >
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent/5 blur-[160px]" />

      <div className="mx-auto w-full max-w-content">
        {/* Cover Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-36 w-full overflow-hidden rounded-xl border border-dashed border-border/80 bg-neutral-950 sm:h-48"
        >
          <img
            src={site.bannerImage}
            alt="Banner"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-80 pointer-events-none" />
        </motion.div>

        {/* Profile Avatar & Title Section */}
        <div className="relative -mt-14 sm:-mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={handleNextImage}
              className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32 group cursor-pointer select-none rounded-2xl border-4 border-bg shadow-2xl bg-surface"
              title="Click to change profile image"
            >
              {/* Main Avatar Image */}
              <img
                src={site.profileImages[imgIndex]}
                alt="Profile"
                className="h-full w-full rounded-xl object-cover pointer-events-none"
              />
              
              {/* Chromatic aberration split channel 1 on hover */}
              <img
                src={site.profileImages[imgIndex]}
                alt="Profile Glitch Red"
                className="absolute inset-0 h-full w-full rounded-xl object-cover pointer-events-none opacity-0 group-hover:opacity-70 filter saturate-150 hue-rotate-[90deg] mix-blend-screen transition-all duration-75 ease-out glitch-img-1"
              />
              
              {/* Chromatic aberration split channel 2 on hover */}
              <img
                src={site.profileImages[imgIndex]}
                alt="Profile Glitch Blue"
                className="absolute inset-0 h-full w-full rounded-xl object-cover pointer-events-none opacity-0 group-hover:opacity-70 filter saturate-150 hue-rotate-[240deg] mix-blend-screen transition-all duration-75 ease-out glitch-img-2"
              />

              {/* CRT scanline overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden opacity-[0.18] group-hover:opacity-30 transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]">
                <div className="absolute inset-0 h-1 bg-white/20 blur-[1px] animate-scanline" />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute -right-2 -top-2 rounded-full border border-border bg-surface p-1.5 text-muted transition-all hover:text-fg hover:scale-110 sm:opacity-100 opacity-0 group-hover:opacity-100 z-20 cursor-pointer shadow-md"
                aria-label="Switch profile image"
              >
                <RotateCw size={14} strokeWidth={2} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="pt-2"
            >
              <h1 className="font-serif text-4xl font-normal leading-none tracking-tight sm:text-6xl text-fg">
                {site.name}
              </h1>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-mono text-sm font-medium text-accent">
                  {currentText}
                  <span className="inline-block w-[2px] animate-blink bg-accent ml-0.5">&nbsp;</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-accent/20"
          >
            see my work
          </a>
          <Socials />
        </motion.div>


        {/* status / "now" pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid gap-3 sm:grid-cols-3"
        >
          {site.status.available && (
            <div className="flex items-center gap-2 rounded-2xl border bg-surface/30 px-4 py-3 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-muted">{site.status.availableText}</span>
            </div>
          )}
          <NowPill label="building" value={site.status.nowBuilding} />
          <NowPill label="learning" value={site.status.nowLearning} />
        </motion.div>
      </div>
    </section>
  );
}



function NowPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-surface/30 px-4 py-3 text-sm">
      <span className="font-mono text-xs uppercase tracking-wider text-faint">
        {label}
      </span>
      <p className="mt-0.5 line-clamp-2 text-muted" title={value}>
        {value}
      </p>
    </div>
  );
}
