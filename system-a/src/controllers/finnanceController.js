import sequelize from "../db/database.js";
import Account from "../models/accounts.js";
import Transaction from "../models/transactions.js";

/**
 *  GET balance /finance/balance
 */
export const getBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    let account = await Account.findOne({ where: { user_id: userId } });

    // kalau blm ada account -> bikin baru
    if (!account) {
      account = await Account.create({ user_id: userId, balance: 0 });
    }

    return res.status(200).json({
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error: ",
      error: error.message,
    });
  }
};

/**
 * POST /finance/topup
 * body: { amount }
 */
export const topUp = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Jumlah saldo tidak valid" });
  }

  const t = await sequelize.transaction();

  try {
    let account = await Account.findOne(
      { where: { user_id: userId } },
      { transaction: t }
    );

    if (!account) {
      return res.status(404).json({
        error: true,
        message: "Akun tidak ditemukan!",
      });
    }

    account.balance = Number(account.balance) + Number(amount);
    await account.save({ transaction: t });

    await Transaction.create(
      {
        user_id: userId,
        type: "Credit",
        amount,
        description: "Top up saldo",
      },
      { transaction: t }
    );

    return res.status(200).json({
      message: "Top up berhasil",
      balance: account.balance,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: "Top up gagal" });
  }
};

/**
 * POST /finance/charge
 * body: { amount }
 */
export const charge = async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Jumlah tidak valid" });
  }

  const t = await sequelize.transaction();

  try {
    const account = await Account.findOne(
      { where: { user_id: userId } },
      { transaction: t }
    );

    if (!account || account.balance < amount) {
      throw new Error("Saldo tidak cukup");
    }

    account.balance = Number(account.balance) - Number(amount);
    await account.save({ transaction: t });

    await Transaction.create(
      {
        user_id: userId,
        type: "Debit",
        amount,
        description: "Pembelian barang di Sistem B",
      },
      { transaction: t }
    );

    await t.commit();

    return res.json({
      message: "Pembayaran berhasil",
      balance: account.balance,
    });
  } catch (error) {
    await t.rollback();
    return res.status(400).json({
      message: error.message || "Pembayaran gagal",
    });
  }
};
