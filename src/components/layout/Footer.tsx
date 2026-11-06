import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatAddress, mapsDirectionsUrl, siteConfig } from "@/data/site-config";
import { LogoMark } from "@/components/ui/Logo";
import { ContactLinks } from "@/components/contact/ContactLinks";

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <LogoMark className="h-12 w-auto text-[#8f6ad8]" />
          <p className="display-s mt-8 max-w-sm">
            Good brands open doors. <span className="accent-italic">Great stories</span> keep them open.
          </p>
          <Link href="/contact" className="btn btn-primary mt-8">
            Start a Project
          </Link>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-2.5">
            {[...siteConfig.nav, ...siteConfig.footerNav].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-5">Get in touch</p>
          <ContactLinks />
          <address className="mt-6 not-italic text-muted">{formatAddress()}</address>
          <a
            href={mapsDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-fg link-underline"
          >
            Get directions <ArrowUpRight size={14} aria-hidden />
          </a>
          {contact.hours.length > 0 && (
            <ul className="mt-6 space-y-1 text-sm text-muted">
              {contact.hours.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.time}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-x flex flex-col gap-3 border-t border-line-soft py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        {siteConfig.social.length > 0 && (
          <ul className="flex gap-5">
            {siteConfig.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
