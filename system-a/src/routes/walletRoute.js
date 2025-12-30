import { Router } from 'express';
import { getSaldoController, deductSaldoController } from '../controllers/walletController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const walletRoute = Router();

walletRoute.use(verifyToken);

// cek saldo
walletRoute.get("/saldo", getSaldoController);

// potong saldo
walletRoute.post("/deduct", deductSaldoController);

export default walletRoute;