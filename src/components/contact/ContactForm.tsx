"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle2, MessageCircle } from "lucide-react";
import { contactSchema, LIMITS, type ContactInput } from "@/lib/validations";
import { enquiryServices } from "@/data/services";
import type { EnquiryServiceId } from "@/types";
import { track } from "@/lib/analytics";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site-config";

interface Props {
  initialServices?: EnquiryServiceId[];
  packageId?: string;
  packageLabel?: string;
  context?: string;
}

type Status =
  | { state: "idle" }
  | { state: "success"; url: string; opened: boolean }
  | { state: "error"; message: string; tone?: "config" | "error" };

export function ContactForm({ initialServices = [], packageId = "", packageLabel, context = "" }: Props) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef<number>(0);
  const tracked = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      services: initialServices,
      details: "",
      contactMethod: "",
      consent: false,
      packageId,
      context,
    },
  });

  const details = watch("details") ?? "";

  const onFirstInteraction = () => {
    if (tracked.current) return;
    tracked.current = true;
    track("contact_form_start", { has_package: Boolean(packageId) });
  };

  /**
   * Enquiries are delivered on WhatsApp: the visitor's WhatsApp opens with the
   * enquiry pre-written to the business number, and they tap Send. If email is
   * configured on the server, a copy is also emailed in the background.
   */
  const onSubmit = (data: ContactInput) => {
    const url = whatsappUrl(buildEnquiryMessage(data));

    // Best-effort email copy; never blocks or changes the WhatsApp flow.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      keepalive: true,
    }).catch(() => {});

    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    track("contact_form_success", { services: data.services.length, channel: "whatsapp" });
    setStatus({ state: "success", url, opened: Boolean(win) });
    reset();
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-line bg-surface/90 p-8 outline-none md:p-12"
      >
        <CheckCircle2 className="text-accent" size={32} aria-hidden />
        <h2 className="display-m mt-6">Almost there — send it on WhatsApp.</h2>
        <p className="lead mt-4">
          {status.opened
            ? "WhatsApp has opened with your enquiry ready to go. Tap Send in WhatsApp to deliver it to our team."
            : "Your enquiry is ready. Open WhatsApp and tap Send to deliver it to our team."}
        </p>
        <p className="mt-3 text-sm text-subtle">
          Your enquiry only reaches us once it&apos;s sent from WhatsApp. It goes to{" "}
          {siteConfig.contact.whatsappDisplay}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={status.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle size={16} aria-hidden /> {status.opened ? "Open WhatsApp again" : "Open WhatsApp"}
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => setStatus({ state: "idle" })}>
            Start a new enquiry
          </button>
        </div>
      </div>
    );
  }

  const err = (msg?: string, id?: string) =>
    msg ? (
      <p id={id} className="mt-2 text-sm text-danger" role="alert">
        {msg}
      </p>
    ) : null;

  return (
    <form
      id="enquiry"
      noValidate
      onSubmit={handleSubmit(onSubmit, (errs) => {
        const first = (["name", "email", "phone", "services", "details", "consent"] as const).find((k) => errs[k]);
        if (first && first !== "services") setFocus(first);
        else if (first === "services") document.getElementById("svc-0")?.focus();
      })}
      onFocusCapture={onFirstInteraction}
      className="rounded-2xl border border-line bg-surface/90 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-8 md:p-10"
      aria-describedby="form-help"
    >
      <div className="border-b border-line pb-6">
        <h2 className="display-s">Tell us about your project</h2>
        <p id="form-help" className="mt-2 text-sm text-muted">
          Fields marked * are required. It takes about two minutes.
        </p>
      </div>

      {(packageLabel || context) && (
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm">
          <span className="text-muted">Enquiring about:</span>
          {packageLabel && <span className="font-medium text-fg">{packageLabel}</span>}
          {packageLabel && context && <span className="text-subtle">·</span>}
          {context && <span className="font-medium text-fg">{context}</span>}
        </div>
      )}

      {/* 01 Contact details */}
      <fieldset className="mt-8">
        <legend className="eyebrow mb-5">01 · Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="form-label">
              Full name <span aria-hidden>*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              maxLength={LIMITS.name}
              className="input"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-required="true"
              {...register("name")}
            />
            {err(errors.name?.message, "name-error")}
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email address <span aria-hidden>*</span>
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              maxLength={LIMITS.email}
              className="input"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-required="true"
              {...register("email")}
            />
            {err(errors.email?.message, "email-error")}
          </div>
          <div>
            <label htmlFor="phone" className="form-label">
              Phone number <span className="form-hint">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91"
              maxLength={LIMITS.phone}
              className="input"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
            {err(errors.phone?.message, "phone-error")}
          </div>
          <fieldset>
            <legend className="form-label">
              Preferred contact method <span className="form-hint">(optional)</span>
            </legend>
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-white/[0.03] p-1">
              {(["email", "phone", "whatsapp"] as const).map((m) => (
                <label
                  key={m}
                  className="flex min-h-[2.6rem] cursor-pointer items-center justify-center rounded-lg text-sm text-muted transition-colors hover:text-fg has-checked:bg-accent has-checked:text-accent-ink has-focus-visible:outline-2 has-focus-visible:outline-accent"
                >
                  <input type="radio" value={m} className="sr-only" {...register("contactMethod")} />
                  {m === "whatsapp" ? "WhatsApp" : m === "email" ? "Email" : "Phone"}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </fieldset>

      {/* 02 Project */}
      <fieldset className="mt-10 border-t border-line pt-8">
        <legend className="sr-only">Your project</legend>
        <p className="eyebrow mb-5" aria-hidden>
          02 · Your project
        </p>

        <fieldset aria-describedby={errors.services ? "services-error" : "services-hint"}>
          <legend className="form-label">
            Services interested in <span aria-hidden>*</span>
          </legend>
          <p id="services-hint" className="-mt-1 mb-3 text-sm text-subtle">
            Choose all that apply.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {enquiryServices.map((s, i) => (
              <label
                key={s.id}
                className="group flex min-h-[3.1rem] cursor-pointer items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-4 text-sm transition-colors hover:border-white/30 has-checked:border-accent has-checked:bg-accent/15 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
              >
                <input id={`svc-${i}`} type="checkbox" value={s.id} className="sr-only" {...register("services")} />
                <span
                  aria-hidden
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/30 text-transparent transition-colors group-has-checked:border-accent group-has-checked:bg-accent group-has-checked:text-accent-ink"
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                {s.label}
              </label>
            ))}
          </div>
          {err(errors.services?.message ?? errors.services?.root?.message, "services-error")}
        </fieldset>

        <div className="mt-6">
          <label htmlFor="details" className="form-label">
            Project details <span className="form-hint">(optional)</span>
          </label>
          <textarea
            id="details"
            rows={5}
            maxLength={LIMITS.details}
            placeholder="Tell us about your brand, the space or product, timelines and budget if you have one."
            className="input resize-y"
            aria-invalid={Boolean(errors.details)}
            aria-describedby={errors.details ? "details-error details-count" : "details-count"}
            {...register("details")}
          />
          <p id="details-count" className="mt-1.5 text-right text-xs text-subtle">
            {details.length}/{LIMITS.details}
          </p>
          {err(errors.details?.message, "details-error")}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" {...register("packageId")} />
      <input type="hidden" {...register("context")} />

      <div className="mt-8 border-t border-line pt-8">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--accent)]"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            I agree to The Purple Door Marketing using these details to respond to my enquiry.{" "}
            <span aria-hidden>*</span>
          </span>
        </label>
        {err(errors.consent?.message, "consent-error")}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={isSubmitting} aria-busy={isSubmitting}>
            <MessageCircle size={16} aria-hidden /> Send enquiry on WhatsApp
          </button>
          <p className="text-xs text-subtle">Opens WhatsApp with your enquiry ready to send.</p>
        </div>
      </div>
    </form>
  );
}
