import { prisma } from "../../shared/prisma";
import { CreateLessonDto } from "./dtos/create-lesson.dto";
import { UpdateLessonDto } from "./dtos/update-lesson.dto";
export async function create(data: CreateLessonDto) {
  return prisma.lesson.create({ data });
}

export async function findMany(params: { page: number; limit: number }) {
  const { page, limit } = params;
  const skip = (page - 1) * limit;
  const [lessons, total] = await Promise.all([
    prisma.lesson.findMany({
      skip,
      take: limit,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.lesson.count(),
  ]);
  return { lessons, total };
}

export async function findById(id: number) {
  return prisma.lesson.findUnique({ where: { id } });
}

export async function update(id: number, data: UpdateLessonDto) {
  return prisma.lesson.update({ where: { id }, data });
}

export async function remove(id: number) {
  return prisma.lesson.delete({ where: { id } });
}
export async function searchByName(params: {
  name: string;
  page: number;
  limit: number;
}) {
const { name, page, limit } = params;
const skip = (page - 1) * limit;

const [lessons, total] = await Promise.all([
  prisma.lesson.findMany({
    where: { title: { contains: name } }, 
    skip,
    take: limit,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  }),
  prisma.lesson.count({
    where: { title: { contains: name } },
  }),
]);

return { lessons, total };
}