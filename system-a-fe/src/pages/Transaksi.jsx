import { SideBar } from "../components/SideBar";

export const Transaksi = () => {
  // dummy
  const dataTransaksi = [
    {
      id: 1,
      date: "2025-12-01",
      type: "Credit",
      amount: 500000,
      description: "Setoran awal anggota",
    },
    {
      id: 2,
      date: "2025-12-05",
      type: "Debit",
      amount: 150000,
      description: "Pembelian barang koperasi",
    },
    {
      id: 3,
      date: "2025-12-10",
      type: "Credit",
      amount: 300000,
      description: "Simpanan wajib",
    },
    {
      id: 4,
      date: "2025-12-15",
      type: "Debit",
      amount: 100000,
      description: "Penarikan saldo",
    },
  ];

  const formatRupiah = (value) => "Rp " + value.toLocaleString("id-ID");

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <main>
      <div className="flex w-full h-[730px]">
        {/* Side Bar */}
        <SideBar />

        {/* Main Content */}
        <div className="w-4/5 h-auto bg-[#e6e6e6] text-[#313638]">
          {/* Header */}
          <div className="bg-[#fefefe] px-6 py-3 items-center justify-between mb-5">
            <h1 className="text-3xl font-bold ">Riwayat Transaksi</h1>
            <p className="text-md opacity-70">
              Catatan seluruh transaksi keuangan Anda
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-md shadow p-5">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1d839a] text-[#fefefe]">
                  <th className="p-3 text-center">Tanggal</th>
                  <th className="p-3 text-center">Tipe</th>
                  <th className="p-3 text-center">Jumlah</th>
                  <th className="p-3 text-center">Keterangan</th>
                </tr>
              </thead>

              <tbody>
                {dataTransaksi.map((trx) => (
                  <tr
                    key={trx.id}
                    className="odd:bg-gray-50
                      even:bg-white
                      hover:bg-gray-100
                      transition"
                  >
                    <td className="text-center p-3">{formatDate(trx.date)}</td>
                    <td className="text-center p-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          trx.type === "Credit"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {trx.type}
                      </span>
                    </td>
                    <td className="text-center p-3 font-semibold">
                      {formatRupiah(trx.amount)}
                    </td>
                    <td className="p-3">{trx.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
