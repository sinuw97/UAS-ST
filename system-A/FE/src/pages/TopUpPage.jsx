import { useState, useEffect } from "react";
import { SideBar } from "../components/SideBar.jsx";
import TopUpModal from "../components/ModalTopUp.jsx";
import { dashboard } from "../services/dashboard.service.js";

export default function TopUpPage() {
  const [openTopup, setOpenTopup] = useState(false);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const res = await dashboard();
        setSaldo(res.data.totalSaldo);
      } catch (error) {
        console.error("Gagal load saldo ", error);
      }
    };

    fetchSaldo();
  }, []);

  return (
    <main>
      <div className="flex w-full h-screen">
        <SideBar />

        <div className="w-4/5 bg-[#fefefe] text-[#313638]">
          {/* Header */}
          <div className="px-6 py-3 border-b border-[#bebebe]">
            <h3 className="text-2xl font-bold">Topup Saldo</h3>
          </div>

          {/* Saldo */}
          <div className="px-6 mt-6">
            <h1 className="text-xl">Sisa Saldo</h1>
            <span className="font-bold text-3xl">
              Rp {saldo.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Button */}
          <button
            onClick={() => setOpenTopup(true)}
            className="mx-6 mt-4 px-5 py-2 bg-[#3d8ae8] hover:bg-[#2a76d3]
                       text-white rounded-md shadow-sm"
          >
            Top Up
          </button>

          {/* Modal */}
          <TopUpModal
            isOpen={openTopup}
            onClose={() => setOpenTopup(false)}
            onSuccess={(data) => {
              setSaldo(data.saldo);
            }}
          />
        </div>
      </div>
    </main>
  );
}
