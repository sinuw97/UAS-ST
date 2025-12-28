import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getBalance, topUp, charge } from "../controllers/finnanceController.js";

const financeRouter = Router();

financeRouter.get("/balance", verifyToken, getBalance);
financeRouter.post("/topup", verifyToken, topUp);
financeRouter.post("/charge", verifyToken, charge);

export default financeRouter;