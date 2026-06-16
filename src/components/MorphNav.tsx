import { Link } from "@tanstack/react-router";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Mail, Menu, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { useNav } from "@/lib/nav-context";

// Single fixed-duration tween shared by EVERY animating element so the
// whole nav starts and finishes in perfect lockstep — no spring variance.
const transition = {
  type: "tween" as const,
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const squircle: CSSProperties = {
  borderRadius: 20,
  // @ts-expect-error new CSS property, not yet in TS types
  cornerShape: "squircle",
};

function SoundcloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M2 14v3a1 1 0 002 0v-3a1 1 0 00-2 0zm3-2v6a1 1 0 002 0v-6a1 1 0 00-2 0zm3-2v9a1 1 0 002 0v-9a1 1 0 00-2 0zm3-3v11a1 1 0 002 0V7a1 1 0 00-2 0zm9 4a4 4 0 00-1.2.18A6 6 0 0014 8v11h6a4 4 0 000-8z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "SoundCloud", href: "#", Icon: SoundcloudIcon },
  { label: "Mail", href: "mailto:hi@example.com", Icon: Mail },
];

const navItems = [
  { label: "about", to: "/about" as const },
  { label: "projects", to: "/projects" as const },
  { label: "thanks", to: "/thanks" as const },
];

export function MorphNav() {
  const { dock, cta } = useNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const collapsed = dock !== "center";

  useEffect(() => {
    if (!collapsed) setMenuOpen(false);
  }, [collapsed]);

  const justify =
    dock === "left" ? "justify-start" : dock === "right" ? "justify-end" : "justify-center";

  const Hamburger = () => (
    <motion.button
      layout
      onClick={() => setMenuOpen((v) => !v)}
      aria-label="Open menu"
      aria-expanded={menuOpen}
      className="grid h-10 w-10 place-items-center rounded-full text-foreground/90 transition hover:bg-white/10"
      style={squircle}
    >
      <motion.div animate={{ rotate: menuOpen ? 90 : 0 }}>
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </motion.div>
    </motion.button>
  );

  // CTA appears on the side OPPOSITE the dock so it grows toward the content.
  const ctaOnRight = dock === "left";
  const ctaOnLeft = dock === "right";

  return (
    <MotionConfig transition={spring}>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 px-6">
        <div className={`mx-auto flex max-w-[1920px] ${justify}`}>
          <motion.nav
            layout
            className="glass pointer-events-auto relative flex items-center gap-1 px-2 py-2 text-sm"
            style={squircle}
          >
            {/* LEFT HAMBURGER */}
            <AnimatePresence initial={false} mode="popLayout">
              {dock === "left" && (
                <motion.div
                  key="hamburger-left"
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Hamburger />
                </motion.div>
              )}
            </AnimatePresence>

            {/* LEFT CTA (when docked right) */}
            <AnimatePresence initial={false} mode="popLayout">
              {ctaOnLeft && cta && (
                <motion.div
                  key="cta-left"
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="mr-4"
                >
                  <Link
                    to={cta.href as "/"}
                    className="inline-flex h-10 items-center whitespace-nowrap bg-foreground px-4 text-primary-foreground transition hover:scale-[1.02]"
                    style={squircle}
                  >
                    <motion.span layout="position" key={cta.label} className="font-medium">
                      {cta.label}
                    </motion.span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CENTER TEXT NAV + SEPARATOR (only when centered) */}
            <AnimatePresence initial={false} mode="popLayout">
              {!collapsed && (
                <motion.div
                  key="center-items"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center"
                >
                  {navItems.map((n) => (
                    <Link
                      key={n.label}
                      to={n.to}
                      className="block rounded-full px-3 py-2 text-foreground/90 transition hover:bg-white/10"
                      style={squircle}
                      activeProps={{
                        className: "block rounded-full px-3 py-2 bg-white/15 text-foreground",
                      }}
                    >
                      {n.label}
                    </Link>
                  ))}
                  <span className="mx-3 h-5 w-px bg-foreground/25" aria-hidden />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SOCIAL ICONS — always present, single source of truth for layout anchor */}
            <motion.div layout className="flex items-center">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
                >
                  <s.Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>

            {/* RIGHT CTA (when docked left) */}
            <AnimatePresence initial={false} mode="popLayout">
              {ctaOnRight && cta && (
                <motion.div
                  key="cta-right"
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="ml-4"
                >
                  <Link
                    to={cta.href as "/"}
                    className="inline-flex h-10 items-center whitespace-nowrap bg-foreground px-4 text-primary-foreground transition hover:scale-[1.02]"
                    style={squircle}
                  >
                    <motion.span layout="position" key={cta.label} className="font-medium">
                      {cta.label}
                    </motion.span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* RIGHT HAMBURGER */}
            <AnimatePresence initial={false} mode="popLayout">
              {dock === "right" && (
                <motion.div
                  key="hamburger-right"
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <Hamburger />
                </motion.div>
              )}
            </AnimatePresence>

            {/* HAMBURGER POPOVER */}
            <motion.div
              initial={false}
              animate={{
                opacity: menuOpen ? 1 : 0,
                y: menuOpen ? 0 : 8,
                scale: menuOpen ? 1 : 0.95,
                pointerEvents: menuOpen ? "auto" : "none",
              }}
              className={`glass absolute bottom-16 flex w-44 flex-col gap-1 p-2 ${
                dock === "right" ? "right-0" : "left-0"
              }`}
              style={squircle}
            >
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-foreground/90 transition hover:bg-white/10"
                  style={squircle}
                >
                  {n.label}
                </Link>
              ))}
            </motion.div>
          </motion.nav>
        </div>
      </div>
    </MotionConfig>
  );
}
