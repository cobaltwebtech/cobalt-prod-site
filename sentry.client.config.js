import * as Sentry from "@sentry/astro";


Sentry.init({
  dsn: "https://a19083d3c9d84796f3c2d2372eb11847@o4508880993058816.ingest.us.sentry.io/4508881028907008",
  sendDefaultPii: true,
  environment: import.meta.env.MODE,
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  // Enable logs to be sent to Sentry
  enableLogs: true,  
});
