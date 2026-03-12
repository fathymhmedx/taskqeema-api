import axios, { type AxiosError } from "axios";
import { env } from "@/app/config/env";
import { ApiError } from "@/shared/types/api.types";
import { STORAGE_KEYS } from "@/app/config/constants";

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.accessToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ status?: string; message?: string; meta?: unknown }>) => {
    const status = error.response?.status ?? 500;
    const data = error.response?.data;
    const message =
      typeof data?.message === "string"
        ? data.message
        : error.message || "Request failed";

    if (status === 401) {
      localStorage.removeItem(STORAGE_KEYS.accessToken);
      localStorage.removeItem(STORAGE_KEYS.user);
      window.dispatchEvent(new Event("auth:logout"));
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    throw new ApiError(
      message,
      status,
      data?.status ?? "error",
      data?.meta as ApiError["meta"]
    );
  }
);
