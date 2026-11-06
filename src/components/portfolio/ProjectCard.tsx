import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Visual } from "@/components/ui/Visual";
import { cn } from "@/lib/utils";

interface Props {
  project: Project;
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProjectCard({ project, aspect = "aspect-[4/3]", className, sizes, priority }: Props) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/work/${project.slug}`} className="block" aria-label={`${project.title} — view case study`}>
        <Visual
          media={project.cover}
          className={cn(aspect, "w-full")}
          sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
          priority={priority}
        />
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow mb-2">{project.label}</p>
            <h3 className="display-s">{project.title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted">{project.summary}</p>
          </div>
          <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
            <ArrowUpRight size={18} aria-hidden />
          </span>
        </div>
        <span className="mt-3 inline-block text-sm text-fg link-underline">View Case Study</span>
      </Link>
    </article>
  );
}
