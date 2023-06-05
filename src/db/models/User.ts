"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../../config/connection";
interface UserAttributes {
  id:number;
  username: string;
  password: string;
  email: string;
  role: string;
  image: string;
  resetPassToken: string;
  resetPassTokenExp: string;
}

interface UserCreationAttributes extends UserAttributes {}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public role!: string;
  public image!: string;
  public resetPassToken!: string;
  public resetPassTokenExp!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true 
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    image: DataTypes.STRING,
    resetPassToken: DataTypes.STRING,
    resetPassTokenExp: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export { User, UserAttributes, UserCreationAttributes };
