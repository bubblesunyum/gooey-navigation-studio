import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const steps = ["self", "couple", "community", "culture", "society"];
const tones = ["magenta", "pink", "amber", "lime", "cyan"];

function Ring({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const size = 80 + index * 90;
  const tone = tones[index];
  const opacity = useTransform(progress, [index * 0.15, index * 0.15 + 0.2], [0, 1]);
  const scale = useTransform(progress, [index * 0.15, index * 0.15 + 0.2], [0.4, 1]);
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        border: `1.5px solid color-mix(in oklab, var(--prism-${tone}) 70%, white)`,
        background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--prism-${tone}) 24%, transparent), transparent 70%)`,
        boxShadow: `0 0 60px -10px var(--prism-${tone})`,
        backdropFilter: "blur(6px)",
        opacity,
        scale,
      }}
    />
  );
}

export function FractalScale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div className="relative mx-auto flex h-[560px] w-full max-w-5xl items-center justify-center">
        {steps.map((_, i) => (
          <Ring key={i} index={i} progress={progress} />
        ))}
        <motion.span
          className="relative z-10 font-display text-2xl italic text-foreground md:text-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          self
        </motion.span>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-foreground/70 md:text-sm">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{
                background: `var(--prism-${tones[i]})`,
                boxShadow: `0 0 10px var(--prism-${tones[i]})`,
              }}
            />
            {s}
            {i < steps.length - 1 && <span className="text-foreground/40">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
