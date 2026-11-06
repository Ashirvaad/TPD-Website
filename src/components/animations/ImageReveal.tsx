"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Reveals media with a vertical clip-path wipe and a gentle scale settle. */
export function ImageReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "expo.out" });
      if (el.firstElementChild) tl.from(el.firstElementChild, { scale: 1.2, duration: 1.6, ease: "expo.out" }, 0);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
      {children}
    </div>
  );
}
