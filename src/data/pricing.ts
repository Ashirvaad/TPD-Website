import type { PricingCategory } from "@/types";

/**
 * Pricing.
 *
 * `pricingConfirmed` must be set to true only after the agency approves these
 * figures. While false, a visible "indicative" notice is shown on the page.
 * Set `price: null` to display "Quote on request".
 */
export const pricingConfirmed = false;

export const pricingNote =
  "Prices shown are indicative placeholders and will be confirmed by our team. Every project is scoped individually — get in touch for a tailored quote.";

export const pricingCategories: PricingCategory[] = [
  {
    id: "social-media",
    label: "Social Media Management",
    intro: "Monthly retainers for brands that want consistent, strategic content.",
    packages: [
      {
        id: "social-essential",
        name: "Essential",
        tagline: "For small businesses starting their social media journey.",
        price: 11999,
        billing: "/ month",
        taxNote: "+ GST",
        deliverables: ["Content strategy", "12 posts / month", "4 reels / month", "Captions & hashtags", "Basic reporting"],
        exclusions: ["Paid ad spend", "On-location shoots"],
        addOns: ["Additional reels", "Monthly shoot day"],
        enquiryService: "social-media",
      },
      {
        id: "social-growth",
        name: "Growth",
        tagline: "For growing brands that want consistent content.",
        price: 17999,
        billing: "/ month",
        taxNote: "+ GST",
        highlighted: true,
        deliverables: ["Content strategy", "18 posts / month", "8 reels / month", "Monthly shoot", "Advanced reporting"],
        exclusions: ["Paid ad spend"],
        addOns: ["Paid campaign management", "Additional shoot day"],
        enquiryService: "social-media",
      },
      {
        id: "social-premium",
        name: "Premium",
        tagline: "For brands that want end-to-end management.",
        price: 29999,
        billing: "/ month",
        taxNote: "+ GST",
        deliverables: [
          "Full content strategy",
          "30 posts / month",
          "12 reels / month",
          "Priority shoot support",
          "Dedicated account manager",
        ],
        exclusions: ["Paid ad spend"],
        addOns: ["Brand film", "Influencer coordination"],
        enquiryService: "social-media",
      },
    ],
  },
  {
    id: "interior-shoots",
    label: "Interior Shoots",
    intro: "Photography and film for homes, studios and commercial spaces.",
    packages: [
      {
        id: "interior-1bhk",
        name: "1 BHK",
        tagline: "Compact homes and single-room projects.",
        price: null,
        deliverables: ["Pre-shoot planning call", "Edited photographs", "Optional walkthrough video"],
        exclusions: ["Styling props", "Travel outside Mumbai"],
        addOns: ["Vertical reel", "Drone exteriors (where permitted)"],
        enquiryService: "interior-1bhk",
      },
      {
        id: "interior-2bhk",
        name: "2 BHK",
        tagline: "Most residential projects.",
        price: null,
        highlighted: true,
        deliverables: ["Pre-shoot planning call", "Edited photographs", "Walkthrough video"],
        exclusions: ["Styling props", "Travel outside Mumbai"],
        addOns: ["Vertical reels", "Twilight exteriors"],
        enquiryService: "interior-2bhk",
      },
      {
        id: "interior-3bhk",
        name: "3 BHK",
        tagline: "Larger homes and multi-space projects.",
        price: null,
        deliverables: ["Pre-shoot planning call", "Edited photographs", "Cinematic walkthrough film"],
        exclusions: ["Styling props", "Travel outside Mumbai"],
        addOns: ["Vertical reels", "Detail & material series"],
        enquiryService: "interior-3bhk",
      },
    ],
  },
  {
    id: "commercial-shoots",
    label: "Commercial Shoots",
    intro: "Product, brand and corporate productions scoped to your brief.",
    packages: [
      {
        id: "commercial-product",
        name: "Product Shoot",
        tagline: "Studio product photography for e-commerce and campaigns.",
        price: null,
        deliverables: ["Shot list & lighting plan", "Edited product images", "Web-ready exports"],
        exclusions: ["Models & props unless agreed"],
        addOns: ["Product reels", "Lifestyle set-ups"],
        enquiryService: "product-shoot",
      },
      {
        id: "commercial-brand",
        name: "Commercial Shoot",
        tagline: "On-location photography and film for businesses.",
        price: null,
        highlighted: true,
        deliverables: ["Creative direction", "Photography & video coverage", "Edited deliverables"],
        exclusions: ["Location fees", "Talent fees"],
        addOns: ["Social cutdowns", "Behind-the-scenes content"],
        enquiryService: "commercial-shoot",
      },
      {
        id: "commercial-film",
        name: "Brand Film",
        tagline: "Concept-to-delivery brand storytelling.",
        price: null,
        deliverables: ["Concept & script", "Production", "Edit, grade & sound"],
        exclusions: ["Licensed music unless agreed"],
        addOns: ["Multiple aspect-ratio cuts", "Subtitles"],
        enquiryService: "commercial-shoot",
      },
    ],
  },
];

export const allPackages = pricingCategories.flatMap((c) => c.packages.map((p) => ({ ...p, category: c.label })));

export function getPackage(id: string | undefined) {
  return id ? allPackages.find((p) => p.id === id) : undefined;
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}
