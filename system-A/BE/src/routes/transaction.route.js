import express from "express";
import { authToken } from "../middlewares/auth.middleware.js";
import { getTransaksiPembelianController, getTransaksiTopupController } from "../controllers/transaction.controller.js";

const transactionRoute = express.Router();

// Rute riwayat pembelian
transactionRoute.get("/riwayat-pembelian", authToken, getTransaksiPembelianController);
// Rute riwayat topup
transactionRoute.get("/riwayat-topup", authToken, getTransaksiTopupController);

export default transactionRoute;