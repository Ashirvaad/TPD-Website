"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types";
import { projectCategories } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

/** Category filters + results grid. Filtering is client-side, no reload. */
export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.categories.includes(active))),
    [active, projects],
  );

  return (
    <>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {projectCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            className="chip"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      {visible.length > 0 ? (
        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <div key={p.slug} className="animate-[fadeUp_.7s_var(--ease-out)_both]" style={{ animationDelay: `${i * 60}ms` }}>
              <ProjectCard project={p} aspect={i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/4.4]"} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-14 border border-dashed border-line p-10 text-center text-muted">
          No projects in this category yet — check back soon.
        </p>
      )}
    </>
  );
}
