import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    // ambil user dari localStorage
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserData(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Selamat Datang!</h1>

        {userData && <p className="text-xl text-gray-700 mb-6">{userData.name}</p>}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
