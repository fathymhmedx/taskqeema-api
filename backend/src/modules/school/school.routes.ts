import { Router } from "express";
import {
  createSchool,
  deleteSchool,
  getSchoolById,
  getSchools,
  updateSchool,
} from "./school.controller";
import { validate } from "../../middlewares/zod-validate.middleware";
import { createSchoolSchema, updateSchoolSchema } from "./dtos/index";
import { authorizeRoles, protect } from "../../middlewares/auth.middleware";

const router: Router = Router();

router.use(protect, authorizeRoles("ADMIN"));

router.post("/", validate(createSchoolSchema, "body"), createSchool);
router.get("/", getSchools);
router.get("/:id", getSchoolById);
router.patch("/:id", validate(updateSchoolSchema, "body"), updateSchool);
router.delete("/:id", deleteSchool);

export default router;
