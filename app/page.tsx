"use client";

import SmileWidget from "../components/SmileWidget";
import RoiChart from "../components/RoiChart";
import HowItWorksDiagram from "../components/HowItWorksDiagram";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight, ChevronDown, Check } from "lucide-react";

const treatmentIcons = [
  { src: "/images/icon-whitening.png", label: "Whitening" },
  { src: "/images/icon-checkup.png", label: "Check-ups" },
  { src: "/images/icon-braces.png", label: "Orthodontics" },
];

const revealProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const CONTACT_EMAIL = "croolstudio@gmail.com";
const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const faqs = [
  {
    q: "What is an AI smile analysis widget?",
    a: "An AI smile analysis widget is a tool embedded on a dental clinic's website that lets visitors upload a photo of their smile and instantly receive an AI-generated aesthetic assessment, including suggested cosmetic treatments. SmileFlow is one such widget, built specifically for lead generation: it captures the visitor's name, email, and phone number before revealing the full report.",
  },
  {
    q: "How much does SmileFlow cost?",
    a: "SmileFlow's Clinic plan is a flat $149 per month for unlimited smile analyses and unlimited leads on one clinic website, with founding pricing locked in for the first 20 clinics. An Agency white-label plan for marketing agencies managing multiple clinics is $499 per month for unlimited installs. There are no per-consultation or per-lead fees.",
  },
  {
    q: "Is AI smile analysis a medical diagnosis?",
    a: "No. SmileFlow's reports are an AI-generated orientation of aesthetic possibilities, not a medical diagnosis. Every report includes a disclaimer stating that an in-person examination and X-rays by a licensed dentist are required before any treatment decision.",
  },
  {
    q: "Does SmileFlow store patient photos?",
    a: "No. Photos are analyzed in real time by Google's Gemini model and are not stored on SmileFlow's servers.",
  },
  {
    q: "How is SmileFlow different from SmileSnap and other virtual consultation tools?",
    a: "SmileSnap and similar virtual consultation tools typically charge a premium subscription plus a per-consultation fee (commonly around $25 per consult) and route photos to a human reviewer, with results delivered after a delay. SmileFlow returns an instant AI-generated report in seconds, charges one flat monthly fee with no per-lead metering, and is designed around a lead-capture flow rather than an async review queue.",
  },
  {
    q: "How long does it take to install SmileFlow on a clinic website?",
    a: "Installation is a single script tag pasted anywhere on the page, similar to installing Google Analytics. It works on WordPress, Wix, Squarespace, and custom-built sites, and typically takes under five minutes.",
  },
  {
    q: "What languages does SmileFlow support?",
    a: "SmileFlow currently supports English and Serbian, with both the widget interface and the AI-generated report available in the visitor's language. French, German, and Spanish are planned next.",
  },
];

