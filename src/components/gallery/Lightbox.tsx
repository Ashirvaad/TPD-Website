"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types";
import { Artwork } from "@/components/ui/Artwork";
import { startScroll, stopScroll } from "@/lib/lenis";

interface Props {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}

/** Modal lightbox: Esc closes, ←/→ navigate, focus is trapped and restored. */
export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const item = items[index]!;
  const go = (d: number) => onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    stopScroll();
    closeBtn.current?.focus();
    return () => {
      startScroll();
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const els = Array.from(dialog.current?.querySelectorAll<HTMLElement>("button, a, video") ?? []);
        const first = els[0];
        const last = els[els.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const { media } = item;

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption} (${index + 1} of ${items.length})`}
      className="fixed inset-0 z-[var(--z-modal)] flex flex-col bg-black/95"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="text-sm text-muted" aria-live="polite">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-fg"
          aria-label="Close"
        >
          <X size={18} aria-hidden />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="relative aspect-[16/10] max-h-full w-full max-w-6xl overflow-hidden bg-surface">
          {media.src && media.type === "video" ? (
            <video src={media.src} poster={media.poster} controls playsInline className="absolute inset-0 h-full w-full object-contain" aria-label={media.alt} />
          ) : media.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={media.alt} className="absolute inset-0 h-full w-full object-contain" />
          ) : (
            <>
              <Artwork variant={media.artwork} tone={media.tone} />
              <span className="sr-only">{media.alt}</span>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-black/50 hover:border-fg sm:left-6"
        >
          <ChevronLeft size={20} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-black/50 hover:border-fg sm:right-6"
        >
          <ChevronRight size={20} aria-hidden />
        </button>
      </div>

      <div className="flex flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="display-s">{item.caption}</p>
        {item.projectSlug && (
          <Link href={`/work/${item.projectSlug}`} onClick={onClose} className="inline-flex items-center gap-2 text-sm text-accent">
            View the case study <ArrowRight size={14} aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
