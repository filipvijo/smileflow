import Link from "next/link";
import { breadcrumbJsonLd, CONTENT_DATES, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const title = "SmileFlow security and responsible AI practices";
const description = "Current technical safeguards, data-minimization choices and responsible-use boundaries for SmileFlow.";
const path = "/security";

export const metadata = createPageMetadata({ title, description, path });

export default function SecurityPage() {
  return (
    <main className="editorial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Security", path }])) }} />
      <article className="editorial-wrap editorial-wrap-narrow">
        <header className="editorial-hero">
          <Link href="/" className="editorial-back">&larr; SmileFlow</Link>
          <div className="editorial-meta">Security overview · Reviewed {CONTENT_DATES.security}</div>
          <h1>Designed to reduce exposure, <em>not hide it behind slogans.</em></h1>
          <p>
            This page describes safeguards visible in the current product. It is not a certification,
            penetration-test report or claim of compliance with every healthcare privacy regime.
          </p>
        </header>

        <div className="editorial-prose">
          <h2>Data minimization</h2>
          <p>
            Smile images are processed within the request and are not written to a SmileFlow database or
            file store. Lead submissions contain only the contact fields, consent state and compact analysis
            context needed for clinic follow-up.
          </p>

          <h2>Input and abuse controls</h2>
          <ul>
            <li>Image uploads are required to identify as images and are limited to 8 MB.</li>
            <li>Analysis and lead endpoints use per-IP rate limits.</li>
            <li>Clinic analysis volume is subject to a daily limit.</li>
            <li>Lead payloads are validated and bounded before email delivery.</li>
            <li>Embedded widgets check the requesting host against the clinic configuration.</li>
          </ul>

          <h2>Clinical-safety boundaries</h2>
          <p>
            The model prompt and patient-facing report state that the result is orientational, not a
            diagnosis. Recommendations require a licensed dentist, in-person examination and appropriate
            imaging. The product is designed to avoid alarming or judgmental output.
          </p>

          <h2>External providers</h2>
          <p>
            Google&apos;s Gemini API processes submitted images, Resend delivers emails, Stripe processes
            checkout and the deployment platform handles web delivery. Their controls and service terms
            form part of the overall security posture. Clinics should review those dependencies when
            assessing regulatory suitability.
          </p>

          <h2>Reporting a concern</h2>
          <p>
            Please send suspected vulnerabilities or security concerns to{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=SmileFlow%20security%20report`}>{CONTACT_EMAIL}</a>.
            Include the affected URL, reproduction steps and impact. Do not include real patient data in a report.
          </p>
        </div>

        <aside className="editorial-callout">
          <h2>What we do not claim</h2>
          <p>SmileFlow does not present this page as proof of HIPAA, GDPR or other formal certification. Regulatory suitability depends on deployment, contracts, clinic workflow, jurisdiction and the data actually submitted.</p>
        </aside>

        <div className="editorial-actions">
          <Link href="/privacy" className="button button-primary">Read the privacy notice</Link>
          <Link href="/guides/ai-smile-analysis-dental-clinics" className="text-link">Read the responsible AI guide →</Link>
        </div>
      </article>
    </main>
  );
}
