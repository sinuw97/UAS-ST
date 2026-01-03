import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeAccessToken } from "../utils/api.utils.js";
import ModalLogout from "./ModalLogout.jsx";

export const SideBar = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    navigate("/");
  };
  return (
    <>
      <div className="w-1/5 h-auto bg-[#0d5362] text-[#fefefe]">
        {/* Logo/Icon */}
        <div className="p-7">
          <h1 className="text-lg font-semibold text-center">
            Sistem Keuangan TSU
          </h1>
        </div>

        <div className="border border-1-[#141414] opacity-35 w-full h-0"></div>

        {/* Menu */}
        <div className="p-5 flex flex-col gap-3">
          <h3 className="opacity-65">Main Menu</h3>

          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/riwayat-transaksi", label: "Riwayat Pembelian" },
            { to: "/riwayat-saldo", label: "Riwayat Saldo" },
            { to: "/topup-saldo", label: "Topup Saldo" },
          ].map((menu) => (
            <NavLink
              key={menu.to}
              to={menu.to}
              className={({ isActive }) =>
                `p-2 rounded-md ${
                  isActive
                    ? "bg-[#328da1bc] font-semibold"
                    : "hover:bg-[#328da1bc]"
                }`
              }
            >
              {menu.label}
            </NavLink>
          ))}
        </div>

        {/* Logout */}
        <div className="p-5 flex flex-col gap-3 mt-55">
          <button
            onClick={() => setOpenLogout(true)}
            className="w-full text-left p-2 rounded-md font-semibold hover:bg-[#328da1bc]"
          >
            Logout
          </button>
          {/* Modal */}
          <ModalLogout
            isOpen={openLogout}
            onClose={() => setOpenLogout(false)}
            onConfirm={handleLogout}
          />
        </div>
      </div>
    </>
  );
};
