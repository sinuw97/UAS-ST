import User from "./users.model.js";
import Wallet from "./wallets.model.js";
import Transaction from "./transactions.model.js";

// Relasi
User.hasOne(Wallet, {
  foreignKey: "user_id",
  as: "wallet",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Wallet.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Relasi
Wallet.hasMany(Transaction, {
  foreignKey: "wallet_id",
  as: "transaction",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT"
});
Transaction.belongsTo(Wallet, {
  foreignKey: "wallet_id",
  as: "wallet"
});

export {
  User,
  Wallet,
  Transaction
}