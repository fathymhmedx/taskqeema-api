import { NextFunction, Request, Response } from "express";
import * as lessonsService from "./lessons.service";

export const createLesson = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const lesson = await lessonsService.createLesson(req.body);
    res.status(201).json({
      success: true,
      data: {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        sortOrder: lesson.sortOrder,
        createdAt: lesson.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // studentId موجود فقط لو الطالب عامل login
    const studentId = req.user?.student?.id;

    const result = await lessonsService.listLessons({ page, limit, studentId });

    res.status(200).json({
      success: true,
      data: result.lessons,
      meta: { total: result.total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

export const getLessonById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const lesson = await lessonsService.getLessonById(id);
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const lesson = await lessonsService.updateLesson(id, req.body);
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    next(error);
  }
};

export const removeLesson = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    await lessonsService.deleteLesson(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const searchLessonByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Name query is required" });
  }

  const result = await lessonsService.searchLessons(name, page, limit);

  res.status(200).json({
    success: true,
    data: result.lessons,
    meta: { total: result.total, page, limit },
  });
};