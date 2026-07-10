import { headers } from "next/headers";
import SmileWidget from "@/components/SmileWidget";
import { getClinic, isHostAllowed } from "@/lib/clinics";
import { resolveLang } from "@/lib/i18n";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Smile analysis widget",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default async function EmbedPage({
  params,
  searchParams,
}: {
  params: Promise<{ clinicId: string }>;
  searchParams: Promise<{ lang?: string; booking?: string }>;
}) {
  const { clinicId } = await params;
  const { lang: langParam, booking } = await searchParams;

  const clinic = getClinic(clinicId);
  if (!clinic) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-white/60 text-sm">This widget is not active. Contact your SmileFlow account manager.</p>
      </div>
    );
  }

  const headerList = await headers();
  const referer = headerList.get("referer");
  const selfHost = headerList.get("host")?.split(":")[0] ?? null;
  if (!isHostAllowed(clinic, referer, selfHost)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-white/60 text-sm">This domain is not authorized to embed this widget.</p>
      </div>
    );
  }

  const lang = resolveLang(langParam ?? clinic.defaultLang);

  return (
    <div className="min-h-screen bg-[#0D1B2A] p-4 flex items-start justify-center">
      <SmileWidget clinicId={clinic.id} lang={lang} bookingUrl={booking || clinic.bookingUrl} embedded />
    </div>
  );
}
