import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Transaksi } from "./pages/Transaksi.jsx";
import { Saldo } from "./pages/Saldo.jsx";
import { Login } from "./pages/Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login /> }/>
        <Route path="/dashboard" element={
          <Dashboard />
        }/>
        <Route path="/saldo" element={<Saldo />}/>
        <Route path="/transaksi" element={<Transaksi />}/>
      </Routes>
    </BrowserRouter>
  )
}