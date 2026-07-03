import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI Smile Analysis Widget for Dental Clinics`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
    title: `${SITE_NAME} — AI Smile Analysis Widget for Dental Clinics`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — AI Smile Analysis Widget for Dental Clinics`,
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: SITE_DESCRIPTION,
  offers: [
    {
      "@type": "Offer",
      name: "Clinic plan",
      price: "149",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      description: "Unlimited AI smile analyses and leads for one clinic website.",
    },
    {
      "@type": "Offer",
      name: "Agency white-label plan",
      price: "499",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      description: "Unlimited clinic installs under the agency's own branding.",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
        <Toaster position="top-center" expand={true} richColors theme="dark" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
      </body>
    </html>
  );
}
