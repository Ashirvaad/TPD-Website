import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { CtaBand } from "@/components/ui/CtaBand";
import { ProjectFilters } from "@/components/portfolio/ProjectFilters";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Selected projects across digital marketing, interior photography, commercial shoots, product photography and brand films.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our work"
        lines={["A collection of", "stories told well."]}
        accentLine={1}
        intro="Projects that show our creative approach, production quality and strategic thinking."
      />
      <section className="container-x pb-[var(--section)]">
        <ProjectFilters projects={projects} />
      </section>
      <CtaBand lines={["Have a project", "in mind?"]} />
    </>
  );
}
