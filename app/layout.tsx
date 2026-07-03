import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
  title: "SmileFlow — AI Smile Analysis Widget for Dental Clinics",
  description:
    "Turn your clinic's website visitors into consultation requests. Patients upload a selfie, get an instant AI smile report — you get a qualified lead in your inbox.",
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
      </body>
    </html>
  );
}
