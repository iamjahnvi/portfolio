import { useEffect, useRef, useState, type ReactNode } from "react";
import { Shell, SectionHeader } from "@/components/Layout";
import { site, type Project } from "@/config/site";
import { ProjectCard } from "./ProjectCard";

// Display title → data title (they differ only for AI Recovery Agent).
const SERIOUS_ORDER = [
  { title: "NextStep", match: "NextStep" },
  { title: "ECDAT", match: "ECDAT" },
  { title: "AI Recovery Agent", match: "AI Revenue Recovery Agent" },
];

const FUN_ORDER = [
  { title: "Tiny Universe", match: "Tiny Universe" },
  { title: "Virtual Carvaan", match: "Virtual Carvaan" },
];

function resolveEntry({ title, match }: { title: string; match: string }): Project {
  const existing = site.projects.find((project) => project.title === match);
  if (!existing) return { title, blurb: "", stack: [], year: "", links: {} };
  return { ...existing, title };
}

function matchesQuery(p: Project, query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  return `${p.title} ${p.blurb} ${p.stack.join(" ")}`.toLowerCase().includes(q);
}

// Sub-heading that gently zooms while it travels through the middle
// of the viewport, then settles back to normal once scrolled past.
function SubHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setZoom(entry.isIntersecting), {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <h3
      ref={ref}
      className={`mb-2 origin-left font-mono text-sm uppercase tracking-[0.12em] text-[var(--soft)] transition-transform duration-500 ease-out will-change-transform ${
        zoom ? "scale-110" : "scale-100"
      } ${className}`}
    >
      {children}
    </h3>
  );
}

export function Projects({ isSearchable = false }: { isSearchable?: boolean }) {
  const [query, setQuery] = useState("");

  const serious = SERIOUS_ORDER.map(resolveEntry).filter((p) => matchesQuery(p, query));
  const fun = FUN_ORDER.map(resolveEntry).filter((p) => matchesQuery(p, query));

  return (
    <section id="projects">
      <SectionHeader title="Projects" anchorId="projects" />
      <Shell className="px-6 pb-12 pt-5 sm:px-8">
        {isSearchable && (
          <input
            aria-label="Search projects"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects or technologies"
            className="mb-7 w-full border-b border-[var(--line)] bg-transparent py-3 font-mono text-xs text-[var(--fg)] outline-none placeholder:text-[var(--soft)] sm:max-w-sm"
          />
        )}

        {serious.length > 0 && (
          <>
            <SubHeading>Serious Projects</SubHeading>
            <div className="divide-y divide-[var(--line)]">
              {serious.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </>
        )}

        {fun.length > 0 && (
          <>
            <SubHeading className="mt-12">Fun Projects</SubHeading>
            <div className="divide-y divide-[var(--line)]">
              {fun.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </>
        )}
      </Shell>
    </section>
  );
}
