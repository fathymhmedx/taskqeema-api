import { ZodError } from "zod";
import { ApiError } from "../errors/api-error.js";

export const handleZodError = (err: unknown): ApiError | null => {
  if (err instanceof ZodError) {
    const fields = err.errors.map((e) => ({
      field: e.path.join("."),
      code: "VALIDATION_ERROR",
      meta: {
        message: e.message,
      },
    }));

    return new ApiError("VALIDATION_ERROR", 400, { fields });
  }

  return null;
};
