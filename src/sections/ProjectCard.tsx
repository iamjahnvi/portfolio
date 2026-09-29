import { useEffect, useState } from "react";
import { type Project } from "@/config/site";
import { GitHubIcon } from "@/components/icons";
import { SKILL_ICONS } from "./TechStack";
import { Icon } from "@iconify/react";
import { ArrowUpRight } from "lucide-react";

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

/**
 * Editorial project entry: image first (full width, fixed 16/9),
 * then name, description, compact tech line, Live / GitHub actions.
 * No side-by-side grid — everything stacks vertically.
 */
export function ProjectCard({ project: p }: { project: Project; index?: number }) {
  const [imageMissing, setImageMissing] = useState(false);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  // Retry the image if its URL changes (e.g. file added after a miss).
  useEffect(() => setImageMissing(false), [p.image]);
  const showImage = !!p.image && !imageMissing;
  const fit = p.imageFit ?? "cover";
  const frameStyle = fit === "contain" && p.imageBg ? { backgroundColor: p.imageBg } : undefined;
  // Cover images default to top (website screenshots); centered device shots like Carvaan opt into center.
  const positionClass = p.imagePosition === "center" ? "object-center" : "object-top";
  const suggestion = `public/project-images/${slugify(p.title)}.png`;

  return (
    <article className="py-10 sm:py-14">
      {/* 1. PROJECT IMAGE — full width, consistent aspect ratio */}
      <div className="project-image-frame group relative aspect-[16/9] w-full overflow-hidden rounded-[5px]">
        <div className="project-image-window relative h-full w-full overflow-hidden rounded-[2px] bg-[var(--bg)]" style={frameStyle}>
          {showImage ? (
            <img
              src={p.image}
              alt={`${p.title} project preview`}
              loading="lazy"
              onError={() => setImageMissing(true)}
              className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] ${
              fit === "contain" ? "object-contain" : `object-cover ${positionClass}`
            }`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <span className="font-serif text-3xl text-[var(--soft)] sm:text-4xl">
                {p.title.charAt(0)}
              </span>
              <p className="font-mono text-[11px] leading-5 text-[var(--soft)]">
                Preview coming soon
                <br />
                <span className="text-[var(--muted)]">Add {suggestion}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. PROJECT NAME */}
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
        <h4 className="font-serif text-2xl text-[var(--fg)] sm:text-3xl">{p.title}</h4>
        {p.year && <span className="font-mono text-xs text-[var(--soft)]">{p.year}</span>}
      </div>

      {/* 3. DESCRIPTION */}
      {p.blurb && (
        <p className="project-blurb mt-3 max-w-2xl whitespace-pre-line text-base leading-7">
          {p.blurb}
        </p>
      )}

      {/* 4. TECHNOLOGIES — hover/click a tech to reveal its logo */}
      {!!p.stack.length && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[13px] leading-6">
          {p.stack.map((t) => {
            const iconName = SKILL_ICONS[t];
            const open = activeTech === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTech(open ? null : t)}
                aria-pressed={open}
                className={`group inline-flex cursor-pointer items-center transition-colors duration-200 ${
                  open ? "text-[var(--fg)]" : "project-tech group-hover:text-[var(--fg)]"
                }`}
              >
                {iconName && (
                  <span
                    aria-hidden="true"
                    className={`grid shrink-0 place-items-center overflow-hidden transition-all duration-300 ${
                      open
                        ? "mr-1.5 w-4 opacity-100"
                        : "mr-0 w-0 opacity-0 group-hover:mr-1.5 group-hover:w-4 group-hover:opacity-100"
                    }`}
                  >
                    <Icon icon={iconName} className="size-3.5 shrink-0" />
                  </span>
                )}
                {t}
              </button>
            );
          })}
        </div>
      )}

      {/* 5+6. LIVE + GITHUB — hidden individually when the URL doesn't exist */}
      {(p.links.live || p.links.source) && (
        <div className="mt-4 flex items-center gap-6">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} live website`}
              title={`${p.title} live website`}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              <ArrowUpRight className="size-4" aria-hidden="true" />
              Live
            </a>
          )}
          {p.links.source && (
            <a
              href={p.links.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} GitHub repository`}
              title={`${p.title} GitHub repository`}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
            >
              <GitHubIcon className="size-4" aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      )}
    </article>
  );
}
