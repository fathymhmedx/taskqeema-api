import { ApiError } from "../../shared/errors/api-error";
import { CreateSchoolDto, UpdateSchoolDto } from "./dtos/index";
import * as schoolRepo from "./school.repository";

export const createSchoolService = async (data: CreateSchoolDto) => {
  return schoolRepo.createSchool(data);
};

export const getSchools = async () => {
  return schoolRepo.findSchools();
};

export const getSchoolById = async (id: number) => {
  const school = await schoolRepo.findSchoolById(id);
  if (!school) {
    throw new ApiError("School not found", 404);
  }
  return school;
};

export const updateSchool = async (id: number, data: UpdateSchoolDto) => {
  const existing = await schoolRepo.findSchoolById(id);
  if (!existing) {
    throw new ApiError("School not found", 404);
  }
  return schoolRepo.updateSchool(id, data);
};

export const deleteSchool = async (id: number) => {
  const existing = await schoolRepo.findSchoolById(id);
  if (!existing) {
    throw new ApiError("School not found", 404);
  }
  if (existing.students.length > 0) {
    throw new ApiError("Cannot delete school that has students. Remove or reassign students first.", 400);
  }
  return schoolRepo.deleteSchool(id);
};