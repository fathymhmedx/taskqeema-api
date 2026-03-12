import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import studentsRoutes from "../modules/students/students.routes";
import lessonsRoutes from "../modules/lessons/lessons.routes";
import favoritesRoutes from "../modules/favorites/favorites.routes";
import schoolRoutes from "../modules/school/school.routes";
import statsRoutes from "../modules/stats/stats.routes";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/admin/students", studentsRoutes);
router.use("/lessons", lessonsRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/admin/schools", schoolRoutes);
router.use("/admin/stats", statsRoutes);
export default router;
