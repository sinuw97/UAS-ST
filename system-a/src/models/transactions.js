import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM("Credit", "Debit"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

export default Transaction;