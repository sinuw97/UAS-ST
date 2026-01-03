import { api } from "../utils/api.utils";

export const riwayatPembelian = async (bulan, tahun) => {
  try {
    const response = await api.get(
      `/transaction/riwayat-pembelian?bulan=${bulan}&tahun=${tahun}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Gagal menampilkan riwayat pembelian"
    );
  }
};

export const riwayatSaldo = async (bulan, tahun) => {
  try {
    const response = await api.get(
      `/transaction/riwayat-topup?bulan=${bulan}&tahun=${tahun}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Gagal menampilkan riwayat saldo"
    );
  }
};

export const topUpSaldo = async (amount) => {
  try {
    const response = await api.post("/wallet/topup", { amount });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal melakukan top up");
  }
};
