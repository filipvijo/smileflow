import Link from "next/link";
import { breadcrumbJsonLd, CONTENT_DATES, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL, LEGAL_NAME } from "@/lib/site";

const title = "SmileFlow privacy policy";
const description = "How Fluxora LTD and SmileFlow collect, use, disclose and safeguard smile photos, contact details and service information.";
const path = "/privacy";

export const metadata = createPageMetadata({ title, description, path });

export default function PrivacyPage() {
  return (
    <main className="editorial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy", path }])) }} />
      <article className="editorial-wrap editorial-wrap-narrow">
        <header className="editorial-hero">
          <Link href="/" className="editorial-back">&larr; SmileFlow</Link>
          <div className="editorial-meta">Last updated {CONTENT_DATES.privacy}</div>
          <h1>Privacy, explained in <em>plain language.</em></h1>
          <p>
            {LEGAL_NAME}, trading as SmileFlow (“SmileFlow”, “we”, “our” or “us”), is committed to
            protecting personal data. For the SmileFlow website and our direct business relationships,
            {` ${LEGAL_NAME}`} is the Data Controller under the UK GDPR and Data Protection Act 2018.
          </p>
        </header>

        <div className="editorial-prose legal-copy">
          <h2>1. Scope and clinic responsibilities</h2>
          <p>
            This policy covers the SmileFlow website, checkout and AI smile-analysis service. When a dental
            clinic places SmileFlow on its website and receives a visitor&apos;s contact details, that clinic
            may also act as an independent controller. Its own privacy notice and professional obligations
            apply to the information it receives.
          </p>

          <h2>2. Information we process</h2>
          <ul>
            <li><strong>Identity and contact data:</strong> name, email address, optional phone number, clinic selection and consent choice.</li>
            <li><strong>Submitted content:</strong> a smile photograph and the aesthetic orientation generated from it.</li>
            <li><strong>Business and billing data:</strong> clinic or agency details and transaction information supplied through Stripe.</li>
            <li><strong>Technical data:</strong> IP address and limited request information used for delivery, security, fraud prevention and rate limiting.</li>
          </ul>

          <h2>3. How smile photographs are handled</h2>
          <p>
            A submitted photograph is received for the requested analysis, converted in memory and sent
            to Google&apos;s Gemini API for model processing. The current SmileFlow application does not write
            the image to a SmileFlow database or file-storage system. Infrastructure and AI providers may
            process request data under their own contractual terms, security controls and retention practices.
          </p>

          <h2>4. Legal bases for processing</h2>
          <ul>
            <li><strong>Performance of a contract:</strong> to provide subscriptions, setup, support and requested SmileFlow services.</li>
            <li><strong>Explicit consent:</strong> to process a submitted smile photograph and to send contact details to the selected clinic for follow-up.</li>
            <li><strong>Legitimate interests:</strong> to secure the service, prevent fraud and abuse, troubleshoot failures and improve reliability.</li>
            <li><strong>Legal obligations:</strong> where we must retain or disclose information for tax, accounting, regulatory or lawful-request purposes.</li>
          </ul>
          <p>You may withdraw consent before submission by not using the analysis. After submission, contact us and the receiving clinic if you want to exercise a data protection right.</p>

          <h2>5. How we use information</h2>
          <ul>
            <li>Provide the requested AI-generated aesthetic orientation.</li>
            <li>Send consented contact details and a compact report summary to the chosen clinic.</li>
            <li>Process subscriptions, deliver onboarding and provide support.</li>
            <li>Protect service availability, enforce limits and investigate misuse.</li>
            <li>Meet legal, tax and accounting requirements.</li>
          </ul>

          <h2>6. Service providers and disclosures</h2>
          <p>We do not sell personal data. We may disclose the minimum necessary information to:</p>
          <ul>
            <li><strong>Google Gemini API:</strong> image analysis and report generation.</li>
            <li><strong>Resend:</strong> delivery of lead, onboarding and service emails.</li>
            <li><strong>Stripe:</strong> subscription checkout, billing and payment processing.</li>
            <li><strong>Hosting and security providers:</strong> delivery, operational logging and abuse prevention.</li>
            <li><strong>The selected dental clinic:</strong> contact details and analysis context after explicit consent.</li>
            <li><strong>Authorities or advisers:</strong> where required by law, to protect legal rights or in connection with a corporate transaction.</li>
          </ul>

          <h2>7. International transfers</h2>
          <p>
            Some providers may process data outside the United Kingdom or European Economic Area. Where
            required, we use recognised safeguards such as adequacy regulations, standard contractual
            clauses or the UK International Data Transfer Agreement or Addendum.
          </p>

          <h2>8. Retention and security</h2>
          <p>
            Smile photographs are not intentionally persisted in SmileFlow application storage. Contact,
            billing, email-delivery and operational information is retained only as long as necessary for
            service delivery, security, legal obligations and dispute resolution. Receiving clinics and
            service providers apply their own documented retention periods. We use technical and organisational
            measures appropriate to the service, but no internet service can guarantee absolute security.
          </p>

          <h2>9. Your data protection rights</h2>
          <p>Depending on your location and applicable law, you may have rights to:</p>
          <ul>
            <li>Access the personal data held about you.</li>
            <li>Correct inaccurate or incomplete data.</li>
            <li>Request erasure or restriction of processing.</li>
            <li>Object to processing based on legitimate interests.</li>
            <li>Receive portable data where applicable.</li>
            <li>Withdraw consent without affecting earlier lawful processing.</li>
            <li>Complain to a data protection authority.</li>
          </ul>
          <p>
            To exercise a right, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. If a clinic
            received your submission, contact that clinic as well. UK users may complain to the Information
            Commissioner&apos;s Office at <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
          </p>

          <h2>10. Children</h2>
          <p>
            SmileFlow is not intended for children under 18, and we do not knowingly invite children to
            submit photographs or contact information. If you believe a child has submitted information,
            contact us so we can investigate and take appropriate action.
          </p>

          <h2>11. Healthcare and sensitive information</h2>
          <p>
            SmileFlow provides an aesthetic orientation and is not a diagnostic service. Do not upload
            medical records, radiographs or unrelated sensitive documents. Clinics are responsible for
            determining whether their implementation meets applicable professional, contractual and data
            protection requirements.
          </p>

          <h2>12. Changes and contact</h2>
          <p>
            We will update the date above when this policy materially changes. Questions can be sent to
            {` `}<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.<br />
            <strong>{LEGAL_NAME}</strong><br />United Kingdom
          </p>
        </div>

        <aside className="editorial-callout">
          <h2>The short version</h2>
          <p>The photo is processed for the requested AI orientation and is not written to SmileFlow storage. Contact details are sent to the chosen clinic only after consent. External providers still participate in processing, so “not stored by SmileFlow” does not mean “never processed anywhere.”</p>
        </aside>
      </article>
    </main>
  );
}
