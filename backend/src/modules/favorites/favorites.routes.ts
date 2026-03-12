import { Router } from "express";
import { validate } from "../../middlewares/zod-validate.middleware";
import { addFavoriteSchema } from "./dtos/add-favorite.dto";
import { authorizeRoles, protect } from "../../middlewares/auth.middleware";
import { addLessonToFavorite, listLessonsInFavorites, removeLessonFromFavorites } from "./favorites.controller";

const router: Router = Router();

router.use(protect, authorizeRoles("STUDENT"));

router.get("/", listLessonsInFavorites);
router.post("/", validate(addFavoriteSchema, "body"), addLessonToFavorite);
router.delete("/:lessonId", removeLessonFromFavorites);

export default router;
    