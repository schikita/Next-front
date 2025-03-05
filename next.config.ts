const nextConfig = {
  reactStrictMode: false, // Отключаем строгий режим (на время тестов)
  experimental: {
    appDir: true, // Должно быть включено
  },
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
