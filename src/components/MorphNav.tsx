import { Link } from "@tanstack/react-router";
import { motion, MotionConfig } from "framer-motion";
import { Instagram, Linkedin, Mail, Menu, ArrowRight, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { useNav } from "@/lib/nav-context";

// One shared spring used by EVERY animating element in the nav so the whole
// thing moves as a single, coordinated organism.
const spring = { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.9 };

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

  // close popover when returning to center
  useEffect(() => {
    if (!collapsed) setMenuOpen(false);
  }, [collapsed]);

  const justify =
    dock === "left" ? "justify-start" : dock === "right" ? "justify-end" : "justify-center";

  // When docked RIGHT, the CTA grows from the LEFT (it's the first child).
  // When docked LEFT, the CTA grows from the RIGHT (last child).
  const ctaOrder = dock === "right" ? -10 : 10;
  const hamburgerOrder = dock === "right" ? 10 : -10;

  return (
    <MotionConfig transition={spring}>
      {/* Outer wrapper clamps the nav's travel: center point can never move
          more than 960px from viewport center (max width 1920px, centered). */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 px-6">
        <div className={`mx-auto flex max-w-[1920px] ${justify}`}>
          <motion.nav
            layout
            transition={spring}
            className="glass pointer-events-auto relative flex items-center gap-1 px-2 py-2 text-sm"
            style={squircle}
          >
            {/* HAMBURGER — only when collapsed */}
            <motion.div
              animate={{
                width: collapsed ? 40 : 0,
                opacity: collapsed ? 1 : 0,
                marginRight: collapsed ? 4 : 0,
              }}
              style={{ order: hamburgerOrder }}
              className="overflow-hidden"
            >
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="grid h-10 w-10 place-items-center rounded-full text-foreground/90 transition hover:bg-white/10"
                style={squircle}
              >
                <motion.div animate={{ rotate: menuOpen ? 90 : 0 }}>
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </button>
            </motion.div>

            {/* TEXT NAV ITEMS — present when centered */}
            {navItems.map((n, i) => (
              <motion.div
                key={n.label}
                animate={{
                  width: collapsed ? 0 : "auto",
                  opacity: collapsed ? 0 : 1,
                  marginLeft: collapsed ? 0 : 2,
                  marginRight: collapsed ? 0 : 2,
                }}
                style={{ order: i }}
                className="overflow-hidden whitespace-nowrap"
              >
                <Link
                  to={n.to}
                  className="block rounded-full px-3 py-2 text-foreground/90 transition hover:bg-white/10"
                  style={squircle}
                  activeProps={{ className: "block rounded-full px-3 py-2 bg-white/15 text-foreground" }}
                >
                  {n.label}
                </Link>
              </motion.div>
            ))}

            {/* DOT SEPARATOR */}
            <motion.span
              animate={{
                width: collapsed ? 0 : 6,
                opacity: collapsed ? 0 : 0.5,
                marginLeft: collapsed ? 0 : 8,
                marginRight: collapsed ? 0 : 8,
              }}
              style={{ order: 5 }}
              className="h-1.5 rounded-full bg-foreground"
            />

            {/* SOCIAL ICONS — always present */}
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{ order: 6 + i }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
              >
                <s.Icon className="h-4 w-4" />
              </motion.a>
            ))}

            {/* CTA — grows from opposite side of dock */}
            <motion.div
              animate={{
                width: collapsed && cta ? "auto" : 0,
                opacity: collapsed && cta ? 1 : 0,
                marginLeft: collapsed && cta && dock === "left" ? 12 : 0,
                marginRight: collapsed && cta && dock === "right" ? 12 : 0,
              }}
              style={{ order: ctaOrder }}
              className="overflow-hidden"
            >
              {cta && (
                <Link
                  to={cta.href as "/"}
                  className="group inline-flex h-10 items-center gap-2 whitespace-nowrap bg-foreground px-4 text-primary-foreground transition hover:scale-[1.02]"
                  style={squircle}
                >
                  <span className="font-medium">{cta.label}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              )}
            </motion.div>

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
