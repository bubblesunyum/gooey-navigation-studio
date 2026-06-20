import { motion } from "framer-motion";
import { InkUnderline } from "./RevealWord";

type Tone = "magenta" | "cyan" | "amber" | "lime" | "pink" | "indigo";

export function PracticeLine({
  index,
  prefix,
  keyword,
  suffix,
  tone,
}: {
  index: number;
  prefix: string;
  keyword: string;
  suffix: string;
  tone: Tone;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ type: "tween", duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="relative flex items-baseline gap-6 border-b border-white/10 py-8 md:py-10"
    >
      <span className="font-mono text-xs text-foreground/50 md:text-sm">
        0{index + 1}
      </span>
      <p className="font-display text-3xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
        {prefix}{" "}
        <InkUnderline tone={tone}>
          <em className="not-italic font-display font-black italic">{keyword}</em>
        </InkUnderline>{" "}
        {suffix}
      </p>
    </motion.div>
  );
}
