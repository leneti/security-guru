/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://securityguru.lt",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin/", "/api/"] },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://securityguru.lt"}/sitemap.xml`,
    ],
  },
};
