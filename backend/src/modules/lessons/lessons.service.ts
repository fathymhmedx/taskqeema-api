import * as lessonsRepository from "./lessons.repository";
import { CreateLessonDto } from "./dtos/create-lesson.dto";
import { ApiError } from "../../shared/errors/api-error";
import { UpdateLessonDto } from "./dtos/update-lesson.dto";
import { prisma } from "../../shared/prisma";
import { LessonWithFavorite } from "./types/lesson.type";

export async function createLesson(data: CreateLessonDto) {
  return lessonsRepository.create(data);
}

export async function listLessons(params: {
  page: number;
  limit: number;
  studentId?: number;
}): Promise<{ lessons: LessonWithFavorite[]; total: number }> {
  const { page, limit, studentId } = params;

  const { lessons, total } = await lessonsRepository.findMany({ page, limit });

  if (studentId) {
    const favorites = await prisma.favorite.findMany({
      where: { studentId },
      select: { lessonId: true },
    });
    const favoriteSet = new Set(favorites.map((f) => f.lessonId));

    const lessonsWithFavorite: LessonWithFavorite[] = lessons.map((lesson) => ({
      ...lesson,
      isFavorite: favoriteSet.has(lesson.id),
    }));

    return { lessons: lessonsWithFavorite, total };
  }

  const lessonsWithFavorite: LessonWithFavorite[] = lessons.map((lesson) => ({
    ...lesson,
    isFavorite: false,
  }));

  return { lessons: lessonsWithFavorite, total };
}

export async function getLessonById(id: number) {
  const lesson = await lessonsRepository.findById(id);
  if (!lesson) {
    throw new ApiError("Lesson not found", 404);
  }
  return lesson;
}

export async function updateLesson(id: number, data: UpdateLessonDto) {
  const existing = await lessonsRepository.findById(id);
  if (!existing) {
    throw new ApiError("Lesson not found", 404);
  }
  return lessonsRepository.update(id, data);
}

export async function deleteLesson(id: number) {
  const existing = await lessonsRepository.findById(id);
  if (!existing) {
    throw new ApiError("Lesson not found", 404);
  }
  await lessonsRepository.remove(id);
}

export async function searchLessons(name: string, page: number, limit: number) {
  return lessonsRepository.searchByName({ name, page, limit });
}