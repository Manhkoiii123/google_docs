import { Request, Response } from "express";
import catchAsync from "../../middleware/catch-async";
import { validationResult } from "express-validator";
import { userService } from "../../services/user.service";
import { emailNotVerified, userNotFound } from "../../responses";

class AuthController {
  public login = catchAsync(async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty) {
      return res.status(400).json(err);
    }
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user) return res.status(401).json({ errors: userNotFound });

    const validPassword = await userService.checkPassword(user, password);
    if (!validPassword) return res.status(401).json({ errors: userNotFound });
    if (!user.isVerified) res.status(403).json({ errors: emailNotVerified });

    const authResponse = await userService.generateAuthResponse(user);
    return res.status(200).json(authResponse);
  });
}
const authController = new AuthController();

export { authController };
