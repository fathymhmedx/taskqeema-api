import { Request, Response, NextFunction } from "express";
import { ApiError } from "../shared/errors/api-error.js";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new ApiError("NOT_FOUND", 404));
};
