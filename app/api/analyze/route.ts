import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { apiStrings, promptLanguageInstruction, resolveLang } from "@/lib/i18n";
import { getClinic } from "@/lib/clinics";
import { checkRateLimit, getClientIp, IP_ANALYZE_RULE, CLINIC_DAY_WINDOW_MS } from "@/lib/rateLimit";

function getGenAI(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");
  return new GoogleGenerativeAI(apiKey);
}

function hasSupportedImageSignature(bytes: Uint8Array, mimeType: string): boolean {
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value);
  const isWebp = bytes.length >= 12 && Buffer.from(bytes.subarray(0, 4)).toString("ascii") === "RIFF" && Buffer.from(bytes.subarray(8, 12)).toString("ascii") === "WEBP";
  const isGif = bytes.length >= 6 && ["GIF87a", "GIF89a"].includes(Buffer.from(bytes.subarray(0, 6)).toString("ascii"));
  const isHeif = bytes.length >= 12 && Buffer.from(bytes.subarray(4, 8)).toString("ascii") === "ftyp";

  if (mimeType === "image/jpeg") return isJpeg;
  if (mimeType === "image/png") return isPng;
  if (mimeType === "image/webp") return isWebp;
  if (mimeType === "image/gif") return isGif;
  if (["image/heic", "image/heif"].includes(mimeType)) return isHeif;
  return false;
}

const AnalysisSchema = z.object({
  impression: z.string().min(10),
  areas: z.array(z.string()).max(4),
  treatments: z
    .array(
      z.object({
        name: z.string(),
        reason: z.string(),
      })
    )
    .max(4),
  urgency: z.enum(["low", "medium", "high"]),
  message: z.string(),
});

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null);
  const lang = resolveLang(formData?.get("lang") as string | null);
  const t = apiStrings[lang];

  try {
    if (!formData) {
      return NextResponse.json({ error: t.analysisError }, { status: 400 });
    }

    const clinic = getClinic((formData.get("clinicId") as string) || "demo");
    if (!clinic) {
      return NextResponse.json({ error: "Unknown clinic." }, { status: 403 });
    }

    const ip = getClientIp(req.headers);
    const ipOk = checkRateLimit(`analyze:ip:${ip}`, IP_ANALYZE_RULE);
    const clinicOk = checkRateLimit(`analyze:clinic:${clinic.id}`, {
      limit: clinic.dailyAnalysisLimit,
      windowMs: CLINIC_DAY_WINDOW_MS,
    });
    if (!ipOk || !clinicOk) {
      return NextResponse.json({ error: t.rateLimited }, { status: 429 });
    }

    const file = formData.get("photo") as File | null;
    if (!file) {
      return NextResponse.json({ error: t.noPhoto }, { status: 400 });
    }
    const supportedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"];
    if (!supportedMimeTypes.includes(file.type)) {
      return NextResponse.json({ error: t.onlyImages }, { status: 400 });
    }
    if (file.size < 256 || file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: t.onlyImages }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    if (!hasSupportedImageSignature(bytes, file.type)) {
      return NextResponse.json({ error: t.onlyImages }, { status: 400 });
    }
    const base64 = Buffer.from(bytes).toString("base64");

    const model = getGenAI().getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `You are a top-tier aesthetic dentist with 15+ years of experience, specialized in smile design (Hollywood Smile, facial aesthetics, and digital smile design).

You are analyzing a smile photo of a prospective patient for the clinic "${clinic.name}".

**IMPORTANT RULES:**
- ${promptLanguageInstruction[lang]}
- This is NOT a medical diagnosis. Always emphasize that this is an orientational analysis and an in-person dental examination is required.
- Focus on aesthetic possibilities and how the patient can achieve a more beautiful, confident smile.
- Recommend realistic, widely available treatments (ceramic crowns, porcelain veneers, clear aligners, whitening, Hollywood smile, gingival contouring, implants if visibly relevant).
- Be warm and encouraging, never alarming or judgmental.
- If the photo does not clearly show a smile or teeth, say so politely in the "impression" field and return an empty "areas" and "treatments" list with urgency "low".

Based on the photo, return ONLY valid JSON in this exact schema (keys in English, values in the language specified above):

{
  "impression": "Short, warm impression of the smile (1-2 sentences)",
  "areas": ["list of 2-4 most noticeable aesthetic areas that could be improved"],
  "treatments": [
    {
      "name": "Treatment name (e.g. Porcelain veneers, Hollywood Smile package)",
      "reason": "Why this treatment would benefit this patient"
    }
  ],
  "urgency": "low | medium | high",
  "message": "Warm, motivating message to the patient (2-3 sentences) encouraging them to book a consultation"
}

A good analysis is concrete, empathetic, and action-oriented (booking a consultation).

Begin the analysis.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: file.type,
          data: base64,
        },
      },
    ]);

    const responseText = result.response.text().trim();
    const parsed = JSON.parse(responseText);
    const validated = AnalysisSchema.parse(parsed);

    return NextResponse.json({
      ...validated,
      disclaimer: t.disclaimer,
      clinic: clinic.name,
    });
  } catch (error) {
    console.error("[Smile Analysis Error]:", error);
    return NextResponse.json({ error: t.analysisError }, { status: 500 });
  }
}
