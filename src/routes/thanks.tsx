import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { RevealWord } from "@/components/RevealWord";
import { Sticker } from "@/components/Sticker";

export const Route = createFileRoute("/thanks")({
  head: () => ({
    meta: [
      { title: "thanks — bubbles" },
      { name: "description", content: "gratitude, credits, and an open invitation to dance." },
      { property: "og:title", content: "thanks — bubbles" },
      { property: "og:description", content: "gratitude, credits, and an open invitation to dance." },
    ],
  }),
  component: Thanks,
});

const credits = [
  ["mentors", "mira okafor, jules tanaka, dev singh"],
  ["collaborators", "the ripple care crew, common table organizers, sonar fm artists"],
  ["tools that earned it", "figma, framer, lovable, blender, ableton, a moleskine, way too much oatly"],
  ["readers of long drafts", "you know who you are. thank you."],
];

function Thanks() {
  useActiveSection([
    { id: "thanks-top", dock: "right", cta: { label: "back home", href: "/" } },
  ]);

  return (
    <main className="px-6 pt-32 pb-40">
      <section data-section="thanks-top" className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
          thanks · let's dance
        </p>
        <h1 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">
          <RevealWord>no one</RevealWord>{" "}
          <RevealWord delay={0.1}>makes anything</RevealWord>{" "}
          <RevealWord delay={0.2}>
            <em className="italic text-prism-magenta">alone.</em>
          </RevealWord>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-xl text-lg text-foreground/85 md:text-xl"
        >
          a short, incomplete list of the people and things that made the work on this site
          possible — and an open door if you'd like to make the next thing together.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="mailto:hi@example.com"
            className="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-5 text-lg font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, var(--prism-magenta), var(--prism-amber))",
              borderRadius: 999,
              boxShadow: "0 20px 60px -10px color-mix(in oklab, var(--prism-magenta) 60%, transparent)",
            }}
          >
            hi@example.com
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <div className="flex items-center gap-2">
            {[
              { Icon: Instagram, label: "Instagram", href: "#" },
              { Icon: Linkedin, label: "LinkedIn", href: "#" },
              { Icon: Mail, label: "Mail", href: "mailto:hi@example.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="glass grid h-12 w-12 place-items-center rounded-full transition hover:scale-105"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <dl className="mt-16 space-y-10">
          {credits.map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05 }}
              className="grid gap-3 border-b border-white/10 pb-8 md:grid-cols-[220px_1fr] md:gap-8"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
                {k}
              </dt>
              <dd className="text-lg text-foreground/85">{v}</dd>
            </motion.div>
          ))}
        </dl>

        <div className="mt-16 flex flex-wrap gap-3">
          <Sticker tone="magenta" rotate={-2}>share and receive</Sticker>
          <Sticker tone="cyan" rotate={2}>fusion, not fission</Sticker>
          <Sticker tone="amber" rotate={-1}>seriously, it's not that serious</Sticker>
          <Sticker tone="lime" rotate={1.5}>live & love regeneratively</Sticker>
        </div>

        <p className="hand mt-16 text-3xl text-prism-magenta md:text-4xl">
          well — i'm here to change the culture, then. bb. ✿
        </p>
      </section>
    </main>
  );
}
