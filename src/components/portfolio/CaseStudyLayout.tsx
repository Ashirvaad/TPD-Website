import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { categoryLabel, getAdjacentProjects, getRelatedProjects } from "@/data/projects";
import { Visual } from "@/components/ui/Visual";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/animations/Reveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyTracker } from "./CaseStudyTracker";
import { cn } from "@/lib/utils";

export function CaseStudyLayout({ project }: { project: Project }) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const related = getRelatedProjects(project);

  const story = [
    { title: "The Challenge", text: project.challenge },
    { title: "Creative Direction", text: project.direction },
    { title: "Execution", text: project.execution },
  ];

  return (
    <article>
      <CaseStudyTracker slug={project.slug} />

      {/* Hero */}
      <header className="container-x pt-[calc(var(--nav-h)+clamp(2rem,6vw,5rem))]">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft size={14} aria-hidden /> Back to work
        </Link>
        <TextReveal as="h1" lines={[project.title]} className="display-xl mt-8" immediate />
        <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <span key={c} className="chip pointer-events-none">
              {categoryLabel(c)}
            </span>
          ))}
        </Reveal>
        {project.draft && process.env.NODE_ENV !== "production" && (
          <p className="mt-6 inline-block border border-dashed border-line px-4 py-2 text-xs text-muted">
            Draft copy — confirm project details and client approval before launch.
          </p>
        )}
      </header>

      <div className="container-x mt-12">
        <ImageReveal>
          <Visual media={project.cover} className="aspect-[16/10] w-full md:aspect-[21/9]" priority />
        </ImageReveal>
      </div>

      {/* Overview */}
      <section aria-label="Project overview" className="container-x section-y grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="eyebrow mb-5">Overview</p>
          <p className="display-s">{project.overview}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <dl className="divide-y divide-line border-y border-line text-sm">
            {project.client && (
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-muted">Client</dt>
                <dd>{project.client}</dd>
              </div>
            )}
            {project.year && (
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-muted">Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Services</dt>
              <dd className="text-right">{project.services.join(", ")}</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Story */}
      <section aria-label="Project story" className="container-x grid gap-14 md:grid-cols-3">
        {story.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} className="border-t border-line pt-6">
            <h2 className="display-s">{s.title}</h2>
            <p className="mt-4 text-muted">{s.text}</p>
          </Reveal>
        ))}
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section aria-label="Project gallery" className="container-x section-y grid gap-4 md:grid-cols-12">
          {project.gallery.map((m, i) => (
            <ImageReveal
              key={i}
              className={cn(
                i % 3 === 0 ? "md:col-span-12" : "md:col-span-6",
              )}
            >
              <Visual
                media={m}
                className={cn("w-full", i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/5]")}
                sizes={i % 3 === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                hideLabel={i > 0}
              />
            </ImageReveal>
          ))}
        </section>
      )}

      {/* Deliverables + results */}
      <section aria-label="Deliverables and results" className="container-x grid gap-14 pb-[var(--section)] md:grid-cols-2">
        <Reveal>
          <h2 className="eyebrow mb-6">Deliverables</h2>
          <ul className="divide-y divide-line border-y border-line">
            {project.deliverables.map((d) => (
              <li key={d} className="py-4">
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
        {project.results.length > 0 && (
          <Reveal delay={0.1}>
            <h2 className="eyebrow mb-6">Results</h2>
            <ul className="divide-y divide-line border-y border-line">
              {project.results.map((r) => (
                <li key={r} className="py-4">
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal delay={0.15} className={cn(project.results.length > 0 && "md:col-span-2")}>
          <div className="border border-line p-8">
            <p className="display-s">Want something similar?</p>
            <p className="mt-3 text-muted">Tell us about your project and we&apos;ll suggest an approach.</p>
            <TrackedLink
              href={`/contact?topic=${encodeURIComponent(`Similar to ${project.title}`)}`}
              event="project_cta_click"
              eventProps={{ location: "case_study", project: project.slug }}
              className="btn btn-primary mt-6"
            >
              Start a Project <ArrowRight size={16} aria-hidden />
            </TrackedLink>
          </div>
        </Reveal>
      </section>

      {/* Prev / next */}
      <nav aria-label="More projects" className="border-y border-line">
        <div className="container-x grid md:grid-cols-2">
          <Link href={`/work/${prev.slug}`} className="group py-10 md:border-r md:border-line md:pr-10">
            <span className="eyebrow inline-flex items-center gap-2">
              <ArrowLeft size={12} aria-hidden /> Previous
            </span>
            <span className="display-m mt-3 block transition-colors group-hover:text-accent">{prev.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group border-t border-line py-10 text-right md:border-t-0 md:pl-10">
            <span className="eyebrow inline-flex items-center gap-2">
              Next <ArrowRight size={12} aria-hidden />
            </span>
            <span className="display-m mt-3 block transition-colors group-hover:text-accent">{next.title}</span>
          </Link>
        </div>
      </nav>

      {/* Related */}
      <section aria-labelledby="related-title" className="container-x section-y">
        <h2 id="related-title" className="display-m mb-12">
          Related projects
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} aspect="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 100vw" />
          ))}
        </div>
      </section>

      <CtaBand />
    </article>
  );
}
