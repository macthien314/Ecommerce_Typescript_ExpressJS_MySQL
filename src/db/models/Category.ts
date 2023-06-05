"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../config/connection";
interface CategoryAttributes {
  id:number;
  name: string;
}

interface CategoryCreationAttributes extends CategoryAttributes {}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models : any) {
    Category.hasMany(models.Product, { foreignKey: 'categoryId'})
  }
}

Category.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true 
    },
    name: DataTypes.STRING
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: false,
  }
);

export { Category, CategoryAttributes, CategoryCreationAttributes };
