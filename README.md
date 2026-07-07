# SmileFlow

AI smile-analysis widget for dental clinics. A website visitor uploads a smile selfie, Gemini
generates an instant aesthetic report, and the visitor's contact details land in the clinic's
inbox as a qualified lead. B2B SaaS: clinics pay a flat monthly fee for unlimited analyses.

## How the lead-gate works

1. Visitor uploads a photo → `/api/analyze` (Gemini 2.5 Flash) returns the report.
2. The widget shows a **teaser** (status + "N treatment opportunities found", blurred cards).
3. To unlock the full report the visitor submits **name, email, phone + consent** → `/api/lead`.
4. The clinic gets an instant email (via Resend); `LEAD_BCC_EMAIL` is BCC'd on everything.
5. Full report is revealed, ending on a "Book a consultation" CTA.

Photos are analyzed in memory and never stored.

## Running locally

```bash
npm install
cp .env.example .env   # fill in GEMINI_API_KEY at minimum
npm run dev
```

- `http://localhost:3000` — marketing landing page with live demo widget (English).
- `http://localhost:3000/embed/demo?lang=en` — bare embeddable widget.
- `http://localhost:3000/embed/orto-demo-rs` — Serbian clinic example.

Without `RESEND_API_KEY`, captured leads are logged to the server console instead of emailed.

## Adding a clinic

Edit [lib/clinics.ts](lib/clinics.ts) and add an entry: unguessable `id`, clinic name, default
language, notification email, allowed embed hostnames, and optional booking URL. Deploy. Done.
(Registry is file-based on purpose — move to a database when self-serve signup is needed.)

## Embedding on a clinic website

```html
<script src="https://YOUR-DEPLOYMENT-DOMAIN/embed.js"
  data-clinic="clinic-id"
  data-lang="en"
  data-booking="https://clinic.com/book"></script>
```

The script injects an auto-resizing iframe. `data-lang` and `data-booking` are optional.

## Languages

English (`en`) and Serbian (`sr`), defined in [lib/i18n.ts](lib/i18n.ts) — both UI strings and
the Gemini prompt output language. To add French/German/Spanish: add a `Lang` entry, a
`widgetStrings` block, an `apiStrings` block, and a `promptLanguageInstruction` line.

## Abuse protection

- Per-IP rate limits: 8 analyses/hour, 5 lead submissions/hour ([lib/rateLimit.ts](lib/rateLimit.ts)).
- Per-clinic daily analysis cap (`dailyAnalysisLimit` in the registry).
- Optional per-clinic `allowedHosts` referer check on the embed page.
- In-memory limiter is per serverless instance — swap for Upstash Redis at scale.

## Compliance positioning

Every report carries a disclaimer: AI orientation of aesthetic possibilities, **not** a medical
diagnosis; in-person examination required. Keep all marketing copy cosmetic/informational.
Consent checkbox is required before any contact details are sent.

## Billing and post-payment welcome email

Pricing cards on the landing page link directly to Stripe Payment Links (no checkout code in
this repo). When someone subscribes, [app/api/stripe-webhook/route.ts](app/api/stripe-webhook/route.ts)
receives Stripe's `checkout.session.completed` event and sends a welcome/setup email via Resend,
asking the new customer for their clinic details. It distinguishes Clinic vs Agency by the paid
amount (`$149` vs `$499`) since Payment Links don't require a signup flow to look up the plan.

There is no automatic account provisioning — after a customer replies with their details, add
them to [lib/clinics.ts](lib/clinics.ts) by hand and send their embed code. Build a real
webhook-driven provisioning flow once manual onboarding stops scaling.

To wire this up:
1. Deploy with `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` set (see `.env.example`).
2. In the Stripe Dashboard, add a webhook endpoint at `https://YOUR-DOMAIN/api/stripe-webhook`
   listening for `checkout.session.completed`, and copy its signing secret into
   `STRIPE_WEBHOOK_SECRET`.
