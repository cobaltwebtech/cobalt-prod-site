import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from '@inox-tools/sitemap-ext';
import compressor from "astro-compressor";

export default defineConfig({
  site: "https://www.cobaltweb.tech",
  prefetch: true,
  build: {
    assets: 'assets'
  },
  output: 'server',
  experimental: {
    clientPrerender: true
  },
  integrations: [
    tailwind(),
    sitemap({
      includeByDefault: true,
      i18n: {
        defaultLocale: "en",
        // All urls that don't contain `fr` after `https://www.cobaltweb.tech/` will be treated as default locale, i.e. `en`
        locales: {
          en: "en" // The `defaultLocale` value must present in `locales` keys
        }
      }
    }),
    compressor({ 
      gzip: false,
      brotli: true
    }),
  ],
  adapter: vercel({
    imageService: true,
    webAnalytics: { 
      enabled: true 
    },
    edgeMiddleware: true
  }),
});
