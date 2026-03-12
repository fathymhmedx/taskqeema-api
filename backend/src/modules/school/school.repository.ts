import { prisma } from "../../shared/prisma";
import { CreateSchoolDto, UpdateSchoolDto } from "./dtos/index";
export const createSchool = async (data: CreateSchoolDto) => {
  return prisma.school.create({
    data,
  });
};

export const findSchools = async () => {
  return prisma.school.findMany({
    include: {
      students: true,
    },
  });
};

export const findSchoolById = async (id: number) => {
  return prisma.school.findUnique({
    where: { id },
    include: {
      students: true,
    },
  });
};

export const updateSchool = async (id: number, data: UpdateSchoolDto) => {
  return prisma.school.update({
    where: { id },
    data,
  });
};

export const deleteSchool = async (id: number) => {
  return prisma.school.delete({
    where: { id },
  });
};
