import Link from "next/link";
import { breadcrumbJsonLd, CONTENT_DATES, createPageMetadata, serializeJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const title = "About SmileFlow";
const description = "Why SmileFlow exists, how we approach responsible AI smile analysis and how to contact the team.";
const path = "/about";

export const metadata = createPageMetadata({ title, description, path });

export default function AboutPage() {
  return (
    <main className="editorial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path }])) }} />
      <div className="editorial-wrap editorial-wrap-narrow">
        <header className="editorial-hero">
          <Link href="/" className="editorial-back">&larr; SmileFlow</Link>
          <div className="editorial-meta">Company · Reviewed {CONTENT_DATES.about}</div>
          <h1>We build for the moment when <em>curiosity becomes action.</em></h1>
          <p>
            SmileFlow is a patient-acquisition product for dental clinics and dental marketing agencies.
            It turns a passive website visit into an informed, consent-based consultation opportunity.
          </p>
        </header>

        <div className="editorial-prose">
          <h2>Why we built it</h2>
          <p>
            Cosmetic-dentistry visitors often need a low-pressure first step before they are ready to
            telephone a clinic. Traditional contact forms collect details but provide little immediate
            value. SmileFlow gives the visitor a useful orientation while giving the clinic context for
            a better follow-up conversation.
          </p>
          <h2>Our operating principles</h2>
          <ul>
            <li><strong>Orientation, never diagnosis.</strong> A licensed dentist and clinical examination remain essential.</li>
            <li><strong>Data minimization.</strong> The current product processes photos without writing them to a SmileFlow database or file store.</li>
            <li><strong>Consent before contact.</strong> Visitors explicitly agree before their details are sent to the clinic.</li>
            <li><strong>Claims with evidence.</strong> We label estimates, link third-party benchmarks and will publish real outcome methodology with future case studies.</li>
          </ul>
          <h2>Contact</h2>
          <p>
            Product, clinic setup, agency and privacy enquiries can be sent to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>

        <div className="editorial-actions">
          <Link href="/resources" className="button button-primary">Explore our resources</Link>
          <Link href="/security" className="text-link">Review security practices →</Link>
        </div>
      </div>
    </main>
  );
}
