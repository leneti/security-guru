/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://securityguru.lt",
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
    additionalSitemaps: ["https://securityguru.lt/sitemap.xml"],
  },
};
