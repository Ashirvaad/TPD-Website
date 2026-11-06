import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { Reveal } from "@/components/animations/Reveal";
import { enquiryServiceIds } from "@/data/services";
import { getPackage } from "@/data/pricing";
import type { EnquiryServiceId } from "@/types";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with The Purple Door Marketing. Tell us about your brand, space or product.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Reads ?service=, ?package= and ?topic= safely, ignoring unknown values. */
function parsePrefill(sp: Record<string, string | string[] | undefined>) {
  const pkg = getPackage(first(sp.package)?.slice(0, 60));
  const requested = (first(sp.service) ?? "").split(",").map((s) => s.trim());
  const services = requested.filter((s): s is EnquiryServiceId =>
    (enquiryServiceIds as readonly string[]).includes(s),
  );
  if (pkg && !services.includes(pkg.enquiryService)) services.push(pkg.enquiryService);
  const topic = (first(sp.topic) ?? "").replace(/[^\p{L}\p{N}\s&'\-,.]/gu, "").slice(0, 80);
  return { services, pkg, topic };
}

export default async function ContactPage({ searchParams }: Props) {
  const { services, pkg, topic } = parsePrefill(await searchParams);

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        lines={["Let's create", "something great."]}
        accentLine={1}
        intro="Have a project in mind? Tell us a little about it and we'll get back to you to discuss ideas, timelines and a quote."
      />

      <section className="container-x pb-[var(--section)]">
        {/* Lit backdrop behind the form and details */}
        <div className="relative overflow-clip rounded-[2rem] border border-line bg-[#100d17] p-3 sm:p-5 lg:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_0%,rgba(101,68,155,0.45),transparent_70%),radial-gradient(45%_55%_at_100%_100%,rgba(101,68,155,0.3),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px]"
          />

          <div className="relative grid items-start gap-5 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-7">
              <ContactForm
                key={`${services.join(",")}|${pkg?.id ?? ""}|${topic}`}
                initialServices={services}
                packageId={pkg?.id ?? ""}
                packageLabel={pkg ? `${pkg.category} — ${pkg.name}` : undefined}
                context={topic}
              />
            </Reveal>
            <Reveal
              delay={0.15}
              className="space-y-10 rounded-2xl border border-line bg-surface/80 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-8 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:col-span-5"
            >
              <ContactDetails />
              <MapEmbed />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
