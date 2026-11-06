import Image from "next/image";
import { clientLogos, showClientNames } from "@/data/testimonials";
import { projects } from "@/data/projects";

/**
 * Proven Partners. Shows approved logos from `clientLogos`; until those are
 * supplied it falls back to client names from the portfolio (typographic, no
 * fabricated logos). The marquee pauses on hover and is static for reduced motion.
 */
export function ClientLogos() {
  const names = projects.map((p) => p.client).filter((n): n is string => Boolean(n));
  if (clientLogos.length === 0 && (!showClientNames || names.length === 0)) return null;

  const items =
    clientLogos.length > 0
      ? clientLogos.map((logo) => (
          <Image
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        ))
      : names.map((name) => (
          <span key={name} className="font-display text-[clamp(1.8rem,3vw,2.8rem)] text-fg/70 transition-colors hover:text-fg">
            {name}
          </span>
        ));

  return (
    <section aria-labelledby="partners-title" className="border-y border-line py-14">
      <div className="container-x mb-10 flex items-center gap-4">
        <h2 id="partners-title" className="eyebrow">
          Proven partners
        </h2>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <div className="marquee relative overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-[clamp(3rem,6vw,6rem)] pr-[clamp(3rem,6vw,6rem)]">
          {items}
          <div aria-hidden className="contents">
            {items}
          </div>
        </div>
      </div>
      {/* Static grid for reduced motion */}
      <div className="container-x hidden flex-wrap gap-x-12 gap-y-6 motion-reduce:flex">{items}</div>
    </section>
  );
}
