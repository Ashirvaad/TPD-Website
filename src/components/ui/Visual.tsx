import Image from "next/image";
import type { Media } from "@/types";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { Artwork } from "./Artwork";

interface VisualProps {
  media: Media;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide the "placeholder" tag, e.g. for tiny thumbnails. */
  hideLabel?: boolean;
  /** Videos render muted, looping and only play when `autoPlay` is true. */
  autoPlay?: boolean;
}

/**
 * Renders real media when `media.src` is set, otherwise a labelled
 * placeholder artwork. Always fills its (positioned) parent.
 */
export function Visual({ media, className, sizes = "100vw", priority, hideLabel, autoPlay }: VisualProps) {
  const fill = "absolute inset-0 h-full w-full object-cover";

  let content: React.ReactNode;
  if (media.src && media.type === "video") {
    content = (
      <video
        className={fill}
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        autoPlay={autoPlay}
        preload={autoPlay ? "metadata" : "none"}
        aria-label={media.alt}
      />
    );
  } else if (media.src) {
    content = <Image src={media.src} alt={media.alt} fill sizes={sizes} priority={priority} className="object-cover" />;
  } else {
    content = (
      <>
        <Artwork variant={media.artwork} tone={media.tone} />
        <span className="sr-only">{media.alt}</span>
      </>
    );
  }

  return (
    <div className={cn("media-frame", className)}>
      {content}
      {!media.src && siteConfig.showPlaceholderLabels && !hideLabel && (
        <span className="pointer-events-none absolute right-3 top-3 z-[1] rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-white/60 backdrop-blur">
          Placeholder
        </span>
      )}
    </div>
  );
}
