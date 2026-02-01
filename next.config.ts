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
};

export default withPayload(nextConfig);
