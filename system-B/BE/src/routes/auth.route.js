import express from "express";
import { loginWithToken } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/login-with-token", loginWithToken);

export default authRoute;