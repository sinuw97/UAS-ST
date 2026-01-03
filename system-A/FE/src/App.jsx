import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TransactionPage from "./pages/TransactionHistoryPage";
import SaldoHistoryPage from "./pages/SaldoHistoryPage";
import TopUpPage from "./pages/TopUpPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/dashboard" element={<HomePage />}/>
        <Route path="/riwayat-transaksi" element={<TransactionPage />} />
        <Route path="/riwayat-saldo" element={<SaldoHistoryPage />} />
        <Route path="/topup-saldo" element={<TopUpPage />}/>
      </Routes>
    </BrowserRouter>
  )
}