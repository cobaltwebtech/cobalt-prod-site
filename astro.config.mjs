import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from '@inox-tools/sitemap-ext';
import compressor from "astro-compressor";
import {CopyFilesPlugin} from './copy-files.ts';

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/images/#authorizing-remote-images
  site: "https://www.cobaltweb.tech/",
  prefetch: true,
  build: {
    assets: 'assets'
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
    CopyFilesPlugin()
  ],
  output: 'server',
  experimental: {
    clientPrerender: true
  },
  adapter: vercel({
    imageService: true,
    webAnalytics: { 
      enabled: true 
    },
    edgeMiddleware: true
  }),
});
