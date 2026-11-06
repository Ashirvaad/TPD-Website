import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { Visual } from "@/components/ui/Visual";
import { Reveal } from "@/components/animations/Reveal";
import { ImageReveal } from "@/components/animations/ImageReveal";

export const metadata: Metadata = {
  title: "Visit Us",
  description: "Visit The Purple Door Marketing studio in Kandivali East, Mumbai. Get directions and arrange a meeting.",
  alternates: { canonical: "/visit-us" },
};

export default function VisitUsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Visit us"
        lines={["Come through", "the purple door."]}
        accentLine={1}
        intro="We'd love to welcome you to our studio. Come by for a coffee and let's talk about your ideas."
      >
        <Reveal delay={0.4}>
          <Link href="/contact?topic=Studio%20Visit" className="btn btn-primary mt-10">
            Request a meeting <ArrowRight size={16} aria-hidden />
          </Link>
          <p className="mt-3 text-xs text-subtle">
            Send a request and our team will confirm a time with you — meetings are confirmed only once we reply.
          </p>
        </Reveal>
      </PageIntro>

      <section className="container-x grid gap-16 pb-[var(--section)] lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <MapEmbed className="aspect-[4/3] lg:aspect-[16/11]" />
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <ContactDetails />
        </Reveal>
      </section>

      <section aria-label="Studio photographs" className="container-x grid gap-4 pb-[var(--section)] sm:grid-cols-3">
        {(["door", "bts", "interior"] as const).map((art, i) => (
          <ImageReveal key={art}>
            <Visual
              media={{ type: "image", artwork: art, alt: "The studio", tone: i * 10 }}
              className="aspect-[4/5] w-full"
              sizes="(min-width: 640px) 33vw, 100vw"
              hideLabel={i > 0}
            />
          </ImageReveal>
        ))}
      </section>
    </>
  );
}
