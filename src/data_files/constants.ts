import ogImageSrc from "@/images/cobalt-ogimage.jpg";

export const SITE = {
  title: "Cobalt Web Technologies",
  tagline: "We connect your world to the world",
  description:
    "Cobalt Web Technologies builds high performance websites with secure managed cloud infrastructure along with digital marketing and SEO services.",
  description_short: "Based, built, coded, and shipped from Austin, TX USA",
  url: "https://www.cobaltweb.tech/",
  author: "Cobalt Web Technologies",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title} - Website Development, Cloud Computing Services, Digital Marketing, and IT Consulting`,
  description:
    "Cobalt Web Technologies builds high performance websites with secure managed cloud infrastructure along with digital marketing and SEO services.",
  image: ogImageSrc,
};
