import Produk from "./produk.model.js";
import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";

Produk.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Produk, { foreignKey: "product_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

export { Produk, Order, OrderItem };