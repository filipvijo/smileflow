import Link from "next/link";
import { breadcrumbJsonLd, CONTENT_DATES, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL, LEGAL_NAME } from "@/lib/site";

const title = "SmileFlow terms of use";
const description = "Terms governing access to and use of the SmileFlow website, subscriptions and AI smile-analysis service.";
const path = "/terms";

export const metadata = createPageMetadata({ title, description, path });

export default function TermsPage() {
  return (
    <main className="editorial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path }])) }} />
      <article className="editorial-wrap editorial-wrap-narrow">
        <header className="editorial-hero">
          <Link href="/" className="editorial-back">&larr; SmileFlow</Link>
          <div className="editorial-meta">Last updated {CONTENT_DATES.terms}</div>
          <h1>Terms built for a clear <em>working relationship.</em></h1>
          <p>
            These Terms of Use govern access to SmileFlow, operated by {LEGAL_NAME}, a company registered
            in the United Kingdom. By accessing, purchasing or using the Service, you agree to these Terms.
          </p>
        </header>

        <div className="editorial-prose legal-copy">
          <h2>1. Acceptance and eligibility</h2>
          <p>
            If you do not agree to these Terms, do not use the Service. You must be at least 18 years old
            and legally able to enter a binding contract. If you use SmileFlow for a clinic, agency or other
            organisation, you confirm that you have authority to bind that organisation.
          </p>

          <h2>2. Description of the Service</h2>
          <p>
            SmileFlow provides a website widget that processes a visitor&apos;s smile photograph, generates
            an AI-based orientation of visible aesthetic possibilities and, after consent, sends contact
            information and report context to a selected dental clinic. We may provide setup, branding,
            language configuration and related support according to the purchased plan.
          </p>

          <h2>3. Medical and clinical disclaimer</h2>
          <p>
            <strong>SmileFlow is not a substitute for professional dental advice, diagnosis or treatment.</strong>
            The Service is an informational and patient-engagement tool and is not intended to operate as a
            medical device or create a dentist–patient relationship. A photograph cannot establish oral
            health, treatment suitability or clinical outcome. Every recommendation requires evaluation by
            a licensed dentist, including an appropriate examination and imaging where necessary.
          </p>

          <h2>4. Clinic and agency responsibilities</h2>
          <ul>
            <li>Provide accurate clinic, contact, booking and website information.</li>
            <li>Use leads lawfully and only for the consented consultation purpose.</li>
            <li>Provide appropriate clinical review and avoid presenting AI output as diagnosis.</li>
            <li>Maintain your own privacy notice, patient communications and regulatory compliance.</li>
            <li>Keep installation details secure and notify us of suspected misuse.</li>
            <li>Ensure marketing claims made around SmileFlow are accurate and supportable.</li>
          </ul>

          <h2>5. Subscriptions, billing and cancellation</h2>
          <p>
            Paid plans are billed through Stripe at the price and interval shown at checkout. Unless stated
            otherwise, subscriptions renew automatically until cancelled. You authorise Stripe to charge
            the selected payment method for recurring fees and applicable taxes. You may cancel through the
            billing method made available to you or by contacting us. Cancellation stops future renewals but
            does not automatically refund amounts already paid, except where required by law or expressly agreed.
          </p>
          <p>We may change pricing for a future renewal by giving reasonable notice. Failure to pay may result in suspension or removal of the widget.</p>

          <h2>6. Submitted content and permission to process it</h2>
          <p>
            You retain rights in content you submit. You grant {LEGAL_NAME} a limited, non-exclusive,
            worldwide licence to receive, transmit and process that content only as needed to operate,
            secure and support the Service. You confirm that you have the necessary rights and permissions
            to submit the content. SmileFlow does not claim ownership of patient photographs.
          </p>

          <h2>7. Acceptable use</h2>
          <p>You must not:</p>
          <ul>
            <li>Use the Service for diagnosis, emergency care or unlawful healthcare activity.</li>
            <li>Upload content belonging to another person without authority or consent.</li>
            <li>Submit medical records, radiographs, malicious files or unrelated sensitive documents.</li>
            <li>Attempt to bypass usage limits, access another clinic&apos;s configuration or interfere with security.</li>
            <li>Reverse engineer, resell or copy the Service except as expressly permitted by an agency plan or written agreement.</li>
            <li>Use automated means to abuse the analysis endpoint or consume resources disproportionately.</li>
          </ul>

          <h2>8. Intellectual property</h2>
          <p>
            SmileFlow software, branding, design, documentation and original site content are owned by or
            licensed to {LEGAL_NAME}. These Terms grant only the limited right to use the Service during an
            active subscription. No ownership rights are transferred.
          </p>

          <h2>9. Privacy and third-party services</h2>
          <p>
            Use of SmileFlow is governed by our <Link href="/privacy">Privacy Policy</Link>. The Service
            relies on third-party providers including Google, Resend, Stripe and hosting infrastructure.
            Their services may be governed by separate terms and privacy notices. We are not responsible
            for independent clinic systems or third-party websites linked from SmileFlow.
          </p>

          <h2>10. Availability and changes</h2>
          <p>
            We aim to provide a reliable service but do not guarantee uninterrupted or error-free operation.
            We may maintain, modify, replace or discontinue features where reasonably necessary. We may
            suspend access to protect patients, clinics, the Service or third parties, or where these Terms
            are breached.
          </p>

          <h2>11. Disclaimer of warranties</h2>
          <p>
            To the fullest extent permitted by law, the Service is provided “as is” and “as available”. We
            do not warrant that AI output will be complete, accurate, clinically appropriate or suitable
            for a particular purpose, or that use of the Service will generate any minimum number of leads,
            consultations, patients or revenue.
          </p>

          <h2>12. Limitation of liability</h2>
          <p>Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any liability that cannot lawfully be excluded.</p>
          <p>
            Subject to that, {LEGAL_NAME} will not be liable for indirect, incidental, special, consequential
            or exemplary loss, including loss of profit, goodwill, business opportunity or data. Our total
            aggregate liability arising from the Service or these Terms is limited to the amount you paid for
            the Service in the 12 months preceding the claim, or £50, whichever is greater.
          </p>

          <h2>13. Termination</h2>
          <p>
            You may stop using the Service and cancel your subscription. We may suspend or terminate access
            for material breach, non-payment, unlawful use, security risk or where continuing the Service is
            no longer reasonably possible. Clauses intended to survive termination—including intellectual
            property, disclaimers, liability and governing law—will continue to apply.
          </p>

          <h2>14. Changes to these Terms</h2>
          <p>
            We may update these Terms. Material changes will be communicated by a reasonable method. Continued
            use after updated Terms take effect constitutes acceptance where permitted by law.
          </p>

          <h2>15. Governing law and contact</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Courts in England and Wales have
            exclusive jurisdiction, except where mandatory consumer law provides otherwise. Questions may
            be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.<br />
            <strong>{LEGAL_NAME}</strong><br />United Kingdom
          </p>
        </div>

        <aside className="editorial-callout">
          <h2>Important</h2>
          <p>SmileFlow creates consultation opportunities, not clinical conclusions or guaranteed business outcomes. Clinics remain responsible for professional judgment, patient communication and lawful follow-up.</p>
        </aside>
      </article>
    </main>
  );
}
