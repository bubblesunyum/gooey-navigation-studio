import { useEffect } from "react";
import { useNav, type Dock, type SectionCta } from "@/lib/nav-context";

export type Section = {
  id: string;
  dock: Dock;
  cta: SectionCta;
};

/**
 * Scroll-position-based active section detection.
 *
 * We pick the section whose vertical center is closest to the viewport
 * center on every animation frame. This gives perfectly symmetric timing
 * in both directions (no debounce asymmetry between scroll-up and
 * scroll-down) and changes the dock the moment a new section crosses
 * the midline.
 */
export function useActiveSection(sections: Section[]) {
  const { setDock, setCta } = useNav();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const map = new Map(sections.map((s) => [s.id, s]));
    const els = sections
      .map((s) => document.querySelector<HTMLElement>(`[data-section="${s.id}"]`))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    let lastId: string | null = null;
    let rafId: number | null = null;
    let scheduled = false;

    const measure = () => {
      scheduled = false;
      const viewportCenter = window.innerHeight / 2;
      let bestId: string | null = null;
      let bestDist = Infinity;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.dataset.section ?? null;
        }
      }
      if (bestId && bestId !== lastId) {
        const s = map.get(bestId);
        if (s) {
          lastId = bestId;
          setDock(s.dock);
          setCta(s.cta);
        }
      }
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections, setDock, setCta]);
}
