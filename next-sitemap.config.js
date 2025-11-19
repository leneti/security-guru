/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://securityguru.lt",
  priority: 0.7,
  generateRobotsTxt: true,
  // eslint-disable-next-line @typescript-eslint/require-await -- keeping for now
  transform: async (config, path) => {
    const baseEntry = {
      loc: path,
      changefreq: config.changefreq,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- should be a number
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };

    if (path === "/") {
      return {
        ...baseEntry,
        priority: 1,
      };
    }

    if (path.includes("paslaugos")) {
      return {
        ...baseEntry,
        priority: 0.5,
      };
    }

    return baseEntry;
  },
};
