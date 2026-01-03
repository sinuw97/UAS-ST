import express from 'express';
import { getSaldoController, deductSaldoController, topupSaldoController } from '../controllers/wallet.controller.js';
import { authToken } from "../middlewares/auth.middleware.js";

const walletRoute = express.Router();

// Get info Saldo (utk sistem B nembak)
walletRoute.get("/", authToken, getSaldoController);
// kurangi saldo ketika belanca
walletRoute.post("/deduct", authToken, deductSaldoController);
// Top up
walletRoute.post("/topup", authToken, topupSaldoController);

export default walletRoute;