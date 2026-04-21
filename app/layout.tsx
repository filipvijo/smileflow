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
  title: "SmileFlow • High-Performance AI Lead Acquisition for Dentists",
  description: "The premier AI smile analysis widget for modern dental clinics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${inter.variable} ${dmSerif.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
        <Toaster position="top-center" expand={true} richColors theme="dark" />
      </body>
    </html>
  );
}
