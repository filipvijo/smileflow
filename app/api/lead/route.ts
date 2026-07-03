import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClinic } from "@/lib/clinics";
import { resolveLang } from "@/lib/i18n";
import { checkRateLimit, getClientIp, IP_LEAD_RULE } from "@/lib/rateLimit";

const LeadSchema = z.object({
  clinicId: z.string().min(1),
  lang: z.string().optional(),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().default(""),
  consent: z.literal(true),
  summary: z
    .object({
      impression: z.string().max(600),
      urgency: z.enum(["low", "medium", "high"]),
      treatments: z.array(z.string().max(160)).max(4),
    })
    .optional(),
});

async function sendLeadEmail(params: {
  to: string;
  bcc?: string;
  clinicName: string;
  lead: z.infer<typeof LeadSchema>;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL || "SmileFlow <onboarding@resend.dev>";
  const { lead, clinicName } = params;

  const summaryHtml = lead.summary
    ? `<h3 style="margin:16px 0 4px">AI analysis summary</h3>
       <p style="margin:4px 0"><b>Impression:</b> ${lead.summary.impression}</p>
       <p style="margin:4px 0"><b>Urgency:</b> ${lead.summary.urgency}</p>
       <p style="margin:4px 0"><b>Suggested treatments:</b> ${lead.summary.treatments.join(", ") || "—"}</p>`
    : "";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px">
      <h2 style="margin:0 0 12px">New smile analysis lead — ${clinicName}</h2>
      <p style="margin:4px 0"><b>Name:</b> ${lead.name}</p>
      <p style="margin:4px 0"><b>Email:</b> ${lead.email}</p>
      <p style="margin:4px 0"><b>Phone:</b> ${lead.phone || "—"}</p>
      <p style="margin:4px 0"><b>Consent to contact:</b> yes</p>
      <p style="margin:4px 0"><b>Language:</b> ${lead.lang || "en"}</p>
      ${summaryHtml}
      <p style="margin:16px 0 0;color:#777;font-size:12px">This patient just used the AI smile analysis on your website. Leads convert best when contacted within 15 minutes.</p>
    </div>`;

  if (!apiKey) {
    console.log("[Lead captured — RESEND_API_KEY not set, logging only]", JSON.stringify({ clinicName, ...lead }));
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
      to: [params.to],
      ...(params.bcc ? { bcc: [params.bcc] } : {}),
      subject: `New lead: ${lead.name} — AI smile analysis (${clinicName})`,
      html,
      reply_to: lead.email,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[Lead email failed]", res.status, body);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    if (!checkRateLimit(`lead:ip:${ip}`, IP_LEAD_RULE)) {
      return NextResponse.json({ error: "Too many submissions. Try again later." }, { status: 429 });
    }

    const body = await req.json();
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
    }

    const lead = parsed.data;
    const clinic = getClinic(lead.clinicId);
    if (!clinic) {
      return NextResponse.json({ error: "Unknown clinic." }, { status: 403 });
    }

    lead.lang = resolveLang(lead.lang);

    const bcc = process.env.LEAD_BCC_EMAIL;
    await sendLeadEmail({
      to: clinic.notifyEmail,
      bcc: bcc && bcc !== clinic.notifyEmail ? bcc : undefined,
      clinicName: clinic.name,
      lead,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Lead Error]:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
