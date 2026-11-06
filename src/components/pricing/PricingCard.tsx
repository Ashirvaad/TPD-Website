import { Check, Minus, Plus } from "lucide-react";
import type { PricingPackage } from "@/types";
import { formatPrice } from "@/data/pricing";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { cn } from "@/lib/utils";

export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  const href = `/contact?service=${pkg.enquiryService}&package=${pkg.id}`;

  return (
    <article
      className={cn(
        "relative flex flex-col border p-8 transition-colors duration-500",
        pkg.highlighted ? "border-accent/60 bg-surface" : "border-line hover:border-white/30",
      )}
      aria-labelledby={`pkg-${pkg.id}`}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent-ink">
          Popular
        </span>
      )}
      <h3 id={`pkg-${pkg.id}`} className="display-s">
        {pkg.name}
      </h3>
      <p className="mt-2 min-h-[3em] text-sm text-muted">{pkg.tagline}</p>

      <div className="mt-6 border-t border-line pt-6">
        {pkg.price !== null ? (
          <p>
            {pkg.pricePrefix && <span className="block text-xs text-muted">{pkg.pricePrefix}</span>}
            <span className="font-display text-5xl">{formatPrice(pkg.price)}</span>
            {pkg.billing && <span className="ml-1 text-sm text-muted">{pkg.billing}</span>}
            {pkg.taxNote && <span className="block text-xs text-subtle">{pkg.taxNote}</span>}
          </p>
        ) : (
          <p>
            <span className="font-display text-4xl">Quote on request</span>
            <span className="block text-xs text-subtle">Scoped to your space and brief</span>
          </p>
        )}
      </div>

      <ul className="mt-8 space-y-3 text-sm" aria-label="Includes">
        {pkg.deliverables.map((d) => (
          <li key={d} className="flex gap-3">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            {d}
          </li>
        ))}
      </ul>

      {pkg.exclusions.length > 0 && (
        <ul className="mt-5 space-y-2 text-xs text-muted" aria-label="Not included">
          {pkg.exclusions.map((d) => (
            <li key={d} className="flex gap-3">
              <Minus size={14} className="mt-0.5 shrink-0 text-subtle" aria-hidden />
              <span>
                <span className="sr-only">Not included: </span>
                {d}
              </span>
            </li>
          ))}
        </ul>
      )}

      {pkg.revisions && <p className="mt-5 text-xs text-muted">Revisions: {pkg.revisions}</p>}

      {pkg.addOns.length > 0 && (
        <div className="mt-6 border-t border-line-soft pt-5">
          <p className="eyebrow mb-3">Optional add-ons</p>
          <ul className="space-y-1.5 text-xs text-muted">
            {pkg.addOns.map((a) => (
              <li key={a} className="flex gap-2">
                <Plus size={12} className="mt-0.5 shrink-0" aria-hidden /> {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      <TrackedLink
        href={href}
        event="pricing_enquiry_click"
        eventProps={{ package: pkg.id }}
        className={cn("btn mt-8 w-full", pkg.highlighted ? "btn-primary" : "btn-ghost")}
        aria-label={`Enquire about ${pkg.name}`}
      >
        Enquire about this package
      </TrackedLink>
    </article>
  );
}
