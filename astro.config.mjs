import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import minify from "@playform/compress";
import compressor from "astro-compressor";
import icon from "astro-icon";
import sentry from "@sentry/astro";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  site: "https://www.cobaltweb.tech",
  prefetch: {
    prefetchAll: true,
  },
  build: {
    assets: "assets",
    inlineStylesheets: "always",
  },
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    icon(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        if (url.pathname.includes("/submission-received")) return false;
        return true;
      },
    }),
    ...(isProduction
      ? [
          sentry({
            dsn: "https://1cb4221444916db69fb6830adcab2f20@o4508880993058816.ingest.us.sentry.io/4508881028907008",
            sourceMapsUploadOptions: {
              project: "cobalt-site-prod",
              authToken: process.env.SENTRY_AUTH_TOKEN,
            },
          }),
        ]
      : []),
    minify({
      CSS: false,
      HTML: true,
      Image: false,
      JavaScript: false,
      SVG: true,
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
  ],
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
  }),
});
