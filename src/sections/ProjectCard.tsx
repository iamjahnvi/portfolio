import { useState } from "react";
import { type Project } from "@/config/site";
import { GitHubIcon } from "@/components/icons";
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
  const showImage = !!p.image && !imageMissing;
  const suggestion = `public/project-images/${slugify(p.title)}.png`;

  return (
    <article className="py-10 sm:py-14">
      {/* 1. PROJECT IMAGE — full width, consistent aspect ratio */}
      <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-md border border-[var(--line)] bg-[var(--chip)]">
        {showImage ? (
          <img
            src={p.image}
            alt={`${p.title} project preview`}
            loading="lazy"
            onError={() => setImageMissing(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
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

      {/* 2. PROJECT NAME */}
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
        <h4 className="font-serif text-2xl text-[var(--fg)] sm:text-3xl">{p.title}</h4>
        {p.year && <span className="font-mono text-xs text-[var(--soft)]">{p.year}</span>}
      </div>

      {/* 3. DESCRIPTION */}
      {p.blurb && (
        <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-7 text-[var(--muted)]">
          {p.blurb}
        </p>
      )}

      {/* 4. TECHNOLOGIES — compact inline, same spirit as before */}
      {!!p.stack.length && (
        <p className="mt-4 font-mono text-[11px] leading-6 text-[var(--soft)]">
          {p.stack.join(" · ")}
        </p>
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
