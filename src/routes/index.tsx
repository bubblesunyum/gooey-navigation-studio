import { createFileRoute, Link } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/use-active-section";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "bubbles — ux/ui/product designer" },
      { name: "description", content: "i design delightful things for good causes." },
      { property: "og:title", content: "bubbles — ux/ui/product designer" },
      { property: "og:description", content: "i design delightful things for good causes." },
    ],
  }),
  component: Index,
});

function Index() {
  useActiveSection([
    { id: "hero", dock: "center", cta: null },
    { id: "about", dock: "left", cta: { label: "more about me", href: "/about" } },
    { id: "projects", dock: "right", cta: { label: "see all projects", href: "/projects" } },
    { id: "thanks", dock: "left", cta: { label: "say hello", href: "/thanks" } },
  ]);

  return (
    <main className="relative">
      {/* Hero */}
      <section
        data-section="hero"
        className="relative flex min-h-screen items-center justify-center px-6"
      >
        <div className="flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
          <div className="relative shrink-0">
            <div className="h-44 w-44 overflow-hidden rounded-full ring-1 ring-white/20 md:h-56 md:w-56">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "conic-gradient(from 30deg, oklch(0.7 0.25 320), oklch(0.6 0.2 200), oklch(0.8 0.18 70), oklch(0.7 0.25 320))",
                  filter: "blur(2px) saturate(140%)",
                }}
              />
            </div>
            <div className="absolute inset-0 rounded-full mix-blend-overlay opacity-60"
                 style={{background: "radial-gradient(circle at 30% 30%, white, transparent 55%)"}} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-6xl leading-[0.95] md:text-7xl">
              hai!<br />i'm bubbles.
            </h1>
            <p className="mt-6 max-w-md text-lg text-foreground/85 md:text-xl">
              i design <span className="italic">(and build)</span> delightful things for good causes.
            </p>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section
        data-section="about"
        className="relative flex min-h-screen items-center px-6"
      >
        <div className="ml-0 max-w-2xl md:ml-[10vw]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">001 · about</p>
          <h2 className="mt-4 text-5xl md:text-6xl">a designer with a soft spot for hard problems.</h2>
          <p className="mt-6 text-lg text-foreground/80">
            i've spent the last decade shaping products at the intersection of care, community, and craft —
            from mental-health apps to community-fridge networks. i believe interfaces should feel like
            kindness, not friction.
          </p>
        </div>
      </section>

      {/* Projects preview */}
      <section
        data-section="projects"
        className="relative flex min-h-screen items-center justify-end px-6"
      >
        <div className="mr-0 max-w-2xl md:mr-[10vw]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">002 · projects</p>
          <h2 className="mt-4 text-right text-5xl md:text-6xl">things i've made.</h2>
          <ul className="mt-8 space-y-3">
            {projects.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="glass group flex items-center justify-between rounded-2xl px-5 py-4 transition hover:scale-[1.01]"
                >
                  <div>
                    <p className="text-xl font-semibold">{p.title}</p>
                    <p className="text-sm text-foreground/70">{p.blurb}</p>
                  </div>
                  <span className="font-mono text-xs text-foreground/60">{p.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Thanks */}
      <section
        data-section="thanks"
        className="relative flex min-h-screen items-center px-6 pb-40"
      >
        <div className="ml-0 max-w-2xl md:ml-[10vw]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">003 · thanks</p>
          <h2 className="mt-4 text-5xl md:text-6xl">thanks for being here.</h2>
          <p className="mt-6 text-lg text-foreground/80">
            if you're working on something good, i'd love to hear about it.
          </p>
        </div>
      </section>
    </main>
  );
}
