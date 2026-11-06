/**
 * Privacy-conscious analytics hook.
 *
 * Events are pushed to `window.dataLayer` (if an analytics tool has created it)
 * and dispatched as a `tpd:analytics` DOM event. No vendor is bundled.
 * NEVER pass names, emails, phone numbers or message content as properties.
 */
export type AnalyticsEvent =
  | "project_cta_click"
  | "service_cta_click"
  | "case_study_view"
  | "pricing_enquiry_click"
  | "contact_form_start"
  | "contact_form_success"
  | "chatbot_open"
  | "phone_click"
  | "email_click";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...props });
  window.dispatchEvent(new CustomEvent("tpd:analytics", { detail: { event, ...props } }));
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, props);
}
