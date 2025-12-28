import sequelize from "../db/db.js";
import { DataTypes } from "sequelize";

const OrderItem = sequelize.define("order_items", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'order_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default OrderItem;