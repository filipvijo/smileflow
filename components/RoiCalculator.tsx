"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

function Field({ label, value, min, max, step, suffix, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="roi-field">
      <span><strong>{label}</strong><b>{value.toLocaleString()}{suffix}</b></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

export default function RoiCalculator() {
  const [visitors, setVisitors] = useState(1500);
  const [engagement, setEngagement] = useState(4);
  const [leadRate, setLeadRate] = useState(35);
  const [caseValue, setCaseValue] = useState(3000);

  const result = useMemo(() => {
    const analyses = Math.round(visitors * (engagement / 100));
    const leads = Math.round(analyses * (leadRate / 100));
    return { analyses, leads, opportunity: leads * caseValue };
  }, [visitors, engagement, leadRate, caseValue]);

  return (
    <div className="roi-calculator">
      <div className="roi-controls">
        <div className="roi-title"><SlidersHorizontal /><div><span>Build a scenario</span><p>Adjust the assumptions to fit your clinic.</p></div></div>
        <Field label="Monthly website visitors" value={visitors} min={250} max={10000} step={250} suffix="" onChange={setVisitors} />
        <Field label="Visitors who try the widget" value={engagement} min={1} max={15} step={1} suffix="%" onChange={setEngagement} />
        <Field label="Analyses that become leads" value={leadRate} min={10} max={70} step={5} suffix="%" onChange={setLeadRate} />
        <Field label="Average accepted case value" value={caseValue} min={500} max={10000} step={500} suffix=" USD" onChange={setCaseValue} />
      </div>
      <div className="roi-result">
        <span className="result-kicker">Illustrative monthly opportunity</span>
        <strong>${result.opportunity.toLocaleString()}</strong>
        <p>if every generated lead became an accepted case. Actual results depend on traffic quality, follow-up and case acceptance.</p>
        <div className="result-stats"><span><b>{result.analyses}</b> analyses</span><span><b>{result.leads}</b> potential leads</span></div>
        <a href="/dental-lead-costs">See the sourced lead-cost context <ArrowUpRight /></a>
      </div>
    </div>
  );
}
