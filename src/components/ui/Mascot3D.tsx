"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Mascot3DProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  code: string;
  /** True for a cut-out image with a transparent background (no edge fade needed). */
  transparent?: boolean;
  className?: string;
}

/**
 * The camera mascot on a lit "stage": it floats, tilts toward the pointer in
 * 3D and casts a floor shadow. Viewfinder marks sit on a nearer plane for
 * depth. Motion is skipped for reduced-motion visitors and touch devices.
 */
export function Mascot3D({ src, alt, width, height, code, transparent, className }: Mascot3DProps) {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    const card = tilt.current;
    if (!el || !card) return;
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // -1..1 relative to the stage centre, clamped for pointers far away.
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const loop = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      card.style.setProperty("--ry", `${current.x * 16}deg`);
      card.style.setProperty("--rx", `${-current.y * 12}deg`);
      card.style.setProperty("--gx", `${50 + current.x * 25}%`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={stage} className={cn("relative mx-auto w-full [perspective:1100px]", className)}>
      {/* Purple stage light */}
      <div
        aria-hidden
        className="absolute -inset-16 bg-[radial-gradient(closest-side,rgba(101,68,155,0.6),rgba(101,68,155,0.15)_60%,transparent)]"
      />

      <div className="motion-safe:animate-[mascotFloat_5s_ease-in-out_infinite]">
        <div
          ref={tilt}
          className="relative [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] will-change-transform"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority
            sizes="(min-width: 1024px) 30rem, 90vw"
            className={cn(
              "relative h-auto w-full",
              transparent
                ? "drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
                : "[mask-image:radial-gradient(ellipse_62%_58%_at_50%_48%,#000_62%,transparent_100%)]",
            )}
          />
          {/* Moving highlight for a glossy, lit feel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:radial-gradient(circle_at_var(--gx,50%)_30%,rgba(255,255,255,0.35),transparent_45%)]"
            // A cut-out mascot clips the shine to its own silhouette.
            style={
              transparent
                ? { maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }
                : undefined
            }
          />
          {/* Viewfinder marks on a nearer plane */}
          <div aria-hidden className="pointer-events-none absolute inset-[6%] [transform:translateZ(60px)]">
            {[
              "left-0 top-0 border-l-2 border-t-2",
              "right-0 top-0 border-r-2 border-t-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((c) => (
              <span key={c} className={cn("absolute h-8 w-8 border-white/80", c)} />
            ))}
            <span className="absolute left-3 top-2.5 flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest text-white/90">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> REC
            </span>
            <span className="absolute bottom-2.5 right-3 font-mono text-[0.65rem] tracking-widest text-white/90">
              ERR {code}
            </span>
          </div>
        </div>
      </div>

      {/* Floor shadow that breathes with the float */}
      <div
        aria-hidden
        className="mx-auto -mt-4 h-6 w-2/3 rounded-[50%] bg-black/70 blur-md motion-safe:animate-[mascotShadow_5s_ease-in-out_infinite]"
      />
    </div>
  );
}
