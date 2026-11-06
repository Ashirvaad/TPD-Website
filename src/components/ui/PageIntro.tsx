import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";

interface Props {
  eyebrow: string;
  lines: string[];
  accentLine?: number;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}

/** Shared opening section for inner pages. */
export function PageIntro({ eyebrow, lines, accentLine, intro, children }: Props) {
  return (
    <section className="container-x pt-[calc(var(--nav-h)+clamp(3rem,8vw,7rem))] pb-[clamp(3rem,6vw,6rem)]">
      <Reveal>
        <p className="eyebrow mb-6">{eyebrow}</p>
      </Reveal>
      <TextReveal as="h1" lines={lines} accentLine={accentLine} className="display-l max-w-5xl" immediate />
      {intro && (
        <Reveal delay={0.3}>
          <p className="lead mt-8 max-w-[var(--prose-max)]">{intro}</p>
        </Reveal>
      )}
      {children}
    </section>
  );
}
