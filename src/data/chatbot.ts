import type { ChatbotEntry } from "@/types";
import { formatAddress, siteConfig } from "./site-config";

const c = siteConfig.contact;

const contactLine = [
  c.whatsapp && `message us on WhatsApp at ${c.whatsappDisplay}`,
  c.email && `email ${c.email}`,
  c.phone && `call ${c.phone}`,
]
  .filter(Boolean)
  .join(" or ");

export const chatbotWelcome = "Hi! Welcome to The Purple Door Marketing. What would you like to create with us?";

export const chatbotFallback =
  "I don't have a confirmed answer for that yet. Our team will be happy to help — send us a message and we'll get back to you.";

/**
 * Rule-based chatbot answers. Matching is by keyword; the entry with the most
 * keyword hits wins. Keep answers factual — never promise prices, availability
 * or bookings here.
 */
export const chatbotEntries: ChatbotEntry[] = [
  {
    id: "services",
    question: "What services do you offer?",
    keywords: ["service", "services", "offer", "do you do", "what do you", "provide"],
    answer:
      "We offer Digital Marketing & Social Media Management, Interior Photography & Videography, Commercial & Product Shoots, and Brand Films & Creative Campaigns.",
    cta: { label: "See our work", href: "/work" },
  },
  {
    id: "social-packages",
    question: "What are your social media packages?",
    keywords: ["social", "package", "packages", "instagram", "reels", "posts", "management", "handling"],
    answer:
      "We have monthly social media packages covering strategy, posts, reels, captions and reporting. You can compare them on our Pricing page — final pricing is confirmed in a quote.",
    cta: { label: "View pricing", href: "/pricing" },
  },
  {
    id: "bhk",
    question: "Do you provide 1 BHK, 2 BHK and 3 BHK interior shoots?",
    keywords: ["bhk", "1bhk", "2bhk", "3bhk", "apartment", "flat", "home", "house", "residential"],
    answer: "Yes — we shoot 1 BHK, 2 BHK and 3 BHK homes, as well as commercial interiors, with photography and video options.",
    cta: { label: "Enquire about an interior shoot", href: "/contact?topic=Interior%20Shoot" },
  },
  {
    id: "book-interior",
    question: "How can I book an interior shoot?",
    keywords: ["book", "booking", "schedule", "interior shoot", "reserve", "date"],
    answer:
      "Send us an enquiry with your property size, location and preferred dates. Our team will confirm availability and next steps — a shoot is only booked once we confirm it with you.",
    cta: { label: "Start an enquiry", href: "/contact?topic=Interior%20Shoot" },
  },
  {
    id: "commercial",
    question: "Do you provide commercial and product shoots?",
    keywords: ["commercial", "product", "brand film", "advert", "ad shoot", "corporate", "catalogue", "ecommerce"],
    answer: "Yes. We produce product photography, commercial shoots, promotional reels, advertising content and brand films.",
    cta: { label: "Plan a commercial shoot", href: "/contact?service=commercial-shoot" },
  },
  {
    id: "cost",
    question: "How much does a project cost?",
    keywords: ["cost", "price", "pricing", "how much", "rate", "rates", "budget", "charges", "fee"],
    answer:
      "Cost depends on scope and deliverables. Our Pricing page shows indicative packages, and we'll send an exact quote once we understand your project.",
    cta: { label: "View pricing", href: "/pricing" },
  },
  {
    id: "timeline",
    question: "What is the project timeline?",
    keywords: ["timeline", "how long", "turnaround", "delivery", "time", "days", "weeks"],
    answer: "Timelines depend on the project. We agree a clear schedule for planning, production and delivery before we start.",
    cta: { label: "Ask about your timeline", href: "/contact" },
  },
  {
    id: "location",
    question: "Where is your office located?",
    keywords: ["where", "office", "location", "address", "located", "studio", "visit", "directions"],
    answer: c.address.verified
      ? `Our studio is at ${formatAddress()}.${c.hours.length ? ` We're open ${c.hours.map((h) => `${h.days}, ${h.time}`).join("; ")}.` : ""}`
      : `Our studio is in ${c.address.locality}, ${c.address.city}. Please contact us to arrange a visit.`,
    cta: { label: "Visit us", href: "/visit-us" },
  },
  {
    id: "contact",
    question: "How can I contact your team?",
    keywords: ["contact", "reach", "email", "phone", "call", "whatsapp", "talk", "team"],
    answer: contactLine
      ? `You can ${contactLine}, or send a message through our contact form.`
      : "The quickest way is our contact form — we'll get back to you soon.",
    cta: { label: "Contact us", href: "/contact" },
  },
  {
    id: "quote",
    question: "How can I get a custom quote?",
    keywords: ["quote", "custom", "estimate", "proposal", "tailored"],
    answer: "Tell us about your project through the contact form — what you need, when, and where — and we'll prepare a custom quote.",
    cta: { label: "Request a quote", href: "/contact?topic=Custom%20Quote" },
  },
];
