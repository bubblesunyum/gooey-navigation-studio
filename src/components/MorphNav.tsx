import { Link } from "@tanstack/react-router";
import { motion, MotionConfig } from "framer-motion";
import { Instagram, Linkedin, Mail, Menu, ArrowRight, X } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { useNav } from "@/lib/nav-context";

const spring = { type: "spring" as const, stiffness: 320, damping: 34, mass: 0.7 };

// squircle corners (new CSS) with rounded fallback for unsupported browsers
const squircle: CSSProperties = {
  borderRadius: 20,
  // @ts-expect-error - new CSS property, not yet in TS types
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

  // close menu when going back to center
  if (!collapsed && menuOpen) {
    setTimeout(() => setMenuOpen(false), 0);
  }

  const justify =
    dock === "left" ? "justify-start" : dock === "right" ? "justify-end" : "justify-center";

  return (
    <MotionConfig transition={spring}>
      <div className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex px-6 ${justify}`}>
        <motion.nav
          layout
          className="glass pointer-events-auto relative flex items-center gap-1 px-2 py-2 text-sm"
          style={squircle}
        >
          {/* HAMBURGER — appears when collapsed */}
          <motion.div
            layout
            animate={{
              width: collapsed ? 40 : 0,
              opacity: collapsed ? 1 : 0,
              marginRight: collapsed ? 4 : 0,
            }}
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

          {/* TEXT NAV ITEMS — present when centered, collapse to 0 when docked */}
          {navItems.map((n) => (
            <motion.div
              key={n.label}
              layout
              animate={{
                width: collapsed ? 0 : "auto",
                opacity: collapsed ? 0 : 1,
                marginLeft: collapsed ? 0 : 2,
                marginRight: collapsed ? 0 : 2,
              }}
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
            layout
            animate={{
              width: collapsed ? 0 : 6,
              opacity: collapsed ? 0 : 0.5,
              marginLeft: collapsed ? 0 : 8,
              marginRight: collapsed ? 0 : 8,
            }}
            className="h-1.5 rounded-full bg-foreground"
          />

          {/* SOCIAL ICONS — always present */}
          {socials.map((s) => (
            <motion.a
              key={s.label}
              layout
              href={s.href}
              aria-label={s.label}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
              style={squircle}
            >
              <s.Icon className="h-4 w-4" />
            </motion.a>
          ))}

          {/* CTA — appears when docked, with section button */}
          <motion.div
            layout
            animate={{
              width: collapsed && cta ? "auto" : 0,
              opacity: collapsed && cta ? 1 : 0,
              marginLeft: collapsed && cta ? 12 : 0,
            }}
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
            className="glass absolute bottom-16 left-0 flex w-44 flex-col gap-1 p-2"
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
    </MotionConfig>
  );
}
