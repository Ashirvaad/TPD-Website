import { Clock, MapPin } from "lucide-react";
import { formatAddress, siteConfig } from "@/data/site-config";
import { ContactLinks } from "./ContactLinks";

/** Shared contact block for the Contact and Visit Us pages. */
export function ContactDetails() {
  const { hours } = siteConfig.contact;
  return (
    <div className="space-y-10">
      <div>
        <h2 className="eyebrow mb-4">Reach us</h2>
        <ContactLinks large />
      </div>
      <div>
        <h2 className="eyebrow mb-4">Studio</h2>
        <div className="flex gap-3 text-lg">
          <MapPin size={18} className="mt-1 shrink-0 text-subtle" aria-hidden />
          <address className="not-italic">{formatAddress()}</address>
        </div>
      </div>
      <div>
        <h2 className="eyebrow mb-4">Working hours</h2>
        <div className="flex gap-3">
          <Clock size={18} className="mt-1 shrink-0 text-subtle" aria-hidden />
          {hours.length > 0 ? (
            <ul className="space-y-1">
              {hours.map((h) => (
                <li key={h.days}>
                  <span className="text-muted">{h.days}:</span> {h.time}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Visits by appointment — get in touch to arrange a time.</p>
          )}
        </div>
      </div>
    </div>
  );
}
