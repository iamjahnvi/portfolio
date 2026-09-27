import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Icon } from "@iconify/react";

const CATEGORY_ICONS: Record<string, string> = {
  All: "lucide:layers",
  Languages: "lucide:code-2",
  Backend: "lucide:server",
  Frontend: "lucide:layout",
  Databases: "lucide:database",
  "DevOps & Tools": "lucide:terminal",
};

const SKILL_ICONS: Record<string, string> = {
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  "Tailwind CSS": "logos:tailwindcss-icon",
  "Shadcn UI": "simple-icons:shadcnui",
  PostgreSQL: "logos:postgresql",
  MongoDB: "logos:mongodb-icon",
  Prisma: "logos:prisma",
  Supabase: "logos:supabase-icon",
  Firebase: "logos:firebase",
  "REST APIs": "lucide:cpu",
  JWT: "logos:jwt-icon",
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
  Postman: "logos:postman-icon",
  Vercel: "logos:vercel-icon",
  Figma: "logos:figma",
  "C++": "logos:c-plusplus",
  Python: "logos:python",
};

const skillCategories: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Shadcn UI", "Figma"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT"],
  Databases: ["PostgreSQL", "MongoDB", "Prisma", "Supabase", "Firebase"],
  "DevOps & Tools": ["Git", "GitHub", "Postman", "Vercel"],
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!site.skills.length) return null;

  const categories = ["All", "Languages", "Frontend", "Backend", "Databases", "DevOps & Tools"];

  const filteredSkills = activeCategory === "All"
    ? site.skills
    : site.skills.filter((skill) => skillCategories[activeCategory]?.includes(skill));

  return (
    <div id="skills">
      <SectionHeader
        title="Tech Stack"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            ( select tab to filter )
          </span>
        }
      />
      <Shell className="px-6 py-6 sm:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1">
          {categories.map((cat) => {
            const iconName = CATEGORY_ICONS[cat] || "lucide:layers";
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                    : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
                }`}
              >
                <Icon icon={iconName} width={14} height={14} className="size-3.5" />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Items Grid */}
        <motion.div layout className="mt-6 flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const iconName = SKILL_ICONS[skill] || "lucide:code-2";
              return (
                <motion.span
                  key={skill}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                  className="group flex cursor-default items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--muted)]"
                >
                  <Icon
                    icon={iconName}
                    width={16}
                    height={16}
                    className="size-4 shrink-0 grayscale transition-[filter] duration-200 group-hover:grayscale-0"
                  />
                  {skill}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Shell>
    </div>
  );
}

export default TechStack;
