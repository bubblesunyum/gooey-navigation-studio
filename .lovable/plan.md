
# Remixing the notebook into a site

I'll rebuild the homepage (and lightly refresh `/about`, `/projects`, `/thanks`) into a long-scroll, section-anchored experience that the existing MorphNav already knows how to dock against. The hand-drawn notebook becomes the source of voice, structure, and personality — glassy panels, bold display type, playful micro-moments, and the liquid background we already have showing through.

## Voice & visual language

- **Typography**: pair a bold display serif with a clean grotesque for body, plus a mono accent for section numerals and metadata (keeps the "scientific notebook" feel from the project sketch). Display type is huge, tight-leaded, lowercase, occasionally italic/handwritten-script for cheeky asides ("bb.", "wanna dance with me?", "seriously, it's not that serious").
- **Color**: lean into the liquid background — extend the prism tokens (magenta, cyan, gold, lime) as semantic accents in `styles.css`. Each section gets one dominant accent so the page reads as a chromatic journey.
- **Material**: glass panels (existing `.glass`) for content cards, soft inner-glow rings, sticker-style outlined pills mimicking the inked circles/boxes in the notebook, and the goo filter for organic blob clusters behind values.
- **Motion**: Framer Motion scroll-linked reveals — words mask up, pills pop in with spring, blobs drift, and the fractal scales bloom on intersect. Everything uses the same easing family as the nav so it feels of-a-piece.

## New homepage sections (in scroll order, each registered with `useActiveSection`)

1. **hero** — `hai! i'm bubbles.` with the existing prismatic orb, plus a small handwritten "wanna dance with me? ↓" nudge. Nav: center, no CTA.
2. **bring** — "i bring —" followed by a loose constellation of hand-circled pills: *aesthetic sensibility, systems thinking, spiritual grounding, creative connections*. Below, the manifesto sentence: *"i use [design] and [art] to weave us a story of effortless coherence."* with `[design]` and `[art]` rendered as inline outlined stickers. Nav: right, CTA `more about me → /about`.
3. **values** — "looking back, some patterns have emerged. here are my core values:" → four big glass cards (care · belonging · play · creation), each with its own accent gradient and a one-line gloss. Below: *"i design [delightfully] [fearlessly] [creatively] to honor these ideals and create a more sustainable, cohesive world — one we can lovingly share together."* Nav: left, CTA `read the manifesto → /about#manifesto`.
4. **practice** — "how i work" stack of four big statements with underlined keywords:
   - *i rely on **relationships** for creative collaboration.*
   - *i cultivate **structured chaos** to find the spark.*
   - *i practice **embodiment** to architect delight.*
   - *i return to **rhythm** for coherent energy.*
   Each line reveals on scroll with a small blob behind the underlined word. Nav: right, CTA `say hi → /thanks`.
5. **projects** — "things i've made." Re-skin the existing project cards into the notebook's project-card layout: title bar, metadata row (role / year / tools / domain) as outlined sticker pills, short blurb, and a glassy thumbnail well. Show top 3, link to `/projects`. Nav: left, CTA `see all projects → /projects`.
6. **fractal** — single-line, full-width scroll moment: *"a fractal at any scale:"* with **self → couple → community → culture → society** rendered as growing concentric glass rings that scale with scroll progress. Nav: center, no CTA.
7. **manifesto-ticker** — horizontal marquee of the small punchy lines (*share and receive · fusion, not fission · build, combine, repeat · seriously, it's not that serious · don't improve your well-being at the expense of others · abundance · nothing lasts forever · live & love regeneratively*) drifting slowly, pausable on hover. Sits on a darker glass band. Nav: right, no CTA.
8. **dance** — closing CTA: huge *"wanna dance with me?"* with a primary action button to `/thanks` and the social row repeated big. Small handwritten *"well, i'm here to change the culture then. bb."* underneath. Nav: left, CTA `say hello → /thanks`.

## Companion route refreshes (light touch)

- **/about** — full manifesto: pull the longer prose from the notebook (presence, reverence, "i revere presence to produce meaning and connection"), plus the *amplify these ideas* trio (abundance · nothing lasts forever · live & love regeneratively) as three glass cards.
- **/projects** — grid using the new project-card sticker-pill layout.
- **/thanks** — add the *"wanna dance with me?"* energy and a clear contact block; keep existing form/fields if present.

## Technical notes

- All new sections use `data-section="…"` so `useActiveSection` drives the nav docking + CTA as listed above.
- Content sits inside a `max-w-[1920px] mx-auto` container per the earlier rule; sections are full-bleed but content is constrained.
- Add design tokens to `src/styles.css`: `--accent-magenta`, `--accent-cyan`, `--accent-gold`, `--accent-lime`, plus matching `--gradient-*` and a `--sticker-stroke` for the inked-pill outlines. New utilities: `.sticker` (rounded outlined pill with hand-drawn-ish stroke + slight rotation), `.ink-underline` (svg squiggle under a word), `.glass-deep` (darker glass for the ticker band).
- Reuse Framer Motion's existing `MotionConfig` tween so reveal timing matches the nav.
- Fonts: load via `<link>` in `src/routes/__root.tsx` head — Fraunces (display, italic-rich), Inter Tight (body), JetBrains Mono (meta), Caveat (handwritten asides). No CSS `@import` of remote URLs.
- Keep changes presentation-only: no backend, no new data models. Project list stays sourced from `src/data/projects.ts`.

## Files I'll touch

- `src/styles.css` — accent tokens, sticker/ink-underline utilities, font-family vars.
- `src/routes/__root.tsx` — `<link>` tags for the four web fonts.
- `src/routes/index.tsx` — full rewrite into the 8 sections above, with `useActiveSection` updated.
- `src/components/` — new presentational pieces: `Sticker.tsx`, `ValueCard.tsx`, `PracticeLine.tsx`, `ProjectCard.tsx`, `FractalScale.tsx`, `ManifestoTicker.tsx`, `RevealWord.tsx`.
- `src/routes/about.tsx`, `src/routes/projects.tsx`, `src/routes/thanks.tsx` — restyle to match the new language (no structural rewrite of `/projects/$slug`).

Want me to build it as described, or tweak any section's content/order first?
