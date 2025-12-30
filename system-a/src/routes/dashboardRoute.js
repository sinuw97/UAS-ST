import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getDashboard } from '../controllers/dashboardController.js';
import { getSaldoChart } from '../services/walletService.js';

const dashboardRoute = Router();

dashboardRoute.get('/', verifyToken, getDashboard);
dashboardRoute.get('/chart', verifyToken, getSaldoChart);

export default dashboardRoute