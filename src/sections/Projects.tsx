import { useState } from "react";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ProjectCard } from "./ProjectCard";

const featuredOrder = [
  { title: "AI Recovery Agent", match: "AI Revenue Recovery Agent" },
  { title: "NextStep", match: "NextStep" },
  { title: "Virtual Karma" },
  { title: "Titan Engineer" },
  { title: "Shopify Clone", match: "Shopify Clone" },
  { title: "Canva Clone", match: "Canva Clone" },
];

export function Projects({ isSearchable = false }: { isSearchable?: boolean }) {
  const [query, setQuery] = useState("");
  const projects = featuredOrder.map(({ title, match }) => {
    const existing = site.projects.find((project) => project.title === match);
    return existing ? { ...existing, title, image: title === "NextStep" ? "/project-images/nextstep.png" : existing.image } : {
      title, blurb: "", stack: [], year: "", links: {},
    };
  });
  const visibleProjects = projects.filter((project) => !query || `${project.title} ${project.blurb} ${project.stack.join(" ")}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="projects">
      <SectionHeader title="Projects" />
      <Shell className="px-6 pb-12 pt-5 sm:px-8">
        {isSearchable && <input aria-label="Search projects" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or technologies" className="mb-7 w-full border-b border-[var(--line)] bg-transparent py-3 font-mono text-xs text-[var(--fg)] outline-none placeholder:text-[var(--soft)] sm:max-w-sm" />}
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--soft)]">Serious Projects</h3>
        <div className="divide-y divide-[var(--line)]">
          {visibleProjects.filter((project) => project.title === "AI Recovery Agent" || project.title === "NextStep").map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
        <h3 className="mb-2 mt-12 font-mono text-xs uppercase tracking-[0.12em] text-[var(--soft)]">Fun Projects</h3>
        <div className="divide-y divide-[var(--line)]">
          {visibleProjects.filter((project) => project.title !== "AI Recovery Agent" && project.title !== "NextStep").map((project, index) => <ProjectCard key={project.title} project={project} index={index + 2} />)}
        </div>
      </Shell>
    </section>
  );
}
