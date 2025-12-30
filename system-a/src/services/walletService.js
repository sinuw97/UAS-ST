import sequelize from "../db/database.js";
import { Wallet, Transaction } from "../models/index.js";

// get info saldo
export const getInfoSaldoByAkun = async (userId) => {
  return await Wallet.findOne({
    where: { user_id: userId },
  });
};

// charge saldo tiap pembelian
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

// chart saldo
export const getSaldoChart = async (walletId) => {
  const transaksi = await Transaction.findAll({
    where: { wallet_id: walletId, status: "success" },
    order: [["created_at", "ASC"]],
  });

  if (!transaksi || transaksi.length === 0) return null;

  // hitung balance kumulatif
  let balance = 0;
  const chartData = transaksi.map((tx) => {
    balance += tx.amount;
    const date = new Date(tx.created_at);
    const formattedDate = date.toLocaleString("id-ID", {
      month: "short",
      day: "numeric",
    });
    return { date: formattedDate, balance };
  });

  return chartData;
};
