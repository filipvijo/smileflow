import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { serializeJsonLd, siteGraphJsonLd } from "@/lib/seo";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Turn Website Visitors into Dental Consultation Leads`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Dental software",
  keywords: [
    "dental lead generation",
    "AI smile analysis",
    "dental marketing widget",
    "smile assessment software",
    "cosmetic dentistry leads",
    "dental website widget",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI Smile Analysis for Dental Clinics`,
    description: SITE_DESCRIPTION,
    images: [{ url: `${SITE_URL}/og.png`, width: 1736, height: 909, alt: "SmileFlow turns a curious smile into a booked consultation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI Smile Analysis for Dental Clinics`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${newsreader.variable}`}>
      <body>
        {children}
        <Toaster position="top-center" expand={true} richColors theme="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteGraphJsonLd) }}
        />
      </body>
    </html>
  );
}
