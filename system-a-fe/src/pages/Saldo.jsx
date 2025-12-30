import { SideBar } from "../components/SideBar";

export const Saldo = () => {
  return (
    <main>
      <div className="flex w-full h-[730px]">
        {/* Side Bar */}
        <SideBar />

        {/* Main Content */}
        <div className="w-4/5 h-auto bg-[#e6e6e6] text-[#313638]">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Saldo</h1>
            <p className="opacity-60 text-sm">
              Ringkasan saldo dan simpanan koperasi
            </p>
          </div>

          {/* Total Saldo */}
          <div className="bg-white rounded-md shadow p-6 mb-6">
            <p className="text-sm opacity-60">Total Saldo</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              Rp 12.500.000
            </h2>
            <p className="text-xs opacity-50 mt-1">
              Terakhir diperbarui: Hari ini
            </p>

            {/* Action */}
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition">
              + Tambah Saldo
            </button>
          </div>

          {/* Riwayat Singkat */}
          <div className="bg-white rounded-md shadow p-6">
            <h3 className="font-semibold text-lg mb-4">
              Riwayat Perubahan Saldo
            </h3>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Tanggal</th>
                  <th className="p-3 border">Jenis</th>
                  <th className="p-3 border">Nominal</th>
                  <th className="p-3 border">Keterangan</th>
                </tr>
              </thead>

              <tbody>
                <tr className="odd:bg-gray-50 even:bg-white">
                  <td className="p-3 border">01 Des 2025</td>
                  <td className="p-3 border text-green-600 font-medium">
                    Masuk
                  </td>
                  <td className="p-3 border">Rp 1.000.000</td>
                  <td className="p-3 border">Setoran awal</td>
                </tr>

                <tr className="odd:bg-gray-50 even:bg-white">
                  <td className="p-3 border">05 Des 2025</td>
                  <td className="p-3 border text-red-600 font-medium">
                    Keluar
                  </td>
                  <td className="p-3 border">Rp 250.000</td>
                  <td className="p-3 border">Pembelian barang</td>
                </tr>

                <tr className="odd:bg-gray-50 even:bg-white">
                  <td className="p-3 border">10 Des 2025</td>
                  <td className="p-3 border text-green-600 font-medium">
                    Masuk
                  </td>
                  <td className="p-3 border">Rp 500.000</td>
                  <td className="p-3 border">Simpanan sukarela</td>
                </tr>
              </tbody>
            </table>

            <div className="text-right mt-4">
              <button className="text-blue-600 hover:underline text-sm">
                Lihat semua transaksi →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
