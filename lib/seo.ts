import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const CONTENT_DATES = {
  home: "2026-07-10",
  compare: "2026-07-10",
  dentalLeadCosts: "2026-07-10",
  resources: "2026-07-10",
  aiSmileAnalysisGuide: "2026-07-10",
  dentalWebsiteLeadGuide: "2026-07-10",
  about: "2026-07-10",
  privacy: "2026-07-10",
  terms: "2026-07-10",
  security: "2026-07-10",
} as const;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/og.png`,
          width: 1736,
          height: 909,
          alt: "SmileFlow AI smile analysis for dental clinics",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified = datePublished,
  about,
  citations = [],
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  about: string[];
  citations?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${path}`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    datePublished,
    dateModified,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    image: `${SITE_URL}/og.png`,
    about,
    ...(citations.length ? { citation: citations } : {}),
  };
}

export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
      description: SITE_DESCRIPTION,
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales and support",
        email: CONTACT_EMAIL,
        availableLanguage: ["English", "Serbian"],
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Dental lead generation software",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      provider: { "@id": ORGANIZATION_ID },
      isPartOf: { "@id": WEBSITE_ID },
      offers: [
        {
          "@type": "Offer",
          name: "Clinic plan",
          price: "149",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        },
        {
          "@type": "Offer",
          name: "Agency white-label plan",
          price: "499.99",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        },
      ],
    },
  ],
};
