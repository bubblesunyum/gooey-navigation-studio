import { motion } from "framer-motion";
import type { ReactNode } from "react";

type StickerProps = {
  children: ReactNode;
  tone?: "magenta" | "cyan" | "amber" | "indigo" | "pink" | "lime" | "neutral";
  rotate?: number;
  className?: string;
};

const toneBg: Record<NonNullable<StickerProps["tone"]>, string> = {
  magenta: "color-mix(in oklab, var(--prism-magenta) 22%, transparent)",
  cyan: "color-mix(in oklab, var(--prism-cyan) 22%, transparent)",
  amber: "color-mix(in oklab, var(--prism-amber) 22%, transparent)",
  indigo: "color-mix(in oklab, var(--prism-indigo) 28%, transparent)",
  pink: "color-mix(in oklab, var(--prism-pink) 22%, transparent)",
  lime: "color-mix(in oklab, var(--prism-lime) 22%, transparent)",
  neutral: "color-mix(in oklab, white 6%, transparent)",
};

const toneStroke: Record<NonNullable<StickerProps["tone"]>, string> = {
  magenta: "color-mix(in oklab, var(--prism-magenta) 80%, white)",
  cyan: "color-mix(in oklab, var(--prism-cyan) 80%, white)",
  amber: "color-mix(in oklab, var(--prism-amber) 80%, white)",
  indigo: "color-mix(in oklab, var(--prism-indigo) 70%, white)",
  pink: "color-mix(in oklab, var(--prism-pink) 80%, white)",
  lime: "color-mix(in oklab, var(--prism-lime) 80%, white)",
  neutral: "color-mix(in oklab, white 70%, transparent)",
};

export function Sticker({ children, tone = "neutral", rotate = 0, className = "" }: StickerProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 8 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      whileHover={{ scale: 1.06, rotate: rotate + 2 }}
      className={`inline-flex items-center gap-2 whitespace-nowrap px-4 py-1.5 text-base font-medium leading-none ${className}`}
      style={{
        background: toneBg[tone],
        border: `1.5px solid ${toneStroke[tone]}`,
        borderRadius: 999,
        backdropFilter: "blur(8px)",
        boxShadow: "inset 0 0 0 1px color-mix(in oklab, white 10%, transparent)",
      }}
    >
      {children}
    </motion.span>
  );
}
