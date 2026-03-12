const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const env = {
  apiBaseUrl: typeof VITE_API_BASE_URL === "string" && VITE_API_BASE_URL
    ? VITE_API_BASE_URL.replace(/\/$/, "")
    : "/api/v1",
} as const;
