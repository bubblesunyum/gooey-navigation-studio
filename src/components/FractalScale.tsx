import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = ["self", "couple", "community", "culture", "society"];
const tones = ["magenta", "pink", "amber", "lime", "cyan"];

export function FractalScale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div className="relative mx-auto flex h-[420px] w-full max-w-5xl items-center justify-center md:h-[520px]">
        {steps.map((label, i) => {
          const size = 80 + i * 80;
          const tone = tones[i];
          return (
            <motion.div
              key={label}
              className="absolute flex items-center justify-center rounded-full"
              style={{
                width: size,
                height: size,
                border: `1.5px solid color-mix(in oklab, var(--prism-${tone}) 70%, white)`,
                background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--prism-${tone}) 30%, transparent), transparent 70%)`,
                boxShadow: `0 0 60px -10px var(--prism-${tone})`,
                backdropFilter: "blur(6px)",
                opacity: useTransform(progress, [i * 0.15, i * 0.15 + 0.2], [0, 1]),
                scale: useTransform(progress, [i * 0.15, i * 0.15 + 0.2], [0.4, 1]),
              }}
            >
              {i === steps.length - 1 && (
                <span className="absolute top-3 font-mono text-[10px] uppercase tracking-[0.32em] text-foreground/70">
                  society
                </span>
              )}
            </motion.div>
          );
        })}
        {/* Central label */}
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

      {/* Step labels arrow row */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-foreground/70 md:text-sm">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: `var(--prism-${tones[i]})`, boxShadow: `0 0 10px var(--prism-${tones[i]})` }}
            />
            {s}
            {i < steps.length - 1 && <span className="text-foreground/40">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
