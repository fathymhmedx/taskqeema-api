import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../shared/prisma/index.js";
import { ApiError } from "../shared/errors/api-error.js";

interface JwtPayload {
  userId: number;
  iat: number;
  exp: number;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new ApiError(
          "You are not logged in. Please login to access this route",
          401,
        ),
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { student: true },
    });

    if (!currentUser) {
      return next(new ApiError("The user no longer exists", 401));
    }

    // assign user to req.user
    req.user = currentUser;

    next();
  } catch (err) {
    return next(new ApiError("Invalid or expired token", 401));
  }
};


export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
};