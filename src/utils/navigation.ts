// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services/" },
  { name: "Products", url: "/products/" },
  { name: "About Us", url: "/about/" },
  { name: "Support", url: "/support/" },
  { name: "Contact", url: "/contact/" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "What We Offer",
    links: [
      { name: "Services", url: "/services/" },
      { name: "Products", url: "/products/" },
    ],
  },
  {
    section: "Company",
    links: [
      { name: "About Us", url: "/about/" },
      { name: "Support", url: "/support/" },
      { name: "Contact Us", url: "/contact/" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  x: "https://x.com/cobaltcag",
  github: "https://github.com/cobaltwebtech/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
