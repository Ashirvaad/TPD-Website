import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

/** Asymmetric editorial layout; cycles if more projects are featured. */
const layout = [
  { span: "md:col-span-7", aspect: "aspect-[4/3]" },
  { span: "md:col-span-5 md:mt-32", aspect: "aspect-[4/5]" },
  { span: "md:col-span-5", aspect: "aspect-[4/5]" },
  { span: "md:col-span-6 md:col-start-7 md:mt-24", aspect: "aspect-[4/3]" },
  { span: "md:col-span-6", aspect: "aspect-[16/10]" },
  { span: "md:col-span-5 md:col-start-8 md:mt-20", aspect: "aspect-[4/5]" },
];

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section aria-labelledby="work-title" className="container-x section-y">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <span id="work-title">
              Stories we&apos;ve <span className="accent-italic">brought to life.</span>
            </span>
          }
        />
        <Reveal>
          <Link href="/work" className="btn btn-ghost">
            View all work <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-12 md:gap-y-24">
        {featured.map((project, i) => {
          const l = layout[i % layout.length]!;
          return (
            <Reveal key={project.slug} className={cn(l.span)}>
              <ProjectCard project={project} aspect={l.aspect} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
