import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";

// https://astro.build/config
export default defineConfig({
  // trailingSlash: 'always',
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://www.cobaltweb.tech/",
  prefetch: true,
  build: {
    assets: 'assets'
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        // All urls that don't contain `fr` after `https://www.cobaltweb.tech/` will be treated as default locale, i.e. `en`
        locales: {
          en: "en" // The `defaultLocale` value must present in `locales` keys
        }
      }
    }), 
    //astro-compressor must be last config in the integrations parameters
    compressor({ 
      gzip: false,
      brotli: true
    })
  ],
  output: 'server',
  server: {
    host: true
  },
  experimental: {
    clientPrerender: true
  },
  adapter: vercel({
    imageService: true,
    webAnalytics: { 
      enabled: true 
    }
  })
});
