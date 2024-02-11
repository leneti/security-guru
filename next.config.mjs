// @ts-check
import initBundleAnalyzer from "@next/bundle-analyzer";
import initMdx from "@next/mdx";

const withBundleAnalyzer = initBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
};

export default withBundleAnalyzer(initMdx()(nextConfig));
