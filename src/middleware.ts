// Middleware script
import type { MiddlewareHandler } from 'astro';

// Simple HTML minification function
function minifyHTML(html: string): string {
  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/<!--[\s\S]*?-->/g, '');
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('text/html')) {
    const html = await response.text();
    
    try {
      const minifiedHtml = minifyHTML(html);

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
