import { readFileSync } from "node:fs";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import minify from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import varlockAstroIntegration from "@varlock/astro-integration";
import { defineConfig, fontProviders } from "astro/config";
import compressor from "astro-compressor";

const pkg = JSON.parse(
	readFileSync(new URL("./package.json", import.meta.url), "utf-8"),
);

export default defineConfig({
	site: "https://www.cobaltweb.tech",
	output: "static",
	prefetch: {
		prefetchAll: true,
	},
	vite: {
		plugins: [tailwindcss()],
		define: {
			__APP_VERSION__: JSON.stringify(pkg.version),
		},
	},
	adapter: cloudflare({
		imageService: {
			build: "compile",
			runtime: "cloudflare-binding",
		},
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
			name: "Alexandria",
			cssVariable: "--default-font-family",
			options: {
				variants: [
					{
						src: ["./public/fonts/default-font_variable.woff2"],
						weight: "100 900",
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
		varlockAstroIntegration(),
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
