import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import minify from "@playform/compress";
import compressor from "astro-compressor";
import icon from "astro-icon";

export default defineConfig({
  site: "https://www.cobaltweb.tech",
  output: "static",
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    clientPrerender: true,
  },
  image: {
    layout: "constrained",
    objectFit: "cover",
    objectPosition: "center",
    responsiveStyles: true,
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
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),
});
