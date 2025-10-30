// An array of menu items for navigation bar (header)
const navbarItems = [
	{ name: "Services", url: "/services/" },
	{ name: "Products", url: "/products/" },
	{ name: "About Us", url: "/about/" },
	{ name: "Support", url: "/support/" },
	{ name: "Contact", url: "/contact/" },
];
// An array of menu items for footer
const footerItems = [
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
			{ name: "Client Support", url: "/support/" },
			{ name: "Contact Us", url: "/contact/" },
		],
	},
];

export default {
	navbarItems,
	footerItems,
};
