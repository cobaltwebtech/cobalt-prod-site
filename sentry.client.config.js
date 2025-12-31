import * as Sentry from "@sentry/astro";

// Only initialize in production
if (import.meta.env.PROD && import.meta.env.SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.SENTRY_DSN,
    sendDefaultPii: true,
    environment: import.meta.env.MODE,
  });
}