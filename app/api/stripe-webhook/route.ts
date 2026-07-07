import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const AGENCY_AMOUNT_CENTS = 49900;

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

async function sendWelcomeEmail(params: { to: string; name: string; plan: "clinic" | "agency" }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL || "SmileFlow <onboarding@resend.dev>";
  const bcc = process.env.LEAD_BCC_EMAIL;
  const { to, name, plan } = params;

  const firstName = name?.trim().split(" ")[0] || "there";

  const body =
    plan === "agency"
      ? `<p>Hi ${firstName},</p>
         <p>Welcome to SmileFlow's Agency plan — thanks for signing up.</p>
         <p>To get your first clinic live, reply with:</p>
         <ul>
           <li>Your agency name (for co-branding)</li>
           <li>How many clinics you'd like to start with</li>
           <li>The first clinic's name, website, and preferred language (English or Serbian)</li>
         </ul>
         <p>We'll set up your white-label configuration and send install instructions within 24 hours.</p>
         <p>Questions in the meantime? Just reply to this email.</p>`
      : `<p>Hi ${firstName},</p>
         <p>Welcome to SmileFlow — you're one of our founding clinics.</p>
         <p>To get your widget live, reply with:</p>
         <ul>
           <li>Your clinic name</li>
           <li>Your website URL</li>
           <li>Preferred language (English or Serbian)</li>
           <li>The email address where you'd like lead notifications sent</li>
         </ul>
         <p>Once we have those, you'll get your embed code — installation takes about 5 minutes.</p>
         <p>Questions in the meantime? Just reply to this email.</p>`;

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px">${body}</div>`;

  if (!apiKey) {
    console.log("[Welcome email — RESEND_API_KEY not set, logging only]", JSON.stringify({ to, name, plan }));
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(bcc ? { bcc: [bcc] } : {}),
      subject: "Welcome to SmileFlow — let's get you set up",
      html,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("[Welcome email failed]", res.status, errBody);
  }
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("[Stripe webhook] Missing signature or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[Stripe webhook] Signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const name = session.customer_details?.name || "";
    const amountTotal = session.amount_total ?? 0;

    if (email) {
      const plan = amountTotal >= AGENCY_AMOUNT_CENTS ? "agency" : "clinic";
      try {
        await sendWelcomeEmail({ to: email, name, plan });
      } catch (err) {
        console.error("[Stripe webhook] Failed to send welcome email", err);
      }
    } else {
      console.error("[Stripe webhook] checkout.session.completed with no customer email", session.id);
    }
  }

  return NextResponse.json({ received: true });
}
