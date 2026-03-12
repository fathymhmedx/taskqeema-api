import { Router } from "express";
import { validate } from "../../middlewares/zod-validate.middleware";
import { createLessonSchema } from "./dtos/create-lesson.dto";
import * as lessonsController from "./lessons.controller";
import { authorizeRoles, protect } from "../../middlewares/auth.middleware";
import { listLessonsQuerySchema } from "./dtos/list-lessons-query.dto";
import { updateLessonSchema } from "./dtos/update-lesson.dto";
import { createLesson, getAll, getLessonById, removeLesson, searchLessonByName } from "./lessons.controller";

const router: Router = Router();

// Public read
router.get(
  "/",
  validate(listLessonsQuerySchema, "query"),
  getAll,
);
router.get("/search", searchLessonByName);
router.get("/:id", getLessonById);

// Admin-only write
router.use(protect, authorizeRoles("ADMIN"));

router.post("/", validate(createLessonSchema, "body"), createLesson);
router.patch(
  "/:id",
  validate(updateLessonSchema, "body"),
  lessonsController.updateLesson,
);
router.delete("/:id", removeLesson);

export default router;
