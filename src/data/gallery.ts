import type { GalleryCategory, GalleryItem } from "@/types";

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bts", label: "Behind the Scenes" },
  { id: "interiors", label: "Interior Shoots" },
  { id: "commercial", label: "Commercial Shoots" },
];

/**
 * Gallery items. Add real media by setting `media.src` (and `media.poster`
 * for videos). Items without `src` render as labelled placeholders.
 */
export const galleryItems: GalleryItem[] = [
  { id: "g1", category: "bts", size: "tall", caption: "Lighting set-up before a product shoot", media: { type: "image", artwork: "bts", alt: "Studio lights set up on a dark set", tone: 0 } },
  { id: "g2", category: "interiors", size: "wide", caption: "Living room, evening light", projectSlug: "elcasa-design-studio", media: { type: "image", artwork: "interior", alt: "Living room at dusk", tone: 8 } },
  { id: "g3", category: "commercial", caption: "Product hero frame", projectSlug: "dsm-workwear", media: { type: "image", artwork: "product", alt: "Product under a spotlight", tone: 15 } },
  { id: "g4", category: "bts", caption: "Monitor check on set", media: { type: "video", artwork: "film", alt: "Camera monitor on set", tone: -15 } },
  { id: "g5", category: "interiors", size: "tall", caption: "Bedroom detail", projectSlug: "elcasa-design-studio", media: { type: "image", artwork: "interior-bedroom", alt: "Bedroom with soft lamp light", tone: 0 } },
  { id: "g6", category: "commercial", size: "wide", caption: "Bakery range, styled", projectSlug: "doughkiee-bakery", media: { type: "image", artwork: "food", alt: "Pastries arranged on a tray", tone: 0 } },
  { id: "g7", category: "bts", caption: "Crew blocking a scene", media: { type: "image", artwork: "bts", alt: "Crew silhouettes under studio lights", tone: 25 } },
  { id: "g8", category: "commercial", caption: "Campaign frame", projectSlug: "flow-united", media: { type: "image", artwork: "commercial", alt: "Dramatic commercial lighting", tone: -25 } },
  { id: "g9", category: "interiors", caption: "Dining space", media: { type: "image", artwork: "interior", alt: "Dining area with pendant lights", tone: -12 } },
  { id: "g10", category: "bts", size: "wide", caption: "The studio door", media: { type: "image", artwork: "door", alt: "A purple-lit doorway in a dark studio", tone: 0 } },
  { id: "g11", category: "commercial", size: "tall", caption: "Detail series", media: { type: "image", artwork: "product", alt: "Product detail on a plinth", tone: 40 } },
  { id: "g12", category: "interiors", caption: "Bedroom, morning", media: { type: "image", artwork: "interior-bedroom", alt: "Bedroom in morning light", tone: 20 } },
];
