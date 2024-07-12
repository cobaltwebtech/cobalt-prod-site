import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import partytown from "@astrojs/partytown";

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
    starlight({
      title: "Cobalt Web Technologies Docs",
      defaultLocale: "root",
      disable404Route: true,
      customCss: ["./src/styles/starlight.css"],
      favicon: "/favicon.ico",
      components: {
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro"
      },
      head: [{
        tag: "meta",
        attrs: {
          property: "og:image",
          content: "https://www.cobaltweb.tech/" + "/cobalt-social.webp"
        }
      }, {
        tag: "meta",
        attrs: {
          property: "twitter:image",
          content: "https://www.cobaltweb.tech/" + "/cobalt-social.webp"
        }
      }]
    }), 
    compressor({
      gzip: false,
      brotli: true
    }), 
    partytown({
      debug: true,
      config: {
        forward: ["dataLayer.push", "umami.trackEvent", "umami.trackView", "turnstile.render"]
      }
    })
  ],
  output: 'server',
  experimental: {
    clientPrerender: true,
    directRenderScript: true
  },
  adapter: vercelServerless({
    edgeMiddleware: true,
    imageService: true,
    webAnalytics: { 
      enabled: true 
    }
  })
});
