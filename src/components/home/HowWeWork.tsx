"use client";

import { useRef } from "react";
import { processSteps } from "@/data/services";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Five-step process. Horizontal timeline with a scroll-linked progress line on
 * desktop; a vertical timeline on smaller screens.
 */
export function HowWeWork() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          "[data-progress-x]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        gsap.from("[data-step]", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1,
          scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true },
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          "[data-progress-y]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="process-title" className="section-y bg-bg-2">
      <div className="container-x">
        <SectionHeading
          eyebrow="How we work"
          title={
            <span id="process-title">
              From idea <span className="accent-italic">to impact.</span>
            </span>
          }
          intro="A clear, collaborative process — so you always know what's happening and what comes next."
        />

        <div data-steps className="relative mt-16 lg:mt-24">
          {/* Track + progress */}
          <div aria-hidden className="absolute left-0 right-0 top-[1.4rem] hidden h-px bg-line lg:block">
            <div data-progress-x className="h-full origin-left bg-accent" />
          </div>
          <div aria-hidden className="absolute bottom-0 left-[1.4rem] top-0 w-px bg-line lg:hidden">
            <div data-progress-y className="h-full w-full origin-top bg-accent" />
          </div>

          <ol className="grid gap-12 lg:grid-cols-5 lg:gap-8">
            {processSteps.map((step) => (
              <li key={step.index} data-step className="relative pl-16 lg:pl-0 lg:pt-16">
                <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-2 text-xs text-muted lg:top-0">
                  {step.index}
                </span>
                <h3 className="display-s">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
