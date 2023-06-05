import { WhereOptions } from "sequelize";
import { ProductCreationAttributes, Product } from "../db/models/Product";
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
  ): Promise<Product | Product[] | null> => {
    const where: WhereOptions<ProductCreationAttributes> = { ...params };
    const attributes = params.select ? params.select.split(",") : undefined;
    const order = params.sort ? params.sort.split(",") : undefined;
    const page = parseInt(params.page || "1", 10);
    const limit = parseInt(params.limit || "10", 10);
    const offset = (page - 1) * limit;
    if (option.task === "all") {
      return Product.findAll({
        where,
        attributes,
        order,
        limit,
        offset,
      });
    }

    if (option.task === "one") {
      return Product.findByPk(params.id, { attributes });
    }

    return null;
  },
  create: async (item: ProductCreationAttributes): Promise<string | void | object> => {
    try {
      const product = await Product.create(item);
      return product;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  },
  deleteItem: async (
    params: { id: string },
    option: { task: "one" }
  ): Promise<string | void> => {
    if (option.task === "one") {
      await Product.destroy({ where: { id: params.id } });
      return "Delete successfully";
    }
  },
  editItem: async (
    params: { id: string; body: Partial<ProductCreationAttributes> },
    option: { task: "edit" }
  ): Promise<Product | void> => {
    try {
      if (option.task === "edit") {
        const product = await Product.findByPk(params.id);
        if (product) {
          await product.update(params.body);
          return product;
        }
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  },
};

