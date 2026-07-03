import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "SmileFlow vs SmileSnap — AI smile analysis widget comparison",
  description:
    "How SmileFlow compares to SmileSnap and other virtual dental consultation tools: pricing, response speed, and lead-capture design.",
  alternates: { canonical: `${SITE_URL}/compare` },
};

const rows: [string, string, string][] = [
  ["Pricing model", "Flat $149/month, unlimited analyses and leads", "Subscription plus roughly $25 per consultation"],
  ["Response time", "AI report in seconds", "Async — a team member reviews photos, reply may take hours to days"],
  ["Setup", "One script tag, self-serve", "Onboarding process with the vendor"],
  ["Lead capture", "Built-in gated report (name, email, phone before results)", "Consultation request form"],
  ["Languages", "English, Serbian (French, German, Spanish planned)", "Primarily English"],
  ["Best for", "Clinics that want instant, always-on AI feedback at a fixed cost", "Practices that want a human-reviewed premium consult experience"],
];

const faqs = [
  {
    q: "Is SmileFlow a replacement for SmileSnap?",
    a: "SmileFlow and SmileSnap solve the same problem — turning website visitors into dental leads — with different mechanics. SmileFlow returns an instant AI report and charges a flat unlimited fee; SmileSnap centers on human-reviewed virtual consultations with a per-consult charge on top of its subscription. Clinics choose based on whether they want instant AI feedback or a human-reviewed premium experience.",
  },
  {
    q: "Which is cheaper, SmileFlow or SmileSnap?",
    a: "At published rates, SmileFlow is flat-fee and unlimited starting at $149 per month. SmileSnap's public pricing has referenced roughly $2,499 per year plus about $25 per consultation, which means cost rises with volume. A clinic running high visitor volume will generally find SmileFlow's flat pricing cheaper per lead as volume grows.",
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#FDFCFB] px-6 md:px-12 py-24 md:py-32">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      <div className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-6">
          <Link href="/" className="text-[10px] uppercase tracking-widest font-bold text-[#C5A038]">
            &larr; SmileFlow
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">SmileFlow vs SmileSnap</h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Both are AI/virtual smile assessment widgets for dental clinic websites. Here is how they
            differ on pricing, speed, and lead capture, based on each vendor&apos;s publicly stated pricing
            and product design as of 2026.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="p-4 text-xs uppercase tracking-widest font-bold text-white/50">Dimension</th>
                <th className="p-4 text-xs uppercase tracking-widest font-bold text-[#C5A038]">SmileFlow</th>
                <th className="p-4 text-xs uppercase tracking-widest font-bold text-white/50">SmileSnap</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5">
                  {row.map((cell, j) => (
                    <td key={j} className={`p-4 text-sm leading-relaxed ${j === 0 ? "text-white/50 font-bold" : "text-white/80"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-10">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-2 border-b border-white/5 pb-8 last:border-0">
              <h2 className="text-xl md:text-2xl font-bold">{faq.q}</h2>
              <p className="text-white/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-white/30 leading-relaxed">
          Pricing and feature comparisons reflect publicly available information at the time of writing and
          may change. SmileSnap is a trademark of its respective owner; this page is an independent
          comparison and is not affiliated with or endorsed by SmileSnap.
        </p>

        <div className="pt-8">
          <a href={`mailto:croolstudio@gmail.com?subject=${encodeURIComponent("SmileFlow — install on my clinic website")}`} className="luxury-button">
            Try SmileFlow
          </a>
        </div>
      </div>
    </div>
  );
}
