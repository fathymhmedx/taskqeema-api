import { Router } from "express";
import { validate } from "../../middlewares/zod-validate.middleware";
import { loginSchema } from "./dtos/login-user.dto";
import { signupSchema } from "./dtos/signup-user.dto";
import { login, signup, logout, setupAdmin } from "./auth.controller";
import { protect } from "../../middlewares/auth.middleware";
import { setupAdminSchema } from "./dtos/setup-admin.dto";

const router: Router = Router();
    
router.post("/setup-admin", validate(setupAdminSchema, "body"), setupAdmin);
router.post("/login", validate(loginSchema, "body"), login);
router.post("/signup", validate(signupSchema, "body"), signup);
router.post("/logout", protect, logout);
export default router;
