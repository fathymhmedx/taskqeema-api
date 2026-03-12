import { Request, Response, NextFunction } from "express";
import { prisma } from "../../shared/prisma";

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favoritesCount = await prisma.favorite.count();
    res.status(200).json({
      success: true,
      data: { favoritesCount },
    });
  } catch (error) {
    next(error);
  }
};
