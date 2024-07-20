// Middleware script
import { minify } from 'html-minifier-terser';
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('text/html')) {
    const html = await response.text();
    
    try {
      const minifiedHtml = await minify(html, {
        removeComments: true,
        preserveLineBreaks: true,
        collapseWhitespace: true,
        minifyJS: true,
      });

      return new Response(minifiedHtml, {
        status: response.status,
        headers: response.headers,
      });
    } catch (error) {
      console.error('Minification error:', error);
      // Return original response if minification fails
      return response;
    }
  }

  return response;
};