const steps = [
  {
    lines: ["Patient uploads", "a photo"],
    detail: ["One selfie of their", "smile, any device"],
  },
  {
    lines: ["AI analyzes in", "seconds"],
    detail: ["Aesthetic report +", "treatment ideas"],
  },
  {
    lines: ["You get the", "lead"],
    detail: ["Name, email, phone", "in your inbox"],
  },
];

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
          <g key={step.lines[0]}>
            <rect x={x + 12} y={20} width={200} height={140} rx={20} fill="#FDFCFB" opacity="0.04" />
            <rect x={x + 12} y={20} width={200} height={140} rx={20} fill="none" stroke="#FDFCFB" strokeOpacity="0.12" />
            <circle cx={x + 44} cy={54} r={16} fill="#C5A038" opacity="0.15" />
            <text x={x + 44} y={59} fontSize="14" fontWeight="700" fill="#C5A038" textAnchor="middle">
              {i + 1}
            </text>
            <text x={x + 32} y={95} fontSize="15" fontWeight="700" fill="#FDFCFB">
              <tspan x={x + 32} dy="0">{step.lines[0]}</tspan>
              <tspan x={x + 32} dy="18">{step.lines[1]}</tspan>
            </text>
            <text x={x + 32} y={140} fontSize="12" fill="#FDFCFB" opacity="0.5">
              <tspan x={x + 32} dy="0">{step.detail[0]}</tspan>
              <tspan x={x + 32} dy="16">{step.detail[1]}</tspan>
            </text>
            {i < steps.length - 1 && (
              <path d={`M ${x + 216} 90 L ${x + 236} 90`} stroke="#C5A038" strokeWidth="2" markerEnd="url(#arrow)" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
