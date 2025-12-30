import { DataTypes, Transaction } from "sequelize";
import sequelize from "../configs/database.config.js";
import User from "./users.model.js";

const Wallet = sequelize.define(
  "Wallet",
  {
    wallet_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('Aktif', 'Non-Aktif'),
      allowNull: false,
    }
  },
  {
    tableName: "wallet",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Wallet;