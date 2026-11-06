import type { EnquiryServiceId, Service } from "@/types";

export const services: Service[] = [
  {
    id: "digital-marketing",
    index: "01",
    title: "Digital Marketing & Social Media",
    shortTitle: "Digital Marketing",
    description:
      "Strategy, content and community management that give your brand a consistent, recognisable voice across every feed.",
    points: [
      "Social media strategy",
      "Content planning",
      "Social media management",
      "Reels & short-form content",
      "Creative campaigns",
      "Brand communication",
    ],
    media: {
      type: "image",
      src: "/images/services/social-media.webp",
      width: 1672,
      height: 941,
      alt: "Phones showing interior and product posts, a reel and a reach dashboard, surrounded by social media app icons",
      artwork: "digital",
    },
    cta: { label: "Plan your social presence", href: "/contact?service=social-media&topic=Digital%20Marketing" },
  },
  {
    id: "interior-shoots",
    index: "02",
    title: "Interior Photography & Videography",
    shortTitle: "Interior Shoots",
    description:
      "Architectural photography and film that capture light, material and scale, so a space feels as good on screen as it does in person.",
    points: [
      "Residential interior photography",
      "Interior videography",
      "Architecture & spatial storytelling",
      "Commercial interiors",
      "Property-specific shoot planning",
    ],
    media: { type: "image", alt: "Warmly lit living room interior", artwork: "interior" },
    cta: { label: "Book an interior shoot", href: "/contact?topic=Interior%20Shoot" },
  },
  {
    id: "commercial-shoots",
    index: "03",
    title: "Commercial & Product Shoots",
    shortTitle: "Commercial Shoots",
    description:
      "Product photography, brand films and promotional content produced with the craft of a film set and the clarity of a campaign brief.",
    points: [
      "Product photography",
      "Brand films",
      "Promotional reels",
      "Advertising content",
      "Business & corporate shoots",
    ],
    media: {
      type: "image",
      src: "/images/services/commercial-product.webp",
      width: 1672,
      height: 941,
      alt: "A perfume bottle on a pedestal under a spotlight, with studio lights, a cinema camera on a dolly track and a monitor",
      artwork: "product",
    },
    cta: { label: "Plan a commercial shoot", href: "/contact?service=commercial-shoot&topic=Commercial%20Shoot" },
  },
];

export const enquiryServices: { id: EnquiryServiceId; label: string }[] = [
  { id: "interior-1bhk", label: "1 BHK Interior Shoot" },
  { id: "interior-2bhk", label: "2 BHK Interior Shoot" },
  { id: "interior-3bhk", label: "3 BHK Interior Shoot" },
  { id: "social-media", label: "Social Media Handling" },
  { id: "commercial-shoot", label: "Commercial Shoot" },
  { id: "product-shoot", label: "Product Shoot" },
  { id: "other", label: "Other" },
];

export const enquiryServiceIds = enquiryServices.map((s) => s.id) as [EnquiryServiceId, ...EnquiryServiceId[]];

export const processSteps = [
  { index: "01", title: "Discover", text: "We learn your business, audience and goals, and look closely at what's already working." },
  { index: "02", title: "Strategize", text: "We shape a clear creative direction, content plan and production approach." },
  { index: "03", title: "Create", text: "We shoot, design, edit and write, with attention to every frame and caption." },
  { index: "04", title: "Deliver", text: "You receive polished, platform-ready assets on an agreed schedule." },
  { index: "05", title: "Optimize", text: "We review what performs, refine the approach and keep improving." },
];
