import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zn.by",
        pathname: "/dj_media/source_avatars/**",
      },
    ],
  },
};

export default nextConfig;
