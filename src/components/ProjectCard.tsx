import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sticker } from "./Sticker";
import type { Project } from "@/data/projects";

const toneOrder: Array<"magenta" | "cyan" | "amber" | "lime" | "pink" | "indigo"> = [
  "magenta",
  "cyan",
  "amber",
  "lime",
  "pink",
  "indigo",
];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tone = toneOrder[index % toneOrder.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ type: "spring", stiffness: 180, damping: 24, delay: index * 0.06 }}
    >
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="glass group relative block overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8"
        style={{ borderRadius: 36 }}
      >
        {/* Glow wash */}
        <div
          className="pointer-events-none absolute -inset-px -z-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background: `radial-gradient(80% 60% at 20% 0%, var(--prism-${tone}), transparent 60%)`,
            mixBlendMode: "screen",
          }}
        />

        <div className="relative">
          {/* Header bar */}
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/60">
              case · 0{index + 1}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/60">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-4xl leading-[0.95] tracking-tight md:text-5xl">
            {project.title}
          </h3>

          {/* Blurb */}
          <p className="mt-4 max-w-md text-base text-foreground/80 md:text-lg">
            {project.blurb}
          </p>

          {/* Glass thumbnail well */}
          <div
            className="relative mt-6 aspect-[16/7] w-full overflow-hidden"
            style={{
              borderRadius: 24,
              background: `linear-gradient(135deg, color-mix(in oklab, var(--prism-${tone}) 50%, transparent), color-mix(in oklab, var(--prism-indigo) 40%, transparent))`,
              border: "1px solid var(--glass-border)",
            }}
          >
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 80% at 20% 30%, white, transparent 60%), radial-gradient(50% 70% at 80% 70%, color-mix(in oklab, white 60%, transparent), transparent 60%)",
                mixBlendMode: "overlay",
                filter: "blur(20px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-7xl italic text-white/30 md:text-9xl">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>

          {/* Sticker metadata row */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Sticker tone={tone} rotate={-1.5}>{project.role}</Sticker>
            <Sticker tone="neutral" rotate={1}>{project.year}</Sticker>
            <Sticker tone="neutral" rotate={-0.5}>figma · lovable</Sticker>
            <Sticker tone="neutral" rotate={1.5}>civic tech</Sticker>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-xs text-foreground/60">
              intro · process · design · retro
            </span>
            <span className="font-mono text-sm text-foreground/80 transition-transform duration-300 group-hover:translate-x-1">
              go deeper →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
