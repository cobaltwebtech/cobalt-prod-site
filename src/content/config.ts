// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { defineCollection, z } from "astro:content";

const productsCollection = defineCollection({
	type: "content",
	schema: () =>
		z.object({
			title: z.string(),
			subHeading: z.string(),
			main: z.object({
				id: z.number(),
				description1: z.string(),
				description2: z.string(),
				imgCard: z.string(),
				imgMain: z.string(),
				imgAlt: z.string(),
			}),
			tabs: z.object({
				title1: z.string(),
				title2: z.string(),
			}),
			tabFirst: z.object({
				title: z.string(),
				subTitle: z.string(),
				ctaDescription: z.string(),
				btnTitle: z.string(),
				btnURL: z.string(),
			}),
			tabFirstItems: z.array(
				z.object({
					title: z.string(),
					subTitle: z.string(),
				}),
			),
			tabSecond: z.object({
				title: z.string(),
				subTitle: z.string(),
				ctaDescription: z.string(),
				btnTitle: z.string(),
				btnURL: z.string(),
			}),
			tabSecondItems: z.array(
				z.object({
					title: z.string(),
					subTitle: z.string(),
				}),
			),
		}),
});

const servicesCollection = defineCollection({
	type: "content",
	schema: () =>
		z.object({
			title: z.string(),
			subHeading: z.string(),
			main: z.object({
				id: z.number(),
				description1: z.string(),
				description2: z.string(),
				imgMain: z.string(),
				imgAlt: z.string(),
			}),
			tabs: z.object({
				title1: z.string(),
				title2: z.string(),
			}),
			tabFirst: z.object({
				title: z.string(),
				subTitle: z.string(),
				ctaDescription: z.string(),
				btnTitle: z.string(),
				btnURL: z.string(),
			}),
			tabFirstItems: z.array(
				z.object({
					title: z.string(),
					subTitle: z.string(),
				}),
			),
			tabSecond: z.object({
				title: z.string(),
				subTitle: z.string(),
				ctaDescription: z.string(),
				btnTitle: z.string(),
				btnURL: z.string(),
			}),
			tabSecondItems: z.array(
				z.object({
					title: z.string(),
					subTitle: z.string(),
				}),
			),
		}),
});

export const collections = {
	products: productsCollection,
	services: servicesCollection,
};
