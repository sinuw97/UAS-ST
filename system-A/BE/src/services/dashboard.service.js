import { Transaction } from "../models/index.js";

export const getSaldoChart = async (walletId) => {
  const transaksi = await Transaction.findAll({
    where: { wallet_id: walletId, status: "success", type: "topup" },
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
}