import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <>
      <div className="w-1/5 h-auto bg-[#141414] text-[#fefefe]">
        {/* Logo/Icon */}
        <div className="p-7">
          <h1 className="text-lg font-semibold text-center">
            Sistem Koperasi TSU
          </h1>
        </div>

        <div className="border border-1-[#141414] opacity-35 w-full h-0"></div>

        {/* Menu */}
        <div className="p-5 flex flex-col gap-3">
          <h3 className="opacity-65">Main Menu</h3>
          {/* List Menu */}
          <Link to="/dashboard">
            <div className="hover:bg-[#363636] p-2 rounded-md">Dashboard</div>
          </Link>
          <Link to="/transaksi">Transaksi</Link>
          <Link to="/saldo">Saldo</Link>
          <Link to="/budget">Budget</Link>
          {/* 
          
          <div className="hover:bg-[#363636] p-2 rounded-md">Saldo</div>
          <div className="hover:bg-[#363636] p-2 rounded-md">Buget</div> */}
        </div>

        {/* Setting */}
        <div className="p-5 flex flex-col gap-3 mt-55">
          <div className="p-2 rounded-md">Setting</div>
          <div className="p-2 rounded-md">Logout</div>
        </div>
      </div>
    </>
  );
};
