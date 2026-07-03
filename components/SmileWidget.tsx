"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Sparkles,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  ShieldCheck,
  ChevronRight,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { widgetStrings, resolveLang, type Lang } from "@/lib/i18n";

interface AnalysisResult {
  impression: string;
  areas: string[];
  treatments: Array<{ name: string; reason: string }>;
  urgency: "low" | "medium" | "high";
  message: string;
  disclaimer: string;
  clinic: string;
}

type Stage = "upload" | "teaser" | "form" | "report";

interface SmileWidgetProps {
  clinicId?: string;
  lang?: string;
  bookingUrl?: string;
  embedded?: boolean;
}

export default function SmileWidget({
  clinicId = "demo",
  lang: langProp = "en",
  bookingUrl,
  embedded = false,
}: SmileWidgetProps) {
  const lang: Lang = resolveLang(langProp);
  const t = widgetStrings[lang];

  const [stage, setStage] = useState<Stage>("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedded || !rootRef.current || typeof ResizeObserver === "undefined") return;
    const el = rootRef.current;
    const observer = new ResizeObserver(() => {
      window.parent?.postMessage(
        { type: "smileflow:height", height: el.offsetHeight + 32 },
        "*"
      );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [embedded]);

  const statusConfig = {
    low: { label: t.statusLow, color: "#10B981", icon: CheckCircle, bg: "bg-emerald-500/10" },
    medium: { label: t.statusMedium, color: "#F59E0B", icon: Clock, bg: "bg-amber-500/10" },
    high: { label: t.statusHigh, color: "#EF4444", icon: AlertTriangle, bg: "bg-red-500/10" },
  } as const;

  const handleFile = useCallback(
    (f: File) => {
      if (!f.type.startsWith("image/")) {
        toast.error(t.uploadInvalidFile);
        return;
      }
      setFile(f);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    },
    [t.uploadInvalidFile]
  );

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("clinicId", clinicId);
    formData.append("lang", lang);
    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.genericError);
      setResult(data);
      setStage("teaser");
      toast.success(t.analysisDone);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.genericError);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (leadName.trim().length < 2) {
      toast.error(t.formErrorName);
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(leadEmail)) {
      toast.error(t.formErrorContact);
      return;
    }
    if (!consent) {
      toast.error(t.formErrorConsent);
      return;
    }
    setSubmittingLead(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clinicId,
          lang,
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
          consent: true,
          summary: result
            ? {
                impression: result.impression.slice(0, 600),
                urgency: result.urgency,
                treatments: result.treatments.map((tr) => tr.name.slice(0, 160)),
              }
            : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.genericError);
      setStage("report");
      toast.success(t.leadSuccess);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.genericError);
    } finally {
      setSubmittingLead(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setFile(null);
    setResult(null);
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
    setConsent(false);
    setStage("upload");
  };

  const StatusBadge = ({ urgency }: { urgency: AnalysisResult["urgency"] }) => {
    const cfg = statusConfig[urgency];
    return (
      <div className={`flex items-center gap-4 p-5 rounded-3xl ${cfg.bg} border border-white/5`}>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          {React.createElement(cfg.icon, { className: "w-6 h-6", style: { color: cfg.color } })}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-0.5">{t.statusLabel}</p>
          <p className="font-bold text-sm lg:text-base" style={{ color: cfg.color }}>{cfg.label}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={rootRef}
      className="w-full max-w-xl mx-auto bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
    >
      <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-tight text-white">{t.headerTitle}</h3>
            <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">{t.headerSubtitle}</p>
          </div>
        </div>
        {stage === "upload" && <ShieldCheck className="w-6 h-6 text-emerald-500/50" />}
      </div>

      <div className="p-8 md:p-10">
        {stage === "upload" && (
          <div className="space-y-8">
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
              }}
              className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer group
                ${preview ? "border-[#D4AF37]/50 bg-[#D4AF37]/5" : "border-white/10 hover:border-[#D4AF37]/30 hover:bg-white/[0.02]"}`}
            >
              {preview ? (
                <div className="relative inline-block group">
                  <img src={preview} alt="Smile" className="max-h-64 rounded-2xl shadow-2xl transition-transform group-hover:scale-[1.02]" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setPreview(null); setFile(null); }}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-red-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="mx-auto w-24 h-24 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-all duration-500">
                    <Upload className="w-10 h-10 text-[#A3B8CC] group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold tracking-tight text-white">{t.uploadTitle}</h4>
                    <p className="text-white/50 max-w-xs mx-auto leading-relaxed">{t.uploadSubtitle}</p>
                  </div>
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />

            {preview && (
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 text-lg h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-60 group"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    {t.analyzing}
                  </div>
                ) : (
                  <>
                    {t.analyzeButton}
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            )}

            <p className="text-[10px] text-white/30 text-center leading-relaxed">{t.privacyNote}</p>
          </div>
        )}

        {stage === "teaser" && result && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <StatusBadge urgency={result.urgency} />

            <div className="space-y-3 text-center">
              <h4 className="text-2xl font-bold tracking-tight text-white">{t.teaserTitle}</h4>
              <p className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest">
                {t.teaserFound(result.treatments.length)}
              </p>
              <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">{t.teaserSubtitle}</p>
            </div>

            <div className="relative space-y-3" aria-hidden="true">
              {result.treatments.slice(0, 3).map((_, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.04] border border-white/5">
                  <div className="h-3 w-2/5 rounded bg-white/15 blur-[6px] mb-3" />
                  <div className="h-2.5 w-4/5 rounded bg-white/10 blur-[6px]" />
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A]/80 border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur">
                  <Lock className="w-6 h-6 text-[#D4AF37]" />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStage("form")}
              className="w-full h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] text-black font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity group"
            >
              {t.unlockButton}
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {stage === "form" && (
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleLeadSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h4 className="text-2xl font-bold tracking-tight text-white">{t.formTitle}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{t.formSubtitle}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-white/60">{t.nameLabel}</label>
                <input
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full h-13 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/25 focus:border-[#D4AF37]/60 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-white/60">{t.emailLabel}</label>
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full h-13 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/25 focus:border-[#D4AF37]/60 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-widest font-bold text-white/60">{t.phoneLabel}</label>
                <input
                  type="tel"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  placeholder={t.phonePlaceholder}
                  className="w-full h-13 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/25 focus:border-[#D4AF37]/60 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#D4AF37]"
              />
              <span className="text-xs text-white/50 leading-relaxed">{t.consentText}</span>
            </label>

            <button
              type="submit"
              disabled={submittingLead}
              className="w-full h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] text-black font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {submittingLead ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  {t.submitting}
                </div>
              ) : (
                t.submitButton
              )}
            </button>

            <p className="text-[10px] text-white/30 text-center leading-relaxed">{t.privacyNote}</p>
          </motion.form>
        )}

        {stage === "report" && result && (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
              <StatusBadge urgency={result.urgency} />

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">{t.impressionTitle}</h4>
                <p className="text-xl md:text-2xl font-serif text-white/90 leading-tight italic">&ldquo;{result.impression}&rdquo;</p>
              </div>

              {result.areas.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">{t.areasTitle}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {result.areas.map((item, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:bg-white/[0.05] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-xs">{i + 1}</div>
                        <span className="text-sm md:text-base text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.treatments.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">{t.treatmentsTitle}</h4>
                  {result.treatments.map((tr, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 space-y-3">
                      <h5 className="font-bold text-lg text-white">{tr.name}</h5>
                      <p className="text-sm text-white/50 leading-relaxed">{tr.reason}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#D4AF37]">{t.messageTitle}</h4>
                <p className="text-base text-white/70 leading-relaxed italic">{result.message}</p>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button onClick={reset} className="flex-1 h-14 rounded-2xl border border-white/10 font-bold text-white hover:bg-white/5 transition-colors">
                  {t.newAnalysis}
                </button>
                {bookingUrl ? (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] text-black font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    {t.bookConsultation}
                  </a>
                ) : (
                  <button className="flex-1 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#C5A038] text-black font-bold hover:opacity-90 transition-opacity">
                    {t.bookConsultation}
                  </button>
                )}
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
