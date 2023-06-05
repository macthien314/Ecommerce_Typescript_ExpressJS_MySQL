import { WhereOptions } from "sequelize";
import { UserCreationAttributes, User } from "../db/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

require("dotenv").config();

const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

interface ListItemsParams {
  select?: string;
  sort?: string;
  page?: string;
  limit?: string;
  id?: string | number; // Cập nhật kiểu dữ liệu của 'id' thành 'string | number'
  [key: number]: any;
}

interface ListItemsOption {
  task: "all" | "one";
}

export default {
  listItems: async (
    params: ListItemsParams,
    option: ListItemsOption
  ): Promise<User | User[] | null> => {
    const where: WhereOptions<UserCreationAttributes> = { ...params };
    const attributes = params.select ? params.select.split(",") : undefined;
    const order = params.sort ? params.sort.split(",") : undefined;
    const page = parseInt(params.page || "1", 10);
    const limit = parseInt(params.limit || "10", 10);
    const offset = (page - 1) * limit;
    if (option.task === "all") {
      return User.findAll({
        where,
        attributes,
        order,
        limit,
        offset,
      });
    }

    if (option.task === "one") {
      return User.findByPk(params.id, { attributes });
    }

    return null;
  },
  create: async (item: UserCreationAttributes): Promise<string | void> => {
    try {
      const user = await User.create({
        id:item.id,
        email: item.email,
        username: item.username,
        password: hashPassword(item.password),
        role: item.role,
        image: item.image,
        resetPassToken:item.resetPassToken,
        resetPassTokenExp:item.resetPassTokenExp
      }  );
      return jwt.sign({ id: user.id, email: user.email },process.env.SECRET_KEY!,{ expiresIn: "2d" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },
  deleteItem: async (
    params: { id: string },
    option: { task: "one" }
  ): Promise<string | void> => {
    if (option.task === "one") {
      await User.destroy({ where: { id: params.id } });
      return "Delete successfully";
    }
  },
  editItem: async (
    params: { id: string; body: Partial<UserCreationAttributes> },
    option: { task: "edit" }
  ): Promise<User | void> => {
    try {
      if (option.task === "edit") {
        const user = await User.findByPk(params.id);
        if (user) {
          await user.update(params.body);
          return user;
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },
};

