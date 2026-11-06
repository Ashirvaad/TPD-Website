"use client";

import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import type { GalleryCategory, GalleryItem } from "@/types";
import { galleryCategories } from "@/data/gallery";
import { Visual } from "@/components/ui/Visual";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

const sizeClass = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  regular: "",
} as const;

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(() => (filter === "all" ? items : items.filter((i) => i.category === filter)), [filter, items]);

  return (
    <>
      <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
        {galleryCategories.map((c) => (
          <button key={c.id} type="button" className="chip" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} items shown
      </p>

      {visible.length === 0 ? (
        <p className="mt-12 border border-dashed border-line p-10 text-center text-muted">Nothing here yet — check back soon.</p>
      ) : (
        <ul className="mt-12 grid auto-rows-[clamp(14rem,24vw,20rem)] grid-flow-dense grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item, i) => (
            <li
              key={item.id}
              className={cn(sizeClass[item.size ?? "regular"], "animate-[fadeUp_.6s_var(--ease-out)_both]")}
              style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block h-full w-full text-left"
                aria-label={`Open: ${item.caption}`}
              >
                <Visual media={item.media} className="h-full w-full" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" hideLabel={i > 0} />
                {item.media.type === "video" && (
                  <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60">
                    <Play size={14} aria-hidden />
                  </span>
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-sm opacity-100 transition-opacity duration-500 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100">
                  {item.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open !== null && visible[open] && (
        <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
