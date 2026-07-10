/**
 * Single source of truth for the production URL. Set NEXT_PUBLIC_SITE_URL once
 * the domain is live (Vercel env var) — every SEO surface (sitemap, robots,
 * canonical tags, JSON-LD, OG images) reads from here instead of hardcoding it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://getsmileflow.com").replace(/\/$/, "");

export const SITE_NAME = "SmileFlow";

export const CONTACT_EMAIL = "contact@getsmileflow.com";

export const LEGAL_NAME = "Fluxora LTD";

export const SITE_DESCRIPTION =
  "AI smile analysis widget for dental clinics. Turn website visitors into qualified consultation leads with instant, on-brand aesthetic reports.";
