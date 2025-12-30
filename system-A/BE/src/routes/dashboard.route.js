import express from "express";
import { authToken } from "../middlewares/auth.middleware.js";
import { chartSaldoDashboard, getDashboard } from "../controllers/dashboard.controller.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/", authToken, getDashboard);
dashboardRoute.get("/chart", authToken, chartSaldoDashboard);

export default dashboardRoute