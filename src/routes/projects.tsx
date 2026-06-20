import { createFileRoute } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/use-active-section";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { RevealWord } from "@/components/RevealWord";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "projects — bubbles" },
      { name: "description", content: "selected work — small group insights, at scale." },
      { property: "og:title", content: "projects — bubbles" },
      { property: "og:description", content: "selected work — small group insights, at scale." },
    ],
  }),
  component: Projects,
});

function Projects() {
  useActiveSection([
    { id: "proj-top", dock: "left", cta: { label: "about me", href: "/about" } },
  ]);

  return (
    <main className="px-6 pt-32 pb-40">
      <section data-section="proj-top" className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
          projects
        </p>
        <h1 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">
          <RevealWord>things</RevealWord>{" "}
          <RevealWord delay={0.1}>i've</RevealWord>{" "}
          <RevealWord delay={0.2}>
            <em className="italic text-prism-amber">made.</em>
          </RevealWord>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75 md:text-xl">
          a working catalogue. each one is a small group of people, at scale. intro · process
          · design · retro.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <div key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
