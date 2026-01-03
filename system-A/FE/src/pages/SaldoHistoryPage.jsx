import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar.jsx";
import Table from "../components/Table.jsx";
import { riwayatSaldo } from "../services/transaction.service.js";

export default function SaldoHistoryPage() {
  // State
  const [riwayat, setRiwayat] = useState("");
  const [bulan, setBulan] = useState("1");
  const [tahun, setTahun] = useState("2026");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRiwayatSaldo = async () => {
      try {
        const pembelianRes = await riwayatSaldo(bulan, tahun);

        setRiwayat(pembelianRes.data || []);
      } catch (error) {
        console.error(error);
        setError("Gagal load data transaksi");
      } finally {
        setLoading(false);
      }
    };

    fetchRiwayatSaldo();
  }, [bulan, tahun]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="flex w-full h-182.5">
        {/* Side Bar */}
        <SideBar />

        {/* Main Content */}
        <div className="w-4/5 h-auto bg-[#e6e6e6] text-[#313638]">
          <div className="bg-[#fefefe] px-6 py-3">
            {/* Header */}
            <div>
              <h3 className="text-2xl font-bold">Riwayat Transaksi Saldo Anda</h3>
              <p>Lihat riwayat transaksi saldo anda di bulan ini</p>
            </div>

            <div className="mt-7 border-l-4 border-[#0E7085]">
              <h3 className="text-xl font-semibold pl-2">Laporan Transaksi Saldo</h3>
            </div>

            {/* Input bulan tahun */}
            <div className="flex flex-row gap-4">
              <div className="mt-3 flex items-center gap-3">
                <p>Bulan:</p>
                <select
                  name="bulan"
                  id="bulan"
                  className="w-50 border shadow-md px-2 py-1"
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                >
                  <option value="1">Januari</option>
                  <option value="2">Febuari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <p>Tahun:</p>
                <select
                  name="tahun"
                  id="tahun"
                  className="w-50 border shadow-md px-2 py-1"
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
            </div>

            <div className="mt-4 border-l-4 border-[#0E7085]">
              <h2 className="text-xl font-semibold pl-2">Hasil Laporan</h2>
            </div>

            {/* Tabel */}
            <Table
              styleBg={"pembelian"}
              columns={[
                "Transaksi ID",
                "Tipe Transaksi",
                "Jumlah",
                "Status",
                "Deskripsi",
                "Tanggal & Waktu",
              ]}
              data={riwayat}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
