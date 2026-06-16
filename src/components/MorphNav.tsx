import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNav } from "@/lib/nav-context";

const spring = { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.9 };

function SoundcloudIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M2 14v3a1 1 0 002 0v-3a1 1 0 00-2 0zm3-2v6a1 1 0 002 0v-6a1 1 0 00-2 0zm3-2v9a1 1 0 002 0v-9a1 1 0 00-2 0zm3-3v11a1 1 0 002 0V7a1 1 0 00-2 0zm9 4a4 4 0 00-1.2.18A6 6 0 0014 8v11h6a4 4 0 000-8z"/>
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

  const justify =
    dock === "left" ? "justify-start" : dock === "right" ? "justify-end" : "justify-center";

  return (
    <div className={`pointer-events-none fixed inset-x-0 bottom-4 z-50 flex px-4 ${justify}`}>
      <motion.nav
        layout
        transition={spring}
        className="glass pointer-events-auto flex items-center gap-2 rounded-full px-3 py-2 text-sm"
        style={{
          maxWidth: "min(1920px, 100%)",
          width: collapsed ? "auto" : "min(1920px, 100%)",
        }}
      >
        <motion.div
          layout
          transition={spring}
          className={`flex w-full items-center gap-2 ${
            dock === "center" ? "justify-center" : dock === "right" ? "flex-row-reverse" : ""
          }`}
        >
          {/* LEFT GROUP */}
          <motion.div layout transition={spring} className="flex items-center gap-1">
            <AnimatePresence mode="popLayout" initial={false}>
              {collapsed ? (
                <motion.div
                  key="menu-btn"
                  layout
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={spring}
                  className="relative"
                >
                  <button
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Open menu"
                    className="grid h-10 w-10 place-items-center rounded-full text-foreground/90 transition hover:bg-white/10"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="glass absolute bottom-12 left-0 flex w-44 flex-col gap-1 rounded-2xl p-2"
                      >
                        {navItems.map((n) => (
                          <Link
                            key={n.to}
                            to={n.to}
                            onClick={() => setMenuOpen(false)}
                            className="rounded-xl px-3 py-2 text-foreground/90 transition hover:bg-white/10"
                          >
                            {n.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                navItems.map((n) => (
                  <motion.div
                    key={n.label}
                    layoutId={`nav-${n.label}`}
                    transition={spring}
                  >
                    <Link
                      to={n.to}
                      className="rounded-full px-4 py-2 text-foreground/90 transition hover:bg-white/10"
                      activeProps={{ className: "rounded-full px-4 py-2 bg-white/15 text-foreground" }}
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {!collapsed && (
              <motion.span
                layoutId="dot-sep"
                transition={spring}
                className="mx-2 h-1.5 w-1.5 rounded-full bg-foreground/40"
              />
            )}

            {socials.map((s) => (
              <motion.a
                key={s.label}
                layoutId={`soc-${s.label}`}
                transition={spring}
                href={s.href}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
              >
                <s.Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA on opposite end */}
          <AnimatePresence>
            {collapsed && cta && (
              <motion.div
                key="cta"
                layout
                initial={{ opacity: 0, scale: 0.7, x: dock === "left" ? 20 : -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={spring}
                className={dock === "left" ? "ml-2" : "mr-2"}
              >
                <Link
                  to={cta.href as "/"}
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-primary-foreground transition hover:scale-[1.02]"
                >
                  <span className="font-medium">{cta.label}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
    </div>
  );
}
