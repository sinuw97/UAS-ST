import User from "./users";
import Account from "./accounts";
import Transaction from "./transactions";

// User -> Account 1:1
User.hasOne(Account, { foreignKey: "user_id"});
Account.belongsTo(User, { foreignKey: "user_id"});

// User -> Transaction 1:N
User.hasMany(Transaction, { foreignKey: "user_id" });
Transaction.belongsTo(User, { foreignKey: "user_id" });

export {
  User,
  Account,
  Transaction
};