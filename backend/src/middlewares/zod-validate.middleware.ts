import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError, z } from "zod";
import { ApiError, ValidationField } from "../shared/errors/api-error.js";

/**
 * Generic Zod validation middleware
 */
export function validate<
  T extends ZodRawShape,
  K extends "body" | "query" | "params",
>(schema: ZodObject<T>, property: K) {
  type Parsed = z.infer<typeof schema>;

  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = req[property];

      // check empty body
      if (property === "body" && (!data || Object.keys(data).length === 0)) {
        return next(new ApiError("Request body cannot be empty", 400));
      }

      const parsedData = schema.parse(data);

      // attach validated data to request
      switch (property) {
        case "body":
          (req as Request & { validatedBody: Parsed }).validatedBody =
            parsedData;
          break;

        case "query":
          (req as Request & { validatedQuery: Parsed }).validatedQuery =
            parsedData;
          break;

        case "params":
          (req as Request & { validatedParams: Parsed }).validatedParams =
            parsedData;
          break;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const fields: ValidationField[] = err.issues.map((issue) => ({
          field: issue.path.join("."),
          code: issue.code,
          meta:
            issue.code === "too_small"
              ? { min: issue.minimum }
              : issue.code === "too_big"
                ? { max: issue.maximum }
                : undefined,
        }));

        return next(new ApiError("Invalid request data", 400, { fields }));
      }

      next(err);
    }
  };
}
