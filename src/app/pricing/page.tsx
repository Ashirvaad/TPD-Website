import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { PricingTabs } from "@/components/pricing/PricingTabs";
import { Visual } from "@/components/ui/Visual";
import { Reveal } from "@/components/animations/Reveal";
import { pricingCategories, pricingConfirmed, pricingNote } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Packages for social media management, interior shoots and commercial shoots. Custom plans available.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing"
        lines={["Simple,", "transparent pricing."]}
        accentLine={1}
        intro="Packages designed around the needs of different businesses. Custom plans are always available."
      />

      <section className="container-x pb-[var(--section)]">
        {!pricingConfirmed && (
          <p className="mb-10 flex max-w-3xl gap-3 border border-dashed border-line p-4 text-sm text-muted">
            <Info size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            {pricingNote}
          </p>
        )}
        <PricingTabs categories={pricingCategories} />
      </section>

      <section className="container-x pb-[var(--section)]">
        <Reveal className="relative overflow-hidden border border-line">
          <Visual
            media={{ type: "image", artwork: "bts", alt: "", tone: 15 }}
            className="!absolute inset-0 opacity-40"
            hideLabel
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent" />
          <div className="relative max-w-xl p-8 md:p-14">
            <h2 className="display-m">Need a custom plan?</h2>
            <p className="lead mt-4">
              Tell us your requirements and we&apos;ll create a package that works for your brand.
            </p>
            <Link href="/contact?topic=Custom%20Plan" className="btn btn-primary mt-8">
              Contact us <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
