import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
  getMe,
} from "../controllers/authController";
import { validateRegister, validateLogin } from "../middleware/validate";
import auth from "../middleware/auth";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", auth, getMe);

export default router;
