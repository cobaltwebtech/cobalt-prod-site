import ogImageSrc from "@/images/cobalt-social.png";

export const SITE = {
  title: "Cobalt Web Technologies",
  tagline: "We connect your world to the world",
  description: "Cobalt Web Technologies offers website development, cloud computing services, digital marketing, online threat mitigations, content delivery networks, and much more. Cobalt's purpose is to bring you the best experience and service you need to run your business. We leverage our expertise to provide the best product for your needs.",
  description_short: "Based, built, coded, and shipped from Austin, TX USA",
  url: "https://www.cobaltweb.tech/",
  author: "Cobalt Web Technologies",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Webpage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "Website",
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
  description: "Cobalt Web Technologies offers website development, cloud computing services, digital marketing, online threat mitigations, content delivery networks, and much more. Cobalt's purpose is to bring you the best experience and service you need to run your business. We leverage our expertise to provide the best product for your needs.",
  image: ogImageSrc,
};
