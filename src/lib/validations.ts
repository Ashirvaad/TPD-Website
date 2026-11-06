import { z } from "zod";
import { enquiryServiceIds } from "@/data/services";

export const contactMethods = ["email", "phone", "whatsapp"] as const;

export const LIMITS = {
  name: 100,
  email: 200,
  phone: 20,
  details: 3000,
  context: 120,
} as const;

/** Shared by the client form and the /api/contact route. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(LIMITS.name, "That name is too long."),
  email: z.string().trim().max(LIMITS.email, "That email is too long.").pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(LIMITS.phone, "That phone number is too long.")
    .refine((v) => v === "" || /^[+()\-\s\d]{7,20}$/.test(v), "Please enter a valid phone number."),
  services: z.array(z.enum(enquiryServiceIds)).min(1, "Please choose at least one service.").max(enquiryServiceIds.length),
  details: z.string().trim().max(LIMITS.details, `Please keep this under ${LIMITS.details} characters.`),
  contactMethod: z.union([z.enum(contactMethods), z.literal("")]),
  consent: z.boolean().refine((v) => v, "Please agree so we can respond to your enquiry."),
  packageId: z.string().max(60),
  context: z.string().trim().max(LIMITS.context),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Extra fields sent by the browser for spam protection. */
export const spamSchema = z.object({
  /** Honeypot — must stay empty. */
  website: z.string().max(200).optional(),
  /** ms timestamp when the form was first rendered. */
  startedAt: z.number().int().positive().optional(),
});
