"use client";

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, CheckCircle, Clock, AlertTriangle, X, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisResult {
  utisak: string;
  oblasti: string[];
  tretmani: Array<{ naziv: string; razlog: string; cena_okvirna?: string }>;
  hitnost: 'niska' | 'srednja' | 'visoka';
  poruka: string;
  disclaimer: string;
}

const statusConfig = {
  niska: { label: "Standard Care", color: "#10B981", icon: CheckCircle, bg: "bg-emerald-500/10" },
  srednja: { label: "Review Recommended", color: "#F59E0B", icon: Clock, bg: "bg-amber-500/10" },
  visoka: { label: "Priority Review", color: "#EF4444", icon: AlertTriangle, bg: "bg-red-500/10" },
};

export default function SmileWidget() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", file);
    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      toast.success("Analysis complete");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto glass-card rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
      {/* Dynamic Progress Header */}
      <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-tight">AI Smile Analysis</h3>
            <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">Dental Intelligence v2.1</p>
          </div>
        </div>
        {!result && <ShieldCheck className="w-6 h-6 text-emerald-500/50" />}
      </div>

      <div className="p-8 md:p-10">
        {!result ? (
          <div className="space-y-8">
            <div 
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
              className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer group
                ${preview ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-white/10 hover:border-[#D4AF37]/30 hover:bg-white/[0.02]'}`}
            >
              {preview ? (
                <div className="relative inline-block group">
                  <img src={preview} alt="Smile" className="max-h-64 rounded-2xl shadow-2xl transition-transform group-hover:scale-[1.02]" />
                  <button onClick={(e) => { e.stopPropagation(); setPreview(null); setFile(null); }} 
                    className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="mx-auto w-24 h-24 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-500">
                    <Upload className="w-10 h-10 text-[#A3B8CC] group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold tracking-tight text-white">Upload Your Smile</h4>
                    <p className="text-white/50 max-w-xs mx-auto leading-relaxed">Our AI will analyze your smile aesthetics for professional recommendations.</p>
                  </div>
                </div>
              )}
            </div>

            <input ref={inputRef} type="file" accept="image/*" className="hidden" 
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />

            {preview && (
              <button 
                onClick={handleAnalyze} 
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-3 text-lg h-16 group"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Analyzing Aesthetics...
                  </div>
                ) : (
                  <>Start Precision Analysis <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
              {/* Urgency Badge */}
              <div className={`flex items-center gap-4 p-5 rounded-3xl ${statusConfig[result.hitnost].bg} border border-white/5`}>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                   {React.createElement(statusConfig[result.hitnost].icon, { className: "w-6 h-6", style: { color: statusConfig[result.hitnost].color } })}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-0.5">Assessment Status</p>
                  <p className="font-bold text-sm lg:text-base" style={{ color: statusConfig[result.hitnost].color }}>{statusConfig[result.hitnost].label}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">Visual Impression</h4>
                <p className="text-xl md:text-2xl font-serif text-white/90 leading-tight italic">"{result.utisak}"</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">Focus Areas</h4>
                <div className="grid grid-cols-1 gap-3">
                  {result.oblasti.map((item, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:bg-white/[0.05] transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-xs">{i+1}</div>
                      <span className="text-sm md:text-base text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">Premium Recommendations</h4>
                {result.tretmani.map((t, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 space-y-3 relative overflow-hidden group">
                     {t.cena_okvirna && (
                       <div className="absolute top-0 right-0 px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold rounded-bl-2xl">
                         {t.cena_okvirna}
                       </div>
                     )}
                     <h5 className="font-bold text-lg">{t.naziv}</h5>
                     <p className="text-sm text-white/50 leading-relaxed">{t.razlog}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button onClick={() => { setPreview(null); setResult(null); }} className="flex-1 h-14 rounded-2xl border border-white/10 font-bold hover:bg-white/5 transition-colors">New Analysis</button>
                <button className="flex-1 h-14 btn-primary">Book Consultation</button>
              </div>

              <p className="text-[10px] text-white/30 text-center leading-relaxed max-w-sm mx-auto pt-6 border-t border-white/5">
                {result.disclaimer}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
