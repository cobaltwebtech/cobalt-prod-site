import { defineMiddleware } from "astro:middleware";

// Extend Astro's locals to include Cloudflare runtime
declare global {
  namespace App {
    interface Locals {
      runtime?: {
        env?: {
          COBALTWEBTECH_USER_BLOCK_DATA?: KVNamespace;
          RATE_LIMITER?: RateLimit;
        };
      };
    }
  }
}

// Simplified tracking for 404 patterns
const suspiciousTracker = new Map<
  string,
  {
    count: number;
    firstSeen: number;
    lastActivity: number;
  }
>();

// Configuration
const CONFIG = {
  // 404 tracking thresholds
  ABUSE_THRESHOLD: 50, // Escalate to persistent blocking
  PERSISTENT_BLOCK_DURATION: 24 * 60 * 60, // 24 hours in seconds
  SEVERE_BLOCK_DURATION: 90 * 24 * 60 * 60, // 90 days in seconds

  // Time windows
  ABUSE_PATTERN_WINDOW: 60 * 60 * 1000, // 1 hour for pattern detection
  TOTAL_COUNT_RESET_PERIOD: 180 * 24 * 60 * 60 * 1000, // Reset every 6 months

  // Cleanup
  MEMORY_CLEANUP_INTERVAL: 10 * 60 * 1000,
};

// Track last cleanup time
let lastCleanup = Date.now();

function getClientIP(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0] ||
    request.headers.get("X-Real-IP") ||
    "unknown"
  );
}

// Good bot detection function
function isLegitimateBot(userAgent: string): boolean {
  const legitimateBots = [
    // Major search engines
    /googlebot/i,
    /bingbot/i,
    /slurp/i, // Yahoo
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,

    // Social media
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,

    // SEO tools (legitimate ones)
    /semrushbot/i,
    /AhrefsBot/i,
    /AhrefsSiteAudit/i,
    /mj12bot/i,

    // Other legitimate crawlers
    /applebot/i,
    /pinterest/i,
    /redditbot/i,
  ];

  return legitimateBots.some((pattern) => pattern.test(userAgent));
}

function cleanupMemoryStore(): void {
  const now = Date.now();
  if (now - lastCleanup < CONFIG.MEMORY_CLEANUP_INTERVAL) return;

  for (const [key, record] of suspiciousTracker.entries()) {
    // Remove old entries (older than 24 hours)
    if (now - record.lastActivity > 24 * 60 * 60 * 1000) {
      suspiciousTracker.delete(key);
    }
  }
  lastCleanup = now;
}

function track404(ip: string): {
  shouldBlock: boolean;
  count: number;
} {
  const now = Date.now();
  const key = `404:${ip}`;
  let record = suspiciousTracker.get(key);

  if (!record) {
    record = {
      count: 1,
      firstSeen: now,
      lastActivity: now,
    };
    suspiciousTracker.set(key, record);
  } else {
    // Reset count if it's been more than 6 months
    const shouldReset =
      now - record.firstSeen > CONFIG.TOTAL_COUNT_RESET_PERIOD;

    if (shouldReset) {
      record = {
        count: 1,
        firstSeen: now,
        lastActivity: now,
      };
      suspiciousTracker.set(key, record);
    } else {
      record.count++;
      record.lastActivity = now;
    }
  }

  return {
    shouldBlock: record.count >= CONFIG.ABUSE_THRESHOLD,
    count: record.count,
  };
}

async function checkPersistentBlock(
  kv: KVNamespace,
  ip: string,
): Promise<{
  isBlocked: boolean;
  blockLevel: "none" | "temporary" | "severe";
  blockedUntil?: number;
}> {
  try {
    const blockData = await kv.get(`blocked:${ip}`);
    if (!blockData) {
      return { isBlocked: false, blockLevel: "none" };
    }

    const parsed = JSON.parse(blockData);
    const now = Date.now();

    if (parsed.blockLevel === "severe") {
      return {
        isBlocked: true,
        blockLevel: "severe",
        blockedUntil: parsed.blockedUntil,
      };
    }

    if (now < parsed.blockedUntil) {
      return {
        isBlocked: true,
        blockLevel: "temporary",
        blockedUntil: parsed.blockedUntil,
      };
    }

    // Block expired, remove it
    await kv.delete(`blocked:${ip}`);
    return { isBlocked: false, blockLevel: "none" };
  } catch (error) {
    console.error("Error checking persistent block:", error);
    return { isBlocked: false, blockLevel: "none" };
  }
}

