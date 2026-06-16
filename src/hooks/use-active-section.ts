import { useEffect } from "react";
import { useNav, type Dock, type SectionCta } from "@/lib/nav-context";

export type Section = {
  id: string;
  dock: Dock;
  cta: SectionCta;
};

/**
 * Observe DOM elements with [data-section="id"] and update the nav dock + CTA
 * based on which one is most prominently in view.
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
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.section!;
          visibility.set(id, e.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        visibility.forEach((r, id) => {
          if (r > bestRatio) { bestRatio = r; bestId = id; }
        });
        if (bestId && bestRatio > 0.15) {
          const s = map.get(bestId);
          if (s) { setDock(s.dock); setCta(s.cta); }
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections, setDock, setCta]);
}
