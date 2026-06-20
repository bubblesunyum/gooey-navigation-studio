import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { projects } from "@/data/projects";
import { Sticker } from "@/components/Sticker";
import { RevealWord, InkUnderline } from "@/components/RevealWord";
import { ValueCard } from "@/components/ValueCard";
import { PracticeLine } from "@/components/PracticeLine";
import { ProjectCard } from "@/components/ProjectCard";
import { FractalScale } from "@/components/FractalScale";
import { ManifestoTicker } from "@/components/ManifestoTicker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "bubbles — designing delight for good causes" },
      { name: "description", content: "i design (and build) delightful things for good causes. ux, product, brand — with a little structured chaos." },
      { property: "og:title", content: "bubbles — designing delight for good causes" },
      { property: "og:description", content: "i design (and build) delightful things for good causes." },
    ],
  }),
  component: Index,
});

function Index() {
  useActiveSection([
    { id: "hero", dock: "center", cta: null },
    { id: "bring", dock: "right", cta: { label: "more about me", href: "/about" } },
    { id: "values", dock: "left", cta: { label: "read the manifesto", href: "/about" } },
    { id: "practice", dock: "right", cta: { label: "say hi", href: "/thanks" } },
    { id: "projects", dock: "left", cta: { label: "see all projects", href: "/projects" } },
    { id: "fractal", dock: "center", cta: null },
    { id: "ticker", dock: "right", cta: null },
    { id: "dance", dock: "left", cta: { label: "say hello", href: "/thanks" } },
  ]);

  return (
    <main className="relative">
      {/* ============ HERO ============ */}
      <section
        data-section="hero"
        className="relative flex min-h-screen items-center justify-center px-6"
      >
        <div className="flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-20">
          <motion.div
            className="relative shrink-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          >
            <motion.div
              className="h-52 w-52 overflow-hidden rounded-full ring-1 ring-white/20 md:h-64 md:w-64"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    "conic-gradient(from 30deg, var(--prism-magenta), var(--prism-cyan), var(--prism-amber), var(--prism-lime), var(--prism-magenta))",
                  filter: "blur(2px) saturate(150%)",
                }}
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0 rounded-full mix-blend-overlay opacity-60"
              style={{ background: "radial-gradient(circle at 30% 30%, white, transparent 55%)" }}
            />
            <motion.span
              className="hand absolute -right-4 -top-2 rotate-12 text-2xl text-prism-amber md:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              hi ✿
            </motion.span>
          </motion.div>

          <div className="text-center md:text-left">
            <h1 className="font-display text-7xl leading-[0.92] md:text-8xl lg:text-9xl">
              <RevealWord>hai!</RevealWord>
              <br />
              <RevealWord delay={0.1}>
                i'm <em className="italic text-prism-magenta">bubbles</em>.
              </RevealWord>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-8 max-w-md text-xl text-foreground/85 md:text-2xl"
            >
              i design <span className="italic text-prism-cyan">(and build)</span> delightful
              things for good causes.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="hand mt-6 text-2xl text-foreground/70 md:text-3xl"
            >
              wanna dance with me? ↓
            </motion.p>
          </div>
        </div>
      </section>

      {/* ============ BRING ============ */}
      <section
        data-section="bring"
        className="relative flex min-h-screen items-center px-6 py-32"
      >
        <div className="mx-auto w-full max-w-5xl md:ml-[8vw]">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
            001 · what i bring
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
            <RevealWord>i bring</RevealWord>{" "}
            <span className="hand text-prism-amber italic">—</span>
          </h2>

          <div className="relative mt-12 flex flex-wrap gap-4 md:max-w-3xl">
            <Sticker tone="magenta" rotate={-3}>aesthetic sensibility</Sticker>
            <Sticker tone="cyan" rotate={4}>systems thinking</Sticker>
            <Sticker tone="amber" rotate={-2}>spiritual grounding</Sticker>
            <Sticker tone="lime" rotate={3}>creative connections</Sticker>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 max-w-3xl font-display text-3xl leading-tight md:text-4xl"
          >
            i use{" "}
            <span className="sticker mx-1 text-prism-cyan">design</span>{" "}
            and{" "}
            <span className="sticker mx-1 text-prism-magenta">art</span>{" "}
            to weave us a story of{" "}
            <em className="italic text-foreground/90">effortless coherence</em>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 max-w-2xl text-lg text-foreground/75 md:text-xl"
          >
            i revere <InkUnderline tone="amber">presence</InkUnderline> to produce meaning and
            connection.
          </motion.p>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section
        data-section="values"
        className="relative flex min-h-screen items-center px-6 py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
              002 · core values
            </p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
              <RevealWord>looking back,</RevealWord>{" "}
              <RevealWord delay={0.1}>some patterns</RevealWord>{" "}
              <RevealWord delay={0.2}>
                <em className="italic text-prism-magenta">have emerged.</em>
              </RevealWord>
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <ValueCard index={0} label="care" gloss="meet people where they are, on their terms." tone="magenta" />
            <ValueCard index={1} label="belonging" gloss="design for the room, not just the user." tone="cyan" />
            <ValueCard index={2} label="play" gloss="seriously, it's not that serious." tone="amber" />
            <ValueCard index={3} label="creation" gloss="build, combine, repeat. then ship it." tone="lime" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 max-w-4xl font-display text-2xl leading-tight md:text-3xl"
          >
            i design{" "}
            <span className="sticker text-prism-magenta">delightfully</span>{" "}
            <span className="sticker text-prism-cyan">fearlessly</span>{" "}
            <span className="sticker text-prism-amber">creatively</span>{" "}
            to honor these ideals and create a more sustainable, cohesive world —{" "}
            <em className="italic text-foreground/95">one we can lovingly share together.</em>
          </motion.p>
        </div>
      </section>

      {/* ============ PRACTICE ============ */}
      <section
        data-section="practice"
        className="relative flex min-h-screen items-center px-6 py-32"
      >
        <div className="mx-auto w-full max-w-5xl md:ml-[8vw]">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
            003 · how i work
          </p>
          <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
            <RevealWord>my practice,</RevealWord>{" "}
            <RevealWord delay={0.1}>
              <em className="italic text-prism-cyan">in four moves.</em>
            </RevealWord>
          </h2>

          <div className="mt-12">
            <PracticeLine
              index={0}
              prefix="i rely on"
              keyword="relationships"
              suffix="for creative collaboration."
              tone="magenta"
            />
            <PracticeLine
              index={1}
              prefix="i cultivate"
              keyword="structured chaos"
              suffix="to find the spark."
              tone="amber"
            />
            <PracticeLine
              index={2}
              prefix="i practice"
              keyword="embodiment"
              suffix="to architect delight."
              tone="cyan"
            />
            <PracticeLine
              index={3}
              prefix="i return to"
              keyword="rhythm"
              suffix="for coherent energy."
              tone="lime"
            />
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section
        data-section="projects"
        className="relative flex min-h-screen items-center px-6 py-32"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="ml-auto max-w-3xl text-right">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
              004 · selected work
            </p>
            <h2 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
              <RevealWord>things i've</RevealWord>{" "}
              <RevealWord delay={0.1}>
                <em className="italic text-prism-amber">made.</em>
              </RevealWord>
            </h2>
            <p className="mt-6 text-lg text-foreground/75">
              small group insights, at scale. a few cases below.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {projects.slice(0, 3).map((p, i) => (
              <div key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] transition hover:bg-white/10"
            >
              all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FRACTAL ============ */}
      <section
        data-section="fractal"
        className="relative flex min-h-screen items-center px-6 py-32"
      >
        <div className="mx-auto w-full max-w-6xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
            005 · the through-line
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-5xl leading-[1.02] md:text-7xl">
            <RevealWord>a fractal</RevealWord>{" "}
            <RevealWord delay={0.1}>
              <em className="italic text-prism-lime">at any scale.</em>
            </RevealWord>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/75">
            the same patterns of care, belonging, play, and creation — nested upward.
          </p>
          <div className="mt-12">
            <FractalScale />
          </div>
        </div>
      </section>

      {/* ============ TICKER ============ */}
      <section
        data-section="ticker"
        className="relative flex min-h-[60vh] items-center px-6 py-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
            006 · the manifesto, in pieces
          </p>
          <ManifestoTicker />
          <p className="hand mt-8 text-center text-2xl text-foreground/70 md:text-3xl">
            (hover to pause. ✿)
          </p>
        </div>
      </section>

      {/* ============ DANCE / CTA ============ */}
      <section
        data-section="dance"
        className="relative flex min-h-screen items-center px-6 py-32"
      >
        <div className="mx-auto w-full max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/60">
            007 · let's go
          </p>
          <h2 className="mt-6 font-display text-7xl leading-[0.92] md:text-9xl">
            <RevealWord>wanna</RevealWord>{" "}
            <RevealWord delay={0.1}>dance</RevealWord>{" "}
            <RevealWord delay={0.2}>
              <em className="italic text-prism-magenta">with me?</em>
            </RevealWord>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/thanks"
              className="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-5 text-lg font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(135deg, var(--prism-magenta), var(--prism-amber))",
                borderRadius: 999,
                boxShadow: "0 20px 60px -10px color-mix(in oklab, var(--prism-magenta) 60%, transparent)",
              }}
            >
              say hello
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

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
                  className="glass grid h-14 w-14 place-items-center rounded-full transition hover:scale-105"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="hand mt-16 max-w-2xl text-3xl text-foreground/80 md:text-4xl"
          >
            "we could totally do that if we could change our culture, but i don't know if we
            can do that."
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="hand mt-4 text-3xl text-prism-magenta md:text-4xl"
          >
            well — i'm here to change the culture, then. bb. ✿
          </motion.p>
        </div>
      </section>
    </main>
  );
}
