import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@import "/app/styles/main.scss";`,
  },
};

export default nextConfig;
