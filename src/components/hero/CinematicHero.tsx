"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { HeroVideo } from "./HeroVideo";

const hero = siteConfig.hero;
/** Hold after the video ends before the pin releases, in timeline seconds. */
const HOLD = 1.6;

/**
 * Scroll-driven landing film.
 *
 * The page opens on the video with the navbar (chat is hidden). Scrolling
 * scrubs through the film from `video.startAt`; once playback reaches `hero.textAt` seconds the
 * headline, copy and CTAs are revealed and the navigation returns. After the
 * film ends the pin releases into the rest of the page.
 *
 * Timeline units are video seconds. Reduced motion gets the final frame with
 * the text, no pinning and no video.
 */
export function CinematicHero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const active = useRef(true);
  const [videoSrc, setVideoSrc] = useState<string | undefined>();

  // Choose the source after mount so phones never download the desktop cut,
  // and reduced-motion visitors download no video at all.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pick = () =>
      setVideoSrc(reduce.matches ? undefined : (wide.matches ? hero.video.src : hero.video.mobileSrc) || hero.video.src);
    pick();
    wide.addEventListener("change", pick);
    reduce.addEventListener("change", pick);
    return () => {
      wide.removeEventListener("change", pick);
      reduce.removeEventListener("change", pick);
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);
      const section = root.current!;

      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const isDesktop = Boolean(ctx.conditions?.desktop);
          // Timeline units are seconds of film after skipping `startAt`.
          const duration = hero.video.duration - hero.video.startAt;
          const textAt = hero.textAt - hero.video.startAt;
          const total = duration + HOLD;
          active.current = true;

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${window.innerHeight * (isDesktop ? hero.scrollLength.desktop : hero.scrollLength.mobile)}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onToggle: (self) => {
                active.current = self.isActive;
              },
              onUpdate: (self) => {
                const state = self.progress * total >= textAt ? "text" : "intro";
                if (section.dataset.heroState !== state) section.dataset.heroState = state;
              },
            },
          });

          // Video plays across the scroll, 1 timeline unit = 1 second of film.
          const proxy = { p: 0 };
          tl.to(proxy, { p: 1, duration, ease: "none", onUpdate: () => (progress.current = proxy.p) }, 0);

          // Opening text clears before the camera sequence gets busy.
          tl.to(q("[data-hero-opening]"), { autoAlpha: 0, y: -40, duration: 0.9, ease: "power2.in" }, 0.25);

          // Text reveal at `textAt` seconds.
          tl.fromTo(q("[data-hero-text]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, textAt)
            .fromTo(q("[data-hero-shade]"), { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, textAt)
            .fromTo(q("[data-hero-line]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, textAt)
            .fromTo(
              q("[data-hero-fade]"),
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
              textAt + 0.25,
            )
            .set({}, {}, total);

          document.fonts?.ready.then(() => ScrollTrigger.refresh());

          return () => {
            active.current = false;
            delete section.dataset.heroState;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      data-hero-state="intro"
      className="hero relative h-[100svh] min-h-[560px] overflow-hidden bg-black [--hero-bottom:clamp(2.5rem,7vh,5rem)]"
    >
      <noscript>
        <style>{`.hero-reveal{opacity:1!important;visibility:visible!important}body:has(.hero) :is(header,[data-chat]){opacity:1!important;visibility:visible!important;pointer-events:auto!important}`}</style>
      </noscript>

      {/* Film (motion) or final frame (reduced motion) */}
      <div className="absolute inset-0 motion-reduce:hidden">
        <HeroVideo
          src={videoSrc}
          poster={hero.video.poster}
          startAt={hero.video.startAt}
          progress={progress}
          active={active}
          label="The Purple Door showreel: cameras, interiors, products and the purple door"
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.video.endPoster}
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block max-md:object-[68%_50%]"
      />

      {/* Permanent black fade on the left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.85)_18%,rgba(0,0,0,0.45)_40%,transparent_62%)] max-md:bg-[linear-gradient(90deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.4)_60%,transparent_100%)]"
      />

      {/* Opening text over the first frames */}
      <div
        data-hero-opening
        className="container-x pointer-events-none absolute inset-0 flex flex-col justify-end pb-[var(--hero-bottom)] motion-reduce:hidden"
      >
        <div className="max-w-[min(26rem,27vw)] animate-[fadeUp_1.2s_var(--ease-out)_0.2s_both] max-md:max-w-sm">
          <p className="eyebrow mb-4">{hero.opening.eyebrow}</p>
          <p className="font-display text-[clamp(1.9rem,1.2rem+1.5vw,2.8rem)] leading-[1.02] tracking-[-0.025em]">
            {hero.opening.lines.map((line, i) => (
              <span key={i} className={cn("block", i === hero.opening.accentLine && "accent-italic")}>
                {line}
              </span>
            ))}
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-fg/75">{hero.opening.copy}</p>
          <p className="mt-6 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.25em] text-muted">
            <ArrowDown size={14} className="animate-bounce" aria-hidden />
            {hero.opening.hint}
          </p>
        </div>
      </div>

      {/* Legibility shade, revealed with the text */}
      <div
        data-hero-shade
        aria-hidden
        className="hero-reveal pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,8,0.85)_0%,rgba(5,4,8,0.55)_45%,transparent_75%)] max-md:bg-[linear-gradient(0deg,rgba(5,4,8,0.92)_0%,rgba(5,4,8,0.6)_55%,transparent_85%)]"
      />

      {/* Headline + CTAs */}
      <div
        data-hero-text
        className="hero-reveal container-x relative flex h-full flex-col justify-end pb-[var(--hero-bottom)] pt-[var(--nav-h)]"
      >
        <div className="max-w-[min(48rem,58%)] max-md:max-w-none">
          <p data-hero-fade className="eyebrow mb-6 max-md:mb-4">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.6rem,0.9rem+6.2vw,7.6rem)] leading-[0.92] tracking-[-0.035em] max-md:text-[clamp(2.5rem,11vw,3.6rem)]"
          >
            {hero.headlineLines.map((line, i) => (
              <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span data-hero-line className={cn("block", i === hero.accentLine && "accent-italic")}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p data-hero-fade className="lead mt-7 max-w-md text-fg/80 max-md:mt-4 max-md:text-[0.95rem]">
            {hero.copy}
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap gap-3 max-md:mt-6">
            <Link
              href={hero.primaryCta.href}
              className="btn btn-primary"
              onClick={() => track("project_cta_click", { location: "hero" })}
            >
              {hero.primaryCta.label} <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href={hero.secondaryCta.href} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
