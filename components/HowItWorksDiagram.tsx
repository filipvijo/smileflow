"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Mail, ArrowRight } from "lucide-react";

const steps = [
  { icon: Upload, title: "Patient uploads a photo", detail: "One selfie of their smile, any device" },
  { icon: Sparkles, title: "AI analyzes in seconds", detail: "Aesthetic report and treatment ideas" },
  { icon: Mail, title: "You get the lead", detail: "Name, email, phone in your inbox" },
];

export default function HowItWorksDiagram() {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-4">
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 p-8 md:p-9 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] space-y-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#C5A038]/40 hover:shadow-[0_24px_48px_-16px_rgba(212,175,55,0.3)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
              <step.icon className="w-6 h-6 text-black" strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-widest font-bold text-[#C5A038]">Step {i + 1}</div>
              <h4 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">{step.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{step.detail}</p>
            </div>
          </motion.div>

          {i < steps.length - 1 && (
            <motion.div
              key={`arrow-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.15 }}
              className="hidden md:flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-[#C5A038]/10 border border-[#C5A038]/20"
            >
              <ArrowRight className="w-4 h-4 text-[#C5A038]" strokeWidth={2.5} />
            </motion.div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
