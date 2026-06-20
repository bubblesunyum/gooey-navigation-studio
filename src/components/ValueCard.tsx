import { motion } from "framer-motion";

type Tone = "magenta" | "cyan" | "amber" | "lime";

const gradients: Record<Tone, string> = {
  magenta: "radial-gradient(120% 120% at 20% 10%, var(--prism-magenta), transparent 60%), radial-gradient(80% 80% at 90% 90%, var(--prism-pink), transparent 60%)",
  cyan: "radial-gradient(120% 120% at 20% 10%, var(--prism-cyan), transparent 60%), radial-gradient(80% 80% at 90% 90%, var(--prism-indigo), transparent 60%)",
  amber: "radial-gradient(120% 120% at 20% 10%, var(--prism-amber), transparent 60%), radial-gradient(80% 80% at 90% 90%, var(--prism-pink), transparent 60%)",
  lime: "radial-gradient(120% 120% at 20% 10%, var(--prism-lime), transparent 60%), radial-gradient(80% 80% at 90% 90%, var(--prism-cyan), transparent 60%)",
};

export function ValueCard({
  label,
  gloss,
  tone,
  index,
}: {
  label: string;
  gloss: string;
  tone: Tone;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ type: "spring", stiffness: 180, damping: 22, delay: index * 0.08 }}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      className="glass relative aspect-[3/4] overflow-hidden p-6"
      style={{ borderRadius: 32 }}
    >
      <div
        className="absolute inset-0 opacity-55 mix-blend-screen"
        style={{ background: gradients[tone] }}
      />
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70">
          0{index + 1}
        </span>
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: `var(--prism-${tone})`, boxShadow: `0 0 12px var(--prism-${tone})` }}
        />
      </div>
      <div className="relative flex h-full flex-col justify-end">
        <h3 className="font-display text-5xl leading-[0.9] tracking-tight md:text-6xl">
          {label}
        </h3>
        <p className="mt-3 text-sm text-foreground/85">{gloss}</p>
      </div>
    </motion.div>
  );
}
