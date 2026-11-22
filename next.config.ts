import type { NextConfig } from "next";

/*
 * サイトは全ページを静的に生成するため、Cache Components は使わない。
 * （使うと未定義の作品 URL が 404 ではなく 200 で返るため）
 */
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
