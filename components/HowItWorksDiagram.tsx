"use client";

import { motion } from "framer-motion";

const steps = [
  {
    lines: ["Patient uploads", "a photo"],
    detail: ["One selfie of their", "smile, any device"],
    icon: "upload" as const,
  },
  {
    lines: ["AI analyzes in", "seconds"],
    detail: ["Aesthetic report +", "treatment ideas"],
    icon: "spark" as const,
  },
  {
    lines: ["You get the", "lead"],
    detail: ["Name, email, phone", "in your inbox"],
    icon: "mail" as const,
  },
];

function StepIcon({ type, cx, cy }: { type: "upload" | "spark" | "mail"; cx: number; cy: number }) {
  const stroke = "#C5A038";
  if (type === "upload") {
    return (
      <g transform={`translate(${cx}, ${cy})`} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M0,-8 L0,5" />
        <path d="M-6,-2 L0,-8 L6,-2" />
        <path d="M-8,9 L8,9" />
      </g>
    );
  }
  if (type === "spark") {
    return (
      <g transform={`translate(${cx}, ${cy})`} fill={stroke}>
        <path d="M0,-9 C1,-3 3,-1 9,0 C3,1 1,3 0,9 C-1,3 -3,1 -9,0 C-3,-1 -1,-3 0,-9 Z" />
      </g>
    );
  }
  return (
    <g transform={`translate(${cx}, ${cy})`} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <rect x="-9" y="-6" width="18" height="12" rx="2" />
      <path d="M-9,-6 L0,1 L9,-6" />
    </g>
  );
}

export default function HowItWorksDiagram() {
  return (
    <svg
      viewBox="0 0 720 200"
      className="w-full h-auto"
      role="img"
      aria-label="Three step flow: a patient uploads a photo, the AI analyzes it in seconds, and the clinic receives the lead."
    >
      <title>How SmileFlow works</title>
      <desc>
        Three step diagram: step one, patient uploads a photo of their smile. Step two, AI
        analyzes the photo in seconds and produces an aesthetic report. Step three, the clinic
        receives the patient&apos;s name, email, and phone as a qualified lead.
      </desc>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#C5A038" />
        </marker>
      </defs>

      {steps.map((step, i) => {
        const x = i * 240;
        return (
          <motion.g
            key={step.lines[0]}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <rect x={x + 12} y={20} width={200} height={140} rx={20} fill="#FDFCFB" opacity="0.04" />
            <rect x={x + 12} y={20} width={200} height={140} rx={20} fill="none" stroke="#FDFCFB" strokeOpacity="0.12" />
            <circle cx={x + 44} cy={54} r={18} fill="#C5A038" opacity="0.15" />
            <StepIcon type={step.icon} cx={x + 44} cy={54} />
            <text x={x + 32} y={98} fontSize="15" fontWeight="700" fill="#FDFCFB">
              <tspan x={x + 32} dy="0">{step.lines[0]}</tspan>
              <tspan x={x + 32} dy="18">{step.lines[1]}</tspan>
            </text>
            <text x={x + 32} y={143} fontSize="12" fill="#FDFCFB" opacity="0.5">
              <tspan x={x + 32} dy="0">{step.detail[0]}</tspan>
              <tspan x={x + 32} dy="16">{step.detail[1]}</tspan>
            </text>
          </motion.g>
        );
      })}

      {[0, 1].map((i) => {
        const x = i * 240;
        return (
          <motion.path
            key={i}
            d={`M ${x + 216} 90 L ${x + 236} 90`}
            stroke="#C5A038"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.18, ease: "easeOut" }}
          />
        );
      })}
    </svg>
  );
}
