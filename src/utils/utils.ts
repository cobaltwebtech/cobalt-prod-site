// Format the date to a string
function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(undefined, options);
}
// Capitalize the first letter
function capitalize(str: string): string {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { formatDate, capitalize };

// Retrieve the base URL for Vercel
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (import.meta.env.VERCEL_URL) {
    return `https://${import.meta.env.VERCEL_URL}`;
  }
  return `http://localhost:${import.meta.env.PORT ?? 4321}`;
}
