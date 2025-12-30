import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
export const Login = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `http://localhost:3000/auth/login${
          redirect ? `?redirect=${redirect}` : ""
        }`,
        { email, password }
      );

      if (!redirect) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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

          <form onSubmit={handleLogin}>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
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

          <form onSubmit={handleLogin}>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
