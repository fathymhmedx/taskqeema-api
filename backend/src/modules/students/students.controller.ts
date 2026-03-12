import { NextFunction, Request, Response } from "express";
import * as studentsService from "./students.service";
import { ApiError } from "../../shared/errors/api-error";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const student = await studentsService.createStudent(req.body);
    res.status(201).json({
      success: true,
      data: {
        id: student.id,
        email: student.user.email,
        name: student.name,
        grade: student.grade,
        createdAt: student.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page, limit, search } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
    };
    const result = await studentsService.listStudents({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
    });
    res.status(200).json({
      success: true,
      data: result.students.map((s) => ({
        id: s.id,
        email: s.user.email,
        name: s.name,
        grade: s.grade,
        schoolId: s.schoolId,
        createdAt: s.createdAt,
      })),
      meta: {
        total: result.total,
        page: Number(page) || 1,
        limit: Number(limit) || 10,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const student = await studentsService.getStudentById(id);
    res.status(200).json({
      success: true,
      data: {
        id: student.id,
        email: student.user.email,
        name: student.name,
        grade: student.grade,
        schoolId: student.schoolId,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentStudentProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) throw new ApiError("Unauthorized", 401);
    const student = await studentsService.getCurrentStudent(req.user.id);
    res.status(200).json({
      success: true,
      data: {
        id: student.id,
        email: student.user.email,
        name: student.name,
        grade: student.grade,
        schoolId: student.schoolId,
        schoolName: student.school?.name ?? null,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const student = await studentsService.updateStudent(id, req.body);
    res.status(200).json({
      success: true,
      data: {
        id: student.id,
        email: student.user.email,
        name: student.name,
        grade: student.grade,
        updatedAt: student.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    await studentsService.deleteStudent(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
