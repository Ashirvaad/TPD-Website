import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Visual } from "@/components/ui/Visual";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { cn } from "@/lib/utils";

export function WhatWeDo() {
  return (
    <section id="what-we-do" aria-labelledby="what-we-do-title" className="container-x section-y">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="What we do"
          title={
            <span id="what-we-do-title">
              Three disciplines. <span className="accent-italic">One</span> creative partner.
            </span>
          }
        />
        <Reveal className="max-w-sm">
          <p className="text-muted">
            Strategy, production and distribution under one roof — so your brand looks and sounds the same everywhere
            it shows up.
          </p>
        </Reveal>
      </div>

      <div className="mt-[clamp(3rem,7vw,7rem)] space-y-[clamp(4rem,9vw,9rem)]">
        {services.map((service, i) => (
          <article
            key={service.id}
            className="grid items-center gap-8 md:grid-cols-12 md:gap-12"
            aria-labelledby={`service-${service.id}`}
          >
            <ImageReveal className={cn("md:col-span-7", i % 2 === 1 && "md:order-2")}>
              <Visual
                media={service.media}
                className="aspect-video w-full"
                sizes="(min-width: 768px) 58vw, 100vw"
              />
            </ImageReveal>
            <Reveal className={cn("md:col-span-5", i % 2 === 1 && "md:order-1")}>
              <p className="font-display text-6xl text-subtle">{service.index}</p>
              <h3 id={`service-${service.id}`} className="display-m mt-4">
                {service.title}
              </h3>
              <p className="lead mt-5">{service.description}</p>
              <ul className="mt-7 grid grid-cols-1 gap-x-6 border-t border-line pt-6 text-sm text-muted sm:grid-cols-2">
                {service.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 py-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <TrackedLink
                href={service.cta.href}
                event="service_cta_click"
                eventProps={{ service: service.id }}
                className="btn btn-ghost mt-8"
              >
                {service.cta.label} <ArrowRight size={16} aria-hidden />
              </TrackedLink>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
