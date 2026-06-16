import { createFileRoute } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/use-active-section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — bubbles" },
      { name: "description", content: "About bubbles, a ux/ui/product designer for good causes." },
      { property: "og:title", content: "about — bubbles" },
      { property: "og:description", content: "About bubbles, a ux/ui/product designer for good causes." },
    ],
  }),
  component: About,
});

function About() {
  useActiveSection([
    { id: "about-top", dock: "left", cta: { label: "see projects", href: "/projects" } },
  ]);
  return (
    <main className="px-6 pt-32 pb-40">
      <section data-section="about-top" className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">about</p>
        <h1 className="mt-4 text-6xl md:text-7xl">a designer with a soft spot for hard problems.</h1>
        <div className="mt-10 space-y-6 text-lg text-foreground/85">
          <p>
            i'm bubbles — a product designer based somewhere between brooklyn and the internet. for the
            last ten years i've been quietly building tools for the people who build things for the
            rest of us.
          </p>
          <p>
            i work best at the seams: product × brand, research × craft, big picture × pixel polish.
            i've led design at three early-stage startups, shipped two products to over a million
            people, and broken roughly seven figma files beyond repair.
          </p>
          <p>
            outside of work, i make weird music, ferment things in jars, and try to convince my dog
            that the mailman is, on balance, fine.
          </p>
        </div>
      </section>
    </main>
  );
}
