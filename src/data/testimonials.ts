import type { ClientLogo, Testimonial } from "@/types";

/**
 * Testimonials. Only entries with `verified: true` are shown publicly.
 * Add real, approved client feedback here.
 */
export const testimonials: Testimonial[] = [
  // Example shape — replace with genuine, approved feedback and set verified: true.
  // { quote: "…", name: "Client Name", company: "Company", service: "Interior Shoot", verified: true },
];

export const verifiedTestimonials = testimonials.filter((t) => t.verified);

/**
 * Client logos. Add ONLY logos the client has approved, as files in /public/logos.
 * When this list is empty, the Proven Partners section shows client names
 * from the portfolio instead (set `showClientNames` to false to hide them).
 */
export const clientLogos: ClientLogo[] = [];

export const showClientNames = true;
