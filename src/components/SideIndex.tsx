import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const INDEX_ITEMS = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "opensource", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "writing", label: "Writing" },
  { id: "github", label: "GitHub" },
];

export function SideIndex() {
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of INDEX_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  if (location.pathname !== "/") return null;

  return (
    <aside className="fixed top-[26vh] left-[calc(50%+410px)] pointer-events-auto hidden xl:flex flex-col gap-3.5 z-30">
      <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--soft)] uppercase mb-1">
        INDEX
      </h3>
      {INDEX_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={`group flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.05em] transition-all duration-300 ${isActive
                ? "text-[var(--fg)] font-semibold"
                : "text-[var(--soft)] hover:text-[var(--muted)]"
              }`}
          >
            <span
              className={`h-[1px] bg-current transition-all duration-300 ${isActive ? "w-4" : "w-0 group-hover:w-2"
                }`}
            />
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}
