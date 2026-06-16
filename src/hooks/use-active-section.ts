import { useEffect } from "react";
import { useNav, type Dock, type SectionCta } from "@/lib/nav-context";

export type Section = {
  id: string;
  dock: Dock;
  cta: SectionCta;
};

const DOCK_DEBOUNCE_MS = 120;

/**
 * Observe DOM elements with [data-section="id"] and update the nav dock + CTA
 * based on which one is most prominently in view. Debounced so rapid scrolling
 * doesn't whip the nav back and forth.
 */
export function useActiveSection(sections: Section[]) {
  const { setDock, setCta } = useNav();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const map = new Map(sections.map((s) => [s.id, s]));
    const els = sections
      .map((s) => document.querySelector(`[data-section="${s.id}"]`))
      .filter((el): el is Element => !!el);
    if (!els.length) return;

    const visibility = new Map<string, number>();
    let pending: number | null = null;
    let lastId: string | null = null;

    const commit = () => {
      let bestId: string | null = null;
      let bestRatio = 0;
      visibility.forEach((r, id) => {
        if (r > bestRatio) { bestRatio = r; bestId = id; }
      });
      if (bestId && bestRatio > 0.15 && bestId !== lastId) {
        const s = map.get(bestId);
        if (s) { lastId = bestId; setDock(s.dock); setCta(s.cta); }
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.section!;
          visibility.set(id, e.intersectionRatio);
        }
        if (pending) window.clearTimeout(pending);
        pending = window.setTimeout(commit, DOCK_DEBOUNCE_MS);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9] },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      if (pending) window.clearTimeout(pending);
      io.disconnect();
    };
  }, [sections, setDock, setCta]);
}
