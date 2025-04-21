import { Request, Response, Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import documentRouter from "./document.route";
import { authenticate, authorize } from "../middleware/auth";
import RoleEnum from "../types/enums/role-enum";
const router = Router();

router.get(
  "/",
  authenticate,
  authorize([RoleEnum.SUPERADMIN]),
  async (req: Request, res: Response) => {
    return res.sendStatus(200);
  }
);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/document", documentRouter);
export default router;
