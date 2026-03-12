import { isApiError } from "@/shared/types/api.types";

export function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (isApiError(err)) return err.message;
  if (err instanceof Error) return err.message;
  return fallback;
}
