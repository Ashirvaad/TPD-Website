import type { FaqCategory } from "@/types";

/**
 * FAQs. Answers marked `pending: true` describe the general approach but
 * should be replaced with the agency's confirmed policy before launch.
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        q: "What services do you offer?",
        a: "We offer digital marketing and social media management, interior photography and videography, commercial and product shoots, and brand films and creative campaigns.",
      },
      {
        q: "Do you work with small businesses?",
        a: "Yes. We work with growing businesses as well as established brands, and shape the scope of work around your goals and budget.",
      },
      {
        q: "Where are you based?",
        a: "Our studio is at Shop no. 160, V Mall, Thakur Complex, Kandivali East, Mumbai 400101. We're open Monday to Saturday, 10:00 am – 6:00 pm. See the Visit Us page for directions.",
      },
      {
        q: "Do you travel for shoots?",
        a: "We can plan shoots outside our base location. Travel and accommodation are quoted separately depending on the location and duration.",
        pending: true,
      },
    ],
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    items: [
      {
        q: "What is included in a social media package?",
        a: "Packages typically combine content strategy, a monthly content calendar, designed posts, reels, captions and hashtags, and reporting. See the Pricing page for package details.",
      },
      {
        q: "Do you run paid ads?",
        a: "Paid campaign management can be added to a package. Ad spend is paid directly to the platform and is separate from our fees.",
        pending: true,
      },
      {
        q: "Will I approve content before it is posted?",
        a: "Yes. Content is shared for approval before publishing according to an agreed review schedule.",
      },
    ],
  },
  {
    id: "interior-shoots",
    label: "Interior Shoots",
    items: [
      {
        q: "Do you shoot 1 BHK, 2 BHK and 3 BHK homes?",
        a: "Yes. We shoot homes of all sizes as well as commercial interiors, and plan the shoot around the space.",
      },
      {
        q: "How should I prepare the space?",
        a: "We share a preparation checklist before the shoot covering decluttering, lighting and styling so the space is camera-ready.",
      },
      {
        q: "Do you provide both photos and video?",
        a: "Yes. Interior shoots can include photography, walkthrough videos and vertical reels for social media.",
      },
    ],
  },
  {
    id: "commercial-shoots",
    label: "Commercial Shoots",
    items: [
      {
        q: "Do you provide product and commercial shoots?",
        a: "Yes. We shoot products in studio and on location, and produce commercial photography, promotional reels and brand films.",
      },
      {
        q: "Can you arrange models, props and locations?",
        a: "We can help coordinate talent, props and locations. These are quoted separately based on the brief.",
        pending: true,
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Payments",
    items: [
      {
        q: "How much does a project cost?",
        a: "Cost depends on the scope, deliverables and production requirements. Our Pricing page shows indicative packages, and we provide a detailed quote after understanding your brief.",
      },
      {
        q: "Can I get a custom plan?",
        a: "Yes. Tell us your goals and we will put together a package that fits your brand.",
      },
      {
        q: "What are your payment terms?",
        a: "Payment terms are confirmed in your quote. Please contact us for details.",
        pending: true,
      },
    ],
  },
  {
    id: "process",
    label: "Project Process",
    items: [
      {
        q: "How long does a project take?",
        a: "Timelines depend on the project. We agree a schedule for planning, production and delivery before work begins.",
        pending: true,
      },
      {
        q: "How many revisions are included?",
        a: "The number of revision rounds is set out in your quote.",
        pending: true,
      },
      {
        q: "How do I get started?",
        a: "Send us an enquiry through the contact form with a few details about your project. We'll get back to you to discuss next steps.",
      },
    ],
  },
];
