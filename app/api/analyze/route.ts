import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const AnalysisSchema = z.object({
  utisak: z.string().min(10),
  oblasti: z.array(z.string()).max(4),
  tretmani: z.array(
    z.object({
      naziv: z.string(),
      razlog: z.string(),
      cena_okvirna: z.string().optional(),
    })
  ).max(4),
  hitnost: z.enum(["niska", "srednja", "visoka"]),
  poruka: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo") as File | null;
    const clinicName = (formData.get("clinicName") as string) || "Vaša Klinika";

    if (!file) {
      return NextResponse.json({ error: "Molimo pošaljite fotografiju osmeha." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Dozvoljene su samo slike (JPG, PNG, WEBP)." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = file.type;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `Ti si vrhunski estetski stomatolog sa 15+ godina iskustva u Beogradu, specijalizovan za osmehni dizajn (Hollywood Smile, facijalnu estetiku i digitalni smile design).

Analiziraš fotografiju osmeha potencijalnog pacijenta za kliniku "${clinicName}".

**VAŽNA PRAVILA:**
- Odgovaraj ISKLJUČIVO na srpskom jeziku, ljubaznim, empatičnim i profesionalnim tonom.
- Ovo NIJE medicinska dijagnoza. Uvek naglasi da je ovo orijentaciona analiza i da je obavezan pregled kod stomatologa.
- Fokusiraj se na estetske mogućnosti i kako pacijent može dobiti lepši, samouvereniji osmeh.
- Koristi realne, popularne tretmane u Srbiji (keramičke krunice, porcelanski viniri, zubni aligneri, izbeljivanje, Hollywood smile, gingivalni contouring, implantati ako je vidljivo).

Na osnovu fotografije vrati SAMO validan JSON u sledećoj šemi:

{
  "utisak": "Kratak, topao utisak o osmehu (1-2 rečenice)",
  "oblasti": ["lista od 2-4 najuočljivije estetske oblasti koje mogu da se poboljšaju"],
  "tretmani": [
    {
      "naziv": "Naziv tretmana (npr. Porcelanski viniri, Hollywood Smile komplet)",
      "razlog": "Zašto bi ovaj tretman bio koristan za ovog pacijenta",
      "cena_okvirna": "Orijentaciona cena u Beogradu (npr. od 450€ po zubu)"
    }
  ],
  "hitnost": "niska | srednja | visoka",
  "poruka": "Topla, motivaciona poruka pacijentu (2-3 rečenice) koja ga podstiče da zakaže konsultaciju"
}

Primer dobre analize treba da bude konkretna, empatična i usmerena ka akciji (zakazivanje pregleda).

Počni analizu.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType as string,
          data: base64,
        },
      },
    ]);

    const responseText = result.response.text().trim();
    const parsed = JSON.parse(responseText);

    const validated = AnalysisSchema.parse(parsed);

    return NextResponse.json({
      ...validated,
      disclaimer: "Ovo je AI orijentaciona analiza za estetske mogućnosti. Nije zamena za pregled kod stomatologa. Sve preporuke zahtevaju klinički pregled i rendgenske snimke.",
      clinic: clinicName
    });

  } catch (error: any) {
    console.error("[Smile Analysis Error]:", error);
    return NextResponse.json({
      error: "Došlo je do greške pri analizi. Molimo pokušajte ponovo sa boljom fotografijom.",
      details: error.message
    }, { status: 500 });
  }
}
