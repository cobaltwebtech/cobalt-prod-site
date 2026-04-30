/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="cloudflare-turnstile" />
/// <reference path="../worker-configuration.d.ts" />

// Global declaration for gsap animation library
declare global {
	interface Window {
		gsap: typeof import("gsap");
	}
}

// Injected at build time via Vite define in astro.config.mjs
declare const __APP_VERSION__: string;
