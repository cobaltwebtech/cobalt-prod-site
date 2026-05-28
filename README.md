# 💻 Cobalt Web Technologies

Cobalt's website is lightning fast and built with [Astro](https://astro.build/) and deployed on [Cloudflare Workers](https://workers.cloudflare.com/) for super fast performance and flexibility.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)

Find us at [https://www.cobaltweb.tech/](https://www.cobaltweb.tech/?utm_source=github&utm_medium=web&utm_campaign=github-repo)

This is the production code repo for our website.

![Cobalt Web Technologies screenshot](https://cobalt2.b-cdn.net/graphics/cobalt-screenshot.avif)

## 💾 Is your website stuck in the 90's? 📠

Are you looking to supercharge your current website or build a brand new one from the ground up? From e-commerce to a simple blog to large-scale asset delivery web application, we can design and build whatever you need.

Let us build you an amazing web experience for you and your customers.

Check us out [https://www.cobaltweb.tech/](https://www.cobaltweb.tech/?utm_source=github&utm_medium=web&utm_campaign=github-repo)

## 🆒 Features

- **Astro-Powered:** Utilize a modern static-site generation framework.
- **Tailwind CSS:** Enjoy rapid UI development with a utility-first CSS framework.
- **Starwind UI:** A set of powerful, accessible components for Astro projects.
- **GSAP Integration:** Impress with professional and polished animations.
- **Markdown Content Collections:** Organize and manage the content seamlessly.
- **SEO and Responsiveness:** Ensure our site is discoverable and accessible on any device.
- **Resend Email:** We use Resend integration for custom transactional emails.

## What's New

### Added Features

- [x] **Starwind UI**:
  - Added the Starwind UI which bring reusuable components built specifically for Astro projects. Like Shadcn, but purely Astro components and JavaScript. Styled with Tailwind CSS v4. Open Source.

- [x] **Astro Icon Integration**:
  - Astro Icon is ready to use, with zero additional configuration. The included Icon component allows easy method to inline svgs directly into the Astro project.
  - Icons can be imported and referenced from third party libraries by setting the name attribute in the Icon component.
  - Custom local SVGs can also be used by placing the svg file in the `/src/icons` folder and referencing the name in the Icon component.
  - Can apply Tailwind styling classes as well as custom styling on the icon.

- [x] **View Transitions**:
  - Astro supports view transitions with just a few lines of code. View transitions update the page content without the browser’s normal, full-page navigation refresh and provide seamless animations between pages.
  - View Transitions can be customized with various animation effects and linking of assets to create a seamless transition effect while browsing the site.

- [x] **Migrate to Biome**:
  - We have migrated from ESLint and Prettier to [Biome](https://biomejs.dev/). Biome is a fast formatter for JavaScript, TypeScript, JSX, TSX, JSON, HTML, CSS and GraphQL that scores 97% compatibility with Prettier, saving CI and developer time.
  - Biome has been updated to support Astro and TailwindCSS.

## Project Structure

Cobalt organizes modular components, content, and layouts to streamline development and content management.

```md
src/
├── actions/ # Directory for Astro Actions backend server functions
├── components/ # Reusable components
│ ├── sections/ # Components for various sections of the website
│ ├── starwind/ # Starwind UI reusable components (buttons, input, tabs, etc.)
│ └── ui/ # Custom made UI components categorized by functionality
├── content/ # Markdown files for blog posts, insights, products, and site configuration
│ ├── products/ # Markdown files for each product
│ ├── services/ # Markdown files for each service
│ └── config.ts # Contains content collections configuration options
├── icons/ # SVG icons used by Astro Icon plugin
├── images/ # Image assets for use across the website (images are optimized by the Astro image service)
├── layouts/ # Components defining layout templates
│ ├── MainLayout.astro # The base html structure layout for all pages
│ └── Meta.astro # Meta component injected into MainLayout.astro for SEO, favicons, and fonts
├── lib/ # Directory for storing various site-wide functions, data arrays, and utilities
├── pages/ # Astro files for the page-based routes
│ ├── 404.astro # 404 error page
│ ├── about.astro # About us page
│ ├── contact/ # General contact page with webform
│ ├── index.astro # The landing/home page
│ ├── products/ # Product page contains ..slug.astro for rendering each product page dynamically
│ ├── services/ # Services page contains ..slug.astro for rendering each service page dynamically
│ ├── support/ # Support contact page with webform
│ └── manifest.json.ts # Web manifest rendered in json after build
└── styles/ # CSS stylesheets (Tailwind config in global.css)
```

## Integrations and Enhancements

Cobalt leverages the power of Astro — a modern, cutting-edge site building framework — and integrates it seamlessly with the utility-first CSS framework TailwindCSS, to deliver exceptional site performance and a seamless user experience. Here are some notable integrations and enhancements included in the project:

### Starwind UI

[Starwind UI](https://starwind.dev/) takes a different approach to component libraries. Rather than being constrained by a package’s implementation access to the source code is provided directly.

- Own The Code: Using the easy-to-use CLI tool, components and code can be installed directly to an Astro project. This gives complete control over the implementation and allows modification of the code to fit any specific needs.

- Full Customization: Every aspect of each component is fully customizable and themed using Tailwind CSS.

### Lenis for Smooth Scrolling

Experience buttery smooth scrolling with [Lenis](https://lenis.studiofreight.com/). We've integrated Lenis to provide an enhanced scrolling experience that's both fluid and responsive.

### Astro Icon

[Astro Icon](https://www.astroicon.dev/) is integrated for easy to use SVG icons. The included Icon component allows easy method to inline svgs directly into the Astro project. Icons can be imported and referenced from third party libraries as well as local SVGs placed in the `/src/icons` folder. Tailwind classes can be used for styling the SVG icons.

### GSAP Integration

For individual product pages, [GSAP](https://gsap.com/) has been integrated to add engaging animations that execute as soon as the page loads.

### Resend Integration

Send form data securely using [Resend](https://resend.com/). We use [Astro Actions](https://docs.astro.build/en/guides/actions/) backend server functions to handle form submissions. This is more effecient and secure than using a traditional API endpoint to handle the form data and server functions. This is set up as a transactional email service for notification of form submission.

### SEO Configuration

The SEO Configuration is designed to optimize the website's visibility on search engines and social media platforms.

- [Astro Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/): Automatically generates an XML sitemap during build for the website, which is vital for SEO and helping search engine bots crawl pages effectively.

- SEO configruation: SEO data and configuration is handled by the `siteData.ts` file. This file manages SEO-related data such as page titles, descriptions, structured data, and Open Graph tags, providing a more structured and manageable approach to SEO management. This data is used in the `Meta.astro` component which contains the metadata, XML sitemap location, favicons, Open Graph info, and other SEO configurations.

- Robots.txt: A robots.txt file is placed in the `/public` folder to be copied over during build. We list the allowed search engines to crawl the site and location of the sitemap.

### Performance Enhancements

Our website's efficiency is maximized with these built-in Astro integrations:

- [Asset Minification](https://github.com/PlayForm/Compress): By default Astro will perform basic minification of most assets. For optimal site performance, the generated HTML is minified after the build phase to further reduce file size and speed up load times.

- [Astro Compressor](https://github.com/sondr3/astro-compressor#readme): Automatically compresses Astro generated assets using brotli for smaller file sizes ensuring faster load times.

### Tailwind CSS

Styling across our project leverages the utility-first classes offered by [Tailwind CSS](https://tailwindcss.com). This methodology allows us to create custom layouts and components with speed and efficiency.

### Deployment and Security

We deploy our project on [Cloudflare Workers](https://workers.cloudflare.com/), capitalizing on their robust and global platform for seamless CI/CD workflows.

- [Workers KV](https://developers.cloudflare.com/kv/): We use Workers KV for data storage that allows use to store and retrieve data globally. KV can cache API responses, store authentication details, store user data, and much more without having to configure a complicated database and seamlessly connects to a Cloudflare Worker.

- [R2](https://developers.cloudflare.com/r2/): We use Cloudflare Object R2 Storage which allows us to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services (looking at you AWS and your exepensive egress fees).

### Documentation Links

- [Astro Documentation](https://docs.astro.build/en/getting-started/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Starwind UI Documentation](https://starwind.dev/docs/getting-started/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs/introduction)

## License

This project is released under the MIT License. Please read the [LICENSE](https://github.com/cobaltwebtech/cobalt-prod-site/blob/main/LICENSE) file for more details.
