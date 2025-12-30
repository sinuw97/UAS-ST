import { SideBar } from "../components/SideBar.jsx";
import { ChartSaldo } from "../components/ChartSaldo.jsx";
import { useState } from "react";
import {chartSaldo, dashboard} from "../services/dashboard.service.js";
import { useEffect } from "react";
export default function HomePage() {
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardRes = await dashboard();
        const chartRes = await chartSaldo();

        setUser(dashboardRes.data.name);
        setBalance(dashboardRes.data.totalSaldo);
        
        setChartData(chartRes.data);
      } catch (err) {
        console.error(err);
        setError("Gagal load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

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
          {/* Header */}
          <div className="bg-[#fefefe] px-6 py-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Dashboard</h3>
              <p className="opacity-70">
                Laporan keuangan bulan ini{" "}
                <span className="font-semibold">
                  Des 01, 2025 - Des 31, 2025
                </span>
              </p>
            </div>

            <div className="bg-[#ebebeb] rounded-3xl px-2 py-1">
              <h4 className="flex items-center justify-center gap-1">
                <img
                  src={`https://ui-avatars.com/api/?name=${user}&font-size=0,5&background=013F4E&color=fff`}
                  alt="photo"
                  className="w-10 h-10 rounded-3xl"
                />
                {user}
              </h4>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="bg-[#fefefe] mx-10 my-6 rounded-md">
            <div className="h-3 bg-gradient-to-r from-[#FFE55C] via-[#E8BE00] to-[#B59400]"></div>
            <h3 className="font-semibold text-xl px-5 pt-3">
              Selamat Datang, {user}!
            </h3>
            <p className="text-sm opacity-55 px-5 pb-3">
              Pada sistem koperasi TSU! Lorem ipsum dolor sit amet
            </p>
          </div>

          {/* Balance Info */}
          <div className="mx-10">
            <h1 className="text-2xl font-bold">Saldo</h1>

            <div className="w-full h-[350px] bg-[#fefefe] rounded-md p-5 mt-6 flex gap-5">
              {/* Graph */}
              <div className="w-3/5 h-full flex flex-col">
                {/* Header Chart */}
                <div className="mb-3">
                  <p className="text-xl opacity-80 font-semibold ">
                    Total Saldo
                  </p>
                  <h2 className="text-2xl font-bold">
                    Rp {Number(balance || 0).toLocaleString("id-ID")}
                  </h2>
                </div>

                {/* Chart */}
                <div className="flex-1">
                  <ChartSaldo data={chartData}/>
                </div>
              </div>

              <div className="flex flex-col w-2/5 h-full gap-5">
                {/* Income */}
                <div className="w-full border border-[#dbdbdb] bg-[#fefefe] rounded-md p-4 shadow-sm">
                  <p className="text-lg opacity-80 mb-4">Income</p>
                  <h2 className="text-xl font-bold text-green-600">
                    Rp 28.933.92
                  </h2>
                  <p className="text-sm text-green-500 mb-2">
                    +5% vs last month
                  </p>
                </div>

                {/* Expense */}
                <div className="w-full border border-[#dbdbdb] bg-[#fefefe] rounded-md p-4 shadow-sm">
                  <p className="opacity-60 mb-4">Expense</p>
                  <h2 className="text-xl font-bold text-red-600">
                    Rp 12.933.92
                  </h2>
                  <p className="text-sm text-red-500 mb-2">
                    -12% vs last month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
