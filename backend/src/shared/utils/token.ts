import jwt, { SignOptions, JwtPayload as JwtVerifyPayload } from "jsonwebtoken";
import { Response } from "express";
import { ApiError } from "../errors/api-error";

export interface Payload {
  userId: number;
  role: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generate Access & Refresh tokens
 */
export function generateTokens(payload: Payload): Tokens {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? "15m",
    algorithm: "HS256",
  } as SignOptions);

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
    algorithm: "HS256",
  } as SignOptions);

  return { accessToken, refreshToken };
}

/**
 * Set refresh token as HttpOnly cookie
 */
export function setRefreshCookie(res: Response, refreshToken: string) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

/**
 * Clear refresh token cookie
 */
export function clearRefreshCookie(res: Response) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

/**
 * Verify a token (Access or Refresh)
 */
export function verifyToken(
  token: string,
  secretKey: string,
): JwtVerifyPayload {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtVerifyPayload;
  } catch (error) {
    throw new ApiError("INVALID_TOKEN", 401);
  }
}
