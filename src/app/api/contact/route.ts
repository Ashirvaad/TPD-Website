import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, spamSchema } from "@/lib/validations";
import { EmailNotConfiguredError, emailConfig, sendEnquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 2500;

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export async function POST(req: NextRequest) {
  // Same-origin check when the browser provides an Origin header.
  const origin = req.headers.get("origin");
  if (origin && origin !== req.nextUrl.origin) {
    return json(403, { ok: false, code: "FORBIDDEN", message: "Request not allowed." });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return json(429, { ok: false, code: "RATE_LIMITED", message: "Too many requests." }, { "Retry-After": String(limit.retryAfter) });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json(413, { ok: false, code: "TOO_LARGE", message: "Your message is too long." });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, code: "BAD_JSON", message: "Invalid request." });
  }

  // Spam checks: filled honeypot or impossibly fast submissions are accepted
  // silently (so bots learn nothing) but never emailed.
  const spam = spamSchema.safeParse(body);
  if (spam.success) {
    const { website, startedAt } = spam.data;
    const tooFast = typeof startedAt === "number" && Date.now() - startedAt < MIN_FILL_MS;
    if ((website && website.length > 0) || tooFast) {
      return json(200, { ok: true });
    }
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(400, {
      ok: false,
      code: "VALIDATION_ERROR",
      message: "Please check the highlighted fields and try again.",
      fields: parsed.error.issues.map((i) => i.path.join(".")),
    });
  }

  if (!emailConfig()) {
    console.warn("[contact] Email is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return json(503, { ok: false, code: "EMAIL_NOT_CONFIGURED", message: "Email delivery is not configured." });
  }

  try {
    await sendEnquiryEmail(parsed.data);
    return json(200, { ok: true });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      return json(503, { ok: false, code: "EMAIL_NOT_CONFIGURED", message: "Email delivery is not configured." });
    }
    // Log the technical failure only — never the enquiry contents.
    console.error("[contact] Email send failed:", error instanceof Error ? error.message : "unknown error");
    return json(502, {
      ok: false,
      code: "SEND_FAILED",
      message: "We couldn't send your message right now. Please try again shortly.",
    });
  }
}

export function GET() {
  return json(405, { ok: false, code: "METHOD_NOT_ALLOWED" }, { Allow: "POST" });
}
