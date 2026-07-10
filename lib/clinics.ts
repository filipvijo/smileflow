import type { Lang } from "./i18n";
import { CONTACT_EMAIL } from "./site";

export interface ClinicConfig {
  /** URL-safe unique id used in embed URLs and API calls. Use something unguessable for real clients. */
  id: string;
  /** Display name injected into the AI prompt and lead emails. */
  name: string;
  /** Default widget language; visitors can be overridden per-embed via ?lang=. */
  defaultLang: Lang;
  /** Where new-lead notifications are sent. */
  notifyEmail: string;
  /**
   * Hostnames allowed to embed this clinic's widget (e.g. "www.clinic.com").
   * Empty array = any origin (useful for demos). Checked against the iframe Referer.
   */
  allowedHosts: string[];
  /** Optional booking page the final CTA links to. Falls back to a mailto if absent. */
  bookingUrl?: string;
  /** Soft cap on analyses per day for this clinic across all visitors. */
  dailyAnalysisLimit: number;
  active: boolean;
}

/**
 * v1 clinic registry. File-based on purpose — with fewer than ~50 clients this is
 * simpler and cheaper than a database. Move to Supabase/Postgres when self-serve
 * signup is needed.
 */
const clinics: ClinicConfig[] = [
  {
    id: "demo",
    name: "SmileFlow Demo Clinic",
    defaultLang: "en",
    notifyEmail: process.env.LEAD_BCC_EMAIL ?? CONTACT_EMAIL,
    allowedHosts: [],
    dailyAnalysisLimit: 200,
    active: true,
  },
  {
    // Replace with your orthodontist client's real data — their live widget is your first case study.
    id: "orto-demo-rs",
    name: "Vaša Klinika",
    defaultLang: "sr",
    notifyEmail: process.env.LEAD_BCC_EMAIL ?? CONTACT_EMAIL,
    allowedHosts: [],
    dailyAnalysisLimit: 100,
    active: true,
  },
];

export function getClinic(id: string | null | undefined): ClinicConfig | null {
  if (!id) return null;
  const clinic = clinics.find((c) => c.id === id);
  return clinic && clinic.active ? clinic : null;
}

export function isHostAllowed(clinic: ClinicConfig, refererHeader: string | null, selfHost: string | null): boolean {
  if (clinic.allowedHosts.length === 0) return true;
  if (!refererHeader) return true; // referrer policies often strip it; don't lock out real patients
  try {
    const host = new URL(refererHeader).hostname;
    if (selfHost && host === selfHost) return true;
    return clinic.allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
  } catch {
    return false;
  }
}
