import fs from 'node:fs/promises';
import { globby } from 'globby';
import { minify } from 'html-minifier';

// Define paths for static and server-rendered pages
const staticPath = './.vercel/output/static';
const serverPath = './.vercel/output/functions';

// Get all HTML files from both directories
const staticFiles = await globby(`${staticPath}/**/*.html`);
const serverFiles = await globby(`${serverPath}/**/*.html`);

// Combine the file lists
const files = [...staticFiles, ...serverFiles];

await Promise.all(
  files.map(async (file) => {
    console.log('Processing file:', file);
    let html = await fs.readFile(file, 'utf-8');

    // Minify the HTML
    html = minify(html, {
      removeComments: true,
      preserveLineBreaks: true,
      collapseWhitespace: true,
      minifyJS: true,
    });

    await fs.writeFile(file, html);
  })
);

console.log('HTML processing complete.');