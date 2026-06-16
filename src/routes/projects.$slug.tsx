import { createFileRoute, notFound } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/use-active-section";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: p
        ? [
            { title: `${p.title} — bubbles` },
            { name: "description", content: p.blurb },
            { property: "og:title", content: `${p.title} — bubbles` },
            { property: "og:description", content: p.blurb },
          ]
        : [{ title: "project — bubbles" }],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="glass rounded-3xl p-8 text-center">
        <h1 className="text-3xl">project not found.</h1>
      </div>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  useActiveSection([
    { id: `proj-${project.slug}`, dock: "right", cta: { label: "back to projects", href: "/projects" } },
  ]);

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="px-6 pt-32 pb-40">
      <article data-section={`proj-${project.slug}`} className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
          {project.year} · {project.role}
        </p>
        <h1 className="mt-4 text-6xl md:text-7xl">{project.title}</h1>
        <p className="mt-6 text-xl text-foreground/85">{project.blurb}</p>

        <div className={`mt-12 aspect-[16/9] overflow-hidden rounded-3xl bg-gradient-to-br ${project.accent} opacity-90`} />

        <Section label="the problem" body={project.problem} />
        <Section label="the approach" body={project.approach} />
        <Section label="the outcome" body={project.outcome} />

        <div className="mt-20 border-t border-white/10 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">next up</p>
          <a
            href={`/projects/${next.slug}`}
            className="mt-3 inline-block text-4xl underline decoration-foreground/30 underline-offset-8 transition hover:decoration-foreground"
          >
            {next.title} →
          </a>
        </div>
      </article>
    </main>
  );
}

function Section({ label, body }: { label: string; body: string }) {
  return (
    <section className="mt-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">{label}</p>
      <p className="mt-4 text-lg leading-relaxed text-foreground/85">{body}</p>
    </section>
  );
}
