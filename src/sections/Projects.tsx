import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ProjectCard } from "./ProjectCard";
import { Search, X } from "lucide-react";

export function Projects({ isSearchable = false }: { isSearchable?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");

  const displayedProjects = useMemo(() => {
    return site.projects.filter((p) => {
      // Search filter
      if (isSearchable && searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q) ||
          p.stack.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [searchQuery, isSearchable]);

  return (
    <div id="projects">
      <SectionHeader title="Projects" />
      <Shell className="px-6 py-6 sm:px-8">
        {/* Search Bar Dashboard (when isSearchable is true) */}
        {isSearchable && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--line)] pb-5">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--soft)]" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--chip)] py-2 pl-9 pr-4 text-[12.5px] text-[var(--fg)] placeholder-[var(--soft)] outline-none transition-all focus:border-[var(--soft)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {displayedProjects.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ProjectCard project={p} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {displayedProjects.length === 0 && (
          <div className="py-12 text-center text-[var(--muted)] text-[13.5px] font-mono">
            No projects match your current filter.
          </div>
        )}
      </Shell>
    </div>
  );
}
