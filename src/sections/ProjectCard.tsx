import { useState } from "react";
import { type Project } from "@/config/site";
import { GitHubIcon } from "@/components/icons";
import { Globe } from "lucide-react";

export function ProjectCard({ project: p }: { project: Project; index?: number }) {
  const [imageMissing, setImageMissing] = useState(false);
  return (
    <article className="grid gap-5 py-7 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-start sm:gap-8">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h4 className="font-serif text-2xl text-[var(--fg)]">{p.title}</h4>
          {p.year && <span className="font-mono text-xs text-[var(--soft)]">{p.year}</span>}
        </div>
        {p.blurb && <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-7 text-[var(--muted)]">{p.blurb}</p>}
        {p.story && <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-7 text-[var(--muted)]">{p.story}</p>}
        {!!p.stack.length && <p className="mt-4 font-mono text-[11px] leading-6 text-[var(--soft)]">{p.stack.join(" · ")}</p>}
        <div className="mt-4 flex gap-4 text-[var(--muted)]">
          {p.links.live && <a href={p.links.live} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`} className="hover:text-[var(--fg)]"><Globe size={16} /></a>}
          {p.links.source && <a href={p.links.source} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} repository`} className="hover:text-[var(--fg)]"><GitHubIcon className="size-4" /></a>}
        </div>
      </div>
      {p.image && <div className="relative aspect-[16/10] overflow-hidden border border-[var(--line)] bg-[var(--chip)]">
        {!imageMissing && <img src={p.image} alt={`${p.title} project preview`} className="h-full w-full object-cover object-top" onError={() => setImageMissing(true)} />}
        {imageMissing && <p className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-xs leading-5 text-[var(--soft)]">Project preview<br />public/project-images/nextstep.png</p>}
      </div>}
    </article>
  );
}
