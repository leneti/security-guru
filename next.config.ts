import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [
    "securityguru-dev",
    "securityguru",
    "securityguru.namutv.uk",
    "securityguru-dev.namutv.uk",
    "192.168.1.130",
  ],
  images: {
    remotePatterns: [new URL("https://example.com/**")],
  },
};

export default withPayload(nextConfig);
