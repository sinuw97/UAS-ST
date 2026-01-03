import { useState } from "react";
import { topUpSaldo } from "../services/transaction.service.js";

export default function TopUpModal({ isOpen, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await topUpSaldo(Number(amount));
      onSuccess(res.data);
      onClose();
    } catch (err) {
      setError(err.message || "Top up gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Top Up Saldo</h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-3 rounded-md bg-red-100 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-lg font-medium mb-1">
            Jumlah Top Up
          </label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-[#b1b1b1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ababab]"
            placeholder="Minimal Rp 10.000"
            required
          />

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Top Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}