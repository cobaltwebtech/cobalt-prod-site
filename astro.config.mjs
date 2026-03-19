import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import minify from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import compressor from "astro-compressor";

export default defineConfig({
	site: "https://www.cobaltweb.tech",
	output: "static",
	prefetch: {
		prefetchAll: true,
	},
	vite: {
		plugins: [tailwindcss()],
	},
	adapter: cloudflare({
		imageService: { build: "compile", runtime: "cloudflare-binding" },
	}),
	experimental: {
		rustCompiler: true,
		queuedRendering: {
			enabled: true,
		},
		clientPrerender: true,
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Proxima Nova",
			cssVariable: "--default-font-family",
			options: {
				variants: [
					{
						src: ["./public/fonts/ProximaNova-Regular.woff2"],
						weight: "400",
						style: "normal",
					},
					{
						src: ["./public/fonts/ProximaNova-Bold.woff2"],
						weight: "700",
						style: "normal",
					},
					{
						src: ["./public/fonts/ProximaNova-ExtraBold.woff2"],
						weight: "900",
						style: "normal",
					},
				],
			},
		},
	],
	image: {
		layout: "constrained",
		objectFit: "cover",
		objectPosition: "center",
		responsiveStyles: true,
	},
	integrations: [
		// icon(),
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
});
