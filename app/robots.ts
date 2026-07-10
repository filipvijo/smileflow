import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Search and user-requested retrieval bots that can surface citations.
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "OAI-AdsBot",
          "PerplexityBot",
          "Perplexity-User",
          "Claude-SearchBot",
          "Claude-User",
          "Applebot",
        ],
        allow: "/",
        disallow: "/api/",
      },
      {
        // Training controls are intentionally permissive for launch visibility.
        userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended"],
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
