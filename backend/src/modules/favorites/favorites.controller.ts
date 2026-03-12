import { NextFunction, Request, Response } from "express";
import * as favoritesService from "./favorites.service";
import { prisma } from "../../shared/prisma";
import { ApiError } from "../../shared/errors/api-error";

async function getStudentIdFromUser(userId: number): Promise<number> {
  const student = await prisma.student.findUnique({
    where: { userId },
  });
  if (!student) {
    throw new ApiError("Student profile not found", 404);
  }
  return student.id;
}

export const addLessonToFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new ApiError("Unauthorized", 401);
    const studentId = await getStudentIdFromUser(req.user.id);
    const { lessonId } = req.body;
    const id = Number(lessonId);
    const favorite = await favoritesService.addFavorite(studentId, id);
    res.status(201).json({
      success: true,
      data: {
        id: favorite.id,
        lessonId: favorite.lessonId,
        lesson: {
          id: favorite.lesson.id,
          title: favorite.lesson.title,
          description: favorite.lesson.description,
        },
        createdAt: favorite.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const removeLessonFromFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new ApiError("Unauthorized", 401);
    const studentId = await getStudentIdFromUser(req.user.id);
    const lessonId = Number(req.params.lessonId);
    await favoritesService.removeFavorite(studentId, lessonId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const listLessonsInFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw new ApiError("Unauthorized", 401);
    const studentId = await getStudentIdFromUser(req.user.id);
    const favorites = await favoritesService.listFavorites(studentId);
    res.status(200).json({
      success: true,
      data: favorites.map((f) => ({
        id: f.id,
        lessonId: f.lessonId,
        lesson: {
          id: f.lesson.id,
          title: f.lesson.title,
          description: f.lesson.description,
        },
        createdAt: f.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};
