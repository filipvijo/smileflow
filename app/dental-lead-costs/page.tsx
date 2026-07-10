import Link from "next/link";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  CONTENT_DATES,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

const title = "Dental lead costs in 2026: CPC, CPL and budget benchmarks";
const description =
  "A source-linked overview of published 2026 dental Google Ads cost-per-click, cost-per-lead and monthly budget ranges.";
const path = "/dental-lead-costs";

export const metadata = createPageMetadata({ title, description, path });

const sources = {
  dentx: "https://dentx.ca/blog/google-ads-for-dentists/",
  causalFunnel: "https://www.causalfunnel.com/blog/google-ads-for-dentists-in-2026-the-complete-guide-to-maximize-roi-and-new-patients/",
  dentalLeadMachine: "https://www.dentalleadmachine.com/blog/google-ads-dental-implants",
};

const stats = [
  { stat: "$3–$15", label: "Published typical dental keyword cost per click, varying by market and intent", source: "Dentx", href: sources.dentx },
  { stat: "$8–$20+", label: "Published range for high-intent terms such as emergency dentistry and implants", source: "Dentx", href: sources.dentx },
  { stat: "$15–$50", label: "Published dental implant search cost per click in many US markets", source: "Dental Lead Machine", href: sources.dentalLeadMachine },
  { stat: "$50–$85", label: "Published average cost-per-lead range for dental Google Ads", source: "CausalFunnel", href: sources.causalFunnel },
  { stat: "$1k–$8k+", label: "Published monthly budget range from rural to competitive urban practices", source: "Dentx", href: sources.dentx },
];

const article = articleJsonLd({
  headline: title,
  description,
  path,
  datePublished: CONTENT_DATES.dentalLeadCosts,
  about: ["Dental lead generation cost", "Dental Google Ads", "Dental marketing benchmarks"],
  citations: Object.values(sources),
});

export default function DentalLeadCostsPage() {
  return (
    <main className="editorial-page">
      {[article, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Dental lead costs", path }])].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}

      <article className="editorial-wrap editorial-wrap-narrow">
        <header className="editorial-hero">
          <Link href="/" className="editorial-back">&larr; SmileFlow</Link>
          <div className="editorial-meta">Research brief · Reviewed {CONTENT_DATES.dentalLeadCosts}</div>
          <h1>How much do dental clinics pay per <em>lead in 2026?</em></h1>
          <p>
            There is no universal dental cost per lead. Location, treatment value, keyword intent,
            landing-page quality and follow-up speed all change the outcome. These are published
            market ranges—not promises or SmileFlow campaign results.
          </p>
        </header>

        <div className="stat-stack">
          {stats.map((stat) => (
            <article key={`${stat.stat}-${stat.label}`} className="stat-card">
              <div>{stat.stat}</div>
              <p>{stat.label}</p>
              <a href={stat.href} target="_blank" rel="noopener noreferrer" className="source-link">
                Source: {stat.source} ↗
              </a>
            </article>
          ))}
        </div>

        <section className="editorial-prose">
          <h2>How to interpret these numbers</h2>
          <p>
            A lead is not the same as a booked patient, and a booked patient is not the same as an
            accepted case. Compare acquisition channels at the same stage of the funnel. If paid
            search reports form submissions while another tool reports booked consultations, their
            costs are not directly comparable.
          </p>
          <h2>Where a website conversion tool fits</h2>
          <p>
            A conversion tool does not replace traffic acquisition. Its job is to create more useful
            actions from visitors the clinic already paid for or earned organically. Measure its
            incremental effect using qualified leads, booked consultations and accepted treatment—not
            upload volume alone.
          </p>
        </section>

        <aside className="editorial-callout">
          <h2>Methodology</h2>
          <p>
            We reviewed publicly accessible 2026 guides from dental marketing providers and retained
            only ranges we could link directly. These figures are directional and should be replaced
            by a clinic&apos;s own advertising and booking data whenever available.
          </p>
        </aside>

        <div className="editorial-actions">
          <Link href="/guides/dental-website-lead-generation" className="button button-primary">Read the conversion guide</Link>
          <Link href="/compare" className="text-link">Compare smile assessment tools →</Link>
        </div>
      </article>
    </main>
  );
}
