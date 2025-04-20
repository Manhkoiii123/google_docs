import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { User } from "./user.model";
import { UserRole } from "./user-role.model";
import RoleEnum from "../../types/enums/role-enum";

@Table({ tableName: "role", underscored: true, timestamps: false })
class Role extends Model {
  @Column(DataType.ENUM("ADMIN", "SUPERADMIN"))
  name!: RoleEnum;
  @BelongsToMany(() => User, {
    through: () => UserRole,
  })
  users!: Array<User>;

  @HasMany(() => UserRole, {
    onDelete: "CASCADE",
  })
  roleUsers!: Array<UserRole>;
}

export { Role };
