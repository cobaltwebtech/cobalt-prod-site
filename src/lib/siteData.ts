export const siteMeta = {
	title: "Cobalt Web Technologies",
	tagline: "We connect your world to the world",
	description:
		"Cobalt Web Technologies builds high performance websites with secure managed cloud infrastructure along with digital marketing and SEO services.",
	description_short: "Based, built, coded, and shipped from Austin, TX USA",
	url: "https://www.cobaltweb.tech/",
	author: "Cobalt Web Technologies",
};

export const seoMeta = {
	title: siteMeta.title,
	description: siteMeta.description,
	structuredData: {
		"@context": "https://schema.org",
		"@type": "WebPage",
		inLanguage: "en-US",
		"@id": siteMeta.url,
		url: siteMeta.url,
		name: siteMeta.title,
		description: siteMeta.description,
		isPartOf: {
			"@type": "WebSite",
			url: siteMeta.url,
			name: siteMeta.title,
			description: siteMeta.description,
		},
	},
};

export const openGraph = {
	locale: "en_US",
	type: "website",
	url: siteMeta.url,
	title: `${siteMeta.title} - Website Development, Cloud Computing Services, Digital Marketing, and IT Consulting`,
	description:
		"Cobalt Web Technologies builds high performance websites with secure managed cloud infrastructure along with digital marketing and SEO services.",
};
