"use client";

import { useEffect, useRef } from "react";

interface HeroVideoProps {
  src?: string;
  poster?: string;
  /** Seconds skipped at the start; progress 0 maps here. */
  startAt?: number;
  /** 0–1 target position, written by the scroll timeline. */
  progress: React.RefObject<number>;
  /** Whether the hero is on screen; the seek loop idles otherwise. */
  active: React.RefObject<boolean>;
  label: string;
}

/**
 * Scroll-scrubbed video. Seeks are applied from a requestAnimationFrame loop,
 * only after metadata is loaded, never while a previous seek is in flight,
 * and only when the target differs by more than ~1 frame. The poster stays
 * visible until the first frame is available, and on error.
 */
export function HeroVideo({ src, poster, startAt = 0, progress, active, label }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;
    let raf = 0;
    let duration = 0;

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!active.current || !duration || video.seeking || video.readyState < 1) return;
      const p = Math.min(Math.max(progress.current ?? 0, 0), 1);
      const target = startAt + p * (duration - startAt - 0.05);
      if (Math.abs(video.currentTime - target) > 1 / 30) video.currentTime = target;
    };

    if (video.readyState >= 1) onMeta();
    video.addEventListener("loadedmetadata", onMeta);
    // iOS Safari only buffers frames after a play() call; muted inline play is allowed.
    video
      .play()
      .then(() => video.pause())
      .catch(() => {});
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [src, startAt, progress, active]);

  return (
    <div className="absolute inset-0 bg-black">
      {src ? (
        <video
          key={src}
          ref={ref}
          src={src}
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover max-md:object-[68%_50%]"
          muted
          playsInline
          preload="auto"
          aria-label={label}
          disablePictureInPicture
        />
      ) : (
        poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )
      )}
    </div>
  );
}
