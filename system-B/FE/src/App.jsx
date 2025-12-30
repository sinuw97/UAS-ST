import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Callback from "./components/Callback";
import Placeholder from "./pages/Placeholder";
import Cart from "./pages/CardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/dashboard" element={<HomePage />}/>
        <Route path="/callback" element={<Callback />}/>
        <Route path="/products" element={<Placeholder title="Daftar Produk" />}/>
        <Route path="/history" element={<Placeholder title="Riwayat Pembelian" />}/>
        <Route path="/cart" element={<Cart />}/>
      </Routes>
    </BrowserRouter>
  )
}