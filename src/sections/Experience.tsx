import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site, type FreelanceProject } from "@/config/site";
import { ExternalLink, Lock, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";

function FreelanceCard({
  project,
  isExperiencePage,
}: {
  project: FreelanceProject;
  isExperiencePage: boolean;
}) {
  if (isExperiencePage) {
    return (
      <div className="group rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6 transition-all duration-300 hover:border-[var(--soft)] hover:shadow-md">
        {/* Project Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
          <h3 className="text-[16.5px] sm:text-[17.5px] font-semibold text-[var(--fg)] tracking-wide">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-[var(--soft)] shrink-0">
            {project.category}
          </span>
        </div>

        {/* Description & Overview in simple text format */}
        <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>

        <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
          {project.overview}
        </p>

        {/* Key Responsibilities in clean text format */}
        <div className="mt-3.5">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--soft)] font-semibold block mb-2">
            Key Responsibilities & Deliverables
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[12.5px] text-[var(--muted)]">
            {project.responsibilities.map((r, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[var(--soft)] leading-none mt-1">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Pills Footer - Exactly like ProjectCard */}
        <div className="mt-5 pt-3.5 border-t border-[var(--line)]/50 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]/30"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Homepage compact card view
  return (
    <div className="group flex flex-col rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 transition-all duration-200 hover:border-[var(--soft)] shadow-xs">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-[15.5px] font-semibold text-[var(--fg)] tracking-wide">
              {project.title}
            </h4>
            <p className="mt-0.5 font-mono text-[11px] text-[var(--soft)]">
              {project.category}
            </p>
          </div>
        </div>

        <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>

        <div className="mt-3">
          <Link
            to="/experience#freelance"
            className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer outline-none transition-colors group/link"
          >
            <span>View details</span>
            <ArrowUpRight className="size-3 text-[var(--soft)] transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-[var(--fg)]" />
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]/50">
        {project.technologies.map((t) => (
          <span
            key={t}
            className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]/30"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Experience({ isDetailed }: { isDetailed?: boolean }) {
  const location = useLocation();
  const isExperiencePage = isDetailed ?? location.pathname.startsWith("/experience");

  if (!site.experience.length) return null;

  return (
    <div id="experience">
      <SectionHeader title="Experience" />
      <Shell>
        {site.experience.map((job, i) => (
          <motion.div
            key={`${job.company}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${
              i > 0 ? "border-t border-[var(--line)]" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[15.5px] font-semibold text-[var(--fg)] flex items-center gap-2">
                {job.role} <span className="text-[var(--soft)]">·</span>{" "}
                <span className="text-[var(--muted)]">{job.company}</span>
                {job.url && <ExternalLink size={14} className="text-[var(--soft)]" />}
              </h3>
              <span className="font-mono text-[11px] text-[var(--soft)]">{job.period}</span>
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)] max-w-2xl">{job.blurb}</p>

            {/* Impact Metric Matrix */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 rounded-lg border border-[var(--line)] bg-[var(--chip)]/60 overflow-hidden">
              <div className="p-3 text-center border-r border-b sm:border-b-0 border-[var(--line)]">
                <p className="font-bold text-[15px] text-[var(--fg)]">5+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5 tracking-wider">Projects Shipped</p>
              </div>
              <div className="p-3 text-center border-b sm:border-b-0 sm:border-r border-[var(--line)]">
                <p className="font-bold text-[15px] text-[var(--fg)]">10+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5 tracking-wider">APIs Built</p>
              </div>
              <a
                href="#opensource"
                className="p-3 text-center border-r sm:border-r border-[var(--line)] flex flex-col justify-center transition-colors hover:bg-[var(--hover)] group/oss cursor-pointer"
              >
                <p className="font-bold text-[15px] text-[var(--fg)] group-hover/oss:text-[var(--soft)]">5+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5 tracking-wider leading-tight group-hover/oss:text-[var(--fg)]">
                  Open Source Contributions
                </p>
              </a>
              <a
                href="#freelance"
                className="p-3 text-center flex flex-col justify-center transition-colors hover:bg-[var(--hover)] group/freelance cursor-pointer"
              >
                <p className="font-bold text-[15px] text-[var(--fg)] group-hover/freelance:text-[var(--soft)]">3+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5 tracking-wider leading-tight group-hover/freelance:text-[var(--fg)]">
                  Client / Freelance Projects
                </p>
              </a>
            </div>
          </motion.div>
        ))}

        {/* Selected Freelance Work continuation */}
        {site.freelanceProjects && site.freelanceProjects.length > 0 && (
          <motion.div
            id="freelance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="border-t border-[var(--line)] px-6 py-7 sm:px-8"
          >
            <div className="mb-5">
              <h3 className="font-serif text-[20px] sm:text-[22px] text-[var(--fg)] tracking-wide font-normal">
                Selected Freelance Work
              </h3>
              <p className="mt-1 text-[13px] text-[var(--muted)] leading-relaxed">
                Real-world products and backend systems built for clients and agency engagements.
              </p>
            </div>

            <div className={isExperiencePage ? "flex flex-col gap-5 sm:gap-6" : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start"}>
              {site.freelanceProjects.map((fp) => (
                <FreelanceCard key={fp.title} project={fp} isExperiencePage={isExperiencePage} />
              ))}
            </div>

            {/* Subtle NDA Confidentiality Notice */}
            <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-[var(--line)]/40 bg-[var(--chip)]/20 px-3.5 py-2.5 text-[12px] text-[var(--soft)] leading-relaxed">
              <Lock size={14} className="mt-0.5 shrink-0 text-[var(--soft)]" />
              <p>
                Some agency engagements were delivered under NDA. Client identities, source code, and proprietary project details are not publicly disclosed.
              </p>
            </div>
          </motion.div>
        )}
      </Shell>
    </div>
  );
}
