import { Router } from "express";
import { register, login } from "./user-controller";
import { body } from "express-validator";

const router = Router();

router.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 3 })],
  register
);
router.post("/login", login);

export default router;
