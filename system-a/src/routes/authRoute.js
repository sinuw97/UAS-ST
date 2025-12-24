import { Router } from "express";
import { register, login, verifyToken, ssoLogin } from "../controllers/authController.js";

const authRouters = Router();

authRouters.post("/register", register);
authRouters.post("/login", login);
authRouters.post("/verify-token", verifyToken);
authRouters.get("/sso-login", ssoLogin);

export default authRouters;