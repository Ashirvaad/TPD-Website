import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CtaBand } from "@/components/ui/CtaBand";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Behind the scenes, interior shoots and commercial productions from The Purple Door Marketing.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Gallery"
        lines={["Behind the scenes", "and more."]}
        accentLine={1}
        intro="A glimpse into our shoots, studio, team and creative process."
      />
      <section className="container-x pb-[var(--section)]">
        <GalleryGrid items={galleryItems} />
      </section>
      <CtaBand />
    </>
  );
}
