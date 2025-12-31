import * as Sentry from "@sentry/cloudflare";
export const onRequest = [
  // Make sure Sentry is the first middleware
  Sentry.sentryPagesPlugin((context) => ({
    dsn: "https://a19083d3c9d84796f3c2d2372eb11847@o4508880993058816.ingest.us.sentry.io/4508881028907008",
    // Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1.0,
  })),
];