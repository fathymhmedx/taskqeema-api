import { Prisma } from "@prisma/client";
import { ApiError } from "../errors/api-error.js";

export const handlePrismaError = (err: unknown): ApiError | null => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return new ApiError("DUPLICATE_FIELD", 409, {
        field: err.meta?.target,
      });
    }

    if (err.code === "P2025") {
      return new ApiError("RESOURCE_NOT_FOUND", 404);
    }
  }

  return null;
};
