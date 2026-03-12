import { ApiError } from "../errors/api-error.js";

export const handleUnknownError = (): ApiError => {
  return new ApiError("INTERNAL_SERVER_ERROR", 500);
};
