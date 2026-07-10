import Link from "next/link";
import { breadcrumbJsonLd, CONTENT_DATES, createPageMetadata, serializeJsonLd } from "@/lib/seo";

const title = "Dental growth resources and AI smile analysis guides";
const description = "Practical, source-conscious guides for dental clinics evaluating AI smile analysis, website conversion and lead acquisition.";
const path = "/resources";

export const metadata = createPageMetadata({ title, description, path });

const resources = [
  {
    href: "/guides/ai-smile-analysis-dental-clinics",
    label: "Technology guide",
    title: "AI smile analysis for dental clinics",
    text: "What it can do, where clinical responsibility begins and how to evaluate a patient-facing tool.",
  },
  {
    href: "/guides/dental-website-lead-generation",
    label: "Conversion guide",
    title: "Dental website lead generation",
    text: "A practical framework for moving from anonymous traffic to qualified consultation opportunities.",
  },
  {
    href: "/dental-lead-costs",
    label: "Research brief",
    title: "Dental lead costs in 2026",
    text: "Source-linked CPC, CPL and budget ranges with the caveats clinics need to interpret them correctly.",
  },
  {
    href: "/compare",
    label: "Independent comparison",
    title: "SmileFlow vs SmileSnap",
    text: "Verified public pricing and a clear comparison of automated and staff-led consultation workflows.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path }])) }}
      />
      <div className="editorial-wrap">
        <header className="editorial-hero">
          <Link href="/" className="editorial-back">&larr; SmileFlow</Link>
          <div className="editorial-meta">Knowledge centre · Reviewed {CONTENT_DATES.resources}</div>
          <h1>Useful answers for clinics that want <em>better website growth.</em></h1>
          <p>
            Evidence-aware explanations for dental owners, marketers and agencies. No inflated case
            studies, invented benchmarks or medical claims—just clear frameworks and linked sources.
          </p>
        </header>

        <section className="resource-grid" aria-label="SmileFlow resources">
          {resources.map((resource) => (
            <Link href={resource.href} key={resource.href} className="resource-card">
              <span>{resource.label}</span>
              <h2>{resource.title}</h2>
              <p>{resource.text}</p>
              <strong>Read resource →</strong>
            </Link>
          ))}
        </section>

        <aside className="editorial-callout">
          <h2>Our publishing standard</h2>
          <p>
            We distinguish product facts, third-party benchmarks and our own interpretation. Pages
            show review dates, link to sources and avoid presenting orientation as diagnosis. As real
            clinic outcome data becomes available, we will publish the methodology alongside it.
          </p>
        </aside>
      </div>
    </main>
  );
}
