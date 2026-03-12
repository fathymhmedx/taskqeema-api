import { prisma } from "../../shared/prisma";
import { Role } from "@prisma/client";
import { CreateStudentDto } from "./dtos/create-student.dto";
import { UpdateStudentDto } from "./dtos/update-student.dto";

export interface StudentWithUser {
  id: number;
  name: string;
  grade: string | null;
  schoolId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    email: string;
    role: Role;
  };
}

export async function create(data: CreateStudentDto & { passwordHash: string }): Promise<StudentWithUser> {
  const { email, passwordHash, name, grade, schoolId } = data;
  const student = await prisma.student.create({
    data: {
      name,
      grade: grade ?? null,
      school: { connect: { id: schoolId } },
      user: {
        create: {
          email: email.toLowerCase(),
          passwordHash,
          role: Role.STUDENT,
        },
      },
    },
    include: { user: true },
  });
  return student as unknown as StudentWithUser;
}

export async function findMany(params: {
  page: number;
  limit: number;
  search?: string;
}): Promise<{ students: StudentWithUser[]; total: number }> {
  const { page, limit, search } = params;
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { name: { contains: search } },
          { user: { email: { contains: search } } },
        ],
      }
    : undefined;

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where,
      skip,
      take: limit,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.student.count({ where }),
  ]);

  return { students: students as StudentWithUser[], total };
}

export async function findById(id: number): Promise<StudentWithUser | null> {
  const student = await prisma.student.findUnique({
    where: { id },
    include: { user: true },
  });
  return student as StudentWithUser | null;
}

export async function findByUserId(userId: number) {
  return prisma.student.findUnique({
    where: { userId },
    include: { user: true, school: true },
  });
}

export async function update(
  id: number,
  data: Partial<UpdateStudentDto> & { passwordHash?: string }
): Promise<StudentWithUser> {
  const student = await prisma.student.findUnique({ where: { id }, include: { user: true } });
  if (!student) return null as unknown as StudentWithUser;

  const userUpdate: { email?: string; passwordHash?: string } = {};
  if (data.email) userUpdate.email = data.email.toLowerCase();
  if (data.passwordHash) userUpdate.passwordHash = data.passwordHash;

  const updated = await prisma.student.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.grade !== undefined && { grade: data.grade }),
      ...(data.schoolId !== undefined && { school: { connect: { id: data.schoolId } } }),
      ...(Object.keys(userUpdate).length > 0 && {
        user: { update: userUpdate },
      }),
    },
    include: { user: true },
  });
  return updated as unknown as StudentWithUser;
}

export async function remove(id: number): Promise<void> {
  const student = await prisma.student.findUnique({ where: { id } });
  if (student) {
    await prisma.user.delete({ where: { id: student.userId } });
  }
}
