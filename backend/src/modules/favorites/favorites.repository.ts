import { prisma } from "../../shared/prisma";

export async function addFavorite(studentId: number, lessonId: number) {
  return prisma.favorite.create({
    data: { studentId, lessonId },
    include: { lesson: true },
  });
}

export async function removeFavorite(studentId: number, lessonId: number) {
  return prisma.favorite.deleteMany({
    where: { studentId, lessonId },
  });
}

export async function findByStudent(studentId: number) {
  return prisma.favorite.findMany({
    where: { studentId },
    include: { lesson: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function findOne(studentId: number, lessonId: number) {
  return prisma.favorite.findUnique({
    where: {
      studentId_lessonId: { studentId, lessonId },
    },
  });
}
