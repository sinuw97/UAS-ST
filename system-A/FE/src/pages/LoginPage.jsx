import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../services/auth.service.js";
export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      alert("Login gagal!");
      setError(error.response?.data?.message || "Login gagal");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e6f85c0]">
      {redirect === "b" ? (
        <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Login Dengan Menggunakan Sistem A
          </h1>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Login untuk melanjutkan ke Sistem B
          </p>

          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}

          <form
            action="http://localhost:3000/auth/login?redirect=b"
            method="POST"
          >
            <input
              type="email"
              name="email"
              className="w-full border rounded p-2 mb-4"
              placeholder="Email"
              required
            />

            <input
              type="password"
              name="password"
              className="w-full border rounded p-2 mb-4"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="w-full hover:bg-[#1e8197] bg-[#0E7085] text-white py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Login Sistem Keuangan TSU
          </h1>

          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              className="w-full border rounded p-2 mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              name="password"
              className="w-full border rounded p-2 mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full hover:bg-[#1e8197] bg-[#0E7085] text-white py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
