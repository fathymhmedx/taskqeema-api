import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { setRefreshCookie, clearRefreshCookie } from "../../shared/utils/token";

export const setupAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, secret } = req.body;
    const result = await authService.setupAdmin(email, password, secret);

    setRefreshCookie(res, result.refreshToken);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login(
      email,
      password,
    );

    setRefreshCookie(res, refreshToken);

    res.status(200).json({ success: true, data: { accessToken, user } });
  } catch (error) {
    next(error);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, fullName, schoolId } = req.body;
    const { accessToken, refreshToken, user } = await authService.signup(
      email,
      password,
      fullName,
      schoolId
    );

    setRefreshCookie(res, refreshToken);

    res.status(201).json({ success: true, data: { accessToken, user } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    clearRefreshCookie(res);

    const result = authService.logout();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};