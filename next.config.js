// @ts-check
const initBundleAnalyzer = require("@next/bundle-analyzer");
const initMdx = require("@next/mdx");

const withBundleAnalyzer = initBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = initMdx({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  pageExtensions: ["tsx", "mdx"],
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(withMDX(nextConfig));
