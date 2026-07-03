import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dental lead costs 2026 — Google Ads CPC and cost per lead data",
  description:
    "How much dental clinics pay per click and per lead on Google Ads in 2026, with sourced figures for implants, veneers, and Invisalign keywords.",
  alternates: { canonical: `${SITE_URL}/dental-lead-costs` },
};

const stats = [
  {
    stat: "$5.89–$10.60",
    label: "Average cost per click for dental Google Ads in 2026",
    source: "KeyGrow, Google Ads cost for dentists (2026)",
  },
  {
    stat: "$15–$50",
    label: "Cost per click for dental implant keywords, up to $30–$60 in competitive metros",
    source: "DentalFast, real cost of Google Ads for dentists (2026)",
  },
  {
    stat: "$50–$85",
    label: "Average cost per lead via dental search ads",
    source: "CausalFunnel, Google Ads for dentists 2026 guide",
  },
  {
    stat: "$106–$119",
    label: "Average cost per lead via Google Local Services Ads",
    source: "CausalFunnel, Google Ads for dentists 2026 guide",
  },
  {
    stat: "$1,500–$4,000",
    label: "Typical monthly ad budget for a single-location dental practice",
    source: "Dentx, Google Ads for dentists (2026)",
  },
];

export default function DentalLeadCostsPage() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#FDFCFB] px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="space-y-6">
          <Link href="/" className="text-[10px] uppercase tracking-widest font-bold text-[#C5A038]">
            &larr; SmileFlow
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            How much do dental clinics pay per lead in 2026?
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Dental practices are among the most expensive lead buyers on Google Ads. Below are the current
            published cost figures for cost-per-click and cost-per-lead across common dental keyword
            categories, each with its source.
          </p>
        </div>

        <div className="space-y-6">
          {stats.map((s, i) => (
            <div key={i} className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="text-3xl md:text-4xl font-bold tracking-tighter text-[#C5A038] mb-2">{s.stat}</div>
              <p className="text-white/80 text-base leading-relaxed mb-2">{s.label}</p>
              <p className="text-xs text-white/30">Source: {s.source}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-white/5 pt-10">
          <h2 className="text-2xl font-bold">Why this matters for lead-generation tools</h2>
          <p className="text-white/60 leading-relaxed">
            Because a single dental lead can cost $50 to over $100 through paid search, and Local Services
            Ads leads can exceed $100 each, tools that convert existing website traffic into leads without
            an additional per-lead charge — such as a flat-fee smile analysis widget — can substantially
            lower a clinic&apos;s blended cost per lead once traffic volume is factored in.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/compare" className="text-[#C5A038] font-bold text-sm uppercase tracking-widest">
            See how SmileFlow compares to other smile assessment tools &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
