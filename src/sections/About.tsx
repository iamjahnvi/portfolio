import { Shell, SectionHeader } from "@/components/Layout";

export function About() {
  return (
    <section id="about">
      <SectionHeader title="About" />
      <Shell className="min-h-24 px-6 py-7 sm:px-8">
        <p className="font-mono text-xs tracking-wide text-[var(--soft)]">[ABOUT CONTENT WILL BE PROVIDED LATER]</p>
      </Shell>
    </section>
  );
}
