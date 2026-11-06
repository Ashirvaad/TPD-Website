"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Email / phone / WhatsApp links from the central config.
 * Unverified (empty) values are not rendered.
 */
export function ContactLinks({ className, large }: { className?: string; large?: boolean }) {
  const { email, phone, whatsapp, whatsappDisplay } = siteConfig.contact;
  const item = cn("inline-flex items-center gap-3 transition-colors hover:text-accent", large ? "text-lg" : "text-fg");

  if (!email && !phone && !whatsapp) {
    return (
      <p className={cn("text-muted", className)}>
        Send us a message through the{" "}
        <a href="/contact#enquiry" className="text-fg underline underline-offset-4">
          enquiry form
        </a>{" "}
        and we&apos;ll get back to you.
      </p>
    );
  }

  return (
    <ul className={cn("space-y-3", className)}>
      {email && (
        <li>
          <a href={`mailto:${email}`} className={item} onClick={() => track("email_click")}>
            <Mail size={16} aria-hidden className="text-subtle" /> {email}
          </a>
        </li>
      )}
      {phone && (
        <li>
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={item} onClick={() => track("phone_click")}>
            <Phone size={16} aria-hidden className="text-subtle" /> {phone}
          </a>
        </li>
      )}
      {whatsapp && (
        <li>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={item}
            onClick={() => track("phone_click", { channel: "whatsapp" })}
          >
            <MessageCircle size={16} aria-hidden className="text-subtle" /> WhatsApp {whatsappDisplay}
          </a>
        </li>
      )}
    </ul>
  );
}
