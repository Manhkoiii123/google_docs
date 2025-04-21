import { compare, genSalt, hash } from "bcrypt";
import { User } from "../db/models/user.model";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../db/models/refresh-token.model";
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
  public async checkPassword(user: User, password: string): Promise<boolean> {
    return await compare(password, user.password);
  }
  public getRequestUser = async (
    user: User | RequestUser
  ): Promise<RequestUser> => {
    if (user instanceof User) {
      const userWithRoles = await User.scope("withRoles").findByPk(user.id);
      const roles = userWithRoles?.userRoles.map(
        (userRole) => userRole.role.name
      );
      return {
        id: user.id,
        email: user.email,
        roles: roles,
      } as RequestUser;
    } else return user;
  };
  public generateAuthResponse = async (
    user: RequestUser | User
  ): Promise<TokenPair> => {
    const requestUser = await this.getRequestUser(user);

    const accessToken = jwt.sign(requestUser, "access_token", {
      expiresIn: "24h",
    });

    const refreshToken = jwt.sign(requestUser, "refresh_token", {
      expiresIn: "24h",
    });

    await RefreshToken.destroy({
      where: { userId: requestUser.id },
    });

    await RefreshToken.create({ token: refreshToken, userId: requestUser.id });

    return { accessToken, refreshToken };
  };
  public getIsTokenActive = async (token: string): Promise<boolean> => {
    const refreshToken = await RefreshToken.findOne({
      where: { token },
    });

    return refreshToken != null;
  };
}

const userService = new UserService();
export { userService };
