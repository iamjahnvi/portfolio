import { Shell, SectionHeader } from "@/components/Layout";

export function About() {
  return (
    <section id="about">
      <SectionHeader title="About" anchorId="about" />
      <Shell className="min-h-24 px-6 py-7 sm:px-8">
        <ul className="max-w-2xl space-y-5">
          <li className="flex gap-3">
            <span aria-hidden="true" className="shrink-0 text-base leading-7 text-[var(--soft)]">•</span>
            <p className="project-blurb text-base leading-7">
              I’m a 2nd-year B.Tech CSE student and a full-stack developer working primarily with the MERN stack, while constantly exploring AI, developer tools, open source, and whatever else catches my curiosity. I like shipping more than just learning about things.
            </p>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="shrink-0 text-base leading-7 text-[var(--soft)]">•</span>
            <p className="project-blurb text-base leading-7">
              High-agency person with a little delusion and a laptop. I build by reverse-engineering, breaking things apart, and rebuilding them.
            </p>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="shrink-0 text-base leading-7 text-[var(--soft)]">•</span>
            <p className="project-blurb text-base leading-7">
              If you hate 72-hour tutorials and love building random shit out of sheer curiosity, we’ll probably be friends.
            </p>
          </li>
        </ul>
      </Shell>
    </section>
  );
}
