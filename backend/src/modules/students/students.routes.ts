import { Router } from "express";
import { validate } from "../../middlewares/zod-validate.middleware";

import { authorizeRoles, protect } from "../../middlewares/auth.middleware";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  removeStudentById,
  updateStudentById,
  getCurrentStudentProfile,
} from "./students.controller";
import { listStudentsQuerySchema } from "./dtos/query-student.dto";
import { createStudentSchema } from "./dtos/create-student.dto";
import { updateStudentSchema } from "./dtos/update-student.dto";

const router: Router = Router();

router.get(
  "/profile",
  protect,
  authorizeRoles("STUDENT"),
  getCurrentStudentProfile,
);

router.use(protect, authorizeRoles("ADMIN"));

router.get("/", validate(listStudentsQuerySchema, "query"), getAllStudents);
router.get("/:id", getStudentById);
router.post("/", validate(createStudentSchema, "body"), createStudent);
router.patch("/:id", validate(updateStudentSchema, "body"), updateStudentById);
router.delete("/:id", removeStudentById);

export default router;
