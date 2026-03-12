import { NextFunction, Request, Response } from "express";
import * as schoolService from "./school.service";

export const createSchool = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const school = await schoolService.createSchoolService(req.body);

    res.status(201).json({
      success: true,
      data: school,
    });
  } catch (error) {
    next(error);
  }
};

export const getSchools = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const schools = await schoolService.getSchools();

    res.status(200).json({
      success: true,
      data: schools,
    });
  } catch (error) {
    next(error);
  }
};

export const getSchoolById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const school = await schoolService.getSchoolById(Number(req.params.id));

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSchool = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const school = await schoolService.updateSchool(
      Number(req.params.id),
      req.body,
    );

    res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schoolService.deleteSchool(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
