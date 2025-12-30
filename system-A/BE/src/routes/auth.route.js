import express from "express";
import { login, register, ssoLogin, verifyToken } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.get("/sso-login", ssoLogin);
authRoute.post("/verify-token", verifyToken);

export default authRoute;