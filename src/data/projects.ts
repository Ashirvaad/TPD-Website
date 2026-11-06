import type { Media, Project, ProjectCategory } from "@/types";

/**
 * Portfolio projects.
 *
 * Project names come from the supplied design reference. Before launch:
 *  - confirm each client has approved being shown,
 *  - replace placeholder artwork with real media (set `src` on each Media),
 *  - replace the draft copy below with confirmed project details,
 *  - add results ONLY when they are verified.
 */

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "interior-shoots", label: "Interior Shoots" },
  { id: "commercial-shoots", label: "Commercial Shoots" },
  { id: "product-photography", label: "Product Photography" },
  { id: "brand-films", label: "Brand Films" },
];

const gallery = (artwork: Media["artwork"], alt: string, tones: number[]): Media[] =>
  tones.map((tone, i) => ({ type: "image", artwork, tone, alt: `${alt} — frame ${i + 1}` }));

export const projects: Project[] = [
  {
    slug: "elcasa-design-studio",
    title: "Elcasa Design Studio",
    client: "Elcasa Design Studio",
    categories: ["interior-shoots", "digital-marketing"],
    label: "Interior Photography",
    summary: "Interior photography and film presenting finished residential spaces with warmth and clarity.",
    cover: { type: "image", artwork: "interior", alt: "Living room with warm ambient lighting", tone: 0 },
    services: ["Interior Photography", "Videography", "Social Media Content"],
    featured: true,
    overview:
      "An interior photography and videography project documenting completed residential spaces for use across the studio's portfolio and social channels.",
    challenge:
      "Showcase premium interiors with images that convey material quality, natural light and spatial flow, and create a consistent library of content for social media.",
    direction:
      "A calm, architectural visual language: balanced verticals, layered warm light and slow camera moves that let each room breathe.",
    execution:
      "Each space was planned room by room with a shot list, lit to balance daylight and practical lamps, and captured as both stills and short-form video.",
    deliverables: ["Edited interior photographs", "Walkthrough video", "Vertical reels for social media"],
    results: [],
    gallery: gallery("interior", "Elcasa Design Studio interior", [0, 12, -10, 20, 6, -18]),
    draft: true,
  },
  {
    slug: "doughkiee-bakery",
    title: "Doughkiee Bakery",
    client: "Doughkiee Bakery",
    categories: ["digital-marketing", "product-photography"],
    label: "Food & Beverage · Social Media",
    summary: "Appetising social content and product photography for an artisan bakery.",
    cover: { type: "image", artwork: "food", alt: "Freshly baked pastries on a tray", tone: 0 },
    services: ["Social Media Content", "Product Photography", "Reels"],
    featured: true,
    overview: "Social media content and food photography created to present the bakery's range online.",
    challenge: "Make a daily-changing menu look irresistible and recognisable in a crowded food feed.",
    direction: "Warm tones, close textures and a repeatable framing system so every post feels part of one brand.",
    execution: "Batch shoots planned around the bakery's schedule, producing stills and reels for a monthly content calendar.",
    deliverables: ["Product photographs", "Short-form reels", "Content calendar"],
    results: [],
    gallery: gallery("food", "Doughkiee Bakery product", [0, 10, -8, 18]),
    draft: true,
  },
  {
    slug: "dsm-workwear",
    title: "DSM Workwear",
    client: "DSM Workwear",
    categories: ["commercial-shoots", "product-photography"],
    label: "Commercial · Product Shoot",
    summary: "Studio product photography for a workwear range, built for catalogue and campaign use.",
    cover: { type: "image", artwork: "commercial", alt: "Garment presented under studio lighting", tone: 20 },
    services: ["Product Photography", "Commercial Shoot"],
    featured: true,
    overview: "A commercial product shoot presenting a workwear collection for catalogue and marketing use.",
    challenge: "Show durability, fit and detail clearly while keeping the imagery premium and consistent.",
    direction: "Controlled studio light against a deep backdrop, with detail frames for fabric and finish.",
    execution: "A structured shot list covering hero, detail and on-model frames, retouched to a consistent standard.",
    deliverables: ["Hero product images", "Detail shots", "Catalogue-ready exports"],
    results: [],
    gallery: gallery("commercial", "DSM Workwear product", [20, 30, 10, 40]),
    draft: true,
  },
  {
    slug: "bunny-kids-phonics",
    title: "Bunny Kids Phonics",
    client: "Bunny Kids Phonics",
    categories: ["digital-marketing"],
    label: "Education · Social Media Management",
    summary: "Ongoing social media management for an early-learning phonics programme.",
    cover: { type: "image", artwork: "digital", alt: "Social media posts arranged across phone screens", tone: 30 },
    services: ["Social Media Management", "Content Strategy", "Reels"],
    featured: true,
    overview: "Social media management and content creation for a children's phonics programme.",
    challenge: "Speak to parents with content that feels friendly, trustworthy and educational.",
    direction: "Bright, playful visuals balanced with clear, helpful messaging for parents.",
    execution: "A monthly content plan of posts and reels, produced and scheduled by our team.",
    deliverables: ["Monthly content calendar", "Posts & reels", "Captions & hashtags"],
    results: [],
    gallery: gallery("digital", "Bunny Kids Phonics content", [30, 50, 15, 40]),
    draft: true,
  },
  {
    slug: "flow-united",
    title: "Flow United",
    client: "Flow United",
    categories: ["brand-films", "digital-marketing"],
    label: "Fitness · Brand Content",
    summary: "High-energy brand content and short films for a fitness community.",
    cover: { type: "image", artwork: "film", alt: "Athlete silhouetted against dramatic light", tone: -20 },
    services: ["Brand Film", "Reels", "Social Media Content"],
    featured: true,
    overview: "Brand content capturing the energy and community of a fitness brand.",
    challenge: "Translate movement and intensity into content that stops the scroll.",
    direction: "Hard light, motion and rhythm-led edits that feel as energetic as a session.",
    execution: "A single shoot day producing a brand film and a set of social cutdowns.",
    deliverables: ["Brand film", "Social cutdowns", "Stills"],
    results: [],
    gallery: gallery("film", "Flow United frame", [-20, -5, -35, 10]),
    draft: true,
  },
  {
    slug: "rtc-logistics",
    title: "RTC Logistics",
    client: "RTC Logistics",
    categories: ["commercial-shoots", "brand-films"],
    label: "Logistics · Commercial Shoot",
    summary: "Commercial photography and film inside a working logistics operation.",
    cover: { type: "image", artwork: "bts", alt: "Industrial warehouse lit for a commercial shoot", tone: 10 },
    services: ["Commercial Shoot", "Corporate Film"],
    featured: true,
    overview: "A commercial shoot documenting the people and operations of a logistics business.",
    challenge: "Shoot in a live, working environment without disrupting operations.",
    direction: "Documentary-style coverage with cinematic framing that shows scale and teamwork.",
    execution: "A compact crew and pre-planned schedule to capture key areas safely and efficiently.",
    deliverables: ["Corporate photographs", "Company film", "Website imagery"],
    results: [],
    gallery: gallery("bts", "RTC Logistics frame", [10, 0, 25, -10]),
    draft: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    prev: projects[(i - 1 + n) % n]!,
    next: projects[(i + 1) % n]!,
  };
}

export function getRelatedProjects(project: Project, limit = 3) {
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: p.categories.filter((c) => project.categories.includes(c)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ p }) => p);
}

export function categoryLabel(id: ProjectCategory) {
  return projectCategories.find((c) => c.id === id)?.label ?? id;
}
