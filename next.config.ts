import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оставляем native-модули вне бандла RSC, иначе Next пытается подложить fs в браузер
  serverExternalPackages: ["bcrypt"],
};

export default nextConfig;
