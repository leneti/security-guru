import type { MetadataRoute } from "next";

/**
 * Dynamic robots.txt generator that returns different content based on environment.
 * - Development/preview: Blocks all indexing
 * - Production: Allows indexing with sitemap reference
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === "production";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://securityguru.lt";

  if (isProduction) {
    return {
      rules: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: ["/admin/", "/api/"] },
      ],
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  // Development/preview: block all indexing
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
