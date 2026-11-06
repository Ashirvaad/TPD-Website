"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/**
 * Single smooth-scroll instance for the whole app.
 *
 * Lenis drives the native scroll position (no transform hijacking), and is
 * advanced from GSAP's ticker so ScrollTrigger and Lenis update on the same
 * frame. Disabled when the user prefers reduced motion, and Lenis leaves
 * touch scrolling native by default.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -80 } });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      tick = null;
      setLenis(null);
    };

    const onChange = () => {
      if (mq.matches) stop();
      else start();
      ScrollTrigger.refresh();
    };

    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
