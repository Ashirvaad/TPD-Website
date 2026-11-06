/**
 * Shared content types. All editable site content lives in `src/data/*`
 * and is typed against these interfaces.
 */

/** Built-in art-directed placeholder scenes, used until real media is supplied. */
export type ArtworkVariant =
  | "door"
  | "interior"
  | "interior-bedroom"
  | "commercial"
  | "product"
  | "digital"
  | "bts"
  | "film"
  | "food";

/**
 * A piece of media. When `src` is omitted, a clearly labelled placeholder
 * artwork is rendered instead so no stock/fake imagery is ever shown.
 */
export interface Media {
  type: "image" | "video";
  /** Path under /public, e.g. "/images/projects/elcasa-design-studio/cover.jpg". */
  src?: string;
  /** Poster image for videos. */
  poster?: string;
  alt: string;
  width?: number;
  height?: number;
  /** Placeholder scene used while `src` is missing. */
  artwork: ArtworkVariant;
  /** Hue shift (deg) to vary placeholder artworks. */
  tone?: number;
}

export type ProjectCategory =
  | "digital-marketing"
  | "interior-shoots"
  | "commercial-shoots"
  | "product-photography"
  | "brand-films";

export interface Project {
  slug: string;
  title: string;
  /** Show the client's name only when they have authorised it. */
  client?: string;
  categories: ProjectCategory[];
  /** Short label shown on cards, e.g. "Interior Photography". */
  label: string;
  summary: string;
  cover: Media;
  services: string[];
  featured: boolean;
  year?: string;
  overview: string;
  challenge: string;
  direction: string;
  execution: string;
  deliverables: string[];
  /** Verified outcomes only. Leave empty if none are confirmed. */
  results: string[];
  gallery: Media[];
  /** Marks copy that still needs confirmation from the agency. */
  draft?: boolean;
}

export type ServiceId = "digital-marketing" | "interior-shoots" | "commercial-shoots";

export interface Service {
  id: ServiceId;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  points: string[];
  media: Media;
  cta: { label: string; href: string };
}

/** Values accepted by the contact form "Services interested in" field. */
export type EnquiryServiceId =
  | "interior-1bhk"
  | "interior-2bhk"
  | "interior-3bhk"
  | "social-media"
  | "commercial-shoot"
  | "product-shoot"
  | "other";

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  /** Amount in INR. `null` renders "Quote on request". */
  price: number | null;
  /** Prefix such as "Starting at". */
  pricePrefix?: string;
  billing?: string;
  taxNote?: string;
  highlighted?: boolean;
  deliverables: string[];
  exclusions: string[];
  revisions?: string;
  addOns: string[];
  /** Pre-selected service on the contact form. */
  enquiryService: EnquiryServiceId;
}

export interface PricingCategory {
  id: string;
  label: string;
  intro: string;
  packages: PricingPackage[];
}

export interface FaqItem {
  q: string;
  a: string;
  /** True when the answer is a placeholder awaiting confirmation. */
  pending?: boolean;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FaqItem[];
}

export type GalleryCategory = "bts" | "interiors" | "commercial";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  media: Media;
  caption: string;
  projectSlug?: string;
  /** Grid sizing hint. */
  size?: "tall" | "wide" | "regular";
}

export interface Testimonial {
  quote: string;
  name: string;
  company?: string;
  service?: string;
  /** Only verified testimonials are rendered publicly. */
  verified: boolean;
}

export interface ClientLogo {
  name: string;
  /** Path under /public/logos. Only add logos with the client's approval. */
  src: string;
  width: number;
  height: number;
}

export interface ChatbotEntry {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  cta?: { label: string; href: string };
}
