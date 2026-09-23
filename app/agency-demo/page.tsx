import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Code2, LockKeyhole, Palette, ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/site";

const title = "White-label SmileFlow for dental agencies";
const description =
  "A one-minute walkthrough of SmileFlow: a white-label website experience dental agencies can deploy across client websites.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/agency-demo` },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/agency-demo`,
    title,
    description,
    images: [
      {
        url: `${SITE_URL}/media/smileflow-agency-demo-poster.jpg`,
        width: 1920,
        height: 1080,
        alt: "SmileFlow white-label agency walkthrough",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}/media/smileflow-agency-demo-poster.jpg`],
  },
};

const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("SmileFlow agency access")}`;

const agencyBenefits = [
  {
    icon: Palette,
    title: "Your brand in front",
    copy: "Present the experience under your agency or client identity, not as another disconnected tool.",
  },
  {
    icon: Code2,
    title: "One script to deploy",
    copy: "Install on WordPress, Wix, Squarespace or a custom website without rebuilding the client site.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible positioning",
    copy: "The experience is explicitly non-diagnostic and keeps the dentist central to every treatment decision.",
  },
  {
    icon: LockKeyhole,
    title: "Private by design",
    copy: "Smile photos are processed for the experience without being intentionally stored by SmileFlow.",
  },
];

export default function AgencyDemoPage() {
  return (
    <main className="agency-demo-page">
      <div className="agency-demo-orb agency-demo-orb-one" />
      <div className="agency-demo-orb agency-demo-orb-two" />

      <header className="agency-demo-nav">
        <Link href="/" className="brand-mark" aria-label="SmileFlow home">
          <span className="brand-spark">S</span>
          <span>SmileFlow</span>
        </Link>
        <span className="agency-demo-private"><span /> Private partner preview</span>
      </header>

      <section className="agency-demo-hero">
        <div className="agency-demo-kicker">White-label agency product · 53-second walkthrough</div>
        <h1>Make SmileFlow <em>yours.</em></h1>
        <p>
          Give cosmetic-dentistry visitors a useful next step before they book—and give every client website a conversion experience your agency can own.
        </p>
        <div className="agency-demo-actions">
          <a href="#watch" className="button button-primary">Watch the walkthrough <ArrowRight /></a>
          <a href={mailto} className="text-link">Discuss agency access <ArrowRight /></a>
        </div>
      </section>

      <section id="watch" className="agency-demo-video-section" aria-label="SmileFlow agency walkthrough">
        <div className="agency-demo-video-heading">
          <div>
            <span>01 / The product</span>
            <h2>One minute. The full story.</h2>
          </div>
          <p>Sound on · 00:53</p>
        </div>
        <div className="agency-demo-video-frame">
          <video
            controls
            playsInline
            preload="metadata"
            poster="/media/smileflow-agency-demo-poster.jpg"
            aria-label="SmileFlow white-label agency product walkthrough"
          >
            <source src="/media/smileflow-agency-demo.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </section>

      <section className="agency-demo-facts" aria-label="Agency plan facts">
        <div><strong>Unlimited</strong><span>client-site installs</span></div>
        <div><strong>White-label</strong><span>agency presentation</span></div>
        <div><strong>Private</strong><span>photo processing</span></div>
        <div><strong>$499.99</strong><span>per month</span></div>
      </section>

      <section className="agency-demo-benefits">
        <div className="agency-demo-benefit-intro">
          <span>02 / What the agency owns</span>
          <h2>A product line, <em>not another project.</em></h2>
          <p>
            SmileFlow handles the experience. Your agency decides how it is positioned, branded and packaged for dental clients.
          </p>
        </div>
        <div className="agency-demo-benefit-grid">
          {agencyBenefits.map((benefit) => (
            <article key={benefit.title}>
              <benefit.icon />
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="agency-demo-offer">
        <div>
          <span>Founding agency access</span>
          <h2>Deploy it across your client portfolio.</h2>
          <p>One flat monthly plan. Unlimited installs, agency branding and priority support.</p>
        </div>
        <div className="agency-demo-offer-card">
          <div><strong>$499.99</strong><span>/ month</span></div>
          <ul>
            <li><Check /> Unlimited client websites</li>
            <li><Check /> Agency-branded experience</li>
            <li><Check /> Installation support</li>
            <li><Check /> Cancel anytime</li>
          </ul>
          <a href={mailto} className="button button-coral">Talk to Filip <ArrowRight /></a>
        </div>
      </section>

      <footer className="agency-demo-footer">
        <Link href="/" className="agency-demo-back"><ArrowLeft /> Visit getsmileflow.com</Link>
        <p>Informational aesthetic orientation, never a diagnosis. In-person clinical assessment remains essential.</p>
      </footer>
    </main>
  );
}
