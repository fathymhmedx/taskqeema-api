import bcrypt from "bcrypt";
import * as studentsRepository from "./students.repository";
import { CreateStudentDto } from "./dtos/create-student.dto";
import { UpdateStudentDto } from "./dtos/update-student.dto";
import { prisma } from "../../shared/prisma";
import { ApiError } from "../../shared/errors/api-error";

const SALT_ROUNDS = 10;

export async function createStudent(data: CreateStudentDto) {
  const existing = await prisma.user.findUnique({
    where: { email: data.email.toLowerCase() },
  });
  if (existing) {
    throw new ApiError("A user with this email already exists", 400);
  }

  if (typeof data.schoolId !== "number") {
    throw new ApiError("schoolId must be a number", 400);
  }
  const school = await prisma.school.findUnique({
    where: { id: data.schoolId },
  });
  if (!school) {
    throw new ApiError("School not found", 404);
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
  return studentsRepository.create({ ...data, passwordHash });
}

export async function listStudents(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  return studentsRepository.findMany(params);
}

export async function getStudentById(id: number) {
  const student = await studentsRepository.findById(id);
  if (!student) {
    throw new ApiError("Student not found", 404);
  }
  return student;
}

export async function getCurrentStudent(userId: number) {
  const student = await studentsRepository.findByUserId(userId);
  if (!student) {
    throw new ApiError("Student profile not found", 404);
  }
  return student;
}

export async function updateStudent(id: number, data: UpdateStudentDto) {
  const existing = await studentsRepository.findById(id);
  if (!existing) {
    throw new ApiError("Student not found", 404);
  }

  if (data.email && data.email.toLowerCase() !== existing.user.email) {
    const emailTaken = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (emailTaken) {
      throw new ApiError("A user with this email already exists", 400);
    }
  }

  if (data.schoolId) {
    const schoolExists = await prisma.school.findUnique({
      where: { id: data.schoolId },
    });
    if (!schoolExists) {
      throw new ApiError("School not found", 404);
    }
  }

  const { password, ...rest } = data;
  const updateData: Partial<UpdateStudentDto> & { passwordHash?: string } = {
    ...rest,
  };
  if (password) {
    updateData.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  }
  return studentsRepository.update(id, updateData);
}

export async function deleteStudent(id: number) {
  const existing = await studentsRepository.findById(id);
  if (!existing) {
    throw new ApiError("Student not found", 404);
  }
  await studentsRepository.remove(id);
}
