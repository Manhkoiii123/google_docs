import { genSalt, hash } from "bcrypt";
import { User } from "../db/models/user.model";
import jwt from "jsonwebtoken";
class UserService {
  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }
  public async createUser(email: string, password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const verificationToken = jwt.sign({ email }, "verify_sercet");
    const user = await User.create({
      email,
      password: hashedPassword,
      verificationToken,
    });
    // send mail
    return user;
  }
}

const userService = new UserService();
export { userService };
