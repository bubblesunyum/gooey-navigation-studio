import { createContext, useContext, useState, type ReactNode } from "react";

export type Dock = "center" | "left" | "right";
export type SectionCta = { label: string; href: string } | null;

type NavState = {
  dock: Dock;
  cta: SectionCta;
  setDock: (d: Dock) => void;
  setCta: (c: SectionCta) => void;
};

const NavContext = createContext<NavState | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [dock, setDock] = useState<Dock>("center");
  const [cta, setCta] = useState<SectionCta>(null);
  return (
    <NavContext.Provider value={{ dock, cta, setDock, setCta }}>{children}</NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be inside NavProvider");
  return ctx;
}
