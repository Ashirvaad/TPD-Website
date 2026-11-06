import "server-only";
import { Resend } from "resend";
import { enquiryServices } from "@/data/services";
import { getPackage } from "@/data/pricing";
import type { ContactInput } from "./validations";

export class EmailNotConfiguredError extends Error {
  constructor() {
    super("Email delivery is not configured.");
  }
}

export function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  return apiKey && to && from ? { apiKey, to, from } : null;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

/** Strip characters that could break or inject email headers. */
const headerSafe = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 150);

export async function sendEnquiryEmail(data: ContactInput) {
  const config = emailConfig();
  if (!config) throw new EmailNotConfiguredError();

  const services = data.services.map((id) => enquiryServices.find((s) => s.id === id)?.label ?? id);
  const pkg = getPackage(data.packageId);

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Preferred contact", data.contactMethod || "—"],
    ["Services", services.join(", ")],
    ["Package", pkg ? `${pkg.category} — ${pkg.name}` : "—"],
    ["Enquiry context", data.context || "—"],
    ["Project details", data.details || "—"],
  ];

  const note = "Sent from the website contact form. Reply to this email to answer the visitor directly.";
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${note}`;
  const html = `<h2 style="font-family:sans-serif">New website enquiry</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table><p style="font-family:sans-serif;color:#888;font-size:12px;margin-top:24px">${note}</p>`;

  const resend = new Resend(config.apiKey);
  const { data: result, error } = await resend.emails.send({
    from: config.from,
    to: config.to.split(",").map((s) => s.trim()),
    replyTo: data.email,
    subject: headerSafe(`New enquiry: ${services.join(", ")} — ${data.name}`),
    text,
    html,
  });

  if (error) throw new Error(`Resend error: ${error.name ?? "unknown"}`);
  return result?.id;
}
