import { Router } from "express";
import { authorizeRoles, protect } from "../../middlewares/auth.middleware";
import { getStats } from "./stats.controller";

const router: Router = Router();

router.use(protect, authorizeRoles("ADMIN"));
router.get("/", getStats);

export default router;
