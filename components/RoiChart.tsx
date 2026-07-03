export default function RoiChart() {
  return (
    <svg
      viewBox="0 0 640 260"
      className="w-full h-auto"
      role="img"
      aria-label="Cost comparison: 10 leads via Google Ads costs about $850, while unlimited leads via SmileFlow costs a flat $149 per month."
    >
      <title>Cost per lead: Google Ads versus SmileFlow</title>
      <desc>
        A bar chart comparing the cost of acquiring 10 dental patient leads via Google Ads
        (approximately $850, based on an $50 to $119 average cost per lead) against SmileFlow's
        flat $149 per month unlimited-lead plan.
      </desc>

      <text x="0" y="24" fontSize="12" fontWeight="700" letterSpacing="1.5" fill="#C5A038">
        10 PATIENT LEADS, ONE MONTH
      </text>

      {/* Google Ads bar */}
      <text x="0" y="70" fontSize="14" fill="#FDFCFB" opacity="0.7">
        Google Ads
      </text>
      <rect x="0" y="82" width="560" height="34" rx="6" fill="#FDFCFB" opacity="0.06" />
      <rect x="0" y="82" width="560" height="34" rx="6" fill="#FDFCFB" opacity="0.35" />
      <text x="572" y="105" fontSize="20" fontWeight="700" fill="#FDFCFB">
        ~$850
      </text>

      {/* SmileFlow bar */}
      <text x="0" y="160" fontSize="14" fill="#FDFCFB" opacity="0.7">
        SmileFlow (unlimited leads)
      </text>
      <rect x="0" y="172" width="560" height="34" rx="6" fill="#FDFCFB" opacity="0.06" />
      <rect x="0" y="172" width="98" height="34" rx="6" fill="#C5A038" />
      <text x="110" y="195" fontSize="20" fontWeight="700" fill="#FDFCFB">
        $149 flat
      </text>

      <text x="0" y="240" fontSize="11" fill="#FDFCFB" opacity="0.4">
        Based on an industry-average $50–$119 cost per dental lead via Google Ads and Local Services Ads.
      </text>
    </svg>
  );
}
