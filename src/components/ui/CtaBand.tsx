import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Visual } from "./Visual";

interface Props {
  eyebrow?: string;
  lines?: string[];
  copy?: string;
  href?: string;
  label?: string;
}

/** Closing conversion band used at the end of most pages. */
export function CtaBand({
  eyebrow = "Start a project",
  lines = ["Let's Make Something", "Worth Remembering."],
  copy = "Tell us what you're building. We'll come back with ideas, a plan and a clear quote.",
  href = "/contact",
  label = "Start a Project",
}: Props) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      {/* Door sits in the right half so it never sits behind the heading. */}
      <Visual
        media={{ type: "image", artwork: "door", alt: "" }}
        className="!absolute inset-y-0 right-0 w-full opacity-40 md:w-[55%] md:opacity-90"
        hideLabel
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20 md:via-bg/60 md:via-45% md:to-transparent" />
      <div className="container-x section-y relative">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <TextReveal as="h2" lines={lines} accentLine={1} className="display-l max-w-4xl" />
        <Reveal delay={0.2}>
          <p className="lead mt-6 max-w-xl">{copy}</p>
          <Link href={href} className="btn btn-primary mt-10">
            {label} <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
