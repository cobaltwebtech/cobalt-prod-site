import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import minify from "@playform/compress";
import compressor from "astro-compressor";
import icon from "astro-icon";

export default defineConfig({
  site: "https://www.cobaltweb.tech",
  prefetch: {
    prefetchAll: true,
  },
  build: {
    assets: "assets",
    inlineStylesheets: "always",
  },
  output: "server",
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    tailwind(),
    icon(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        if (url.pathname.includes("/submission-received")) return false;
        return true;
      },
    }),
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
