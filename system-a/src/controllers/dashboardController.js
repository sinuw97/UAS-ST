import {
  getInfoSaldoByAkun,
  getSaldoChart,
} from "../services/walletService.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // ambil wallet user
    const wallet = await getInfoSaldoByAkun(userId);

    return res.status(200).json({
      status: "success",
      data: {
        name: req.user.name,
        totalSaldo: wallet ? wallet.balance : 0,
      },
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};

export const dashboardChart = async (req, res) => {
  try {
    const userId = req.user.id;

    const wallet = await getInfoSaldoByAkun(userId);

    const chartData = await getSaldoChart(wallet.wallet_id);

    if (!chartData) {
      return res.status(404).json({
        status: "error",
        message: "Data transaksi tidak ditemukan!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: chartData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to get data transaksi",
      error: error.message,
    });
  }
};
