import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/example-case-study",
        destination: "/work/getbujo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
