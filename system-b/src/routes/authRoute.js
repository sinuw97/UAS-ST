import { Router } from "express";
import { loginWithToken } from "../controllers/authController.js";

const authRouters = Router();

authRouters.post("/login-with-token", loginWithToken);

export default authRouters;