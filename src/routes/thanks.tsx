import { createFileRoute } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/use-active-section";

export const Route = createFileRoute("/thanks")({
  head: () => ({
    meta: [
      { title: "thanks — bubbles" },
      { name: "description", content: "Gratitude and credits." },
      { property: "og:title", content: "thanks — bubbles" },
      { property: "og:description", content: "Gratitude and credits." },
    ],
  }),
  component: Thanks,
});

const credits = [
  ["mentors", "mira okafor, jules tanaka, dev singh"],
  ["collaborators", "the ripple care crew, common table organizers, sonar fm artists"],
  ["tools that earned it", "figma, framer, blender, ableton, a moleskine, way too much oatly"],
  ["readers of long drafts", "you know who you are. thank you."],
];

function Thanks() {
  useActiveSection([
    { id: "thanks-top", dock: "right", cta: { label: "back home", href: "/" } },
  ]);
  return (
    <main className="px-6 pt-32 pb-40">
      <section data-section="thanks-top" className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">thanks</p>
        <h1 className="mt-4 text-6xl md:text-7xl">no one makes anything alone.</h1>
        <p className="mt-6 text-lg text-foreground/85">
          a short, incomplete list of people and things that made the work on this site possible.
        </p>

        <dl className="mt-12 space-y-8">
          {credits.map(([k, v]) => (
            <div key={k} className="grid gap-2 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">{k}</dt>
              <dd className="text-lg text-foreground/85">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
