export type Project = {
  slug: string;
  title: string;
  blurb: string;
  role: string;
  year: string;
  accent: string;
  problem: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "ripple-care",
    title: "Ripple Care",
    blurb: "A tender mental-health companion that meets people where they are.",
    role: "Lead Product Designer",
    year: "2025",
    accent: "from-prism-magenta to-prism-pink",
    problem:
      "Traditional mental-health apps feel clinical, gamified, or overwhelming. People in crisis need warmth — not streaks.",
    approach:
      "We designed a calm, voice-first interface centered on micro-rituals. Soft motion, breathy haptics, and tone-aware copy adapt to the user's mood.",
    outcome:
      "30-day retention up 4.2× over the legacy product. Featured by Apple as App of the Day in 11 regions.",
  },
  {
    slug: "common-table",
    title: "Common Table",
    blurb: "A community fridge network coordinating fresh food for 80+ neighborhoods.",
    role: "Product & Brand Lead",
    year: "2024",
    accent: "from-prism-amber to-prism-pink",
    problem:
      "Volunteer organizers were juggling spreadsheets, text threads, and goodwill to keep fridges stocked. Things fell through the cracks.",
    approach:
      "A lightweight scheduling tool that feels like a group chat, with playful, hand-drawn iconography and zero learning curve.",
    outcome:
      "120k meals routed in year one; zero-hour onboarding for new organizers.",
  },
  {
    slug: "sonar-fm",
    title: "Sonar FM",
    blurb: "A spatial-audio listening room for independent artists.",
    role: "Design Director",
    year: "2024",
    accent: "from-prism-cyan to-prism-indigo",
    problem:
      "Streaming flattens listening. Artists wanted a way to host real events that felt like *being there.*",
    approach:
      "Rooms with hand-drawn avatars, ambient crowd noise, and a chat that ripples to the beat. The whole UI breathes with the music.",
    outcome:
      "Over 9,000 listening rooms hosted in private beta. Acquired by a major label group.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
