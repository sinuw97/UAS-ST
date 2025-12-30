import { deductSaldo, getInfoSaldoByAkun } from "../services/walletService.js";

// kontroller get saldo
export const getSaldoController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const wallet = await getInfoSaldoByAkun(userId);

    return res.status(200).json({
      walletId: wallet.wallet_id,
      balance: wallet.balance,
      status: wallet.status
    });
  } catch (error) {
    next(error)
  }
};

// kontroler utk mengurangi saldo utk pembelian
export const deductSaldoController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { amount, referenceId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Jumlah Invalid"
      });
    }

    const wallet = await deductSaldo({ userId, amount, referenceId });

    return res.status(200).json({
      balance: wallet.balance,
      message: "Pembayaran berhasil, Saldo berhasil terpotong!"
    });
  } catch (error) {
    next(error);
  }
}