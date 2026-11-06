import { enquiryServices } from "@/data/services";
import { getPackage } from "@/data/pricing";
import { siteConfig } from "@/data/site-config";
import type { ContactInput } from "./validations";

const methodLabel: Record<string, string> = { email: "Email", phone: "Phone", whatsapp: "WhatsApp" };

/** Formats a contact-form enquiry as a WhatsApp message (WhatsApp *bold* markup). */
export function buildEnquiryMessage(data: ContactInput) {
  const services = data.services.map((id) => enquiryServices.find((s) => s.id === id)?.label ?? id);
  const pkg = getPackage(data.packageId);

  // `null` entries are dropped; "" entries are intentional blank lines.
  const lines: (string | null)[] = [
    `*New enquiry — ${siteConfig.name} website*`,
    "",
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
    data.phone ? `*Phone:* ${data.phone}` : null,
    data.contactMethod ? `*Preferred contact:* ${methodLabel[data.contactMethod]}` : null,
    `*Services:* ${services.join(", ")}`,
    pkg ? `*Package:* ${pkg.category} — ${pkg.name}` : null,
    data.context ? `*Enquiring about:* ${data.context}` : null,
    ...(data.details ? ["", "*Project details:*", data.details] : []),
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

/** Click-to-chat link that opens WhatsApp with the message ready to send. */
export function whatsappUrl(text: string, number = siteConfig.contact.enquiryWhatsapp) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
