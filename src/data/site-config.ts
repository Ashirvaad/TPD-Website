/**
 * Central business configuration.
 *
 * IMPORTANT: Values marked `TODO` are placeholders. Anything left empty ("")
 * is hidden from the site automatically, so nothing unverified is published.
 */

export const siteConfig = {
  name: "The Purple Door Marketing",
  shortName: "The Purple Door",
  tagline: "Strategy meets storytelling.",
  description:
    "The Purple Door Marketing is a creative marketing and production studio for digital marketing, social media management, interior photography and videography, commercial and product shoots, and brand films.",

  /** Canonical URL. Set NEXT_PUBLIC_SITE_URL in the environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  hero: {
    eyebrow: "Creative marketing & production studio",
    headlineLines: ["Make Your Brand", "Impossible", "to Ignore."],
    /** Index of the headline line rendered in the accent italic. */
    accentLine: 1,
    copy: "From strategic digital marketing to cinematic interiors and commercial productions, we create visual experiences that move brands forward.",
    primaryCta: { label: "Start a Project", href: "/contact" },
    secondaryCta: { label: "Explore Our Work", href: "/work" },
    /** Shown over the first frames of the video; fades out as scrolling begins. */
    opening: {
      eyebrow: "The Purple Door Marketing · Mumbai",
      lines: ["Every great brand", "starts with an open door."],
      accentLine: 1,
      copy: "Strategy, content and production under one roof, for brands that want to be remembered.",
      hint: "Scroll to step inside",
    },
    /** Scroll distance of the pinned video, in viewport heights. */
    scrollLength: { desktop: 4.5, mobile: 3.5 },
    /** Seconds into the video at which the headline and CTAs appear. */
    /** Measured on the original video clock (so 9 = the 9 s mark), after skipping `video.startAt`. */
    textAt: 9,
    /**
     * Scroll-scrubbed landing film. Encode with dense keyframes and no audio so
     * seeking is smooth (see README → Hero film).
     */
    video: {
      src: "/videos/hero.mp4",
      /** Lighter cut for phones. */
      mobileSrc: "/videos/hero-mobile.mp4",
      /** First frame, shown while the video loads. */
      poster: "/images/hero-poster.jpg",
      /** Frame shown with the text when the visitor prefers reduced motion. */
      endPoster: "/images/hero-end.jpg",
      /** Used to lay out the scroll timeline; the real duration drives seeking. */
      duration: 11.54,
      /** Seconds skipped at the start of the video. */
      startAt: 1,
    },
  },

  contact: {
    /** TODO: confirm the public business email. */
    email: "",
    /** TODO: confirm the business phone, in display format. */
    phone: "",
    /** WhatsApp number, digits only with country code (used for wa.me links). */
    whatsapp: "919137699428",
    /** How the WhatsApp number is shown on the site. */
    whatsappDisplay: "+91 91376 99428",
    /** Contact-form enquiries open WhatsApp to this number, pre-filled. */
    enquiryWhatsapp: "919137699428",
    address: {
      line1: "Shop no. 160, V Mall, Kandivali",
      line2: "Thakur Complex",
      locality: "Kandivali East",
      city: "Mumbai",
      region: "Maharashtra",
      postalCode: "400101",
      country: "IN",
      landmark: "",
      /** Confirmed full address (enables the exact map and local business data). */
      verified: true,
    },
    hours: [{ days: "Monday to Saturday", time: "10:00 am – 6:00 pm" }] as { days: string; time: string }[],
    /** Used for the "Get directions" link. */
    mapQuery: "The Purple Door, V Mall, Thakur Complex, Kandivali East, Mumbai 400101",
    /** Google Maps "Share → Embed a map" URL for the studio pin. */
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.5917025536014!2d72.86511287623937!3d19.213027647654478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b797709a7f49%3A0xf996c57009f1800d!2sThe%20Purple%20Door!5e0!3m2!1sen!2sin!4v1793344266098!5m2!1sen!2sin",
  },

  social: [] as { label: string; href: string }[],

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],

  footerNav: [
    { label: "Gallery", href: "/gallery" },
    { label: "Visit Us", href: "/visit-us" },
  ],

  /** Show "placeholder" labels on generated artworks until real media is added. */
  showPlaceholderLabels: true,
};

export function formatAddress() {
  const a = siteConfig.contact.address;
  return [a.line1, a.line2, a.landmark, a.locality, a.city, [a.region, a.postalCode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
}

export function mapsEmbedUrl() {
  return (
    siteConfig.contact.mapEmbedSrc ||
    `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}&output=embed`
  );
}

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.contact.mapQuery)}`;
}
