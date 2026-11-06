import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ErrorScene } from "@/components/ui/ErrorScene";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <ErrorScene
      code="404"
      slate="Scene 404 · Take 2"
      lines={["This page is", "out of frame."]}
      copy="Even our best shots miss sometimes. The page you're looking for has moved, been renamed or never made the final cut, but there's plenty more worth seeing."
      image={{
        src: "/images/mascot/mascot-confused.webp",
        alt: "The Purple Door camera mascot looking puzzled, with question marks above its head",
        width: 1166,
        height: 1112,
        transparent: true,
      }}
    >
      <Link href="/" className="btn btn-primary">
        Back to home <ArrowRight size={16} aria-hidden />
      </Link>
      <Link href="/work" className="btn btn-ghost">
        Explore our work
      </Link>
      <Link href="/contact" className="btn btn-ghost">
        Start a project
      </Link>
    </ErrorScene>
  );
}
