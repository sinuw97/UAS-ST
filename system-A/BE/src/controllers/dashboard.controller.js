import { getSaldoChart } from "../services/dashboard.service.js";
import {
  getInfoSaldoById,
  getSaldoIncomeOutcome,
} from "../services/wallet.service.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Ambil info saldo
    const wallet = await getSaldoIncomeOutcome(userId);

    if (!wallet) {
      console.log("USER ID: ", userId);
      console.log("HASIL QUERY: ", wallet);
      return res.status(404).json({
        status: "failed",
        message: "Saldo tidak ditemukan!",
      });
    }

    const income = wallet.transaction
      .filter((t) => t.type === "topup" && t.status === "success")
      .reduce((total, t) => total + t.amount, 0);

    const outcome = wallet.transaction
      .filter((t) => t.type === "pembelian" && t.status === "success")
      .reduce((total, t) => total + t.amount, 0);

    return res.status(200).json({
      status: "success",
      data: {
        name: wallet.user.name,
        totalSaldo: wallet.balance,
        income,
        outcome,
        createdAt: wallet.created_at,
        updatedAt: wallet.updated_at,
      },
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};

// Chart saldo di dashboard
export const chartSaldoDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const wallet = await getInfoSaldoById(userId);
    if (!wallet) {
      return res.status(404).json({
        status: "failed",
        message: "Wallet tidak ditemukan!",
      });
    }

    const chartData = await getSaldoChart(wallet.wallet_id);
    if (!chartData) {
      return res.status(404).json({
        status: "failed",
        message: "Data chart tidak ditemukan!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: chartData,
    });
  } catch (error) {
    console.error("DASHBOARD CHART ERROR:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};
