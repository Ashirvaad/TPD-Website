import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/animations/Reveal";
import { faqCategories } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about our services, process, timelines and pricing.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories
      .flatMap((c) => c.items)
      .filter((i) => !i.pending)
      .map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };

  return (
    <>
      <PageIntro
        eyebrow="FAQs"
        lines={["Frequently asked", "questions."]}
        accentLine={1}
        intro="Answers to common questions about our services, process and pricing."
      />

      <div className="container-x grid gap-16 pb-[var(--section)] lg:grid-cols-12">
        <nav aria-label="FAQ categories" className="lg:col-span-3">
          <ul className="flex flex-wrap gap-2 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:flex-col lg:items-start">
            {faqCategories.map((c) => (
              <li key={c.id}>
                <a href={`#faq-${c.id}`} className="chip lg:border-0 lg:px-0">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-20 lg:col-span-9">
          {faqCategories.map((c) => (
            <Reveal as="section" key={c.id}>
              <h2 id={`faq-${c.id}`} className="display-s mb-6 scroll-mt-28">
                {c.label}
              </h2>
              <FaqAccordion items={c.items} />
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBand
        eyebrow="Still have questions?"
        lines={["Can't find", "your answer?"]}
        copy="Ask us directly — we're happy to help."
        label="Contact us"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
