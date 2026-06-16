import { Link } from "@tanstack/react-router";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Mail, Menu, X } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { useNav } from "@/lib/nav-context";

// One shared spring used by EVERY animating element in the nav so the whole
// thing moves as a single, coordinated organism.
const spring = { type: "spring" as const, stiffness: 300, damping: 34, mass: 0.8 };

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

  const ctaOrder = dock === "right" ? -10 : 10;

  const Hamburger = ({ side }: { side: "left" | "right" }) => (
    <button
      onClick={() => setMenuOpen((v) => !v)}
      aria-label="Open menu"
      aria-expanded={menuOpen}
      className="grid h-10 w-10 place-items-center rounded-full text-foreground/90 transition hover:bg-white/10"
      style={squircle}
      data-side={side}
    >
      <motion.div animate={{ rotate: menuOpen ? 90 : 0 }}>
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </motion.div>
    </button>
  );

  return (
    <MotionConfig transition={spring}>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 px-6">
        <div className={`mx-auto flex max-w-[1920px] ${justify}`}>
          <motion.nav
            layout
            className="glass pointer-events-auto relative flex items-center px-2 py-2 text-sm"
            style={squircle}
          >
            {/* LEFT HAMBURGER — only when docked LEFT */}
            <AnimatePresence initial={false} mode="popLayout">
              {dock === "left" && (
                <motion.div
                  key="hamburger-left"
                  layout
                  initial={{ opacity: 0, scale: 0.6, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: "auto" }}
                  exit={{ opacity: 0, scale: 0.6, width: 0 }}
                  style={{ order: -20 }}
                  className="mr-1 overflow-hidden"
                >
                  <Hamburger side="left" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* TEXT NAV ITEMS + DOT SEPARATOR — present when centered */}
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  key="center-items"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ order: 0 }}
                  className="flex items-center"
                >
                  {navItems.map((n) => (
                    <Link
                      key={n.label}
                      to={n.to}
                      className="block rounded-full px-3 py-2 text-foreground/90 transition hover:bg-white/10"
                      style={squircle}
                      activeProps={{ className: "block rounded-full px-3 py-2 bg-white/15 text-foreground" }}
                    >
                      {n.label}
                    </Link>
                  ))}
                  {/* thin vertical separator */}
                  <span className="mx-3 h-5 w-px bg-foreground/25" aria-hidden />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SOCIAL ICONS — always present */}
            <div className="flex items-center" style={{ order: 5 }}>
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
            </div>

            {/* CTA — grows from the side opposite the dock; width animates on label change */}
            <AnimatePresence initial={false}>
              {collapsed && cta && (
                <motion.div
                  key="cta"
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  style={{
                    order: ctaOrder,
                    marginLeft: dock === "left" ? 20 : 0,
                    marginRight: dock === "right" ? 20 : 0,
                  }}
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
