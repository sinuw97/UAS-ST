import { riwayatTransaksiPembelian, riwayatTransaksiTopup } from "../services/transaction.service.js";
import { getInfoSaldoById } from "../services/wallet.service.js";

export const getTransaksiPembelianController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bulan, tahun } = req.query;
    
    // Get wallet akun
    const wallet = await getInfoSaldoById(userId);

    if (!wallet) {
      return res.status(404).json({
        status: "failed",
        message: "Wallet tidak ditemukan"
      });
    }
    
    const riwayat = await riwayatTransaksiPembelian(wallet.wallet_id, bulan, tahun);

    if (!riwayat) {
      return res.status(404).json({
        status: "failed",
        message: "Riwayat pembelian tidak ditemuakan"
      });
    }

    const data = riwayat.map(t => t.toJSON());

    return res.status(200).json({
      status: "success",
      message: "Riwayat pembelian berhasil ditemukan",
      data
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: "Failed to load riwayat transaksi pembelian",
      error: error.message,
    })
  }
}

export const getTransaksiTopupController = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bulan, tahun } = req.query;
    
    // Get wallet akun
    const wallet = await getInfoSaldoById(userId);

    if (!wallet) {
      return res.status(404).json({
        status: "failed",
        message: "Wallet tidak ditemukan"
      });
    }

    const riwayat = await riwayatTransaksiTopup(wallet.wallet_id, bulan, tahun);

    if (!riwayat) {
      return res.status(404).json({
        status: "failed",
        message: "Riwayat topup tidak ditemuakan"
      });
    }

    const data = riwayat.map(t => t.toJSON());

    return res.status(200).json({
      status: "success",
      message: "Riwayat topup berhasil ditemukan",
      data
    });
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: "Failed to load riwayat transaksi pembelian",
      error: error.message,
    })
  }
}