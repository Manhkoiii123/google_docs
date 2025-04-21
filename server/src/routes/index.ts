import { Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import documentRouter from "./document.route";
const router = Router();
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/document", documentRouter);
export default router;
