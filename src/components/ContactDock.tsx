import { BookOpen, House, Mail, MoonStar, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";
import { useTheme } from "@/components/theme-provider";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";

export function ContactDock() {
  const { theme, toggleTheme } = useTheme();
  const links = [
    { label: "Home", href: "/", Icon: House, internal: true },
    { label: "Projects", href: "/projects", Icon: BookOpen, internal: true },
    { label: "GitHub", href: site.socials.github, Icon: GitHubIcon },
    { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
    { label: "X", href: site.socials.twitter, Icon: TwitterIcon },
    { label: "Email", href: site.socials.email || `mailto:${site.email}`, Icon: Mail },
  ];

  return (
    <nav aria-label="Quick links" className="contact-dock fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center rounded-full border border-[var(--line)] bg-[var(--bg)]/90 p-1.5 shadow-lg shadow-black/20 backdrop-blur-xl">
      {links.map(({ label, href, Icon, internal }, index) => (
        <span key={label} className="flex items-center">
          {index === 2 || index === 5 ? <span aria-hidden="true" className="mx-1 h-6 w-px bg-[var(--line)]" /> : null}
          {internal ? (
            <Link to={href} aria-label={label} title={label} className="dock-link grid size-9 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]">
              <Icon className="size-[17px]" />
            </Link>
          ) : (
            <a href={href} aria-label={label} title={label} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className="dock-link grid size-9 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]">
              <Icon className="size-[17px]" />
            </a>
          )}
        </span>
      ))}
      <span aria-hidden="true" className="mx-1 h-6 w-px bg-[var(--line)]" />
      <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="dock-link grid size-9 place-items-center rounded-full text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--muted)]">
        {theme === "dark" ? <MoonStar className="size-[17px]" /> : <Sun className="size-[17px]" />}
      </button>
    </nav>
  );
}
