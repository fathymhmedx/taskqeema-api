import { prisma } from "../../shared/prisma";
import * as favoritesRepository from "./favorites.repository";
import { ApiError } from "../../shared/errors/api-error";

export const addFavorite = async (studentId: number, lessonId: number) => {
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) {
    throw new ApiError("Lesson not found", 404);
  }

  const existing = await favoritesRepository.findOne(studentId, lessonId);
  if (existing) {
    throw new ApiError("Lesson is already in favorites", 400);
  }

  return favoritesRepository.addFavorite(studentId, lessonId);
}

export const removeFavorite = async (studentId: number, lessonId: number) => {
  const result = await favoritesRepository.removeFavorite(studentId, lessonId);
  if (result.count === 0) {
    throw new ApiError("Favorite not found", 404);
  }
}

export const listFavorites = async (studentId: number) => {
  return favoritesRepository.findByStudent(studentId);
}
