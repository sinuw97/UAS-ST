import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Callback from "./pages/Callback.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import Cart from "./pages/Cart.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/products" element={<Placeholder title="Daftar Produk" />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/history" element={<Placeholder title="Riwayat Pembelian" />}/>
        <Route path="/callback" element={<Callback />}/>
      </Routes>
    </BrowserRouter>
  );
}