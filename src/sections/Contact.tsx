import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon, FileIcon } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  const contactLinks = [
    { label: "GitHub", href: site.socials.github, Icon: GitHubIcon },
    { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
    { label: "X", href: site.socials.twitter, Icon: TwitterIcon },
    { label: "Mail", href: site.socials.email || `mailto:${site.email}`, Icon: MailIcon },
    { label: "Resume", href: site.socials.resume || "#", Icon: FileIcon },
  ];

  const lastIdx = contactLinks.length - 1;
  // First index of the last row on the 2-col mobile grid.
  const lastRowStart = contactLinks.length % 2 === 0 ? lastIdx - 1 : lastIdx;

  return (
    <div id="contact">
      <SectionHeader title="Contact" />
      <Shell>
        <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-[var(--line)] sm:border-b-0">
          {contactLinks.map((l, idx) => {
            const IconComponent = l.Icon;
            return (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`contact-card-link group flex items-center justify-center gap-2.5 border-[var(--line)] px-4 py-4 text-[13px] font-medium ${
                  idx % 2 === 0 && idx !== lastIdx ? "border-r" : "border-r-0"
                } ${idx < lastRowStart ? "border-b" : "border-b-0"} sm:border-b-0 ${
                  idx === lastIdx ? "sm:border-r-0" : "sm:border-r"
                }`}
              >
                <span className="contact-card-icon grid size-8 place-items-center rounded-lg border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)]">
                  <IconComponent className="size-4" />
                </span>
                <span className="contact-card-label text-[var(--muted)]">
                  {l.label}
                </span>
                <ArrowUpRight className="contact-card-arrow size-3.5 text-[var(--soft)]" />
              </a>
            );
          })}
        </div>
      </Shell>
    </div>
  );
}
