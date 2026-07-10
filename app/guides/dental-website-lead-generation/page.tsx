import Link from "next/link";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  CONTENT_DATES,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

const title = "Dental website lead generation: a conversion framework";
const description = "A practical framework for helping dental clinic websites convert more visitors into qualified consultation opportunities.";
const path = "/guides/dental-website-lead-generation";

export const metadata = createPageMetadata({ title, description, path });

const article = articleJsonLd({
  headline: title,
  description,
  path,
  datePublished: CONTENT_DATES.dentalWebsiteLeadGuide,
  about: ["Dental website conversion", "Dental lead generation", "Cosmetic dentistry marketing"],
});

export default function DentalWebsiteLeadGuide() {
  return (
    <main className="editorial-page">
      {[article, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Dental website lead generation", path }])].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}
      <article className="editorial-wrap editorial-wrap-narrow">
        <header className="editorial-hero">
          <Link href="/resources" className="editorial-back">&larr; Resources</Link>
          <div className="editorial-meta">Conversion guide · Reviewed {CONTENT_DATES.dentalWebsiteLeadGuide}</div>
          <h1>A dental website should create <em>the next conversation.</em></h1>
          <p>
            Traffic is only the first input. The website must help a visitor recognize relevance,
            reduce uncertainty and take a meaningful next step while their motivation is active.
          </p>
        </header>

        <div className="editorial-prose">
          <h2>Start with intent, not page views</h2>
          <p>
            A visitor researching veneers behaves differently from someone seeking emergency care or
            comparing routine check-ups. Match the page, proof and call to action to that intent. One
            generic “Contact us” button forces every visitor into the same decision regardless of readiness.
          </p>

          <h2>The five-stage conversion path</h2>
          <ol>
            <li><strong>Relevance:</strong> make the treatment, location and patient problem immediately clear.</li>
            <li><strong>Confidence:</strong> show the clinicians, real environment, process, limitations and credible outcomes.</li>
            <li><strong>Participation:</strong> offer a useful action such as a suitability questionnaire or smile orientation.</li>
            <li><strong>Permission:</strong> explain what happens to submitted information and obtain clear consent.</li>
            <li><strong>Follow-up:</strong> respond quickly with context and a specific appointment path.</li>
          </ol>

          <h2>Use the right conversion metric</h2>
          <p>
            Form completion rate can reward low-quality submissions. Track the complete sequence:
            engaged visitor → qualified lead → contacted lead → booked consultation → attended consultation
            → accepted treatment. The most useful optimization target is usually the weakest transition.
          </p>

          <h2>What to test first</h2>
          <p>
            Begin with message clarity, mobile speed, treatment-specific proof and the distance between
            interest and action. Test one material change at a time. For interactive tools, compare both
            completion quality and downstream booking—not just the number of people who start.
          </p>

          <h2>How SmileFlow contributes</h2>
          <p>
            SmileFlow gives cosmetic-dentistry visitors a relevant action before they are ready to call.
            The resulting lead includes treatment context, allowing clinic teams to begin a warmer and
            more specific follow-up. It complements acquisition and booking systems; it does not replace them.
          </p>
        </div>

        <aside className="editorial-callout">
          <h2>A useful reporting formula</h2>
          <p>Report cost per qualified lead, booking rate, attendance rate and accepted-case value by source. Keep assumptions separate from observed results, especially when using an ROI calculator.</p>
        </aside>

        <div className="editorial-actions">
          <Link href="/dental-lead-costs" className="button button-primary">See 2026 cost benchmarks</Link>
          <Link href="/#roi" className="text-link">Explore the illustrative calculator →</Link>
        </div>
      </article>
    </main>
  );
}
