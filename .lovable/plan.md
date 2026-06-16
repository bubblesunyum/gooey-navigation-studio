# Bubbles Portfolio — App-Like Experience

A portfolio that feels like a single-canvas app, not a scrolling document. The defining element is a gooey, glassy nav bar that lives near the bottom of the viewport and physically dodges section content as you scroll — sliding left, right, and back to center in a rhythmic, springy choreography. Behind it all: a slow, organic, liquid-color field that feels alive and unpredictable.

## Pages & routes

```text
src/routes/
  __root.tsx              # global shell: liquid background + morphing nav bar
  index.tsx               # home / hero ("hai! i'm bubbles.")
  about.tsx               # about page (app-style, full viewport)
  projects.tsx            # projects index (list of case studies)
  projects.$slug.tsx      # individual case study detail template
  thanks.tsx              # thanks / credits
```

Each route gets its own `head()` metadata. Home keeps a true scroll with section anchors for About preview / Projects preview / Thanks preview so the nav-dodge choreography has somewhere to perform; full pages are reachable via the nav for deep reads.

## The nav bar (the hero element)

Anchored ~24px from the bottom, max width 1920px, gooey + glassy (SVG goo filter + backdrop-blur + subtle inner highlight + soft outer shadow).

Three states, driven by which section is in view:

- **Center (hero / between sections):** full-width pill, centered menu row — `about · projects · thanks  •  ig  li  sc  mail`
- **Left-docked:** bar shrinks to ~420px, slides to the left edge; left-side text items collapse into a 2-bar menu icon (tap → popover with about/projects/thanks); dot separator disappears; socials remain, left-aligned. The freed right side reveals a section-specific CTA (e.g. "Go deeper →").
- **Right-docked:** mirror of left. Section CTA appears on the left side.

Motion: Framer Motion `layout` + a short, springy transition (stiffness ~260, damping ~28, mass ~0.9). Width, x-offset, border-radius, and internal item layout all animate together via shared `layoutId`s so items glide rather than fade-swap.

Scroll choreography: an IntersectionObserver tracks each section and maps it to one of `{center, left, right}` in an alternating pattern down the home page. Each full page (`/about`, `/projects`, etc.) also declares its preferred dock + its section CTA via context, so the bar reacts the same way on dedicated pages.

Gooey rendering: a single inline SVG `<filter>` (`feGaussianBlur` → `feColorMatrix` contrast bump) applied to a wrapper containing the bar + a small blob that briefly "pinches off" during dock transitions for the liquid feel.

## The background

Full-viewport, fixed, behind everything. Organic, animated, liquid — not a clean mesh gradient.

Implementation: a WebGL fragment shader (single full-screen quad via a tiny react-three-fiber setup) running layered domain-warped simplex noise with 4–5 bold color stops (deep indigo, electric magenta, prism cyan, warm amber, hot pink). Slow time advance + mouse parallax. A second pass adds soft bokeh-like highlights that drift across the field. Result: emergent, never-repeating, painterly, slightly absurd in its color choices — closer to oil-on-water than to a "gradient mesh generator."

Fallback for no-WebGL: CSS conic + radial gradients with `@keyframes` slow rotation, heavy blur.

## Type & visual system

- Display: a chunky, playful rounded sans (Fraunces or Sora ExtraBold-style — final pick from a 2-option compare during build). Body: clean grotesque (Inter Tight or Geist).
- Glass tokens in `src/styles.css`: `--glass-bg`, `--glass-border`, `--glass-highlight`, `--shadow-float`, `--goo-blur`.
- Color tokens skew vivid against a near-black base.
- Hover, focus, and active states feel tactile: subtle scale + light refraction sheen on glass surfaces.

## Project detail template (`/projects/$slug`)

App-style full page: hero with project title + role + year, a "Go deeper" CTA in the nav bar drops away (replaced with "Back to projects"), long-form sections (Problem, Approach, Outcome, Gallery). Data lives in a typed `src/data/projects.ts` array so you can add real case studies later by editing one file.

## Social + CTAs

Instagram, LinkedIn, SoundCloud, Mail icons in the nav use `#` placeholders for now; swap later. Each section's "deeper" CTA is a single, stark button in the docked nav bar.

## Technical notes

- Framer Motion for layout choreography (already idiomatic for shared-layout morphs).
- react-three-fiber + a single fragment shader for the background (tree-shaken, ~kb cost is the shader).
- IntersectionObserver hook `useActiveSection` returns `{id, dock, cta}` and feeds a `NavContext`.
- All sizing of the nav uses clamp() so it gracefully scales 320 → 1920px. On <768px, the bar stays centered and shrinks; side-dock choreography is desktop/tablet only (mobile gets a simpler always-centered glass bar).
- SEO: per-route `head()`, semantic landmarks, single H1 per page, alt text on all imagery, JSON-LD `Person` schema on `/about`.

## Build order

1. Tokens, fonts, global shell in `__root.tsx`, liquid background component (shader + fallback).
2. Nav bar component with three layout states (static toggle first, no scroll wiring yet).
3. `useActiveSection` + `NavContext`; wire scroll choreography on `/`.
4. About, Projects index, Thanks pages (each declaring its dock + CTA).
5. Project detail template + 2 placeholder case studies.
6. Polish pass: goo filter tuning, spring tuning, reduced-motion fallback, mobile pass.
