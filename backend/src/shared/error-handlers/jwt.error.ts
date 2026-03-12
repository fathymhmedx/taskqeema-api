import jwt from "jsonwebtoken";
import { ApiError } from "../errors/api-error.js";

export const handleJwtError = (err: unknown): ApiError | null => {
  if (err instanceof jwt.JsonWebTokenError) {
    return new ApiError("INVALID_TOKEN", 401);
  }

  if (err instanceof jwt.TokenExpiredError) {
    return new ApiError("TOKEN_EXPIRED", 401);
  }

  return null;
};
