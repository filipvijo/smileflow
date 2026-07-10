import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CONTENT_DATES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: CONTENT_DATES.home, changeFrequency: "weekly", priority: 1, images: [`${SITE_URL}/og.png`, `${SITE_URL}/images/hero-smile.png`] },
    { url: `${SITE_URL}/resources`, lastModified: CONTENT_DATES.resources, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/guides/ai-smile-analysis-dental-clinics`, lastModified: CONTENT_DATES.aiSmileAnalysisGuide, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/guides/dental-website-lead-generation`, lastModified: CONTENT_DATES.dentalWebsiteLeadGuide, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/compare`, lastModified: CONTENT_DATES.compare, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/dental-lead-costs`, lastModified: CONTENT_DATES.dentalLeadCosts, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/about`, lastModified: CONTENT_DATES.about, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: CONTENT_DATES.privacy, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, lastModified: CONTENT_DATES.terms, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/security`, lastModified: CONTENT_DATES.security, changeFrequency: "yearly", priority: 0.4 },
  ];
}
