import * as Sentry from "@sentry/astro";

// Only initialize in production
if (import.meta.env.PROD && import.meta.env.PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.PUBLIC_SENTRY_DSN,
    sendDefaultPii: true,
    environment: import.meta.env.MODE,
    integrations: [
      // send console.log, console.warn, and console.error calls as logs to Sentry
      Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
    ],
    // Enable logs to be sent to Sentry
    enableLogs: true,  
  });
}