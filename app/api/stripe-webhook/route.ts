import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { escapeHtml } from "@/lib/html";
import { CONTACT_EMAIL } from "@/lib/site";

export const runtime = "nodejs";

const CLINIC_AMOUNT_CENTS = 14900;
const AGENCY_AMOUNT_CENTS = 49999;

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key);
}

async function sendWelcomeEmail(params: {
  to: string;
  name: string;
  plan: "clinic" | "agency";
  eventId: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const from = process.env.LEAD_FROM_EMAIL || "SmileFlow <welcome@getsmileflow.com>";
  const bcc = process.env.LEAD_BCC_EMAIL;
  const { to, name, plan, eventId } = params;
  const firstName = escapeHtml(name?.trim().split(" ")[0] || "there");

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
         <p>Questions in the meantime? Reply to this email or contact ${CONTACT_EMAIL}.</p>`
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
         <p>Questions in the meantime? Reply to this email or contact ${CONTACT_EMAIL}.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `smileflow-welcome/${eventId}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(bcc ? { bcc: [bcc] } : {}),
      subject: "Welcome to SmileFlow — let's get you set up",
      html: `<div style="font-family:Arial,sans-serif;max-width:560px">${body}</div>`,
      reply_to: CONTACT_EMAIL,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("[Welcome email failed]", res.status, errBody);
    throw new Error("Welcome email delivery failed");
  }
}

function resolvePlan(session: Stripe.Checkout.Session): "clinic" | "agency" | null {
  if (session.payment_status !== "paid" || session.currency !== "usd") return null;
  if (session.amount_total === CLINIC_AMOUNT_CENTS) return "clinic";
  if (session.amount_total === AGENCY_AMOUNT_CENTS) return "agency";
  return null;
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("[Stripe webhook] Missing signature or webhook configuration");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("[Stripe webhook] Signature verification failed", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const plan = resolvePlan(session);
    const email = session.customer_details?.email;

    if (!plan) {
      console.error("[Stripe webhook] Ignoring unexpected checkout session", session.id);
      return NextResponse.json({ received: true });
    }

    if (!email) {
      console.error("[Stripe webhook] Completed checkout has no customer email", session.id);
      return NextResponse.json({ received: true });
    }

    try {
      await sendWelcomeEmail({
        to: email,
        name: session.customer_details?.name || "",
        plan,
        eventId: event.id,
      });
    } catch (error) {
      console.error("[Stripe webhook] Fulfilment failed", error instanceof Error ? error.message : "Unknown error");
      return NextResponse.json({ error: "Fulfilment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
