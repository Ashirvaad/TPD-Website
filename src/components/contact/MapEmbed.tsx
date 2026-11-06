import { ArrowUpRight } from "lucide-react";
import { mapsDirectionsUrl, mapsEmbedUrl, siteConfig } from "@/data/site-config";

/** Lazy-loaded Google Maps embed (original colours, no API key) with a directions link. */
export function MapEmbed({ className = "aspect-[4/3]" }: { className?: string }) {
  return (
    <div>
      <div className={`relative overflow-hidden border border-line bg-surface ${className}`}>
        <iframe
          title="Map showing The Purple Door studio location"
          src={mapsEmbedUrl()}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {!siteConfig.contact.address.verified && (
          <p className="text-xs text-subtle">Map shows our area. The exact address is shared when we confirm your visit.</p>
        )}
        <a href={mapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          Get directions <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
    </div>
  );
}
