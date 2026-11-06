# The Purple Door Marketing — Website

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · React Hook Form + Zod · Resend

## Commands

```bash
npm install          # install dependencies
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run build        # production build
npm run start        # serve the production build
```

## Environment variables

Copy `.env.example` to `.env.local` (local) or add them in Vercel → Project → Settings → Environment Variables.

| Variable | Where used | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | server only | Never prefix with `NEXT_PUBLIC_`. |
| `CONTACT_TO_EMAIL` | server only | Inbox for enquiries. Comma-separate for several. |
| `CONTACT_FROM_EMAIL` | server only | Must be on a domain verified in Resend, e.g. `The Purple Door <enquiries@yourdomain.com>`. |
| `NEXT_PUBLIC_SITE_URL` | metadata, sitemap, robots | Canonical URL, no trailing slash. |

If the three email variables are missing, `/api/contact` returns `503 EMAIL_NOT_CONFIGURED` and the form tells the visitor their message was **not** sent. Nothing pretends to succeed.

### How enquiries are delivered (WhatsApp)

Submitting the contact form opens WhatsApp (app on phones, WhatsApp Web on desktop) with the enquiry pre-written to `siteConfig.contact.enquiryWhatsapp` (+91 91376 99428). The visitor taps **Send**, so the enquiry arrives as a normal chat from their own number and you can reply directly. It only reaches you once they send it. The message is built in `src/lib/whatsapp.ts`.

If the email variables are set, a copy is also emailed in the background via `/api/contact`. Fully automatic delivery (no tap needed) would require the WhatsApp Business Cloud API from Meta, which needs a verified business account and an approved message template.

### Enquiry emails (sales1thepurpledoor@gmail.com)

Every form submission is also emailed to `CONTACT_TO_EMAIL` (set to sales1thepurpledoor@gmail.com in `.env.local`), whether or not the visitor taps Send in WhatsApp. Replying to the email answers the visitor directly.

Quick start without a domain: sign up at resend.com **using sales1thepurpledoor@gmail.com**, create an API key, paste it after `RESEND_API_KEY=` in `.env.local`, then restart with `npm run preview`. Resend's shared sender (`onboarding@resend.dev`) only delivers to the address the Resend account belongs to, so the account email must match. For a branded sender, verify your own domain in Resend (steps below) and change `CONTACT_FROM_EMAIL`.

### Setting up Resend

1. Create an account at resend.com and add your domain under **Domains**.
2. Add the DNS records Resend shows (SPF/DKIM) at your DNS provider and wait for "Verified".
3. Create an API key with "Sending access" and set `RESEND_API_KEY`.
4. Set `CONTACT_FROM_EMAIL` to an address on the verified domain and `CONTACT_TO_EMAIL` to your inbox.
5. Submit the form on the deployed site. The success message only appears after Resend accepts the email (acceptance ≠ guaranteed inbox delivery; check spam on first tests).

### Contact API protections

- Zod validation on the client **and** server (`src/lib/validations.ts` is shared).
- Same-origin check, 16 KB body limit, honeypot field, minimum fill time.
- In-memory rate limit: 5 requests / 10 minutes per IP (`src/lib/rate-limit.ts`). On serverless this is per instance and only best effort; use a shared store (e.g. Upstash Redis) if abuse becomes a problem.
- Errors are logged without enquiry contents.

## Editing content

All business content is in `src/data/` — no layout code needs to change.

| File | Contents |
| --- | --- |
| `site-config.ts` | Name, hero copy & scenes, contact details, address, hours, map query, nav, social links |
| `services.ts` | Services, contact-form service options, process steps |
| `projects.ts` | Portfolio + case studies |
| `pricing.ts` | Packages; `pricingConfirmed` flag |
| `faqs.ts` | FAQ categories; `pending: true` marks unconfirmed answers |
| `gallery.ts` | Gallery items |
| `testimonials.ts` | Testimonials (only `verified: true` shown) and client logos |
| `chatbot.ts` | Chatbot questions, keywords and answers |

