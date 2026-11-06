import type { Metadata } from "next";
import { CinematicHero } from "@/components/hero/CinematicHero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ClientLogos } from "@/components/home/ClientLogos";
import { HowWeWork } from "@/components/home/HowWeWork";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <WhatWeDo />
      <ClientLogos />
      <HowWeWork />
      <SelectedWork />
      <Testimonials />
      <CtaBand />
    </>
  );
}
