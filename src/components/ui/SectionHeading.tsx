import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  size?: "l" | "m";
}

export function SectionHeading({ eyebrow, title, intro, align = "left", as: Tag = "h2", className, size = "m" }: Props) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-4xl", className)}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Tag className={size === "l" ? "display-l" : "display-m"}>{title}</Tag>
      {intro && <p className={cn("lead mt-6 max-w-[var(--prose-max)]", align === "center" && "mx-auto")}>{intro}</p>}
    </Reveal>
  );
}
