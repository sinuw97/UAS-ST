import {
  getInfoSaldoById,
  deductSaldo,
  topupSaldo,
} from "../services/wallet.service.js";

// kontroller get saldo
export const getSaldoController = async (req, res) => {
  try {
    const userId = req.user.id;

    const wallet = await getInfoSaldoById(userId);

    return res.status(200).json({
      status: "success",
      message: "Data saldo ditemukan!",
      data: {
        walletId: wallet.wallet_id,
        balance: wallet.balance,
        status: wallet.status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Failed to get saldo",
      error: error.message,
    });
  }
};

// kontroler utk mengurangi saldo utk pembelian
export const deductSaldoController = async (req, res) => {
  try {
    const userId = req.user.id;
    // AMbil jumlah dan reference id = id orders
    const { amount, referenceId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Jumlah Invalid",
      });
    }

    const wallet = await deductSaldo({ userId, amount, referenceId });

    return res.status(200).json({
      balance: wallet.balance,
      message: "Pembayaran berhasil, Saldo berhasil terpotong!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Failed to process the payment",
      error: error.message,
    });
  }
};

// Topup saldo controller
export const topupSaldoController = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    const result = await topupSaldo(userId, amount);

    return res.status(200).json({
      status: "success",
      message: "Top up berhasil!",
      data: {
        walletId: result.wallet_id,
        saldo: result.balance
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "failed",
      message: "Failed to topup saldo",
      error: error.message,
    });
  }
};
