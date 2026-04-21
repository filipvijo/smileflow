"use client";

import React from 'react';
import SmileWidget from '../components/SmileWidget';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Plus, Minus, MoveRight, ChevronDown } from 'lucide-react';

export default function LuxuryLanding() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#FDFCFB] overflow-x-hidden">
      {/* Minimalist Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-32 flex items-center justify-between px-12 mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter uppercase leading-none group cursor-pointer">
          SmileFlow<span className="text-[#C5A038]">.</span>
        </div>
        <div className="flex items-center gap-12 font-bold text-[10px] tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-opacity">
          <a href="#demo">The Engine</a>
          <a href="#performance">Intelligence</a>
          <a href="#">Contact</a>
        </div>
        <div className="w-12 h-12 flex flex-col justify-center items-end gap-1.5 cursor-pointer group">
          <div className="w-8 h-[2px] bg-white group-hover:w-12 transition-all"></div>
          <div className="w-12 h-[2px] bg-white"></div>
        </div>
      </nav>

      {/* Extreme Editorial Hero */}
      <section className="relative h-screen flex items-center px-12 pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-12 items-end">
          <div className="col-span-12 lg:col-span-9 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -100 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-text">Aesthetic <br /> Precision<span className="text-[#C5A038]">.</span></h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="flex items-start gap-12"
            >
              <div className="w-px h-32 bg-white/20"></div>
              <p className="max-w-lg text-lg md:text-xl font-medium leading-relaxed text-white/60">
                The clinical-grade intelligence layer for premium aesthetic clinics. Elevate your practice with AI that speaks the language of luxury dentistry.
              </p>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-3 pb-4">
             <div className="flex flex-col gap-6">
                <button className="luxury-button">Start Integration</button>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A038]">Currently deploying in: Belgrade, SRB</div>
             </div>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-12 left-12 flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            <ChevronDown className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Scroll to Explore</span>
        </div>
      </section>

      {/* The "Machine" Section (The Demo) */}
      <section id="demo" className="py-60 px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16">
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C5A038]">Phase 01 — Patient Interface</h3>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none italic font-serif">Convert through <br /> Curiosity<span className="text-[#C5A038]">.</span></h2>
            </div>
            
            <div className="space-y-8 text-lg text-white/50 leading-relaxed font-medium">
              <p>Experience the engine that identifies dental aesthetics in 40ms. Our Neural-Smile architecture maps geometry, shade, and buccal corridors to provide instant patient value.</p>
              <p>This is not a widget. It is a digital concierge for the 1% of dental practices.</p>
            </div>

            <div className="grid grid-cols-2 gap-20 py-12 border-y border-white/10">
               <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-2">Lead Conversion</div>
                  <div className="text-5xl font-bold tracking-tighter">+480%</div>
               </div>
               <div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-2">Clinical Accuracy</div>
                  <div className="text-5xl font-bold tracking-tighter">99.2%</div>
               </div>
            </div>
          </div>

          <div className="relative">
             <motion.div style={{ y: y1 }} className="absolute -top-40 -right-40 text-[20rem] font-bold text-white/[0.02] select-none uppercase pointer-events-none">
                AI
             </motion.div>
             <SmileWidget />
          </div>
        </div>
      </section>

      {/* Industrial Feature List */}
      <section id="performance" className="py-60 px-12 bg-white/[0.01]">
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-32 border-b border-white/10 pb-12">
               <h2 className="text-7xl font-bold tracking-tighter uppercase">Intelligence</h2>
               <div className="text-right">
                  <span className="text-sm font-bold opacity-30">V.2026.4.21</span>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-0">
               {[
                 { title: "Geometric Mapping", desc: "Digital analysis of midline alignment and incisal edge positioning." },
                 { title: "Shade Extraction", desc: "Advanced colorimetric sampling of VITA-shade variances across 16 points." },
                 { title: "Lead Fusion", desc: "Seamless orchestration of patient data into your clinic's operative CRM." }
               ].map((f, i) => (
                 <div key={i} className="group p-16 border-r border-white/5 last:border-0 hover:bg-white hover:text-black transition-all duration-500">
                    <div className="text-[#C5A038] mb-12 text-sm font-bold">0{i+1}</div>
                    <h4 className="text-4xl font-bold mb-8 tracking-tighter uppercase">{f.title}</h4>
                    <p className="text-lg opacity-50 group-hover:opacity-100 transition-opacity leading-relaxed">{f.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* The Extreme CTA */}
      <section className="py-80 text-center px-12">
        <h2 className="text-[clamp(4rem,20vw,18rem)] font-bold tracking-[-0.06em] leading-[0.75] uppercase mb-20 pointer-events-none select-none">
           JOIN THE <br /> FUTURE<span className="text-[#C5A038]">.</span>
        </h2>
        <div className="flex flex-col items-center gap-12">
           <button className="luxury-button scale-150 h-20 px-16 group">
              Acquire Implementation Ticket <MoveRight className="ml-4 group-hover:translate-x-4 transition-transform"/>
           </button>
           <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">Limited Deployment Slots Available for Belgrade Q2</p>
        </div>
      </section>

      {/* Industrial Footer */}
      <footer className="py-20 px-12 border-t border-white/5 opacity-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
           <span className="text-[10px] font-bold uppercase tracking-widest text-nowrap">SmileFlow Intellectual Property 2026</span>
           <div className="w-full h-px bg-white/10 hidden md:block mx-12"></div>
           <div className="flex gap-12 text-[10px] font-bold uppercase tracking-widest">
              <a href="#">Security</a>
              <a href="#">Terms</a>
              <a href="#">Belgrade Labs</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