Design tokens (colours, type scale, spacing, z-index, motion) are CSS custom properties at the top of `src/app/globals.css`.

## Replacing placeholder media

No real photography or video was supplied, so every visual is an **art-directed SVG placeholder** marked "Placeholder". To use real media:

1. Put files in `public/images/...` or `public/videos/...`.
2. Set `src` (and `poster` for videos) on the relevant `Media` object in `src/data/*`. The placeholder disappears automatically.
3. When everything is replaced, set `showPlaceholderLabels: false` in `site-config.ts`.

Recommended: JPEG/WebP/AVIF images at ~2400px on the long edge (Next/Image generates responsive sizes); videos as H.264 MP4 (+ optional WebM) with a poster.

### Hero film (scroll-scrubbed)

The landing page opens on the film alone; scrolling scrubs through it, and at `hero.textAt` (9 s) the headline, copy, CTAs and navigation appear. Settings live in `siteConfig.hero` (`video.*`, `textAt`, `scrollLength`).

Current files, encoded from the supplied `Landing page.mp4` (audio removed, a keyframe every 4 frames for smooth seeking):

- `public/videos/hero.mp4`: 1920×1080, about 6.4 MB
- `public/videos/hero-mobile.mp4`: 960×540, about 2 MB (phones)
- `public/images/hero-poster.jpg`: first frame, shown while loading
- `public/images/hero-end.jpg`: final frame, shown with the text for reduced-motion visitors

To replace the film, re-encode it the same way and update `video.duration`:

```bash
ffmpeg -i film.mp4 -an -c:v libx264 -preset slow -crf 24 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/videos/hero.mp4
ffmpeg -i film.mp4 -an -vf scale=960:-2 -c:v libx264 -preset slow -crf 26 -g 4 -keyint_min 4 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/videos/hero-mobile.mp4
```

## Launch checklist (business details still to confirm)

- [ ] Contact email, phone and WhatsApp number in `site-config.ts` (empty values are hidden).
- [x] Full studio address, map embed (`mapEmbedSrc`) and directions query.
- [x] Working hours.
- [ ] Client approval for each project shown (names came from the design reference) and real project copy; remove `draft: true`.
- [ ] Real project, gallery, about and studio media.
- [ ] Pricing approved → set `pricingConfirmed = true`, add revision policies.
- [ ] FAQ answers marked `pending: true`.
- [ ] Verified testimonials and approved client logos.
- [ ] Social links.
- [ ] Resend domain verified and env vars set in production.
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain.
- [x] Local business structured data (address + hours, no ratings) is emitted now that the address is verified.

## Analytics

`src/lib/analytics.ts` exposes `track(event, props)`. Events: `project_cta_click`, `service_cta_click`, `case_study_view`, `pricing_enquiry_click`, `contact_form_start`, `contact_form_success`, `chatbot_open`, `phone_click`, `email_click`. They are pushed to `window.dataLayer` (if a tag manager creates it) and dispatched as a `tpd:analytics` DOM event. No vendor is installed. Form contents and personal data are never sent. If you add a vendor that sets cookies or tracks individuals, add a consent banner and update your privacy notice first.

## Motion & accessibility

- One Lenis instance, driven by GSAP's ticker and synced to ScrollTrigger (`src/components/animations/SmoothScroll.tsx`). Native scroll position, touch scrolling stays native.
- `prefers-reduced-motion: reduce` disables Lenis, the pinned film, reveals and the marquee; the hero shows the final frame with the text and loads no video.
- Navigation uses plain Next.js links (no transition overlay); ScrollTrigger is refreshed after each route change.

## Deploying to Vercel

1. Push the project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel, **Add New → Project**, import the repo. Framework preset: Next.js (defaults are correct).
3. Add the four environment variables (Production and Preview).
4. Deploy, then add your custom domain under **Settings → Domains** and update `NEXT_PUBLIC_SITE_URL` to match. Redeploy.
5. Submit a test enquiry and confirm it arrives.
