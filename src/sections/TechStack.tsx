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
  "AI & Tools": "lucide:sparkles",
};

const SKILL_ICONS: Record<string, string> = {
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  Python: "logos:python",
  Java: "logos:java",
  HTML5: "logos:html-5",
  CSS3: "logos:css-3",
  React: "logos:react",
  Vite: "logos:vitejs",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  FastAPI: "logos:fastapi-icon",
  Uvicorn: "lucide:zap",
  MongoDB: "logos:mongodb-icon",
  Mongoose: "simple-icons:mongoose",
  Supabase: "logos:supabase-icon",
  Streamlit: "simple-icons:streamlit",
  "Razorpay API": "simple-icons:razorpay",
  Axios: "simple-icons:axios",
  "REST APIs": "lucide:cpu",
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
  Netlify: "logos:netlify-icon",
};

// Brand colors for icons that would otherwise render monochrome
// (lucide glyphs + currentColor simple-icons). Colored pills skip the
// grayscale-until-hover treatment so the color is always visible.
const SKILL_COLORS: Record<string, string> = {
  Uvicorn: "#14b8a6",
  "REST APIs": "#f59e0b",
  Mongoose: "#c0392b",
  Streamlit: "#ff4b4b",
  "Razorpay API": "#3395ff",
  Axios: "#5a29e4",
  GitHub: "var(--fg)",
};

const skillCategories: Record<string, string[]> = {
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3"],
  Frontend: ["React", "Vite", "HTML5", "CSS3"],
  Backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Uvicorn"],
  Databases: ["MongoDB", "Mongoose", "Supabase"],
  "AI & Tools": ["Streamlit", "Razorpay API", "Axios", "Git", "GitHub", "Netlify"],
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!site.skills.length) return null;

  const categories = ["All", "Languages", "Frontend", "Backend", "Databases", "AI & Tools"];

  const filteredSkills = activeCategory === "All"
    ? site.skills
    : site.skills.filter((skill) => skillCategories[activeCategory]?.includes(skill));

  return (
    <div id="skills">
      <SectionHeader
        title="Tech Stack"
        anchorId="skills"
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
              const color = SKILL_COLORS[skill];
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
                    style={color ? { color } : undefined}
                    className={`size-4 shrink-0 transition-[filter] duration-200 ${
                      color ? "" : "grayscale group-hover:grayscale-0"
                    }`}
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