export default function LuxuryLanding() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="relative min-h-screen bg-[#0D1B2A] text-[#FDFCFB] overflow-x-hidden">
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 md:h-32 flex items-center justify-between px-6 md:px-12 mix-blend-difference">
        <div className="text-lg md:text-xl font-bold tracking-tighter uppercase leading-none cursor-pointer">
          SmileFlow<span className="text-[#C5A038]">.</span>
        </div>
        <div className="hidden md:flex items-center gap-12 font-bold text-[10px] tracking-[0.3em] uppercase opacity-60">
          {[
            { href: "#demo", label: "Live Demo" },
            { href: "#roi", label: "The Math" },
            { href: "#pricing", label: "Pricing" },
            { href: "#faq", label: "FAQ" },
            { href: mailto("SmileFlow inquiry"), label: "Contact" },
          ].map((link) => (
            <a key={link.label} href={link.href} className="group relative pb-1 hover:opacity-100 transition-opacity">
              {link.label}
              <span className="absolute left-0 bottom-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-24 md:pt-20 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 md:gap-12 items-end">
          <div className="col-span-12 lg:col-span-9 space-y-8 md:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-text">Your Website <br /> Should Sell Smiles<span className="text-[#C5A038]">.</span></h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="flex items-start gap-6 md:gap-12"
            >
              <div className="w-px h-24 md:h-32 bg-white/20 shrink-0"></div>
              <p className="max-w-lg text-base md:text-xl font-medium leading-relaxed text-white/60">
                SmileFlow is an AI smile-analysis widget that turns your clinic&apos;s website visitors into
                consultation requests. Patients upload a selfie, get an instant aesthetic report — you get their
                name, contact, and treatment interest in your inbox.
              </p>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-3 pb-0 md:pb-4 mt-4 md:mt-0 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="lg:hidden w-32 sm:w-40 mx-auto"
            >
              <div className="p-2 rounded-[1.5rem] bg-gradient-to-br from-[#D4AF37] to-[#C5A038] shadow-[0_16px_32px_-8px_rgba(0,0,0,0.6)]">
                <div className="rounded-[1.15rem] overflow-hidden border-4 border-[#0D1B2A]">
                  <Image
                    src="/images/hero-smile.png"
                    alt="Real patient smile analyzed by SmileFlow"
                    width={400}
                    height={460}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-4 md:gap-6">
              <a href={mailto("SmileFlow — install on my clinic website")} className="luxury-button">Get It On Your Site</a>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A038] text-center lg:text-left">
                Live in dental clinics since 2026
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 6 }}
          animate={{ opacity: 1, scale: 1, rotate: 3, y: [0, -14, 0] }}
          transition={{
            opacity: { duration: 1, delay: 0.6 },
            scale: { duration: 1, delay: 0.6 },
            rotate: { duration: 1, delay: 0.6 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
          }}
          className="hidden lg:block absolute top-24 right-10 xl:right-20 w-72 xl:w-80"
        >
          <div className="p-2.5 rounded-[2rem] bg-gradient-to-br from-[#D4AF37] to-[#C5A038] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)]">
            <div className="rounded-[1.75rem] overflow-hidden border-4 border-[#0D1B2A]">
              <Image
                src="/images/hero-smile.png"
                alt="Real patient smile analyzed by SmileFlow"
                width={500}
                height={575}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        <div className="hidden md:flex absolute bottom-12 left-12 items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Try it yourself below</span>
        </div>
      </section>

      {/* Demo section */}
      <section id="demo" className="py-24 md:py-60 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div {...revealProps} className="space-y-10 md:space-y-16">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A038]">Phase 01 — The Patient Experience</h3>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none italic font-serif">
                Conversion through <br /> Curiosity<span className="text-[#C5A038]">.</span>
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8 text-base md:text-lg text-white/50 leading-relaxed font-medium">
              <p>
                A visitor who uploads a photo of their own smile is not browsing — they are already imagining a
                better one. SmileFlow gives them an instant, professional AI assessment and asks for their contact
                details at the exact moment their motivation peaks.
              </p>
              <p>
                Every unlocked report is a qualified lead in your inbox: name, email, phone, and the treatments
                the AI flagged. Try the full flow right here.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-20 py-8 md:py-12 border-y border-white/10">
              <div className="transition-transform duration-300 hover:-translate-y-1">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-2">Analysis Speed</div>
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">~5 sec</div>
              </div>
              <div className="transition-transform duration-300 hover:-translate-y-1">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-2">Photos Stored</div>
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">Zero</div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div style={{ y: y1 }} className="absolute -top-40 -right-40 text-[20rem] font-bold text-white/[0.02] select-none uppercase pointer-events-none hidden lg:block">
              AI
            </motion.div>
            <SmileWidget clinicId="demo" lang="en" />
          </div>
        </div>
      </section>

      {/* ROI section */}
      <section id="roi" className="py-24 md:py-60 px-6 md:px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...revealProps} className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 md:mb-32 border-b border-white/10 pb-8 md:pb-12 gap-4">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">The Math</h2>
            <p className="text-sm font-bold opacity-30 max-w-md text-left md:text-right">
              You already pay for traffic. SmileFlow converts it.
            </p>
          </motion.div>

          <motion.div {...revealProps} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative overflow-hidden p-6 md:p-10 rounded-3xl bg-black/30 border border-white/10 space-y-4">
              <Image
                src="/images/before-after-art.png"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover opacity-[0.08] mix-blend-luminosity pointer-events-none select-none"
              />
              <div className="relative z-10 space-y-4">
                <RoiChart />
                <Link href="/dental-lead-costs" className="inline-block text-xs text-[#C5A038] font-bold uppercase tracking-widest hover:text-[#E5C26B] transition-colors">
                  See full sourced data &rarr;
                </Link>
              </div>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "$3,000+",
                  sub: "Typical value of one accepted cosmetic case — veneers, aligners, or an implant. One closed case pays for years of the widget.",
                },
                {
                  title: "Unlimited",
                  sub: "Leads included in every SmileFlow plan. No per-consult fees, ever — unlike metered competitors.",
                },
              ].map((f, i) => (
                <div key={i} className="border-l-2 border-[#C5A038]/40 pl-6 transition-all duration-300 hover:border-[#C5A038] hover:pl-8">
                  <h4 className="text-3xl md:text-4xl font-bold mb-2 tracking-tighter">{f.title}</h4>
                  <p className="text-base opacity-50 leading-relaxed">{f.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-24 md:py-48 px-6 md:px-12 border-t border-white/5 overflow-hidden">
        <Image
          src="/images/before-after-art.png"
          alt=""
          fill
          aria-hidden="true"
          className="object-cover object-right opacity-[0.06] mix-blend-luminosity pointer-events-none select-none"
        />
        <div className="relative z-10 max-w-7xl mx-auto space-y-16 md:space-y-24">
          <motion.div {...revealProps} className="space-y-4 md:space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A038]">Phase 02 — Installation</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">One line. Any website.</h2>
          </motion.div>

          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
            <div className="min-w-[600px] md:min-w-0">
              <HowItWorksDiagram />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-8 text-base md:text-lg text-white/50 leading-relaxed font-medium">
              <p>
                Your web team (or ours) pastes a single script tag anywhere on your site. The widget inherits your
                clinic&apos;s language, sends every lead to your front desk email, and works on WordPress, Wix,
                Squarespace, and custom sites alike.
              </p>
              <div className="space-y-4">
                {[
                  "Instant lead notifications to your inbox",
                  "Photos analyzed in real time, never stored",
                  "GDPR-conscious consent built into the flow",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 -mx-2 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-white/[0.03]">
                    <div className="w-6 h-6 rounded-full bg-[#C5A038]/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#C5A038]" />
                    </div>
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-10 rounded-3xl bg-black/40 border border-white/10 font-mono text-xs md:text-sm text-white/70 overflow-x-auto">
              <div className="text-white/30 mb-4">{"<!-- Paste before </body> -->"}</div>
              <div>
                <span className="text-[#C5A038]">&lt;script</span> src=<span className="text-emerald-400">&quot;https://yourdomain.com/embed.js&quot;</span>
              </div>
              <div className="pl-8">
                data-clinic=<span className="text-emerald-400">&quot;your-clinic-id&quot;</span>
              </div>
              <div className="pl-8">
                data-lang=<span className="text-emerald-400">&quot;en&quot;</span>
              </div>
              <div className="pl-8">
                data-booking=<span className="text-emerald-400">&quot;https://yourclinic.com/book&quot;</span><span className="text-[#C5A038]">&gt;</span>
              </div>
              <div>
                <span className="text-[#C5A038]">&lt;/script&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment recognition strip */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-white/5">
        <motion.div {...revealProps} className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 text-center md:text-left shrink-0">
            Recognizes treatment opportunities like
          </p>
          <div className="flex items-center gap-8 md:gap-12">
            {treatmentIcons.map((icon) => (
              <div key={icon.label} className="flex flex-col items-center gap-3 group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#FDFCFB] p-2.5 shadow-lg transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_32px_-8px_rgba(212,175,55,0.35)]">
                  <Image src={icon.src} alt={icon.label} width={80} height={80} className="w-full h-full object-contain" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{icon.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-48 px-6 md:px-12 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          <motion.div {...revealProps} className="space-y-4 md:space-y-6 text-center">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A038]">Founding Pricing</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Simple. Flat. Unlimited.</h2>
            <p className="text-white/40 max-w-xl mx-auto text-base md:text-lg">
              Locked in for life for the first 20 clinics. Competing tools charge $200+ monthly plus $25 per consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Clinic",
                price: "$149",
                period: "/month",
                features: [
                  "Widget on one clinic website",
                  "Unlimited smile analyses",
                  "Unlimited leads to your inbox",
                  "English + Serbian included",
                  "Setup done for you",
                  "Cancel anytime",
                ],
                cta: "Claim Founding Spot",
                subject: "SmileFlow Clinic plan — founding spot",
                featured: true,
              },
              {
                name: "Agency / White-label",
                price: "$499",
                period: "/month",
                features: [
                  "Unlimited clinic installs",
                  "Your branding on the widget",
                  "Priority feature requests",
                  "Co-branded sales materials",
                  "Dedicated support channel",
                  "Revenue share available",
                ],
                cta: "Talk Partnership",
                subject: "SmileFlow agency white-label partnership",
                featured: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 md:p-12 rounded-[2.5rem] space-y-8 border transition-all duration-500 hover:-translate-y-2 ${
                  plan.featured
                    ? "border-[#C5A038]/60 bg-[#C5A038]/[0.04] hover:shadow-[0_24px_48px_-12px_rgba(212,175,55,0.25)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]"
                }`}
              >
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C5A038]">{plan.name}</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-bold tracking-tighter">{plan.price}</span>
                    <span className="text-white/40 font-bold">{plan.period}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#C5A038] shrink-0" />
                      <span className="text-sm md:text-base text-white/70">{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={mailto(plan.subject)}
                  className={plan.featured ? "luxury-button w-full" : "luxury-button-outline w-full"}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-48 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          <motion.div {...revealProps} className="space-y-4 md:space-y-6 text-center">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A038]">Frequently Asked</h3>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase">Questions</h2>
          </motion.div>

          <motion.div {...revealProps} className="space-y-10 md:space-y-12">
            {faqs.map((faq, i) => (
              <div key={i} className="space-y-2 border-b border-white/5 pb-10 last:border-0 -mx-4 px-4 py-2 rounded-2xl transition-colors duration-300 hover:bg-white/[0.02]">
                <h3 className="text-xl md:text-2xl font-bold text-white">{faq.q}</h3>
                <p className="text-white/50 text-base md:text-lg leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      {/* CTA */}
      <section className="py-32 md:py-64 text-center px-6 md:px-12">
        <motion.h2
          {...revealProps}
          className="text-[clamp(3rem,14vw,16rem)] font-bold tracking-[-0.04em] leading-[0.88] uppercase mb-16 md:mb-20 pointer-events-none select-none"
        >
          MORE <br /> PATIENTS<span className="text-[#C5A038]">.</span>
        </motion.h2>
        <div className="flex flex-col items-center gap-8 md:gap-12">
          <a
            href={mailto("SmileFlow — install on my clinic website")}
            className="luxury-button w-full max-w-xs md:max-w-none md:scale-150 h-16 md:h-20 px-8 md:px-16 group flex items-center justify-center gap-3"
          >
            Request Installation <MoveRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </a>
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">Founding pricing ends at 20 clinics</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 px-6 md:px-12 border-t border-white/5 opacity-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-center md:text-left text-nowrap">
            SmileFlow 2026 — AI analyses are informational, not medical diagnoses.
          </span>
          <div className="w-full h-px bg-white/10 hidden md:block mx-12"></div>
          <div className="flex gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-widest">
            <Link href="/compare" className="hover:text-[#C5A038] transition-colors">Compare</Link>
            <Link href="/dental-lead-costs" className="hover:text-[#C5A038] transition-colors">Lead cost data</Link>
            <a href={mailto("SmileFlow privacy question")} className="hover:text-[#C5A038] transition-colors">Privacy</a>
            <a href={mailto("SmileFlow terms question")} className="hover:text-[#C5A038] transition-colors">Terms</a>
            <a href={mailto("SmileFlow inquiry")} className="hover:text-[#C5A038] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
