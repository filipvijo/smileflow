import Link from "next/link";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  CONTENT_DATES,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const title = "SmileFlow vs SmileSnap: dental smile assessment comparison";
const description =
  "Compare SmileFlow and SmileSnap on workflow, response speed, lead capture and currently published pricing for dental clinics.";
const path = "/compare";

export const metadata = createPageMetadata({ title, description, path });

const smileSnapPricingUrl = "https://www.smilesnap.com/pricing";

const rows: [string, string, string][] = [
  ["Clinic pricing", "$149/month with unlimited analyses and leads", "$249/month Starter or $2,490/year, with 25 consults included"],
  ["Additional consults", "No per-analysis or per-lead fee", "$25 per additional consult on published plans"],
  ["Response model", "Automated AI orientation returned in seconds", "Clinic team reviews the submission and responds asynchronously"],
  ["Setup", "One script tag for the clinic website", "Vendor account, widget configuration and clinic workflow setup"],
  ["Lead capture", "Contact details and consent are collected before the full report", "Virtual consultation request and patient intake workflow"],
  ["Best fit", "Clinics wanting an instant, always-on first step at a fixed cost", "Practices wanting staff-led virtual consultation and treatment coordination"],
];

const faqs = [
  {
    q: "Is SmileFlow a replacement for SmileSnap?",
    a: "Not in every workflow. SmileFlow is designed for instant AI-generated aesthetic orientation and lead capture. SmileSnap is designed around a clinic-led virtual consultation workflow. The right choice depends on whether the practice wants immediate automated engagement or a staff-reviewed consultation process.",
  },
  {
    q: "Which platform has the more predictable cost?",
    a: "SmileFlow uses a flat $149 monthly clinic plan with unlimited analyses and leads. SmileSnap currently publishes tiered plans, included consult limits and a $25 charge for additional consults. Clinics should confirm current SmileSnap terms directly before purchasing.",
  },
];

const article = articleJsonLd({
  headline: title,
  description,
  path,
  datePublished: CONTENT_DATES.compare,
  about: ["Dental virtual consultations", "AI smile analysis", "Dental lead generation software"],
  citations: [smileSnapPricingUrl],
});

export default function ComparePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <main className="editorial-page">
      {[article, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Comparison", path }]), faqJsonLd].map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
      ))}

      <div className="editorial-wrap">
        <div className="editorial-hero">
          <Link href="/" className="editorial-back">&larr; SmileFlow</Link>
          <div className="editorial-meta">Independent comparison · Reviewed {CONTENT_DATES.compare}</div>
          <h1>SmileFlow vs <em>SmileSnap</em></h1>
          <p>
            Both products help dental websites turn visitor interest into consultation opportunities,
            but they use different workflows. This comparison separates verified public facts from
            our interpretation of which clinic each approach may suit.
          </p>
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr><th>Dimension</th><th>SmileFlow</th><th>SmileSnap</th></tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => <td key={cell} className={index === 0 ? "dimension" : ""}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="editorial-callout">
          <h2>Source and methodology</h2>
          <p>
            SmileFlow details reflect the current product and published checkout pricing. SmileSnap
            pricing and plan limits were checked against its official pricing page on {CONTENT_DATES.compare}.
            Product terms can change, so verify them before making a purchasing decision.
          </p>
          <a href={smileSnapPricingUrl} target="_blank" rel="noopener noreferrer" className="source-link">
            View SmileSnap&apos;s official pricing page ↗
          </a>
        </section>

        <div className="editorial-faqs">
          {faqs.map((faq) => <div key={faq.q}><h2>{faq.q}</h2><p>{faq.a}</p></div>)}
        </div>

        <p className="editorial-disclaimer">
          SmileSnap is a trademark of its respective owner. This independent comparison is not
          affiliated with or endorsed by SmileSnap. No feature or pricing claim should replace a
          vendor&apos;s current contract or product documentation.
        </p>

        <div className="editorial-actions">
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("SmileFlow — install on my clinic website")}`} className="button button-primary">Try SmileFlow</a>
          <Link href="/resources" className="text-link">Explore dental growth resources →</Link>
        </div>
      </div>
    </main>
  );
}
