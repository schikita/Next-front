const nextConfig = {
  reactStrictMode: false, // Отключаем строгий режим (на время тестов)
  experimental: {
    //appDir: true, // Должно быть включено
  },
  images: {
    domains: ["zn.by"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zn.by",
        pathname: "/dj_media/source_avatars/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
