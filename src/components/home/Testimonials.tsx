import { verifiedTestimonials } from "@/data/testimonials";
import { Reveal } from "@/components/animations/Reveal";

/**
 * Only verified testimonials are shown. With none configured, the section is
 * hidden in production and shows a development notice locally.
 */
export function Testimonials() {
  if (verifiedTestimonials.length === 0) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <section className="container-x pb-16">
        <div className="rounded border border-dashed border-line p-8 text-sm text-muted">
          <strong className="text-fg">Testimonials (development notice):</strong> no verified testimonials are
          configured yet. Add approved client feedback in <code>src/data/testimonials.ts</code> with{" "}
          <code>verified: true</code>. This notice is hidden in production.
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="kind-words-title" className="container-x section-y">
      <h2 id="kind-words-title" className="eyebrow mb-12">
        Kind words
      </h2>
      <Reveal className="grid gap-12 md:grid-cols-2" stagger={0.12}>
        {verifiedTestimonials.map((t) => (
          <figure key={t.name + t.quote.slice(0, 12)} className="border-t border-line pt-8">
            <blockquote className="display-s">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              <span className="text-fg">{t.name}</span>
              {t.company && <>, {t.company}</>}
              {t.service && <span className="block text-subtle">{t.service}</span>}
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
