import { createFileRoute, Link } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/use-active-section";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "projects — bubbles" },
      { name: "description", content: "Selected work by bubbles." },
      { property: "og:title", content: "projects — bubbles" },
      { property: "og:description", content: "Selected work by bubbles." },
    ],
  }),
  component: Projects,
});

function Projects() {
  useActiveSection([
    { id: "proj-top", dock: "right", cta: { label: "about me", href: "/about" } },
  ]);
  return (
    <main className="px-6 pt-32 pb-40">
      <section data-section="proj-top" className="mx-auto max-w-4xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">projects</p>
        <h1 className="mt-4 text-6xl md:text-7xl">things i've made.</h1>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition hover:scale-[1.01]"
            >
              <div className={`absolute -inset-px -z-10 bg-gradient-to-br ${p.accent} opacity-20 transition group-hover:opacity-40`} />
              <p className="font-mono text-xs text-foreground/60">{p.year} · {p.role}</p>
              <h2 className="mt-3 text-3xl">{p.title}</h2>
              <p className="mt-3 text-foreground/80">{p.blurb}</p>
              <p className="mt-6 text-sm text-foreground/70">go deeper →</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
