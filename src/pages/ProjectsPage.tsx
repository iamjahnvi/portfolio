import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { site, type Project } from "@/config/site";
import { Reveal } from "@/components/reveal";
import { ProjectCard } from "@/components/projects";
import { Search, X, ArrowUpRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    return site.projects.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.blurb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <main className="min-h-screen pt-28">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold">
            02 / Portfolio Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[var(--fg)] font-normal mt-2">
            Projects
          </h1>
          <p className="mt-3 text-[var(--muted)] text-lg max-w-2xl leading-relaxed">
            A comprehensive gallery of products, developer tools, games, and web apps I&apos;ve engineered.
          </p>
        </Reveal>

        {/* Search Controls */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
            {/* Search Input Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--soft)]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, technology, or keywords..."
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--chip)] pl-10 pr-10 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--soft)] outline-none focus:border-[var(--soft)] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--soft)] hover:text-[var(--fg)]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between font-mono text-xs text-[var(--muted)] px-1">
          <span>Showing {filteredProjects.length} of {site.projects.length} projects</span>
          {searchQuery && (
            <span>Filter query: &quot;{searchQuery}&quot;</span>
          )}
        </div>

        {/* Projects Grid */}
        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          {filteredProjects.map((p, i) => (
            <div key={p.title} onClick={() => setActiveModalProject(p)} className="cursor-pointer">
              <ProjectCard p={p} i={i} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 rounded-xl border border-dashed border-[var(--line)] bg-[var(--card)] p-12 text-center font-mono text-[var(--muted)]">
            <p className="text-base font-semibold text-[var(--fg)]">No projects found matching your search criteria.</p>
            <p className="text-xs text-[var(--soft)] mt-2">Try clearing your search query.</p>
            <button
              onClick={() => {
                setSearchQuery("");
              }}
              className="mt-4 rounded-lg border border-[var(--line)] bg-[var(--fg)] text-[var(--bg)] px-4 py-2 text-xs font-semibold hover:bg-[var(--muted)] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Project Quick View Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute right-4 top-4 rounded-full border border-[var(--line)] bg-[var(--chip)] p-2 text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
              >
                <X size={18} />
              </button>

              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                Project Detail · {activeModalProject.year}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--fg)] font-normal mt-1">
                {activeModalProject.title}
              </h2>

              <p className="mt-3 text-[var(--muted)] text-sm leading-relaxed">
                {activeModalProject.blurb}
              </p>

              {activeModalProject.image && (
                <div className="mt-4 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--chip)] max-h-64">
                  <img
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {activeModalProject.story && (
                <div className="mt-6 border-t border-[var(--line)] pt-4">
                  <h3 className="font-mono text-xs uppercase text-[var(--soft)] font-semibold mb-2">Architecture & Deep Dive</h3>
                  <div className="text-sm leading-relaxed text-[var(--muted)] space-y-2">
                    {activeModalProject.story.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {activeModalProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1 font-mono text-xs text-[var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-[var(--line)] pt-4">
                {activeModalProject.links.live && (
                  <a
                    href={activeModalProject.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] text-[var(--bg)] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--muted)]"
                  >
                    Launch Live Demo <ExternalLink size={14} />
                  </a>
                )}
                {activeModalProject.links.source && (
                  <a
                    href={activeModalProject.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-5 py-2.5 text-sm font-medium text-[var(--fg)] hover:bg-[var(--hover)] transition-colors"
                  >
                    <GitHubIcon className="h-4 w-4" /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
