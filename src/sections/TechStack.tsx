import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence, MotionConfig, type Variants } from "framer-motion";
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

export const SKILL_ICONS: Record<string, string> = {
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  Python: "logos:python",
  Java: "logos:java",
  HTML5: "logos:html-5",
  "HTML5 Audio": "logos:html-5",
  CSS3: "logos:css-3",
  CSS: "logos:css-3",
  React: "logos:react",
  Vite: "logos:vitejs",
  TailwindCSS: "logos:tailwindcss-icon",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  FastAPI: "logos:fastapi-icon",
  Uvicorn: "lucide:zap",
  Groq: "simple-icons:groq",
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

// Accent colors are revealed on hover only — pills rest monochrome.
// (lucide glyphs + currentColor simple-icons take the hover color;
// multicolor brand glyphs just lose their grayscale filter on hover.)
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

// Keyed-grid stagger: the whole grid remounts per tab so pills fade/slide
// in together with a soft stagger instead of flying across the layout.
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeIn" } },
};

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

// Tiny synthesized mechanical click (Web Audio, no assets).
let clickCtx: AudioContext | null = null;
function playClickSound() {
  try {
    if (!clickCtx) {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      clickCtx = new AC();
    }
    if (clickCtx.state === "suspended") void clickCtx.resume();
    const t = clickCtx.currentTime;
    const dur = 0.045;
    const buf = clickCtx.createBuffer(1, Math.max(1, Math.floor(clickCtx.sampleRate * dur)), clickCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = clickCtx.createBufferSource();
    src.buffer = buf;
    const filter = clickCtx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 2400;
    const gain = clickCtx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(clickCtx.destination);
    src.start(t);
  } catch {
    /* audio unavailable — stay silent */
  }
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [popped, setPopped] = useState<string | null>(null);
  const popTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(popTimer.current), []);

  function handlePillClick(skill: string) {
    playClickSound();
    setPopped(skill);
    window.clearTimeout(popTimer.current);
    popTimer.current = window.setTimeout(() => setPopped(null), 380);
  }

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
        <MotionConfig reducedMotion="user">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {filteredSkills.map((skill) => {
                const iconName = SKILL_ICONS[skill] || "lucide:code-2";
                const color = SKILL_COLORS[skill];
                return (
                  <motion.button
                    key={skill}
                    type="button"
                    onClick={() => handlePillClick(skill)}
                    variants={pillVariants}
                    whileTap={{ scale: 0.96 }}
                    aria-label={skill}
                    className="group flex cursor-pointer items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--muted)]"
                  >
                    <motion.span
                      animate={popped === skill ? { scale: [1, 1.45, 1] } : { scale: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="grid shrink-0 place-items-center"
                    >
                      <Icon
                        icon={iconName}
                        width={16}
                        height={16}
                        style={color ? ({ "--skill": color } as CSSProperties) : undefined}
                        className={`size-4 shrink-0 grayscale transition-[filter,color] duration-200 group-hover:grayscale-0 ${
                          color ? "group-hover:text-[var(--skill)]" : ""
                        }`}
                      />
                    </motion.span>
                    {skill}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </MotionConfig>
      </Shell>
    </div>
  );
}

export default TechStack;
