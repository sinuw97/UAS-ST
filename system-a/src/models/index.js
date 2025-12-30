import User from "./users.js";
import Wallet from "./wallets.js";
import Transaction from "./transactions.js";

// User -> Wallet 1:1
User.hasOne(Wallet, { foreignKey: "user_id"});
Wallet.belongsTo(User, { foreignKey: "user_id"});

// Wallet -> Transaction 1:N
Wallet.hasMany(Transaction, { foreignKey: "wallet_id" });
Transaction.belongsTo(Wallet, { foreignKey: "wallet_id" });

export {
  User,
  Wallet,
  Transaction
};