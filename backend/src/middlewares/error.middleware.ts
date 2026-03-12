import { Request, Response, NextFunction } from "express";
import { handlePrismaError } from "../shared/error-handlers/prisma.error.js";
import { handleZodError } from "../shared/error-handlers/zod.error.js";
import { handleJwtError } from "../shared/error-handlers/jwt.error.js";
import { handleUnknownError } from "../shared/error-handlers/unknown.error.js";
import { ApiError } from "../shared/errors/api-error.js";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error: ApiError =
  handlePrismaError(err) ??
    handleZodError(err) ??
    handleJwtError(err) ??
    (err instanceof ApiError ? err : handleUnknownError());
    
  const isDev = process.env.NODE_ENV === "development";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    meta: error.meta,
    stack: isDev && err instanceof Error ? err.stack : undefined,
  });
};
