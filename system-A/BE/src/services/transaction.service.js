import { Transaction } from "../models/index.js";
import { Op, fn, col, where } from "sequelize";

// Get riwayat transaksi pembelian
export const riwayatTransaksiPembelian = async (walletId, bulan, tahun) => {
  return await Transaction.findAll({
    where: {
      wallet_id: walletId,
      type: "pembelian",
      [Op.and]: [
        where(fn("MONTH", col("created_at")), bulan),
        where(fn("YEAR", col("created_at")), tahun),
      ],
    },
    order: [["created_at", "DESC"]],
  });
};

// Get riwayat transaksi saldo
export const riwayatTransaksiTopup = async (walletId, bulan, tahun) => {
  return await Transaction.findAll({
    where: {
      wallet_id: walletId,
      type: "topup",
      [Op.and]: [
        where(fn("MONTH", col("created_at")), bulan),
        where(fn("YEAR", col("created_at")), tahun),
      ],
    },
    order: [["created_at", "ASC"]],
  });
};
