import type { NextConfig } from "next";
import initBundleAnalyzer from "@next/bundle-analyzer";
import initMdx from "@next/mdx";

const withBundleAnalyzer = initBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  pageExtensions: ["ts", "tsx", "mdx"],
  productionBrowserSourceMaps: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

const withMDX = initMdx();
export default withBundleAnalyzer(withMDX(nextConfig));
