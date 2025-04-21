import { Router } from "express";
import { userController } from "../controllers/user/user.controller";
import { userValidator } from "../validators/user.validator";

const router = Router();

router.post("/", userValidator.register, userController.register);
export default router;
