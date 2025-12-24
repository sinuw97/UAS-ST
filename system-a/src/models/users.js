import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Users = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  tableName: "users",
  timestamps: false
});

export default Users;