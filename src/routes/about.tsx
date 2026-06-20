import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { Sticker } from "@/components/Sticker";
import { RevealWord, InkUnderline } from "@/components/RevealWord";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "about — bubbles" },
      { name: "description", content: "the long version: presence, practice, and the patterns that emerged from a decade of designing for good." },
      { property: "og:title", content: "about — bubbles" },
      { property: "og:description", content: "the long version: presence, practice, and the patterns that emerged from a decade of designing for good." },
    ],
  }),
  component: About,
});

const amplify = [
  {
    label: "abundance",
    tone: "magenta" as const,
    body: "the pie is bigger than we think. design that shares the slice well.",
  },
  {
    label: "nothing lasts forever",
    tone: "cyan" as const,
    body: "an honest medium. ship things that age gracefully, then let them go.",
  },
  {
    label: "live & love regeneratively",
    tone: "lime" as const,
    body: "leave the system more alive than you found it. every single time.",
  },
];

function About() {
  useActiveSection([
    { id: "about-top", dock: "right", cta: { label: "see projects", href: "/projects" } },
    { id: "amplify", dock: "left", cta: { label: "say hello", href: "/thanks" } },
  ]);

  return (
    <main className="px-6 pt-32 pb-40">
      <section data-section="about-top" className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
          about
        </p>
        <h1 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">
          <RevealWord>a designer</RevealWord>{" "}
          <RevealWord delay={0.1}>with a soft spot</RevealWord>{" "}
          <RevealWord delay={0.2}>
            for <InkUnderline tone="magenta">hard problems.</InkUnderline>
          </RevealWord>
        </h1>

        <div className="mt-12 space-y-8 text-lg text-foreground/85 md:text-xl">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            i'm bubbles — a product designer who works best at the seams: product × brand,
            research × craft, big picture × pixel polish. ten years in, i've shipped two
            products to over a million people and broken roughly seven figma files beyond
            repair.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            i revere <em className="italic text-prism-amber">presence</em> to produce meaning
            and connection. i use design and art to weave us a story of effortless
            coherence — and i don't think those are different jobs.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            outside of work, i make weird music, ferment things in jars, and try to convince
            my dog that the mailman is, on balance, fine.
          </motion.p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Sticker tone="magenta" rotate={-2}>care</Sticker>
          <Sticker tone="cyan" rotate={3}>belonging</Sticker>
          <Sticker tone="amber" rotate={-1.5}>play</Sticker>
          <Sticker tone="lime" rotate={2}>creation</Sticker>
        </div>
      </section>

      <section data-section="amplify" className="mx-auto mt-40 max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
          the how
        </p>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
          <RevealWord>amplify</RevealWord>{" "}
          <RevealWord delay={0.1}>
            <em className="italic text-prism-lime">these ideas.</em>
          </RevealWord>
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {amplify.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 180, damping: 20 }}
              className="glass relative overflow-hidden p-8"
              style={{ borderRadius: 28 }}
            >
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `radial-gradient(80% 60% at 30% 0%, var(--prism-${a.tone}), transparent 60%)`,
                  mixBlendMode: "screen",
                }}
              />
              <div className="relative">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/60">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-3xl leading-[1] md:text-4xl">
                  {a.label}
                </h3>
                <p className="mt-4 text-base text-foreground/85">{a.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
