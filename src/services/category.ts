import { WhereOptions } from "sequelize";
import { CategoryCreationAttributes, Category } from "../db/models/Category";
require("dotenv").config();

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
  ): Promise<Category | Category[] | null> => {
    const where: WhereOptions<CategoryCreationAttributes> = { ...params };
    const attributes = params.select ? params.select.split(",") : undefined;
    const order = params.sort ? params.sort.split(",") : undefined;
    const page = parseInt(params.page || "1", 10);
    const limit = parseInt(params.limit || "10", 10);
    const offset = (page - 1) * limit;
    if (option.task === "all") {
      return Category.findAll({
        where,
        attributes,
        order,
        limit,
        offset,
      });
    }

    if (option.task === "one") {
      return Category.findByPk(params.id, { attributes });
    }

    return null;
  },
  create: async (item: CategoryCreationAttributes): Promise<string | void | object > => {
    try {
      const category = await Category.create(item);
       return category;
    } catch (error) {
      console.error("Error creating category:", error);
    }
  },
  deleteItem: async (
    params: { id: string },
    option: { task: "one" }
  ): Promise<string | void> => {
    if (option.task === "one") {
      await Category.destroy({ where: { id: params.id } });
      return "Delete successfully";
    }
  },
  editItem: async (
    params: { id: string; body: Partial<CategoryCreationAttributes> },
    option: { task: "edit" }
  ): Promise<Category | void> => {
    try {
      if (option.task === "edit") {
        const category = await Category.findByPk(params.id);
        if (category) {
          await category.update(params.body);
          return category;
        }
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  },
};

