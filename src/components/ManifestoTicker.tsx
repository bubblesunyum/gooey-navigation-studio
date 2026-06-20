const lines = [
  "share and receive",
  "fusion, not fission",
  "build, combine, repeat",
  "seriously, it's not that serious",
  "don't improve your well-being at the expense of others",
  "abundance",
  "nothing lasts forever",
  "live & love regeneratively",
  "more exploration, less conquering",
  "revel in the unavoidable repetition",
];

const tones = ["magenta", "cyan", "amber", "lime", "pink", "indigo"];

export function ManifestoTicker() {
  // Duplicate the list for seamless loop
  const doubled = [...lines, ...lines];
  return (
    <div className="glass-deep group relative overflow-hidden py-8" style={{ borderRadius: 28 }}>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap px-12">
        {doubled.map((line, i) => {
          const tone = tones[i % tones.length];
          return (
            <span key={i} className="flex items-center gap-12">
              <span className="font-display text-3xl italic text-foreground/95 md:text-5xl">
                {line}
              </span>
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{
                  background: `var(--prism-${tone})`,
                  boxShadow: `0 0 16px var(--prism-${tone})`,
                }}
              />
            </span>
          );
        })}
      </div>
      {/* edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
      />
    </div>
  );
}
