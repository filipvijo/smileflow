"use client";

import SmileWidget from "../components/SmileWidget";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight, ChevronDown, Check } from "lucide-react";

const CONTACT_EMAIL = "croolstudio@gmail.com";
const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export default function LuxuryLanding() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#FDFCFB] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 md:h-32 flex items-center justify-between px-6 md:px-12 mix-blend-difference">
        <div className="text-lg md:text-xl font-bold tracking-tighter uppercase leading-none cursor-pointer">
          SmileFlow<span className="text-[#C5A038]">.</span>
        </div>
        <div className="hidden md:flex items-center gap-12 font-bold text-[10px] tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity">
          <a href="#demo">Live Demo</a>
          <a href="#roi">The Math</a>
          <a href="#pricing">Pricing</a>
          <a href={mailto("SmileFlow inquiry")}>Contact</a>
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

          <div className="col-span-12 lg:col-span-3 pb-0 md:pb-4 mt-4 md:mt-0">
            <div className="flex flex-col gap-4 md:gap-6">
              <a href={mailto("SmileFlow — install on my clinic website")} className="luxury-button">Get It On Your Site</a>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A038] text-center lg:text-left">
                Live in dental clinics since 2026
              </div>
            </div>
          </div>
        </div>

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
          <div className="space-y-10 md:space-y-16">
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
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-2">Analysis Speed</div>
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">~5 sec</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-2">Photos Stored</div>
                <div className="text-4xl md:text-5xl font-bold tracking-tighter">Zero</div>
              </div>
            </div>
          </div>

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
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 md:mb-32 border-b border-white/10 pb-8 md:pb-12 gap-4">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">The Math</h2>
            <p className="text-sm font-bold opacity-30 max-w-xs text-right">
              You already pay for traffic. SmileFlow converts it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 divide-white/5">
            {[
              {
                title: "$50–119",
                sub: "What a single dental lead costs via Google Ads and Local Services in most US markets.",
              },
              {
                title: "$3,000+",
                sub: "Typical value of one accepted cosmetic case — veneers, aligners, or an implant.",
              },
              {
                title: "Unlimited",
                sub: "Leads included in every SmileFlow plan. No per-consult fees, ever. One case pays for years.",
              },
            ].map((f, i) => (
              <div key={i} className="group p-8 md:p-16 md:border-r border-white/5 last:border-0 hover:bg-white hover:text-black transition-all duration-500">
                <div className="text-[#C5A038] mb-6 md:mb-12 text-sm font-bold">0{i + 1}</div>
                <h4 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 tracking-tighter">{f.title}</h4>
                <p className="text-base md:text-lg opacity-50 group-hover:opacity-100 transition-opacity leading-relaxed">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-48 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A038]">Phase 02 — Installation</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">One line. Any website.</h2>
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
                  "English and Serbian today — French, German, Spanish next",
                  "Photos analyzed in real time, never stored",
                  "GDPR-conscious consent built into the flow",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
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

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-48 px-6 md:px-12 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          <div className="space-y-4 md:space-y-6 text-center">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A038]">Founding Pricing</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Simple. Flat. Unlimited.</h2>
            <p className="text-white/40 max-w-xl mx-auto text-base md:text-lg">
              Locked in for life for the first 20 clinics. Competing tools charge $200+ monthly plus $25 per consultation.
            </p>
          </div>

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
                className={`p-8 md:p-12 rounded-[2.5rem] space-y-8 border transition-all duration-500 ${
                  plan.featured
                    ? "border-[#C5A038]/60 bg-[#C5A038]/[0.04]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
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

      {/* CTA */}
      <section className="py-32 md:py-64 text-center px-6 md:px-12">
        <h2 className="text-[clamp(3rem,14vw,16rem)] font-bold tracking-[-0.04em] leading-[0.88] uppercase mb-16 md:mb-20 pointer-events-none select-none">
          MORE <br /> PATIENTS<span className="text-[#C5A038]">.</span>
        </h2>
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
            <a href={mailto("SmileFlow privacy question")}>Privacy</a>
            <a href={mailto("SmileFlow terms question")}>Terms</a>
            <a href={mailto("SmileFlow inquiry")}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
