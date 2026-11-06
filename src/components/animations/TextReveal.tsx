"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  accentLine?: number;
  /** Play on mount rather than on scroll. */
  immediate?: boolean;
  delay?: number;
}

/**
 * Line-by-line masked text reveal with controlled line breaks.
 * The full text is always in the DOM for screen readers and SEO.
 */
export function TextReveal({ lines, as: Tag = "h2", className, accentLine, immediate, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.from(el.querySelectorAll("[data-line]"), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.09,
        delay: immediate ? 0.15 + delay : delay,
        ease: "expo.out",
        scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <span data-line className={cn("block will-change-transform", i === accentLine && "accent-italic")}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
