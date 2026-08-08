import type { NextConfig } from "next";

// CSP без nonce — приложение статически генерируется, и nonce потребовал бы
// динамического рендеринга (медленнее, нет CDN-кэширования).
// 'unsafe-inline' для style-src нужен: Tailwind + framer-motion инжектят стили.
// frame-src разрешает YouTube/Google Drive (видеокурсы).
const isDev = process.env.NODE_ENV === "development";

const cspHeader = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' blob: data:",
  "font-src 'self' data:",
  // YouTube и Google Drive используются для видеокурсов/вебинаров
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://drive.google.com",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspHeader,
  },
  // Запрещаем браузеру угадывать MIME-тип (защита от XSS при загрузке файлов)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Разрешаем встраивание страницы только на своих же доменах (clickjacking).
  // НЕ 'DENY' — iframe'ы могут быть нужны для легитимных предпросмотров.
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Не отдаём реферер на сторонние сайты целиком
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Принудительный HTTPS на 2 года, включая поддомены
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Отключаем ненужные браузерные API
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Скрываем версию Next.js
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  // Скрываем заголовок X-Powered-By: Next.js
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
