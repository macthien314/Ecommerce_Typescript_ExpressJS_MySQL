"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../config/connection";
interface ProductAttributes {
  id         :number;
  name       : string;
  price      : number,
  desc       : string,
  image01    : string,
  image02    : string,
  image03    : string,
  categoryId : number,
}

interface ProductCreationAttributes extends ProductAttributes {}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!         : number;
  public name!       : string;
  public price!      : number;
  public desc!       : string;
  public image01!    : string;
  public image02!    : string;
  public image03!    : string;
  public categoryId! : number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models : any) {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId'})
  }
}

Product.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true 
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    desc: DataTypes.STRING,
    image01: DataTypes.STRING,
    image02: DataTypes.STRING,
    image03: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: false,
  }
);

export { Product, ProductAttributes, ProductCreationAttributes };
