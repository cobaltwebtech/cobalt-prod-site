import type { APIRoute } from "astro";

interface Favicon {
  purpose: "any" | "maskable" | "monochrome";
  sizes: number[];
}

const sizes = [192, 512];
const favicons: Favicon[] = [
  {
    purpose: "any",
    sizes,
  },
  {
    purpose: "maskable",
    sizes,
  },
];

export const GET: APIRoute = async () => {
  const icons = favicons.flatMap((favicon) =>
    sizes.map((size) => ({
      src: `/icons/${favicon.purpose}-${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: favicon.purpose,
    })),
  );

  const manifest = {
    short_name: "Cobalt",
    name: "Cobalt Web Technologies",
    icons,
    display: "minimal-ui",
    id: "/",
    start_url: "/",
    theme_color: "#001689",
    background_color: "#000835",
  };

  return new Response(JSON.stringify(manifest));
};
