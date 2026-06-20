import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function RevealWord({
  children,
  delay = 0,
  className = "",
  as: As = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const MotionTag = As === "div" ? motion.div : motion.span;
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <MotionTag
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ type: "tween", duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        className="inline-block"
      >
        {children}
      </MotionTag>
    </span>
  );
}

export function InkUnderline({
  children,
  tone = "magenta",
  className = "",
}: {
  children: ReactNode;
  tone?: "magenta" | "cyan" | "amber" | "indigo" | "pink" | "lime";
  className?: string;
}) {
  const color = `var(--prism-${tone})`;
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.svg
        aria-hidden
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 z-0 h-[0.4em] w-full"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.path
          d="M2 8 C 40 2, 80 12, 120 6 S 180 4, 198 8"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </motion.svg>
    </span>
  );
}
