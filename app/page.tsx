"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircleCheck,
  Code2,
  LockKeyhole,
  Mail,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import SmileWidget from "@/components/SmileWidget";
import RoiCalculator from "@/components/RoiCalculator";
import { serializeJsonLd } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
};

const journey = [
  {
    number: "01",
    icon: Upload,
    title: "Curiosity becomes action",
    text: "A visitor uploads one smile photo from any device. No account, no app, no waiting room.",
  },
  {
    number: "02",
    icon: ScanFace,
    title: "AI creates the spark",
    text: "In seconds, they see a thoughtful preview of aesthetic possibilities tailored to their smile.",
  },
  {
    number: "03",
    icon: Mail,
    title: "Your team gets the lead",
    text: "Name, phone, email and treatment interest arrive while motivation is at its highest.",
  },
];

const faqs = [
  {
    q: "Is this a medical diagnosis?",
    a: "No. SmileFlow provides an AI-generated orientation of aesthetic possibilities. Every report clearly states that an in-person examination and X-rays by a licensed dentist are required before treatment decisions.",
  },
  {
    q: "Are patient photos stored?",
    a: "No. Photos are analyzed in real time and are not stored on SmileFlow servers.",
  },
  {
    q: "Will it work on our website?",
    a: "Yes. A single script tag works on WordPress, Wix, Squarespace and custom websites. Installation typically takes less than five minutes.",
  },
  {
    q: "Can it match our clinic brand?",
    a: "Yes. The widget can be configured for your clinic, booking link and language. White-label options are available for agencies managing multiple practices.",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />

      <header className="site-nav">
        <a href="#top" className="brand-mark" aria-label="SmileFlow home">
          <span className="brand-spark">S</span>
          <span>SmileFlow</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#experience">Experience</a>
          <a href="#journey">How it works</a>
          <a href="#roi">ROI</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="nav-cta" href={mailto("SmileFlow clinic installation")}>For your clinic <ArrowRight /></a>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span className="live-dot" /> AI patient acquisition for dental clinics
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Turn a curious smile into a <em>booked consultation.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="hero-lede"
          >
            SmileFlow transforms passive website visitors into qualified cosmetic-dentistry leads with an instant, private AI smile experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hero-actions"
          >
            <a href="#experience" className="button button-primary">Try the patient experience <ArrowDownRight /></a>
            <a href="#journey" className="text-link">See how it converts <ArrowRight /></a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-trust"
          >
            <span><ShieldCheck /> Photos never stored</span>
            <span><Code2 /> Installs in minutes</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hero-visual"
        >
          <div className="visual-label"><Sparkles /> Live patient journey</div>
          <div className="smile-frame">
            <Image
              src="/images/hero-smile.png"
              alt="Patient smile ready for an AI aesthetic analysis"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 46vw"
              className="smile-photo"
            />
            <div className="scan-line" />
            <span className="scan-corner scan-corner-tl" />
            <span className="scan-corner scan-corner-tr" />
            <span className="scan-corner scan-corner-bl" />
            <span className="scan-corner scan-corner-br" />
            <div className="analysis-pill"><span /> Smile analysis complete</div>
          </div>
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="lead-card"
          >
            <div className="lead-card-icon"><CircleCheck /></div>
            <div><small>New consultation lead</small><strong>Veneers · High intent</strong></div>
            <span className="lead-time">now</span>
          </motion.div>
          <div className="hero-metric"><strong>~5 sec</strong><span>from selfie to insight</span></div>
        </motion.div>
      </section>

      <section className="fact-ribbon" aria-label="Product facts">
        {[
          ["Unlimited", "analyses and leads"],
          ["0", "patient photos stored"],
          ["1 line", "to install anywhere"],
          ["EN + SR", "patient languages"],
        ].map(([value, label]) => (
          <div key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
      </section>

      <section id="experience" className="experience-section section-pad">
        <motion.div {...reveal} className="section-intro">
          <div className="section-number">01 / Patient experience</div>
          <h2>Don’t explain the product. <em>Let it create desire.</em></h2>
          <p>Your next patient can experience the exact conversion flow here—upload, analyze, unlock and book.</p>
        </motion.div>
        <div className="experience-grid">
          <motion.div {...reveal} className="experience-notes">
            <div className="note-card note-aqua">
              <span>01</span>
              <h3>The right psychological moment</h3>
              <p>A visitor who uploads their own smile is already picturing change. SmileFlow captures interest at that precise moment.</p>
            </div>
            <div className="note-card note-coral">
              <span>02</span>
              <h3>A lead with context</h3>
              <p>Your team receives more than contact details: the suggested treatments make every follow-up warmer and more relevant.</p>
            </div>
          </motion.div>
          <motion.div {...reveal} className="widget-stage">
            <div className="widget-stage-top"><span>Interactive demo</span><span className="privacy-chip"><LockKeyhole /> Private by design</span></div>
            <SmileWidget clinicId="demo" lang="en" />
          </motion.div>
        </div>
      </section>

      <section id="journey" className="journey-section section-pad">
        <motion.div {...reveal} className="section-intro section-intro-light">
          <div className="section-number">02 / One patient journey</div>
          <h2>From “just looking” to <em>ready to talk.</em></h2>
        </motion.div>
        <div className="journey-grid">
          {journey.map((item, index) => (
            <motion.article
              key={item.number}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.12 }}
              className="journey-card"
            >
              <div className="journey-head"><span>{item.number}</span><item.icon /></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
        <motion.div {...reveal} className="install-strip">
          <div><Code2 /><span><strong>One line of code.</strong> WordPress, Wix, Squarespace or custom.</span></div>
          <code>&lt;script src=&quot;getsmileflow.com/embed.js&quot; …&gt;</code>
        </motion.div>
      </section>

      <section id="roi" className="roi-section section-pad">
        <motion.div {...reveal} className="section-intro">
          <div className="section-number">03 / The business case</div>
          <h2>Make your existing traffic <em>work harder.</em></h2>
          <p>Explore a simple scenario using your own numbers. The calculator is illustrative—not a promise of results.</p>
        </motion.div>
        <motion.div {...reveal}><RoiCalculator /></motion.div>
      </section>

      <section className="trust-section section-pad">
        <motion.div {...reveal} className="trust-copy">
          <div className="section-number">04 / Responsible by design</div>
          <h2>Built for curiosity. <em>Bound by clinical reality.</em></h2>
          <p>SmileFlow creates a thoughtful first step—not a diagnosis. The patient remains informed, the dentist remains essential.</p>
        </motion.div>
        <div className="trust-grid">
          {[
            [ShieldCheck, "No photo storage", "Images are analyzed in real time and not retained on SmileFlow servers."],
            [LockKeyhole, "Consent before capture", "Contact details are submitted only after explicit patient consent."],
            [ScanFace, "No diagnosis claims", "Every result is framed as aesthetic orientation with an in-person exam required."],
          ].map(([Icon, title, copy]) => {
            const TrustIcon = Icon as typeof ShieldCheck;
            return <motion.article key={title as string} {...reveal} className="trust-card"><TrustIcon /><h3>{title as string}</h3><p>{copy as string}</p></motion.article>;
          })}
        </div>
      </section>

      <section id="pricing" className="pricing-section section-pad">
        <motion.div {...reveal} className="section-intro section-intro-light pricing-intro">
          <div className="section-number">05 / Founding access</div>
          <h2>One good case can change <em>the whole equation.</em></h2>
          <p>Flat monthly pricing. Unlimited analyses. Unlimited leads. No per-consultation meter.</p>
        </motion.div>
        <div className="pricing-grid">
          <motion.article {...reveal} className="price-card price-card-featured">
            <div className="price-label">For dental clinics <span>Founding plan</span></div>
            <div className="price"><strong>$149</strong><span>/ month</span></div>
            <p>Everything one practice needs to turn website curiosity into consultation opportunities.</p>
            <ul>
              {["One clinic website", "Unlimited smile analyses", "Unlimited leads to your inbox", "English and Serbian", "Setup done for you", "Cancel anytime"].map((x) => <li key={x}><Check />{x}</li>)}
            </ul>
            <a href="https://buy.stripe.com/00w3coe8c4qocOh9fy6oo00" target="_blank" rel="noopener noreferrer" className="button button-primary">Claim a founding spot <ArrowRight /></a>
          </motion.article>
          <motion.article {...reveal} className="price-card agency-card">
            <div className="price-label">For dental agencies</div>
            <h3>Make SmileFlow yours.</h3>
            <p>White-label the experience, install it across client sites and give every clinic a more compelling conversion story.</p>
            <div className="agency-points"><span>Unlimited installs</span><span>Your branding</span><span>Priority support</span></div>
            <a href="https://buy.stripe.com/dRm14g2pu9KI29DajC6oo01" target="_blank" rel="noopener noreferrer" className="text-link text-link-light">Explore agency access · $499.99/mo <ArrowRight /></a>
          </motion.article>
        </div>
      </section>

      <section id="faq" className="faq-section section-pad">
        <motion.div {...reveal} className="section-intro"><div className="section-number">Questions, answered</div><h2>Clear before you <em>commit.</em></h2></motion.div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <motion.details key={faq.q} {...reveal} className="faq-item">
              <summary><span>{String(i + 1).padStart(2, "0")}</span>{faq.q}<span className="faq-plus">+</span></summary>
              <p>{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-orbit" />
        <motion.div {...reveal}>
          <span className="eyebrow eyebrow-light"><Sparkles /> Your website can do more</span>
          <h2>The next patient is already <em>curious.</em></h2>
          <p>Give them a reason to start the conversation with you.</p>
          <a href={mailto("SmileFlow — install on my clinic website")} className="button button-coral">Bring SmileFlow to my clinic <ArrowRight /></a>
        </motion.div>
      </section>

      <footer className="site-footer">
        <div className="brand-mark"><span className="brand-spark">S</span><span>SmileFlow</span></div>
        <p>AI smile analysis for patient acquisition. Informational, never diagnostic.</p>
        <div>
          <Link href="/resources">Resources</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/security">Security</Link>
          <a href={mailto("SmileFlow inquiry")}>Contact</a>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
      }) }} />
    </main>
  );
}