async function setPersistentBlock(
  kv: KVNamespace,
  ip: string,
  count: number,
): Promise<void> {
  try {
    const now = Date.now();

    // Check if this is severe abuse (high count in short time)
    const record = suspiciousTracker.get(`404:${ip}`);
    const timespan = record ? now - record.firstSeen : 0;

    // Severe if: 50+ requests AND within 1 hour OR 100+ requests total
    const isSevereAbuse =
      (count >= CONFIG.ABUSE_THRESHOLD &&
        timespan <= CONFIG.ABUSE_PATTERN_WINDOW) ||
      count >= 100;

    const blockLevel = isSevereAbuse ? "severe" : "temporary";
    const blockedUntil =
      blockLevel === "severe"
        ? now + CONFIG.SEVERE_BLOCK_DURATION * 1000
        : now + CONFIG.PERSISTENT_BLOCK_DURATION * 1000;

    const blockData = {
      ip,
      totalCount: count,
      blockLevel,
      blockedAt: now,
      blockedUntil,
      reason: `Excessive 404 requests: ${count} total`,
      timespan: Math.round(timespan / 1000 / 60), // minutes
    };

    const ttl =
      blockLevel === "severe"
        ? CONFIG.SEVERE_BLOCK_DURATION
        : CONFIG.PERSISTENT_BLOCK_DURATION;

    await kv.put(`blocked:${ip}`, JSON.stringify(blockData), {
      expirationTtl: ttl,
    });

    // Enhanced logging for monitoring
    console.warn(`Persistent block applied to ${ip}:`, {
      blockLevel,
      totalCount: count,
      timespan: `${Math.round(timespan / 1000 / 60)} minutes`,
      duration: blockLevel === "severe" ? "90 days" : "24 hours",
    });
  } catch (error) {
    console.error("Error setting persistent block:", error);
  }
}

function createBlockedResponse(
  blockLevel: "temporary" | "severe",
  blockedUntil?: number,
): Response {
  const now = Date.now();
  const remainingTime = blockedUntil
    ? Math.ceil((blockedUntil - now) / 1000)
    : 86400;

  const messages = {
    temporary: "Temporarily blocked: Excessive failed requests detected.",
    severe: "Access denied: Severe abuse pattern detected.",
  };

  const retryAfter = {
    temporary: Math.min(remainingTime, 86400).toString(), // Max 24 hours
    severe: "86400", // Always 24 hours for severe (don't reveal actual duration)
  };

  return new Response(messages[blockLevel], {
    status: 429,
    headers: {
      "Retry-After": retryAfter[blockLevel],
      "Content-Type": "text/plain",
      "X-Rate-Limit-Reason": blockLevel,
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  const clientIP = getClientIP(request);
  const url = new URL(request.url);
  const userAgent = request.headers.get("User-Agent") || "";

  // Check if this is a legitimate bot
  const isBot = isLegitimateBot(userAgent);

  // Cleanup memory periodically
  cleanupMemoryStore();

  // Get bindings
  const kv = context.locals.runtime?.env?.COBALTWEBTECH_USER_BLOCK_DATA;
  const rateLimiter = context.locals.runtime?.env?.RATE_LIMITER;

  // 1. Use Cloudflare's Rate Limiting API for general protection
  // But give bots more lenient treatment
  if (rateLimiter && !isBot) {
    try {
      const { success } = await rateLimiter.limit({ key: clientIP });
      if (!success) {
        console.warn(`Rate limited by Cloudflare API: ${clientIP}`);
        return new Response("Rate limited: Too many requests", {
          status: 429,
          headers: {
            "Retry-After": "60",
            "Content-Type": "text/plain",
            "X-Rate-Limit-Reason": "general",
          },
        });
      }
    } catch (error) {
      console.error("Error with Cloudflare Rate Limiting API:", error);
      // Continue without rate limiting if API fails
    }
  }

  // 2. Check for existing persistent blocks (KV)
  // But don't block legitimate bots
  if (kv && !isBot) {
    const persistentBlock = await checkPersistentBlock(kv, clientIP);
    if (persistentBlock.isBlocked && persistentBlock.blockLevel !== "none") {
      return createBlockedResponse(
        persistentBlock.blockLevel,
        persistentBlock.blockedUntil,
      );
    }
  }

  // Process the request
  const response = await next();

  // 3. Track 404 responses and apply blocks if needed
  // Use higher thresholds for legitimate bots
  if (response.status === 404) {
    const tracking = track404(clientIP);

    // Adjust threshold based on bot status
    const blockThreshold = isBot
      ? CONFIG.ABUSE_THRESHOLD * 3
      : CONFIG.ABUSE_THRESHOLD; // 150 for bots, 50 for others
    const shouldBlock = tracking.count >= blockThreshold;

    // Log 404 activity for monitoring
    if (isBot) {
      console.log(
        `404 from bot ${clientIP} (${userAgent}): ${url.pathname} (${tracking.count} total)`,
      );
    } else {
      console.log(
        `404 from ${clientIP}: ${url.pathname} (${tracking.count} total)`,
      );
    }

    // If they've hit the threshold, add to persistent block (but not for legitimate bots)
    if (kv && shouldBlock && !isBot) {
      await setPersistentBlock(kv, clientIP, tracking.count);
    }

    // Enhanced 404 response with security headers
    const secureResponse = new Response(response.body, {
      status: 404,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers),
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "no-referrer",
        // Add rate limit info for monitoring
        "X-404-Count": tracking.count.toString(),
        "X-Bot-Detected": isBot.toString(),
      },
    });

    return secureResponse;
  }

  return response;
});
