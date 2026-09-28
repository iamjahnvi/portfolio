import { site } from "@/config/site";
import { Reveal, SectionHeader } from "./reveal";

export function About() {
  return (
    <section className="mx-auto w-full max-w-content px-6 py-16">
      <SectionHeader id="about" index="01" title="about" />

      <div className="space-y-4 text-lg leading-relaxed text-muted">
        {site.about.map((para, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p>{para}</p>
          </Reveal>
        ))}
      </div>

      
      <Reveal delay={0.1}>
        <div className="mt-8 rounded-2xl border bg-surface/30 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            About
          </p>
          <ul className="mt-3 space-y-2">
            {site.tldr.map((item) => (
              <li key={item} className="flex gap-3 text-muted">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>


    </section>
  );
}
