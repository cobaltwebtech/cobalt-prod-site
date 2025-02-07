# 💻 Cobalt Web Technologies

Cobalt's website is lightning fast and built with [Astro](https://astro.build/) and deployed on [Vercel](https://vercel.com/) for super fast performance.

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
- **Preline UI:** Implement prebuilt UI components for added elegance.
- **GSAP Integration:** Impress with professional and polished animations.
- **Markdown Content Collections:** Organize and manage the content seamlessly.
- **Starlight Documentation:** A sleek, user-friendly, full-featured documentation theme.
- **Internationalization (i18n):** Integrates Astro’s internationalization features.
- **SEO and Responsiveness:** Ensure our site is discoverable and accessible on any device.
- **Resend Email:** We use Resend integration for custom transactional emails from webforms.

## What's New

### Added Features

- [x] **Starlight Documentation Theme Integration**:

  - A sleek, user-friendly, full-featured documentation theme, which enhances the readability and usability of documentation.
  - Offers a range of features such as site navigation, built-in search functionality, dark mode, syntax highlighting for code, and improved SEO.
  - Seamlessly integrates internationalization (i18n) to provide support for documentation in multiple languages, catering to a global audience.
  - Designed to facilitate ease of use while offering a modern aesthetic in both light and dark themes to accommodate user preferences.

- [x] **Icon Set Component**:

  - Convenient and reusable Icon component that allows adding icons simply by providing a name prop.
  - Render any pre-defined icon SVG using `<Icon name="iconName" />` in the Astro components.
  - The Icon Component offers a centralized location for all SVG Icons across the project in one TypeScript file - allowing unified updates and easy maintenance.

- [x] **Internationalization (i18n) Features**:

  - Integrates [Astro’s internationalization (i18n) features](https://docs.astro.build/en/guides/internationalization/).
  - Additionally, a custom LanguagePicker component has been developed to facilitate language selection.

- [x] **Dynamic Table of Contents (ToC) with Scroll Progress Indicator**:
  - Enhances ease of navigation in insight posts by highlighting the relevant section in the ToC, and includes a progress indicator to visually represent scroll progress.
  - Developers seeking alternatives might consider the [remark-toc](https://github.com/remarkjs/remark-toc) plugin.

## Project Structure

Cobalt organizes modular components, content, and layouts to streamline development and content management.

```md
src/
├── assets/  
│ ├── scripts/ # JS scripts
│ └── styles/ # CSS styles
├── components/ # Reusable components
│ ├── Meta.astro # Meta component for SEO
│ ├── sections/ # Components for various sections of the website
│ ├── ThemeIcon.astro # Component for toggling light/dark themes
│ └── ui/ # UI components categorized by functionality
├── content/ # Markdown files for blog posts, insights, products, and site configuration
│ ├── products/  
│ ├── services/  
│ └── config.ts # Contains site-wide configuration options
├── data_files/ # Strings stored as JSON files
├── images/ # Static image assets for use across the website
├── layouts/ # Components defining layout templates
│ └── MainLayout.astro # The main wrapping layout for all pages
├── pages/ # Astro files representing individual pages and website sections
│ ├── 404.astro # Custom 404 page
│ ├── about.astro # About us page
│ ├── api/ # API routes are placed here
│ ├── contact/ # General contact page with webform
│ ├── index.astro # The landing/home page
│ ├── products/ # Product page contains ..slug.astro for rendering each product page dynamically
│ ├── services/ # Services page contains ..slug.astro for rendering each service page dynamically
│ ├── support/ # Support contact page with webform
└── utils/ # Shared utility functions and helpers
```

## Integrations and Enhancements

Cobalt leverages the power of Astro — a modern, cutting-edge site building framework — and integrates it seamlessly with the utility-first CSS framework TailwindCSS, to deliver exceptional site performance and a seamless user experience. Here are some notable integrations and enhancements included in the project:

### Lenis for Smooth Scrolling

Experience buttery smooth scrolling with [Lenis](https://lenis.studiofreight.com/). We've integrated Lenis to provide an enhanced scrolling experience that's both fluid and responsive.

### GSAP Integration

For individual product pages, [GSAP](https://gsap.com/) has been integrated to add engaging animations that execute as soon as the product page loads.

### Resend Integration

Send form data securely using [Resend](https://resend.com/). The Resend API route can be customized to set up any template to email any or all of the form data captured. This is set up as a transactional email service for notification of form submission.

### Hiding Scrollbar

To achieve a cleaner and more spacious design, the default scrollbar has been visually removed.

### SEO Configuration

The SEO Configuration is designed to optimize the website's visibility on search engines and social media platforms.

- [Astro Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/): Automatically generates an XML sitemap during build for the website, which is vital for SEO and helping search engine bots crawl pages effectively.

- Using constants.ts: The SEO configuration has been centralized using the `constants.ts` file. This file manages SEO-related data such as page titles, descriptions, structured data, and Open Graph tags, providing a more structured and manageable approach to SEO management.

- Meta.astro Component: This astro component contains the metadata, sitemap location, Open Graph info, and other SEO configurations.

- Robots.txt: A robots.txt file is placed in the /public folder to be copied over during build. We list the allowed search engines to crawl the site and location of the sitemap.

### Astro Integrations

Our website's efficiency is maximized with these built-in Astro integrations:

- [Asset Minification](https://github.com/PlayForm/Compress): By default Astro will perform basic minification of most assets. For optimal site performance, the generated HTML is minified after the build phase to further reduce file size and speed up load times.

- [Astro Compressor](https://github.com/sondr3/astro-compressor#readme): Automatically compresses Astro generated assets using brotli for smaller file sizes ensuring faster load times.

- [Bag of Tricks for Astro's View Tran­si­tions](https://github.com/martrapp/astro-vtbot#readme): is a collection of extensions and support aimed at enhancing Astro's view transitions. This toolkit offers various techniques to elevate a project. In the template, it was used to add View Transitions to a Starlight docs.

### Preline UI

Interactive components like navbars, modals, and accordions are built using [Preline UI](https://preline.co), a comprehensive open-source component library.

### Tailwind CSS

Styling across our project leverages the utility-first classes offered by [Tailwind CSS](https://tailwindcss.com). This methodology allows us to create custom layouts and components with speed and efficiency.

To ensure consistent code formatting, particularly for class sorting, we have integrated the `prettier-plugin-tailwindcss` [plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

### Deployment and Security

We deploy our project on [Vercel](https://vercel.com), capitalizing on their robust platform for seamless CI/CD workflows.

### Documentation Links

- [Astro Documentation](https://docs.astro.build/en/getting-started/)
- [Preline UI Documentation](https://preline.co/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs/introduction)

## License

This project is released under the MIT License. Please read the [LICENSE](https://github.com/cobaltwebtech/cobalt-prod-site/blob/main/LICENSE) file for more details.
