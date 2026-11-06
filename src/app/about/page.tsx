import type { Metadata } from "next";
import { Compass, Gem, Handshake, Lightbulb, RefreshCw, Timer } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Visual } from "@/components/ui/Visual";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/animations/Reveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { processSteps, services } from "@/data/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Purple Door Marketing is a creative marketing and production studio combining strategy, storytelling and high-end production.",
  alternates: { canonical: "/about" },
};

// Business-specific copy lives here so it can be edited without touching layout.
const about = {
  studio: [
    "The Purple Door Marketing is a creative marketing and production studio. We bring strategy, content and production together so brands can tell their story clearly and consistently.",
    "From managing social channels to photographing interiors and producing commercial shoots, we handle the thinking and the making — under one roof, with one team accountable for the result.",
  ],
  philosophy: {
    lines: ["Every brand has a door.", "We help people walk through it."],
    text: "Good marketing earns attention; great storytelling holds it. We start with what makes your brand worth noticing, then craft visuals and words that make it impossible to scroll past.",
  },
  values: [
    { icon: Lightbulb, title: "Creativity with purpose", text: "Ideas that serve a clear business goal, not just an aesthetic." },
    { icon: Compass, title: "Strategy before execution", text: "We plan the why and the who before we pick up a camera." },
    { icon: Gem, title: "Quality & attention to detail", text: "Every frame, edit and caption is considered and finished properly." },
    { icon: Handshake, title: "Collaborative working", text: "We work with you, sharing progress and inviting feedback throughout." },
    { icon: Timer, title: "Reliable delivery", text: "Clear schedules, honest communication and deadlines we keep." },
    { icon: RefreshCw, title: "Continuous improvement", text: "We review what works and refine the approach over time." },
  ],
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About the studio"
        lines={["More than marketing.", "Your creative partner."]}
        accentLine={1}
        intro="We combine creative thinking, strategic planning and high-end production to help brands grow through meaningful stories."
      />

      <section className="container-x">
        <ImageReveal>
          <Visual
            media={{ type: "image", artwork: "bts", alt: "The studio set up for a shoot", tone: 0 }}
            className="aspect-[16/9] w-full md:aspect-[21/9]"
            priority
          />
        </ImageReveal>
      </section>

      <section aria-labelledby="studio-title" className="container-x section-y grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="Our story" title={<span id="studio-title">Strategy meets storytelling.</span>} />
        </div>
        <Reveal className="space-y-6 text-lg text-muted md:col-span-6 md:col-start-7">
          {about.studio.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </Reveal>
      </section>

      <section aria-label="Creative philosophy" className="border-y border-line bg-bg-2">
        <div className="container-x section-y">
          <p className="eyebrow mb-8">Creative philosophy</p>
          <TextReveal lines={about.philosophy.lines} accentLine={1} className="display-l max-w-5xl" />
          <Reveal delay={0.2}>
            <p className="lead mt-8 max-w-2xl">{about.philosophy.text}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="values-title" className="container-x section-y">
        <SectionHeading eyebrow="What we stand for" title={<span id="values-title">Values we work by.</span>} />
        <Reveal as="ul" stagger={0.08} className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {about.values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-bg p-8 md:p-10">
              <Icon size={22} className="text-accent" aria-hidden />
              <h3 className="display-s mt-8">{title}</h3>
              <p className="mt-3 text-sm text-muted">{text}</p>
            </li>
          ))}
        </Reveal>
      </section>

      <section aria-labelledby="approach-title" className="container-x pb-[var(--section)]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeading
              eyebrow="Our approach"
              title={<span id="approach-title">What we do, and how.</span>}
              intro="Four disciplines, one process."
            />
            <ul className="mt-10 space-y-3">
              {services.map((s) => (
                <li key={s.id} className="flex gap-4 border-t border-line pt-3">
                  <span className="text-xs text-subtle">{s.index}</span>
                  <span>{s.title}</span>
                </li>
              ))}
              <li className="flex gap-4 border-t border-line pt-3">
                <span className="text-xs text-subtle">04</span>
                <span>Brand Films & Creative Campaigns</span>
              </li>
            </ul>
          </div>
          <Reveal as="ol" stagger={0.1} className="space-y-8 md:col-span-6 md:col-start-7">
            {processSteps.map((s) => (
              <li key={s.index} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line pb-8">
                <span className="font-display text-3xl text-subtle">{s.index}</span>
                <div>
                  <h3 className="display-s">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand lines={["Good brands open doors.", "Great stories keep them open."]} />
    </>
  );
}
