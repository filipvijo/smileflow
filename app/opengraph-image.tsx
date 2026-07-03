import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D1B2A",
          padding: "72px 80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#FDFCFB" }}>
          SmileFlow<span style={{ color: "#D4AF37" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#FDFCFB", lineHeight: 1.1, maxWidth: 900 }}>
            AI smile analysis that turns visitors into leads
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#FDFCFB", opacity: 0.6, maxWidth: 820 }}>
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 24px",
              borderRadius: 999,
              background: "#D4AF37",
              color: "#0D1B2A",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            $149/mo, unlimited leads
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "#FDFCFB", opacity: 0.4 }}>
            No per-consult fees
          </div>
        </div>
      </div>
    ),
    size
  );
}
