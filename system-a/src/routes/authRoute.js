import { Router } from "express";
import { register, login, ssoLogin, authMe } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouters = Router();

authRouters.post("/register", register);
authRouters.get("/me", authMe)
authRouters.post("/login", login);
authRouters.post("/verify-token", verifyToken);
authRouters.get("/sso-login", ssoLogin);

export default authRouters;