import sequelize from "../configs/database.config.js";
import { Wallet, Transaction, User } from "../models/index.js";

// Make wallet
export const createWallet = async (userId) => {
  return await Wallet.create({
    user_id: userId,
    balance: 0,
  });
};

// Get info saldo by id
export const getInfoSaldoById = async (userId) => {
  return await Wallet.findOne({
    where: { user_id: userId },
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  });
};

// Charge saldo setiap pembayaran
export const deductSaldo = async ({ userId, amount, referenceId }) => {
  return await sequelize.transaction(async (t) => {
    const wallet = await Wallet.findOne({
      where: { user_id: userId },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (!wallet) {
      throw new Error("Wallet tidak ditemukan");
    }

    if (wallet.status !== "Aktif") {
      await Transaction.create(
        {
          wallet_id: wallet.wallet_id,
          type: "pembelian",
          amount,
          status: "failed",
          reference_id: referenceId,
          description: "Wallet tidak aktif",
        },
        { transaction: t }
      );

      throw new Error("Wallet tidak aktif");
    }

    if (wallet.balance < amount) {
      await Transaction.create(
        {
          wallet_id: wallet.wallet_id,
          type: "pembelian",
          amount,
          status: "failed",
          reference_id: referenceId,
          description: "Saldo tidak mencukupi",
        },
        { transaction: t }
      );

      throw new Error("Saldo tidak mencukupi");
    }

    wallet.balance -= amount;
    await wallet.save({ transaction: t });

    await Transaction.create(
      {
        wallet_id: wallet.wallet_id,
        type: "purchase",
        amount,
        status: "success",
        reference_id: referenceId,
        description: "Pembelian berhasil",
      },
      { transaction: t }
    );

    return wallet;
  });
};
