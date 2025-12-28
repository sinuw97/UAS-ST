import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_item: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Paid','Failed'),
        allowNull: false
    }
}, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Order;