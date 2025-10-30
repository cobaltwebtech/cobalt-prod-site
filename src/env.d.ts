/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference path="../worker-configuration.d.ts" />

// Global declaration for gsap animation library
declare global {
	interface Window {
		gsap: typeof import("gsap");
	}
}
